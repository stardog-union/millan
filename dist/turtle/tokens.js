"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chevrotain_1 = require("chevrotain");
const tokens_1 = require("tokens");
const terminals_1 = require("terminals");
const utils_1 = require("utils");
const UCHAR = utils_1.regex.or(utils_1.regex.and(/\\u/, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX), utils_1.regex.and(/\\U/, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX));
exports.tokenTypes = [
    tokens_1.tokenMap.LBracket,
    tokens_1.tokenMap.RBracket,
    tokens_1.tokenMap.LCurly,
    tokens_1.tokenMap.RCurly,
    tokens_1.tokenMap.LParen,
    tokens_1.tokenMap.RParen,
    tokens_1.tokenMap.Period,
    tokens_1.tokenMap.WhiteSpace,
    tokens_1.tokenMap.TRUE,
    tokens_1.tokenMap.FALSE,
    tokens_1.tokenMap.DoubleCaret,
    tokens_1.tokenMap.Comma,
    tokens_1.tokenMap.Semicolon,
    tokens_1.tokenMap.A,
    tokens_1.tokenMap.PREFIX,
    tokens_1.tokenMap.BASE,
    tokens_1.tokenMap.PNAME_NS,
    tokens_1.tokenMap.PNAME_LN,
    tokens_1.tokenMap.BLANK_NODE_LABEL,
    chevrotain_1.createToken({ name: 'TTL_BASE', pattern: /@base/ }),
    chevrotain_1.createToken({ name: 'TTL_PREFIX', pattern: /@prefix/ }),
    tokens_1.tokenMap.LANGTAG,
    chevrotain_1.createToken({ name: 'EXPONENT', pattern: terminals_1.EXPONENT }),
    chevrotain_1.createToken({ name: 'ECHAR', pattern: terminals_1.ECHAR }),
    tokens_1.tokenMap.ANON,
    chevrotain_1.createToken({ name: 'PN_CHARS_BASE', pattern: terminals_1.PN_CHARS_BASE }),
    chevrotain_1.createToken({ name: 'PN_CHARS_U', pattern: terminals_1.PN_CHARS_U }),
    chevrotain_1.createToken({ name: 'PN_CHARS', pattern: terminals_1.PN_CHARS }),
    chevrotain_1.createToken({ name: 'PN_PREFIX', pattern: terminals_1.PN_PREFIX }),
    chevrotain_1.createToken({ name: 'PN_LOCAL', pattern: terminals_1.PN_LOCAL }),
    chevrotain_1.createToken({ name: 'PLX', pattern: terminals_1.PLX }),
    tokens_1.tokenMap.PERCENT,
    chevrotain_1.createToken({ name: 'HEX', pattern: terminals_1.HEX }),
    chevrotain_1.createToken({ name: 'PN_LOCAL_ESC', pattern: terminals_1.PN_LOCAL_ESC }),
    // createToken({
    //   name: 'IRIREF',
    //   pattern: /</, // '<' ([^#x00-#x20<>"{}|^`\] | UCHAR)* '>'    /* #x00=NULL #01-#x1F=control codes #x20=space */
    // }),
    chevrotain_1.createToken({
        name: 'STRING_LITERAL_LONG_SINGLE_QUOTE',
        pattern: utils_1.regex.and(/'{3}/, utils_1.regex.many(utils_1.regex.and(/'{0,2}/, utils_1.regex.or(/[^'\\]/, terminals_1.ECHAR, UCHAR))), /'{3}/),
    }),
    chevrotain_1.createToken({
        name: 'STRING_LITERAL_LONG_QUOTE',
        pattern: utils_1.regex.and(/"{3}/, utils_1.regex.many(utils_1.regex.and(/"{0,2}/, utils_1.regex.or(/[^"\\]/, terminals_1.ECHAR, UCHAR))), /"{3}/),
    }),
    chevrotain_1.createToken({
        name: 'STRING_LITERAL_QUOTE',
        pattern: utils_1.regex.and(/"/, utils_1.regex.many(utils_1.regex.or(/[^\u0027\u005C\u000A\u000D]/, terminals_1.ECHAR, UCHAR)), /"/),
    }),
    chevrotain_1.createToken({
        name: 'STRING_LITERAL_SINGLE_QUOTE',
        pattern: utils_1.regex.and(/'/, utils_1.regex.many(utils_1.regex.or(/[^\u0027\u005C\u000A\u000D]/, terminals_1.ECHAR, UCHAR)), /'/),
    }),
    chevrotain_1.createToken({
        name: 'UCHAR',
        pattern: UCHAR,
    }),
];
