import { BaseSparqlParser } from './BaseSparqlParser';
export declare class StardogSparqlParser extends BaseSparqlParser {
    constructor(options?: any);
    Query: (idxInCallingRule?: number, ...args: any[]) => void;
    PathQuery: (idxInCallingRule?: number, ...args: any[]) => any;
    Via: (idxInCallingRule?: number, ...args: any[]) => any;
    PathTerminal: (idxInCallingRule?: number, ...args: any[]) => any;
    PathSpec: (idxInCallingRule?: number, ...args: any[]) => any;
    BuiltInCall: (idxInCallingRule?: number, ...args: any[]) => void;
    StardogOrCustomFunction: (idxInCallingRule?: number, ...args: any[]) => any;
    ConstructTemplate: (idxInCallingRule?: number, ...args: any[]) => void;
}
