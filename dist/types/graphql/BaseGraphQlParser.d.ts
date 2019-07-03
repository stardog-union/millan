import { Parser, TokenType, IToken, IParserConfig, IRecognitionException } from 'chevrotain';
import { IStardogParser } from '../helpers/types';
export declare class BaseGraphQlParser extends Parser implements IStardogParser {
    private lexer;
    tokenize: (document: string) => IToken[];
    parse: (document: string, entryRule?: (idxInCallingRule?: number, ...args: any[]) => any) => {
        errors: IRecognitionException[];
        cst: any;
    };
    constructor(options: {
        input?: IToken[];
        config?: Partial<IParserConfig>;
    }, tokenVocab: TokenType[]);
    Document: (idxInCallingRule?: number, ...args: any[]) => any;
    Definition: (idxInCallingRule?: number, ...args: any[]) => any;
    ExecutableDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    OperationDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    OperationType: (idxInCallingRule?: number, ...args: any[]) => any;
    SelectionSet: (idxInCallingRule?: number, ...args: any[]) => any;
    Selection: (idxInCallingRule?: number, ...args: any[]) => any;
    Field: (idxInCallingRule?: number, ...args: any[]) => any;
    Alias: (idxInCallingRule?: number, ...args: any[]) => any;
    Arguments: (idxInCallingRule?: number, ...args: any[]) => any;
    Argument: (idxInCallingRule?: number, ...args: any[]) => any;
    FragmentSpread: (idxInCallingRule?: number, ...args: any[]) => any;
    InlineFragment: (idxInCallingRule?: number, ...args: any[]) => any;
    FragmentDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    TypeCondition: (idxInCallingRule?: number, ...args: any[]) => any;
    Value: (idxInCallingRule?: number, ...args: any[]) => any;
    IntValue: (idxInCallingRule?: number, ...args: any[]) => any;
    FloatValue: (idxInCallingRule?: number, ...args: any[]) => any;
    StringValue: (idxInCallingRule?: number, ...args: any[]) => any;
    BooleanValue: (idxInCallingRule?: number, ...args: any[]) => any;
    NullValue: (idxInCallingRule?: number, ...args: any[]) => any;
    EnumValue: (idxInCallingRule?: number, ...args: any[]) => any;
    ListValue: (idxInCallingRule?: number, ...args: any[]) => any;
    ObjectValue: (idxInCallingRule?: number, ...args: any[]) => any;
    ObjectField: (idxInCallingRule?: number, ...args: any[]) => any;
    VariableDefinitions: (idxInCallingRule?: number, ...args: any[]) => any;
    VariableDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    Variable: (idxInCallingRule?: number, ...args: any[]) => any;
    DefaultValue: (idxInCallingRule?: number, ...args: any[]) => any;
    Type: (idxInCallingRule?: number, ...args: any[]) => any;
    NamedType: (idxInCallingRule?: number, ...args: any[]) => any;
    ListType: (idxInCallingRule?: number, ...args: any[]) => any;
    Directives: (idxInCallingRule?: number, ...args: any[]) => any;
    Directive: (idxInCallingRule?: number, ...args: any[]) => any;
    TypeSystemDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    TypeSystemExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    SchemaDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    SchemaExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    OperationTypeDefinitionList: (idxInCallingRule?: number, ...args: any[]) => any;
    OperationTypeDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    Description: (idxInCallingRule?: number, ...args: any[]) => any;
    TypeDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    TypeExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    ScalarTypeDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    ScalarTypeExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    ObjectTypeDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    ObjectTypeExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    ImplementsInterfaces: (idxInCallingRule?: number, ...args: any[]) => any;
    FieldsDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    FieldDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    ArgumentsDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    InputValueDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    InterfaceTypeDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    InterfaceTypeExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    UnionTypeDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    UnionMemberTypes: (idxInCallingRule?: number, ...args: any[]) => any;
    UnionTypeExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    EnumTypeDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    EnumValuesDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    EnumValueDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    EnumTypeExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    InputObjectTypeDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    InputFieldsDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    InputObjectTypeExtension: (idxInCallingRule?: number, ...args: any[]) => any;
    DirectiveDefinition: (idxInCallingRule?: number, ...args: any[]) => any;
    DirectiveLocations: (idxInCallingRule?: number, ...args: any[]) => any;
    DirectiveLocation: (idxInCallingRule?: number, ...args: any[]) => any;
    ExecutableDirectiveLocation: (idxInCallingRule?: number, ...args: any[]) => any;
    TypeSystemDirectiveLocation: (idxInCallingRule?: number, ...args: any[]) => any;
}