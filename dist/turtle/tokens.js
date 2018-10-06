"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chevrotain_1 = require("chevrotain");
const tokens_1 = require("tokens");
const terminals_1 = require("terminals");
const utils_1 = require("utils");
const UCHAR = utils_1.regex.or(utils_1.regex.and(/\\u{/, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX), utils_1.regex.and(/\\U/, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX, terminals_1.HEX));
exports.tokenMap = {
    Comment: chevrotain_1.createToken({
        name: 'Comment',
        pattern: /#[^\n]*/,
        group: 'comments',
    }),
    LBracket: tokens_1.tokenMap.LBracket,
    RBracket: tokens_1.tokenMap.RBracket,
    LCurly: tokens_1.tokenMap.LCurly,
    RCurly: tokens_1.tokenMap.RCurly,
    LParen: tokens_1.tokenMap.LParen,
    RParen: tokens_1.tokenMap.RParen,
    Period: tokens_1.tokenMap.Period,
    WhiteSpace: tokens_1.tokenMap.WhiteSpace,
    TRUE: tokens_1.tokenMap.TRUE,
    FALSE: tokens_1.tokenMap.FALSE,
    DoubleCaret: tokens_1.tokenMap.DoubleCaret,
    Comma: tokens_1.tokenMap.Comma,
    Semicolon: tokens_1.tokenMap.Semicolon,
    A: tokens_1.tokenMap.A,
    PREFIX: tokens_1.tokenMap.PREFIX,
    BASE: tokens_1.tokenMap.BASE,
    PNAME_NS: tokens_1.tokenMap.PNAME_NS,
    PNAME_LN: tokens_1.tokenMap.PNAME_LN,
    BLANK_NODE_LABEL: tokens_1.tokenMap.BLANK_NODE_LABEL,
    TTL_BASE: chevrotain_1.createToken({ name: 'TTL_BASE', pattern: /@base/ }),
    TTL_PREFIX: chevrotain_1.createToken({ name: 'TTL_PREFIX', pattern: /@prefix/ }),
    LANGTAG: tokens_1.tokenMap.LANGTAG,
    INTEGER: chevrotain_1.createToken({
        name: 'INTEGER',
        pattern: utils_1.regex.and(utils_1.regex.option(/[+-]/), /\d+/),
    }),
    DECIMAL: chevrotain_1.createToken({
        name: 'DECIMAL',
        pattern: utils_1.regex.and(utils_1.regex.option(/[+-]/), /(\d*\.\d+)/),
    }),
    DOUBLE: chevrotain_1.createToken({
        name: 'DOUBLE',
        pattern: utils_1.regex.and(utils_1.regex.option(/[+-]/), utils_1.regex.or(utils_1.regex.and(/\d+\.\d*/, terminals_1.EXPONENT), utils_1.regex.and(/\.\d+/, terminals_1.EXPONENT), utils_1.regex.and(/\d+/, terminals_1.EXPONENT))),
    }),
    EXPONENT: chevrotain_1.createToken({ name: 'EXPONENT', pattern: terminals_1.EXPONENT }),
    ECHAR: chevrotain_1.createToken({ name: 'ECHAR', pattern: terminals_1.ECHAR }),
    ANON: tokens_1.tokenMap.ANON,
    PLX: chevrotain_1.createToken({ name: 'PLX', pattern: terminals_1.PLX }),
    PERCENT: tokens_1.tokenMap.PERCENT,
    HEX: chevrotain_1.createToken({ name: 'HEX', pattern: terminals_1.HEX }),
    STRING_LITERAL_LONG_SINGLE_QUOTE: chevrotain_1.createToken({
        name: 'STRING_LITERAL_LONG_SINGLE_QUOTE',
        pattern: utils_1.regex.and(/'{3}/, utils_1.regex.many(utils_1.regex.and(/'{0,2}/, utils_1.regex.or(/[^'\\]/, terminals_1.ECHAR, UCHAR))), /'{3}/),
    }),
    STRING_LITERAL_LONG_QUOTE: chevrotain_1.createToken({
        name: 'STRING_LITERAL_LONG_QUOTE',
        pattern: utils_1.regex.and(/"{3}/, utils_1.regex.many(utils_1.regex.and(/"{0,2}/, utils_1.regex.or(/[^"\\]/, terminals_1.ECHAR, UCHAR))), /"{3}/),
    }),
    STRING_LITERAL_QUOTE: chevrotain_1.createToken({
        name: 'STRING_LITERAL_QUOTE',
        pattern: utils_1.regex.and(/"/, utils_1.regex.many(utils_1.regex.or(/[^\u0022\u005C\u000A\u000D]/, terminals_1.ECHAR, UCHAR)), /"/),
    }),
    STRING_LITERAL_SINGLE_QUOTE: chevrotain_1.createToken({
        name: 'STRING_LITERAL_SINGLE_QUOTE',
        pattern: utils_1.regex.and(/'/, utils_1.regex.many(utils_1.regex.or(/[^\u0027\u005C\u000A\u000D]/, terminals_1.ECHAR, UCHAR)), /'/),
    }),
    UCHAR: chevrotain_1.createToken({
        name: 'UCHAR',
        pattern: UCHAR,
    }),
    IRIREF: chevrotain_1.createToken({
        name: 'IRIREF',
        pattern: utils_1.regex.and(/</, utils_1.regex.many(utils_1.regex.or(/[^\u0000-\u0020<>"\\{}|\^`]/, UCHAR)), />/),
    }),
    PN_CHARS_BASE: chevrotain_1.createToken({ name: 'PN_CHARS_BASE', pattern: terminals_1.PN_CHARS_BASE }),
    PN_CHARS_U: chevrotain_1.createToken({ name: 'PN_CHARS_U', pattern: terminals_1.PN_CHARS_U }),
    PN_CHARS: chevrotain_1.createToken({ name: 'PN_CHARS', pattern: terminals_1.PN_CHARS }),
    PN_PREFIX: chevrotain_1.createToken({ name: 'PN_PREFIX', pattern: terminals_1.PN_PREFIX }),
    PN_LOCAL: chevrotain_1.createToken({ name: 'PN_LOCAL', pattern: terminals_1.PN_LOCAL }),
    PN_LOCAL_ESC: chevrotain_1.createToken({ name: 'PN_LOCAL_ESC', pattern: terminals_1.PN_LOCAL_ESC }),
};
exports.tokenTypes = [
    exports.tokenMap.Comment,
    tokens_1.tokenMap.ANON,
    tokens_1.tokenMap.LBracket,
    tokens_1.tokenMap.RBracket,
    tokens_1.tokenMap.LCurly,
    tokens_1.tokenMap.RCurly,
    tokens_1.tokenMap.LParen,
    tokens_1.tokenMap.RParen,
    tokens_1.tokenMap.WhiteSpace,
    exports.tokenMap.IRIREF,
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
    exports.tokenMap.TTL_BASE,
    exports.tokenMap.TTL_PREFIX,
    tokens_1.tokenMap.LANGTAG,
    exports.tokenMap.UCHAR,
    exports.tokenMap.DOUBLE,
    exports.tokenMap.DECIMAL,
    tokens_1.tokenMap.Period,
    exports.tokenMap.INTEGER,
    exports.tokenMap.EXPONENT,
    exports.tokenMap.ECHAR,
    exports.tokenMap.PLX,
    tokens_1.tokenMap.PERCENT,
    exports.tokenMap.HEX,
    exports.tokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE,
    exports.tokenMap.STRING_LITERAL_LONG_QUOTE,
    exports.tokenMap.STRING_LITERAL_QUOTE,
    exports.tokenMap.STRING_LITERAL_SINGLE_QUOTE,
    exports.tokenMap.UCHAR,
    exports.tokenMap.PN_CHARS_BASE,
    exports.tokenMap.PN_CHARS_U,
    exports.tokenMap.PN_CHARS,
    exports.tokenMap.PN_PREFIX,
    exports.tokenMap.PN_LOCAL,
    exports.tokenMap.PN_LOCAL_ESC,
];