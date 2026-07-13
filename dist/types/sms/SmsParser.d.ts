import { IRecognitionException, IParserConfig } from 'chevrotain';
import { StardogSparqlParser } from '../sparql';
export declare class SmsParser extends StardogSparqlParser {
    parse: (document: string) => {
        errors: IRecognitionException[];
        cst: any;
    };
    constructor(config?: Partial<IParserConfig>);
    MappingDoc: (idxInCallingRule?: number, ...args: any[]) => void | any;
    MappingClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    MappingDecl: (idxInCallingRule?: number, ...args: any[]) => void | any;
    FromClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    JsonClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    GraphQlClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    SqlClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    CsvClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    ToClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    WhereClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    Bind: (idxInCallingRule?: number, ...args: any[]) => void | any;
    BindExpression: (idxInCallingRule?: number, ...args: any[]) => void | any;
    TemplateFunc: (idxInCallingRule?: number, ...args: any[]) => void | any;
    Object: (idxInCallingRule?: number, ...args: any[]) => void | any;
}
