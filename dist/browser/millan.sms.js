(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("sms", [], factory);
	else if(typeof exports === 'object')
		exports["sms"] = factory();
	else
		root["millan"] = root["millan"] || {}, root["millan"]["sms"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"sms": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] = (typeof self !== 'undefined' ? self : this)["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/sms/index.ts","vendors~graphql~shacl~sms~sparql~srs~turtle","graphql~shacl~sms~sparql~srs~turtle"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/sms/SmsParser.ts":
/*!******************************!*\
  !*** ./src/sms/SmsParser.ts ***!
  \******************************/
/*! exports provided: SmsParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmsParser", function() { return SmsParser; });
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
var _a = __webpack_require__(/*! ./tokens */ "./src/sms/tokens.ts"), smsTokenTypes = _a.smsTokenTypes, smsTokenMap = _a.smsTokenMap;

var SmsParser = /** @class */ (function (_super) {
    __extends(SmsParser, _super);
    function SmsParser(config) {
        var _this = _super.call(this, smsTokenTypes, __assign({ outputCst: true, recoveryEnabled: true }, config)) || this;
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
        _this.lexer = new chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"](smsTokenTypes);
        chevrotain__WEBPACK_IMPORTED_MODULE_0__["Parser"].performSelfAnalysis(_this);
        return _this;
    }
    return SmsParser;
}(chevrotain__WEBPACK_IMPORTED_MODULE_0__["Parser"]));



/***/ }),

/***/ "./src/sms/index.ts":
/*!**************************!*\
  !*** ./src/sms/index.ts ***!
  \**************************/
/*! exports provided: smsTokens, SmsParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smsTokens", function() { return smsTokens; });
/* harmony import */ var _SmsParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SmsParser */ "./src/sms/SmsParser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SmsParser", function() { return _SmsParser__WEBPACK_IMPORTED_MODULE_0__["SmsParser"]; });


// Convenience imports/exports that aren't core functionality:
// NOTE: Tokens MUST be imported using CommonJS syntax; see here: https://github.com/SAP/chevrotain/issues/345
var smsTokens = __webpack_require__(/*! ./tokens */ "./src/sms/tokens.ts");


/***/ }),

/***/ "./src/sms/tokens.ts":
/*!***************************!*\
  !*** ./src/sms/tokens.ts ***!
  \***************************/
/*! exports provided: smsTokenMap, smsTokenTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smsTokenMap", function() { return smsTokenMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smsTokenTypes", function() { return smsTokenTypes; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
var sparqlTokenMap = __webpack_require__(/*! ../sparql/tokens */ "./src/sparql/tokens.ts").sparqlTokenMap;

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
    Template: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Template',
        pattern: /template/i,
    }),
    TO: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'TO',
        pattern: /to/i,
    }),
    Sql: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Sql',
        pattern: /sql/i,
    }),
    GraphQl: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'GraphQl',
        pattern: /graphql/i,
    }),
    Json: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Json',
        pattern: /json/i,
    }),
    Mapping: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'Mapping',
        pattern: /mapping/i,
    }),
    SqlBlock: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
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
    JsonBlock: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
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
    GraphQlBlock: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
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


/***/ })

/******/ });
});
//# sourceMappingURL=millan.sms.js.map