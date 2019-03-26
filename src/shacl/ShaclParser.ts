import { TurtleParser } from '../turtle/TurtleParser';
import {
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
  Parser,
} from 'chevrotain';
const {
  getShaclTokenTypes,
  getShaclTokenMap,
  categoryTokenMap,
} = require('./tokens');
const { turtleTokenMap } = require('../turtle/tokens');

export class ShaclParser extends TurtleParser {
  protected lexer: Lexer;
  private shaclTokenMap;

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (
    document: string
  ): {
    errors: IRecognitionException[];
    semanticErrors: IRecognitionException[];
    cst: any;
  } => {
    this.input = this.tokenize(document);
    const cst = this.turtleDoc();
    // Next two items are copied so that they can be returned/held after parse
    // state is cleared.
    const errors: IRecognitionException[] = [...this.errors];
    const semanticErrors: IRecognitionException[] = [...this.semanticErrors];

    return {
      errors,
      semanticErrors,
      cst,
    };
  };

  constructor(
    config?: Partial<IParserConfig>,
    prefixes = { shacl: 'sh', xsd: 'xsd' }
  ) {
    super(
      {
        outputCst: true,
        recoveryEnabled: true,
        ...config,
      },
      getShaclTokenTypes(prefixes),
      getShaclTokenTypes(prefixes),
      false
    );

    this.lexer = new Lexer(getShaclTokenTypes(prefixes));
    this.shaclTokenMap = getShaclTokenMap(prefixes);
    Parser.performSelfAnalysis(this);
  }

