import { resolve, extname } from 'path';
import { TrigParser } from '../../trig/TrigParser';
import { readDirAsync, readFileAsync } from '../utils';

const parser = new TrigParser();

describe('TrigParser', () => {
  it('produces no errors when parsing the w3 trig test suite', async (done) => {
    const pathName = resolve(__dirname, 'fixtures', 'tests-trig-w3c-20140218');
    const files = (await readDirAsync(pathName)).filter((fileName) => {
      const ext = extname(fileName);
      return ext === '.trig';
    });
    await Promise.all(
      files.map(async (fileName) => {
        const testDocument = await readFileAsync(resolve(pathName, fileName));
        const { errors, semanticErrors } = parser.parse(testDocument);
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
    done();
  });
});
