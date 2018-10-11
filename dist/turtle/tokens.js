"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chevrotain_1 = require("chevrotain");
const tokens_1 = require("../tokens");
const terminals_1 = require("../terminals");
const utils_1 = require("../utils");
const escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g;
const escapeReplacements = {
    '\\': '\\',
    "'": "'",
    '"': '"',
    n: '\n',
    r: '\r',
    t: '\t',
    f: '\f',
    b: '\b',
    _: '_',
    '~': '~',
    '.': '.',
    '-': '-',
    '!': '!',
    $: '$',
    '&': '&',
    '(': '(',
    ')': ')',
    '*': '*',
    '+': '+',
    ',': ',',
    ';': ';',
    '=': '=',
    '/': '/',
    '?': '?',
    '#': '#',
    '@': '@',
    '%': '%',
};
const unescape = (item) => {
    try {
        return item.replace(escapeSequence, (_, unicode4, unicode8, escapedChar) => {
            if (unicode4) {
                return String.fromCharCode(parseInt(unicode4, 16));
            }
            else if (unicode8) {
                let charCode = parseInt(unicode8, 16);
                if (charCode <= 0xffff) {
                    return String.fromCharCode(charCode);
                }
                return String.fromCharCode(0xd800 + (charCode -= 0x10000) / 0x400, 0xdc00 + (charCode & 0x3ff));
            }
            else {
                const replacement = escapeReplacements[escapedChar];
                if (!replacement) {
                    throw new Error();
                }
                return replacement;
            }
        });
    }
    catch (error) {
        return null;
    }
};
const unescapedStringLiteralQuote = /^"([^"\\\r\n]+)"/; // non-empty string without escape sequences
const unescapedStringLiteralSingleQuote = /^'([^'\\\r\n]+)'/;
const stringLiteralQuote = /^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])/;
const stringLiteralSingleQuote = /^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/;
const stringLiteralLongQuote = /^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""/;
const stringLiteralLongSingleQuote = /^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/;
const illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;
const escapedIri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/;
const unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/;
// const UCHAR = regex.or(
//   regex.and(/\\u/, HEX, HEX, HEX, HEX),
//   regex.and(/\\U/, HEX, HEX, HEX, HEX, HEX, HEX, HEX, HEX)
// );
// Somehow, for reasons not entirely clear to me, the next RegExp matches all
// of the cases that the UCHAR rule is supposed to match, whereas the above
// RegExp (`UCHAR`) does not. See this post, which is the source of the RegExp
// below: https://mathiasbynens.be/notes/javascript-unicode
// This is a similar resource that might be helpful: https://mathiasbynens.be/notes/es6-unicode-regex
const unicodeRegexp = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
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
        pattern: (text, startOffset = 0) => {
            const match = stringLiteralLongSingleQuote.exec(text.slice(startOffset));
            if (!match || unescape(match[1]) === null) {
                // Bad characters
                return null;
            }
            return match;
        },
        line_breaks: true,
    }),
    STRING_LITERAL_LONG_QUOTE: chevrotain_1.createToken({
        name: 'STRING_LITERAL_LONG_QUOTE',
        pattern: (text, startOffset = 0) => {
            const match = stringLiteralLongQuote.exec(text.slice(startOffset));
            if (!match || unescape(match[1]) === null) {
                // Bad characters
                return null;
            }
            return match;
        },
        line_breaks: true,
    }),
    STRING_LITERAL_QUOTE: chevrotain_1.createToken({
        name: 'STRING_LITERAL_QUOTE',
        pattern: (text, startOffset = 0) => {
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
    STRING_LITERAL_SINGLE_QUOTE: chevrotain_1.createToken({
        name: 'STRING_LITERAL_SINGLE_QUOTE',
        pattern: (text, startOffset = 0) => {
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
    UCHAR: chevrotain_1.createToken({
        name: 'UCHAR',
        pattern: (text, startOffset = 0) => unicodeRegexp.exec(text.slice(startOffset)),
        line_breaks: false,
    }),
    IRIREF: chevrotain_1.createToken({
        name: 'IRIREF',
        pattern: (text, startOffset = 0) => {
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
    tokens_1.tokenMap.TRUE,
    tokens_1.tokenMap.FALSE,
    tokens_1.tokenMap.Comma,
    tokens_1.tokenMap.Semicolon,
    tokens_1.tokenMap.PNAME_NS,
    tokens_1.tokenMap.A,
    tokens_1.tokenMap.PREFIX,
    tokens_1.tokenMap.BASE,
    tokens_1.tokenMap.PNAME_LN,
    tokens_1.tokenMap.BLANK_NODE_LABEL,
    exports.tokenMap.TTL_BASE,
    exports.tokenMap.TTL_PREFIX,
    tokens_1.tokenMap.LANGTAG,
    exports.tokenMap.DOUBLE,
    exports.tokenMap.DECIMAL,
    tokens_1.tokenMap.Period,
    tokens_1.tokenMap.DoubleCaret,
    exports.tokenMap.IRIREF,
    exports.tokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE,
    exports.tokenMap.STRING_LITERAL_LONG_QUOTE,
    exports.tokenMap.STRING_LITERAL_QUOTE,
    exports.tokenMap.STRING_LITERAL_SINGLE_QUOTE,
    exports.tokenMap.INTEGER,
    exports.tokenMap.EXPONENT,
    exports.tokenMap.PLX,
    tokens_1.tokenMap.PERCENT,
    exports.tokenMap.HEX,
    exports.tokenMap.PN_CHARS_BASE,
    exports.tokenMap.PN_CHARS_U,
    exports.tokenMap.PN_CHARS,
    exports.tokenMap.PN_PREFIX,
    exports.tokenMap.PN_LOCAL,
    exports.tokenMap.PN_LOCAL_ESC,
    exports.tokenMap.ECHAR,
    exports.tokenMap.UCHAR,
];
