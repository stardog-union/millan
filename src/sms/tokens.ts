const { sparqlTokenMap, stardogSparqlTokens } = require('../sparql/tokens');
import { TokenType, IToken } from 'chevrotain';
import { createKeyword } from '../sparql/keywords';

const FROM_BLOCK_END_MATCHER = /^\s*to\s*{/i;
const FROM_JSON_BLOCK_END_MATCHER = /((?:.|\s)*?)to\s*{/i;

// Because the end of `FROM` clauses in SMS are not explicit, tokenizing them
// using regexes can be incredibly inefficient. This function gives us a bit
// more control; it scans through the document character by character until
// it finds a character which is _likely_ to be followed by an ending pattern,
// and only then does it use a regex to confirm.
const explicitEndMatcher = (
  textToMatch: string,
  endCandidateChar: string, // Char which, if found, triggers an exec of endMatcher
  endMatcher: RegExp // Regex which matches an end pattern
): RegExpExecArray => {
  for (let offset = 0, char; offset < textToMatch.length; offset++) {
    char = textToMatch[offset];
    if (char === endCandidateChar) {
      const blockEndCandidate = textToMatch.slice(offset + 1);
      const match = endMatcher.exec(blockEndCandidate);
      if (!match) {
        continue;
      } else {
        const blockText = textToMatch.slice(0, offset);
        const response = [blockText] as RegExpExecArray;
        return response;
      }
    }
  }
  return null;
};

export const smsTokenMap = {
  ...sparqlTokenMap,
  Template: createKeyword({ name: 'Template' }),
  Sql: createKeyword({ name: 'Sql' }),
  GraphQl: createKeyword({ name: 'GraphQl' }),
  Json: createKeyword({ name: 'Json' }),
  Csv: createKeyword({ name: 'Csv' }),
  Mapping: createKeyword({ name: 'Mapping' }),
  SqlBlock: createKeyword({
    name: 'SqlBlock',
    pattern: (
      text: string,
      startOffset: number = 0,
      matchedTokensSoFar: IToken[]
    ) => {
      const [secondToLastToken, lastToken] = matchedTokensSoFar.slice(-2);

      if (
        !secondToLastToken ||
        !lastToken ||
        secondToLastToken.tokenType.tokenName !== smsTokenMap.Sql.tokenName ||
        lastToken.tokenType.tokenName !== smsTokenMap.LCurly.tokenName
      ) {
        return null;
      }

      const textToMatch = text.slice(startOffset);
      return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
    },
    line_breaks: true,
  }),
  JsonBlock: createKeyword({
    name: 'JsonBlock',
    pattern: (
      text: string,
      startOffset: number = 0,
      matchedTokensSoFar: IToken[]
    ) => {
      const [lastToken] = matchedTokensSoFar.slice(-1);

      if (
        !lastToken ||
        lastToken.tokenType.tokenName !== smsTokenMap.Json.tokenName
      ) {
        return null;
      }

      const textToMatch = text.slice(startOffset);
      const match = FROM_JSON_BLOCK_END_MATCHER.exec(textToMatch);
      if (!match) {
        return null;
      }

      const capturedMatch = match.slice(1) as RegExpExecArray;
      return capturedMatch;
    },
    line_breaks: true,
  }),
  GraphQlBlock: createKeyword({
    name: 'GraphQlBlock',
    pattern: (
      text: string,
      startOffset: number = 0,
      matchedTokensSoFar: IToken[]
    ) => {
      const [secondToLastToken, lastToken] = matchedTokensSoFar.slice(-2);

      if (
        !secondToLastToken ||
        !lastToken ||
        secondToLastToken.tokenType.tokenName !==
          smsTokenMap.GraphQl.tokenName ||
        lastToken.tokenType.tokenName !== smsTokenMap.LCurly.tokenName
      ) {
        return null;
      }

      const textToMatch = text.slice(startOffset);
      return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
    },
    line_breaks: true,
  }),
};

const smsOnlyTokens: TokenType[] = [
  smsTokenMap.Template,
  smsTokenMap.Sql,
  smsTokenMap.GraphQl,
  smsTokenMap.Json,
  smsTokenMap.Csv,
  smsTokenMap.Mapping,
  smsTokenMap.SqlBlock,
  smsTokenMap.JsonBlock,
  smsTokenMap.GraphQlBlock,
];

export const smsTokenTypes = [...smsOnlyTokens, ...stardogSparqlTokens];
