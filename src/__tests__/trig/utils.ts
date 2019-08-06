const { trigTokenTypes } = require('../../trig/tokens');
import { Lexer } from 'chevrotain';
import { TrigParser } from '../../trig/trigParser';

const trigLexer = new Lexer(trigTokenTypes);
const parser = new TrigParser();

export const parse = (doc: string, rule: Function) => {
  const testTokens = trigLexer.tokenize(doc).tokens;
  parser.input = testTokens;
  const cst = rule.bind(parser)();
  return cst;
};
``;
