(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("srs", [], factory);
	else if(typeof exports === 'object')
		exports["srs"] = factory();
	else
		root["millan"] = root["millan"] || {}, root["millan"]["srs"] = factory();
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
/******/ 		"srs": 0
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
/******/ 	deferredModules.push(["./src/srs/index.ts","vendors~graphql~shacl~sms~sparql~srs~turtle","graphql~shacl~sms~sparql~srs~turtle","graphql~sparql~srs","shacl~srs~turtle"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers/cst.ts":
/*!****************************!*\
  !*** ./src/helpers/cst.ts ***!
  \****************************/
/*! exports provided: traverse, unsafeTraverse, isCstNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "traverse", function() { return traverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsafeTraverse", function() { return unsafeTraverse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCstNode", function() { return isCstNode; });
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
var traverse = function (root, visit) {
    _traverse(root, null, visit);
};
var unsafeTraverse = function (root, visit) {
    _traverse(root, null, visit, false);
};
function isCstNode(object) {
    return Boolean(object && 'name' in object);
}
var TraverseContext = /** @class */ (function () {
    function TraverseContext(_a) {
        var node = _a.node, parentCtx = _a.parentCtx;
        this.node = __assign({}, node);
        this.parentCtx = __assign({}, parentCtx);
    }
    return TraverseContext;
}());
var _traverse = function (root, ctx, visit, visitSafely) {
    if (ctx === void 0) { ctx = new TraverseContext({ node: root }); }
    if (visitSafely === void 0) { visitSafely = true; }
    if (!isCstNode(root)) {
        // must be a token
        return visit(visitSafely ? __assign({}, ctx) : ctx);
    }
    // is a grammar rule node
    var children = root.children;
    Object.keys(children).forEach(function (key) {
        var childType = children[key];
        if (!childType.length) {
            return;
        }
        childType.forEach(function (child) {
            var childCtx = visitSafely
                ? new TraverseContext({ node: child, parentCtx: ctx })
                : { node: child, parentCtx: ctx };
            var afterVisit = function (transformedCtx) {
                var nextCtx = childCtx;
                if (transformedCtx) {
                    nextCtx = visitSafely
                        ? new TraverseContext({
                            node: transformedCtx.node,
                            parentCtx: transformedCtx.parentCtx,
                        })
                        : {
                            node: transformedCtx.node,
                            parentCtx: transformedCtx.parentCtx,
                        };
                }
                _traverse(child, nextCtx, visit, visitSafely);
            };
            visit(childCtx, afterVisit);
        });
    });
};


/***/ }),

/***/ "./src/sparql/W3SpecSparqlParser.ts":
/*!******************************************!*\
  !*** ./src/sparql/W3SpecSparqlParser.ts ***!
  \******************************************/
/*! exports provided: W3SpecSparqlParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "W3SpecSparqlParser", function() { return W3SpecSparqlParser; });
/* harmony import */ var _BaseSparqlParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseSparqlParser */ "./src/sparql/BaseSparqlParser.ts");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_1__);
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
var baseTokens = __webpack_require__(/*! ./tokens */ "./src/sparql/tokens.ts").baseTokens;


var W3SpecSparqlParser = /** @class */ (function (_super) {
    __extends(W3SpecSparqlParser, _super);
    function W3SpecSparqlParser(options) {
        var _this = _super.call(this, options, baseTokens) || this;
        chevrotain__WEBPACK_IMPORTED_MODULE_1__["Parser"].performSelfAnalysis(_this);
        return _this;
    }
    return W3SpecSparqlParser;
}(_BaseSparqlParser__WEBPACK_IMPORTED_MODULE_0__["BaseSparqlParser"]));



/***/ }),

/***/ "./src/srs/SrsParser.ts":
/*!******************************!*\
  !*** ./src/srs/SrsParser.ts ***!
  \******************************/
/*! exports provided: SrsParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SrsParser", function() { return SrsParser; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _turtle_TurtleParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../turtle/TurtleParser */ "./src/turtle/TurtleParser.ts");
/* harmony import */ var _helpers_cst__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/cst */ "./src/helpers/cst.ts");
/* harmony import */ var turtle_defaultNamespaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! turtle/defaultNamespaces */ "./src/turtle/defaultNamespaces.ts");
/* harmony import */ var _visitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./visitor */ "./src/srs/visitor.ts");
/* harmony import */ var _customErrors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customErrors */ "./src/srs/customErrors.ts");
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
// tslint:disable:function-name
var sparqlTokenMap = __webpack_require__(/*! ../sparql/tokens */ "./src/sparql/tokens.ts").sparqlTokenMap;
var _a = __webpack_require__(/*! ./tokens */ "./src/srs/tokens.ts"), srsTokenMap = _a.srsTokenMap, srsTokenTypes = _a.srsTokenTypes, multiModeLexerDefinition = _a.multiModeLexerDefinition;






