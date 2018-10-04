import { TurtleParser } from '../../turtle/TurtleParser';
import { tokenTypes as vocabulary } from '../../turtle/tokens';
import { Lexer } from 'chevrotain';

const parser = new TurtleParser();
const turtleLexer = new Lexer(vocabulary);

const parse = (doc: string, rule: Function) => {
  const testTokens = turtleLexer.tokenize(doc).tokens;
  parser.input = testTokens;
  const cst = rule.bind(parser)();
  return cst;
};

describe('BlankNode', () => {
  afterEach(() => {
    parser.input = [];
  });
  it('parses a BLANK_NODE_LABEL', () => {
    const cst = parse('_:o', parser.BlankNode);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('BlankNode');
  });
  it('parses an ANON', () => {
    const cst = parse('[]', parser.BlankNode);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('BlankNode');
  });
  it('fails to parse a single bracket', () => {
    parse('[', parser.BlankNode);
    expect(parser.errors).toHaveLength(1);
  });
});

describe('PrefixedName', () => {
  it('parses a PrefixedName with prefix "foo"', () => {
    const cst = parse('foo:bar', parser.PrefixedName);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('PrefixedName');
    expect(cst.children['PNAME_LN']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a PrefixedName with an empty prefix to PNAME_LN', () => {
    const cst = parse(':bar', parser.PrefixedName);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('PrefixedName');
    expect(cst.children['PNAME_LN']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a PrefixedName to PNAME_NS', () => {
    const cst = parse('foo:', parser.PrefixedName);
    expect(parser.errors).toHaveLength(0);
    expect(cst.children['PNAME_NS']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});

describe('iri', () => {
  it('parses an IRIREF', () => {
    const cst = parse('<blahblahblahNOCOLONS>', parser.iri);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('iri');
    expect(cst.children['IRIREF']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses an IRIREF that looks like a url', () => {
    const cst = parse('<http://goeataneggpaul.org>', parser.iri);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('iri');
    expect(cst.children['IRIREF']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a PrefixedName as an iri', () => {
    const cst = parse('foo:bar', parser.iri);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('iri');
    expect(cst.children['PrefixedName']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('fails to parse a colonless, bracketless word as an iri', () => {
    parse('foo', parser.iri);
    expect(parser.errors).toHaveLength(1);
  });
});

describe('String', () => {
  it('parses "spooky" as a STRING_LITERAL_QUOTE', () => {
    const cst = parse('"spooky"', parser.String);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('String');
    expect(cst.children['STRING_LITERAL_QUOTE']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it("parses 'pantalones' as a STRING_LITERAL_SINGLE_QUOTE", () => {
    const cst = parse("'pantalones'", parser.String);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('String');
    expect(cst.children['STRING_LITERAL_SINGLE_QUOTE']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it("parses '''caca'h'uates''' as a STRING_LITERAL_LONG_SINGLE_QUOTE", () => {
    const cst = parse("'''caca'h'uates'''", parser.String);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('String');
    expect(cst.children['STRING_LITERAL_LONG_SINGLE_QUOTE']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses """caca"h"uates""" as a STRING_LITERAL_LONG_QUOTE', () => {
    const cst = parse('"""caca"h"uates"""', parser.String);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('String');
    expect(cst.children['STRING_LITERAL_LONG_QUOTE']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('fails to parse unquoted strings', () => {
    parse('unquotable', parser.String);
    expect(parser.errors).toHaveLength(1);
  });
});

describe('BooleanLiteral', () => {
  it('parses "true" as a BooleanLiteral', () => {
    const cst = parse('true', parser.BooleanLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('BooleanLiteral');
    expect(cst.children['TRUE']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses "false" as a BooleanLiteral', () => {
    const cst = parse('false', parser.BooleanLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('BooleanLiteral');
    expect(cst.children['FALSE']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('fails to parse "\'false" as a BooleanLiteral', () => {
    parse("'false'", parser.BooleanLiteral);
    expect(parser.errors).toHaveLength(1);
  });
});

describe('RDFLiteral', () => {
  it('parses a string', () => {
    const cst = parse('"fluorescent"', parser.RDFLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('RDFLiteral');
    expect(cst.children['String']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a string followed by a double careted iri', () => {
    const cst = parse('"fluorescent" ^^<spooky>', parser.RDFLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('RDFLiteral');
    expect(cst.children['String']).toHaveLength(1);
    expect(cst.children['iri']).toHaveLength(1);
    expect(cst.children['DoubleCaret']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(3);
  });
  it('parses a string followed by a LANGTAG', () => {
    const cst = parse('"fluorescent" @japanese', parser.RDFLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('RDFLiteral');
    expect(cst.children['String']).toHaveLength(1);
    expect(cst.children['LANGTAG']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(2);
  });
  it('fails to parse only a LANGTAG', () => {
    parse('@spanish', parser.RDFLiteral);
    expect(parser.errors).toHaveLength(1);
  });
});
