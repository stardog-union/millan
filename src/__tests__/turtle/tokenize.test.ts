import { Lexer } from 'chevrotain';
import { readdir, readFile } from 'fs';
import { resolve } from 'path';
import { tokenTypes } from '../../turtle/tokens';
import { extname } from 'path';

const readDirAsync = (pathName) =>
  new Promise<string[]>((resolve, reject) => {
    readdir(pathName, (err, files) => {
      if (err) reject();
      resolve(files);
    });
  });

const readFileAsync = (filePath) =>
  new Promise<string>((resolve, reject) => {
    readFile(filePath, { encoding: 'utf-8' }, (err, document) => {
      if (err) reject();
      resolve(document);
    });
  });

const lexer = new Lexer(tokenTypes);

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
      //console.log(JSON.stringify(result, null, 2));
      if (result.errors.length) {
        console.log(terminal);
        // console.log(JSON.stringify(result, null, 2));
      }
      expect(result.errors).toHaveLength(0);
    });
  });
  it('tokenizes a turtle document', () => {
    const result = lexer.tokenize(
      `<http://a.example/s> <http://a.example/p> "x''y" .`
    );
    if (result.errors) {
      // console.log(result.errors);
    }
    expect(result.errors).toHaveLength(0);
  });
  it.skip('produces errors when tokenizing invalid terminals', () => {
    const terminals = ['d', 'f'];
    terminals.forEach((terminal) => {
      const result = lexer.tokenize(terminal);
      if (result.errors.length) {
        console.log(terminal);
        // console.log(JSON.stringify(result, null, 2));
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
      if (fileName.startsWith('skip.')) {
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
          }
          expect(lexingResult.errors).toHaveLength(0);
        }
      })
    );
    done();
  });
});
