import * as path from 'path';
import { StandardGraphQlParser } from '../../graphql/StandardGraphQlParser';
import { StardogGraphQlParser } from '../../graphql/StardogGraphQlParser';
import { readDirAsync, readFileAsync } from '../utils';

const GOOD_FIXTURES_DIR = path.join(__dirname, 'fixtures', 'good');
const BAD_FIXTURES_DIR = path.join(__dirname, 'fixtures', 'bad');
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

const getAllGoodFixtures = () =>
  readDirAsync(GOOD_FIXTURES_DIR).then((filenames) =>
    Promise.all(
      filenames.map((filename) =>
        readFileAsync(
          path.join(GOOD_FIXTURES_DIR, filename)
        ).then((fileContents) => ({ filename, fileContents }))
      )
    )
  );

const getAllBadStandardFixtures = () =>
  readDirAsync(BAD_FIXTURES_DIR).then((filenames) =>
    Promise.all(
      filenames
        .filter((filename) => !filename.includes('stardog'))
        .map((filename) =>
          readFileAsync(
            path.join(BAD_FIXTURES_DIR, filename)
          ).then((fileContents) => ({ filename, fileContents }))
        )
    )
  );

const getAllBadStardogFixtures = () =>
  readDirAsync(BAD_FIXTURES_DIR).then((filenames) =>
    Promise.all(
      filenames
        .filter((filename) => filename.includes('stardog'))
        .map((filename) =>
          readFileAsync(
            path.join(BAD_FIXTURES_DIR, filename)
          ).then((fileContents) => ({ filename, fileContents }))
        )
    )
  );

const invalidTestsFilenames = [
  'schema-kitchen-sink.graphql', // includes a "repeatable" keyword that isn't even part of the working draft yet (as of June 21, 2019); see RFC here: https://github.com/graphql/graphql-js/pull/1541
];

describe('StandardGraphQlParser', () => {
  it('correctly parses all graphql-js fixtures', async () => {
    const fixtures = await getAllGoodFixtures();
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

      // No snapshot for the GitHub schema, as it's much too large.
      if (!filename.endsWith('github-schema.graphql')) {
        cstsForSnapshot[filename] = cst;
      }
    });

    const snapshotObj = getSnapshotObj(cstsForSnapshot);

    expect(filesWithErrors).toHaveLength(0);
    expect(snapshotObj).toMatchSnapshot();
  });

  it('correctly reports errors', async () => {
    const fixtures = await getAllBadStandardFixtures();
    const errorsForSnapshot = {};

    fixtures.forEach(({ fileContents, filename }) => {
      const { errors } = standardParser.parse(fileContents);
      errorsForSnapshot[filename] = errors;
    });

    const snapshotObj = getSnapshotObj(errorsForSnapshot);
    expect(snapshotObj).toMatchSnapshot();
  });
});

describe('StardogGraphqlParser', () => {
  it('correctly parses all graphql-js fixtures', async () => {
    const fixtures = await getAllGoodFixtures();
    const filesWithErrors = [];
    const cstsForSnapshot = {};

    fixtures.forEach(({ fileContents, filename }) => {
      if (invalidTestsFilenames.includes(filename)) {
        return;
      }

      const { errors, cst } = stardogGraphQlParser.parse(fileContents);

      if (errors.length) {
        filesWithErrors.push(filename);
      }

      // No snapshot for the GitHub schema, as it's much too large.
      if (!filename.endsWith('github-schema.graphql')) {
        cstsForSnapshot[filename] = cst;
      }
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
    expect(errors).toHaveLength(0);
    expect(getSnapshotObj(cst)).toMatchSnapshot();
  });

  it('correctly reports errors', async () => {
    const fixtures = await getAllBadStardogFixtures();
    const errorsForSnapshot = {};

    fixtures.forEach(({ fileContents, filename }) => {
      const { errors } = stardogGraphQlParser.parse(fileContents);
      errorsForSnapshot[filename] = errors;
    });

    const snapshotObj = getSnapshotObj(errorsForSnapshot);
    expect(snapshotObj).toMatchSnapshot();
  });
});
