import { createToken, TokenType } from 'chevrotain';
import { tokenMap } from 'tokens';
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

export const tokenTypes: TokenType[] = [
  tokenMap.LBracket,
  tokenMap.RBracket,
  tokenMap.LCurly,
  tokenMap.RCurly,
  tokenMap.LParen,
  tokenMap.RParen,
  tokenMap.Period,
  tokenMap.WhiteSpace,
  tokenMap.TRUE,
  tokenMap.FALSE,
  tokenMap.DoubleCaret,
  tokenMap.Comma,
  tokenMap.Semicolon,
  tokenMap.A,
  tokenMap.PREFIX,
  tokenMap.BASE,
  tokenMap.PNAME_NS,
  tokenMap.PNAME_LN,
  tokenMap.BLANK_NODE_LABEL,
  createToken({ name: 'TTL_BASE', pattern: /@base/ }),
  createToken({ name: 'TTL_PREFIX', pattern: /@prefix/ }),
  tokenMap.LANGTAG,
  createToken({ name: 'EXPONENT', pattern: EXPONENT }),
  createToken({ name: 'ECHAR', pattern: ECHAR }),
  tokenMap.ANON,
  createToken({ name: 'PN_CHARS_BASE', pattern: PN_CHARS_BASE }),
  createToken({ name: 'PN_CHARS_U', pattern: PN_CHARS_U }),
  createToken({ name: 'PN_CHARS', pattern: PN_CHARS }),
  createToken({ name: 'PN_PREFIX', pattern: PN_PREFIX }),
  createToken({ name: 'PN_LOCAL', pattern: PN_LOCAL }),
  createToken({ name: 'PLX', pattern: PLX }),
  tokenMap.PERCENT,
  createToken({ name: 'HEX', pattern: HEX }),
  createToken({ name: 'PN_LOCAL_ESC', pattern: PN_LOCAL_ESC }),
  // createToken({
  //   name: 'IRIREF',
  //   pattern: /</, // '<' ([^#x00-#x20<>"{}|^`\] | UCHAR)* '>'    /* #x00=NULL #01-#x1F=control codes #x20=space */
  // }),

  createToken({
    name: 'STRING_LITERAL_LONG_SINGLE_QUOTE',
    pattern: regex.and(
      /'{3}/,
      regex.many(regex.and(/'{0,2}/, regex.or(/[^'\\]/, ECHAR, UCHAR))),
      /'{3}/
    ),
  }),
  createToken({
    name: 'STRING_LITERAL_LONG_QUOTE',
    pattern: regex.and(
      /"{3}/,
      regex.many(regex.and(/"{0,2}/, regex.or(/[^"\\]/, ECHAR, UCHAR))),
      /"{3}/
    ),
  }),
  createToken({
    name: 'STRING_LITERAL_QUOTE',
    pattern: regex.and(
      /"/,
      regex.many(regex.or(/[^\u0027\u005C\u000A\u000D]/, ECHAR, UCHAR)),
      /"/
    ),
  }),
  createToken({
    name: 'STRING_LITERAL_SINGLE_QUOTE',
    pattern: regex.and(
      /'/,
      regex.many(regex.or(/[^\u0027\u005C\u000A\u000D]/, ECHAR, UCHAR)),
      /'/
    ),
  }),
  createToken({
    name: 'UCHAR',
    pattern: UCHAR,
  }),
];
