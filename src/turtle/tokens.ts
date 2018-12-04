import { createToken, TokenType } from 'chevrotain';
import { tokenMap as sparqlTokenMap } from '../sparql/tokens';
import { regex } from '../helpers/regex';
import {
  EXPONENT,
  ECHAR,
  PLX,
  HEX,
  PN_CHARS_BASE,
  PN_CHARS_U,
  PN_CHARS,
  PN_PREFIX,
  PN_LOCAL,
  PN_LOCAL_ESC,
} from '../helpers/matchers';
import {
  unescape,
  stringLiteralLongSingleQuote,
  stringLiteralLongQuote,
  unescapedStringLiteralQuote,
  stringLiteralQuote,
  unescapedStringLiteralSingleQuote,
  stringLiteralSingleQuote,
  unescapedIri,
  escapedIri,
  illegalIriChars,
} from '../helpers/unescape';

const unicodeRegexp = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

export const tokenMap = {
  Comment: createToken({
    name: 'Comment',
    pattern: /#[^\n]*/,
    group: 'comments',
  }),
  LBracket: sparqlTokenMap.LBracket,
  RBracket: sparqlTokenMap.RBracket,
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
    pattern: (text: string, startOffset: number = 0) => {
      const match = stringLiteralLongSingleQuote.exec(text.slice(startOffset));

      if (!match || unescape(match[1]) === null) {
        // Bad characters
        return null;
      }

      return match;
    },
    line_breaks: true,
  }),
  STRING_LITERAL_LONG_QUOTE: createToken({
    name: 'STRING_LITERAL_LONG_QUOTE',
    pattern: (text: string, startOffset: number = 0) => {
      const match = stringLiteralLongQuote.exec(text.slice(startOffset));

      if (!match || unescape(match[1]) === null) {
        // Bad characters
        return null;
      }

      return match;
    },
    line_breaks: true,
  }),
  STRING_LITERAL_QUOTE: createToken({
    name: 'STRING_LITERAL_QUOTE',
    pattern: (text: string, startOffset: number = 0) => {
      const textToMatch = text.slice(startOffset);
      let match = unescapedStringLiteralQuote.exec(textToMatch);

      if (match) {
        return match;
      }

      match = stringLiteralQuote.exec(textToMatch);

      if (!match) {
        return null;
      }

      if (unescape(match[1]) === null) {
        // Bad characters
        return null;
      }

      return match;
    },
    line_breaks: false,
  }),
  STRING_LITERAL_SINGLE_QUOTE: createToken({
    name: 'STRING_LITERAL_SINGLE_QUOTE',
    pattern: (text: string, startOffset: number = 0) => {
      const textToMatch = text.slice(startOffset);
      let match = unescapedStringLiteralSingleQuote.exec(textToMatch);

      if (match) {
        return match;
      }

      match = stringLiteralSingleQuote.exec(textToMatch);

      if (!match) {
        return null;
      }

      if (unescape(match[1]) === null) {
        // Bad characters
        return null;
      }

      return match;
    },
    line_breaks: false,
  }),
  UCHAR: createToken({
    name: 'UCHAR',
    pattern: (text, startOffset: number = 0) =>
      unicodeRegexp.exec(text.slice(startOffset)),
    line_breaks: false,
  }),
  IRIREF: createToken({
    name: 'IRIREF',
    pattern: (text: string, startOffset: number = 0) => {
      const textToMatch = text.slice(startOffset);
      let match = unescapedIri.exec(textToMatch);

      if (match) {
        return match;
      }

      match = escapedIri.exec(textToMatch);
      if (!match) {
        return null;
      }

      const value = unescape(match[1]);

      if (value === null || illegalIriChars.test(value)) {
        return null;
      }

      return match;
    },
    line_breaks: false,
  }),
  PN_CHARS_BASE: createToken({ name: 'PN_CHARS_BASE', pattern: PN_CHARS_BASE }),
  PN_CHARS_U: createToken({ name: 'PN_CHARS_U', pattern: PN_CHARS_U }),
  PN_CHARS: createToken({ name: 'PN_CHARS', pattern: PN_CHARS }),
  PN_PREFIX: createToken({ name: 'PN_PREFIX', pattern: PN_PREFIX }),
  PN_LOCAL: createToken({ name: 'PN_LOCAL', pattern: PN_LOCAL }),
  PN_LOCAL_ESC: createToken({ name: 'PN_LOCAL_ESC', pattern: PN_LOCAL_ESC }),
  Unknown: createToken({
    name: 'Unknown',
    pattern: /\w+/,
  }),
};

export const tokenTypes: TokenType[] = [
  tokenMap.Comment,
  sparqlTokenMap.ANON,
  sparqlTokenMap.LBracket,
  sparqlTokenMap.RBracket,
  sparqlTokenMap.LParen,
  sparqlTokenMap.RParen,
  sparqlTokenMap.WhiteSpace,
  sparqlTokenMap.TRUE,
  sparqlTokenMap.FALSE,
  sparqlTokenMap.Comma,
  sparqlTokenMap.Semicolon,
  sparqlTokenMap.PNAME_NS,
  sparqlTokenMap.A,
  sparqlTokenMap.PREFIX,
  sparqlTokenMap.BASE,
  sparqlTokenMap.PNAME_LN,
  sparqlTokenMap.BLANK_NODE_LABEL,
  tokenMap.TTL_BASE,
  tokenMap.TTL_PREFIX,
  sparqlTokenMap.LANGTAG,
  tokenMap.DOUBLE,
  tokenMap.DECIMAL,
  sparqlTokenMap.Period,
  sparqlTokenMap.DoubleCaret,
  tokenMap.IRIREF,
  tokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE,
  tokenMap.STRING_LITERAL_LONG_QUOTE,
  tokenMap.STRING_LITERAL_QUOTE,
  tokenMap.STRING_LITERAL_SINGLE_QUOTE,
  tokenMap.INTEGER,
  tokenMap.EXPONENT,
  tokenMap.PLX,
  sparqlTokenMap.PERCENT,
  tokenMap.HEX,
  tokenMap.PN_CHARS_BASE,
  tokenMap.PN_CHARS_U,
  tokenMap.PN_CHARS,
  tokenMap.PN_PREFIX,
  tokenMap.PN_LOCAL,
  tokenMap.PN_LOCAL_ESC,
  tokenMap.ECHAR,
  tokenMap.UCHAR,
  tokenMap.Unknown,
];
