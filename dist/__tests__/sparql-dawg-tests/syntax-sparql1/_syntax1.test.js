"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SparqlParser_1 = require("../../../SparqlParser");
const fs_1 = require("fs");
const path_1 = require("path");
const jest_1 = require("jest");
const { parse } = new SparqlParser_1.SparqlParser();
const parseFile = (path) => parse(fs_1.readFileSync(path_1.join(path_1.dirname(__filename), path), 'utf8'));
jest_1.describe('syntax1', () => {
    jest_1.it('should pass basic syntax tests', () => {
        jest_1.expect(parseFile('syntax-basic-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-basic-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-basic-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-basic-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-basic-05.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-basic-06.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass bnodes syntax tests', () => {
        jest_1.expect(parseFile('syntax-bnodes-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-bnodes-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-bnodes-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-bnodes-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-bnodes-05.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass expression syntax tests', () => {
        jest_1.expect(parseFile('syntax-expr-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-expr-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-expr-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-expr-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-expr-05.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass forms syntax tests', () => {
        jest_1.expect(parseFile('syntax-forms-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-forms-02.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass limit and offset syntax tests', () => {
        jest_1.expect(parseFile('syntax-limit-offset-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-limit-offset-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-limit-offset-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-limit-offset-04.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass list syntax tests', () => {
        jest_1.expect(parseFile('syntax-lists-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lists-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lists-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lists-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lists-05.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass literal syntax tests', () => {
        jest_1.expect(parseFile('syntax-lit-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-05.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-06.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-07.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-08.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-09.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-10.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-11.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-12.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-13.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-14.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-15.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-16.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-17.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-18.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-19.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lit-20.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass order syntax tests', () => {
        jest_1.expect(parseFile('syntax-order-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-order-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-order-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-order-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-order-05.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-order-06.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-order-07.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass graph pattern syntax tests', () => {
        jest_1.expect(parseFile('syntax-pat-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-pat-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-pat-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-pat-04.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass qname syntax tests', () => {
        jest_1.expect(parseFile('syntax-qname-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-qname-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-qname-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-qname-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-qname-05.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-qname-06.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-qname-07.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-qname-08.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass struct syntax tests', () => {
        jest_1.expect(parseFile('syntax-struct-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-05.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-06.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-07.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-08.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-09.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-10.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-11.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-12.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-13.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-struct-14.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass union syntax tests', () => {
        jest_1.expect(parseFile('syntax-union-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-union-02.rq').errors.length).toBe(0);
    });
});
