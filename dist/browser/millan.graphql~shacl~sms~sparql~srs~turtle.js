((typeof self !== 'undefined' ? self : this)["webpackJsonp"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] || []).push([["graphql~shacl~sms~sparql~srs~turtle"],{

/***/ "./src/helpers/matchers.ts":
/*!*********************************!*\
  !*** ./src/helpers/matchers.ts ***!
  \*********************************/
/*! exports provided: CATCH_ALL, CATCH_ALL_AT_LEAST_ONE, IRIREF, PN_CHARS_BASE, LANGTAG, INTEGER, DECIMAL, EXPONENT, ECHAR, WS, HEX, PN_LOCAL_ESC, PN_CHARS_U, PN_CHARS, PN_PREFIX, PERCENT, PLX, PN_LOCAL, VARNAME, ANON, NIL, STRING_LITERAL1, STRING_LITERAL2, STRING_LITERAL_LONG1, STRING_LITERAL_LONG2, DOUBLE, INTEGER_POSITIVE, DECIMAL_POSITIVE, DOUBLE_POSITIVE, INTEGER_NEGATIVE, DECIMAL_NEGATIVE, DOUBLE_NEGATIVE, VAR1, VAR2, BLANK_NODE_LABEL, PNAME_NS, PNAME_LN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATCH_ALL", function() { return CATCH_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATCH_ALL_AT_LEAST_ONE", function() { return CATCH_ALL_AT_LEAST_ONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IRIREF", function() { return IRIREF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PN_CHARS_BASE", function() { return PN_CHARS_BASE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANGTAG", function() { return LANGTAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTEGER", function() { return INTEGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECIMAL", function() { return DECIMAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPONENT", function() { return EXPONENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ECHAR", function() { return ECHAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WS", function() { return WS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEX", function() { return HEX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PN_LOCAL_ESC", function() { return PN_LOCAL_ESC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PN_CHARS_U", function() { return PN_CHARS_U; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PN_CHARS", function() { return PN_CHARS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PN_PREFIX", function() { return PN_PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERCENT", function() { return PERCENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLX", function() { return PLX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PN_LOCAL", function() { return PN_LOCAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VARNAME", function() { return VARNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANON", function() { return ANON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NIL", function() { return NIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING_LITERAL1", function() { return STRING_LITERAL1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING_LITERAL2", function() { return STRING_LITERAL2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING_LITERAL_LONG1", function() { return STRING_LITERAL_LONG1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STRING_LITERAL_LONG2", function() { return STRING_LITERAL_LONG2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOUBLE", function() { return DOUBLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTEGER_POSITIVE", function() { return INTEGER_POSITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECIMAL_POSITIVE", function() { return DECIMAL_POSITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOUBLE_POSITIVE", function() { return DOUBLE_POSITIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTEGER_NEGATIVE", function() { return INTEGER_NEGATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DECIMAL_NEGATIVE", function() { return DECIMAL_NEGATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOUBLE_NEGATIVE", function() { return DOUBLE_NEGATIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VAR1", function() { return VAR1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VAR2", function() { return VAR2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLANK_NODE_LABEL", function() { return BLANK_NODE_LABEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PNAME_NS", function() { return PNAME_NS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PNAME_LN", function() { return PNAME_LN; });
/* harmony import */ var _regex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex */ "./src/helpers/regex.ts");

var CATCH_ALL = /[\s\S]*/; // equivalent to /.*/s, which isn't a JS standard yet
var CATCH_ALL_AT_LEAST_ONE = /[\s\S]+/; // equivalent to /.+/s, which isn't a JS standard yet
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
var PN_CHARS_U = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS_BASE, /_/);
var PN_CHARS = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS_U, /-/, /\d/, /\u00b7/, /[\u0300-\u036f]/, /[\u203f-\u2040]/);
var PN_PREFIX = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(PN_CHARS_BASE, _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].option(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS, /\./)), PN_CHARS)));
var PERCENT = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/%/, HEX, HEX);
var PLX = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PERCENT, PN_LOCAL_ESC);
var PN_LOCAL = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS_U, /:/, /\d/, PLX), _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].option(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS, /\./, /:/, PLX)), _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS, /:/, PLX))));
var VARNAME = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS_U, /\d/), _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS_U, /\d/, /\u00b7/, /[\u0300-\u036f]/, /[\u203f-\u2040]/)));
var ANON = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\[/, _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(WS), /\]/);
var NIL = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\(/, _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(WS), /\)/);
var STRING_LITERAL1 = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/'/, _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(/[^\u0027\u005C\u000A\u000D]/, ECHAR)), /'/);
var STRING_LITERAL2 = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/"/, _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(/[^\u0022\u005C\u000A\u000D]/, ECHAR)), /"/);
var STRING_LITERAL_LONG1 = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/'''/, _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].option(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(/'/, /''/)), _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(/[^'\\]/, ECHAR))), /'''/);
var STRING_LITERAL_LONG2 = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/"""/, _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].option(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(/"/, /""/)), _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(/[^"\\]/, ECHAR))), /"""/);
var DOUBLE = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\d+\.\d*/, EXPONENT), _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\.\d+/, EXPONENT), _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\d+/, EXPONENT));
var INTEGER_POSITIVE = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\+/, INTEGER);
var DECIMAL_POSITIVE = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\+/, DECIMAL);
var DOUBLE_POSITIVE = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\+/, DOUBLE);
var INTEGER_NEGATIVE = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/-/, INTEGER);
var DECIMAL_NEGATIVE = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/-/, DECIMAL);
var DOUBLE_NEGATIVE = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/-/, DOUBLE);
var VAR1 = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\?/, VARNAME);
var VAR2 = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/\$/, VARNAME);
var BLANK_NODE_LABEL = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(/_:/, _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS_U, /\d/), _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].option(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].many(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].or(PN_CHARS, /\./)), PN_CHARS)));
var PNAME_NS = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(_regex__WEBPACK_IMPORTED_MODULE_0__["regex"].option(PN_PREFIX), /:/);
var PNAME_LN = _regex__WEBPACK_IMPORTED_MODULE_0__["regex"].and(PNAME_NS, PN_LOCAL);


