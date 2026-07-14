import { Quad, QuadTermValue, DefaultGraph, quadKey } from './terms';

// A quad container with multiset semantics: the same (term-wise) quad can be
// asserted from several places in one or more documents, and every assertion
// site is retrievable. The RDF/JS DatasetCore-style methods (size, has,
// match, iteration) operate over *distinct* quads, so callers that only care
// about the graph see set semantics; `occurrences`/`totalSize` expose the
// underlying multiset for provenance/reporting use cases (e.g. a ShEx
// validator flagging the source range of every assertion of an offending
// triple).
export class MillanDataset {
  private byKey: Map<string, Quad[]> = new Map();

  // Number of distinct quads (DatasetCore semantics).
  get size(): number {
    return this.byKey.size;
  }

  // Number of assertions, counting duplicates.
  get totalSize(): number {
    let total = 0;
    this.byKey.forEach((occurrences) => (total += occurrences.length));
    return total;
  }

  add(quad: Quad): this {
    const key = quadKey(quad);
    const existing = this.byKey.get(key);
    if (existing) {
      existing.push(quad);
    } else {
      this.byKey.set(key, [quad]);
    }
    return this;
  }

  // Removes ALL occurrences of the (term-wise) quad.
  delete(quad: Quad): this {
    this.byKey.delete(quadKey(quad));
    return this;
  }

  has(quad: Quad): boolean {
    return this.byKey.has(quadKey(quad));
  }

  // All assertion sites of the given (term-wise) quad, in document order of
  // insertion. Each returned Quad instance carries its own `source` and its
  // terms carry theirs.
  occurrences(quad: Quad): Quad[] {
    return [...(this.byKey.get(quadKey(quad)) || [])];
  }

  match(
    subject?: QuadTermValue | null,
    predicate?: QuadTermValue | null,
    object?: QuadTermValue | null,
    graph?: QuadTermValue | DefaultGraph | null
  ): MillanDataset {
    const matched = new MillanDataset();
    this.byKey.forEach((occurrences) => {
      const representative = occurrences[0];
      if (
        (!subject || representative.subject.equals(subject)) &&
        (!predicate || representative.predicate.equals(predicate)) &&
        (!object || representative.object.equals(object)) &&
        (!graph || representative.graph.equals(graph))
      ) {
        occurrences.forEach((occurrence) => matched.add(occurrence));
      }
    });
    return matched;
  }

  // Iterates one representative instance (the first assertion) per distinct
  // quad.
  [Symbol.iterator](): Iterator<Quad> {
    const iterator = this.byKey.values();
    return {
      next(): IteratorResult<Quad> {
        const { done, value } = iterator.next();
        return done
          ? { done: true, value: undefined }
          : { done: false, value: value[0] };
      },
    };
  }

  forEach(callback: (quad: Quad) => void): void {
    this.byKey.forEach((occurrences) => callback(occurrences[0]));
  }
}
