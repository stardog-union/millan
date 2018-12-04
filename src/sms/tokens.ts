import { tokenMap as sparqlTokenMap } from '../sparql/tokens';
import { TokenType, createToken, IToken } from 'chevrotain';

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

export const tokenMap = {
  STRING_LITERAL1: sparqlTokenMap.STRING_LITERAL1,
  STRING_LITERAL2: sparqlTokenMap.STRING_LITERAL2,
  STRING_LITERAL_LONG1: sparqlTokenMap.STRING_LITERAL_LONG1,
  STRING_LITERAL_LONG2: sparqlTokenMap.STRING_LITERAL_LONG2,
  IRIREF: sparqlTokenMap.IRIREF,
  PNAME_LN: sparqlTokenMap.PNAME_LN,
  PNAME_NS: sparqlTokenMap.PNAME_NS,
  NIL: sparqlTokenMap.NIL,
  DISTINCT: sparqlTokenMap.DISTINCT,
  VAR1: sparqlTokenMap.VAR1,
  VAR2: sparqlTokenMap.VAR2,
  BIND: sparqlTokenMap.BIND,
  AS: sparqlTokenMap.AS,
  WHERE: sparqlTokenMap.WHERE,
  LANGTAG: sparqlTokenMap.LANGTAG,
  INTEGER: sparqlTokenMap.INTEGER,
  DECIMAL: sparqlTokenMap.DECIMAL,
  DOUBLE: sparqlTokenMap.DOUBLE,
  INTEGER_POSITIVE: sparqlTokenMap.INTEGER_POSITIVE,
  DECIMAL_POSITIVE: sparqlTokenMap.DECIMAL_POSITIVE,
  DOUBLE_POSITIVE: sparqlTokenMap.DOUBLE_POSITIVE,
  INTEGER_NEGATIVE: sparqlTokenMap.INTEGER_NEGATIVE,
  DECIMAL_NEGATIVE: sparqlTokenMap.DECIMAL_NEGATIVE,
  DOUBLE_NEGATIVE: sparqlTokenMap.DOUBLE_NEGATIVE,
  TRUE: sparqlTokenMap.TRUE,
  FALSE: sparqlTokenMap.FALSE,
  BLANK_NODE_LABEL: sparqlTokenMap.BLANK_NODE_LABEL,
  ANON: sparqlTokenMap.ANON,
  A: sparqlTokenMap.A,
  FROM: sparqlTokenMap.FROM,
  PREFIX: sparqlTokenMap.PREFIX,
  Comment: sparqlTokenMap.Comment,
  Period: sparqlTokenMap.Period,
  Comma: sparqlTokenMap.Comma,
  LCurly: sparqlTokenMap.LCurly,
  RCurly: sparqlTokenMap.RCurly,
  LParen: sparqlTokenMap.LParen,
  RParen: sparqlTokenMap.RParen,
  WhiteSpace: sparqlTokenMap.WhiteSpace,
  DoubleCaret: sparqlTokenMap.DoubleCaret,
  Semicolon: sparqlTokenMap.Semicolon,
  LBracket: sparqlTokenMap.LBracket,
  RBracket: sparqlTokenMap.RBracket,
  Template: createToken({
    name: 'Template',
    pattern: /template/i,
  }),
  TO: createToken({
    name: 'TO',
    pattern: /to/i,
  }),
  Sql: createToken({
    name: 'Sql',
    pattern: /sql/i,
  }),
  GraphQl: createToken({
    name: 'GraphQl',
    pattern: /graphql/i,
  }),
  Json: createToken({
    name: 'Json',
    pattern: /json/i,
  }),
  Mapping: createToken({
    name: 'Mapping',
    pattern: /mapping/i,
  }),
  SqlBlock: createToken({
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
        secondToLastToken.tokenType.tokenName !== tokenMap.Sql.tokenName ||
        lastToken.tokenType.tokenName !== tokenMap.LCurly.tokenName
      ) {
        return null;
      }

      const textToMatch = text.slice(startOffset);
      return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
    },
    line_breaks: true,
  }),
  JsonBlock: createToken({
    name: 'JsonBlock',
    pattern: (
      text: string,
      startOffset: number = 0,
      matchedTokensSoFar: IToken[]
    ) => {
      const [lastToken] = matchedTokensSoFar.slice(-1);

      if (
        !lastToken ||
        lastToken.tokenType.tokenName !== tokenMap.Json.tokenName
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
  GraphQlBlock: createToken({
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
        secondToLastToken.tokenType.tokenName !== tokenMap.GraphQl.tokenName ||
        lastToken.tokenType.tokenName !== tokenMap.LCurly.tokenName
      ) {
        return null;
      }

      const textToMatch = text.slice(startOffset);
      return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
    },
    line_breaks: true,
  }),
};

export const tokenTypes: TokenType[] = [
  tokenMap.WhiteSpace,
  tokenMap.Comment,
  tokenMap.LParen,
  tokenMap.RParen,
  tokenMap.Period,
  tokenMap.Template,
  tokenMap.IRIREF,
  tokenMap.PNAME_LN,
  tokenMap.PNAME_NS,
  tokenMap.NIL,
  tokenMap.DISTINCT,
  tokenMap.VAR1,
  tokenMap.VAR2,
  tokenMap.BIND,
  tokenMap.AS,
  tokenMap.WHERE,
  tokenMap.TO,
  tokenMap.LANGTAG,
  tokenMap.INTEGER,
  tokenMap.DECIMAL,
  tokenMap.DOUBLE,
  tokenMap.INTEGER_POSITIVE,
  tokenMap.DECIMAL_POSITIVE,
  tokenMap.DOUBLE_POSITIVE,
  tokenMap.INTEGER_NEGATIVE,
  tokenMap.DECIMAL_NEGATIVE,
  tokenMap.DOUBLE_NEGATIVE,
  tokenMap.TRUE,
  tokenMap.FALSE,
  tokenMap.BLANK_NODE_LABEL,
  tokenMap.ANON,
  tokenMap.A,
  tokenMap.FROM,
  tokenMap.PREFIX,
  tokenMap.Comma,
  tokenMap.DoubleCaret,
  tokenMap.Semicolon,
  tokenMap.LBracket,
  tokenMap.RBracket,
  tokenMap.Sql,
  tokenMap.GraphQl,
  tokenMap.Json,
  tokenMap.Mapping,
  tokenMap.SqlBlock,
  tokenMap.JsonBlock,
  tokenMap.GraphQlBlock,
  tokenMap.LCurly,
  tokenMap.RCurly,
  tokenMap.STRING_LITERAL1,
  tokenMap.STRING_LITERAL2,
  tokenMap.STRING_LITERAL_LONG1,
  tokenMap.STRING_LITERAL_LONG2,
];
