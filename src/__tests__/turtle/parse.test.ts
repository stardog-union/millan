import { resolve, extname } from 'path';
import { readDirAsync, readFileAsync } from './utils';
import { Lexer } from 'chevrotain';
import { tokenTypes } from '../../turtle/tokens';
import { TurtleParser } from '../../turtle/TurtleParser';

const turtleLexer = new Lexer(tokenTypes);

describe('TurtleParser', () => {
  it('produces no errors when tokenizing the w3 turtle test suite', async (done) => {
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
        const parser = new TurtleParser(); // since parser has state, need a new one for each test
        const testDocument = await readFileAsync(resolve(pathName, fileName));
        const lexingResult = turtleLexer.tokenize(testDocument);
        parser.input = lexingResult.tokens;
        parser.turtleDoc();
        const isBad = fileName.search('-bad-') > -1;
        if (!isBad) {
          if (parser.errors.length > 0 || parser.semanticErrors.length > 0) {
            console.log(fileName);
          }
          expect(parser.errors).toHaveLength(0);
          expect(parser.semanticErrors).toHaveLength(0);
        } else {
          if (
            parser.errors.length === 0 &&
            parser.semanticErrors.length === 0
          ) {
            console.log(fileName);
          }
          expect(
            Boolean(parser.errors.length || parser.semanticErrors.length)
          ).toBe(true);
        }
      })
    );
    done();
  });
});
