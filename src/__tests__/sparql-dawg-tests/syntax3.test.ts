import { SparqlParser } from '../../SparqlParser';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const { parse } = new SparqlParser();

const parseFile = (path: string) =>
  parse(readFileSync(join(dirname(__filename), 'syntax-sparql3', path), 'utf8'));

describe('syntax3', () => {
  it('should pass general syntax tests', () => {
    expect(parseFile('syn-01.rq').errors.length).toBe(0);
    expect(parseFile('syn-02.rq').errors.length).toBe(0);
    expect(parseFile('syn-03.rq').errors.length).toBe(0);
    expect(parseFile('syn-04.rq').errors.length).toBe(0);
    expect(parseFile('syn-05.rq').errors.length).toBe(0);
    expect(parseFile('syn-06.rq').errors.length).toBe(0);
    expect(parseFile('syn-07.rq').errors.length).toBe(0);
    expect(parseFile('syn-08.rq').errors.length).toBe(0);
  });
  it('should fail bad syntax tests', () => {
    expect(parseFile('syn-bad-01.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-02.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-03.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-04.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-05.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-06.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-07.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-08.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-09.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-10.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-11.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-12.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-13.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-14.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-15.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-16.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-17.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-18.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-19.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-20.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-21.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-22.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-23.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-24.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-25.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-26.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-27.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-28.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-29.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-30.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-31.rq').errors.length).toBeGreaterThan(0);
  });
  it('should fail bad bnode syntax tests', () => {
    expect(parseFile('syn-bad-bnode-dot.rq').errors.length).toBeGreaterThan(0);
    expect(
      parseFile('syn-bad-bnodes-missing-pvalues-01.rq').errors.length
    ).toBeGreaterThan(0);
    expect(
      parseFile('syn-bad-bnodes-missing-pvalues-02.rq').errors.length
    ).toBeGreaterThan(0);
  });
  it('should fail bad optional syntax tests', () => {
    expect(
      parseFile('syn-bad-empty-optional-01.rq').errors.length
    ).toBeGreaterThan(0);
    expect(
      parseFile('syn-bad-empty-optional-02.rq').errors.length
    ).toBeGreaterThan(0);
  });
  it('should fail bad filter syntax tests', () => {
    expect(
      parseFile('syn-bad-filter-missing-parens.rq').errors.length
    ).toBeGreaterThan(0);
  });
  it('should fail bad lone rules syntax tests', () => {
    expect(parseFile('syn-bad-lone-list.rq').errors.length).toBeGreaterThan(0);
    expect(parseFile('syn-bad-lone-node.rq').errors.length).toBeGreaterThan(0);
  });
  // it('should handle blabel syntax tests', () => {
  // expect(parseFile('syn-blabel-cross-filter.rq').errors.length).toBe(0);
  // expect(parseFile('syn-blabel-cross-graph-bad.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-blabel-cross-optional-bad.rq').errors.length).toBeGreaterThan(0);
  // expect(parseFile('syn-blabel-cross-union-bad.rq').errors.length).toBeGreaterThan(0);
  // });
});
