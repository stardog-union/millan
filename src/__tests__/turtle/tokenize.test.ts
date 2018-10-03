import { Lexer, TokenType, createToken } from 'chevrotain';
import { readdir, readFile } from 'fs';
import { resolve } from 'path';
import { tokenTypes } from '../../turtle/tokens';

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
    ];
    terminals.forEach((terminal) => {
      const result = lexer.tokenize(terminal);
      if (result.errors.length) {
        console.log(terminal);
        // console.log(JSON.stringify(result, null, 2));
      }
      expect(result.errors).toHaveLength(0);
    });
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
  it.skip('produces no errors when tokenizing the w3 turtle test suite', async (done) => {
    const pathName = resolve(__dirname, 'fixtures', 'tests-ttl-w3c-20131121');
    const files = await readDirAsync(pathName);
    await Promise.all(
      files.map(async (fileName) => {
        const testDocument = await readFileAsync(resolve(pathName, fileName));
        // console.log(testDocument);
        const result = lexer.tokenize(testDocument);
        // console.log(JSON.stringify(result, null, 2));
        expect(result.errors).toHaveLength(0);
      })
    );
    // const pattern = tokenTypes[tokenTypes.length - 1].PATTERN as RegExp
    // const match = pattern.exec('"""s"df"""')
    // console.log(pattern)
    // const match = '"""""s"df"""'.match(pattern);
    // console.log(match)
    done();
  });
});
