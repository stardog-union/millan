"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SparqlParser_1 = require("../../../SparqlParser");
const fs_1 = require("fs");
const path_1 = require("path");
const jest_1 = require("jest");
const { parse } = new SparqlParser_1.SparqlParser();
const parseFile = (path) => parse(fs_1.readFileSync(path_1.join(path_1.dirname(__filename), path), 'utf8'));
jest_1.describe('syntax2', () => {
    jest_1.it('should pass bnode syntax tests', () => {
        jest_1.expect(parseFile('syntax-bnode-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-bnode-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-bnode-03.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass dataset syntax tests', () => {
        jest_1.expect(parseFile('syntax-dataset-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-dataset-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-dataset-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-dataset-04.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass esc syntax tests', () => {
        jest_1.expect(parseFile('syntax-esc-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-esc-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-esc-03.rq').errors.length).toBe(0);
        // expect(
        //   parseFile('syntax-esc-04.rq').errors.length
        // ).toBe(0);
        // expect(
        //   parseFile('syntax-esc-05.rq').errors.length
        // ).toBe(0);
    });
    jest_1.it('should pass form syntax tests', () => {
        jest_1.expect(parseFile('syntax-form-ask-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-construct01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-construct02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-construct03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-construct04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-construct06.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-describe01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-describe02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-select-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-form-select-02.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass function syntax tests', () => {
        jest_1.expect(parseFile('syntax-function-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-function-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-function-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-function-04.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass general syntax tests', () => {
        jest_1.expect(parseFile('syntax-general-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-05.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-06.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-07.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-08.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-09.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-10.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-11.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-12.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-13.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-general-14.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass graph syntax tests', () => {
        jest_1.expect(parseFile('syntax-graph-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-graph-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-graph-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-graph-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-graph-05.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass keywords syntax tests', () => {
        jest_1.expect(parseFile('syntax-keywords-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-keywords-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-keywords-03.rq').errors.length).toBe(0);
    });
    jest_1.it('should pass lists syntax tests', () => {
        jest_1.expect(parseFile('syntax-lists-01.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lists-02.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lists-03.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lists-04.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syntax-lists-05.rq').errors.length).toBe(0);
    });
});
