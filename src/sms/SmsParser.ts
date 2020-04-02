const { smsTokenTypes, smsTokenMap } = require('./tokens');
import { Parser, IRecognitionException, IParserConfig } from 'chevrotain';
import { StardogSparqlParser } from 'sparql';

export class SmsParser extends StardogSparqlParser {
  public parse = (document: string) => {
    this.input = this.tokenize(document);
    const cst = this.MappingDoc();
    const errors: IRecognitionException[] = this.errors;
    return {
      errors,
      cst,
    };
  };

  constructor(config?: Partial<IParserConfig>) {
    super(
      {
        outputCst: true,
        recoveryEnabled: true,
        ...config,
      },
      smsTokenTypes,
      true
    );

    Parser.performSelfAnalysis(this);
  }

  MappingDoc = this.RULE('MappingDoc', () => {
    this.MANY(() => this.SUBRULE(this.PrefixDecl));

    this.OPTION(() => {
      this.SUBRULE(this.MappingClause);
      this.MANY1(() => {
        this.CONSUME(smsTokenMap.Semicolon);
        this.SUBRULE1(this.MappingClause);
      });
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

  WhereClause = this.OVERRIDE_RULE('WhereClause', () => {
    this.CONSUME(smsTokenMap.WHERE);
    this.CONSUME(smsTokenMap.LCurly);
    this.MANY(() => this.SUBRULE(this.Bind));
    this.CONSUME(smsTokenMap.RCurly);
  });

  Bind = this.OVERRIDE_RULE('Bind', () => {
    this.CONSUME(smsTokenMap.BIND);
    this.CONSUME(smsTokenMap.LParen);
    this.SUBRULE(this.BindExpression);
    this.CONSUME(smsTokenMap.AS);
    this.SUBRULE(this.Var);
    this.CONSUME(smsTokenMap.RParen);
  });

  BindExpression = this.RULE('BindExpression', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.TemplateFunc) },
      { ALT: () => this.SUBRULE(this.Expression) },
    ]);
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
  TriplesSameSubject = this.OVERRIDE_RULE('TriplesSameSubject', () => {
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

  PropertyListNotEmpty = this.OVERRIDE_RULE('PropertyListNotEmpty', () => {
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

  Object = this.OVERRIDE_RULE('Object', () => {
    this.SUBRULE(this.GraphNode);
  });
}