var SrsParser = /** @class */ (function (_super) {
    __extends(SrsParser, _super);
    function SrsParser(config) {
        var _this = _super.call(this, __assign({ outputCst: true, recoveryEnabled: true }, config), srsTokenTypes, multiModeLexerDefinition, false) || this;
        _this.baseNamespacesMap = Object.freeze(__assign({}, turtle_defaultNamespaces__WEBPACK_IMPORTED_MODULE_3__["defaultNamespacesMap"]));
        _this.namespacesMap = {};
        _this.visitCst = function (cst) {
            // To save resources while parsing, the sparqlSrsVisitor is a singleton.
            if (!_this.sparqlSrsVisitor) {
                var BaseSrsVisitor = _this.getBaseCstVisitorConstructorWithDefaults();
                _this.sparqlSrsVisitor = Object(_visitor__WEBPACK_IMPORTED_MODULE_4__["getSparqlSrsVisitor"])(BaseSrsVisitor);
            }
            else {
                _this.sparqlSrsVisitor.$resetState();
            }
            _this.sparqlSrsVisitor.visit(cst, _this.input);
        };
        _this.getSparqlRulesFromVisitor = function (cst) {
            _this.visitCst(cst);
            return {
                groupGraphPatterns: _this.sparqlSrsVisitor.$getGroupGraphPatterns(),
                triplesBlocks: _this.sparqlSrsVisitor.$getTriplesBlocks(),
            };
        };
        _this.resetManagedState = function () {
            _this.namespacesMap = __assign({}, turtle_defaultNamespaces__WEBPACK_IMPORTED_MODULE_3__["defaultNamespacesMap"]);
            _this.semanticErrors = [];
        };
        _this.setBaseNamespaces = function (newBaseNamespaces) {
            _this.baseNamespacesMap = __assign({}, newBaseNamespaces);
        };
        _this.tokenize = function (document) {
            return _this.lexer.tokenize(document).tokens;
        };
        _this.parse = function (document) {
            _this.resetManagedState();
            _this.input = _this.lexer.tokenize(document).tokens;
            var cst = _this.SrsDoc();
            var _a = _this.getSparqlRulesFromVisitor(cst), groupGraphPatterns = _a.groupGraphPatterns, triplesBlocks = _a.triplesBlocks;
            // Pull visitor errors
            var errors = _this.errors.concat(groupGraphPatterns.reduce(_visitor__WEBPACK_IMPORTED_MODULE_4__["reduceVisitorItemErrors"], []), triplesBlocks.reduce(_visitor__WEBPACK_IMPORTED_MODULE_4__["reduceVisitorItemErrors"], []));
            var semanticErrors = _this.semanticErrors.slice();
            // Replace placeholder CST nodes created by the SRS parser with CST nodes
            // returned by the visitor sub-parsers.
            Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_2__["unsafeTraverse"])(cst, function (ctx, next) {
                var node = ctx.node, parentCtx = ctx.parentCtx;
                if (Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_2__["isCstNode"])(node)) {
                    return next();
                }
                var currentTokenName = node.tokenType.tokenName;
                if (currentTokenName !== 'GroupGraphPattern' &&
                    currentTokenName !== 'TriplesBlock') {
                    return;
                }
                var parentNode = parentCtx.node;
                // The SRS parser parses only Turtle and SRS-specific content (RULE, IF,
                // THEN), and creates placeholder tokens for the blocks where SPARQL is
                // valid. The SparqlSrsVisitor visits these nodes and delegates their
                // parsing to a SPARQL parser. Here, we replace the placeholder nodes
                // (`GroupGraphPattern` and `TriplesBlock`) with the real ones from the
                // SPARQL parser, collecting some custom SRS-specific errors along the
                // way.
                if (parentNode.name === 'IfClause') {
                    var matchingVisitorItem = Object(_visitor__WEBPACK_IMPORTED_MODULE_4__["findAndSwapPlaceholders"])(node, parentNode, groupGraphPatterns, 'GroupGraphPattern');
                    if (matchingVisitorItem) {
                        Object(_customErrors__WEBPACK_IMPORTED_MODULE_5__["addIfClauseErrorsToErrors"])({
                            fullCtx: ctx,
                            namespacesMap: __assign({}, _this.baseNamespacesMap, _this.namespacesMap),
                            cst: matchingVisitorItem.parseResult.cst,
                            errors: errors,
                            semanticErrors: semanticErrors,
                        });
                    }
                }
                else if (parentNode.name === 'ThenClause') {
                    var matchingVisitorItem = Object(_visitor__WEBPACK_IMPORTED_MODULE_4__["findAndSwapPlaceholders"])(node, parentNode, triplesBlocks, 'TriplesBlock');
                    if (matchingVisitorItem) {
                        Object(_customErrors__WEBPACK_IMPORTED_MODULE_5__["addThenClauseErrorsToErrors"])({
                            fullCtx: ctx,
                            namespacesMap: __assign({}, _this.baseNamespacesMap, _this.namespacesMap),
                            cst: matchingVisitorItem.parseResult.cst,
                            errors: errors,
                            semanticErrors: semanticErrors,
                        });
                    }
                }
            });
            return {
                semanticErrors: semanticErrors,
                errors: errors,
                cst: cst,
            };
        };
        _this.SrsDoc = _this.RULE('SrsDoc', function () {
            _this.SUBRULE(_this.turtleDoc);
            _this.MANY(function () {
                _this.SUBRULE(_this.RuleDoc);
                _this.MANY1(function () {
                    _this.SUBRULE(_this.triples);
                    _this.CONSUME(sparqlTokenMap.Period);
                });
            });
        });
        _this.RuleDoc = _this.RULE('RuleDoc', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.RuleClause); });
            _this.SUBRULE(_this.IfClause);
            _this.SUBRULE(_this.ThenClause);
        });
        _this.RuleClause = _this.RULE('RuleClause', function () {
            _this.CONSUME(srsTokenMap.Rule);
            _this.SUBRULE(_this.iri);
        });
        _this.IfClause = _this.RULE('IfClause', function () {
            _this.CONSUME(srsTokenMap.If);
            _this.CONSUME(srsTokenMap.GroupGraphPattern);
        });
        _this.ThenClause = _this.RULE('ThenClause', function () {
            _this.CONSUME(srsTokenMap.Then);
            _this.CONSUME(sparqlTokenMap.LCurly);
            _this.CONSUME(srsTokenMap.TriplesBlock);
            _this.CONSUME(srsTokenMap.EndThen);
        });
        _this.lexer = new chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"](multiModeLexerDefinition);
        chevrotain__WEBPACK_IMPORTED_MODULE_0__["Parser"].performSelfAnalysis(_this);
        return _this;
    }
    return SrsParser;
}(_turtle_TurtleParser__WEBPACK_IMPORTED_MODULE_1__["TurtleParser"]));



