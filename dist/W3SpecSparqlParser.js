"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chevrotain_1 = require("chevrotain");
class W3SpecSparqlParser extends _1.BaseSparqlParser {
    constructor(options) {
        super(options, _1.baseTokens);
        chevrotain_1.Parser.performSelfAnalysis(this);
    }
}
exports.W3SpecSparqlParser = W3SpecSparqlParser;
