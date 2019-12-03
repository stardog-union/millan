import { BaseSparqlParser } from './BaseSparqlParser';
export declare class StardogSparqlParser extends BaseSparqlParser {
    constructor(options?: any);
    Query: (idxInCallingRule?: number, ...args: any[]) => void;
    PathQuery: (idxInCallingRule?: number, ...args: any[]) => any;
    Via: (idxInCallingRule?: number, ...args: any[]) => any;
    PathTerminal: (idxInCallingRule?: number, ...args: any[]) => any;
    PathSpec: (idxInCallingRule?: number, ...args: any[]) => any;
    GraphPatternNotTriples: (idxInCallingRule?: number, ...args: any[]) => void;
    TriplesSameSubject: (idxInCallingRule?: number, ...args: any[]) => void;
    Object: (idxInCallingRule?: number, ...args: any[]) => void;
    TriplesSameSubjectPath: (idxInCallingRule?: number, ...args: any[]) => void;
    GraphNodePath: (idxInCallingRule?: number, ...args: any[]) => void;
    EmbeddedTriplePattern: (idxInCallingRule?: number, ...args: any[]) => any;
    VarOrTermOrEmbeddedTriplePattern: (idxInCallingRule?: number, ...args: any[]) => any;
    Bind: (idxInCallingRule?: number, ...args: any[]) => void;
    ExpressionOrEmbeddedTriplePattern: (idxInCallingRule?: number, ...args: any[]) => any;
    VarOrBlankNodeOrIriOrLit: (idxInCallingRule?: number, ...args: any[]) => any;
    Unnest: (idxInCallingRule?: number, ...args: any[]) => any;
    BuiltInCall: (idxInCallingRule?: number, ...args: any[]) => void;
    StardogOrCustomFunction: (idxInCallingRule?: number, ...args: any[]) => any;
    ConstructTemplate: (idxInCallingRule?: number, ...args: any[]) => void;
}
