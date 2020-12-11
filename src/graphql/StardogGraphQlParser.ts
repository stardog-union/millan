const { stardogGraphQlTokens, stardogGraphQlTokenMap } = require('./tokens');
import { BaseGraphQlParser } from './BaseGraphQlParser';
import { Parser, IRecognitionException } from 'chevrotain';
import { getStardogGraphQlVisitor } from 'graphql/StardogGraphQlVisitor';

export class StardogGraphQlParser extends BaseGraphQlParser {
  private stardogGraphQlVisitor;

  constructor(options?) {
    super(options, stardogGraphQlTokens);
    Parser.performSelfAnalysis(this);
  }

  private visitCst = (cst: any) => {
    // To save resources while parsing, the visitor is a singleton.
    if (!this.stardogGraphQlVisitor) {
      const BaseStardogGraphQlVisitor = this.getBaseCstVisitorConstructorWithDefaults();
      this.stardogGraphQlVisitor = getStardogGraphQlVisitor(
        BaseStardogGraphQlVisitor
      );
    } else {
      this.stardogGraphQlVisitor.$resetState();
    }

    return this.stardogGraphQlVisitor.visit(cst, this.input);
  };

  public parse = (document: string, entryRule = this.Document) => {
    this.input = this.tokenize(document);
    const cst = entryRule.call(this);
    //  const { errors: sparqlErrors } = this.visitCst(cst);
    const graphQlErrors: IRecognitionException[] = this.errors;

    return {
      errors: graphQlErrors,
      //  errors: [...graphQlErrors, ...sparqlErrors],
      cst,
    };
  };

  //  OperationDefinition = this.OVERRIDE_RULE('OperationDefinition', () => {
  //    this.OR([
  //      { ALT: () => this.SUBRULE(this.SelectionSet) },
  //      {
  //        ALT: () => {
  //          this.SUBRULE(this.OperationType);
  //          this.OPTION(() => this.CONSUME(stardogGraphQlTokenMap.Name));
  //          this.OPTION1(() => this.SUBRULE(this.VariableDefinitions));
  //          this.OPTION2(() =>
  //            this.SUBRULE(this.Directives, {
  //              ARGS: [false /* isConst */, true /* isTopLevel */],
  //            })
  //          );
  //          this.SUBRULE1(this.SelectionSet);
  //        },
  //      },
  //    ]);
  //  });

  Directives = this.OVERRIDE_RULE(
    'Directives',
    (isConst: boolean, isTopLevel: boolean = false) => {
      this.AT_LEAST_ONE(() => {
        this.OR([
          {
            ALT: () =>
              this.SUBRULE(this.StardogDirective, {
                ARGS: [isTopLevel],
              }),
          },
          {
            ALT: () => this.SUBRULE(this.Directive, { ARGS: [isConst] }),
          },
        ]);
      });
    }
  );

  Field = this.OVERRIDE_RULE('Field', () => {
    this.OPTION(() => this.SUBRULE(this.Alias));
    this.CONSUME(stardogGraphQlTokenMap.Name);
    this.OPTION1(() =>
      this.SUBRULE(this.Arguments, {
        ARGS: [false /* isConst */, true /* isField */],
      })
    );
    this.OPTION2(() => this.SUBRULE(this.Directives));
    this.OPTION3(() => this.SUBRULE(this.SelectionSet));
  });

  Arguments = this.OVERRIDE_RULE(
    'Arguments',
    (isConst: boolean, isField: boolean = false) => {
      this.CONSUME(stardogGraphQlTokenMap.LParen);
      this.AT_LEAST_ONE(() => {
        this.OR([
          {
            GATE: () => isField,
            ALT: () => this.SUBRULE(this.StardogArgument),
          },
          {
            ALT: () => this.SUBRULE(this.Argument, { ARGS: [isConst] }),
          },
        ]);
      });
      this.CONSUME(stardogGraphQlTokenMap.RParen);
    }
  );

