import { resolve, extname } from 'path';
import { TurtleParser } from '../../turtle/TurtleParser';
import { readDirAsync, readFileAsync } from '../utils';
import { ModeString } from '../../helpers/chevrotain/types';

const parser = new TurtleParser();

const testFilesInDirectory = async (
  directoryPath: string,
  parser: TurtleParser,
  parseMode: ModeString,
  filenameFilter: (filename: string) => boolean
) => {
  const files = (await readDirAsync(directoryPath)).filter(filenameFilter);

  return Promise.all(
    files.map(async (fileName) => {
      const testDocument = await readFileAsync(
        resolve(directoryPath, fileName)
      );
      const { errors, semanticErrors } = parser.parse(testDocument, parseMode);
      const isBad = fileName.search('-bad-') > -1;
      if (!isBad) {
        if (errors.length > 0 || semanticErrors.length > 0) {
          console.log(fileName);
        }
        expect(errors).toHaveLength(0);
        expect(semanticErrors).toHaveLength(0);
      } else {
        if (errors.length === 0 && semanticErrors.length === 0) {
          console.log(fileName);
        }
        expect(Boolean(errors.length || semanticErrors.length)).toBe(true);
      }
    })
  );
};

describe('TurtleParser', () => {
  it('produces no errors when parsing the w3 turtle test suite', () => {
    const directoryPath = resolve(
      __dirname,
      'fixtures',
      'tests-ttl-w3c-20131121'
    );
    return testFilesInDirectory(
      directoryPath,
      parser,
      'standard',
      (filename) => {
        const ext = extname(filename);
        if (filename === 'manifest.ttl') {
          return false;
        }
        return ext === '.ttl' || ext === '.nt';
      }
    );
  });
});

describe('StardogTurtleParser', () => {
  it('produces no errors when parsing the w3 turtle test suite', () => {
    const directoryPath = resolve(
      __dirname,
      'fixtures',
      'tests-ttl-w3c-20131121'
    );
    return testFilesInDirectory(
      directoryPath,
      parser,
      'stardog',
      (filename) => {
        const ext = extname(filename);
        if (filename === 'manifest.ttl') {
          return false;
        }
        return ext === '.ttl' || ext === '.nt';
      }
    );
  });

  it('produces no errors when parsing RDF*-like embedded triples', () => {
    const directoryPath = resolve(__dirname, 'fixtures', 'stardog-extensions');
    return testFilesInDirectory(directoryPath, parser, 'stardog', (filename) =>
      filename.startsWith('embedded')
    );
  });
});