/***/ }),

/***/ "./src/helpers/regex.ts":
/*!******************************!*\
  !*** ./src/helpers/regex.ts ***!
  \******************************/
/*! exports provided: regex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return regex; });
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


/***/ }),

/***/ "./src/sparql/keywords.ts":
/*!********************************!*\
  !*** ./src/sparql/keywords.ts ***!
  \********************************/
/*! exports provided: keywords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keywords", function() { return keywords; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
// @ts-ignore: import types for declarations

var MAX_LENGTH = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'MAX_LENGTH',
    pattern: /MAX LENGTH/i,
});
var keywords = {
    SELECT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SELECT',
        pattern: /SELECT/i,
    }),
    CONSTRUCT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'CONSTRUCT',
        pattern: /CONSTRUCT/i,
    }),
    DISTINCT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DISTINCT',
        pattern: /DISTINCT/i,
    }),
    START: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'START',
        pattern: /START/i,
    }),
    END: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'END',
        pattern: /END/i,
    }),
    VIA: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'VIA',
        pattern: /VIA/i,
    }),
    PATHS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'PATHS',
        pattern: /PATHS/i,
    }),
    PATHS_ALL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'PATHS_ALL',
        pattern: /PATHS ALL/i,
    }),
    PATHS_SHORTEST: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'PATHS_SHORTEST',
        pattern: /PATHS SHORTEST/i,
    }),
    CYCLIC: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'CYCLIC',
        pattern: /CYCLIC/i,
    }),
    AS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'AS',
        pattern: /AS/i,
    }),
    WHERE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'WHERE',
        pattern: /WHERE/i,
    }),
    A: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'A',
        pattern: /a/i,
    }),
    GroupBy: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'GroupBy',
        pattern: /group by/i,
    }),
    OrderBy: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'OrderBy',
        pattern: /order by/i,
    }),
    By: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'By',
        pattern: /By/i,
    }),
    BASE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'BASE',
        pattern: /BASE/i,
    }),
    PREFIX: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'PREFIX',
        pattern: /PREFIX/i,
    }),
    DESCRIBE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DESCRIBE',
        pattern: /DESCRIBE/i,
    }),
    ASK: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ASK',
        pattern: /ASK/i,
    }),
    FROM: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'FROM',
        pattern: /FROM/i,
    }),
    REDUCED: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'REDUCED',
        pattern: /REDUCED/i,
    }),
    NAMED: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'NAMED',
        pattern: /NAMED/i,
    }),
    HAVING: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'HAVING',
        pattern: /HAVING/i,
    }),
    ASC: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ASC',
        pattern: /ASC/i,
    }),
    DESC: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DESC',
        pattern: /DESC/i,
    }),
    OFFSET: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'OFFSET',
        pattern: /OFFSET/i,
    }),
    LIMIT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LIMIT',
        pattern: /LIMIT/i,
    }),
    VALUES: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'VALUES',
        pattern: /VALUES/i,
    }),
    LOAD: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LOAD',
        pattern: /LOAD/i,
    }),
    SILENT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SILENT',
        pattern: /SILENT/i,
    }),
    INTO: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'INTO',
        pattern: /INTO/i,
    }),
    CLEAR: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'CLEAR',
        pattern: /CLEAR/i,
    }),
    DROP: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DROP',
        pattern: /DROP/i,
    }),
    CREATE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'CREATE',
        pattern: /CREATE/i,
    }),
    ADD: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ADD',
        pattern: /ADD/i,
    }),
    TO: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'TO',
        pattern: /TO/i,
    }),
    MOVE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'MOVE',
        pattern: /MOVE/i,
    }),
    COPY: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'COPY',
        pattern: /COPY/i,
    }),
    INSERT_DATA: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'INSERT_DATA',
        pattern: /Insert +Data/i,
    }),
    DELETE_DATA: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DELETE_DATA',
        pattern: /Delete +Data/i,
    }),
    DELETE_WHERE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DELETE_WHERE',
        pattern: /Delete +Where/i,
    }),
    WITH: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'WITH',
        pattern: /WITH/i,
    }),
    DELETE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DELETE',
        pattern: /DELETE/i,
    }),
    INSERT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'INSERT',
        pattern: /INSERT/i,
    }),
    USING: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'USING',
        pattern: /USING/i,
    }),
    DEFAULT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DEFAULT',
        pattern: /DEFAULT/i,
    }),
    GRAPH: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'GRAPH',
        pattern: /GRAPH/i,
    }),
    ALL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ALL',
        pattern: /ALL/i,
    }),
    OPTIONAL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'OPTIONAL',
        pattern: /OPTIONAL/i,
    }),
    SERVICE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SERVICE',
        pattern: /SERVICE/i,
    }),
    BIND: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'BIND',
        pattern: /BIND/i,
    }),
    UNNEST: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'UNNEST',
        pattern: /UNNEST/i,
    }),
    UNDEF: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'UNDEF',
        pattern: /UNDEF/i,
    }),
    MINUS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'MINUS',
        pattern: /MINUS/i,
    }),
    UNION: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'UNION',
        pattern: /UNION/i,
    }),
    FILTER: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'FILTER',
        pattern: /FILTER/i,
    }),
    STR: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STR',
        pattern: /STR/i,
    }),
    LANG: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LANG',
        pattern: /LANG/i,
    }),
    LANGMATCHES: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LANGMATCHES',
        pattern: /LANGMATCHES/i,
    }),
    DATATYPE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DATATYPE',
        pattern: /DATATYPE/i,
    }),
    BOUND: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'BOUND',
        pattern: /BOUND/i,
    }),
    IRI: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'IRI',
        pattern: /IRI/i,
    }),
    URI: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'URI',
        pattern: /URI/i,
    }),
    BNODE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'BNODE',
        pattern: /BNODE/i,
    }),
    RAND: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'RAND',
        pattern: /RAND/i,
    }),
    ABS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ABS',
        pattern: /ABS/i,
    }),
    CEIL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'CEIL',
        pattern: /CEIL/i,
    }),
    FLOOR: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'FLOOR',
        pattern: /FLOOR/i,
    }),
    ROUND: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ROUND',
        pattern: /ROUND/i,
    }),
    CONCAT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'CONCAT',
        pattern: /CONCAT/i,
    }),
    STRLEN: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRLEN',
        pattern: /STRLEN/i,
    }),
    UCASE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'UCASE',
        pattern: /UCASE/i,
    }),
    LCASE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LCASE',
        pattern: /LCASE/i,
    }),
    ENCODE_FOR_URI: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ENCODE_FOR_URI',
        pattern: /ENCODE_FOR_URI/i,
    }),
    CONTAINS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'CONTAINS',
        pattern: /CONTAINS/i,
    }),
    STRSTARTS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRSTARTS',
        pattern: /STRSTARTS/i,
    }),
    STRENDS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRENDS',
        pattern: /STRENDS/i,
    }),
    STRBEFORE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRBEFORE',
        pattern: /STRBEFORE/i,
    }),
    STRAFTER: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRAFTER',
        pattern: /STRAFTER/i,
    }),
    YEAR: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'YEAR',
        pattern: /YEAR/i,
    }),
    MONTH: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'MONTH',
        pattern: /MONTH/i,
    }),
    DAY: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DAY',
        pattern: /DAY/i,
    }),
    HOURS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'HOURS',
        pattern: /HOURS/i,
    }),
    MINUTES: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'MINUTES',
        pattern: /MINUTES/i,
    }),
    SECONDS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SECONDS',
        pattern: /SECONDS/i,
    }),
    TIMEZONE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'TIMEZONE',
        pattern: /TIMEZONE/i,
    }),
    TZ: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'TZ',
        pattern: /TZ/i,
    }),
    NOW: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'NOW',
        pattern: /NOW/i,
    }),
    UUID: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'UUID',
        pattern: /UUID/i,
    }),
    STRUUID: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRUUID',
        pattern: /STRUUID/i,
    }),
    MD5: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'MD5',
        pattern: /MD5/i,
    }),
    SHA1: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SHA1',
        pattern: /SHA1/i,
    }),
    SHA256: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SHA256',
        pattern: /SHA256/i,
    }),
    SHA384: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SHA384',
        pattern: /SHA384/i,
    }),
    SHA512: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SHA512',
        pattern: /SHA512/i,
    }),
    COALESCE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'COALESCE',
        pattern: /COALESCE/i,
    }),
    IF: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'IF',
        pattern: /IF/i,
    }),
    STRLANG: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRLANG',
        pattern: /STRLANG/i,
    }),
    STRDT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRDT',
        pattern: /STRDT/i,
    }),
    sameTerm: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'sameTerm',
        pattern: /sameTerm/i,
    }),
    isIRI: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'isIRI',
        pattern: /isIRI/i,
    }),
    isURI: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'isURI',
        pattern: /isURI/i,
    }),
    isBlank: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'isBlank',
        pattern: /isBlank/i,
    }),
    isLiteral: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'isLiteral',
        pattern: /isLiteral/i,
    }),
    isNumeric: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'isNumeric',
        pattern: /isNumeric/i,
    }),
    REGEX: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'REGEX',
        pattern: /REGEX/i,
    }),
    SUBSTR: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SUBSTR',
        pattern: /SUBSTR/i,
    }),
    REPLACE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'REPLACE',
        pattern: /REPLACE/i,
    }),
    EXISTS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'EXISTS',
        pattern: /EXISTS/i,
    }),
    NOT_EXISTS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'NOT_EXISTS',
        pattern: /NOT EXISTS/i,
    }),
    COUNT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'COUNT',
        pattern: /COUNT/i,
    }),
    SUM: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SUM',
        pattern: /SUM/i,
    }),
    MIN: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'MIN',
        pattern: /MIN/i,
    }),
    AVG: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'AVG',
        pattern: /AVG/i,
    }),
    SAMPLE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SAMPLE',
        pattern: /SAMPLE/i,
    }),
    GROUP_CONCAT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'GROUP_CONCAT',
        pattern: /GROUP_CONCAT/i,
    }),
    SEPARATOR: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SEPARATOR',
        pattern: /SEPARATOR/i,
    }),
    TRUE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'TRUE',
        pattern: /TRUE/i,
    }),
    FALSE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'FALSE',
        pattern: /FALSE/i,
    }),
    IN: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'IN',
        pattern: /IN/i,
    }),
    NOT_IN: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'NOT_IN',
        pattern: /NOT IN/i,
    }),
    MAX_LENGTH: MAX_LENGTH,
    MAX: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'MAX',
        pattern: /MAX/i,
        longer_alt: MAX_LENGTH,
    }),
};


/***/ }),

