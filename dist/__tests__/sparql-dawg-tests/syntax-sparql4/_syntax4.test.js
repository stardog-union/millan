"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SparqlParser_1 = require("../../../SparqlParser");
const fs_1 = require("fs");
const path_1 = require("path");
const jest_1 = require("jest");
const { parse } = new SparqlParser_1.SparqlParser();
const parseFile = (path) => parse(fs_1.readFileSync(path_1.join(path_1.dirname(__filename), path), 'utf8'));
jest_1.describe('syntax4', () => {
    jest_1.it('should pass general syntax tests', () => {
        jest_1.expect(parseFile('syn-09.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syn-10.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syn-11.rq').errors.length).toBe(0);
        jest_1.expect(parseFile('syn-leading-digits-in-prefixed-names.rq').errors.length).toBe(0);
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
