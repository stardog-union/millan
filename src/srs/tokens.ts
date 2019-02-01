const { turtleTokenTypes } = require('../turtle/tokens');
import { createToken, IMultiModeLexerDefinition, TokenType } from 'chevrotain';
import { CATCH_ALL_AT_LEAST_ONE } from 'helpers/matchers';
import { turtleTokenMap } from 'turtle/tokens';

enum LexerMode {
  TURTLE = 'turtle',
  IFCLAUSE = 'ifclause',
  THENCLAUSE = 'thenclause',
}

const Rule = createToken({
  name: 'Rule',
  pattern: /rule/i,
});
const If = createToken({
  name: 'If',
  pattern: (text, startOffset = 0) => {
    const match = /^(if)\s*{/i.exec(text.substring(startOffset));

    if (!match) {
      return null;
    }

    return [match[1]] as RegExpExecArray;
  },
  line_breaks: true,
  push_mode: LexerMode.IFCLAUSE,
});
const Then = createToken({
  name: 'Then',
  pattern: (text, startOffset = 0) => {
    const match = /^(then)\s*{/i.exec(text.substring(startOffset));

    if (!match) {
      return null;
    }

    return [match[1]] as RegExpExecArray;
  },
  line_breaks: true,
  push_mode: LexerMode.THENCLAUSE,
});
const AnythingButBraces = createToken({
  name: 'AnythingButBraces',
  pattern: (text, startOffset = 0) => {
    if (text[startOffset] !== '{') {
      return null;
    }

    let unclosedBraceCount = 1;
    let cursor;

    for (
      cursor = startOffset + 1;
      cursor < text.length && unclosedBraceCount > 0;
      cursor++
    ) {
      if (text[cursor] === '{') {
        unclosedBraceCount++;
      } else if (text[cursor] === '}') {
        unclosedBraceCount--;
      }
    }

    if (unclosedBraceCount > 0) {
      return null;
    }

    return CATCH_ALL_AT_LEAST_ONE.exec(text.slice(startOffset, cursor));
  },
  line_breaks: true,
  pop_mode: true,
});

export const multiModeLexerDefinition: IMultiModeLexerDefinition = {
  modes: {
    [LexerMode.TURTLE]: [Rule, If, Then, ...turtleTokenTypes],
    [LexerMode.IFCLAUSE]: [turtleTokenMap.WhiteSpace, AnythingButBraces],
    [LexerMode.THENCLAUSE]: [turtleTokenMap.WhiteSpace, AnythingButBraces],
  },
  defaultMode: LexerMode.TURTLE,
};

export const srsTokenMap = {
  Rule,
  If,
  Then,
  AnythingButBraces,
};

export const srsTokenTypes: TokenType[] = [
  Rule,
  If,
  Then,
  ...turtleTokenTypes,
  AnythingButBraces,
];
