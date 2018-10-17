import { readdir, readFile } from 'fs';
import { Lexer } from 'chevrotain';
import { tokenTypes } from '../../turtle/tokens';
import { TurtleParser } from '../../turtle/TurtleParser';

const turtleLexer = new Lexer(tokenTypes);
const parser = new TurtleParser();

export const readDirAsync = (pathName) =>
  new Promise<string[]>((resolve, reject) => {
    readdir(pathName, (err, files) => {
      if (err) reject();
      resolve(files);
    });
  });

export const readFileAsync = (filePath) =>
  new Promise<string>((resolve, reject) => {
    readFile(filePath, { encoding: 'utf-8' }, (err, document) => {
      if (err) reject();
      resolve(document);
    });
  });

export const parse = (doc: string, rule: Function) => {
  const testTokens = turtleLexer.tokenize(doc).tokens;
  parser.input = testTokens;
  const cst = rule.bind(parser)();
  return cst;
};
