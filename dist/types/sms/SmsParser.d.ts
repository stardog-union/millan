import { IRecognitionException, IParserConfig } from 'chevrotain';
import { StardogSparqlParser } from 'sparql';
export declare class SmsParser extends StardogSparqlParser {
    parse: (document: string) => {
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
    CsvClause: (idxInCallingRule?: number, ...args: any[]) => any;
    ToClause: (idxInCallingRule?: number, ...args: any[]) => any;
    WhereClause: (idxInCallingRule?: number, ...args: any[]) => void;
    Bind: (idxInCallingRule?: number, ...args: any[]) => void;
    BindExpression: (idxInCallingRule?: number, ...args: any[]) => any;
    TemplateFunc: (idxInCallingRule?: number, ...args: any[]) => any;
    TriplesSameSubject: (idxInCallingRule?: number, ...args: any[]) => void;
    PropertyListNotEmpty: (idxInCallingRule?: number, ...args: any[]) => void;
    Object: (idxInCallingRule?: number, ...args: any[]) => void;
}
