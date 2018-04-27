"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const main_1 = require("./utils/main");
const __1 = require("..");
const { parse } = new __1.W3SpecSparqlParser();
expect.extend(main_1.makeExpectExtensionForParse(parse));
const allValidQueries = [
    ...main_1.getAllFileContents(path_1.join(__dirname, 'fixtures', 'sparql11', 'ebnf', 'goodDog')),
];
const allInvalidQueries = [
    ...main_1.getAllFileContents(path_1.join(__dirname, 'fixtures', 'sparql11', 'ebnf', 'badDog')),
];
describe('update', () => {
    allValidQueries.forEach((file) => it(`"${file.name}" should parse with no errors`, () => {
        // @ts-ignore
        expect(file).toParseWithNoErrors();
    }));
    allInvalidQueries.forEach((file) => it(`"${file.name}" should parse with errors`, () => {
        // @ts-ignore
        expect(file).toParseWithErrors();
    }));
});
