(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("shacl", [], factory);
	else if(typeof exports === 'object')
		exports["shacl"] = factory();
	else
		root["millan"] = root["millan"] || {}, root["millan"]["shacl"] = factory();
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
/******/ 		"shacl": 0
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
/******/ 	deferredModules.push(["./src/shacl/index.ts","vendors~graphql~shacl~sms~sparql~srs~turtle","vendors~shacl","graphql~shacl~sms~sparql~srs~turtle","shacl~srs~turtle"]);
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

/***/ "./src/helpers/types.ts":
/*!******************************!*\
  !*** ./src/helpers/types.ts ***!
  \******************************/
/*! exports provided: getAsTypedTuple, IToken, CstNode, TokenType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAsTypedTuple", function() { return getAsTypedTuple; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IToken", function() { return chevrotain__WEBPACK_IMPORTED_MODULE_0__["IToken"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CstNode", function() { return chevrotain__WEBPACK_IMPORTED_MODULE_0__["CstNode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TokenType", function() { return chevrotain__WEBPACK_IMPORTED_MODULE_0__["TokenType"]; });


var getAsTypedTuple = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
};
// exported for convenience



/***/ }),

/***/ "./src/shacl/ShaclParser.ts":
/*!**********************************!*\
  !*** ./src/shacl/ShaclParser.ts ***!
  \**********************************/
/*! exports provided: ShaclParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShaclParser", function() { return ShaclParser; });
/* harmony import */ var _turtle_TurtleParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../turtle/TurtleParser */ "./src/turtle/TurtleParser.ts");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var shacl_visitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! shacl/visitor */ "./src/shacl/visitor.ts");
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



