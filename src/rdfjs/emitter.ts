import { CstElement, CstNode, IToken } from 'chevrotain';
import { unescape } from '../helpers/unescape';
import {
  BlankNode,
  Literal,
  NamedNode,
  Quad,
  QuadTermValue,
  DefaultGraph,
  SourceLocation,
  SourceRange,
  commonIris,
  defaultGraphInstance,
} from './terms';
import { MillanDataset } from './MillanDataset';

export interface EmitterOptions {
  // Base IRI for resolving relative IRIs; document @base/BASE directives
  // override it from their position onward.
  baseIRI?: string;
  // Recorded on every term's and quad's `source`; also used as the initial
  // base IRI when `baseIRI` is not given.
  sourceURL?: string;
}

export interface EmitterError {
  message: string;
  source?: SourceLocation;
}

const isCstNode = (element: CstElement): element is CstNode =>
  'children' in element;

// ---------------------------------------------------------------------------
// Source ranges

// Computes the token range covered by a CST element. millan parses without
// chevrotain's nodeLocationTracking, so ranges are derived by walking to the
// underlying tokens.
const rangeOf = (element: CstElement): SourceRange | undefined => {
  if (!isCstNode(element)) {
    const token = element as IToken;
    return {
      startOffset: token.startOffset,
      endOffset: token.endOffset,
      startLine: token.startLine,
      startColumn: token.startColumn,
      endLine: token.endLine,
      endColumn: token.endColumn,
    };
  }
  let first: SourceRange | undefined;
  let last: SourceRange | undefined;
  Object.keys(element.children).forEach((key) => {
    element.children[key].forEach((child) => {
      const childRange = rangeOf(child);
      if (!childRange) {
        return;
      }
      if (!first || childRange.startOffset < first.startOffset) {
        first = childRange;
      }
      if (!last || childRange.endOffset > last.endOffset) {
        last = childRange;
      }
    });
  });
  if (!first || !last) {
    return undefined;
  }
  return {
    startOffset: first.startOffset,
    endOffset: last.endOffset,
    startLine: first.startLine,
    startColumn: first.startColumn,
    endLine: last.endLine,
    endColumn: last.endColumn,
  };
};

const spanRanges = (
  from: SourceRange | undefined,
  to: SourceRange | undefined
): SourceRange | undefined =>
  from && to
    ? {
        startOffset: from.startOffset,
        endOffset: to.endOffset,
        startLine: from.startLine,
        startColumn: from.startColumn,
        endLine: to.endLine,
        endColumn: to.endColumn,
      }
    : from || to;

// Returns all child CST elements of a node, across every rule/token name,
// sorted by document position. Needed because chevrotain groups children by
// name, discarding interleaving order (e.g. which object an annotation
// follows).
const childrenInOrder = (node: CstNode): CstElement[] => {
  const all: CstElement[] = [];
  Object.keys(node.children).forEach((key) => {
    node.children[key].forEach((child) => all.push(child));
  });
  return all.sort(
    (a, b) => (rangeOf(a)?.startOffset ?? 0) - (rangeOf(b)?.startOffset ?? 0)
  );
};

const firstChild = (node: CstNode, name: string): CstElement | undefined =>
  node.children[name] && node.children[name][0];

// ---------------------------------------------------------------------------
// IRI resolution (RFC 3986 section 5, simplified but covering the usual
// Turtle cases: fragments, absolute paths, relative paths with dot-segment
// removal, and network-path references).

const SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*:/;

const removeDotSegments = (path: string): string => {
  const output: string[] = [];
  path.split('/').forEach((segment, index, segments) => {
    if (segment === '.') {
      if (index === segments.length - 1) {
        output.push('');
      }
      return;
    }
    if (segment === '..') {
      if (output.length > 1) {
        output.pop();
      }
      if (index === segments.length - 1) {
        output.push('');
      }
      return;
    }
    output.push(segment);
  });
  return output.join('/');
};

