((typeof self !== 'undefined' ? self : this)["webpackJsonp"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] || []).push([["graphql~shacl~sms~sparql~srs~trig~turtle"],{

/***/ "./src/helpers/chevrotain/tokens.ts":
/*!******************************************!*\
  !*** ./src/helpers/chevrotain/tokens.ts ***!
  \******************************************/
/*! exports provided: createKeyword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createKeyword", function() { return createKeyword; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};

var createKeyword = function (_a) {
    var name = _a.name, pattern = _a.pattern, props = __rest(_a, ["name", "pattern"]);
    return Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])(__assign({ name: name, pattern: pattern || new RegExp(name, 'i') }, props));
};


/***/ }),

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
/*! exports provided: createKeyword, keywords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createKeyword", function() { return createKeyword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keywords", function() { return keywords; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var helpers_chevrotain_tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! helpers/chevrotain/tokens */ "./src/helpers/chevrotain/tokens.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};


var createKeyword = function (_a) {
    var _b = _a.longer_alt, longer_alt = _b === void 0 ? UNKNOWN : _b, props = __rest(_a, ["longer_alt"]);
    return Object(helpers_chevrotain_tokens__WEBPACK_IMPORTED_MODULE_1__["createKeyword"])(__assign({ longer_alt: longer_alt }, props));
};
var UNKNOWN = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'UNKNOWN', pattern: /\w+/i });
var keywords = {
    SELECT: createKeyword({ name: 'SELECT' }),
    CONSTRUCT: createKeyword({ name: 'CONSTRUCT' }),
    DISTINCT: createKeyword({ name: 'DISTINCT' }),
    START: createKeyword({ name: 'START' }),
    END: createKeyword({ name: 'END' }),
    VIA: createKeyword({ name: 'VIA' }),
    PATHS: createKeyword({ name: 'PATHS' }),
    PATHS_ALL: createKeyword({
        name: 'PATHS_ALL',
        pattern: /PATHS ALL/i,
    }),
    PATHS_SHORTEST: createKeyword({
        name: 'PATHS_SHORTEST',
        pattern: /PATHS SHORTEST/i,
    }),
    CYCLIC: createKeyword({ name: 'CYCLIC' }),
    AS: createKeyword({ name: 'AS' }),
    WHERE: createKeyword({ name: 'WHERE' }),
    A: createKeyword({ name: 'A', pattern: /a/ }),
    GROUP_BY: createKeyword({
        name: 'GROUP_BY',
        pattern: /GROUP BY/i,
    }),
    ORDER_BY: createKeyword({
        name: 'ORDER_BY',
        pattern: /ORDER BY/i,
    }),
    BY: createKeyword({ name: 'BY' }),
    BASE: createKeyword({ name: 'BASE' }),
    PREFIX: createKeyword({ name: 'PREFIX' }),
    DESCRIBE: createKeyword({ name: 'DESCRIBE' }),
    ASK: createKeyword({ name: 'ASK' }),
    FROM: createKeyword({ name: 'FROM' }),
    REDUCED: createKeyword({ name: 'REDUCED' }),
    NAMED: createKeyword({ name: 'NAMED' }),
    HAVING: createKeyword({ name: 'HAVING' }),
    ASC: createKeyword({ name: 'ASC' }),
    DESC: createKeyword({ name: 'DESC' }),
    OFFSET: createKeyword({ name: 'OFFSET' }),
    LIMIT: createKeyword({ name: 'LIMIT' }),
    VALUES: createKeyword({ name: 'VALUES' }),
    LOAD: createKeyword({ name: 'LOAD' }),
    SILENT: createKeyword({ name: 'SILENT' }),
    INTO: createKeyword({ name: 'INTO' }),
    CLEAR: createKeyword({ name: 'CLEAR' }),
    DROP: createKeyword({ name: 'DROP' }),
    CREATE: createKeyword({ name: 'CREATE' }),
    ADD: createKeyword({ name: 'ADD' }),
    TO: createKeyword({ name: 'TO' }),
    MOVE: createKeyword({ name: 'MOVE' }),
    COPY: createKeyword({ name: 'COPY' }),
    INSERT_DATA: createKeyword({
        name: 'INSERT_DATA',
        pattern: /INSERT +DATA/i,
    }),
    DELETE_DATA: createKeyword({
        name: 'DELETE_DATA',
        pattern: /DELETE +DATA/i,
    }),
    DELETE_WHERE: createKeyword({
        name: 'DELETE_WHERE',
        pattern: /DELETE +WHERE/i,
    }),
    WITH: createKeyword({ name: 'WITH' }),
    DELETE: createKeyword({ name: 'DELETE' }),
    INSERT: createKeyword({ name: 'INSERT' }),
    USING: createKeyword({ name: 'USING' }),
    DEFAULT: createKeyword({ name: 'DEFAULT' }),
    GRAPH: createKeyword({ name: 'GRAPH' }),
    ALL: createKeyword({ name: 'ALL' }),
    OPTIONAL: createKeyword({ name: 'OPTIONAL' }),
    SERVICE: createKeyword({ name: 'SERVICE' }),
    BIND: createKeyword({ name: 'BIND' }),
    UNNEST: createKeyword({ name: 'UNNEST' }),
    UNDEF: createKeyword({ name: 'UNDEF' }),
    MINUS: createKeyword({ name: 'MINUS' }),
    UNION: createKeyword({ name: 'UNION' }),
    FILTER: createKeyword({ name: 'FILTER' }),
    STR: createKeyword({ name: 'STR' }),
    LANG: createKeyword({ name: 'LANG' }),
    LANGMATCHES: createKeyword({ name: 'LANGMATCHES' }),
    DATATYPE: createKeyword({ name: 'DATATYPE' }),
    BOUND: createKeyword({ name: 'BOUND' }),
    IRI: createKeyword({ name: 'IRI' }),
    URI: createKeyword({ name: 'URI' }),
    BNODE: createKeyword({ name: 'BNODE' }),
    RAND: createKeyword({ name: 'RAND' }),
    ABS: createKeyword({ name: 'ABS' }),
    CEIL: createKeyword({ name: 'CEIL' }),
    FLOOR: createKeyword({ name: 'FLOOR' }),
    ROUND: createKeyword({ name: 'ROUND' }),
    CONCAT: createKeyword({ name: 'CONCAT' }),
    STRLEN: createKeyword({ name: 'STRLEN' }),
    UCASE: createKeyword({ name: 'UCASE' }),
    LCASE: createKeyword({ name: 'LCASE' }),
    ENCODE_FOR_URI: createKeyword({ name: 'ENCODE_FOR_URI' }),
    CONTAINS: createKeyword({ name: 'CONTAINS' }),
    STRSTARTS: createKeyword({ name: 'STRSTARTS' }),
    STRENDS: createKeyword({ name: 'STRENDS' }),
    STRBEFORE: createKeyword({ name: 'STRBEFORE' }),
    STRAFTER: createKeyword({ name: 'STRAFTER' }),
    YEAR: createKeyword({ name: 'YEAR' }),
    MONTH: createKeyword({ name: 'MONTH' }),
    DAY: createKeyword({ name: 'DAY' }),
    HOURS: createKeyword({ name: 'HOURS' }),
    MINUTES: createKeyword({ name: 'MINUTES' }),
    SECONDS: createKeyword({ name: 'SECONDS' }),
    TIMEZONE: createKeyword({ name: 'TIMEZONE' }),
    TZ: createKeyword({ name: 'TZ' }),
    NOW: createKeyword({ name: 'NOW' }),
    UUID: createKeyword({ name: 'UUID' }),
    STRUUID: createKeyword({ name: 'STRUUID' }),
    MD5: createKeyword({ name: 'MD5' }),
    SHA1: createKeyword({ name: 'SHA1' }),
    SHA256: createKeyword({ name: 'SHA256' }),
    SHA384: createKeyword({ name: 'SHA384' }),
    SHA512: createKeyword({ name: 'SHA512' }),
    COALESCE: createKeyword({ name: 'COALESCE' }),
    IF: createKeyword({ name: 'IF' }),
    STRLANG: createKeyword({ name: 'STRLANG' }),
    STRDT: createKeyword({ name: 'STRDT' }),
    sameTerm: createKeyword({ name: 'sameTerm' }),
    isIRI: createKeyword({ name: 'isIRI' }),
    isURI: createKeyword({ name: 'isURI' }),
    isBLANK: createKeyword({ name: 'isBLANK' }),
    isLITERAL: createKeyword({ name: 'isLITERAL' }),
    isNUMERIC: createKeyword({ name: 'isNUMERIC' }),
    REGEX: createKeyword({ name: 'REGEX' }),
    SUBSTR: createKeyword({ name: 'SUBSTR' }),
    REPLACE: createKeyword({ name: 'REPLACE' }),
    EXISTS: createKeyword({ name: 'EXISTS' }),
    NOT_EXISTS: createKeyword({
        name: 'NOT_EXISTS',
        pattern: /NOT EXISTS/i,
    }),
    COUNT: createKeyword({ name: 'COUNT' }),
    SUM: createKeyword({ name: 'SUM' }),
    MIN: createKeyword({ name: 'MIN' }),
    AVG: createKeyword({ name: 'AVG' }),
    SAMPLE: createKeyword({ name: 'SAMPLE' }),
    GROUP_CONCAT: createKeyword({ name: 'GROUP_CONCAT' }),
    SEPARATOR: createKeyword({ name: 'SEPARATOR' }),
    TRUE: createKeyword({ name: 'TRUE' }),
    FALSE: createKeyword({ name: 'FALSE' }),
    IN: createKeyword({ name: 'IN' }),
    NOT_IN: createKeyword({
        name: 'NOT_IN',
        pattern: /NOT IN/i,
    }),
    MAX_LENGTH: createKeyword({
        name: 'MAX_LENGTH',
        pattern: /MAX LENGTH/i,
    }),
    MAX: createKeyword({ name: 'MAX' }),
    UNKNOWN: UNKNOWN,
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
    UNKNOWN: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].UNKNOWN,
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
    LEmbed: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LEmbed',
        pattern: '<<',
    }),
    REmbed: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'REmbed',
        pattern: '>>',
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
    GROUP_BY: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].GROUP_BY,
    ORDER_BY: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].ORDER_BY,
    BY: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].BY,
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
    isBLANK: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].isBLANK,
    isLITERAL: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].isLITERAL,
    isNUMERIC: _keywords__WEBPACK_IMPORTED_MODULE_2__["keywords"].isNUMERIC,
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
    sparqlTokenMap.GROUP_BY,
    sparqlTokenMap.ORDER_BY,
    sparqlTokenMap.BY,
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
    sparqlTokenMap.isBLANK,
    sparqlTokenMap.isLITERAL,
    sparqlTokenMap.isNUMERIC,
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
    sparqlTokenMap.LEmbed,
    sparqlTokenMap.REmbed,
    sparqlTokenMap.LessThan,
    sparqlTokenMap.GreaterThan,
    sparqlTokenMap.IN,
    sparqlTokenMap.NOT_IN,
    sparqlTokenMap.A,
    sparqlTokenMap.UNKNOWN,
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
//# sourceMappingURL=millan.graphql~shacl~sms~sparql~srs~trig~turtle.js.map