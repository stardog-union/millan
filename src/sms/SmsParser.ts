import {
  Parser,
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
  TokenType,
} from 'chevrotain';
import { tokenMap } from './tokens';

export class SmsParser extends Parser {
  private lexer: Lexer;

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string) => {
    this.input = this.lexer.tokenize(document).tokens;
    const cst = this.MappingDoc();
    const errors: IRecognitionException[] = this.errors;
    return {
      errors,
      cst,
    };
  };

  constructor(
    options: {
      input?: IToken[];
      config?: Partial<IParserConfig>;
    } = {},
    tokenVocab: TokenType[]
  ) {
    super(options.input || [], tokenVocab, {
      recoveryEnabled: true,
      outputCst: true,
      ...options.config,
    });

    this.lexer = new Lexer(tokenVocab);

    Parser.performSelfAnalysis(this);
  }

  MappingDoc = this.RULE('MappingDoc', () => {
    this.MANY(() => this.SUBRULE(this.PrefixDecl));

    this.SUBRULE(this.MappingClause);
    this.MANY1(() => {
      this.CONSUME(tokenMap.Semicolon);
      this.SUBRULE1(this.MappingClause);
    });
  });

  MappingClause = this.RULE('MappingClause', () => {
    this.SUBRULE(this.MappingDecl);
    this.SUBRULE(this.FromClause);
    this.SUBRULE(this.ToClause);
    this.SUBRULE(this.WhereClause);
  });

  MappingDecl = this.RULE('MappingDecl', () => {
    this.CONSUME(tokenMap.Mapping);
    this.OPTION(() => this.SUBRULE(this.iri));
  });

  FromClause = this.RULE('FromClause', () => {
    this.CONSUME(tokenMap.FROM);
    this.OR([
      {
        ALT: () => this.SUBRULE(this.SqlClause),
      },
      {
        ALT: () => this.SUBRULE(this.JsonClause),
      },
      {
        ALT: () => this.SUBRULE(this.GraphQlClause),
      },
    ]);
  });

  JsonClause = this.RULE('JsonClause', () => {
    this.CONSUME(tokenMap.Json);
    // this.CONSUME(tokenMap.LCurly);
    this.CONSUME(tokenMap.JsonBlock);
    // this.CONSUME(tokenMap.RCurly);
  });

  GraphQlClause = this.RULE('GraphQlClause', () => {
    this.CONSUME(tokenMap.GraphQl);
    this.CONSUME(tokenMap.LCurly);
    this.CONSUME(tokenMap.GraphQlBlock);
    this.CONSUME(tokenMap.RCurly);
  });

  SqlClause = this.RULE('SqlClause', () => {
    this.CONSUME(tokenMap.Sql);
    this.CONSUME(tokenMap.LCurly);
    this.CONSUME(tokenMap.SqlBlock);
    this.CONSUME(tokenMap.RCurly);
  });

  ToClause = this.RULE('ToClause', () => {
    this.CONSUME(tokenMap.TO);
    this.SUBRULE(this.ConstructTemplate);
  });

  WhereClause = this.RULE('WhereClause', () => {
    this.CONSUME(tokenMap.WHERE);
    this.CONSUME(tokenMap.LCurly);
    this.MANY(() => this.SUBRULE(this.Bind));
    this.CONSUME(tokenMap.RCurly);
  });

  Bind = this.RULE('Bind', () => {
    this.CONSUME(tokenMap.BIND);
    this.CONSUME(tokenMap.LParen);
    this.SUBRULE(this.Expression);
    this.CONSUME(tokenMap.AS);
    this.SUBRULE(this.Var);
    this.CONSUME(tokenMap.RParen);
  });

  Expression = this.RULE('Expression', () => {
    this.SUBRULE(this.BuiltInCall);
  });

  BuiltInCall = this.RULE('BuiltInCall', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.TemplateFunc),
      },
      {
        ALT: () => this.SUBRULE(this.iriOrFunction),
      },
    ]);
  });

  TemplateFunc = this.RULE('TemplateFunc', () => {
    this.CONSUME(tokenMap.Template);
    this.CONSUME(tokenMap.LParen);
    this.SUBRULE(this.String);
    this.CONSUME(tokenMap.RParen);
  });

  //
  // Dupes from Sparql
  //
  PrefixDecl = this.RULE('PrefixDecl', () => {
    this.CONSUME(tokenMap.PREFIX);
    this.CONSUME(tokenMap.PNAME_NS);
    this.CONSUME(tokenMap.IRIREF);
  });

  iri = this.RULE('iri', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.IRIREF) },
      { ALT: () => this.SUBRULE(this.PrefixedName) },
    ]);
  });

  PrefixedName = this.RULE('PrefixedName', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.PNAME_LN) },
      { ALT: () => this.CONSUME(tokenMap.PNAME_NS) },
    ]);
  });

  ConstructTemplate = this.RULE('ConstructTemplate', () => {
    this.CONSUME(tokenMap.LCurly);
    this.OPTION(() => this.SUBRULE(this.ConstructTriples));
    this.CONSUME(tokenMap.RCurly);
  });

  ConstructTriples = this.RULE('ConstructTriples', () => {
    this.SUBRULE(this.TriplesSameSubject);
    this.OPTION(() => {
      this.CONSUME(tokenMap.Period);
      this.OPTION1(() => this.SUBRULE(this.ConstructTriples));
    });
  });

  TriplesSameSubject = this.RULE('TriplesSameSubject', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.VarOrTerm);
          this.SUBRULE(this.PropertyListNotEmpty);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.TriplesNode);
          this.SUBRULE(this.PropertyList);
        },
      },
    ]);
  });

  VarOrTerm = this.RULE('VarOrTerm', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.Var) },
      { ALT: () => this.SUBRULE(this.GraphTerm) },
    ]);
  });

  PropertyListNotEmpty = this.RULE('PropertyListNotEmpty', () => {
    this.SUBRULE(this.Verb);
    this.SUBRULE(this.ObjectList);
    this.MANY(() => {
      this.CONSUME(tokenMap.Semicolon);
      this.OPTION(() => {
        this.SUBRULE1(this.Verb);
        this.SUBRULE1(this.ObjectList);
      });
    });
  });

  TriplesNode = this.RULE('TriplesNode', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.Collection) },
      { ALT: () => this.SUBRULE(this.BlankNodePropertyList) },
    ]);
  });

  PropertyList = this.RULE('PropertyList', () => {
    this.OPTION(() => this.SUBRULE(this.PropertyListNotEmpty));
  });

  GraphTerm = this.RULE('GraphTerm', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.RDFLiteral) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) },
      { ALT: () => this.SUBRULE(this.BooleanLiteral) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.CONSUME(tokenMap.NIL) },
    ]);
  });

  Verb = this.RULE('Verb', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.VarOrIri) },
      { ALT: () => this.CONSUME(tokenMap.A) },
    ]);
  });

  ObjectList = this.RULE('ObjectList', () => {
    this.AT_LEAST_ONE_SEP({
      SEP: tokenMap.Comma,
      DEF: () => this.SUBRULE(this.Object),
    });
  });

  Object = this.RULE('Object', () => {
    this.SUBRULE(this.GraphNode);
  });

  Collection = this.RULE('Collection', () => {
    this.CONSUME(tokenMap.LParen);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNode));
    this.CONSUME(tokenMap.RParen);
  });

  BlankNodePropertyList = this.RULE('BlankNodePropertyList', () => {
    this.CONSUME(tokenMap.LBracket);
    this.SUBRULE(this.PropertyListNotEmpty);
    this.CONSUME(tokenMap.RBracket);
  });

  VarOrIri = this.RULE('VarOrIri', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.Var) },
      { ALT: () => this.SUBRULE(this.iri) },
    ]);
  });

  RDFLiteral = this.RULE('RDFLiteral', () => {
    this.SUBRULE(this.String);
    this.OPTION(() =>
      this.OR([
        { ALT: () => this.CONSUME(tokenMap.LANGTAG) },
        {
          ALT: () => {
            this.CONSUME(tokenMap.DoubleCaret);
            this.SUBRULE(this.iri);
          },
        },
      ])
    );
  });

  NumericLiteral = this.RULE('NumericLiteral', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.NumericLiteralUnsigned) },
      { ALT: () => this.SUBRULE(this.NumericLiteralPositive) },
      { ALT: () => this.SUBRULE(this.NumericLiteralNegative) },
    ]);
  });

  NumericLiteralUnsigned = this.RULE('NumericLiteralUnsigned', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.INTEGER) },
      { ALT: () => this.CONSUME(tokenMap.DECIMAL) },
      { ALT: () => this.CONSUME(tokenMap.DOUBLE) },
    ]);
  });

  NumericLiteralPositive = this.RULE('NumericLiteralPositive', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.INTEGER_POSITIVE) },
      { ALT: () => this.CONSUME(tokenMap.DECIMAL_POSITIVE) },
      { ALT: () => this.CONSUME(tokenMap.DOUBLE_POSITIVE) },
    ]);
  });

  NumericLiteralNegative = this.RULE('NumericLiteralNegative', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.INTEGER_NEGATIVE) },
      { ALT: () => this.CONSUME(tokenMap.DECIMAL_NEGATIVE) },
      { ALT: () => this.CONSUME(tokenMap.DOUBLE_NEGATIVE) },
    ]);
  });

  BooleanLiteral = this.RULE('BooleanLiteral', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.TRUE) },
      { ALT: () => this.CONSUME(tokenMap.FALSE) },
    ]);
  });

  BlankNode = this.RULE('BlankNode', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.BLANK_NODE_LABEL) },
      { ALT: () => this.CONSUME(tokenMap.ANON) },
    ]);
  });

  GraphNode = this.RULE('GraphNode', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.VarOrTerm) },
      { ALT: () => this.SUBRULE(this.TriplesNode) },
    ]);
  });

  Var = this.RULE('Var', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.VAR1) },
      { ALT: () => this.CONSUME(tokenMap.VAR2) },
    ]);
  });

  iriOrFunction = this.RULE('iriOrFunction', () => {
    this.SUBRULE(this.iri);
    this.OPTION(() => this.SUBRULE(this.ArgList));
  });

  ArgList = this.RULE('ArgList', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.NIL) },
      {
        ALT: () => {
          this.CONSUME(tokenMap.LParen);
          this.OPTION(() => this.CONSUME(tokenMap.DISTINCT));
          this.SUBRULE(this.Expression);
          this.MANY(() => {
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
          });
          this.CONSUME(tokenMap.RParen);
        },
      },
    ]);
  });

  String = this.RULE('String', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL1) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL2) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG1) },
      { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG2) },
    ]);
  });
}
