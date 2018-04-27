import { join } from 'path';
import { getAllFileContents, makeExpectExtensionForParse } from './utils/main';
import { W3SpecSparqlParser } from '..';

const { parse } = new W3SpecSparqlParser();

expect.extend(makeExpectExtensionForParse(parse));

const allValidQueries = [
  ...getAllFileContents(
    join(__dirname, 'fixtures', 'sparql11', 'ebnf', 'goodDog')
  ),
];

const allInvalidQueries = [
  ...getAllFileContents(
    join(__dirname, 'fixtures', 'sparql11', 'ebnf', 'badDog')
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
