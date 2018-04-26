import { SparqlParser } from '../../SparqlParser';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';

const { parse } = new SparqlParser();

const parseFile = (path: string) =>
  parse(readFileSync(join(dirname(__filename), 'syntax-sparql1', path), 'utf8'));

describe('syntax1', () => {
  it('should pass basic syntax tests', () => {
    expect(parseFile('syntax-basic-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-basic-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-basic-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-basic-04.rq').errors.length).toBe(0);
    expect(parseFile('syntax-basic-05.rq').errors.length).toBe(0);
    expect(parseFile('syntax-basic-06.rq').errors.length).toBe(0);
  });
  it('should pass bnodes syntax tests', () => {
    expect(parseFile('syntax-bnodes-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-bnodes-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-bnodes-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-bnodes-04.rq').errors.length).toBe(0);
    expect(parseFile('syntax-bnodes-05.rq').errors.length).toBe(0);
  });
  it('should pass expression syntax tests', () => {
    expect(parseFile('syntax-expr-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-expr-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-expr-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-expr-04.rq').errors.length).toBe(0);
    expect(parseFile('syntax-expr-05.rq').errors.length).toBe(0);
  });
  it('should pass forms syntax tests', () => {
    expect(parseFile('syntax-forms-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-forms-02.rq').errors.length).toBe(0);
  });
  it('should pass limit and offset syntax tests', () => {
    expect(parseFile('syntax-limit-offset-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-limit-offset-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-limit-offset-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-limit-offset-04.rq').errors.length).toBe(0);
  });
  it('should pass list syntax tests', () => {
    expect(parseFile('syntax-lists-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lists-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lists-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lists-04.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lists-05.rq').errors.length).toBe(0);
  });
  it('should pass literal syntax tests', () => {
    expect(parseFile('syntax-lit-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-04.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-05.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-06.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-07.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-08.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-09.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-10.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-11.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-12.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-13.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-14.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-15.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-16.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-17.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-18.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-19.rq').errors.length).toBe(0);
    expect(parseFile('syntax-lit-20.rq').errors.length).toBe(0);
  });
  it('should pass order syntax tests', () => {
    expect(parseFile('syntax-order-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-order-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-order-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-order-04.rq').errors.length).toBe(0);
    expect(parseFile('syntax-order-05.rq').errors.length).toBe(0);
    expect(parseFile('syntax-order-06.rq').errors.length).toBe(0);
    expect(parseFile('syntax-order-07.rq').errors.length).toBe(0);
  });
  it('should pass graph pattern syntax tests', () => {
    expect(parseFile('syntax-pat-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-pat-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-pat-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-pat-04.rq').errors.length).toBe(0);
  });
  it('should pass qname syntax tests', () => {
    expect(parseFile('syntax-qname-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-qname-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-qname-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-qname-04.rq').errors.length).toBe(0);
    expect(parseFile('syntax-qname-05.rq').errors.length).toBe(0);
    expect(parseFile('syntax-qname-06.rq').errors.length).toBe(0);
    expect(parseFile('syntax-qname-07.rq').errors.length).toBe(0);
    expect(parseFile('syntax-qname-08.rq').errors.length).toBe(0);
  });
  it('should pass struct syntax tests', () => {
    expect(parseFile('syntax-struct-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-02.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-03.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-05.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-06.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-07.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-08.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-09.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-10.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-11.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-12.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-13.rq').errors.length).toBe(0);
    expect(parseFile('syntax-struct-14.rq').errors.length).toBe(0);
  });
  it('should pass union syntax tests', () => {
    expect(parseFile('syntax-union-01.rq').errors.length).toBe(0);
    expect(parseFile('syntax-union-02.rq').errors.length).toBe(0);
  });
});
