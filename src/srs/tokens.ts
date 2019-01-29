const { turtleTokenTypes } = require('../turtle/tokens');
import { createToken, IMultiModeLexerDefinition, TokenType } from 'chevrotain';

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
  pattern: /if\s*{/i,
  push_mode: LexerMode.IFCLAUSE,
});
const EndIf = createToken({
  name: 'EndIf',
  pop_mode: true,
  pattern: '}',
});
const Then = createToken({
  name: 'Then',
  pattern: /then\s*{/i,
  push_mode: LexerMode.THENCLAUSE,
});
const EndThen = createToken({
  name: 'EndThen',
  pop_mode: true,
  pattern: '}',
});
const AnythingButBraces = createToken({
  name: 'AnythingButBraces',
  pattern: (text, startOffset = 0) => {
    let unclosedBraceCount = 1;
    let cursor;

    for (
      cursor = startOffset;
      cursor < text.length && unclosedBraceCount > 0;
      cursor++
    ) {
      if (text[cursor] === '{') {
        unclosedBraceCount++;
      } else if (text[cursor] === '}') {
        unclosedBraceCount--;
      }
    }

    return /.+/s.exec(text.slice(startOffset, cursor - 1));
  },
});

export const multiModeLexerDefinition: IMultiModeLexerDefinition = {
  modes: {
    [LexerMode.TURTLE]: [Rule, If, Then, ...turtleTokenTypes],
    [LexerMode.IFCLAUSE]: [EndIf, AnythingButBraces],
    [LexerMode.THENCLAUSE]: [EndThen, AnythingButBraces],
  },
  defaultMode: LexerMode.TURTLE,
};

export const srsTokenMap = {
  Rule,
  If,
  EndIf,
  Then,
  EndThen,
  AnythingButBraces,
};

export const srsTokenTypes: TokenType[] = [
  Rule,
  If,
  EndIf,
  Then,
  EndThen,
  ...turtleTokenTypes,
  AnythingButBraces,
];
