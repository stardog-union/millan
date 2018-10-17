import { join } from 'path';
import { getAllFileContents, makeExpectExtensionForParse } from './utils/main';
import { StardogSparqlParser } from '../..';

const { parse } = new StardogSparqlParser();

expect.extend(makeExpectExtensionForParse(parse));

const allValidQueries = [
  ...getAllFileContents(
    join(__dirname, 'fixtures', 'sparql11', 'ebnf', 'goodDog')
  ),
  ...getAllFileContents(
    join(__dirname, 'fixtures', 'stardogExtensions', 'ebnf', 'goodDog')
  ),
];

const allInvalidQueries = [
  ...getAllFileContents(
    join(__dirname, 'fixtures', 'sparql11', 'ebnf', 'badDog')
  ),
  ...getAllFileContents(
    join(__dirname, 'fixtures', 'stardogExtensions', 'ebnf', 'badDog')
  ),
];

describe('update', () => {
  allValidQueries.forEach((file) =>
    it(`"${file.name}" should parse with no errors`, () => {
      // @ts-ignore
      expect(file).toParseWithNoErrors();
    })
  );
  allInvalidQueries.forEach((file) =>
    it(`"${file.name}" should parse with errors`, () => {
      // @ts-ignore
      expect(file).toParseWithErrors();
    })
  );
});
