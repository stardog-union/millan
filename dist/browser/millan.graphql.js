(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("graphql", [], factory);
	else if(typeof exports === 'object')
		exports["graphql"] = factory();
	else
		root["millan"] = root["millan"] || {}, root["millan"]["graphql"] = factory();
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
/******/ 		"graphql": 0
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
/******/ 	deferredModules.push(["./src/graphql/index.ts","vendors~graphql~shacl~sms~sparql~srs~turtle","graphql~shacl~sms~sparql~srs~turtle","graphql~sparql~srs","graphql~sparql"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/graphql/BaseGraphQlParser.ts":
/*!******************************************!*\
  !*** ./src/graphql/BaseGraphQlParser.ts ***!
  \******************************************/
/*! exports provided: BaseGraphQlParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseGraphQlParser", function() { return BaseGraphQlParser; });
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
var graphQlTokenMap = __webpack_require__(/*! ./tokens */ "./src/graphql/tokens.ts").graphQlTokenMap;

var BaseGraphQlParser = /** @class */ (function (_super) {
    __extends(BaseGraphQlParser, _super);
    function BaseGraphQlParser(options, tokenVocab) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, tokenVocab, __assign({ recoveryEnabled: true, outputCst: true }, options.config)) || this;
        _this.tokenize = function (document) {
            return _this.lexer.tokenize(document).tokens;
        };
        _this.parse = function (document, entryRule) {
            if (entryRule === void 0) { entryRule = _this.Document; }
            _this.input = _this.lexer.tokenize(document).tokens;
            var cst = entryRule.call(_this);
            var errors = _this.errors;
            return {
                errors: errors,
                cst: cst,
            };
        };
        _this.Document = _this.RULE('Document', function () {
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.Definition); });
        });
        _this.Definition = _this.RULE('Definition', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.ExecutableDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.TypeSystemDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.TypeSystemExtension); } },
            ]);
        });
        _this.ExecutableDefinition = _this.RULE('ExecutableDefinition', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.OperationDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.FragmentDefinition); } },
            ]);
        });
        _this.OperationDefinition = _this.RULE('OperationDefinition', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SelectionSet); } },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.OperationType);
                        _this.OPTION(function () { return _this.CONSUME(graphQlTokenMap.Name); });
                        _this.OPTION1(function () { return _this.SUBRULE(_this.VariableDefinitions); });
                        _this.OPTION2(function () { return _this.SUBRULE(_this.Directives); });
                        _this.SUBRULE1(_this.SelectionSet);
                    },
                },
            ]);
        });
        _this.OperationType = _this.RULE('OperationType', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.Query); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.Mutation); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.Subscription); } },
            ]);
        });
        _this.SelectionSet = _this.RULE('SelectionSet', function () {
            _this.CONSUME(graphQlTokenMap.LCurly);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.Selection); });
            _this.CONSUME(graphQlTokenMap.RCurly);
        });
        _this.Selection = _this.RULE('Selection', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Field); } },
                { ALT: function () { return _this.SUBRULE(_this.InlineFragment); } },
                { ALT: function () { return _this.SUBRULE(_this.FragmentSpread); } },
            ]);
        });
        _this.Field = _this.RULE('Field', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Alias); });
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION1(function () {
                return _this.SUBRULE(_this.Arguments, { ARGS: [false /* isConst */] });
            });
            _this.OPTION2(function () { return _this.SUBRULE(_this.Directives); });
            _this.OPTION3(function () { return _this.SUBRULE(_this.SelectionSet); });
        });
        _this.Alias = _this.RULE('Alias', function () {
            _this.CONSUME(graphQlTokenMap.Name);
            _this.CONSUME(graphQlTokenMap.Colon);
        });
        _this.Arguments = _this.RULE('Arguments', function (isConst) {
            _this.CONSUME(graphQlTokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.Argument, { ARGS: [isConst] }); });
            _this.CONSUME(graphQlTokenMap.RParen);
        });
        _this.Argument = _this.RULE('Argument', function (isConst) {
            _this.SUBRULE(_this.Alias);
            _this.SUBRULE(_this.Value, { ARGS: [isConst] });
        });
        _this.FragmentSpread = _this.RULE('FragmentSpread', function () {
            _this.CONSUME(graphQlTokenMap.Spread);
            _this.CONSUME(graphQlTokenMap.FragmentName);
            _this.OPTION(function () { return _this.SUBRULE(_this.Directives); });
        });
        _this.InlineFragment = _this.RULE('InlineFragment', function () {
            _this.CONSUME(graphQlTokenMap.Spread);
            _this.OPTION(function () { return _this.SUBRULE(_this.TypeCondition); });
            _this.OPTION1(function () { return _this.SUBRULE(_this.Directives); });
            _this.SUBRULE(_this.SelectionSet);
        });
        _this.FragmentDefinition = _this.RULE('FragmentDefinition', function () {
            _this.CONSUME(graphQlTokenMap.Fragment);
            _this.CONSUME(graphQlTokenMap.FragmentName);
            _this.SUBRULE(_this.TypeCondition);
            _this.OPTION(function () { return _this.SUBRULE(_this.Directives); });
            _this.SUBRULE(_this.SelectionSet);
        });
        _this.TypeCondition = _this.RULE('TypeCondition', function () {
            _this.CONSUME(graphQlTokenMap.On);
            _this.SUBRULE(_this.NamedType);
        });
        _this.Value = _this.RULE('Value', function (isConst) {
            _this.OR([
                { GATE: function () { return !isConst; }, ALT: function () { return _this.SUBRULE(_this.Variable); } },
                { ALT: function () { return _this.SUBRULE(_this.IntValue); } },
                { ALT: function () { return _this.SUBRULE(_this.FloatValue); } },
                { ALT: function () { return _this.SUBRULE(_this.StringValue); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanValue); } },
                { ALT: function () { return _this.SUBRULE(_this.NullValue); } },
                { ALT: function () { return _this.SUBRULE(_this.EnumValue); } },
                { ALT: function () { return _this.SUBRULE(_this.ListValue, { ARGS: [isConst] }); } },
                { ALT: function () { return _this.SUBRULE(_this.ObjectValue, { ARGS: [isConst] }); } },
            ]);
        });
        _this.IntValue = _this.RULE('IntValue', function () {
            _this.CONSUME(graphQlTokenMap.IntValueToken);
        });
        _this.FloatValue = _this.RULE('FloatValue', function () {
            _this.CONSUME(graphQlTokenMap.FloatValueToken);
        });
        _this.StringValue = _this.RULE('StringValue', function () {
            _this.CONSUME(graphQlTokenMap.StringValueToken);
        });
        _this.BooleanValue = _this.RULE('BooleanValue', function () {
            _this.CONSUME(graphQlTokenMap.BooleanValueToken);
        });
        _this.NullValue = _this.RULE('NullValue', function () {
            _this.CONSUME(graphQlTokenMap.NullValueToken);
        });
        _this.EnumValue = _this.RULE('EnumValue', function () {
            _this.CONSUME(graphQlTokenMap.EnumValueToken);
        });
        _this.ListValue = _this.RULE('ListValue', function (isConst) {
            _this.CONSUME(graphQlTokenMap.LBracket);
            _this.MANY(function () { return _this.SUBRULE(_this.Value, { ARGS: [isConst] }); });
            _this.CONSUME(graphQlTokenMap.RBracket);
        });
        _this.ObjectValue = _this.RULE('ObjectValue', function (isConst) {
            _this.CONSUME(graphQlTokenMap.LCurly);
            _this.MANY(function () { return _this.SUBRULE(_this.ObjectField, { ARGS: [isConst] }); });
            _this.CONSUME(graphQlTokenMap.RCurly);
        });
        _this.ObjectField = _this.RULE('ObjectField', function (isConst) {
            _this.SUBRULE(_this.Alias);
            _this.SUBRULE(_this.Value, { ARGS: [isConst] });
        });
        _this.VariableDefinitions = _this.RULE('VariableDefinitions', function () {
            _this.CONSUME(graphQlTokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.VariableDefinition); });
            _this.CONSUME(graphQlTokenMap.RParen);
        });
        _this.VariableDefinition = _this.RULE('VariableDefinition', function () {
            _this.SUBRULE(_this.Variable);
            _this.CONSUME(graphQlTokenMap.Colon);
            _this.SUBRULE(_this.Type);
            _this.OPTION(function () { return _this.SUBRULE(_this.DefaultValue); });
        });
        _this.Variable = _this.RULE('Variable', function () {
            _this.CONSUME(graphQlTokenMap.Dollar);
            _this.CONSUME(graphQlTokenMap.Name);
        });
        _this.DefaultValue = _this.RULE('DefaultValue', function () {
            _this.CONSUME(graphQlTokenMap.Equals);
            _this.SUBRULE(_this.Value, { ARGS: [true /* isConst */] });
        });
        _this.Type = _this.RULE('Type', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.NamedType); } },
                { ALT: function () { return _this.SUBRULE(_this.ListType); } },
            ]);
            _this.OPTION(function () { return _this.CONSUME(graphQlTokenMap.Bang); });
        });
        _this.NamedType = _this.RULE('NamedType', function () {
            _this.CONSUME(graphQlTokenMap.Name);
        });
        _this.ListType = _this.RULE('ListType', function () {
            _this.CONSUME(graphQlTokenMap.LBracket);
            _this.SUBRULE(_this.Type);
            _this.CONSUME(graphQlTokenMap.RBracket);
        });
        _this.Directives = _this.RULE('Directives', function (isConst) {
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.Directive, { ARGS: [isConst] }); });
        });
        _this.Directive = _this.RULE('Directive', function (isConst) {
            _this.CONSUME(graphQlTokenMap.At);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION(function () { return _this.SUBRULE(_this.Arguments, { ARGS: [isConst] }); });
        });
        _this.TypeSystemDefinition = _this.RULE('TypeSystemDefinition', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SchemaDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.TypeDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.DirectiveDefinition); } },
            ]);
        });
        _this.TypeSystemExtension = _this.RULE('TypeSystemExtension', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SchemaExtension); } },
                { ALT: function () { return _this.SUBRULE(_this.TypeExtension); } },
            ]);
        });
        _this.SchemaDefinition = _this.RULE('SchemaDefinition', function () {
            _this.CONSUME(graphQlTokenMap.Schema);
            _this.OPTION(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
            _this.CONSUME(graphQlTokenMap.LCurly);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.OperationTypeDefinition); });
            _this.CONSUME(graphQlTokenMap.RCurly);
        });
        _this.SchemaExtension = _this.RULE('SchemaExtension', function () {
            _this.CONSUME(graphQlTokenMap.Extend);
            _this.CONSUME(graphQlTokenMap.Schema);
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
                        _this.OPTION(function () { return _this.SUBRULE1(_this.OperationTypeDefinitionList); });
                    },
                },
                { ALT: function () { return _this.SUBRULE(_this.OperationTypeDefinitionList); } },
            ]);
        });
        _this.OperationTypeDefinitionList = _this.RULE('OperationTypeDefinitionList', function () {
            _this.CONSUME(graphQlTokenMap.LCurly);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.OperationTypeDefinition); });
            _this.CONSUME(graphQlTokenMap.RCurly);
        });
        _this.OperationTypeDefinition = _this.RULE('OperationTypeDefinition', function () {
            _this.SUBRULE(_this.OperationType);
            _this.CONSUME(graphQlTokenMap.Colon);
            _this.SUBRULE(_this.NamedType);
        });
        _this.Description = _this.RULE('Description', function () {
            _this.SUBRULE(_this.StringValue);
        });
        _this.TypeDefinition = _this.RULE('TypeDefinition', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.ScalarTypeDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.ObjectTypeDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.InterfaceTypeDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.UnionTypeDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.EnumTypeDefinition); } },
                { ALT: function () { return _this.SUBRULE(_this.InputObjectTypeDefinition); } },
            ]);
        });
        _this.TypeExtension = _this.RULE('TypeExtension', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.ScalarTypeExtension); } },
                { ALT: function () { return _this.SUBRULE(_this.ObjectTypeExtension); } },
                { ALT: function () { return _this.SUBRULE(_this.InterfaceTypeExtension); } },
                { ALT: function () { return _this.SUBRULE(_this.UnionTypeExtension); } },
                { ALT: function () { return _this.SUBRULE(_this.EnumTypeExtension); } },
                { ALT: function () { return _this.SUBRULE(_this.InputObjectTypeExtension); } },
            ]);
        });
        _this.ScalarTypeDefinition = _this.RULE('ScalarTypeDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.Scalar);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION1(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
        });
        _this.ScalarTypeExtension = _this.RULE('ScalarTypeExtension', function () {
            _this.CONSUME(graphQlTokenMap.Extend);
            _this.CONSUME(graphQlTokenMap.Scalar);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
        });
        _this.ObjectTypeDefinition = _this.RULE('ObjectTypeDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.TypeToken);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION1(function () { return _this.SUBRULE(_this.ImplementsInterfaces); });
            _this.OPTION2(function () {
                return _this.SUBRULE1(_this.Directives, { ARGS: [true /* isConst */] });
            });
            _this.OPTION3(function () { return _this.SUBRULE(_this.FieldsDefinition); });
        });
        _this.ObjectTypeExtension = _this.RULE('ObjectTypeExtension', function () {
            _this.CONSUME(graphQlTokenMap.Extend);
            _this.CONSUME(graphQlTokenMap.TypeToken);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.ImplementsInterfaces);
                        _this.OPTION(function () {
                            return _this.SUBRULE1(_this.Directives, { ARGS: [true /* isConst */] });
                        });
                        _this.OPTION1(function () { return _this.SUBRULE(_this.FieldsDefinition); });
                    },
                },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
                        _this.OPTION2(function () { return _this.SUBRULE1(_this.FieldsDefinition); });
                    },
                },
                { ALT: function () { return _this.SUBRULE2(_this.FieldsDefinition); } },
            ]);
        });
        _this.ImplementsInterfaces = _this.RULE('ImplementsInterfaces', function () {
            _this.CONSUME(graphQlTokenMap.Implements);
            _this.OPTION(function () { return _this.CONSUME(graphQlTokenMap.Amp); });
            _this.SUBRULE(_this.NamedType);
            _this.MANY(function () {
                _this.CONSUME1(graphQlTokenMap.Amp);
                _this.SUBRULE1(_this.NamedType);
            });
        });
        _this.FieldsDefinition = _this.RULE('FieldsDefinition', function () {
            _this.CONSUME(graphQlTokenMap.LCurly);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.FieldDefinition); });
            _this.CONSUME(graphQlTokenMap.RCurly);
        });
        _this.FieldDefinition = _this.RULE('FieldDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION1(function () { return _this.SUBRULE(_this.ArgumentsDefinition); });
            _this.CONSUME(graphQlTokenMap.Colon);
            _this.SUBRULE(_this.Type);
            _this.OPTION2(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
        });
        _this.ArgumentsDefinition = _this.RULE('ArgumentsDefinition', function () {
            _this.CONSUME(graphQlTokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.InputValueDefinition); });
            _this.CONSUME(graphQlTokenMap.RParen);
        });
        _this.InputValueDefinition = _this.RULE('InputValueDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.Name);
            _this.CONSUME(graphQlTokenMap.Colon);
            _this.SUBRULE(_this.Type);
            _this.OPTION1(function () { return _this.SUBRULE(_this.DefaultValue); });
            _this.OPTION2(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
        });
        _this.InterfaceTypeDefinition = _this.RULE('InterfaceTypeDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.Interface);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION2(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
            _this.OPTION3(function () { return _this.SUBRULE(_this.FieldsDefinition); });
        });
        _this.InterfaceTypeExtension = _this.RULE('InterfaceTypeExtension', function () {
            _this.CONSUME(graphQlTokenMap.Extend);
            _this.CONSUME(graphQlTokenMap.Interface);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
                        _this.OPTION(function () { return _this.SUBRULE(_this.FieldsDefinition); });
                    },
                },
                { ALT: function () { return _this.SUBRULE1(_this.FieldsDefinition); } },
            ]);
        });
        _this.UnionTypeDefinition = _this.RULE('UnionTypeDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.Union);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION1(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
            _this.OPTION2(function () { return _this.SUBRULE(_this.UnionMemberTypes); });
        });
        _this.UnionMemberTypes = _this.RULE('UnionMemberTypes', function () {
            _this.CONSUME(graphQlTokenMap.Equals);
            _this.OPTION(function () { return _this.CONSUME(graphQlTokenMap.Pipe); });
            _this.SUBRULE(_this.NamedType);
            _this.MANY(function () {
                _this.CONSUME1(graphQlTokenMap.Pipe);
                _this.SUBRULE1(_this.NamedType);
            });
        });
        _this.UnionTypeExtension = _this.RULE('UnionTypeExtension', function () {
            _this.CONSUME(graphQlTokenMap.Extend);
            _this.CONSUME(graphQlTokenMap.Union);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
                        _this.OPTION(function () { return _this.SUBRULE(_this.UnionMemberTypes); });
                    },
                },
                { ALT: function () { return _this.SUBRULE1(_this.UnionMemberTypes); } },
            ]);
        });
        _this.EnumTypeDefinition = _this.RULE('EnumTypeDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.Enum);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION1(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
            _this.OPTION2(function () { return _this.SUBRULE(_this.EnumValuesDefinition); });
        });
        _this.EnumValuesDefinition = _this.RULE('EnumValuesDefinition', function () {
            _this.CONSUME(graphQlTokenMap.LCurly);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.EnumValueDefinition); });
            _this.CONSUME(graphQlTokenMap.RCurly);
        });
        _this.EnumValueDefinition = _this.RULE('EnumValueDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.SUBRULE(_this.EnumValue);
            _this.OPTION1(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
        });
        _this.EnumTypeExtension = _this.RULE('EnumTypeExtension', function () {
            _this.CONSUME(graphQlTokenMap.Extend);
            _this.CONSUME(graphQlTokenMap.Enum);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
                        _this.OPTION(function () { return _this.SUBRULE(_this.EnumValuesDefinition); });
                    },
                },
                { ALT: function () { return _this.SUBRULE1(_this.EnumValuesDefinition); } },
            ]);
        });
        _this.InputObjectTypeDefinition = _this.RULE('InputObjectTypeDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.Input);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION1(function () {
                return _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
            });
            _this.OPTION2(function () { return _this.SUBRULE(_this.InputFieldsDefinition); });
        });
        _this.InputFieldsDefinition = _this.RULE('InputFieldsDefinition', function () {
            _this.CONSUME(graphQlTokenMap.LCurly);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.InputValueDefinition); });
            _this.CONSUME(graphQlTokenMap.RCurly);
        });
        _this.InputObjectTypeExtension = _this.RULE('InputObjectTypeExtension', function () {
            _this.CONSUME(graphQlTokenMap.Extend);
            _this.CONSUME(graphQlTokenMap.Input);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.Directives, { ARGS: [true /* isConst */] });
                        _this.OPTION(function () { return _this.SUBRULE1(_this.InputFieldsDefinition); });
                    },
                },
                { ALT: function () { return _this.SUBRULE(_this.InputFieldsDefinition); } },
            ]);
        });
        _this.DirectiveDefinition = _this.RULE('DirectiveDefinition', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Description); });
            _this.CONSUME(graphQlTokenMap.DirectiveToken);
            _this.CONSUME(graphQlTokenMap.At);
            _this.CONSUME(graphQlTokenMap.Name);
            _this.OPTION1(function () { return _this.SUBRULE(_this.ArgumentsDefinition); });
            _this.CONSUME(graphQlTokenMap.On);
            _this.SUBRULE(_this.DirectiveLocations);
        });
        _this.DirectiveLocations = _this.RULE('DirectiveLocations', function () {
            _this.OPTION(function () { return _this.CONSUME(graphQlTokenMap.Pipe); });
            _this.SUBRULE(_this.DirectiveLocation);
            _this.MANY(function () {
                _this.CONSUME1(graphQlTokenMap.Pipe);
                _this.SUBRULE1(_this.DirectiveLocation);
            });
        });
        _this.DirectiveLocation = _this.RULE('DirectiveLocation', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.ExecutableDirectiveLocation); } },
                { ALT: function () { return _this.SUBRULE(_this.TypeSystemDirectiveLocation); } },
            ]);
        });
        _this.ExecutableDirectiveLocation = _this.RULE('ExecutableDirectiveLocation', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.QUERY); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.MUTATION); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.SUBSCRIPTION); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.FIELD); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.FRAGMENT_DEFINITION); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.FRAGMENT_SPREAD); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.INLINE_FRAGMENT); } },
            ]);
        });
        _this.TypeSystemDirectiveLocation = _this.RULE('TypeSystemDirectiveLocation', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.SCHEMA); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.SCALAR); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.OBJECT); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.FIELD_DEFINITION); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.ARGUMENT_DEFINITION); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.INTERFACE); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.UNION); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.ENUM); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.ENUM_VALUE); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.INPUT_OBJECT); } },
                { ALT: function () { return _this.CONSUME(graphQlTokenMap.INPUT_FIELD_DEFINITION); } },
            ]);
        });
        _this.lexer = new chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"](tokenVocab);
        return _this;
    }
    return BaseGraphQlParser;
}(chevrotain__WEBPACK_IMPORTED_MODULE_0__["Parser"]));



