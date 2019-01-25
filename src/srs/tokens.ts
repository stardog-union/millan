import {
  createToken,
  // IToken,
  // TokenType,
  IMultiModeLexerDefinition,
} from 'chevrotain';
import { turtleTokenTypes } from 'turtle/tokens';
import { sparqlTokenMap } from 'sparql/tokens';

enum LexerMode {
  TURTLE = 'turtle',
  IFCLAUSE = 'ifclause',
  THENCLAUSE = 'thenclause',
}

// const ClosingBraceMatcher = /\}/;

// const getClosingBraceMatcherPatternForToken = (token: TokenType) => (
//   text: string,
//   startOffset = 0,
//   matchedTokensSoFar: IToken[]
// ) => {
//   console.log(startOffset);
//   const lastBraceMatch = ClosingBraceMatcher.exec(
//     text.slice(startOffset, startOffset + 1)
//   );

//   // Text does not end in a closing brace; bail early.
//   if (lastBraceMatch === null) {
//     return null;
//   }

//   const numMatchedTokens = matchedTokensSoFar.length;
//   let endOffsetOfNearestToken;

//   // Locate the innermost `If` token, for example.
//   for (let i = numMatchedTokens - 1; i >= 0; i--) {
//     if (matchedTokensSoFar[i].tokenType.tokenName === token.tokenName) {
//       endOffsetOfNearestToken = matchedTokensSoFar[i].endOffset + 1;
//       break;
//     }
//   }

//   // If no innermost `If` token (e.g.), this isn't an `EndIf`; bail early.
//   if (typeof endOffsetOfNearestToken !== 'number') {
//     return null;
//   }

//   const remainingText = text.slice(endOffsetOfNearestToken, startOffset);
//   console.log(remainingText);
//   const numOpeningBraces = remainingText.split('{').length - 1;
//   const numClosingBraces = remainingText.split('}').length - 1;

//   console.log(numClosingBraces, numOpeningBraces);
//   if (numOpeningBraces !== numClosingBraces) {
//     return null;
//   }

//   return lastBraceMatch;
// };

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
  pattern: (text: string, startOffset = 0) => {
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

    return /.*/s.exec(text.slice(startOffset, cursor - 1));
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

export const srsTokens = [
  Rule,
  If,
  EndIf,
  Then,
  EndThen,
  sparqlTokenMap.LCurly,
  sparqlTokenMap.RCurly,
  ...turtleTokenTypes,
  AnythingButBraces,
];
