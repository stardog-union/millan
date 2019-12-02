const { turtleTokenTypes, turtleTokenMap } = require('../turtle/tokens');
const { sparqlTokenMap } = require('../sparql/tokens');
import { createToken, IMultiModeLexerDefinition, TokenType } from 'chevrotain';
import { CATCH_ALL_AT_LEAST_ONE } from '../helpers/matchers';

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
  pattern: /if/i,
  push_mode: LexerMode.IFCLAUSE,
});
const Then = createToken({
  name: 'Then',
  pattern: /then/i,
  push_mode: LexerMode.THENCLAUSE,
});
const EndThen = createToken({
  name: 'EndThen',
  pattern: '}',
  pop_mode: true,
});
// NOTE: Not a SPARQL GroupGraphPattern. Rather, a placeholder for one. We have
// to let the SRS parser create this token, then replace with a token returned
// by the SPARQL sub-parser.
const GroupGraphPattern = createToken({
  name: 'GroupGraphPattern', // This name is useful for error messages in real-time parsing
  pattern: (text, startOffset = 0) => {
    // Capture a single brace and then anything up to its closing brace.
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
// NOTE: Not a SPARQL TriplesBlock. Rather, a placeholder for one. We have
// to let the SRS parser create this token, then replace with a token returned
// by the SPARQL sub-parser.
const TriplesBlock = createToken({
  name: 'TriplesBlock', // This name is useful for error messages in real-time parsing
  pattern: /[^{}]+/,
  line_breaks: true,
});

const indexOfIriRef = turtleTokenTypes.indexOf(turtleTokenMap.IRIREF);

export const multiModeLexerDefinition: IMultiModeLexerDefinition = {
  modes: {
    [LexerMode.TURTLE]: [
      ...turtleTokenTypes.slice(0, indexOfIriRef + 1),
      Rule,
      If,
      Then,
      ...turtleTokenTypes.slice(indexOfIriRef + 1),
    ],
    [LexerMode.IFCLAUSE]: [turtleTokenMap.WhiteSpace, GroupGraphPattern],
    [LexerMode.THENCLAUSE]: [
      turtleTokenMap.WhiteSpace,
      sparqlTokenMap.LCurly,
      EndThen,
      TriplesBlock,
    ],
  },
  defaultMode: LexerMode.TURTLE,
};

export const srsTokenMap = {
  Rule,
  If,
  Then,
  EndThen,
  GroupGraphPattern,
  TriplesBlock,
};

export const srsTokenTypes: TokenType[] = [
  Rule,
  If,
  Then,
  EndThen,
  sparqlTokenMap.LCurly,
  ...turtleTokenTypes,
  GroupGraphPattern,
  TriplesBlock,
];
