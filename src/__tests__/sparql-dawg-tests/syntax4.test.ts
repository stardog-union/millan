import { SparqlParser } from '../../SparqlParser';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const { parse } = new SparqlParser({ config: {
  maxLookahead: 200,
}});

const parseFile = (path: string) =>
  parse(readFileSync(join(dirname(__filename), 'syntax-sparql4', path), 'utf8'));

describe('syntax4', () => {
  it('should pass general syntax tests', () => {
    expect(parseFile('syn-09.rq').errors.length).toBe(0);
    expect(parseFile('syn-10.rq').errors.length).toBe(0);
    expect(parseFile('syn-11.rq').errors.length).toBe(0);
    // console.log(JSON.stringify(parseFile('syn-leading-digits-in-prefixed-names.rq'), null, 2))
    expect(
      parseFile('syn-leading-digits-in-prefixed-names.rq').errors.length
    ).toBe(0);
  });
  // it('should fail bad syntax tests', () => {
  // expect(parseFile('syn-bad-34.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-35.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-36.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-37.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-38.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-GRAPH-breaks-BGP.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-OPT-breaks-BGP.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-UNION-breaks-BGP.rq').errors.length).toBeGreaterThan(0);
  // });
});
