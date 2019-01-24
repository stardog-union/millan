import {
  createToken,
  IToken,
  TokenType,
  IMultiModeLexerDefinition,
} from 'chevrotain';
import { turtleTokenTypes } from 'turtle/tokens';
import { sparqlTokenMap, sparqlTokenTypes } from 'sparql/tokens';

enum LexerMode {
  TURTLE = 'turtle',
  IFCLAUSE = 'ifclause',
  THENCLAUSE = 'thenclause',
}

const ClosingBraceMatcher = /\}/;

const getClosingBraceMatcherPatternForToken = (token: TokenType) => (
  text: string,
  startOffset = 0,
  matchedTokensSoFar: IToken[]
) => {
  const lastBraceMatch = ClosingBraceMatcher.exec(
    text.slice(startOffset, startOffset + 1)
  );

  // Text does not end in a closing brace; bail early.
  if (lastBraceMatch === null) {
    return null;
  }

  const numMatchedTokens = matchedTokensSoFar.length;
  let indexOfNearestToken;

  // Locate the innermost `If` token, for example.
  for (let i = numMatchedTokens - 1; i >= 0; i--) {
    if (matchedTokensSoFar[i].tokenType.tokenName === token.tokenName) {
      indexOfNearestToken = i;
      break;
    }
  }

  // If no innermost `If` token (e.g.), this isn't an `EndIf`; bail early.
  if (typeof indexOfNearestToken !== 'number') {
    return null;
  }

  const tokensAfterToken = matchedTokensSoFar.slice(indexOfNearestToken + 1);
  let braceCount = 0;

  // Match opening and closing braces.
  for (let i = 0; i < tokensAfterToken.length; i++) {
    if (tokensAfterToken[i].tokenType.PATTERN === '{') {
      braceCount++;
    }

    if (tokensAfterToken[i].tokenType.PATTERN === '}') {
      braceCount--;
    }
  }

  // If this closing brace doesn't close the `If` (e.g.) opening brace, no match.
  if (braceCount !== 1) {
    return null;
  }

  return lastBraceMatch;
};

const disallowedSparqlTokens = [
  sparqlTokenMap.CONSTRUCT,
  sparqlTokenMap.DESCRIBE,
  sparqlTokenMap.ASK,
  sparqlTokenMap.NOW,
  sparqlTokenMap.EXISTS,
  sparqlTokenMap.NOT_EXISTS,
  sparqlTokenMap.PATHS,
  sparqlTokenMap.PATHS_ALL,
  sparqlTokenMap.PATHS_SHORTEST,
  sparqlTokenMap.CYCLIC,
  sparqlTokenMap.START,
  sparqlTokenMap.END,
  sparqlTokenMap.VIA,
  sparqlTokenMap.BASE,
  sparqlTokenMap.PREFIX,
  sparqlTokenMap.CLEAR,
  sparqlTokenMap.DROP,
  sparqlTokenMap.CREATE,
  sparqlTokenMap.ADD,
  sparqlTokenMap.TO,
  sparqlTokenMap.MOVE,
  sparqlTokenMap.COPY,
  sparqlTokenMap.INSERT_DATA,
  sparqlTokenMap.DELETE_DATA,
  sparqlTokenMap.DELETE_WHERE,
  sparqlTokenMap.WITH,
  sparqlTokenMap.DELETE,
  sparqlTokenMap.INSERT,
  sparqlTokenMap.USING,
  sparqlTokenMap.DEFAULT,
  sparqlTokenMap.Unknown,
];

const thenClauseTokens = [
  sparqlTokenMap.NIL,
  sparqlTokenMap.ANON,
  sparqlTokenMap.LCurly,
  sparqlTokenMap.RCurly,
  sparqlTokenMap.LParen,
  sparqlTokenMap.RParen,
  sparqlTokenMap.WhiteSpace,
  sparqlTokenMap.IRIREF,
  sparqlTokenMap.LANGTAG,
  sparqlTokenMap.INTEGER,
  sparqlTokenMap.DECIMAL,
  sparqlTokenMap.DOUBLE,
  sparqlTokenMap.INTEGER_POSITIVE,
  sparqlTokenMap.DECIMAL_POSITIVE,
  sparqlTokenMap.DOUBLE_POSITIVE,
  sparqlTokenMap.INTEGER_NEGATIVE,
  sparqlTokenMap.DECIMAL_NEGATIVE,
  sparqlTokenMap.DOUBLE_NEGATIVE,
  sparqlTokenMap.STRING_LITERAL1,
  sparqlTokenMap.STRING_LITERAL2,
  sparqlTokenMap.STRING_LITERAL_LONG1,
  sparqlTokenMap.STRING_LITERAL_LONG2,
  sparqlTokenMap.PNAME_NS,
  sparqlTokenMap.PNAME_LN,
  sparqlTokenMap.BLANK_NODE_LABEL,
  sparqlTokenMap.VAR1,
  sparqlTokenMap.VAR2,
  sparqlTokenMap.Comment,
  sparqlTokenMap.Period,
  sparqlTokenMap.LBracket,
  sparqlTokenMap.RBracket,
  sparqlTokenMap.TRUE,
  sparqlTokenMap.FALSE,
  sparqlTokenMap.Semicolon,
  sparqlTokenMap.Comma,
  sparqlTokenMap.DoubleCaret,
  sparqlTokenMap.A,
  sparqlTokenMap.Unknown,
];

const Rule = createToken({
  name: 'Rule',
  pattern: /rule/i,
});
const If = createToken({
  name: 'If',
  pattern: /if/i,
  push_mode: LexerMode.IFCLAUSE,
});
const EndIf = createToken({
  name: 'EndIf',
  pop_mode: true,
  pattern: getClosingBraceMatcherPatternForToken(If),
});
const Then = createToken({
  name: 'Then',
  pattern: /then/i,
  push_mode: LexerMode.THENCLAUSE,
});
const EndThen = createToken({
  name: 'EndThen',
  pop_mode: true,
  pattern: getClosingBraceMatcherPatternForToken(Then),
});

export const multiModeLexerDefinition: IMultiModeLexerDefinition = {
  modes: {
    [LexerMode.TURTLE]: [Rule, If, Then, ...turtleTokenTypes],
    [LexerMode.IFCLAUSE]: [EndIf, ...sparqlTokenTypes].filter(
      (token) =>
        !disallowedSparqlTokens.some(
          (disallowedToken) => disallowedToken === token
        )
    ),
    [LexerMode.THENCLAUSE]: [EndThen, ...thenClauseTokens],
  },
  defaultMode: LexerMode.TURTLE,
};

export const srsTokenMap = {
  Rule,
  If,
  EndIf,
  Then,
  EndThen,
};
