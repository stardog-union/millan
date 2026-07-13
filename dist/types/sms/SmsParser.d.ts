import { IRecognitionException, IParserConfig } from 'chevrotain';
import { StardogSparqlParser } from '../sparql';
export declare class SmsParser extends StardogSparqlParser {
    parse: (document: string) => {
        errors: IRecognitionException[];
        cst: import("chevrotain").CstNode;
    };
    constructor(config?: Partial<IParserConfig>);
    MappingDoc: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    MappingClause: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    MappingDecl: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    FromClause: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    JsonClause: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    GraphQlClause: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    SqlClause: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    CsvClause: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    ToClause: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    WhereClause: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    Bind: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    BindExpression: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    TemplateFunc: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    Object: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
}