  triples = this.OVERRIDE_RULE('triples', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.subject);
          this.SUBRULE(this.shaclPredicateObjectList);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.blankNodePropertyList);
          this.OPTION(() => this.SUBRULE1(this.shaclPredicateObjectList));
        },
      },
    ]);
  });

  blankNodePropertyList = this.OVERRIDE_RULE('blankNodePropertyList', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.SUBRULE(this.shaclPredicateObjectList);
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclPredicateObjectList = this.RULE('shaclPredicateObjectList', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.shaclRulePredicateObjectList);
          this.MANY(() => {
            this.CONSUME(turtleTokenMap.Semicolon);
            this.OPTION(() => {
              this.SUBRULE1(this.shaclPredicateObjectList);
            });
          });
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.predicateObjectList);
        },
      },
    ]);
  });

  shaclRulePredicateObjectList = this.RULE(
    'shaclRulePredicateObjectList',
    () => {
      this.OR([
        {
          ALT: () => this.SUBRULE(this.shaclPredicateIRI),
        },
        {
          ALT: () => this.SUBRULE(this.shaclNodeKind),
        },
        {
          ALT: () => this.SUBRULE(this.shaclTargetNode),
        },
        {
          ALT: () => this.SUBRULE(this.shaclVerbShape),
        },
        {
          ALT: () => this.SUBRULE(this.shaclPropertyPath),
        },
        {
          ALT: () => this.SUBRULE(this.shaclLiteralConstraint),
        },
        {
          ALT: () => this.SUBRULE(this.shaclListTakingConstraint),
        },
        {
          ALT: () => this.SUBRULE(this.shaclShapeExpectingConstraint),
        },
        {
          ALT: () => this.SUBRULE(this.shaclHasValueConstraint),
        },
      ]);
    }
  );

  shaclPredicateIRI = this.RULE('shaclPredicateIRI', () => {
    this.CONSUME(categoryTokenMap.IriTakingPredicate);
    this.SUBRULE(this.iri);
  });

  shaclNodeKind = this.RULE('shaclNodeKind', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_nodeKind);
    this.CONSUME(categoryTokenMap.NodeKindIRI);
  });

  shaclTargetNode = this.RULE('shaclTargetNode', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_targetNode);
    this.SUBRULE(this.shaclIRIOrLiteral);
  });

  shaclVerbShape = this.RULE('shaclVerbShape', () => {
    this.SUBRULE(this.verb);
    this.SUBRULE(this.shaclShapeType);
    this.MANY(() => {
      this.CONSUME(turtleTokenMap.Comma);
      this.SUBRULE1(this.shaclShapeType);
    });
  });

  shaclShapeType = this.RULE('shaclShapeType', () => {
    this.OR([
      {
        ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_Shape),
      },
      {
        ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_NodeShape),
      },
      {
        ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_PropertyShape),
      },
    ]);
  });

  shaclPropertyPath = this.RULE('shaclPropertyPath', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_path);
    this.SUBRULE(this.shaclPropertyPathPath);
  });

  shaclPropertyPathPath = this.RULE('shaclPropertyPathPath', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.iri),
      },
      {
        ALT: () => this.SUBRULE(this.shaclSequencePath),
      },
      {
        ALT: () => this.SUBRULE(this.shaclAlternativePath),
      },
      {
        ALT: () => this.SUBRULE(this.shaclInversePath),
      },
      {
        ALT: () => this.SUBRULE(this.shaclZeroOrMorePath),
      },
      {
        ALT: () => this.SUBRULE(this.shaclOneOrMorePath),
      },
      {
        ALT: () => this.SUBRULE(this.shaclZeroOrOnePath),
      },
    ]);
  });

  shaclSequencePath = this.RULE('shaclSequencePath', () => {
    this.CONSUME(turtleTokenMap.LParen);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.AT_LEAST_ONE(() => this.SUBRULE1(this.shaclPropertyPathPath));
  });

  shaclAlternativePath = this.RULE('shaclAlternativePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_alternativePath);
    this.SUBRULE(this.shaclSequencePath);
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclInversePath = this.RULE('shaclInversePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_inversePath);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclZeroOrMorePath = this.RULE('shaclZeroOrMorePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_zeroOrMorePath);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclOneOrMorePath = this.RULE('shaclOneOrMorePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_oneOrMorePath);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclZeroOrOnePath = this.RULE('shaclZeroOrOnePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_zeroOrOnePath);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclLiteralConstraint = this.RULE('shaclLiteralConstraint', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.shaclIntConstraint),
      },
      {
        ALT: () => this.SUBRULE(this.shaclStringConstraint),
      },
      {
        ALT: () => this.SUBRULE(this.shaclStringLiteralQuoteConstraint),
      },
      {
        ALT: () => this.SUBRULE(this.shaclLangStringConstraint),
      },
      {
        ALT: () => this.SUBRULE(this.shaclBooleanConstraint),
      },
    ]);
  });

  shaclIntConstraint = this.RULE('shaclIntConstraint', () => {
    this.CONSUME(categoryTokenMap.IntTakingPredicate);
    this.OR([
      {
        ALT: () => this.CONSUME(turtleTokenMap.INTEGER),
      },
      {
        ALT: () => this.SUBRULE(this.shaclXsdInteger),
      },
    ]);
  });

  shaclStringConstraint = this.RULE('shaclStringConstraint', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_select);
    this.SUBRULE(this.String);
  });

  shaclStringLiteralQuoteConstraint = this.RULE(
    'shaclStringLiteralQuoteConstraint',
    () => {
      this.CONSUME(categoryTokenMap.StringLiteralQuoteTakingPredicate);
      this.CONSUME(turtleTokenMap.STRING_LITERAL_QUOTE);
      this.OPTION(() => {
        this.OR([
          {
            ALT: () => this.CONSUME(turtleTokenMap.LANGTAG),
          },
          {
            ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_xsd_string),
          },
          {
            ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_xsd_anyURI),
          },
        ]);
      });
    }
  );

  shaclLangStringConstraint = this.RULE('shaclLangStringConstraint', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_message);
    this.SUBRULE(this.String);
    this.OPTION(() => {
      this.OR([
        {
          ALT: () => this.CONSUME(turtleTokenMap.LANGTAG),
        },
        {
          ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_xsd_string),
        },
      ]);
    });
  });

  shaclBooleanConstraint = this.RULE('shaclBooleanConstraint', () => {
    this.CONSUME(categoryTokenMap.BooleanTakingPredicate);
    this.OR([
      {
        ALT: () => this.CONSUME(turtleTokenMap.TRUE),
      },
      {
        ALT: () => this.CONSUME(turtleTokenMap.FALSE),
      },
      {
        ALT: () => this.SUBRULE(this.shaclXsdBoolean),
      },
    ]);
  });

  shaclListTakingConstraint = this.RULE('shaclListTakingConstraint', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.shaclLanguageInConstraint),
      },
      {
        ALT: () => this.SUBRULE(this.shaclShapeListTakingConstraint),
      },
      {
        ALT: () => this.SUBRULE(this.shaclIRIListTakingConstraint),
      },
      {
        ALT: () => this.SUBRULE(this.shaclShapeOrLiteralListTakingConstraint),
      },
    ]);
  });

  shaclLanguageInConstraint = this.RULE('shaclLanguageInConstraint', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_languageIn);
    this.SUBRULE(this.shaclStringCollection);
  });

  shaclStringCollection = this.RULE('shaclStringCollection', () => {
    this.CONSUME(turtleTokenMap.LParen);
    this.MANY(() => {
      this.CONSUME(turtleTokenMap.STRING_LITERAL_QUOTE);
    });
    this.CONSUME(turtleTokenMap.RParen);
  });

  shaclShapeListTakingConstraint = this.RULE(
    'shaclShapeListTakingConstraint',
    () => {
      this.OR([
        {
          ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_and),
        },
        {
          ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_or),
        },
        {
          ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_xone),
        },
      ]);
      this.SUBRULE(this.shaclShapeCollection);
    }
  );

  shaclShapeCollection = this.RULE('shaclShapeCollection', () => {
    this.CONSUME(turtleTokenMap.LParen);
    this.MANY(() => {
      this.SUBRULE(this.shaclShape);
    });
    this.CONSUME(turtleTokenMap.RParen);
  });

  shaclIRIListTakingConstraint = this.RULE(
    'shaclIRIListTakingConstraint',
    () => {
      this.CONSUME(this.shaclTokenMap.SHACL_ignoredProperties);
      this.SUBRULE(this.shaclIRICollection);
    }
  );

  shaclIRICollection = this.RULE('shaclIRICollection', () => {
    this.CONSUME(turtleTokenMap.LParen);
    this.MANY(() => {
      this.SUBRULE(this.iri);
    });
    this.CONSUME(turtleTokenMap.RParen);
  });

  shaclShapeOrLiteralListTakingConstraint = this.RULE(
    'shaclShapeOrLiteralListTakingConstraint',
    () => {
      this.CONSUME(this.shaclTokenMap.SHACL_in);
      this.SUBRULE(this.shaclShapeOrLiteralCollection);
    }
  );

  shaclShapeOrLiteralCollection = this.RULE(
    'shaclShapeOrLiteralCollection',
    () => {
      this.CONSUME(turtleTokenMap.LParen);
      this.MANY(() => {
        this.SUBRULE(this.shaclShapeOrLiteral);
      });
      this.CONSUME(turtleTokenMap.RParen);
    }
  );

  shaclShapeExpectingConstraint = this.RULE(
    'shaclShapeExpectingConstraint',
    () => {
      this.CONSUME(categoryTokenMap.ShapeExpectingPredicate);
      this.SUBRULE(this.shaclShape);
    }
  );

  shaclHasValueConstraint = this.RULE('shaclHasValueConstraint', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_hasValue);
    this.SUBRULE(this.shaclShapeOrLiteral);
  });

  shaclShape = this.RULE('shaclShape', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.iri),
      },
      {
        ALT: () => this.SUBRULE(this.blankNodePropertyList),
      },
    ]);
  });

  shaclShapeOrLiteral = this.RULE('shaclShapeOrLiteral', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.shaclShape),
      },
      {
        ALT: () => this.SUBRULE(this.literal),
      },
    ]);
  });

  shaclIRIOrLiteral = this.RULE('shaclIRIOrLiteral', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.iri),
      },
      {
        ALT: () => this.SUBRULE(this.literal),
      },
    ]);
  });

  shaclXsdBoolean = this.RULE('shaclXsdBoolean', () => {
    this.SUBRULE(this.String);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_boolean);
  });

  shaclXsdString = this.RULE('shaclXsdString', () => {
    this.SUBRULE(this.String);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_string);
  });

  shaclXsdInteger = this.RULE('shaclXsdInteger', () => {
    this.SUBRULE(this.String);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_integer);
  });

  shaclXsdDate = this.RULE('shaclXsdDate', () => {
    this.SUBRULE(this.String);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_date);
  });

  shaclXsdAnyURI = this.RULE('shaclXsdAnyURI', () => {
    this.SUBRULE(this.String);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_anyURI);
  });
}
