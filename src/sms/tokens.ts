import { sparqlTokenMap } from '../sparql/tokens';
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

export const smsTokenMap = {
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

export const smsTokenTypes: TokenType[] = [
  smsTokenMap.WhiteSpace,
  smsTokenMap.Comment,
  smsTokenMap.LParen,
  smsTokenMap.RParen,
  smsTokenMap.Period,
  smsTokenMap.Template,
  smsTokenMap.IRIREF,
  smsTokenMap.PNAME_LN,
  smsTokenMap.PNAME_NS,
  smsTokenMap.NIL,
  smsTokenMap.DISTINCT,
  smsTokenMap.VAR1,
  smsTokenMap.VAR2,
  smsTokenMap.BIND,
  smsTokenMap.AS,
  smsTokenMap.WHERE,
  smsTokenMap.TO,
  smsTokenMap.LANGTAG,
  smsTokenMap.INTEGER,
  smsTokenMap.DECIMAL,
  smsTokenMap.DOUBLE,
  smsTokenMap.INTEGER_POSITIVE,
  smsTokenMap.DECIMAL_POSITIVE,
  smsTokenMap.DOUBLE_POSITIVE,
  smsTokenMap.INTEGER_NEGATIVE,
  smsTokenMap.DECIMAL_NEGATIVE,
  smsTokenMap.DOUBLE_NEGATIVE,
  smsTokenMap.TRUE,
  smsTokenMap.FALSE,
  smsTokenMap.BLANK_NODE_LABEL,
  smsTokenMap.ANON,
  smsTokenMap.A,
  smsTokenMap.FROM,
  smsTokenMap.PREFIX,
  smsTokenMap.Comma,
  smsTokenMap.DoubleCaret,
  smsTokenMap.Semicolon,
  smsTokenMap.LBracket,
  smsTokenMap.RBracket,
  smsTokenMap.Sql,
  smsTokenMap.GraphQl,
  smsTokenMap.Json,
  smsTokenMap.Mapping,
  smsTokenMap.SqlBlock,
  smsTokenMap.JsonBlock,
  smsTokenMap.GraphQlBlock,
  smsTokenMap.LCurly,
  smsTokenMap.RCurly,
  smsTokenMap.STRING_LITERAL1,
  smsTokenMap.STRING_LITERAL2,
  smsTokenMap.STRING_LITERAL_LONG1,
  smsTokenMap.STRING_LITERAL_LONG2,
];