/***/ "./src/sparql/terminals.ts":
/*!*********************************!*\
  !*** ./src/sparql/terminals.ts ***!
  \*********************************/
/*! exports provided: terminals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "terminals", function() { return terminals; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var helpers_matchers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! helpers/matchers */ "./src/helpers/matchers.ts");
// @ts-ignore: import types for declarations


var STRING_LITERAL_LONG1_TOKEN = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'STRING_LITERAL_LONG1',
    pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["STRING_LITERAL_LONG1"],
});
var STRING_LITERAL_LONG2_TOKEN = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'STRING_LITERAL_LONG2',
    pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["STRING_LITERAL_LONG2"],
});
var PNAME_LN_TOKEN = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'PNAME_LN',
    pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["PNAME_LN"],
});
var terminals = {
    IRIREF: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'IRIREF',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["IRIREF"],
        label: '<http://example.com>',
    }),
    LANGTAG: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LANGTAG',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["LANGTAG"],
    }),
    INTEGER: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'INTEGER',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["INTEGER"],
    }),
    DECIMAL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DECIMAL',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["DECIMAL"],
    }),
    DOUBLE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DOUBLE',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["DOUBLE"],
    }),
    INTEGER_POSITIVE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'INTEGER_POSITIVE',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["INTEGER_POSITIVE"],
    }),
    DECIMAL_POSITIVE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DECIMAL_POSITIVE',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["DECIMAL_POSITIVE"],
    }),
    DOUBLE_POSITIVE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DOUBLE_POSITIVE',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["DOUBLE_POSITIVE"],
    }),
    INTEGER_NEGATIVE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'INTEGER_NEGATIVE',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["INTEGER_NEGATIVE"],
    }),
    DECIMAL_NEGATIVE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DECIMAL_NEGATIVE',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["DECIMAL_NEGATIVE"],
    }),
    DOUBLE_NEGATIVE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DOUBLE_NEGATIVE',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["DOUBLE_NEGATIVE"],
    }),
    STRING_LITERAL_LONG1: STRING_LITERAL_LONG1_TOKEN,
    STRING_LITERAL_LONG2: STRING_LITERAL_LONG2_TOKEN,
    STRING_LITERAL1: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRING_LITERAL1',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["STRING_LITERAL1"],
        longer_alt: STRING_LITERAL_LONG1_TOKEN,
    }),
    STRING_LITERAL2: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRING_LITERAL2',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["STRING_LITERAL2"],
        longer_alt: STRING_LITERAL_LONG2_TOKEN,
    }),
    NIL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'NIL',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["NIL"],
        label: '()',
    }),
    ANON: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ANON',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["ANON"],
        label: '[]',
    }),
    PNAME_LN: PNAME_LN_TOKEN,
    PNAME_NS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'PNAME_NS',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["PNAME_NS"],
        longer_alt: PNAME_LN_TOKEN,
    }),
    BLANK_NODE_LABEL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'BLANK_NODE_LABEL',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["BLANK_NODE_LABEL"],
    }),
    VAR1: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'VAR1',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["VAR1"],
        label: '?foo',
    }),
    VAR2: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'VAR2',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["VAR2"],
        label: '?bar',
    }),
    PERCENT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'PERCENT',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["PERCENT"],
    }),
};


