import { TurtleParser } from '../../turtle/TurtleParser';

const parser = new TurtleParser();

const prologue = '@prefix : <http://example.com/ns#> .\n';

const expectClean = (document: string) => {
  const { errors, semanticErrors } = parser.parse(prologue + document);
  expect(errors).toHaveLength(0);
  expect(semanticErrors).toHaveLength(0);
};

const expectErrors = (document: string) => {
  const { errors } = parser.parse(prologue + document);
  expect(errors.length).toBeGreaterThan(0);
};

describe('RDF 1.2 Turtle', () => {
  describe('version directives', () => {
    it('parses an @version directive', () => expectClean('@version "1.2" .'));
    it('parses an @version directive with single quotes', () =>
      expectClean("@version '1.2' ."));
    it('parses a SPARQL-style VERSION directive', () =>
      expectClean('VERSION "1.2"'));
    it('parses a lowercase SPARQL-style version directive', () =>
      expectClean('version "1.2-basic"'));
    it('rejects an unquoted version specifier', () =>
      expectErrors('@version 1.2 .'));
  });

  describe('directional language tags', () => {
    it('parses a language tag with a base direction', () =>
      expectClean(':a :b "Hello"@en--ltr .'));
    it('parses a subtagged language tag with a base direction', () =>
      expectClean(':a :b "שלום"@he-IL--rtl .'));
    it('still parses plain 1.1 language tags', () =>
      expectClean(':a :b "bonjour"@fr-BE .'));
  });

  describe('reified triples', () => {
    it('parses a reified triple as subject', () =>
      expectClean('<< :s :p :o >> :y :z .'));
    it('parses a reified triple with no following predicateObjectList', () =>
      expectClean('<< :s :p :o >> .'));
    it('parses a reified triple as object', () =>
      expectClean(':x :y << :s :p :o >> .'));
    it('parses a reified triple with an iri reifier', () =>
      expectClean('<< :s :p :o ~ :r >> :y :z .'));
    it('parses a reified triple with a blank node reifier', () =>
      expectClean('<< :s :p :o ~ _:r >> :y :z .'));
    it('parses a reified triple with an anonymous reifier', () =>
      expectClean('<< :s :p :o ~ >> :y :z .'));
    it('parses nested reified triples', () =>
      expectClean('<< << :s :p :o >> :y :z >> :q :r .'));
    it('parses a reified triple in a collection', () =>
      expectClean(':x :y ( << :s :p :o >> :z ) .'));
    it('rejects a literal as reified triple subject', () =>
      expectErrors('<< "s" :p :o >> :y :z .'));
    it('rejects a reified triple as predicate', () =>
      expectErrors(':s << :a :b :c >> :o .'));
  });

  describe('triple terms', () => {
    it('parses a triple term as object', () =>
      expectClean(':x :y <<( :s :p :o )>> .'));
    it('parses a nested triple term', () =>
      expectClean(':x :y <<( :s :p <<( :a :b :c )>> )>> .'));
    it('parses a triple term with a literal object', () =>
      expectClean(':x :y <<( :s :p "o"@en--ltr )>> .'));
    it('rejects a triple term as subject', () =>
      expectErrors('<<( :s :p :o )>> :y :z .'));
    it('rejects a triple term as triple term subject', () =>
      expectErrors(':x :y <<( <<( :a :b :c )>> :p :o )>> .'));
  });

  describe('annotations', () => {
    it('parses an annotation block', () =>
      expectClean(':s :p :o {| :source :sensor |} .'));
    it('parses an annotation block with multiple predicates', () =>
      expectClean(':s :p :o {| :source :sensor ; :level 5 |} .'));
    it('parses a bare reifier annotation', () =>
      expectClean(':s :p :o ~ :r .'));
    it('parses an anonymous reifier annotation', () =>
      expectClean(':s :p :o ~ .'));
    it('parses a reifier followed by an annotation block', () =>
      expectClean(':s :p :o ~ :r {| :source :sensor |} .'));
    it('parses multiple annotation blocks on one object', () =>
      expectClean(':s :p :o {| :a :b |} {| :c :d |} .'));
    it('parses annotations on multiple objects in an object list', () =>
      expectClean(':s :p :o1 {| :a :b |}, :o2 ~ :r2 .'));
    it('parses a nested annotation', () =>
      expectClean(':s :p :o {| :a :b {| :c :d |} |} .'));
    it('rejects an unterminated annotation block', () =>
      expectErrors(':s :p :o {| :a :b .'));
  });

  describe('mode interactions', () => {
    it('still parses stardog-style embedded triples in stardog mode', () => {
      const { errors } = parser.parse(
        prologue + '<< :s :p :o >> :y :z .',
        'stardog'
      );
      expect(errors).toHaveLength(0);
    });
    it('still rejects nested embedded triples in stardog mode', () => {
      const { errors } = parser.parse(
        prologue + '<< << :s :p :o >> :y :z >> a :Thing .',
        'stardog'
      );
      expect(errors.length).toBeGreaterThan(0);
    });
    it('rejects RDF 1.2 annotation syntax in stardog mode', () => {
      const { errors } = parser.parse(
        prologue + ':s :p :o {| :a :b |} .',
        'stardog'
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('CST shape', () => {
    it('produces spec-named CST nodes', () => {
      const { cst } = parser.parse(
        prologue + '<< :s :p :o ~ :r >> :y <<( :a :b :c )>> {| :d :e |} .'
      );
      const statement = cst.children.statement[1] || cst.children.statement[0];
      const names = JSON.stringify(cst);
      [
        'reifiedTriple',
        'rtSubject',
        'rtObject',
        'reifier',
        'tripleTerm',
        'ttSubject',
        'ttObject',
        'annotation',
        'annotationBlock',
      ].forEach((ruleName) => {
        expect(names).toContain(`"${ruleName}"`);
      });
      expect(statement).toBeTruthy();
    });
  });
});