export const resolveIri = (base: string | undefined, iri: string): string => {
  if (SCHEME.test(iri) || !base) {
    return iri;
  }
  const hashIndex = base.indexOf('#');
  const baseNoHash = hashIndex === -1 ? base : base.slice(0, hashIndex);
  if (iri === '') {
    return baseNoHash;
  }
  if (iri.startsWith('#')) {
    return baseNoHash + iri;
  }
  const schemeMatch = SCHEME.exec(baseNoHash);
  const scheme = schemeMatch ? schemeMatch[0] : '';
  const afterScheme = baseNoHash.slice(scheme.length);
  const hasAuthority = afterScheme.startsWith('//');
  const authorityEnd = hasAuthority
    ? (afterScheme.slice(2) + '/').indexOf('/') + 2
    : 0;
  const authority = afterScheme.slice(0, authorityEnd);
  const basePath = afterScheme.slice(authorityEnd).replace(/[?].*$/, '');
  if (iri.startsWith('//')) {
    return scheme + iri;
  }
  if (iri.startsWith('/')) {
    return scheme + authority + removeDotSegments(iri);
  }
  const queryIndex = iri.indexOf('?');
  if (iri.startsWith('?')) {
    return scheme + authority + basePath + iri;
  }
  const lastSlash = basePath.lastIndexOf('/');
  const mergedPath =
    (lastSlash === -1 ? '' : basePath.slice(0, lastSlash + 1)) + iri;
  void queryIndex;
  return scheme + authority + removeDotSegments(mergedPath);
};

// ---------------------------------------------------------------------------
// Emitter

export class CstToQuadsEmitter {
  private dataset = new MillanDataset();
  private errors: EmitterError[] = [];
  private namespaces: { [prefix: string]: string } = {};
  private base: string | undefined;
  private sourceURL: string | undefined;
  private blankNodeCounter = 0;
  private currentGraph: QuadTermValue | DefaultGraph = defaultGraphInstance;

  constructor(options: EmitterOptions = {}) {
    this.sourceURL = options.sourceURL;
    this.base = options.baseIRI || options.sourceURL;
  }

  // Entry point for a TurtleParser CST ('standard' mode).
  emitTurtleDoc(cst: CstNode): {
    dataset: MillanDataset;
    errors: EmitterError[];
  } {
    (cst.children.statement || []).forEach((statement) =>
      this.statement(statement as CstNode)
    );
    return { dataset: this.dataset, errors: this.errors };
  }

  // Entry point for a TrigParser CST ('standard' mode).
  emitTrigDoc(cst: CstNode): {
    dataset: MillanDataset;
    errors: EmitterError[];
  } {
    // Directives and blocks interleave, and @base is positional, so process
    // in document order.
    childrenInOrder(cst).forEach((element) => {
      if (!isCstNode(element)) {
        return;
      }
      if (element.name === 'directive') {
        this.directive(element);
      } else if (element.name === 'block') {
        this.block(element);
      }
    });
    return { dataset: this.dataset, errors: this.errors };
  }

  // -- shared helpers -------------------------------------------------------

  private error(message: string, range?: SourceRange) {
    this.errors.push({
      message,
      source: range && this.locate(range),
    });
  }

  private locate(range: SourceRange): SourceLocation {
    return this.sourceURL ? { ...range, sourceURL: this.sourceURL } : range;
  }

  private freshBlankNode(range?: SourceRange): BlankNode {
    // Generated labels use a prefix that is valid blank-node-label syntax but
    // unlikely to collide with labels appearing in documents.
    return new BlankNode(
      `anon-${this.blankNodeCounter++}`,
      range && this.locate(range)
    );
  }

  private addQuad(
    subject: QuadTermValue,
    predicate: QuadTermValue,
    object: QuadTermValue,
    range?: SourceRange
  ) {
    this.dataset.add(
      new Quad(
        subject,
        predicate,
        object,
        this.currentGraph,
        range && this.locate(range)
      )
    );
  }

  private namedNode(iri: string, range?: SourceRange): NamedNode {
    return new NamedNode(iri, range && this.locate(range));
  }

  // -- directives -----------------------------------------------------------

