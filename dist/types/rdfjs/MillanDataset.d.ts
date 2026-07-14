import { Quad, QuadTermValue, DefaultGraph, SourceLocation } from './terms';
export declare class MillanDataset {
    private byKey;
    get size(): number;
    get totalSize(): number;
    add(quad: Quad): this;
    delete(quad: Quad): this;
    has(quad: Quad): boolean;
    occurrences(quad: Quad): Quad[];
    sourcesOf(quad: Quad): (SourceLocation | undefined)[];
    match(subject?: QuadTermValue | null, predicate?: QuadTermValue | null, object?: QuadTermValue | null, graph?: QuadTermValue | DefaultGraph | null): MillanDataset;
    [Symbol.iterator](): Iterator<Quad>;
    forEach(callback: (quad: Quad) => void): void;
}
