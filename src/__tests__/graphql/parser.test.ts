import * as path from 'path';
import { StandardGraphQlParser } from '../../graphql/StandardGraphQlParser';
import { readDirAsync, readFileAsync } from '../utils';

const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const CATEGORY_PATTERN = /^categor(?:y|ies)/i;

const standardParser = new StandardGraphQlParser();

const getAllFixtures = () =>
  readDirAsync(FIXTURES_DIR).then((filenames) =>
    Promise.all(
      filenames.map((filename) =>
        readFileAsync(path.join(FIXTURES_DIR, filename)).then(
          (fileContents) => ({ filename, fileContents })
        )
      )
    )
  );

const invalidTestsFilenames = [
  'schema-kitchen-sink.graphql', // includes a "repeatable" keyword that isn't even part of the working draft yet (as of June 21, 2019); see RFC here: https://github.com/graphql/graphql-js/pull/1541
];

describe('StandardGraphQlParser', () => {
  it('correctly parses all graphql-js fixtures', async () => {
    const fixtures = await getAllFixtures();
    const filesWithErrors = [];
    const cstsForSnapshot = {};

    fixtures.forEach(({ fileContents, filename }) => {
      if (invalidTestsFilenames.includes(filename)) {
        return;
      }

      const { errors, cst } = standardParser.parse(fileContents);

      if (errors.length) {
        filesWithErrors.push(filename);
      }

      cstsForSnapshot[filename] = cst;
    });

    const snapshotObj = JSON.parse(
      JSON.stringify(
        cstsForSnapshot,
        (key, value) => {
          if (CATEGORY_PATTERN.test(key)) {
            return; // remove all category keys in JSON string (it's noise)
          }
          return value;
        },
        2
      )
    );

    expect(filesWithErrors).toHaveLength(0);
    expect(snapshotObj).toMatchSnapshot();
  });
});