/***/ }),

/***/ "./src/graphql/StandardGraphQlParser.ts":
/*!**********************************************!*\
  !*** ./src/graphql/StandardGraphQlParser.ts ***!
  \**********************************************/
/*! exports provided: StandardGraphQlParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StandardGraphQlParser", function() { return StandardGraphQlParser; });
/* harmony import */ var _BaseGraphQlParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseGraphQlParser */ "./src/graphql/BaseGraphQlParser.ts");
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
var graphQlTokens = __webpack_require__(/*! ./tokens */ "./src/graphql/tokens.ts").graphQlTokens;


var StandardGraphQlParser = /** @class */ (function (_super) {
    __extends(StandardGraphQlParser, _super);
    function StandardGraphQlParser(options) {
        var _this = _super.call(this, options, graphQlTokens) || this;
        chevrotain__WEBPACK_IMPORTED_MODULE_1__["Parser"].performSelfAnalysis(_this);
        return _this;
    }
    return StandardGraphQlParser;
}(_BaseGraphQlParser__WEBPACK_IMPORTED_MODULE_0__["BaseGraphQlParser"]));



/***/ }),

/***/ "./src/graphql/StardogGraphQlParser.ts":
/*!*********************************************!*\
  !*** ./src/graphql/StardogGraphQlParser.ts ***!
  \*********************************************/
