const { smsTokenTypes, smsTokenMap } = require('./tokens');
import {
  Parser,
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
} from 'chevrotain';

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

  constructor(config?: Partial<IParserConfig>) {
    super(smsTokenTypes, {
      outputCst: true,
      recoveryEnabled: true,
      ...config,
    });
    this.lexer = new Lexer(smsTokenTypes);

    Parser.performSelfAnalysis(this);
  }

  MappingDoc = this.RULE('MappingDoc', () => {
    this.MANY(() => this.SUBRULE(this.PrefixDecl));

    this.SUBRULE(this.MappingClause);
    this.MANY1(() => {
      this.CONSUME(smsTokenMap.Semicolon);
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
    this.CONSUME(smsTokenMap.Mapping);
    this.OPTION(() => this.SUBRULE(this.iri));
  });

  FromClause = this.RULE('FromClause', () => {
    this.CONSUME(smsTokenMap.FROM);
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
    this.CONSUME(smsTokenMap.Json);
    this.CONSUME(smsTokenMap.JsonBlock);
  });

  GraphQlClause = this.RULE('GraphQlClause', () => {
    this.CONSUME(smsTokenMap.GraphQl);
    this.CONSUME(smsTokenMap.LCurly);
    this.CONSUME(smsTokenMap.GraphQlBlock);
    this.CONSUME(smsTokenMap.RCurly);
  });

  SqlClause = this.RULE('SqlClause', () => {
    this.CONSUME(smsTokenMap.Sql);
    this.CONSUME(smsTokenMap.LCurly);
    this.CONSUME(smsTokenMap.SqlBlock);
    this.CONSUME(smsTokenMap.RCurly);
  });

  ToClause = this.RULE('ToClause', () => {
    this.CONSUME(smsTokenMap.TO);
    this.SUBRULE(this.ConstructTemplate);
  });

  WhereClause = this.RULE('WhereClause', () => {
    this.CONSUME(smsTokenMap.WHERE);
    this.CONSUME(smsTokenMap.LCurly);
    this.MANY(() => this.SUBRULE(this.Bind));
    this.CONSUME(smsTokenMap.RCurly);
  });

  Bind = this.RULE('Bind', () => {
    this.CONSUME(smsTokenMap.BIND);
    this.CONSUME(smsTokenMap.LParen);
    this.SUBRULE(this.TemplateOrCast);
    this.CONSUME(smsTokenMap.AS);
    this.SUBRULE(this.Var);
    this.CONSUME(smsTokenMap.RParen);
  });

  TemplateOrCast = this.RULE('TemplateOrCast', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.TemplateFunc),
      },
      {
        ALT: () => this.SUBRULE(this.CastFunc),
      },
    ]);
  });

  CastFunc = this.RULE('CastFunc', () => {
    this.SUBRULE(this.iri);
    this.CONSUME(smsTokenMap.LParen);
    this.SUBRULE(this.Var);
    this.CONSUME(smsTokenMap.RParen);
  });

  TemplateFunc = this.RULE('TemplateFunc', () => {
    this.CONSUME(smsTokenMap.Template);
    this.CONSUME(smsTokenMap.LParen);
    this.SUBRULE(this.String);
    this.CONSUME(smsTokenMap.RParen);
  });

  //
  // Dupes from Sparql
  //
  PrefixDecl = this.RULE('PrefixDecl', () => {
    this.CONSUME(smsTokenMap.PREFIX);
    this.CONSUME(smsTokenMap.PNAME_NS);
    this.CONSUME(smsTokenMap.IRIREF);
  });

  iri = this.RULE('iri', () => {
    this.OR([
      { ALT: () => this.CONSUME(smsTokenMap.IRIREF) },
      { ALT: () => this.SUBRULE(this.PrefixedName) },
    ]);
  });

  PrefixedName = this.RULE('PrefixedName', () => {
    this.OR([
      { ALT: () => this.CONSUME(smsTokenMap.PNAME_LN) },
      { ALT: () => this.CONSUME(smsTokenMap.PNAME_NS) },
    ]);
  });

  ConstructTemplate = this.RULE('ConstructTemplate', () => {
    this.CONSUME(smsTokenMap.LCurly);
    this.OPTION(() => this.SUBRULE(this.ConstructTriples));
    this.CONSUME(smsTokenMap.RCurly);
  });

  ConstructTriples = this.RULE('ConstructTriples', () => {
    this.SUBRULE(this.TriplesSameSubject);
    this.OPTION(() => {
      this.CONSUME(smsTokenMap.Period);
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
      this.CONSUME(smsTokenMap.Semicolon);
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
      { ALT: () => this.CONSUME(smsTokenMap.NIL) },
    ]);
  });

  Verb = this.RULE('Verb', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.VarOrIri) },
      { ALT: () => this.CONSUME(smsTokenMap.A) },
    ]);
  });

  ObjectList = this.RULE('ObjectList', () => {
    this.AT_LEAST_ONE_SEP({
      SEP: smsTokenMap.Comma,
      DEF: () => this.SUBRULE(this.Object),
    });
  });

  Object = this.RULE('Object', () => {
    this.SUBRULE(this.GraphNode);
  });

  Collection = this.RULE('Collection', () => {
    this.CONSUME(smsTokenMap.LParen);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNode));
    this.CONSUME(smsTokenMap.RParen);
  });

  BlankNodePropertyList = this.RULE('BlankNodePropertyList', () => {
    this.CONSUME(smsTokenMap.LBracket);
    this.SUBRULE(this.PropertyListNotEmpty);
    this.CONSUME(smsTokenMap.RBracket);
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
        { ALT: () => this.CONSUME(smsTokenMap.LANGTAG) },
        {
          ALT: () => {
            this.CONSUME(smsTokenMap.DoubleCaret);
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
      { ALT: () => this.CONSUME(smsTokenMap.INTEGER) },
      { ALT: () => this.CONSUME(smsTokenMap.DECIMAL) },
      { ALT: () => this.CONSUME(smsTokenMap.DOUBLE) },
    ]);
  });

  NumericLiteralPositive = this.RULE('NumericLiteralPositive', () => {
    this.OR([
      { ALT: () => this.CONSUME(smsTokenMap.INTEGER_POSITIVE) },
      { ALT: () => this.CONSUME(smsTokenMap.DECIMAL_POSITIVE) },
      { ALT: () => this.CONSUME(smsTokenMap.DOUBLE_POSITIVE) },
    ]);
  });

  NumericLiteralNegative = this.RULE('NumericLiteralNegative', () => {
    this.OR([
      { ALT: () => this.CONSUME(smsTokenMap.INTEGER_NEGATIVE) },
      { ALT: () => this.CONSUME(smsTokenMap.DECIMAL_NEGATIVE) },
      { ALT: () => this.CONSUME(smsTokenMap.DOUBLE_NEGATIVE) },
    ]);
  });

  BooleanLiteral = this.RULE('BooleanLiteral', () => {
    this.OR([
      { ALT: () => this.CONSUME(smsTokenMap.TRUE) },
      { ALT: () => this.CONSUME(smsTokenMap.FALSE) },
    ]);
  });

  BlankNode = this.RULE('BlankNode', () => {
    this.OR([
      { ALT: () => this.CONSUME(smsTokenMap.BLANK_NODE_LABEL) },
      { ALT: () => this.CONSUME(smsTokenMap.ANON) },
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
      { ALT: () => this.CONSUME(smsTokenMap.VAR1) },
      { ALT: () => this.CONSUME(smsTokenMap.VAR2) },
    ]);
  });

  String = this.RULE('String', () => {
    this.OR([
      { ALT: () => this.CONSUME(smsTokenMap.STRING_LITERAL1) },
      { ALT: () => this.CONSUME(smsTokenMap.STRING_LITERAL2) },
      { ALT: () => this.CONSUME(smsTokenMap.STRING_LITERAL_LONG1) },
      { ALT: () => this.CONSUME(smsTokenMap.STRING_LITERAL_LONG2) },
    ]);
  });
}