  private statement(statement: CstNode) {
    const directive = firstChild(statement, 'directive');
    if (directive) {
      this.directive(directive as CstNode);
      return;
    }
    const triples = firstChild(statement, 'triples');
    if (triples) {
      this.triples(triples as CstNode);
    }
  }

  private directive(directive: CstNode) {
    const prefixNode = (firstChild(directive, 'prefixID') ||
      firstChild(directive, 'sparqlPrefix')) as CstNode | undefined;
    if (prefixNode) {
      const pnameNs = firstChild(prefixNode, 'PNAME_NS') as IToken;
      const iriRef = firstChild(prefixNode, 'IRIREF') as IToken;
      if (pnameNs && iriRef) {
        const prefix = pnameNs.image.slice(0, -1);
        this.namespaces[prefix] = resolveIri(
          this.base,
          this.iriRefValue(iriRef)
        );
      }
      return;
    }
    const baseNode = (firstChild(directive, 'base') ||
      firstChild(directive, 'sparqlBase')) as CstNode | undefined;
    if (baseNode) {
      const iriRef = firstChild(baseNode, 'IRIREF') as IToken;
      if (iriRef) {
        this.base = resolveIri(this.base, this.iriRefValue(iriRef));
      }
    }
    // version/sparqlVersion carry no graph content.
  }

  private iriRefValue(token: IToken): string {
    // The turtle IRIREF token pattern may capture trailing whitespace after
    // the closing '>', so trim before stripping the angle brackets.
    const inner = token.image.trimEnd().slice(1, -1);
    const unescaped = unescape(inner);
    return unescaped === null ? inner : unescaped;
  }

  // -- terms ----------------------------------------------------------------

  private iri(node: CstNode): NamedNode {
    const iriRef = firstChild(node, 'IRIREF') as IToken | undefined;
    if (iriRef) {
      return this.namedNode(
        resolveIri(this.base, this.iriRefValue(iriRef)),
        rangeOf(iriRef)
      );
    }
    const prefixedName = firstChild(node, 'PrefixedName') as CstNode;
    const token = (firstChild(prefixedName, 'PNAME_LN') ||
      firstChild(prefixedName, 'PNAME_NS')) as IToken;
    const image = token.image;
    const colonIndex = image.indexOf(':');
    const prefix = image.slice(0, colonIndex);
    const localEscaped = image.slice(colonIndex + 1);
    const local = unescape(localEscaped);
    const namespace = this.namespaces[prefix];
    if (namespace === undefined) {
      this.error(`Unknown prefix: '${prefix}:'`, rangeOf(token));
    }
    return this.namedNode(
      (namespace || '') + (local === null ? localEscaped : local),
      rangeOf(token)
    );
  }

  private blankNode(node: CstNode): BlankNode {
    const label = firstChild(node, 'BLANK_NODE_LABEL') as IToken | undefined;
    if (label) {
      return new BlankNode(label.image.slice(2), this.locate(rangeOf(label)));
    }
    return this.freshBlankNode(rangeOf(node));
  }

  private literal(node: CstNode): Literal {
    const rdfLiteral = firstChild(node, 'RDFLiteral') as CstNode | undefined;
    if (rdfLiteral) {
      return this.rdfLiteral(rdfLiteral);
    }
    const numeric = firstChild(node, 'NumericLiteral') as CstNode | undefined;
    if (numeric) {
      const integer = firstChild(numeric, 'INTEGER') as IToken | undefined;
      const decimal = firstChild(numeric, 'DECIMAL') as IToken | undefined;
      const token = (integer ||
        decimal ||
        firstChild(numeric, 'DOUBLE')) as IToken;
      const datatype = integer
        ? commonIris.xsdInteger
        : decimal
          ? commonIris.xsdDecimal
          : commonIris.xsdDouble;
      return new Literal(
        token.image,
        '',
        '',
        new NamedNode(datatype),
        this.locate(rangeOf(token))
      );
    }
    const boolean = firstChild(node, 'BooleanLiteral') as CstNode;
    const token = (firstChild(boolean, 'TRUE') ||
      firstChild(boolean, 'FALSE')) as IToken;
    return new Literal(
      token.image,
      '',
      '',
      new NamedNode(commonIris.xsdBoolean),
      this.locate(rangeOf(token))
    );
  }

