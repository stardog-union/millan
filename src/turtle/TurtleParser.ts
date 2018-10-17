import {
  Parser,
  IParserConfig,
  Lexer,
  IToken,
  IRecognitionException,
} from 'chevrotain';
import { tokenTypes, tokenMap } from './tokens';
import { IStardogParser } from '../types';

export class TurtleParser extends Parser implements IStardogParser {
  private lexer: Lexer;

  // Parsing Turtle requires that the parser keep a map of namespaces in state.
  // Empty prefixes, for example, are allowed only if the empty prefix has been
  // added to the namespaces map (for now, that's all this tracks). (TODO: We
  // might want to use a visitor for this, but I'm doing it quick-and-dirty for
  // now.)
  // See here: https://www.w3.org/TR/turtle/#handle-PNAME_LN
  private namespacesMap = {};
  private semanticErrors = [];

  // Clears the state that we have to manage on our own for each parse (see
  // above for details).
  private resetManagedState = () => {
    this.namespacesMap = {};
    this.semanticErrors = [];
  };

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string) => {
    this.input = this.lexer.tokenize(document).tokens;
    const cst = this.turtleDoc();
    // Next two items are copied so that they can be returned/held after parse
    // state is cleared.
    const errors: IRecognitionException[] = [...this.errors];
    const semanticErrors = [...this.semanticErrors];
    this.resetManagedState();

    return {
      errors,
      semanticErrors,
      cst,
    };
  };

  constructor(config?: Partial<IParserConfig>) {
    super([], tokenTypes, {
      outputCst: true,
      recoveryEnabled: true,
      ...config,
    });
    this.lexer = new Lexer(tokenTypes);

    Parser.performSelfAnalysis(this);
  }

  turtleDoc = this.RULE('turtleDoc', () => {
    this.MANY(() => this.SUBRULE(this.statement));
  });

  statement = this.RULE('statement', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.directive) },
      {
        ALT: () => {
          this.SUBRULE(this.triples);
          this.CONSUME(tokenMap.Period);
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
    this.CONSUME(tokenMap.TTL_PREFIX);

    const pnameNsToken = this.CONSUME(tokenMap.PNAME_NS);
    const iriToken = this.CONSUME(tokenMap.IRIREF);
    const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
    const iriImage = iriToken.image;
    this.namespacesMap[pnameImageWithoutColon] = iriImage;

    this.CONSUME(tokenMap.Period);
  });

  base = this.RULE('base', () => {
    this.CONSUME(tokenMap.TTL_BASE);
    this.CONSUME(tokenMap.IRIREF);
    this.CONSUME(tokenMap.Period);
  });

  sparqlBase = this.RULE('sparqlBase', () => {
    this.CONSUME(tokenMap.BASE);
    this.CONSUME(tokenMap.IRIREF);
  });

  sparqlPrefix = this.RULE('sparqlPrefix', () => {
    this.CONSUME(tokenMap.PREFIX);
    const pnameNsToken = this.CONSUME(tokenMap.PNAME_NS);
    const iriToken = this.CONSUME(tokenMap.IRIREF);
    const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
    const iriImage = iriToken.image;
    this.namespacesMap[pnameImageWithoutColon] = iriImage;
  });

  triples = this.RULE('triples', () => {
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

  predicateObjectList = this.RULE('predicateObjectList', () => {
    this.SUBRULE(this.verb);
    this.SUBRULE(this.objectList);
    this.OPTION(() => {
      this.CONSUME(tokenMap.Semicolon);
      this.OPTION1(() => {
        this.SUBRULE1(this.verb);
        this.SUBRULE1(this.objectList);
      });
    });
    this.MANY(() => {
      this.CONSUME1(tokenMap.Semicolon);
      this.OPTION2(() => {
        this.SUBRULE2(this.verb);
        this.SUBRULE2(this.objectList);
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
      this.CONSUME(tokenMap.Comma);
      this.SUBRULE1(this.object);
    });
  });

  verb = this.RULE('verb', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.predicate) },
      { ALT: () => this.CONSUME(tokenMap.A) },
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
    this.CONSUME(tokenMap.LBracket);
    this.SUBRULE(this.predicateObjectList);
    this.CONSUME(tokenMap.RBracket);
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
    this.CONSUME(tokenMap.LParen);
    this.MANY(() => this.SUBRULE(this.object));
    this.CONSUME(tokenMap.RParen);
  });

  NumericLiteral = this.RULE('NumericLiteral', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.INTEGER) },
      { ALT: () => this.CONSUME(tokenMap.DECIMAL) },
      { ALT: () => this.CONSUME(tokenMap.DOUBLE) },
    ]);
  });

  RDFLiteral = this.RULE('RDFLiteral', () => {
    this.SUBRULE(this.String);
    this.OPTION(() => {
      this.OR([
        { ALT: () => this.CONSUME(tokenMap.LANGTAG) },
        {
          ALT: () => {
            this.CONSUME(tokenMap.DoubleCaret);
            this.SUBRULE(this.iri);
          },
        },
      ]);
    });
  });

  BooleanLiteral = this.RULE('BooleanLiteral', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.TRUE) },
      { ALT: () => this.CONSUME(tokenMap.FALSE) },
    ]);
  });

  String = this.RULE('String', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_QUOTE) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_SINGLE_QUOTE) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG_QUOTE) },
    ]);
  });

  iri = this.RULE('iri', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.IRIREF) },
      { ALT: () => this.SUBRULE(this.PrefixedName) },
    ]);
  });

  PrefixedName = this.RULE('PrefixedName', () => {
    const prefixedNameToken = this.OR([
      { ALT: () => this.CONSUME(tokenMap.PNAME_LN) },
      { ALT: () => this.CONSUME(tokenMap.PNAME_NS) },
    ]);
    const pnameNsImage = prefixedNameToken.image.slice(
      0,
      prefixedNameToken.image.indexOf(':')
    );
    if (!(pnameNsImage in this.namespacesMap)) {
      this.semanticErrors.push({
        message: 'A prefix was used for which there was no namespace defined.',
      });
    }
  });

  BlankNode = this.RULE('BlankNode', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.BLANK_NODE_LABEL) },
      { ALT: () => this.CONSUME(tokenMap.ANON) },
    ]);
  });
}
