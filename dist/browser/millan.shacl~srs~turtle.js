((typeof self !== 'undefined' ? self : this)["webpackJsonp"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] || []).push([["shacl~srs~turtle"],{

/***/ "./src/helpers/unescape.ts":
/*!*********************************!*\
  !*** ./src/helpers/unescape.ts ***!
  \*********************************/
/*! exports provided: unescapedStringLiteralQuote, unescapedStringLiteralSingleQuote, stringLiteralQuote, stringLiteralSingleQuote, stringLiteralLongQuote, stringLiteralLongSingleQuote, illegalIriChars, escapedIri, unescapedIri, unescape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unescapedStringLiteralQuote", function() { return unescapedStringLiteralQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unescapedStringLiteralSingleQuote", function() { return unescapedStringLiteralSingleQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringLiteralQuote", function() { return stringLiteralQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringLiteralSingleQuote", function() { return stringLiteralSingleQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringLiteralLongQuote", function() { return stringLiteralLongQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringLiteralLongSingleQuote", function() { return stringLiteralLongSingleQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "illegalIriChars", function() { return illegalIriChars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapedIri", function() { return escapedIri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unescapedIri", function() { return unescapedIri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unescape", function() { return unescape; });
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


/***/ }),

/***/ "./src/turtle/TurtleParser.ts":
/*!************************************!*\
  !*** ./src/turtle/TurtleParser.ts ***!
  \************************************/
/*! exports provided: TurtleParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TurtleParser", function() { return TurtleParser; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var _a = __webpack_require__(/*! ./tokens */ "./src/turtle/tokens.ts"), turtleTokenTypes = _a.turtleTokenTypes, turtleTokenMap = _a.turtleTokenMap;

var TurtleParser = /** @class */ (function (_super) {
    __extends(TurtleParser, _super);
    function TurtleParser(config, tokens, lexerDefinition, performSelfAnalysis) {
        if (tokens === void 0) { tokens = turtleTokenTypes; }
        if (lexerDefinition === void 0) { lexerDefinition = tokens; }
        if (performSelfAnalysis === void 0) { performSelfAnalysis = true; }
        var _this = _super.call(this, tokens, __assign({ outputCst: true, recoveryEnabled: true }, config)) || this;
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
            _this.MANY(function () {
                _this.CONSUME(turtleTokenMap.Semicolon);
                _this.OPTION(function () {
                    _this.SUBRULE1(_this.verb);
                    _this.SUBRULE1(_this.objectList);
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
        _this.lexer = new chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"](lexerDefinition);
        if (performSelfAnalysis) {
            chevrotain__WEBPACK_IMPORTED_MODULE_0__["Parser"].performSelfAnalysis(_this);
        }
        return _this;
    }
    return TurtleParser;
}(chevrotain__WEBPACK_IMPORTED_MODULE_0__["Parser"]));



/***/ }),

/***/ "./src/turtle/tokens.ts":
/*!******************************!*\
  !*** ./src/turtle/tokens.ts ***!
  \******************************/
/*! exports provided: turtleTokenMap, turtleTokenTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turtleTokenMap", function() { return turtleTokenMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "turtleTokenTypes", function() { return turtleTokenTypes; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_regex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/regex */ "./src/helpers/regex.ts");
/* harmony import */ var _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/matchers */ "./src/helpers/matchers.ts");
/* harmony import */ var _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/unescape */ "./src/helpers/unescape.ts");
var sparqlTokenMap = __webpack_require__(/*! ../sparql/tokens */ "./src/sparql/tokens.ts").sparqlTokenMap;