/***/ }),

/***/ "./src/srs/customErrors.ts":
/*!*********************************!*\
  !*** ./src/srs/customErrors.ts ***!
  \*********************************/
/*! exports provided: addIfClauseErrorsToErrors, addThenClauseErrorsToErrors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addIfClauseErrorsToErrors", function() { return addIfClauseErrorsToErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addThenClauseErrorsToErrors", function() { return addThenClauseErrorsToErrors; });
/* harmony import */ var _helpers_cst__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/cst */ "./src/helpers/cst.ts");
/* harmony import */ var _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sparql/tokens */ "./src/sparql/tokens.ts");
var _a;


// RegEx for matching any relevant children of `Expression` inside of `Bind`;
// used to avoid false negatives in the check for disallowed literals inside of
// `Bind`.
var subExpressionMatcher = /(?:[A-Z]+Expression|ValueLogical)$/i;
// Default: just don't abort early at all. Used in the stack unwinding process
// that creates an error rule stack.
var defaultEarlyAbortTest = function () { return false; };
// Tokens that are allowed in SPARQL but not inside the `IfClause` of SRS.
var disallowedSparqlTokenNameToRuleMap = (_a = {},
    _a[_sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].EXISTS.tokenName] = 'ExistsFunction',
    _a[_sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].NOT_EXISTS.tokenName] = 'NotExistsFunction',
    _a[_sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].NOW.tokenName] = 'BuiltInCall_NOW',
    _a);
