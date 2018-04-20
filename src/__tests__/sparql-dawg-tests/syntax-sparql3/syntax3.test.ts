import { parse } from 'language-server/parse-chevrotain';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const parseFile = (path: string) =>
  parse(readFileSync(join(dirname(__filename), path), 'utf8'));

describe('syntax3', () => {
  it('should pass general syntax tests', () => {
    expect(parseFile('syn-01.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-02.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-03.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-04.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-05.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-06.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-07.rq').parseErrors.length).toBe(0);
    expect(parseFile('syn-08.rq').parseErrors.length).toBe(0);
  });
  it('should fail bad syntax tests', () => {
    expect(parseFile('syn-bad-01.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-02.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-03.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-04.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-05.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-06.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-07.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-08.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-09.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-10.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-11.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-12.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-13.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-14.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-15.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-16.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-17.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-18.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-19.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-20.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-21.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-22.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-23.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-24.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-25.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-26.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-27.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-28.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-29.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-30.rq').parseErrors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-31.rq').parseErrors.length).toBeGreaterThan(0);
  });
  it('should fail bad bnode syntax tests', () => {
    expect(
      parseFile('syn-bad-bnode-dot.rq').parseErrors.length
    ).toBeGreaterThan(0);
    expect(
      parseFile('syn-bad-bnodes-missing-pvalues-01.rq').parseErrors.length
    ).toBeGreaterThan(0);
    expect(
      parseFile('syn-bad-bnodes-missing-pvalues-02.rq').parseErrors.length
    ).toBeGreaterThan(0);
  });
  it('should fail bad optional syntax tests', () => {
    expect(
      parseFile('syn-bad-empty-optional-01.rq').parseErrors.length
    ).toBeGreaterThan(0);
    expect(
      parseFile('syn-bad-empty-optional-02.rq').parseErrors.length
    ).toBeGreaterThan(0);
  });
  it('should fail bad filter syntax tests', () => {
    expect(
      parseFile('syn-bad-filter-missing-parens.rq').parseErrors.length
    ).toBeGreaterThan(0);
  });
  it('should fail bad lone rules syntax tests', () => {
    expect(
      parseFile('syn-bad-lone-list.rq').parseErrors.length
    ).toBeGreaterThan(0);
    expect(
      parseFile('syn-bad-lone-node.rq').parseErrors.length
    ).toBeGreaterThan(0);
  });
  // it('should handle blabel syntax tests', () => {
  // expect(parseFile('syn-blabel-cross-filter.rq').parseErrors.length).toBe(0);
  // expect(parseFile('syn-blabel-cross-graph-bad.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-blabel-cross-optional-bad.rq').parseErrors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-blabel-cross-union-bad.rq').parseErrors.length).toBeGreaterThan(0);
  // });
});
