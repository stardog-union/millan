// An implementation of the RDF/JS Data Model interfaces
// (https://rdf.js.org/data-model-spec/) whose terms carry source-location
// metadata pointing back into the parsed document. `equals()` is strictly
// term-wise per the spec -- source locations never participate -- so two
// occurrences of the same term (or quad) from different places in different
// documents compare equal while remaining distinct instances whose `source`
// says where each was asserted.

// A range of source text, in both offset and line/column forms, as reported
// by the millan lexer (chevrotain conventions: offsets are 0-based with an
// INCLUSIVE endOffset; lines and columns are 1-based and inclusive).
export interface SourceRange {
  startOffset: number;
  endOffset: number;
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface SourceLocation extends SourceRange {
  // Where the document came from; supplied by the caller (graph names are
  // data, not provenance, so the source URL is carried out-of-band).
  sourceURL?: string;
}

export type SourcedTerm =
  NamedNode | BlankNode | Literal | Variable | DefaultGraph | Quad;

export class NamedNode {
  public readonly termType = 'NamedNode' as const;
  constructor(
    public readonly value: string,
    public readonly source?: SourceLocation
  ) {}
  equals(other?: { termType: string; value: string } | null): boolean {
    return (
      Boolean(other) &&
      other.termType === this.termType &&
      other.value === this.value
    );
  }
}

export class BlankNode {
  public readonly termType = 'BlankNode' as const;
  constructor(
    public readonly value: string,
    public readonly source?: SourceLocation
  ) {}
  equals(other?: { termType: string; value: string } | null): boolean {
    return (
      Boolean(other) &&
      other.termType === this.termType &&
      other.value === this.value
    );
  }
}

export class Variable {
  public readonly termType = 'Variable' as const;
  constructor(
    public readonly value: string,
    public readonly source?: SourceLocation
  ) {}
  equals(other?: { termType: string; value: string } | null): boolean {
    return (
      Boolean(other) &&
      other.termType === this.termType &&
      other.value === this.value
    );
  }
}

export class DefaultGraph {
  public readonly termType = 'DefaultGraph' as const;
  public readonly value = '' as const;
  equals(other?: { termType: string } | null): boolean {
    return Boolean(other) && other.termType === this.termType;
  }
}

// The one shared default graph instance (it carries no source: it is never
// written in a document).
export const defaultGraphInstance = new DefaultGraph();

export class Literal {
  public readonly termType = 'Literal' as const;
  constructor(
    public readonly value: string,
    // Language tag (lowercased per RDF Concepts), or '' for non-language
    // literals.
    public readonly language: string,
    // RDF 1.2 base direction ('ltr' | 'rtl'), or '' when none.
    public readonly direction: '' | 'ltr' | 'rtl',
    // For the ShEx-style "flag the ^^xsd:integer range" use case, the
    // datatype NamedNode's own source range covers the '^^' through the end
    // of the datatype IRI when the datatype was written explicitly; for
    // implied datatypes (plain strings, numeric/boolean shorthand,
    // language-tagged strings) the datatype has no source of its own.
    public readonly datatype: NamedNode,
    // Source of the entire literal (opening quote through language tag or
    // datatype).
    public readonly source?: SourceLocation
  ) {}
  equals(
    other?: {
      termType: string;
      value: string;
      language?: string;
      direction?: string;
      datatype?: { value: string };
    } | null
  ): boolean {
    return (
      Boolean(other) &&
      other.termType === this.termType &&
      other.value === this.value &&
      (other.language || '') === this.language &&
      (other.direction || '') === this.direction &&
      Boolean(other.datatype) &&
      other.datatype.value === this.datatype.value
    );
  }
}

export type QuadTermValue = NamedNode | BlankNode | Literal | Variable | Quad;

export class Quad {
  public readonly termType = 'Quad' as const;
  public readonly value = '' as const;
  constructor(
    public readonly subject: QuadTermValue,
    public readonly predicate: QuadTermValue,
    public readonly object: QuadTermValue,
    public readonly graph: QuadTermValue | DefaultGraph,
    // Source of the syntax responsible for this quad. For quads produced by
    // desugaring (collections, annotations, rdf:reifies) this is the range
    // of the construct that implied them.
    public readonly source?: SourceLocation
  ) {}
  equals(other?: any): boolean {
    return (
      Boolean(other) &&
      other.termType === this.termType &&
      this.subject.equals(other.subject) &&
      this.predicate.equals(other.predicate) &&
      this.object.equals(other.object) &&
      this.graph.equals(other.graph)
    );
  }
}

// Well-known IRIs used during emission.
const RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const XSD = 'http://www.w3.org/2001/XMLSchema#';
export const commonIris = {
  rdfType: `${RDF}type`,
  rdfFirst: `${RDF}first`,
  rdfRest: `${RDF}rest`,
  rdfNil: `${RDF}nil`,
  rdfReifies: `${RDF}reifies`,
  rdfLangString: `${RDF}langString`,
  rdfDirLangString: `${RDF}dirLangString`,
  xsdString: `${XSD}string`,
  xsdInteger: `${XSD}integer`,
  xsdDecimal: `${XSD}decimal`,
  xsdDouble: `${XSD}double`,
  xsdBoolean: `${XSD}boolean`,
};

// Serializes a term to a canonical string for use as a multiset key. This is
// N-Triples-like but does not aim to be valid N-Triples; it only needs to be
// injective over terms.
export const termKey = (term: QuadTermValue | DefaultGraph): string => {
  switch (term.termType) {
    case 'NamedNode':
      return `<${term.value}>`;
    case 'BlankNode':
      return `_:${term.value}`;
    case 'Variable':
      return `?${term.value}`;
    case 'DefaultGraph':
      return '';
    case 'Literal': {
      const literal = term as Literal;
      const suffix = literal.language
        ? `@${literal.language}${literal.direction ? `--${literal.direction}` : ''}`
        : `^^<${literal.datatype.value}>`;
      return `${JSON.stringify(literal.value)}${suffix}`;
    }
    case 'Quad': {
      const quad = term as Quad;
      return `<<(${termKey(quad.subject)} ${termKey(quad.predicate)} ${termKey(
        quad.object
      )})>>`;
    }
  }
};

export const quadKey = (quad: Quad): string =>
  `${termKey(quad.subject)} ${termKey(quad.predicate)} ${termKey(
    quad.object
  )} ${termKey(quad.graph)}`;