/*! exports provided: StardogGraphQlParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StardogGraphQlParser", function() { return StardogGraphQlParser; });
/* harmony import */ var _BaseGraphQlParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseGraphQlParser */ "./src/graphql/BaseGraphQlParser.ts");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_StardogGraphQlVisitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql/StardogGraphQlVisitor */ "./src/graphql/StardogGraphQlVisitor.ts");
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
var _a = __webpack_require__(/*! ./tokens */ "./src/graphql/tokens.ts"), stardogGraphQlTokens = _a.stardogGraphQlTokens, stardogGraphQlTokenMap = _a.stardogGraphQlTokenMap;



var StardogGraphQlParser = /** @class */ (function (_super) {
    __extends(StardogGraphQlParser, _super);
    function StardogGraphQlParser(options) {
        var _this = _super.call(this, options, stardogGraphQlTokens) || this;
        _this.visitCst = function (cst) {
            // To save resources while parsing, the visitor is a singleton.
            if (!_this.stardogGraphQlVisitor) {
                var BaseStardogGraphQlVisitor = _this.getBaseCstVisitorConstructorWithDefaults();
                _this.stardogGraphQlVisitor = Object(graphql_StardogGraphQlVisitor__WEBPACK_IMPORTED_MODULE_2__["getStardogGraphQlVisitor"])(BaseStardogGraphQlVisitor);
            }
            else {
                _this.stardogGraphQlVisitor.$resetState();
            }
            return _this.stardogGraphQlVisitor.visit(cst, _this.input);
        };
        _this.parse = function (document, entryRule) {
            if (entryRule === void 0) { entryRule = _this.Document; }
            _this.input = _this.tokenize(document);
            var cst = entryRule.call(_this);
            var sparqlErrors = _this.visitCst(cst).errors;
            var graphQlErrors = _this.errors;
            return {
                errors: graphQlErrors.concat(sparqlErrors),
                cst: cst,
            };
        };
        _this.OperationDefinition = _this.OVERRIDE_RULE('OperationDefinition', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SelectionSet); } },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.OperationType);
                        _this.OPTION(function () { return _this.CONSUME(stardogGraphQlTokenMap.Name); });
                        _this.OPTION1(function () { return _this.SUBRULE(_this.VariableDefinitions); });
                        _this.OPTION2(function () {
                            return _this.SUBRULE(_this.Directives, {
                                ARGS: [false /* isConst */, true /* isTopLevel */],
                            });
                        });
                        _this.SUBRULE1(_this.SelectionSet);
                    },
                },
            ]);
        });
        _this.Directives = _this.OVERRIDE_RULE('Directives', function (isConst, isTopLevel) {
            if (isTopLevel === void 0) { isTopLevel = false; }
            _this.AT_LEAST_ONE(function () {
                _this.OR([
                    {
                        ALT: function () {
                            return _this.SUBRULE(_this.StardogDirective, { ARGS: [isTopLevel] });
                        },
                    },
                    { ALT: function () { return _this.SUBRULE(_this.Directive, { ARGS: [isConst] }); } },
                ]);
            });
        });
        _this.Field = _this.OVERRIDE_RULE('Field', function () {
            _this.OPTION(function () { return _this.SUBRULE(_this.Alias); });
            _this.CONSUME(stardogGraphQlTokenMap.Name);
            _this.OPTION1(function () {
                return _this.SUBRULE(_this.Arguments, {
                    ARGS: [false /* isConst */, true /* isField */],
                });
            });
            _this.OPTION2(function () { return _this.SUBRULE(_this.Directives); });
            _this.OPTION3(function () { return _this.SUBRULE(_this.SelectionSet); });
        });
        _this.Arguments = _this.OVERRIDE_RULE('Arguments', function (isConst, isField) {
            if (isField === void 0) { isField = false; }
            _this.CONSUME(stardogGraphQlTokenMap.LParen);
            _this.AT_LEAST_ONE(function () {
                _this.OR([
                    {
                        GATE: function () { return isField; },
                        ALT: function () { return _this.SUBRULE(_this.StardogArgument); },
                    },
                    { ALT: function () { return _this.SUBRULE(_this.Argument, { ARGS: [isConst] }); } },
                ]);
            });
            _this.CONSUME(stardogGraphQlTokenMap.RParen);
        });
        _this.StardogArgument = _this.RULE('StardogArgument', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.OrderByArgument); } },
                { ALT: function () { return _this.SUBRULE(_this.SkipArgument); } },
                { ALT: function () { return _this.SUBRULE(_this.OffsetArgument); } },
                { ALT: function () { return _this.SUBRULE(_this.FirstArgument); } },
                { ALT: function () { return _this.SUBRULE(_this.LimitArgument); } },
                { ALT: function () { return _this.SUBRULE(_this.IriArgument); } },
            ]);
        });
        _this.StardogDirective = _this.RULE('StardogDirective', function (isTopLevel) {
            _this.CONSUME(stardogGraphQlTokenMap.At);
            _this.OR([
                {
                    GATE: function () { return !isTopLevel; },
                    ALT: function () { return _this.SUBRULE(_this.ConditionalStardogDirective); },
                },
                {
                    GATE: function () { return !isTopLevel; },
                    ALT: function () { return _this.SUBRULE(_this.BareStardogDirective); },
                },
                { GATE: function () { return !isTopLevel; }, ALT: function () { return _this.SUBRULE(_this.BindDirective); } },
                { GATE: function () { return isTopLevel; }, ALT: function () { return _this.SUBRULE(_this.PrefixDirective); } },
                { GATE: function () { return isTopLevel; }, ALT: function () { return _this.SUBRULE(_this.ConfigDirective); } },
            ]);
        });
        _this.ConditionalStardogDirective = _this.RULE('ConditionalStardogDirective', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SkipDirective); } },
                { ALT: function () { return _this.SUBRULE(_this.IncludeDirective); } },
                { ALT: function () { return _this.SUBRULE(_this.FilterDirective); } },
            ]);
            _this.SUBRULE(_this.ConditionalStardogDirectiveArguments);
        });
        _this.SkipDirective = _this.RULE('SkipDirective', function () {
            _this.CONSUME(stardogGraphQlTokenMap.SkipDirectiveToken);
        });
        _this.IncludeDirective = _this.RULE('IncludeDirective', function () {
            _this.CONSUME(stardogGraphQlTokenMap.IncludeDirectiveToken);
        });
        _this.FilterDirective = _this.RULE('FilterDirective', function () {
            _this.CONSUME(stardogGraphQlTokenMap.FilterDirectiveToken);
        });
        _this.ConditionalStardogDirectiveArguments = _this.RULE('ConditionalStardogDirectiveArguments', function () {
            _this.CONSUME(stardogGraphQlTokenMap.LParen);
            _this.CONSUME(stardogGraphQlTokenMap.IfArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.Variable); } },
                { ALT: function () { return _this.SUBRULE(_this.StringValue); } },
            ]);
            _this.CONSUME(stardogGraphQlTokenMap.RParen);
        });
        _this.BareStardogDirective = _this.RULE('BareStardogDirective', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.OptionalDirective); } },
                { ALT: function () { return _this.SUBRULE(_this.TypeDirective); } },
                { ALT: function () { return _this.SUBRULE(_this.HideDirective); } },
            ]);
        });
        _this.OptionalDirective = _this.RULE('OptionalDirective', function () {
            _this.CONSUME(stardogGraphQlTokenMap.OptionalDirectiveToken);
        });
        _this.TypeDirective = _this.RULE('TypeDirective', function () {
            _this.CONSUME(stardogGraphQlTokenMap.TypeToken);
        });
        _this.HideDirective = _this.RULE('HideDirective', function () {
            _this.CONSUME(stardogGraphQlTokenMap.HideDirectiveToken);
        });
        _this.BindDirective = _this.RULE('BindDirective', function () {
            _this.CONSUME(stardogGraphQlTokenMap.BindDirectiveToken);
            _this.CONSUME(stardogGraphQlTokenMap.LParen);
            _this.CONSUME(stardogGraphQlTokenMap.ToArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.SUBRULE(_this.StringValue);
            _this.CONSUME(stardogGraphQlTokenMap.RParen);
        });
        _this.PrefixDirective = _this.RULE('PrefixDirective', function (isConst) {
            _this.CONSUME(stardogGraphQlTokenMap.PrefixDirectiveToken);
            _this.SUBRULE(_this.Arguments, { ARGS: [isConst] });
        });
        _this.ConfigDirective = _this.RULE('ConfigDirective', function () {
            _this.CONSUME(stardogGraphQlTokenMap.ConfigDirectiveToken);
            _this.CONSUME(stardogGraphQlTokenMap.LParen);
            _this.OR([
                {
                    ALT: function () { return _this.SUBRULE(_this.ConfigDirectiveAlias); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.ConfigDirectiveGraph); },
                },
                {
                    ALT: function () { return _this.SUBRULE(_this.ConfigDirectiveType); },
                },
            ]);
            _this.CONSUME(stardogGraphQlTokenMap.RParen);
        });
        _this.ConfigDirectiveAlias = _this.RULE('ConfigDirectiveAlias', function () {
            _this.SUBRULE(_this.AliasArgument);
            _this.OPTION(function () {
                _this.OR1([
                    {
                        ALT: function () {
                            _this.SUBRULE(_this.GraphArgument);
                            _this.OPTION1(function () { return _this.SUBRULE(_this.TypeArgument); });
                        },
                    },
                    {
                        ALT: function () {
                            _this.SUBRULE1(_this.TypeArgument);
                            _this.OPTION2(function () { return _this.SUBRULE1(_this.GraphArgument); });
                        },
                    },
                ]);
            });
        });
        _this.ConfigDirectiveGraph = _this.RULE('ConfigDirectiveGraph', function () {
            _this.SUBRULE2(_this.GraphArgument);
            _this.OPTION3(function () {
                _this.OR2([
                    {
                        ALT: function () {
                            _this.SUBRULE1(_this.AliasArgument);
                            _this.OPTION4(function () { return _this.SUBRULE2(_this.TypeArgument); });
                        },
                    },
                    {
                        ALT: function () {
                            _this.SUBRULE3(_this.TypeArgument);
                            _this.OPTION5(function () { return _this.SUBRULE2(_this.AliasArgument); });
                        },
                    },
                ]);
            });
        });
        _this.ConfigDirectiveType = _this.RULE('ConfigDirectiveType', function () {
            _this.SUBRULE4(_this.TypeArgument);
            _this.OPTION6(function () {
                _this.OR3([
                    {
                        ALT: function () {
                            _this.SUBRULE3(_this.AliasArgument);
                            _this.OPTION7(function () { return _this.SUBRULE3(_this.GraphArgument); });
                        },
                    },
                    {
                        ALT: function () {
                            _this.SUBRULE4(_this.GraphArgument);
                            _this.OPTION8(function () { return _this.SUBRULE4(_this.AliasArgument); });
                        },
                    },
                ]);
            });
        });
        _this.AliasArgument = _this.RULE('AliasArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.AliasArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.CONSUME(stardogGraphQlTokenMap.LCurly);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.AliasArgumentField); });
            _this.CONSUME(stardogGraphQlTokenMap.RCurly);
        });
        _this.AliasArgumentField = _this.RULE('AliasArgumentField', function () {
            _this.SUBRULE(_this.Alias);
            _this.SUBRULE(_this.StringValue);
        });
        _this.GraphArgument = _this.RULE('GraphArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.GraphArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.EnumValue); } },
                {
                    ALT: function () {
                        _this.CONSUME(stardogGraphQlTokenMap.LBracket);
                        _this.MANY(function () { return _this.SUBRULE1(_this.EnumValue); });
                        _this.CONSUME(stardogGraphQlTokenMap.RBracket);
                    },
                },
            ]);
        });
        _this.TypeArgument = _this.RULE('TypeArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.TypeToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.SUBRULE(_this.BooleanValue);
        });
        _this.OrderByArgument = _this.RULE('OrderByArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.OrderByArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.OrderByArgumentField); } },
                {
                    ALT: function () {
                        _this.CONSUME(stardogGraphQlTokenMap.LBracket);
                        _this.AT_LEAST_ONE(function () { return _this.SUBRULE1(_this.OrderByArgumentField); });
                        _this.CONSUME(stardogGraphQlTokenMap.RBracket);
                    },
                },
            ]);
        });
        _this.OrderByArgumentField = _this.RULE('OrderByArgumentField', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(stardogGraphQlTokenMap.Name); } },
                {
                    ALT: function () {
                        _this.CONSUME(stardogGraphQlTokenMap.LCurly);
                        _this.OR1([
                            {
                                ALT: function () {
                                    _this.SUBRULE(_this.OrderByArgumentFieldProperty);
                                    _this.OPTION(function () {
                                        return _this.SUBRULE(_this.OrderByArgumentDescProperty);
                                    });
                                },
                            },
                            {
                                ALT: function () {
                                    _this.SUBRULE1(_this.OrderByArgumentDescProperty);
                                    _this.SUBRULE1(_this.OrderByArgumentFieldProperty);
                                },
                            },
                        ]);
                        _this.CONSUME(stardogGraphQlTokenMap.RCurly);
                    },
                },
            ]);
        });
        _this.OrderByArgumentFieldProperty = _this.RULE('OrderByArgumentFieldProperty', function () {
            _this.CONSUME(stardogGraphQlTokenMap.OrderByArgumentFieldPropertyToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.CONSUME(stardogGraphQlTokenMap.Name);
        });
        _this.OrderByArgumentDescProperty = _this.RULE('OrderByArgumentDescProperty', function () {
            _this.CONSUME(stardogGraphQlTokenMap.OrderByArgumentDescPropertyToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.SUBRULE(_this.BooleanValue);
        });
        _this.SkipArgument = _this.RULE('SkipArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.SkipDirectiveToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.SUBRULE(_this.IntValue);
        });
        _this.OffsetArgument = _this.RULE('OffsetArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.OffsetArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.SUBRULE(_this.IntValue);
        });
        _this.FirstArgument = _this.RULE('FirstArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.FirstArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.SUBRULE(_this.IntValue);
        });
        _this.LimitArgument = _this.RULE('LimitArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.LimitArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.SUBRULE(_this.IntValue);
        });
        _this.IriArgument = _this.RULE('IriArgument', function () {
            _this.CONSUME(stardogGraphQlTokenMap.IriArgumentToken);
            _this.CONSUME(stardogGraphQlTokenMap.Colon);
            _this.SUBRULE(_this.EnumValue);
        });
        chevrotain__WEBPACK_IMPORTED_MODULE_1__["Parser"].performSelfAnalysis(_this);
        return _this;
    }
    return StardogGraphQlParser;
}(_BaseGraphQlParser__WEBPACK_IMPORTED_MODULE_0__["BaseGraphQlParser"]));



