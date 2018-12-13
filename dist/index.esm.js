import { createToken, Lexer, Parser } from 'chevrotain';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var regex = {
    or: function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
        return new RegExp(r.map(function (_a) {
            var source = _a.source;
            return "(" + source + ")";
        }).join('|'));
    },
    and: function () {
        var r = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            r[_i] = arguments[_i];
        }
        return new RegExp(r.map(function (_a) {
            var source = _a.source;
            return "(" + source + ")";
        }).join(''));
    },
    option: function (r) {
        return new RegExp("(" + r.source + ")?");
    },
    many: function (r) {
        return new RegExp("(" + r.source + ")*");
    },
};

var IRIREF = /<[^<>\\{}|\^`\u0000-\u0020]*>/;
var PN_CHARS_BASE = /[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDBFF][\uDC00-\uDFFF]/;
var LANGTAG = /@[a-zA-Z]+(-[a-zA-Z0-9]+)*/;
var INTEGER = /\d+/;
var DECIMAL = /(\d*\.\d+)|(\d+\.\d*)/;
var EXPONENT = /[eE][+-]?\d+/;
var ECHAR = /\\[tbnrf"'\\]/;
var WS = /[\u0020\u0009\u000d\u000a]/;
var HEX = /[0-9A-Fa-f]/;
var PN_LOCAL_ESC = /\\[_~.\-!\$&'()*+,=\/?#@%;]/;
var PN_CHARS_U = regex.or(PN_CHARS_BASE, /_/);
var PN_CHARS = regex.or(PN_CHARS_U, /-/, /\d/, /\u00b7/, /[\u0300-\u036f]/, /[\u203f-\u2040]/);
var PN_PREFIX = regex.and(PN_CHARS_BASE, regex.option(regex.and(regex.many(regex.or(PN_CHARS, /\./)), PN_CHARS)));
var PERCENT = regex.and(/%/, HEX, HEX);
var PLX = regex.or(PERCENT, PN_LOCAL_ESC);
var PN_LOCAL = regex.and(regex.or(PN_CHARS_U, /:/, /\d/, PLX), regex.option(regex.and(regex.many(regex.or(PN_CHARS, /\./, /:/, PLX)), regex.or(PN_CHARS, /:/, PLX))));
var VARNAME = regex.and(regex.or(PN_CHARS_U, /\d/), regex.many(regex.or(PN_CHARS_U, /\d/, /\u00b7/, /[\u0300-\u036f]/, /[\u203f-\u2040]/)));
var ANON = regex.and(/\[/, regex.many(WS), /\]/);
var NIL = regex.and(/\(/, regex.many(WS), /\)/);
var STRING_LITERAL1 = regex.and(/'/, regex.many(regex.or(/[^\u0027\u005C\u000A\u000D]/, ECHAR)), /'/);
var STRING_LITERAL2 = regex.and(/"/, regex.many(regex.or(/[^\u0022\u005C\u000A\u000D]/, ECHAR)), /"/);
var STRING_LITERAL_LONG1 = regex.and(/'''/, regex.many(regex.and(regex.option(regex.or(/'/, /''/)), regex.or(/[^'\\]/, ECHAR))), /'''/);
var STRING_LITERAL_LONG2 = regex.and(/"""/, regex.many(regex.and(regex.option(regex.or(/"/, /""/)), regex.or(/[^"\\]/, ECHAR))), /"""/);
var DOUBLE = regex.or(regex.and(/\d+\.\d*/, EXPONENT), regex.and(/\.\d+/, EXPONENT), regex.and(/\d+/, EXPONENT));
var INTEGER_POSITIVE = regex.and(/\+/, INTEGER);
var DECIMAL_POSITIVE = regex.and(/\+/, DECIMAL);
var DOUBLE_POSITIVE = regex.and(/\+/, DOUBLE);
var INTEGER_NEGATIVE = regex.and(/-/, INTEGER);
var DECIMAL_NEGATIVE = regex.and(/-/, DECIMAL);
var DOUBLE_NEGATIVE = regex.and(/-/, DOUBLE);
var VAR1 = regex.and(/\?/, VARNAME);
var VAR2 = regex.and(/\$/, VARNAME);
var BLANK_NODE_LABEL = regex.and(/_:/, regex.or(PN_CHARS_U, /\d/), regex.option(regex.and(regex.many(regex.or(PN_CHARS, /\./)), PN_CHARS)));
var PNAME_NS = regex.and(regex.option(PN_PREFIX), /:/);
var PNAME_LN = regex.and(PNAME_NS, PN_LOCAL);

var matchers = /*#__PURE__*/Object.freeze({
    IRIREF: IRIREF,
    PN_CHARS_BASE: PN_CHARS_BASE,
    LANGTAG: LANGTAG,
    INTEGER: INTEGER,
    DECIMAL: DECIMAL,
    EXPONENT: EXPONENT,
    ECHAR: ECHAR,
    WS: WS,
    HEX: HEX,
    PN_LOCAL_ESC: PN_LOCAL_ESC,
    PN_CHARS_U: PN_CHARS_U,
    PN_CHARS: PN_CHARS,
    PN_PREFIX: PN_PREFIX,
    PERCENT: PERCENT,
    PLX: PLX,
    PN_LOCAL: PN_LOCAL,
    VARNAME: VARNAME,
    ANON: ANON,
    NIL: NIL,
    STRING_LITERAL1: STRING_LITERAL1,
    STRING_LITERAL2: STRING_LITERAL2,
    STRING_LITERAL_LONG1: STRING_LITERAL_LONG1,
    STRING_LITERAL_LONG2: STRING_LITERAL_LONG2,
    DOUBLE: DOUBLE,
    INTEGER_POSITIVE: INTEGER_POSITIVE,
    DECIMAL_POSITIVE: DECIMAL_POSITIVE,
    DOUBLE_POSITIVE: DOUBLE_POSITIVE,
    INTEGER_NEGATIVE: INTEGER_NEGATIVE,
    DECIMAL_NEGATIVE: DECIMAL_NEGATIVE,
    DOUBLE_NEGATIVE: DOUBLE_NEGATIVE,
    VAR1: VAR1,
    VAR2: VAR2,
    BLANK_NODE_LABEL: BLANK_NODE_LABEL,
    PNAME_NS: PNAME_NS,
    PNAME_LN: PNAME_LN
});

// @ts-ignore: import types for declarations
var STRING_LITERAL_LONG1_TOKEN = createToken({
    name: 'STRING_LITERAL_LONG1',
    pattern: STRING_LITERAL_LONG1,
});
var STRING_LITERAL_LONG2_TOKEN = createToken({
    name: 'STRING_LITERAL_LONG2',
    pattern: STRING_LITERAL_LONG2,
});
var PNAME_LN_TOKEN = createToken({
    name: 'PNAME_LN',
    pattern: PNAME_LN,
});
var terminals = {
    IRIREF: createToken({
        name: 'IRIREF',
        pattern: IRIREF,
        label: '<http://example.com>',
    }),
    LANGTAG: createToken({
        name: 'LANGTAG',
        pattern: LANGTAG,
    }),
    INTEGER: createToken({
        name: 'INTEGER',
        pattern: INTEGER,
    }),
    DECIMAL: createToken({
        name: 'DECIMAL',
        pattern: DECIMAL,
    }),
    DOUBLE: createToken({
        name: 'DOUBLE',
        pattern: DOUBLE,
    }),
    INTEGER_POSITIVE: createToken({
        name: 'INTEGER_POSITIVE',
        pattern: INTEGER_POSITIVE,
    }),
    DECIMAL_POSITIVE: createToken({
        name: 'DECIMAL_POSITIVE',
        pattern: DECIMAL_POSITIVE,
    }),
    DOUBLE_POSITIVE: createToken({
        name: 'DOUBLE_POSITIVE',
        pattern: DOUBLE_POSITIVE,
    }),
    INTEGER_NEGATIVE: createToken({
        name: 'INTEGER_NEGATIVE',
        pattern: INTEGER_NEGATIVE,
    }),
    DECIMAL_NEGATIVE: createToken({
        name: 'DECIMAL_NEGATIVE',
        pattern: DECIMAL_NEGATIVE,
    }),
    DOUBLE_NEGATIVE: createToken({
        name: 'DOUBLE_NEGATIVE',
        pattern: DOUBLE_NEGATIVE,
    }),
    STRING_LITERAL_LONG1: STRING_LITERAL_LONG1_TOKEN,
    STRING_LITERAL_LONG2: STRING_LITERAL_LONG2_TOKEN,
    STRING_LITERAL1: createToken({
        name: 'STRING_LITERAL1',
        pattern: STRING_LITERAL1,
        longer_alt: STRING_LITERAL_LONG1_TOKEN,
    }),
    STRING_LITERAL2: createToken({
        name: 'STRING_LITERAL2',
        pattern: STRING_LITERAL2,
        longer_alt: STRING_LITERAL_LONG2_TOKEN,
    }),
    NIL: createToken({
        name: 'NIL',
        pattern: NIL,
        label: '()',
    }),
    ANON: createToken({
        name: 'ANON',
        pattern: ANON,
        label: '[]',
    }),
    PNAME_LN: PNAME_LN_TOKEN,
    PNAME_NS: createToken({
        name: 'PNAME_NS',
        pattern: PNAME_NS,
        longer_alt: PNAME_LN_TOKEN,
    }),
    BLANK_NODE_LABEL: createToken({
        name: 'BLANK_NODE_LABEL',
        pattern: BLANK_NODE_LABEL,
    }),
    VAR1: createToken({
        name: 'VAR1',
        pattern: VAR1,
        label: '?foo',
    }),
    VAR2: createToken({
        name: 'VAR2',
        pattern: VAR2,
        label: '?bar',
    }),
    PERCENT: createToken({
        name: 'PERCENT',
        pattern: PERCENT,
    }),
};

// @ts-ignore: import types for declarations
var MAX_LENGTH = createToken({
    name: 'MAX_LENGTH',
    pattern: /MAX LENGTH/i,
});
var keywords = {
    SELECT: createToken({
        name: 'SELECT',
        pattern: /SELECT/i,
    }),
    CONSTRUCT: createToken({
        name: 'CONSTRUCT',
        pattern: /CONSTRUCT/i,
    }),
    DISTINCT: createToken({
        name: 'DISTINCT',
        pattern: /DISTINCT/i,
    }),
    START: createToken({
        name: 'START',
        pattern: /START/i,
    }),
    END: createToken({
        name: 'END',
        pattern: /END/i,
    }),
    VIA: createToken({
        name: 'VIA',
        pattern: /VIA/i,
    }),
    PATHS: createToken({
        name: 'PATHS',
        pattern: /PATHS/i,
    }),
    PATHS_ALL: createToken({
        name: 'PATHS_ALL',
        pattern: /PATHS ALL/i,
    }),
    PATHS_SHORTEST: createToken({
        name: 'PATHS_SHORTEST',
        pattern: /PATHS SHORTEST/i,
    }),
    CYCLIC: createToken({
        name: 'CYCLIC',
        pattern: /CYCLIC/i,
    }),
    AS: createToken({
        name: 'AS',
        pattern: /AS/i,
    }),
    WHERE: createToken({
        name: 'WHERE',
        pattern: /WHERE/i,
    }),
    A: createToken({
        name: 'A',
        pattern: /a/i,
    }),
    GroupBy: createToken({
        name: 'GroupBy',
        pattern: /group by/i,
    }),
    OrderBy: createToken({
        name: 'OrderBy',
        pattern: /order by/i,
    }),
    By: createToken({
        name: 'By',
        pattern: /By/i,
    }),
    BASE: createToken({
        name: 'BASE',
        pattern: /BASE/i,
    }),
    PREFIX: createToken({
        name: 'PREFIX',
        pattern: /PREFIX/i,
    }),
    DESCRIBE: createToken({
        name: 'DESCRIBE',
        pattern: /DESCRIBE/i,
    }),
    ASK: createToken({
        name: 'ASK',
        pattern: /ASK/i,
    }),
    FROM: createToken({
        name: 'FROM',
        pattern: /FROM/i,
    }),
    REDUCED: createToken({
        name: 'REDUCED',
        pattern: /REDUCED/i,
    }),
    NAMED: createToken({
        name: 'NAMED',
        pattern: /NAMED/i,
    }),
    HAVING: createToken({
        name: 'HAVING',
        pattern: /HAVING/i,
    }),
    ASC: createToken({
        name: 'ASC',
        pattern: /ASC/i,
    }),
    DESC: createToken({
        name: 'DESC',
        pattern: /DESC/i,
    }),
    OFFSET: createToken({
        name: 'OFFSET',
        pattern: /OFFSET/i,
    }),
    LIMIT: createToken({
        name: 'LIMIT',
        pattern: /LIMIT/i,
    }),
    VALUES: createToken({
        name: 'VALUES',
        pattern: /VALUES/i,
    }),
    LOAD: createToken({
        name: 'LOAD',
        pattern: /LOAD/i,
    }),
    SILENT: createToken({
        name: 'SILENT',
        pattern: /SILENT/i,
    }),
    INTO: createToken({
        name: 'INTO',
        pattern: /INTO/i,
    }),
    CLEAR: createToken({
        name: 'CLEAR',
        pattern: /CLEAR/i,
    }),
    DROP: createToken({
        name: 'DROP',
        pattern: /DROP/i,
    }),
    CREATE: createToken({
        name: 'CREATE',
        pattern: /CREATE/i,
    }),
    ADD: createToken({
        name: 'ADD',
        pattern: /ADD/i,
    }),
    TO: createToken({
        name: 'TO',
        pattern: /TO/i,
    }),
    MOVE: createToken({
        name: 'MOVE',
        pattern: /MOVE/i,
    }),
    COPY: createToken({
        name: 'COPY',
        pattern: /COPY/i,
    }),
    INSERT_DATA: createToken({
        name: 'INSERT_DATA',
        pattern: /Insert +Data/i,
    }),
    DELETE_DATA: createToken({
        name: 'DELETE_DATA',
        pattern: /Delete +Data/i,
    }),
    DELETE_WHERE: createToken({
        name: 'DELETE_WHERE',
        pattern: /Delete +Where/i,
    }),
    WITH: createToken({
        name: 'WITH',
        pattern: /WITH/i,
    }),
    DELETE: createToken({
        name: 'DELETE',
        pattern: /DELETE/i,
    }),
    INSERT: createToken({
        name: 'INSERT',
        pattern: /INSERT/i,
    }),
    USING: createToken({
        name: 'USING',
        pattern: /USING/i,
    }),
    DEFAULT: createToken({
        name: 'DEFAULT',
        pattern: /DEFAULT/i,
    }),
    GRAPH: createToken({
        name: 'GRAPH',
        pattern: /GRAPH/i,
    }),
    ALL: createToken({
        name: 'ALL',
        pattern: /ALL/i,
    }),
    OPTIONAL: createToken({
        name: 'OPTIONAL',
        pattern: /OPTIONAL/i,
    }),
    SERVICE: createToken({
        name: 'SERVICE',
        pattern: /SERVICE/i,
    }),
    BIND: createToken({
        name: 'BIND',
        pattern: /BIND/i,
    }),
    UNDEF: createToken({
        name: 'UNDEF',
        pattern: /UNDEF/i,
    }),
    MINUS: createToken({
        name: 'MINUS',
        pattern: /MINUS/i,
    }),
    UNION: createToken({
        name: 'UNION',
        pattern: /UNION/i,
    }),
    FILTER: createToken({
        name: 'FILTER',
        pattern: /FILTER/i,
    }),
    STR: createToken({
        name: 'STR',
        pattern: /STR/i,
    }),
    LANG: createToken({
        name: 'LANG',
        pattern: /LANG/i,
    }),
    LANGMATCHERS: createToken({
        name: 'LANGMATCHERS',
        pattern: /LANGMATCHERS/i,
    }),
    DATATYPE: createToken({
        name: 'DATATYPE',
        pattern: /DATATYPE/i,
    }),
    BOUND: createToken({
        name: 'BOUND',
        pattern: /BOUND/i,
    }),
    IRI: createToken({
        name: 'IRI',
        pattern: /IRI/i,
    }),
    URI: createToken({
        name: 'URI',
        pattern: /URI/i,
    }),
    BNODE: createToken({
        name: 'BNODE',
        pattern: /BNODE/i,
    }),
    RAND: createToken({
        name: 'RAND',
        pattern: /RAND/i,
    }),
    ABS: createToken({
        name: 'ABS',
        pattern: /ABS/i,
    }),
    CEIL: createToken({
        name: 'CEIL',
        pattern: /CEIL/i,
    }),
    FLOOR: createToken({
        name: 'FLOOR',
        pattern: /FLOOR/i,
    }),
    ROUND: createToken({
        name: 'ROUND',
        pattern: /ROUND/i,
    }),
    CONCAT: createToken({
        name: 'CONCAT',
        pattern: /CONCAT/i,
    }),
    STRLEN: createToken({
        name: 'STRLEN',
        pattern: /STRLEN/i,
    }),
    UCASE: createToken({
        name: 'UCASE',
        pattern: /UCASE/i,
    }),
    LCASE: createToken({
        name: 'LCASE',
        pattern: /LCASE/i,
    }),
    ENCODE_FOR_URI: createToken({
        name: 'ENCODE_FOR_URI',
        pattern: /ENCODE_FOR_URI/i,
    }),
    CONTAINS: createToken({
        name: 'CONTAINS',
        pattern: /CONTAINS/i,
    }),
    STRSTARTS: createToken({
        name: 'STRSTARTS',
        pattern: /STRSTARTS/i,
    }),
    STRENDS: createToken({
        name: 'STRENDS',
        pattern: /STRENDS/i,
    }),
    STRBEFORE: createToken({
        name: 'STRBEFORE',
        pattern: /STRBEFORE/i,
    }),
    STRAFTER: createToken({
        name: 'STRAFTER',
        pattern: /STRAFTER/i,
    }),
    YEAR: createToken({
        name: 'YEAR',
        pattern: /YEAR/i,
    }),
    MONTH: createToken({
        name: 'MONTH',
        pattern: /MONTH/i,
    }),
    DAY: createToken({
        name: 'DAY',
        pattern: /DAY/i,
    }),
    HOURS: createToken({
        name: 'HOURS',
        pattern: /HOURS/i,
    }),
    MINUTES: createToken({
        name: 'MINUTES',
        pattern: /MINUTES/i,
    }),
    SECONDS: createToken({
        name: 'SECONDS',
        pattern: /SECONDS/i,
    }),
    TIMEZONE: createToken({
        name: 'TIMEZONE',
        pattern: /TIMEZONE/i,
    }),
    TZ: createToken({
        name: 'TZ',
        pattern: /TZ/i,
    }),
    NOW: createToken({
        name: 'NOW',
        pattern: /NOW/i,
    }),
    UUID: createToken({
        name: 'UUID',
        pattern: /UUID/i,
    }),
    STRUUID: createToken({
        name: 'STRUUID',
        pattern: /STRUUID/i,
    }),
    MD5: createToken({
        name: 'MD5',
        pattern: /MD5/i,
    }),
    SHA1: createToken({
        name: 'SHA1',
        pattern: /SHA1/i,
    }),
    SHA256: createToken({
        name: 'SHA256',
        pattern: /SHA256/i,
    }),
    SHA384: createToken({
        name: 'SHA384',
        pattern: /SHA384/i,
    }),
    SHA512: createToken({
        name: 'SHA512',
        pattern: /SHA512/i,
    }),
    COALESCE: createToken({
        name: 'COALESCE',
        pattern: /COALESCE/i,
    }),
    IF: createToken({
        name: 'IF',
        pattern: /IF/i,
    }),
    STRLANG: createToken({
        name: 'STRLANG',
        pattern: /STRLANG/i,
    }),
    STRDT: createToken({
        name: 'STRDT',
        pattern: /STRDT/i,
    }),
    sameTerm: createToken({
        name: 'sameTerm',
        pattern: /sameTerm/i,
    }),
    isIRI: createToken({
        name: 'isIRI',
        pattern: /isIRI/i,
    }),
    isURI: createToken({
        name: 'isURI',
        pattern: /isURI/i,
    }),
    isBlank: createToken({
        name: 'isBlank',
        pattern: /isBlank/i,
    }),
    isLiteral: createToken({
        name: 'isLiteral',
        pattern: /isLiteral/i,
    }),
    isNumeric: createToken({
        name: 'isNumeric',
        pattern: /isNumeric/i,
    }),
    REGEX: createToken({
        name: 'REGEX',
        pattern: /REGEX/i,
    }),
    SUBSTR: createToken({
        name: 'SUBSTR',
        pattern: /SUBSTR/i,
    }),
    REPLACE: createToken({
        name: 'REPLACE',
        pattern: /REPLACE/i,
    }),
    EXISTS: createToken({
        name: 'EXISTS',
        pattern: /EXISTS/i,
    }),
    NOT_EXISTS: createToken({
        name: 'NOT_EXISTS',
        pattern: /NOT EXISTS/i,
    }),
    COUNT: createToken({
        name: 'COUNT',
        pattern: /COUNT/i,
    }),
    SUM: createToken({
        name: 'SUM',
        pattern: /SUM/i,
    }),
    MIN: createToken({
        name: 'MIN',
        pattern: /MIN/i,
    }),
    AVG: createToken({
        name: 'AVG',
        pattern: /AVG/i,
    }),
    SAMPLE: createToken({
        name: 'SAMPLE',
        pattern: /SAMPLE/i,
    }),
    GROUP_CONCAT: createToken({
        name: 'GROUP_CONCAT',
        pattern: /GROUP_CONCAT/i,
    }),
    SEPARATOR: createToken({
        name: 'SEPARATOR',
        pattern: /SEPARATOR/i,
    }),
    TRUE: createToken({
        name: 'TRUE',
        pattern: /TRUE/i,
    }),
    FALSE: createToken({
        name: 'FALSE',
        pattern: /FALSE/i,
    }),
    IN: createToken({
        name: 'IN',
        pattern: /IN/i,
    }),
    NOT_IN: createToken({
        name: 'NOT_IN',
        pattern: /NOT IN/i,
    }),
    MAX_LENGTH: MAX_LENGTH,
    MAX: createToken({
        name: 'MAX',
        pattern: /MAX/i,
        longer_alt: MAX_LENGTH,
    }),
};

// @ts-ignore: import types for declarations
var sparqlTokenMap = {
    IRIREF: terminals.IRIREF,
    LANGTAG: terminals.LANGTAG,
    INTEGER: terminals.INTEGER,
    DECIMAL: terminals.DECIMAL,
    DOUBLE: terminals.DOUBLE,
    INTEGER_POSITIVE: terminals.INTEGER_POSITIVE,
    DECIMAL_POSITIVE: terminals.DECIMAL_POSITIVE,
    DOUBLE_POSITIVE: terminals.DOUBLE_POSITIVE,
    INTEGER_NEGATIVE: terminals.INTEGER_NEGATIVE,
    DECIMAL_NEGATIVE: terminals.DECIMAL_NEGATIVE,
    DOUBLE_NEGATIVE: terminals.DOUBLE_NEGATIVE,
    STRING_LITERAL1: terminals.STRING_LITERAL1,
    STRING_LITERAL2: terminals.STRING_LITERAL2,
    STRING_LITERAL_LONG1: terminals.STRING_LITERAL_LONG1,
    STRING_LITERAL_LONG2: terminals.STRING_LITERAL_LONG2,
    NIL: terminals.NIL,
    ANON: terminals.ANON,
    PNAME_NS: terminals.PNAME_NS,
    PNAME_LN: terminals.PNAME_LN,
    BLANK_NODE_LABEL: terminals.BLANK_NODE_LABEL,
    VAR1: terminals.VAR1,
    VAR2: terminals.VAR2,
    PERCENT: terminals.PERCENT,
    Comment: createToken({
        name: 'Comment',
        pattern: /#[^\n]*/,
        group: 'comments',
    }),
    LCurly: createToken({ name: 'LCurly', pattern: '{' }),
    RCurly: createToken({ name: 'RCurly', pattern: '}' }),
    LParen: createToken({ name: 'LParen', pattern: '(' }),
    RParen: createToken({ name: 'RParen', pattern: ')' }),
    WhiteSpace: createToken({
        name: 'WhiteSpace',
        pattern: /\s+/,
        group: Lexer.SKIPPED,
        line_breaks: true,
    }),
    Star: createToken({
        name: 'Star',
        pattern: '*',
    }),
    Unknown: createToken({
        name: 'Unknown',
        pattern: /\w+/,
    }),
    Period: createToken({
        name: 'Period',
        pattern: '.',
    }),
    QuestionMark: createToken({
        name: 'QuestionMark',
        pattern: '?',
    }),
    Plus: createToken({
        name: 'Plus',
        pattern: '+',
    }),
    Minus: createToken({
        name: 'Minus',
        pattern: '-',
    }),
    LBracket: createToken({
        name: 'LBracket',
        pattern: '[',
    }),
    RBracket: createToken({
        name: 'RBracket',
        pattern: ']',
    }),
    Semicolon: createToken({
        name: 'Semicolon',
        pattern: ';',
    }),
    Comma: createToken({
        name: 'Comma',
        pattern: ',',
    }),
    Pipe: createToken({
        name: 'Pipe',
        pattern: '|',
    }),
    ForwardSlash: createToken({
        name: 'ForwardSlash',
        pattern: '/',
    }),
    Caret: createToken({
        name: 'Caret',
        pattern: '^',
    }),
    DoubleCaret: createToken({
        name: 'DoubleCaret',
        pattern: '^^',
    }),
    Bang: createToken({
        name: 'Bang',
        pattern: '!',
    }),
    LogicalOr: createToken({
        name: 'LogicalOr',
        pattern: '||',
    }),
    LogicalAnd: createToken({
        name: 'LogicalAnd',
        pattern: '&&',
    }),
    Equals: createToken({
        name: 'Equals',
        pattern: '=',
    }),
    NotEquals: createToken({
        name: 'NotEquals',
        pattern: '!=',
    }),
    LessThan: createToken({
        name: 'LessThan',
        pattern: '<',
    }),
    GreaterThan: createToken({
        name: 'GreaterThan',
        pattern: '>',
    }),
    LessThanEquals: createToken({
        name: 'LessThanEquals',
        pattern: '<=',
    }),
    GreaterThanEquals: createToken({
        name: 'GreaterThanEquals',
        pattern: '>=',
    }),
    SELECT: keywords.SELECT,
    CONSTRUCT: keywords.CONSTRUCT,
    DISTINCT: keywords.DISTINCT,
    START: keywords.START,
    END: keywords.END,
    VIA: keywords.VIA,
    CYCLIC: keywords.CYCLIC,
    PATHS_SHORTEST: keywords.PATHS_SHORTEST,
    PATHS_ALL: keywords.PATHS_ALL,
    PATHS: keywords.PATHS,
    AS: keywords.AS,
    WHERE: keywords.WHERE,
    A: keywords.A,
    GroupBy: keywords.GroupBy,
    OrderBy: keywords.OrderBy,
    By: keywords.By,
    BASE: keywords.BASE,
    PREFIX: keywords.PREFIX,
    DESCRIBE: keywords.DESCRIBE,
    ASK: keywords.ASK,
    FROM: keywords.FROM,
    REDUCED: keywords.REDUCED,
    NAMED: keywords.NAMED,
    HAVING: keywords.HAVING,
    ASC: keywords.ASC,
    DESC: keywords.DESC,
    OFFSET: keywords.OFFSET,
    LIMIT: keywords.LIMIT,
    VALUES: keywords.VALUES,
    LOAD: keywords.LOAD,
    SILENT: keywords.SILENT,
    INTO: keywords.INTO,
    CLEAR: keywords.CLEAR,
    DROP: keywords.DROP,
    CREATE: keywords.CREATE,
    ADD: keywords.ADD,
    TO: keywords.TO,
    MOVE: keywords.MOVE,
    COPY: keywords.COPY,
    INSERT_DATA: keywords.INSERT_DATA,
    DELETE_DATA: keywords.DELETE_DATA,
    DELETE_WHERE: keywords.DELETE_WHERE,
    WITH: keywords.WITH,
    DELETE: keywords.DELETE,
    INSERT: keywords.INSERT,
    USING: keywords.USING,
    DEFAULT: keywords.DEFAULT,
    GRAPH: keywords.GRAPH,
    ALL: keywords.ALL,
    OPTIONAL: keywords.OPTIONAL,
    SERVICE: keywords.SERVICE,
    BIND: keywords.BIND,
    UNDEF: keywords.UNDEF,
    MINUS: keywords.MINUS,
    UNION: keywords.UNION,
    FILTER: keywords.FILTER,
    STR: keywords.STR,
    LANG: keywords.LANG,
    LANGMATCHERS: keywords.LANGMATCHERS,
    DATATYPE: keywords.DATATYPE,
    BOUND: keywords.BOUND,
    IRI: keywords.IRI,
    URI: keywords.URI,
    BNODE: keywords.BNODE,
    RAND: keywords.RAND,
    ABS: keywords.ABS,
    CEIL: keywords.CEIL,
    FLOOR: keywords.FLOOR,
    ROUND: keywords.ROUND,
    CONCAT: keywords.CONCAT,
    STRLEN: keywords.STRLEN,
    UCASE: keywords.UCASE,
    LCASE: keywords.LCASE,
    ENCODE_FOR_URI: keywords.ENCODE_FOR_URI,
    CONTAINS: keywords.CONTAINS,
    STRSTARTS: keywords.STRSTARTS,
    STRENDS: keywords.STRENDS,
    STRBEFORE: keywords.STRBEFORE,
    STRAFTER: keywords.STRAFTER,
    YEAR: keywords.YEAR,
    MONTH: keywords.MONTH,
    DAY: keywords.DAY,
    HOURS: keywords.HOURS,
    MINUTES: keywords.MINUTES,
    SECONDS: keywords.SECONDS,
    TIMEZONE: keywords.TIMEZONE,
    TZ: keywords.TZ,
    NOW: keywords.NOW,
    UUID: keywords.UUID,
    STRUUID: keywords.STRUUID,
    MD5: keywords.MD5,
    SHA1: keywords.SHA1,
    SHA256: keywords.SHA256,
    SHA384: keywords.SHA384,
    SHA512: keywords.SHA512,
    COALESCE: keywords.COALESCE,
    IF: keywords.IF,
    STRLANG: keywords.STRLANG,
    STRDT: keywords.STRDT,
    sameTerm: keywords.sameTerm,
    isIRI: keywords.isIRI,
    isURI: keywords.isURI,
    isBlank: keywords.isBlank,
    isLiteral: keywords.isLiteral,
    isNumeric: keywords.isNumeric,
    REGEX: keywords.REGEX,
    SUBSTR: keywords.SUBSTR,
    REPLACE: keywords.REPLACE,
    EXISTS: keywords.EXISTS,
    NOT_EXISTS: keywords.NOT_EXISTS,
    COUNT: keywords.COUNT,
    SUM: keywords.SUM,
    MIN: keywords.MIN,
    AVG: keywords.AVG,
    SAMPLE: keywords.SAMPLE,
    GROUP_CONCAT: keywords.GROUP_CONCAT,
    SEPARATOR: keywords.SEPARATOR,
    TRUE: keywords.TRUE,
    FALSE: keywords.FALSE,
    IN: keywords.IN,
    NOT_IN: keywords.NOT_IN,
    MAX_LENGTH: keywords.MAX_LENGTH,
    MAX: keywords.MAX,
};
var baseTokens = [
    sparqlTokenMap.NIL,
    sparqlTokenMap.ANON,
    sparqlTokenMap.LCurly,
    sparqlTokenMap.RCurly,
    sparqlTokenMap.LParen,
    sparqlTokenMap.RParen,
    sparqlTokenMap.WhiteSpace,
    sparqlTokenMap.IRIREF,
    sparqlTokenMap.LANGTAG,
    sparqlTokenMap.DOUBLE,
    sparqlTokenMap.DECIMAL,
    sparqlTokenMap.INTEGER,
    sparqlTokenMap.DOUBLE_POSITIVE,
    sparqlTokenMap.DECIMAL_POSITIVE,
    sparqlTokenMap.INTEGER_POSITIVE,
    sparqlTokenMap.DOUBLE_NEGATIVE,
    sparqlTokenMap.DECIMAL_NEGATIVE,
    sparqlTokenMap.INTEGER_NEGATIVE,
    sparqlTokenMap.STRING_LITERAL1,
    sparqlTokenMap.STRING_LITERAL2,
    sparqlTokenMap.STRING_LITERAL_LONG1,
    sparqlTokenMap.STRING_LITERAL_LONG2,
    sparqlTokenMap.PNAME_NS,
    sparqlTokenMap.PNAME_LN,
    sparqlTokenMap.BLANK_NODE_LABEL,
    sparqlTokenMap.VAR1,
    sparqlTokenMap.VAR2,
    sparqlTokenMap.Comment,
    sparqlTokenMap.SELECT,
    sparqlTokenMap.CONSTRUCT,
    sparqlTokenMap.DISTINCT,
    sparqlTokenMap.Star,
    sparqlTokenMap.WHERE,
    sparqlTokenMap.GroupBy,
    sparqlTokenMap.OrderBy,
    sparqlTokenMap.By,
    sparqlTokenMap.Period,
    sparqlTokenMap.QuestionMark,
    sparqlTokenMap.Plus,
    sparqlTokenMap.Minus,
    sparqlTokenMap.LBracket,
    sparqlTokenMap.RBracket,
    sparqlTokenMap.PERCENT,
    sparqlTokenMap.BASE,
    sparqlTokenMap.PREFIX,
    sparqlTokenMap.DESCRIBE,
    sparqlTokenMap.ASK,
    sparqlTokenMap.FROM,
    sparqlTokenMap.REDUCED,
    sparqlTokenMap.NAMED,
    sparqlTokenMap.HAVING,
    sparqlTokenMap.ASC,
    sparqlTokenMap.DESC,
    sparqlTokenMap.OFFSET,
    sparqlTokenMap.LIMIT,
    sparqlTokenMap.VALUES,
    sparqlTokenMap.LOAD,
    sparqlTokenMap.SILENT,
    sparqlTokenMap.INTO,
    sparqlTokenMap.AS,
    sparqlTokenMap.CLEAR,
    sparqlTokenMap.DROP,
    sparqlTokenMap.CREATE,
    sparqlTokenMap.ADD,
    sparqlTokenMap.TO,
    sparqlTokenMap.MOVE,
    sparqlTokenMap.COPY,
    sparqlTokenMap.INSERT_DATA,
    sparqlTokenMap.DELETE_DATA,
    sparqlTokenMap.DELETE_WHERE,
    sparqlTokenMap.WITH,
    sparqlTokenMap.DELETE,
    sparqlTokenMap.INSERT,
    sparqlTokenMap.USING,
    sparqlTokenMap.DEFAULT,
    sparqlTokenMap.GRAPH,
    sparqlTokenMap.ALL,
    sparqlTokenMap.OPTIONAL,
    sparqlTokenMap.SERVICE,
    sparqlTokenMap.BIND,
    sparqlTokenMap.UNDEF,
    sparqlTokenMap.MINUS,
    sparqlTokenMap.UNION,
    sparqlTokenMap.FILTER,
    sparqlTokenMap.LANGMATCHERS,
    sparqlTokenMap.LANG,
    sparqlTokenMap.DATATYPE,
    sparqlTokenMap.BOUND,
    sparqlTokenMap.IRI,
    sparqlTokenMap.URI,
    sparqlTokenMap.BNODE,
    sparqlTokenMap.RAND,
    sparqlTokenMap.ABS,
    sparqlTokenMap.CEIL,
    sparqlTokenMap.FLOOR,
    sparqlTokenMap.ROUND,
    sparqlTokenMap.CONCAT,
    sparqlTokenMap.STRLEN,
    sparqlTokenMap.UCASE,
    sparqlTokenMap.LCASE,
    sparqlTokenMap.ENCODE_FOR_URI,
    sparqlTokenMap.CONTAINS,
    sparqlTokenMap.STRSTARTS,
    sparqlTokenMap.STRENDS,
    sparqlTokenMap.STRBEFORE,
    sparqlTokenMap.STRAFTER,
    sparqlTokenMap.YEAR,
    sparqlTokenMap.MONTH,
    sparqlTokenMap.DAY,
    sparqlTokenMap.HOURS,
    sparqlTokenMap.MINUTES,
    sparqlTokenMap.SECONDS,
    sparqlTokenMap.TIMEZONE,
    sparqlTokenMap.TZ,
    sparqlTokenMap.NOW,
    sparqlTokenMap.UUID,
    sparqlTokenMap.STRUUID,
    sparqlTokenMap.MD5,
    sparqlTokenMap.SHA1,
    sparqlTokenMap.SHA256,
    sparqlTokenMap.SHA384,
    sparqlTokenMap.SHA512,
    sparqlTokenMap.COALESCE,
    sparqlTokenMap.IF,
    sparqlTokenMap.STRLANG,
    sparqlTokenMap.STRDT,
    sparqlTokenMap.STR,
    sparqlTokenMap.sameTerm,
    sparqlTokenMap.isIRI,
    sparqlTokenMap.isURI,
    sparqlTokenMap.isBlank,
    sparqlTokenMap.isLiteral,
    sparqlTokenMap.isNumeric,
    sparqlTokenMap.REGEX,
    sparqlTokenMap.SUBSTR,
    sparqlTokenMap.REPLACE,
    sparqlTokenMap.EXISTS,
    sparqlTokenMap.NOT_EXISTS,
    sparqlTokenMap.COUNT,
    sparqlTokenMap.SUM,
    sparqlTokenMap.MIN,
    sparqlTokenMap.MAX_LENGTH,
    sparqlTokenMap.MAX,
    sparqlTokenMap.AVG,
    sparqlTokenMap.SAMPLE,
    sparqlTokenMap.GROUP_CONCAT,
    sparqlTokenMap.SEPARATOR,
    sparqlTokenMap.TRUE,
    sparqlTokenMap.FALSE,
    sparqlTokenMap.Semicolon,
    sparqlTokenMap.Comma,
    sparqlTokenMap.ForwardSlash,
    sparqlTokenMap.DoubleCaret,
    sparqlTokenMap.Caret,
    sparqlTokenMap.LogicalOr,
    sparqlTokenMap.Pipe,
    sparqlTokenMap.LogicalAnd,
    sparqlTokenMap.NotEquals,
    sparqlTokenMap.Bang,
    sparqlTokenMap.Equals,
    sparqlTokenMap.LessThanEquals,
    sparqlTokenMap.GreaterThanEquals,
    sparqlTokenMap.LessThan,
    sparqlTokenMap.GreaterThan,
    sparqlTokenMap.IN,
    sparqlTokenMap.NOT_IN,
    sparqlTokenMap.A,
    sparqlTokenMap.Unknown,
];
var pathsTokens = [
    sparqlTokenMap.START,
    sparqlTokenMap.END,
    sparqlTokenMap.VIA,
    sparqlTokenMap.CYCLIC,
    sparqlTokenMap.PATHS_SHORTEST,
    sparqlTokenMap.PATHS_ALL,
    sparqlTokenMap.PATHS,
];
var sparqlTokenTypes = baseTokens.concat(pathsTokens);

var tokens = /*#__PURE__*/Object.freeze({
    sparqlTokenMap: sparqlTokenMap,
    baseTokens: baseTokens,
    pathsTokens: pathsTokens,
    sparqlTokenTypes: sparqlTokenTypes
});

// @ts-ignore: debug logging
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // console.log(...args);
}
var BaseSparqlParser = /** @class */ (function (_super) {
    __extends(BaseSparqlParser, _super);
    function BaseSparqlParser(options, tokenVocab) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options.input || [], tokenVocab, __assign({ recoveryEnabled: true, outputCst: true }, options.config)) || this;
        _this.tokenize = function (document) {
            return _this.lexer.tokenize(document).tokens;
        };
        _this.parse = function (document) {
            _this.input = _this.lexer.tokenize(document).tokens;
            var cst = _this.SparqlDoc();
            var errors = _this.errors;
            return {
                errors: errors,
                cst: cst,
            };
        };
        // Grammar Rules
        _this.SparqlDoc = _this.RULE('SparqlDoc', function () {
            log('SparqlDoc');
            _this.SUBRULE(_this.Prologue);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.QueryUnit); } },
                { ALT: function () { return _this.SUBRULE(_this.UpdateUnit); } },
            ]);
        });
        _this.QueryUnit = _this.RULE('QueryUnit', function () {
            log('QueryUnit');
            _this.SUBRULE(_this.Query);
        });
        _this.Query = _this.RULE('Query', function () {
            log('Query');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SelectQuery); } },
                { ALT: function () { return _this.SUBRULE(_this.ConstructQuery); } },
                { ALT: function () { return _this.SUBRULE(_this.DescribeQuery); } },
                { ALT: function () { return _this.SUBRULE(_this.AskQuery); } },
            ]);
            _this.SUBRULE(_this.ValuesClause);
        });
        _this.Constant = _this.RULE('Constant', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
            ]);
        });
        _this.MaxLength = _this.RULE('MaxLength', function () {
            _this.CONSUME(sparqlTokenMap.MAX_LENGTH);
            _this.CONSUME(sparqlTokenMap.INTEGER);
        });
        _this.UpdateUnit = _this.RULE('UpdateUnit', function () {
            log('UpdateUnit');
            _this.SUBRULE(_this.Update);
        });
        _this.Prologue = _this.RULE('Prologue', function () {
            log('Prologue');
            _this.MANY(function () {
                return _this.OR([
                    { ALT: function () { return _this.SUBRULE(_this.BaseDecl); } },
                    { ALT: function () { return _this.SUBRULE(_this.PrefixDecl); } },
                ]);
            });
        });
        _this.BaseDecl = _this.RULE('BaseDecl', function () {
            log('BaseDecl');
            _this.CONSUME(sparqlTokenMap.BASE);
            _this.CONSUME(sparqlTokenMap.IRIREF);
        });
        _this.PrefixDecl = _this.RULE('PrefixDecl', function () {
            log('PrefixDecl');
            _this.CONSUME(sparqlTokenMap.PREFIX);
            _this.CONSUME(sparqlTokenMap.PNAME_NS);
            _this.CONSUME(sparqlTokenMap.IRIREF);
        });
        _this.SelectQuery = _this.RULE('SelectQuery', function () {
            log('SelectQuery');
            _this.SUBRULE(_this.SelectClause);
            _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
            _this.SUBRULE(_this.WhereClause);
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.SubSelect = _this.RULE('SubSelect', function () {
            log('SubSelect');
            _this.SUBRULE(_this.SelectClause);
            _this.SUBRULE(_this.WhereClause);
            _this.SUBRULE(_this.SolutionModifier);
            _this.SUBRULE(_this.ValuesClause);
        });
        _this.SelectClause = _this.RULE('SelectClause', function () {
            log('SelectClause');
            _this.CONSUME(sparqlTokenMap.SELECT);
            _this.OPTION(function () {
                return _this.OR([
                    { ALT: function () { return _this.CONSUME(sparqlTokenMap.DISTINCT); } },
                    { ALT: function () { return _this.CONSUME(sparqlTokenMap.REDUCED); } },
                ]);
            });
            _this.OR1([
                {
                    ALT: function () {
                        _this.AT_LEAST_ONE(function () {
                            return _this.OR2([
                                { ALT: function () { return _this.SUBRULE(_this.Var); } },
                                {
                                    ALT: function () {
                                        _this.CONSUME(sparqlTokenMap.LParen);
                                        _this.SUBRULE(_this.Expression);
                                        _this.CONSUME(sparqlTokenMap.AS);
                                        _this.SUBRULE1(_this.Var);
                                        _this.CONSUME(sparqlTokenMap.RParen);
                                    },
                                },
                            ]);
                        });
                    },
                },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.Star); } },
            ]);
        });
        _this.ConstructQuery = _this.RULE('ConstructQuery', function () {
            _this.CONSUME(sparqlTokenMap.CONSTRUCT);
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.ConstructTemplate);
                        _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
                        _this.SUBRULE(_this.WhereClause);
                    },
                },
                {
                    ALT: function () {
                        _this.MANY1(function () { return _this.SUBRULE1(_this.DatasetClause); });
                        _this.CONSUME(sparqlTokenMap.WHERE);
                        _this.CONSUME(sparqlTokenMap.LCurly);
                        _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
                        _this.CONSUME(sparqlTokenMap.RCurly);
                    },
                },
            ]);
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.DescribeQuery = _this.RULE('DescribeQuery', function () {
            log('DescribeQuery');
            _this.CONSUME(sparqlTokenMap.DESCRIBE);
            _this.OR([
                {
                    ALT: function () {
                        _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.VarOrIri); });
                    },
                },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.Star); } },
            ]);
            _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
            _this.OPTION(function () { return _this.SUBRULE(_this.WhereClause); });
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.AskQuery = _this.RULE('AskQuery', function () {
            log('AskQuery');
            _this.CONSUME(sparqlTokenMap.ASK);
            _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
            _this.SUBRULE(_this.WhereClause);
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.DatasetClause = _this.RULE('DatasetClause', function () {
            log('DatasetClause');
            _this.CONSUME(sparqlTokenMap.FROM);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.DefaultGraphClause); } },
                { ALT: function () { return _this.SUBRULE(_this.NamedGraphClause); } },
            ]);
        });
        _this.DefaultGraphClause = _this.RULE('DefaultGraphClause', function () {
            log('DefaultGraphClause');
            _this.SUBRULE(_this.SourceSelector);
        });
        _this.NamedGraphClause = _this.RULE('NamedGraphClause', function () {
            log('NamedGraphClause');
            _this.CONSUME(sparqlTokenMap.NAMED);
            _this.SUBRULE(_this.SourceSelector);
        });
        _this.SourceSelector = _this.RULE('SourceSelector', function () {
            log('SourceSelector');
            _this.SUBRULE(_this.iri);
        });
        _this.WhereClause = _this.RULE('WhereClause', function () {
            log('WhereClause');
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.WHERE); });
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.SolutionModifier = _this.RULE('SolutionModifier', function () {
            log('SolutionModifier');
            _this.OPTION(function () { return _this.SUBRULE(_this.GroupClause); });
            _this.OPTION1(function () { return _this.SUBRULE(_this.HavingClause); });
            _this.OPTION2(function () { return _this.SUBRULE(_this.OrderClause); });
            _this.OPTION3(function () { return _this.SUBRULE(_this.LimitOffsetClause); });
        });
        _this.GroupClause = _this.RULE('GroupClause', function () {
            log('GroupClause');
            _this.CONSUME(sparqlTokenMap.GroupBy);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GroupCondition); });
        });
        _this.GroupCondition = _this.RULE('GroupCondition', function () {
            log('GroupCondition');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall); } },
                { ALT: function () { return _this.SUBRULE(_this.FunctionCall); } },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.OPTION(function () {
                            _this.CONSUME(sparqlTokenMap.AS);
                            _this.SUBRULE(_this.Var);
                        });
                        _this.CONSUME(sparqlTokenMap.RParen);
                    },
                },
                { ALT: function () { return _this.SUBRULE1(_this.Var); } },
            ]);
        });
        _this.HavingClause = _this.RULE('HavingClause', function () {
            log('HavingClause');
            _this.CONSUME(sparqlTokenMap.HAVING);
            _this.SUBRULE(_this.HavingCondition);
        });
        _this.HavingCondition = _this.RULE('HavingCondition', function () {
            log('HavingCondition');
            _this.SUBRULE(_this.Constraint);
        });
        _this.OrderClause = _this.RULE('OrderClause', function () {
            log('OrderClause');
            _this.CONSUME(sparqlTokenMap.OrderBy);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.OrderCondition); });
        });
        _this.OrderCondition = _this.RULE('OrderCondition', function () {
            log('OrderCondition');
            _this.OR([
                {
                    ALT: function () {
                        _this.OR1([
                            { ALT: function () { return _this.CONSUME(sparqlTokenMap.ASC); } },
                            { ALT: function () { return _this.CONSUME(sparqlTokenMap.DESC); } },
                        ]);
                        _this.SUBRULE(_this.BrackettedExpression);
                    },
                },
                { ALT: function () { return _this.SUBRULE(_this.Constraint); } },
                { ALT: function () { return _this.SUBRULE(_this.Var); } },
            ]);
        });
        _this.LimitOffsetClause = _this.RULE('LimitOffsetClause', function () {
            log('LimitOffsetClause');
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.LimitClause);
                        _this.OPTION(function () { return _this.SUBRULE(_this.OffsetClause); });
                    },
                },
                {
                    ALT: function () {
                        _this.SUBRULE1(_this.OffsetClause);
                        _this.OPTION1(function () { return _this.SUBRULE1(_this.LimitClause); });
                    },
                },
            ]);
        });
        _this.OffsetClause = _this.RULE('OffsetClause', function () {
            log('OffsetClause');
            _this.CONSUME(sparqlTokenMap.OFFSET);
            _this.CONSUME(sparqlTokenMap.INTEGER);
        });
        _this.LimitClause = _this.RULE('LimitClause', function () {
            log('LimitClause');
            _this.CONSUME(sparqlTokenMap.LIMIT);
            _this.CONSUME(sparqlTokenMap.INTEGER);
        });
        _this.ValuesClause = _this.RULE('ValuesClause', function () {
            log('ValuesClause');
            _this.OPTION(function () {
                _this.CONSUME(sparqlTokenMap.VALUES);
                _this.SUBRULE(_this.DataBlock);
            });
        });
        _this.Update = _this.RULE('Update', function () {
            log('Update');
            _this.SUBRULE(_this.Prologue);
            _this.OPTION(function () {
                _this.SUBRULE(_this.Update1);
                _this.OPTION1(function () {
                    _this.CONSUME(sparqlTokenMap.Semicolon);
                    _this.SUBRULE(_this.Update);
                });
            });
        });
        _this.Update1 = _this.RULE('Update1', function () {
            log('Update1');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Load); } },
                { ALT: function () { return _this.SUBRULE(_this.Clear); } },
                { ALT: function () { return _this.SUBRULE(_this.Drop); } },
                { ALT: function () { return _this.SUBRULE(_this.Add); } },
                { ALT: function () { return _this.SUBRULE(_this.Move); } },
                { ALT: function () { return _this.SUBRULE(_this.Copy); } },
                { ALT: function () { return _this.SUBRULE(_this.Create); } },
                { ALT: function () { return _this.SUBRULE(_this.InsertData); } },
                { ALT: function () { return _this.SUBRULE(_this.DeleteData); } },
                { ALT: function () { return _this.SUBRULE(_this.DeleteWhere); } },
                { ALT: function () { return _this.SUBRULE(_this.Modify); } },
            ]);
        });
        _this.Load = _this.RULE('Load', function () {
            log('Load');
            _this.CONSUME(sparqlTokenMap.LOAD);
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.SILENT); });
            _this.SUBRULE(_this.iri);
            _this.OPTION1(function () {
                _this.CONSUME(sparqlTokenMap.INTO);
                _this.SUBRULE(_this.GraphRef);
            });
        });
        _this.Clear = _this.RULE('Clear', function () {
            log('Clear');
            _this.CONSUME(sparqlTokenMap.CLEAR);
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Drop = _this.RULE('Drop', function () {
            log('Drop');
            _this.CONSUME(sparqlTokenMap.DROP);
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Create = _this.RULE('Create', function () {
            log('Create');
            _this.CONSUME(sparqlTokenMap.CREATE);
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Add = _this.RULE('Add', function () {
            log('Add');
            _this.CONSUME(sparqlTokenMap.ADD);
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(sparqlTokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.Move = _this.RULE('Move', function () {
            log('Move');
            _this.CONSUME(sparqlTokenMap.MOVE);
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(sparqlTokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.Copy = _this.RULE('Copy', function () {
            log('Copy');
            _this.CONSUME(sparqlTokenMap.COPY);
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(sparqlTokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.InsertData = _this.RULE('InsertData', function () {
            log('InsertData');
            _this.CONSUME(sparqlTokenMap.INSERT_DATA);
            _this.SUBRULE(_this.QuadData);
        });
        _this.DeleteData = _this.RULE('DeleteData', function () {
            log('DeleteData');
            _this.CONSUME(sparqlTokenMap.DELETE_DATA);
            _this.SUBRULE(_this.QuadData);
        });
        _this.DeleteWhere = _this.RULE('DeleteWhere', function () {
            log('DeleteWhere');
            _this.CONSUME(sparqlTokenMap.DELETE_WHERE);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.Modify = _this.RULE('Modify', function () {
            log('Modify');
            _this.OPTION(function () {
                _this.CONSUME(sparqlTokenMap.WITH);
                _this.SUBRULE(_this.iri);
            });
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.DeleteClause);
                        _this.OPTION1(function () { return _this.SUBRULE(_this.InsertClause); });
                    },
                },
                { ALT: function () { return _this.SUBRULE1(_this.InsertClause); } },
            ]);
            _this.MANY(function () { return _this.SUBRULE(_this.UsingClause); });
            _this.CONSUME(sparqlTokenMap.WHERE);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.DeleteClause = _this.RULE('DeleteClause', function () {
            log('DeleteClause');
            _this.CONSUME(sparqlTokenMap.DELETE);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.InsertClause = _this.RULE('InsertClause', function () {
            log('InsertClause');
            _this.CONSUME(sparqlTokenMap.INSERT);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.UsingClause = _this.RULE('UsingClause', function () {
            log('UsingClause');
            _this.CONSUME(sparqlTokenMap.USING);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.NAMED);
                        _this.SUBRULE1(_this.iri);
                    },
                },
            ]);
        });
        _this.GraphOrDefault = _this.RULE('GraphOrDefault', function () {
            log('GraphOrDefault');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.DEFAULT); } },
                {
                    ALT: function () {
                        _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.GRAPH); });
                        _this.SUBRULE(_this.iri);
                    },
                },
            ]);
        });
        _this.GraphRef = _this.RULE('GraphRef', function () {
            log('GraphRef');
            _this.CONSUME(sparqlTokenMap.GRAPH);
            _this.SUBRULE(_this.iri);
        });
        _this.GraphRefAll = _this.RULE('GraphRefAll', function () {
            log('GraphRefAll');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.GraphRef); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.DEFAULT); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.NAMED); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.ALL); } },
            ]);
        });
        _this.QuadPattern = _this.RULE('QuadPattern', function () {
            log('QuadPattern');
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.SUBRULE(_this.Quads);
            _this.CONSUME(sparqlTokenMap.RCurly);
        });
        _this.QuadData = _this.RULE('QuadData', function () {
            log('QuadData');
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.SUBRULE(_this.Quads);
            _this.CONSUME(sparqlTokenMap.RCurly);
        });
        _this.Quads = _this.RULE('Quads', function () {
            log('Quads');
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            _this.MANY(function () {
                _this.SUBRULE(_this.QuadsNotTriples);
                _this.OPTION1(function () { return _this.CONSUME(sparqlTokenMap.Period); });
                _this.OPTION2(function () { return _this.SUBRULE1(_this.TriplesTemplate); });
            });
        });
        _this.QuadsNotTriples = _this.RULE('QuadsNotTriples', function () {
            log('QuadsNotTriples');
            _this.CONSUME(sparqlTokenMap.GRAPH);
            _this.SUBRULE(_this.VarOrIri);
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            _this.CONSUME(sparqlTokenMap.RCurly);
        });
        _this.TriplesTemplate = _this.RULE('TriplesTemplate', function () {
            log('TriplesTemplate');
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(sparqlTokenMap.Period);
                _this.OPTION1(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            });
        });
        _this.GroupGraphPattern = _this.RULE('GroupGraphPattern', function () {
            log('GroupGraphPattern');
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SubSelect); } },
                { ALT: function () { return _this.SUBRULE(_this.GroupGraphPatternSub); } },
            ]);
            _this.CONSUME(sparqlTokenMap.RCurly);
        });
        _this.GroupGraphPatternSub = _this.RULE('GroupGraphPatternSub', function () {
            log('GroupGraphPatternSub');
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesBlock); });
            _this.MANY(function () {
                _this.SUBRULE(_this.GraphPatternNotTriples);
                _this.OPTION1(function () { return _this.CONSUME(sparqlTokenMap.Period); });
                _this.OPTION2(function () { return _this.SUBRULE1(_this.TriplesBlock); });
            });
        });
        _this.TriplesBlock = _this.RULE('TriplesBlock', function () {
            log('TriplesBlock');
            _this.SUBRULE(_this.TriplesSameSubjectPath);
            _this.OPTION(function () {
                _this.CONSUME(sparqlTokenMap.Period);
                _this.OPTION1(function () { return _this.SUBRULE(_this.TriplesBlock); });
            });
        });
        _this.GraphPatternNotTriples = _this.RULE('GraphPatternNotTriples', function () {
            log('GraphPatternNotTriples');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.GroupOrUnionGraphPattern); } },
                { ALT: function () { return _this.SUBRULE(_this.OptionalGraphPattern); } },
                { ALT: function () { return _this.SUBRULE(_this.MinusGraphPattern); } },
                { ALT: function () { return _this.SUBRULE(_this.GraphGraphPattern); } },
                { ALT: function () { return _this.SUBRULE(_this.ServiceGraphPattern); } },
                { ALT: function () { return _this.SUBRULE(_this.Filter); } },
                { ALT: function () { return _this.SUBRULE(_this.Bind); } },
                { ALT: function () { return _this.SUBRULE(_this.InlineData); } },
            ]);
        });
        _this.OptionalGraphPattern = _this.RULE('OptionalGraphPattern', function () {
            log('OptionalGraphPattern');
            _this.CONSUME(sparqlTokenMap.OPTIONAL);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.GraphGraphPattern = _this.RULE('GraphGraphPattern', function () {
            log('GraphGraphPattern');
            _this.CONSUME(sparqlTokenMap.GRAPH);
            _this.SUBRULE(_this.VarOrIri);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.ServiceGraphPattern = _this.RULE('ServiceGraphPattern', function () {
            log('ServiceGraphPattern');
            _this.CONSUME(sparqlTokenMap.SERVICE);
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.SILENT); });
            _this.SUBRULE(_this.VarOrIri);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.Bind = _this.RULE('Bind', function () {
            log('Bind');
            _this.CONSUME(sparqlTokenMap.BIND);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.AS);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.InlineData = _this.RULE('InlineData', function () {
            log('InlineData');
            _this.CONSUME(sparqlTokenMap.VALUES);
            _this.SUBRULE(_this.DataBlock);
        });
        _this.DataBlock = _this.RULE('DataBlock', function () {
            log('DataBlock');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.InlineDataOneVar); } },
                { ALT: function () { return _this.SUBRULE(_this.InlineDataFull); } },
            ]);
        });
        _this.InlineDataOneVar = _this.RULE('InlineDataOneVar', function () {
            log('InlineDataOneVar');
            _this.SUBRULE(_this.Var);
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.MANY(function () { return _this.SUBRULE(_this.DataBlockValue); });
            _this.CONSUME(sparqlTokenMap.RCurly);
        });
        _this.InlineDataFull = _this.RULE('InlineDataFull', function () {
            log('InlineDataFull');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.LParen);
                        _this.MANY(function () { return _this.SUBRULE(_this.Var); });
                        _this.CONSUME(sparqlTokenMap.RParen);
                    },
                },
            ]);
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.MANY1(function () {
                return _this.OR1([
                    {
                        ALT: function () {
                            _this.CONSUME1(sparqlTokenMap.LParen);
                            _this.MANY2(function () { return _this.SUBRULE(_this.DataBlockValue); });
                            _this.CONSUME1(sparqlTokenMap.RParen);
                        },
                    },
                    { ALT: function () { return _this.CONSUME1(sparqlTokenMap.NIL); } },
                ]);
            });
            _this.CONSUME(sparqlTokenMap.RCurly);
        });
        _this.DataBlockValue = _this.RULE('DataBlockValue', function () {
            log('DataBlockValue');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.UNDEF); } },
            ]);
        });
        _this.MinusGraphPattern = _this.RULE('MinusGraphPattern', function () {
            log('MinusGraphPattern');
            _this.CONSUME(sparqlTokenMap.MINUS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.GroupOrUnionGraphPattern = _this.RULE('GroupOrUnionGraphPattern', function () {
            log('GroupOrUnionGraphPattern');
            _this.SUBRULE(_this.GroupGraphPattern);
            _this.MANY(function () {
                _this.CONSUME(sparqlTokenMap.UNION);
                _this.SUBRULE1(_this.GroupGraphPattern);
            });
        });
        _this.Filter = _this.RULE('Filter', function () {
            log('Filter');
            _this.CONSUME(sparqlTokenMap.FILTER);
            _this.SUBRULE(_this.Constraint);
        });
        _this.Constraint = _this.RULE('Constraint', function () {
            log('Constraint');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.BrackettedExpression); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall); } },
                { ALT: function () { return _this.SUBRULE(_this.FunctionCall); } },
            ]);
        });
        _this.FunctionCall = _this.RULE('FunctionCall', function () {
            log('FunctionCall');
            _this.SUBRULE(_this.iri);
            _this.SUBRULE(_this.ArgList);
        });
        _this.ArgList = _this.RULE('ArgList', function () {
            log('ArgList');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.LParen);
                        _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.DISTINCT); });
                        _this.SUBRULE(_this.Expression);
                        _this.MANY(function () {
                            _this.CONSUME(sparqlTokenMap.Comma);
                            _this.SUBRULE1(_this.Expression);
                        });
                        _this.CONSUME(sparqlTokenMap.RParen);
                    },
                },
            ]);
        });
        _this.ExpressionList = _this.RULE('ExpressionList', function () {
            log('ExpressionList');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.MANY(function () {
                            _this.CONSUME(sparqlTokenMap.Comma);
                            _this.SUBRULE1(_this.Expression);
                        });
                        _this.CONSUME(sparqlTokenMap.RParen);
                    },
                },
            ]);
        });
        _this.ConstructTemplate = _this.RULE('ConstructTemplate', function () {
            log('ConstructTemplate');
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.ConstructTriples); });
            _this.CONSUME(sparqlTokenMap.RCurly);
        });
        _this.ConstructTriples = _this.RULE('ConstructTriples', function () {
            log('ConstructTriples');
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(sparqlTokenMap.Period);
                _this.OPTION1(function () { return _this.SUBRULE(_this.ConstructTriples); });
            });
        });
        _this.TriplesSameSubject = _this.RULE('TriplesSameSubject', function () {
            log('TriplesSameSubject');
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.VarOrTerm);
                        _this.SUBRULE(_this.PropertyListNotEmpty);
                    },
                },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.TriplesNode);
                        _this.SUBRULE(_this.PropertyList);
                    },
                },
            ]);
        });
        _this.PropertyList = _this.RULE('PropertyList', function () {
            log('PropertyList');
            _this.OPTION(function () { return _this.SUBRULE(_this.PropertyListNotEmpty); });
        });
        _this.PropertyListNotEmpty = _this.RULE('PropertyListNotEmpty', function () {
            log('PropertyListNotEmpty');
            _this.SUBRULE(_this.Verb);
            _this.SUBRULE(_this.ObjectList);
            _this.MANY(function () {
                _this.CONSUME(sparqlTokenMap.Semicolon);
                _this.OPTION(function () {
                    _this.SUBRULE1(_this.Verb);
                    _this.SUBRULE1(_this.ObjectList);
                });
            });
        });
        _this.Verb = _this.RULE('Verb', function () {
            log('Verb');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.VarOrIri); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.A); } },
            ]);
        });
        _this.ObjectList = _this.RULE('ObjectList', function () {
            log('ObjectList');
            _this.AT_LEAST_ONE_SEP({
                SEP: sparqlTokenMap.Comma,
                DEF: function () { return _this.SUBRULE(_this.Object); },
            });
        });
        _this.Object = _this.RULE('Object', function () {
            log('Object');
            _this.SUBRULE(_this.GraphNode);
        });
        _this.TriplesSameSubjectPath = _this.RULE('TriplesSameSubjectPath', function () {
            log('TriplesSameSubjectPath');
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.VarOrTerm);
                        _this.SUBRULE(_this.PropertyListPathNotEmpty);
                    },
                },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.TriplesNodePath);
                        _this.SUBRULE(_this.PropertyListPath);
                    },
                },
            ]);
        });
        _this.PropertyListPath = _this.RULE('PropertyListPath', function () {
            log('PropertyListPath');
            _this.OPTION(function () { return _this.SUBRULE(_this.PropertyListPathNotEmpty); });
        });
        _this.PropertyListPathNotEmpty = _this.RULE('PropertyListPathNotEmpty', function () {
            log('PropertyListPathNotEmpty');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.VerbPath); } },
                { ALT: function () { return _this.SUBRULE(_this.VerbSimple); } },
            ]);
            _this.SUBRULE(_this.ObjectListPath);
            _this.MANY(function () {
                _this.CONSUME(sparqlTokenMap.Semicolon);
                _this.OPTION(function () {
                    _this.OR1([
                        { ALT: function () { return _this.SUBRULE1(_this.VerbPath); } },
                        { ALT: function () { return _this.SUBRULE1(_this.VerbSimple); } },
                    ]);
                    _this.SUBRULE1(_this.ObjectListPath);
                });
            });
        });
        _this.VerbPath = _this.RULE('VerbPath', function () {
            log('VerbPath');
            _this.SUBRULE(_this.Path);
        });
        _this.VerbSimple = _this.RULE('VerbSimple', function () {
            log('VerbSimple');
            _this.SUBRULE(_this.Var);
        });
        _this.ObjectListPath = _this.RULE('ObjectListPath', function () {
            log('ObjectListPath');
            _this.AT_LEAST_ONE_SEP({
                SEP: sparqlTokenMap.Comma,
                DEF: function () { return _this.SUBRULE(_this.ObjectPath); },
            });
        });
        _this.ObjectPath = _this.RULE('ObjectPath', function () {
            log('ObjectPath');
            _this.SUBRULE(_this.GraphNodePath);
        });
        _this.Path = _this.RULE('Path', function () {
            log('Path');
            _this.SUBRULE(_this.PathAlternative);
        });
        _this.PathAlternative = _this.RULE('PathAlternative', function () {
            log('PathAlternative');
            _this.AT_LEAST_ONE_SEP({
                SEP: sparqlTokenMap.Pipe,
                DEF: function () { return _this.SUBRULE(_this.PathSequence); },
            });
        });
        _this.PathSequence = _this.RULE('PathSequence', function () {
            log('PathSequence');
            _this.AT_LEAST_ONE_SEP({
                SEP: sparqlTokenMap.ForwardSlash,
                DEF: function () { return _this.SUBRULE(_this.PathEltOrInverse); },
            });
        });
        _this.PathElt = _this.RULE('PathElt', function () {
            log('PathElt');
            _this.SUBRULE(_this.PathPrimary);
            _this.OPTION(function () { return _this.SUBRULE(_this.PathMod); });
        });
        _this.PathEltOrInverse = _this.RULE('PathEltOrInverse', function () {
            log('PathEltOrInverse');
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.Caret); });
            _this.SUBRULE(_this.PathElt);
        });
        _this.PathMod = _this.RULE('PathMod', function () {
            log('PathMod');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.QuestionMark); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.Star); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.Plus); } },
            ]);
        });
        _this.PathPrimary = _this.RULE('PathPrimary', function () {
            log('PathPrimary');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.A); } },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.Bang);
                        _this.SUBRULE(_this.PathNegatedPropertySet);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.LParen);
                        _this.SUBRULE(_this.Path);
                        _this.CONSUME(sparqlTokenMap.RParen);
                    },
                },
            ]);
        });
        _this.PathNegatedPropertySet = _this.RULE('PathNegatedPropertySet', function () {
            log('PathNegatedPropertySet');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.PathOneInPropertySet); } },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.LParen);
                        _this.MANY_SEP({
                            SEP: sparqlTokenMap.Pipe,
                            DEF: function () { return _this.SUBRULE1(_this.PathOneInPropertySet); },
                        });
                        _this.CONSUME(sparqlTokenMap.RParen);
                    },
                },
            ]);
        });
        _this.PathOneInPropertySet = _this.RULE('PathOneInPropertySet', function () {
            log('PathOneInPropertySet');
            _this.OPTION(function () { return _this.CONSUME(sparqlTokenMap.Caret); });
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.A); } },
            ]);
        });
        _this.Integer = _this.RULE('Integer', function () {
            log('Integer');
            _this.CONSUME(sparqlTokenMap.INTEGER);
        });
        _this.TriplesNode = _this.RULE('TriplesNode', function () {
            log('TriplesNode');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Collection); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNodePropertyList); } },
            ]);
        });
        _this.BlankNodePropertyList = _this.RULE('BlankNodePropertyList', function () {
            log('BlankNodePropertyList');
            _this.CONSUME(sparqlTokenMap.LBracket);
            _this.SUBRULE(_this.PropertyListNotEmpty);
            _this.CONSUME(sparqlTokenMap.RBracket);
        });
        _this.TriplesNodePath = _this.RULE('TriplesNodePath', function () {
            log('TriplesNodePath');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.CollectionPath); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNodePropertyListPath); } },
            ]);
        });
        _this.BlankNodePropertyListPath = _this.RULE('BlankNodePropertyListPath', function () {
            log('BlankNodePropertyListPath');
            _this.CONSUME(sparqlTokenMap.LBracket);
            _this.SUBRULE(_this.PropertyListPathNotEmpty);
            _this.CONSUME(sparqlTokenMap.RBracket);
        });
        _this.Collection = _this.RULE('Collection', function () {
            log('Collection');
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNode); });
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.CollectionPath = _this.RULE('CollectionPath', function () {
            log('CollectionPath');
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNodePath); });
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.GraphNode = _this.RULE('GraphNode', function () {
            log('GraphNode');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.VarOrTerm); } },
                { ALT: function () { return _this.SUBRULE(_this.TriplesNode); } },
            ]);
        });
        _this.GraphNodePath = _this.RULE('GraphNodePath', function () {
            log('GraphNodePath');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.VarOrTerm); } },
                { ALT: function () { return _this.SUBRULE(_this.TriplesNodePath); } },
            ]);
        });
        _this.VarOrTerm = _this.RULE('VarOrTerm', function () {
            log('VarOrTerm');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Var); } },
                { ALT: function () { return _this.SUBRULE(_this.GraphTerm); } },
            ]);
        });
        _this.VarOrIri = _this.RULE('VarOrIri', function () {
            log('VarOrIri');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Var); } },
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
            ]);
        });
        _this.Var = _this.RULE('Var', function () {
            log('Var');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.VAR1); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.VAR2); } },
            ]);
        });
        _this.GraphTerm = _this.RULE('GraphTerm', function () {
            log('GraphTerm');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNode); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.NIL); } },
            ]);
        });
        _this.Expression = _this.RULE('Expression', function () {
            log('Expression');
            _this.SUBRULE(_this.ConditionalOrExpression);
        });
        _this.ConditionalOrExpression = _this.RULE('ConditionalOrExpression', function () {
            log('ConditionalOrExpression');
            _this.AT_LEAST_ONE_SEP({
                SEP: sparqlTokenMap.LogicalOr,
                DEF: function () { return _this.SUBRULE(_this.ConditionalAndExpression); },
            });
        });
        _this.ConditionalAndExpression = _this.RULE('ConditionalAndExpression', function () {
            log('ConditionalAndExpression');
            _this.AT_LEAST_ONE_SEP({
                SEP: sparqlTokenMap.LogicalAnd,
                DEF: function () { return _this.SUBRULE(_this.ValueLogical); },
            });
        });
        _this.ValueLogical = _this.RULE('ValueLogical', function () {
            log('ValueLogical');
            _this.SUBRULE(_this.RelationalExpression);
        });
        _this.RelationalExpression = _this.RULE('RelationalExpression', function () {
            log('RelationalExpression');
            _this.SUBRULE(_this.NumericExpression);
            _this.OPTION(function () {
                return _this.OR([
                    {
                        ALT: function () {
                            _this.OR1([
                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.Equals); } },
                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.NotEquals); } },
                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.LessThan); } },
                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.GreaterThan); } },
                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.LessThanEquals); } },
                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.GreaterThanEquals); } },
                            ]);
                            _this.SUBRULE1(_this.NumericExpression);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(sparqlTokenMap.IN);
                            _this.SUBRULE(_this.ExpressionList);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(sparqlTokenMap.NOT_IN);
                            _this.SUBRULE1(_this.ExpressionList);
                        },
                    },
                ]);
            });
        });
        _this.NumericExpression = _this.RULE('NumericExpression', function () {
            log('NumericExpression');
            _this.SUBRULE(_this.AdditiveExpression);
        });
        _this.AdditiveExpression = _this.RULE('AdditiveExpression', function () {
            log('AdditiveExpression');
            _this.SUBRULE(_this.MultiplicativeExpression);
            _this.MANY(function () {
                return _this.OR([
                    {
                        ALT: function () {
                            _this.OR1([
                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.Plus); } },
                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.Minus); } },
                            ]);
                            _this.SUBRULE1(_this.MultiplicativeExpression);
                        },
                    },
                    {
                        ALT: function () {
                            _this.OR2([
                                { ALT: function () { return _this.SUBRULE(_this.NumericLiteralPositive); } },
                                { ALT: function () { return _this.SUBRULE(_this.NumericLiteralNegative); } },
                            ]);
                            _this.MANY1(function () {
                                return _this.OR3([
                                    {
                                        ALT: function () {
                                            _this.OR4([
                                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.Star); } },
                                                { ALT: function () { return _this.CONSUME(sparqlTokenMap.ForwardSlash); } },
                                            ]);
                                            _this.SUBRULE1(_this.UnaryExpression);
                                        },
                                    },
                                ]);
                            });
                        },
                    },
                ]);
            });
        });
        _this.MultiplicativeExpression = _this.RULE('MultiplicativeExpression', function () {
            log('MultiplicativeExpression');
            _this.SUBRULE(_this.UnaryExpression);
            _this.MANY(function () {
                return _this.OR([
                    {
                        ALT: function () {
                            _this.CONSUME(sparqlTokenMap.Star);
                            _this.SUBRULE1(_this.UnaryExpression);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(sparqlTokenMap.ForwardSlash);
                            _this.SUBRULE2(_this.UnaryExpression);
                        },
                    },
                ]);
            });
        });
        _this.UnaryExpression = _this.RULE('UnaryExpression', function () {
            log('UnaryExpression');
            _this.OR([
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.Bang);
                        _this.SUBRULE(_this.PrimaryExpression);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.Plus);
                        _this.SUBRULE1(_this.PrimaryExpression);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.Minus);
                        _this.SUBRULE2(_this.PrimaryExpression);
                    },
                },
                { ALT: function () { return _this.SUBRULE3(_this.PrimaryExpression); } },
            ]);
        });
        _this.PrimaryExpression = _this.RULE('PrimaryExpression', function () {
            log('PrimaryExpression');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.BrackettedExpression); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall); } },
                { ALT: function () { return _this.SUBRULE(_this.iriOrFunction); } },
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.Var); } },
            ]);
        });
        _this.BrackettedExpression = _this.RULE('BrackettedExpression', function () {
            log('BrackettedExpression');
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_STR = _this.RULE('BuiltInCall_STR', function () {
            log('BuiltInCall_STR');
            _this.CONSUME(sparqlTokenMap.STR);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_LANG = _this.RULE('BuiltInCall_LANG', function () {
            log('BuiltInCall_LANG');
            _this.CONSUME(sparqlTokenMap.LANG);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_LANGMATCHERS = _this.RULE('BuiltInCall_LANGMATCHERS', function () {
            log('BuiltInCall_LANGMATCHERS');
            _this.CONSUME(sparqlTokenMap.LANGMATCHERS);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_DATATYPE = _this.RULE('BuiltInCall_DATATYPE', function () {
            log('BuiltInCall_DATATYPE');
            _this.CONSUME(sparqlTokenMap.DATATYPE);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_BOUND = _this.RULE('BuiltInCall_BOUND', function () {
            log('BuiltInCall_BOUND');
            _this.CONSUME(sparqlTokenMap.BOUND);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_IRI = _this.RULE('BuiltInCall_IRI', function () {
            log('BuiltInCall_IRI');
            _this.CONSUME(sparqlTokenMap.IRI);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_URI = _this.RULE('BuiltInCall_URI', function () {
            log('BuiltInCall_URI');
            _this.CONSUME(sparqlTokenMap.URI);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_BNODE = _this.RULE('BuiltInCall_BNODE', function () {
            log('BuiltInCall_BNODE');
            _this.CONSUME(sparqlTokenMap.BNODE);
            _this.OR([
                {
                    ALT: function () {
                        _this.CONSUME(sparqlTokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.CONSUME(sparqlTokenMap.RParen);
                    },
                },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.NIL); } },
            ]);
        });
        _this.BuiltInCall_RAND = _this.RULE('BuiltInCall_RAND', function () {
            log('BuiltInCall_RAND');
            _this.CONSUME(sparqlTokenMap.RAND);
            _this.CONSUME(sparqlTokenMap.NIL);
        });
        _this.BuiltInCall_ABS = _this.RULE('BuiltInCall_ABS', function () {
            log('BuiltInCall_ABS');
            _this.CONSUME(sparqlTokenMap.ABS);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_CEIL = _this.RULE('BuiltInCall_CEIL', function () {
            log('BuiltInCall_CEIL');
            _this.CONSUME(sparqlTokenMap.CEIL);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_FLOOR = _this.RULE('BuiltInCall_FLOOR', function () {
            log('BuiltInCall_FLOOR');
            _this.CONSUME(sparqlTokenMap.FLOOR);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_ROUND = _this.RULE('BuiltInCall_ROUND', function () {
            log('BuiltInCall_ROUND');
            _this.CONSUME(sparqlTokenMap.ROUND);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_CONCAT = _this.RULE('BuiltInCall_CONCAT', function () {
            log('BuiltInCall_CONCAT');
            _this.CONSUME(sparqlTokenMap.CONCAT);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.BuiltInCall_STRLEN = _this.RULE('BuiltInCall_STRLEN', function () {
            log('BuiltInCall_STRLEN');
            _this.CONSUME(sparqlTokenMap.STRLEN);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_UCASE = _this.RULE('BuiltInCall_UCASE', function () {
            log('BuiltInCall_UCASE');
            _this.CONSUME(sparqlTokenMap.UCASE);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_LCASE = _this.RULE('BuiltInCall_LCASE', function () {
            log('BuiltInCall_LCASE');
            _this.CONSUME(sparqlTokenMap.LCASE);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_ENCODE_FOR_URI = _this.RULE('BuiltInCall_ENCODE_FOR_URI', function () {
            log('BuiltInCall_ENCODE_FOR_URI');
            _this.CONSUME(sparqlTokenMap.ENCODE_FOR_URI);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_CONTAINS = _this.RULE('BuiltInCall_CONTAINS', function () {
            log('BuiltInCall_CONTAINS');
            _this.CONSUME(sparqlTokenMap.CONTAINS);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_STRSTARTS = _this.RULE('BuiltInCall_STRSTARTS', function () {
            log('BuiltInCall_STRSTARTS');
            _this.CONSUME(sparqlTokenMap.STRSTARTS);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_STRENDS = _this.RULE('BuiltInCall_STRENDS', function () {
            log('BuiltInCall_STRENDS');
            _this.CONSUME(sparqlTokenMap.STRENDS);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_STRBEFORE = _this.RULE('BuiltInCall_STRBEFORE', function () {
            log('BuiltInCall_STRBEFORE');
            _this.CONSUME(sparqlTokenMap.STRBEFORE);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_STRAFTER = _this.RULE('BuiltInCall_STRAFTER', function () {
            log('BuiltInCall_STRAFTER');
            _this.CONSUME(sparqlTokenMap.STRAFTER);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_YEAR = _this.RULE('BuiltInCall_YEAR', function () {
            log('BuiltInCall_YEAR');
            _this.CONSUME(sparqlTokenMap.YEAR);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_MONTH = _this.RULE('BuiltInCall_MONTH', function () {
            log('BuiltInCall_MONTH');
            _this.CONSUME(sparqlTokenMap.MONTH);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_DAY = _this.RULE('BuiltInCall_DAY', function () {
            log('BuiltInCall_DAY');
            _this.CONSUME(sparqlTokenMap.DAY);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_HOURS = _this.RULE('BuiltInCall_HOURS', function () {
            log('BuiltInCall_HOURS');
            _this.CONSUME(sparqlTokenMap.HOURS);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_MINUTES = _this.RULE('BuiltInCall_MINUTES', function () {
            log('BuiltInCall_MINUTES');
            _this.CONSUME(sparqlTokenMap.MINUTES);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_SECONDS = _this.RULE('BuiltInCall_SECONDS', function () {
            log('BuiltInCall_SECONDS');
            _this.CONSUME(sparqlTokenMap.SECONDS);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_TIMEZONE = _this.RULE('BuiltInCall_TIMEZONE', function () {
            log('BuiltInCall_TIMEZONE');
            _this.CONSUME(sparqlTokenMap.TIMEZONE);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_TZ = _this.RULE('BuiltInCall_TZ', function () {
            log('BuiltInCall_TZ');
            _this.CONSUME(sparqlTokenMap.TZ);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_NOW = _this.RULE('BuiltInCall_NOW', function () {
            log('BuiltInCall_NOW');
            _this.CONSUME(sparqlTokenMap.NOW);
            _this.CONSUME(sparqlTokenMap.NIL);
        });
        _this.BuiltInCall_UUID = _this.RULE('BuiltInCall_UUID', function () {
            log('BuiltInCall_UUID');
            _this.CONSUME(sparqlTokenMap.UUID);
            _this.CONSUME(sparqlTokenMap.NIL);
        });
        _this.BuiltInCall_STRUUID = _this.RULE('BuiltInCall_STRUUID', function () {
            log('BuiltInCall_STRUUID');
            _this.CONSUME(sparqlTokenMap.STRUUID);
            _this.CONSUME(sparqlTokenMap.NIL);
        });
        _this.BuiltInCall_MD5 = _this.RULE('BuiltInCall_MD5', function () {
            log('BuiltInCall_MD5');
            _this.CONSUME(sparqlTokenMap.MD5);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_SHA1 = _this.RULE('BuiltInCall_SHA1', function () {
            log('BuiltInCall_SHA1');
            _this.CONSUME(sparqlTokenMap.SHA1);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_SHA256 = _this.RULE('BuiltInCall_SHA256', function () {
            log('BuiltInCall_SHA256');
            _this.CONSUME(sparqlTokenMap.SHA256);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_SHA384 = _this.RULE('BuiltInCall_SHA384', function () {
            log('BuiltInCall_SHA384');
            _this.CONSUME(sparqlTokenMap.SHA384);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_SHA512 = _this.RULE('BuiltInCall_SHA512', function () {
            log('BuiltInCall_SHA512');
            _this.CONSUME(sparqlTokenMap.SHA512);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_COALESCE = _this.RULE('BuiltInCall_COALESCE', function () {
            log('BuiltInCall_COALESCE');
            _this.CONSUME(sparqlTokenMap.COALESCE);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.BuiltInCall_IF = _this.RULE('BuiltInCall_IF', function () {
            log('BuiltInCall_IF');
            _this.CONSUME(sparqlTokenMap.IF);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME1(sparqlTokenMap.Comma);
            _this.SUBRULE2(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_STRLANG = _this.RULE('BuiltInCall_STRLANG', function () {
            log('BuiltInCall_STRLANG');
            _this.CONSUME(sparqlTokenMap.STRLANG);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_STRDT = _this.RULE('BuiltInCall_STRDT', function () {
            log('BuiltInCall_STRDT');
            _this.CONSUME(sparqlTokenMap.STRDT);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_sameTerm = _this.RULE('BuiltInCall_sameTerm', function () {
            log('BuiltInCall_sameTerm');
            _this.CONSUME(sparqlTokenMap.sameTerm);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_isIRI = _this.RULE('BuiltInCall_isIRI', function () {
            log('BuiltInCall_isIRI');
            _this.CONSUME(sparqlTokenMap.isIRI);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_isURI = _this.RULE('BuiltInCall_isURI', function () {
            log('BuiltInCall_isURI');
            _this.CONSUME(sparqlTokenMap.isURI);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_isBlank = _this.RULE('BuiltInCall_isBlank', function () {
            log('BuiltInCall_isBlank');
            _this.CONSUME(sparqlTokenMap.isBlank);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_isLiteral = _this.RULE('BuiltInCall_isLiteral', function () {
            log('BuiltInCall_isLiteral');
            _this.CONSUME(sparqlTokenMap.isLiteral);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall_isNumeric = _this.RULE('BuiltInCall_isNumeric', function () {
            log('BuiltInCall_isNumeric');
            _this.CONSUME(sparqlTokenMap.isNumeric);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.BuiltInCall = _this.RULE('BuiltInCall', function () {
            log('BuiltInCall');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Aggregate); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STR); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_LANG); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_LANGMATCHERS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_DATATYPE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_BOUND); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_IRI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_URI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_BNODE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_RAND); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_ABS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_CEIL); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_FLOOR); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_ROUND); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_CONCAT); } },
                { ALT: function () { return _this.SUBRULE(_this.SubstringExpression); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRLEN); } },
                { ALT: function () { return _this.SUBRULE(_this.StrReplaceExpression); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_UCASE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_LCASE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_ENCODE_FOR_URI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_CONTAINS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRSTARTS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRENDS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRBEFORE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRAFTER); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_YEAR); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_MONTH); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_DAY); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_HOURS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_MINUTES); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SECONDS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_TIMEZONE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_TZ); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_NOW); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_UUID); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRUUID); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_MD5); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SHA1); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SHA256); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SHA384); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SHA512); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_COALESCE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_IF); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRLANG); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRDT); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_sameTerm); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isIRI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isURI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isBlank); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isNumeric); } },
                { ALT: function () { return _this.SUBRULE(_this.RegexExpression); } },
                { ALT: function () { return _this.SUBRULE(_this.ExistsFunction); } },
                { ALT: function () { return _this.SUBRULE(_this.NotExistsFunction); } },
            ]);
        });
        _this.RegexExpression = _this.RULE('RegexExpression', function () {
            log('RegexExpression');
            _this.CONSUME(sparqlTokenMap.REGEX);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME1(sparqlTokenMap.Comma);
                _this.SUBRULE2(_this.Expression);
            });
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.SubstringExpression = _this.RULE('SubstringExpression', function () {
            log('SubstringExpression');
            _this.CONSUME(sparqlTokenMap.SUBSTR);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME1(sparqlTokenMap.Comma);
                _this.SUBRULE2(_this.Expression);
            });
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.StrReplaceExpression = _this.RULE('StrReplaceExpression', function () {
            log('StrReplaceExpression');
            _this.CONSUME(sparqlTokenMap.REPLACE);
            _this.CONSUME(sparqlTokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME1(sparqlTokenMap.Comma);
            _this.SUBRULE2(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME2(sparqlTokenMap.Comma);
                _this.SUBRULE3(_this.Expression);
            });
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.ExistsFunction = _this.RULE('ExistsFunction', function () {
            log('ExistsFunction');
            _this.CONSUME(sparqlTokenMap.EXISTS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.NotExistsFunction = _this.RULE('NotExistsFunction', function () {
            log('NotExistsFunction');
            _this.CONSUME(sparqlTokenMap.NOT_EXISTS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.Count = _this.RULE('Count', function () {
            log('Count');
            _this.CONSUME(sparqlTokenMap.COUNT);
            _this.CONSUME1(sparqlTokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(sparqlTokenMap.DISTINCT); });
            _this.OR([
                { ALT: function () { return _this.CONSUME3(sparqlTokenMap.Star); } },
                { ALT: function () { return _this.SUBRULE(_this.Expression); } },
            ]);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.Sum = _this.RULE('Sum', function () {
            log('Sum');
            _this.CONSUME(sparqlTokenMap.SUM);
            _this.CONSUME1(sparqlTokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(sparqlTokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.Min = _this.RULE('Min', function () {
            log('Min');
            _this.CONSUME(sparqlTokenMap.MIN);
            _this.CONSUME1(sparqlTokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(sparqlTokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.Max = _this.RULE('Max', function () {
            log('Max');
            _this.CONSUME(sparqlTokenMap.MAX);
            _this.CONSUME1(sparqlTokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(sparqlTokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.Avg = _this.RULE('Avg', function () {
            log('Avg');
            _this.CONSUME(sparqlTokenMap.AVG);
            _this.CONSUME1(sparqlTokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(sparqlTokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.Sample = _this.RULE('Sample', function () {
            log('Sample');
            _this.CONSUME(sparqlTokenMap.SAMPLE);
            _this.CONSUME1(sparqlTokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(sparqlTokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.GroupConcat = _this.RULE('GroupConcat', function () {
            log('GroupConcat');
            _this.CONSUME(sparqlTokenMap.GROUP_CONCAT);
            _this.CONSUME1(sparqlTokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(sparqlTokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.OPTION1(function () {
                _this.CONSUME(sparqlTokenMap.Semicolon);
                _this.CONSUME(sparqlTokenMap.SEPARATOR);
                _this.CONSUME(sparqlTokenMap.Equals);
                _this.SUBRULE(_this.String);
            });
            _this.CONSUME(sparqlTokenMap.RParen);
        });
        _this.Aggregate = _this.RULE('Aggregate', function () {
            log('Aggregate');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Count); } },
                { ALT: function () { return _this.SUBRULE(_this.Sum); } },
                { ALT: function () { return _this.SUBRULE(_this.Min); } },
                { ALT: function () { return _this.SUBRULE(_this.Max); } },
                { ALT: function () { return _this.SUBRULE(_this.Avg); } },
                { ALT: function () { return _this.SUBRULE(_this.Sample); } },
                { ALT: function () { return _this.SUBRULE(_this.GroupConcat); } },
            ]);
        });
        _this.iriOrFunction = _this.RULE('iriOrFunction', function () {
            log('iriOrFunction');
            _this.SUBRULE(_this.iri);
            _this.OPTION(function () { return _this.SUBRULE(_this.ArgList); });
        });
        _this.RDFLiteral = _this.RULE('RDFLiteral', function () {
            log('RDFLiteral');
            _this.SUBRULE(_this.String);
            _this.OPTION(function () {
                return _this.OR([
                    { ALT: function () { return _this.CONSUME(sparqlTokenMap.LANGTAG); } },
                    {
                        ALT: function () {
                            _this.CONSUME(sparqlTokenMap.DoubleCaret);
                            _this.SUBRULE(_this.iri);
                        },
                    },
                ]);
            });
        });
        _this.NumericLiteral = _this.RULE('NumericLiteral', function () {
            log('NumericLiteral');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteralUnsigned); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteralPositive); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteralNegative); } },
            ]);
        });
        _this.NumericLiteralUnsigned = _this.RULE('NumericLiteralUnsigned', function () {
            log('NumericLiteralUnsigned');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.INTEGER); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.DOUBLE); } },
            ]);
        });
        _this.NumericLiteralPositive = _this.RULE('NumericLiteralPositive', function () {
            log('NumericLiteralPositive');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.INTEGER_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.DECIMAL_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.DOUBLE_POSITIVE); } },
            ]);
        });
        _this.NumericLiteralNegative = _this.RULE('NumericLiteralNegative', function () {
            log('NumericLiteralNegative');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.INTEGER_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.DECIMAL_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.DOUBLE_NEGATIVE); } },
            ]);
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            log('BooleanLiteral');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.TRUE); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.FALSE); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            log('String');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.STRING_LITERAL1); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.STRING_LITERAL2); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.STRING_LITERAL_LONG1); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.STRING_LITERAL_LONG2); } },
            ]);
        });
        _this.iri = _this.RULE('iri', function () {
            log('iri');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            log('PrefixedName');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.PNAME_NS); } },
            ]);
        });
        _this.BlankNode = _this.RULE('BlankNode', function () {
            log('BlankNode');
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.ANON); } },
            ]);
        });
        _this.lexer = new Lexer(tokenVocab);
        return _this;
    }
    return BaseSparqlParser;
}(Parser));

var indexOfSELECT = baseTokens.indexOf(sparqlTokenMap.SELECT);
var stardogTokens = baseTokens.slice(0, indexOfSELECT).concat(pathsTokens, baseTokens.slice(indexOfSELECT));
var StardogSparqlParser = /** @class */ (function (_super) {
    __extends(StardogSparqlParser, _super);
    function StardogSparqlParser(options) {
        var _this = _super.call(this, options, stardogTokens) || this;
        _this.Query = _this.OVERRIDE_RULE('Query', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SelectQuery); } },
                { ALT: function () { return _this.SUBRULE(_this.ConstructQuery); } },
                { ALT: function () { return _this.SUBRULE(_this.DescribeQuery); } },
                { ALT: function () { return _this.SUBRULE(_this.AskQuery); } },
                { ALT: function () { return _this.SUBRULE(_this.PathQuery); } },
            ]);
            _this.SUBRULE(_this.ValuesClause);
        });
        _this.PathQuery = _this.RULE('PathQuery', function () {
            _this.SUBRULE(_this.PathSpec);
            _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
            _this.CONSUME(sparqlTokenMap.START);
            _this.SUBRULE(_this.PathTerminal);
            _this.CONSUME(sparqlTokenMap.END);
            _this.SUBRULE1(_this.PathTerminal);
            _this.SUBRULE(_this.Via);
            _this.OPTION(function () { return _this.SUBRULE(_this.MaxLength); });
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.Via = _this.RULE('Via', function () {
            _this.CONSUME(sparqlTokenMap.VIA);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.GroupGraphPattern); } },
                { ALT: function () { return _this.SUBRULE(_this.Var); } },
                { ALT: function () { return _this.SUBRULE(_this.Path); } },
            ]);
        });
        _this.PathTerminal = _this.RULE('PathTerminal', function () {
            _this.SUBRULE(_this.Var);
            _this.OPTION(function () {
                _this.OR([
                    {
                        ALT: function () {
                            _this.CONSUME(sparqlTokenMap.Equals);
                            _this.SUBRULE(_this.iri);
                        },
                    },
                    { ALT: function () { return _this.SUBRULE(_this.GroupGraphPattern); } },
                ]);
            });
        });
        _this.PathSpec = _this.RULE('PathSpec', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.PATHS); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.PATHS_SHORTEST); } },
                { ALT: function () { return _this.CONSUME(sparqlTokenMap.PATHS_ALL); } },
            ]);
            _this.OPTION1(function () { return _this.CONSUME(sparqlTokenMap.CYCLIC); });
        });
        _this.BuiltInCall = _this.OVERRIDE_RULE('BuiltInCall', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Aggregate); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STR); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_LANG); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_LANGMATCHERS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_DATATYPE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_BOUND); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_IRI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_URI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_BNODE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_RAND); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_ABS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_CEIL); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_FLOOR); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_ROUND); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_CONCAT); } },
                { ALT: function () { return _this.SUBRULE(_this.SubstringExpression); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRLEN); } },
                { ALT: function () { return _this.SUBRULE(_this.StrReplaceExpression); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_UCASE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_LCASE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_ENCODE_FOR_URI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_CONTAINS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRSTARTS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRENDS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRBEFORE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRAFTER); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_YEAR); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_MONTH); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_DAY); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_HOURS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_MINUTES); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SECONDS); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_TIMEZONE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_TZ); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_NOW); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_UUID); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRUUID); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_MD5); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SHA1); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SHA256); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SHA384); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_SHA512); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_COALESCE); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_IF); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRLANG); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_STRDT); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_sameTerm); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isIRI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isURI); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isBlank); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall_isNumeric); } },
                { ALT: function () { return _this.SUBRULE(_this.RegexExpression); } },
                { ALT: function () { return _this.SUBRULE(_this.ExistsFunction); } },
                { ALT: function () { return _this.SUBRULE(_this.NotExistsFunction); } },
                // Stardog has some additional built-in functions, and supports user-defined custom functions
                { ALT: function () { return _this.SUBRULE(_this.StardogOrCustomFunction); } },
            ]);
        });
        _this.StardogOrCustomFunction = _this.RULE('StardogOrCustomFunction', function () {
            _this.CONSUME(sparqlTokenMap.Unknown);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.ConstructTemplate = _this.OVERRIDE_RULE('ConstructTemplate', function () {
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.OPTION(function () {
                // Stardog supports the request of Quads in a Construct template. See Stardog issue #675
                return _this.SUBRULE(_this.Quads);
            });
            _this.CONSUME(sparqlTokenMap.RCurly);
        });
        Parser.performSelfAnalysis(_this);
        return _this;
    }
    return StardogSparqlParser;
}(BaseSparqlParser));

var W3SpecSparqlParser = /** @class */ (function (_super) {
    __extends(W3SpecSparqlParser, _super);
    function W3SpecSparqlParser(options) {
        var _this = _super.call(this, options, baseTokens) || this;
        Parser.performSelfAnalysis(_this);
        return _this;
    }
    return W3SpecSparqlParser;
}(BaseSparqlParser));

/*
Copyright ©2012–2018 Ruben Verborgh
With modifications Copyright ©2018 Stardog Union

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g;
var escapeReplacements = {
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
var unescapedStringLiteralQuote = /^"([^"\\\r\n]+)"/; // non-empty string without escape sequences
var unescapedStringLiteralSingleQuote = /^'([^'\\\r\n]+)'/;
var stringLiteralQuote = /^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])/;
var stringLiteralSingleQuote = /^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/;
var stringLiteralLongQuote = /^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""/;
var stringLiteralLongSingleQuote = /^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/;
var illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;
var escapedIri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/;
var unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/;
// Handle special unescaping needs related to the IRIREF rule and others.
var unescape = function (item) {
    try {
        return item.replace(escapeSequence, function (_, unicode4, unicode8, escapedChar) {
            if (unicode4) {
                return String.fromCharCode(parseInt(unicode4, 16));
            }
            else if (unicode8) {
                var charCode = parseInt(unicode8, 16);
                if (charCode <= 0xffff) {
                    return String.fromCharCode(charCode);
                }
                return String.fromCharCode(0xd800 + (charCode -= 0x10000) / 0x400, 0xdc00 + (charCode & 0x3ff));
            }
            else {
                var replacement = escapeReplacements[escapedChar];
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

var unicodeRegexp = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var turtleTokenMap = {
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
        pattern: regex.and(regex.option(/[+-]/), regex.or(regex.and(/\d+\.\d*/, EXPONENT), regex.and(/\.\d+/, EXPONENT), regex.and(/\d+/, EXPONENT))),
    }),
    EXPONENT: createToken({ name: 'EXPONENT', pattern: EXPONENT }),
    ECHAR: createToken({ name: 'ECHAR', pattern: ECHAR }),
    ANON: sparqlTokenMap.ANON,
    PLX: createToken({ name: 'PLX', pattern: PLX }),
    PERCENT: sparqlTokenMap.PERCENT,
    HEX: createToken({ name: 'HEX', pattern: HEX }),
    STRING_LITERAL_LONG_SINGLE_QUOTE: createToken({
        name: 'STRING_LITERAL_LONG_SINGLE_QUOTE',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var match = stringLiteralLongSingleQuote.exec(text.slice(startOffset));
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
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var match = stringLiteralLongQuote.exec(text.slice(startOffset));
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
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var textToMatch = text.slice(startOffset);
            var match = unescapedStringLiteralQuote.exec(textToMatch);
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
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var textToMatch = text.slice(startOffset);
            var match = unescapedStringLiteralSingleQuote.exec(textToMatch);
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
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            return unicodeRegexp.exec(text.slice(startOffset));
        },
        line_breaks: false,
    }),
    IRIREF: createToken({
        name: 'IRIREF',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var textToMatch = text.slice(startOffset);
            var match = unescapedIri.exec(textToMatch);
            if (match) {
                return match;
            }
            match = escapedIri.exec(textToMatch);
            if (!match) {
                return null;
            }
            var value = unescape(match[1]);
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
var turtleTokenTypes = [
    turtleTokenMap.Comment,
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
    turtleTokenMap.TTL_BASE,
    turtleTokenMap.TTL_PREFIX,
    sparqlTokenMap.LANGTAG,
    turtleTokenMap.DOUBLE,
    turtleTokenMap.DECIMAL,
    sparqlTokenMap.Period,
    sparqlTokenMap.DoubleCaret,
    turtleTokenMap.IRIREF,
    turtleTokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE,
    turtleTokenMap.STRING_LITERAL_LONG_QUOTE,
    turtleTokenMap.STRING_LITERAL_QUOTE,
    turtleTokenMap.STRING_LITERAL_SINGLE_QUOTE,
    turtleTokenMap.INTEGER,
    turtleTokenMap.EXPONENT,
    turtleTokenMap.PLX,
    sparqlTokenMap.PERCENT,
    turtleTokenMap.HEX,
    turtleTokenMap.PN_CHARS_BASE,
    turtleTokenMap.PN_CHARS_U,
    turtleTokenMap.PN_CHARS,
    turtleTokenMap.PN_PREFIX,
    turtleTokenMap.PN_LOCAL,
    turtleTokenMap.PN_LOCAL_ESC,
    turtleTokenMap.ECHAR,
    turtleTokenMap.UCHAR,
    turtleTokenMap.Unknown,
];

var tokens$1 = /*#__PURE__*/Object.freeze({
    turtleTokenMap: turtleTokenMap,
    turtleTokenTypes: turtleTokenTypes
});

var TurtleParser = /** @class */ (function (_super) {
    __extends(TurtleParser, _super);
    function TurtleParser(config) {
        var _this = _super.call(this, [], turtleTokenTypes, __assign({ outputCst: true, recoveryEnabled: true }, config)) || this;
        // Parsing Turtle requires that the parser keep a map of namespaces in state.
        // Empty prefixes, for example, are allowed only if the empty prefix has been
        // added to the namespaces map (for now, that's all this tracks). (TODO: We
        // might want to use a visitor for this, but I'm doing it quick-and-dirty for
        // now.)
        // See here: https://www.w3.org/TR/turtle/#handle-PNAME_LN
        _this.namespacesMap = {};
        _this.semanticErrors = [];
        // Clears the state that we have to manage on our own for each parse (see
        // above for details).
        _this.resetManagedState = function () {
            _this.namespacesMap = {};
            _this.semanticErrors = [];
        };
        _this.tokenize = function (document) {
            return _this.lexer.tokenize(document).tokens;
        };
        _this.parse = function (document) {
            _this.input = _this.lexer.tokenize(document).tokens;
            var cst = _this.turtleDoc();
            // Next two items are copied so that they can be returned/held after parse
            // state is cleared.
            var errors = _this.errors.slice();
            var semanticErrors = _this.semanticErrors.slice();
            _this.resetManagedState();
            return {
                errors: errors,
                semanticErrors: semanticErrors,
                cst: cst,
            };
        };
        _this.turtleDoc = _this.RULE('turtleDoc', function () {
            _this.MANY(function () { return _this.SUBRULE(_this.statement); });
        });
        _this.statement = _this.RULE('statement', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.directive); } },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.triples);
                        _this.CONSUME(turtleTokenMap.Period);
                    },
                },
            ]);
        });
        _this.directive = _this.RULE('directive', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.prefixID); } },
                { ALT: function () { return _this.SUBRULE(_this.base); } },
                { ALT: function () { return _this.SUBRULE(_this.sparqlPrefix); } },
                { ALT: function () { return _this.SUBRULE(_this.sparqlBase); } },
            ]);
        });
        _this.prefixID = _this.RULE('prefixID', function () {
            _this.CONSUME(turtleTokenMap.TTL_PREFIX);
            var pnameNsToken = _this.CONSUME(turtleTokenMap.PNAME_NS);
            var iriToken = _this.CONSUME(turtleTokenMap.IRIREF);
            var pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
            var iriImage = iriToken.image;
            _this.namespacesMap[pnameImageWithoutColon] = iriImage;
            _this.CONSUME(turtleTokenMap.Period);
        });
        _this.base = _this.RULE('base', function () {
            _this.CONSUME(turtleTokenMap.TTL_BASE);
            _this.CONSUME(turtleTokenMap.IRIREF);
            _this.CONSUME(turtleTokenMap.Period);
        });
        _this.sparqlBase = _this.RULE('sparqlBase', function () {
            _this.CONSUME(turtleTokenMap.BASE);
            _this.CONSUME(turtleTokenMap.IRIREF);
        });
        _this.sparqlPrefix = _this.RULE('sparqlPrefix', function () {
            _this.CONSUME(turtleTokenMap.PREFIX);
            var pnameNsToken = _this.CONSUME(turtleTokenMap.PNAME_NS);
            var iriToken = _this.CONSUME(turtleTokenMap.IRIREF);
            var pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
            var iriImage = iriToken.image;
            _this.namespacesMap[pnameImageWithoutColon] = iriImage;
        });
        _this.triples = _this.RULE('triples', function () {
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.subject);
                        _this.SUBRULE(_this.predicateObjectList);
                    },
                },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.blankNodePropertyList);
                        _this.OPTION(function () { return _this.SUBRULE1(_this.predicateObjectList); });
                    },
                },
            ]);
        });
        _this.predicateObjectList = _this.RULE('predicateObjectList', function () {
            _this.SUBRULE(_this.verb);
            _this.SUBRULE(_this.objectList);
            _this.OPTION(function () {
                _this.CONSUME(turtleTokenMap.Semicolon);
                _this.OPTION1(function () {
                    _this.SUBRULE1(_this.verb);
                    _this.SUBRULE1(_this.objectList);
                });
            });
            _this.MANY(function () {
                _this.CONSUME1(turtleTokenMap.Semicolon);
                _this.OPTION2(function () {
                    _this.SUBRULE2(_this.verb);
                    _this.SUBRULE2(_this.objectList);
                });
            });
        });
        _this.subject = _this.RULE('subject', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNode); } },
                { ALT: function () { return _this.SUBRULE(_this.collection); } },
            ]);
        });
        _this.predicate = _this.RULE('predicate', function () {
            _this.SUBRULE(_this.iri);
        });
        _this.objectList = _this.RULE('objectList', function () {
            _this.SUBRULE(_this.object);
            _this.MANY(function () {
                _this.CONSUME(turtleTokenMap.Comma);
                _this.SUBRULE1(_this.object);
            });
        });
        _this.verb = _this.RULE('verb', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.predicate); } },
                { ALT: function () { return _this.CONSUME(turtleTokenMap.A); } },
            ]);
        });
        _this.literal = _this.RULE('literal', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
            ]);
        });
        _this.blankNodePropertyList = _this.RULE('blankNodePropertyList', function () {
            _this.CONSUME(turtleTokenMap.LBracket);
            _this.SUBRULE(_this.predicateObjectList);
            _this.CONSUME(turtleTokenMap.RBracket);
        });
        _this.object = _this.RULE('object', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNode); } },
                { ALT: function () { return _this.SUBRULE(_this.collection); } },
                { ALT: function () { return _this.SUBRULE(_this.blankNodePropertyList); } },
                { ALT: function () { return _this.SUBRULE(_this.literal); } },
            ]);
        });
        _this.collection = _this.RULE('collection', function () {
            _this.CONSUME(turtleTokenMap.LParen);
            _this.MANY(function () { return _this.SUBRULE(_this.object); });
            _this.CONSUME(turtleTokenMap.RParen);
        });
        _this.NumericLiteral = _this.RULE('NumericLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(turtleTokenMap.INTEGER); } },
                { ALT: function () { return _this.CONSUME(turtleTokenMap.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(turtleTokenMap.DOUBLE); } },
            ]);
        });
        _this.RDFLiteral = _this.RULE('RDFLiteral', function () {
            _this.SUBRULE(_this.String);
            _this.OPTION(function () {
                _this.OR([
                    { ALT: function () { return _this.CONSUME(turtleTokenMap.LANGTAG); } },
                    {
                        ALT: function () {
                            _this.CONSUME(turtleTokenMap.DoubleCaret);
                            _this.SUBRULE(_this.iri);
                        },
                    },
                ]);
            });
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(turtleTokenMap.TRUE); } },
                { ALT: function () { return _this.CONSUME(turtleTokenMap.FALSE); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(turtleTokenMap.STRING_LITERAL_QUOTE); } },
                { ALT: function () { return _this.CONSUME(turtleTokenMap.STRING_LITERAL_SINGLE_QUOTE); } },
                {
                    ALT: function () {
                        return _this.CONSUME(turtleTokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE);
                    },
                },
                { ALT: function () { return _this.CONSUME(turtleTokenMap.STRING_LITERAL_LONG_QUOTE); } },
            ]);
        });
        _this.iri = _this.RULE('iri', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(turtleTokenMap.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            var prefixedNameToken = _this.OR([
                { ALT: function () { return _this.CONSUME(turtleTokenMap.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(turtleTokenMap.PNAME_NS); } },
            ]);
            var pnameNsImage = prefixedNameToken.image.slice(0, prefixedNameToken.image.indexOf(':'));
            if (!(pnameNsImage in _this.namespacesMap)) {
                _this.semanticErrors.push({
                    name: 'NoNamespacePrefixError',
                    message: 'A prefix was used for which there was no namespace defined.',
                    token: prefixedNameToken,
                    context: {
                        ruleStack: _this.getHumanReadableRuleStack(),
                        ruleOccurrenceStack: _this.RULE_OCCURRENCE_STACK.slice(),
                    },
                    resyncedTokens: [],
                });
            }
        });
        _this.BlankNode = _this.RULE('BlankNode', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(turtleTokenMap.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(turtleTokenMap.ANON); } },
            ]);
        });
        _this.lexer = new Lexer(turtleTokenTypes);
        Parser.performSelfAnalysis(_this);
        return _this;
    }
    return TurtleParser;
}(Parser));

var FROM_BLOCK_END_MATCHER = /^\s*to\s*{/i;
var FROM_JSON_BLOCK_END_MATCHER = /((?:.|\s)*?)to\s*{/i;
// Because the end of `FROM` clauses in SMS are not explicit, tokenizing them
// using regexes can be incredibly inefficient. This function gives us a bit
// more control; it scans through the document character by character until
// it finds a character which is _likely_ to be followed by an ending pattern,
// and only then does it use a regex to confirm.
var explicitEndMatcher = function (textToMatch, endCandidateChar, // Char which, if found, triggers an exec of endMatcher
endMatcher // Regex which matches an end pattern
) {
    for (var offset = 0, char = void 0; offset < textToMatch.length; offset++) {
        char = textToMatch[offset];
        if (char === endCandidateChar) {
            var blockEndCandidate = textToMatch.slice(offset + 1);
            var match = endMatcher.exec(blockEndCandidate);
            if (!match) {
                continue;
            }
            else {
                var blockText = textToMatch.slice(0, offset);
                var response = [blockText];
                return response;
            }
        }
    }
    return null;
};
var smsTokenMap = {
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
        pattern: function (text, startOffset, matchedTokensSoFar) {
            if (startOffset === void 0) { startOffset = 0; }
            var _a = matchedTokensSoFar.slice(-2), secondToLastToken = _a[0], lastToken = _a[1];
            if (!secondToLastToken ||
                !lastToken ||
                secondToLastToken.tokenType.tokenName !== smsTokenMap.Sql.tokenName ||
                lastToken.tokenType.tokenName !== smsTokenMap.LCurly.tokenName) {
                return null;
            }
            var textToMatch = text.slice(startOffset);
            return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
        },
        line_breaks: true,
    }),
    JsonBlock: createToken({
        name: 'JsonBlock',
        pattern: function (text, startOffset, matchedTokensSoFar) {
            if (startOffset === void 0) { startOffset = 0; }
            var lastToken = matchedTokensSoFar.slice(-1)[0];
            if (!lastToken ||
                lastToken.tokenType.tokenName !== smsTokenMap.Json.tokenName) {
                return null;
            }
            var textToMatch = text.slice(startOffset);
            var match = FROM_JSON_BLOCK_END_MATCHER.exec(textToMatch);
            if (!match) {
                return null;
            }
            var capturedMatch = match.slice(1);
            return capturedMatch;
        },
        line_breaks: true,
    }),
    GraphQlBlock: createToken({
        name: 'GraphQlBlock',
        pattern: function (text, startOffset, matchedTokensSoFar) {
            if (startOffset === void 0) { startOffset = 0; }
            var _a = matchedTokensSoFar.slice(-2), secondToLastToken = _a[0], lastToken = _a[1];
            if (!secondToLastToken ||
                !lastToken ||
                secondToLastToken.tokenType.tokenName !==
                    smsTokenMap.GraphQl.tokenName ||
                lastToken.tokenType.tokenName !== smsTokenMap.LCurly.tokenName) {
                return null;
            }
            var textToMatch = text.slice(startOffset);
            return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
        },
        line_breaks: true,
    }),
};
var smsTokenTypes = [
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

var tokens$2 = /*#__PURE__*/Object.freeze({
    smsTokenMap: smsTokenMap,
    smsTokenTypes: smsTokenTypes
});

var SmsParser = /** @class */ (function (_super) {
    __extends(SmsParser, _super);
    function SmsParser(config) {
        var _this = _super.call(this, [], smsTokenTypes, __assign({ outputCst: true, recoveryEnabled: true }, config)) || this;
        _this.tokenize = function (document) {
            return _this.lexer.tokenize(document).tokens;
        };
        _this.parse = function (document) {
            _this.input = _this.lexer.tokenize(document).tokens;
            var cst = _this.MappingDoc();
            var errors = _this.errors;
            return {
                errors: errors,
                cst: cst,
            };
        };
        _this.MappingDoc = _this.RULE('MappingDoc', function () {
            _this.MANY(function () { return _this.SUBRULE(_this.PrefixDecl); });
            _this.SUBRULE(_this.MappingClause);
            _this.MANY1(function () {
                _this.CONSUME(smsTokenMap.Semicolon);
                _this.SUBRULE1(_this.MappingClause);
            });
        });
        _this.MappingClause = _this.RULE('MappingClause', function () {
            _this.SUBRULE(_this.MappingDecl);
            _this.SUBRULE(_this.FromClause);
            _this.SUBRULE(_this.ToClause);
            _this.SUBRULE(_this.WhereClause);
        });
        _this.MappingDecl = _this.RULE('MappingDecl', function () {
            _this.CONSUME(smsTokenMap.Mapping);
            _this.OPTION(function () { return _this.SUBRULE(_this.iri); });
        });
        _this.FromClause = _this.RULE('FromClause', function () {
            _this.CONSUME(smsTokenMap.FROM);
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.SqlClause); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.JsonClause); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.GraphQlClause); },
                },
            ]);
        });
        _this.JsonClause = _this.RULE('JsonClause', function () {
            _this.CONSUME(smsTokenMap.Json);
            _this.CONSUME(smsTokenMap.JsonBlock);
        });
        _this.GraphQlClause = _this.RULE('GraphQlClause', function () {
            _this.CONSUME(smsTokenMap.GraphQl);
            _this.CONSUME(smsTokenMap.LCurly);
            _this.CONSUME(smsTokenMap.GraphQlBlock);
            _this.CONSUME(smsTokenMap.RCurly);
        });
        _this.SqlClause = _this.RULE('SqlClause', function () {
            _this.CONSUME(smsTokenMap.Sql);
            _this.CONSUME(smsTokenMap.LCurly);
            _this.CONSUME(smsTokenMap.SqlBlock);
            _this.CONSUME(smsTokenMap.RCurly);
        });
        _this.ToClause = _this.RULE('ToClause', function () {
            _this.CONSUME(smsTokenMap.TO);
            _this.SUBRULE(_this.ConstructTemplate);
        });
        _this.WhereClause = _this.RULE('WhereClause', function () {
            _this.CONSUME(smsTokenMap.WHERE);
            _this.CONSUME(smsTokenMap.LCurly);
            _this.MANY(function () { return _this.SUBRULE(_this.Bind); });
            _this.CONSUME(smsTokenMap.RCurly);
        });
        _this.Bind = _this.RULE('Bind', function () {
            _this.CONSUME(smsTokenMap.BIND);
            _this.CONSUME(smsTokenMap.LParen);
            _this.SUBRULE(_this.TemplateOrCast);
            _this.CONSUME(smsTokenMap.AS);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(smsTokenMap.RParen);
        });
        _this.TemplateOrCast = _this.RULE('TemplateOrCast', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.TemplateFunc); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.CastFunc); },
                },
            ]);
        });
        _this.CastFunc = _this.RULE('CastFunc', function () {
            _this.SUBRULE(_this.iri);
            _this.CONSUME(smsTokenMap.LParen);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(smsTokenMap.RParen);
        });
        _this.TemplateFunc = _this.RULE('TemplateFunc', function () {
            _this.CONSUME(smsTokenMap.Template);
            _this.CONSUME(smsTokenMap.LParen);
            _this.SUBRULE(_this.String);
            _this.CONSUME(smsTokenMap.RParen);
        });
        //
        // Dupes from Sparql
        //
        _this.PrefixDecl = _this.RULE('PrefixDecl', function () {
            _this.CONSUME(smsTokenMap.PREFIX);
            _this.CONSUME(smsTokenMap.PNAME_NS);
            _this.CONSUME(smsTokenMap.IRIREF);
        });
        _this.iri = _this.RULE('iri', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.PNAME_NS); } },
            ]);
        });
        _this.ConstructTemplate = _this.RULE('ConstructTemplate', function () {
            _this.CONSUME(smsTokenMap.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.ConstructTriples); });
            _this.CONSUME(smsTokenMap.RCurly);
        });
        _this.ConstructTriples = _this.RULE('ConstructTriples', function () {
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(smsTokenMap.Period);
                _this.OPTION1(function () { return _this.SUBRULE(_this.ConstructTriples); });
            });
        });
        _this.TriplesSameSubject = _this.RULE('TriplesSameSubject', function () {
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.VarOrTerm);
                        _this.SUBRULE(_this.PropertyListNotEmpty);
                    },
                },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.TriplesNode);
                        _this.SUBRULE(_this.PropertyList);
                    },
                },
            ]);
        });
        _this.VarOrTerm = _this.RULE('VarOrTerm', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Var); } },
                { ALT: function () { return _this.SUBRULE(_this.GraphTerm); } },
            ]);
        });
        _this.PropertyListNotEmpty = _this.RULE('PropertyListNotEmpty', function () {
            _this.SUBRULE(_this.Verb);
            _this.SUBRULE(_this.ObjectList);
            _this.MANY(function () {
                _this.CONSUME(smsTokenMap.Semicolon);
                _this.OPTION(function () {
                    _this.SUBRULE1(_this.Verb);
                    _this.SUBRULE1(_this.ObjectList);
                });
            });
        });
        _this.TriplesNode = _this.RULE('TriplesNode', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Collection); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNodePropertyList); } },
            ]);
        });
        _this.PropertyList = _this.RULE('PropertyList', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.PropertyListNotEmpty); });
        });
        _this.GraphTerm = _this.RULE('GraphTerm', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNode); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.NIL); } },
            ]);
        });
        _this.Verb = _this.RULE('Verb', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.VarOrIri); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.A); } },
            ]);
        });
        _this.ObjectList = _this.RULE('ObjectList', function () {
            _this.AT_LEAST_ONE_SEP({
                SEP: smsTokenMap.Comma,
                DEF: function () { return _this.SUBRULE(_this.Object); },
            });
        });
        _this.Object = _this.RULE('Object', function () {
            _this.SUBRULE(_this.GraphNode);
        });
        _this.Collection = _this.RULE('Collection', function () {
            _this.CONSUME(smsTokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNode); });
            _this.CONSUME(smsTokenMap.RParen);
        });
        _this.BlankNodePropertyList = _this.RULE('BlankNodePropertyList', function () {
            _this.CONSUME(smsTokenMap.LBracket);
            _this.SUBRULE(_this.PropertyListNotEmpty);
            _this.CONSUME(smsTokenMap.RBracket);
        });
        _this.VarOrIri = _this.RULE('VarOrIri', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Var); } },
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
            ]);
        });
        _this.RDFLiteral = _this.RULE('RDFLiteral', function () {
            _this.SUBRULE(_this.String);
            _this.OPTION(function () {
                return _this.OR([
                    { ALT: function () { return _this.CONSUME(smsTokenMap.LANGTAG); } },
                    {
                        ALT: function () {
                            _this.CONSUME(smsTokenMap.DoubleCaret);
                            _this.SUBRULE(_this.iri);
                        },
                    },
                ]);
            });
        });
        _this.NumericLiteral = _this.RULE('NumericLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteralUnsigned); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteralPositive); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteralNegative); } },
            ]);
        });
        _this.NumericLiteralUnsigned = _this.RULE('NumericLiteralUnsigned', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.INTEGER); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.DOUBLE); } },
            ]);
        });
        _this.NumericLiteralPositive = _this.RULE('NumericLiteralPositive', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.INTEGER_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.DECIMAL_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.DOUBLE_POSITIVE); } },
            ]);
        });
        _this.NumericLiteralNegative = _this.RULE('NumericLiteralNegative', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.INTEGER_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.DECIMAL_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.DOUBLE_NEGATIVE); } },
            ]);
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.TRUE); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.FALSE); } },
            ]);
        });
        _this.BlankNode = _this.RULE('BlankNode', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.ANON); } },
            ]);
        });
        _this.GraphNode = _this.RULE('GraphNode', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.VarOrTerm); } },
                { ALT: function () { return _this.SUBRULE(_this.TriplesNode); } },
            ]);
        });
        _this.Var = _this.RULE('Var', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.VAR1); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.VAR2); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(smsTokenMap.STRING_LITERAL1); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.STRING_LITERAL2); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.STRING_LITERAL_LONG1); } },
                { ALT: function () { return _this.CONSUME(smsTokenMap.STRING_LITERAL_LONG2); } },
            ]);
        });
        _this.lexer = new Lexer(smsTokenTypes);
        Parser.performSelfAnalysis(_this);
        return _this;
    }
    return SmsParser;
}(Parser));

var traverse = function (root, visit) {
    _traverse(root, null, visit);
};
function isCstNode(object) {
    return 'name' in object;
}
var TraverseContext = /** @class */ (function () {
    function TraverseContext(_a) {
        var node = _a.node, parentCtx = _a.parentCtx;
        this.node = __assign({}, node);
        this.parentCtx = __assign({}, parentCtx);
    }
    return TraverseContext;
}());
var _traverse = function (root, ctx, visit) {
    if (ctx === void 0) { ctx = new TraverseContext({ node: root }); }
    if (!isCstNode(root)) {
        // must be a token
        // make sure to give user a copy
        return visit(__assign({}, ctx));
    }
    // is a grammar rule node
    var children = root.children;
    Object.keys(children).forEach(function (key) {
        var childType = children[key];
        if (!childType.length) {
            return;
        }
        childType.forEach(function (child) {
            var childCtx = new TraverseContext({ node: child, parentCtx: ctx });
            var afterVisit = function (transformedCtx) {
                var nextCtx = transformedCtx
                    ? new TraverseContext({
                        node: transformedCtx.node,
                        parentCtx: transformedCtx.parentCtx,
                    })
                    : childCtx;
                _traverse(child, nextCtx, visit);
            };
            visit(childCtx, afterVisit);
        });
    });
};

export { tokens as sparqlTokens, tokens$1 as turtleTokens, tokens$2 as smsTokens, keywords as sparqlKeywords, terminals as sparqlTerminals, matchers, BaseSparqlParser, StardogSparqlParser, W3SpecSparqlParser, TurtleParser, SmsParser, traverse, isCstNode };
