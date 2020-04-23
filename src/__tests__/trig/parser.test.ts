import { resolve, extname } from 'path';
import { TrigParser } from '../../trig/TrigParser';
import { readDirAsync, readFileAsync } from '../utils';
import { ModeString } from '../../helpers/chevrotain/types';

const parser = new TrigParser();

const testAllFilesInDirectory = async (
  directoryPath: string,
  parser: TrigParser,
  parseMode: ModeString
) => {
  const files = (await readDirAsync(directoryPath)).filter((fileName) => {
    const ext = extname(fileName);
    return ext === '.trig';
  });
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

describe('TrigParser', () => {
  it('produces no errors when parsing the w3 trig test suite', () => {
    const directoryPath = resolve(
      __dirname,
      'fixtures',
      'tests-trig-w3c-20140218'
    );
    return testAllFilesInDirectory(directoryPath, parser, 'standard');
  });
});

describe('StardogTrigParser', () => {
  it('produces no errors when parsing the w3 trig test suite', () => {
    const directoryPath = resolve(
      __dirname,
      'fixtures',
      'tests-trig-w3c-20140218'
    );
    return testAllFilesInDirectory(directoryPath, parser, 'stardog');
  });

  it('parses TriG with embedded triples', () => {
    const directoryPath = resolve(__dirname, 'fixtures', 'stardog-extensions');
    return testAllFilesInDirectory(directoryPath, parser, 'stardog');
  });
});