var _a = __webpack_require__(/*! ./tokens */ "./src/shacl/tokens.ts"), getShaclTokenTypes = _a.getShaclTokenTypes, getShaclTokenMap = _a.getShaclTokenMap, categoryTokenMap = _a.categoryTokenMap;
var turtleTokenMap = __webpack_require__(/*! ../turtle/tokens */ "./src/turtle/tokens.ts").turtleTokenMap;
// A SHACL parser for the Turtle serialization of SHACL only. The parser can
// can accept any arbitrary namespace prefix for SHACL/XSD and still tokenize
// and parse the document correctly (it will also, of course, parse docuemnts
// using the full SHACL/XSD IRIs). The parser runs both a parse phase and a
// second validation phase (using a visitor) in order to accommodate SHACL
// rules that are not purely syntactic.
var ShaclParser = /** @class */ (function (_super) {
    __extends(ShaclParser, _super);
    function ShaclParser(config, prefixes) {
        if (prefixes === void 0) { prefixes = { shacl: 'sh', xsd: 'xsd' }; }
        var _this = _super.call(this, __assign({ outputCst: true, recoveryEnabled: true }, config), getShaclTokenTypes(prefixes), getShaclTokenTypes(prefixes), false) || this;
        // Some SHACL rules cannot be checked for violations during the first parse.
        // The visitor accepts the CST that results from parsing and checks
        // conformity with these SHACL rules.
        _this.validateWithVisitor = function (cst) {
            // To save resources while parsing, the shaclVisitor is a singleton.
            if (!_this.shaclVisitor) {
                var BaseSrsVisitor = _this.getBaseCstVisitorConstructorWithDefaults();
                _this.shaclVisitor = Object(shacl_visitor__WEBPACK_IMPORTED_MODULE_2__["getShaclVisitor"])(BaseSrsVisitor);
            }
            else {
                _this.shaclVisitor.$resetState();
            }
            _this.shaclVisitor.visit(cst);
            return _this.shaclVisitor.$validateShapes(_this.prefixes);
        };
        _this.tokenize = function (document) {
            return _this.lexer.tokenize(document).tokens;
        };
        _this.parse = function (document) {
            _this.input = _this.tokenize(document);
            var cst = _this.turtleDoc();
            var validationErrors = _this.validateWithVisitor(cst).validationErrors;
            // Next two items are copied so that they can be returned/held after parse
            // state is cleared.
            var errors = _this.errors.slice();
            var semanticErrors = _this.semanticErrors.concat(validationErrors);
            return {
                errors: errors,
                semanticErrors: semanticErrors,
                cst: cst,
            };
        };
        _this.predicateObjectList = _this.OVERRIDE_RULE('predicateObjectList', function () {
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.shaclRulePredicateObjectList);
                    },
                },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.verb);
                        _this.SUBRULE(_this.objectList);
                    },
                },
            ]);
            _this.MANY(function () {
                _this.CONSUME(turtleTokenMap.Semicolon);
                _this.OPTION(function () {
                    _this.OR1([
                        {
                            ALT: function () {
                                _this.SUBRULE1(_this.shaclRulePredicateObjectList);
                            },
                        },
                        {
                            ALT: function () {
                                _this.SUBRULE1(_this.verb);
                                _this.SUBRULE1(_this.objectList);
                            },
                        },
                    ]);
                });
            });
        });
        _this.shaclRulePredicateObjectList = _this.RULE('shaclRulePredicateObjectList', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclPredicateIRI); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclNodeKind); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclTargetNode); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclPropertyPath); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclLiteralConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclListTakingConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclShapeExpectingConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclHasValueConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclVerbShape); },
                },
            ]);
        });
        _this.shaclPredicateIRI = _this.RULE('shaclPredicateIRI', function () {
            _this.OR([
                {
                    ALT: function () {
                        _this.CONSUME(categoryTokenMap.SingleIriTakingPredicate);
                        _this.SUBRULE(_this.iri);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(categoryTokenMap.ManyIriTakingPredicate);
                        _this.SUBRULE1(_this.iri);
                        _this.MANY(function () {
                            _this.CONSUME(turtleTokenMap.Comma);
                            _this.SUBRULE2(_this.iri);
                        });
                    },
                },
            ]);
        });
        _this.shaclNodeKind = _this.RULE('shaclNodeKind', function () {
            _this.CONSUME(_this.shaclTokenMap.SHACL_nodeKind);
            _this.CONSUME(categoryTokenMap.NodeKindIRI);
        });
        _this.shaclTargetNode = _this.RULE('shaclTargetNode', function () {
            _this.CONSUME(_this.shaclTokenMap.SHACL_targetNode);
            _this.SUBRULE(_this.shaclIRIOrLiteral);
            _this.MANY(function () {
                _this.CONSUME(turtleTokenMap.Comma);
                _this.SUBRULE1(_this.shaclIRIOrLiteral);
            });
        });
        _this.shaclVerbShape = _this.RULE('shaclVerbShape', function () {
            _this.SUBRULE(_this.verb);
            _this.SUBRULE(_this.shaclShapeType);
            _this.MANY(function () {
                _this.CONSUME(turtleTokenMap.Comma);
                _this.SUBRULE1(_this.shaclShapeType);
            });
        });
        _this.shaclShapeType = _this.RULE('shaclShapeType', function () {
            _this.OR([
                {
                    ALT: function () { return _this.CONSUME(_this.shaclTokenMap.SHACL_Shape); },
                },
                {
                    ALT: function () { return _this.CONSUME(_this.shaclTokenMap.SHACL_NodeShape); },
                },
                {
                    ALT: function () { return _this.CONSUME(_this.shaclTokenMap.SHACL_PropertyShape); },
                },
            ]);
        });
        _this.shaclPropertyPath = _this.RULE('shaclPropertyPath', function () {
            _this.CONSUME(_this.shaclTokenMap.SHACL_path);
            _this.SUBRULE(_this.shaclPropertyPathPath);
        });
        _this.shaclPropertyPathPath = _this.RULE('shaclPropertyPathPath', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclPredicatePath); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclSequencePath); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclAlternativePath); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclInversePath); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclZeroOrMorePath); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclOneOrMorePath); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclZeroOrOnePath); },
                },
            ]);
        });
        _this.shaclPredicatePath = _this.RULE('shaclPredicatePath', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.iri); },
                },
                {
                    // This case does not seem to be allowed by the SHACL spec, but the
                    // online W3C validator accepts one level of parens wrapping the IRI.
                    ALT: function () {
                        _this.CONSUME(turtleTokenMap.LParen);
                        _this.SUBRULE1(_this.iri);
                        _this.CONSUME(turtleTokenMap.RParen);
                    },
                },
            ]);
        });
        _this.shaclSequencePath = _this.RULE('shaclSequencePath', function () {
            _this.CONSUME(turtleTokenMap.LParen);
            _this.SUBRULE(_this.shaclPropertyPathPath);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE1(_this.shaclPropertyPathPath); });
            _this.OPTION(function () { return _this.CONSUME(turtleTokenMap.Semicolon); });
            _this.CONSUME(turtleTokenMap.RParen);
        });
        _this.shaclAlternativePath = _this.RULE('shaclAlternativePath', function () {
            _this.CONSUME(turtleTokenMap.LBracket);
            _this.CONSUME(_this.shaclTokenMap.SHACL_alternativePath);
            _this.SUBRULE(_this.shaclPropertyPathPath); // This does not match the SHACL spec, but it does match the test cases, which violate the spec. ;_;
            _this.OPTION(function () { return _this.CONSUME(turtleTokenMap.Semicolon); });
            _this.CONSUME(turtleTokenMap.RBracket);
        });
        _this.shaclInversePath = _this.RULE('shaclInversePath', function () {
            _this.CONSUME(turtleTokenMap.LBracket);
            _this.CONSUME(_this.shaclTokenMap.SHACL_inversePath);
            _this.SUBRULE(_this.shaclPropertyPathPath);
            _this.OPTION(function () { return _this.CONSUME(turtleTokenMap.Semicolon); });
            _this.CONSUME(turtleTokenMap.RBracket);
        });
        _this.shaclZeroOrMorePath = _this.RULE('shaclZeroOrMorePath', function () {
            _this.CONSUME(turtleTokenMap.LBracket);
            _this.CONSUME(_this.shaclTokenMap.SHACL_zeroOrMorePath);
            _this.SUBRULE(_this.shaclPropertyPathPath);
            _this.OPTION(function () { return _this.CONSUME(turtleTokenMap.Semicolon); });
            _this.CONSUME(turtleTokenMap.RBracket);
        });
        _this.shaclOneOrMorePath = _this.RULE('shaclOneOrMorePath', function () {
            _this.CONSUME(turtleTokenMap.LBracket);
            _this.CONSUME(_this.shaclTokenMap.SHACL_oneOrMorePath);
            _this.SUBRULE(_this.shaclPropertyPathPath);
            _this.OPTION(function () { return _this.CONSUME(turtleTokenMap.Semicolon); });
            _this.CONSUME(turtleTokenMap.RBracket);
        });
        _this.shaclZeroOrOnePath = _this.RULE('shaclZeroOrOnePath', function () {
            _this.CONSUME(turtleTokenMap.LBracket);
            _this.CONSUME(_this.shaclTokenMap.SHACL_zeroOrOnePath);
            _this.SUBRULE(_this.shaclPropertyPathPath);
            _this.OPTION(function () { return _this.CONSUME(turtleTokenMap.Semicolon); });
            _this.CONSUME(turtleTokenMap.RBracket);
        });
        _this.shaclLiteralConstraint = _this.RULE('shaclLiteralConstraint', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclIntConstraint); },
                },
                // TODO: Some specificity here is possibly unnecessary -- e.g., maybe `shaclStringConstraint` and `shaclStringLiteralQuoteConstraint` can be consolidated in some way?
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclStringConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclStringLiteralQuoteConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclLangStringConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclBooleanConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclAnyLiteralConstraint); },
                },
            ]);
        });
        _this.shaclIntConstraint = _this.RULE('shaclIntConstraint', function () {
            _this.CONSUME(categoryTokenMap.IntTakingPredicate);
            _this.OR([
                {
                    ALT: function () { return _this.CONSUME(turtleTokenMap.INTEGER); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclXsdInteger); },
                },
            ]);
        });
        _this.shaclStringConstraint = _this.RULE('shaclStringConstraint', function () {
            _this.OR([
                {
                    ALT: function () { return _this.CONSUME(_this.shaclTokenMap.SHACL_select); },
                },
                {
                    ALT: function () { return _this.CONSUME(_this.shaclTokenMap.SHACL_ask); },
                },
            ]);
            _this.SUBRULE(_this.String); // TODO: a bit too lax?
        });
        _this.shaclStringLiteralQuoteConstraint = _this.RULE('shaclStringLiteralQuoteConstraint', function () {
            _this.CONSUME(categoryTokenMap.StringLiteralQuoteTakingPredicate);
            _this.CONSUME(turtleTokenMap.STRING_LITERAL_QUOTE);
            _this.OPTION(function () {
                _this.OR([
                    {
                        ALT: function () { return _this.CONSUME(turtleTokenMap.LANGTAG); },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(turtleTokenMap.DoubleCaret);
                            _this.CONSUME(_this.shaclTokenMap.SHACL_xsd_string);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME1(turtleTokenMap.DoubleCaret);
                            _this.CONSUME(_this.shaclTokenMap.SHACL_xsd_anyURI);
                        },
                    },
                ]);
            });
        });
        _this.shaclLangStringConstraint = _this.RULE('shaclLangStringConstraint', function () {
            _this.CONSUME(categoryTokenMap.LangStringTakingPredicate);
            _this.SUBRULE(_this.String);
            _this.OPTION(function () {
                _this.OR([
                    {
                        ALT: function () { return _this.CONSUME(turtleTokenMap.LANGTAG); },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(turtleTokenMap.DoubleCaret);
                            _this.CONSUME(_this.shaclTokenMap.SHACL_xsd_string);
                        },
                    },
                ]);
            });
        });
        _this.shaclBooleanConstraint = _this.RULE('shaclBooleanConstraint', function () {
            _this.CONSUME(categoryTokenMap.BooleanTakingPredicate);
            _this.OR([
                {
                    ALT: function () { return _this.CONSUME(turtleTokenMap.TRUE); },
                },
                {
                    ALT: function () { return _this.CONSUME(turtleTokenMap.FALSE); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclXsdBoolean); },
                },
            ]);
        });
        _this.shaclAnyLiteralConstraint = _this.RULE('shaclAnyLiteralConstraint', function () {
            _this.CONSUME(categoryTokenMap.AnyLiteralTakingPredicate);
            _this.SUBRULE(_this.literal);
        });
        _this.shaclListTakingConstraint = _this.RULE('shaclListTakingConstraint', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclLanguageInConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclShapeListTakingConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclIRIListTakingConstraint); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclShapeOrLiteralListTakingConstraint); },
                },
            ]);
        });
        _this.shaclLanguageInConstraint = _this.RULE('shaclLanguageInConstraint', function () {
            _this.CONSUME(_this.shaclTokenMap.SHACL_languageIn);
            _this.SUBRULE(_this.shaclStringCollection);
        });
        _this.shaclStringCollection = _this.RULE('shaclStringCollection', function () {
            _this.CONSUME(turtleTokenMap.LParen);
            _this.MANY(function () {
                _this.CONSUME(turtleTokenMap.STRING_LITERAL_QUOTE);
            });
            _this.CONSUME(turtleTokenMap.RParen);
        });
        _this.shaclShapeListTakingConstraint = _this.RULE('shaclShapeListTakingConstraint', function () {
            _this.OR([
                {
                    ALT: function () { return _this.CONSUME(_this.shaclTokenMap.SHACL_and); },
                },
                {
                    ALT: function () { return _this.CONSUME(_this.shaclTokenMap.SHACL_or); },
                },
                {
                    ALT: function () { return _this.CONSUME(_this.shaclTokenMap.SHACL_xone); },
                },
            ]);
            _this.SUBRULE(_this.shaclShapeCollection);
        });
        _this.shaclShapeCollection = _this.RULE('shaclShapeCollection', function () {
            _this.CONSUME(turtleTokenMap.LParen);
            _this.MANY(function () {
                _this.SUBRULE(_this.shaclShape);
            });
            _this.CONSUME(turtleTokenMap.RParen);
        });
        _this.shaclIRIListTakingConstraint = _this.RULE('shaclIRIListTakingConstraint', function () {
            _this.CONSUME(_this.shaclTokenMap.SHACL_ignoredProperties);
            _this.SUBRULE(_this.shaclIRICollection);
        });
        _this.shaclIRICollection = _this.RULE('shaclIRICollection', function () {
            _this.CONSUME(turtleTokenMap.LParen);
            _this.MANY(function () {
                _this.SUBRULE(_this.iri);
            });
            _this.CONSUME(turtleTokenMap.RParen);
        });
        _this.shaclShapeOrLiteralListTakingConstraint = _this.RULE('shaclShapeOrLiteralListTakingConstraint', function () {
            _this.CONSUME(_this.shaclTokenMap.SHACL_in);
            _this.SUBRULE(_this.shaclShapeOrLiteralCollection);
        });
        _this.shaclShapeOrLiteralCollection = _this.RULE('shaclShapeOrLiteralCollection', function () {
            _this.CONSUME(turtleTokenMap.LParen);
            _this.MANY(function () {
                _this.SUBRULE(_this.shaclShapeOrLiteral);
            });
            _this.CONSUME(turtleTokenMap.RParen);
        });
        _this.shaclShapeExpectingConstraint = _this.RULE('shaclShapeExpectingConstraint', function () {
            _this.CONSUME(categoryTokenMap.ShapeExpectingPredicate);
            _this.SUBRULE(_this.shaclShape);
        });
        _this.shaclHasValueConstraint = _this.RULE('shaclHasValueConstraint', function () {
            _this.CONSUME(_this.shaclTokenMap.SHACL_hasValue);
            _this.SUBRULE(_this.shaclShapeOrLiteral);
        });
        _this.shaclShape = _this.RULE('shaclShape', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.iri); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.blankNodePropertyList); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.BlankNode); },
                },
            ]);
        });
        _this.shaclShapeOrLiteral = _this.RULE('shaclShapeOrLiteral', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.shaclShape); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.literal); },
                },
            ]);
        });
        _this.shaclIRIOrLiteral = _this.RULE('shaclIRIOrLiteral', function () {
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.iri); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.literal); },
                },
            ]);
        });
        _this.shaclXsdBoolean = _this.RULE('shaclXsdBoolean', function () {
            _this.SUBRULE(_this.shaclStringWithDoubleCaret);
            _this.CONSUME(_this.shaclTokenMap.SHACL_xsd_boolean);
        });
        _this.shaclXsdString = _this.RULE('shaclXsdString', function () {
            _this.SUBRULE(_this.shaclStringWithDoubleCaret);
            _this.CONSUME(_this.shaclTokenMap.SHACL_xsd_string);
        });
        _this.shaclXsdInteger = _this.RULE('shaclXsdInteger', function () {
            _this.SUBRULE(_this.shaclStringWithDoubleCaret);
            _this.CONSUME(_this.shaclTokenMap.SHACL_xsd_integer);
        });
        _this.shaclXsdDate = _this.RULE('shaclXsdDate', function () {
            _this.SUBRULE(_this.shaclStringWithDoubleCaret);
            _this.CONSUME(_this.shaclTokenMap.SHACL_xsd_date);
        });
        _this.shaclXsdAnyURI = _this.RULE('shaclXsdAnyURI', function () {
            _this.SUBRULE(_this.shaclStringWithDoubleCaret);
            _this.CONSUME(_this.shaclTokenMap.SHACL_xsd_anyURI);
        });
        _this.shaclStringWithDoubleCaret = _this.RULE('shaclStringWithDoubleCaret', function () {
            _this.SUBRULE(_this.String);
            _this.CONSUME(turtleTokenMap.DoubleCaret);
        });
        _this.prefixes = prefixes;
        _this.lexer = new chevrotain__WEBPACK_IMPORTED_MODULE_1__["Lexer"](getShaclTokenTypes(prefixes));
        _this.shaclTokenMap = getShaclTokenMap(prefixes);
        chevrotain__WEBPACK_IMPORTED_MODULE_1__["Parser"].performSelfAnalysis(_this);
        return _this;
    }
    return ShaclParser;
}(_turtle_TurtleParser__WEBPACK_IMPORTED_MODULE_0__["TurtleParser"]));