var disallowedSparqlTokenNames = Object.keys(disallowedSparqlTokenNameToRuleMap);
// Token names for literals; these are not allowed in the subject position of
// certain patterns in SRS.
var disallowedSparqlLiteralTokenNames = [
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].DOUBLE,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].DECIMAL,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].INTEGER,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].DOUBLE_POSITIVE,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].DECIMAL_POSITIVE,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].INTEGER_POSITIVE,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].DOUBLE_NEGATIVE,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].DECIMAL_NEGATIVE,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].INTEGER_NEGATIVE,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].STRING_LITERAL1,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].STRING_LITERAL2,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].STRING_LITERAL_LONG1,
    _sparql_tokens__WEBPACK_IMPORTED_MODULE_1__["sparqlTokenMap"].STRING_LITERAL_LONG2,
].map(function (token) { return token.tokenName; });
// Walks back up the tree to construct the rule stack, first going upward
// through the provided `traverseCtx`, and then continuing up through the
// `fullCtx`. `traverseCtx` is intended to be the "inner" ITraverseContext
// representing the results of the SPARQL sub-parser used by the
// SparqlSrsVisitor. `fullCtx` is intended to be the "outer" ITraverseContext
// representing the results of the SRS parser itself. The SRS parser delegates
// blocks of SPARQL to a SPARQL sub-parser, so, by combinging the two contexts,
// we get the full parser stack. The traversal adds rules to the stack only
// once a rule matching one of the `startRuleNames` is hit.
//
// At the point where the traversal of `traverseCtx` ends and the traversal of
// `fullCtx` begins, you may need to insert a rule into the stack (e.g.,
// because the `traverseCtx` doesn't include the top-level rule for that
// parse). If so, use `topLevelSubParserRuleName`.
//
// In some cases, there is a need to track nodes and potentially bail out early
// at certain points while constructing the rule stack. For that, use
// `earlyAbortTest`. If that method returns true, the rule stack construction
// will abort.
function getCustomErrorRuleStack(traverseCtx, fullCtx, startRuleNames, topLevelSubParserRuleName, earlyAbortTest) {
    if (earlyAbortTest === void 0) { earlyAbortTest = defaultEarlyAbortTest; }
    if (!traverseCtx) {
        return []; // forced early exit
    }
    var ruleStack = [];
    var stackUnwindingPointer = traverseCtx;
    // Move up from current context to the first rule that should "start" the stack.
    while (Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_0__["isCstNode"])(stackUnwindingPointer.node) &&
        !startRuleNames.includes(stackUnwindingPointer.node.name)) {
        if (earlyAbortTest(stackUnwindingPointer)) {
            return [];
        }
        stackUnwindingPointer = stackUnwindingPointer.parentCtx;
    }
    // Now start adding all found rules to the stack as we move upward.
    while (Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_0__["isCstNode"])(stackUnwindingPointer.node)) {
        ruleStack.unshift(stackUnwindingPointer.node.name);
        if (earlyAbortTest(stackUnwindingPointer)) {
            return [];
        }
        stackUnwindingPointer = stackUnwindingPointer.parentCtx;
    }
    // If the rule stack of the sub-parser doesn't get all the way up to the
    // relevant top-level rule, this will force the top-level rule to be put onto
    // the stack before proceeding.
    if (typeof topLevelSubParserRuleName === 'string') {
        ruleStack.unshift(topLevelSubParserRuleName);
    }
    // Now that we've got the sub-parser's rule stack, we trace the remaining
    // outer parser's stack to get to the true bottom of the stack.
    stackUnwindingPointer = fullCtx;
    while (stackUnwindingPointer) {
        if (Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_0__["isCstNode"])(stackUnwindingPointer.node)) {
            ruleStack.unshift(stackUnwindingPointer.node.name);
            if (earlyAbortTest(stackUnwindingPointer)) {
                return [];
            }
        }
        stackUnwindingPointer = stackUnwindingPointer.parentCtx;
    }
    return ['SrsDoc'].concat(ruleStack);
}
var getCustomIRecognitionException = function (_a) {
    var name = _a.name, message = _a.message, node = _a.node, ruleStack = _a.ruleStack;
    return ({
        name: name,
        message: message,
        token: node,
        context: {
            ruleStack: ruleStack,
            // `ruleOccurrenceStack` is meaningless to us as it just
            // records the number used when the chevrotain rule is
            // created (e.g., SUBRULE1 vs SUBRULE2); we can't know that
            // or care about that here
            ruleOccurrenceStack: [],
        },
        resyncedTokens: [],
    });
};
var getNoPrefixError = function (node, parentCtx, fullCtx, subParserRuleName) {
    return getCustomIRecognitionException({
        name: 'NoNamespacePrefixError',
        message: "A prefix (\"" + node.image + "\") was used for which there was no namespace defined.",
        node: node,
        ruleStack: getCustomErrorRuleStack(parentCtx, fullCtx, ['PrefixedName'], subParserRuleName),
    });
};
var getDisallowedTokenError = function (node, parentCtx, fullCtx) {
    return getCustomIRecognitionException({
        name: 'DisallowedTokenError',
        message: "Token " + node.tokenType.tokenName + " cannot be used in Stardog Rules.",
        node: node,
        ruleStack: getCustomErrorRuleStack(parentCtx, fullCtx, [disallowedSparqlTokenNameToRuleMap[node.tokenType.tokenName]], 'GroupGraphPattern'),
    });
};
var getDisallowedLiteralError = function (node, parentCtx, fullCtx, subParserRuleName) {
    var foundPropertyListPathNotEmptyCtx = null;
    var didFindSubExpressionWithMultipleChildren = false;
    var errorContext = null;
    var errorRuleStack = getCustomErrorRuleStack(parentCtx, fullCtx, ['Expression', 'TriplesSameSubjectPath'], subParserRuleName, function (stackCtx) {
        var node = stackCtx.node, parentCtx = stackCtx.parentCtx;
        var nodeName = node.name;
        if (nodeName === 'PropertyListPathNotEmpty') {
            // Track the found `PropertyListPathNotEmmpty` node and keep going.
            foundPropertyListPathNotEmptyCtx = stackCtx;
            return false;
        }
        if (!didFindSubExpressionWithMultipleChildren &&
            subExpressionMatcher.test(nodeName)) {
            // Track that we found a sub-expression with multiple children, then
            // keep going.
            didFindSubExpressionWithMultipleChildren =
                parentCtx.node.children[nodeName].length > 1;
            return false;
        }
        var isExpression = nodeName === 'Expression';
        var isTriplesBlock = nodeName === 'TriplesSameSubjectPath';
        if (!isExpression && !isTriplesBlock) {
            return false;
        }
        var isBoundExpressionWithLiteralSubject = isExpression &&
            parentCtx.node.name === 'Bind' &&
            // If we've found a sub-expression with multiple children, it's highly
            // likely (maybe definite?) that this `Bind` does not include an invalid
            // literal as a subject, so we don't count this as an error. This _may_
            // allow rare false positives, but it definitely prevents false
            // negatives of the sort described in https://github.com/stardog-union/millan/issues/22
            !didFindSubExpressionWithMultipleChildren;
        var isTriplesBlockSubject = isTriplesBlock &&
            (!foundPropertyListPathNotEmptyCtx ||
                foundPropertyListPathNotEmptyCtx.parentCtx.node.name !==
                    'TriplesSameSubjectPath');
        if (isBoundExpressionWithLiteralSubject || isTriplesBlockSubject) {
            errorContext = isBoundExpressionWithLiteralSubject
                ? 'Bind'
                : 'TriplesBlock';
            return false;
        }
        // We got to the Expression or TriplesBlock containing the literal, but
        // the literal wasn't in the subject position (i.e., was not the lead
        // Expression inside of Bind and was not the subject of
        // TriplesSameSubjectPath), so we can bail early here.
        return true;
    });
    if (errorRuleStack.length === 0) {
        return;
    }
    return getCustomIRecognitionException({
        name: 'DisallowedLiteralError',
        message: "Token " + node.tokenType.tokenName + " (" + node.image + ") cannot be used as a subject inside of a " + errorContext + " in Stardog Rules Syntax.",
        node: node,
        ruleStack: errorRuleStack,
    });
};
// Since the SRS parser delegates to the SPARQL parser inside of
// an SRS `IfClause`, and SPARQL allows certain constructs that SRS does not,
// we need to create our own errors for SRS-specific restrictions here.
function addIfClauseErrorsToErrors(_a) {
    var cst = _a.cst, namespacesMap = _a.namespacesMap, fullCtx = _a.fullCtx, errors = _a.errors, semanticErrors = _a.semanticErrors;
    Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_0__["traverse"])(cst, function (ctx, next) {
        var node = ctx.node, parentCtx = ctx.parentCtx;
        if (Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_0__["isCstNode"])(node)) {
            return next();
        }
        var tokenName = node.tokenType.tokenName;
        if (disallowedSparqlTokenNames.some(function (name) { return name === tokenName; })) {
            errors.push(getDisallowedTokenError(node, parentCtx, fullCtx));
        }
        if (disallowedSparqlLiteralTokenNames.some(function (tokenName) { return tokenName === node.tokenType.tokenName; })) {
            var error = getDisallowedLiteralError(node, parentCtx, fullCtx, 'GroupGraphPattern');
            if (error) {
                errors.push(error);
            }
        }
        if (tokenName === 'PNAME_NS' || tokenName === 'PNAME_LN') {
            var prefix = node.image.split(':').shift();
            if (!namespacesMap[prefix]) {
                semanticErrors.push(getNoPrefixError(node, parentCtx, fullCtx, 'GroupGraphPattern'));
            }
        }
    });
    return {
        errors: errors,
        semanticErrors: semanticErrors,
    };
}
function addThenClauseErrorsToErrors(_a) {
    var cst = _a.cst, namespacesMap = _a.namespacesMap, errors = _a.errors, semanticErrors = _a.semanticErrors, fullCtx = _a.fullCtx;
    Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_0__["traverse"])(cst, function (ctx, next) {
        var node = ctx.node, parentCtx = ctx.parentCtx;
        if (Object(_helpers_cst__WEBPACK_IMPORTED_MODULE_0__["isCstNode"])(node)) {
            return next();
        }
        var tokenName = node.tokenType.tokenName;
        if (disallowedSparqlLiteralTokenNames.some(function (tokenName) { return tokenName === node.tokenType.tokenName; })) {
            var error = getDisallowedLiteralError(node, parentCtx, fullCtx, 'GroupGraphPattern');
            if (error) {
                errors.push(error);
            }
        }
        if (tokenName === 'PNAME_NS' || tokenName === 'PNAME_LN') {
            var prefix = node.image.split(':').shift();
            if (!namespacesMap[prefix]) {
                semanticErrors.push(getNoPrefixError(node, parentCtx, fullCtx, 'TriplesBlock'));
            }
        }
    });
    return {
        errors: errors,
        semanticErrors: semanticErrors,
    };
}


