import { TrigParser } from '../../trig/TrigParser';

const parser = new TrigParser();

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

describe('RDF 1.2 TriG', () => {
  it('parses version directives', () => expectClean('@version "1.2" .'));

  it('parses a reified triple at the top level', () =>
    expectClean('<< :s :p :o >> :y :z .'));

  it('parses a reified triple with no predicateObjectList', () =>
    expectClean('<< :s :p :o ~ :r >> .'));

  it('parses RDF 1.2 syntax inside a wrapped graph', () =>
    expectClean(':g { << :s :p :o >> :y :z . }'));

  it('parses annotations inside a wrapped graph', () =>
    expectClean(':g { :s :p :o {| :source :sensor |} . }'));

  it('parses triple terms inside a GRAPH block', () =>
    expectClean('GRAPH :g { :x :y <<( :s :p :o )>> . }'));

  it('parses directional language tags in graphs', () =>
    expectClean(':g { :a :b "hello"@en--ltr . }'));

  it('parses annotations on top-level triples', () =>
    expectClean(':s :p :o ~ :r {| :a :b |} .'));

  it('parses RDF 1.2 objects in a blankNodePropertyList statement', () =>
    expectClean('[ :p <<( :s :q :o )>> ] :y :z .'));

  it('rejects a reified triple as a graph label', () =>
    expectErrors('<< :s :p :o >> { :a :b :c . }'));

  it('rejects a triple term as subject inside a graph', () =>
    expectErrors(':g { <<( :s :p :o )>> :y :z . }'));

  describe('stardog mode', () => {
    it('still parses embedded triples in stardog mode', () => {
      const { errors } = parser.parse(
        prologue + '<< :s :p :o >> :y :z .',
        'stardog'
      );
      expect(errors).toHaveLength(0);
    });

    it('rejects annotation blocks in stardog mode', () => {
      const { errors } = parser.parse(
        prologue + ':g { :s :p :o {| :a :b |} . }',
        'stardog'
      );
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