/***/ }),

/***/ "./src/shacl/index.ts":
/*!****************************!*\
  !*** ./src/shacl/index.ts ***!
  \****************************/
/*! exports provided: shaclTokens, ShaclParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shaclTokens", function() { return shaclTokens; });
/* harmony import */ var _ShaclParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShaclParser */ "./src/shacl/ShaclParser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShaclParser", function() { return _ShaclParser__WEBPACK_IMPORTED_MODULE_0__["ShaclParser"]; });


// Convenience imports/exports that aren't core functionality:
// NOTE: Tokens MUST be imported using CommonJS syntax; see here: https://github.com/SAP/chevrotain/issues/345
var shaclTokens = __webpack_require__(/*! ./tokens */ "./src/shacl/tokens.ts");


/***/ }),

/***/ "./src/shacl/tokens.ts":
/*!*****************************!*\
  !*** ./src/shacl/tokens.ts ***!
  \*****************************/
/*! exports provided: categoryTokenMap, categoryTokens, getShaclTokenMap, getShaclTokenTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categoryTokenMap", function() { return categoryTokenMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categoryTokens", function() { return categoryTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShaclTokenMap", function() { return getShaclTokenMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShaclTokenTypes", function() { return getShaclTokenTypes; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var helpers_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! helpers/types */ "./src/helpers/types.ts");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash.isequal */ "./node_modules/lodash.isequal/index.js");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_3__);
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
var _a = __webpack_require__(/*! ../turtle/tokens */ "./src/turtle/tokens.ts"), turtleTokenTypes = _a.turtleTokenTypes, turtleTokenMap = _a.turtleTokenMap;
var sparqlTokenMap = __webpack_require__(/*! ../sparql/tokens */ "./src/sparql/tokens.ts").sparqlTokenMap;




