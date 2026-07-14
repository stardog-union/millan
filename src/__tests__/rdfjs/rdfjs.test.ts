import {
  parseTurtleToRdfjs,
  parseTrigToRdfjs,
  NamedNode,
  Literal,
  Quad,
  commonIris,
  defaultGraphInstance,
  resolveIri,
} from '../../rdfjs';

const FOAF = 'http://xmlns.com/foaf/0.1/';
const XSD = 'http://www.w3.org/2001/XMLSchema#';

const prologue = [
  '@prefix foaf: <http://xmlns.com/foaf/0.1/> .',
  '@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .',
  '@prefix : <http://example.com/ns#> .',
  '',
].join('\n');

const parse = (body: string, options = {}) => {
  const result = parseTurtleToRdfjs(prologue + body, options);
  expect(result.errors).toHaveLength(0);
  expect(result.emitterErrors).toHaveLength(0);
  return result;
};

describe('rdfjs adapter', () => {
  describe('the ShEx validation use case', () => {
    const doc = '<#Alice> foaf:name "Alice"^^xsd:integer .';

    it('exposes the ^^xsd:integer range on the object literal datatype', () => {
      const source = prologue + doc;
      const { dataset } = parse(doc, {
        baseIRI: 'http://example.com/doc',
        sourceURL: 'http://example.com/doc.ttl',
      });
      expect(dataset.size).toBe(1);
      const [quad] = [...dataset];
      const literal = quad.object as Literal;
      expect(literal.value).toBe('Alice');
      expect(literal.datatype.value).toBe(`${XSD}integer`);

      // The datatype term's range covers '^^xsd:integer' so a validator can
      // flag exactly that span.
      const datatypeSource = literal.datatype.source;
      const flagged = source.slice(
        datatypeSource.startOffset,
        datatypeSource.endOffset + 1 // chevrotain endOffset is inclusive
      );
      expect(flagged).toBe('^^xsd:integer');
      expect(datatypeSource.sourceURL).toBe('http://example.com/doc.ttl');

      // The whole-literal range covers the full lexical form.
      const literalSource = literal.source;
      expect(
        source.slice(literalSource.startOffset, literalSource.endOffset + 1)
      ).toBe('"Alice"^^xsd:integer');
    });

    it('resolves the relative subject against the base IRI', () => {
      const { dataset } = parse(doc, { baseIRI: 'http://example.com/doc' });
      const [quad] = [...dataset];
      expect(quad.subject.value).toBe('http://example.com/doc#Alice');
      expect(quad.predicate.value).toBe(`${FOAF}name`);
    });
  });

  describe('duplicate assertions (multiset)', () => {
    // The same triple asserted three times: twice in one object list and
    // once via a repeated predicate.
    const doc = [
      '<#Alice> foaf:name "Alice"^^xsd:integer , "Alice"^^xsd:integer ;',
      '  foaf:mbox <mailto:alice@example.com> ;',
      '  foaf:name "Alice"^^xsd:integer .',
    ].join('\n');

    it('records every assertion site while keeping set semantics', () => {
      const source = prologue + doc;
      const { dataset } = parse(doc, { baseIRI: 'http://example.com/doc' });

      // Two distinct quads: the name triple and the mbox triple.
      expect(dataset.size).toBe(2);
      expect(dataset.totalSize).toBe(4);

      const [nameQuad] = [
        ...dataset.match(null, new NamedNode(`${FOAF}name`), null, null),
      ];
      const occurrences = dataset.occurrences(nameQuad);
      expect(occurrences).toHaveLength(3);

      // Each occurrence is term-wise equal to the others...
      occurrences.forEach((occurrence) => {
        expect(occurrence.equals(nameQuad)).toBe(true);
      });

      // ...but each points at a different place in the document.
      const objectRanges = occurrences.map((occurrence) =>
        source.slice(
          (occurrence.object as Literal).source.startOffset,
          (occurrence.object as Literal).source.endOffset + 1
        )
      );
      expect(objectRanges).toEqual([
        '"Alice"^^xsd:integer',
        '"Alice"^^xsd:integer',
        '"Alice"^^xsd:integer',
      ]);
      const startOffsets = occurrences.map(
        (occurrence) => occurrence.source.startOffset
      );
      expect(new Set(startOffsets).size).toBe(3);
    });

    it('compares quads from different documents as equal', () => {
      const first = parse('<http://x.example/s> foaf:name "Alice" .', {
        sourceURL: 'http://example.com/a.ttl',
      });
      const second = parse('<http://x.example/s>\n\tfoaf:name\n\t"Alice" .', {
        sourceURL: 'http://example.com/b.ttl',
      });
      const [quadA] = [...first.dataset];
      const [quadB] = [...second.dataset];
      expect(quadA.equals(quadB)).toBe(true);
      expect(quadA.source.sourceURL).toBe('http://example.com/a.ttl');
      expect(quadB.source.sourceURL).toBe('http://example.com/b.ttl');
    });
  });

  describe('term construction', () => {
    it('expands a and prefixed names', () => {
      const { dataset } = parse(':alice a foaf:Person .');
      const [quad] = [...dataset];
      expect(quad.subject.value).toBe('http://example.com/ns#alice');
      expect(quad.predicate.value).toBe(commonIris.rdfType);
      expect(quad.object.value).toBe(`${FOAF}Person`);
    });

    it('types numeric and boolean literals', () => {
      const { dataset } = parse(':s :int 5 ; :dec 5.5 ; :dbl 5e0 ; :b true .');
      const byPredicate = (local: string) =>
        [
          ...dataset.match(
            null,
            new NamedNode(`http://example.com/ns#${local}`)
          ),
        ][0].object as Literal;
      expect(byPredicate('int').datatype.value).toBe(`${XSD}integer`);
      expect(byPredicate('dec').datatype.value).toBe(`${XSD}decimal`);
      expect(byPredicate('dbl').datatype.value).toBe(`${XSD}double`);
      expect(byPredicate('b').datatype.value).toBe(`${XSD}boolean`);
      expect(byPredicate('int').value).toBe('5');
    });

    it('handles language tags with and without base direction', () => {
      const { dataset } = parse(
        ':s :plain "chat"@fr ; :dir "chat"@fr-BE--ltr .'
      );
      const plain = [
        ...dataset.match(null, new NamedNode('http://example.com/ns#plain')),
      ][0].object as Literal;
      expect(plain.language).toBe('fr');
      expect(plain.direction).toBe('');
      expect(plain.datatype.value).toBe(commonIris.rdfLangString);
      const directional = [
        ...dataset.match(null, new NamedNode('http://example.com/ns#dir')),
      ][0].object as Literal;
      expect(directional.language).toBe('fr-be');
      expect(directional.direction).toBe('ltr');
      expect(directional.datatype.value).toBe(commonIris.rdfDirLangString);
    });

    it('unescapes string literals and prefixed-name local escapes', () => {
      const { dataset } = parse(':s :p "a\\tb\\u00e9" ; :q :with\\~tilde .');
      const literal = [
        ...dataset.match(null, new NamedNode('http://example.com/ns#p')),
      ][0].object as Literal;
      expect(literal.value).toBe('a\tbé');
      const object = [
        ...dataset.match(null, new NamedNode('http://example.com/ns#q')),
      ][0].object;
      expect(object.value).toBe('http://example.com/ns#with~tilde');
    });

    it('expands collections to rdf:first/rdf:rest lists', () => {
      const { dataset } = parse(':s :p (1 2) .');
      const first = new NamedNode(commonIris.rdfFirst);
      const rest = new NamedNode(commonIris.rdfRest);
      expect([...dataset.match(null, first)]).toHaveLength(2);
      const tails = [...dataset.match(null, rest)];
      expect(tails).toHaveLength(2);
      expect(
        tails.some((quad) => quad.object.value === commonIris.rdfNil)
      ).toBe(true);
    });

    it('never collides generated blank node labels with document labels', () => {
      // The document uses the very labels the generator would otherwise
      // produce first ('anon-0', 'anon-1'); the [ ... ] property list must
      // get a distinct one.
      const { dataset } = parse('_:anon-0 :p _:anon-1 .\n[ :q 1 ] :r :o .');
      const subjects = new Set<string>();
      dataset.forEach((quad) => {
        if (quad.subject.termType === 'BlankNode') {
          subjects.add(quad.subject.value);
        }
      });
      expect(subjects.has('anon-0')).toBe(true);
      const generated = [...subjects].filter(
        (label) => label !== 'anon-0' && label !== 'anon-1'
      );
      expect(generated).toHaveLength(1);
      // and the generated label collides with neither document label
      expect(['anon-0', 'anon-1']).not.toContain(generated[0]);
    });

    it('exposes assertion-site locations via sourcesOf', () => {
      const source = prologue + ':s :p :o . :s :p :o .';
      const { dataset } = parseTurtleToRdfjs(source, {
        sourceURL: 'http://example.com/d.ttl',
      });
      const [quad] = [...dataset];
      const sites = dataset.sourcesOf(quad);
      expect(sites).toHaveLength(2);
      sites.forEach((site) => {
        expect(typeof site.startOffset).toBe('number');
        expect(site.sourceURL).toBe('http://example.com/d.ttl');
      });
      expect(sites[0].startOffset).not.toBe(sites[1].startOffset);
    });

    it('emits blankNodePropertyList contents', () => {
      const { dataset } = parse('[ foaf:name "Nested" ] :p :o .');
      expect(dataset.size).toBe(2);
      const [nameQuad] = [...dataset.match(null, new NamedNode(`${FOAF}name`))];
      expect(nameQuad.subject.termType).toBe('BlankNode');
    });
  });

  describe('RDF 1.2 constructs', () => {
    it('emits triple terms as quoted-triple Quad terms', () => {
      const { dataset } = parse(':x :y <<( :s :p 1 )>> .');
      const [quad] = [...dataset];
      expect(quad.object.termType).toBe('Quad');
      const quoted = quad.object as Quad;
      expect(quoted.subject.value).toBe('http://example.com/ns#s');
      expect((quoted.object as Literal).value).toBe('1');
    });

    it('desugars reified triples without asserting the base triple', () => {
      const { dataset } = parse('<< :s :p :o ~ :r >> :y :z .');
      // reifier rdf:reifies <<( s p o )>> plus reifier :y :z -- but not s p o
      expect(dataset.size).toBe(2);
      const [reifies] = [
        ...dataset.match(null, new NamedNode(commonIris.rdfReifies)),
      ];
      expect(reifies.subject.value).toBe('http://example.com/ns#r');
      expect(reifies.object.termType).toBe('Quad');
      const [assertion] = [
        ...dataset.match(null, new NamedNode('http://example.com/ns#y')),
      ];
      expect(assertion.subject.value).toBe('http://example.com/ns#r');
    });

    it('attaches annotation blocks to the preceding reifier', () => {
      const { dataset } = parse(':s :p :o ~ :r {| :level 5 |} .');
      // s p o asserted; r rdf:reifies <<(s p o)>>; r :level 5
      expect(dataset.size).toBe(3);
      const [levelQuad] = [
        ...dataset.match(null, new NamedNode('http://example.com/ns#level')),
      ];
      expect(levelQuad.subject.value).toBe('http://example.com/ns#r');
      const [reifies] = [
        ...dataset.match(null, new NamedNode(commonIris.rdfReifies)),
      ];
      expect(reifies.subject.value).toBe('http://example.com/ns#r');
    });

    it('gives bare annotation blocks a fresh reifier', () => {
      const { dataset } = parse(':s :p :o {| :level 5 |} .');
      const [levelQuad] = [
        ...dataset.match(null, new NamedNode('http://example.com/ns#level')),
      ];
      expect(levelQuad.subject.termType).toBe('BlankNode');
      const [reifies] = [
        ...dataset.match(null, new NamedNode(commonIris.rdfReifies)),
      ];
      expect(reifies.subject.equals(levelQuad.subject)).toBe(true);
    });
  });

  describe('TriG', () => {
    it('assigns quads to labeled and GRAPH-labeled graphs', () => {
      const doc =
        prologue +
        [':s :p :o .', ':g1 { :a :b :c . }', 'GRAPH :g2 { :d :e :f . }'].join(
          '\n'
        );
      const { dataset, errors, emitterErrors } = parseTrigToRdfjs(doc);
      expect(errors).toHaveLength(0);
      expect(emitterErrors).toHaveLength(0);
      expect(dataset.size).toBe(3);
      const graphOf = (subjectLocal: string) =>
        [
          ...dataset.match(
            new NamedNode(`http://example.com/ns#${subjectLocal}`)
          ),
        ][0].graph;
      expect(graphOf('s').equals(defaultGraphInstance)).toBe(true);
      expect(graphOf('a').value).toBe('http://example.com/ns#g1');
      expect(graphOf('d').value).toBe('http://example.com/ns#g2');
    });
  });

  describe('error handling', () => {
    it('still emits quads from the parseable parts of a broken document', () => {
      const result = parseTurtleToRdfjs(
        prologue + ':good :p :o .\n:broken :p .\n:alsoGood :p :o .'
      );
      expect(result.errors.length).toBeGreaterThan(0);
      expect([
        ...result.dataset.match(new NamedNode('http://example.com/ns#good')),
      ]).toHaveLength(1);
      expect([
        ...result.dataset.match(
          new NamedNode('http://example.com/ns#alsoGood')
        ),
      ]).toHaveLength(1);
    });

    it('reports undefined prefixes as emitter errors with locations', () => {
      const result = parseTurtleToRdfjs('<http://x.example/s> undefined:p 1 .');
      expect(result.emitterErrors.length).toBeGreaterThan(0);
      expect(result.emitterErrors[0].message).toContain('undefined:');
      expect(result.emitterErrors[0].source.startOffset).toBeGreaterThan(0);
    });
  });

  describe('IRI resolution', () => {
    it.each([
      ['http://a/b/c/d', 'e', 'http://a/b/c/e'],
      ['http://a/b/c/d', './e', 'http://a/b/c/e'],
      ['http://a/b/c/d', '../e', 'http://a/b/e'],
      ['http://a/b/c/d', '/e', 'http://a/e'],
      ['http://a/b/c/d', '#f', 'http://a/b/c/d#f'],
      ['http://a/b/c/d#x', '#f', 'http://a/b/c/d#f'],
      ['http://a/b/c/d', '//h/e', 'http://h/e'],
      ['http://a/b/c/d', 'http://other/x', 'http://other/x'],
      ['http://a/b/c/d', '', 'http://a/b/c/d'],
    ])('resolves %s + %s', (base, relative, expected) => {
      expect(resolveIri(base, relative)).toBe(expected);
    });

    it('applies @base directives positionally', () => {
      const { dataset } = parse(
        '@base <http://one.example/> .\n<s1> :p :o .\n@base <http://two.example/> .\n<s2> :p :o .'
      );
      const subjects = [...dataset].map((quad) => quad.subject.value).sort();
      expect(subjects).toEqual([
        'http://one.example/s1',
        'http://two.example/s2',
      ]);
    });
  });
});
