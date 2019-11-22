const { turtleTokenTypes, turtleTokenMap } = require('./tokens');
import {
  Parser,
  IParserConfig,
  Lexer,
  IToken,
  IRecognitionException,
  IMultiModeLexerDefinition,
  TokenType,
} from 'chevrotain';
import { IStardogParser, ModeString } from '../helpers/types';

export class TurtleParser extends Parser implements IStardogParser {
  protected lexer: Lexer;

  // Parsing Turtle requires that the parser keep a map of namespaces in state.
  // Empty prefixes, for example, are allowed only if the empty prefix has been
  // added to the namespaces map (for now, that's all this tracks). (TODO: We
  // might want to use a visitor for this, but I'm doing it quick-and-dirty for
  // now.)
  // See here: https://www.w3.org/TR/turtle/#handle-PNAME_LN
  protected namespacesMap = {};
  protected semanticErrors: IRecognitionException[] = [];

  // Clears the state that we have to manage on our own for each parse (see
  // above for details).
  protected resetManagedState = () => {
    this.namespacesMap = {};
    this.semanticErrors = [];
  };

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  // NOTE: This parser can parse in two modes, 'standard' and 'stardog'. The
  // latter includes non-standard features like embedded triples patterns (edge
  // properties).
  public parse = (
    document: string,
    mode: ModeString = 'standard'
  ): {
    errors: IRecognitionException[];
    semanticErrors: IRecognitionException[];
    cst: any;
  } => {
    this.input = this.lexer.tokenize(document).tokens;
    const cst = this.turtleDoc(0, [mode]);
    // Next two items are copied so that they can be returned/held after parse
    // state is cleared.
    const errors: IRecognitionException[] = [...this.errors];
    const semanticErrors: IRecognitionException[] = [...this.semanticErrors];
    this.resetManagedState();

    return {
      errors,
      semanticErrors,
      cst,
    };
  };

  constructor(
    config: Partial<IParserConfig> = {},
    tokens = turtleTokenTypes,
    lexerDefinition: TokenType[] | IMultiModeLexerDefinition = tokens,
    performSelfAnalysis = true
  ) {
    super(tokens, {
      outputCst: true,
      recoveryEnabled: true,
      ...config,
    });
    this.lexer = new Lexer(lexerDefinition);

    if (performSelfAnalysis) {
      Parser.performSelfAnalysis(this);
    }
  }

  turtleDoc = this.RULE('turtleDoc', (mode: ModeString) => {
    this.MANY(() => this.SUBRULE(this.statement, { ARGS: [mode] }));
  });

  statement = this.RULE('statement', (mode: ModeString) => {
    this.OR([
      { ALT: () => this.SUBRULE(this.directive) },
      {
        ALT: () => {
          this.SUBRULE(this.triples, { ARGS: [mode] });
          this.CONSUME(turtleTokenMap.Period);
        },
      },
    ]);
  });

