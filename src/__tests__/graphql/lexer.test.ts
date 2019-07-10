import { graphQlTokens } from '../../graphql/tokens';
import { Lexer } from 'chevrotain';
import * as path from 'path';
import { readDirAsync, readFileAsync } from '../utils';

const GOOD_FIXTURES_DIR = path.join(__dirname, 'fixtures', 'good');
const CATEGORY_PATTERN = /^categor(?:y|ies)/i;

const lexer = new Lexer(graphQlTokens);

const getAllGoodFixtures = () =>
  readDirAsync(GOOD_FIXTURES_DIR).then((filenames) =>
    Promise.all(
      // No snapshot for the GitHub schema, as it's much too large.
      filenames
        .filter((filename) => filename !== 'github-schema.graphql')
        .map((filename) =>
          readFileAsync(path.join(GOOD_FIXTURES_DIR, filename))
        )
    )
  );

describe('GraphQL Tokenizer', () => {
  it('correctly tokenizes all graphql-js fixtures', async () => {
    const fixtures = await getAllGoodFixtures();

    fixtures.forEach((fileContents) => {
      const tokens = lexer.tokenize(fileContents);
      const snapshotObj = JSON.parse(
        JSON.stringify(
          tokens,
          (key, value) => {
            if (CATEGORY_PATTERN.test(key)) {
              return; // remove all category keys in JSON string (it's noise)
            }
            return value;
          },
          2
        )
      );

      expect(snapshotObj).toMatchSnapshot();
    });
  });
});