/***/ }),

/***/ "./src/srs/index.ts":
/*!**************************!*\
  !*** ./src/srs/index.ts ***!
  \**************************/
/*! exports provided: srsTokens, SrsParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "srsTokens", function() { return srsTokens; });
/* harmony import */ var _SrsParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SrsParser */ "./src/srs/SrsParser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SrsParser", function() { return _SrsParser__WEBPACK_IMPORTED_MODULE_0__["SrsParser"]; });


// Convenience imports/exports that aren't core functionality:
// NOTE: Tokens MUST be imported using CommonJS syntax; see here: https://github.com/SAP/chevrotain/issues/345
var srsTokens = __webpack_require__(/*! ./tokens */ "./src/srs/tokens.ts");


/***/ }),

/***/ "./src/srs/tokens.ts":
/*!***************************!*\
  !*** ./src/srs/tokens.ts ***!
  \***************************/
/*! exports provided: multiModeLexerDefinition, srsTokenMap, srsTokenTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiModeLexerDefinition", function() { return multiModeLexerDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "srsTokenMap", function() { return srsTokenMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "srsTokenTypes", function() { return srsTokenTypes; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var helpers_matchers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! helpers/matchers */ "./src/helpers/matchers.ts");
/* harmony import */ var turtle_tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! turtle/tokens */ "./src/turtle/tokens.ts");
/* harmony import */ var sparql_tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sparql/tokens */ "./src/sparql/tokens.ts");
var _a;
var turtleTokenTypes = __webpack_require__(/*! ../turtle/tokens */ "./src/turtle/tokens.ts").turtleTokenTypes;




