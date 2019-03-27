import * as path from 'path';
import { ShaclParser } from '../../shacl/ShaclParser';
import { readDirAsync, readFileAsync } from '../utils';

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

describe('SHACL parser', () => {
  let parser: ShaclParser;

  beforeEach(() => {
    parser = new ShaclParser();
  });

  it('parses', () => {
    const { cst } = parser.parse(fixture);
    console.log(JSON.stringify(cst, null, 2));
    expect(true).toBe(true);
  });

  it('does the damn thing', async (done) => {
    const allFileContents = await getAllFileContents();
    let count = 0;

    allFileContents.forEach(({ contents, file }) => {
      if (file === 'qualifiedValueShape-001.ttl') {
        // The above test has a reference to something that is not part of the
        // current SHACL spec (`sh:nodeShape`), though it used to be.
        return;
      }

      const { errors } = parser.parse(contents);

      if (errors.length) {
        count++;
        console.log(file);
      }
    });

    done();
  });
});