  directive = this.RULE('directive', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.prefixID) },
      { ALT: () => this.SUBRULE(this.base) },
      { ALT: () => this.SUBRULE(this.sparqlPrefix) },
      { ALT: () => this.SUBRULE(this.sparqlBase) },
    ]);
  });

  prefixID = this.RULE('prefixID', () => {
    this.CONSUME(turtleTokenMap.TTL_PREFIX);

    const pnameNsToken = this.CONSUME(turtleTokenMap.PNAME_NS);
    const iriToken = this.CONSUME(turtleTokenMap.IRIREF);
    const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
    const iriImage = iriToken.image;
    this.namespacesMap[pnameImageWithoutColon] = iriImage;

    this.CONSUME(turtleTokenMap.Period);
  });

  base = this.RULE('base', () => {
    this.CONSUME(turtleTokenMap.TTL_BASE);
    this.CONSUME(turtleTokenMap.IRIREF);
    this.CONSUME(turtleTokenMap.Period);
  });

  sparqlBase = this.RULE('sparqlBase', () => {
    this.CONSUME(turtleTokenMap.BASE);
    this.CONSUME(turtleTokenMap.IRIREF);
  });

  sparqlPrefix = this.RULE('sparqlPrefix', () => {
    this.CONSUME(turtleTokenMap.PREFIX);
    const pnameNsToken = this.CONSUME(turtleTokenMap.PNAME_NS);
    const iriToken = this.CONSUME(turtleTokenMap.IRIREF);
    const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
    const iriImage = iriToken.image;
    this.namespacesMap[pnameImageWithoutColon] = iriImage;
  });

  triples = this.RULE('triples', (mode: ModeString) => {
    this.OR([
      {
        ALT: () => {
          this.OR1([
            {
              ALT: () => this.SUBRULE(this.subject),
            },
            {
              GATE: () => mode === 'stardog',
              ALT: () => this.SUBRULE(this.EmbeddedTriplePattern),
            },
          ]);
          this.SUBRULE(this.predicateObjectList);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.blankNodePropertyList);
          this.OPTION(() => this.SUBRULE1(this.predicateObjectList));
        },
      },
    ]);
  });

  // NOTE: Not part of Turtle spec. Part of Stardog's support for edge
  // properties/embedded triples/a subset of RDF*.
  triplesNotEmbedded = this.RULE('triplesNotEmbedded', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.subject);
          this.SUBRULE(this.predicateObjectList);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.blankNodePropertyList);
          this.OPTION(() => this.SUBRULE1(this.predicateObjectList));
        },
      },
    ]);
  });

  // NOTE: Not part of Turtle spec. Part of Stardog's support for edge
  // properties/embedded triples/a subset of RDF*.
  // ALSO NOTE: Intentionally does not conform to the RDF* spec. Stardog does
  // not allow nesting of embedded triples.
  EmbeddedTriplePattern = this.RULE('EmbeddedTriplePattern', () => {
    this.CONSUME(turtleTokenMap.LEmbed);
    this.SUBRULE(this.triplesNotEmbedded);
    this.CONSUME(turtleTokenMap.REmbed);
  });

  predicateObjectList = this.RULE('predicateObjectList', () => {
    this.SUBRULE(this.verb);
    this.SUBRULE(this.objectList);
    this.MANY(() => {
      this.CONSUME(turtleTokenMap.Semicolon);
      this.OPTION(() => {
        this.SUBRULE1(this.verb);
        this.SUBRULE1(this.objectList);
      });
    });
  });

  subject = this.RULE('subject', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.SUBRULE(this.collection) },
    ]);
  });

  predicate = this.RULE('predicate', () => {
    this.SUBRULE(this.iri);
  });

  objectList = this.RULE('objectList', () => {
    this.SUBRULE(this.object);
    this.MANY(() => {
      this.CONSUME(turtleTokenMap.Comma);
      this.SUBRULE1(this.object);
    });
  });

  verb = this.RULE('verb', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.predicate) },
      { ALT: () => this.CONSUME(turtleTokenMap.A) },
    ]);
  });

  literal = this.RULE('literal', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.RDFLiteral) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) },
      { ALT: () => this.SUBRULE(this.BooleanLiteral) },
    ]);
  });

  blankNodePropertyList = this.RULE('blankNodePropertyList', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.SUBRULE(this.predicateObjectList);
    this.CONSUME(turtleTokenMap.RBracket);
  });

  object = this.RULE('object', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.SUBRULE(this.collection) },
      { ALT: () => this.SUBRULE(this.blankNodePropertyList) },
      { ALT: () => this.SUBRULE(this.literal) },
    ]);
  });

  collection = this.RULE('collection', () => {
    this.CONSUME(turtleTokenMap.LParen);
    this.MANY(() => this.SUBRULE(this.object));
    this.CONSUME(turtleTokenMap.RParen);
  });

  NumericLiteral = this.RULE('NumericLiteral', () => {
    this.OR([
      { ALT: () => this.CONSUME(turtleTokenMap.INTEGER) },
      { ALT: () => this.CONSUME(turtleTokenMap.DECIMAL) },
      { ALT: () => this.CONSUME(turtleTokenMap.DOUBLE) },
    ]);
  });

  RDFLiteral = this.RULE('RDFLiteral', () => {
    this.SUBRULE(this.String);
    this.OPTION(() => {
      this.OR([
        { ALT: () => this.CONSUME(turtleTokenMap.LANGTAG) },
        {
          ALT: () => {
            this.CONSUME(turtleTokenMap.DoubleCaret);
            this.SUBRULE(this.iri);
          },
        },
      ]);
    });
  });

  BooleanLiteral = this.RULE('BooleanLiteral', () => {
    this.OR([
      { ALT: () => this.CONSUME(turtleTokenMap.TRUE) },
      { ALT: () => this.CONSUME(turtleTokenMap.FALSE) },
    ]);
  });

  String = this.RULE('String', () => {
    this.OR([
      { ALT: () => this.CONSUME(turtleTokenMap.STRING_LITERAL_QUOTE) },
      { ALT: () => this.CONSUME(turtleTokenMap.STRING_LITERAL_SINGLE_QUOTE) },
      {
        ALT: () =>
          this.CONSUME(turtleTokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE),
      },
      { ALT: () => this.CONSUME(turtleTokenMap.STRING_LITERAL_LONG_QUOTE) },
    ]);
  });

  iri = this.RULE('iri', () => {
    this.OR([
      { ALT: () => this.CONSUME(turtleTokenMap.IRIREF) },
      { ALT: () => this.SUBRULE(this.PrefixedName) },
    ]);
  });

  PrefixedName = this.RULE('PrefixedName', () => {
    const prefixedNameToken = this.OR([
      { ALT: () => this.CONSUME(turtleTokenMap.PNAME_LN) },
      { ALT: () => this.CONSUME(turtleTokenMap.PNAME_NS) },
    ]);
    const pnameNsImage = prefixedNameToken.image.slice(
      0,
      prefixedNameToken.image.indexOf(':')
    );
    if (!(pnameNsImage in this.namespacesMap)) {
      this.semanticErrors.push({
        name: 'NoNamespacePrefixError',
        message: 'A prefix was used for which there was no namespace defined.',
        token: prefixedNameToken,
        context: {
          ruleStack: (<any>this).getHumanReadableRuleStack(),
          ruleOccurrenceStack: [...(<any>this).RULE_OCCURRENCE_STACK],
        },
        resyncedTokens: [], // these don't really make sense for semantic errors, since they don't cause the parser to resync
      });
    }
  });

  BlankNode = this.RULE('BlankNode', () => {
    this.OR([
      { ALT: () => this.CONSUME(turtleTokenMap.BLANK_NODE_LABEL) },
      { ALT: () => this.CONSUME(turtleTokenMap.ANON) },
    ]);
  });
}