  StardogArgument = this.RULE('StardogArgument', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.OrderByArgument) },
      { ALT: () => this.SUBRULE(this.SkipArgument) },
      { ALT: () => this.SUBRULE(this.OffsetArgument) },
      { ALT: () => this.SUBRULE(this.FirstArgument) },
      { ALT: () => this.SUBRULE(this.LimitArgument) },
      { ALT: () => this.SUBRULE(this.IriArgument) },
    ]);
  });

  StardogDirective = this.RULE('StardogDirective', (isTopLevel: boolean) => {
    this.CONSUME(stardogGraphQlTokenMap.At);
    this.OR([
      {
        GATE: () => !isTopLevel,
        ALT: () => this.SUBRULE(this.ConditionalStardogDirective),
      },
      {
        GATE: () => !isTopLevel,
        ALT: () => this.SUBRULE(this.BareStardogDirective),
      },
      {
        GATE: () => !isTopLevel,
        ALT: () => this.SUBRULE(this.BindDirective),
      },
      {
        GATE: () => isTopLevel,
        ALT: () => this.SUBRULE(this.PrefixDirective),
      },
      {
        GATE: () => isTopLevel,
        ALT: () => this.SUBRULE(this.ConfigDirective),
      },
    ]);
  });

  ConditionalStardogDirective = this.RULE('ConditionalStardogDirective', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.SkipDirective) },
      { ALT: () => this.SUBRULE(this.IncludeDirective) },
      { ALT: () => this.SUBRULE(this.FilterDirective) },
    ]);
    this.SUBRULE(this.ConditionalStardogDirectiveArguments);
  });

  SkipDirective = this.RULE('SkipDirective', () => {
    this.CONSUME(stardogGraphQlTokenMap.SkipDirectiveToken);
  });

  IncludeDirective = this.RULE('IncludeDirective', () => {
    this.CONSUME(stardogGraphQlTokenMap.IncludeDirectiveToken);
  });

  FilterDirective = this.RULE('FilterDirective', () => {
    this.CONSUME(stardogGraphQlTokenMap.FilterDirectiveToken);
  });

  ConditionalStardogDirectiveArguments = this.RULE(
    'ConditionalStardogDirectiveArguments',
    () => {
      this.CONSUME(stardogGraphQlTokenMap.LParen);
      this.CONSUME(stardogGraphQlTokenMap.IfArgumentToken);
      this.CONSUME(stardogGraphQlTokenMap.Colon);
      this.OR([
        { ALT: () => this.SUBRULE(this.Variable) },
        { ALT: () => this.SUBRULE(this.StringValue) },
      ]);
      this.CONSUME(stardogGraphQlTokenMap.RParen);
    }
  );

  BareStardogDirective = this.RULE('BareStardogDirective', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.OptionalDirective) },
      { ALT: () => this.SUBRULE(this.TypeDirective) },
      { ALT: () => this.SUBRULE(this.HideDirective) },
    ]);
  });

  OptionalDirective = this.RULE('OptionalDirective', () => {
    this.CONSUME(stardogGraphQlTokenMap.OptionalDirectiveToken);
  });

  TypeDirective = this.RULE('TypeDirective', () => {
    this.CONSUME(stardogGraphQlTokenMap.TypeToken);
  });

  HideDirective = this.RULE('HideDirective', () => {
    this.CONSUME(stardogGraphQlTokenMap.HideDirectiveToken);
  });

  BindDirective = this.RULE('BindDirective', () => {
    this.CONSUME(stardogGraphQlTokenMap.BindDirectiveToken);
    this.CONSUME(stardogGraphQlTokenMap.LParen);
    this.CONSUME(stardogGraphQlTokenMap.ToArgumentToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.SUBRULE(this.StringValue);
    this.CONSUME(stardogGraphQlTokenMap.RParen);
  });

  PrefixDirective = this.RULE('PrefixDirective', (isConst: boolean) => {
    this.CONSUME(stardogGraphQlTokenMap.PrefixDirectiveToken);
    this.SUBRULE(this.Arguments, { ARGS: [isConst] });
  });

  ConfigDirective = this.RULE('ConfigDirective', () => {
    this.CONSUME(stardogGraphQlTokenMap.ConfigDirectiveToken);
    this.CONSUME(stardogGraphQlTokenMap.LParen);
    this.OR([
      {
        ALT: () => this.SUBRULE(this.ConfigDirectiveAlias),
      },
      {
        ALT: () => this.SUBRULE(this.ConfigDirectiveGraph),
      },
      {
        ALT: () => this.SUBRULE(this.ConfigDirectiveType),
      },
    ]);
    this.CONSUME(stardogGraphQlTokenMap.RParen);
  });

  ConfigDirectiveAlias = this.RULE('ConfigDirectiveAlias', () => {
    this.SUBRULE(this.AliasArgument);
    this.OPTION(() => {
      this.OR1([
        {
          ALT: () => {
            this.SUBRULE(this.GraphArgument);
            this.OPTION1(() => this.SUBRULE(this.TypeArgument));
          },
        },
        {
          ALT: () => {
            this.SUBRULE1(this.TypeArgument);
            this.OPTION2(() => this.SUBRULE1(this.GraphArgument));
          },
        },
      ]);
    });
  });

  ConfigDirectiveGraph = this.RULE('ConfigDirectiveGraph', () => {
    this.SUBRULE2(this.GraphArgument);
    this.OPTION3(() => {
      this.OR2([
        {
          ALT: () => {
            this.SUBRULE1(this.AliasArgument);
            this.OPTION4(() => this.SUBRULE2(this.TypeArgument));
          },
        },
        {
          ALT: () => {
            this.SUBRULE3(this.TypeArgument);
            this.OPTION5(() => this.SUBRULE2(this.AliasArgument));
          },
        },
      ]);
    });
  });

  ConfigDirectiveType = this.RULE('ConfigDirectiveType', () => {
    this.SUBRULE4(this.TypeArgument);
    this.OPTION6(() => {
      this.OR3([
        {
          ALT: () => {
            this.SUBRULE3(this.AliasArgument);
            this.OPTION7(() => this.SUBRULE3(this.GraphArgument));
          },
        },
        {
          ALT: () => {
            this.SUBRULE4(this.GraphArgument);
            this.OPTION8(() => this.SUBRULE4(this.AliasArgument));
          },
        },
      ]);
    });
  });

  AliasArgument = this.RULE('AliasArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.AliasArgumentToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.CONSUME(stardogGraphQlTokenMap.LCurly);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.AliasArgumentField));
    this.CONSUME(stardogGraphQlTokenMap.RCurly);
  });

  AliasArgumentField = this.RULE('AliasArgumentField', () => {
    this.SUBRULE(this.Alias);
    this.SUBRULE(this.StringValue);
  });

  GraphArgument = this.RULE('GraphArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.GraphArgumentToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.OR([
      { ALT: () => this.SUBRULE(this.EnumValueOrString) },
      {
        ALT: () => {
          this.CONSUME(stardogGraphQlTokenMap.LBracket);
          this.MANY(() => this.SUBRULE1(this.EnumValueOrString));
          this.CONSUME(stardogGraphQlTokenMap.RBracket);
        },
      },
    ]);
  });

  EnumValueOrString = this.RULE('EnumValueOrString', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.EnumValue) },
      { ALT: () => this.CONSUME(stardogGraphQlTokenMap.StringToken) },
    ]);
  });

  TypeArgument = this.RULE('TypeArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.TypeToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.SUBRULE(this.BooleanValue);
  });

  OrderByArgument = this.RULE('OrderByArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.OrderByArgumentToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.OR([
      { ALT: () => this.SUBRULE(this.OrderByArgumentField) },
      {
        ALT: () => {
          this.CONSUME(stardogGraphQlTokenMap.LBracket);
          this.AT_LEAST_ONE(() => this.SUBRULE1(this.OrderByArgumentField));
          this.CONSUME(stardogGraphQlTokenMap.RBracket);
        },
      },
    ]);
  });

  OrderByArgumentField = this.RULE('OrderByArgumentField', () => {
    this.OR([
      { ALT: () => this.CONSUME(stardogGraphQlTokenMap.Name) },
      {
        ALT: () => {
          this.CONSUME(stardogGraphQlTokenMap.LCurly);
          this.OR1([
            {
              ALT: () => {
                this.SUBRULE(this.OrderByArgumentFieldProperty);
                this.OPTION(() =>
                  this.SUBRULE(this.OrderByArgumentDescProperty)
                );
              },
            },
            {
              ALT: () => {
                this.SUBRULE1(this.OrderByArgumentDescProperty);
                this.SUBRULE1(this.OrderByArgumentFieldProperty);
              },
            },
          ]);
          this.CONSUME(stardogGraphQlTokenMap.RCurly);
        },
      },
    ]);
  });

  OrderByArgumentFieldProperty = this.RULE(
    'OrderByArgumentFieldProperty',
    () => {
      this.CONSUME(stardogGraphQlTokenMap.OrderByArgumentFieldPropertyToken);
      this.CONSUME(stardogGraphQlTokenMap.Colon);
      this.CONSUME(stardogGraphQlTokenMap.Name);
    }
  );

  OrderByArgumentDescProperty = this.RULE('OrderByArgumentDescProperty', () => {
    this.CONSUME(stardogGraphQlTokenMap.OrderByArgumentDescPropertyToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.SUBRULE(this.BooleanValue);
  });

  SkipArgument = this.RULE('SkipArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.SkipDirectiveToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.SUBRULE(this.IntValue);
  });

  OffsetArgument = this.RULE('OffsetArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.OffsetArgumentToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.SUBRULE(this.IntValue);
  });

  FirstArgument = this.RULE('FirstArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.FirstArgumentToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.SUBRULE(this.IntValue);
  });

  LimitArgument = this.RULE('LimitArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.LimitArgumentToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.SUBRULE(this.IntValue);
  });

  IriArgument = this.RULE('IriArgument', () => {
    this.CONSUME(stardogGraphQlTokenMap.IriArgumentToken);
    this.CONSUME(stardogGraphQlTokenMap.Colon);
    this.SUBRULE(this.EnumValue);
  });
}
