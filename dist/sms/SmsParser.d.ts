import {
  Parser,
  IToken,
  IRecognitionException,
  IParserConfig,
} from 'chevrotain';
export declare class SmsParser extends Parser {
  private lexer;
  tokenize: (document: string) => IToken[];
  parse: (
    document: string
  ) => {
    errors: IRecognitionException[];
    cst: any;
  };
  constructor(config?: Partial<IParserConfig>);
  MappingDoc: (idxInCallingRule?: number, ...args: any[]) => any;
  MappingClause: (idxInCallingRule?: number, ...args: any[]) => any;
  MappingDecl: (idxInCallingRule?: number, ...args: any[]) => any;
  FromClause: (idxInCallingRule?: number, ...args: any[]) => any;
  JsonClause: (idxInCallingRule?: number, ...args: any[]) => any;
  GraphQlClause: (idxInCallingRule?: number, ...args: any[]) => any;
  SqlClause: (idxInCallingRule?: number, ...args: any[]) => any;
  ToClause: (idxInCallingRule?: number, ...args: any[]) => any;
  WhereClause: (idxInCallingRule?: number, ...args: any[]) => any;
  Bind: (idxInCallingRule?: number, ...args: any[]) => any;
  TemplateOrCast: (idxInCallingRule?: number, ...args: any[]) => any;
  CastFunc: (idxInCallingRule?: number, ...args: any[]) => any;
  TemplateFunc: (idxInCallingRule?: number, ...args: any[]) => any;
  PrefixDecl: (idxInCallingRule?: number, ...args: any[]) => any;
  iri: (idxInCallingRule?: number, ...args: any[]) => any;
  PrefixedName: (idxInCallingRule?: number, ...args: any[]) => any;
  ConstructTemplate: (idxInCallingRule?: number, ...args: any[]) => any;
  ConstructTriples: (idxInCallingRule?: number, ...args: any[]) => any;
  TriplesSameSubject: (idxInCallingRule?: number, ...args: any[]) => any;
  VarOrTerm: (idxInCallingRule?: number, ...args: any[]) => any;
  PropertyListNotEmpty: (idxInCallingRule?: number, ...args: any[]) => any;
  TriplesNode: (idxInCallingRule?: number, ...args: any[]) => any;
  PropertyList: (idxInCallingRule?: number, ...args: any[]) => any;
  GraphTerm: (idxInCallingRule?: number, ...args: any[]) => any;
  Verb: (idxInCallingRule?: number, ...args: any[]) => any;
  ObjectList: (idxInCallingRule?: number, ...args: any[]) => any;
  Object: (idxInCallingRule?: number, ...args: any[]) => any;
  Collection: (idxInCallingRule?: number, ...args: any[]) => any;
  BlankNodePropertyList: (idxInCallingRule?: number, ...args: any[]) => any;
  VarOrIri: (idxInCallingRule?: number, ...args: any[]) => any;
  RDFLiteral: (idxInCallingRule?: number, ...args: any[]) => any;
  NumericLiteral: (idxInCallingRule?: number, ...args: any[]) => any;
  NumericLiteralUnsigned: (idxInCallingRule?: number, ...args: any[]) => any;
  NumericLiteralPositive: (idxInCallingRule?: number, ...args: any[]) => any;
  NumericLiteralNegative: (idxInCallingRule?: number, ...args: any[]) => any;
  BooleanLiteral: (idxInCallingRule?: number, ...args: any[]) => any;
  BlankNode: (idxInCallingRule?: number, ...args: any[]) => any;
  GraphNode: (idxInCallingRule?: number, ...args: any[]) => any;
  Var: (idxInCallingRule?: number, ...args: any[]) => any;
  String: (idxInCallingRule?: number, ...args: any[]) => any;
}
