const { turtleTokenTypes, turtleTokenMap } = require('./tokens');
import {
  CstParser,
  IParserConfig,
  Lexer,
  IToken,
  IRecognitionException,
  IMultiModeLexerDefinition,
  TokenType,
} from 'chevrotain';
import { IStardogParser, ModeString } from '../helpers/chevrotain/types';

export class TurtleParser extends CstParser implements IStardogParser {
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
    const cst = this.turtleDoc(mode);
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
      recoveryEnabled: true,
      ...config,
    });
    this.lexer = new Lexer(lexerDefinition);

    if (performSelfAnalysis) {
      this.performSelfAnalysis();
    }
  }

  turtleDoc = this.RULE('turtleDoc', (mode?: ModeString) => {
    const allowEdgeProperties = mode === 'stardog';
    this.MANY(() =>
      this.SUBRULE(this.statement, { ARGS: [allowEdgeProperties] })
    );
  });

  statement = this.RULE('statement', (allowEdgeProperties?: boolean) => {
    this.OR([
      { ALT: () => this.SUBRULE(this.directive) },
      {
        ALT: () => {
          this.SUBRULE(this.triples, { ARGS: [allowEdgeProperties] });
          this.CONSUME(turtleTokenMap.Period);
        },
      },
    ]);
  });

  directive = this.RULE('directive', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.prefixID) },
      { ALT: () => this.SUBRULE(this.base) },
      { ALT: () => this.SUBRULE(this.version) },
      { ALT: () => this.SUBRULE(this.sparqlPrefix) },
      { ALT: () => this.SUBRULE(this.sparqlBase) },
      { ALT: () => this.SUBRULE(this.sparqlVersion) },
    ]);
  });

  prefixID = this.RULE('prefixID', () => {
    this.CONSUME(turtleTokenMap.TTL_PREFIX);

    const pnameNsToken = this.CONSUME(turtleTokenMap.PNAME_NS);
    const iriToken = this.CONSUME(turtleTokenMap.IRIREF);
    this.ACTION(() => {
      const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
      const iriImage = iriToken.image;
      this.namespacesMap[pnameImageWithoutColon] = iriImage;
    });

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

  // RDF 1.2: https://www.w3.org/TR/rdf12-turtle/#grammar-production-version
  version = this.RULE('version', () => {
    this.CONSUME(turtleTokenMap.TTL_VERSION);
    this.SUBRULE(this.VersionSpecifier);
    this.CONSUME(turtleTokenMap.Period);
  });

  // RDF 1.2: https://www.w3.org/TR/rdf12-turtle/#grammar-production-sparqlVersion
  sparqlVersion = this.RULE('sparqlVersion', () => {
    this.CONSUME(turtleTokenMap.VERSION);
    this.SUBRULE(this.VersionSpecifier);
  });

  // RDF 1.2: https://www.w3.org/TR/rdf12-turtle/#grammar-production-VersionSpecifier
  VersionSpecifier = this.RULE('VersionSpecifier', () => {
    this.OR([
      { ALT: () => this.CONSUME(turtleTokenMap.STRING_LITERAL_QUOTE) },
      { ALT: () => this.CONSUME(turtleTokenMap.STRING_LITERAL_SINGLE_QUOTE) },
    ]);
  });

  sparqlPrefix = this.RULE('sparqlPrefix', () => {
    this.CONSUME(turtleTokenMap.PREFIX);
    const pnameNsToken = this.CONSUME(turtleTokenMap.PNAME_NS);
    const iriToken = this.CONSUME(turtleTokenMap.IRIREF);
    this.ACTION(() => {
      const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
      const iriImage = iriToken.image;
      this.namespacesMap[pnameImageWithoutColon] = iriImage;
    });
  });

  // NOTE: Not part of Turtle spec. Part of Stardog's support for edge
  // properties/embedded triples/a subset of RDF*.
  // ALSO NOTE: Intentionally does not conform to the RDF* spec.
  // Stardog does not allow nesting of embedded triples.
  triples = this.RULE('triples', (allowEdgeProperties?: boolean) => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.subject, { ARGS: [allowEdgeProperties] });
          this.SUBRULE1(this.predicateObjectList, {
            ARGS: [allowEdgeProperties],
          });
        },
      },
      {
        GATE: () => Boolean(allowEdgeProperties),
        ALT: () => {
          this.SUBRULE(this.EmbeddedTriplePattern);
          this.SUBRULE(this.predicateObjectList);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.blankNodePropertyList, {
            ARGS: [allowEdgeProperties],
          });
          this.OPTION(() =>
            this.SUBRULE2(this.predicateObjectList, {
              ARGS: [allowEdgeProperties],
            })
          );
        },
      },
      {
        // RDF 1.2 reified triple as subject. NOTE: `allowEdgeProperties`
        // is three-state: true means stardog mode (where '<<' instead
        // introduces Stardog's differently-shaped embedded triple pattern,
        // above), false means standard mode (RDF 1.2), and undefined means
        // a restricted nested context (e.g. inside a Stardog embedded
        // triple pattern) where neither extension is allowed.
        GATE: () => allowEdgeProperties === false,
        ALT: () => {
          this.SUBRULE(this.reifiedTriple);
          this.OPTION1(() =>
            this.SUBRULE3(this.predicateObjectList, {
              ARGS: [allowEdgeProperties],
            })
          );
        },
      },
    ]);
  });

  // NOTE: Not part of Turtle spec. Part of Stardog's support for edge
  // properties/embedded triples/a subset of RDF*.
  // ALSO NOTE: Intentionally does not conform to the RDF* spec.
  // Stardog does not allow nesting of embedded triples.
  EmbeddedTriplePattern = this.RULE('EmbeddedTriplePattern', () => {
    this.CONSUME(turtleTokenMap.LEmbed);
    this.SUBRULE(this.triples);
    this.CONSUME(turtleTokenMap.REmbed);
  });

  // NOTE: Not part of Turtle spec. Part of Stardog's support for edge
  // properties/embedded triples/a subset of RDF*.
  // ALSO NOTE: Intentionally does not conform to the RDF* spec.
  // Stardog does not allow embedded triples with object lists.
  predicateObjectList = this.RULE(
    'predicateObjectList',
    (allowEdgeProperties?: boolean) => {
      this.SUBRULE(this.verb);
      this.OR([
        {
          ALT: () =>
            this.SUBRULE(this.objectList, { ARGS: [allowEdgeProperties] }),
        },
        {
          GATE: () => Boolean(allowEdgeProperties),
          ALT: () => {
            this.SUBRULE(this.EmbeddedPredicateObjectList);
            this.SUBRULE(this.object, { ARGS: [allowEdgeProperties] });
          },
        },
      ]);
      this.MANY(() => {
        this.CONSUME(turtleTokenMap.Semicolon);
        this.OPTION(() => {
          this.SUBRULE1(this.verb);
          this.OR1([
            {
              ALT: () =>
                this.SUBRULE1(this.objectList, { ARGS: [allowEdgeProperties] }),
            },
            {
              GATE: () => Boolean(allowEdgeProperties),
              ALT: () => {
                this.SUBRULE1(this.EmbeddedPredicateObjectList);
                this.SUBRULE1(this.object, { ARGS: [allowEdgeProperties] });
              },
            },
          ]);
        });
      });
    }
  );

  // NOTE: Not part of Turtle spec. Part of Stardog's support for edge
  // properties/embedded triples/a subset of RDF*.
  // ALSO NOTE: Intentionally does not conform to the RDF* spec.
  // Stardog does not allow nesting of embedded triples.
  EmbeddedPredicateObjectList = this.RULE('EmbeddedPredicateObjectList', () => {
    this.CONSUME(turtleTokenMap.LCurly);
    this.SUBRULE(this.predicateObjectList);
    this.CONSUME(turtleTokenMap.RCurly);
  });

  subject = this.RULE('subject', (allowEdgeProperties?: boolean) => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      {
        ALT: () =>
          this.SUBRULE(this.collection, { ARGS: [allowEdgeProperties] }),
      },
    ]);
  });

  predicate = this.RULE('predicate', () => {
    this.SUBRULE(this.iri);
  });

  // RDF 1.2: each object may be followed by an annotation (reifiers and/or
  // annotation blocks). The annotation node is only present in the CST when
  // an annotation actually appears, which is why `annotation` is
  // AT_LEAST_ONE wrapped in OPTION here rather than MANY (a possibly-empty
  // rule cannot be a chevrotain OPTION body).
  objectList = this.RULE('objectList', (allowEdgeProperties?: boolean) => {
    this.SUBRULE(this.object, { ARGS: [allowEdgeProperties] });
    this.OPTION({
      GATE: () => allowEdgeProperties === false,
      DEF: () => this.SUBRULE(this.annotation),
    });
    this.MANY(() => {
      this.CONSUME(turtleTokenMap.Comma);
      this.SUBRULE1(this.object, { ARGS: [allowEdgeProperties] });
      this.OPTION1({
        GATE: () => allowEdgeProperties === false,
        DEF: () => this.SUBRULE1(this.annotation),
      });
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

  blankNodePropertyList = this.RULE(
    'blankNodePropertyList',
    (allowEdgeProperties?: boolean) => {
      this.CONSUME(turtleTokenMap.LBracket);
      this.SUBRULE(this.predicateObjectList, { ARGS: [allowEdgeProperties] });
      this.CONSUME(turtleTokenMap.RBracket);
    }
  );

  object = this.RULE('object', (allowEdgeProperties?: boolean) => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      {
        ALT: () =>
          this.SUBRULE(this.collection, { ARGS: [allowEdgeProperties] }),
      },
      {
        ALT: () =>
          this.SUBRULE(this.blankNodePropertyList, {
            ARGS: [allowEdgeProperties],
          }),
      },
      { ALT: () => this.SUBRULE(this.literal) },
      {
        // RDF 1.2, standard mode only (see the note on `triples`):
        GATE: () => allowEdgeProperties === false,
        ALT: () => this.SUBRULE(this.tripleTerm),
      },
      {
        GATE: () => allowEdgeProperties === false,
        ALT: () => this.SUBRULE(this.reifiedTriple),
      },
    ]);
  });

  collection = this.RULE('collection', (allowEdgeProperties?: boolean) => {
    this.CONSUME(turtleTokenMap.LParen);
    this.MANY(() => this.SUBRULE(this.object, { ARGS: [allowEdgeProperties] }));
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
        // RDF 1.2: LANG_DIR is a language tag with an optional base
        // direction suffix (e.g. "@en--ltr"); a superset of 1.1's LANGTAG.
        { ALT: () => this.CONSUME(turtleTokenMap.LANG_DIR) },
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
    // ACTION so that this semantic check is skipped during chevrotain's
    // grammar recording phase, when tokens are only dummies.
    this.ACTION(() => {
      const pnameNsImage = prefixedNameToken.image.slice(
        0,
        prefixedNameToken.image.indexOf(':')
      );
      if (!(pnameNsImage in this.namespacesMap)) {
        this.semanticErrors.push({
          name: 'NoNamespacePrefixError',
          message:
            'A prefix was used for which there was no namespace defined.',
          token: prefixedNameToken,
          context: {
            ruleStack: (<any>this).getHumanReadableRuleStack(),
            ruleOccurrenceStack: [...(<any>this).RULE_OCCURRENCE_STACK],
          },
          resyncedTokens: [], // these don't really make sense for semantic errors, since they don't cause the parser to resync
        });
      }
    });
  });

  BlankNode = this.RULE('BlankNode', () => {
    this.OR([
      { ALT: () => this.CONSUME(turtleTokenMap.BLANK_NODE_LABEL) },
      { ALT: () => this.CONSUME(turtleTokenMap.ANON) },
    ]);
  });

  // The following productions are new in RDF 1.2:
  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-reifier
  reifier = this.RULE('reifier', () => {
    this.CONSUME(turtleTokenMap.Tilde);
    this.OPTION(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.iri) },
        { ALT: () => this.SUBRULE(this.BlankNode) },
      ]);
    });
  });

  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-reifiedTriple
  reifiedTriple = this.RULE('reifiedTriple', () => {
    this.CONSUME(turtleTokenMap.LEmbed);
    this.SUBRULE(this.rtSubject);
    this.SUBRULE(this.verb);
    this.SUBRULE(this.rtObject);
    this.OPTION(() => this.SUBRULE(this.reifier));
    this.CONSUME(turtleTokenMap.REmbed);
  });

  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-rtSubject
  rtSubject = this.RULE('rtSubject', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.SUBRULE(this.reifiedTriple) },
    ]);
  });

  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-rtObject
  rtObject = this.RULE('rtObject', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.SUBRULE(this.literal) },
      { ALT: () => this.SUBRULE(this.tripleTerm) },
      { ALT: () => this.SUBRULE(this.reifiedTriple) },
    ]);
  });

  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-tripleTerm
  tripleTerm = this.RULE('tripleTerm', () => {
    this.CONSUME(turtleTokenMap.LTripleTerm);
    this.SUBRULE(this.ttSubject);
    this.SUBRULE(this.verb);
    this.SUBRULE(this.ttObject);
    this.CONSUME(turtleTokenMap.RTripleTerm);
  });

  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-ttSubject
  ttSubject = this.RULE('ttSubject', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
    ]);
  });

  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-ttObject
  ttObject = this.RULE('ttObject', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.SUBRULE(this.literal) },
      { ALT: () => this.SUBRULE(this.tripleTerm) },
    ]);
  });

  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-annotation
  // NOTE: the spec's `annotation` can be empty; the CST omits the node
  // entirely in that case (see objectList), so this rule requires at least
  // one reifier or annotation block.
  annotation = this.RULE('annotation', () => {
    this.AT_LEAST_ONE(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.reifier) },
        { ALT: () => this.SUBRULE(this.annotationBlock) },
      ]);
    });
  });

  // https://www.w3.org/TR/rdf12-turtle/#grammar-production-annotationBlock
  annotationBlock = this.RULE('annotationBlock', () => {
    this.CONSUME(turtleTokenMap.LAnnotation);
    // Annotation blocks only exist in standard (RDF 1.2) mode, so pass
    // `false` explicitly to keep RDF 1.2 constructs available inside them.
    this.SUBRULE(this.predicateObjectList, { ARGS: [false] });
    this.CONSUME(turtleTokenMap.RAnnotation);
  });
}
