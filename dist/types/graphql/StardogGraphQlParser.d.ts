import { BaseGraphQlParser } from './BaseGraphQlParser';
export declare class StardogGraphQlParser extends BaseGraphQlParser {
    private stardogGraphQlVisitor;
    constructor(options?: any);
    private visitCst;
    parse: (document: string, entryRule?: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>) => {
        errors: any[];
        cst: any;
    };
}
