import { W3SpecSparqlParser } from '../../sparql/W3SpecSparqlParser';
import { StardogSparqlParser } from '../../sparql/StardogSparqlParser';

const parser = new W3SpecSparqlParser();
const stardogParser = new StardogSparqlParser();

const expectClean = (query: string) => {
  const { errors } = parser.parse(query);
  expect(errors).toHaveLength(0);
};

const expectErrors = (query: string) => {
  const { errors } = parser.parse(query);
  expect(errors.length).toBeGreaterThan(0);
};

describe('SPARQL 1.2', () => {
  describe('VERSION declaration', () => {
    it('parses a VERSION declaration in the prologue', () =>
      expectClean(
        'VERSION "1.2" PREFIX : <http://ex.com/> SELECT * WHERE { ?s ?p ?o }'
      ));
    it('parses a single-quoted version specifier', () =>
      expectClean("VERSION '1.2-basic' SELECT * WHERE { ?s ?p ?o }"));
    it('rejects an unquoted version specifier', () =>
      expectErrors('VERSION 1.2 SELECT * WHERE { ?s ?p ?o }'));
  });

  describe('directional language tags', () => {
    it('parses literals with base direction', () =>
      expectClean('SELECT * WHERE { ?s ?p "hello"@en--ltr }'));
    it('parses plain language tags as before', () =>
      expectClean('SELECT * WHERE { ?s ?p "bonjour"@fr-BE }'));
  });

  describe('reified triple patterns', () => {
    it('parses a reified triple as subject', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { << :s :p :o >> :y :z }'
      ));
    it('parses a reified triple with a variable reifier', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { << ?s :p ?o ~ ?r >> :y :z }'
      ));
    it('parses a reified triple with an anonymous reifier', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { << :s :p :o ~ >> :y :z }'
      ));
    it('parses a nested reified triple as object', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { ?x :y << << :a :b :c >> :p "lit"@en--rtl >> }'
      ));
    it('parses a reified triple in a CONSTRUCT template', () =>
      expectClean(
        'PREFIX : <http://ex.com/> CONSTRUCT { << :s :p :o ~ :r >> :y :z } WHERE { ?s ?p ?o }'
      ));
    it('rejects a reified triple in predicate position', () =>
      expectErrors(
        'PREFIX : <http://ex.com/> SELECT * WHERE { :s << :a :b :c >> :o }'
      ));
  });

  describe('annotations', () => {
    it('parses an annotation block after an object', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { :s :p :o {| :source :sensor |} }'
      ));
    it('parses a bare reifier annotation', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { :s :p :o ~ ?r }'
      ));
    it('parses a reifier followed by an annotation block', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { ?s ?p ?o ~ ?r {| :a ?b |} }'
      ));
    it('parses annotations with property paths in the block', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { :s :p+ ?o {| :a/:b ?c |} }'
      ));
    it('parses annotations in CONSTRUCT templates', () =>
      expectClean(
        'PREFIX : <http://ex.com/> CONSTRUCT { :s :p :o {| :a :b |} } WHERE { ?s ?p ?o }'
      ));
    it('rejects an unterminated annotation block', () =>
      expectErrors(
        'PREFIX : <http://ex.com/> SELECT * WHERE { :s :p :o {| :a :b }'
      ));
  });

  describe('triple terms', () => {
    it('parses a triple term in object position', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { ?x :y <<( ?s :p "o" )>> }'
      ));
    it('parses a nested triple term', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { ?x :y <<( :s :p <<( :a :b :c )>> )>> }'
      ));
    it('parses a triple term in VALUES data', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT * WHERE { VALUES ?t { <<( :s :p 1 )>> UNDEF } }'
      ));
    it('rejects a literal subject in VALUES triple term data', () =>
      expectErrors(
        'PREFIX : <http://ex.com/> SELECT * WHERE { VALUES ?t { <<( "s" :p 1 )>> } }'
      ));
    it('parses a triple term in an expression', () =>
      expectClean(
        'PREFIX : <http://ex.com/> SELECT (<<( ?s :p ?o )>> AS ?t) WHERE { ?s :p ?o }'
      ));
  });

  describe('new built-in functions', () => {
    it.each([
      ['LANGDIR', 'SELECT (LANGDIR(?o) AS ?d) WHERE { ?s ?p ?o }'],
      [
        'STRLANGDIR',
        'SELECT (STRLANGDIR("x", "en", "ltr") AS ?l) WHERE { ?s ?p ?o }',
      ],
      ['hasLANG', 'SELECT * WHERE { ?s ?p ?o FILTER hasLANG(?o) }'],
      ['hasLANGDIR', 'SELECT * WHERE { ?s ?p ?o FILTER hasLANGDIR(?o) }'],
      ['isTRIPLE', 'SELECT * WHERE { ?s ?p ?o FILTER isTRIPLE(?o) }'],
      ['TRIPLE', 'SELECT (TRIPLE(?s, ?p, ?o) AS ?t) WHERE { ?s ?p ?o }'],
      ['SUBJECT', 'SELECT (SUBJECT(?t) AS ?s) WHERE { ?a ?b ?t }'],
      ['PREDICATE', 'SELECT (PREDICATE(?t) AS ?p) WHERE { ?a ?b ?t }'],
      ['OBJECT', 'SELECT (OBJECT(?t) AS ?o) WHERE { ?a ?b ?t }'],
    ])('parses %s', (_name, query) => expectClean(query));

    it('rejects STRLANGDIR with two arguments', () =>
      expectErrors('SELECT (STRLANGDIR("x", "en") AS ?l) WHERE { ?s ?p ?o }'));
  });

  describe('stardog dialect exclusions', () => {
    it('still parses stardog embedded triples', () => {
      const { errors } = stardogParser.parse(
        'PREFIX : <http://ex.com/> SELECT * WHERE { << :s :p :o >> :y :z }'
      );
      expect(errors).toHaveLength(0);
    });
    it('rejects SPARQL 1.2 annotation blocks', () => {
      const { errors } = stardogParser.parse(
        'PREFIX : <http://ex.com/> SELECT * WHERE { :s :p :o {| :a :b |} }'
      );
      expect(errors.length).toBeGreaterThan(0);
    });
    it('rejects SPARQL 1.2 triple terms', () => {
      const { errors } = stardogParser.parse(
        'PREFIX : <http://ex.com/> SELECT * WHERE { ?x :y <<( :s :p :o )>> }'
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
