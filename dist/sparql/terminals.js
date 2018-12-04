"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore: import types for declarations
const chevrotain_1 = require("chevrotain");
const regex_1 = require("../helpers/regex");
exports.IRIREF = /<[^<>\\{}|\^`\u0000-\u0020]*>/;
exports.PN_CHARS_BASE = /[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDBFF][\uDC00-\uDFFF]/;
const LANGTAG = /@[a-zA-Z]+(-[a-zA-Z0-9]+)*/;
const INTEGER = /\d+/;
const DECIMAL = /(\d*\.\d+)|(\d+\.\d*)/;
exports.EXPONENT = /[eE][+-]?\d+/;
exports.ECHAR = /\\[tbnrf"'\\]/;
const WS = /[\u0020\u0009\u000d\u000a]/;
exports.HEX = /[0-9A-Fa-f]/;
exports.PN_LOCAL_ESC = /\\[_~.\-!\$&'()*+,=\/?#@%;]/;
exports.PN_CHARS_U = regex_1.regex.or(exports.PN_CHARS_BASE, /_/);
exports.PN_CHARS = regex_1.regex.or(exports.PN_CHARS_U, /-/, /\d/, /\u00b7/, /[\u0300-\u036f]/, /[\u203f-\u2040]/);
exports.PN_PREFIX = regex_1.regex.and(exports.PN_CHARS_BASE, regex_1.regex.option(regex_1.regex.and(regex_1.regex.many(regex_1.regex.or(exports.PN_CHARS, /\./)), exports.PN_CHARS)));
exports.PERCENT = regex_1.regex.and(/%/, exports.HEX, exports.HEX);
exports.PLX = regex_1.regex.or(exports.PERCENT, exports.PN_LOCAL_ESC);
exports.PN_LOCAL = regex_1.regex.and(regex_1.regex.or(exports.PN_CHARS_U, /:/, /\d/, exports.PLX), regex_1.regex.option(regex_1.regex.and(regex_1.regex.many(regex_1.regex.or(exports.PN_CHARS, /\./, /:/, exports.PLX)), regex_1.regex.or(exports.PN_CHARS, /:/, exports.PLX))));
const VARNAME = regex_1.regex.and(regex_1.regex.or(exports.PN_CHARS_U, /\d/), regex_1.regex.many(regex_1.regex.or(exports.PN_CHARS_U, /\d/, /\u00b7/, /[\u0300-\u036f]/, /[\u203f-\u2040]/)));
const ANON = regex_1.regex.and(/\[/, regex_1.regex.many(WS), /\]/);
const NIL = regex_1.regex.and(/\(/, regex_1.regex.many(WS), /\)/);
const STRING_LITERAL1 = regex_1.regex.and(/'/, regex_1.regex.many(regex_1.regex.or(/[^\u0027\u005C\u000A\u000D]/, exports.ECHAR)), /'/);
const STRING_LITERAL2 = regex_1.regex.and(/"/, regex_1.regex.many(regex_1.regex.or(/[^\u0022\u005C\u000A\u000D]/, exports.ECHAR)), /"/);
const STRING_LITERAL_LONG1 = regex_1.regex.and(/'''/, regex_1.regex.many(regex_1.regex.and(regex_1.regex.option(regex_1.regex.or(/'/, /''/)), regex_1.regex.or(/[^'\\]/, exports.ECHAR))), /'''/);
const STRING_LITERAL_LONG2 = regex_1.regex.and(/"""/, regex_1.regex.many(regex_1.regex.and(regex_1.regex.option(regex_1.regex.or(/"/, /""/)), regex_1.regex.or(/[^"\\]/, exports.ECHAR))), /"""/);
const DOUBLE = regex_1.regex.or(regex_1.regex.and(/\d+\.\d*/, exports.EXPONENT), regex_1.regex.and(/\.\d+/, exports.EXPONENT), regex_1.regex.and(/\d+/, exports.EXPONENT));
const INTEGER_POSITIVE = regex_1.regex.and(/\+/, INTEGER);
const DECIMAL_POSITIVE = regex_1.regex.and(/\+/, DECIMAL);
const DOUBLE_POSITIVE = regex_1.regex.and(/\+/, DOUBLE);
const INTEGER_NEGATIVE = regex_1.regex.and(/-/, INTEGER);
const DECIMAL_NEGATIVE = regex_1.regex.and(/-/, DECIMAL);
const DOUBLE_NEGATIVE = regex_1.regex.and(/-/, DOUBLE);
const VAR1 = regex_1.regex.and(/\?/, VARNAME);
const VAR2 = regex_1.regex.and(/\$/, VARNAME);
const BLANK_NODE_LABEL = regex_1.regex.and(/_:/, regex_1.regex.or(exports.PN_CHARS_U, /\d/), regex_1.regex.option(regex_1.regex.and(regex_1.regex.many(regex_1.regex.or(exports.PN_CHARS, /\./)), exports.PN_CHARS)));
const PNAME_NS = regex_1.regex.and(regex_1.regex.option(exports.PN_PREFIX), /:/);
const PNAME_LN = regex_1.regex.and(PNAME_NS, exports.PN_LOCAL);
const STRING_LITERAL_LONG1_TOKEN = chevrotain_1.createToken({
    name: 'STRING_LITERAL_LONG1',
    pattern: STRING_LITERAL_LONG1,
});
const STRING_LITERAL_LONG2_TOKEN = chevrotain_1.createToken({
    name: 'STRING_LITERAL_LONG2',
    pattern: STRING_LITERAL_LONG2,
});
const PNAME_LN_TOKEN = chevrotain_1.createToken({
    name: 'PNAME_LN',
    pattern: PNAME_LN,
});
exports.terminals = {
    IRIREF: chevrotain_1.createToken({
        name: 'IRIREF',
        pattern: exports.IRIREF,
        label: '<http://example.com>',
    }),
    LANGTAG: chevrotain_1.createToken({
        name: 'LANGTAG',
        pattern: LANGTAG,
    }),
    INTEGER: chevrotain_1.createToken({
        name: 'INTEGER',
        pattern: INTEGER,
    }),
    DECIMAL: chevrotain_1.createToken({
        name: 'DECIMAL',
        pattern: DECIMAL,
    }),
    DOUBLE: chevrotain_1.createToken({
        name: 'DOUBLE',
        pattern: DOUBLE,
    }),
    INTEGER_POSITIVE: chevrotain_1.createToken({
        name: 'INTEGER_POSITIVE',
        pattern: INTEGER_POSITIVE,
    }),
    DECIMAL_POSITIVE: chevrotain_1.createToken({
        name: 'DECIMAL_POSITIVE',
        pattern: DECIMAL_POSITIVE,
    }),
    DOUBLE_POSITIVE: chevrotain_1.createToken({
        name: 'DOUBLE_POSITIVE',
        pattern: DOUBLE_POSITIVE,
    }),
    INTEGER_NEGATIVE: chevrotain_1.createToken({
        name: 'INTEGER_NEGATIVE',
        pattern: INTEGER_NEGATIVE,
    }),
    DECIMAL_NEGATIVE: chevrotain_1.createToken({
        name: 'DECIMAL_NEGATIVE',
        pattern: DECIMAL_NEGATIVE,
    }),
    DOUBLE_NEGATIVE: chevrotain_1.createToken({
        name: 'DOUBLE_NEGATIVE',
        pattern: DOUBLE_NEGATIVE,
    }),
    STRING_LITERAL_LONG1: STRING_LITERAL_LONG1_TOKEN,
    STRING_LITERAL_LONG2: STRING_LITERAL_LONG2_TOKEN,
    STRING_LITERAL1: chevrotain_1.createToken({
        name: 'STRING_LITERAL1',
        pattern: STRING_LITERAL1,
        longer_alt: STRING_LITERAL_LONG1_TOKEN,
    }),
    STRING_LITERAL2: chevrotain_1.createToken({
        name: 'STRING_LITERAL2',
        pattern: STRING_LITERAL2,
        longer_alt: STRING_LITERAL_LONG2_TOKEN,
    }),
    NIL: chevrotain_1.createToken({
        name: 'NIL',
        pattern: NIL,
        label: '()',
    }),
    ANON: chevrotain_1.createToken({
        name: 'ANON',
        pattern: ANON,
        label: '[]',
    }),
    PNAME_LN: PNAME_LN_TOKEN,
    PNAME_NS: chevrotain_1.createToken({
        name: 'PNAME_NS',
        pattern: PNAME_NS,
        longer_alt: PNAME_LN_TOKEN,
    }),
    BLANK_NODE_LABEL: chevrotain_1.createToken({
        name: 'BLANK_NODE_LABEL',
        pattern: BLANK_NODE_LABEL,
    }),
    VAR1: chevrotain_1.createToken({
        name: 'VAR1',
        pattern: VAR1,
        label: '?foo',
    }),
    VAR2: chevrotain_1.createToken({
        name: 'VAR2',
        pattern: VAR2,
        label: '?bar',
    }),
    PERCENT: chevrotain_1.createToken({
        name: 'PERCENT',
        pattern: exports.PERCENT,
    }),
};