/***/ }),

/***/ "./src/graphql/StardogGraphQlVisitor.ts":
/*!**********************************************!*\
  !*** ./src/graphql/StardogGraphQlVisitor.ts ***!
  \**********************************************/
/*! exports provided: getStardogGraphQlVisitor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStardogGraphQlVisitor", function() { return getStardogGraphQlVisitor; });
/* harmony import */ var _sparql_StardogSparqlParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sparql/StardogSparqlParser */ "./src/sparql/StardogSparqlParser.ts");
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

// Returns a custom visitor that extends the BaseVisitor for the
// StardogGraphQlParser. When the visitor encounters any custom Stardog
// directive that can contain a SPARQL expression, it locates the expression
// and ensures that it parses as valid SPARQL (by delegating to the
// StardogSparqlParser).
var getStardogGraphQlVisitor = function (BaseVisitor) {
    var StardogGraphQlVisitor = /** @class */ (function (_super) {
        __extends(StardogGraphQlVisitor, _super);
        function StardogGraphQlVisitor() {
            var _this = _super.call(this) || this;
            _this.sparqlErrors = [];
            _this.visit = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _super.prototype.visit.apply(_this, args);
                return {
                    errors: _this.sparqlErrors.map(function (error) { return (__assign({}, error, { name: "SPARQL Error: " + error.name })); }),
                };
            };
            _this.BindDirective = function (ctx) {
                var _a;
                if (!ctx.StringValue) {
                    // This directive uses a variable for the expression, rather than a
                    // string, so we cannot parse the expression.
                    // Possible TODO in future: locate the matching variable and parse it?
                    return;
                }
                var stringValueNode = ctx.StringValue[0];
                if (!stringValueNode.children.StringValueToken) {
                    // A bind directive can be identified at times by the parser even when
                    // there is no StringValueToken yet, due to error recovery.
                    return;
                }
                var stringValueToken = stringValueNode.children
                    .StringValueToken[0];
                var errors = _this.$parseSparqlExpression(stringValueToken).errors;
                // Possible future TODO: replace the CST nodes with thoe returned from
                // the stardogSparqlParser, like we do for the IfClause and ThenClause
                // in the SRS Parser
                if (errors.length > 0) {
                    (_a = _this.sparqlErrors).push.apply(_a, _this.$mapErrors(errors, stringValueToken, 1));
                }
            };
            _this.ConditionalStardogDirective = function (ctx) {
                var _a;
                var conditionalStardogDirectiveArgumentsNode = ctx.ConditionalStardogDirectiveArguments[0];
                if (!conditionalStardogDirectiveArgumentsNode.children.StringValue) {
                    // This directive uses a variable for the expression, rather than a
                    // string, so we cannot parse the expression.
                    // Possible TODO in future: locate the matching variable and parse it?
                    return;
                }
                var stringValueNode = conditionalStardogDirectiveArgumentsNode
                    .children.StringValue[0];
                var stringValueToken = stringValueNode.children
                    .StringValueToken[0];
                var errors = _this.$parseSparqlExpression(stringValueToken).errors;
                // Possible future TODO: replace the CST nodes with those returned from
                // the stardogSparqlParser, like we do for the IfClause and ThenClause
                // in the SRS Parser
                if (errors.length > 0) {
                    (_a = _this.sparqlErrors).push.apply(_a, _this.$mapErrors(errors, stringValueToken, 1));
                }
            };
            // Make the SPARQL errors have proper locations for use in error
            // diagnostics. NOTE: This does NOT modify the locations of the error's
            // `previousToken` property. If that ends up being needed, it's a TODO.
            _this.$mapErrors = function (errors, tokenForOffset, offsetPadding) {
                if (offsetPadding === void 0) { offsetPadding = 0; }
                var tokenStartOffset = tokenForOffset.startOffset, tokenEndOffset = tokenForOffset.endOffset, tokenStartColumn = tokenForOffset.startColumn, tokenEndColumn = tokenForOffset.endColumn;
                return errors.map(function (error) {
                    var token = error.token;
                    var errorStartOffset = token.startOffset, errorEndOffset = token.endOffset, errorStartColumn = token.startColumn, errorEndColumn = token.endColumn;
                    return __assign({}, error, { token: __assign({}, token, { 
                            // error token's offsets might be set explicitly to null
                            startOffset: tokenStartOffset + (errorStartOffset || 0) + offsetPadding, endOffset: tokenEndOffset + (errorEndOffset || 0) + offsetPadding, startColumn: tokenStartColumn + (errorStartColumn || 0) + offsetPadding, endColumn: tokenEndColumn + (errorEndColumn || 0) + offsetPadding, startLine: tokenForOffset.startLine, endLine: tokenForOffset.endLine }) });
                });
            };
            _this.$parseSparqlExpression = function (stringValueToken) {
                var innerExpressionImage = stringValueToken.image.slice(1, -1); // remove quotes
                return _this.stardogSparqlParser.parse(innerExpressionImage, _this.stardogSparqlParser.Expression);
            };
            _this.$resetState = function () {
                _this.sparqlErrors = [];
            };
            _this.stardogSparqlParser = new _sparql_StardogSparqlParser__WEBPACK_IMPORTED_MODULE_0__["StardogSparqlParser"]();
            _this.validateVisitor();
            return _this;
        }
        return StardogGraphQlVisitor;
    }(BaseVisitor));
    return new StardogGraphQlVisitor();
};


