import { resolve, extname } from 'path';
import { TurtleParser } from '../../turtle/TurtleParser';
import { readDirAsync, readFileAsync } from '../utils';

const parser = new TurtleParser();

describe('TurtleParser', () => {
  it('produces no errors when parsing the w3 turtle test suite', async (done) => {
    const pathName = resolve(__dirname, 'fixtures', 'tests-ttl-w3c-20131121');
    const files = (await readDirAsync(pathName)).filter((fileName) => {
      const ext = extname(fileName);
      if (fileName === 'manifest.ttl') {
        return false;
      }
      return ext === '.ttl' || ext === '.nt';
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
