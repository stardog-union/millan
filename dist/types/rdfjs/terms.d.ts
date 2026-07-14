export interface SourceRange {
    startOffset: number;
    endOffset: number;
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
}
export interface SourceLocation extends SourceRange {
    sourceURL?: string;
}
export type SourcedTerm = NamedNode | BlankNode | Literal | Variable | DefaultGraph | Quad;
export declare class NamedNode {
    readonly value: string;
    readonly source?: SourceLocation;
    readonly termType: "NamedNode";
    constructor(value: string, source?: SourceLocation);
    equals(other?: {
        termType: string;
        value: string;
    } | null): boolean;
}
export declare class BlankNode {
    readonly value: string;
    readonly source?: SourceLocation;
    readonly termType: "BlankNode";
    constructor(value: string, source?: SourceLocation);
    equals(other?: {
        termType: string;
        value: string;
    } | null): boolean;
}
export declare class Variable {
    readonly value: string;
    readonly source?: SourceLocation;
    readonly termType: "Variable";
    constructor(value: string, source?: SourceLocation);
    equals(other?: {
        termType: string;
        value: string;
    } | null): boolean;
}
export declare class DefaultGraph {
    readonly termType: "DefaultGraph";
    readonly value: "";
    equals(other?: {
        termType: string;
    } | null): boolean;
}
export declare const defaultGraphInstance: DefaultGraph;
export declare class Literal {
    readonly value: string;
    readonly language: string;
    readonly direction: '' | 'ltr' | 'rtl';
    readonly datatype: NamedNode;
    readonly source?: SourceLocation;
    readonly termType: "Literal";
    constructor(value: string, language: string, direction: '' | 'ltr' | 'rtl', datatype: NamedNode, source?: SourceLocation);
    equals(other?: {
        termType: string;
        value: string;
        language?: string;
        direction?: string;
        datatype?: {
            value: string;
        };
    } | null): boolean;
}
export type QuadTermValue = NamedNode | BlankNode | Literal | Variable | Quad;
export declare class Quad {
    readonly subject: QuadTermValue;
    readonly predicate: QuadTermValue;
    readonly object: QuadTermValue;
    readonly graph: QuadTermValue | DefaultGraph;
    readonly source?: SourceLocation;
    readonly termType: "Quad";
    readonly value: "";
    constructor(subject: QuadTermValue, predicate: QuadTermValue, object: QuadTermValue, graph: QuadTermValue | DefaultGraph, source?: SourceLocation);
    equals(other?: any): boolean;
}
export declare const commonIris: {
    rdfType: string;
    rdfFirst: string;
    rdfRest: string;
    rdfNil: string;
    rdfReifies: string;
    rdfLangString: string;
    rdfDirLangString: string;
    xsdString: string;
    xsdInteger: string;
    xsdDecimal: string;
    xsdDouble: string;
    xsdBoolean: string;
};
export declare const termKey: (term: QuadTermValue | DefaultGraph) => string;
export declare const quadKey: (quad: Quad) => string;