/***/ }),

/***/ "./src/graphql/index.ts":
/*!******************************!*\
  !*** ./src/graphql/index.ts ***!
  \******************************/
/*! exports provided: graphqlTokens, BaseGraphQlParser, StandardGraphQlParser, StardogGraphQlParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphqlTokens", function() { return graphqlTokens; });
/* harmony import */ var _BaseGraphQlParser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseGraphQlParser */ "./src/graphql/BaseGraphQlParser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseGraphQlParser", function() { return _BaseGraphQlParser__WEBPACK_IMPORTED_MODULE_0__["BaseGraphQlParser"]; });

/* harmony import */ var _StandardGraphQlParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StandardGraphQlParser */ "./src/graphql/StandardGraphQlParser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StandardGraphQlParser", function() { return _StandardGraphQlParser__WEBPACK_IMPORTED_MODULE_1__["StandardGraphQlParser"]; });

/* harmony import */ var _StardogGraphQlParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StardogGraphQlParser */ "./src/graphql/StardogGraphQlParser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StardogGraphQlParser", function() { return _StardogGraphQlParser__WEBPACK_IMPORTED_MODULE_2__["StardogGraphQlParser"]; });




// Convenience imports/exports that aren't core functionality:
// NOTE: Tokens MUST be imported using CommonJS syntax; see here: https://github.com/SAP/chevrotain/issues/345
var graphqlTokens = __webpack_require__(/*! ./tokens */ "./src/graphql/tokens.ts");


