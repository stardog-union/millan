import { Lexer } from 'chevrotain';
import { resolve } from 'path';
import { turtleTokenTypes } from '../../turtle/tokens';
import { extname } from 'path';
import { readDirAsync, readFileAsync } from './utils';

const lexer = new Lexer(turtleTokenTypes);

describe('turtle tokenizer', () => {
  it('produces no errors when tokenizing valid terminals', () => {
    const terminals = [
      '@prefix',
      '{',
      '}',
      '(',
      ')',
      '.',
      'true',
      'false',
      '^^',
      ',',
      ';',
      'a',
      'prefix',
      '@base',
      'base',
      '@french',
      '[]',
      '[',
      ']',
      '\u0aFB',
      'U0aFB23eC',
      '"""""s"df"""',
      "'''''s'df'''",
      '""""s"df"""',
      "''''s'df'''",
      "'snoopy'",
      '"woodstock"',
      '1.23e4',
      '.0',
      '1.0',
    ];
    terminals.forEach((terminal) => {
      const result = lexer.tokenize(terminal);
      if (result.errors.length) {
        console.log(JSON.stringify(result, null, 2));
      }
      expect(result.errors).toHaveLength(0);
    });
  });
  it('tokenizes a turtle document', () => {
    const result = lexer.tokenize(
      `<http://a.example/s> <http://a.example/p> "x''y" .`
    );
    if (result.errors.length) {
      console.log(JSON.stringify(result, null, 2));
    }
    expect(result.errors).toHaveLength(0);
  });
  it('produces errors when tokenizing invalid terminals', () => {
    const terminals = ['d', 'f'];
    terminals.forEach((terminal) => {
      const result = lexer.tokenize(terminal);
      if (result.errors.length) {
        console.log(JSON.stringify(result, null, 2));
      }
      expect(result.errors).toHaveLength(0);
    });
  });
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
        const testDocument = await readFileAsync(resolve(pathName, fileName));
        const lexingResult = lexer.tokenize(testDocument);
        const isBad = fileName.search('-bad-') > -1;
        if (!isBad) {
          if (lexingResult.errors.length !== 0) {
            console.log(fileName);
            console.log(lexingResult.errors);
          }
          expect(lexingResult.errors).toHaveLength(0);
        }
      })
    );
    done();
  });
});