/***/ }),

/***/ "./src/sparql/tokens.ts":
/*!******************************!*\
  !*** ./src/sparql/tokens.ts ***!
  \******************************/
/*! exports provided: sparqlTokenMap, baseTokens, pathsTokens, nonStandardTokens, stardogSparqlTokens, sparqlTokenTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sparqlTokenMap", function() { return sparqlTokenMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseTokens", function() { return baseTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pathsTokens", function() { return pathsTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nonStandardTokens", function() { return nonStandardTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stardogSparqlTokens", function() { return stardogSparqlTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sparqlTokenTypes", function() { return sparqlTokenTypes; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _terminals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./terminals */ "./src/sparql/terminals.ts");
/* harmony import */ var _keywords__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keywords */ "./src/sparql/keywords.ts");
// @ts-ignore: import types for declarations



var sparqlTokenMap = {
    IRIREF: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].IRIREF,
    LANGTAG: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].LANGTAG,
    INTEGER: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].INTEGER,
    DECIMAL: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].DECIMAL,
    DOUBLE: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].DOUBLE,
    INTEGER_POSITIVE: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].INTEGER_POSITIVE,
    DECIMAL_POSITIVE: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].DECIMAL_POSITIVE,
    DOUBLE_POSITIVE: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].DOUBLE_POSITIVE,
    INTEGER_NEGATIVE: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].INTEGER_NEGATIVE,
    DECIMAL_NEGATIVE: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].DECIMAL_NEGATIVE,
    DOUBLE_NEGATIVE: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].DOUBLE_NEGATIVE,
    STRING_LITERAL1: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].STRING_LITERAL1,
    STRING_LITERAL2: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].STRING_LITERAL2,
    STRING_LITERAL_LONG1: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].STRING_LITERAL_LONG1,
    STRING_LITERAL_LONG2: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].STRING_LITERAL_LONG2,
    NIL: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].NIL,
    ANON: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].ANON,
    PNAME_NS: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].PNAME_NS,
    PNAME_LN: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].PNAME_LN,
    BLANK_NODE_LABEL: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].BLANK_NODE_LABEL,
    VAR1: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].VAR1,
    VAR2: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].VAR2,
    PERCENT: _terminals__WEBPACK_IMPORTED_MODULE_1__["terminals"].PERCENT,
    Comment: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Comment',
        pattern: /#[^\n]*/,
        group: 'comments',
    }),
    LCurly: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'LCurly', pattern: '{' }),
    RCurly: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'RCurly', pattern: '}' }),
    LParen: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'LParen', pattern: '(' }),
    RParen: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'RParen', pattern: ')' }),
    WhiteSpace: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'WhiteSpace',
        pattern: /\s+/,
        group: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].SKIPPED,
        line_breaks: true,
    }),
    Star: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Star',
        pattern: '*',
    }),
    Unknown: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Unknown',
        pattern: /\w+/,
    }),
    Period: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Period',
        pattern: '.',
    }),
    QuestionMark: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'QuestionMark',
        pattern: '?',
    }),
    Plus: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Plus',
        pattern: '+',
    }),
    Minus: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Minus',
        pattern: '-',
    }),
    LBracket: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LBracket',
        pattern: '[',
    }),
    RBracket: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'RBracket',
        pattern: ']',
    }),
    Semicolon: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Semicolon',
        pattern: ';',
    }),
    Comma: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Comma',
        pattern: ',',
    }),
    Pipe: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Pipe',
        pattern: '|',
    }),
    ForwardSlash: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ForwardSlash',
        pattern: '/',
    }),
    Caret: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Caret',
        pattern: '^',
    }),
    DoubleCaret: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DoubleCaret',
        pattern: '^^',
    }),
    Bang: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Bang',
        pattern: '!',
    }),
    LogicalOr: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LogicalOr',
        pattern: '||',
    }),
    LogicalAnd: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LogicalAnd',
        pattern: '&&',
    }),
    Equals: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Equals',
        pattern: '=',
    }),
    NotEquals: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'NotEquals',
        pattern: '!=',
    }),
    LessThan: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LessThan',
        pattern: '<',
    }),
    GreaterThan: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'GreaterThan',
        pattern: '>',
    }),
    LessThanEquals: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LessThanEquals',
        pattern: '<=',
    }),
    GreaterThanEquals: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'GreaterThanEquals',
        pattern: '>=',
    }),
    SELECT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SELECT,
    CONSTRUCT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].CONSTRUCT,
    DISTINCT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DISTINCT,
    START: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].START,
    END: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].END,
    VIA: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].VIA,
    CYCLIC: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].CYCLIC,
    PATHS_SHORTEST: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].PATHS_SHORTEST,
    PATHS_ALL: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].PATHS_ALL,
    PATHS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].PATHS,
    AS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].AS,
    WHERE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].WHERE,
    A: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].A,
    GroupBy: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].GroupBy,
    OrderBy: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].OrderBy,
    By: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].By,
    BASE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].BASE,
    PREFIX: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].PREFIX,
    DESCRIBE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DESCRIBE,
    ASK: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].ASK,
    FROM: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].FROM,
    REDUCED: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].REDUCED,
    NAMED: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].NAMED,
    HAVING: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].HAVING,
    ASC: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].ASC,
    DESC: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DESC,
    OFFSET: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].OFFSET,
    LIMIT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].LIMIT,
    VALUES: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].VALUES,
    LOAD: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].LOAD,
    SILENT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SILENT,
    INTO: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].INTO,
    CLEAR: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].CLEAR,
    DROP: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DROP,
    CREATE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].CREATE,
    ADD: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].ADD,
    TO: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].TO,
    MOVE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].MOVE,
    COPY: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].COPY,
    INSERT_DATA: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].INSERT_DATA,
    DELETE_DATA: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DELETE_DATA,
    DELETE_WHERE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DELETE_WHERE,
    WITH: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].WITH,
    DELETE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DELETE,
    INSERT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].INSERT,
    USING: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].USING,
    DEFAULT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DEFAULT,
    GRAPH: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].GRAPH,
    ALL: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].ALL,
    OPTIONAL: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].OPTIONAL,
    SERVICE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SERVICE,
    BIND: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].BIND,
    UNNEST: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].UNNEST,
    UNDEF: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].UNDEF,
    MINUS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].MINUS,
    UNION: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].UNION,
    FILTER: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].FILTER,
    STR: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STR,
    LANG: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].LANG,
    LANGMATCHES: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].LANGMATCHES,
    DATATYPE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DATATYPE,
    BOUND: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].BOUND,
    IRI: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].IRI,
    URI: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].URI,
    BNODE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].BNODE,
    RAND: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].RAND,
    ABS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].ABS,
    CEIL: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].CEIL,
    FLOOR: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].FLOOR,
    ROUND: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].ROUND,
    CONCAT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].CONCAT,
    STRLEN: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STRLEN,
    UCASE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].UCASE,
    LCASE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].LCASE,
    ENCODE_FOR_URI: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].ENCODE_FOR_URI,
    CONTAINS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].CONTAINS,
    STRSTARTS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STRSTARTS,
    STRENDS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STRENDS,
    STRBEFORE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STRBEFORE,
    STRAFTER: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STRAFTER,
    YEAR: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].YEAR,
    MONTH: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].MONTH,
    DAY: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].DAY,
    HOURS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].HOURS,
    MINUTES: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].MINUTES,
    SECONDS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SECONDS,
    TIMEZONE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].TIMEZONE,
    TZ: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].TZ,
    NOW: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].NOW,
    UUID: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].UUID,
    STRUUID: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STRUUID,
    MD5: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].MD5,
    SHA1: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SHA1,
    SHA256: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SHA256,
    SHA384: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SHA384,
    SHA512: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SHA512,
    COALESCE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].COALESCE,
    IF: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].IF,
    STRLANG: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STRLANG,
    STRDT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].STRDT,
    sameTerm: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].sameTerm,
    isIRI: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].isIRI,
    isURI: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].isURI,
    isBlank: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].isBlank,
    isLiteral: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].isLiteral,
    isNumeric: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].isNumeric,
    REGEX: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].REGEX,
    SUBSTR: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SUBSTR,
    REPLACE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].REPLACE,
    EXISTS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].EXISTS,
    NOT_EXISTS: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].NOT_EXISTS,
    COUNT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].COUNT,
    SUM: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SUM,
    MIN: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].MIN,
    AVG: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].AVG,
    SAMPLE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SAMPLE,
    GROUP_CONCAT: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].GROUP_CONCAT,
    SEPARATOR: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].SEPARATOR,
    TRUE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].TRUE,
    FALSE: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].FALSE,
    IN: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].IN,
    NOT_IN: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].NOT_IN,
    MAX_LENGTH: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].MAX_LENGTH,
    MAX: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].MAX,
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
    sparqlTokenMap.LANGMATCHES,
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
var nonStandardTokens = pathsTokens.concat([sparqlTokenMap.UNNEST]);
var indexOfSelect = baseTokens.indexOf(sparqlTokenMap.SELECT);
var stardogSparqlTokens = baseTokens.slice(0, indexOfSelect).concat(nonStandardTokens, baseTokens.slice(indexOfSelect));
var sparqlTokenTypes = baseTokens.concat(nonStandardTokens);


/***/ })

}]);
//# sourceMappingURL=millan.graphql~shacl~sms~sparql~srs~turtle.js.map