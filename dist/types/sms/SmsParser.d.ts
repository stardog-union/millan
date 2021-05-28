import { IRecognitionException, IParserConfig } from 'chevrotain';
import { StardogSparqlParser } from '../sparql';
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
    WhereClause: (idxInCallingRule?: number, ...args: any[]) => any;
    Bind: (idxInCallingRule?: number, ...args: any[]) => any;
    BindExpression: (idxInCallingRule?: number, ...args: any[]) => any;
    TemplateFunc: (idxInCallingRule?: number, ...args: any[]) => any;
    Object: (idxInCallingRule?: number, ...args: any[]) => any;
}
