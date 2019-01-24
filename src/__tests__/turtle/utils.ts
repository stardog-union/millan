const { turtleTokenTypes } = require('../../turtle/tokens');
import { Lexer } from 'chevrotain';
import { TurtleParser } from '../../turtle/TurtleParser';

const turtleLexer = new Lexer(turtleTokenTypes);
const parser = new TurtleParser();

export const parse = (doc: string, rule: Function) => {
  const testTokens = turtleLexer.tokenize(doc).tokens;
  parser.input = testTokens;
  const cst = rule.bind(parser)();
  return cst;
};
