import * as path from 'path';
import * as fs from 'fs';
import { ShaclParser } from '../../shacl/ShaclParser';
import { readDirAsync, readFileAsync } from '../utils';
import { clearCache } from 'chevrotain';

const fixture = `
ex:OtherPerson
  a :Thing .

ex:PersonShape
	a sh:NodeShape ;
	sh:targetClass ex:Person ;    # Applies to all persons
	sh:property [                 # _:b1
		sh:path ex:ssn ;           # constrains the values of ex:ssn
		sh:maxCount 1 ;
		sh:datatype xsd:string ;
		sh:pattern "^\\\\d{3}-\\\\d{2}-\\\\d{4}$" ;
	] ;
	sh:property [                 # _:b2
		sh:path ex:worksFor ;
		sh:class ex:Company ;
		sh:nodeKind sh:IRI ;
	] ;
	sh:closed true ;
  <http://www.w3.org/ns/shacl#ignoredProperties> ( rdf:type ) .
`;

const fixtureSuites = [
  'shacl-core/complex',
  'shacl-core/misc',
  'shacl-core/node',
  'shacl-core/path',
  'shacl-core/property',
  'shacl-core/targets',
  'shacl-sparql/component',
  'shacl-sparql/node',
  'shacl-sparql/pre-binding',
  'shacl-sparql/property',
];
const getAllFileContents = () =>
  Promise.all(
    fixtureSuites.map((suitePath) =>
      readDirAsync(path.join(__dirname, 'fixtures', suitePath))
    )
  ).then((filesContainer) =>
    Promise.all(
      // @ts-ignore
      filesContainer.reduce(
        (flattenedFilesPromises, files, idx) => [
          ...flattenedFilesPromises,
          ...files.map((file) =>
            readFileAsync(
              path.join(__dirname, 'fixtures', fixtureSuites[idx], file)
            ).then((contents) => ({
              file,
              contents,
            }))
          ),
        ],
        []
      )
    )
  );

const invalidTestsFilenames = [
  'qualifiedValueShape-001.ttl', // references `sh:nodeShape` from old, not current, SHACL spec
];

describe('SHACL parser', () => {
  let parser: ShaclParser;

  beforeEach(() => {
    clearCache();
    parser = new ShaclParser();
  });

  it('parses', () => {
    const { errors } = parser.parse(fixture);
    expect(errors).toHaveLength(0);
  });

  it('parses all w3c SHACL tests without errors', async (done) => {
    const allFileContents = await getAllFileContents();
    const filesWithErrors = [];

    allFileContents.forEach(({ contents, file }) => {
      if (invalidTestsFilenames.includes(file)) {
        return;
      }

      const { errors } = parser.parse(contents);

      if (errors.length) {
        filesWithErrors.push(file);
      }
    });

    if (filesWithErrors.length) {
      done.fail(
        `The following files caused parse errors: ${filesWithErrors.join(', ')}`
      );
    } else {
      done();
    }
  });

  it('accepts and parses with nonstandard SHACL namespaces', () => {
    const testFixture = fs.readFileSync(
      path.join(
        __dirname,
        'fixtures',
        'misc',
        'nonstandard-shacl-namespace.ttl'
      ),
      {
        encoding: 'utf8',
      }
    );
    const specialParser = new ShaclParser({}, { shacl: 'weehee', xsd: 'xsd' });
    const { errors } = specialParser.parse(testFixture);
    expect(errors).toHaveLength(0);
  });

  it('accepts and parses with nonstandard XSD namespaces', () => {
    const testFixture = fs.readFileSync(
      path.join(__dirname, 'fixtures', 'misc', 'nonstandard-xsd-namespace.ttl'),
      {
        encoding: 'utf8',
      }
    );
    const specialParser = new ShaclParser({}, { shacl: 'sh', xsd: 'xxxxx' });
    const { errors } = specialParser.parse(testFixture);
    expect(errors).toHaveLength(0);
  });

  it('accepts and parses with both nonstandard SHACL and nonstandard XSD namespaces', () => {
    const testFixture = fs.readFileSync(
      path.join(
        __dirname,
        'fixtures',
        'misc',
        'nonstandard-shacl-and-xsd-namespaces.ttl'
      ),
      {
        encoding: 'utf8',
      }
    );
    const specialParser = new ShaclParser({}, { shacl: 'weehee', xsd: 'xxxx' });
    const { cst, errors } = specialParser.parse(testFixture);
    expect(errors).toHaveLength(0);
    console.log(JSON.stringify(cst, null, 2));
  });
});
