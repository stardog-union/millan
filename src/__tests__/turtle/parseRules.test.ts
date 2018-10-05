import { TurtleParser } from '../../turtle/TurtleParser';
import { tokenTypes as vocabulary } from '../../turtle/tokens';
import { Lexer } from 'chevrotain';

const parser = new TurtleParser();
const turtleLexer = new Lexer(vocabulary);

export const parse = (doc: string, rule: Function) => {
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
  it('parses an IRIREF that has a UCHAR in it', () => {
    const cst = parse(
      '<http://www.w3.org/2013/TurtleTests/\\u0020>',
      parser.iri
    );
    console.log(JSON.stringify(cst, null, 2));
    console.log(JSON.stringify(parser.errors, null, 2));
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

describe('NumericLiteral', () => {
  it('parses an INTEGER', () => {
    const cst = parse('2', parser.NumericLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('NumericLiteral');
    expect(cst.children['INTEGER']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a DECIMAL that lacks a characteristic', () => {
    const cst = parse('.2', parser.NumericLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('NumericLiteral');
    expect(cst.children['DECIMAL']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a DECIMAL with characteristic', () => {
    const cst = parse('1.2', parser.NumericLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('NumericLiteral');
    expect(cst.children['DECIMAL']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('fails to parse a lone decimal point; with neither characteristic nor mantissa', () => {
    parse('.', parser.NumericLiteral);
    expect(parser.errors).toHaveLength(1);
  });
  it('parses a DOUBLE', () => {
    const cst = parse('1.2e4', parser.NumericLiteral);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('NumericLiteral');
    expect(cst.children['DOUBLE']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
describe('collection', () => {
  it('parses empty collection', () => {
    const cst = parse('()', parser.collection);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('collection');
    expect(cst.children['LParen']).toHaveLength(1);
    expect(cst.children['RParen']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(2);
  });
  it('parses single object in collection', () => {
    const cst = parse('(<http://spooky.com>)', parser.collection);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('collection');
    expect(cst.children['LParen']).toHaveLength(1);
    expect(cst.children['object']).toHaveLength(1);
    expect(cst.children['RParen']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(3);
  });
});
describe('object', () => {
  it('parses an iri', () => {
    const cst = parse('<http://spooky.com>', parser.object);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('object');
    expect(cst.children['iri']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a BlankNode', () => {
    const cst = parse('_:22', parser.object);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('object');
    expect(cst.children['BlankNode']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a collection', () => {
    const cst = parse('()', parser.object);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('object');
    expect(cst.children['collection']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a blankNodePropertyList', () => {
    const cst = parse('[a()]', parser.object);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('object');
    expect(cst.children['blankNodePropertyList']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
  it('parses a literal', () => {
    const cst = parse('"true"', parser.object);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('object');
    expect(cst.children['literal']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
describe('literal', () => {
  it('parses a BooleanLiteral', () => {
    const cst = parse('"true', parser.literal);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('literal');
    expect(cst.children['BooleanLiteral']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
describe('blankNodePropertyList', () => {
  it('parses predicateObjectList', () => {
    const cst = parse('[a()]', parser.blankNodePropertyList);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('blankNodePropertyList');
    expect(cst.children['LBracket']).toHaveLength(1);
    expect(cst.children['predicateObjectList']).toHaveLength(1);
    expect(cst.children['RBracket']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(3);
  });
});
describe('predicateObjectList', () => {
  it('parses a verb and object list', () => {
    const cst = parse('a()', parser.predicateObjectList);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('predicateObjectList');
    expect(cst.children['verb']).toHaveLength(1);
    expect(cst.children['objectList']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(2);
  });
});
describe('verb', () => {
  it('parses an a', () => {
    const cst = parse('a', parser.verb);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('verb');
    expect(cst.children['A']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
describe('objectList', () => {
  it('parses an object', () => {
    const cst = parse('<http://spooky.com>', parser.objectList);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('objectList');
    expect(cst.children['object']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
describe('predicate', () => {
  it('parses an iri', () => {
    const cst = parse('<http://spooky.com>', parser.predicate);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('predicate');
    expect(cst.children['iri']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
describe('subject', () => {
  it('parses an iri', () => {
    const cst = parse('<http://spooky.com>', parser.subject);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('subject');
    expect(cst.children['iri']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
describe('triples', () => {
  it('parses a subject and predicateObjectList', () => {
    const cst = parse('<http://spooky.com> a ()', parser.triples);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('triples');
    expect(cst.children['subject']).toHaveLength(1);
    expect(cst.children['predicateObjectList']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(2);
  });
});
describe('sparqlPrefix', () => {
  it('parses a PREFIX and PNAME_NS and IRIREF', () => {
    const cst = parse(
      'PREFIX spooky: <http://spooky.com>',
      parser.sparqlPrefix
    );
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('sparqlPrefix');
    expect(cst.children['PREFIX']).toHaveLength(1);
    expect(cst.children['PNAME_NS']).toHaveLength(1);
    expect(cst.children['IRIREF']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(3);
  });
});
describe('sparqlBase', () => {
  it('parses a BASE and IRIREF', () => {
    const cst = parse('BASE <http://spooky.com>', parser.sparqlBase);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('sparqlBase');
    expect(cst.children['BASE']).toHaveLength(1);
    expect(cst.children['IRIREF']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(2);
  });
});
describe('base', () => {
  it('parses a base', () => {
    const cst = parse('@base <http://spooky.com> .', parser.base);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('base');
    expect(cst.children['TTL_BASE']).toHaveLength(1);
    expect(cst.children['IRIREF']).toHaveLength(1);
    expect(cst.children['Period']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(3);
  });
});
describe('prefixID', () => {
  it('parses a prefixID', () => {
    const cst = parse('@prefix spooky: <http://spooky.com> .', parser.prefixID);
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('prefixID');
    expect(cst.children['TTL_PREFIX']).toHaveLength(1);
    expect(cst.children['PNAME_NS']).toHaveLength(1);
    expect(cst.children['IRIREF']).toHaveLength(1);
    expect(cst.children['Period']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(4);
  });
});
describe('directive', () => {
  it('parses a directive', () => {
    const cst = parse(
      '@prefix spooky: <http://spooky.com> .',
      parser.directive
    );
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('directive');
    expect(cst.children['prefixID']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
describe('statement', () => {
  it('parses a statement', () => {
    const cst = parse(
      '@prefix spooky: <http://spooky.com> . .',
      parser.statement
    );
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('statement');
    expect(cst.children['directive']).toHaveLength(1);
    expect(cst.children['Period']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(2);
  });
});
describe('turtleDoc', () => {
  it('parses a turtleDoc', () => {
    const cst = parse(
      '@prefix spooky: <http://spooky.com> . .',
      parser.turtleDoc
    );
    expect(parser.errors).toHaveLength(0);
    expect(cst.name).toBe('turtleDoc');
    expect(cst.children['statement']).toHaveLength(1);
    expect(Object.keys(cst.children)).toHaveLength(1);
  });
});
