import { BaseGraphQlParser } from './BaseGraphQlParser';
export declare class StardogGraphQlParser extends BaseGraphQlParser {
    private stardogGraphQlVisitor;
    constructor(options?: any);
    private visitCst;
    parse: (document: string, entryRule?: (idxInCallingRule?: number, ...args: any[]) => any) => {
        errors: any[];
        cst: any;
    };
}
