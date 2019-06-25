import * as path from 'path';
import { StandardGraphQlParser } from '../../graphql/StandardGraphQlParser';
import { StardogGraphQlParser } from '../../graphql/StardogGraphQlParser';
import { readDirAsync, readFileAsync } from '../utils';
import { Lexer } from 'chevrotain';
const { stardogGraphQlTokens } = require('../../graphql/tokens');

const FIXTURES_DIR = path.join(__dirname, 'fixtures');
const CATEGORY_PATTERN = /^categor(?:y|ies)/i;
const jsonStringifyReplacer = (key: string, value: any) => {
  if (CATEGORY_PATTERN.test(key)) {
    return; // remove all category keys in JSON string (it's just noise and makes snapshots huge)
  }
  return value;
};
const getSnapshotObj = (input: object) =>
  JSON.parse(JSON.stringify(input, jsonStringifyReplacer, 2));

const standardParser = new StandardGraphQlParser();
const stardogGraphQlParser = new StardogGraphQlParser();

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

    const snapshotObj = getSnapshotObj(cstsForSnapshot);

    expect(filesWithErrors).toHaveLength(0);
    expect(snapshotObj).toMatchSnapshot();
  });
});

describe('StardogGraphqlParser', () => {
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

    const snapshotObj = getSnapshotObj(cstsForSnapshot);

    expect(filesWithErrors).toHaveLength(0);
    expect(snapshotObj).toMatchSnapshot();
  });

  it('parses special Stardog arguments', () => {
    // Fixture taken from stardog.com docs.
    const fixture = `
      {
        Human(orderBy: name) {
          name
        }
      }

      {
        Human(orderBy: {field: name, desc: true}) {
          name
        }
      }

      {
        Human(orderBy: [homePlanet,
                        {field: name, desc: false}]) {
          name
          homePlanet @optional
        }
      }

      {
        Human(orderBy: name, first: 3) {
          name
        }
      }

      {
        Human(orderBy: name, skip:1, first: 2) {
          name
        }
      }
    `;

    const { cst, errors } = stardogGraphQlParser.parse(fixture);
    expect(errors).toHaveLength(0);
    expect(getSnapshotObj(cst)).toMatchSnapshot();
  });

  it('parses special Stardog directives', () => {
    // Fixture taken from stardog.com docs.
    const fixture = `
      {
        Human {
          id
          name @skip(if: "strstarts($name, 'L')")
        }
      }

      query HumanAndFriends($withFriends: Boolean) {
        Human @type {
          name
          friends @include(if: $withFriends) {
            name
          }
        }
      }

      {
        Human {
          name
          id @filter(if: "$id < 1003")
        }
      }

      {
        Human {
          name
          homePlanet @optional
        }
      }

      {
        Human {
          name
          friends {
            Droid @type
            name
          }
        }
      }

      {
        Human {
          name @hide
          firstName @bind(to: "strbefore($name, ' ')")
          lastName @bind(to: "strafter($name, ' ')")
        }
      }

      {
        Human {
          name
          appearsIn @hide {
            episodes: index
          }
        }
      }

      query onlyHumanGraph @config(graph: Human) {
        Character {
          name
        }
      }

      query bothGraphs @config(graph: [Human, Droid]) {
        Character {
          name
        }
      }
    `;

    const { cst, errors } = stardogGraphQlParser.parse(fixture);
    if (errors.length) {
      console.log(JSON.stringify(errors, jsonStringifyReplacer, 2));
      const tokens = new Lexer(stardogGraphQlTokens).tokenize(fixture);
      console.log(JSON.stringify(tokens, jsonStringifyReplacer, 2));
    }
    expect(errors).toHaveLength(0);
    expect(getSnapshotObj(cst)).toMatchSnapshot();
  });
});
