import { BaseSparqlParser } from './BaseSparqlParser';
export declare class StardogSparqlParser extends BaseSparqlParser {
    constructor(options?: any, tokens?: any, shouldSkipAnalysis?: any);
    Query: (idxInCallingRule?: number, ...args: any[]) => any;
    PathQuery: (idxInCallingRule?: number, ...args: any[]) => any;
    Via: (idxInCallingRule?: number, ...args: any[]) => any;
    PathTerminal: (idxInCallingRule?: number, ...args: any[]) => any;
    PathSpec: (idxInCallingRule?: number, ...args: any[]) => any;
    GraphPatternNotTriples: (idxInCallingRule?: number, ...args: any[]) => any;
    TriplesSameSubject: (idxInCallingRule?: number, ...args: any[]) => any;
    PropertyListNotEmpty: (idxInCallingRule?: number, ...args: any[]) => any;
    EmbeddedPropertyList: (idxInCallingRule?: number, ...args: any[]) => any;
    Object: (idxInCallingRule?: number, ...args: any[]) => any;
    TriplesSameSubjectPath: (idxInCallingRule?: number, ...args: any[]) => any;
    PropertyListPathNotEmpty: (idxInCallingRule?: number, ...args: any[]) => any;
    EmbeddedPropertyListPath: (idxInCallingRule?: number, ...args: any[]) => any;
    GraphNodePath: (idxInCallingRule?: number, ...args: any[]) => any;
    EmbeddedTriplePattern: (idxInCallingRule?: number, ...args: any[]) => any;
    VarOrTermOrEmbeddedTriplePattern: (idxInCallingRule?: number, ...args: any[]) => any;
    Bind: (idxInCallingRule?: number, ...args: any[]) => any;
    ExpressionOrEmbeddedTriplePattern: (idxInCallingRule?: number, ...args: any[]) => any;
    VarOrBlankNodeOrIriOrLit: (idxInCallingRule?: number, ...args: any[]) => any;
    Unnest: (idxInCallingRule?: number, ...args: any[]) => any;
    BuiltInCall: (idxInCallingRule?: number, ...args: any[]) => any;
    StardogOrCustomFunction: (idxInCallingRule?: number, ...args: any[]) => any;
    ConstructTemplate: (idxInCallingRule?: number, ...args: any[]) => any;
}