var shaclIriNamespace = 'http://www.w3.org/ns/shacl#';
var xsdIriNamespace = 'http://www.w3.org/2001/XMLSchema#';
// Token categories, useful for making the parser rules simpler.
var categoryTokenMap = {
    ManyIriTakingPredicate: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ManyIriTakingPredicate',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
    SingleIriTakingPredicate: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'SingleIriTakingPredicate',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
    NodeKindIRI: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'NodeKindIRI',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
    IntTakingPredicate: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'IntTakingPredicate',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
    StringLiteralQuoteTakingPredicate: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'StringLiteralQuoteTakingPredicate',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
    LangStringTakingPredicate: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'LangStringTakingPredicate',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
    BooleanTakingPredicate: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'BooleanTakingPredicate',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
    ShapeExpectingPredicate: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'ShapeExpectingPredicate',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
    AnyLiteralTakingPredicate: Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: 'AnyLiteralTakingPredicate',
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    }),
};
var categoryTokens = Object.keys(categoryTokenMap).map(function (key) { return categoryTokenMap[key]; });
var localNamesByCategory = {
    ManyIriTakingPredicate: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('equals', 'disjoint', 'lessThan', 'lessThanOrEquals', 'targetClass', 'targetSubjectsOf', 'targetObjectsOf'),
    SingleIriTakingPredicate: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('class', 'datatype', 'severity'),
    NodeKindIRI: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('IRI', 'BlankNode', 'Literal', 'BlankNodeOrIRI', 'BlankNodeOrLiteral', 'IRIOrLiteral'),
    IntTakingPredicate: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('minCount', 'maxCount', 'minLength', 'maxLength', 'qualifiedMinCount', 'qualifiedMaxCount'),
    StringLiteralQuoteTakingPredicate: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('pattern', 'flags', 'prefix', 'namespace'),
    LangStringTakingPredicate: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('message', 'labelTemplate'),
    BooleanTakingPredicate: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('uniqueLang', 'qualifiedValueShapesDisjoint', 'closed', 'deactivated', 'optional'),
    ShapeExpectingPredicate: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('not', 'node', 'property', 'qualifiedValueShape', 'sparql', 'declare', 'prefixes', 'parameter', 'nodeValidator', 'propertyValidator', 'validator'),
    AnyLiteralTakingPredicate: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('minExclusive', 'minInclusive', 'maxExclusive', 'maxInclusive'),
    other: Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('Shape', 'NodeShape', 'PropertyShape', 'targetNode', 'message', 'path', 'alternativePath', 'inversePath', 'zeroOrMorePath', 'oneOrMorePath', 'zeroOrOnePath', 'nodeKind', 'languageIn', 'and', 'or', 'xone', 'ignoredProperties', 'hasValue', 'in', 'select', 'ask'),
};
var xsdLocalNames = Object(helpers_types__WEBPACK_IMPORTED_MODULE_2__["getAsTypedTuple"])('boolean', 'integer', 'string', 'date', 'dateTime', 'anyURI');
// Map of local names back to their categories, for easier lookup:
var localNameToCategoryMap = Object.keys(localNamesByCategory).reduce(function (nameToCategoryMap, category) {
    var categoryLocalNames = localNamesByCategory[category];
    categoryLocalNames.forEach(function (localName) { return (nameToCategoryMap[localName] = category); });
    return nameToCategoryMap;
}, {});
var localNames = Object.keys(localNameToCategoryMap);
// We can pre-compute all tokens for the `xsd` namespace except for those that
// include prefixes (since we don't know a priori what the prefix will be).
// For each XSD local name, we will create a "category" token that will
// ultimately be used as the single token encompassing either the full
// (un-prefixed) IRI or the prefixed name (i.e., `xsd:string). At this point,
// we create only the category token and the full (un-prefixed) IRI token; the
// prefixed token is created later (via `getShaclTokenTypes`) once we actually
// know what the `xsd` prefix is.
var xsdUnprefixedTokenMap = xsdLocalNames.reduce(function (tokenMap, localName) {
    var _a;
    var tokenName = "SHACL_xsd_" + localName; // category token name
    var iriTokenName = tokenName + "_IRI"; // IRI token name
    // Category token that will ultimately select either an XSD IRI or an XSD PN_LOCAL:
    var iriOrPrefixCategoryToken = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: tokenName,
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
    });
    return __assign({}, tokenMap, (_a = {}, _a[tokenName] = iriOrPrefixCategoryToken, _a[iriTokenName] = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: iriTokenName,
        pattern: "<" + xsdIriNamespace + localName,
        categories: [iriOrPrefixCategoryToken, turtleTokenMap.IRIREF],
    }), _a));
}, {});
// We can also pre-compute all SHACL tokens except for those that include
// prefixes (again, since we don't know a priori what the SHACL prefix will be).
// This helps keep our parser quick. We do it in the same way that we did for
// XSD tokens, above -- we create a "category" token for each SHACL local name
// that will be used to match either the full (un-prefixed) IRI or the prefixed
// name (once we know what the SHACL prefix is).
var shaclUnprefixedTokenMap = localNames.reduce(function (tokenMap, localName) {
    var _a;
    var category = localNameToCategoryMap[localName];
    var categoryToken = categoryTokenMap[category];
    var tokenName = "SHACL_" + localName;
    var iriTokenName = tokenName + "_IRI";
    // Category token that will select either a SHACL IRI or a SHACL PN_LOCAL:
    var iriOrPrefixCategoryToken = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: tokenName,
        pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
        categories: categoryToken ? [categoryToken] : [],
    });
    return __assign({}, tokenMap, (_a = {}, _a[tokenName] = iriOrPrefixCategoryToken, _a[iriTokenName] = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: iriTokenName,
        pattern: "<" + shaclIriNamespace + localName + ">",
        categories: [iriOrPrefixCategoryToken, turtleTokenMap.IRIREF],
    }), _a));
}, xsdUnprefixedTokenMap);
var makePrefixer = function (prefix) { return function (localName) {
    return prefix + ":" + localName;
}; };
// Retrieves the complete map of all SHACL/XSD tokens, given the SHACL and XSD
// prefixes. The map contains, for every local name, a token matching the full
// IRI, a token matching the prefixed local name, and a "category" token that
// matches both. The category token is useful for simplifying parser rules (not
// having to match every SHACL token as both a full IRI and a prefixed local
// name.)
// This function is called by the SHACL parser. It is memoized because the
// arguments are small and unlikely to change often, and the parser needs to be
// fast, so we should avoid re-computing.
var getShaclTokenMap = Object(memoize_one__WEBPACK_IMPORTED_MODULE_1__["default"])(function (prefixes) {
    var prefixWithShacl = makePrefixer(prefixes.shacl);
    var prefixWithXsd = makePrefixer(prefixes.xsd);
    // Add the prefixed local names to the SHACL token map now that we know the
    // prefixes.
    var shaclTokenMap = localNames.reduce(function (tokenMap, localName) {
        var _a;
        var tokenName = "SHACL_" + localName;
        var prefixedTokenName = tokenName + "_prefixed";
        return __assign({}, tokenMap, (_a = {}, _a[prefixedTokenName] = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
            name: prefixedTokenName,
            pattern: prefixWithShacl(localName),
            categories: [tokenMap[tokenName], turtleTokenMap.PNAME_LN],
        }), _a));
    }, shaclUnprefixedTokenMap);
    // Add the prefixed local names to the XSD token map now that we know the
    // prefixes.
    return xsdLocalNames.reduce(function (tokenMap, localName) {
        var _a;
        var tokenName = "SHACL_xsd_" + localName;
        var prefixedTokenName = tokenName + "_prefixed";
        return __assign({}, tokenMap, (_a = {}, _a[prefixedTokenName] = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
            name: prefixedTokenName,
            pattern: "" + prefixWithXsd(localName),
            categories: [tokenMap[tokenName], turtleTokenMap.PNAME_LN],
        }), _a));
    }, shaclTokenMap);
}, lodash_isequal__WEBPACK_IMPORTED_MODULE_3___default.a);
// Get the index of PNAME_NS and IRIREF so that we can re-use existing Turtle
// tokens but ensure that our special SHACL/XSD tokens are inserted at the
// right place (since order of tokens matters for chevrotain).
var pnameIndex = turtleTokenTypes.indexOf(sparqlTokenMap.PNAME_NS);
var iriIndex = turtleTokenTypes.indexOf(turtleTokenMap.IRIREF);
// tokenMap keys will need to be sorted in reverse order so that tokens with
// partial overlap are in the right order in the TokenType array.
var reverseSort = function (a, b) {
    // @ts-ignore: unused variable
    var _a = a.split('_'), aIgnored = _a[0], aName = _a[1], aRemainder = _a.slice(2);
    // @ts-ignore: unused variable
    var _b = b.split('_'), bIgnored = _b[0], bName = _b[1], bRemainder = _b.slice(2);
    // Grab the local name and lowercase it:
    var aSortString = (aName === 'xsd' ? aRemainder[0] : aName).toLowerCase();
    var bSortString = (bName === 'xsd' ? bRemainder[0] : bName).toLowerCase();
    if (aSortString === bSortString) {
        // If local names are identical, prefer the one without a suffix to those with suffixes.
        var aSuffix = aName === 'xsd' ? aRemainder[1] : aRemainder[0];
        var bSuffix = bName === 'xsd' ? bRemainder[1] : bRemainder[0];
        if (aSuffix && bSuffix) {
            return 0; // when both local names have suffixes, treat as lexicographically the same for sorting
        }
        else {
            return aSuffix ? 1 : -1;
        }
    }
    else {
        return aSortString < bSortString ? 1 : bSortString < aSortString ? -1 : 0;
    }
};
// Given SHACL and XSD prefixes, this method returns an array of Turtle +
// SHACL/XSD tokens, including tokens for prefixed local names, with the
// SHACL/XSD tokens inserted at the proper positions so that they are matched
// before the more generic Turtle tokens.
var getShaclTokenTypes = Object(memoize_one__WEBPACK_IMPORTED_MODULE_1__["default"])(function (prefixes) {
    var tokenMap = getShaclTokenMap(prefixes);
    var _a = Object.keys(tokenMap)
        .sort(reverseSort)
        .reduce(function (accumulator, key) {
        if (key.endsWith('_IRI')) {
            if (iriIndex < pnameIndex) {
                accumulator.iriTokens.push(tokenMap[key.slice(0, -4)]);
            }
            accumulator.iriTokens.push(tokenMap[key]);
        }
        else if (key.endsWith('_prefixed')) {
            if (pnameIndex < iriIndex) {
                accumulator.pnameTokens.push(tokenMap[key.slice(0, -9)]);
            }
            accumulator.pnameTokens.push(tokenMap[key]);
        }
        return accumulator;
    }, { pnameTokens: [], iriTokens: [] }), pnameTokens = _a.pnameTokens, iriTokens = _a.iriTokens;
    if (pnameIndex < iriIndex) {
        return turtleTokenTypes.slice(0, pnameIndex).concat(categoryTokens, pnameTokens, turtleTokenTypes.slice(pnameIndex, iriIndex), iriTokens, turtleTokenTypes.slice(iriIndex));
    }
    else {
        return turtleTokenTypes.slice(0, iriIndex).concat(categoryTokens, iriTokens, turtleTokenTypes.slice(iriIndex, pnameIndex), pnameTokens, turtleTokenTypes.slice(pnameIndex));
    }
}, lodash_isequal__WEBPACK_IMPORTED_MODULE_3___default.a);


