import { tokenMap as sparqlTokenMap } from '../tokens';
import { TokenType, createToken, IToken } from 'chevrotain';

export const tokenMap = {
  STRING_LITERAL_1: sparqlTokenMap.STRING_LITERAL1,
  STRING_LITERAL_2: sparqlTokenMap.STRING_LITERAL2,
  STRING_LITERAL_LONG_1: sparqlTokenMap.STRING_LITERAL_LONG1,
  STRING_LITERAL_LONG_2: sparqlTokenMap.STRING_LITERAL_LONG2,
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
  TO: createToken({
    name: 'TO',
    pattern: /to/i,
  }),
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
  Template: createToken({
    name: 'Template',
    pattern: /template/i,
  }),
  DoubleCaret: sparqlTokenMap.DoubleCaret,
  Semicolon: sparqlTokenMap.Semicolon,
  LBracket: sparqlTokenMap.LBracket,
  RBracket: sparqlTokenMap.RBracket,
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
        secondToLastToken.tokenType !== tokenMap.Sql.tokenName ||
        lastToken.tokenType !== tokenMap.LCurly.tokenName
      ) {
        return null;
      }

      return;
    },
  }),
};

export const tokenTypes: TokenType[] = [
  tokenMap.WhiteSpace,
  tokenMap.Comment,
  tokenMap.LCurly,
  tokenMap.RCurly,
  tokenMap.LParen,
  tokenMap.RParen,
  tokenMap.Period,
  tokenMap.STRING_LITERAL_LONG_1,
  tokenMap.STRING_LITERAL_LONG_2,
  tokenMap.STRING_LITERAL_1,
  tokenMap.STRING_LITERAL_2,
  tokenMap.Template,
];
