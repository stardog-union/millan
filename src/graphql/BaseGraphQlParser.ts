const { graphQlTokenMap } = require('./tokens');
import {
  Parser,
  TokenType,
  IToken,
  Lexer,
  IParserConfig,
  IRecognitionException,
} from 'chevrotain';
import { IStardogParser } from '../helpers/chevrotain/types';

export class BaseGraphQlParser extends Parser implements IStardogParser {
  private lexer: Lexer;

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string, entryRule = this.Document) => {
    this.input = this.lexer.tokenize(document).tokens;
    const cst = entryRule.call(this);
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
    super(tokenVocab, {
      recoveryEnabled: true,
      outputCst: true,
      ...options.config,
    });

    this.lexer = new Lexer(tokenVocab);
  }

  Document = this.RULE('Document', () => {
    this.AT_LEAST_ONE(() => this.SUBRULE(this.Definition));
  });

  Definition = this.RULE('Definition', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.ExecutableDefinition) },
      { ALT: () => this.SUBRULE(this.TypeSystemDefinition) },
      { ALT: () => this.SUBRULE(this.TypeSystemExtension) },
    ]);
  });

  ExecutableDefinition = this.RULE('ExecutableDefinition', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.OperationDefinition) },
      { ALT: () => this.SUBRULE(this.FragmentDefinition) },
    ]);
  });

  OperationDefinition = this.RULE('OperationDefinition', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.SelectionSet) },
      {
        ALT: () => {
          this.SUBRULE(this.OperationType);
          this.OPTION(() => this.CONSUME(graphQlTokenMap.Name));
          this.OPTION1(() => this.SUBRULE(this.VariableDefinitions));
          this.OPTION2(() => this.SUBRULE(this.Directives));
          this.SUBRULE1(this.SelectionSet);
        },
      },
    ]);
  });

  OperationType = this.RULE('OperationType', () => {
    this.OR([
      { ALT: () => this.CONSUME(graphQlTokenMap.Query) },
      { ALT: () => this.CONSUME(graphQlTokenMap.Mutation) },
      { ALT: () => this.CONSUME(graphQlTokenMap.Subscription) },
    ]);
  });

  SelectionSet = this.RULE('SelectionSet', () => {
    this.CONSUME(graphQlTokenMap.LCurly);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.Selection));
    this.CONSUME(graphQlTokenMap.RCurly);
  });

  Selection = this.RULE('Selection', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.Field) },
      { ALT: () => this.SUBRULE(this.InlineFragment) },
      { ALT: () => this.SUBRULE(this.FragmentSpread) },
    ]);
  });

  Field = this.RULE('Field', () => {
    this.OPTION(() => this.SUBRULE(this.Alias));
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION1(() =>
      this.SUBRULE(this.Arguments, { ARGS: [false /* isConst */] })
    );
    this.OPTION2(() => this.SUBRULE(this.Directives));
    this.OPTION3(() => this.SUBRULE(this.SelectionSet));
  });

  Alias = this.RULE('Alias', () => {
    this.CONSUME(graphQlTokenMap.Name);
    this.CONSUME(graphQlTokenMap.Colon);
  });

  Arguments = this.RULE('Arguments', (isConst: boolean) => {
    this.CONSUME(graphQlTokenMap.LParen);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.Argument, { ARGS: [isConst] }));
    this.CONSUME(graphQlTokenMap.RParen);
  });

  Argument = this.RULE('Argument', (isConst: boolean) => {
    this.SUBRULE(this.Alias);
    this.SUBRULE(this.Value, { ARGS: [isConst] });
  });

  FragmentSpread = this.RULE('FragmentSpread', () => {
    this.CONSUME(graphQlTokenMap.Spread);
    this.CONSUME(graphQlTokenMap.FragmentName);
    this.OPTION(() => this.SUBRULE(this.Directives));
  });

  InlineFragment = this.RULE('InlineFragment', () => {
    this.CONSUME(graphQlTokenMap.Spread);
    this.OPTION(() => this.SUBRULE(this.TypeCondition));
    this.OPTION1(() => this.SUBRULE(this.Directives));
    this.SUBRULE(this.SelectionSet);
  });

  FragmentDefinition = this.RULE('FragmentDefinition', () => {
    this.CONSUME(graphQlTokenMap.Fragment);
    this.CONSUME(graphQlTokenMap.FragmentName);
    this.SUBRULE(this.TypeCondition);
    this.OPTION(() => this.SUBRULE(this.Directives));
    this.SUBRULE(this.SelectionSet);
  });

  TypeCondition = this.RULE('TypeCondition', () => {
    this.CONSUME(graphQlTokenMap.On);
    this.SUBRULE(this.NamedType);
  });

  Value = this.RULE('Value', (isConst: boolean) => {
    this.OR([
      { GATE: () => !isConst, ALT: () => this.SUBRULE(this.Variable) },
      { ALT: () => this.SUBRULE(this.IntValue) },
      { ALT: () => this.SUBRULE(this.FloatValue) },
      { ALT: () => this.SUBRULE(this.StringValue) },
      { ALT: () => this.SUBRULE(this.BooleanValue) },
      { ALT: () => this.SUBRULE(this.NullValue) },
      { ALT: () => this.SUBRULE(this.EnumValue) },
      { ALT: () => this.SUBRULE(this.ListValue, { ARGS: [isConst] }) },
      { ALT: () => this.SUBRULE(this.ObjectValue, { ARGS: [isConst] }) },
    ]);
  });

  IntValue = this.RULE('IntValue', () => {
    this.CONSUME(graphQlTokenMap.IntValueToken);
  });

  FloatValue = this.RULE('FloatValue', () => {
    this.CONSUME(graphQlTokenMap.FloatValueToken);
  });

  StringValue = this.RULE('StringValue', () => {
    this.CONSUME(graphQlTokenMap.StringValueToken);
  });

  BooleanValue = this.RULE('BooleanValue', () => {
    this.CONSUME(graphQlTokenMap.BooleanValueToken);
  });

  NullValue = this.RULE('NullValue', () => {
    this.CONSUME(graphQlTokenMap.NullValueToken);
  });

  EnumValue = this.RULE('EnumValue', () => {
    this.CONSUME(graphQlTokenMap.EnumValueToken);
  });

  ListValue = this.RULE('ListValue', (isConst: boolean) => {
    this.CONSUME(graphQlTokenMap.LBracket);
    this.MANY(() => this.SUBRULE(this.Value, { ARGS: [isConst] }));
    this.CONSUME(graphQlTokenMap.RBracket);
  });

  ObjectValue = this.RULE('ObjectValue', (isConst: boolean) => {
    this.CONSUME(graphQlTokenMap.LCurly);
    this.MANY(() => this.SUBRULE(this.ObjectField, { ARGS: [isConst] }));
    this.CONSUME(graphQlTokenMap.RCurly);
  });

  ObjectField = this.RULE('ObjectField', (isConst: boolean) => {
    this.SUBRULE(this.Alias);
    this.SUBRULE(this.Value, { ARGS: [isConst] });
  });

  VariableDefinitions = this.RULE('VariableDefinitions', () => {
    this.CONSUME(graphQlTokenMap.LParen);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.VariableDefinition));
    this.CONSUME(graphQlTokenMap.RParen);
  });

  VariableDefinition = this.RULE('VariableDefinition', () => {
    this.SUBRULE(this.Variable);
    this.CONSUME(graphQlTokenMap.Colon);
    this.SUBRULE(this.Type);
    this.OPTION(() => this.SUBRULE(this.DefaultValue));
  });

  Variable = this.RULE('Variable', () => {
    this.CONSUME(graphQlTokenMap.Dollar);
    this.CONSUME(graphQlTokenMap.Name);
  });

  DefaultValue = this.RULE('DefaultValue', () => {
    this.CONSUME(graphQlTokenMap.Equals);
    this.SUBRULE(this.Value, { ARGS: [true /* isConst */] });
  });

  Type = this.RULE('Type', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.NamedType) },
      { ALT: () => this.SUBRULE(this.ListType) },
    ]);
    this.OPTION(() => this.CONSUME(graphQlTokenMap.Bang));
  });

  NamedType = this.RULE('NamedType', () => {
    this.CONSUME(graphQlTokenMap.Name);
  });

  ListType = this.RULE('ListType', () => {
    this.CONSUME(graphQlTokenMap.LBracket);
    this.SUBRULE(this.Type);
    this.CONSUME(graphQlTokenMap.RBracket);
  });

  Directives = this.RULE('Directives', (isConst: boolean) => {
    this.AT_LEAST_ONE(() => this.SUBRULE(this.Directive, { ARGS: [isConst] }));
  });

  Directive = this.RULE('Directive', (isConst: boolean) => {
    this.CONSUME(graphQlTokenMap.At);
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION(() => this.SUBRULE(this.Arguments, { ARGS: [isConst] }));
  });

  TypeSystemDefinition = this.RULE('TypeSystemDefinition', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.SchemaDefinition) },
      { ALT: () => this.SUBRULE(this.TypeDefinition) },
      { ALT: () => this.SUBRULE(this.DirectiveDefinition) },
    ]);
  });

  TypeSystemExtension = this.RULE('TypeSystemExtension', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.SchemaExtension) },
      { ALT: () => this.SUBRULE(this.TypeExtension) },
    ]);
  });

  SchemaDefinition = this.RULE('SchemaDefinition', () => {
    this.CONSUME(graphQlTokenMap.Schema);
    this.OPTION(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
    this.CONSUME(graphQlTokenMap.LCurly);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.OperationTypeDefinition));
    this.CONSUME(graphQlTokenMap.RCurly);
  });

  SchemaExtension = this.RULE('SchemaExtension', () => {
    this.CONSUME(graphQlTokenMap.Extend);
    this.CONSUME(graphQlTokenMap.Schema);
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] });
          this.OPTION(() => this.SUBRULE1(this.OperationTypeDefinitionList));
        },
      },
      { ALT: () => this.SUBRULE(this.OperationTypeDefinitionList) },
    ]);
  });

  OperationTypeDefinitionList = this.RULE('OperationTypeDefinitionList', () => {
    this.CONSUME(graphQlTokenMap.LCurly);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.OperationTypeDefinition));
    this.CONSUME(graphQlTokenMap.RCurly);
  });

  OperationTypeDefinition = this.RULE('OperationTypeDefinition', () => {
    this.SUBRULE(this.OperationType);
    this.CONSUME(graphQlTokenMap.Colon);
    this.SUBRULE(this.NamedType);
  });

  Description = this.RULE('Description', () => {
    this.SUBRULE(this.StringValue);
  });

  TypeDefinition = this.RULE('TypeDefinition', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.ScalarTypeDefinition) },
      { ALT: () => this.SUBRULE(this.ObjectTypeDefinition) },
      { ALT: () => this.SUBRULE(this.InterfaceTypeDefinition) },
      { ALT: () => this.SUBRULE(this.UnionTypeDefinition) },
      { ALT: () => this.SUBRULE(this.EnumTypeDefinition) },
      { ALT: () => this.SUBRULE(this.InputObjectTypeDefinition) },
    ]);
  });

  TypeExtension = this.RULE('TypeExtension', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.ScalarTypeExtension) },
      { ALT: () => this.SUBRULE(this.ObjectTypeExtension) },
      { ALT: () => this.SUBRULE(this.InterfaceTypeExtension) },
      { ALT: () => this.SUBRULE(this.UnionTypeExtension) },
      { ALT: () => this.SUBRULE(this.EnumTypeExtension) },
      { ALT: () => this.SUBRULE(this.InputObjectTypeExtension) },
    ]);
  });

  ScalarTypeDefinition = this.RULE('ScalarTypeDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.Scalar);
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION1(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
  });

  ScalarTypeExtension = this.RULE('ScalarTypeExtension', () => {
    this.CONSUME(graphQlTokenMap.Extend);
    this.CONSUME(graphQlTokenMap.Scalar);
    this.CONSUME(graphQlTokenMap.Name);
    this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] });
  });

  ObjectTypeDefinition = this.RULE('ObjectTypeDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.TypeToken);
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION1(() => this.SUBRULE(this.ImplementsInterfaces));
    this.OPTION2(() =>
      this.SUBRULE1(this.Directives, { ARGS: [true /* isConst */] })
    );
    this.OPTION3(() => this.SUBRULE(this.FieldsDefinition));
  });

  ObjectTypeExtension = this.RULE('ObjectTypeExtension', () => {
    this.CONSUME(graphQlTokenMap.Extend);
    this.CONSUME(graphQlTokenMap.TypeToken);
    this.CONSUME(graphQlTokenMap.Name);
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.ImplementsInterfaces);
          this.OPTION(() =>
            this.SUBRULE1(this.Directives, { ARGS: [true /* isConst */] })
          );
          this.OPTION1(() => this.SUBRULE(this.FieldsDefinition));
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] });
          this.OPTION2(() => this.SUBRULE1(this.FieldsDefinition));
        },
      },
      { ALT: () => this.SUBRULE2(this.FieldsDefinition) },
    ]);
  });

  ImplementsInterfaces = this.RULE('ImplementsInterfaces', () => {
    this.CONSUME(graphQlTokenMap.Implements);
    this.OPTION(() => this.CONSUME(graphQlTokenMap.Amp));
    this.SUBRULE(this.NamedType);
    this.MANY(() => {
      this.CONSUME1(graphQlTokenMap.Amp);
      this.SUBRULE1(this.NamedType);
    });
  });

  FieldsDefinition = this.RULE('FieldsDefinition', () => {
    this.CONSUME(graphQlTokenMap.LCurly);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.FieldDefinition));
    this.CONSUME(graphQlTokenMap.RCurly);
  });

  FieldDefinition = this.RULE('FieldDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION1(() => this.SUBRULE(this.ArgumentsDefinition));
    this.CONSUME(graphQlTokenMap.Colon);
    this.SUBRULE(this.Type);
    this.OPTION2(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
  });

  ArgumentsDefinition = this.RULE('ArgumentsDefinition', () => {
    this.CONSUME(graphQlTokenMap.LParen);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.InputValueDefinition));
    this.CONSUME(graphQlTokenMap.RParen);
  });

  InputValueDefinition = this.RULE('InputValueDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.Name);
    this.CONSUME(graphQlTokenMap.Colon);
    this.SUBRULE(this.Type);
    this.OPTION1(() => this.SUBRULE(this.DefaultValue));
    this.OPTION2(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
  });

  InterfaceTypeDefinition = this.RULE('InterfaceTypeDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.Interface);
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION2(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
    this.OPTION3(() => this.SUBRULE(this.FieldsDefinition));
  });

  InterfaceTypeExtension = this.RULE('InterfaceTypeExtension', () => {
    this.CONSUME(graphQlTokenMap.Extend);
    this.CONSUME(graphQlTokenMap.Interface);
    this.CONSUME(graphQlTokenMap.Name);
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] });
          this.OPTION(() => this.SUBRULE(this.FieldsDefinition));
        },
      },
      { ALT: () => this.SUBRULE1(this.FieldsDefinition) },
    ]);
  });

  UnionTypeDefinition = this.RULE('UnionTypeDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.Union);
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION1(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
    this.OPTION2(() => this.SUBRULE(this.UnionMemberTypes));
  });

  UnionMemberTypes = this.RULE('UnionMemberTypes', () => {
    this.CONSUME(graphQlTokenMap.Equals);
    this.OPTION(() => this.CONSUME(graphQlTokenMap.Pipe));
    this.SUBRULE(this.NamedType);
    this.MANY(() => {
      this.CONSUME1(graphQlTokenMap.Pipe);
      this.SUBRULE1(this.NamedType);
    });
  });

  UnionTypeExtension = this.RULE('UnionTypeExtension', () => {
    this.CONSUME(graphQlTokenMap.Extend);
    this.CONSUME(graphQlTokenMap.Union);
    this.CONSUME(graphQlTokenMap.Name);
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] });
          this.OPTION(() => this.SUBRULE(this.UnionMemberTypes));
        },
      },
      { ALT: () => this.SUBRULE1(this.UnionMemberTypes) },
    ]);
  });

  EnumTypeDefinition = this.RULE('EnumTypeDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.Enum);
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION1(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
    this.OPTION2(() => this.SUBRULE(this.EnumValuesDefinition));
  });

  EnumValuesDefinition = this.RULE('EnumValuesDefinition', () => {
    this.CONSUME(graphQlTokenMap.LCurly);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.EnumValueDefinition));
    this.CONSUME(graphQlTokenMap.RCurly);
  });

  EnumValueDefinition = this.RULE('EnumValueDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.SUBRULE(this.EnumValue);
    this.OPTION1(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
  });

  EnumTypeExtension = this.RULE('EnumTypeExtension', () => {
    this.CONSUME(graphQlTokenMap.Extend);
    this.CONSUME(graphQlTokenMap.Enum);
    this.CONSUME(graphQlTokenMap.Name);
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] });
          this.OPTION(() => this.SUBRULE(this.EnumValuesDefinition));
        },
      },
      { ALT: () => this.SUBRULE1(this.EnumValuesDefinition) },
    ]);
  });

  InputObjectTypeDefinition = this.RULE('InputObjectTypeDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.Input);
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION1(() =>
      this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] })
    );
    this.OPTION2(() => this.SUBRULE(this.InputFieldsDefinition));
  });

  InputFieldsDefinition = this.RULE('InputFieldsDefinition', () => {
    this.CONSUME(graphQlTokenMap.LCurly);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.InputValueDefinition));
    this.CONSUME(graphQlTokenMap.RCurly);
  });

  InputObjectTypeExtension = this.RULE('InputObjectTypeExtension', () => {
    this.CONSUME(graphQlTokenMap.Extend);
    this.CONSUME(graphQlTokenMap.Input);
    this.CONSUME(graphQlTokenMap.Name);
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.Directives, { ARGS: [true /* isConst */] });
          this.OPTION(() => this.SUBRULE1(this.InputFieldsDefinition));
        },
      },
      { ALT: () => this.SUBRULE(this.InputFieldsDefinition) },
    ]);
  });

  DirectiveDefinition = this.RULE('DirectiveDefinition', () => {
    this.OPTION(() => this.SUBRULE(this.Description));
    this.CONSUME(graphQlTokenMap.DirectiveToken);
    this.CONSUME(graphQlTokenMap.At);
    this.CONSUME(graphQlTokenMap.Name);
    this.OPTION1(() => this.SUBRULE(this.ArgumentsDefinition));
    this.CONSUME(graphQlTokenMap.On);
    this.SUBRULE(this.DirectiveLocations);
  });

  DirectiveLocations = this.RULE('DirectiveLocations', () => {
    this.OPTION(() => this.CONSUME(graphQlTokenMap.Pipe));
    this.SUBRULE(this.DirectiveLocation);
    this.MANY(() => {
      this.CONSUME1(graphQlTokenMap.Pipe);
      this.SUBRULE1(this.DirectiveLocation);
    });
  });

  DirectiveLocation = this.RULE('DirectiveLocation', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.ExecutableDirectiveLocation) },
      { ALT: () => this.SUBRULE(this.TypeSystemDirectiveLocation) },
    ]);
  });

  ExecutableDirectiveLocation = this.RULE('ExecutableDirectiveLocation', () => {
    this.OR([
      { ALT: () => this.CONSUME(graphQlTokenMap.QUERY) },
      { ALT: () => this.CONSUME(graphQlTokenMap.MUTATION) },
      { ALT: () => this.CONSUME(graphQlTokenMap.SUBSCRIPTION) },
      { ALT: () => this.CONSUME(graphQlTokenMap.FIELD) },
      { ALT: () => this.CONSUME(graphQlTokenMap.FRAGMENT_DEFINITION) },
      { ALT: () => this.CONSUME(graphQlTokenMap.FRAGMENT_SPREAD) },
      { ALT: () => this.CONSUME(graphQlTokenMap.INLINE_FRAGMENT) },
    ]);
  });

  TypeSystemDirectiveLocation = this.RULE('TypeSystemDirectiveLocation', () => {
    this.OR([
      { ALT: () => this.CONSUME(graphQlTokenMap.SCHEMA) },
      { ALT: () => this.CONSUME(graphQlTokenMap.SCALAR) },
      { ALT: () => this.CONSUME(graphQlTokenMap.OBJECT) },
      { ALT: () => this.CONSUME(graphQlTokenMap.FIELD_DEFINITION) },
      { ALT: () => this.CONSUME(graphQlTokenMap.ARGUMENT_DEFINITION) },
      { ALT: () => this.CONSUME(graphQlTokenMap.INTERFACE) },
      { ALT: () => this.CONSUME(graphQlTokenMap.UNION) },
      { ALT: () => this.CONSUME(graphQlTokenMap.ENUM) },
      { ALT: () => this.CONSUME(graphQlTokenMap.ENUM_VALUE) },
      { ALT: () => this.CONSUME(graphQlTokenMap.INPUT_OBJECT) },
      { ALT: () => this.CONSUME(graphQlTokenMap.INPUT_FIELD_DEFINITION) },
    ]);
  });
}
