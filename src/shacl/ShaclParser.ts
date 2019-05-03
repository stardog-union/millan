import { TurtleParser } from '../turtle/TurtleParser';
import {
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
  Parser,
} from 'chevrotain';
import { getShaclVisitor } from 'shacl/visitor';
const {
  getShaclTokenTypes,
  getShaclTokenMap,
  categoryTokenMap,
} = require('./tokens');
const { turtleTokenMap } = require('../turtle/tokens');

export class ShaclParser extends TurtleParser {
  private prefixes;
  private shaclTokenMap;
  private shaclVisitor: ReturnType<typeof getShaclVisitor>;
  protected lexer: Lexer;

  private visitCst = (cst: any) => {
    // To save resources while parsing, the shaclVisitor is a singleton.
    if (!this.shaclVisitor) {
      const BaseSrsVisitor = this.getBaseCstVisitorConstructorWithDefaults();
      this.shaclVisitor = getShaclVisitor(BaseSrsVisitor);
    } else {
      this.shaclVisitor.$resetState();
    }

    this.shaclVisitor.visit(cst);
    return this.shaclVisitor.$validateShapes(this.prefixes);
  };

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
    const { validationErrors } = this.visitCst(cst);
    // Next two items are copied so that they can be returned/held after parse
    // state is cleared.
    const errors: IRecognitionException[] = [...this.errors];
    const semanticErrors: IRecognitionException[] = [
      ...this.semanticErrors,
      ...validationErrors,
    ];

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

