import { parse } from 'language-server/parse-chevrotain';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const parseFile = (path: string) =>
  parse(readFileSync(join(dirname(__filename), path), 'utf8'));

describe('syntax4', () => {
  it('should pass general syntax tests', () => {
    expect(parseFile('syn-09.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-10.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-11.rq').parseErrors.length).toBe(0);
    expect(
      parseFile('syn-leading-digits-in-prefixed-names.rq').parseErrors.length
    ).toBe(0);
  });
  // it('should fail bad syntax tests', () => {
  // expect(parseFile('syn-bad-34.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-35.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-36.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-37.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-38.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-GRAPH-breaks-BGP.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-OPT-breaks-BGP.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-bad-UNION-breaks-BGP.rq').parseErrors.length).toBeGreaterThan(0);
  // });
});