var LexerMode;
(function (LexerMode) {
    LexerMode["TURTLE"] = "turtle";
    LexerMode["IFCLAUSE"] = "ifclause";
    LexerMode["THENCLAUSE"] = "thenclause";
})(LexerMode || (LexerMode = {}));
var Rule = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'Rule',
    pattern: /rule/i,
});
var If = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'If',
    pattern: /if/i,
    push_mode: LexerMode.IFCLAUSE,
});
var Then = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'Then',
    pattern: /then/i,
    push_mode: LexerMode.THENCLAUSE,
});
var EndThen = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'EndThen',
    pattern: '}',
    pop_mode: true,
});
// NOTE: Not a SPARQL GroupGraphPattern. Rather, a placeholder for one. We have
// to let the SRS parser create this token, then replace with a token returned
// by the SPARQL sub-parser.
var GroupGraphPattern = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'GroupGraphPattern',
    pattern: function (text, startOffset) {
        if (startOffset === void 0) { startOffset = 0; }
        // Capture a single brace and then anything up to its closing brace.
        if (text[startOffset] !== '{') {
            return null;
        }
        var unclosedBraceCount = 1;
        var cursor;
        for (cursor = startOffset + 1; cursor < text.length && unclosedBraceCount > 0; cursor++) {
            if (text[cursor] === '{') {
                unclosedBraceCount++;
            }
            else if (text[cursor] === '}') {
                unclosedBraceCount--;
            }
        }
        if (unclosedBraceCount > 0) {
            return null;
        }
        return helpers_matchers__WEBPACK_IMPORTED_MODULE_1__["CATCH_ALL_AT_LEAST_ONE"].exec(text.slice(startOffset, cursor));
    },
    line_breaks: true,
    pop_mode: true,
});
// NOTE: Not a SPARQL TriplesBlock. Rather, a placeholder for one. We have
// to let the SRS parser create this token, then replace with a token returned
// by the SPARQL sub-parser.
var TriplesBlock = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'TriplesBlock',
    pattern: /[^{}]+/,
    line_breaks: true,
});
var indexOfIriRef = turtleTokenTypes.indexOf(turtle_tokens__WEBPACK_IMPORTED_MODULE_2__["turtleTokenMap"].IRIREF);
var multiModeLexerDefinition = {
    modes: (_a = {},
        _a[LexerMode.TURTLE] = turtleTokenTypes.slice(0, indexOfIriRef + 1).concat([
            Rule,
            If,
            Then
        ], turtleTokenTypes.slice(indexOfIriRef + 1)),
        _a[LexerMode.IFCLAUSE] = [turtle_tokens__WEBPACK_IMPORTED_MODULE_2__["turtleTokenMap"].WhiteSpace, GroupGraphPattern],
        _a[LexerMode.THENCLAUSE] = [
            turtle_tokens__WEBPACK_IMPORTED_MODULE_2__["turtleTokenMap"].WhiteSpace,
            sparql_tokens__WEBPACK_IMPORTED_MODULE_3__["sparqlTokenMap"].LCurly,
            EndThen,
            TriplesBlock,
        ],
        _a),
    defaultMode: LexerMode.TURTLE,
};
var srsTokenMap = {
    Rule: Rule,
    If: If,
    Then: Then,
    EndThen: EndThen,
    GroupGraphPattern: GroupGraphPattern,
    TriplesBlock: TriplesBlock,
};
var srsTokenTypes = [
    Rule,
    If,
    Then,
    EndThen,
    sparql_tokens__WEBPACK_IMPORTED_MODULE_3__["sparqlTokenMap"].LCurly
].concat(turtleTokenTypes, [
    GroupGraphPattern,
    TriplesBlock,
]);


