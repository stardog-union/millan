"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseSparqlParser_1 = require("./BaseSparqlParser");
const tokens_1 = require("./tokens");
const chevrotain_1 = require("chevrotain");
class W3SpecSparqlParser extends BaseSparqlParser_1.BaseSparqlParser {
    constructor(options) {
        super(options, tokens_1.baseTokens);
        chevrotain_1.Parser.performSelfAnalysis(this);
    }
}
exports.W3SpecSparqlParser = W3SpecSparqlParser;
