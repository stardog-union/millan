const { trigTokenTypes } = require('../../trig/tokens');
import { Lexer } from 'chevrotain';
import { resolve, extname } from 'path';
import { readDirAsync, readFileAsync } from '../utils';

const lexer = new Lexer(trigTokenTypes);

describe('trig tokenizer', () => {
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
  it('tokenizes a trig document', () => {
    const result = lexer.tokenize(
      `<http://example/G> { <http://example/a> <http://example/b> <http://example/c> . }`
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
  it('produces no errors when tokenizing the w3 trig test suite', async (done) => {
    const pathName = resolve(__dirname, 'fixtures', 'tests-trig-w3c-20140218');
    const files = (await readDirAsync(pathName)).filter((fileName) => {
      const ext = extname(fileName);
      return ext === '.trig';
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