/***/ }),

/***/ "./src/shacl/visitor.ts":
/*!******************************!*\
  !*** ./src/shacl/visitor.ts ***!
  \******************************/
/*! exports provided: getShaclVisitor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShaclVisitor", function() { return getShaclVisitor; });
/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! escape-string-regexp */ "./node_modules/escape-string-regexp/index.js");
/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var helpers_cst__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! helpers/cst */ "./src/helpers/cst.ts");
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


// Given a SHACL prefix, returns a RegExp that can be used for grabbing the
// local name (e.g., the 'NodeShape' in 'sh:NodeShape') from either a full
// SHACL IRI or a prefixed local name.
var getShaclLocalNameMatcher = function (shaclPrefix) {
    return new RegExp("(?:shacl#|" + escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default()(shaclPrefix) + ":)(\\S+?)>?$");
};
// Traverses the tree of descendants for a given CstNode until a token is
// found. Returns the "start" token for the CstNode (i.e., the earliest token
// encompassed by the CstNode). This is useful for diagnostics.
var getUnderlyingStartToken = function (ctx) {
    var currentNode = ctx;
    while (currentNode.children) {
        var currentNodeKey = Object.keys(currentNode.children)[0];
        currentNode = currentNode.children[currentNodeKey][0];
    }
    return currentNode;
};
// Grabs the local name (e.g., the 'NodeShape' in 'sh:NodeShape') from either
// a full SHACL IRI or a prefixed local name, if it is available.
var getLocalName = function (iri, matcher) {
    var result = matcher.exec(iri);
    if (result) {
        return result[1];
    }
};
// Given an initial (possibly partially complete) `shape` object and an array
// of CstElements matching the `shaclRulePredicateObjectList` grammar rule,
// transforms the `shape` into a complete `ShaclShape` with associated SHACL
// types and predicates.
// NOTE: mutates `shape`!
var addPredicatesAndTypesToShape = function (shape, shaclRulePredicateObjectListNodes) {
    shaclRulePredicateObjectListNodes.forEach(function (node) {
        var child = node.children[Object.keys(node.children)[0]][0];
        switch (child.name) {
            case 'shaclVerbShape': {
                var token = getUnderlyingStartToken(child);
                var verbTokenInsensitive = token.image.toLowerCase();
                var isTypeVerb = verbTokenInsensitive === 'a' ||
                    verbTokenInsensitive === 'rdf:type' ||
                    verbTokenInsensitive ===
                        '<http://www.w3.org/1999/02/22-rdf-syntax-ns#type>';
                if (!isTypeVerb) {
                    return;
                }
                Object.keys(child.children).forEach(function (key) {
                    if (key !== 'shaclShapeType') {
                        return;
                    }
                    var shapeTypeNode = child.children[key][0];
                    if (shapeTypeNode.children.SHACL_NodeShape) {
                        shape.types.push({
                            type: 'NodeShape',
                            token: getUnderlyingStartToken(shapeTypeNode),
                        });
                    }
                    else if (shapeTypeNode.children.SHACL_PropertyShape) {
                        shape.types.push({
                            type: 'PropertyShape',
                            token: getUnderlyingStartToken(shapeTypeNode),
                        });
                    }
                });
                break;
            }
            case 'shaclPredicateIRI': {
                if (child.children.SingleIriTakingPredicate) {
                    shape.predicates.push({
                        type: 'SingleIriTakingPredicate',
                        token: getUnderlyingStartToken(child.children
                            .SingleIriTakingPredicate[0]),
                    });
                }
                else if (child.children.ManyIriTakingPredicate) {
                    shape.predicates.push({
                        type: 'ManyIriTakingPredicate',
                        token: getUnderlyingStartToken(child.children
                            .ManyIriTakingPredicate[0]),
                    });
                }
                break;
            }
            case 'shaclNodeKind':
                shape.predicates.push({
                    type: 'nodeKind',
                    token: child.children.SHACL_nodeKind[0],
                });
                break;
            case 'shaclTargetNode':
                shape.predicates.push({
                    type: 'targetNode',
                    token: child.children.SHACL_targetNode[0],
                });
                break;
            case 'shaclPropertyPath':
                shape.predicates.push({
                    type: 'path',
                    token: child.children.SHACL_path[0],
                });
                break;
            case 'shaclLiteralConstraint':
                shape.predicates.push({
                    type: 'LiteralConstraint',
                    token: getUnderlyingStartToken(child),
                });
                break;
            case 'shaclListTakingConstraint':
                shape.predicates.push({
                    type: 'ListTakingConstraint',
                    token: getUnderlyingStartToken(child),
                });
                break;
            case 'shaclShapeExpectingConstraint':
                shape.predicates.push({
                    type: 'ShapeExpectingPredicate',
                    token: child.children.ShapeExpectingPredicate[0],
                });
                break;
            case 'shaclHasValueConstraint':
                shape.predicates.push({
                    type: 'hasValue',
                    token: child.children.SHACL_hasValue[0],
                });
                break;
            default:
                console.log("SHACL predicateObjectList with name " + child.name + " not recognized.");
        }
    });
};
// Utility method for constructing a `ShaclShape` from CstElements matching the
// `shaclShape` grammar rule.
var getShaclShapeFromBlankNodePropertyList = function (ctx) {
    var blankNodeNode = ctx.blankNodePropertyList[0];
    var predicateObjectListNode = blankNodeNode.children.predicateObjectList[0];
    var optionalPredicateObjectListNode = ctx.predicateObjectList
        ? ctx.predicateObjectList[0]
        : null;
    if (!Object(helpers_cst__WEBPACK_IMPORTED_MODULE_1__["isCstNode"])(predicateObjectListNode) &&
        !Object(helpers_cst__WEBPACK_IMPORTED_MODULE_1__["isCstNode"])(optionalPredicateObjectListNode)) {
        return;
    }
    var shaclRulePredicateObjectListNodes = optionalPredicateObjectListNode &&
        optionalPredicateObjectListNode.children &&
        optionalPredicateObjectListNode.children.shaclRulePredicateObjectList
        ? (predicateObjectListNode.children.shaclRulePredicateObjectList ||
            []).concat(optionalPredicateObjectListNode.children
            .shaclRulePredicateObjectList) : predicateObjectListNode.children.shaclRulePredicateObjectList;
    if (!shaclRulePredicateObjectListNodes) {
        return;
    }
    var shape = {
        subject: {
            type: 'blankNodePropertyList',
            token: getUnderlyingStartToken(blankNodeNode),
        },
        types: [],
        predicates: [],
    };
    addPredicatesAndTypesToShape(shape, shaclRulePredicateObjectListNodes);
    return shape;
};
// Returns a new SHACL visitor that extends that given BaseVisitor. The SHACL
// visitor is capable of constructing ShaclShape objects from a given CST and
// then using those shapes to perform validations that cannot be performed in
// the initial parse of a SHACL document.
var getShaclVisitor = function (BaseVisitor) {
    var ShaclVisitor = /** @class */ (function (_super) {
        __extends(ShaclVisitor, _super);
        function ShaclVisitor() {
            var _this = _super.call(this) || this;
            // `triples` have two alternatives, one with a `subject` and one with a
            // `blankNodePropertyList`. This method constructs SHACL shapes for each
            // alternative.
            _this.triples = function (ctx) {
                if (ctx.subject) {
                    var predicateObjectListNode = ctx.predicateObjectList[0];
                    if (!Object(helpers_cst__WEBPACK_IMPORTED_MODULE_1__["isCstNode"])(predicateObjectListNode)) {
                        return;
                    }
                    var shaclRulePredicateObjectListNodes = predicateObjectListNode.children.shaclRulePredicateObjectList;
                    if (!shaclRulePredicateObjectListNodes) {
                        return;
                    }
                    var shape = {
                        subject: {
                            type: Object.keys(ctx.subject[0].children)[0] === 'collection'
                                ? 'collection'
                                : 'subject',
                            token: getUnderlyingStartToken(ctx.subject[0]),
                        },
                        types: [],
                        predicates: [],
                    };
                    addPredicatesAndTypesToShape(shape, shaclRulePredicateObjectListNodes);
                    _this.shapes.push(shape);
                    _this.visit(ctx.subject);
                    _this.visit(predicateObjectListNode);
                }
                else {
                    var shape = getShaclShapeFromBlankNodePropertyList(ctx);
                    if (!shape) {
                        return;
                    }
                    _this.shapes.push(shape);
                    _this.visit(ctx.blankNodePropertyList);
                    if (ctx.predicateObjectList) {
                        _this.visit(ctx.predicateObjectList);
                    }
                }
            };
            // Some SHACL shapes (e.g., nested PropertyShapes) are not matched
            // by the `triples` grammar rule; instead, they match `shapeShape`.
            _this.shaclShape = function (ctx) {
                if (!ctx.blankNodePropertyList) {
                    // Not an inline shape we need to traverse, just an identifier.
                    return;
                }
                var shape = getShaclShapeFromBlankNodePropertyList(ctx);
                if (!shape) {
                    return;
                }
                _this.shapes.push(shape);
                _this.visit(ctx.blankNodePropertyList);
            };
            _this.$resetState = function () {
                _this.shapes = [];
            };
            _this.$validateShapes = function (_a) {
                var shaclPrefix = _a.shacl;
                var validationErrors = [];
                var localNameMatcher = getShaclLocalNameMatcher(shaclPrefix);
                var bnodeCount = 0;
                var shapesConsolidatedBySubject = _this.shapes.reduce(function (consolidatedShapes, shape) {
                    var image = shape.subject.token.image;
                    var subjectImage = image === '[' ? "bnode" + ++bnodeCount : image;
                    if (!consolidatedShapes[subjectImage]) {
                        consolidatedShapes[subjectImage] = {
                            subjects: [shape.subject],
                            types: shape.types,
                            predicates: shape.predicates,
                        };
                    }
                    else {
                        var consolidatedShape = consolidatedShapes[subjectImage];
                        consolidatedShapes[subjectImage] = {
                            subjects: consolidatedShape.subjects.concat([shape.subject]),
                            types: consolidatedShape.types.concat(shape.types),
                            predicates: consolidatedShape.predicates.concat(shape.predicates),
                        };
                    }
                    return consolidatedShapes;
                }, {});
                Object.keys(shapesConsolidatedBySubject).forEach(function (subjectImage) {
                    var _a = shapesConsolidatedBySubject[subjectImage], subjects = _a.subjects, types = _a.types, predicates = _a.predicates;
                    var shapeType;
                    types.forEach(function (_a) {
                        var type = _a.type;
                        if (shapeType && type !== shapeType) {
                            validationErrors.push({
                                name: 'ShapeTypeError',
                                message: 'A SHACL shape can be at most one of NodeShape or PropertyShape.',
                                token: subjects[0].token,
                            });
                        }
                        else if (!shapeType) {
                            shapeType = type;
                        }
                    });
                    var pathPredicates = [];
                    var nonPathPredicateMap = {};
                    predicates.forEach(function (predicate) {
                        var image = predicate.token.image;
                        var localName = getLocalName(image, localNameMatcher);
                        var predicateImage = localName
                            ? shaclPrefix + ":" + localName
                            : image;
                        if (predicateImage === shaclPrefix + ":path") {
                            pathPredicates.push(predicate);
                        }
                        else {
                            if (!nonPathPredicateMap[predicateImage]) {
                                nonPathPredicateMap[predicateImage] = [];
                            }
                            nonPathPredicateMap[predicateImage].push(predicate);
                        }
                    });
                    if (pathPredicates.length > 0) {
                        if (shapeType === 'NodeShape') {
                            validationErrors.push({
                                name: 'ShapePropertyError',
                                message: 'SHACL instances of `NodeShape` cannot have a value for the `path` property.',
                                token: pathPredicates[0].token,
                            });
                        }
                        else {
                            shapeType = 'PropertyShape';
                        }
                        if (pathPredicates.length > 1) {
                            validationErrors.push({
                                name: 'ShapePropertyError',
                                message: 'A shape can have at most one value for sh:path.',
                                token: pathPredicates[1].token,
                            });
                        }
                    }
                    if (shapeType === 'NodeShape') {
                        [
                            'minCount',
                            'maxCount',
                            'uniqueLang',
                            'lessThan',
                            'lessThanOrEquals',
                            'qualifiedValueShape',
                        ].forEach(function (image) {
                            var prefixedImage = shaclPrefix + ":" + image;
                            if (nonPathPredicateMap[prefixedImage]) {
                                validationErrors.push({
                                    name: 'ShapePropertyError',
                                    message: "A NodeShape cannot have any value for " + prefixedImage + ".",
                                    token: nonPathPredicateMap[prefixedImage][0].token,
                                });
                            }
                        });
                    }
                    else {
                        [
                            'deactivated',
                            'severity',
                            'datatype',
                            'nodeKind',
                            'minCount',
                            'maxCount',
                            'minExclusive',
                            'minInclusive',
                            'maxExclusive',
                            'maxInclusive',
                            'minLength',
                            'maxLength',
                            'languageIn',
                            'uniqueLang',
                            'in',
                        ].forEach(function (image) {
                            var prefixedImage = shaclPrefix + ":" + image;
                            if (nonPathPredicateMap[prefixedImage] &&
                                nonPathPredicateMap[prefixedImage].length > 1) {
                                validationErrors.push({
                                    name: 'ShapePropertyError',
                                    message: "A shape can have at most one value for " + prefixedImage + ".",
                                    token: nonPathPredicateMap[prefixedImage][1].token,
                                });
                            }
                        });
                    }
                });
                return { validationErrors: validationErrors };
            };
            _this.validateVisitor();
            _this.shapes = [];
            return _this;
        }
        return ShaclVisitor;
    }(BaseVisitor));
    return new ShaclVisitor();
};


/***/ })

/******/ });
});
//# sourceMappingURL=millan.shacl.js.map