    this.prefixes = prefixes;
    this.lexer = new Lexer(getShaclTokenTypes(prefixes));
    this.shaclTokenMap = getShaclTokenMap(prefixes);
    Parser.performSelfAnalysis(this);
  }

  predicateObjectList = this.OVERRIDE_RULE('predicateObjectList', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.shaclRulePredicateObjectList);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.verb);
          this.SUBRULE(this.objectList);
        },
      },
    ]);
    this.MANY(() => {
      this.CONSUME(turtleTokenMap.Semicolon);
      this.OPTION(() => {
        this.OR1([
          {
            ALT: () => {
              this.SUBRULE1(this.shaclRulePredicateObjectList);
            },
          },
          {
            ALT: () => {
              this.SUBRULE1(this.verb);
              this.SUBRULE1(this.objectList);
            },
          },
        ]);
      });
    });
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
        {
          ALT: () => this.SUBRULE(this.shaclVerbShape),
        },
      ]);
    }
  );

  shaclPredicateIRI = this.RULE('shaclPredicateIRI', () => {
    this.CONSUME(categoryTokenMap.IriTakingPredicate);
    this.SUBRULE(this.iri); // FIXME? This may need to allow a list of IRIs, as with shaclTargetNode.
  });

  shaclNodeKind = this.RULE('shaclNodeKind', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_nodeKind);
    this.CONSUME(categoryTokenMap.NodeKindIRI);
  });

  shaclTargetNode = this.RULE('shaclTargetNode', () => {
    this.CONSUME(this.shaclTokenMap.SHACL_targetNode);
    this.SUBRULE(this.shaclIRIOrLiteral);
    this.MANY(() => {
      this.CONSUME(turtleTokenMap.Comma);
      this.SUBRULE1(this.shaclIRIOrLiteral);
    });
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
        ALT: () => this.SUBRULE(this.shaclPredicatePath),
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

  shaclPredicatePath = this.RULE('shaclPredicatePath', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.iri),
      },
      {
        // This case does not seem to be allowed by the SHACL spec, but the
        // online W3C validator accepts one level of parens wrapping the IRI.
        ALT: () => {
          this.CONSUME(turtleTokenMap.LParen);
          this.SUBRULE1(this.iri);
          this.CONSUME(turtleTokenMap.RParen);
        },
      },
    ]);
  });

  shaclSequencePath = this.RULE('shaclSequencePath', () => {
    this.CONSUME(turtleTokenMap.LParen);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.AT_LEAST_ONE(() => this.SUBRULE1(this.shaclPropertyPathPath));
    this.OPTION(() => this.CONSUME(turtleTokenMap.Semicolon));
    this.CONSUME(turtleTokenMap.RParen);
  });

  shaclAlternativePath = this.RULE('shaclAlternativePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_alternativePath);
    this.SUBRULE(this.shaclPropertyPathPath); // This does not match the SHACL spec, but it does match the test cases, which violate the spec. ;_;
    this.OPTION(() => this.CONSUME(turtleTokenMap.Semicolon));
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclInversePath = this.RULE('shaclInversePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_inversePath);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.OPTION(() => this.CONSUME(turtleTokenMap.Semicolon));
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclZeroOrMorePath = this.RULE('shaclZeroOrMorePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_zeroOrMorePath);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.OPTION(() => this.CONSUME(turtleTokenMap.Semicolon));
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclOneOrMorePath = this.RULE('shaclOneOrMorePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_oneOrMorePath);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.OPTION(() => this.CONSUME(turtleTokenMap.Semicolon));
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclZeroOrOnePath = this.RULE('shaclZeroOrOnePath', () => {
    this.CONSUME(turtleTokenMap.LBracket);
    this.CONSUME(this.shaclTokenMap.SHACL_zeroOrOnePath);
    this.SUBRULE(this.shaclPropertyPathPath);
    this.OPTION(() => this.CONSUME(turtleTokenMap.Semicolon));
    this.CONSUME(turtleTokenMap.RBracket);
  });

  shaclLiteralConstraint = this.RULE('shaclLiteralConstraint', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.shaclIntConstraint),
      },
      // TODO: Some specificity here is possibly unnecessary.
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
      {
        ALT: () => this.SUBRULE(this.shaclAnyLiteralConstraint),
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
    this.OR([
      {
        ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_select),
      },
      {
        ALT: () => this.CONSUME(this.shaclTokenMap.SHACL_ask),
      },
    ]);
    this.SUBRULE(this.String); // TODO: a bit too lax?
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
            ALT: () => {
              this.CONSUME(turtleTokenMap.DoubleCaret);
              this.CONSUME(this.shaclTokenMap.SHACL_xsd_string);
            },
          },
          {
            ALT: () => {
              this.CONSUME1(turtleTokenMap.DoubleCaret);
              this.CONSUME(this.shaclTokenMap.SHACL_xsd_anyURI);
            },
          },
        ]);
      });
    }
  );

  shaclLangStringConstraint = this.RULE('shaclLangStringConstraint', () => {
    this.CONSUME(categoryTokenMap.LangStringTakingPredicate);
    this.SUBRULE(this.String);
    this.OPTION(() => {
      this.OR([
        {
          ALT: () => this.CONSUME(turtleTokenMap.LANGTAG),
        },
        {
          ALT: () => {
            this.CONSUME(turtleTokenMap.DoubleCaret);
            this.CONSUME(this.shaclTokenMap.SHACL_xsd_string);
          },
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

  shaclAnyLiteralConstraint = this.RULE('shaclAnyLiteralConstraint', () => {
    this.CONSUME(categoryTokenMap.AnyLiteralTakingPredicate);
    this.SUBRULE(this.literal);
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
      {
        ALT: () => this.SUBRULE(this.BlankNode),
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
    this.SUBRULE(this.shaclStringWithDoubleCaret);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_boolean);
  });

  shaclXsdString = this.RULE('shaclXsdString', () => {
    this.SUBRULE(this.shaclStringWithDoubleCaret);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_string);
  });

  shaclXsdInteger = this.RULE('shaclXsdInteger', () => {
    this.SUBRULE(this.shaclStringWithDoubleCaret);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_integer);
  });

  shaclXsdDate = this.RULE('shaclXsdDate', () => {
    this.SUBRULE(this.shaclStringWithDoubleCaret);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_date);
  });

  shaclXsdAnyURI = this.RULE('shaclXsdAnyURI', () => {
    this.SUBRULE(this.shaclStringWithDoubleCaret);
    this.CONSUME(this.shaclTokenMap.SHACL_xsd_anyURI);
  });

  shaclStringWithDoubleCaret = this.RULE('shaclStringWithDoubleCaret', () => {
    this.SUBRULE(this.String);
    this.CONSUME(turtleTokenMap.DoubleCaret);
  });
}