  private rdfLiteral(node: CstNode): Literal {
    const stringNode = firstChild(node, 'String') as CstNode;
    const stringToken = childrenInOrder(stringNode)[0] as IToken;
    const image = stringToken.image;
    const quoteLength = /^("""|''')/.test(image) ? 3 : 1;
    const inner = image.slice(quoteLength, -quoteLength);
    const value = unescape(inner);

    const langDir = firstChild(node, 'LANG_DIR') as IToken | undefined;
    const doubleCaret = firstChild(node, 'DoubleCaret') as IToken | undefined;
    const datatypeIri = firstChild(node, 'iri') as CstNode | undefined;

    let language = '';
    let direction: '' | 'ltr' | 'rtl' = '';
    let datatype: NamedNode;
    if (langDir) {
      const tag = langDir.image.slice(1); // drop '@'
      const dirIndex = tag.indexOf('--');
      if (dirIndex !== -1) {
        language = tag.slice(0, dirIndex).toLowerCase();
        direction = tag.slice(dirIndex + 2).toLowerCase() as 'ltr' | 'rtl';
        datatype = new NamedNode(commonIris.rdfDirLangString);
      } else {
        language = tag.toLowerCase();
        datatype = new NamedNode(commonIris.rdfLangString);
      }
    } else if (datatypeIri && doubleCaret) {
      const bare = this.iri(datatypeIri);
      // Give the datatype term a range covering '^^' through the end of the
      // datatype IRI so reports can flag the whole datatype annotation.
      datatype = new NamedNode(
        bare.value,
        this.locate(spanRanges(rangeOf(doubleCaret), rangeOf(datatypeIri)))
      );
    } else {
      datatype = new NamedNode(commonIris.xsdString);
    }

    return new Literal(
      value === null ? inner : value,
      language,
      direction,
      datatype,
      this.locate(rangeOf(node))
    );
  }

  private collection(node: CstNode): QuadTermValue {
    const objects = (node.children.object || []) as CstNode[];
    if (objects.length === 0) {
      return this.namedNode(commonIris.rdfNil, rangeOf(node));
    }
    const first = this.namedNode(commonIris.rdfFirst);
    const rest = this.namedNode(commonIris.rdfRest);
    const listHeads = objects.map(() => this.freshBlankNode(rangeOf(node)));
    objects.forEach((objectNode, index) => {
      const itemRange = rangeOf(objectNode);
      this.addQuad(
        listHeads[index],
        first,
        this.objectTerm(objectNode),
        itemRange
      );
      this.addQuad(
        listHeads[index],
        rest,
        index + 1 < listHeads.length
          ? listHeads[index + 1]
          : this.namedNode(commonIris.rdfNil),
        itemRange
      );
    });
    return listHeads[0];
  }

  private blankNodePropertyList(node: CstNode): BlankNode {
    const subject = this.freshBlankNode(rangeOf(node));
    const propertyList = firstChild(node, 'predicateObjectList') as CstNode;
    if (propertyList) {
      this.predicateObjectList(subject, propertyList);
    }
    return subject;
  }

  // -- RDF 1.2 constructs ---------------------------------------------------

  // tripleTerm ::= '<<(' ttSubject verb ttObject ')>>' -- a quoted-triple
  // Quad used as a term (RDF/JS models quoted triples as Quad-valued terms).
  private tripleTerm(node: CstNode): Quad {
    const subject = this.simpleTerm(firstChild(node, 'ttSubject') as CstNode);
    const predicate = this.verb(firstChild(node, 'verb') as CstNode);
    const object = this.simpleTerm(firstChild(node, 'ttObject') as CstNode);
    return new Quad(
      subject,
      predicate,
      object,
      defaultGraphInstance,
      this.locate(rangeOf(node))
    );
  }

  // Handles ttSubject/ttObject/rtSubject/rtObject bodies (iri | BlankNode |
  // literal | tripleTerm | reifiedTriple, per position).
  private simpleTerm(node: CstNode): QuadTermValue {
    const iri = firstChild(node, 'iri') as CstNode | undefined;
    if (iri) {
      return this.iri(iri);
    }
    const blank = firstChild(node, 'BlankNode') as CstNode | undefined;
    if (blank) {
      return this.blankNode(blank);
    }
    const literal = firstChild(node, 'literal') as CstNode | undefined;
    if (literal) {
      return this.literal(literal);
    }
    const tripleTerm = firstChild(node, 'tripleTerm') as CstNode | undefined;
    if (tripleTerm) {
      return this.tripleTerm(tripleTerm);
    }
    const reified = firstChild(node, 'reifiedTriple') as CstNode | undefined;
    if (reified) {
      return this.reifiedTriple(reified);
    }
    this.error('Unsupported term', rangeOf(node));
    return this.freshBlankNode(rangeOf(node));
  }

  // reifiedTriple ::= '<<' rtSubject verb rtObject reifier? '>>'.
  // A reified triple denotes its reifier and asserts
  // `reifier rdf:reifies <<( s p o )>>`; it does NOT assert the base triple.
  private reifiedTriple(node: CstNode): QuadTermValue {
    const range = rangeOf(node);
    const subject = this.simpleTerm(firstChild(node, 'rtSubject') as CstNode);
    const predicate = this.verb(firstChild(node, 'verb') as CstNode);
    const object = this.simpleTerm(firstChild(node, 'rtObject') as CstNode);
    const reifierNode = firstChild(node, 'reifier') as CstNode | undefined;
    const reifier = reifierNode
      ? this.reifierTerm(reifierNode)
      : this.freshBlankNode(range);
    this.addQuad(
      reifier,
      this.namedNode(commonIris.rdfReifies),
      new Quad(
        subject,
        predicate,
        object,
        defaultGraphInstance,
        this.locate(range)
      ),
      range
    );
    return reifier;
  }

  private reifierTerm(node: CstNode): QuadTermValue {
    const iri = firstChild(node, 'iri') as CstNode | undefined;
    if (iri) {
      return this.iri(iri);
    }
    const blank = firstChild(node, 'BlankNode') as CstNode | undefined;
    if (blank) {
      return this.blankNode(blank);
    }
    return this.freshBlankNode(rangeOf(node));
  }

  // annotation ::= (reifier | annotationBlock)+ (empty annotations produce
  // no CST node). Each annotation element reifies the just-asserted triple:
  // a reifier asserts `r rdf:reifies <<( s p o )>>`; an annotation block
  // attaches its predicateObjectList to the immediately preceding reifier,
  // or to a fresh one when no reifier directly precedes it.
  private annotation(
    node: CstNode,
    subject: QuadTermValue,
    predicate: QuadTermValue,
    object: QuadTermValue
  ) {
    const tripleTermOf = (range?: SourceRange) =>
      new Quad(
        subject,
        predicate,
        object,
        defaultGraphInstance,
        range && this.locate(range)
      );
    let pendingReifier: QuadTermValue | null = null;
    childrenInOrder(node).forEach((element) => {
      if (!isCstNode(element)) {
        return;
      }
      const range = rangeOf(element);
      if (element.name === 'reifier') {
        const reifier = this.reifierTerm(element);
        this.addQuad(
          reifier,
          this.namedNode(commonIris.rdfReifies),
          tripleTermOf(range),
          range
        );
        pendingReifier = reifier;
      } else if (element.name === 'annotationBlock') {
        let reifier = pendingReifier;
        if (!reifier) {
          reifier = this.freshBlankNode(range);
          this.addQuad(
            reifier,
            this.namedNode(commonIris.rdfReifies),
            tripleTermOf(range),
            range
          );
        }
        const propertyList = firstChild(
          element,
          'predicateObjectList'
        ) as CstNode;
        if (propertyList) {
          this.predicateObjectList(reifier, propertyList);
        }
        pendingReifier = null;
      }
    });
  }

  // -- triples --------------------------------------------------------------

  private triples(node: CstNode) {
    const subjectNode = firstChild(node, 'subject') as CstNode | undefined;
    if (subjectNode) {
      const subject = this.subjectTerm(subjectNode);
      this.predicateObjectList(
        subject,
        firstChild(node, 'predicateObjectList') as CstNode
      );
      return;
    }
    const bnpl = firstChild(node, 'blankNodePropertyList') as
      CstNode | undefined;
    if (bnpl) {
      const subject = this.blankNodePropertyList(bnpl);
      const propertyList = firstChild(node, 'predicateObjectList') as
        CstNode | undefined;
      if (propertyList) {
        this.predicateObjectList(subject, propertyList);
      }
      return;
    }
    const reified = firstChild(node, 'reifiedTriple') as CstNode | undefined;
    if (reified) {
      const subject = this.reifiedTriple(reified);
      const propertyList = firstChild(node, 'predicateObjectList') as
        CstNode | undefined;
      if (propertyList) {
        this.predicateObjectList(subject, propertyList);
      }
      return;
    }
    const embedded = firstChild(node, 'EmbeddedTriplePattern');
    if (embedded) {
      this.error(
        "Stardog-mode embedded triple patterns are not RDF; parse with mode 'standard' to emit RDF/JS quads",
        rangeOf(embedded)
      );
    }
  }

  private subjectTerm(node: CstNode): QuadTermValue {
    const iri = firstChild(node, 'iri') as CstNode | undefined;
    if (iri) {
      return this.iri(iri);
    }
    const blank = firstChild(node, 'BlankNode') as CstNode | undefined;
    if (blank) {
      return this.blankNode(blank);
    }
    return this.collection(firstChild(node, 'collection') as CstNode);
  }

  private verb(node: CstNode): NamedNode {
    const aToken = firstChild(node, 'A') as IToken | undefined;
    if (aToken) {
      return this.namedNode(commonIris.rdfType, rangeOf(aToken));
    }
    const predicate = firstChild(node, 'predicate') as CstNode | undefined;
    if (predicate) {
      return this.iri(firstChild(predicate, 'iri') as CstNode);
    }
    // SPARQL-style CSTs put iri directly under verb.
    return this.iri(firstChild(node, 'iri') as CstNode);
  }

  private predicateObjectList(subject: QuadTermValue, node: CstNode) {
    const verbs = (node.children.verb || []) as CstNode[];
    const objectLists = (node.children.objectList || []) as CstNode[];
    verbs.forEach((verbNode, index) => {
      const objectList = objectLists[index];
      if (!objectList) {
        return;
      }
      const predicate = this.verb(verbNode);
      this.objectList(subject, predicate, objectList);
    });
  }

  private objectList(
    subject: QuadTermValue,
    predicate: QuadTermValue,
    node: CstNode
  ) {
    // objects and their (optional) annotations interleave; associate each
    // annotation with the object it follows by document position.
    let lastObject: { term: QuadTermValue; range?: SourceRange } | null = null;
    childrenInOrder(node).forEach((element) => {
      if (!isCstNode(element)) {
        return; // commas
      }
      if (element.name === 'object') {
        const range = rangeOf(element);
        const term = this.objectTerm(element);
        this.addQuad(subject, predicate, term, range);
        lastObject = { term, range };
      } else if (element.name === 'annotation' && lastObject) {
        this.annotation(element, subject, predicate, lastObject.term);
      }
    });
  }

  private objectTerm(node: CstNode): QuadTermValue {
    const iri = firstChild(node, 'iri') as CstNode | undefined;
    if (iri) {
      return this.iri(iri);
    }
    const blank = firstChild(node, 'BlankNode') as CstNode | undefined;
    if (blank) {
      return this.blankNode(blank);
    }
    const collection = firstChild(node, 'collection') as CstNode | undefined;
    if (collection) {
      return this.collection(collection);
    }
    const bnpl = firstChild(node, 'blankNodePropertyList') as
      CstNode | undefined;
    if (bnpl) {
      return this.blankNodePropertyList(bnpl);
    }
    const literal = firstChild(node, 'literal') as CstNode | undefined;
    if (literal) {
      return this.literal(literal);
    }
    const tripleTerm = firstChild(node, 'tripleTerm') as CstNode | undefined;
    if (tripleTerm) {
      return this.tripleTerm(tripleTerm);
    }
    const reified = firstChild(node, 'reifiedTriple') as CstNode | undefined;
    if (reified) {
      return this.reifiedTriple(reified);
    }
    this.error('Unsupported object term', rangeOf(node));
    return this.freshBlankNode(rangeOf(node));
  }

  // -- TriG -----------------------------------------------------------------

  private block(node: CstNode) {
    const graphToken = firstChild(node, 'GRAPH');
    const labelOrSubject = firstChild(node, 'labelOrSubject') as
      CstNode | undefined;
    const wrappedGraph = firstChild(node, 'wrappedGraph') as
      CstNode | undefined;
    if (graphToken && labelOrSubject && wrappedGraph) {
      this.inGraph(this.labelOrSubjectTerm(labelOrSubject), () =>
        this.wrappedGraph(wrappedGraph)
      );
      return;
    }
    const triplesOrGraph = firstChild(node, 'triplesOrGraph') as
      CstNode | undefined;
    if (triplesOrGraph) {
      this.triplesOrGraph(triplesOrGraph);
      return;
    }
    if (wrappedGraph) {
      this.wrappedGraph(wrappedGraph);
      return;
    }
    const triples2 = firstChild(node, 'triples2') as CstNode | undefined;
    if (triples2) {
      this.triples2(triples2);
    }
  }

  private labelOrSubjectTerm(node: CstNode): QuadTermValue {
    const iri = firstChild(node, 'iri') as CstNode | undefined;
    return iri
      ? this.iri(iri)
      : this.blankNode(firstChild(node, 'BlankNode') as CstNode);
  }

  private inGraph(graph: QuadTermValue, body: () => void) {
    const previous = this.currentGraph;
    this.currentGraph = graph;
    try {
      body();
    } finally {
      this.currentGraph = previous;
    }
  }

  private wrappedGraph(node: CstNode) {
    const triplesBlock = firstChild(node, 'triplesBlock') as
      CstNode | undefined;
    if (triplesBlock) {
      this.triplesBlock(triplesBlock);
    }
  }

  private triplesBlock(node: CstNode) {
    const triples = firstChild(node, 'triples') as CstNode | undefined;
    if (triples) {
      this.triples(triples);
    }
    const nested = firstChild(node, 'triplesBlock') as CstNode | undefined;
    if (nested) {
      this.triplesBlock(nested);
    }
  }

  private triplesOrGraph(node: CstNode) {
    const labelOrSubject = firstChild(node, 'labelOrSubject') as
      CstNode | undefined;
    const wrappedGraph = firstChild(node, 'wrappedGraph') as
      CstNode | undefined;
    if (labelOrSubject && wrappedGraph) {
      this.inGraph(this.labelOrSubjectTerm(labelOrSubject), () =>
        this.wrappedGraph(wrappedGraph)
      );
      return;
    }
    const propertyList = firstChild(node, 'predicateObjectList') as
      CstNode | undefined;
    if (labelOrSubject && propertyList) {
      this.predicateObjectList(
        this.labelOrSubjectTerm(labelOrSubject),
        propertyList
      );
      return;
    }
    const reified = firstChild(node, 'reifiedTriple') as CstNode | undefined;
    if (reified) {
      const subject = this.reifiedTriple(reified);
      if (propertyList) {
        this.predicateObjectList(subject, propertyList);
      }
    }
  }

  private triples2(node: CstNode) {
    const bnpl = firstChild(node, 'blankNodePropertyList') as
      CstNode | undefined;
    const propertyList = firstChild(node, 'predicateObjectList') as
      CstNode | undefined;
    if (bnpl) {
      const subject = this.blankNodePropertyList(bnpl);
      if (propertyList) {
        this.predicateObjectList(subject, propertyList);
      }
      return;
    }
    const collection = firstChild(node, 'collection') as CstNode | undefined;
    if (collection && propertyList) {
      this.predicateObjectList(this.collection(collection), propertyList);
    }
  }
}