var unicodeRegexp = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var turtleTokenMap = {
    Comment: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
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
    TTL_BASE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'TTL_BASE', pattern: /@base/ }),
    TTL_PREFIX: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'TTL_PREFIX', pattern: /@prefix/ }),
    LANGTAG: sparqlTokenMap.LANGTAG,
    INTEGER: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'INTEGER',
        pattern: _helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(_helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].option(/[+-]/), /\d+/),
    }),
    DECIMAL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DECIMAL',
        pattern: _helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(_helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].option(/[+-]/), /(\d*\.\d+)/),
    }),
    DOUBLE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'DOUBLE',
        pattern: _helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(_helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].option(/[+-]/), _helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].or(_helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(/\d+\.\d*/, _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["EXPONENT"]), _helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(/\.\d+/, _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["EXPONENT"]), _helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(/\d+/, _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["EXPONENT"]))),
    }),
    EXPONENT: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'EXPONENT', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["EXPONENT"] }),
    ECHAR: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'ECHAR', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["ECHAR"] }),
    ANON: sparqlTokenMap.ANON,
    PLX: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'PLX', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["PLX"] }),
    PERCENT: sparqlTokenMap.PERCENT,
    HEX: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'HEX', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["HEX"] }),
    STRING_LITERAL_LONG_SINGLE_QUOTE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRING_LITERAL_LONG_SINGLE_QUOTE',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var match = _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["stringLiteralLongSingleQuote"].exec(text.slice(startOffset));
            if (!match || Object(_helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["unescape"])(match[1]) === null) {
                // Bad characters
                return null;
            }
            return match;
        },
        line_breaks: true,
    }),
    STRING_LITERAL_LONG_QUOTE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRING_LITERAL_LONG_QUOTE',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var match = _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["stringLiteralLongQuote"].exec(text.slice(startOffset));
            if (!match || Object(_helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["unescape"])(match[1]) === null) {
                // Bad characters
                return null;
            }
            return match;
        },
        line_breaks: true,
    }),
    STRING_LITERAL_QUOTE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRING_LITERAL_QUOTE',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var textToMatch = text.slice(startOffset);
            var match = _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["unescapedStringLiteralQuote"].exec(textToMatch);
            if (match) {
                return match;
            }
            match = _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["stringLiteralQuote"].exec(textToMatch);
            if (!match) {
                return null;
            }
            if (Object(_helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["unescape"])(match[1]) === null) {
                // Bad characters
                return null;
            }
            return match;
        },
        line_breaks: false,
    }),
    STRING_LITERAL_SINGLE_QUOTE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'STRING_LITERAL_SINGLE_QUOTE',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var textToMatch = text.slice(startOffset);
            var match = _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["unescapedStringLiteralSingleQuote"].exec(textToMatch);
            if (match) {
                return match;
            }
            match = _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["stringLiteralSingleQuote"].exec(textToMatch);
            if (!match) {
                return null;
            }
            if (Object(_helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["unescape"])(match[1]) === null) {
                // Bad characters
                return null;
            }
            return match;
        },
        line_breaks: false,
    }),
    UCHAR: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'UCHAR',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            return unicodeRegexp.exec(text.slice(startOffset));
        },
        line_breaks: false,
    }),
    IRIREF: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'IRIREF',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            var textToMatch = text.slice(startOffset);
            var match = _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["unescapedIri"].exec(textToMatch);
            if (match) {
                return match;
            }
            match = _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["escapedIri"].exec(textToMatch);
            if (!match) {
                return null;
            }
            var value = Object(_helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["unescape"])(match[1]);
            if (value === null || _helpers_unescape__WEBPACK_IMPORTED_MODULE_3__["illegalIriChars"].test(value)) {
                return null;
            }
            return match;
        },
        line_breaks: false,
    }),
    PN_CHARS_BASE: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'PN_CHARS_BASE', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["PN_CHARS_BASE"] }),
    PN_CHARS_U: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'PN_CHARS_U', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["PN_CHARS_U"] }),
    PN_CHARS: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'PN_CHARS', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["PN_CHARS"] }),
    PN_PREFIX: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'PN_PREFIX', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["PN_PREFIX"] }),
    PN_LOCAL: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'PN_LOCAL', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["PN_LOCAL"] }),
    PN_LOCAL_ESC: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'PN_LOCAL_ESC', pattern: _helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["PN_LOCAL_ESC"] }),
    Unknown: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
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


/***/ })

}]);
//# sourceMappingURL=millan.shacl~srs~turtle.js.map