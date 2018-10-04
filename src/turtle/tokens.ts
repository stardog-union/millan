import { createToken, TokenType } from 'chevrotain';
import { tokenMap as sparqlTokenMap } from 'tokens';
import {
  EXPONENT,
  ECHAR,
  PN_CHARS_BASE,
  PN_CHARS_U,
  PN_CHARS,
  PN_PREFIX,
  PN_LOCAL,
  PLX,
  HEX,
  PN_LOCAL_ESC,
} from 'terminals';
import { regex } from 'utils';

const UCHAR = regex.or(
  regex.and(/\\u/, HEX, HEX, HEX, HEX),
  regex.and(/\\U/, HEX, HEX, HEX, HEX, HEX, HEX, HEX, HEX)
);

export const tokenMap = {
  Comment: createToken({
    name: 'Comment',
    pattern: /#[^\n]*/,
    group: 'comments',
  }),
  LBracket: sparqlTokenMap.LBracket,
  RBracket: sparqlTokenMap.RBracket,
  LCurly: sparqlTokenMap.LCurly,
  RCurly: sparqlTokenMap.RCurly,
  LParen: sparqlTokenMap.LParen,
  RParen: sparqlTokenMap.RParen,
  Period: sparqlTokenMap.Period,
  WhiteSpace: sparqlTokenMap.WhiteSpace,
  TRUE: sparqlTokenMap.TRUE,
  FALSE: sparqlTokenMap.FALSE,
  DoubleCaret: sparqlTokenMap.DoubleCaret,
  Comma: sparqlTokenMap.Comma,
  Semicolon: sparqlTokenMap.Semicolon,
  A: sparqlTokenMap.A,
  PREFIX: sparqlTokenMap.PREFIX,
  BASE: sparqlTokenMap.BASE,
  PNAME_NS: sparqlTokenMap.PNAME_NS,
  PNAME_LN: sparqlTokenMap.PNAME_LN,
  BLANK_NODE_LABEL: sparqlTokenMap.BLANK_NODE_LABEL,
  TTL_BASE: createToken({ name: 'TTL_BASE', pattern: /@base/ }),
  TTL_PREFIX: createToken({ name: 'TTL_PREFIX', pattern: /@prefix/ }),
  LANGTAG: sparqlTokenMap.LANGTAG,
  IRIREF: createToken({
    name: 'IRIREF',
    pattern: regex.and(
      /</,
      regex.many(regex.or(/[^\u0000-\u0020<>"\\{}|\^`]/, UCHAR)),
      />/
    ),
  }),
  INTEGER: createToken({
    name: 'INTEGER',
    pattern: regex.and(regex.option(/[+-]/), /\d+/),
  }),
  DECIMAL: createToken({
    name: 'DECIMAL',
    pattern: regex.and(regex.option(/[+-]/), /(\d*\.\d+)/),
  }),
  DOUBLE: createToken({
    name: 'DOUBLE',
    pattern: regex.and(
      regex.option(/[+-]/),
      regex.or(
        regex.and(/\d+\.\d*/, EXPONENT),
        regex.and(/\.\d+/, EXPONENT),
        regex.and(/\d+/, EXPONENT)
      )
    ),
  }),
  EXPONENT: createToken({ name: 'EXPONENT', pattern: EXPONENT }),
  ECHAR: createToken({ name: 'ECHAR', pattern: ECHAR }),
  ANON: sparqlTokenMap.ANON,
  PLX: createToken({ name: 'PLX', pattern: PLX }),
  PERCENT: sparqlTokenMap.PERCENT,
  HEX: createToken({ name: 'HEX', pattern: HEX }),
  STRING_LITERAL_LONG_SINGLE_QUOTE: createToken({
    name: 'STRING_LITERAL_LONG_SINGLE_QUOTE',
    pattern: regex.and(
      /'{3}/,
      regex.many(regex.and(/'{0,2}/, regex.or(/[^'\\]/, ECHAR, UCHAR))),
      /'{3}/
    ),
  }),
  STRING_LITERAL_LONG_QUOTE: createToken({
    name: 'STRING_LITERAL_LONG_QUOTE',
    pattern: regex.and(
      /"{3}/,
      regex.many(regex.and(/"{0,2}/, regex.or(/[^"\\]/, ECHAR, UCHAR))),
      /"{3}/
    ),
  }),
  STRING_LITERAL_QUOTE: createToken({
    name: 'STRING_LITERAL_QUOTE',
    pattern: regex.and(
      /"/,
      regex.many(regex.or(/[^\u0022\u005C\u000A\u000D]/, ECHAR, UCHAR)),
      /"/
    ),
  }),
  STRING_LITERAL_SINGLE_QUOTE: createToken({
    name: 'STRING_LITERAL_SINGLE_QUOTE',
    pattern: regex.and(
      /'/,
      regex.many(regex.or(/[^\u0027\u005C\u000A\u000D]/, ECHAR, UCHAR)),
      /'/
    ),
  }),
  UCHAR: createToken({
    name: 'UCHAR',
    pattern: UCHAR,
  }),
  PN_CHARS_BASE: createToken({ name: 'PN_CHARS_BASE', pattern: PN_CHARS_BASE }),
  PN_CHARS_U: createToken({ name: 'PN_CHARS_U', pattern: PN_CHARS_U }),
  PN_CHARS: createToken({ name: 'PN_CHARS', pattern: PN_CHARS }),
  PN_PREFIX: createToken({ name: 'PN_PREFIX', pattern: PN_PREFIX }),
  PN_LOCAL: createToken({ name: 'PN_LOCAL', pattern: PN_LOCAL }),
  PN_LOCAL_ESC: createToken({ name: 'PN_LOCAL_ESC', pattern: PN_LOCAL_ESC }),
};

