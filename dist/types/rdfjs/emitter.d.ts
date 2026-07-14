import { CstNode } from 'chevrotain';
import { SourceLocation } from './terms';
import { MillanDataset } from './MillanDataset';
export interface EmitterOptions {
    baseIRI?: string;
    sourceURL?: string;
}
export interface EmitterError {
    message: string;
    source?: SourceLocation;
}
export declare const resolveIri: (base: string | undefined, iri: string) => string;
export declare class CstToQuadsEmitter {
    private dataset;
    private errors;
    private namespaces;
    private base;
    private sourceURL;
    private blankNodeCounter;
    private documentBlankNodeLabels;
    private currentGraph;
    constructor(options?: EmitterOptions);
    emitTurtleDoc(cst: CstNode): {
        dataset: MillanDataset;
        errors: EmitterError[];
    };
    emitTrigDoc(cst: CstNode): {
        dataset: MillanDataset;
        errors: EmitterError[];
    };
    private error;
    private locate;
    private freshBlankNode;
    private addQuad;
    private namedNode;
    private statement;
    private directive;
    private iriRefValue;
    private iri;
    private blankNode;
    private literal;
    private rdfLiteral;
    private collection;
    private blankNodePropertyList;
    private tripleTerm;
    private simpleTerm;
    private reifiedTriple;
    private reifierTerm;
    private annotation;
    private triples;
    private subjectTerm;
    private verb;
    private predicateObjectList;
    private objectList;
    private objectTerm;
    private block;
    private labelOrSubjectTerm;
    private inGraph;
    private wrappedGraph;
    private triplesBlock;
    private triplesOrGraph;
    private triples2;
}