/***/ }),

/***/ "./src/graphql/tokens.ts":
/*!*******************************!*\
  !*** ./src/graphql/tokens.ts ***!
  \*******************************/
/*! exports provided: graphQlTokenMap, graphQlTokens, stardogGraphQlTokenMap, stardogGraphQlTokens */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphQlTokenMap", function() { return graphQlTokenMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphQlTokens", function() { return graphQlTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stardogGraphQlTokenMap", function() { return stardogGraphQlTokenMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stardogGraphQlTokens", function() { return stardogGraphQlTokens; });
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chevrotain */ "./node_modules/chevrotain/lib/src/api.js");
/* harmony import */ var chevrotain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chevrotain__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var helpers_regex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! helpers/regex */ "./src/helpers/regex.ts");
/* harmony import */ var helpers_matchers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! helpers/matchers */ "./src/helpers/matchers.ts");
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



// Patterns:
var NAME_PATTERN = /[_A-Za-z][_0-9A-Za-z]*/;
var INTEGER_PART_PATTERN = /\-?(?:0|[1-9][0-9]*)/;
var EXPONENT_PART_PATTERN = /[eE][+-]?[0-9]+/;
var ESCAPED_CHARACTER_PATTERN = /\\["\\/bfnrt]/;
var ESCAPED_UNICODE_PATTERN = /\\u[0-9A-Fa-f]{4}/;
var STRING_SOURCE_CHARACTER_PATTERN = /[\u0009\u0020\u0021\u0023-\u005B\u005D-\uFFFF]/; // source character, but no '"' or '\' or line terminators
var STRING_CHARACTER_PATTERN = helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(/"/, helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].many(helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].or(STRING_SOURCE_CHARACTER_PATTERN, ESCAPED_UNICODE_PATTERN, ESCAPED_CHARACTER_PATTERN)), /"/);
var BOOLEAN_PATTERN = /true|false/;
var NULL_PATTERN = /null/;
var ON_PATTERN = /on/;
// Holder of tokens; tokens are generally added and created in order, below.
var graphQlTokens = [];
// Utility used primarily for keywords, which should also be counted as
// matching the `Name` token and (except for special cases) the
// `EnumValueToken` and `FragmentName` tokens. Ensures the created token has
// those other tokens as categories, and ensures that `Name` will be matched
// correctly for tokens that start with keyword characters but have additional
// characters. Adds the created token to the `graphQlTokens` array.
var createAndPushTokenWithNameAlt = function (config) {
    var categories = [Name];
    if (config.pattern !== BOOLEAN_PATTERN && config.pattern !== NULL_PATTERN) {
        categories.push(EnumValueToken);
    }
    if (config.pattern !== ON_PATTERN) {
        categories.push(FragmentName);
    }
    return createAndPushToken({
        name: config.name,
        pattern: config.pattern,
        longer_alt: Name,
        categories: categories,
    });
};
var createAndPushPunctuator = function (config) { return createAndPushToken(__assign({}, config, { categories: [Punctuator] })); };
// Simple wrapper for `createToken` that also pushes the created token into
// `graphQlTokens` at the time of creation, since order matters.
var createAndPushToken = function (config) {
    var token = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])(config);
    graphQlTokens.push(token);
    return token;
};
// Category tokens need to be created first, so they can be referenced by other
// tokens. They are _not_ yet added to the `graphQlTokens` array so that they
// do not match before various more specific keywords.
var Name = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({ name: 'Name', pattern: NAME_PATTERN });
// `EnumValueToken` and `FragmentName` are purely abstract categories that will
// be matched for all `Name` tokens _except_ the special tokens specified in
// the GraphQL grammar. See `createAndPushTokenWithNameAlt` for details.
var EnumValueToken = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'EnumValueToken',
    pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
});
var FragmentName = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'FragmentName',
    pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
});
// `StringValueToken` will match either BlockStrings or Strings.
var StringValueToken = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'StringValueToken',
    pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
});
var Punctuator = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'Punctuator',
    pattern: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].NA,
});
// Generally, anything that matches `Name` should match `EnumValueToken` and
// `FragmentName`. NOTE, however that `On` will not match `FragmentName` and
// `BooleanValueToken` and `NullValueToken` will not match `EnumValueToken`, in
// accordance with the official grammar; this is handled by the fact that the
// `On`, `BooleanValueToken`, and `FragmentName` tokens are defined and pushed
// into the tokens array earlier than `Name`. Given
// `createAndPushTokenWithNameAlt`, the latter tokens will also be treated as
// `Name` tokens, but will NOT be treated as instances of the relevant
// `EnumValueToken` or `FragmentName`. That's exactly what we want.
Name.CATEGORIES.push(EnumValueToken, FragmentName);
var ignoredTokens = {
    WhiteSpace: createAndPushToken({
        name: 'WhiteSpace',
        pattern: /[ \t]+/,
        group: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].SKIPPED,
    }),
    UnicodeBOM: createAndPushToken({
        name: 'UnicodeBOM',
        pattern: '\\uFFFE',
        group: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].SKIPPED,
    }),
    LineTerminator: createAndPushToken({
        name: 'LineTerminator',
        pattern: /\n\r|\r|\n/,
        group: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].SKIPPED,
    }),
    Comment: createAndPushToken({
        name: 'Comment',
        pattern: /#[^\n\r]*/,
        group: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].SKIPPED,
    }),
    Comma: createAndPushToken({
        name: 'Comma',
        pattern: ',',
        group: chevrotain__WEBPACK_IMPORTED_MODULE_0__["Lexer"].SKIPPED,
    }),
};
var punctuators = {
    Bang: createAndPushPunctuator({ name: 'Bang', pattern: '!' }),
    Dollar: createAndPushPunctuator({ name: 'Dollar', pattern: '$' }),
    LParen: createAndPushPunctuator({ name: 'LParen', pattern: '(' }),
    RParen: createAndPushPunctuator({ name: 'RParen', pattern: ')' }),
    Spread: createAndPushPunctuator({ name: 'Spread', pattern: '...' }),
    Colon: createAndPushPunctuator({ name: 'Colon', pattern: ':' }),
    Equals: createAndPushPunctuator({ name: 'Equals', pattern: '=' }),
    At: createAndPushPunctuator({ name: 'At', pattern: '@' }),
    LBracket: createAndPushPunctuator({ name: 'LBracket', pattern: '[' }),
    RBracket: createAndPushPunctuator({ name: 'RBracket', pattern: ']' }),
    LCurly: createAndPushPunctuator({ name: 'LCurly', pattern: '{' }),
    RCurly: createAndPushPunctuator({ name: 'RCurly', pattern: '}' }),
    Pipe: createAndPushPunctuator({ name: 'Pipe', pattern: '|' }),
    Amp: createAndPushPunctuator({ name: 'Amp', pattern: '&' }),
    Punctuator: Punctuator,
};
var nonKeywordTerminals = {
    FloatValueToken: createAndPushToken({
        name: 'FloatValueToken',
        pattern: helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(INTEGER_PART_PATTERN, helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].or(helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].and(/\.[0-9]+/, helpers_regex__WEBPACK_IMPORTED_MODULE_1__["regex"].option(EXPONENT_PART_PATTERN)), EXPONENT_PART_PATTERN)),
    }),
    IntValueToken: createAndPushToken({
        name: 'IntValueToken',
        pattern: INTEGER_PART_PATTERN,
    }),
    BlockStringToken: createAndPushToken({
        name: 'BlockStringToken',
        pattern: helpers_matchers__WEBPACK_IMPORTED_MODULE_2__["STRING_LITERAL_LONG2"],
        categories: [StringValueToken],
    }),
    StringToken: createAndPushToken({
        name: 'StringToken',
        pattern: STRING_CHARACTER_PATTERN,
        categories: [StringValueToken],
    }),
    BooleanValueToken: createAndPushTokenWithNameAlt({
        name: 'BooleanValueToken',
        pattern: BOOLEAN_PATTERN,
    }),
    NullValueToken: createAndPushTokenWithNameAlt({
        name: 'NullValueToken',
        pattern: NULL_PATTERN,
    }),
    EnumValueToken: EnumValueToken,
    FragmentName: FragmentName,
    Name: Name,
    StringValueToken: StringValueToken,
};
var keywords = {
    Query: createAndPushTokenWithNameAlt({
        name: 'Query',
        pattern: 'query',
    }),
    Mutation: createAndPushTokenWithNameAlt({
        name: 'Mutation',
        pattern: 'mutation',
    }),
    Subscription: createAndPushTokenWithNameAlt({
        name: 'Subscription',
        pattern: 'subscription',
    }),
    Fragment: createAndPushTokenWithNameAlt({
        name: 'Fragment',
        pattern: 'fragment',
    }),
    On: createAndPushTokenWithNameAlt({
        name: 'On',
        pattern: ON_PATTERN,
    }),
    Schema: createAndPushTokenWithNameAlt({
        name: 'Schema',
        pattern: 'schema',
    }),
    Extend: createAndPushTokenWithNameAlt({
        name: 'Extend',
        pattern: 'extend',
    }),
    Scalar: createAndPushTokenWithNameAlt({
        name: 'Scalar',
        pattern: 'scalar',
    }),
    TypeToken: createAndPushTokenWithNameAlt({
        name: 'TypeToken',
        pattern: 'type',
    }),
    Implements: createAndPushTokenWithNameAlt({
        name: 'Implements',
        pattern: 'implements',
    }),
    Interface: createAndPushTokenWithNameAlt({
        name: 'Interface',
        pattern: 'interface',
    }),
    Union: createAndPushTokenWithNameAlt({
        name: 'Union',
        pattern: 'union',
    }),
    Enum: createAndPushTokenWithNameAlt({
        name: 'Enum',
        pattern: 'enum',
    }),
    Input: createAndPushTokenWithNameAlt({
        name: 'Input',
        pattern: 'input',
    }),
    DirectiveToken: createAndPushTokenWithNameAlt({
        name: 'DirectiveToken',
        pattern: 'directive',
    }),
    QUERY: createAndPushTokenWithNameAlt({ name: 'QUERY', pattern: 'QUERY' }),
    MUTATION: createAndPushTokenWithNameAlt({
        name: 'MUTATION',
        pattern: 'MUTATION',
    }),
    SUBSCRIPTION: createAndPushTokenWithNameAlt({
        name: 'SUBSCRIPTION',
        pattern: 'SUBSCRIPTION',
    }),
    FRAGMENT_DEFINITION: createAndPushTokenWithNameAlt({
        name: 'FRAGMENT_DEFINITION',
        pattern: 'FRAGMENT_DEFINITION',
    }),
    FRAGMENT_SPREAD: createAndPushTokenWithNameAlt({
        name: 'FRAGMENT_SPREAD',
        pattern: 'FRAGMENT_SPREAD',
    }),
    INLINE_FRAGMENT: createAndPushTokenWithNameAlt({
        name: 'INLINE_FRAGMENT',
        pattern: 'INLINE_FRAGMENT',
    }),
    SCHEMA: createAndPushTokenWithNameAlt({ name: 'SCHEMA', pattern: 'SCHEMA' }),
    SCALAR: createAndPushTokenWithNameAlt({ name: 'SCALAR', pattern: 'SCALAR' }),
    OBJECT: createAndPushTokenWithNameAlt({ name: 'OBJECT', pattern: 'OBJECT' }),
    FIELD_DEFINITION: createAndPushTokenWithNameAlt({
        name: 'FIELD_DEFINITION',
        pattern: 'FIELD_DEFINITION',
    }),
    FIELD: createAndPushTokenWithNameAlt({ name: 'FIELD', pattern: 'FIELD' }),
    ARGUMENT_DEFINITION: createAndPushTokenWithNameAlt({
        name: 'ARGUMENT_DEFINITION',
        pattern: 'ARGUMENT_DEFINITION',
    }),
    INTERFACE: createAndPushTokenWithNameAlt({
        name: 'INTERFACE',
        pattern: 'INTERFACE',
    }),
    UNION: createAndPushTokenWithNameAlt({ name: 'UNION', pattern: 'UNION' }),
    ENUM_VALUE: createAndPushTokenWithNameAlt({
        name: 'ENUM_VALUE',
        pattern: 'ENUM_VALUE',
    }),
    ENUM: createAndPushTokenWithNameAlt({ name: 'ENUM', pattern: 'ENUM' }),
    INPUT_OBJECT: createAndPushTokenWithNameAlt({
        name: 'INPUT_OBJECT',
        pattern: 'INPUT_OBJECT',
    }),
    INPUT_FIELD_DEFINITION: createAndPushTokenWithNameAlt({
        name: 'INPUT_FIELD_DEFINITION',
        pattern: 'INPUT_FIELD_DEFINITION',
    }),
};
var graphQlTokenMap = __assign({}, ignoredTokens, punctuators, nonKeywordTerminals, keywords, { Name: Name });
var stardogDirectives = [
    'optional',
    'bind',
    'hide',
    'skip',
    'include',
    'filter',
    'prefix',
    'config',
]
    .sort()
    .reduce(function (accumulator, name) {
    var _a;
    var key = "" + name[0].toUpperCase() + name.slice(1) + "DirectiveToken";
    var token = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: key,
        pattern: name,
        categories: [Name, EnumValueToken, FragmentName],
        longer_alt: Name,
    });
    return __assign({}, accumulator, { tokenMap: __assign({}, accumulator.tokenMap, (_a = {}, _a[key] = token, _a)), orderedTokens: accumulator.orderedTokens.concat(token) });
}, { tokenMap: {}, orderedTokens: [] });
var stardogArguments = [
    'orderBy',
    'first',
    'to',
    'if',
    'alias',
    'graph',
    'offset',
    'limit',
    'iri',
]
    .sort()
    .reduce(function (accumulator, name) {
    var _a;
    var key = "" + name[0].toUpperCase() + name.slice(1) + "ArgumentToken";
    var token = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
        name: key,
        pattern: name,
        categories: [Name, EnumValueToken, FragmentName],
        longer_alt: Name,
    });
    return __assign({}, accumulator, { tokenMap: __assign({}, accumulator.tokenMap, (_a = {}, _a[key] = token, _a)), orderedTokens: accumulator.orderedTokens.concat(token) });
}, { tokenMap: {}, orderedTokens: [] });
// These two tokens aren't really arguments or directives; instead, they're
// fields of objects that can be passed as the stardog `orderBy` argument.
var stardogOrderByArgumentFieldPropertyToken = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'OrderByArgumentFieldPropertyToken',
    pattern: 'field',
    categories: [Name, EnumValueToken, FragmentName],
    longer_alt: Name,
});
var stardogOrderByArgumentDescPropertyToken = Object(chevrotain__WEBPACK_IMPORTED_MODULE_0__["createToken"])({
    name: 'OrderByArgumentDescPropertyToken',
    pattern: 'desc',
    categories: [Name, EnumValueToken, FragmentName],
    longer_alt: Name,
});
var stardogGraphQlTokenMap = __assign({}, graphQlTokenMap, stardogDirectives.tokenMap, stardogArguments.tokenMap, { OrderByArgumentFieldPropertyToken: stardogOrderByArgumentFieldPropertyToken, OrderByArgumentDescPropertyToken: stardogOrderByArgumentDescPropertyToken });
var stardogGraphQlTokens = graphQlTokens.concat(stardogDirectives.orderedTokens, stardogArguments.orderedTokens, [
    stardogOrderByArgumentFieldPropertyToken,
    stardogOrderByArgumentDescPropertyToken,
]);
// Add shared category and catch-all tokens.
var finalTokens = [FragmentName, EnumValueToken, Name, StringValueToken, Punctuator];
graphQlTokens.push.apply(graphQlTokens, finalTokens);
stardogGraphQlTokens.push.apply(stardogGraphQlTokens, finalTokens);



/***/ })

/******/ });
});
//# sourceMappingURL=millan.graphql.js.map