export const tokenTypes: TokenType[] = [
  tokenMap.Comment,
  sparqlTokenMap.ANON,
  sparqlTokenMap.LBracket,
  sparqlTokenMap.RBracket,
  sparqlTokenMap.LCurly,
  sparqlTokenMap.RCurly,
  sparqlTokenMap.LParen,
  sparqlTokenMap.RParen,
  sparqlTokenMap.Period,
  sparqlTokenMap.WhiteSpace,
  tokenMap.IRIREF,
  sparqlTokenMap.TRUE,
  sparqlTokenMap.FALSE,
  sparqlTokenMap.DoubleCaret,
  sparqlTokenMap.Comma,
  sparqlTokenMap.Semicolon,
  sparqlTokenMap.A,
  sparqlTokenMap.PREFIX,
  sparqlTokenMap.BASE,
  sparqlTokenMap.PNAME_NS,
  sparqlTokenMap.PNAME_LN,
  sparqlTokenMap.BLANK_NODE_LABEL,
  tokenMap.TTL_BASE,
  tokenMap.TTL_PREFIX,
  sparqlTokenMap.LANGTAG,
  tokenMap.UCHAR,
  tokenMap.INTEGER,
  tokenMap.DECIMAL,
  tokenMap.DOUBLE,
  tokenMap.EXPONENT,
  tokenMap.ECHAR,
  tokenMap.PLX,
  sparqlTokenMap.PERCENT,
  tokenMap.HEX,
  tokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE,
  tokenMap.STRING_LITERAL_LONG_QUOTE,
  tokenMap.STRING_LITERAL_QUOTE,
  tokenMap.STRING_LITERAL_SINGLE_QUOTE,
  tokenMap.UCHAR,
  tokenMap.PN_CHARS_BASE,
  tokenMap.PN_CHARS_U,
  tokenMap.PN_CHARS,
  tokenMap.PN_PREFIX,
  tokenMap.PN_LOCAL,
  tokenMap.PN_LOCAL_ESC,
];