/***/ }),

/***/ "./src/srs/visitor.ts":
/*!****************************!*\
  !*** ./src/srs/visitor.ts ***!
  \****************************/
/*! exports provided: getSparqlSrsVisitor, reduceVisitorItemErrors, findAndSwapPlaceholders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSparqlSrsVisitor", function() { return getSparqlSrsVisitor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduceVisitorItemErrors", function() { return reduceVisitorItemErrors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findAndSwapPlaceholders", function() { return findAndSwapPlaceholders; });
/* harmony import */ var _sparql_W3SpecSparqlParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sparql/W3SpecSparqlParser */ "./src/sparql/W3SpecSparqlParser.ts");
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

// Returns a custom visitor that extends the BaseVisitor for the SRS parser.
// When the visitor encounters an SRS `IfClause` or an SRS `ThenClause`, it
// delegates parsing of the block to the existing SPARQL parser's relevant
// sub-rule (GroupGraphPattern or TriplesBlock).
var getSparqlSrsVisitor = function (BaseVisitor) {
    var SparqlSrsVisitor = /** @class */ (function (_super) {
        __extends(SparqlSrsVisitor, _super);
        function SparqlSrsVisitor() {
            var _this = _super.call(this) || this;
            _this.groupGraphPatterns = [];
            _this.triplesBlocks = [];
            // Get and store the SPARQL `GroupGraphPattern` that should replace the
            // SRS placeholder `GroupGraphPattern` token inside of an SRS `IfClause`.
            _this.IfClause = function (ctx, cstInputTokens) {
                var GroupGraphPattern = ctx.GroupGraphPattern;
                _this.$storePlaceholderTokenReplacement({
                    tokenStore: _this.groupGraphPatterns,
                    originalTokenContext: GroupGraphPattern,
                    subParserRule: _this.sparqlParser.parseGroupGraphPattern.bind(_this.sparqlParser),
                    cstInputTokens: cstInputTokens,
                });
            };
            // Get and store the SPARQL `TriplesBlock` that should replace the
            // SRS placeholder `TriplesBlock` token inside of an SRS `ThenClause`.
            _this.ThenClause = function (ctx, cstInputTokens) {
                var TriplesBlock = ctx.TriplesBlock;
                _this.$storePlaceholderTokenReplacement({
                    tokenStore: _this.triplesBlocks,
                    originalTokenContext: TriplesBlock,
                    subParserRule: _this.sparqlParser.parseTriplesBlock.bind(_this.sparqlParser),
                    cstInputTokens: cstInputTokens,
                });
            };
            // Utility methods ('$' prefix is necessary to prevent chevrotain's
            // `validateVisitor` method from complaining that these are not grammar
            // rules):
            _this.$storePlaceholderTokenReplacement = function (_a) {
                var tokenStore = _a.tokenStore, _b = _a.originalTokenContext, originalTokenContext = _b === void 0 ? [] : _b, subParserRule = _a.subParserRule, cstInputTokens = _a.cstInputTokens, stripWrappers = _a.stripWrappers;
                var originalToken = originalTokenContext[0];
                if (!originalToken || typeof originalToken.image !== 'string') {
                    return;
                }
                var replacement = _this.$getPlaceholderTokenReplacement(originalToken, subParserRule, cstInputTokens, stripWrappers);
                tokenStore.push({
                    parseResult: replacement,
                    originalToken: originalToken,
                });
            };
            _this.$getPlaceholderTokenReplacement = function (originalToken, subParserRule, cstInputTokens, stripWrappers) {
                if (stripWrappers === void 0) { stripWrappers = false; }
                // Because we are replacing tokens by delegating the parsing of parts
                // of the original document to sub-parsers, we add some empty padding to
                // the part that is passed to the sub-parser, where the amount of padding
                // matches the start line and offset of the token we are replacing. This
                // ensures that all tokens have the right positions in the resulting CST
                // (otherwise, the sub-parsers assume that the text starts at offset 0).
                var image = originalToken.image;
                var frontPadding = '';
                var latestEndOffset = 0;
                var latestEndLine = 0;
                // Traditional `for` loop because we need to `break`.
                for (var i = 0; i < cstInputTokens.length; i++) {
                    var token = cstInputTokens[i];
                    if (i > 0) {
                        // Account for whitespace between this token and the previous one.
                        var linesBetweenTokens = token.startLine - latestEndLine;
                        var untokenizedSpaceBetweenTokens = token.startOffset - 1 - latestEndOffset - linesBetweenTokens;
                        if (linesBetweenTokens > 0) {
                            frontPadding += '\n'.repeat(linesBetweenTokens - 1);
                            frontPadding +=
                                ' '.repeat(Math.max(untokenizedSpaceBetweenTokens, 0)) + '\n';
                        }
                        else {
                            frontPadding += ' '.repeat(Math.max(untokenizedSpaceBetweenTokens, 0));
                        }
                    }
                    if (token === originalToken) {
                        break;
                    }
                    // We haven't hit the token we're replacing yet, so we need to continue
                    // accumulating padding by adding the newlines _inside_ the current
                    // token, and replacing all non-newline characters inside the current
                    // token with spaces.
                    var newlinesInToken = token.image.split('\n');
                    newlinesInToken.forEach(function (line, idx) {
                        if (idx > 0) {
                            frontPadding += '\n';
                        }
                        frontPadding += ' '.repeat(line.length);
                    });
                    // Track where the current token ends, in case the next token starts
                    // much later (meaning that there was untokenized stuff (e.g.,
                    // whitespace) in between) that needs to be accounted for.
                    latestEndOffset = token.endOffset;
                    latestEndLine = token.endLine;
                }
                // Finally, if we're stripping the wrappers (e.g., braces), replace them
                // with whitespace.
                var parseImage = stripWrappers ? " " + image.slice(1, -1) + " " : image;
                return subParserRule("" + frontPadding + parseImage);
            };
            _this.$getGroupGraphPatterns = function () { return _this.groupGraphPatterns; };
            _this.$getTriplesBlocks = function () { return _this.triplesBlocks; };
            _this.$resetState = function () {
                _this.groupGraphPatterns = [];
                _this.triplesBlocks = [];
            };
            _this.sparqlParser = new _sparql_W3SpecSparqlParser__WEBPACK_IMPORTED_MODULE_0__["W3SpecSparqlParser"]();
            _this.validateVisitor();
            return _this;
        }
        return SparqlSrsVisitor;
    }(BaseVisitor));
    return new SparqlSrsVisitor();
};
function reduceVisitorItemErrors(acc, item) {
    return acc.concat(item.parseResult.errors);
}
// The SRS cst contains placeholder tokens for unparsed blocks of SPARQL
// inside of an SRS `IfClause` or `ThenClause`. This method swaps out those
// placeholders with the actual SPARQL CST created by the SparqlSrsVisitor.
function findAndSwapPlaceholders(node, parentNode, visitorItems, key) {
    var matchingVisitorItem = visitorItems.find(function (visitorItem) { return visitorItem.originalToken === node; });
    if (matchingVisitorItem) {
        parentNode.children[key] = [matchingVisitorItem.parseResult.cst];
    }
    return matchingVisitorItem;
}


/***/ }),

/***/ "./src/turtle/defaultNamespaces.ts":
/*!*****************************************!*\
  !*** ./src/turtle/defaultNamespaces.ts ***!
  \*****************************************/
/*! exports provided: defaultNamespacesMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultNamespacesMap", function() { return defaultNamespacesMap; });
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
var defaultNamespacesMap = Object.freeze(['', 'rdf', 'rdfs', 'xsd', 'owl', 'stardog'].reduce(function (namespacesMap, prefix) {
    var _a;
    return (__assign({}, namespacesMap, (_a = {}, _a[prefix] = true, _a)));
}, {}));


/***/ })

/******/ });
});
//# sourceMappingURL=millan.srs.js.map