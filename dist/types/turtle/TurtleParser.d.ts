import { Parser } from 'chevrotain';
export declare class TurtleParser extends Parser {
    constructor();
    RDFLiteral: (idxInCallingRule?: number, ...args: any[]) => any;
    BooleanLiteral: (idxInCallingRule?: number, ...args: any[]) => any;
    String: (idxInCallingRule?: number, ...args: any[]) => any;
    iri: (idxInCallingRule?: number, ...args: any[]) => any;
    PrefixedName: (idxInCallingRule?: number, ...args: any[]) => any;
    BlankNode: (idxInCallingRule?: number, ...args: any[]) => any;
}
