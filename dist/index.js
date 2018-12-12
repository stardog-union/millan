'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var utils = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
/*
 Utils using lodash style API. (not necessarily 100% compliant) for functional and other utils.
 These utils should replace usage of lodash in the production code base. not because they are any better...
 but for the purpose of being a dependency free library.

 The hotspots in the code are already written in imperative style for performance reasons.
 so writing several dozen utils which may be slower than the original lodash, does not matter as much
 considering they will not be invoked in hotspots...
 */
function isEmpty(arr) {
    return arr && arr.length === 0;
}
exports.isEmpty = isEmpty;
function keys(obj) {
    if (obj === undefined || obj === null) {
        return [];
    }
    return Object.keys(obj);
}
exports.keys = keys;
function values(obj) {
    var vals = [];
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
        vals.push(obj[keys[i]]);
    }
    return vals;
}
exports.values = values;
function mapValues(obj, callback) {
    var result = [];
    var objKeys = keys(obj);
    for (var idx = 0; idx < objKeys.length; idx++) {
        var currKey = objKeys[idx];
        result.push(callback.call(null, obj[currKey], currKey));
    }
    return result;
}
exports.mapValues = mapValues;
function map(arr, callback) {
    var result = [];
    for (var idx = 0; idx < arr.length; idx++) {
        result.push(callback.call(null, arr[idx], idx));
    }
    return result;
}
exports.map = map;
function flatten(arr) {
    var result = [];
    for (var idx = 0; idx < arr.length; idx++) {
        var currItem = arr[idx];
        if (Array.isArray(currItem)) {
            result = result.concat(flatten(currItem));
        }
        else {
            result.push(currItem);
        }
    }
    return result;
}
exports.flatten = flatten;
function first(arr) {
    return isEmpty(arr) ? undefined : arr[0];
}
exports.first = first;
function last(arr) {
    var len = arr && arr.length;
    return len ? arr[len - 1] : undefined;
}
exports.last = last;
function forEach(collection, iteratorCallback) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            iteratorCallback.call(null, collection[i], i);
        }
    }
    else if (isObject(collection)) {
        var colKeys = keys(collection);
        for (var i = 0; i < colKeys.length; i++) {
            var key = colKeys[i];
            var value = collection[key];
            iteratorCallback.call(null, value, key);
        }
    }
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
}
exports.forEach = forEach;
function isString(item) {
    return typeof item === "string";
}
exports.isString = isString;
function isUndefined(item) {
    return item === undefined;
}
exports.isUndefined = isUndefined;
function isFunction(item) {
    return item instanceof Function;
}
exports.isFunction = isFunction;
function drop(arr, howMuch) {
    if (howMuch === void 0) { howMuch = 1; }
    return arr.slice(howMuch, arr.length);
}
exports.drop = drop;
function dropRight(arr, howMuch) {
    if (howMuch === void 0) { howMuch = 1; }
    return arr.slice(0, arr.length - howMuch);
}
exports.dropRight = dropRight;
function filter(arr, predicate) {
    var result = [];
    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (predicate.call(null, item)) {
                result.push(item);
            }
        }
    }
    return result;
}
exports.filter = filter;
function reject(arr, predicate) {
    return filter(arr, function (item) { return !predicate(item); });
}
exports.reject = reject;
function pick(obj, predicate) {
    var keys = Object.keys(obj);
    var result = {};
    for (var i = 0; i < keys.length; i++) {
        var currKey = keys[i];
        var currItem = obj[currKey];
        if (predicate(currItem)) {
            result[currKey] = currItem;
        }
    }
    return result;
}
exports.pick = pick;
function has(obj, prop) {
    if (isObject(obj)) {
        return obj.hasOwnProperty(prop);
    }
    return false;
}
exports.has = has;
function contains(arr, item) {
    return find(arr, function (currItem) { return currItem === item; }) !== undefined ? true : false;
}
exports.contains = contains;
/**
 * shallow clone
 */
function cloneArr(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
    }
    return newArr;
}
exports.cloneArr = cloneArr;
/**
 * shallow clone
 */
function cloneObj(obj) {
    var clonedObj = {};
    for (var key in obj) {
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = obj[key];
        }
    }
    return clonedObj;
}
exports.cloneObj = cloneObj;
function find(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
            return item;
        }
    }
    return undefined;
}
exports.find = find;
function findAll(arr, predicate) {
    var found = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (predicate.call(null, item)) {
            found.push(item);
        }
    }
    return found;
}
exports.findAll = findAll;
function reduce(arrOrObj, iterator, initial) {
    var vals = Array.isArray(arrOrObj)
        ? arrOrObj
        : values(arrOrObj);
    var accumulator = initial;
    for (var i = 0; i < vals.length; i++) {
        accumulator = iterator.call(null, accumulator, vals[i], i);
    }
    return accumulator;
}
exports.reduce = reduce;
function compact(arr) {
    return reject(arr, function (item) { return item === null || item === undefined; });
}
exports.compact = compact;
function uniq(arr, identity) {
    if (identity === void 0) { identity = function (item) { return item; }; }
    var identities = [];
    return reduce(arr, function (result, currItem) {
        var currIdentity = identity(currItem);
        if (contains(identities, currIdentity)) {
            return result;
        }
        else {
            identities.push(currIdentity);
            return result.concat(currItem);
        }
    }, []);
}
exports.uniq = uniq;
function partial(func) {
    var restArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restArgs[_i - 1] = arguments[_i];
    }
    var firstArg = [null];
    var allArgs = firstArg.concat(restArgs);
    return Function.bind.apply(func, allArgs);
}
exports.partial = partial;
function isArray(obj) {
    return Array.isArray(obj);
}
exports.isArray = isArray;
function isRegExp(obj) {
    return obj instanceof RegExp;
}
exports.isRegExp = isRegExp;
function isObject(obj) {
    return obj instanceof Object;
}
exports.isObject = isObject;
function every(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
        if (!predicate(arr[i], i)) {
            return false;
        }
    }
    return true;
}
exports.every = every;
function difference(arr, values) {
    return reject(arr, function (item) { return contains(values, item); });
}
exports.difference = difference;
function some(arr, predicate) {
    for (var i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
            return true;
        }
    }
    return false;
}
exports.some = some;
function indexOf(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
    return -1;
}
exports.indexOf = indexOf;
function sortBy(arr, orderFunc) {
    var result = cloneArr(arr);
    result.sort(function (a, b) { return orderFunc(a) - orderFunc(b); });
    return result;
}
exports.sortBy = sortBy;
function zipObject(keys, values) {
    if (keys.length !== values.length) {
        throw Error("can't zipObject with different number of keys and values!");
    }
    var result = {};
    for (var i = 0; i < keys.length; i++) {
        result[keys[i]] = values[i];
    }
    return result;
}
exports.zipObject = zipObject;
/**
 * mutates! (and returns) target
 */
function assign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < sources.length; i++) {
        var curSource = sources[i];
        var currSourceKeys = keys(curSource);
        for (var j = 0; j < currSourceKeys.length; j++) {
            var currKey = currSourceKeys[j];
            target[currKey] = curSource[currKey];
        }
    }
    return target;
}
exports.assign = assign;
/**
 * mutates! (and returns) target
 */
function assignNoOverwrite(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < sources.length; i++) {
        var curSource = sources[i];
        if (isUndefined(curSource)) {
            continue;
        }
        var currSourceKeys = keys(curSource);
        for (var j = 0; j < currSourceKeys.length; j++) {
            var currKey = currSourceKeys[j];
            if (!has(target, currKey)) {
                target[currKey] = curSource[currKey];
            }
        }
    }
    return target;
}
exports.assignNoOverwrite = assignNoOverwrite;
function defaults() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return assignNoOverwrite.apply(null, [{}].concat(sources));
}
exports.defaults = defaults;
function groupBy(arr, groupKeyFunc) {
    var result = {};
    forEach(arr, function (item) {
        var currGroupKey = groupKeyFunc(item);
        var currGroupArr = result[currGroupKey];
        if (currGroupArr) {
            currGroupArr.push(item);
        }
        else {
            result[currGroupKey] = [item];
        }
    });
    return result;
}
exports.groupBy = groupBy;
/**
 * Merge obj2 into obj1.
 * Will overwrite existing properties with the same name
 */
function merge(obj1, obj2) {
    var result = cloneObj(obj1);
    var keys2 = keys(obj2);
    for (var i = 0; i < keys2.length; i++) {
        var key = keys2[i];
        var value = obj2[key];
        result[key] = value;
    }
    return result;
}
exports.merge = merge;
function NOOP() { }
exports.NOOP = NOOP;
function IDENTITY(item) {
    return item;
}
exports.IDENTITY = IDENTITY;

});

unwrapExports(utils);
var utils_1 = utils.isEmpty;
var utils_2 = utils.keys;
var utils_3 = utils.values;
var utils_4 = utils.mapValues;
var utils_5 = utils.map;
var utils_6 = utils.flatten;
var utils_7 = utils.first;
var utils_8 = utils.last;
var utils_9 = utils.forEach;
var utils_10 = utils.isString;
var utils_11 = utils.isUndefined;
var utils_12 = utils.isFunction;
var utils_13 = utils.drop;
var utils_14 = utils.dropRight;
var utils_15 = utils.filter;
var utils_16 = utils.reject;
var utils_17 = utils.pick;
var utils_18 = utils.has;
var utils_19 = utils.contains;
var utils_20 = utils.cloneArr;
var utils_21 = utils.cloneObj;
var utils_22 = utils.find;
var utils_23 = utils.findAll;
var utils_24 = utils.reduce;
var utils_25 = utils.compact;
var utils_26 = utils.uniq;
var utils_27 = utils.partial;
var utils_28 = utils.isArray;
var utils_29 = utils.isRegExp;
var utils_30 = utils.isObject;
var utils_31 = utils.every;
var utils_32 = utils.difference;
var utils_33 = utils.some;
var utils_34 = utils.indexOf;
var utils_35 = utils.sortBy;
var utils_36 = utils.zipObject;
var utils_37 = utils.assign;
var utils_38 = utils.assignNoOverwrite;
var utils_39 = utils.defaults;
var utils_40 = utils.groupBy;
var utils_41 = utils.merge;
var utils_42 = utils.NOOP;
var utils_43 = utils.IDENTITY;

var lang_extensions = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var utils_1 = utils;
function classNameFromInstance(instance) {
    return functionName(instance.constructor);
}
exports.classNameFromInstance = classNameFromInstance;
var FUNC_NAME_REGEXP = /^\s*function\s*(\S*)\s*\(/;
var NAME = "name";
/* istanbul ignore next too many hacks for IE/old versions of node.js here*/
function functionName(func) {
    // Engines that support Function.prototype.name OR the nth (n>1) time after
    // the name has been computed in the following else block.
    var existingNameProp = func.name;
    if (existingNameProp) {
        return existingNameProp;
    }
    // hack for IE and engines that do not support Object.defineProperty on function.name (Node.js 0.10 && 0.12)
    var computedName = func.toString().match(FUNC_NAME_REGEXP)[1];
    return computedName;
}
exports.functionName = functionName;
/**
 * @returns {boolean} - has the property been successfully defined
 */
function defineNameProp(obj, nameValue) {
    var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, NAME);
    /* istanbul ignore else -> will only run in old versions of node.js */
    if (utils_1.isUndefined(namePropDescriptor) || namePropDescriptor.configurable) {
        Object.defineProperty(obj, NAME, {
            enumerable: false,
            configurable: true,
            writable: false,
            value: nameValue
        });
        return true;
    }
    /* istanbul ignore next -> will only run in old versions of node.js */
    return false;
}
exports.defineNameProp = defineNameProp;
/**
 * simple Hashtable between a string and some generic value
 * this should be removed once typescript supports ES6 style Hashtable
 */
var HashTable = /** @class */ (function () {
    function HashTable() {
        this._state = {};
    }
    HashTable.prototype.keys = function () {
        return utils.keys(this._state);
    };
    HashTable.prototype.values = function () {
        return utils.values(this._state);
    };
    HashTable.prototype.put = function (key, value) {
        this._state[key] = value;
    };
    HashTable.prototype.putAll = function (other) {
        this._state = utils.assign(this._state, other._state);
    };
    HashTable.prototype.get = function (key) {
        // To avoid edge case with a key called "hasOwnProperty" we need to perform the commented out check below
        // -> if (Object.prototype.hasOwnProperty.call(this._state, key)) { ... } <-
        // however this costs nearly 25% of the parser's runtime.
        // if someone decides to name their Parser class "hasOwnProperty" they deserve what they will get :)
        return this._state[key];
    };
    HashTable.prototype.containsKey = function (key) {
        return utils.has(this._state, key);
    };
    HashTable.prototype.clear = function () {
        this._state = {};
    };
    return HashTable;
}());
exports.HashTable = HashTable;

});

unwrapExports(lang_extensions);
var lang_extensions_1 = lang_extensions.classNameFromInstance;
var lang_extensions_2 = lang_extensions.functionName;
var lang_extensions_3 = lang_extensions.defineNameProp;
var lang_extensions_4 = lang_extensions.HashTable;

var cache = createCommonjsModule(function (module, exports) {
/**
 * module used to cache static information about parsers,
 */
Object.defineProperty(exports, "__esModule", { value: true });


exports.CLASS_TO_DEFINITION_ERRORS = new lang_extensions.HashTable();
exports.CLASS_TO_SELF_ANALYSIS_DONE = new lang_extensions.HashTable();
exports.CLASS_TO_GRAMMAR_PRODUCTIONS = new lang_extensions.HashTable();
function getProductionsForClass(className) {
    return getFromNestedHashTable(className, exports.CLASS_TO_GRAMMAR_PRODUCTIONS);
}
exports.getProductionsForClass = getProductionsForClass;
exports.CLASS_TO_RESYNC_FOLLOW_SETS = new lang_extensions.HashTable();
function getResyncFollowsForClass(className) {
    return getFromNestedHashTable(className, exports.CLASS_TO_RESYNC_FOLLOW_SETS);
}
exports.getResyncFollowsForClass = getResyncFollowsForClass;
function setResyncFollowsForClass(className, followSet) {
    exports.CLASS_TO_RESYNC_FOLLOW_SETS.put(className, followSet);
}
exports.setResyncFollowsForClass = setResyncFollowsForClass;
exports.CLASS_TO_LOOKAHEAD_FUNCS = new lang_extensions.HashTable();
function getLookaheadFuncsForClass(className) {
    return getFromNestedHashTable(className, exports.CLASS_TO_LOOKAHEAD_FUNCS);
}
exports.getLookaheadFuncsForClass = getLookaheadFuncsForClass;
exports.CLASS_TO_FIRST_AFTER_REPETITION = new lang_extensions.HashTable();
function getFirstAfterRepForClass(className) {
    return getFromNestedHashTable(className, exports.CLASS_TO_FIRST_AFTER_REPETITION);
}
exports.getFirstAfterRepForClass = getFirstAfterRepForClass;
exports.CLASS_TO_PRODUCTION_OVERRIDEN = new lang_extensions.HashTable();
function getProductionOverriddenForClass(className) {
    return getFromNestedHashTable(className, exports.CLASS_TO_PRODUCTION_OVERRIDEN);
}
exports.getProductionOverriddenForClass = getProductionOverriddenForClass;
exports.CLASS_TO_CST_DICT_DEF_PER_RULE = new lang_extensions.HashTable();
exports.CLASS_TO_BASE_CST_VISITOR = new lang_extensions.HashTable();
exports.CLASS_TO_BASE_CST_VISITOR_WITH_DEFAULTS = new lang_extensions.HashTable();
exports.CLASS_TO_ALL_RULE_NAMES = new lang_extensions.HashTable();
function getFromNestedHashTable(className, hashTable) {
    var result = hashTable.get(className);
    if (result === undefined) {
        hashTable.put(className, new lang_extensions.HashTable());
        result = hashTable.get(className);
    }
    return result;
}
function clearCache() {
    var hasTables = utils.filter(utils.values(module.exports), function (currHashTable) { return currHashTable instanceof lang_extensions.HashTable; });
    utils.forEach(hasTables, function (currHashTable) { return currHashTable.clear(); });
}
exports.clearCache = clearCache;

});

unwrapExports(cache);
var cache_1 = cache.CLASS_TO_DEFINITION_ERRORS;
var cache_2 = cache.CLASS_TO_SELF_ANALYSIS_DONE;
var cache_3 = cache.CLASS_TO_GRAMMAR_PRODUCTIONS;
var cache_4 = cache.getProductionsForClass;
var cache_5 = cache.CLASS_TO_RESYNC_FOLLOW_SETS;
var cache_6 = cache.getResyncFollowsForClass;
var cache_7 = cache.setResyncFollowsForClass;
var cache_8 = cache.CLASS_TO_LOOKAHEAD_FUNCS;
var cache_9 = cache.getLookaheadFuncsForClass;
var cache_10 = cache.CLASS_TO_FIRST_AFTER_REPETITION;
var cache_11 = cache.getFirstAfterRepForClass;
var cache_12 = cache.CLASS_TO_PRODUCTION_OVERRIDEN;
var cache_13 = cache.getProductionOverriddenForClass;
var cache_14 = cache.CLASS_TO_CST_DICT_DEF_PER_RULE;
var cache_15 = cache.CLASS_TO_BASE_CST_VISITOR;
var cache_16 = cache.CLASS_TO_BASE_CST_VISITOR_WITH_DEFAULTS;
var cache_17 = cache.CLASS_TO_ALL_RULE_NAMES;
var cache_18 = cache.clearCache;

var exceptions_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var MISMATCHED_TOKEN_EXCEPTION = "MismatchedTokenException";
var NO_VIABLE_ALT_EXCEPTION = "NoViableAltException";
var EARLY_EXIT_EXCEPTION = "EarlyExitException";
var NOT_ALL_INPUT_PARSED_EXCEPTION = "NotAllInputParsedException";
var RECOGNITION_EXCEPTION_NAMES = [
    MISMATCHED_TOKEN_EXCEPTION,
    NO_VIABLE_ALT_EXCEPTION,
    EARLY_EXIT_EXCEPTION,
    NOT_ALL_INPUT_PARSED_EXCEPTION
];
Object.freeze(RECOGNITION_EXCEPTION_NAMES);
// hacks to bypass no support for custom Errors in javascript/typescript
function isRecognitionException(error) {
    // can't do instanceof on hacked custom js exceptions
    return utils.contains(RECOGNITION_EXCEPTION_NAMES, error.name);
}
exports.isRecognitionException = isRecognitionException;
function MismatchedTokenException(message, token) {
    this.name = MISMATCHED_TOKEN_EXCEPTION;
    this.message = message;
    this.token = token;
    this.resyncedTokens = [];
}
exports.MismatchedTokenException = MismatchedTokenException;
// must use the "Error.prototype" instead of "new Error"
// because the stack trace points to where "new Error" was invoked"
MismatchedTokenException.prototype = Error.prototype;
function NoViableAltException(message, token) {
    this.name = NO_VIABLE_ALT_EXCEPTION;
    this.message = message;
    this.token = token;
    this.resyncedTokens = [];
}
exports.NoViableAltException = NoViableAltException;
NoViableAltException.prototype = Error.prototype;
function NotAllInputParsedException(message, token) {
    this.name = NOT_ALL_INPUT_PARSED_EXCEPTION;
    this.message = message;
    this.token = token;
    this.resyncedTokens = [];
}
exports.NotAllInputParsedException = NotAllInputParsedException;
NotAllInputParsedException.prototype = Error.prototype;
function EarlyExitException(message, token, previousToken) {
    this.name = EARLY_EXIT_EXCEPTION;
    this.message = message;
    this.token = token;
    this.previousToken = previousToken;
    this.resyncedTokens = [];
}
exports.EarlyExitException = EarlyExitException;
EarlyExitException.prototype = Error.prototype;

});

unwrapExports(exceptions_public);
var exceptions_public_1 = exceptions_public.isRecognitionException;
var exceptions_public_2 = exceptions_public.MismatchedTokenException;
var exceptions_public_3 = exceptions_public.NoViableAltException;
var exceptions_public_4 = exceptions_public.NotAllInputParsedException;
var exceptions_public_5 = exceptions_public.EarlyExitException;

var lexer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



var PATTERN = "PATTERN";
exports.DEFAULT_MODE = "defaultMode";
exports.MODES = "modes";
exports.SUPPORT_STICKY = typeof new RegExp("(?:)").sticky === "boolean";
function disableSticky() {
    exports.SUPPORT_STICKY = false;
}
exports.disableSticky = disableSticky;
function enableSticky() {
    exports.SUPPORT_STICKY = true;
}
exports.enableSticky = enableSticky;
function analyzeTokenTypes(tokenTypes, useSticky) {
    if (useSticky === void 0) { useSticky = exports.SUPPORT_STICKY; }
    var onlyRelevantTypes = utils.reject(tokenTypes, function (currType) {
        return currType[PATTERN] === lexer_public.Lexer.NA;
    });
    var hasCustom = false;
    var allTransformedPatterns = utils.map(onlyRelevantTypes, function (currType) {
        var currPattern = currType[PATTERN];
        if (utils.isRegExp(currPattern)) {
            var regExpSource = currPattern.source;
            if (regExpSource.length === 1 &&
                // only these regExp meta characters which can appear in a length one regExp
                regExpSource !== "^" &&
                regExpSource !== "$" &&
                regExpSource !== ".") {
                return regExpSource;
            }
            else if (regExpSource.length === 2 &&
                regExpSource[0] === "\\" &&
                // not a meta character
                !utils.contains([
                    "d",
                    "D",
                    "s",
                    "S",
                    "t",
                    "r",
                    "n",
                    "t",
                    "0",
                    "c",
                    "b",
                    "B",
                    "f",
                    "v",
                    "w",
                    "W"
                ], regExpSource[1])) {
                // escaped meta Characters: /\+/ /\[/
                // or redundant escaping: /\a/
                // without the escaping "\"
                return regExpSource[1];
            }
            else {
                return useSticky
                    ? addStickyFlag(currPattern)
                    : addStartOfInput(currPattern);
            }
        }
        else if (utils.isFunction(currPattern)) {
            hasCustom = true;
            // CustomPatternMatcherFunc - custom patterns do not require any transformations, only wrapping in a RegExp Like object
            return { exec: currPattern };
        }
        else if (utils.has(currPattern, "exec")) {
            hasCustom = true;
            // ICustomPattern
            return currPattern;
        }
        else if (typeof currPattern === "string") {
            // IGNORE ABOVE ELSE
            if (currPattern.length === 1) {
                return currPattern;
            }
            else {
                var escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
                var wrappedRegExp = new RegExp(escapedRegExpString);
                // TODO: extract the "?" expression, it is duplicated
                return useSticky
                    ? addStickyFlag(wrappedRegExp)
                    : addStartOfInput(wrappedRegExp);
            }
        }
        else {
            /* istanbul ignore next */
            throw Error("non exhaustive match");
        }
    });
    var patternIdxToType = utils.map(onlyRelevantTypes, function (currType) { return currType.tokenTypeIdx; });
    var patternIdxToGroup = utils.map(onlyRelevantTypes, function (clazz) {
        var groupName = clazz.GROUP;
        if (groupName === lexer_public.Lexer.SKIPPED) {
            return undefined;
        }
        else if (utils.isString(groupName)) {
            return groupName;
        }
        else if (utils.isUndefined(groupName)) {
            return false;
        }
        else {
            /* istanbul ignore next */
            throw Error("non exhaustive match");
        }
    });
    var patternIdxToLongerAltIdx = utils.map(onlyRelevantTypes, function (clazz) {
        var longerAltType = clazz.LONGER_ALT;
        if (longerAltType) {
            var longerAltIdx = utils.indexOf(onlyRelevantTypes, longerAltType);
            return longerAltIdx;
        }
    });
    var patternIdxToPushMode = utils.map(onlyRelevantTypes, function (clazz) { return clazz.PUSH_MODE; });
    var patternIdxToPopMode = utils.map(onlyRelevantTypes, function (clazz) {
        return utils.has(clazz, "POP_MODE");
    });
    var patternIdxToCanLineTerminator = utils.map(onlyRelevantTypes, function (clazz) { return clazz.LINE_BREAKS === true; });
    var patternIdxToIsCustom = utils.map(onlyRelevantTypes, isCustomPattern);
    var patternIdxToShort = utils.map(allTransformedPatterns, isShortPattern);
    var emptyGroups = utils.reduce(onlyRelevantTypes, function (acc, clazz) {
        var groupName = clazz.GROUP;
        if (utils.isString(groupName) && !(groupName === lexer_public.Lexer.SKIPPED)) {
            acc[groupName] = [];
        }
        return acc;
    }, {});
    var patternIdxToConfig = utils.map(allTransformedPatterns, function (x, idx) {
        return {
            pattern: allTransformedPatterns[idx],
            longerAlt: patternIdxToLongerAltIdx[idx],
            canLineTerminator: patternIdxToCanLineTerminator[idx],
            isCustom: patternIdxToIsCustom[idx],
            short: patternIdxToShort[idx],
            group: patternIdxToGroup[idx],
            push: patternIdxToPushMode[idx],
            pop: patternIdxToPopMode[idx],
            tokenTypeIdx: patternIdxToType[idx],
            tokenType: onlyRelevantTypes[idx]
        };
    });
    return {
        emptyGroups: emptyGroups,
        patternIdxToConfig: patternIdxToConfig,
        hasCustom: hasCustom
    };
}
exports.analyzeTokenTypes = analyzeTokenTypes;
function validatePatterns(tokenTypes, validModesNames) {
    var errors = [];
    var missingResult = findMissingPatterns(tokenTypes);
    errors = errors.concat(missingResult.errors);
    var invalidResult = findInvalidPatterns(missingResult.valid);
    var validTokenTypes = invalidResult.valid;
    errors = errors.concat(invalidResult.errors);
    errors = errors.concat(validateRegExpPattern(validTokenTypes));
    errors = errors.concat(findInvalidGroupType(validTokenTypes));
    errors = errors.concat(findModesThatDoNotExist(validTokenTypes, validModesNames));
    errors = errors.concat(findUnreachablePatterns(validTokenTypes));
    return errors;
}
exports.validatePatterns = validatePatterns;
function validateRegExpPattern(tokenTypes) {
    var errors = [];
    var withRegExpPatterns = utils.filter(tokenTypes, function (currTokType) {
        return utils.isRegExp(currTokType[PATTERN]);
    });
    errors = errors.concat(findEndOfInputAnchor(withRegExpPatterns));
    errors = errors.concat(findStartOfInputAnchor(withRegExpPatterns));
    errors = errors.concat(findUnsupportedFlags(withRegExpPatterns));
    errors = errors.concat(findDuplicatePatterns(withRegExpPatterns));
    errors = errors.concat(findEmptyMatchRegExps(withRegExpPatterns));
    return errors;
}
function findMissingPatterns(tokenTypes) {
    var tokenTypesWithMissingPattern = utils.filter(tokenTypes, function (currType) {
        return !utils.has(currType, PATTERN);
    });
    var errors = utils.map(tokenTypesWithMissingPattern, function (currType) {
        return {
            message: "Token Type: ->" +
                tokens_public.tokenName(currType) +
                "<- missing static 'PATTERN' property",
            type: lexer_public.LexerDefinitionErrorType.MISSING_PATTERN,
            tokenTypes: [currType]
        };
    });
    var valid = utils.difference(tokenTypes, tokenTypesWithMissingPattern);
    return { errors: errors, valid: valid };
}
exports.findMissingPatterns = findMissingPatterns;
function findInvalidPatterns(tokenTypes) {
    var tokenTypesWithInvalidPattern = utils.filter(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        return (!utils.isRegExp(pattern) &&
            !utils.isFunction(pattern) &&
            !utils.has(pattern, "exec") &&
            !utils.isString(pattern));
    });
    var errors = utils.map(tokenTypesWithInvalidPattern, function (currType) {
        return {
            message: "Token Type: ->" +
                tokens_public.tokenName(currType) +
                "<- static 'PATTERN' can only be a RegExp, a" +
                " Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
            type: lexer_public.LexerDefinitionErrorType.INVALID_PATTERN,
            tokenTypes: [currType]
        };
    });
    var valid = utils.difference(tokenTypes, tokenTypesWithInvalidPattern);
    return { errors: errors, valid: valid };
}
exports.findInvalidPatterns = findInvalidPatterns;
var end_of_input = /[^\\][\$]/;
function findEndOfInputAnchor(tokenTypes) {
    var invalidRegex = utils.filter(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        return end_of_input.test(pattern.source);
    });
    var errors = utils.map(invalidRegex, function (currType) {
        return {
            message: "Unexpected RegExp Anchor Error:\n" +
                "\tToken Type: ->" +
                tokens_public.tokenName(currType) +
                "<- static 'PATTERN' cannot contain end of input anchor '$'\n" +
                "\tSee sap.github.io/chevrotain/website/Building_Grammars/resolving_lexer_errors.html#ANCHORS" +
                "\tfor details.",
            type: lexer_public.LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
            tokenTypes: [currType]
        };
    });
    return errors;
}
exports.findEndOfInputAnchor = findEndOfInputAnchor;
function findEmptyMatchRegExps(tokenTypes) {
    var matchesEmptyString = utils.filter(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        return pattern.test("");
    });
    var errors = utils.map(matchesEmptyString, function (currType) {
        return {
            message: "Token Type: ->" +
                tokens_public.tokenName(currType) +
                "<- static 'PATTERN' must not match an empty string",
            type: lexer_public.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
            tokenTypes: [currType]
        };
    });
    return errors;
}
exports.findEmptyMatchRegExps = findEmptyMatchRegExps;
var start_of_input = /[^\\[][\^]|^\^/;
function findStartOfInputAnchor(tokenTypes) {
    var invalidRegex = utils.filter(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        return start_of_input.test(pattern.source);
    });
    var errors = utils.map(invalidRegex, function (currType) {
        return {
            message: "Unexpected RegExp Anchor Error:\n" +
                "\tToken Type: ->" +
                tokens_public.tokenName(currType) +
                "<- static 'PATTERN' cannot contain start of input anchor '^'\n" +
                "\tSee https://github.com/SAP/chevrotain/blob/master/docs/resolving_lexer_errors.md#ANCHORS\n" +
                "\tfor details.",
            type: lexer_public.LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
            tokenTypes: [currType]
        };
    });
    return errors;
}
exports.findStartOfInputAnchor = findStartOfInputAnchor;
function findUnsupportedFlags(tokenTypes) {
    var invalidFlags = utils.filter(tokenTypes, function (currType) {
        var pattern = currType[PATTERN];
        return (pattern instanceof RegExp && (pattern.multiline || pattern.global));
    });
    var errors = utils.map(invalidFlags, function (currType) {
        return {
            message: "Token Type: ->" +
                tokens_public.tokenName(currType) +
                "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
            type: lexer_public.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
            tokenTypes: [currType]
        };
    });
    return errors;
}
exports.findUnsupportedFlags = findUnsupportedFlags;
// This can only test for identical duplicate RegExps, not semantically equivalent ones.
function findDuplicatePatterns(tokenTypes) {
    var found = [];
    var identicalPatterns = utils.map(tokenTypes, function (outerType) {
        return utils.reduce(tokenTypes, function (result, innerType) {
            if (outerType.PATTERN.source === innerType.PATTERN.source &&
                !utils.contains(found, innerType) &&
                innerType.PATTERN !== lexer_public.Lexer.NA) {
                // this avoids duplicates in the result, each Token Type may only appear in one "set"
                // in essence we are creating Equivalence classes on equality relation.
                found.push(innerType);
                result.push(innerType);
                return result;
            }
            return result;
        }, []);
    });
    identicalPatterns = utils.compact(identicalPatterns);
    var duplicatePatterns = utils.filter(identicalPatterns, function (currIdenticalSet) {
        return currIdenticalSet.length > 1;
    });
    var errors = utils.map(duplicatePatterns, function (setOfIdentical) {
        var tokenTypeNames = utils.map(setOfIdentical, function (currType) {
            return tokens_public.tokenName(currType);
        });
        var dupPatternSrc = utils.first(setOfIdentical).PATTERN;
        return {
            message: "The same RegExp pattern ->" + dupPatternSrc + "<-" +
                ("has been used in all of the following Token Types: " + tokenTypeNames.join(", ") + " <-"),
            type: lexer_public.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
            tokenTypes: setOfIdentical
        };
    });
    return errors;
}
exports.findDuplicatePatterns = findDuplicatePatterns;
function findInvalidGroupType(tokenTypes) {
    var invalidTypes = utils.filter(tokenTypes, function (clazz) {
        if (!utils.has(clazz, "GROUP")) {
            return false;
        }
        var group = clazz.GROUP;
        return group !== lexer_public.Lexer.SKIPPED && group !== lexer_public.Lexer.NA && !utils.isString(group);
    });
    var errors = utils.map(invalidTypes, function (currType) {
        return {
            message: "Token Type: ->" +
                tokens_public.tokenName(currType) +
                "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
            type: lexer_public.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
            tokenTypes: [currType]
        };
    });
    return errors;
}
exports.findInvalidGroupType = findInvalidGroupType;
function findModesThatDoNotExist(tokenTypes, validModes) {
    var invalidModes = utils.filter(tokenTypes, function (clazz) {
        return (clazz.PUSH_MODE !== undefined &&
            !utils.contains(validModes, clazz.PUSH_MODE));
    });
    var errors = utils.map(invalidModes, function (clazz) {
        var msg = "Token Type: ->" + tokens_public.tokenName(clazz) + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + clazz.PUSH_MODE + "<-" + "which does not exist";
        return {
            message: msg,
            type: lexer_public.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
            tokenTypes: [clazz]
        };
    });
    return errors;
}
exports.findModesThatDoNotExist = findModesThatDoNotExist;
function findUnreachablePatterns(tokenTypes) {
    var errors = [];
    var canBeTested = utils.reduce(tokenTypes, function (result, tokType, idx) {
        var pattern = tokType.PATTERN;
        if (pattern === lexer_public.Lexer.NA) {
            return result;
        }
        // a more comprehensive validation for all forms of regExps would require
        // deeper regExp analysis capabilities
        if (utils.isString(pattern)) {
            result.push({ str: pattern, idx: idx, tokenType: tokType });
        }
        else if (utils.isRegExp(pattern) && noMetaChar(pattern)) {
            result.push({ str: pattern.source, idx: idx, tokenType: tokType });
        }
        return result;
    }, []);
    utils.forEach(tokenTypes, function (tokType, testIdx) {
        utils.forEach(canBeTested, function (_a) {
            var str = _a.str, idx = _a.idx, tokenType = _a.tokenType;
            if (testIdx < idx && testTokenType(str, tokType.PATTERN)) {
                var msg = "Token: ->" + tokens_public.tokenName(tokenType) + "<- can never be matched.\n" +
                    ("Because it appears AFTER the Token Type ->" + tokens_public.tokenName(tokType) + "<-") +
                    "in the lexer's definition.\n" +
                    "See http://sap.github.io/chevrotain/website/Building_Grammars/resolving_lexer_errors.html#UNREACHABLE";
                errors.push({
                    message: msg,
                    type: lexer_public.LexerDefinitionErrorType.UNREACHABLE_PATTERN,
                    tokenTypes: [tokType, tokenType]
                });
            }
        });
    });
    return errors;
}
exports.findUnreachablePatterns = findUnreachablePatterns;
function testTokenType(str, pattern) {
    if (utils.isRegExp(pattern)) {
        var regExpArray = pattern.exec(str);
        return regExpArray !== null && regExpArray.index === 0;
    }
    else if (utils.isFunction(pattern)) {
        // maintain the API of custom patterns
        return pattern(str, 0, [], {});
    }
    else if (utils.has(pattern, "exec")) {
        // maintain the API of custom patterns
        return pattern.exec(str, 0, [], {});
    }
    else if (typeof pattern === "string") {
        return pattern === str;
    }
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
}
function noMetaChar(regExp) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
    var metaChars = [
        ".",
        "\\",
        "[",
        "]",
        "|",
        "^",
        "$",
        "(",
        ")",
        "?",
        "*",
        "+",
        "{"
    ];
    return (utils.find(metaChars, function (char) { return regExp.source.indexOf(char) !== -1; }) ===
        undefined);
}
function addStartOfInput(pattern) {
    var flags = pattern.ignoreCase ? "i" : "";
    // always wrapping in a none capturing group preceded by '^' to make sure matching can only work on start of input.
    // duplicate/redundant start of input markers have no meaning (/^^^^A/ === /^A/)
    return new RegExp("^(?:" + pattern.source + ")", flags);
}
exports.addStartOfInput = addStartOfInput;
function addStickyFlag(pattern) {
    var flags = pattern.ignoreCase ? "iy" : "y";
    // always wrapping in a none capturing group preceded by '^' to make sure matching can only work on start of input.
    // duplicate/redundant start of input markers have no meaning (/^^^^A/ === /^A/)
    return new RegExp("" + pattern.source, flags);
}
exports.addStickyFlag = addStickyFlag;
function performRuntimeChecks(lexerDefinition, trackLines) {
    var errors = [];
    // some run time checks to help the end users.
    if (!utils.has(lexerDefinition, exports.DEFAULT_MODE)) {
        errors.push({
            message: "A MultiMode Lexer cannot be initialized without a <" +
                exports.DEFAULT_MODE +
                "> property in its definition\n",
            type: lexer_public.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
        });
    }
    if (!utils.has(lexerDefinition, exports.MODES)) {
        errors.push({
            message: "A MultiMode Lexer cannot be initialized without a <" +
                exports.MODES +
                "> property in its definition\n",
            type: lexer_public.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
        });
    }
    if (utils.has(lexerDefinition, exports.MODES) &&
        utils.has(lexerDefinition, exports.DEFAULT_MODE) &&
        !utils.has(lexerDefinition.modes, lexerDefinition.defaultMode)) {
        errors.push({
            message: "A MultiMode Lexer cannot be initialized with a " + exports.DEFAULT_MODE + ": <" + lexerDefinition.defaultMode + ">" + "which does not exist\n",
            type: lexer_public.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
        });
    }
    if (utils.has(lexerDefinition, exports.MODES)) {
        utils.forEach(lexerDefinition.modes, function (currModeValue, currModeName) {
            utils.forEach(currModeValue, function (currTokType, currIdx) {
                if (utils.isUndefined(currTokType)) {
                    errors.push({
                        message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" +
                            ("<" + currModeName + "> at index: <" + currIdx + ">\n"),
                        type: lexer_public.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
                    });
                }
            });
        });
    }
    var allTokenTypes = utils.flatten(utils.mapValues(lexerDefinition.modes, function (tokTypes) { return tokTypes; }));
    if (trackLines &&
        utils.find(allTokenTypes, function (currTokType) { return currTokType.LINE_BREAKS; }) === undefined) {
        errors.push({
            message: "No LINE_BREAKS Error:\n" +
                "\tThis Lexer has been defined to track line and column information,\n" +
                "\tyet none of the Token definitions contain a LINE_BREAK flag.\n" +
                "\tSee http://sap.github.io/chevrotain/website/Building_Grammars/resolving_lexer_errors.html#LINE_BREAKS \n" +
                "\tfor details.",
            type: lexer_public.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
        });
    }
    return errors;
}
exports.performRuntimeChecks = performRuntimeChecks;
function cloneEmptyGroups(emptyGroups) {
    var clonedResult = {};
    var groupKeys = utils.keys(emptyGroups);
    utils.forEach(groupKeys, function (currKey) {
        var currGroupValue = emptyGroups[currKey];
        /* istanbul ignore else */
        if (utils.isArray(currGroupValue)) {
            clonedResult[currKey] = [];
        }
        else {
            /* istanbul ignore next */
            throw Error("non exhaustive match");
        }
    });
    return clonedResult;
}
exports.cloneEmptyGroups = cloneEmptyGroups;
// TODO: refactor to avoid duplication
function isCustomPattern(tokenType) {
    var pattern = tokenType.PATTERN;
    if (utils.isRegExp(pattern)) {
        return false;
    }
    else if (utils.isFunction(pattern)) {
        // CustomPatternMatcherFunc - custom patterns do not require any transformations, only wrapping in a RegExp Like object
        return true;
    }
    else if (utils.has(pattern, "exec")) {
        // ICustomPattern
        return true;
    }
    else if (utils.isString(pattern)) {
        return false;
    }
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
}
exports.isCustomPattern = isCustomPattern;
function isShortPattern(pattern) {
    if (utils.isString(pattern) && pattern.length === 1) {
        return pattern.charCodeAt(0);
    }
    else {
        return false;
    }
}
exports.isShortPattern = isShortPattern;
/**
 * Faster than using a RegExp for default newline detection during lexing.
 */
exports.LineTerminatorOptimizedTester = {
    // implements /\n|\r\n?/g.test
    test: function (text) {
        var len = text.length;
        for (var i = this.lastIndex; i < len; i++) {
            var c = text.charCodeAt(i);
            if (c === 10) {
                this.lastIndex = i + 1;
                return true;
            }
            else if (c === 13) {
                if (text.charCodeAt(i + 1) === 10) {
                    this.lastIndex = i + 2;
                }
                else {
                    this.lastIndex = i + 1;
                }
                return true;
            }
        }
        return false;
    },
    lastIndex: 0
};

});

unwrapExports(lexer);
var lexer_1 = lexer.DEFAULT_MODE;
var lexer_2 = lexer.MODES;
var lexer_3 = lexer.SUPPORT_STICKY;
var lexer_4 = lexer.disableSticky;
var lexer_5 = lexer.enableSticky;
var lexer_6 = lexer.analyzeTokenTypes;
var lexer_7 = lexer.validatePatterns;
var lexer_8 = lexer.findMissingPatterns;
var lexer_9 = lexer.findInvalidPatterns;
var lexer_10 = lexer.findEndOfInputAnchor;
var lexer_11 = lexer.findEmptyMatchRegExps;
var lexer_12 = lexer.findStartOfInputAnchor;
var lexer_13 = lexer.findUnsupportedFlags;
var lexer_14 = lexer.findDuplicatePatterns;
var lexer_15 = lexer.findInvalidGroupType;
var lexer_16 = lexer.findModesThatDoNotExist;
var lexer_17 = lexer.findUnreachablePatterns;
var lexer_18 = lexer.addStartOfInput;
var lexer_19 = lexer.addStickyFlag;
var lexer_20 = lexer.performRuntimeChecks;
var lexer_21 = lexer.cloneEmptyGroups;
var lexer_22 = lexer.isCustomPattern;
var lexer_23 = lexer.isShortPattern;
var lexer_24 = lexer.LineTerminatorOptimizedTester;

var tokens = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



function tokenStructuredMatcher(tokInstance, tokConstructor) {
    var instanceType = tokInstance.tokenTypeIdx;
    if (instanceType === tokConstructor.tokenTypeIdx) {
        return true;
    }
    else {
        return (tokConstructor.isParent === true &&
            tokConstructor.categoryMatchesMap[instanceType] === true);
    }
}
exports.tokenStructuredMatcher = tokenStructuredMatcher;
// Optimized tokenMatcher in case our grammar does not use token categories
// Being so tiny it is much more likely to be in-lined and this avoid the function call overhead
function tokenStructuredMatcherNoCategories(token, tokType) {
    return token.tokenTypeIdx === tokType.tokenTypeIdx;
}
exports.tokenStructuredMatcherNoCategories = tokenStructuredMatcherNoCategories;
exports.tokenShortNameIdx = 1;
exports.tokenIdxToClass = new lang_extensions.HashTable();
function augmentTokenTypes(tokenTypes) {
    // collect the parent Token Types as well.
    var tokenTypesAndParents = expandCategories(tokenTypes);
    // add required tokenType and categoryMatches properties
    assignTokenDefaultProps(tokenTypesAndParents);
    // fill up the categoryMatches
    assignCategoriesMapProp(tokenTypesAndParents);
    assignCategoriesTokensProp(tokenTypesAndParents);
    utils.forEach(tokenTypesAndParents, function (tokType) {
        tokType.isParent = tokType.categoryMatches.length > 0;
    });
}
exports.augmentTokenTypes = augmentTokenTypes;
function expandCategories(tokenTypes) {
    var result = utils.cloneArr(tokenTypes);
    var categories = tokenTypes;
    var searching = true;
    while (searching) {
        categories = utils.compact(utils.flatten(utils.map(categories, function (currTokType) { return currTokType.CATEGORIES; })));
        var newCategories = utils.difference(categories, result);
        result = result.concat(newCategories);
        if (utils.isEmpty(newCategories)) {
            searching = false;
        }
        else {
            categories = newCategories;
        }
    }
    return result;
}
exports.expandCategories = expandCategories;
function assignTokenDefaultProps(tokenTypes) {
    utils.forEach(tokenTypes, function (currTokType) {
        if (!hasShortKeyProperty(currTokType)) {
            exports.tokenIdxToClass.put(exports.tokenShortNameIdx, currTokType);
            currTokType.tokenTypeIdx = exports.tokenShortNameIdx++;
        }
        // CATEGORIES? : TokenType | TokenType[]
        if (hasCategoriesProperty(currTokType) &&
            !utils.isArray(currTokType.CATEGORIES)) {
            currTokType.CATEGORIES = [currTokType.CATEGORIES];
        }
        if (!hasCategoriesProperty(currTokType)) {
            currTokType.CATEGORIES = [];
        }
        if (!hasExtendingTokensTypesProperty(currTokType)) {
            currTokType.categoryMatches = [];
        }
        if (!hasExtendingTokensTypesMapProperty(currTokType)) {
            currTokType.categoryMatchesMap = {};
        }
        if (!hasTokenNameProperty(currTokType)) {
            // saved for fast access during CST building.
            currTokType.tokenName = tokens_public.tokenName(currTokType);
        }
    });
}
exports.assignTokenDefaultProps = assignTokenDefaultProps;
function assignCategoriesTokensProp(tokenTypes) {
    utils.forEach(tokenTypes, function (currTokType) {
        // avoid duplications
        currTokType.categoryMatches = [];
        utils.forEach(currTokType.categoryMatchesMap, function (val, key) {
            currTokType.categoryMatches.push(exports.tokenIdxToClass.get(key).tokenTypeIdx);
        });
    });
}
exports.assignCategoriesTokensProp = assignCategoriesTokensProp;
function assignCategoriesMapProp(tokenTypes) {
    utils.forEach(tokenTypes, function (currTokType) {
        singleAssignCategoriesToksMap([], currTokType);
    });
}
exports.assignCategoriesMapProp = assignCategoriesMapProp;
function singleAssignCategoriesToksMap(path, nextNode) {
    utils.forEach(path, function (pathNode) {
        nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = true;
    });
    utils.forEach(nextNode.CATEGORIES, function (nextCategory) {
        var newPath = path.concat(nextNode);
        if (!utils.contains(newPath, nextCategory)) {
            singleAssignCategoriesToksMap(newPath, nextCategory);
        }
    });
}
function hasShortKeyProperty(tokType) {
    return utils.has(tokType, "tokenTypeIdx");
}
exports.hasShortKeyProperty = hasShortKeyProperty;
function hasCategoriesProperty(tokType) {
    return utils.has(tokType, "CATEGORIES");
}
exports.hasCategoriesProperty = hasCategoriesProperty;
function hasExtendingTokensTypesProperty(tokType) {
    return utils.has(tokType, "categoryMatches");
}
exports.hasExtendingTokensTypesProperty = hasExtendingTokensTypesProperty;
function hasExtendingTokensTypesMapProperty(tokType) {
    return utils.has(tokType, "categoryMatchesMap");
}
exports.hasExtendingTokensTypesMapProperty = hasExtendingTokensTypesMapProperty;
function hasTokenNameProperty(tokType) {
    return utils.has(tokType, "tokenName");
}
exports.hasTokenNameProperty = hasTokenNameProperty;
function isTokenType(tokType) {
    return utils.has(tokType, "tokenTypeIdx");
}
exports.isTokenType = isTokenType;

});

unwrapExports(tokens);
var tokens_1 = tokens.tokenStructuredMatcher;
var tokens_2 = tokens.tokenStructuredMatcherNoCategories;
var tokens_3 = tokens.tokenShortNameIdx;
var tokens_4 = tokens.tokenIdxToClass;
var tokens_5 = tokens.augmentTokenTypes;
var tokens_6 = tokens.expandCategories;
var tokens_7 = tokens.assignTokenDefaultProps;
var tokens_8 = tokens.assignCategoriesTokensProp;
var tokens_9 = tokens.assignCategoriesMapProp;
var tokens_10 = tokens.hasShortKeyProperty;
var tokens_11 = tokens.hasCategoriesProperty;
var tokens_12 = tokens.hasExtendingTokensTypesProperty;
var tokens_13 = tokens.hasExtendingTokensTypesMapProperty;
var tokens_14 = tokens.hasTokenNameProperty;
var tokens_15 = tokens.isTokenType;

var lexer_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



var LexerDefinitionErrorType;
(function (LexerDefinitionErrorType) {
    LexerDefinitionErrorType[LexerDefinitionErrorType["MISSING_PATTERN"] = 0] = "MISSING_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["INVALID_PATTERN"] = 1] = "INVALID_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["EOI_ANCHOR_FOUND"] = 2] = "EOI_ANCHOR_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["UNSUPPORTED_FLAGS_FOUND"] = 3] = "UNSUPPORTED_FLAGS_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["DUPLICATE_PATTERNS_FOUND"] = 4] = "DUPLICATE_PATTERNS_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["INVALID_GROUP_TYPE_FOUND"] = 5] = "INVALID_GROUP_TYPE_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["PUSH_MODE_DOES_NOT_EXIST"] = 6] = "PUSH_MODE_DOES_NOT_EXIST";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"] = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"] = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY";
    LexerDefinitionErrorType[LexerDefinitionErrorType["MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"] = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST";
    LexerDefinitionErrorType[LexerDefinitionErrorType["LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"] = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED";
    LexerDefinitionErrorType[LexerDefinitionErrorType["SOI_ANCHOR_FOUND"] = 11] = "SOI_ANCHOR_FOUND";
    LexerDefinitionErrorType[LexerDefinitionErrorType["EMPTY_MATCH_PATTERN"] = 12] = "EMPTY_MATCH_PATTERN";
    LexerDefinitionErrorType[LexerDefinitionErrorType["NO_LINE_BREAKS_FLAGS"] = 13] = "NO_LINE_BREAKS_FLAGS";
    LexerDefinitionErrorType[LexerDefinitionErrorType["UNREACHABLE_PATTERN"] = 14] = "UNREACHABLE_PATTERN";
})(LexerDefinitionErrorType = exports.LexerDefinitionErrorType || (exports.LexerDefinitionErrorType = {}));
var DEFAULT_LEXER_CONFIG = {
    deferDefinitionErrorsHandling: false,
    positionTracking: "full",
    lineTerminatorsPattern: /\n|\r\n?/g
};
Object.freeze(DEFAULT_LEXER_CONFIG);
var Lexer = /** @class */ (function () {
    /**
     * @param {SingleModeLexerDefinition | IMultiModeLexerDefinition} lexerDefinition -
     *  Structure composed of constructor functions for the Tokens types this lexer will support.
     *
     *  In the case of {SingleModeLexerDefinition} the structure is simply an array of TokenTypes.
     *  In the case of {IMultiModeLexerDefinition} the structure is an object with two properties:
     *    1. a "modes" property where each value is an array of TokenTypes.
     *    2. a "defaultMode" property specifying the initial lexer mode.
     *
     *  for example:
     *  {
     *     "modes" : {
     *     "modeX" : [Token1, Token2]
     *     "modeY" : [Token3, Token4]
     *     }
     *
     *     "defaultMode" : "modeY"
     *  }
     *
     *  A lexer with {MultiModesDefinition} is simply multiple Lexers where only one (mode) can be active at the same time.
     *  This is useful for lexing languages where there are different lexing rules depending on context.
     *
     *  The current lexing mode is selected via a "mode stack".
     *  The last (peek) value in the stack will be the current mode of the lexer.
     *
     *  Each Token Type can define that it will cause the Lexer to (after consuming an "instance" of the Token):
     *  1. PUSH_MODE : push a new mode to the "mode stack"
     *  2. POP_MODE  : pop the last mode from the "mode stack"
     *
     *  Examples:
     *       export class Attribute {
     *          static PATTERN = ...
     *          static PUSH_MODE = "modeY"
     *       }
     *
     *       export class EndAttribute {
     *          static PATTERN = ...
     *          static POP_MODE = true
     *       }
     *
     *  The TokenTypes must be in one of these forms:
     *
     *  1. With a PATTERN property that has a RegExp value for tokens to match:
     *     example: -->class Integer { static PATTERN = /[1-9]\d }<--
     *
     *  2. With a PATTERN property that has the value of the var Lexer.NA defined above.
     *     This is a convenience form used to avoid matching Token classes that only act as categories.
     *     example: -->class Keyword { static PATTERN = NA }<--
     *
     *
     *   The following RegExp patterns are not supported:
     *   a. '$' for match at end of input
     *   b. /b global flag
     *   c. /m multi-line flag
     *
     *   The Lexer will identify the first pattern that matches, Therefor the order of Token Constructors may be significant.
     *   For example when one pattern may match a prefix of another pattern.
     *
     *   Note that there are situations in which we may wish to order the longer pattern after the shorter one.
     *   For example: keywords vs Identifiers.
     *   'do'(/do/) and 'donald'(/w+)
     *
     *   * If the Identifier pattern appears before the 'do' pattern, both 'do' and 'donald'
     *     will be lexed as an Identifier.
     *
     *   * If the 'do' pattern appears before the Identifier pattern 'do' will be lexed correctly as a keyword.
     *     however 'donald' will be lexed as TWO separate tokens: keyword 'do' and identifier 'nald'.
     *
     *   To resolve this problem, add a static property on the keyword's constructor named: LONGER_ALT
     *   example:
     *
     *       export class Identifier extends Keyword { static PATTERN = /[_a-zA-Z][_a-zA-Z0-9]/ }
     *       export class Keyword Token {
     *          static PATTERN = Lexer.NA
     *          static LONGER_ALT = Identifier
     *       }
     *       export class Do extends Keyword { static PATTERN = /do/ }
     *       export class While extends Keyword { static PATTERN = /while/ }
     *       export class Return extends Keyword { static PATTERN = /return/ }
     *
     *   The lexer will then also attempt to match a (longer) Identifier each time a keyword is matched.
     *
     *
     * @param {ILexerConfig} [config=DEFAULT_LEXER_CONFIG] -
     *                  The Lexer's configuration @see {ILexerConfig} for details.
     */
    function Lexer(lexerDefinition, config) {
        if (config === void 0) { config = DEFAULT_LEXER_CONFIG; }
        var _this = this;
        this.lexerDefinition = lexerDefinition;
        this.lexerDefinitionErrors = [];
        this.patternIdxToConfig = {};
        this.modes = [];
        this.emptyGroups = {};
        this.config = undefined;
        this.trackStartLines = true;
        this.trackEndLines = true;
        this.hasCustom = false;
        if (typeof config === "boolean") {
            throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\n" +
                "a boolean 2nd argument is no longer supported");
        }
        // todo: defaults func?
        this.config = utils.merge(DEFAULT_LEXER_CONFIG, config);
        if (this.config.lineTerminatorsPattern ===
            DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) {
            // optimized built-in implementation for the defaults definition of lineTerminators
            this.config.lineTerminatorsPattern = lexer.LineTerminatorOptimizedTester;
        }
        this.trackStartLines = /full|onlyStart/i.test(this.config.positionTracking);
        this.trackEndLines = /full/i.test(this.config.positionTracking);
        var hasOnlySingleMode = true;
        var actualDefinition;
        // Convert SingleModeLexerDefinition into a IMultiModeLexerDefinition.
        if (utils.isArray(lexerDefinition)) {
            actualDefinition = { modes: {} };
            actualDefinition.modes[lexer.DEFAULT_MODE] = utils.cloneArr(lexerDefinition);
            actualDefinition[lexer.DEFAULT_MODE] = lexer.DEFAULT_MODE;
        }
        else {
            // no conversion needed, input should already be a IMultiModeLexerDefinition
            hasOnlySingleMode = false;
            actualDefinition = utils.cloneObj(lexerDefinition);
        }
        this.lexerDefinitionErrors = this.lexerDefinitionErrors.concat(lexer.performRuntimeChecks(actualDefinition, this.trackStartLines));
        // for extra robustness to avoid throwing an none informative error message
        actualDefinition.modes = actualDefinition.modes
            ? actualDefinition.modes
            : {};
        // an error of undefined TokenTypes will be detected in "performRuntimeChecks" above.
        // this transformation is to increase robustness in the case of partially invalid lexer definition.
        utils.forEach(actualDefinition.modes, function (currModeValue, currModeName) {
            actualDefinition.modes[currModeName] = utils.reject(currModeValue, function (currTokType) { return utils.isUndefined(currTokType); });
        });
        var allModeNames = utils.keys(actualDefinition.modes);
        utils.forEach(actualDefinition.modes, function (currModDef, currModName) {
            _this.modes.push(currModName);
            _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(lexer.validatePatterns(currModDef, allModeNames));
            // If definition errors were encountered, the analysis phase may fail unexpectedly/
            // Considering a lexer with definition errors may never be used, there is no point
            // to performing the analysis anyhow...
            if (utils.isEmpty(_this.lexerDefinitionErrors)) {
                tokens.augmentTokenTypes(currModDef);
                var currAnalyzeResult = lexer.analyzeTokenTypes(currModDef);
                _this.patternIdxToConfig[currModName] =
                    currAnalyzeResult.patternIdxToConfig;
                _this.emptyGroups = utils.merge(_this.emptyGroups, currAnalyzeResult.emptyGroups);
                _this.hasCustom =
                    currAnalyzeResult.hasCustom || _this.hasCustom;
            }
        });
        this.defaultMode = actualDefinition.defaultMode;
        if (!utils.isEmpty(this.lexerDefinitionErrors) &&
            !this.config.deferDefinitionErrorsHandling) {
            var allErrMessages = utils.map(this.lexerDefinitionErrors, function (error) {
                return error.message;
            });
            var allErrMessagesString = allErrMessages.join("-----------------------\n");
            throw new Error("Errors detected in definition of Lexer:\n" +
                allErrMessagesString);
        }
        // Choose the relevant internal implementations for this specific parser.
        // These implementations should be in-lined by the JavaScript engine
        // to provide optimal performance in each scenario.
        if (lexer.SUPPORT_STICKY) {
            this.chopInput = utils.IDENTITY;
            this.match = this.matchWithTest;
        }
        else {
            this.updateLastIndex = utils.NOOP;
            this.match = this.matchWithExec;
        }
        if (hasOnlySingleMode) {
            this.handleModes = utils.NOOP;
        }
        if (this.trackStartLines === false) {
            this.computeNewColumn = utils.IDENTITY;
        }
        if (this.trackEndLines === false) {
            this.updateTokenEndLineColumnLocation = utils.NOOP;
        }
        if (/full/i.test(this.config.positionTracking)) {
            this.createTokenInstance = this.createFullToken;
        }
        else if (/onlyStart/i.test(this.config.positionTracking)) {
            this.createTokenInstance = this.createStartOnlyToken;
        }
        else if (/onlyOffset/i.test(this.config.positionTracking)) {
            this.createTokenInstance = this.createOffsetOnlyToken;
        }
        else {
            throw Error("Invalid <positionTracking> config option: \"" + this.config.positionTracking + "\"");
        }
        if (this.hasCustom) {
            this.addToken = this.addTokenUsingPush;
        }
        else {
            this.addToken = this.addTokenUsingMemberAccess;
        }
    }
    /**
     * Will lex(Tokenize) a string.
     * Note that this can be called repeatedly on different strings as this method
     * does not modify the state of the Lexer.
     *
     * @param {string} text - The string to lex
     * @param {string} [initialMode] - The initial Lexer Mode to start with, by default this will be the first mode in the lexer's
     *                                 definition. If the lexer has no explicit modes it will be the implicit single 'default_mode' mode.
     *
     * @returns {ILexingResult}
     */
    Lexer.prototype.tokenize = function (text, initialMode) {
        if (initialMode === void 0) { initialMode = this.defaultMode; }
        if (!utils.isEmpty(this.lexerDefinitionErrors)) {
            var allErrMessages = utils.map(this.lexerDefinitionErrors, function (error) {
                return error.message;
            });
            var allErrMessagesString = allErrMessages.join("-----------------------\n");
            throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" +
                allErrMessagesString);
        }
        var lexResult = this.tokenizeInternal(text, initialMode);
        return lexResult;
    };
    // There is quite a bit of duplication between this and "tokenizeInternalLazy"
    // This is intentional due to performance considerations.
    Lexer.prototype.tokenizeInternal = function (text, initialMode) {
        var _this = this;
        var i, j, matchAltImage, longerAltIdx, matchedImage, imageLength, group, tokType, newToken, errLength, droppedChar, msg, match;
        var orgText = text;
        var orgLength = orgText.length;
        var offset = 0;
        var matchedTokensIndex = 0;
        // initializing the tokensArray to the "guessed" size.
        // guessing too little will still reduce the number of array re-sizes on pushes.
        // guessing too large (Tested by guessing x4 too large) may cost a bit more of memory
        // but would still have a faster runtime by avoiding (All but one) array resizing.
        var guessedNumberOfTokens = this.hasCustom
            ? 0 // will break custom token pattern APIs the matchedTokens array will contain undefined elements.
            : Math.floor(text.length / 10);
        var matchedTokens = new Array(guessedNumberOfTokens);
        var errors = [];
        var line = this.trackStartLines ? 1 : undefined;
        var column = this.trackStartLines ? 1 : undefined;
        var groups = lexer.cloneEmptyGroups(this.emptyGroups);
        var trackLines = this.trackStartLines;
        var lineTerminatorPattern = this.config.lineTerminatorsPattern;
        var currModePatternsLength = 0;
        var patternIdxToConfig = [];
        var modeStack = [];
        var pop_mode = function (popToken) {
            // TODO: perhaps avoid this error in the edge case there is no more input?
            if (modeStack.length === 1 &&
                // if we have both a POP_MODE and a PUSH_MODE this is in-fact a "transition"
                // So no error should occur.
                popToken.tokenType.PUSH_MODE === undefined) {
                // if we try to pop the last mode there lexer will no longer have ANY mode.
                // thus the pop is ignored, an error will be created and the lexer will continue parsing in the previous mode.
                var msg_1 = "Unable to pop Lexer Mode after encountering Token ->" + popToken.image + "<- The Mode Stack is empty";
                errors.push({
                    offset: popToken.startOffset,
                    line: popToken.startLine !== undefined
                        ? popToken.startLine
                        : undefined,
                    column: popToken.startColumn !== undefined
                        ? popToken.startColumn
                        : undefined,
                    length: popToken.image.length,
                    message: msg_1
                });
            }
            else {
                modeStack.pop();
                var newMode = utils.last(modeStack);
                patternIdxToConfig = _this.patternIdxToConfig[newMode];
                currModePatternsLength = patternIdxToConfig.length;
            }
        };
        function push_mode(newMode) {
            modeStack.push(newMode);
            patternIdxToConfig = this.patternIdxToConfig[newMode];
            currModePatternsLength = patternIdxToConfig.length;
        }
        // this pattern seems to avoid a V8 de-optimization, although that de-optimization does not
        // seem to matter performance wise.
        push_mode.call(this, initialMode);
        var currConfig;
        while (offset < orgLength) {
            matchedImage = null;
            for (i = 0; i < currModePatternsLength; i++) {
                currConfig = patternIdxToConfig[i];
                var currPattern = currConfig.pattern;
                // manually in-lined because > 600 chars won't be in-lined in V8
                var singleCharCode = currConfig.short;
                if (singleCharCode !== false) {
                    if (orgText.charCodeAt(offset) === singleCharCode) {
                        // single character string
                        matchedImage = currPattern;
                    }
                }
                else if (currConfig.isCustom === true) {
                    match = currPattern.exec(orgText, offset, matchedTokens, groups);
                    matchedImage = match !== null ? match[0] : match;
                }
                else {
                    this.updateLastIndex(currPattern, offset);
                    matchedImage = this.match(currPattern, text, offset);
                }
                if (matchedImage !== null) {
                    // even though this pattern matched we must try a another longer alternative.
                    // this can be used to prioritize keywords over identifiers
                    longerAltIdx = currConfig.longerAlt;
                    if (longerAltIdx !== undefined) {
                        // TODO: micro optimize, avoid extra prop access
                        // by saving/linking longerAlt on the original config?
                        var longerAltConfig = patternIdxToConfig[longerAltIdx];
                        var longerAltPattern = longerAltConfig.pattern;
                        // single Char can never be a longer alt so no need to test it.
                        // manually in-lined because > 600 chars won't be in-lined in V8
                        if (longerAltConfig.isCustom === true) {
                            match = longerAltPattern.exec(orgText, offset, matchedTokens, groups);
                            matchAltImage = match !== null ? match[0] : match;
                        }
                        else {
                            this.updateLastIndex(longerAltPattern, offset);
                            matchAltImage = this.match(longerAltPattern, text, offset);
                        }
                        if (matchAltImage &&
                            matchAltImage.length > matchedImage.length) {
                            matchedImage = matchAltImage;
                            currConfig = longerAltConfig;
                        }
                    }
                    break;
                }
            }
            // successful match
            if (matchedImage !== null) {
                // matchedImage = match[0]
                imageLength = matchedImage.length;
                group = currConfig.group;
                if (group !== undefined) {
                    tokType = currConfig.tokenTypeIdx;
                    // TODO: "offset + imageLength" and the new column may be computed twice in case of "full" location information inside
                    // createFullToken method
                    newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength);
                    if (group === false) {
                        matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken);
                    }
                    else {
                        groups[group].push(newToken);
                    }
                }
                text = this.chopInput(text, imageLength);
                offset = offset + imageLength;
                // TODO: with newlines the column may be assigned twice
                column = this.computeNewColumn(column, imageLength);
                if (trackLines === true &&
                    currConfig.canLineTerminator === true) {
                    var numOfLTsInMatch = 0;
                    var foundTerminator = void 0;
                    var lastLTEndOffset = void 0;
                    lineTerminatorPattern.lastIndex = 0;
                    do {
                        foundTerminator = lineTerminatorPattern.test(matchedImage);
                        if (foundTerminator === true) {
                            lastLTEndOffset =
                                lineTerminatorPattern.lastIndex - 1;
                            numOfLTsInMatch++;
                        }
                    } while (foundTerminator);
                    if (numOfLTsInMatch !== 0) {
                        line = line + numOfLTsInMatch;
                        column = imageLength - lastLTEndOffset;
                        this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength);
                    }
                }
                // will be NOOP if no modes present
                this.handleModes(i, currConfig, pop_mode, push_mode, newToken);
            }
            else {
                // error recovery, drop characters until we identify a valid token's start point
                var errorStartOffset = offset;
                var errorLine = line;
                var errorColumn = column;
                var foundResyncPoint = false;
                while (!foundResyncPoint && offset < orgLength) {
                    // drop chars until we succeed in matching something
                    droppedChar = orgText.charCodeAt(offset);
                    // Identity Func (when sticky flag is enabled)
                    text = this.chopInput(text, 1);
                    offset++;
                    for (j = 0; j < currModePatternsLength; j++) {
                        var currConfig_1 = patternIdxToConfig[j];
                        var currPattern = currConfig_1.pattern;
                        // manually in-lined because > 600 chars won't be in-lined in V8
                        var singleCharCode = currConfig_1.short;
                        if (singleCharCode !== false) {
                            if (orgText.charCodeAt(offset) === singleCharCode) {
                                // single character string
                                foundResyncPoint = true;
                            }
                        }
                        else if (currConfig_1.isCustom === true) {
                            foundResyncPoint =
                                currPattern.exec(orgText, offset, matchedTokens, groups) !== null;
                        }
                        else {
                            this.updateLastIndex(currPattern, offset);
                            foundResyncPoint = currPattern.exec(text) !== null;
                        }
                        if (foundResyncPoint === true) {
                            break;
                        }
                    }
                }
                errLength = offset - errorStartOffset;
                // at this point we either re-synced or reached the end of the input text
                msg =
                    "unexpected character: ->" + orgText.charAt(errorStartOffset) + "<- at offset: " + errorStartOffset + "," +
                        (" skipped " + (offset - errorStartOffset) + " characters.");
                errors.push({
                    offset: errorStartOffset,
                    line: errorLine,
                    column: errorColumn,
                    length: errLength,
                    message: msg
                });
            }
        }
        // if we do have custom patterns which push directly into the
        if (!this.hasCustom) {
            // if we guessed a too large size for the tokens array this will shrink it to the right size.
            matchedTokens.length = matchedTokensIndex;
        }
        return {
            tokens: matchedTokens,
            groups: groups,
            errors: errors
        };
    };
    Lexer.prototype.handleModes = function (i, config, pop_mode, push_mode, newToken) {
        if (config.pop === true) {
            // need to save the PUSH_MODE property as if the mode is popped
            // patternIdxToPopMode is updated to reflect the new mode after popping the stack
            var pushMode = config.push;
            pop_mode(newToken);
            if (pushMode !== undefined) {
                push_mode.call(this, pushMode);
            }
        }
        else if (config.push !== undefined) {
            push_mode.call(this, config.push);
        }
    };
    Lexer.prototype.chopInput = function (text, length) {
        return text.substring(length);
    };
    Lexer.prototype.updateLastIndex = function (regExp, newLastIndex) {
        regExp.lastIndex = newLastIndex;
    };
    // TODO: decrease this under 600 characters? inspect stripping comments option in TSC compiler
    Lexer.prototype.updateTokenEndLineColumnLocation = function (newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
        var lastCharIsLT, fixForEndingInLT;
        if (group !== undefined) {
            // a none skipped multi line Token, need to update endLine/endColumn
            lastCharIsLT = lastLTIdx === imageLength - 1;
            fixForEndingInLT = lastCharIsLT ? -1 : 0;
            if (!(numOfLTsInMatch === 1 && lastCharIsLT === true)) {
                // if a token ends in a LT that last LT only affects the line numbering of following Tokens
                newToken.endLine = line + fixForEndingInLT;
                // the last LT in a token does not affect the endColumn either as the [columnStart ... columnEnd)
                // inclusive to exclusive range.
                newToken.endColumn = column - 1 + -fixForEndingInLT;
            }
            // else single LT in the last character of a token, no need to modify the endLine/EndColumn
        }
    };
    Lexer.prototype.computeNewColumn = function (oldColumn, imageLength) {
        return oldColumn + imageLength;
    };
    // Place holder, will be replaced by the correct variant according to the locationTracking option at runtime.
    /* istanbul ignore next - place holder */
    Lexer.prototype.createTokenInstance = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return null;
    };
    Lexer.prototype.createOffsetOnlyToken = function (image, startOffset, tokenTypeIdx, tokenType) {
        return {
            image: image,
            startOffset: startOffset,
            tokenTypeIdx: tokenTypeIdx,
            tokenType: tokenType
        };
    };
    Lexer.prototype.createStartOnlyToken = function (image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
        return {
            image: image,
            startOffset: startOffset,
            startLine: startLine,
            startColumn: startColumn,
            tokenTypeIdx: tokenTypeIdx,
            tokenType: tokenType
        };
    };
    Lexer.prototype.createFullToken = function (image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
        return {
            image: image,
            startOffset: startOffset,
            endOffset: startOffset + imageLength - 1,
            startLine: startLine,
            endLine: startLine,
            startColumn: startColumn,
            endColumn: startColumn + imageLength - 1,
            tokenTypeIdx: tokenTypeIdx,
            tokenType: tokenType
        };
    };
    // Place holder, will be replaced by the correct variant according to the locationTracking option at runtime.
    /* istanbul ignore next - place holder */
    Lexer.prototype.addToken = function (tokenVector, index, tokenToAdd) {
        return 666;
    };
    Lexer.prototype.addTokenUsingPush = function (tokenVector, index, tokenToAdd) {
        tokenVector.push(tokenToAdd);
        return index;
    };
    Lexer.prototype.addTokenUsingMemberAccess = function (tokenVector, index, tokenToAdd) {
        tokenVector[index] = tokenToAdd;
        index++;
        return index;
    };
    /* istanbul ignore next - place holder to be replaced with chosen alternative at runtime */
    Lexer.prototype.match = function (pattern, text, offset) {
        return null;
    };
    Lexer.prototype.matchWithTest = function (pattern, text, offset) {
        var found = pattern.test(text);
        if (found === true) {
            return text.substring(offset, pattern.lastIndex);
        }
        return null;
    };
    Lexer.prototype.matchWithExec = function (pattern, text) {
        var regExpArray = pattern.exec(text);
        return regExpArray !== null ? regExpArray[0] : regExpArray;
    };
    Lexer.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it will" +
        "be consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";
    Lexer.NA = /NOT_APPLICABLE/;
    return Lexer;
}());
exports.Lexer = Lexer;

});

unwrapExports(lexer_public);
var lexer_public_1 = lexer_public.LexerDefinitionErrorType;
var lexer_public_2 = lexer_public.Lexer;

var tokens_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




/**
 *  This can be used to improve the quality/readability of error messages or syntax diagrams.
 *
 * @param {TokenType} clazz - A constructor for a Token subclass
 * @returns {string} - The Human readable label for a Token if it exists.
 */
function tokenLabel(clazz) {
    if (hasTokenLabel(clazz)) {
        return clazz.LABEL;
    }
    else {
        return tokenName(clazz);
    }
}
exports.tokenLabel = tokenLabel;
function hasTokenLabel(obj) {
    return utils.isString(obj.LABEL) && obj.LABEL !== "";
}
exports.hasTokenLabel = hasTokenLabel;
function tokenName(obj) {
    // The tokenName property is needed under some old versions of node.js (0.10/0.12)
    // where the Function.prototype.name property is not defined as a 'configurable' property
    // enable producing readable error messages.
    /* istanbul ignore if -> will only run in old versions of node.js */
    if (utils.isObject(obj) &&
        obj.hasOwnProperty("tokenName") &&
        utils.isString(obj.tokenName)) {
        return obj.tokenName;
    }
    else {
        return lang_extensions.functionName(obj);
    }
}
exports.tokenName = tokenName;
var PARENT = "parent";
var CATEGORIES = "categories";
var LABEL = "label";
var GROUP = "group";
var PUSH_MODE = "push_mode";
var POP_MODE = "pop_mode";
var LONGER_ALT = "longer_alt";
var LINE_BREAKS = "line_breaks";
/**
 * @param {ITokenConfig} config - The configuration for
 * @returns {TokenType} - A constructor for the new Token subclass
 */
function createToken(config) {
    return createTokenInternal(config);
}
exports.createToken = createToken;
function createTokenInternal(config) {
    var tokenName = config.name;
    var pattern = config.pattern;
    var tokenType = {};
    // can be overwritten according to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/
    // name?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fname
    /* istanbul ignore if -> will only run in old versions of node.js */
    if (!lang_extensions.defineNameProp(tokenType, tokenName)) {
        // hack to save the tokenName in situations where the constructor's name property cannot be reconfigured
        tokenType.tokenName = tokenName;
    }
    if (!utils.isUndefined(pattern)) {
        tokenType.PATTERN = pattern;
    }
    if (utils.has(config, PARENT)) {
        throw "The parent property is no longer supported.\n" +
            "See: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.";
    }
    if (utils.has(config, CATEGORIES)) {
        tokenType.CATEGORIES = config[CATEGORIES];
    }
    tokens.augmentTokenTypes([tokenType]);
    if (utils.has(config, LABEL)) {
        tokenType.LABEL = config[LABEL];
    }
    if (utils.has(config, GROUP)) {
        tokenType.GROUP = config[GROUP];
    }
    if (utils.has(config, POP_MODE)) {
        tokenType.POP_MODE = config[POP_MODE];
    }
    if (utils.has(config, PUSH_MODE)) {
        tokenType.PUSH_MODE = config[PUSH_MODE];
    }
    if (utils.has(config, LONGER_ALT)) {
        tokenType.LONGER_ALT = config[LONGER_ALT];
    }
    if (utils.has(config, LINE_BREAKS)) {
        tokenType.LINE_BREAKS = config[LINE_BREAKS];
    }
    return tokenType;
}
exports.EOF = createToken({ name: "EOF", pattern: lexer_public.Lexer.NA });
tokens.augmentTokenTypes([exports.EOF]);
/**
 * Utility to create Chevrotain Token "instances"
 * Note that Chevrotain tokens are not real instances, and thus the instanceOf cannot be used.
 *
 * @param tokType
 * @param image
 * @param startOffset
 * @param endOffset
 * @param startLine
 * @param endLine
 * @param startColumn
 * @param endColumn
 * @returns {{image: string,
 *            startOffset: number,
 *            endOffset: number,
 *            startLine: number,
 *            endLine: number,
 *            startColumn: number,
 *            endColumn: number,
 *            tokenType}}
 */
function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
    return {
        image: image,
        startOffset: startOffset,
        endOffset: endOffset,
        startLine: startLine,
        endLine: endLine,
        startColumn: startColumn,
        endColumn: endColumn,
        tokenTypeIdx: tokType.tokenTypeIdx,
        tokenType: tokType
    };
}
exports.createTokenInstance = createTokenInstance;
/**
 * A Utility method to check if a token is of the type of the argument Token class.
 * This utility is needed because Chevrotain tokens support "categories" which means
 * A TokenType may have multiple categories, so a TokenType for the "true" literal in JavaScript
 * May be both a Keyword Token and a Literal Token.
 *
 * @param token {IToken}
 * @param tokType {TokenType}
 * @returns {boolean}
 */
function tokenMatcher(token, tokType) {
    return tokens.tokenStructuredMatcher(token, tokType);
}
exports.tokenMatcher = tokenMatcher;

});

unwrapExports(tokens_public);
var tokens_public_1 = tokens_public.tokenLabel;
var tokens_public_2 = tokens_public.hasTokenLabel;
var tokens_public_3 = tokens_public.tokenName;
var tokens_public_4 = tokens_public.createToken;
var tokens_public_5 = tokens_public.EOF;
var tokens_public_6 = tokens_public.createTokenInstance;
var tokens_public_7 = tokens_public.tokenMatcher;

var gast_public = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });


var AbstractProduction = /** @class */ (function () {
    function AbstractProduction(definition) {
        this.definition = definition;
    }
    AbstractProduction.prototype.accept = function (visitor) {
        visitor.visit(this);
        utils.forEach(this.definition, function (prod) {
            prod.accept(visitor);
        });
    };
    return AbstractProduction;
}());
exports.AbstractProduction = AbstractProduction;
var NonTerminal = /** @class */ (function (_super) {
    __extends(NonTerminal, _super);
    function NonTerminal(options) {
        var _this = _super.call(this, []) || this;
        _this.idx = 1;
        utils.assign(_this, options);
        return _this;
    }
    Object.defineProperty(NonTerminal.prototype, "definition", {
        get: function () {
            if (this.referencedRule !== undefined) {
                return this.referencedRule.definition;
            }
            return [];
        },
        set: function (definition) {
            // immutable
        },
        enumerable: true,
        configurable: true
    });
    NonTerminal.prototype.accept = function (visitor) {
        visitor.visit(this);
        // don't visit children of a reference, we will get cyclic infinite loops if we do so
    };
    return NonTerminal;
}(AbstractProduction));
exports.NonTerminal = NonTerminal;
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.orgText = "";
        utils.assign(_this, options);
        return _this;
    }
    return Rule;
}(AbstractProduction));
exports.Rule = Rule;
var Flat = /** @class */ (function (_super) {
    __extends(Flat, _super);
    // A named Flat production is used to indicate a Nested Rule in an alternation
    function Flat(options) {
        var _this = _super.call(this, options.definition) || this;
        utils.assign(_this, options);
        return _this;
    }
    return Flat;
}(AbstractProduction));
exports.Flat = Flat;
var Option = /** @class */ (function (_super) {
    __extends(Option, _super);
    function Option(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils.assign(_this, options);
        return _this;
    }
    return Option;
}(AbstractProduction));
exports.Option = Option;
var RepetitionMandatory = /** @class */ (function (_super) {
    __extends(RepetitionMandatory, _super);
    function RepetitionMandatory(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils.assign(_this, options);
        return _this;
    }
    return RepetitionMandatory;
}(AbstractProduction));
exports.RepetitionMandatory = RepetitionMandatory;
var RepetitionMandatoryWithSeparator = /** @class */ (function (_super) {
    __extends(RepetitionMandatoryWithSeparator, _super);
    function RepetitionMandatoryWithSeparator(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils.assign(_this, options);
        return _this;
    }
    return RepetitionMandatoryWithSeparator;
}(AbstractProduction));
exports.RepetitionMandatoryWithSeparator = RepetitionMandatoryWithSeparator;
var Repetition = /** @class */ (function (_super) {
    __extends(Repetition, _super);
    function Repetition(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils.assign(_this, options);
        return _this;
    }
    return Repetition;
}(AbstractProduction));
exports.Repetition = Repetition;
var RepetitionWithSeparator = /** @class */ (function (_super) {
    __extends(RepetitionWithSeparator, _super);
    function RepetitionWithSeparator(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils.assign(_this, options);
        return _this;
    }
    return RepetitionWithSeparator;
}(AbstractProduction));
exports.RepetitionWithSeparator = RepetitionWithSeparator;
var Alternation = /** @class */ (function (_super) {
    __extends(Alternation, _super);
    function Alternation(options) {
        var _this = _super.call(this, options.definition) || this;
        _this.idx = 1;
        utils.assign(_this, options);
        return _this;
    }
    return Alternation;
}(AbstractProduction));
exports.Alternation = Alternation;
var Terminal = /** @class */ (function () {
    function Terminal(options) {
        this.idx = 1;
        utils.assign(this, options);
    }
    Terminal.prototype.accept = function (visitor) {
        visitor.visit(this);
    };
    return Terminal;
}());
exports.Terminal = Terminal;
function serializeGrammar(topRules) {
    return utils.map(topRules, serializeProduction);
}
exports.serializeGrammar = serializeGrammar;
function serializeProduction(node) {
    function convertDefinition(definition) {
        return utils.map(definition, serializeProduction);
    }
    if (node instanceof NonTerminal) {
        return {
            type: "NonTerminal",
            name: node.nonTerminalName,
            idx: node.idx
        };
    }
    else if (node instanceof Flat) {
        return {
            type: "Flat",
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof Option) {
        return {
            type: "Option",
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof RepetitionMandatory) {
        return {
            type: "RepetitionMandatory",
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof RepetitionMandatoryWithSeparator) {
        return {
            type: "RepetitionMandatoryWithSeparator",
            separator: serializeProduction(new Terminal({ terminalType: node.separator })),
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof RepetitionWithSeparator) {
        return {
            type: "RepetitionWithSeparator",
            separator: serializeProduction(new Terminal({ terminalType: node.separator })),
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof Repetition) {
        return {
            type: "Repetition",
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof Alternation) {
        return {
            type: "Alternation",
            definition: convertDefinition(node.definition)
        };
    }
    else if (node instanceof Terminal) {
        var serializedTerminal = {
            type: "Terminal",
            name: tokens_public.tokenName(node.terminalType),
            label: tokens_public.tokenLabel(node.terminalType),
            idx: node.idx
        };
        var pattern = node.terminalType.PATTERN;
        if (node.terminalType.PATTERN) {
            serializedTerminal.pattern = utils.isRegExp(pattern)
                ? pattern.source
                : pattern;
        }
        return serializedTerminal;
    }
    else if (node instanceof Rule) {
        // IGNORE ABOVE ELSE
        return {
            type: "Rule",
            name: node.name,
            definition: convertDefinition(node.definition)
        };
    }
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
}
exports.serializeProduction = serializeProduction;

});

unwrapExports(gast_public);
var gast_public_1 = gast_public.AbstractProduction;
var gast_public_2 = gast_public.NonTerminal;
var gast_public_3 = gast_public.Rule;
var gast_public_4 = gast_public.Flat;
var gast_public_5 = gast_public.Option;
var gast_public_6 = gast_public.RepetitionMandatory;
var gast_public_7 = gast_public.RepetitionMandatoryWithSeparator;
var gast_public_8 = gast_public.Repetition;
var gast_public_9 = gast_public.RepetitionWithSeparator;
var gast_public_10 = gast_public.Alternation;
var gast_public_11 = gast_public.Terminal;
var gast_public_12 = gast_public.serializeGrammar;
var gast_public_13 = gast_public.serializeProduction;

var gast_visitor_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var GAstVisitor = /** @class */ (function () {
    function GAstVisitor() {
    }
    GAstVisitor.prototype.visit = function (node) {
        if (node instanceof gast_public.NonTerminal) {
            return this.visitNonTerminal(node);
        }
        else if (node instanceof gast_public.Flat) {
            return this.visitFlat(node);
        }
        else if (node instanceof gast_public.Option) {
            return this.visitOption(node);
        }
        else if (node instanceof gast_public.RepetitionMandatory) {
            return this.visitRepetitionMandatory(node);
        }
        else if (node instanceof gast_public.RepetitionMandatoryWithSeparator) {
            return this.visitRepetitionMandatoryWithSeparator(node);
        }
        else if (node instanceof gast_public.RepetitionWithSeparator) {
            return this.visitRepetitionWithSeparator(node);
        }
        else if (node instanceof gast_public.Repetition) {
            return this.visitRepetition(node);
        }
        else if (node instanceof gast_public.Alternation) {
            return this.visitAlternation(node);
        }
        else if (node instanceof gast_public.Terminal) {
            return this.visitTerminal(node);
        }
        else if (node instanceof gast_public.Rule) {
            return this.visitRule(node);
        }
        else {
            /* istanbul ignore next */
            throw Error("non exhaustive match");
        }
    };
    GAstVisitor.prototype.visitNonTerminal = function (node) { };
    GAstVisitor.prototype.visitFlat = function (node) { };
    GAstVisitor.prototype.visitOption = function (node) { };
    GAstVisitor.prototype.visitRepetition = function (node) { };
    GAstVisitor.prototype.visitRepetitionMandatory = function (node) { };
    GAstVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (node) { };
    GAstVisitor.prototype.visitRepetitionWithSeparator = function (node) { };
    GAstVisitor.prototype.visitAlternation = function (node) { };
    GAstVisitor.prototype.visitTerminal = function (node) { };
    GAstVisitor.prototype.visitRule = function (node) { };
    return GAstVisitor;
}());
exports.GAstVisitor = GAstVisitor;

});

unwrapExports(gast_visitor_public);
var gast_visitor_public_1 = gast_visitor_public.GAstVisitor;

var gast = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });




function isSequenceProd(prod) {
    return (prod instanceof gast_public.Flat ||
        prod instanceof gast_public.Option ||
        prod instanceof gast_public.Repetition ||
        prod instanceof gast_public.RepetitionMandatory ||
        prod instanceof gast_public.RepetitionMandatoryWithSeparator ||
        prod instanceof gast_public.RepetitionWithSeparator ||
        prod instanceof gast_public.Terminal ||
        prod instanceof gast_public.Rule);
}
exports.isSequenceProd = isSequenceProd;
function isOptionalProd(prod, alreadyVisited) {
    if (alreadyVisited === void 0) { alreadyVisited = []; }
    var isDirectlyOptional = prod instanceof gast_public.Option ||
        prod instanceof gast_public.Repetition ||
        prod instanceof gast_public.RepetitionWithSeparator;
    if (isDirectlyOptional) {
        return true;
    }
    // note that this can cause infinite loop if one optional empty TOP production has a cyclic dependency with another
    // empty optional top rule
    // may be indirectly optional ((A?B?C?) | (D?E?F?))
    if (prod instanceof gast_public.Alternation) {
        // for OR its enough for just one of the alternatives to be optional
        return utils.some(prod.definition, function (subProd) {
            return isOptionalProd(subProd, alreadyVisited);
        });
    }
    else if (prod instanceof gast_public.NonTerminal && utils.contains(alreadyVisited, prod)) {
        // avoiding stack overflow due to infinite recursion
        return false;
    }
    else if (prod instanceof gast_public.AbstractProduction) {
        if (prod instanceof gast_public.NonTerminal) {
            alreadyVisited.push(prod);
        }
        return utils.every(prod.definition, function (subProd) {
            return isOptionalProd(subProd, alreadyVisited);
        });
    }
    else {
        return false;
    }
}
exports.isOptionalProd = isOptionalProd;
function isBranchingProd(prod) {
    return prod instanceof gast_public.Alternation;
}
exports.isBranchingProd = isBranchingProd;
function getProductionDslName(prod) {
    if (prod instanceof gast_public.NonTerminal) {
        return "SUBRULE";
    }
    else if (prod instanceof gast_public.Option) {
        return "OPTION";
    }
    else if (prod instanceof gast_public.Alternation) {
        return "OR";
    }
    else if (prod instanceof gast_public.RepetitionMandatory) {
        return "AT_LEAST_ONE";
    }
    else if (prod instanceof gast_public.RepetitionMandatoryWithSeparator) {
        return "AT_LEAST_ONE_SEP";
    }
    else if (prod instanceof gast_public.RepetitionWithSeparator) {
        return "MANY_SEP";
    }
    else if (prod instanceof gast_public.Repetition) {
        return "MANY";
    }
    else if (prod instanceof gast_public.Terminal) {
        return "CONSUME";
    }
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
}
exports.getProductionDslName = getProductionDslName;
var GastCloneVisitor = /** @class */ (function (_super) {
    __extends(GastCloneVisitor, _super);
    function GastCloneVisitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GastCloneVisitor.prototype.visitNonTerminal = function (node) {
        return new gast_public.NonTerminal({
            nonTerminalName: node.nonTerminalName,
            idx: node.idx
        });
    };
    GastCloneVisitor.prototype.visitFlat = function (node) {
        var _this = this;
        var definition = utils.map(node.definition, function (currSubDef) {
            return _this.visit(currSubDef);
        });
        return new gast_public.Flat({ definition: definition, name: node.name });
    };
    GastCloneVisitor.prototype.visitOption = function (node) {
        var _this = this;
        var definition = utils.map(node.definition, function (currSubDef) {
            return _this.visit(currSubDef);
        });
        return new gast_public.Option({
            definition: definition,
            idx: node.idx,
            name: node.name
        });
    };
    GastCloneVisitor.prototype.visitRepetition = function (node) {
        var _this = this;
        var definition = utils.map(node.definition, function (currSubDef) {
            return _this.visit(currSubDef);
        });
        return new gast_public.Repetition({
            definition: definition,
            idx: node.idx,
            name: node.name
        });
    };
    GastCloneVisitor.prototype.visitRepetitionMandatory = function (node) {
        var _this = this;
        var definition = utils.map(node.definition, function (currSubDef) {
            return _this.visit(currSubDef);
        });
        return new gast_public.RepetitionMandatory({
            definition: definition,
            idx: node.idx,
            name: node.name
        });
    };
    GastCloneVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (node) {
        var _this = this;
        var definition = utils.map(node.definition, function (currSubDef) {
            return _this.visit(currSubDef);
        });
        return new gast_public.RepetitionMandatoryWithSeparator({
            definition: definition,
            separator: node.separator,
            idx: node.idx,
            name: node.name
        });
    };
    GastCloneVisitor.prototype.visitRepetitionWithSeparator = function (node) {
        var _this = this;
        var definition = utils.map(node.definition, function (currSubDef) {
            return _this.visit(currSubDef);
        });
        return new gast_public.RepetitionWithSeparator({
            definition: definition,
            separator: node.separator,
            idx: node.idx,
            name: node.name
        });
    };
    GastCloneVisitor.prototype.visitAlternation = function (node) {
        var _this = this;
        var definition = utils.map(node.definition, function (currSubDef) {
            return _this.visit(currSubDef);
        });
        return new gast_public.Alternation({
            definition: definition,
            idx: node.idx,
            name: node.name
        });
    };
    GastCloneVisitor.prototype.visitTerminal = function (node) {
        return new gast_public.Terminal({
            terminalType: node.terminalType,
            idx: node.idx
        });
    };
    GastCloneVisitor.prototype.visitRule = function (node) {
        var _this = this;
        var definition = utils.map(node.definition, function (currSubDef) {
            return _this.visit(currSubDef);
        });
        return new gast_public.Rule({
            name: node.name,
            definition: definition,
            orgText: node.orgText
        });
    };
    return GastCloneVisitor;
}(gast_visitor_public.GAstVisitor));
function cloneProduction(prod) {
    var cloningVisitor = new GastCloneVisitor();
    return cloningVisitor.visit(prod);
}
exports.cloneProduction = cloneProduction;
var DslMethodsCollectorVisitor = /** @class */ (function (_super) {
    __extends(DslMethodsCollectorVisitor, _super);
    function DslMethodsCollectorVisitor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // A minus is never valid in an identifier name
        _this.separator = "-";
        _this.dslMethods = {
            option: [],
            alternation: [],
            repetition: [],
            repetitionWithSeparator: [],
            repetitionMandatory: [],
            repetitionMandatoryWithSeparator: []
        };
        return _this;
    }
    DslMethodsCollectorVisitor.prototype.visitTerminal = function (terminal) {
        var key = tokens_public.tokenName(terminal.terminalType) + this.separator + "Terminal";
        if (!utils.has(this.dslMethods, key)) {
            this.dslMethods[key] = [];
        }
        this.dslMethods[key].push(terminal);
    };
    DslMethodsCollectorVisitor.prototype.visitNonTerminal = function (subrule) {
        var key = subrule.nonTerminalName + this.separator + "Terminal";
        if (!utils.has(this.dslMethods, key)) {
            this.dslMethods[key] = [];
        }
        this.dslMethods[key].push(subrule);
    };
    DslMethodsCollectorVisitor.prototype.visitOption = function (option) {
        this.dslMethods.option.push(option);
    };
    DslMethodsCollectorVisitor.prototype.visitRepetitionWithSeparator = function (manySep) {
        this.dslMethods.repetitionWithSeparator.push(manySep);
    };
    DslMethodsCollectorVisitor.prototype.visitRepetitionMandatory = function (atLeastOne) {
        this.dslMethods.repetitionMandatory.push(atLeastOne);
    };
    DslMethodsCollectorVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
        this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
    };
    DslMethodsCollectorVisitor.prototype.visitRepetition = function (many) {
        this.dslMethods.repetition.push(many);
    };
    DslMethodsCollectorVisitor.prototype.visitAlternation = function (or) {
        this.dslMethods.alternation.push(or);
    };
    return DslMethodsCollectorVisitor;
}(gast_visitor_public.GAstVisitor));
exports.DslMethodsCollectorVisitor = DslMethodsCollectorVisitor;

});

unwrapExports(gast);
var gast_1 = gast.isSequenceProd;
var gast_2 = gast.isOptionalProd;
var gast_3 = gast.isBranchingProd;
var gast_4 = gast.getProductionDslName;
var gast_5 = gast.cloneProduction;
var gast_6 = gast.DslMethodsCollectorVisitor;

var rest = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


/**
 *  A Grammar Walker that computes the "remaining" grammar "after" a productions in the grammar.
 */
var RestWalker = /** @class */ (function () {
    function RestWalker() {
    }
    RestWalker.prototype.walk = function (prod, prevRest) {
        var _this = this;
        if (prevRest === void 0) { prevRest = []; }
        utils.forEach(prod.definition, function (subProd, index) {
            var currRest = utils.drop(prod.definition, index + 1);
            if (subProd instanceof gast_public.NonTerminal) {
                _this.walkProdRef(subProd, currRest, prevRest);
            }
            else if (subProd instanceof gast_public.Terminal) {
                _this.walkTerminal(subProd, currRest, prevRest);
            }
            else if (subProd instanceof gast_public.Flat) {
                _this.walkFlat(subProd, currRest, prevRest);
            }
            else if (subProd instanceof gast_public.Option) {
                _this.walkOption(subProd, currRest, prevRest);
            }
            else if (subProd instanceof gast_public.RepetitionMandatory) {
                _this.walkAtLeastOne(subProd, currRest, prevRest);
            }
            else if (subProd instanceof gast_public.RepetitionMandatoryWithSeparator) {
                _this.walkAtLeastOneSep(subProd, currRest, prevRest);
            }
            else if (subProd instanceof gast_public.RepetitionWithSeparator) {
                _this.walkManySep(subProd, currRest, prevRest);
            }
            else if (subProd instanceof gast_public.Repetition) {
                _this.walkMany(subProd, currRest, prevRest);
            }
            else if (subProd instanceof gast_public.Alternation) {
                _this.walkOr(subProd, currRest, prevRest);
            }
            else {
                /* istanbul ignore next */
                throw Error("non exhaustive match");
            }
        });
    };
    RestWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) { };
    RestWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) { };
    RestWalker.prototype.walkFlat = function (flatProd, currRest, prevRest) {
        // ABCDEF => after the D the rest is EF
        var fullOrRest = currRest.concat(prevRest);
        this.walk(flatProd, fullOrRest);
    };
    RestWalker.prototype.walkOption = function (optionProd, currRest, prevRest) {
        // ABC(DE)?F => after the (DE)? the rest is F
        var fullOrRest = currRest.concat(prevRest);
        this.walk(optionProd, fullOrRest);
    };
    RestWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
        // ABC(DE)+F => after the (DE)+ the rest is (DE)?F
        var fullAtLeastOneRest = [
            new gast_public.Option({ definition: atLeastOneProd.definition })
        ].concat(currRest, prevRest);
        this.walk(atLeastOneProd, fullAtLeastOneRest);
    };
    RestWalker.prototype.walkAtLeastOneSep = function (atLeastOneSepProd, currRest, prevRest) {
        // ABC DE(,DE)* F => after the (,DE)+ the rest is (,DE)?F
        var fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
        this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
    };
    RestWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
        // ABC(DE)*F => after the (DE)* the rest is (DE)?F
        var fullManyRest = [
            new gast_public.Option({ definition: manyProd.definition })
        ].concat(currRest, prevRest);
        this.walk(manyProd, fullManyRest);
    };
    RestWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
        // ABC (DE(,DE)*)? F => after the (,DE)* the rest is (,DE)?F
        var fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
        this.walk(manySepProd, fullManySepRest);
    };
    RestWalker.prototype.walkOr = function (orProd, currRest, prevRest) {
        var _this = this;
        // ABC(D|E|F)G => when finding the (D|E|F) the rest is G
        var fullOrRest = currRest.concat(prevRest);
        // walk all different alternatives
        utils.forEach(orProd.definition, function (alt) {
            // wrapping each alternative in a single definition wrapper
            // to avoid errors in computing the rest of that alternative in the invocation to computeInProdFollows
            // (otherwise for OR([alt1,alt2]) alt2 will be considered in 'rest' of alt1
            var prodWrapper = new gast_public.Flat({ definition: [alt] });
            _this.walk(prodWrapper, fullOrRest);
        });
    };
    return RestWalker;
}());
exports.RestWalker = RestWalker;
function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
    var repSepRest = [
        new gast_public.Option({
            definition: [
                new gast_public.Terminal({ terminalType: repSepProd.separator })
            ].concat(repSepProd.definition)
        })
    ];
    var fullRepSepRest = repSepRest.concat(currRest, prevRest);
    return fullRepSepRest;
}

});

unwrapExports(rest);
var rest_1 = rest.RestWalker;

var first_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



function first(prod) {
    if (prod instanceof gast_public.NonTerminal) {
        // this could in theory cause infinite loops if
        // (1) prod A refs prod B.
        // (2) prod B refs prod A
        // (3) AB can match the empty set
        // in other words a cycle where everything is optional so the first will keep
        // looking ahead for the next optional part and will never exit
        // currently there is no safeguard for this unique edge case because
        // (1) not sure a grammar in which this can happen is useful for anything (productive)
        return first(prod.referencedRule);
    }
    else if (prod instanceof gast_public.Terminal) {
        return firstForTerminal(prod);
    }
    else if (gast.isSequenceProd(prod)) {
        return firstForSequence(prod);
    }
    else if (gast.isBranchingProd(prod)) {
        return firstForBranching(prod);
    }
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
}
exports.first = first;
function firstForSequence(prod) {
    var firstSet = [];
    var seq = prod.definition;
    var nextSubProdIdx = 0;
    var hasInnerProdsRemaining = seq.length > nextSubProdIdx;
    var currSubProd;
    // so we enter the loop at least once (if the definition is not empty
    var isLastInnerProdOptional = true;
    // scan a sequence until it's end or until we have found a NONE optional production in it
    while (hasInnerProdsRemaining && isLastInnerProdOptional) {
        currSubProd = seq[nextSubProdIdx];
        isLastInnerProdOptional = gast.isOptionalProd(currSubProd);
        firstSet = firstSet.concat(first(currSubProd));
        nextSubProdIdx = nextSubProdIdx + 1;
        hasInnerProdsRemaining = seq.length > nextSubProdIdx;
    }
    return utils.uniq(firstSet);
}
exports.firstForSequence = firstForSequence;
function firstForBranching(prod) {
    var allAlternativesFirsts = utils.map(prod.definition, function (innerProd) {
        return first(innerProd);
    });
    return utils.uniq(utils.flatten(allAlternativesFirsts));
}
exports.firstForBranching = firstForBranching;
function firstForTerminal(terminal) {
    return [terminal.terminalType];
}
exports.firstForTerminal = firstForTerminal;

});

unwrapExports(first_1);
var first_2 = first_1.first;
var first_3 = first_1.firstForSequence;
var first_4 = first_1.firstForBranching;
var first_5 = first_1.firstForTerminal;

var interpreter = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-use-before-declare */





/* tslint:enable:no-use-before-declare */
var AbstractNextPossibleTokensWalker = /** @class */ (function (_super) {
    __extends(AbstractNextPossibleTokensWalker, _super);
    function AbstractNextPossibleTokensWalker(topProd, path) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.path = path;
        _this.possibleTokTypes = [];
        _this.nextProductionName = "";
        _this.nextProductionOccurrence = 0;
        _this.found = false;
        _this.isAtEndOfPath = false;
        return _this;
    }
    AbstractNextPossibleTokensWalker.prototype.startWalking = function () {
        this.found = false;
        if (this.path.ruleStack[0] !== this.topProd.name) {
            throw Error("The path does not start with the walker's top Rule!");
        }
        // immutable for the win
        this.ruleStack = utils.cloneArr(this.path.ruleStack).reverse(); // intelij bug requires assertion
        this.occurrenceStack = utils.cloneArr(this.path.occurrenceStack).reverse(); // intelij bug requires assertion
        // already verified that the first production is valid, we now seek the 2nd production
        this.ruleStack.pop();
        this.occurrenceStack.pop();
        this.updateExpectedNext();
        this.walk(this.topProd);
        return this.possibleTokTypes;
    };
    AbstractNextPossibleTokensWalker.prototype.walk = function (prod, prevRest) {
        if (prevRest === void 0) { prevRest = []; }
        // stop scanning once we found the path
        if (!this.found) {
            _super.prototype.walk.call(this, prod, prevRest);
        }
    };
    AbstractNextPossibleTokensWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) {
        // found the next production, need to keep walking in it
        if (refProd.referencedRule.name === this.nextProductionName &&
            refProd.idx === this.nextProductionOccurrence) {
            var fullRest = currRest.concat(prevRest);
            this.updateExpectedNext();
            this.walk(refProd.referencedRule, fullRest);
        }
    };
    AbstractNextPossibleTokensWalker.prototype.updateExpectedNext = function () {
        // need to consume the Terminal
        if (utils.isEmpty(this.ruleStack)) {
            // must reset nextProductionXXX to avoid walking down another Top Level production while what we are
            // really seeking is the last Terminal...
            this.nextProductionName = "";
            this.nextProductionOccurrence = 0;
            this.isAtEndOfPath = true;
        }
        else {
            this.nextProductionName = this.ruleStack.pop();
            this.nextProductionOccurrence = this.occurrenceStack.pop();
        }
    };
    return AbstractNextPossibleTokensWalker;
}(rest.RestWalker));
exports.AbstractNextPossibleTokensWalker = AbstractNextPossibleTokensWalker;
var NextAfterTokenWalker = /** @class */ (function (_super) {
    __extends(NextAfterTokenWalker, _super);
    function NextAfterTokenWalker(topProd, path) {
        var _this = _super.call(this, topProd, path) || this;
        _this.path = path;
        _this.nextTerminalName = "";
        _this.nextTerminalOccurrence = 0;
        _this.nextTerminalName = tokens_public.tokenName(_this.path.lastTok);
        _this.nextTerminalOccurrence = _this.path.lastTokOccurrence;
        return _this;
    }
    NextAfterTokenWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) {
        if (this.isAtEndOfPath &&
            tokens_public.tokenName(terminal.terminalType) === this.nextTerminalName &&
            terminal.idx === this.nextTerminalOccurrence &&
            !this.found) {
            var fullRest = currRest.concat(prevRest);
            var restProd = new gast_public.Flat({ definition: fullRest });
            this.possibleTokTypes = first_1.first(restProd);
            this.found = true;
        }
    };
    return NextAfterTokenWalker;
}(AbstractNextPossibleTokensWalker));
exports.NextAfterTokenWalker = NextAfterTokenWalker;
/**
 * This walker only "walks" a single "TOP" level in the Grammar Ast, this means
 * it never "follows" production refs
 */
var AbstractNextTerminalAfterProductionWalker = /** @class */ (function (_super) {
    __extends(AbstractNextTerminalAfterProductionWalker, _super);
    function AbstractNextTerminalAfterProductionWalker(topRule, occurrence) {
        var _this = _super.call(this) || this;
        _this.topRule = topRule;
        _this.occurrence = occurrence;
        _this.result = {
            token: undefined,
            occurrence: undefined,
            isEndOfRule: undefined
        };
        return _this;
    }
    AbstractNextTerminalAfterProductionWalker.prototype.startWalking = function () {
        this.walk(this.topRule);
        return this.result;
    };
    return AbstractNextTerminalAfterProductionWalker;
}(rest.RestWalker));
exports.AbstractNextTerminalAfterProductionWalker = AbstractNextTerminalAfterProductionWalker;
var NextTerminalAfterManyWalker = /** @class */ (function (_super) {
    __extends(NextTerminalAfterManyWalker, _super);
    function NextTerminalAfterManyWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextTerminalAfterManyWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
        if (manyProd.idx === this.occurrence) {
            var firstAfterMany = utils.first(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterMany === undefined;
            if (firstAfterMany instanceof gast_public.Terminal) {
                this.result.token = firstAfterMany.terminalType;
                this.result.occurrence = firstAfterMany.idx;
            }
        }
        else {
            _super.prototype.walkMany.call(this, manyProd, currRest, prevRest);
        }
    };
    return NextTerminalAfterManyWalker;
}(AbstractNextTerminalAfterProductionWalker));
exports.NextTerminalAfterManyWalker = NextTerminalAfterManyWalker;
var NextTerminalAfterManySepWalker = /** @class */ (function (_super) {
    __extends(NextTerminalAfterManySepWalker, _super);
    function NextTerminalAfterManySepWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextTerminalAfterManySepWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
        if (manySepProd.idx === this.occurrence) {
            var firstAfterManySep = utils.first(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterManySep === undefined;
            if (firstAfterManySep instanceof gast_public.Terminal) {
                this.result.token = firstAfterManySep.terminalType;
                this.result.occurrence = firstAfterManySep.idx;
            }
        }
        else {
            _super.prototype.walkManySep.call(this, manySepProd, currRest, prevRest);
        }
    };
    return NextTerminalAfterManySepWalker;
}(AbstractNextTerminalAfterProductionWalker));
exports.NextTerminalAfterManySepWalker = NextTerminalAfterManySepWalker;
var NextTerminalAfterAtLeastOneWalker = /** @class */ (function (_super) {
    __extends(NextTerminalAfterAtLeastOneWalker, _super);
    function NextTerminalAfterAtLeastOneWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextTerminalAfterAtLeastOneWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
        if (atLeastOneProd.idx === this.occurrence) {
            var firstAfterAtLeastOne = utils.first(currRest.concat(prevRest));
            this.result.isEndOfRule = firstAfterAtLeastOne === undefined;
            if (firstAfterAtLeastOne instanceof gast_public.Terminal) {
                this.result.token = firstAfterAtLeastOne.terminalType;
                this.result.occurrence = firstAfterAtLeastOne.idx;
            }
        }
        else {
            _super.prototype.walkAtLeastOne.call(this, atLeastOneProd, currRest, prevRest);
        }
    };
    return NextTerminalAfterAtLeastOneWalker;
}(AbstractNextTerminalAfterProductionWalker));
exports.NextTerminalAfterAtLeastOneWalker = NextTerminalAfterAtLeastOneWalker;
// TODO: reduce code duplication in the AfterWalkers
var NextTerminalAfterAtLeastOneSepWalker = /** @class */ (function (_super) {
    __extends(NextTerminalAfterAtLeastOneSepWalker, _super);
    function NextTerminalAfterAtLeastOneSepWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NextTerminalAfterAtLeastOneSepWalker.prototype.walkAtLeastOneSep = function (atleastOneSepProd, currRest, prevRest) {
        if (atleastOneSepProd.idx === this.occurrence) {
            var firstAfterfirstAfterAtLeastOneSep = utils.first(currRest.concat(prevRest));
            this.result.isEndOfRule =
                firstAfterfirstAfterAtLeastOneSep === undefined;
            if (firstAfterfirstAfterAtLeastOneSep instanceof gast_public.Terminal) {
                this.result.token =
                    firstAfterfirstAfterAtLeastOneSep.terminalType;
                this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx;
            }
        }
        else {
            _super.prototype.walkAtLeastOneSep.call(this, atleastOneSepProd, currRest, prevRest);
        }
    };
    return NextTerminalAfterAtLeastOneSepWalker;
}(AbstractNextTerminalAfterProductionWalker));
exports.NextTerminalAfterAtLeastOneSepWalker = NextTerminalAfterAtLeastOneSepWalker;
function possiblePathsFrom(targetDef, maxLength, currPath) {
    if (currPath === void 0) { currPath = []; }
    // avoid side effects
    currPath = utils.cloneArr(currPath);
    var result = [];
    var i = 0;
    function remainingPathWith(nextDef) {
        return nextDef.concat(utils.drop(targetDef, i + 1));
    }
    function getAlternativesForProd(definition) {
        var alternatives = possiblePathsFrom(remainingPathWith(definition), maxLength, currPath);
        return result.concat(alternatives);
    }
    /**
     * Mandatory productions will halt the loop as the paths computed from their recursive calls will already contain the
     * following (rest) of the targetDef.
     *
     * For optional productions (Option/Repetition/...) the loop will continue to represent the paths that do not include the
     * the optional production.
     */
    while (currPath.length < maxLength && i < targetDef.length) {
        var prod = targetDef[i];
        if (prod instanceof gast_public.Flat) {
            return getAlternativesForProd(prod.definition);
        }
        else if (prod instanceof gast_public.NonTerminal) {
            return getAlternativesForProd(prod.definition);
        }
        else if (prod instanceof gast_public.Option) {
            result = getAlternativesForProd(prod.definition);
        }
        else if (prod instanceof gast_public.RepetitionMandatory) {
            return getAlternativesForProd(prod.definition);
        }
        else if (prod instanceof gast_public.RepetitionMandatoryWithSeparator) {
            var newDef = [
                new gast_public.Flat({ definition: prod.definition }),
                new gast_public.Repetition({
                    definition: [
                        new gast_public.Terminal({ terminalType: prod.separator })
                    ].concat(prod.definition)
                })
            ];
            return getAlternativesForProd(newDef);
        }
        else if (prod instanceof gast_public.RepetitionWithSeparator) {
            var newDef = prod.definition.concat([
                new gast_public.Repetition({
                    definition: [
                        new gast_public.Terminal({ terminalType: prod.separator })
                    ].concat(prod.definition)
                })
            ]);
            result = getAlternativesForProd(newDef);
        }
        else if (prod instanceof gast_public.Repetition) {
            result = getAlternativesForProd(prod.definition);
        }
        else if (prod instanceof gast_public.Alternation) {
            utils.forEach(prod.definition, function (currAlt) {
                result = getAlternativesForProd(currAlt.definition);
            });
            return result;
        }
        else if (prod instanceof gast_public.Terminal) {
            currPath.push(prod.terminalType);
        }
        else {
            /* istanbul ignore next */
            throw Error("non exhaustive match");
        }
        i++;
    }
    result.push({
        partialPath: currPath,
        suffixDef: utils.drop(targetDef, i)
    });
    return result;
}
exports.possiblePathsFrom = possiblePathsFrom;
function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
    var EXIT_NON_TERMINAL = "EXIT_NONE_TERMINAL";
    // to avoid creating a new Array each time.
    var EXIT_NON_TERMINAL_ARR = [EXIT_NON_TERMINAL];
    var EXIT_ALTERNATIVE = "EXIT_ALTERNATIVE";
    var foundCompletePath = false;
    var tokenVectorLength = tokenVector.length;
    var minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1;
    var result = [];
    var possiblePaths = [];
    possiblePaths.push({
        idx: -1,
        def: initialDef,
        ruleStack: [],
        occurrenceStack: []
    });
    while (!utils.isEmpty(possiblePaths)) {
        var currPath = possiblePaths.pop();
        // skip alternatives if no more results can be found (assuming deterministic grammar with fixed lookahead)
        if (currPath === EXIT_ALTERNATIVE) {
            if (foundCompletePath &&
                utils.last(possiblePaths).idx <= minimalAlternativesIndex) {
                // remove irrelevant alternative
                possiblePaths.pop();
            }
            continue;
        }
        var currDef = currPath.def;
        var currIdx = currPath.idx;
        var currRuleStack = currPath.ruleStack;
        var currOccurrenceStack = currPath.occurrenceStack;
        // For Example: an empty path could exist in a valid grammar in the case of an EMPTY_ALT
        if (utils.isEmpty(currDef)) {
            continue;
        }
        var prod = currDef[0];
        if (prod === EXIT_NON_TERMINAL) {
            var nextPath = {
                idx: currIdx,
                def: utils.drop(currDef),
                ruleStack: utils.dropRight(currRuleStack),
                occurrenceStack: utils.dropRight(currOccurrenceStack)
            };
            possiblePaths.push(nextPath);
        }
        else if (prod instanceof gast_public.Terminal) {
            if (currIdx < tokenVectorLength - 1) {
                var nextIdx = currIdx + 1;
                var actualToken = tokenVector[nextIdx];
                if (tokMatcher(actualToken, prod.terminalType)) {
                    var nextPath = {
                        idx: nextIdx,
                        def: utils.drop(currDef),
                        ruleStack: currRuleStack,
                        occurrenceStack: currOccurrenceStack
                    };
                    possiblePaths.push(nextPath);
                }
                // end of the line
            }
            else if (currIdx === tokenVectorLength - 1) {
                // IGNORE ABOVE ELSE
                result.push({
                    nextTokenType: prod.terminalType,
                    nextTokenOccurrence: prod.idx,
                    ruleStack: currRuleStack,
                    occurrenceStack: currOccurrenceStack
                });
                foundCompletePath = true;
            }
            else {
                /* istanbul ignore next */
                throw Error("non exhaustive match");
            }
        }
        else if (prod instanceof gast_public.NonTerminal) {
            var newRuleStack = utils.cloneArr(currRuleStack);
            newRuleStack.push(prod.nonTerminalName);
            var newOccurrenceStack = utils.cloneArr(currOccurrenceStack);
            newOccurrenceStack.push(prod.idx);
            var nextPath = {
                idx: currIdx,
                def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, utils.drop(currDef)),
                ruleStack: newRuleStack,
                occurrenceStack: newOccurrenceStack
            };
            possiblePaths.push(nextPath);
        }
        else if (prod instanceof gast_public.Option) {
            // the order of alternatives is meaningful, FILO (Last path will be traversed first).
            var nextPathWithout = {
                idx: currIdx,
                def: utils.drop(currDef),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWithout);
            // required marker to avoid backtracking paths whose higher priority alternatives already matched
            possiblePaths.push(EXIT_ALTERNATIVE);
            var nextPathWith = {
                idx: currIdx,
                def: prod.definition.concat(utils.drop(currDef)),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWith);
        }
        else if (prod instanceof gast_public.RepetitionMandatory) {
            // TODO:(THE NEW operators here take a while...) (convert once?)
            var secondIteration = new gast_public.Repetition({
                definition: prod.definition,
                idx: prod.idx
            });
            var nextDef = prod.definition.concat([secondIteration], utils.drop(currDef));
            var nextPath = {
                idx: currIdx,
                def: nextDef,
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPath);
        }
        else if (prod instanceof gast_public.RepetitionMandatoryWithSeparator) {
            // TODO:(THE NEW operators here take a while...) (convert once?)
            var separatorGast = new gast_public.Terminal({
                terminalType: prod.separator
            });
            var secondIteration = new gast_public.Repetition({
                definition: [separatorGast].concat(prod.definition),
                idx: prod.idx
            });
            var nextDef = prod.definition.concat([secondIteration], utils.drop(currDef));
            var nextPath = {
                idx: currIdx,
                def: nextDef,
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPath);
        }
        else if (prod instanceof gast_public.RepetitionWithSeparator) {
            // the order of alternatives is meaningful, FILO (Last path will be traversed first).
            var nextPathWithout = {
                idx: currIdx,
                def: utils.drop(currDef),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWithout);
            // required marker to avoid backtracking paths whose higher priority alternatives already matched
            possiblePaths.push(EXIT_ALTERNATIVE);
            var separatorGast = new gast_public.Terminal({
                terminalType: prod.separator
            });
            var nthRepetition = new gast_public.Repetition({
                definition: [separatorGast].concat(prod.definition),
                idx: prod.idx
            });
            var nextDef = prod.definition.concat([nthRepetition], utils.drop(currDef));
            var nextPathWith = {
                idx: currIdx,
                def: nextDef,
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWith);
        }
        else if (prod instanceof gast_public.Repetition) {
            // the order of alternatives is meaningful, FILO (Last path will be traversed first).
            var nextPathWithout = {
                idx: currIdx,
                def: utils.drop(currDef),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWithout);
            // required marker to avoid backtracking paths whose higher priority alternatives already matched
            possiblePaths.push(EXIT_ALTERNATIVE);
            // TODO: an empty repetition will cause infinite loops here, will the parser detect this in selfAnalysis?
            var nthRepetition = new gast_public.Repetition({
                definition: prod.definition,
                idx: prod.idx
            });
            var nextDef = prod.definition.concat([nthRepetition], utils.drop(currDef));
            var nextPathWith = {
                idx: currIdx,
                def: nextDef,
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            };
            possiblePaths.push(nextPathWith);
        }
        else if (prod instanceof gast_public.Alternation) {
            // the order of alternatives is meaningful, FILO (Last path will be traversed first).
            for (var i = prod.definition.length - 1; i >= 0; i--) {
                var currAlt = prod.definition[i];
                var currAltPath = {
                    idx: currIdx,
                    def: currAlt.definition.concat(utils.drop(currDef)),
                    ruleStack: currRuleStack,
                    occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(currAltPath);
                possiblePaths.push(EXIT_ALTERNATIVE);
            }
        }
        else if (prod instanceof gast_public.Flat) {
            possiblePaths.push({
                idx: currIdx,
                def: prod.definition.concat(utils.drop(currDef)),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
            });
        }
        else if (prod instanceof gast_public.Rule) {
            // last because we should only encounter at most a single one of these per invocation.
            possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
        }
        else {
            /* istanbul ignore next */
            throw Error("non exhaustive match");
        }
    }
    return result;
}
exports.nextPossibleTokensAfter = nextPossibleTokensAfter;
function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
    var newRuleStack = utils.cloneArr(currRuleStack);
    newRuleStack.push(topRule.name);
    var newCurrOccurrenceStack = utils.cloneArr(currOccurrenceStack);
    // top rule is always assumed to have been called with occurrence index 1
    newCurrOccurrenceStack.push(1);
    return {
        idx: currIdx,
        def: topRule.definition,
        ruleStack: newRuleStack,
        occurrenceStack: newCurrOccurrenceStack
    };
}

});

unwrapExports(interpreter);
var interpreter_1 = interpreter.AbstractNextPossibleTokensWalker;
var interpreter_2 = interpreter.NextAfterTokenWalker;
var interpreter_3 = interpreter.AbstractNextTerminalAfterProductionWalker;
var interpreter_4 = interpreter.NextTerminalAfterManyWalker;
var interpreter_5 = interpreter.NextTerminalAfterManySepWalker;
var interpreter_6 = interpreter.NextTerminalAfterAtLeastOneWalker;
var interpreter_7 = interpreter.NextTerminalAfterAtLeastOneSepWalker;
var interpreter_8 = interpreter.possiblePathsFrom;
var interpreter_9 = interpreter.nextPossibleTokensAfter;

var lookahead = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });






var PROD_TYPE;
(function (PROD_TYPE) {
    PROD_TYPE[PROD_TYPE["OPTION"] = 0] = "OPTION";
    PROD_TYPE[PROD_TYPE["REPETITION"] = 1] = "REPETITION";
    PROD_TYPE[PROD_TYPE["REPETITION_MANDATORY"] = 2] = "REPETITION_MANDATORY";
    PROD_TYPE[PROD_TYPE["REPETITION_MANDATORY_WITH_SEPARATOR"] = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR";
    PROD_TYPE[PROD_TYPE["REPETITION_WITH_SEPARATOR"] = 4] = "REPETITION_WITH_SEPARATOR";
    PROD_TYPE[PROD_TYPE["ALTERNATION"] = 5] = "ALTERNATION";
})(PROD_TYPE = exports.PROD_TYPE || (exports.PROD_TYPE = {}));
function getProdType(prod) {
    if (prod instanceof gast_public.Option) {
        return PROD_TYPE.OPTION;
    }
    else if (prod instanceof gast_public.Repetition) {
        return PROD_TYPE.REPETITION;
    }
    else if (prod instanceof gast_public.RepetitionMandatory) {
        return PROD_TYPE.REPETITION_MANDATORY;
    }
    else if (prod instanceof gast_public.RepetitionMandatoryWithSeparator) {
        return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
    }
    else if (prod instanceof gast_public.RepetitionWithSeparator) {
        return PROD_TYPE.REPETITION_WITH_SEPARATOR;
    }
    else if (prod instanceof gast_public.Alternation) {
        return PROD_TYPE.ALTERNATION;
    }
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
}
exports.getProdType = getProdType;
function buildLookaheadFuncForOr(occurrence, ruleGrammar, k, hasPredicates, dynamicTokensEnabled, laFuncBuilder) {
    var lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, k);
    var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths)
        ? tokens.tokenStructuredMatcherNoCategories
        : tokens.tokenStructuredMatcher;
    return laFuncBuilder(lookAheadPaths, hasPredicates, tokenMatcher, dynamicTokensEnabled);
}
exports.buildLookaheadFuncForOr = buildLookaheadFuncForOr;
/**
 *  When dealing with an Optional production (OPTION/MANY/2nd iteration of AT_LEAST_ONE/...) we need to compare
 *  the lookahead "inside" the production and the lookahead immediately "after" it in the same top level rule (context free).
 *
 *  Example: given a production:
 *  ABC(DE)?DF
 *
 *  The optional '(DE)?' should only be entered if we see 'DE'. a single Token 'D' is not sufficient to distinguish between the two
 *  alternatives.
 *
 *  @returns A Lookahead function which will return true IFF the parser should parse the Optional production.
 */
function buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
    var lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k);
    var tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths)
        ? tokens.tokenStructuredMatcherNoCategories
        : tokens.tokenStructuredMatcher;
    return lookaheadBuilder(lookAheadPaths[0], tokenMatcher, dynamicTokensEnabled);
}
exports.buildLookaheadFuncForOptionalProd = buildLookaheadFuncForOptionalProd;
function buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
    var numOfAlts = alts.length;
    var areAllOneTokenLookahead = utils.every(alts, function (currAlt) {
        return utils.every(currAlt, function (currPath) {
            return currPath.length === 1;
        });
    });
    // This version takes into account the predicates as well.
    if (hasPredicates) {
        /**
         * @returns {number} - The chosen alternative index
         */
        return function (orAlts) {
            // unfortunately the predicates must be extracted every single time
            // as they cannot be cached due to keep references to parameters(vars) which are no longer valid.
            // note that in the common case of no predicates, no cpu time will be wasted on this (see else block)
            var predicates = utils.map(orAlts, function (currAlt) { return currAlt.GATE; });
            for (var t = 0; t < numOfAlts; t++) {
                var currAlt = alts[t];
                var currNumOfPaths = currAlt.length;
                var currPredicate = predicates[t];
                if (currPredicate && !currPredicate.call(this)) {
                    // if the predicate does not match there is no point in checking the paths
                    continue;
                }
                nextPath: for (var j = 0; j < currNumOfPaths; j++) {
                    var currPath = currAlt[j];
                    var currPathLength = currPath.length;
                    for (var i = 0; i < currPathLength; i++) {
                        var nextToken = this.LA(i + 1);
                        if (tokenMatcher(nextToken, currPath[i]) === false) {
                            // mismatch in current path
                            // try the next pth
                            continue nextPath;
                        }
                    }
                    // found a full path that matches.
                    // this will also work for an empty ALT as the loop will be skipped
                    return t;
                }
                // none of the paths for the current alternative matched
                // try the next alternative
            }
            // none of the alternatives could be matched
            return undefined;
        };
    }
    else if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
        // optimized (common) case of all the lookaheads paths requiring only
        // a single token lookahead. These Optimizations cannot work if dynamically defined Tokens are used.
        var singleTokenAlts = utils.map(alts, function (currAlt) {
            return utils.flatten(currAlt);
        });
        var choiceToAlt_1 = utils.reduce(singleTokenAlts, function (result, currAlt, idx) {
            utils.forEach(currAlt, function (currTokType) {
                if (!utils.has(result, currTokType.tokenTypeIdx)) {
                    result[currTokType.tokenTypeIdx] = idx;
                }
                utils.forEach(currTokType.categoryMatches, function (currExtendingType) {
                    if (!utils.has(result, currExtendingType)) {
                        result[currExtendingType] = idx;
                    }
                });
            });
            return result;
        }, {});
        /**
         * @returns {number} - The chosen alternative index
         */
        return function () {
            var nextToken = this.LA(1);
            return choiceToAlt_1[nextToken.tokenTypeIdx];
        };
    }
    else {
        // optimized lookahead without needing to check the predicates at all.
        // this causes code duplication which is intentional to improve performance.
        /**
         * @returns {number} - The chosen alternative index
         */
        return function () {
            for (var t = 0; t < numOfAlts; t++) {
                var currAlt = alts[t];
                var currNumOfPaths = currAlt.length;
                nextPath: for (var j = 0; j < currNumOfPaths; j++) {
                    var currPath = currAlt[j];
                    var currPathLength = currPath.length;
                    for (var i = 0; i < currPathLength; i++) {
                        var nextToken = this.LA(i + 1);
                        if (tokenMatcher(nextToken, currPath[i]) === false) {
                            // mismatch in current path
                            // try the next pth
                            continue nextPath;
                        }
                    }
                    // found a full path that matches.
                    // this will also work for an empty ALT as the loop will be skipped
                    return t;
                }
                // none of the paths for the current alternative matched
                // try the next alternative
            }
            // none of the alternatives could be matched
            return undefined;
        };
    }
}
exports.buildAlternativesLookAheadFunc = buildAlternativesLookAheadFunc;
function buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled) {
    var areAllOneTokenLookahead = utils.every(alt, function (currPath) {
        return currPath.length === 1;
    });
    var numOfPaths = alt.length;
    // optimized (common) case of all the lookaheads paths requiring only
    // a single token lookahead.
    if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
        var singleTokensTypes = utils.flatten(alt);
        if (singleTokensTypes.length === 1 &&
            utils.isEmpty(singleTokensTypes[0].categoryMatches)) {
            var expectedTokenType = singleTokensTypes[0];
            var expectedTokenUniqueKey_1 = expectedTokenType.tokenTypeIdx;
            return function () {
                return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey_1;
            };
        }
        else {
            var choiceToAlt_2 = utils.reduce(singleTokensTypes, function (result, currTokType, idx) {
                result[currTokType.tokenTypeIdx] = true;
                utils.forEach(currTokType.categoryMatches, function (currExtendingType) {
                    result[currExtendingType] = true;
                });
                return result;
            }, {});
            return function () {
                var nextToken = this.LA(1);
                return choiceToAlt_2[nextToken.tokenTypeIdx] === true;
            };
        }
    }
    else {
        return function () {
            nextPath: for (var j = 0; j < numOfPaths; j++) {
                var currPath = alt[j];
                var currPathLength = currPath.length;
                for (var i = 0; i < currPathLength; i++) {
                    var nextToken = this.LA(i + 1);
                    if (tokenMatcher(nextToken, currPath[i]) === false) {
                        // mismatch in current path
                        // try the next pth
                        continue nextPath;
                    }
                }
                // found a full path that matches.
                return true;
            }
            // none of the paths matched
            return false;
        };
    }
}
exports.buildSingleAlternativeLookaheadFunction = buildSingleAlternativeLookaheadFunction;
var RestDefinitionFinderWalker = /** @class */ (function (_super) {
    __extends(RestDefinitionFinderWalker, _super);
    function RestDefinitionFinderWalker(topProd, targetOccurrence, targetProdType) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.targetOccurrence = targetOccurrence;
        _this.targetProdType = targetProdType;
        return _this;
    }
    RestDefinitionFinderWalker.prototype.startWalking = function () {
        this.walk(this.topProd);
        return this.restDef;
    };
    RestDefinitionFinderWalker.prototype.checkIsTarget = function (node, expectedProdType, currRest, prevRest) {
        if (node.idx === this.targetOccurrence &&
            this.targetProdType === expectedProdType) {
            this.restDef = currRest.concat(prevRest);
            return true;
        }
        // performance optimization, do not iterate over the entire Grammar ast after we have found the target
        return false;
    };
    RestDefinitionFinderWalker.prototype.walkOption = function (optionProd, currRest, prevRest) {
        if (!this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, optionProd, currRest, prevRest);
        }
    };
    RestDefinitionFinderWalker.prototype.walkAtLeastOne = function (atLeastOneProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, atLeastOneProd, currRest, prevRest);
        }
    };
    RestDefinitionFinderWalker.prototype.walkAtLeastOneSep = function (atLeastOneSepProd, currRest, prevRest) {
        if (!this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, atLeastOneSepProd, currRest, prevRest);
        }
    };
    RestDefinitionFinderWalker.prototype.walkMany = function (manyProd, currRest, prevRest) {
        if (!this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, manyProd, currRest, prevRest);
        }
    };
    RestDefinitionFinderWalker.prototype.walkManySep = function (manySepProd, currRest, prevRest) {
        if (!this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest)) {
            _super.prototype.walkOption.call(this, manySepProd, currRest, prevRest);
        }
    };
    return RestDefinitionFinderWalker;
}(rest.RestWalker));
/**
 * Returns the definition of a target production in a top level level rule.
 */
var InsideDefinitionFinderVisitor = /** @class */ (function (_super) {
    __extends(InsideDefinitionFinderVisitor, _super);
    function InsideDefinitionFinderVisitor(targetOccurrence, targetProdType) {
        var _this = _super.call(this) || this;
        _this.targetOccurrence = targetOccurrence;
        _this.targetProdType = targetProdType;
        _this.result = [];
        return _this;
    }
    InsideDefinitionFinderVisitor.prototype.checkIsTarget = function (node, expectedProdName) {
        if (node.idx === this.targetOccurrence &&
            this.targetProdType === expectedProdName) {
            this.result = node.definition;
        }
    };
    InsideDefinitionFinderVisitor.prototype.visitOption = function (node) {
        this.checkIsTarget(node, PROD_TYPE.OPTION);
    };
    InsideDefinitionFinderVisitor.prototype.visitRepetition = function (node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION);
    };
    InsideDefinitionFinderVisitor.prototype.visitRepetitionMandatory = function (node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
    };
    InsideDefinitionFinderVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
    };
    InsideDefinitionFinderVisitor.prototype.visitRepetitionWithSeparator = function (node) {
        this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
    };
    InsideDefinitionFinderVisitor.prototype.visitAlternation = function (node) {
        this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
    };
    return InsideDefinitionFinderVisitor;
}(gast_visitor_public.GAstVisitor));
function lookAheadSequenceFromAlternatives(altsDefs, k) {
    function getOtherPaths(pathsAndSuffixes, filterIdx) {
        return utils.reduce(pathsAndSuffixes, function (result, currPathsAndSuffixes, currIdx) {
            if (currIdx !== filterIdx) {
                var currPartialPaths = utils.map(currPathsAndSuffixes, function (singlePathAndSuffix) { return singlePathAndSuffix.partialPath; });
                return result.concat(currPartialPaths);
            }
            return result;
        }, []);
    }
    function isUniquePrefix(arr, item) {
        return (utils.find(arr, function (currOtherPath) {
            return utils.every(item, function (currPathTok, idx) { return currPathTok === currOtherPath[idx]; });
        }) === undefined);
    }
    function initializeArrayOfArrays(size) {
        var result = [];
        for (var i = 0; i < size; i++) {
            result.push([]);
        }
        return result;
    }
    var partialAlts = utils.map(altsDefs, function (currAlt) { return interpreter.possiblePathsFrom([currAlt], 1); });
    var finalResult = initializeArrayOfArrays(partialAlts.length);
    var newData = partialAlts;
    // maxLookahead loop
    for (var pathLength = 1; pathLength <= k; pathLength++) {
        var currDataset = newData;
        newData = initializeArrayOfArrays(currDataset.length);
        // alternatives loop
        for (var resultIdx = 0; resultIdx < currDataset.length; resultIdx++) {
            var currAltPathsAndSuffixes = currDataset[resultIdx];
            var otherPaths = getOtherPaths(currDataset, resultIdx);
            // paths in current alternative loop
            for (var currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
                var currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath;
                var suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef;
                var isUnique = isUniquePrefix(otherPaths, currPathPrefix);
                // even if a path is not unique, but there are no longer alternatives to try
                // or if we have reached the maximum lookahead (k) permitted.
                if (isUnique ||
                    utils.isEmpty(suffixDef) ||
                    currPathPrefix.length === k) {
                    var currAltResult = finalResult[resultIdx];
                    if (!containsPath(currAltResult, currPathPrefix)) {
                        currAltResult.push(currPathPrefix);
                    }
                }
                else {
                    var newPartialPathsAndSuffixes = interpreter.possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
                    newData[resultIdx] = newData[resultIdx].concat(newPartialPathsAndSuffixes);
                }
            }
        }
    }
    return finalResult;
}
exports.lookAheadSequenceFromAlternatives = lookAheadSequenceFromAlternatives;
function getLookaheadPathsForOr(occurrence, ruleGrammar, k) {
    var visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION);
    ruleGrammar.accept(visitor);
    return lookAheadSequenceFromAlternatives(visitor.result, k);
}
exports.getLookaheadPathsForOr = getLookaheadPathsForOr;
function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
    var insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
    ruleGrammar.accept(insideDefVisitor);
    var insideDef = insideDefVisitor.result;
    var afterDefWalker = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType);
    var afterDef = afterDefWalker.startWalking();
    var insideFlat = new gast_public.Flat({ definition: insideDef });
    var afterFlat = new gast_public.Flat({ definition: afterDef });
    return lookAheadSequenceFromAlternatives([insideFlat, afterFlat], k);
}
exports.getLookaheadPathsForOptionalProd = getLookaheadPathsForOptionalProd;
function containsPath(alternative, path) {
    var found = utils.find(alternative, function (otherPath) {
        return (path.length === otherPath.length &&
            utils.every(path, function (targetItem, idx) {
                return targetItem === otherPath[idx];
            }));
    });
    return found !== undefined;
}
exports.containsPath = containsPath;
function isStrictPrefixOfPath(prefix, other) {
    return (prefix.length < other.length &&
        utils.every(prefix, function (tokType, idx) {
            return tokType === other[idx];
        }));
}
exports.isStrictPrefixOfPath = isStrictPrefixOfPath;
function areTokenCategoriesNotUsed(lookAheadPaths) {
    return utils.every(lookAheadPaths, function (singleAltPaths) {
        return utils.every(singleAltPaths, function (singlePath) {
            return utils.every(singlePath, function (token) { return utils.isEmpty(token.categoryMatches); });
        });
    });
}
exports.areTokenCategoriesNotUsed = areTokenCategoriesNotUsed;

});

unwrapExports(lookahead);
var lookahead_1 = lookahead.PROD_TYPE;
var lookahead_2 = lookahead.getProdType;
var lookahead_3 = lookahead.buildLookaheadFuncForOr;
var lookahead_4 = lookahead.buildLookaheadFuncForOptionalProd;
var lookahead_5 = lookahead.buildAlternativesLookAheadFunc;
var lookahead_6 = lookahead.buildSingleAlternativeLookaheadFunction;
var lookahead_7 = lookahead.lookAheadSequenceFromAlternatives;
var lookahead_8 = lookahead.getLookaheadPathsForOr;
var lookahead_9 = lookahead.getLookaheadPathsForOptionalProd;
var lookahead_10 = lookahead.containsPath;
var lookahead_11 = lookahead.isStrictPrefixOfPath;
var lookahead_12 = lookahead.areTokenCategoriesNotUsed;

var keys = createCommonjsModule(function (module, exports) {
// Lookahead keys are 32Bit integers in the form
// TTTTTTTTT-ZZZZZZZZZZZZZZZ-YYYY-XXXX
// XXXX -> Occurrence Index bitmap.
// YYYY -> DSL Method Name bitmap.
// ZZZZZZZZZZZZZZZ -> Rule short Index bitmap.
// TTTTTTTTT -> alternation alternative index bitmap
Object.defineProperty(exports, "__esModule", { value: true });
exports.BITS_FOR_METHOD_IDX = 4;
exports.BITS_FOR_OCCURRENCE_IDX = 4;
exports.BITS_FOR_RULE_IDX = 24;
// TODO: validation, this means that there may at most 2^8 --> 256 alternatives for an alternation.
exports.BITS_FOR_ALT_IDX = 8;
// short string used as part of mapping keys.
// being short improves the performance when composing KEYS for maps out of these
// The 5 - 8 bits (16 possible values, are reserved for the DSL method indices)
/* tslint:disable */
exports.OR_IDX = 1 << exports.BITS_FOR_METHOD_IDX;
exports.OPTION_IDX = 2 << exports.BITS_FOR_METHOD_IDX;
exports.MANY_IDX = 3 << exports.BITS_FOR_METHOD_IDX;
exports.AT_LEAST_ONE_IDX = 4 << exports.BITS_FOR_METHOD_IDX;
exports.MANY_SEP_IDX = 5 << exports.BITS_FOR_METHOD_IDX;
exports.AT_LEAST_ONE_SEP_IDX = 6 << exports.BITS_FOR_METHOD_IDX;
/* tslint:enable */
// this actually returns a number, but it is always used as a string (object prop key)
function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
    /* tslint:disable */
    return occurrence | dslMethodIdx | ruleIdx;
    /* tslint:enable */
}
exports.getKeyForAutomaticLookahead = getKeyForAutomaticLookahead;
var BITS_START_FOR_ALT_IDX = 32 - exports.BITS_FOR_ALT_IDX;
function getKeyForAltIndex(ruleIdx, dslMethodIdx, occurrence, altIdx) {
    /* tslint:disable */
    // alternative indices are zero based, thus must always add one (turn on one bit) to guarantee uniqueness.
    var altIdxBitMap = (altIdx + 1) << BITS_START_FOR_ALT_IDX;
    return (getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) |
        altIdxBitMap);
    /* tslint:enable */
}
exports.getKeyForAltIndex = getKeyForAltIndex;

});

unwrapExports(keys);
var keys_1 = keys.BITS_FOR_METHOD_IDX;
var keys_2 = keys.BITS_FOR_OCCURRENCE_IDX;
var keys_3 = keys.BITS_FOR_RULE_IDX;
var keys_4 = keys.BITS_FOR_ALT_IDX;
var keys_5 = keys.OR_IDX;
var keys_6 = keys.OPTION_IDX;
var keys_7 = keys.MANY_IDX;
var keys_8 = keys.AT_LEAST_ONE_IDX;
var keys_9 = keys.MANY_SEP_IDX;
var keys_10 = keys.AT_LEAST_ONE_SEP_IDX;
var keys_11 = keys.getKeyForAutomaticLookahead;
var keys_12 = keys.getKeyForAltIndex;

var cst = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });





function addTerminalToCst(node, token, tokenTypeName) {
    if (node.children[tokenTypeName] === undefined) {
        node.children[tokenTypeName] = [token];
    }
    else {
        node.children[tokenTypeName].push(token);
    }
}
exports.addTerminalToCst = addTerminalToCst;
function addNoneTerminalToCst(node, ruleName, ruleResult) {
    if (node.children[ruleName] === undefined) {
        node.children[ruleName] = [ruleResult];
    }
    else {
        node.children[ruleName].push(ruleResult);
    }
}
exports.addNoneTerminalToCst = addNoneTerminalToCst;
var NamedDSLMethodsCollectorVisitor = /** @class */ (function (_super) {
    __extends(NamedDSLMethodsCollectorVisitor, _super);
    function NamedDSLMethodsCollectorVisitor(ruleIdx) {
        var _this = _super.call(this) || this;
        _this.result = [];
        _this.ruleIdx = ruleIdx;
        return _this;
    }
    NamedDSLMethodsCollectorVisitor.prototype.collectNamedDSLMethod = function (node, newNodeConstructor, methodIdx) {
        // TODO: better hack to copy what we need here...
        if (!utils.isUndefined(node.name)) {
            // copy without name so this will indeed be processed later.
            var nameLessNode = void 0;
            if (node instanceof gast_public.Option ||
                node instanceof gast_public.Repetition ||
                node instanceof gast_public.RepetitionMandatory ||
                node instanceof gast_public.Alternation) {
                nameLessNode = new newNodeConstructor({
                    definition: node.definition,
                    idx: node.idx
                });
            }
            else if (node instanceof gast_public.RepetitionMandatoryWithSeparator ||
                node instanceof gast_public.RepetitionWithSeparator) {
                nameLessNode = new newNodeConstructor({
                    definition: node.definition,
                    idx: node.idx,
                    separator: node.separator
                });
            }
            else {
                /* istanbul ignore next */
                throw Error("non exhaustive match");
            }
            var def = [nameLessNode];
            var key = keys.getKeyForAutomaticLookahead(this.ruleIdx, methodIdx, node.idx);
            this.result.push({ def: def, key: key, name: node.name, orgProd: node });
        }
    };
    NamedDSLMethodsCollectorVisitor.prototype.visitOption = function (node) {
        this.collectNamedDSLMethod(node, gast_public.Option, keys.OPTION_IDX);
    };
    NamedDSLMethodsCollectorVisitor.prototype.visitRepetition = function (node) {
        this.collectNamedDSLMethod(node, gast_public.Repetition, keys.MANY_IDX);
    };
    NamedDSLMethodsCollectorVisitor.prototype.visitRepetitionMandatory = function (node) {
        this.collectNamedDSLMethod(node, gast_public.RepetitionMandatory, keys.AT_LEAST_ONE_IDX);
    };
    NamedDSLMethodsCollectorVisitor.prototype.visitRepetitionMandatoryWithSeparator = function (node) {
        this.collectNamedDSLMethod(node, gast_public.RepetitionMandatoryWithSeparator, keys.AT_LEAST_ONE_SEP_IDX);
    };
    NamedDSLMethodsCollectorVisitor.prototype.visitRepetitionWithSeparator = function (node) {
        this.collectNamedDSLMethod(node, gast_public.RepetitionWithSeparator, keys.MANY_SEP_IDX);
    };
    NamedDSLMethodsCollectorVisitor.prototype.visitAlternation = function (node) {
        var _this = this;
        this.collectNamedDSLMethod(node, gast_public.Alternation, keys.OR_IDX);
        var hasMoreThanOneAlternative = node.definition.length > 1;
        utils.forEach(node.definition, function (currFlatAlt, altIdx) {
            if (!utils.isUndefined(currFlatAlt.name)) {
                var def = currFlatAlt.definition;
                if (hasMoreThanOneAlternative) {
                    def = [new gast_public.Option({ definition: currFlatAlt.definition })];
                }
                else {
                    // mandatory
                    def = currFlatAlt.definition;
                }
                var key = keys.getKeyForAltIndex(_this.ruleIdx, keys.OR_IDX, node.idx, altIdx);
                _this.result.push({
                    def: def,
                    key: key,
                    name: currFlatAlt.name,
                    orgProd: currFlatAlt
                });
            }
        });
    };
    return NamedDSLMethodsCollectorVisitor;
}(gast_visitor_public.GAstVisitor));
exports.NamedDSLMethodsCollectorVisitor = NamedDSLMethodsCollectorVisitor;
function analyzeCst(topRules, fullToShortName) {
    var result = {
        dictDef: new lang_extensions.HashTable(),
        allRuleNames: []
    };
    utils.forEach(topRules, function (currTopRule) {
        var currTopRuleShortName = fullToShortName.get(currTopRule.name);
        result.allRuleNames.push(currTopRule.name);
        var namedCollectorVisitor = new NamedDSLMethodsCollectorVisitor(currTopRuleShortName);
        currTopRule.accept(namedCollectorVisitor);
        utils.forEach(namedCollectorVisitor.result, function (_a) {
            var def = _a.def, key = _a.key, name = _a.name;
            result.allRuleNames.push(currTopRule.name + name);
        });
    });
    return result;
}
exports.analyzeCst = analyzeCst;

});

unwrapExports(cst);
var cst_1 = cst.addTerminalToCst;
var cst_2 = cst.addNoneTerminalToCst;
var cst_3 = cst.NamedDSLMethodsCollectorVisitor;
var cst_4 = cst.analyzeCst;

var version = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
// needs a separate module as this is required inside chevrotain productive code
// and also in the entry point for webpack(api.ts).
// A separate file avoids cyclic dependencies and webpack errors.
exports.VERSION = "3.0.1";

});

unwrapExports(version);
var version_1 = version.VERSION;

var errors_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


var utils_1 = utils;




/**
 * This is the default logic Chevrotain uses to construct error messages.
 * When constructing a custom error message provider it may be used as a reference
 * or reused.
 */
exports.defaultParserErrorProvider = {
    buildMismatchTokenMessage: function (_a) {
        var expected = _a.expected, actual = _a.actual, ruleName = _a.ruleName;
        var hasLabel = tokens_public.hasTokenLabel(expected);
        var expectedMsg = hasLabel
            ? "--> " + tokens_public.tokenLabel(expected) + " <--"
            : "token of type --> " + tokens_public.tokenName(expected) + " <--";
        var msg = "Expecting " + expectedMsg + " but found --> '" + actual.image + "' <--";
        return msg;
    },
    buildNotAllInputParsedMessage: function (_a) {
        var firstRedundant = _a.firstRedundant, ruleName = _a.ruleName;
        return ("Redundant input, expecting EOF but found: " + firstRedundant.image);
    },
    buildNoViableAltMessage: function (_a) {
        var expectedPathsPerAlt = _a.expectedPathsPerAlt, actual = _a.actual, customUserDescription = _a.customUserDescription, ruleName = _a.ruleName;
        var errPrefix = "Expecting: ";
        // TODO: issue: No Viable Alternative Error may have incomplete details. #502
        var actualText = utils_1.first(actual).image;
        var errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
            return errPrefix + customUserDescription + errSuffix;
        }
        else {
            var allLookAheadPaths = utils_1.reduce(expectedPathsPerAlt, function (result, currAltPaths) { return result.concat(currAltPaths); }, []);
            var nextValidTokenSequences = utils_1.map(allLookAheadPaths, function (currPath) {
                return "[" + utils_1.map(currPath, function (currTokenType) {
                    return tokens_public.tokenLabel(currTokenType);
                }).join(", ") + "]";
            });
            var nextValidSequenceItems = utils_1.map(nextValidTokenSequences, function (itemMsg, idx) { return "  " + (idx + 1) + ". " + itemMsg; });
            var calculatedDescription = "one of these possible Token sequences:\n" + nextValidSequenceItems.join("\n");
            return errPrefix + calculatedDescription + errSuffix;
        }
    },
    buildEarlyExitMessage: function (_a) {
        var expectedIterationPaths = _a.expectedIterationPaths, actual = _a.actual, customUserDescription = _a.customUserDescription, ruleName = _a.ruleName;
        var errPrefix = "Expecting: ";
        // TODO: issue: No Viable Alternative Error may have incomplete details. #502
        var actualText = utils_1.first(actual).image;
        var errSuffix = "\nbut found: '" + actualText + "'";
        if (customUserDescription) {
            return errPrefix + customUserDescription + errSuffix;
        }
        else {
            var nextValidTokenSequences = utils_1.map(expectedIterationPaths, function (currPath) {
                return "[" + utils_1.map(currPath, function (currTokenType) {
                    return tokens_public.tokenLabel(currTokenType);
                }).join(",") + "]";
            });
            var calculatedDescription = "expecting at least one iteration which starts with one of these possible Token sequences::\n  " +
                ("<" + nextValidTokenSequences.join(" ,") + ">");
            return errPrefix + calculatedDescription + errSuffix;
        }
    }
};
Object.freeze(exports.defaultParserErrorProvider);
exports.defaultGrammarResolverErrorProvider = {
    buildRuleNotFoundError: function (topLevelRule, undefinedRule) {
        var msg = "Invalid grammar, reference to a rule which is not defined: ->" +
            undefinedRule.nonTerminalName +
            "<-\n" +
            "inside top level rule: ->" +
            topLevelRule.name +
            "<-";
        return msg;
    }
};
exports.defaultGrammarValidatorErrorProvider = {
    buildDuplicateFoundError: function (topLevelRule, duplicateProds) {
        function getExtraProductionArgument(prod) {
            if (prod instanceof gast_public.Terminal) {
                return tokens_public.tokenName(prod.terminalType);
            }
            else if (prod instanceof gast_public.NonTerminal) {
                return prod.nonTerminalName;
            }
            else {
                return "";
            }
        }
        var topLevelName = topLevelRule.name;
        var duplicateProd = utils_1.first(duplicateProds);
        var index = duplicateProd.idx;
        var dslName = gast.getProductionDslName(duplicateProd);
        var extraArgument = getExtraProductionArgument(duplicateProd);
        var msg = "->" + dslName + "<- with numerical suffix: ->" + index + "<-\n                  " + (extraArgument ? "and argument: ->" + extraArgument + "<-" : "") + "\n                  appears more than once (" + duplicateProds.length + " times) in the top level rule: ->" + topLevelName + "<-.\n                  " + (index === 0
            ? "Also note that numerical suffix 0 means " + dslName + " without any suffix."
            : "") + "\n                  To fix this make sure each usage of " + dslName + " " + (extraArgument ? "with the argument: ->" + extraArgument + "<-" : "") + "\n                  in the rule ->" + topLevelName + "<- has a different occurrence index (0-5), as that combination acts as a unique\n                  position key in the grammar, which is needed by the parsing engine.\n                  \n                  For further details see: http://sap.github.io/chevrotain/website/FAQ.html#NUMERICAL_SUFFIXES \n                  ";
        // white space trimming time! better to trim afterwards as it allows to use WELL formatted multi line template strings...
        msg = msg.replace(/[ \t]+/g, " ");
        msg = msg.replace(/\s\s+/g, "\n");
        return msg;
    },
    buildInvalidNestedRuleNameError: function (topLevelRule, nestedProd) {
        var msg = "Invalid nested rule name: ->" + nestedProd.name + "<- inside rule: ->" + topLevelRule.name + "<-\n" +
            ("it must match the pattern: ->" + checks.validNestedRuleName.toString() + "<-.\n") +
            "Note that this means a nested rule name must start with the '$'(dollar) sign.";
        return msg;
    },
    buildDuplicateNestedRuleNameError: function (topLevelRule, nestedProd) {
        var duplicateName = utils_1.first(nestedProd).name;
        var errMsg = "Duplicate nested rule name: ->" + duplicateName + "<- inside rule: ->" + topLevelRule.name + "<-\n" +
            "A nested name must be unique in the scope of a top level grammar rule.";
        return errMsg;
    },
    buildNamespaceConflictError: function (rule) {
        var errMsg = "Namespace conflict found in grammar.\n" +
            ("The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + rule.name + ">.\n") +
            "To resolve this make sure each Terminal and Non-Terminal names are unique\n" +
            "This is easy to accomplish by using the convention that Terminal names start with an uppercase letter\n" +
            "and Non-Terminal names start with a lower case letter.";
        return errMsg;
    },
    buildAlternationPrefixAmbiguityError: function (options) {
        var pathMsg = utils_1.map(options.prefixPath, function (currTok) {
            return tokens_public.tokenLabel(currTok);
        }).join(", ");
        var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        var errMsg = "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\n" +
            ("in <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n") +
            ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n") +
            "http://sap.github.io/chevrotain/website/Building_Grammars/resolving_grammar_errors.html#COMMON_PREFIX " +
            "For farther details.";
        return errMsg;
    },
    buildAlternationAmbiguityError: function (options) {
        var pathMsg = utils_1.map(options.prefixPath, function (currtok) {
            return tokens_public.tokenLabel(currtok);
        }).join(", ");
        var occurrence = options.alternation.idx === 0 ? "" : options.alternation.idx;
        var currMessage = "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> in <OR" + occurrence + ">" +
            (" inside <" + options.topLevelRule.name + "> Rule,\n") +
            ("<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n");
        var docs_version = version.VERSION.replace(/\./g, "_");
        // Should this information be on the error message or in some common errors docs?
        currMessage =
            currMessage +
                "To Resolve this, try one of of the following: \n" +
                "1. Refactor your grammar to be LL(K) for the current value of k (by default k=5)\n" +
                "2. Increase the value of K for your grammar by providing a larger 'maxLookahead' value in the parser's config\n" +
                "3. This issue can be ignored (if you know what you are doing...), see" +
                " http://sap.github.io/chevrotain/documentation/" +
                docs_version +
                "/interfaces/iparserconfig.html#ignoredissues for more" +
                " details\n";
        return currMessage;
    },
    buildEmptyRepetitionError: function (options) {
        var dslName = gast.getProductionDslName(options.repetition);
        if (options.repetition.idx !== 0) {
            dslName += options.repetition.idx;
        }
        var errMsg = "The repetition <" + dslName + "> within Rule <" + options.topLevelRule.name + "> can never consume any tokens.\n" +
            "This could lead to an infinite loop.";
        return errMsg;
    },
    buildTokenNameError: function (options) {
        var tokTypeName = tokens_public.tokenName(options.tokenType);
        var errMsg = "Invalid Grammar Token name: ->" + tokTypeName + "<- it must match the pattern: ->" + options.expectedPattern.toString() + "<-";
        return errMsg;
    },
    buildEmptyAlternationError: function (options) {
        var errMsg = "Ambiguous empty alternative: <" + (options.emptyChoiceIdx + 1) + ">" +
            (" in <OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n") +
            "Only the last alternative may be an empty alternative.";
        return errMsg;
    },
    buildTooManyAlternativesError: function (options) {
        var errMsg = "An Alternation cannot have more than 256 alternatives:\n" +
            ("<OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n has " + (options.alternation.definition.length +
                1) + " alternatives.");
        return errMsg;
    },
    buildLeftRecursionError: function (options) {
        var ruleName = options.topLevelRule.name;
        var pathNames = utils.map(options.leftRecursionPath, function (currRule) { return currRule.name; });
        var leftRecursivePath = ruleName + " --> " + pathNames
            .concat([ruleName])
            .join(" --> ");
        var errMsg = "Left Recursion found in grammar.\n" +
            ("rule: <" + ruleName + "> can be invoked from itself (directly or indirectly)\n") +
            ("without consuming any Tokens. The grammar path that causes this is: \n " + leftRecursivePath + "\n") +
            " To fix this refactor your grammar to remove the left recursion.\n" +
            "see: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.";
        return errMsg;
    },
    buildInvalidRuleNameError: function (options) {
        var ruleName = options.topLevelRule.name;
        var expectedPatternString = options.expectedPattern.toString();
        var errMsg = "Invalid grammar rule name: ->" + ruleName + "<- it must match the pattern: ->" + expectedPatternString + "<-";
        return errMsg;
    },
    buildDuplicateRuleNameError: function (options) {
        var ruleName;
        if (options.topLevelRule instanceof gast_public.Rule) {
            ruleName = options.topLevelRule.name;
        }
        else {
            ruleName = options.topLevelRule;
        }
        var errMsg = "Duplicate definition, rule: ->" + ruleName + "<- is already defined in the grammar: ->" + options.grammarName + "<-";
        return errMsg;
    }
};

});

unwrapExports(errors_public);
var errors_public_1 = errors_public.defaultParserErrorProvider;
var errors_public_2 = errors_public.defaultGrammarResolverErrorProvider;
var errors_public_3 = errors_public.defaultGrammarValidatorErrorProvider;

var checks = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var utils_1 = utils;









function validateGrammar(topLevels, maxLookahead, tokenTypes, ignoredIssues, errMsgProvider, grammarName) {
    if (ignoredIssues === void 0) { ignoredIssues = {}; }
    if (errMsgProvider === void 0) { errMsgProvider = errors_public.defaultGrammarValidatorErrorProvider; }
    var duplicateErrors = utils.map(topLevels, function (currTopLevel) {
        return validateDuplicateProductions(currTopLevel, errMsgProvider);
    });
    var leftRecursionErrors = utils.map(topLevels, function (currTopRule) {
        return validateNoLeftRecursion(currTopRule, currTopRule, errMsgProvider);
    });
    var emptyAltErrors = [];
    var ambiguousAltsErrors = [];
    // left recursion could cause infinite loops in the following validations.
    // It is safest to first have the user fix the left recursion errors first and only then examine farther issues.
    if (utils_1.every(leftRecursionErrors, utils_1.isEmpty)) {
        emptyAltErrors = utils_1.map(topLevels, function (currTopRule) {
            return validateEmptyOrAlternative(currTopRule, errMsgProvider);
        });
        ambiguousAltsErrors = utils_1.map(topLevels, function (currTopRule) {
            return validateAmbiguousAlternationAlternatives(currTopRule, maxLookahead, ignoredIssues, errMsgProvider);
        });
    }
    var termsNamespaceConflictErrors = checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider);
    var tokenNameErrors = utils.map(tokenTypes, function (currTokType) {
        return validateTokenName(currTokType, errMsgProvider);
    });
    var nestedRulesNameErrors = validateNestedRulesNames(topLevels, errMsgProvider);
    var nestedRulesDuplicateErrors = validateDuplicateNestedRules(topLevels, errMsgProvider);
    var emptyRepetitionErrors = validateSomeNonEmptyLookaheadPath(topLevels, maxLookahead, errMsgProvider);
    var tooManyAltsErrors = utils_1.map(topLevels, function (curRule) {
        return validateTooManyAlts(curRule, errMsgProvider);
    });
    var ruleNameErrors = utils_1.map(topLevels, function (curRule) {
        return validateRuleName(curRule, errMsgProvider);
    });
    var duplicateRulesError = utils_1.map(topLevels, function (curRule) {
        return validateRuleDoesNotAlreadyExist(curRule, topLevels, grammarName, errMsgProvider);
    });
    return utils.flatten(duplicateErrors.concat(tokenNameErrors, nestedRulesNameErrors, nestedRulesDuplicateErrors, emptyRepetitionErrors, leftRecursionErrors, emptyAltErrors, ambiguousAltsErrors, termsNamespaceConflictErrors, tooManyAltsErrors, ruleNameErrors, duplicateRulesError));
}
exports.validateGrammar = validateGrammar;
function validateNestedRulesNames(topLevels, errMsgProvider) {
    var result = [];
    utils_1.forEach(topLevels, function (curTopLevel) {
        var namedCollectorVisitor = new cst.NamedDSLMethodsCollectorVisitor("");
        curTopLevel.accept(namedCollectorVisitor);
        var nestedProds = utils_1.map(namedCollectorVisitor.result, function (currItem) { return currItem.orgProd; });
        result.push(utils_1.map(nestedProds, function (currNestedProd) {
            return validateNestedRuleName(curTopLevel, currNestedProd, errMsgProvider);
        }));
    });
    return utils_1.flatten(result);
}
function validateDuplicateProductions(topLevelRule, errMsgProvider) {
    var collectorVisitor = new OccurrenceValidationCollector();
    topLevelRule.accept(collectorVisitor);
    var allRuleProductions = collectorVisitor.allProductions;
    var productionGroups = utils.groupBy(allRuleProductions, identifyProductionForDuplicates);
    var duplicates = utils.pick(productionGroups, function (currGroup) {
        return currGroup.length > 1;
    });
    var errors = utils.map(utils.values(duplicates), function (currDuplicates) {
        var firstProd = utils.first(currDuplicates);
        var msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates);
        var dslName = gast.getProductionDslName(firstProd);
        var defError = {
            message: msg,
            type: parser_public.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
            ruleName: topLevelRule.name,
            dslName: dslName,
            occurrence: firstProd.idx
        };
        var param = getExtraProductionArgument(firstProd);
        if (param) {
            defError.parameter = param;
        }
        return defError;
    });
    return errors;
}
function identifyProductionForDuplicates(prod) {
    return gast.getProductionDslName(prod) + "_#_" + prod.idx + "_#_" + getExtraProductionArgument(prod);
}
exports.identifyProductionForDuplicates = identifyProductionForDuplicates;
function getExtraProductionArgument(prod) {
    if (prod instanceof gast_public.Terminal) {
        return tokens_public.tokenName(prod.terminalType);
    }
    else if (prod instanceof gast_public.NonTerminal) {
        return prod.nonTerminalName;
    }
    else {
        return "";
    }
}
var OccurrenceValidationCollector = /** @class */ (function (_super) {
    __extends(OccurrenceValidationCollector, _super);
    function OccurrenceValidationCollector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allProductions = [];
        return _this;
    }
    OccurrenceValidationCollector.prototype.visitNonTerminal = function (subrule) {
        this.allProductions.push(subrule);
    };
    OccurrenceValidationCollector.prototype.visitOption = function (option) {
        this.allProductions.push(option);
    };
    OccurrenceValidationCollector.prototype.visitRepetitionWithSeparator = function (manySep) {
        this.allProductions.push(manySep);
    };
    OccurrenceValidationCollector.prototype.visitRepetitionMandatory = function (atLeastOne) {
        this.allProductions.push(atLeastOne);
    };
    OccurrenceValidationCollector.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
    };
    OccurrenceValidationCollector.prototype.visitRepetition = function (many) {
        this.allProductions.push(many);
    };
    OccurrenceValidationCollector.prototype.visitAlternation = function (or) {
        this.allProductions.push(or);
    };
    OccurrenceValidationCollector.prototype.visitTerminal = function (terminal) {
        this.allProductions.push(terminal);
    };
    return OccurrenceValidationCollector;
}(gast_visitor_public.GAstVisitor));
exports.OccurrenceValidationCollector = OccurrenceValidationCollector;
exports.validTermsPattern = /^[a-zA-Z_]\w*$/;
exports.validNestedRuleName = new RegExp(exports.validTermsPattern.source.replace("^", "^\\$"));
function validateRuleName(rule, errMsgProvider) {
    var errors = [];
    var ruleName = rule.name;
    if (!ruleName.match(exports.validTermsPattern)) {
        errors.push({
            message: errMsgProvider.buildInvalidRuleNameError({
                topLevelRule: rule,
                expectedPattern: exports.validTermsPattern
            }),
            type: parser_public.ParserDefinitionErrorType.INVALID_RULE_NAME,
            ruleName: ruleName
        });
    }
    return errors;
}
exports.validateRuleName = validateRuleName;
function validateNestedRuleName(topLevel, nestedProd, errMsgProvider) {
    var errors = [];
    var errMsg;
    if (!nestedProd.name.match(exports.validNestedRuleName)) {
        errMsg = errMsgProvider.buildInvalidNestedRuleNameError(topLevel, nestedProd);
        errors.push({
            message: errMsg,
            type: parser_public.ParserDefinitionErrorType.INVALID_NESTED_RULE_NAME,
            ruleName: topLevel.name
        });
    }
    return errors;
}
exports.validateNestedRuleName = validateNestedRuleName;
function validateTokenName(tokenType, errMsgProvider) {
    var errors = [];
    var tokTypeName = tokens_public.tokenName(tokenType);
    if (!tokTypeName.match(exports.validTermsPattern)) {
        errors.push({
            message: errMsgProvider.buildTokenNameError({
                tokenType: tokenType,
                expectedPattern: exports.validTermsPattern
            }),
            type: parser_public.ParserDefinitionErrorType.INVALID_TOKEN_NAME
        });
    }
    return errors;
}
exports.validateTokenName = validateTokenName;
function validateRuleDoesNotAlreadyExist(rule, allRules, className, errMsgProvider) {
    var errors = [];
    var occurrences = utils_1.reduce(allRules, function (result, curRule) {
        if (curRule.name === rule.name) {
            return result + 1;
        }
        return result;
    }, 0);
    if (occurrences > 1) {
        var errMsg = errMsgProvider.buildDuplicateRuleNameError({
            topLevelRule: rule,
            grammarName: className
        });
        errors.push({
            message: errMsg,
            type: parser_public.ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
            ruleName: rule.name
        });
    }
    return errors;
}
exports.validateRuleDoesNotAlreadyExist = validateRuleDoesNotAlreadyExist;
// TODO: is there anyway to get only the rule names of rules inherited from the super grammars?
// This is not part of the IGrammarErrorProvider because the validation cannot be performed on
// The grammar structure, only at runtime.
function validateRuleIsOverridden(ruleName, definedRulesNames, className) {
    var errors = [];
    var errMsg;
    if (!utils.contains(definedRulesNames, ruleName)) {
        errMsg =
            "Invalid rule override, rule: ->" + ruleName + "<- cannot be overridden in the grammar: ->" + className + "<-" +
                "as it is not defined in any of the super grammars ";
        errors.push({
            message: errMsg,
            type: parser_public.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
            ruleName: ruleName
        });
    }
    return errors;
}
exports.validateRuleIsOverridden = validateRuleIsOverridden;
function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path) {
    if (path === void 0) { path = []; }
    var errors = [];
    var nextNonTerminals = getFirstNoneTerminal(currRule.definition);
    if (utils.isEmpty(nextNonTerminals)) {
        return [];
    }
    else {
        var ruleName = topRule.name;
        var foundLeftRecursion = utils.contains(nextNonTerminals, topRule);
        if (foundLeftRecursion) {
            errors.push({
                message: errMsgProvider.buildLeftRecursionError({
                    topLevelRule: topRule,
                    leftRecursionPath: path
                }),
                type: parser_public.ParserDefinitionErrorType.LEFT_RECURSION,
                ruleName: ruleName
            });
        }
        // we are only looking for cyclic paths leading back to the specific topRule
        // other cyclic paths are ignored, we still need this difference to avoid infinite loops...
        var validNextSteps = utils.difference(nextNonTerminals, path.concat([topRule]));
        var errorsFromNextSteps = utils.map(validNextSteps, function (currRefRule) {
            var newPath = utils.cloneArr(path);
            newPath.push(currRefRule);
            return validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
        });
        return errors.concat(utils.flatten(errorsFromNextSteps));
    }
}
exports.validateNoLeftRecursion = validateNoLeftRecursion;
function getFirstNoneTerminal(definition) {
    var result = [];
    if (utils.isEmpty(definition)) {
        return result;
    }
    var firstProd = utils.first(definition);
    if (firstProd instanceof gast_public.NonTerminal) {
        result.push(firstProd.referencedRule);
    }
    else if (firstProd instanceof gast_public.Flat ||
        firstProd instanceof gast_public.Option ||
        firstProd instanceof gast_public.RepetitionMandatory ||
        firstProd instanceof gast_public.RepetitionMandatoryWithSeparator ||
        firstProd instanceof gast_public.RepetitionWithSeparator ||
        firstProd instanceof gast_public.Repetition) {
        result = result.concat(getFirstNoneTerminal(firstProd.definition));
    }
    else if (firstProd instanceof gast_public.Alternation) {
        // each sub definition in alternation is a FLAT
        result = utils.flatten(utils.map(firstProd.definition, function (currSubDef) {
            return getFirstNoneTerminal(currSubDef.definition);
        }));
    }
    else if (firstProd instanceof gast_public.Terminal) ;
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
    var isFirstOptional = gast.isOptionalProd(firstProd);
    var hasMore = definition.length > 1;
    if (isFirstOptional && hasMore) {
        var rest = utils.drop(definition);
        return result.concat(getFirstNoneTerminal(rest));
    }
    else {
        return result;
    }
}
exports.getFirstNoneTerminal = getFirstNoneTerminal;
var OrCollector = /** @class */ (function (_super) {
    __extends(OrCollector, _super);
    function OrCollector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.alternations = [];
        return _this;
    }
    OrCollector.prototype.visitAlternation = function (node) {
        this.alternations.push(node);
    };
    return OrCollector;
}(gast_visitor_public.GAstVisitor));
function validateEmptyOrAlternative(topLevelRule, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var errors = utils.reduce(ors, function (errors, currOr) {
        var exceptLast = utils.dropRight(currOr.definition);
        var currErrors = utils.map(exceptLast, function (currAlternative, currAltIdx) {
            var possibleFirstInAlt = interpreter.nextPossibleTokensAfter([currAlternative], [], null, 1);
            if (utils.isEmpty(possibleFirstInAlt)) {
                return {
                    message: errMsgProvider.buildEmptyAlternationError({
                        topLevelRule: topLevelRule,
                        alternation: currOr,
                        emptyChoiceIdx: currAltIdx
                    }),
                    type: parser_public.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
                    ruleName: topLevelRule.name,
                    occurrence: currOr.idx,
                    alternative: currAltIdx + 1
                };
            }
            else {
                return null;
            }
        });
        return errors.concat(utils.compact(currErrors));
    }, []);
    return errors;
}
exports.validateEmptyOrAlternative = validateEmptyOrAlternative;
function validateAmbiguousAlternationAlternatives(topLevelRule, maxLookahead, ignoredIssues, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var ignoredIssuesForCurrentRule = ignoredIssues[topLevelRule.name];
    if (ignoredIssuesForCurrentRule) {
        ors = utils_1.reject(ors, function (currOr) {
            return ignoredIssuesForCurrentRule[gast.getProductionDslName(currOr) +
                (currOr.idx === 0 ? "" : currOr.idx)];
        });
    }
    var errors = utils.reduce(ors, function (result, currOr) {
        var currOccurrence = currOr.idx;
        var alternatives = lookahead.getLookaheadPathsForOr(currOccurrence, topLevelRule, maxLookahead);
        var altsAmbiguityErrors = checkAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
        var altsPrefixAmbiguityErrors = checkPrefixAlternativesAmbiguities(alternatives, currOr, topLevelRule, errMsgProvider);
        return result.concat(altsAmbiguityErrors, altsPrefixAmbiguityErrors);
    }, []);
    return errors;
}
exports.validateAmbiguousAlternationAlternatives = validateAmbiguousAlternationAlternatives;
var RepetionCollector = /** @class */ (function (_super) {
    __extends(RepetionCollector, _super);
    function RepetionCollector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allProductions = [];
        return _this;
    }
    RepetionCollector.prototype.visitRepetitionWithSeparator = function (manySep) {
        this.allProductions.push(manySep);
    };
    RepetionCollector.prototype.visitRepetitionMandatory = function (atLeastOne) {
        this.allProductions.push(atLeastOne);
    };
    RepetionCollector.prototype.visitRepetitionMandatoryWithSeparator = function (atLeastOneSep) {
        this.allProductions.push(atLeastOneSep);
    };
    RepetionCollector.prototype.visitRepetition = function (many) {
        this.allProductions.push(many);
    };
    return RepetionCollector;
}(gast_visitor_public.GAstVisitor));
exports.RepetionCollector = RepetionCollector;
function validateTooManyAlts(topLevelRule, errMsgProvider) {
    var orCollector = new OrCollector();
    topLevelRule.accept(orCollector);
    var ors = orCollector.alternations;
    var errors = utils.reduce(ors, function (errors, currOr) {
        if (currOr.definition.length > 255) {
            errors.push({
                message: errMsgProvider.buildTooManyAlternativesError({
                    topLevelRule: topLevelRule,
                    alternation: currOr
                }),
                type: parser_public.ParserDefinitionErrorType.TOO_MANY_ALTS,
                ruleName: topLevelRule.name,
                occurrence: currOr.idx
            });
        }
        return errors;
    }, []);
    return errors;
}
exports.validateTooManyAlts = validateTooManyAlts;
function validateSomeNonEmptyLookaheadPath(topLevelRules, maxLookahead, errMsgProvider) {
    var errors = [];
    utils_1.forEach(topLevelRules, function (currTopRule) {
        var collectorVisitor = new RepetionCollector();
        currTopRule.accept(collectorVisitor);
        var allRuleProductions = collectorVisitor.allProductions;
        utils_1.forEach(allRuleProductions, function (currProd) {
            var prodType = lookahead.getProdType(currProd);
            var currOccurrence = currProd.idx;
            var paths = lookahead.getLookaheadPathsForOptionalProd(currOccurrence, currTopRule, prodType, maxLookahead);
            var pathsInsideProduction = paths[0];
            if (utils_1.isEmpty(utils_1.flatten(pathsInsideProduction))) {
                var errMsg = errMsgProvider.buildEmptyRepetitionError({
                    topLevelRule: currTopRule,
                    repetition: currProd
                });
                errors.push({
                    message: errMsg,
                    type: parser_public.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
                    ruleName: currTopRule.name
                });
            }
        });
    });
    return errors;
}
exports.validateSomeNonEmptyLookaheadPath = validateSomeNonEmptyLookaheadPath;
function checkAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
    var foundAmbiguousPaths = [];
    var identicalAmbiguities = utils_1.reduce(alternatives, function (result, currAlt, currAltIdx) {
        utils_1.forEach(currAlt, function (currPath) {
            var altsCurrPathAppearsIn = [currAltIdx];
            utils_1.forEach(alternatives, function (currOtherAlt, currOtherAltIdx) {
                if (currAltIdx !== currOtherAltIdx &&
                    lookahead.containsPath(currOtherAlt, currPath)) {
                    altsCurrPathAppearsIn.push(currOtherAltIdx);
                }
            });
            if (altsCurrPathAppearsIn.length > 1 &&
                !lookahead.containsPath(foundAmbiguousPaths, currPath)) {
                foundAmbiguousPaths.push(currPath);
                result.push({
                    alts: altsCurrPathAppearsIn,
                    path: currPath
                });
            }
        });
        return result;
    }, []);
    var currErrors = utils.map(identicalAmbiguities, function (currAmbDescriptor) {
        var ambgIndices = utils_1.map(currAmbDescriptor.alts, function (currAltIdx) { return currAltIdx + 1; });
        var currMessage = errMsgProvider.buildAlternationAmbiguityError({
            topLevelRule: rule,
            alternation: alternation,
            ambiguityIndices: ambgIndices,
            prefixPath: currAmbDescriptor.path
        });
        return {
            message: currMessage,
            type: parser_public.ParserDefinitionErrorType.AMBIGUOUS_ALTS,
            ruleName: rule.name,
            occurrence: alternation.idx,
            alternatives: [currAmbDescriptor.alts]
        };
    });
    return currErrors;
}
function checkPrefixAlternativesAmbiguities(alternatives, alternation, rule, errMsgProvider) {
    var errors = [];
    // flatten
    var pathsAndIndices = utils_1.reduce(alternatives, function (result, currAlt, idx) {
        var currPathsAndIdx = utils_1.map(currAlt, function (currPath) {
            return { idx: idx, path: currPath };
        });
        return result.concat(currPathsAndIdx);
    }, []);
    utils_1.forEach(pathsAndIndices, function (currPathAndIdx) {
        var targetIdx = currPathAndIdx.idx;
        var targetPath = currPathAndIdx.path;
        var prefixAmbiguitiesPathsAndIndices = utils_1.findAll(pathsAndIndices, function (searchPathAndIdx) {
            // prefix ambiguity can only be created from lower idx (higher priority) path
            return (searchPathAndIdx.idx < targetIdx &&
                // checking for strict prefix because identical lookaheads
                // will be be detected using a different validation.
                lookahead.isStrictPrefixOfPath(searchPathAndIdx.path, targetPath));
        });
        var currPathPrefixErrors = utils_1.map(prefixAmbiguitiesPathsAndIndices, function (currAmbPathAndIdx) {
            var ambgIndices = [currAmbPathAndIdx.idx + 1, targetIdx + 1];
            var occurrence = alternation.idx === 0 ? "" : alternation.idx;
            var message = errMsgProvider.buildAlternationPrefixAmbiguityError({
                topLevelRule: rule,
                alternation: alternation,
                ambiguityIndices: ambgIndices,
                prefixPath: currAmbPathAndIdx.path
            });
            return {
                message: message,
                type: parser_public.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
                ruleName: rule.name,
                occurrence: occurrence,
                alternatives: ambgIndices
            };
        });
        errors = errors.concat(currPathPrefixErrors);
    });
    return errors;
}
function checkTerminalAndNoneTerminalsNameSpace(topLevels, tokenTypes, errMsgProvider) {
    var errors = [];
    var tokenNames = utils_1.map(tokenTypes, function (currToken) { return tokens_public.tokenName(currToken); });
    utils_1.forEach(topLevels, function (currRule) {
        var currRuleName = currRule.name;
        if (utils_1.contains(tokenNames, currRuleName)) {
            var errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
            errors.push({
                message: errMsg,
                type: parser_public.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
                ruleName: currRuleName
            });
        }
    });
    return errors;
}
function validateDuplicateNestedRules(topLevelRules, errMsgProvider) {
    var errors = [];
    utils_1.forEach(topLevelRules, function (currTopRule) {
        var namedCollectorVisitor = new cst.NamedDSLMethodsCollectorVisitor("");
        currTopRule.accept(namedCollectorVisitor);
        var prodsByGroup = utils_1.groupBy(namedCollectorVisitor.result, function (item) { return item.name; });
        var duplicates = utils_1.pick(prodsByGroup, function (currGroup) {
            return currGroup.length > 1;
        });
        utils_1.forEach(utils_1.values(duplicates), function (currDupGroup) {
            var currDupProds = utils_1.map(currDupGroup, function (dupGroup) { return dupGroup.orgProd; });
            var errMsg = errMsgProvider.buildDuplicateNestedRuleNameError(currTopRule, currDupProds);
            errors.push({
                message: errMsg,
                type: parser_public.ParserDefinitionErrorType.DUPLICATE_NESTED_NAME,
                ruleName: currTopRule.name
            });
        });
    });
    return errors;
}

});

unwrapExports(checks);
var checks_1 = checks.validateGrammar;
var checks_2 = checks.identifyProductionForDuplicates;
var checks_3 = checks.OccurrenceValidationCollector;
var checks_4 = checks.validTermsPattern;
var checks_5 = checks.validNestedRuleName;
var checks_6 = checks.validateRuleName;
var checks_7 = checks.validateNestedRuleName;
var checks_8 = checks.validateTokenName;
var checks_9 = checks.validateRuleDoesNotAlreadyExist;
var checks_10 = checks.validateRuleIsOverridden;
var checks_11 = checks.validateNoLeftRecursion;
var checks_12 = checks.getFirstNoneTerminal;
var checks_13 = checks.validateEmptyOrAlternative;
var checks_14 = checks.validateAmbiguousAlternationAlternatives;
var checks_15 = checks.RepetionCollector;
var checks_16 = checks.validateTooManyAlts;
var checks_17 = checks.validateSomeNonEmptyLookaheadPath;

var constants = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: can this be removed? where is it used?
exports.IN = "_~IN~_";

});

unwrapExports(constants);
var constants_1 = constants.IN;

var follow = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });







// This ResyncFollowsWalker computes all of the follows required for RESYNC
// (skipping reference production).
var ResyncFollowsWalker = /** @class */ (function (_super) {
    __extends(ResyncFollowsWalker, _super);
    function ResyncFollowsWalker(topProd) {
        var _this = _super.call(this) || this;
        _this.topProd = topProd;
        _this.follows = new lang_extensions.HashTable();
        return _this;
    }
    ResyncFollowsWalker.prototype.startWalking = function () {
        this.walk(this.topProd);
        return this.follows;
    };
    ResyncFollowsWalker.prototype.walkTerminal = function (terminal, currRest, prevRest) {
        // do nothing! just like in the public sector after 13:00
    };
    ResyncFollowsWalker.prototype.walkProdRef = function (refProd, currRest, prevRest) {
        var followName = buildBetweenProdsFollowPrefix(refProd.referencedRule, refProd.idx) +
            this.topProd.name;
        var fullRest = currRest.concat(prevRest);
        var restProd = new gast_public.Flat({ definition: fullRest });
        var t_in_topProd_follows = first_1.first(restProd);
        this.follows.put(followName, t_in_topProd_follows);
    };
    return ResyncFollowsWalker;
}(rest.RestWalker));
exports.ResyncFollowsWalker = ResyncFollowsWalker;
function computeAllProdsFollows(topProductions) {
    var reSyncFollows = new lang_extensions.HashTable();
    utils.forEach(topProductions, function (topProd) {
        var currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
        reSyncFollows.putAll(currRefsFollow);
    });
    return reSyncFollows;
}
exports.computeAllProdsFollows = computeAllProdsFollows;
function buildBetweenProdsFollowPrefix(inner, occurenceInParent) {
    return inner.name + occurenceInParent + constants.IN;
}
exports.buildBetweenProdsFollowPrefix = buildBetweenProdsFollowPrefix;
function buildInProdFollowPrefix(terminal) {
    var terminalName = tokens_public.tokenName(terminal.terminalType);
    return terminalName + terminal.idx + constants.IN;
}
exports.buildInProdFollowPrefix = buildInProdFollowPrefix;

});

unwrapExports(follow);
var follow_1 = follow.ResyncFollowsWalker;
var follow_2 = follow.computeAllProdsFollows;
var follow_3 = follow.buildBetweenProdsFollowPrefix;
var follow_4 = follow.buildInProdFollowPrefix;

var range = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var Range = /** @class */ (function () {
    function Range(start, end) {
        this.start = start;
        this.end = end;
        if (!isValidRange(start, end)) {
            throw new Error("INVALID RANGE");
        }
    }
    Range.prototype.contains = function (num) {
        return this.start <= num && this.end >= num;
    };
    Range.prototype.containsRange = function (other) {
        return this.start <= other.start && this.end >= other.end;
    };
    Range.prototype.isContainedInRange = function (other) {
        return other.containsRange(this);
    };
    Range.prototype.strictlyContainsRange = function (other) {
        return this.start < other.start && this.end > other.end;
    };
    Range.prototype.isStrictlyContainedInRange = function (other) {
        return other.strictlyContainsRange(this);
    };
    return Range;
}());
exports.Range = Range;
function isValidRange(start, end) {
    return !(start < 0 || end < start);
}
exports.isValidRange = isValidRange;

});

unwrapExports(range);
var range_1 = range.Range;
var range_2 = range.isValidRange;

var gast_builder = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



var ProdType;
(function (ProdType) {
    ProdType[ProdType["OPTION"] = 0] = "OPTION";
    ProdType[ProdType["OR"] = 1] = "OR";
    ProdType[ProdType["MANY"] = 2] = "MANY";
    ProdType[ProdType["MANY_SEP"] = 3] = "MANY_SEP";
    ProdType[ProdType["AT_LEAST_ONE"] = 4] = "AT_LEAST_ONE";
    ProdType[ProdType["AT_LEAST_ONE_SEP"] = 5] = "AT_LEAST_ONE_SEP";
    ProdType[ProdType["REF"] = 6] = "REF";
    ProdType[ProdType["TERMINAL"] = 7] = "TERMINAL";
    ProdType[ProdType["FLAT"] = 8] = "FLAT";
})(ProdType = exports.ProdType || (exports.ProdType = {}));
var namePropRegExp = /(?:\s*{\s*NAME\s*:\s*["'`]([\w$]*)["'`])?/;
var namePropRegExpNoCurlyFirstOfTwo = new RegExp(namePropRegExp.source
    .replace("{", "")
    .replace(")?", "\\s*,)?"));
var terminalRegEx = /\.\s*CONSUME(\d+)?\s*\(\s*(?:[a-zA-Z_$]\w*\s*\.\s*)*([a-zA-Z_$]\w*)/;
var terminalRegGlobal = new RegExp(terminalRegEx.source, "g");
var refRegEx = /\.\s*SUBRULE(\d+)?\s*\(\s*(?:[a-zA-Z_$]\w*\s*\.\s*)*([a-zA-Z_$]\w*)/;
var refRegExGlobal = new RegExp(refRegEx.source, "g");
var optionPrefixRegEx = /\.\s*OPTION(\d+)?\s*\(/;
var optionRegEx = new RegExp(optionPrefixRegEx.source + namePropRegExp.source);
var optionRegExGlobal = new RegExp(optionPrefixRegEx.source, "g");
var manyPrefixRegEx = /\.\s*MANY(\d+)?\s*\(/;
var manyRegEx = new RegExp(manyPrefixRegEx.source + namePropRegExp.source);
var manyRegExGlobal = new RegExp(manyPrefixRegEx.source, "g");
var sepPropRegEx = /\s*SEP\s*:\s*(?:[a-zA-Z_$]\w*\s*\.\s*)*([a-zA-Z_$]\w*)/;
var manySepPrefixRegEx = /\.\s*MANY_SEP(\d+)?\s*\(\s*{/;
var manyWithSeparatorRegEx = new RegExp(manySepPrefixRegEx.source +
    namePropRegExpNoCurlyFirstOfTwo.source +
    sepPropRegEx.source);
var manyWithSeparatorRegExGlobal = new RegExp(manyWithSeparatorRegEx.source, "g");
var atLeastOneSepPrefixRegEx = /\.\s*AT_LEAST_ONE_SEP(\d+)?\s*\(\s*{/;
var atLeastOneWithSeparatorRegEx = new RegExp(atLeastOneSepPrefixRegEx.source +
    namePropRegExpNoCurlyFirstOfTwo.source +
    sepPropRegEx.source);
var atLeastOneWithSeparatorRegExGlobal = new RegExp(atLeastOneWithSeparatorRegEx.source, "g");
var atLeastOnePrefixRegEx = /\.\s*AT_LEAST_ONE(\d+)?\s*\(/;
var atLeastOneRegEx = new RegExp(atLeastOnePrefixRegEx.source + namePropRegExp.source);
var atLeastOneRegExGlobal = new RegExp(atLeastOnePrefixRegEx.source, "g");
var orPrefixRegEx = /\.\s*OR(\d+)?\s*\(/;
var orRegEx = new RegExp(orPrefixRegEx.source + namePropRegExp.source);
var orRegExGlobal = new RegExp(orPrefixRegEx.source, "g");
var orPartSuffixRegEx = /\s*(ALT)\s*:/;
var orPartRegEx = new RegExp(namePropRegExpNoCurlyFirstOfTwo.source + orPartSuffixRegEx.source);
var orPartRegExGlobal = new RegExp(orPartRegEx.source, "g");
exports.terminalNameToConstructor = {};
function buildTopProduction(impelText, name, terminals) {
    // pseudo state. so little state does not yet mandate the complexity of wrapping in a class...
    // TODO: this is confusing, might be time to create a class..
    exports.terminalNameToConstructor = terminals;
    // the top most range must strictly contain all the other ranges
    // which is why we prefix the text with " " (curr Range impel is only for positive ranges)
    var spacedImpelText = " " + impelText;
    // TODO: why do we add whitespace twice?
    var txtWithoutComments = removeComments(" " + spacedImpelText);
    var textWithoutCommentsAndStrings = removeStringLiterals(txtWithoutComments);
    var prodRanges = createRanges(textWithoutCommentsAndStrings);
    var topRange = new range.Range(0, impelText.length + 2);
    var topRule = buildTopLevel(name, topRange, prodRanges, impelText);
    return topRule;
}
exports.buildTopProduction = buildTopProduction;
function buildTopLevel(name, topRange, allRanges, orgText) {
    var topLevelProd = new gast_public.Rule({
        name: name,
        definition: [],
        orgText: orgText
    });
    return buildAbstractProd(topLevelProd, topRange, allRanges);
}
function buildProdGast(prodRange, allRanges) {
    switch (prodRange.type) {
        case ProdType.AT_LEAST_ONE:
            return buildAtLeastOneProd(prodRange, allRanges);
        case ProdType.AT_LEAST_ONE_SEP:
            return buildAtLeastOneSepProd(prodRange, allRanges);
        case ProdType.MANY_SEP:
            return buildManySepProd(prodRange, allRanges);
        case ProdType.MANY:
            return buildManyProd(prodRange, allRanges);
        case ProdType.OPTION:
            return buildOptionProd(prodRange, allRanges);
        case ProdType.OR:
            return buildOrProd(prodRange, allRanges);
        case ProdType.FLAT:
            return buildFlatProd(prodRange, allRanges);
        case ProdType.REF:
            return buildRefProd(prodRange);
        case ProdType.TERMINAL:
            return buildTerminalProd(prodRange);
        /* istanbul ignore next */
        default:
            /* istanbul ignore next */
            throw Error("non exhaustive match");
    }
}
exports.buildProdGast = buildProdGast;
function buildRefProd(prodRange) {
    var reResult = refRegEx.exec(prodRange.text);
    var isImplicitOccurrenceIdx = reResult[1] === undefined;
    var refOccurrence = isImplicitOccurrenceIdx ? 0 : parseInt(reResult[1], 10);
    var refProdName = reResult[2];
    var newRef = new gast_public.NonTerminal({
        nonTerminalName: refProdName,
        idx: refOccurrence
    });
    return newRef;
}
function buildTerminalProd(prodRange) {
    var reResult = terminalRegEx.exec(prodRange.text);
    var isImplicitOccurrenceIdx = reResult[1] === undefined;
    var terminalOccurrence = isImplicitOccurrenceIdx
        ? 0
        : parseInt(reResult[1], 10);
    var terminalName = reResult[2];
    var terminalType = exports.terminalNameToConstructor[terminalName];
    if (!terminalType) {
        throw Error("Terminal Token name: " + terminalName + " not found");
    }
    var newTerminal = new gast_public.Terminal({
        terminalType: terminalType,
        idx: terminalOccurrence
    });
    return newTerminal;
}
function buildProdWithOccurrence(regEx, prodInstance, prodRange, allRanges) {
    var reResult = regEx.exec(prodRange.text);
    var isImplicitOccurrenceIdx = reResult[1] === undefined;
    prodInstance.idx = isImplicitOccurrenceIdx ? 0 : parseInt(reResult[1], 10);
    var nestedName = reResult[2];
    if (!utils.isUndefined(nestedName)) {
        prodInstance.name = nestedName;
    }
    return buildAbstractProd(prodInstance, prodRange.range, allRanges);
}
function buildAtLeastOneProd(prodRange, allRanges) {
    return buildProdWithOccurrence(atLeastOneRegEx, new gast_public.RepetitionMandatory({ definition: [] }), prodRange, allRanges);
}
function buildAtLeastOneSepProd(prodRange, allRanges) {
    return buildRepetitionWithSep(prodRange, allRanges, gast_public.RepetitionMandatoryWithSeparator, atLeastOneWithSeparatorRegEx);
}
function buildManyProd(prodRange, allRanges) {
    return buildProdWithOccurrence(manyRegEx, new gast_public.Repetition({ definition: [] }), prodRange, allRanges);
}
function buildManySepProd(prodRange, allRanges) {
    return buildRepetitionWithSep(prodRange, allRanges, gast_public.RepetitionWithSeparator, manyWithSeparatorRegEx);
}
function buildRepetitionWithSep(prodRange, allRanges, repConstructor, regExp) {
    var reResult = regExp.exec(prodRange.text);
    var isImplicitOccurrenceIdx = reResult[1] === undefined;
    var occurrenceIdx = isImplicitOccurrenceIdx ? 0 : parseInt(reResult[1], 10);
    var sepName = reResult[3];
    var separatorType = exports.terminalNameToConstructor[sepName];
    if (!separatorType) {
        throw Error("Separator Terminal Token name: " + sepName + " not found");
    }
    var repetitionInstance = new repConstructor({
        definition: [],
        separator: separatorType,
        idx: occurrenceIdx
    });
    repetitionInstance.implicitOccurrenceIndex = isImplicitOccurrenceIdx;
    var nestedName = reResult[2];
    if (!utils.isUndefined(nestedName)) {
        repetitionInstance.name = nestedName;
    }
    return buildAbstractProd(repetitionInstance, prodRange.range, allRanges);
}
function buildOptionProd(prodRange, allRanges) {
    return buildProdWithOccurrence(optionRegEx, new gast_public.Option({ definition: [] }), prodRange, allRanges);
}
function buildOrProd(prodRange, allRanges) {
    return buildProdWithOccurrence(orRegEx, new gast_public.Alternation({ definition: [] }), prodRange, allRanges);
}
function buildFlatProd(prodRange, allRanges) {
    var prodInstance = new gast_public.Flat({ definition: [] });
    var reResult = orPartRegEx.exec(prodRange.text);
    var nestedName = reResult[1];
    if (!utils.isUndefined(nestedName)) {
        prodInstance.name = nestedName;
    }
    return buildAbstractProd(prodInstance, prodRange.range, allRanges);
}
function buildAbstractProd(prod, topLevelRange, allRanges) {
    var secondLevelProds = getDirectlyContainedRanges(topLevelRange, allRanges);
    var secondLevelInOrder = utils.sortBy(secondLevelProds, function (prodRng) {
        return prodRng.range.start;
    });
    var definition = [];
    utils.forEach(secondLevelInOrder, function (prodRng) {
        definition.push(buildProdGast(prodRng, allRanges));
    });
    prod.definition = definition;
    return prod;
}
function getDirectlyContainedRanges(y, prodRanges) {
    return utils.filter(prodRanges, function (x) {
        var isXDescendantOfY = y.strictlyContainsRange(x.range);
        var xDoesNotHaveAnyAncestorWhichIsDecendantOfY = utils.every(prodRanges, function (maybeAnotherParent) {
            var isParentOfX = maybeAnotherParent.range.strictlyContainsRange(x.range);
            var isChildOfY = maybeAnotherParent.range.isStrictlyContainedInRange(y);
            return !(isParentOfX && isChildOfY);
        });
        return isXDescendantOfY && xDoesNotHaveAnyAncestorWhichIsDecendantOfY;
    });
}
exports.getDirectlyContainedRanges = getDirectlyContainedRanges;
var singleLineCommentRegEx = /\/\/.*/g;
var multiLineCommentRegEx = /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g;
var doubleQuoteStringLiteralRegEx = /(NAME\s*:\s*)?"([^\\"]|\\([bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/g;
var singleQuoteStringLiteralRegEx = /(NAME\s*:\s*)?'([^\\']|\\([bfnrtv'\\/]|u[0-9a-fA-F]{4}))*'/g;
function removeComments(text) {
    var noSingleLine = text.replace(singleLineCommentRegEx, "");
    var noComments = noSingleLine.replace(multiLineCommentRegEx, "");
    return noComments;
}
exports.removeComments = removeComments;
function replaceWithEmptyStringExceptNestedRules(match, nestedRuleGroup) {
    // do not replace with empty string if a nest rule (NAME:"bamba") was detected
    if (nestedRuleGroup !== undefined) {
        return match;
    }
    return "";
}
function removeStringLiterals(text) {
    var noDoubleQuotes = text.replace(doubleQuoteStringLiteralRegEx, replaceWithEmptyStringExceptNestedRules);
    var noSingleQuotes = noDoubleQuotes.replace(singleQuoteStringLiteralRegEx, replaceWithEmptyStringExceptNestedRules);
    return noSingleQuotes;
}
exports.removeStringLiterals = removeStringLiterals;
function createRanges(text) {
    var terminalRanges = createTerminalRanges(text);
    var refsRanges = createRefsRanges(text);
    var atLeastOneRanges = createAtLeastOneRanges(text);
    var atLeastOneSepRanges = createAtLeastOneSepRanges(text);
    var manyRanges = createManyRanges(text);
    var manySepRanges = createManySepRanges(text);
    var optionRanges = createOptionRanges(text);
    var orRanges = createOrRanges(text);
    return [].concat(terminalRanges, refsRanges, atLeastOneRanges, atLeastOneSepRanges, manyRanges, manySepRanges, optionRanges, orRanges);
}
exports.createRanges = createRanges;
function createTerminalRanges(text) {
    return createRefOrTerminalProdRangeInternal(text, ProdType.TERMINAL, terminalRegGlobal);
}
exports.createTerminalRanges = createTerminalRanges;
function createRefsRanges(text) {
    return createRefOrTerminalProdRangeInternal(text, ProdType.REF, refRegExGlobal);
}
exports.createRefsRanges = createRefsRanges;
function createAtLeastOneRanges(text) {
    return createOperatorProdRangeParenthesis(text, ProdType.AT_LEAST_ONE, atLeastOneRegExGlobal);
}
exports.createAtLeastOneRanges = createAtLeastOneRanges;
function createAtLeastOneSepRanges(text) {
    return createOperatorProdRangeParenthesis(text, ProdType.AT_LEAST_ONE_SEP, atLeastOneWithSeparatorRegExGlobal);
}
exports.createAtLeastOneSepRanges = createAtLeastOneSepRanges;
function createManyRanges(text) {
    return createOperatorProdRangeParenthesis(text, ProdType.MANY, manyRegExGlobal);
}
exports.createManyRanges = createManyRanges;
function createManySepRanges(text) {
    return createOperatorProdRangeParenthesis(text, ProdType.MANY_SEP, manyWithSeparatorRegExGlobal);
}
exports.createManySepRanges = createManySepRanges;
function createOptionRanges(text) {
    return createOperatorProdRangeParenthesis(text, ProdType.OPTION, optionRegExGlobal);
}
exports.createOptionRanges = createOptionRanges;
function createOrRanges(text) {
    var orRanges = createOperatorProdRangeParenthesis(text, ProdType.OR, orRegExGlobal);
    // have to split up the OR cases into separate FLAT productions
    // (A |BB | CDE) ==> or.def[0] --> FLAT(A) , or.def[1] --> FLAT(BB) , or.def[2] --> FLAT(CCDE)
    var orSubPartsRanges = createOrPartRanges(orRanges);
    return orRanges.concat(orSubPartsRanges);
}
exports.createOrRanges = createOrRanges;
var findClosingCurly = utils.partial(findClosingOffset, "{", "}");
var findClosingParen = utils.partial(findClosingOffset, "(", ")");
function createOrPartRanges(orRanges) {
    var orPartRanges = [];
    utils.forEach(orRanges, function (orRange) {
        var currOrParts = createOperatorProdRangeInternal(orRange.text, ProdType.FLAT, orPartRegExGlobal, findClosingCurly);
        var currOrRangeStart = orRange.range.start;
        // fix offsets as we are working on a subset of the text
        utils.forEach(currOrParts, function (orPart) {
            orPart.range.start += currOrRangeStart;
            orPart.range.end += currOrRangeStart;
        });
        orPartRanges = orPartRanges.concat(currOrParts);
    });
    var uniqueOrPartRanges = utils.uniq(orPartRanges, function (prodRange) {
        // using "~" as a separator for the identify function as its not a valid char in javascript
        return (prodRange.type +
            "~" +
            prodRange.range.start +
            "~" +
            prodRange.range.end +
            "~" +
            prodRange.text);
    });
    return uniqueOrPartRanges;
}
exports.createOrPartRanges = createOrPartRanges;
function createRefOrTerminalProdRangeInternal(text, prodType, pattern) {
    var prodRanges = [];
    var matched;
    while ((matched = pattern.exec(text))) {
        var start = matched.index;
        var stop_1 = pattern.lastIndex;
        var currRange = new range.Range(start, stop_1);
        var currText = matched[0];
        prodRanges.push({
            range: currRange,
            text: currText,
            type: prodType
        });
    }
    return prodRanges;
}
function createOperatorProdRangeParenthesis(text, prodType, pattern) {
    return createOperatorProdRangeInternal(text, prodType, pattern, findClosingParen);
}
function createOperatorProdRangeInternal(text, prodType, pattern, findTerminatorOffSet) {
    var operatorRanges = [];
    var matched;
    while ((matched = pattern.exec(text))) {
        var start = matched.index;
        // note that (start + matched[0].length) is the first character AFTER the match
        var stop_2 = findTerminatorOffSet(start + matched[0].length, text);
        var currRange = new range.Range(start, stop_2);
        var currText = text.substr(start, stop_2 - start + 1);
        operatorRanges.push({
            range: currRange,
            text: currText,
            type: prodType
        });
    }
    return operatorRanges;
}
function findClosingOffset(opening, closing, start, text) {
    var parenthesisStack = [1];
    var i = -1;
    while (!utils.isEmpty(parenthesisStack) && i + start < text.length) {
        i++;
        var nextChar = text.charAt(start + i);
        if (nextChar === opening) {
            parenthesisStack.push(1);
        }
        else if (nextChar === closing) {
            parenthesisStack.pop();
        }
    }
    // valid termination of the search loop
    if (utils.isEmpty(parenthesisStack)) {
        return i + start;
    }
    else {
        throw new Error("INVALID INPUT TEXT, UNTERMINATED PARENTHESIS");
    }
}
exports.findClosingOffset = findClosingOffset;

});

unwrapExports(gast_builder);
var gast_builder_1 = gast_builder.ProdType;
var gast_builder_2 = gast_builder.terminalNameToConstructor;
var gast_builder_3 = gast_builder.buildTopProduction;
var gast_builder_4 = gast_builder.buildProdGast;
var gast_builder_5 = gast_builder.getDirectlyContainedRanges;
var gast_builder_6 = gast_builder.removeComments;
var gast_builder_7 = gast_builder.removeStringLiterals;
var gast_builder_8 = gast_builder.createRanges;
var gast_builder_9 = gast_builder.createTerminalRanges;
var gast_builder_10 = gast_builder.createRefsRanges;
var gast_builder_11 = gast_builder.createAtLeastOneRanges;
var gast_builder_12 = gast_builder.createAtLeastOneSepRanges;
var gast_builder_13 = gast_builder.createManyRanges;
var gast_builder_14 = gast_builder.createManySepRanges;
var gast_builder_15 = gast_builder.createOptionRanges;
var gast_builder_16 = gast_builder.createOrRanges;
var gast_builder_17 = gast_builder.createOrPartRanges;
var gast_builder_18 = gast_builder.findClosingOffset;

var cst_visitor = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



function defaultVisit(ctx, param) {
    var childrenNames = utils.keys(ctx);
    var childrenNamesLength = childrenNames.length;
    for (var i = 0; i < childrenNamesLength; i++) {
        var currChildName = childrenNames[i];
        var currChildArray = ctx[currChildName];
        var currChildArrayLength = currChildArray.length;
        for (var j = 0; j < currChildArrayLength; j++) {
            var currChild = currChildArray[j];
            // distinction between Tokens Children and CstNode children
            if (currChild.tokenTypeIdx === undefined) {
                if (currChild.fullName !== undefined) {
                    this[currChild.fullName](currChild.children, param);
                }
                else {
                    this[currChild.name](currChild.children, param);
                }
            }
        }
    }
    // defaultVisit does not support generic out param
    return undefined;
}
exports.defaultVisit = defaultVisit;
function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
    var derivedConstructor = function () { };
    // can be overwritten according to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/
    // name?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fname
    lang_extensions.defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
    var semanticProto = {
        visit: function (cstNode, param) {
            // enables writing more concise visitor methods when CstNode has only a single child
            if (utils.isArray(cstNode)) {
                // A CST Node's children dictionary can never have empty arrays as values
                // If a key is defined there will be at least one element in the corresponding value array.
                cstNode = cstNode[0];
            }
            // enables passing optional CstNodes concisely.
            if (utils.isUndefined(cstNode)) {
                return undefined;
            }
            if (cstNode.fullName !== undefined) {
                return this[cstNode.fullName](cstNode.children, param);
            }
            else {
                return this[cstNode.name](cstNode.children, param);
            }
        },
        validateVisitor: function () {
            var semanticDefinitionErrors = validateVisitor(this, ruleNames);
            if (!utils.isEmpty(semanticDefinitionErrors)) {
                var errorMessages = utils.map(semanticDefinitionErrors, function (currDefError) { return currDefError.msg; });
                throw Error("Errors Detected in CST Visitor <" + lang_extensions.functionName(this.constructor) + ">:\n\t" +
                    ("" + errorMessages.join("\n\n").replace(/\n/g, "\n\t")));
            }
        }
    };
    derivedConstructor.prototype = semanticProto;
    derivedConstructor.prototype.constructor = derivedConstructor;
    derivedConstructor._RULE_NAMES = ruleNames;
    return derivedConstructor;
}
exports.createBaseSemanticVisitorConstructor = createBaseSemanticVisitorConstructor;
function createBaseVisitorConstructorWithDefaults(grammarName, ruleNames, baseConstructor) {
    var derivedConstructor = function () { };
    // can be overwritten according to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/
    // name?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FFunction%2Fname
    lang_extensions.defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
    var withDefaultsProto = Object.create(baseConstructor.prototype);
    utils.forEach(ruleNames, function (ruleName) {
        withDefaultsProto[ruleName] = defaultVisit;
    });
    derivedConstructor.prototype = withDefaultsProto;
    derivedConstructor.prototype.constructor = derivedConstructor;
    return derivedConstructor;
}
exports.createBaseVisitorConstructorWithDefaults = createBaseVisitorConstructorWithDefaults;
var CstVisitorDefinitionError;
(function (CstVisitorDefinitionError) {
    CstVisitorDefinitionError[CstVisitorDefinitionError["REDUNDANT_METHOD"] = 0] = "REDUNDANT_METHOD";
    CstVisitorDefinitionError[CstVisitorDefinitionError["MISSING_METHOD"] = 1] = "MISSING_METHOD";
})(CstVisitorDefinitionError = exports.CstVisitorDefinitionError || (exports.CstVisitorDefinitionError = {}));
function validateVisitor(visitorInstance, ruleNames) {
    var missingErrors = validateMissingCstMethods(visitorInstance, ruleNames);
    var redundantErrors = validateRedundantMethods(visitorInstance, ruleNames);
    return missingErrors.concat(redundantErrors);
}
exports.validateVisitor = validateVisitor;
function validateMissingCstMethods(visitorInstance, ruleNames) {
    var errors = utils.map(ruleNames, function (currRuleName) {
        if (!utils.isFunction(visitorInstance[currRuleName])) {
            return {
                msg: "Missing visitor method: <" + currRuleName + "> on " + lang_extensions.functionName(visitorInstance.constructor) + " CST Visitor.",
                type: CstVisitorDefinitionError.MISSING_METHOD,
                methodName: currRuleName
            };
        }
    });
    return utils.compact(errors);
}
exports.validateMissingCstMethods = validateMissingCstMethods;
var VALID_PROP_NAMES = ["constructor", "visit", "validateVisitor"];
function validateRedundantMethods(visitorInstance, ruleNames) {
    var errors = [];
    for (var prop in visitorInstance) {
        if (checks.validTermsPattern.test(prop) &&
            utils.isFunction(visitorInstance[prop]) &&
            !utils.contains(VALID_PROP_NAMES, prop) &&
            !utils.contains(ruleNames, prop)) {
            errors.push({
                msg: "Redundant visitor method: <" + prop + "> on " + lang_extensions.functionName(visitorInstance.constructor) + " CST Visitor\n" +
                    "There is no Grammar Rule corresponding to this method's name.\n" +
                    ("For utility methods on visitor classes use methods names that do not match /" + checks.validTermsPattern.source + "/."),
                type: CstVisitorDefinitionError.REDUNDANT_METHOD,
                methodName: prop
            });
        }
    }
    return errors;
}
exports.validateRedundantMethods = validateRedundantMethods;

});

unwrapExports(cst_visitor);
var cst_visitor_1 = cst_visitor.defaultVisit;
var cst_visitor_2 = cst_visitor.createBaseSemanticVisitorConstructor;
var cst_visitor_3 = cst_visitor.createBaseVisitorConstructorWithDefaults;
var cst_visitor_4 = cst_visitor.CstVisitorDefinitionError;
var cst_visitor_5 = cst_visitor.validateVisitor;
var cst_visitor_6 = cst_visitor.validateMissingCstMethods;
var cst_visitor_7 = cst_visitor.validateRedundantMethods;

var resolver = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });




function resolveGrammar(topLevels, errMsgProvider) {
    if (errMsgProvider === void 0) { errMsgProvider = errors_public.defaultGrammarResolverErrorProvider; }
    var refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider);
    refResolver.resolveRefs();
    return refResolver.errors;
}
exports.resolveGrammar = resolveGrammar;
var GastRefResolverVisitor = /** @class */ (function (_super) {
    __extends(GastRefResolverVisitor, _super);
    function GastRefResolverVisitor(nameToTopRule, errMsgProvider) {
        var _this = _super.call(this) || this;
        _this.nameToTopRule = nameToTopRule;
        _this.errMsgProvider = errMsgProvider;
        _this.errors = [];
        return _this;
    }
    GastRefResolverVisitor.prototype.resolveRefs = function () {
        var _this = this;
        utils.forEach(this.nameToTopRule.values(), function (prod) {
            _this.currTopLevel = prod;
            prod.accept(_this);
        });
    };
    GastRefResolverVisitor.prototype.visitNonTerminal = function (node) {
        var ref = this.nameToTopRule.get(node.nonTerminalName);
        if (!ref) {
            var msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
            this.errors.push({
                message: msg,
                type: parser_public.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
                ruleName: this.currTopLevel.name,
                unresolvedRefName: node.nonTerminalName
            });
        }
        else {
            node.referencedRule = ref;
        }
    };
    return GastRefResolverVisitor;
}(gast_visitor_public.GAstVisitor));
exports.GastRefResolverVisitor = GastRefResolverVisitor;

});

unwrapExports(resolver);
var resolver_1 = resolver.resolveGrammar;
var resolver_2 = resolver.GastRefResolverVisitor;

var gast_resolver_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });






function resolveGrammar(options) {
    var topRulesTable = new lang_extensions.HashTable();
    utils.forEach(options.rules, function (rule) {
        topRulesTable.put(rule.name, rule);
    });
    return resolver.resolveGrammar(topRulesTable);
}
exports.resolveGrammar = resolveGrammar;
function validateGrammar(options) {
    return checks.validateGrammar(options.rules, options.maxLookahead, options.tokenTypes, options.ignoredIssues, options.errMsgProvider
        ? options.errMsgProvider
        : errors_public.defaultGrammarValidatorErrorProvider, options.grammarName);
}
exports.validateGrammar = validateGrammar;
function assignOccurrenceIndices(options) {
    utils.forEach(options.rules, function (currRule) {
        var methodsCollector = new gast.DslMethodsCollectorVisitor();
        currRule.accept(methodsCollector);
        utils.forEach(methodsCollector.dslMethods, function (methods) {
            utils.forEach(methods, function (currMethod, arrIdx) {
                currMethod.idx = arrIdx + 1;
            });
        });
    });
}
exports.assignOccurrenceIndices = assignOccurrenceIndices;

});

unwrapExports(gast_resolver_public);
var gast_resolver_public_1 = gast_resolver_public.resolveGrammar;
var gast_resolver_public_2 = gast_resolver_public.validateGrammar;
var gast_resolver_public_3 = gast_resolver_public.assignOccurrenceIndices;

var parser_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

var cache_1 = cache;


















var ParserDefinitionErrorType;
(function (ParserDefinitionErrorType) {
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_RULE_NAME"] = 0] = "INVALID_RULE_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_RULE_NAME"] = 1] = "DUPLICATE_RULE_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_RULE_OVERRIDE"] = 2] = "INVALID_RULE_OVERRIDE";
    ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_PRODUCTIONS"] = 3] = "DUPLICATE_PRODUCTIONS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["UNRESOLVED_SUBRULE_REF"] = 4] = "UNRESOLVED_SUBRULE_REF";
    ParserDefinitionErrorType[ParserDefinitionErrorType["LEFT_RECURSION"] = 5] = "LEFT_RECURSION";
    ParserDefinitionErrorType[ParserDefinitionErrorType["NONE_LAST_EMPTY_ALT"] = 6] = "NONE_LAST_EMPTY_ALT";
    ParserDefinitionErrorType[ParserDefinitionErrorType["AMBIGUOUS_ALTS"] = 7] = "AMBIGUOUS_ALTS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["CONFLICT_TOKENS_RULES_NAMESPACE"] = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE";
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_TOKEN_NAME"] = 9] = "INVALID_TOKEN_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["INVALID_NESTED_RULE_NAME"] = 10] = "INVALID_NESTED_RULE_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["DUPLICATE_NESTED_NAME"] = 11] = "DUPLICATE_NESTED_NAME";
    ParserDefinitionErrorType[ParserDefinitionErrorType["NO_NON_EMPTY_LOOKAHEAD"] = 12] = "NO_NON_EMPTY_LOOKAHEAD";
    ParserDefinitionErrorType[ParserDefinitionErrorType["AMBIGUOUS_PREFIX_ALTS"] = 13] = "AMBIGUOUS_PREFIX_ALTS";
    ParserDefinitionErrorType[ParserDefinitionErrorType["TOO_MANY_ALTS"] = 14] = "TOO_MANY_ALTS";
})(ParserDefinitionErrorType = exports.ParserDefinitionErrorType || (exports.ParserDefinitionErrorType = {}));
var IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException";
exports.END_OF_FILE = tokens_public.createTokenInstance(tokens_public.EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
Object.freeze(exports.END_OF_FILE);
var DEFAULT_PARSER_CONFIG = Object.freeze({
    recoveryEnabled: false,
    maxLookahead: 4,
    ignoredIssues: {},
    dynamicTokensEnabled: false,
    // TODO: Document this breaking change, can it be mitigated?
    // TODO: change to true
    outputCst: false,
    errorMessageProvider: errors_public.defaultParserErrorProvider
});
var DEFAULT_RULE_CONFIG = Object.freeze({
    recoveryValueFunc: function () { return undefined; },
    resyncEnabled: true
});
/**
 * Convenience used to express an empty alternative in an OR (alternation).
 * can be used to more clearly describe the intent in a case of empty alternation.
 *
 * For example:
 *
 * 1. without using EMPTY_ALT:
 *
 *    this.OR([
 *      {ALT: () => {
 *        this.CONSUME1(OneTok)
 *        return "1"
 *      }},
 *      {ALT: () => {
 *        this.CONSUME1(TwoTok)
 *        return "2"
 *      }},
 *      {ALT: () => { // implicitly empty because there are no invoked grammar rules (OR/MANY/CONSUME...) inside this alternative.
 *        return "666"
 *      }},
 *    ])
 *
 *
 * 2. using EMPTY_ALT:
 *
 *    this.OR([
 *      {ALT: () => {
 *        this.CONSUME1(OneTok)
 *        return "1"
 *      }},
 *      {ALT: () => {
 *        this.CONSUME1(TwoTok)
 *        return "2"
 *      }},
 *      {ALT: EMPTY_ALT("666")}, // explicitly empty, clearer intent
 *    ])
 *
 */
function EMPTY_ALT(value) {
    if (value === void 0) { value = undefined; }
    return function () {
        return value;
    };
}
exports.EMPTY_ALT = EMPTY_ALT;
var EOF_FOLLOW_KEY = {};
/**
 * A Recognizer capable of self analysis to determine it's grammar structure
 * This is used for more advanced features requiring such information.
 * For example: Error Recovery, Automatic lookahead calculation.
 */
var Parser = /** @class */ (function () {
    function Parser(input, tokenVocabulary, config) {
        if (config === void 0) { config = DEFAULT_PARSER_CONFIG; }
        this._errors = [];
        this.isBackTrackingStack = [];
        this.RULE_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
        this.CST_STACK = [];
        this.tokensMap = undefined;
        this.definedRulesNames = [];
        this.shortRuleNameToFull = new lang_extensions.HashTable();
        this.fullRuleNameToShort = new lang_extensions.HashTable();
        // The shortName Index must be coded "after" the first 8bits to enable building unique lookahead keys
        this.ruleShortNameIdx = 256;
        this.LAST_EXPLICIT_RULE_STACK = [];
        this.selfAnalysisDone = false;
        this.currIdx = -1;
        /**
         * Only used internally for storing productions as they are built for the first time.
         * The final productions should be accessed from the static cache.
         */
        this._productions = new lang_extensions.HashTable();
        this.input = input;
        // configuration
        this.recoveryEnabled = utils.has(config, "recoveryEnabled")
            ? config.recoveryEnabled
            : DEFAULT_PARSER_CONFIG.recoveryEnabled;
        // performance optimization, NOOP will be inlined which
        // effectively means that this optional feature does not exist
        // when not used.
        if (!this.recoveryEnabled) {
            this.attemptInRepetitionRecovery = utils.NOOP;
        }
        this.dynamicTokensEnabled = utils.has(config, "dynamicTokensEnabled")
            ? config.dynamicTokensEnabled
            : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled;
        this.maxLookahead = utils.has(config, "maxLookahead")
            ? config.maxLookahead
            : DEFAULT_PARSER_CONFIG.maxLookahead;
        this.ignoredIssues = utils.has(config, "ignoredIssues")
            ? config.ignoredIssues
            : DEFAULT_PARSER_CONFIG.ignoredIssues;
        this.outputCst = utils.has(config, "outputCst")
            ? config.outputCst
            : DEFAULT_PARSER_CONFIG.outputCst;
        this.errorMessageProvider = utils.defaults(config.errorMessageProvider, DEFAULT_PARSER_CONFIG.errorMessageProvider);
        if (!this.outputCst) {
            this.cstInvocationStateUpdate = utils.NOOP;
            this.cstFinallyStateUpdate = utils.NOOP;
            this.cstPostTerminal = utils.NOOP;
            this.cstPostNonTerminal = utils.NOOP;
            this.getLastExplicitRuleShortName = this.getLastExplicitRuleShortNameNoCst;
            this.getPreviousExplicitRuleShortName = this.getPreviousExplicitRuleShortNameNoCst;
            this.getLastExplicitRuleOccurrenceIndex = this.getLastExplicitRuleOccurrenceIndexNoCst;
            this.manyInternal = this.manyInternalNoCst;
            this.orInternal = this.orInternalNoCst;
            this.optionInternal = this.optionInternalNoCst;
            this.atLeastOneInternal = this.atLeastOneInternalNoCst;
            this.manySepFirstInternal = this.manySepFirstInternalNoCst;
            this.atLeastOneSepFirstInternal = this.atLeastOneSepFirstInternalNoCst;
        }
        this.className = lang_extensions.classNameFromInstance(this);
        this.firstAfterRepMap = cache.getFirstAfterRepForClass(this.className);
        this.classLAFuncs = cache.getLookaheadFuncsForClass(this.className);
        if (!cache.CLASS_TO_DEFINITION_ERRORS.containsKey(this.className)) {
            this.definitionErrors = [];
            cache.CLASS_TO_DEFINITION_ERRORS.put(this.className, this.definitionErrors);
        }
        else {
            this.definitionErrors = cache.CLASS_TO_DEFINITION_ERRORS.get(this.className);
        }
        if (utils.isArray(tokenVocabulary)) {
            this.tokensMap = utils.reduce(tokenVocabulary, function (acc, tokenClazz) {
                acc[tokens_public.tokenName(tokenClazz)] = tokenClazz;
                return acc;
            }, {});
        }
        else if (utils.has(tokenVocabulary, "modes") &&
            utils.every(utils.flatten(utils.values(tokenVocabulary.modes)), tokens.isTokenType)) {
            var allTokenTypes = utils.flatten(utils.values(tokenVocabulary.modes));
            var uniqueTokens = utils.uniq(allTokenTypes);
            this.tokensMap = utils.reduce(uniqueTokens, function (acc, tokenClazz) {
                acc[tokens_public.tokenName(tokenClazz)] = tokenClazz;
                return acc;
            }, {});
        }
        else if (utils.isObject(tokenVocabulary)) {
            this.tokensMap = utils.cloneObj(tokenVocabulary);
        }
        else {
            throw new Error("<tokensDictionary> argument must be An Array of Token constructors" +
                " A dictionary of Token constructors or an IMultiModeLexerDefinition");
        }
        var noTokenCategoriesUsed = utils.every(utils.values(tokenVocabulary), function (tokenConstructor) { return utils.isEmpty(tokenConstructor.categoryMatches); });
        this.tokenMatcher = noTokenCategoriesUsed
            ? tokens.tokenStructuredMatcherNoCategories
            : tokens.tokenStructuredMatcher;
        // always add EOF to the tokenNames -> constructors map. it is useful to assure all the input has been
        // parsed with a clear error message ("expecting EOF but found ...")
        /* tslint:disable */
        this.tokensMap["EOF"] = tokens_public.EOF;
        /* tslint:enable */
        // Because ES2015+ syntax should be supported for creating Token classes
        // We cannot assume that the Token classes were created using the "extendToken" utilities
        // Therefore we must augment the Token classes both on Lexer initialization and on Parser initialization
        tokens.augmentTokenTypes(utils.values(this.tokensMap));
    }
    Parser.performSelfAnalysis = function (parserInstance) {
        var definitionErrors = [];
        var defErrorsMsgs;
        parserInstance.selfAnalysisDone = true;
        var className = lang_extensions.classNameFromInstance(parserInstance);
        // can't test this with nyc tool, instrumentation causes the class name to be not empty.
        /* istanbul ignore if */
        if (className === "") {
            // just a simple "throw Error" without any fancy "definition error" because the logic below relies on a unique parser name to
            // save/access those definition errors...
            /* istanbul ignore next */
            throw Error("A Parser's constructor may not be an anonymous Function, it must be a named function\n" +
                "The constructor's name is used at runtime for performance (caching) purposes.");
        }
        // this information should only be computed once
        if (!cache.CLASS_TO_SELF_ANALYSIS_DONE.containsKey(className)) {
            cache.CLASS_TO_SELF_ANALYSIS_DONE.put(className, true);
            var orgProductions_1 = parserInstance._productions;
            var clonedProductions_1 = new lang_extensions.HashTable();
            // clone the grammar productions to support grammar inheritance. requirements:
            // 1. We want to avoid rebuilding the grammar every time so a cache for the productions is used.
            // 2. We need to collect the production from multiple grammars in an inheritance scenario during constructor invocation
            //    so the myGast variable is used.
            // 3. If a Production has been overridden references to it in the GAST must also be updated.
            utils.forEach(orgProductions_1.keys(), function (key) {
                var value = orgProductions_1.get(key);
                clonedProductions_1.put(key, gast.cloneProduction(value));
            });
            cache.getProductionsForClass(className).putAll(clonedProductions_1);
            // assumes this cache has been initialized (in the relevant parser's constructor)
            // TODO: consider making the self analysis a member method to resolve this.
            // that way it won't be callable before the constructor has been invoked...
            definitionErrors = cache.CLASS_TO_DEFINITION_ERRORS.get(className);
            var resolverErrors = gast_resolver_public.resolveGrammar({
                rules: clonedProductions_1.values()
            });
            definitionErrors.push.apply(definitionErrors, resolverErrors); // mutability for the win?
            // only perform additional grammar validations IFF no resolving errors have occurred.
            // as unresolved grammar may lead to unhandled runtime exceptions in the follow up validations.
            if (utils.isEmpty(resolverErrors)) {
                var validationErrors = gast_resolver_public.validateGrammar({
                    rules: clonedProductions_1.values(),
                    maxLookahead: parserInstance.maxLookahead,
                    tokenTypes: utils.values(parserInstance.tokensMap),
                    ignoredIssues: parserInstance.ignoredIssues,
                    errMsgProvider: errors_public.defaultGrammarValidatorErrorProvider,
                    grammarName: className
                });
                definitionErrors.push.apply(definitionErrors, validationErrors); // mutability for the win?
            }
            if (!utils.isEmpty(definitionErrors) &&
                !Parser.DEFER_DEFINITION_ERRORS_HANDLING) {
                defErrorsMsgs = utils.map(definitionErrors, function (defError) { return defError.message; });
                throw new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
            }
            if (utils.isEmpty(definitionErrors)) {
                // this analysis may fail if the grammar is not perfectly valid
                var allFollows = follow.computeAllProdsFollows(clonedProductions_1.values());
                cache.setResyncFollowsForClass(className, allFollows);
            }
            var cstAnalysisResult = cst.analyzeCst(clonedProductions_1.values(), parserInstance.fullRuleNameToShort);
            cache.CLASS_TO_ALL_RULE_NAMES.put(className, cstAnalysisResult.allRuleNames);
        }
        // reThrow the validation errors each time an erroneous parser is instantiated
        if (!utils.isEmpty(cache.CLASS_TO_DEFINITION_ERRORS.get(className)) &&
            !Parser.DEFER_DEFINITION_ERRORS_HANDLING) {
            defErrorsMsgs = utils.map(cache.CLASS_TO_DEFINITION_ERRORS.get(className), function (defError) { return defError.message; });
            throw new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
        }
    };
    Object.defineProperty(Parser.prototype, "errors", {
        get: function () {
            return utils.cloneArr(this._errors);
        },
        set: function (newErrors) {
            this._errors = newErrors;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the parser state, should be overridden for custom parsers which "carry" additional state.
     * When overriding, remember to also invoke the super implementation!
     */
    Parser.prototype.reset = function () {
        this.resetLexerState();
        this.isBackTrackingStack = [];
        this.errors = [];
        this.RULE_STACK = [];
        this.LAST_EXPLICIT_RULE_STACK = [];
        this.CST_STACK = [];
        this.RULE_OCCURRENCE_STACK = [];
    };
    Parser.prototype.isAtEndOfInput = function () {
        return this.tokenMatcher(this.LA(1), tokens_public.EOF);
    };
    Parser.prototype.getBaseCstVisitorConstructor = function () {
        var cachedConstructor = cache_1.CLASS_TO_BASE_CST_VISITOR.get(this.className);
        if (utils.isUndefined(cachedConstructor)) {
            var allRuleNames = cache_1.CLASS_TO_ALL_RULE_NAMES.get(this.className);
            cachedConstructor = cst_visitor.createBaseSemanticVisitorConstructor(this.className, allRuleNames);
            cache_1.CLASS_TO_BASE_CST_VISITOR.put(this.className, cachedConstructor);
        }
        return cachedConstructor;
    };
    Parser.prototype.getBaseCstVisitorConstructorWithDefaults = function () {
        var cachedConstructor = cache_1.CLASS_TO_BASE_CST_VISITOR_WITH_DEFAULTS.get(this.className);
        if (utils.isUndefined(cachedConstructor)) {
            var allRuleNames = cache_1.CLASS_TO_ALL_RULE_NAMES.get(this.className);
            var baseConstructor = this.getBaseCstVisitorConstructor();
            cachedConstructor = cst_visitor.createBaseVisitorConstructorWithDefaults(this.className, allRuleNames, baseConstructor);
            cache_1.CLASS_TO_BASE_CST_VISITOR_WITH_DEFAULTS.put(this.className, cachedConstructor);
        }
        return cachedConstructor;
    };
    Parser.prototype.getGAstProductions = function () {
        return cache.getProductionsForClass(this.className);
    };
    // This is more than a convenience method.
    // It is mostly used to draw the diagrams and having this method present on the parser instance
    // can avoid certain situations in which the serialization logic would fail due to multiple versions of chevrotain
    // bundled (due to multiple prototype chains and "instanceof" usage).
    Parser.prototype.getSerializedGastProductions = function () {
        return gast_public.serializeGrammar(cache.getProductionsForClass(this.className).values());
    };
    /**
     * @param startRuleName {string}
     * @param precedingInput {IToken[]} - The token vector up to (not including) the content assist point
     * @returns {ISyntacticContentAssistPath[]}
     */
    Parser.prototype.computeContentAssist = function (startRuleName, precedingInput) {
        var startRuleGast = cache
            .getProductionsForClass(this.className)
            .get(startRuleName);
        if (utils.isUndefined(startRuleGast)) {
            throw Error("Rule ->" + startRuleName + "<- does not exist in this grammar.");
        }
        return interpreter.nextPossibleTokensAfter([startRuleGast], precedingInput, this.tokenMatcher, this.maxLookahead);
    };
    Parser.prototype.isBackTracking = function () {
        return !utils.isEmpty(this.isBackTrackingStack);
    };
    Parser.prototype.getCurrRuleFullName = function () {
        var shortName = this.getLastExplicitRuleShortName();
        return this.shortRuleNameToFull.get(shortName);
    };
    Parser.prototype.shortRuleNameToFullName = function (shortName) {
        return this.shortRuleNameToFull.get(shortName);
    };
    Parser.prototype.getHumanReadableRuleStack = function () {
        var _this = this;
        if (!utils.isEmpty(this.LAST_EXPLICIT_RULE_STACK)) {
            return utils.map(this.LAST_EXPLICIT_RULE_STACK, function (currIdx) {
                return _this.shortRuleNameToFullName(_this.RULE_STACK[currIdx]);
            });
        }
        else {
            return utils.map(this.RULE_STACK, function (currShortName) {
                return _this.shortRuleNameToFullName(currShortName);
            });
        }
    };
    Parser.prototype.SAVE_ERROR = function (error) {
        if (exceptions_public.isRecognitionException(error)) {
            error.context = {
                ruleStack: this.getHumanReadableRuleStack(),
                ruleOccurrenceStack: utils.cloneArr(this.RULE_OCCURRENCE_STACK)
            };
            this._errors.push(error);
            return error;
        }
        else {
            throw Error("Trying to save an Error which is not a RecognitionException");
        }
    };
    /**
     * @param grammarRule - The rule to try and parse in backtracking mode.
     * @param args - argumens to be passed to the grammar rule execution
     *
     * @return {TokenType():boolean} a lookahead function that will try to parse the given grammarRule and will return true if succeed.
     */
    Parser.prototype.BACKTRACK = function (grammarRule, args) {
        return function () {
            // save org state
            this.isBackTrackingStack.push(1);
            var orgState = this.saveRecogState();
            try {
                grammarRule.apply(this, args);
                // if no exception was thrown we have succeed parsing the rule.
                return true;
            }
            catch (e) {
                if (exceptions_public.isRecognitionException(e)) {
                    return false;
                }
                else {
                    throw e;
                }
            }
            finally {
                this.reloadRecogState(orgState);
                this.isBackTrackingStack.pop();
            }
        };
    };
    // Parsing DSL
    /**
     * Convenience method equivalent to CONSUME1.
     * @see CONSUME1
     */
    Parser.prototype.CONSUME = function (tokType, options) {
        return this.consumeInternal(tokType, 0, options);
    };
    /**
     *
     * A Parsing DSL method use to consume a single terminal Token.
     * a Token will be consumed, IFF the next token in the token vector matches <tokType>.
     * otherwise the parser will attempt to perform error recovery.
     *
     * The index in the method name indicates the unique occurrence of a terminal consumption
     * inside a the top level rule. What this means is that if a terminal appears
     * more than once in a single rule, each appearance must have a difference index.
     *
     * for example:
     *
     * function parseQualifiedName() {
     *    this.CONSUME1(Identifier);
     *    this.MANY(()=> {
     *       this.CONSUME1(Dot);
     *       this.CONSUME2(Identifier); // <-- here we use CONSUME2 because the terminal
     *    });                           //     'Identifier' has already appeared previously in the
     *                                  //     the rule 'parseQualifiedName'
     * }
     *
     * @param tokType - The Type of the token to be consumed.
     * @param options - optional properties to modify the behavior of CONSUME.
     */
    Parser.prototype.CONSUME1 = function (tokType, options) {
        return this.consumeInternal(tokType, 1, options);
    };
    /**
     * @see CONSUME1
     */
    Parser.prototype.CONSUME2 = function (tokType, options) {
        return this.consumeInternal(tokType, 2, options);
    };
    /**
     * @see CONSUME1
     */
    Parser.prototype.CONSUME3 = function (tokType, options) {
        return this.consumeInternal(tokType, 3, options);
    };
    /**
     * @see CONSUME1
     */
    Parser.prototype.CONSUME4 = function (tokType, options) {
        return this.consumeInternal(tokType, 4, options);
    };
    /**
     * @see CONSUME1
     */
    Parser.prototype.CONSUME5 = function (tokType, options) {
        return this.consumeInternal(tokType, 5, options);
    };
    /**
     * @see CONSUME1
     */
    Parser.prototype.CONSUME6 = function (tokType, options) {
        return this.consumeInternal(tokType, 6, options);
    };
    /**
     * @see CONSUME1
     */
    Parser.prototype.CONSUME7 = function (tokType, options) {
        return this.consumeInternal(tokType, 7, options);
    };
    /**
     * @see CONSUME1
     */
    Parser.prototype.CONSUME8 = function (tokType, options) {
        return this.consumeInternal(tokType, 8, options);
    };
    /**
     * @see CONSUME1
     */
    Parser.prototype.CONSUME9 = function (tokType, options) {
        return this.consumeInternal(tokType, 9, options);
    };
    /**
     * Convenience method equivalent to SUBRULE1
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 0, options);
    };
    /**
     * The Parsing DSL Method is used by one rule to call another.
     *
     * This may seem redundant as it does not actually do much.
     * However using it is mandatory for all sub rule invocations.
     * calling another rule without wrapping in SUBRULE(...)
     * will cause errors/mistakes in the Recognizer's self analysis,
     * which will lead to errors in error recovery/automatic lookahead calculation
     * and any other functionality relying on the Recognizer's self analysis
     * output.
     *
     * As in CONSUME the index in the method name indicates the occurrence
     * of the sub rule invocation in its rule.
     *
     * @param {TokenType} ruleToCall - The rule to invoke.
     * @param {*[]} args - The arguments to pass to the invoked subrule.
     * @returns {*} - The result of invoking ruleToCall.
     */
    Parser.prototype.SUBRULE1 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 1, options);
    };
    /**
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE2 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 2, options);
    };
    /**
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE3 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 3, options);
    };
    /**
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE4 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 4, options);
    };
    /**
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE5 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 5, options);
    };
    /**
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE6 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 6, options);
    };
    /**
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE7 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 7, options);
    };
    /**
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE8 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 8, options);
    };
    /**
     * @see SUBRULE1
     */
    Parser.prototype.SUBRULE9 = function (ruleToCall, options) {
        return this.subruleInternal(ruleToCall, 9, options);
    };
    /**
     * Convenience method equivalent to OPTION1.
     * @see OPTION1
     */
    Parser.prototype.OPTION = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 0);
    };
    /**
     * Parsing DSL Method that Indicates an Optional production
     * in EBNF notation: [...].
     *
     * Note that there are two syntax forms:
     * - Passing the grammar action directly:
     *      this.OPTION(()=> {
     *        this.CONSUME(Digit)}
     *      );
     *
     * - using an "options" object:
     *      this.OPTION({
     *        GATE:predicateFunc,
     *        DEF: ()=>{
     *          this.CONSUME(Digit)
     *        }});
     *
     * The optional 'GATE' property in "options" object form can be used to add constraints
     * to invoking the grammar action.
     *
     * As in CONSUME the index in the method name indicates the occurrence
     * of the optional production in it's top rule.
     *
     * @param  actionORMethodDef - The grammar action to optionally invoke once
     *                             or an "OPTIONS" object describing the grammar action and optional properties.
     *
     * @returns {OUT}
     */
    Parser.prototype.OPTION1 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 1);
    };
    /**
     * @see OPTION1
     */
    Parser.prototype.OPTION2 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 2);
    };
    /**
     * @see OPTION1
     */
    Parser.prototype.OPTION3 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 3);
    };
    /**
     * @see OPTION1
     */
    Parser.prototype.OPTION4 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 4);
    };
    /**
     * @see OPTION1
     */
    Parser.prototype.OPTION5 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 5);
    };
    /**
     * @see OPTION1
     */
    Parser.prototype.OPTION6 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 6);
    };
    /**
     * @see OPTION1
     */
    Parser.prototype.OPTION7 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 7);
    };
    /**
     * @see OPTION1
     */
    Parser.prototype.OPTION8 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 8);
    };
    /**
     * @see OPTION1
     */
    Parser.prototype.OPTION9 = function (actionORMethodDef) {
        return this.optionInternal(actionORMethodDef, 9);
    };
    /**
     * Convenience method equivalent to OR1.
     * @see OR1
     */
    Parser.prototype.OR = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 0);
    };
    /**
     * Parsing DSL method that indicates a choice between a set of alternatives must be made.
     * This is equivalent to EBNF alternation (A | B | C | D ...)
     *
     * There are a couple of syntax forms for the inner alternatives array.
     *
     * Passing alternatives array directly:
     *        this.OR([
     *           {ALT:()=>{this.CONSUME(One)}},
     *           {ALT:()=>{this.CONSUME(Two)}},
     *           {ALT:()=>{this.CONSUME(Three)}}
     *        ])
     *
     * Passing alternative array directly with predicates (GATE).
     *        this.OR([
     *           {GATE: predicateFunc1, ALT:()=>{this.CONSUME(One)}},
     *           {GATE: predicateFuncX, ALT:()=>{this.CONSUME(Two)}},
     *           {GATE: predicateFuncX, ALT:()=>{this.CONSUME(Three)}}
     *        ])
     *
     * These syntax forms can also be mixed:
     *        this.OR([
     *           {GATE: predicateFunc1, ALT:()=>{this.CONSUME(One)}},
     *           {ALT:()=>{this.CONSUME(Two)}},
     *           {ALT:()=>{this.CONSUME(Three)}}
     *        ])
     *
     * Additionally an "options" object may be used:
     * this.OR({
     *          DEF:[
     *            {ALT:()=>{this.CONSUME(One)}},
     *            {ALT:()=>{this.CONSUME(Two)}},
     *            {ALT:()=>{this.CONSUME(Three)}}
     *          ],
     *          // OPTIONAL property
     *          ERR_MSG: "A Number"
     *        })
     *
     * The 'predicateFuncX' in the long form can be used to add constraints to choosing the alternative.
     *
     * As in CONSUME the index in the method name indicates the occurrence
     * of the alternation production in it's top rule.
     *
     * @param altsOrOpts - A set of alternatives or an "OPTIONS" object describing the alternatives and optional properties.
     *
     * @returns {*} - The result of invoking the chosen alternative.
     */
    Parser.prototype.OR1 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 1);
    };
    /**
     * @see OR1
     */
    Parser.prototype.OR2 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 2);
    };
    /**
     * @see OR1
     */
    Parser.prototype.OR3 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 3);
    };
    /**
     * @see OR1
     */
    Parser.prototype.OR4 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 4);
    };
    /**
     * @see OR1
     */
    Parser.prototype.OR5 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 5);
    };
    /**
     * @see OR1
     */
    Parser.prototype.OR6 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 6);
    };
    /**
     * @see OR1
     */
    Parser.prototype.OR7 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 7);
    };
    /**
     * @see OR1
     */
    Parser.prototype.OR8 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 8);
    };
    /**
     * @see OR1
     */
    Parser.prototype.OR9 = function (altsOrOpts) {
        return this.orInternal(altsOrOpts, 9);
    };
    /**
     * Convenience method equivalent to MANY1.
     * @see MANY1
     */
    Parser.prototype.MANY = function (actionORMethodDef) {
        return this.manyInternal(0, actionORMethodDef, []);
    };
    /**
     * Parsing DSL method, that indicates a repetition of zero or more.
     * This is equivalent to EBNF repetition {...}.
     *
     * Note that there are two syntax forms:
     * - Passing the grammar action directly:
     *        this.MANY(()=>{
     *                        this.CONSUME(Comma)
     *                        this.CONSUME(Digit)
     *                      })
     *
     * - using an "options" object:
     *        this.MANY({
     *                   GATE: predicateFunc,
     *                   DEF: () => {
     *                          this.CONSUME(Comma)
     *                          this.CONSUME(Digit)
     *                        }
     *                 });
     *
     * The optional 'GATE' property in "options" object form can be used to add constraints
     * to invoking the grammar action.
     *
     * As in CONSUME the index in the method name indicates the occurrence
     * of the repetition production in it's top rule.
     *
     * @param {TokenType} actionORMethodDef - The grammar action to optionally invoke multiple times
     *                             or an "OPTIONS" object describing the grammar action and optional properties.
     *
     * @returns {OUT[]}
     */
    Parser.prototype.MANY1 = function (actionORMethodDef) {
        return this.manyInternal(1, actionORMethodDef, []);
    };
    /**
     * @see MANY1
     */
    Parser.prototype.MANY2 = function (actionORMethodDef) {
        return this.manyInternal(2, actionORMethodDef, []);
    };
    /**
     * @see MANY1
     */
    Parser.prototype.MANY3 = function (actionORMethodDef) {
        return this.manyInternal(3, actionORMethodDef, []);
    };
    /**
     * @see MANY1
     */
    Parser.prototype.MANY4 = function (actionORMethodDef) {
        return this.manyInternal(4, actionORMethodDef, []);
    };
    /**
     * @see MANY1
     */
    Parser.prototype.MANY5 = function (actionORMethodDef) {
        return this.manyInternal(5, actionORMethodDef, []);
    };
    /**
     * @see MANY1
     */
    Parser.prototype.MANY6 = function (actionORMethodDef) {
        return this.manyInternal(6, actionORMethodDef, []);
    };
    /**
     * @see MANY1
     */
    Parser.prototype.MANY7 = function (actionORMethodDef) {
        return this.manyInternal(7, actionORMethodDef, []);
    };
    /**
     * @see MANY1
     */
    Parser.prototype.MANY8 = function (actionORMethodDef) {
        return this.manyInternal(8, actionORMethodDef, []);
    };
    /**
     * @see MANY1
     */
    Parser.prototype.MANY9 = function (actionORMethodDef) {
        return this.manyInternal(9, actionORMethodDef, []);
    };
    /**
     * Convenience method equivalent to MANY_SEP1.
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP = function (options) {
        return this.manySepFirstInternal(0, options, {
            values: [],
            separators: []
        });
    };
    /**
     * Parsing DSL method, that indicates a repetition of zero or more with a separator
     * Token between the repetitions.
     *
     * Example:
     *
     * this.MANY_SEP({
     *                  SEP:Comma,
     *                  DEF: () => {
     *                         this.CONSUME(Number};
     *                         ...
     *                       );
     *              })
     *
     * Note that because this DSL method always requires more than one argument the options object is always required
     * and it is not possible to use a shorter form like in the MANY DSL method.
     *
     * Note that for the purposes of deciding on whether or not another iteration exists
     * Only a single Token is examined (The separator). Therefore if the grammar being implemented is
     * so "crazy" to require multiple tokens to identify an item separator please use the more basic DSL methods
     * to implement it.
     *
     * As in CONSUME the index in the method name indicates the occurrence
     * of the repetition production in it's top rule.
     *
     * Note that due to current limitations in the implementation the "SEP" property must appear BEFORE the "DEF" property.
     *
     * @param options - An object defining the grammar of each iteration and the separator between iterations
     *
     * @return {ISeparatedIterationResult<OUT>}
     */
    Parser.prototype.MANY_SEP1 = function (options) {
        return this.manySepFirstInternal(1, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP2 = function (options) {
        return this.manySepFirstInternal(2, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP3 = function (options) {
        return this.manySepFirstInternal(3, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP4 = function (options) {
        return this.manySepFirstInternal(4, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP5 = function (options) {
        return this.manySepFirstInternal(5, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP6 = function (options) {
        return this.manySepFirstInternal(6, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP7 = function (options) {
        return this.manySepFirstInternal(7, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP8 = function (options) {
        return this.manySepFirstInternal(8, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see MANY_SEP1
     */
    Parser.prototype.MANY_SEP9 = function (options) {
        return this.manySepFirstInternal(9, options, {
            values: [],
            separators: []
        });
    };
    /**
     * Convenience method equivalent to AT_LEAST_ONE1.
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE = function (actionORMethodDef) {
        return this.atLeastOneInternal(0, actionORMethodDef, []);
    };
    /**
     * Convenience method, same as MANY but the repetition is of one or more.
     * failing to match at least one repetition will result in a parsing error and
     * cause a parsing error.
     *
     * @see MANY1
     *
     * @param actionORMethodDef  - The grammar action to optionally invoke multiple times
     *                             or an "OPTIONS" object describing the grammar action and optional properties.
     *
     * @return {OUT[]}
     */
    Parser.prototype.AT_LEAST_ONE1 = function (actionORMethodDef) {
        return this.atLeastOneInternal(1, actionORMethodDef, []);
    };
    /**
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE2 = function (actionORMethodDef) {
        return this.atLeastOneInternal(2, actionORMethodDef, []);
    };
    /**
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE3 = function (actionORMethodDef) {
        return this.atLeastOneInternal(3, actionORMethodDef, []);
    };
    /**
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE4 = function (actionORMethodDef) {
        return this.atLeastOneInternal(4, actionORMethodDef, []);
    };
    /**
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE5 = function (actionORMethodDef) {
        return this.atLeastOneInternal(5, actionORMethodDef, []);
    };
    /**
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE6 = function (actionORMethodDef) {
        return this.atLeastOneInternal(6, actionORMethodDef, []);
    };
    /**
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE7 = function (actionORMethodDef) {
        return this.atLeastOneInternal(7, actionORMethodDef, []);
    };
    /**
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE8 = function (actionORMethodDef) {
        return this.atLeastOneInternal(8, actionORMethodDef, []);
    };
    /**
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE9 = function (actionORMethodDef) {
        return this.atLeastOneInternal(9, actionORMethodDef, []);
    };
    /**
     * Convenience method equivalent to AT_LEAST_ONE_SEP1.
     * @see AT_LEAST_ONE1
     */
    Parser.prototype.AT_LEAST_ONE_SEP = function (options) {
        return this.atLeastOneSepFirstInternal(0, options, {
            values: [],
            separators: []
        });
    };
    /**
     * Convenience method, same as MANY_SEP but the repetition is of one or more.
     * failing to match at least one repetition will result in a parsing error and
     * cause the parser to attempt error recovery.
     *
     * Note that an additional optional property ERR_MSG can be used to provide custom error messages.
     *
     * @see MANY_SEP1
     *
     * @param options - An object defining the grammar of each iteration and the separator between iterations
     *
     * @return {ISeparatedIterationResult<OUT>}
     */
    Parser.prototype.AT_LEAST_ONE_SEP1 = function (options) {
        return this.atLeastOneSepFirstInternal(1, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see AT_LEAST_ONE_SEP1
     */
    Parser.prototype.AT_LEAST_ONE_SEP2 = function (options) {
        return this.atLeastOneSepFirstInternal(2, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see AT_LEAST_ONE_SEP1
     */
    Parser.prototype.AT_LEAST_ONE_SEP3 = function (options) {
        return this.atLeastOneSepFirstInternal(3, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see AT_LEAST_ONE_SEP1
     */
    Parser.prototype.AT_LEAST_ONE_SEP4 = function (options) {
        return this.atLeastOneSepFirstInternal(4, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see AT_LEAST_ONE_SEP1
     */
    Parser.prototype.AT_LEAST_ONE_SEP5 = function (options) {
        return this.atLeastOneSepFirstInternal(5, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see AT_LEAST_ONE_SEP1
     */
    Parser.prototype.AT_LEAST_ONE_SEP6 = function (options) {
        return this.atLeastOneSepFirstInternal(6, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see AT_LEAST_ONE_SEP1
     */
    Parser.prototype.AT_LEAST_ONE_SEP7 = function (options) {
        return this.atLeastOneSepFirstInternal(7, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see AT_LEAST_ONE_SEP1
     */
    Parser.prototype.AT_LEAST_ONE_SEP8 = function (options) {
        return this.atLeastOneSepFirstInternal(8, options, {
            values: [],
            separators: []
        });
    };
    /**
     * @see AT_LEAST_ONE_SEP1
     */
    Parser.prototype.AT_LEAST_ONE_SEP9 = function (options) {
        return this.atLeastOneSepFirstInternal(9, options, {
            values: [],
            separators: []
        });
    };
    /**
     *
     * @param {string} name - The name of the rule.
     * @param {TokenType} implementation - The implementation of the rule.
     * @param {IRuleConfig} [config] - The rule's optional configuration.
     *
     * @returns {TokenType} - The parsing rule which is the production implementation wrapped with the parsing logic that handles
     *                     Parser state / error recovery&reporting/ ...
     */
    Parser.prototype.RULE = function (name, implementation, 
        // TODO: how to describe the optional return type of CSTNode? T|CstNode is not good because it is not backward
        // compatible, T|any is very general...
        config) {
        // TODO: how to describe the optional return type of CSTNode? T|CstNode is not good because it is not backward
        // compatible, T|any is very general...
        if (config === void 0) { config = DEFAULT_RULE_CONFIG; }
        if (utils.contains(this.definedRulesNames, name)) {
            var errMsg = errors_public.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
                topLevelRule: name,
                grammarName: this.className
            });
            var error = {
                message: errMsg,
                type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
                ruleName: name
            };
            this.definitionErrors.push(error);
        }
        this.definedRulesNames.push(name);
        // only build the gast representation once.
        if (!this._productions.containsKey(name)) {
            var gastProduction = gast_builder.buildTopProduction(implementation.toString(), name, this.tokensMap);
            this._productions.put(name, gastProduction);
        }
        else {
            var parserClassProductions = cache.getProductionsForClass(this.className);
            var cachedProduction = parserClassProductions.get(name);
            // in case of duplicate rules the cache will not be filled at this point.
            if (!utils.isUndefined(cachedProduction)) {
                // filling up the _productions is always needed to inheriting grammars can access it (as an instance member)
                // otherwise they will be unaware of productions defined in super grammars.
                this._productions.put(name, cachedProduction);
            }
        }
        var ruleImplementation = this.defineRule(name, implementation, config);
        this[name] = ruleImplementation;
        return ruleImplementation;
    };
    /**
     * @See RULE
     * Same as RULE, but should only be used in "extending" grammars to override rules/productions
     * from the super grammar.
     */
    Parser.prototype.OVERRIDE_RULE = function (name, impl, config) {
        if (config === void 0) { config = DEFAULT_RULE_CONFIG; }
        var ruleErrors = [];
        ruleErrors = ruleErrors.concat(checks.validateRuleIsOverridden(name, this.definedRulesNames, this.className));
        this.definitionErrors.push.apply(this.definitionErrors, ruleErrors); // mutability for the win
        var alreadyOverridden = cache.getProductionOverriddenForClass(this.className);
        // only build the GAST of an overridden rule once.
        if (!alreadyOverridden.containsKey(name)) {
            alreadyOverridden.put(name, true);
            var gastProduction = gast_builder.buildTopProduction(impl.toString(), name, this.tokensMap);
            this._productions.put(name, gastProduction);
        }
        else {
            var parserClassProductions = cache.getProductionsForClass(this.className);
            // filling up the _productions is always needed to inheriting grammars can access it (as an instance member)
            // otherwise they will be unaware of productions defined in super grammars.
            this._productions.put(name, parserClassProductions.get(name));
        }
        return this.defineRule(name, impl, config);
    };
    Parser.prototype.ruleInvocationStateUpdate = function (shortName, fullName, idxInCallingRule) {
        this.RULE_OCCURRENCE_STACK.push(idxInCallingRule);
        this.RULE_STACK.push(shortName);
        // NOOP when cst is disabled
        this.cstInvocationStateUpdate(fullName, shortName);
    };
    Parser.prototype.ruleFinallyStateUpdate = function () {
        this.RULE_STACK.pop();
        this.RULE_OCCURRENCE_STACK.pop();
        // NOOP when cst is disabled
        this.cstFinallyStateUpdate();
        if (this.RULE_STACK.length === 0 && !this.isAtEndOfInput()) {
            var firstRedundantTok = this.LA(1);
            var errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
                firstRedundant: firstRedundantTok,
                ruleName: this.getCurrRuleFullName()
            });
            this.SAVE_ERROR(new exceptions_public.NotAllInputParsedException(errMsg, firstRedundantTok));
        }
    };
    Parser.prototype.nestedRuleInvocationStateUpdate = function (nestedRuleName, shortNameKey) {
        this.RULE_OCCURRENCE_STACK.push(1);
        this.RULE_STACK.push(shortNameKey);
        this.cstNestedInvocationStateUpdate(nestedRuleName, shortNameKey);
    };
    Parser.prototype.nestedRuleFinallyStateUpdate = function () {
        this.RULE_STACK.pop();
        this.RULE_OCCURRENCE_STACK.pop();
        // NOOP when cst is disabled
        this.cstNestedFinallyStateUpdate();
    };
    /**
     * Returns an "imaginary" Token to insert when Single Token Insertion is done
     * Override this if you require special behavior in your grammar.
     * For example if an IntegerToken is required provide one with the image '0' so it would be valid syntactically.
     */
    Parser.prototype.getTokenToInsert = function (tokType) {
        var tokToInsert = tokens_public.createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
        tokToInsert.isInsertedInRecovery = true;
        return tokToInsert;
    };
    /**
     * By default all tokens type may be inserted. This behavior may be overridden in inheriting Recognizers
     * for example: One may decide that only punctuation tokens may be inserted automatically as they have no additional
     * semantic value. (A mandatory semicolon has no additional semantic meaning, but an Integer may have additional meaning
     * depending on its int value and context (Inserting an integer 0 in cardinality: "[1..]" will cause semantic issues
     * as the max of the cardinality will be greater than the min value (and this is a false error!).
     */
    Parser.prototype.canTokenTypeBeInsertedInRecovery = function (tokType) {
        return true;
    };
    Parser.prototype.getCurrentGrammarPath = function (tokType, tokIdxInRule) {
        var pathRuleStack = this.getHumanReadableRuleStack();
        var pathOccurrenceStack = utils.cloneArr(this.RULE_OCCURRENCE_STACK);
        var grammarPath = {
            ruleStack: pathRuleStack,
            occurrenceStack: pathOccurrenceStack,
            lastTok: tokType,
            lastTokOccurrence: tokIdxInRule
        };
        return grammarPath;
    };
    // TODO: should this be a member method or a utility? it does not have any state or usage of 'this'...
    // TODO: should this be more explicitly part of the public API?
    Parser.prototype.getNextPossibleTokenTypes = function (grammarPath) {
        var topRuleName = utils.first(grammarPath.ruleStack);
        var gastProductions = this.getGAstProductions();
        var topProduction = gastProductions.get(topRuleName);
        var nextPossibleTokenTypes = new interpreter.NextAfterTokenWalker(topProduction, grammarPath).startWalking();
        return nextPossibleTokenTypes;
    };
    Parser.prototype.subruleInternal = function (ruleToCall, idx, options) {
        var args = options !== undefined ? options.ARGS : undefined;
        var ruleResult = ruleToCall.call(this, idx, args);
        this.cstPostNonTerminal(ruleResult, options !== undefined && options.LABEL !== undefined
            ? options.LABEL
            : ruleToCall.ruleName);
        return ruleResult;
    };
    /**
     * @param tokType - The Type of Token we wish to consume (Reference to its constructor function).
     * @param idx - Occurrence index of consumed token in the invoking parser rule text
     *         for example:
     *         IDENT (DOT IDENT)*
     *         the first ident will have idx 1 and the second one idx 2
     *         * note that for the second ident the idx is always 2 even if its invoked 30 times in the same rule
     *           the idx is about the position in grammar (source code) and has nothing to do with a specific invocation
     *           details.
     * @param options -
     *
     * @returns {Token} - The consumed Token.
     */
    Parser.prototype.consumeInternal = function (tokType, idx, options) {
        var consumedToken;
        try {
            var nextToken = this.LA(1);
            if (this.tokenMatcher(nextToken, tokType) === true) {
                this.consumeToken();
                consumedToken = nextToken;
            }
            else {
                var msg = void 0;
                if (options !== undefined && options.ERR_MSG) {
                    msg = options.ERR_MSG;
                }
                else {
                    msg = this.errorMessageProvider.buildMismatchTokenMessage({
                        expected: tokType,
                        actual: nextToken,
                        ruleName: this.getCurrRuleFullName()
                    });
                }
                throw this.SAVE_ERROR(new exceptions_public.MismatchedTokenException(msg, nextToken));
            }
        }
        catch (eFromConsumption) {
            // no recovery allowed during backtracking, otherwise backtracking may recover invalid syntax and accept it
            // but the original syntax could have been parsed successfully without any backtracking + recovery
            if (this.recoveryEnabled &&
                // TODO: more robust checking of the exception type. Perhaps Typescript extending expressions?
                eFromConsumption.name === "MismatchedTokenException" &&
                !this.isBackTracking()) {
                var follows = this.getFollowsForInRuleRecovery(tokType, idx);
                try {
                    consumedToken = this.tryInRuleRecovery(tokType, follows);
                }
                catch (eFromInRuleRecovery) {
                    if (eFromInRuleRecovery.name === IN_RULE_RECOVERY_EXCEPTION) {
                        // failed in RuleRecovery.
                        // throw the original error in order to trigger reSync error recovery
                        throw eFromConsumption;
                    }
                    else {
                        throw eFromInRuleRecovery;
                    }
                }
            }
            else {
                throw eFromConsumption;
            }
        }
        this.cstPostTerminal(options !== undefined && options.LABEL !== undefined
            ? options.LABEL
            : tokType.tokenName, consumedToken);
        return consumedToken;
    };
    // other functionality
    Parser.prototype.saveRecogState = function () {
        // errors is a getter which will clone the errors array
        var savedErrors = this.errors;
        var savedRuleStack = utils.cloneArr(this.RULE_STACK);
        return {
            errors: savedErrors,
            lexerState: this.exportLexerState(),
            RULE_STACK: savedRuleStack,
            CST_STACK: this.CST_STACK,
            LAST_EXPLICIT_RULE_STACK: this.LAST_EXPLICIT_RULE_STACK
        };
    };
    Parser.prototype.reloadRecogState = function (newState) {
        this.errors = newState.errors;
        this.importLexerState(newState.lexerState);
        this.RULE_STACK = newState.RULE_STACK;
    };
    Parser.prototype.defineRule = function (ruleName, impl, config) {
        if (this.selfAnalysisDone) {
            throw Error("Grammar rule <" + ruleName + "> may not be defined after the 'performSelfAnalysis' method has been called'\n" +
                "Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");
        }
        var resyncEnabled = utils.has(config, "resyncEnabled")
            ? config.resyncEnabled
            : DEFAULT_RULE_CONFIG.resyncEnabled;
        var recoveryValueFunc = utils.has(config, "recoveryValueFunc")
            ? config.recoveryValueFunc
            : DEFAULT_RULE_CONFIG.recoveryValueFunc;
        // performance optimization: Use small integers as keys for the longer human readable "full" rule names.
        // this greatly improves Map access time (as much as 8% for some performance benchmarks).
        /* tslint:disable */
        var shortName = this.ruleShortNameIdx <<
            (keys.BITS_FOR_METHOD_IDX + keys.BITS_FOR_OCCURRENCE_IDX);
        /* tslint:enable */
        this.ruleShortNameIdx++;
        this.shortRuleNameToFull.put(shortName, ruleName);
        this.fullRuleNameToShort.put(ruleName, shortName);
        function invokeRuleWithTry(args) {
            try {
                // TODO: dynamically get rid of this?
                if (this.outputCst === true) {
                    impl.apply(this, args);
                    return this.CST_STACK[this.CST_STACK.length - 1];
                }
                else {
                    return impl.apply(this, args);
                }
            }
            catch (e) {
                var isFirstInvokedRule = this.RULE_STACK.length === 1;
                // note the reSync is always enabled for the first rule invocation, because we must always be able to
                // reSync with EOF and just output some INVALID ParseTree
                // during backtracking reSync recovery is disabled, otherwise we can't be certain the backtracking
                // path is really the most valid one
                var reSyncEnabled = resyncEnabled &&
                    !this.isBackTracking() &&
                    this.recoveryEnabled;
                if (exceptions_public.isRecognitionException(e)) {
                    if (reSyncEnabled) {
                        var reSyncTokType = this.findReSyncTokenType();
                        if (this.isInCurrentRuleReSyncSet(reSyncTokType)) {
                            e.resyncedTokens = this.reSyncTo(reSyncTokType);
                            if (this.outputCst) {
                                var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                                partialCstResult.recoveredNode = true;
                                return partialCstResult;
                            }
                            else {
                                return recoveryValueFunc();
                            }
                        }
                        else {
                            if (this.outputCst) {
                                // recovery is only for "real" non nested rules
                                var prevRuleShortName = this.getLastExplicitRuleShortNameNoCst();
                                var preRuleFullName = this.shortRuleNameToFull.get(prevRuleShortName);
                                var partialCstResult = this.CST_STACK[this.CST_STACK.length - 1];
                                partialCstResult.recoveredNode = true;
                                this.cstPostNonTerminalRecovery(partialCstResult, preRuleFullName);
                            }
                            // to be handled farther up the call stack
                            throw e;
                        }
                    }
                    else if (isFirstInvokedRule) {
                        // otherwise a Redundant input error will be created as well and we cannot guarantee that this is indeed the case
                        this.moveToTerminatedState();
                        // the parser should never throw one of its own errors outside its flow.
                        // even if error recovery is disabled
                        return recoveryValueFunc();
                    }
                    else {
                        // to be handled farther up the call stack
                        throw e;
                    }
                }
                else {
                    // some other Error type which we don't know how to handle (for example a built in JavaScript Error)
                    throw e;
                }
            }
            finally {
                this.ruleFinallyStateUpdate();
            }
        }
        var wrappedGrammarRule;
        wrappedGrammarRule = function (idxInCallingRule, args) {
            if (idxInCallingRule === void 0) { idxInCallingRule = 0; }
            this.ruleInvocationStateUpdate(shortName, ruleName, idxInCallingRule);
            return invokeRuleWithTry.call(this, args);
        };
        var ruleNamePropName = "ruleName";
        wrappedGrammarRule[ruleNamePropName] = ruleName;
        return wrappedGrammarRule;
    };
    Parser.prototype.tryInRepetitionRecovery = function (grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
        var _this = this;
        // TODO: can the resyncTokenType be cached?
        var reSyncTokType = this.findReSyncTokenType();
        var savedLexerState = this.exportLexerState();
        var resyncedTokens = [];
        var passedResyncPoint = false;
        var nextTokenWithoutResync = this.LA(1);
        var currToken = this.LA(1);
        var generateErrorMessage = function () {
            // we are preemptively re-syncing before an error has been detected, therefor we must reproduce
            // the error that would have been thrown
            var msg = _this.errorMessageProvider.buildMismatchTokenMessage({
                expected: expectedTokType,
                actual: nextTokenWithoutResync,
                ruleName: _this.getCurrRuleFullName()
            });
            var error = new exceptions_public.MismatchedTokenException(msg, nextTokenWithoutResync);
            // the first token here will be the original cause of the error, this is not part of the resyncedTokens property.
            error.resyncedTokens = utils.dropRight(resyncedTokens);
            _this.SAVE_ERROR(error);
        };
        while (!passedResyncPoint) {
            // re-synced to a point where we can safely exit the repetition/
            if (this.tokenMatcher(currToken, expectedTokType)) {
                generateErrorMessage();
                return; // must return here to avoid reverting the inputIdx
            }
            else if (lookAheadFunc.call(this)) {
                // we skipped enough tokens so we can resync right back into another iteration of the repetition grammar rule
                generateErrorMessage();
                // recursive invocation in other to support multiple re-syncs in the same top level repetition grammar rule
                grammarRule.apply(this, grammarRuleArgs);
                return; // must return here to avoid reverting the inputIdx
            }
            else if (this.tokenMatcher(currToken, reSyncTokType)) {
                passedResyncPoint = true;
            }
            else {
                currToken = this.SKIP_TOKEN();
                this.addToResyncTokens(currToken, resyncedTokens);
            }
        }
        // we were unable to find a CLOSER point to resync inside the Repetition, reset the state.
        // The parsing exception we were trying to prevent will happen in the NEXT parsing step. it may be handled by
        // "between rules" resync recovery later in the flow.
        this.importLexerState(savedLexerState);
    };
    Parser.prototype.shouldInRepetitionRecoveryBeTried = function (expectTokAfterLastMatch, nextTokIdx) {
        // arguments to try and perform resync into the next iteration of the many are missing
        if (expectTokAfterLastMatch === undefined || nextTokIdx === undefined) {
            return false;
        }
        // no need to recover, next token is what we expect...
        if (this.tokenMatcher(this.LA(1), expectTokAfterLastMatch)) {
            return false;
        }
        // error recovery is disabled during backtracking as it can make the parser ignore a valid grammar path
        // and prefer some backtracking path that includes recovered errors.
        if (this.isBackTracking()) {
            return false;
        }
        // if we can perform inRule recovery (single token insertion or deletion) we always prefer that recovery algorithm
        // because if it works, it makes the least amount of changes to the input stream (greedy algorithm)
        //noinspection RedundantIfStatementJS
        if (this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx))) {
            return false;
        }
        return true;
    };
    // Error Recovery functionality
    Parser.prototype.getFollowsForInRuleRecovery = function (tokType, tokIdxInRule) {
        var grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
        var follows = this.getNextPossibleTokenTypes(grammarPath);
        return follows;
    };
    Parser.prototype.tryInRuleRecovery = function (expectedTokType, follows) {
        if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) {
            var tokToInsert = this.getTokenToInsert(expectedTokType);
            return tokToInsert;
        }
        if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
            var nextTok = this.SKIP_TOKEN();
            this.consumeToken();
            return nextTok;
        }
        throw new InRuleRecoveryException("sad sad panda");
    };
    Parser.prototype.canPerformInRuleRecovery = function (expectedToken, follows) {
        return (this.canRecoverWithSingleTokenInsertion(expectedToken, follows) ||
            this.canRecoverWithSingleTokenDeletion(expectedToken));
    };
    Parser.prototype.canRecoverWithSingleTokenInsertion = function (expectedTokType, follows) {
        var _this = this;
        if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) {
            return false;
        }
        // must know the possible following tokens to perform single token insertion
        if (utils.isEmpty(follows)) {
            return false;
        }
        var mismatchedTok = this.LA(1);
        var isMisMatchedTokInFollows = utils.find(follows, function (possibleFollowsTokType) {
            return _this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
        }) !== undefined;
        return isMisMatchedTokInFollows;
    };
    Parser.prototype.canRecoverWithSingleTokenDeletion = function (expectedTokType) {
        var isNextTokenWhatIsExpected = this.tokenMatcher(this.LA(2), expectedTokType);
        return isNextTokenWhatIsExpected;
    };
    Parser.prototype.isInCurrentRuleReSyncSet = function (tokenTypeIdx) {
        var followKey = this.getCurrFollowKey();
        var currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
        return utils.contains(currentRuleReSyncSet, tokenTypeIdx);
    };
    Parser.prototype.findReSyncTokenType = function () {
        var allPossibleReSyncTokTypes = this.flattenFollowSet();
        // this loop will always terminate as EOF is always in the follow stack and also always (virtually) in the input
        var nextToken = this.LA(1);
        var k = 2;
        while (true) {
            var nextTokenType = nextToken.tokenType;
            if (utils.contains(allPossibleReSyncTokTypes, nextTokenType)) {
                return nextTokenType;
            }
            nextToken = this.LA(k);
            k++;
        }
    };
    Parser.prototype.getCurrFollowKey = function () {
        // the length is at least one as we always add the ruleName to the stack before invoking the rule.
        if (this.RULE_STACK.length === 1) {
            return EOF_FOLLOW_KEY;
        }
        var currRuleShortName = this.getLastExplicitRuleShortName();
        var currRuleIdx = this.getLastExplicitRuleOccurrenceIndex();
        var prevRuleShortName = this.getPreviousExplicitRuleShortName();
        return {
            ruleName: this.shortRuleNameToFullName(currRuleShortName),
            idxInCallingRule: currRuleIdx,
            inRule: this.shortRuleNameToFullName(prevRuleShortName)
        };
    };
    Parser.prototype.buildFullFollowKeyStack = function () {
        var _this = this;
        var explicitRuleStack = this.RULE_STACK;
        var explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
        if (!utils.isEmpty(this.LAST_EXPLICIT_RULE_STACK)) {
            explicitRuleStack = utils.map(this.LAST_EXPLICIT_RULE_STACK, function (idx) { return _this.RULE_STACK[idx]; });
            explicitOccurrenceStack = utils.map(this.LAST_EXPLICIT_RULE_STACK, function (idx) { return _this.RULE_OCCURRENCE_STACK[idx]; });
        }
        // TODO: only iterate over explicit rules here
        return utils.map(explicitRuleStack, function (ruleName, idx) {
            if (idx === 0) {
                return EOF_FOLLOW_KEY;
            }
            return {
                ruleName: _this.shortRuleNameToFullName(ruleName),
                idxInCallingRule: explicitOccurrenceStack[idx],
                inRule: _this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
            };
        });
    };
    Parser.prototype.flattenFollowSet = function () {
        var _this = this;
        var followStack = utils.map(this.buildFullFollowKeyStack(), function (currKey) {
            return _this.getFollowSetFromFollowKey(currKey);
        });
        return utils.flatten(followStack);
    };
    Parser.prototype.getFollowSetFromFollowKey = function (followKey) {
        if (followKey === EOF_FOLLOW_KEY) {
            return [tokens_public.EOF];
        }
        var followName = followKey.ruleName +
            followKey.idxInCallingRule +
            constants.IN +
            followKey.inRule;
        return cache.getResyncFollowsForClass(this.className).get(followName);
    };
    // It does not make any sense to include a virtual EOF token in the list of resynced tokens
    // as EOF does not really exist and thus does not contain any useful information (line/column numbers)
    Parser.prototype.addToResyncTokens = function (token, resyncTokens) {
        if (!this.tokenMatcher(token, tokens_public.EOF)) {
            resyncTokens.push(token);
        }
        return resyncTokens;
    };
    Parser.prototype.reSyncTo = function (tokType) {
        var resyncedTokens = [];
        var nextTok = this.LA(1);
        while (this.tokenMatcher(nextTok, tokType) === false) {
            nextTok = this.SKIP_TOKEN();
            this.addToResyncTokens(nextTok, resyncedTokens);
        }
        // the last token is not part of the error.
        return utils.dropRight(resyncedTokens);
    };
    Parser.prototype.attemptInRepetitionRecovery = function (prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker) {
        var key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence);
        var firstAfterRepInfo = this.firstAfterRepMap.get(key);
        if (firstAfterRepInfo === undefined) {
            var currRuleName = this.getCurrRuleFullName();
            var ruleGrammar = this.getGAstProductions().get(currRuleName);
            var walker = new nextToksWalker(ruleGrammar, prodOccurrence);
            firstAfterRepInfo = walker.startWalking();
            this.firstAfterRepMap.put(key, firstAfterRepInfo);
        }
        var expectTokAfterLastMatch = firstAfterRepInfo.token;
        var nextTokIdx = firstAfterRepInfo.occurrence;
        var isEndOfRule = firstAfterRepInfo.isEndOfRule;
        // special edge case of a TOP most repetition after which the input should END.
        // this will force an attempt for inRule recovery in that scenario.
        if (this.RULE_STACK.length === 1 &&
            isEndOfRule &&
            expectTokAfterLastMatch === undefined) {
            expectTokAfterLastMatch = tokens_public.EOF;
            nextTokIdx = 1;
        }
        if (this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx)) {
            // TODO: performance optimization: instead of passing the original args here, we modify
            // the args param (or create a new one) and make sure the lookahead func is explicitly provided
            // to avoid searching the cache for it once more.
            this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
        }
    };
    Parser.prototype.cstNestedInvocationStateUpdate = function (nestedName, shortName) {
        this.CST_STACK.push({
            name: nestedName,
            fullName: this.shortRuleNameToFull.get(this.getLastExplicitRuleShortName()) + nestedName,
            children: {}
        });
    };
    Parser.prototype.cstInvocationStateUpdate = function (fullRuleName, shortName) {
        this.LAST_EXPLICIT_RULE_STACK.push(this.RULE_STACK.length - 1);
        this.CST_STACK.push({
            name: fullRuleName,
            children: {}
        });
    };
    Parser.prototype.cstFinallyStateUpdate = function () {
        this.LAST_EXPLICIT_RULE_STACK.pop();
        this.CST_STACK.pop();
    };
    Parser.prototype.cstNestedFinallyStateUpdate = function () {
        this.CST_STACK.pop();
    };
    // Implementation of parsing DSL
    Parser.prototype.optionInternal = function (actionORMethodDef, occurrence) {
        var key = this.getKeyForAutomaticLookahead(keys.OPTION_IDX, occurrence);
        var nestedName = this.nestedRuleBeforeClause(actionORMethodDef, key);
        try {
            return this.optionInternalLogic(actionORMethodDef, occurrence, key);
        }
        finally {
            if (nestedName !== undefined) {
                this.nestedRuleFinallyClause(key, nestedName);
            }
        }
    };
    Parser.prototype.optionInternalNoCst = function (actionORMethodDef, occurrence) {
        var key = this.getKeyForAutomaticLookahead(keys.OPTION_IDX, occurrence);
        return this.optionInternalLogic(actionORMethodDef, occurrence, key);
    };
    Parser.prototype.optionInternalLogic = function (actionORMethodDef, occurrence, key) {
        var _this = this;
        var lookAheadFunc = this.getLookaheadFuncForOption(key, occurrence);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== undefined) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            // predicate present
            if (predicate !== undefined) {
                var orgLookaheadFunction_1 = lookAheadFunc;
                lookAheadFunc = function () {
                    return (predicate.call(_this) && orgLookaheadFunction_1.call(_this));
                };
            }
        }
        else {
            action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
            return action.call(this);
        }
        return undefined;
    };
    Parser.prototype.atLeastOneInternal = function (prodOccurrence, actionORMethodDef, result) {
        var laKey = this.getKeyForAutomaticLookahead(keys.AT_LEAST_ONE_IDX, prodOccurrence);
        var nestedName = this.nestedRuleBeforeClause(actionORMethodDef, laKey);
        try {
            return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, result, laKey);
        }
        finally {
            if (nestedName !== undefined) {
                this.nestedRuleFinallyClause(laKey, nestedName);
            }
        }
    };
    Parser.prototype.atLeastOneInternalNoCst = function (prodOccurrence, actionORMethodDef, result) {
        var key = this.getKeyForAutomaticLookahead(keys.AT_LEAST_ONE_IDX, prodOccurrence);
        return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, result, key);
    };
    Parser.prototype.atLeastOneInternalLogic = function (prodOccurrence, actionORMethodDef, result, key) {
        var _this = this;
        var lookAheadFunc = this.getLookaheadFuncForAtLeastOne(key, prodOccurrence);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== undefined) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            // predicate present
            if (predicate !== undefined) {
                var orgLookaheadFunction_2 = lookAheadFunc;
                lookAheadFunc = function () {
                    return (predicate.call(_this) && orgLookaheadFunction_2.call(_this));
                };
            }
        }
        else {
            action = actionORMethodDef;
        }
        if (lookAheadFunc.call(this) === true) {
            result.push(action.call(this));
            while (lookAheadFunc.call(this) === true) {
                result.push(action.call(this));
            }
        }
        else {
            throw this.raiseEarlyExitException(prodOccurrence, lookahead.PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
        }
        // note that while it may seem that this can cause an error because by using a recursive call to
        // AT_LEAST_ONE we change the grammar to AT_LEAST_TWO, AT_LEAST_THREE ... , the possible recursive call
        // from the tryInRepetitionRecovery(...) will only happen IFF there really are TWO/THREE/.... items.
        // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
        this.attemptInRepetitionRecovery(this.atLeastOneInternal, [prodOccurrence, actionORMethodDef, result], lookAheadFunc, keys.AT_LEAST_ONE_IDX, prodOccurrence, interpreter.NextTerminalAfterAtLeastOneWalker);
        return result;
    };
    Parser.prototype.atLeastOneSepFirstInternal = function (prodOccurrence, options, result) {
        var laKey = this.getKeyForAutomaticLookahead(keys.AT_LEAST_ONE_SEP_IDX, prodOccurrence);
        var nestedName = this.nestedRuleBeforeClause(options, laKey);
        try {
            return this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, result, laKey);
        }
        finally {
            if (nestedName !== undefined) {
                this.nestedRuleFinallyClause(laKey, nestedName);
            }
        }
    };
    Parser.prototype.atLeastOneSepFirstInternalNoCst = function (prodOccurrence, options, result) {
        var laKey = this.getKeyForAutomaticLookahead(keys.AT_LEAST_ONE_SEP_IDX, prodOccurrence);
        return this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, result, laKey);
    };
    Parser.prototype.atLeastOneSepFirstInternalLogic = function (prodOccurrence, options, result, key) {
        var _this = this;
        var action = options.DEF;
        var separator = options.SEP;
        var firstIterationLookaheadFunc = this.getLookaheadFuncForAtLeastOneSep(key, prodOccurrence);
        var values = result.values;
        var separators = result.separators;
        // 1st iteration
        if (firstIterationLookaheadFunc.call(this) === true) {
            values.push(action.call(this));
            var separatorLookAheadFunc = function () {
                return _this.tokenMatcher(_this.LA(1), separator);
            };
            // 2nd..nth iterations
            while (this.tokenMatcher(this.LA(1), separator) === true) {
                // note that this CONSUME will never enter recovery because
                // the separatorLookAheadFunc checks that the separator really does exist.
                separators.push(this.CONSUME(separator));
                values.push(action.call(this));
            }
            // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
                prodOccurrence,
                separator,
                separatorLookAheadFunc,
                action,
                interpreter.NextTerminalAfterAtLeastOneSepWalker,
                result
            ], separatorLookAheadFunc, keys.AT_LEAST_ONE_SEP_IDX, prodOccurrence, interpreter.NextTerminalAfterAtLeastOneSepWalker);
        }
        else {
            throw this.raiseEarlyExitException(prodOccurrence, lookahead.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
        }
        return result;
    };
    Parser.prototype.manyInternal = function (prodOccurrence, actionORMethodDef, result) {
        var laKey = this.getKeyForAutomaticLookahead(keys.MANY_IDX, prodOccurrence);
        var nestedName = this.nestedRuleBeforeClause(actionORMethodDef, laKey);
        try {
            return this.manyInternalLogic(prodOccurrence, actionORMethodDef, result, laKey);
        }
        finally {
            if (nestedName !== undefined) {
                this.nestedRuleFinallyClause(laKey, nestedName);
            }
        }
    };
    Parser.prototype.manyInternalNoCst = function (prodOccurrence, actionORMethodDef, result) {
        var laKey = this.getKeyForAutomaticLookahead(keys.MANY_IDX, prodOccurrence);
        return this.manyInternalLogic(prodOccurrence, actionORMethodDef, result, laKey);
    };
    Parser.prototype.manyInternalLogic = function (prodOccurrence, actionORMethodDef, result, key) {
        var _this = this;
        var lookaheadFunction = this.getLookaheadFuncForMany(key, prodOccurrence);
        var action;
        var predicate;
        if (actionORMethodDef.DEF !== undefined) {
            action = actionORMethodDef.DEF;
            predicate = actionORMethodDef.GATE;
            // predicate present
            if (predicate !== undefined) {
                var orgLookaheadFunction_3 = lookaheadFunction;
                lookaheadFunction = function () {
                    return (predicate.call(_this) && orgLookaheadFunction_3.call(_this));
                };
            }
        }
        else {
            action = actionORMethodDef;
        }
        while (lookaheadFunction.call(this)) {
            result.push(action.call(this));
        }
        // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
        this.attemptInRepetitionRecovery(this.manyInternal, [prodOccurrence, actionORMethodDef, result], lookaheadFunction, keys.MANY_IDX, prodOccurrence, interpreter.NextTerminalAfterManyWalker);
        return result;
    };
    Parser.prototype.manySepFirstInternal = function (prodOccurrence, options, result) {
        var laKey = this.getKeyForAutomaticLookahead(keys.MANY_SEP_IDX, prodOccurrence);
        var nestedName = this.nestedRuleBeforeClause(options, laKey);
        try {
            return this.manySepFirstInternalLogic(prodOccurrence, options, result, laKey);
        }
        finally {
            if (nestedName !== undefined) {
                this.nestedRuleFinallyClause(laKey, nestedName);
            }
        }
    };
    Parser.prototype.manySepFirstInternalNoCst = function (prodOccurrence, options, result) {
        var laKey = this.getKeyForAutomaticLookahead(keys.MANY_SEP_IDX, prodOccurrence);
        return this.manySepFirstInternalLogic(prodOccurrence, options, result, laKey);
    };
    Parser.prototype.manySepFirstInternalLogic = function (prodOccurrence, options, result, key) {
        var _this = this;
        var action = options.DEF;
        var separator = options.SEP;
        var firstIterationLaFunc = this.getLookaheadFuncForManySep(key, prodOccurrence);
        var values = result.values;
        var separators = result.separators;
        // 1st iteration
        if (firstIterationLaFunc.call(this) === true) {
            values.push(action.call(this));
            var separatorLookAheadFunc = function () {
                return _this.tokenMatcher(_this.LA(1), separator);
            };
            // 2nd..nth iterations
            while (this.tokenMatcher(this.LA(1), separator) === true) {
                // note that this CONSUME will never enter recovery because
                // the separatorLookAheadFunc checks that the separator really does exist.
                separators.push(this.CONSUME(separator));
                values.push(action.call(this));
            }
            // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
                prodOccurrence,
                separator,
                separatorLookAheadFunc,
                action,
                interpreter.NextTerminalAfterManySepWalker,
                result
            ], separatorLookAheadFunc, keys.MANY_SEP_IDX, prodOccurrence, interpreter.NextTerminalAfterManySepWalker);
        }
        return result;
    };
    Parser.prototype.repetitionSepSecondInternal = function (prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker, result) {
        while (separatorLookAheadFunc()) {
            // note that this CONSUME will never enter recovery because
            // the separatorLookAheadFunc checks that the separator really does exist.
            result.separators.push(this.CONSUME(separator));
            result.values.push(action.call(this));
        }
        // we can only arrive to this function after an error
        // has occurred (hence the name 'second') so the following
        // IF will always be entered, its possible to remove it...
        // however it is kept to avoid confusion and be consistent.
        // Performance optimization: "attemptInRepetitionRecovery" will be defined as NOOP unless recovery is enabled
        /* istanbul ignore else */
        this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [
            prodOccurrence,
            separator,
            separatorLookAheadFunc,
            action,
            nextTerminalAfterWalker,
            result
        ], separatorLookAheadFunc, keys.AT_LEAST_ONE_SEP_IDX, prodOccurrence, nextTerminalAfterWalker);
    };
    Parser.prototype.orInternalNoCst = function (altsOrOpts, occurrence) {
        var alts = utils.isArray(altsOrOpts)
            ? altsOrOpts
            : altsOrOpts.DEF;
        var laFunc = this.getLookaheadFuncForOr(occurrence, alts);
        var altIdxToTake = laFunc.call(this, alts);
        if (altIdxToTake !== undefined) {
            var chosenAlternative = alts[altIdxToTake];
            return chosenAlternative.ALT.call(this);
        }
        this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
    };
    Parser.prototype.orInternal = function (altsOrOpts, occurrence) {
        var laKey = this.getKeyForAutomaticLookahead(keys.OR_IDX, occurrence);
        var nestedName = this.nestedRuleBeforeClause(altsOrOpts, laKey);
        try {
            var alts = utils.isArray(altsOrOpts)
                ? altsOrOpts
                : altsOrOpts.DEF;
            var laFunc = this.getLookaheadFuncForOr(occurrence, alts);
            var altIdxToTake = laFunc.call(this, alts);
            if (altIdxToTake !== undefined) {
                var chosenAlternative = alts[altIdxToTake];
                var nestedAltBeforeClauseResult = this.nestedAltBeforeClause(chosenAlternative, occurrence, keys.OR_IDX, altIdxToTake);
                try {
                    return chosenAlternative.ALT.call(this);
                }
                finally {
                    if (nestedAltBeforeClauseResult !== undefined) {
                        this.nestedRuleFinallyClause(nestedAltBeforeClauseResult.shortName, nestedAltBeforeClauseResult.nestedName);
                    }
                }
            }
            this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
        }
        finally {
            if (nestedName !== undefined) {
                this.nestedRuleFinallyClause(laKey, nestedName);
            }
        }
    };
    // this actually returns a number, but it is always used as a string (object prop key)
    Parser.prototype.getKeyForAutomaticLookahead = function (dslMethodIdx, occurrence) {
        var currRuleShortName = this.getLastExplicitRuleShortName();
        /* tslint:disable */
        return keys.getKeyForAutomaticLookahead(currRuleShortName, dslMethodIdx, occurrence);
        /* tslint:enable */
    };
    Parser.prototype.getLookaheadFuncForOr = function (occurrence, alts) {
        var key = this.getKeyForAutomaticLookahead(keys.OR_IDX, occurrence);
        var laFunc = this.classLAFuncs.get(key);
        if (laFunc === undefined) {
            var ruleName = this.getCurrRuleFullName();
            var ruleGrammar = this.getGAstProductions().get(ruleName);
            // note that hasPredicates is only computed once.
            var hasPredicates = utils.some(alts, function (currAlt) {
                return utils.isFunction(currAlt.GATE);
            });
            laFunc = lookahead.buildLookaheadFuncForOr(occurrence, ruleGrammar, this.maxLookahead, hasPredicates, this.dynamicTokensEnabled, this.lookAheadBuilderForAlternatives);
            this.classLAFuncs.put(key, laFunc);
            return laFunc;
        }
        else {
            return laFunc;
        }
    };
    // Automatic lookahead calculation
    Parser.prototype.getLookaheadFuncForOption = function (key, occurrence) {
        return this.getLookaheadFuncFor(key, occurrence, this.maxLookahead, lookahead.PROD_TYPE.OPTION);
    };
    Parser.prototype.getLookaheadFuncForMany = function (key, occurrence) {
        return this.getLookaheadFuncFor(key, occurrence, this.maxLookahead, lookahead.PROD_TYPE.REPETITION);
    };
    Parser.prototype.getLookaheadFuncForManySep = function (key, occurrence) {
        return this.getLookaheadFuncFor(key, occurrence, this.maxLookahead, lookahead.PROD_TYPE.REPETITION_WITH_SEPARATOR);
    };
    Parser.prototype.getLookaheadFuncForAtLeastOne = function (key, occurrence) {
        return this.getLookaheadFuncFor(key, occurrence, this.maxLookahead, lookahead.PROD_TYPE.REPETITION_MANDATORY);
    };
    Parser.prototype.getLookaheadFuncForAtLeastOneSep = function (key, occurrence) {
        return this.getLookaheadFuncFor(key, occurrence, this.maxLookahead, lookahead.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
    };
    // TODO: consider caching the error message computed information
    Parser.prototype.raiseNoAltException = function (occurrence, errMsgTypes) {
        var ruleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions().get(ruleName);
        // TODO: getLookaheadPathsForOr can be slow for large enough maxLookahead and certain grammars, consider caching ?
        var lookAheadPathsPerAlternative = lookahead.getLookaheadPathsForOr(occurrence, ruleGrammar, this.maxLookahead);
        var actualTokens = [];
        for (var i = 1; i < this.maxLookahead; i++) {
            actualTokens.push(this.LA(i));
        }
        var errMsg = this.errorMessageProvider.buildNoViableAltMessage({
            expectedPathsPerAlt: lookAheadPathsPerAlternative,
            actual: actualTokens,
            customUserDescription: errMsgTypes,
            ruleName: this.getCurrRuleFullName()
        });
        throw this.SAVE_ERROR(new exceptions_public.NoViableAltException(errMsg, this.LA(1)));
    };
    Parser.prototype.getLookaheadFuncFor = function (key, occurrence, maxLookahead, prodType) {
        var laFunc = this.classLAFuncs.get(key);
        if (laFunc === undefined) {
            var ruleName = this.getCurrRuleFullName();
            var ruleGrammar = this.getGAstProductions().get(ruleName);
            laFunc = lookahead.buildLookaheadFuncForOptionalProd(occurrence, ruleGrammar, maxLookahead, this.dynamicTokensEnabled, prodType, this.lookAheadBuilderForOptional);
            this.classLAFuncs.put(key, laFunc);
            return laFunc;
        }
        else {
            return laFunc;
        }
    };
    // TODO: consider caching the error message computed information
    Parser.prototype.raiseEarlyExitException = function (occurrence, prodType, userDefinedErrMsg) {
        var ruleName = this.getCurrRuleFullName();
        var ruleGrammar = this.getGAstProductions().get(ruleName);
        var lookAheadPathsPerAlternative = lookahead.getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, this.maxLookahead);
        var insideProdPaths = lookAheadPathsPerAlternative[0];
        var actualTokens = [];
        for (var i = 1; i < this.maxLookahead; i++) {
            actualTokens.push(this.LA(i));
        }
        var msg = this.errorMessageProvider.buildEarlyExitMessage({
            expectedIterationPaths: insideProdPaths,
            actual: actualTokens,
            previous: this.LA(0),
            customUserDescription: userDefinedErrMsg,
            ruleName: ruleName
        });
        throw this.SAVE_ERROR(new exceptions_public.EarlyExitException(msg, this.LA(1), this.LA(0)));
    };
    Parser.prototype.getLastExplicitRuleShortName = function () {
        var lastExplictIndex = this.LAST_EXPLICIT_RULE_STACK[this.LAST_EXPLICIT_RULE_STACK.length - 1];
        return this.RULE_STACK[lastExplictIndex];
    };
    Parser.prototype.getLastExplicitRuleShortNameNoCst = function () {
        var ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 1];
    };
    Parser.prototype.getPreviousExplicitRuleShortName = function () {
        var lastExplicitIndex = this.LAST_EXPLICIT_RULE_STACK[this.LAST_EXPLICIT_RULE_STACK.length - 2];
        return this.RULE_STACK[lastExplicitIndex];
    };
    Parser.prototype.getPreviousExplicitRuleShortNameNoCst = function () {
        var ruleStack = this.RULE_STACK;
        return ruleStack[ruleStack.length - 2];
    };
    Parser.prototype.getLastExplicitRuleOccurrenceIndex = function () {
        var lastExplicitIndex = this.LAST_EXPLICIT_RULE_STACK[this.LAST_EXPLICIT_RULE_STACK.length - 1];
        return this.RULE_OCCURRENCE_STACK[lastExplicitIndex];
    };
    Parser.prototype.getLastExplicitRuleOccurrenceIndexNoCst = function () {
        var occurrenceStack = this.RULE_OCCURRENCE_STACK;
        return occurrenceStack[occurrenceStack.length - 1];
    };
    Parser.prototype.nestedRuleBeforeClause = function (methodOpts, laKey) {
        var nestedName;
        if (methodOpts.NAME !== undefined) {
            nestedName = methodOpts.NAME;
            this.nestedRuleInvocationStateUpdate(nestedName, laKey);
            return nestedName;
        }
        else {
            return undefined;
        }
    };
    Parser.prototype.nestedAltBeforeClause = function (methodOpts, occurrence, methodKeyIdx, altIdx) {
        var ruleIdx = this.getLastExplicitRuleShortName();
        var shortName = keys.getKeyForAltIndex(ruleIdx, methodKeyIdx, occurrence, altIdx);
        var nestedName;
        if (methodOpts.NAME !== undefined) {
            nestedName = methodOpts.NAME;
            this.nestedRuleInvocationStateUpdate(nestedName, shortName);
            return {
                shortName: shortName,
                nestedName: nestedName
            };
        }
        else {
            return undefined;
        }
    };
    Parser.prototype.nestedRuleFinallyClause = function (laKey, nestedName) {
        var cstStack = this.CST_STACK;
        var nestedRuleCst = cstStack[cstStack.length - 1];
        this.nestedRuleFinallyStateUpdate();
        // this return a different result than the previous invocation because "nestedRuleFinallyStateUpdate" pops the cst stack
        var parentCstNode = cstStack[cstStack.length - 1];
        cst.addNoneTerminalToCst(parentCstNode, nestedName, nestedRuleCst);
    };
    Parser.prototype.cstPostTerminal = function (key, consumedToken) {
        // TODO: would save the "current rootCST be faster than locating it for each terminal?
        var rootCst = this.CST_STACK[this.CST_STACK.length - 1];
        cst.addTerminalToCst(rootCst, consumedToken, key);
    };
    Parser.prototype.cstPostNonTerminal = function (ruleCstResult, ruleName) {
        cst.addNoneTerminalToCst(this.CST_STACK[this.CST_STACK.length - 1], ruleName, ruleCstResult);
    };
    Parser.prototype.cstPostNonTerminalRecovery = function (ruleCstResult, ruleName) {
        // TODO: assumes not first rule, is this assumption always correct?
        cst.addNoneTerminalToCst(this.CST_STACK[this.CST_STACK.length - 2], ruleName, ruleCstResult);
    };
    Object.defineProperty(Parser.prototype, "input", {
        get: function () {
            return this.tokVector;
        },
        // lexer related methods
        set: function (newInput) {
            this.reset();
            this.tokVector = newInput;
            this.tokVectorLength = newInput.length;
        },
        enumerable: true,
        configurable: true
    });
    // skips a token and returns the next token
    Parser.prototype.SKIP_TOKEN = function () {
        if (this.currIdx <= this.tokVector.length - 2) {
            this.consumeToken();
            return this.LA(1);
        }
        else {
            return exports.END_OF_FILE;
        }
    };
    // Lexer (accessing Token vector) related methods which can be overridden to implement lazy lexers
    // or lexers dependent on parser context.
    Parser.prototype.LA = function (howMuch) {
        // TODO: is this optimization (saving tokVectorLength benefits?)
        if (this.currIdx + howMuch < 0 ||
            this.tokVectorLength <= this.currIdx + howMuch) {
            return exports.END_OF_FILE;
        }
        else {
            return this.tokVector[this.currIdx + howMuch];
        }
    };
    Parser.prototype.consumeToken = function () {
        this.currIdx++;
    };
    Parser.prototype.exportLexerState = function () {
        return this.currIdx;
    };
    Parser.prototype.importLexerState = function (newState) {
        this.currIdx = newState;
    };
    Parser.prototype.resetLexerState = function () {
        this.currIdx = -1;
    };
    Parser.prototype.moveToTerminatedState = function () {
        this.currIdx = this.tokVector.length - 1;
    };
    Parser.prototype.lookAheadBuilderForOptional = function (alt, tokenMatcher, dynamicTokensEnabled) {
        return lookahead.buildSingleAlternativeLookaheadFunction(alt, tokenMatcher, dynamicTokensEnabled);
    };
    Parser.prototype.lookAheadBuilderForAlternatives = function (alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
        return lookahead.buildAlternativesLookAheadFunc(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled);
    };
    Parser.NO_RESYNC = false;
    // Set this flag to true if you don't want the Parser to throw error when problems in it's definition are detected.
    // (normally during the parser's constructor).
    // This is a design time flag, it will not affect the runtime error handling of the parser, just design time errors,
    // for example: duplicate rule names, referencing an unresolved subrule, ect...
    // This flag should not be enabled during normal usage, it is used in special situations, for example when
    // needing to display the parser definition errors in some GUI(online playground).
    Parser.DEFER_DEFINITION_ERRORS_HANDLING = false;
    return Parser;
}());
exports.Parser = Parser;
function InRuleRecoveryException(message) {
    this.name = IN_RULE_RECOVERY_EXCEPTION;
    this.message = message;
}
InRuleRecoveryException.prototype = Error.prototype;

});

unwrapExports(parser_public);
var parser_public_1 = parser_public.ParserDefinitionErrorType;
var parser_public_2 = parser_public.END_OF_FILE;
var parser_public_3 = parser_public.EMPTY_ALT;
var parser_public_4 = parser_public.Parser;

var cache_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Clears the chevrotain internal cache.
 * This should not be used in regular work flows, This is intended for
 * unique use cases for example: online playground where the a parser with the same name is initialized with
 * different implementations multiple times.
 */
function clearCache() {
    cache.clearCache();
}
exports.clearCache = clearCache;

});

unwrapExports(cache_public);
var cache_public_1 = cache_public.clearCache;

var render_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

function createSyntaxDiagramsCode(grammar, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.resourceBase, resourceBase = _c === void 0 ? "https://unpkg.com/chevrotain@" + version.VERSION + "/diagrams/" : _c, _d = _b.css, css = _d === void 0 ? "https://unpkg.com/chevrotain@" + version.VERSION + "/diagrams/diagrams.css" : _d;
    var header = "\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset=\"utf-8\">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n";
    var cssHtml = "\n<link rel='stylesheet' href='" + css + "'>\n";
    var scripts = "\n<script src='" + resourceBase + "vendor/railroad-diagrams.js'></script>\n<script src='" + resourceBase + "src/diagrams_builder.js'></script>\n<script src='" + resourceBase + "src/diagrams_behavior.js'></script>\n<script src='" + resourceBase + "src/main.js'></script>\n";
    var diagramsDiv = "\n<div id=\"diagrams\" align=\"center\"></div>    \n";
    var serializedGrammar = "\n<script>\n    window.serializedGrammar = " + JSON.stringify(grammar, null, "  ") + ";\n</script>\n";
    var initLogic = "\n<script>\n    var diagramsDiv = document.getElementById(\"diagrams\");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n</script>\n";
    return (header + cssHtml + scripts + diagramsDiv + serializedGrammar + initLogic);
}
exports.createSyntaxDiagramsCode = createSyntaxDiagramsCode;

});

unwrapExports(render_public);
var render_public_1 = render_public.createSyntaxDiagramsCode;

var generate = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



/**
 * Missing features
 * 1. Rule arguments
 * 2. Gates
 * 3. embedded actions
 */
var NL = "\n";
function genUmdModule(options) {
    return "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" + genClass(options) + "\n    \nreturn {\n    " + options.name + ": " + options.name + " \n}\n}));\n";
}
exports.genUmdModule = genUmdModule;
function genWrapperFunction(options) {
    return "    \n" + genClass(options) + "\nreturn new " + options.name + "(tokenVocabulary, config)    \n";
}
exports.genWrapperFunction = genWrapperFunction;
function genClass(options) {
    // TODO: how to pass the token vocabulary? Constructor? other?
    // TODO: should outputCst be enabled by default?
    var result = "\nfunction " + options.name + "(tokenVocabulary, config) {\n    // invoke super constructor\n    chevrotain.Parser.call(this, [], tokenVocabulary, config)\n\n    const $ = this\n\n    " + genAllRules(options.rules) + "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    chevrotain.Parser.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n" + options.name + ".prototype = Object.create(chevrotain.Parser.prototype)\n" + options.name + ".prototype.constructor = " + options.name + "    \n    ";
    return result;
}
exports.genClass = genClass;
function genAllRules(rules) {
    var rulesText = utils.map(rules, function (currRule) {
        return genRule(currRule, 1);
    });
    return rulesText.join("\n");
}
exports.genAllRules = genAllRules;
function genRule(prod, n) {
    var result = indent(n, "$.RULE(\"" + prod.name + "\", function() {") + NL;
    result += genDefinition(prod.definition, n + 1);
    result += indent(n + 1, "})") + NL;
    return result;
}
exports.genRule = genRule;
function genTerminal(prod, n) {
    var name = tokens_public.tokenName(prod.terminalType);
    // TODO: potential performance optimization, avoid tokenMap Dictionary access
    return indent(n, "$.CONSUME" + prod.idx + "(this.tokensMap." + name + ")" + NL);
}
exports.genTerminal = genTerminal;
function genNonTerminal(prod, n) {
    return indent(n, "$.SUBRULE" + prod.idx + "($." + prod.nonTerminalName + ")" + NL);
}
exports.genNonTerminal = genNonTerminal;
function genAlternation(prod, n) {
    var result = indent(n, "$.OR" + prod.idx + "([") + NL;
    var alts = utils.map(prod.definition, function (altDef) { return genSingleAlt(altDef, n + 1); });
    result += alts.join("," + NL);
    result += NL + indent(n, "])" + NL);
    return result;
}
exports.genAlternation = genAlternation;
function genSingleAlt(prod, n) {
    var result = indent(n, "{") + NL;
    if (prod.name) {
        result += indent(n + 1, "NAME: \"" + prod.name + "\",") + NL;
    }
    result += indent(n + 1, "ALT: function() {") + NL;
    result += genDefinition(prod.definition, n + 1);
    result += indent(n + 1, "}") + NL;
    result += indent(n, "}");
    return result;
}
exports.genSingleAlt = genSingleAlt;
function genProd(prod, n) {
    if (prod instanceof gast_public.NonTerminal) {
        return genNonTerminal(prod, n);
    }
    else if (prod instanceof gast_public.Option) {
        return genDSLRule("OPTION", prod, n);
    }
    else if (prod instanceof gast_public.RepetitionMandatory) {
        return genDSLRule("AT_LEAST_ONE", prod, n);
    }
    else if (prod instanceof gast_public.RepetitionMandatoryWithSeparator) {
        return genDSLRule("AT_LEAST_ONE_SEP", prod, n);
    }
    else if (prod instanceof gast_public.RepetitionWithSeparator) {
        return genDSLRule("MANY_SEP", prod, n);
    }
    else if (prod instanceof gast_public.Repetition) {
        return genDSLRule("MANY", prod, n);
    }
    else if (prod instanceof gast_public.Alternation) {
        return genAlternation(prod, n);
    }
    else if (prod instanceof gast_public.Terminal) {
        return genTerminal(prod, n);
    }
    else if (prod instanceof gast_public.Flat) {
        return genDefinition(prod.definition, n);
    }
    else {
        /* istanbul ignore next */
        throw Error("non exhaustive match");
    }
}
function genDSLRule(dslName, prod, n) {
    var result = indent(n, "$." + (dslName + prod.idx) + "(");
    if (prod.name || prod.separator) {
        result += "{" + NL;
        if (prod.name) {
            result += indent(n + 1, "NAME: \"" + prod.name + "\"") + "," + NL;
        }
        if (prod.separator) {
            result +=
                indent(n + 1, "SEP: this.tokensMap." + tokens_public.tokenName(prod.separator)) +
                    "," +
                    NL;
        }
        result += "DEF: " + genDefFunction(prod.definition, n + 2) + NL;
        result += indent(n, "}") + NL;
    }
    else {
        result += genDefFunction(prod.definition, n + 1);
    }
    result += indent(n, ")") + NL;
    return result;
}
function genDefFunction(definition, n) {
    var def = "function() {" + NL;
    def += genDefinition(definition, n);
    def += indent(n, "}") + NL;
    return def;
}
function genDefinition(def, n) {
    var result = "";
    utils.forEach(def, function (prod) {
        result += genProd(prod, n + 1);
    });
    return result;
}
function indent(howMuch, text) {
    var spaces = Array(howMuch * 4 + 1).join(" ");
    return spaces + text;
}

});

unwrapExports(generate);
var generate_1 = generate.genUmdModule;
var generate_2 = generate.genWrapperFunction;
var generate_3 = generate.genClass;
var generate_4 = generate.genAllRules;
var generate_5 = generate.genRule;
var generate_6 = generate.genTerminal;
var generate_7 = generate.genNonTerminal;
var generate_8 = generate.genAlternation;
var generate_9 = generate.genSingleAlt;

var generate_public = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

/**
 * Will Create a factory function that once invoked with a IParserConfig will return
 * a Parser Object.
 *
 * - Note that this happens using the Function constructor (a type of "eval") so it will not work in environments
 *   where content security policy is enabled, such as certain websites, Chrome extensions ect...
 *
 *   This means this function is best used for development flows to reduce the feedback loops
 *   or for productive flows targeting node.js only.
 *
 *   For productive flows targeting a browser runtime see @link {generation.generateParserModule}
 */
function generateParserFactory(options) {
    var wrapperText = generate.genWrapperFunction({
        name: options.name,
        rules: options.rules
    });
    var constructorWrapper = new Function("tokenVocabulary", "config", "chevrotain", wrapperText);
    return function (config) {
        return constructorWrapper(options.tokenVocabulary, config, 
        // TODO: check how the require is transpiled/webpacked
        api);
    };
}
exports.generateParserFactory = generateParserFactory;
/**
 * This would generate the string literal for a UMD module (@link {https://github.com/umdjs/umd})
 * That exports a Parser Constructor.
 *
 * Note that the constructor exposed by the generated module must receive the TokenVocabulary as the first
 * argument, the IParser config can be passed as the second argument.
 */
function generateParserModule(options) {
    return generate.genUmdModule({ name: options.name, rules: options.rules });
}
exports.generateParserModule = generateParserModule;

});

unwrapExports(generate_public);
var generate_public_1 = generate_public.generateParserFactory;
var generate_public_2 = generate_public.generateParserModule;

var api = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });












/**
 * defines the public API of
 * changes here may require major version change. (semVer)
 */
var API = {};
// semantic version
API.VERSION = version.VERSION;
// runtime API
API.Parser = parser_public.Parser;
API.ParserDefinitionErrorType = parser_public.ParserDefinitionErrorType;
API.Lexer = lexer_public.Lexer;
API.LexerDefinitionErrorType = lexer_public.LexerDefinitionErrorType;
API.EOF = tokens_public.EOF;
// Tokens utilities
API.tokenName = tokens_public.tokenName;
API.tokenLabel = tokens_public.tokenLabel;
API.tokenMatcher = tokens_public.tokenMatcher;
API.createToken = tokens_public.createToken;
API.createTokenInstance = tokens_public.createTokenInstance;
// Other Utilities
API.EMPTY_ALT = parser_public.EMPTY_ALT;
// TODO: Breaking Change -> renamed property
API.defaultParserErrorProvider = errors_public.defaultParserErrorProvider;
API.isRecognitionException = exceptions_public.isRecognitionException;
API.EarlyExitException = exceptions_public.EarlyExitException;
API.MismatchedTokenException = exceptions_public.MismatchedTokenException;
API.NotAllInputParsedException = exceptions_public.NotAllInputParsedException;
API.NoViableAltException = exceptions_public.NoViableAltException;
// grammar reflection API
API.gast = {};
API.Flat = gast_public.Flat;
API.Repetition = gast_public.Repetition;
API.RepetitionWithSeparator = gast_public.RepetitionWithSeparator;
API.RepetitionMandatory = gast_public.RepetitionMandatory;
API.RepetitionMandatoryWithSeparator = gast_public.RepetitionMandatoryWithSeparator;
API.Option = gast_public.Option;
API.Alternation = gast_public.Alternation;
API.NonTerminal = gast_public.NonTerminal;
API.Terminal = gast_public.Terminal;
API.Rule = gast_public.Rule;
// GAST Utilities
API.GAstVisitor = gast_visitor_public.GAstVisitor;
API.serializeGrammar = gast_public.serializeGrammar;
API.serializeProduction = gast_public.serializeProduction;
API.resolveGrammar = gast_resolver_public.resolveGrammar;
API.defaultGrammarResolverErrorProvider = errors_public.defaultGrammarResolverErrorProvider;
API.validateGrammar = gast_resolver_public.validateGrammar;
API.defaultGrammarValidatorErrorProvider = errors_public.defaultGrammarValidatorErrorProvider;
API.assignOccurrenceIndices = gast_resolver_public.assignOccurrenceIndices;
API.clearCache = cache_public.clearCache;
API.createSyntaxDiagramsCode = render_public.createSyntaxDiagramsCode;
API.generateParserFactory = generate_public.generateParserFactory;
API.generateParserModule = generate_public.generateParserModule;
module.exports = API;

});

unwrapExports(api);
var api_1 = api.Parser;
var api_2 = api.Lexer;
var api_3 = api.createToken;

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
var STRING_LITERAL_LONG1_TOKEN = api_3({
    name: 'STRING_LITERAL_LONG1',
    pattern: STRING_LITERAL_LONG1,
});
var STRING_LITERAL_LONG2_TOKEN = api_3({
    name: 'STRING_LITERAL_LONG2',
    pattern: STRING_LITERAL_LONG2,
});
var PNAME_LN_TOKEN = api_3({
    name: 'PNAME_LN',
    pattern: PNAME_LN,
});
var terminals = {
    IRIREF: api_3({
        name: 'IRIREF',
        pattern: IRIREF,
        label: '<http://example.com>',
    }),
    LANGTAG: api_3({
        name: 'LANGTAG',
        pattern: LANGTAG,
    }),
    INTEGER: api_3({
        name: 'INTEGER',
        pattern: INTEGER,
    }),
    DECIMAL: api_3({
        name: 'DECIMAL',
        pattern: DECIMAL,
    }),
    DOUBLE: api_3({
        name: 'DOUBLE',
        pattern: DOUBLE,
    }),
    INTEGER_POSITIVE: api_3({
        name: 'INTEGER_POSITIVE',
        pattern: INTEGER_POSITIVE,
    }),
    DECIMAL_POSITIVE: api_3({
        name: 'DECIMAL_POSITIVE',
        pattern: DECIMAL_POSITIVE,
    }),
    DOUBLE_POSITIVE: api_3({
        name: 'DOUBLE_POSITIVE',
        pattern: DOUBLE_POSITIVE,
    }),
    INTEGER_NEGATIVE: api_3({
        name: 'INTEGER_NEGATIVE',
        pattern: INTEGER_NEGATIVE,
    }),
    DECIMAL_NEGATIVE: api_3({
        name: 'DECIMAL_NEGATIVE',
        pattern: DECIMAL_NEGATIVE,
    }),
    DOUBLE_NEGATIVE: api_3({
        name: 'DOUBLE_NEGATIVE',
        pattern: DOUBLE_NEGATIVE,
    }),
    STRING_LITERAL_LONG1: STRING_LITERAL_LONG1_TOKEN,
    STRING_LITERAL_LONG2: STRING_LITERAL_LONG2_TOKEN,
    STRING_LITERAL1: api_3({
        name: 'STRING_LITERAL1',
        pattern: STRING_LITERAL1,
        longer_alt: STRING_LITERAL_LONG1_TOKEN,
    }),
    STRING_LITERAL2: api_3({
        name: 'STRING_LITERAL2',
        pattern: STRING_LITERAL2,
        longer_alt: STRING_LITERAL_LONG2_TOKEN,
    }),
    NIL: api_3({
        name: 'NIL',
        pattern: NIL,
        label: '()',
    }),
    ANON: api_3({
        name: 'ANON',
        pattern: ANON,
        label: '[]',
    }),
    PNAME_LN: PNAME_LN_TOKEN,
    PNAME_NS: api_3({
        name: 'PNAME_NS',
        pattern: PNAME_NS,
        longer_alt: PNAME_LN_TOKEN,
    }),
    BLANK_NODE_LABEL: api_3({
        name: 'BLANK_NODE_LABEL',
        pattern: BLANK_NODE_LABEL,
    }),
    VAR1: api_3({
        name: 'VAR1',
        pattern: VAR1,
        label: '?foo',
    }),
    VAR2: api_3({
        name: 'VAR2',
        pattern: VAR2,
        label: '?bar',
    }),
    PERCENT: api_3({
        name: 'PERCENT',
        pattern: PERCENT,
    }),
};

// @ts-ignore: import types for declarations
var MAX_LENGTH = api_3({
    name: 'MAX_LENGTH',
    pattern: /MAX LENGTH/i,
});
var keywords = {
    SELECT: api_3({
        name: 'SELECT',
        pattern: /SELECT/i,
    }),
    CONSTRUCT: api_3({
        name: 'CONSTRUCT',
        pattern: /CONSTRUCT/i,
    }),
    DISTINCT: api_3({
        name: 'DISTINCT',
        pattern: /DISTINCT/i,
    }),
    START: api_3({
        name: 'START',
        pattern: /START/i,
    }),
    END: api_3({
        name: 'END',
        pattern: /END/i,
    }),
    VIA: api_3({
        name: 'VIA',
        pattern: /VIA/i,
    }),
    PATHS: api_3({
        name: 'PATHS',
        pattern: /PATHS/i,
    }),
    PATHS_ALL: api_3({
        name: 'PATHS_ALL',
        pattern: /PATHS ALL/i,
    }),
    PATHS_SHORTEST: api_3({
        name: 'PATHS_SHORTEST',
        pattern: /PATHS SHORTEST/i,
    }),
    CYCLIC: api_3({
        name: 'CYCLIC',
        pattern: /CYCLIC/i,
    }),
    AS: api_3({
        name: 'AS',
        pattern: /AS/i,
    }),
    WHERE: api_3({
        name: 'WHERE',
        pattern: /WHERE/i,
    }),
    A: api_3({
        name: 'A',
        pattern: /a/i,
    }),
    GroupBy: api_3({
        name: 'GroupBy',
        pattern: /group by/i,
    }),
    OrderBy: api_3({
        name: 'OrderBy',
        pattern: /order by/i,
    }),
    By: api_3({
        name: 'By',
        pattern: /By/i,
    }),
    BASE: api_3({
        name: 'BASE',
        pattern: /BASE/i,
    }),
    PREFIX: api_3({
        name: 'PREFIX',
        pattern: /PREFIX/i,
    }),
    DESCRIBE: api_3({
        name: 'DESCRIBE',
        pattern: /DESCRIBE/i,
    }),
    ASK: api_3({
        name: 'ASK',
        pattern: /ASK/i,
    }),
    FROM: api_3({
        name: 'FROM',
        pattern: /FROM/i,
    }),
    REDUCED: api_3({
        name: 'REDUCED',
        pattern: /REDUCED/i,
    }),
    NAMED: api_3({
        name: 'NAMED',
        pattern: /NAMED/i,
    }),
    HAVING: api_3({
        name: 'HAVING',
        pattern: /HAVING/i,
    }),
    ASC: api_3({
        name: 'ASC',
        pattern: /ASC/i,
    }),
    DESC: api_3({
        name: 'DESC',
        pattern: /DESC/i,
    }),
    OFFSET: api_3({
        name: 'OFFSET',
        pattern: /OFFSET/i,
    }),
    LIMIT: api_3({
        name: 'LIMIT',
        pattern: /LIMIT/i,
    }),
    VALUES: api_3({
        name: 'VALUES',
        pattern: /VALUES/i,
    }),
    LOAD: api_3({
        name: 'LOAD',
        pattern: /LOAD/i,
    }),
    SILENT: api_3({
        name: 'SILENT',
        pattern: /SILENT/i,
    }),
    INTO: api_3({
        name: 'INTO',
        pattern: /INTO/i,
    }),
    CLEAR: api_3({
        name: 'CLEAR',
        pattern: /CLEAR/i,
    }),
    DROP: api_3({
        name: 'DROP',
        pattern: /DROP/i,
    }),
    CREATE: api_3({
        name: 'CREATE',
        pattern: /CREATE/i,
    }),
    ADD: api_3({
        name: 'ADD',
        pattern: /ADD/i,
    }),
    TO: api_3({
        name: 'TO',
        pattern: /TO/i,
    }),
    MOVE: api_3({
        name: 'MOVE',
        pattern: /MOVE/i,
    }),
    COPY: api_3({
        name: 'COPY',
        pattern: /COPY/i,
    }),
    INSERT_DATA: api_3({
        name: 'INSERT_DATA',
        pattern: /Insert +Data/i,
    }),
    DELETE_DATA: api_3({
        name: 'DELETE_DATA',
        pattern: /Delete +Data/i,
    }),
    DELETE_WHERE: api_3({
        name: 'DELETE_WHERE',
        pattern: /Delete +Where/i,
    }),
    WITH: api_3({
        name: 'WITH',
        pattern: /WITH/i,
    }),
    DELETE: api_3({
        name: 'DELETE',
        pattern: /DELETE/i,
    }),
    INSERT: api_3({
        name: 'INSERT',
        pattern: /INSERT/i,
    }),
    USING: api_3({
        name: 'USING',
        pattern: /USING/i,
    }),
    DEFAULT: api_3({
        name: 'DEFAULT',
        pattern: /DEFAULT/i,
    }),
    GRAPH: api_3({
        name: 'GRAPH',
        pattern: /GRAPH/i,
    }),
    ALL: api_3({
        name: 'ALL',
        pattern: /ALL/i,
    }),
    OPTIONAL: api_3({
        name: 'OPTIONAL',
        pattern: /OPTIONAL/i,
    }),
    SERVICE: api_3({
        name: 'SERVICE',
        pattern: /SERVICE/i,
    }),
    BIND: api_3({
        name: 'BIND',
        pattern: /BIND/i,
    }),
    UNDEF: api_3({
        name: 'UNDEF',
        pattern: /UNDEF/i,
    }),
    MINUS: api_3({
        name: 'MINUS',
        pattern: /MINUS/i,
    }),
    UNION: api_3({
        name: 'UNION',
        pattern: /UNION/i,
    }),
    FILTER: api_3({
        name: 'FILTER',
        pattern: /FILTER/i,
    }),
    STR: api_3({
        name: 'STR',
        pattern: /STR/i,
    }),
    LANG: api_3({
        name: 'LANG',
        pattern: /LANG/i,
    }),
    LANGMATCHERS: api_3({
        name: 'LANGMATCHERS',
        pattern: /LANGMATCHERS/i,
    }),
    DATATYPE: api_3({
        name: 'DATATYPE',
        pattern: /DATATYPE/i,
    }),
    BOUND: api_3({
        name: 'BOUND',
        pattern: /BOUND/i,
    }),
    IRI: api_3({
        name: 'IRI',
        pattern: /IRI/i,
    }),
    URI: api_3({
        name: 'URI',
        pattern: /URI/i,
    }),
    BNODE: api_3({
        name: 'BNODE',
        pattern: /BNODE/i,
    }),
    RAND: api_3({
        name: 'RAND',
        pattern: /RAND/i,
    }),
    ABS: api_3({
        name: 'ABS',
        pattern: /ABS/i,
    }),
    CEIL: api_3({
        name: 'CEIL',
        pattern: /CEIL/i,
    }),
    FLOOR: api_3({
        name: 'FLOOR',
        pattern: /FLOOR/i,
    }),
    ROUND: api_3({
        name: 'ROUND',
        pattern: /ROUND/i,
    }),
    CONCAT: api_3({
        name: 'CONCAT',
        pattern: /CONCAT/i,
    }),
    STRLEN: api_3({
        name: 'STRLEN',
        pattern: /STRLEN/i,
    }),
    UCASE: api_3({
        name: 'UCASE',
        pattern: /UCASE/i,
    }),
    LCASE: api_3({
        name: 'LCASE',
        pattern: /LCASE/i,
    }),
    ENCODE_FOR_URI: api_3({
        name: 'ENCODE_FOR_URI',
        pattern: /ENCODE_FOR_URI/i,
    }),
    CONTAINS: api_3({
        name: 'CONTAINS',
        pattern: /CONTAINS/i,
    }),
    STRSTARTS: api_3({
        name: 'STRSTARTS',
        pattern: /STRSTARTS/i,
    }),
    STRENDS: api_3({
        name: 'STRENDS',
        pattern: /STRENDS/i,
    }),
    STRBEFORE: api_3({
        name: 'STRBEFORE',
        pattern: /STRBEFORE/i,
    }),
    STRAFTER: api_3({
        name: 'STRAFTER',
        pattern: /STRAFTER/i,
    }),
    YEAR: api_3({
        name: 'YEAR',
        pattern: /YEAR/i,
    }),
    MONTH: api_3({
        name: 'MONTH',
        pattern: /MONTH/i,
    }),
    DAY: api_3({
        name: 'DAY',
        pattern: /DAY/i,
    }),
    HOURS: api_3({
        name: 'HOURS',
        pattern: /HOURS/i,
    }),
    MINUTES: api_3({
        name: 'MINUTES',
        pattern: /MINUTES/i,
    }),
    SECONDS: api_3({
        name: 'SECONDS',
        pattern: /SECONDS/i,
    }),
    TIMEZONE: api_3({
        name: 'TIMEZONE',
        pattern: /TIMEZONE/i,
    }),
    TZ: api_3({
        name: 'TZ',
        pattern: /TZ/i,
    }),
    NOW: api_3({
        name: 'NOW',
        pattern: /NOW/i,
    }),
    UUID: api_3({
        name: 'UUID',
        pattern: /UUID/i,
    }),
    STRUUID: api_3({
        name: 'STRUUID',
        pattern: /STRUUID/i,
    }),
    MD5: api_3({
        name: 'MD5',
        pattern: /MD5/i,
    }),
    SHA1: api_3({
        name: 'SHA1',
        pattern: /SHA1/i,
    }),
    SHA256: api_3({
        name: 'SHA256',
        pattern: /SHA256/i,
    }),
    SHA384: api_3({
        name: 'SHA384',
        pattern: /SHA384/i,
    }),
    SHA512: api_3({
        name: 'SHA512',
        pattern: /SHA512/i,
    }),
    COALESCE: api_3({
        name: 'COALESCE',
        pattern: /COALESCE/i,
    }),
    IF: api_3({
        name: 'IF',
        pattern: /IF/i,
    }),
    STRLANG: api_3({
        name: 'STRLANG',
        pattern: /STRLANG/i,
    }),
    STRDT: api_3({
        name: 'STRDT',
        pattern: /STRDT/i,
    }),
    sameTerm: api_3({
        name: 'sameTerm',
        pattern: /sameTerm/i,
    }),
    isIRI: api_3({
        name: 'isIRI',
        pattern: /isIRI/i,
    }),
    isURI: api_3({
        name: 'isURI',
        pattern: /isURI/i,
    }),
    isBlank: api_3({
        name: 'isBlank',
        pattern: /isBlank/i,
    }),
    isLiteral: api_3({
        name: 'isLiteral',
        pattern: /isLiteral/i,
    }),
    isNumeric: api_3({
        name: 'isNumeric',
        pattern: /isNumeric/i,
    }),
    REGEX: api_3({
        name: 'REGEX',
        pattern: /REGEX/i,
    }),
    SUBSTR: api_3({
        name: 'SUBSTR',
        pattern: /SUBSTR/i,
    }),
    REPLACE: api_3({
        name: 'REPLACE',
        pattern: /REPLACE/i,
    }),
    EXISTS: api_3({
        name: 'EXISTS',
        pattern: /EXISTS/i,
    }),
    NOT_EXISTS: api_3({
        name: 'NOT_EXISTS',
        pattern: /NOT EXISTS/i,
    }),
    COUNT: api_3({
        name: 'COUNT',
        pattern: /COUNT/i,
    }),
    SUM: api_3({
        name: 'SUM',
        pattern: /SUM/i,
    }),
    MIN: api_3({
        name: 'MIN',
        pattern: /MIN/i,
    }),
    AVG: api_3({
        name: 'AVG',
        pattern: /AVG/i,
    }),
    SAMPLE: api_3({
        name: 'SAMPLE',
        pattern: /SAMPLE/i,
    }),
    GROUP_CONCAT: api_3({
        name: 'GROUP_CONCAT',
        pattern: /GROUP_CONCAT/i,
    }),
    SEPARATOR: api_3({
        name: 'SEPARATOR',
        pattern: /SEPARATOR/i,
    }),
    TRUE: api_3({
        name: 'TRUE',
        pattern: /TRUE/i,
    }),
    FALSE: api_3({
        name: 'FALSE',
        pattern: /FALSE/i,
    }),
    IN: api_3({
        name: 'IN',
        pattern: /IN/i,
    }),
    NOT_IN: api_3({
        name: 'NOT_IN',
        pattern: /NOT IN/i,
    }),
    MAX_LENGTH: MAX_LENGTH,
    MAX: api_3({
        name: 'MAX',
        pattern: /MAX/i,
        longer_alt: MAX_LENGTH,
    }),
};

// @ts-ignore: import types for declarations
var tokenMap = {
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
    Comment: api_3({
        name: 'Comment',
        pattern: /#[^\n]*/,
        group: 'comments',
    }),
    LCurly: api_3({ name: 'LCurly', pattern: '{' }),
    RCurly: api_3({ name: 'RCurly', pattern: '}' }),
    LParen: api_3({ name: 'LParen', pattern: '(' }),
    RParen: api_3({ name: 'RParen', pattern: ')' }),
    WhiteSpace: api_3({
        name: 'WhiteSpace',
        pattern: /\s+/,
        group: api_2.SKIPPED,
        line_breaks: true,
    }),
    Star: api_3({
        name: 'Star',
        pattern: '*',
    }),
    Unknown: api_3({
        name: 'Unknown',
        pattern: /\w+/,
    }),
    Period: api_3({
        name: 'Period',
        pattern: '.',
    }),
    QuestionMark: api_3({
        name: 'QuestionMark',
        pattern: '?',
    }),
    Plus: api_3({
        name: 'Plus',
        pattern: '+',
    }),
    Minus: api_3({
        name: 'Minus',
        pattern: '-',
    }),
    LBracket: api_3({
        name: 'LBracket',
        pattern: '[',
    }),
    RBracket: api_3({
        name: 'RBracket',
        pattern: ']',
    }),
    Semicolon: api_3({
        name: 'Semicolon',
        pattern: ';',
    }),
    Comma: api_3({
        name: 'Comma',
        pattern: ',',
    }),
    Pipe: api_3({
        name: 'Pipe',
        pattern: '|',
    }),
    ForwardSlash: api_3({
        name: 'ForwardSlash',
        pattern: '/',
    }),
    Caret: api_3({
        name: 'Caret',
        pattern: '^',
    }),
    DoubleCaret: api_3({
        name: 'DoubleCaret',
        pattern: '^^',
    }),
    Bang: api_3({
        name: 'Bang',
        pattern: '!',
    }),
    LogicalOr: api_3({
        name: 'LogicalOr',
        pattern: '||',
    }),
    LogicalAnd: api_3({
        name: 'LogicalAnd',
        pattern: '&&',
    }),
    Equals: api_3({
        name: 'Equals',
        pattern: '=',
    }),
    NotEquals: api_3({
        name: 'NotEquals',
        pattern: '!=',
    }),
    LessThan: api_3({
        name: 'LessThan',
        pattern: '<',
    }),
    GreaterThan: api_3({
        name: 'GreaterThan',
        pattern: '>',
    }),
    LessThanEquals: api_3({
        name: 'LessThanEquals',
        pattern: '<=',
    }),
    GreaterThanEquals: api_3({
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
    tokenMap.NIL,
    tokenMap.ANON,
    tokenMap.LCurly,
    tokenMap.RCurly,
    tokenMap.LParen,
    tokenMap.RParen,
    tokenMap.WhiteSpace,
    tokenMap.IRIREF,
    tokenMap.LANGTAG,
    tokenMap.DOUBLE,
    tokenMap.DECIMAL,
    tokenMap.INTEGER,
    tokenMap.DOUBLE_POSITIVE,
    tokenMap.DECIMAL_POSITIVE,
    tokenMap.INTEGER_POSITIVE,
    tokenMap.DOUBLE_NEGATIVE,
    tokenMap.DECIMAL_NEGATIVE,
    tokenMap.INTEGER_NEGATIVE,
    tokenMap.STRING_LITERAL1,
    tokenMap.STRING_LITERAL2,
    tokenMap.STRING_LITERAL_LONG1,
    tokenMap.STRING_LITERAL_LONG2,
    tokenMap.PNAME_NS,
    tokenMap.PNAME_LN,
    tokenMap.BLANK_NODE_LABEL,
    tokenMap.VAR1,
    tokenMap.VAR2,
    tokenMap.Comment,
    tokenMap.SELECT,
    tokenMap.CONSTRUCT,
    tokenMap.DISTINCT,
    tokenMap.Star,
    tokenMap.WHERE,
    tokenMap.GroupBy,
    tokenMap.OrderBy,
    tokenMap.By,
    tokenMap.Period,
    tokenMap.QuestionMark,
    tokenMap.Plus,
    tokenMap.Minus,
    tokenMap.LBracket,
    tokenMap.RBracket,
    tokenMap.PERCENT,
    tokenMap.BASE,
    tokenMap.PREFIX,
    tokenMap.DESCRIBE,
    tokenMap.ASK,
    tokenMap.FROM,
    tokenMap.REDUCED,
    tokenMap.NAMED,
    tokenMap.HAVING,
    tokenMap.ASC,
    tokenMap.DESC,
    tokenMap.OFFSET,
    tokenMap.LIMIT,
    tokenMap.VALUES,
    tokenMap.LOAD,
    tokenMap.SILENT,
    tokenMap.INTO,
    tokenMap.AS,
    tokenMap.CLEAR,
    tokenMap.DROP,
    tokenMap.CREATE,
    tokenMap.ADD,
    tokenMap.TO,
    tokenMap.MOVE,
    tokenMap.COPY,
    tokenMap.INSERT_DATA,
    tokenMap.DELETE_DATA,
    tokenMap.DELETE_WHERE,
    tokenMap.WITH,
    tokenMap.DELETE,
    tokenMap.INSERT,
    tokenMap.USING,
    tokenMap.DEFAULT,
    tokenMap.GRAPH,
    tokenMap.ALL,
    tokenMap.OPTIONAL,
    tokenMap.SERVICE,
    tokenMap.BIND,
    tokenMap.UNDEF,
    tokenMap.MINUS,
    tokenMap.UNION,
    tokenMap.FILTER,
    tokenMap.LANGMATCHERS,
    tokenMap.LANG,
    tokenMap.DATATYPE,
    tokenMap.BOUND,
    tokenMap.IRI,
    tokenMap.URI,
    tokenMap.BNODE,
    tokenMap.RAND,
    tokenMap.ABS,
    tokenMap.CEIL,
    tokenMap.FLOOR,
    tokenMap.ROUND,
    tokenMap.CONCAT,
    tokenMap.STRLEN,
    tokenMap.UCASE,
    tokenMap.LCASE,
    tokenMap.ENCODE_FOR_URI,
    tokenMap.CONTAINS,
    tokenMap.STRSTARTS,
    tokenMap.STRENDS,
    tokenMap.STRBEFORE,
    tokenMap.STRAFTER,
    tokenMap.YEAR,
    tokenMap.MONTH,
    tokenMap.DAY,
    tokenMap.HOURS,
    tokenMap.MINUTES,
    tokenMap.SECONDS,
    tokenMap.TIMEZONE,
    tokenMap.TZ,
    tokenMap.NOW,
    tokenMap.UUID,
    tokenMap.STRUUID,
    tokenMap.MD5,
    tokenMap.SHA1,
    tokenMap.SHA256,
    tokenMap.SHA384,
    tokenMap.SHA512,
    tokenMap.COALESCE,
    tokenMap.IF,
    tokenMap.STRLANG,
    tokenMap.STRDT,
    tokenMap.STR,
    tokenMap.sameTerm,
    tokenMap.isIRI,
    tokenMap.isURI,
    tokenMap.isBlank,
    tokenMap.isLiteral,
    tokenMap.isNumeric,
    tokenMap.REGEX,
    tokenMap.SUBSTR,
    tokenMap.REPLACE,
    tokenMap.EXISTS,
    tokenMap.NOT_EXISTS,
    tokenMap.COUNT,
    tokenMap.SUM,
    tokenMap.MIN,
    tokenMap.MAX_LENGTH,
    tokenMap.MAX,
    tokenMap.AVG,
    tokenMap.SAMPLE,
    tokenMap.GROUP_CONCAT,
    tokenMap.SEPARATOR,
    tokenMap.TRUE,
    tokenMap.FALSE,
    tokenMap.Semicolon,
    tokenMap.Comma,
    tokenMap.ForwardSlash,
    tokenMap.DoubleCaret,
    tokenMap.Caret,
    tokenMap.LogicalOr,
    tokenMap.Pipe,
    tokenMap.LogicalAnd,
    tokenMap.NotEquals,
    tokenMap.Bang,
    tokenMap.Equals,
    tokenMap.LessThanEquals,
    tokenMap.GreaterThanEquals,
    tokenMap.LessThan,
    tokenMap.GreaterThan,
    tokenMap.IN,
    tokenMap.NOT_IN,
    tokenMap.A,
    tokenMap.Unknown,
];
var pathsTokens = [
    tokenMap.START,
    tokenMap.END,
    tokenMap.VIA,
    tokenMap.CYCLIC,
    tokenMap.PATHS_SHORTEST,
    tokenMap.PATHS_ALL,
    tokenMap.PATHS,
];
var tokenTypes = baseTokens.concat(pathsTokens);

var tokens$2 = /*#__PURE__*/Object.freeze({
    tokenMap: tokenMap,
    baseTokens: baseTokens,
    pathsTokens: pathsTokens,
    tokenTypes: tokenTypes
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
            _this.CONSUME(tokenMap.MAX_LENGTH);
            _this.CONSUME(tokenMap.INTEGER);
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
            _this.CONSUME(tokenMap.BASE);
            _this.CONSUME(tokenMap.IRIREF);
        });
        _this.PrefixDecl = _this.RULE('PrefixDecl', function () {
            log('PrefixDecl');
            _this.CONSUME(tokenMap.PREFIX);
            _this.CONSUME(tokenMap.PNAME_NS);
            _this.CONSUME(tokenMap.IRIREF);
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
            _this.CONSUME(tokenMap.SELECT);
            _this.OPTION(function () {
                return _this.OR([
                    { ALT: function () { return _this.CONSUME(tokenMap.DISTINCT); } },
                    { ALT: function () { return _this.CONSUME(tokenMap.REDUCED); } },
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
                                        _this.CONSUME(tokenMap.LParen);
                                        _this.SUBRULE(_this.Expression);
                                        _this.CONSUME(tokenMap.AS);
                                        _this.SUBRULE1(_this.Var);
                                        _this.CONSUME(tokenMap.RParen);
                                    },
                                },
                            ]);
                        });
                    },
                },
                { ALT: function () { return _this.CONSUME(tokenMap.Star); } },
            ]);
        });
        _this.ConstructQuery = _this.RULE('ConstructQuery', function () {
            _this.CONSUME(tokenMap.CONSTRUCT);
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
                        _this.CONSUME(tokenMap.WHERE);
                        _this.CONSUME(tokenMap.LCurly);
                        _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
                        _this.CONSUME(tokenMap.RCurly);
                    },
                },
            ]);
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.DescribeQuery = _this.RULE('DescribeQuery', function () {
            log('DescribeQuery');
            _this.CONSUME(tokenMap.DESCRIBE);
            _this.OR([
                {
                    ALT: function () {
                        _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.VarOrIri); });
                    },
                },
                { ALT: function () { return _this.CONSUME(tokenMap.Star); } },
            ]);
            _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
            _this.OPTION(function () { return _this.SUBRULE(_this.WhereClause); });
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.AskQuery = _this.RULE('AskQuery', function () {
            log('AskQuery');
            _this.CONSUME(tokenMap.ASK);
            _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
            _this.SUBRULE(_this.WhereClause);
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.DatasetClause = _this.RULE('DatasetClause', function () {
            log('DatasetClause');
            _this.CONSUME(tokenMap.FROM);
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
            _this.CONSUME(tokenMap.NAMED);
            _this.SUBRULE(_this.SourceSelector);
        });
        _this.SourceSelector = _this.RULE('SourceSelector', function () {
            log('SourceSelector');
            _this.SUBRULE(_this.iri);
        });
        _this.WhereClause = _this.RULE('WhereClause', function () {
            log('WhereClause');
            _this.OPTION(function () { return _this.CONSUME(tokenMap.WHERE); });
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
            _this.CONSUME(tokenMap.GroupBy);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GroupCondition); });
        });
        _this.GroupCondition = _this.RULE('GroupCondition', function () {
            log('GroupCondition');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall); } },
                { ALT: function () { return _this.SUBRULE(_this.FunctionCall); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.OPTION(function () {
                            _this.CONSUME(tokenMap.AS);
                            _this.SUBRULE(_this.Var);
                        });
                        _this.CONSUME(tokenMap.RParen);
                    },
                },
                { ALT: function () { return _this.SUBRULE1(_this.Var); } },
            ]);
        });
        _this.HavingClause = _this.RULE('HavingClause', function () {
            log('HavingClause');
            _this.CONSUME(tokenMap.HAVING);
            _this.SUBRULE(_this.HavingCondition);
        });
        _this.HavingCondition = _this.RULE('HavingCondition', function () {
            log('HavingCondition');
            _this.SUBRULE(_this.Constraint);
        });
        _this.OrderClause = _this.RULE('OrderClause', function () {
            log('OrderClause');
            _this.CONSUME(tokenMap.OrderBy);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.OrderCondition); });
        });
        _this.OrderCondition = _this.RULE('OrderCondition', function () {
            log('OrderCondition');
            _this.OR([
                {
                    ALT: function () {
                        _this.OR1([
                            { ALT: function () { return _this.CONSUME(tokenMap.ASC); } },
                            { ALT: function () { return _this.CONSUME(tokenMap.DESC); } },
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
            _this.CONSUME(tokenMap.OFFSET);
            _this.CONSUME(tokenMap.INTEGER);
        });
        _this.LimitClause = _this.RULE('LimitClause', function () {
            log('LimitClause');
            _this.CONSUME(tokenMap.LIMIT);
            _this.CONSUME(tokenMap.INTEGER);
        });
        _this.ValuesClause = _this.RULE('ValuesClause', function () {
            log('ValuesClause');
            _this.OPTION(function () {
                _this.CONSUME(tokenMap.VALUES);
                _this.SUBRULE(_this.DataBlock);
            });
        });
        _this.Update = _this.RULE('Update', function () {
            log('Update');
            _this.SUBRULE(_this.Prologue);
            _this.OPTION(function () {
                _this.SUBRULE(_this.Update1);
                _this.OPTION1(function () {
                    _this.CONSUME(tokenMap.Semicolon);
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
            _this.CONSUME(tokenMap.LOAD);
            _this.OPTION(function () { return _this.CONSUME(tokenMap.SILENT); });
            _this.SUBRULE(_this.iri);
            _this.OPTION1(function () {
                _this.CONSUME(tokenMap.INTO);
                _this.SUBRULE(_this.GraphRef);
            });
        });
        _this.Clear = _this.RULE('Clear', function () {
            log('Clear');
            _this.CONSUME(tokenMap.CLEAR);
            _this.OPTION(function () { return _this.CONSUME(tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Drop = _this.RULE('Drop', function () {
            log('Drop');
            _this.CONSUME(tokenMap.DROP);
            _this.OPTION(function () { return _this.CONSUME(tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Create = _this.RULE('Create', function () {
            log('Create');
            _this.CONSUME(tokenMap.CREATE);
            _this.OPTION(function () { return _this.CONSUME(tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Add = _this.RULE('Add', function () {
            log('Add');
            _this.CONSUME(tokenMap.ADD);
            _this.OPTION(function () { return _this.CONSUME(tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(tokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.Move = _this.RULE('Move', function () {
            log('Move');
            _this.CONSUME(tokenMap.MOVE);
            _this.OPTION(function () { return _this.CONSUME(tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(tokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.Copy = _this.RULE('Copy', function () {
            log('Copy');
            _this.CONSUME(tokenMap.COPY);
            _this.OPTION(function () { return _this.CONSUME(tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(tokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.InsertData = _this.RULE('InsertData', function () {
            log('InsertData');
            _this.CONSUME(tokenMap.INSERT_DATA);
            _this.SUBRULE(_this.QuadData);
        });
        _this.DeleteData = _this.RULE('DeleteData', function () {
            log('DeleteData');
            _this.CONSUME(tokenMap.DELETE_DATA);
            _this.SUBRULE(_this.QuadData);
        });
        _this.DeleteWhere = _this.RULE('DeleteWhere', function () {
            log('DeleteWhere');
            _this.CONSUME(tokenMap.DELETE_WHERE);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.Modify = _this.RULE('Modify', function () {
            log('Modify');
            _this.OPTION(function () {
                _this.CONSUME(tokenMap.WITH);
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
            _this.CONSUME(tokenMap.WHERE);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.DeleteClause = _this.RULE('DeleteClause', function () {
            log('DeleteClause');
            _this.CONSUME(tokenMap.DELETE);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.InsertClause = _this.RULE('InsertClause', function () {
            log('InsertClause');
            _this.CONSUME(tokenMap.INSERT);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.UsingClause = _this.RULE('UsingClause', function () {
            log('UsingClause');
            _this.CONSUME(tokenMap.USING);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.NAMED);
                        _this.SUBRULE1(_this.iri);
                    },
                },
            ]);
        });
        _this.GraphOrDefault = _this.RULE('GraphOrDefault', function () {
            log('GraphOrDefault');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.DEFAULT); } },
                {
                    ALT: function () {
                        _this.OPTION(function () { return _this.CONSUME(tokenMap.GRAPH); });
                        _this.SUBRULE(_this.iri);
                    },
                },
            ]);
        });
        _this.GraphRef = _this.RULE('GraphRef', function () {
            log('GraphRef');
            _this.CONSUME(tokenMap.GRAPH);
            _this.SUBRULE(_this.iri);
        });
        _this.GraphRefAll = _this.RULE('GraphRefAll', function () {
            log('GraphRefAll');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.GraphRef); } },
                { ALT: function () { return _this.CONSUME(tokenMap.DEFAULT); } },
                { ALT: function () { return _this.CONSUME(tokenMap.NAMED); } },
                { ALT: function () { return _this.CONSUME(tokenMap.ALL); } },
            ]);
        });
        _this.QuadPattern = _this.RULE('QuadPattern', function () {
            log('QuadPattern');
            _this.CONSUME(tokenMap.LCurly);
            _this.SUBRULE(_this.Quads);
            _this.CONSUME(tokenMap.RCurly);
        });
        _this.QuadData = _this.RULE('QuadData', function () {
            log('QuadData');
            _this.CONSUME(tokenMap.LCurly);
            _this.SUBRULE(_this.Quads);
            _this.CONSUME(tokenMap.RCurly);
        });
        _this.Quads = _this.RULE('Quads', function () {
            log('Quads');
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            _this.MANY(function () {
                _this.SUBRULE(_this.QuadsNotTriples);
                _this.OPTION1(function () { return _this.CONSUME(tokenMap.Period); });
                _this.OPTION2(function () { return _this.SUBRULE1(_this.TriplesTemplate); });
            });
        });
        _this.QuadsNotTriples = _this.RULE('QuadsNotTriples', function () {
            log('QuadsNotTriples');
            _this.CONSUME(tokenMap.GRAPH);
            _this.SUBRULE(_this.VarOrIri);
            _this.CONSUME(tokenMap.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            _this.CONSUME(tokenMap.RCurly);
        });
        _this.TriplesTemplate = _this.RULE('TriplesTemplate', function () {
            log('TriplesTemplate');
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(tokenMap.Period);
                _this.OPTION1(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            });
        });
        _this.GroupGraphPattern = _this.RULE('GroupGraphPattern', function () {
            log('GroupGraphPattern');
            _this.CONSUME(tokenMap.LCurly);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SubSelect); } },
                { ALT: function () { return _this.SUBRULE(_this.GroupGraphPatternSub); } },
            ]);
            _this.CONSUME(tokenMap.RCurly);
        });
        _this.GroupGraphPatternSub = _this.RULE('GroupGraphPatternSub', function () {
            log('GroupGraphPatternSub');
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesBlock); });
            _this.MANY(function () {
                _this.SUBRULE(_this.GraphPatternNotTriples);
                _this.OPTION1(function () { return _this.CONSUME(tokenMap.Period); });
                _this.OPTION2(function () { return _this.SUBRULE1(_this.TriplesBlock); });
            });
        });
        _this.TriplesBlock = _this.RULE('TriplesBlock', function () {
            log('TriplesBlock');
            _this.SUBRULE(_this.TriplesSameSubjectPath);
            _this.OPTION(function () {
                _this.CONSUME(tokenMap.Period);
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
            _this.CONSUME(tokenMap.OPTIONAL);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.GraphGraphPattern = _this.RULE('GraphGraphPattern', function () {
            log('GraphGraphPattern');
            _this.CONSUME(tokenMap.GRAPH);
            _this.SUBRULE(_this.VarOrIri);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.ServiceGraphPattern = _this.RULE('ServiceGraphPattern', function () {
            log('ServiceGraphPattern');
            _this.CONSUME(tokenMap.SERVICE);
            _this.OPTION(function () { return _this.CONSUME(tokenMap.SILENT); });
            _this.SUBRULE(_this.VarOrIri);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.Bind = _this.RULE('Bind', function () {
            log('Bind');
            _this.CONSUME(tokenMap.BIND);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.AS);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.InlineData = _this.RULE('InlineData', function () {
            log('InlineData');
            _this.CONSUME(tokenMap.VALUES);
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
            _this.CONSUME(tokenMap.LCurly);
            _this.MANY(function () { return _this.SUBRULE(_this.DataBlockValue); });
            _this.CONSUME(tokenMap.RCurly);
        });
        _this.InlineDataFull = _this.RULE('InlineDataFull', function () {
            log('InlineDataFull');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.LParen);
                        _this.MANY(function () { return _this.SUBRULE(_this.Var); });
                        _this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
            _this.CONSUME(tokenMap.LCurly);
            _this.MANY1(function () {
                return _this.OR1([
                    {
                        ALT: function () {
                            _this.CONSUME1(tokenMap.LParen);
                            _this.MANY2(function () { return _this.SUBRULE(_this.DataBlockValue); });
                            _this.CONSUME1(tokenMap.RParen);
                        },
                    },
                    { ALT: function () { return _this.CONSUME1(tokenMap.NIL); } },
                ]);
            });
            _this.CONSUME(tokenMap.RCurly);
        });
        _this.DataBlockValue = _this.RULE('DataBlockValue', function () {
            log('DataBlockValue');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
                { ALT: function () { return _this.CONSUME(tokenMap.UNDEF); } },
            ]);
        });
        _this.MinusGraphPattern = _this.RULE('MinusGraphPattern', function () {
            log('MinusGraphPattern');
            _this.CONSUME(tokenMap.MINUS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.GroupOrUnionGraphPattern = _this.RULE('GroupOrUnionGraphPattern', function () {
            log('GroupOrUnionGraphPattern');
            _this.SUBRULE(_this.GroupGraphPattern);
            _this.MANY(function () {
                _this.CONSUME(tokenMap.UNION);
                _this.SUBRULE1(_this.GroupGraphPattern);
            });
        });
        _this.Filter = _this.RULE('Filter', function () {
            log('Filter');
            _this.CONSUME(tokenMap.FILTER);
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
                { ALT: function () { return _this.CONSUME(tokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.LParen);
                        _this.OPTION(function () { return _this.CONSUME(tokenMap.DISTINCT); });
                        _this.SUBRULE(_this.Expression);
                        _this.MANY(function () {
                            _this.CONSUME(tokenMap.Comma);
                            _this.SUBRULE1(_this.Expression);
                        });
                        _this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
        });
        _this.ExpressionList = _this.RULE('ExpressionList', function () {
            log('ExpressionList');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.MANY(function () {
                            _this.CONSUME(tokenMap.Comma);
                            _this.SUBRULE1(_this.Expression);
                        });
                        _this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
        });
        _this.ConstructTemplate = _this.RULE('ConstructTemplate', function () {
            log('ConstructTemplate');
            _this.CONSUME(tokenMap.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.ConstructTriples); });
            _this.CONSUME(tokenMap.RCurly);
        });
        _this.ConstructTriples = _this.RULE('ConstructTriples', function () {
            log('ConstructTriples');
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(tokenMap.Period);
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
                _this.CONSUME(tokenMap.Semicolon);
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
                { ALT: function () { return _this.CONSUME(tokenMap.A); } },
            ]);
        });
        _this.ObjectList = _this.RULE('ObjectList', function () {
            log('ObjectList');
            _this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.Comma,
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
                _this.CONSUME(tokenMap.Semicolon);
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
                SEP: tokenMap.Comma,
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
                SEP: tokenMap.Pipe,
                DEF: function () { return _this.SUBRULE(_this.PathSequence); },
            });
        });
        _this.PathSequence = _this.RULE('PathSequence', function () {
            log('PathSequence');
            _this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.ForwardSlash,
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
            _this.OPTION(function () { return _this.CONSUME(tokenMap.Caret); });
            _this.SUBRULE(_this.PathElt);
        });
        _this.PathMod = _this.RULE('PathMod', function () {
            log('PathMod');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.QuestionMark); } },
                { ALT: function () { return _this.CONSUME(tokenMap.Star); } },
                { ALT: function () { return _this.CONSUME(tokenMap.Plus); } },
            ]);
        });
        _this.PathPrimary = _this.RULE('PathPrimary', function () {
            log('PathPrimary');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.CONSUME(tokenMap.A); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.Bang);
                        _this.SUBRULE(_this.PathNegatedPropertySet);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.LParen);
                        _this.SUBRULE(_this.Path);
                        _this.CONSUME(tokenMap.RParen);
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
                        _this.CONSUME(tokenMap.LParen);
                        _this.MANY_SEP({
                            SEP: tokenMap.Pipe,
                            DEF: function () { return _this.SUBRULE1(_this.PathOneInPropertySet); },
                        });
                        _this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
        });
        _this.PathOneInPropertySet = _this.RULE('PathOneInPropertySet', function () {
            log('PathOneInPropertySet');
            _this.OPTION(function () { return _this.CONSUME(tokenMap.Caret); });
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.CONSUME(tokenMap.A); } },
            ]);
        });
        _this.Integer = _this.RULE('Integer', function () {
            log('Integer');
            _this.CONSUME(tokenMap.INTEGER);
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
            _this.CONSUME(tokenMap.LBracket);
            _this.SUBRULE(_this.PropertyListNotEmpty);
            _this.CONSUME(tokenMap.RBracket);
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
            _this.CONSUME(tokenMap.LBracket);
            _this.SUBRULE(_this.PropertyListPathNotEmpty);
            _this.CONSUME(tokenMap.RBracket);
        });
        _this.Collection = _this.RULE('Collection', function () {
            log('Collection');
            _this.CONSUME(tokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNode); });
            _this.CONSUME(tokenMap.RParen);
        });
        _this.CollectionPath = _this.RULE('CollectionPath', function () {
            log('CollectionPath');
            _this.CONSUME(tokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNodePath); });
            _this.CONSUME(tokenMap.RParen);
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
                { ALT: function () { return _this.CONSUME(tokenMap.VAR1); } },
                { ALT: function () { return _this.CONSUME(tokenMap.VAR2); } },
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
                { ALT: function () { return _this.CONSUME(tokenMap.NIL); } },
            ]);
        });
        _this.Expression = _this.RULE('Expression', function () {
            log('Expression');
            _this.SUBRULE(_this.ConditionalOrExpression);
        });
        _this.ConditionalOrExpression = _this.RULE('ConditionalOrExpression', function () {
            log('ConditionalOrExpression');
            _this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.LogicalOr,
                DEF: function () { return _this.SUBRULE(_this.ConditionalAndExpression); },
            });
        });
        _this.ConditionalAndExpression = _this.RULE('ConditionalAndExpression', function () {
            log('ConditionalAndExpression');
            _this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.LogicalAnd,
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
                                { ALT: function () { return _this.CONSUME(tokenMap.Equals); } },
                                { ALT: function () { return _this.CONSUME(tokenMap.NotEquals); } },
                                { ALT: function () { return _this.CONSUME(tokenMap.LessThan); } },
                                { ALT: function () { return _this.CONSUME(tokenMap.GreaterThan); } },
                                { ALT: function () { return _this.CONSUME(tokenMap.LessThanEquals); } },
                                { ALT: function () { return _this.CONSUME(tokenMap.GreaterThanEquals); } },
                            ]);
                            _this.SUBRULE1(_this.NumericExpression);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(tokenMap.IN);
                            _this.SUBRULE(_this.ExpressionList);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(tokenMap.NOT_IN);
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
                                { ALT: function () { return _this.CONSUME(tokenMap.Plus); } },
                                { ALT: function () { return _this.CONSUME(tokenMap.Minus); } },
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
                                                { ALT: function () { return _this.CONSUME(tokenMap.Star); } },
                                                { ALT: function () { return _this.CONSUME(tokenMap.ForwardSlash); } },
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
                            _this.CONSUME(tokenMap.Star);
                            _this.SUBRULE1(_this.UnaryExpression);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(tokenMap.ForwardSlash);
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
                        _this.CONSUME(tokenMap.Bang);
                        _this.SUBRULE(_this.PrimaryExpression);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.Plus);
                        _this.SUBRULE1(_this.PrimaryExpression);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.Minus);
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
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_STR = _this.RULE('BuiltInCall_STR', function () {
            log('BuiltInCall_STR');
            _this.CONSUME(tokenMap.STR);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_LANG = _this.RULE('BuiltInCall_LANG', function () {
            log('BuiltInCall_LANG');
            _this.CONSUME(tokenMap.LANG);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_LANGMATCHERS = _this.RULE('BuiltInCall_LANGMATCHERS', function () {
            log('BuiltInCall_LANGMATCHERS');
            _this.CONSUME(tokenMap.LANGMATCHERS);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_DATATYPE = _this.RULE('BuiltInCall_DATATYPE', function () {
            log('BuiltInCall_DATATYPE');
            _this.CONSUME(tokenMap.DATATYPE);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_BOUND = _this.RULE('BuiltInCall_BOUND', function () {
            log('BuiltInCall_BOUND');
            _this.CONSUME(tokenMap.BOUND);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_IRI = _this.RULE('BuiltInCall_IRI', function () {
            log('BuiltInCall_IRI');
            _this.CONSUME(tokenMap.IRI);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_URI = _this.RULE('BuiltInCall_URI', function () {
            log('BuiltInCall_URI');
            _this.CONSUME(tokenMap.URI);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_BNODE = _this.RULE('BuiltInCall_BNODE', function () {
            log('BuiltInCall_BNODE');
            _this.CONSUME(tokenMap.BNODE);
            _this.OR([
                {
                    ALT: function () {
                        _this.CONSUME(tokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.CONSUME(tokenMap.RParen);
                    },
                },
                { ALT: function () { return _this.CONSUME(tokenMap.NIL); } },
            ]);
        });
        _this.BuiltInCall_RAND = _this.RULE('BuiltInCall_RAND', function () {
            log('BuiltInCall_RAND');
            _this.CONSUME(tokenMap.RAND);
            _this.CONSUME(tokenMap.NIL);
        });
        _this.BuiltInCall_ABS = _this.RULE('BuiltInCall_ABS', function () {
            log('BuiltInCall_ABS');
            _this.CONSUME(tokenMap.ABS);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_CEIL = _this.RULE('BuiltInCall_CEIL', function () {
            log('BuiltInCall_CEIL');
            _this.CONSUME(tokenMap.CEIL);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_FLOOR = _this.RULE('BuiltInCall_FLOOR', function () {
            log('BuiltInCall_FLOOR');
            _this.CONSUME(tokenMap.FLOOR);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_ROUND = _this.RULE('BuiltInCall_ROUND', function () {
            log('BuiltInCall_ROUND');
            _this.CONSUME(tokenMap.ROUND);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_CONCAT = _this.RULE('BuiltInCall_CONCAT', function () {
            log('BuiltInCall_CONCAT');
            _this.CONSUME(tokenMap.CONCAT);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.BuiltInCall_STRLEN = _this.RULE('BuiltInCall_STRLEN', function () {
            log('BuiltInCall_STRLEN');
            _this.CONSUME(tokenMap.STRLEN);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_UCASE = _this.RULE('BuiltInCall_UCASE', function () {
            log('BuiltInCall_UCASE');
            _this.CONSUME(tokenMap.UCASE);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_LCASE = _this.RULE('BuiltInCall_LCASE', function () {
            log('BuiltInCall_LCASE');
            _this.CONSUME(tokenMap.LCASE);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_ENCODE_FOR_URI = _this.RULE('BuiltInCall_ENCODE_FOR_URI', function () {
            log('BuiltInCall_ENCODE_FOR_URI');
            _this.CONSUME(tokenMap.ENCODE_FOR_URI);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_CONTAINS = _this.RULE('BuiltInCall_CONTAINS', function () {
            log('BuiltInCall_CONTAINS');
            _this.CONSUME(tokenMap.CONTAINS);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_STRSTARTS = _this.RULE('BuiltInCall_STRSTARTS', function () {
            log('BuiltInCall_STRSTARTS');
            _this.CONSUME(tokenMap.STRSTARTS);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_STRENDS = _this.RULE('BuiltInCall_STRENDS', function () {
            log('BuiltInCall_STRENDS');
            _this.CONSUME(tokenMap.STRENDS);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_STRBEFORE = _this.RULE('BuiltInCall_STRBEFORE', function () {
            log('BuiltInCall_STRBEFORE');
            _this.CONSUME(tokenMap.STRBEFORE);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_STRAFTER = _this.RULE('BuiltInCall_STRAFTER', function () {
            log('BuiltInCall_STRAFTER');
            _this.CONSUME(tokenMap.STRAFTER);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_YEAR = _this.RULE('BuiltInCall_YEAR', function () {
            log('BuiltInCall_YEAR');
            _this.CONSUME(tokenMap.YEAR);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_MONTH = _this.RULE('BuiltInCall_MONTH', function () {
            log('BuiltInCall_MONTH');
            _this.CONSUME(tokenMap.MONTH);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_DAY = _this.RULE('BuiltInCall_DAY', function () {
            log('BuiltInCall_DAY');
            _this.CONSUME(tokenMap.DAY);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_HOURS = _this.RULE('BuiltInCall_HOURS', function () {
            log('BuiltInCall_HOURS');
            _this.CONSUME(tokenMap.HOURS);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_MINUTES = _this.RULE('BuiltInCall_MINUTES', function () {
            log('BuiltInCall_MINUTES');
            _this.CONSUME(tokenMap.MINUTES);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_SECONDS = _this.RULE('BuiltInCall_SECONDS', function () {
            log('BuiltInCall_SECONDS');
            _this.CONSUME(tokenMap.SECONDS);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_TIMEZONE = _this.RULE('BuiltInCall_TIMEZONE', function () {
            log('BuiltInCall_TIMEZONE');
            _this.CONSUME(tokenMap.TIMEZONE);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_TZ = _this.RULE('BuiltInCall_TZ', function () {
            log('BuiltInCall_TZ');
            _this.CONSUME(tokenMap.TZ);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_NOW = _this.RULE('BuiltInCall_NOW', function () {
            log('BuiltInCall_NOW');
            _this.CONSUME(tokenMap.NOW);
            _this.CONSUME(tokenMap.NIL);
        });
        _this.BuiltInCall_UUID = _this.RULE('BuiltInCall_UUID', function () {
            log('BuiltInCall_UUID');
            _this.CONSUME(tokenMap.UUID);
            _this.CONSUME(tokenMap.NIL);
        });
        _this.BuiltInCall_STRUUID = _this.RULE('BuiltInCall_STRUUID', function () {
            log('BuiltInCall_STRUUID');
            _this.CONSUME(tokenMap.STRUUID);
            _this.CONSUME(tokenMap.NIL);
        });
        _this.BuiltInCall_MD5 = _this.RULE('BuiltInCall_MD5', function () {
            log('BuiltInCall_MD5');
            _this.CONSUME(tokenMap.MD5);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_SHA1 = _this.RULE('BuiltInCall_SHA1', function () {
            log('BuiltInCall_SHA1');
            _this.CONSUME(tokenMap.SHA1);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_SHA256 = _this.RULE('BuiltInCall_SHA256', function () {
            log('BuiltInCall_SHA256');
            _this.CONSUME(tokenMap.SHA256);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_SHA384 = _this.RULE('BuiltInCall_SHA384', function () {
            log('BuiltInCall_SHA384');
            _this.CONSUME(tokenMap.SHA384);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_SHA512 = _this.RULE('BuiltInCall_SHA512', function () {
            log('BuiltInCall_SHA512');
            _this.CONSUME(tokenMap.SHA512);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_COALESCE = _this.RULE('BuiltInCall_COALESCE', function () {
            log('BuiltInCall_COALESCE');
            _this.CONSUME(tokenMap.COALESCE);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.BuiltInCall_IF = _this.RULE('BuiltInCall_IF', function () {
            log('BuiltInCall_IF');
            _this.CONSUME(tokenMap.IF);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME1(tokenMap.Comma);
            _this.SUBRULE2(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_STRLANG = _this.RULE('BuiltInCall_STRLANG', function () {
            log('BuiltInCall_STRLANG');
            _this.CONSUME(tokenMap.STRLANG);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_STRDT = _this.RULE('BuiltInCall_STRDT', function () {
            log('BuiltInCall_STRDT');
            _this.CONSUME(tokenMap.STRDT);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_sameTerm = _this.RULE('BuiltInCall_sameTerm', function () {
            log('BuiltInCall_sameTerm');
            _this.CONSUME(tokenMap.sameTerm);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_isIRI = _this.RULE('BuiltInCall_isIRI', function () {
            log('BuiltInCall_isIRI');
            _this.CONSUME(tokenMap.isIRI);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_isURI = _this.RULE('BuiltInCall_isURI', function () {
            log('BuiltInCall_isURI');
            _this.CONSUME(tokenMap.isURI);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_isBlank = _this.RULE('BuiltInCall_isBlank', function () {
            log('BuiltInCall_isBlank');
            _this.CONSUME(tokenMap.isBlank);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_isLiteral = _this.RULE('BuiltInCall_isLiteral', function () {
            log('BuiltInCall_isLiteral');
            _this.CONSUME(tokenMap.isLiteral);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.BuiltInCall_isNumeric = _this.RULE('BuiltInCall_isNumeric', function () {
            log('BuiltInCall_isNumeric');
            _this.CONSUME(tokenMap.isNumeric);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
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
            _this.CONSUME(tokenMap.REGEX);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME1(tokenMap.Comma);
                _this.SUBRULE2(_this.Expression);
            });
            _this.CONSUME(tokenMap.RParen);
        });
        _this.SubstringExpression = _this.RULE('SubstringExpression', function () {
            log('SubstringExpression');
            _this.CONSUME(tokenMap.SUBSTR);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME1(tokenMap.Comma);
                _this.SUBRULE2(_this.Expression);
            });
            _this.CONSUME(tokenMap.RParen);
        });
        _this.StrReplaceExpression = _this.RULE('StrReplaceExpression', function () {
            log('StrReplaceExpression');
            _this.CONSUME(tokenMap.REPLACE);
            _this.CONSUME(tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME1(tokenMap.Comma);
            _this.SUBRULE2(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME2(tokenMap.Comma);
                _this.SUBRULE3(_this.Expression);
            });
            _this.CONSUME(tokenMap.RParen);
        });
        _this.ExistsFunction = _this.RULE('ExistsFunction', function () {
            log('ExistsFunction');
            _this.CONSUME(tokenMap.EXISTS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.NotExistsFunction = _this.RULE('NotExistsFunction', function () {
            log('NotExistsFunction');
            _this.CONSUME(tokenMap.NOT_EXISTS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.Count = _this.RULE('Count', function () {
            log('Count');
            _this.CONSUME(tokenMap.COUNT);
            _this.CONSUME1(tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokenMap.DISTINCT); });
            _this.OR([
                { ALT: function () { return _this.CONSUME3(tokenMap.Star); } },
                { ALT: function () { return _this.SUBRULE(_this.Expression); } },
            ]);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.Sum = _this.RULE('Sum', function () {
            log('Sum');
            _this.CONSUME(tokenMap.SUM);
            _this.CONSUME1(tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.Min = _this.RULE('Min', function () {
            log('Min');
            _this.CONSUME(tokenMap.MIN);
            _this.CONSUME1(tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.Max = _this.RULE('Max', function () {
            log('Max');
            _this.CONSUME(tokenMap.MAX);
            _this.CONSUME1(tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.Avg = _this.RULE('Avg', function () {
            log('Avg');
            _this.CONSUME(tokenMap.AVG);
            _this.CONSUME1(tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.Sample = _this.RULE('Sample', function () {
            log('Sample');
            _this.CONSUME(tokenMap.SAMPLE);
            _this.CONSUME1(tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokenMap.RParen);
        });
        _this.GroupConcat = _this.RULE('GroupConcat', function () {
            log('GroupConcat');
            _this.CONSUME(tokenMap.GROUP_CONCAT);
            _this.CONSUME1(tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.OPTION1(function () {
                _this.CONSUME(tokenMap.Semicolon);
                _this.CONSUME(tokenMap.SEPARATOR);
                _this.CONSUME(tokenMap.Equals);
                _this.SUBRULE(_this.String);
            });
            _this.CONSUME(tokenMap.RParen);
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
                    { ALT: function () { return _this.CONSUME(tokenMap.LANGTAG); } },
                    {
                        ALT: function () {
                            _this.CONSUME(tokenMap.DoubleCaret);
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
                { ALT: function () { return _this.CONSUME(tokenMap.INTEGER); } },
                { ALT: function () { return _this.CONSUME(tokenMap.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(tokenMap.DOUBLE); } },
            ]);
        });
        _this.NumericLiteralPositive = _this.RULE('NumericLiteralPositive', function () {
            log('NumericLiteralPositive');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.INTEGER_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(tokenMap.DECIMAL_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(tokenMap.DOUBLE_POSITIVE); } },
            ]);
        });
        _this.NumericLiteralNegative = _this.RULE('NumericLiteralNegative', function () {
            log('NumericLiteralNegative');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.INTEGER_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(tokenMap.DECIMAL_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(tokenMap.DOUBLE_NEGATIVE); } },
            ]);
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            log('BooleanLiteral');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.TRUE); } },
                { ALT: function () { return _this.CONSUME(tokenMap.FALSE); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            log('String');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.STRING_LITERAL1); } },
                { ALT: function () { return _this.CONSUME(tokenMap.STRING_LITERAL2); } },
                { ALT: function () { return _this.CONSUME(tokenMap.STRING_LITERAL_LONG1); } },
                { ALT: function () { return _this.CONSUME(tokenMap.STRING_LITERAL_LONG2); } },
            ]);
        });
        _this.iri = _this.RULE('iri', function () {
            log('iri');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            log('PrefixedName');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(tokenMap.PNAME_NS); } },
            ]);
        });
        _this.BlankNode = _this.RULE('BlankNode', function () {
            log('BlankNode');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(tokenMap.ANON); } },
            ]);
        });
        _this.lexer = new api_2(tokenVocab);
        return _this;
    }
    return BaseSparqlParser;
}(api_1));

var indexOfSELECT = baseTokens.indexOf(tokenMap.SELECT);
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
            _this.CONSUME(tokenMap.START);
            _this.SUBRULE(_this.PathTerminal);
            _this.CONSUME(tokenMap.END);
            _this.SUBRULE1(_this.PathTerminal);
            _this.SUBRULE(_this.Via);
            _this.OPTION(function () { return _this.SUBRULE(_this.MaxLength); });
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.Via = _this.RULE('Via', function () {
            _this.CONSUME(tokenMap.VIA);
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
                            _this.CONSUME(tokenMap.Equals);
                            _this.SUBRULE(_this.iri);
                        },
                    },
                    { ALT: function () { return _this.SUBRULE(_this.GroupGraphPattern); } },
                ]);
            });
        });
        _this.PathSpec = _this.RULE('PathSpec', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap.PATHS); } },
                { ALT: function () { return _this.CONSUME(tokenMap.PATHS_SHORTEST); } },
                { ALT: function () { return _this.CONSUME(tokenMap.PATHS_ALL); } },
            ]);
            _this.OPTION1(function () { return _this.CONSUME(tokenMap.CYCLIC); });
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
            _this.CONSUME(tokenMap.Unknown);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.ConstructTemplate = _this.OVERRIDE_RULE('ConstructTemplate', function () {
            _this.CONSUME(tokenMap.LCurly);
            _this.OPTION(function () {
                // Stardog supports the request of Quads in a Construct template. See Stardog issue #675
                return _this.SUBRULE(_this.Quads);
            });
            _this.CONSUME(tokenMap.RCurly);
        });
        api_1.performSelfAnalysis(_this);
        return _this;
    }
    return StardogSparqlParser;
}(BaseSparqlParser));

var W3SpecSparqlParser = /** @class */ (function (_super) {
    __extends(W3SpecSparqlParser, _super);
    function W3SpecSparqlParser(options) {
        var _this = _super.call(this, options, baseTokens) || this;
        api_1.performSelfAnalysis(_this);
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
var tokenMap$1 = {
    Comment: api_3({
        name: 'Comment',
        pattern: /#[^\n]*/,
        group: 'comments',
    }),
    LBracket: tokenMap.LBracket,
    RBracket: tokenMap.RBracket,
    LParen: tokenMap.LParen,
    RParen: tokenMap.RParen,
    Period: tokenMap.Period,
    WhiteSpace: tokenMap.WhiteSpace,
    TRUE: tokenMap.TRUE,
    FALSE: tokenMap.FALSE,
    DoubleCaret: tokenMap.DoubleCaret,
    Comma: tokenMap.Comma,
    Semicolon: tokenMap.Semicolon,
    A: tokenMap.A,
    PREFIX: tokenMap.PREFIX,
    BASE: tokenMap.BASE,
    PNAME_NS: tokenMap.PNAME_NS,
    PNAME_LN: tokenMap.PNAME_LN,
    BLANK_NODE_LABEL: tokenMap.BLANK_NODE_LABEL,
    TTL_BASE: api_3({ name: 'TTL_BASE', pattern: /@base/ }),
    TTL_PREFIX: api_3({ name: 'TTL_PREFIX', pattern: /@prefix/ }),
    LANGTAG: tokenMap.LANGTAG,
    INTEGER: api_3({
        name: 'INTEGER',
        pattern: regex.and(regex.option(/[+-]/), /\d+/),
    }),
    DECIMAL: api_3({
        name: 'DECIMAL',
        pattern: regex.and(regex.option(/[+-]/), /(\d*\.\d+)/),
    }),
    DOUBLE: api_3({
        name: 'DOUBLE',
        pattern: regex.and(regex.option(/[+-]/), regex.or(regex.and(/\d+\.\d*/, EXPONENT), regex.and(/\.\d+/, EXPONENT), regex.and(/\d+/, EXPONENT))),
    }),
    EXPONENT: api_3({ name: 'EXPONENT', pattern: EXPONENT }),
    ECHAR: api_3({ name: 'ECHAR', pattern: ECHAR }),
    ANON: tokenMap.ANON,
    PLX: api_3({ name: 'PLX', pattern: PLX }),
    PERCENT: tokenMap.PERCENT,
    HEX: api_3({ name: 'HEX', pattern: HEX }),
    STRING_LITERAL_LONG_SINGLE_QUOTE: api_3({
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
    STRING_LITERAL_LONG_QUOTE: api_3({
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
    STRING_LITERAL_QUOTE: api_3({
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
    STRING_LITERAL_SINGLE_QUOTE: api_3({
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
    UCHAR: api_3({
        name: 'UCHAR',
        pattern: function (text, startOffset) {
            if (startOffset === void 0) { startOffset = 0; }
            return unicodeRegexp.exec(text.slice(startOffset));
        },
        line_breaks: false,
    }),
    IRIREF: api_3({
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
    PN_CHARS_BASE: api_3({ name: 'PN_CHARS_BASE', pattern: PN_CHARS_BASE }),
    PN_CHARS_U: api_3({ name: 'PN_CHARS_U', pattern: PN_CHARS_U }),
    PN_CHARS: api_3({ name: 'PN_CHARS', pattern: PN_CHARS }),
    PN_PREFIX: api_3({ name: 'PN_PREFIX', pattern: PN_PREFIX }),
    PN_LOCAL: api_3({ name: 'PN_LOCAL', pattern: PN_LOCAL }),
    PN_LOCAL_ESC: api_3({ name: 'PN_LOCAL_ESC', pattern: PN_LOCAL_ESC }),
    Unknown: api_3({
        name: 'Unknown',
        pattern: /\w+/,
    }),
};
var tokenTypes$1 = [
    tokenMap$1.Comment,
    tokenMap.ANON,
    tokenMap.LBracket,
    tokenMap.RBracket,
    tokenMap.LParen,
    tokenMap.RParen,
    tokenMap.WhiteSpace,
    tokenMap.TRUE,
    tokenMap.FALSE,
    tokenMap.Comma,
    tokenMap.Semicolon,
    tokenMap.PNAME_NS,
    tokenMap.A,
    tokenMap.PREFIX,
    tokenMap.BASE,
    tokenMap.PNAME_LN,
    tokenMap.BLANK_NODE_LABEL,
    tokenMap$1.TTL_BASE,
    tokenMap$1.TTL_PREFIX,
    tokenMap.LANGTAG,
    tokenMap$1.DOUBLE,
    tokenMap$1.DECIMAL,
    tokenMap.Period,
    tokenMap.DoubleCaret,
    tokenMap$1.IRIREF,
    tokenMap$1.STRING_LITERAL_LONG_SINGLE_QUOTE,
    tokenMap$1.STRING_LITERAL_LONG_QUOTE,
    tokenMap$1.STRING_LITERAL_QUOTE,
    tokenMap$1.STRING_LITERAL_SINGLE_QUOTE,
    tokenMap$1.INTEGER,
    tokenMap$1.EXPONENT,
    tokenMap$1.PLX,
    tokenMap.PERCENT,
    tokenMap$1.HEX,
    tokenMap$1.PN_CHARS_BASE,
    tokenMap$1.PN_CHARS_U,
    tokenMap$1.PN_CHARS,
    tokenMap$1.PN_PREFIX,
    tokenMap$1.PN_LOCAL,
    tokenMap$1.PN_LOCAL_ESC,
    tokenMap$1.ECHAR,
    tokenMap$1.UCHAR,
    tokenMap$1.Unknown,
];

var tokens$3 = /*#__PURE__*/Object.freeze({
    tokenMap: tokenMap$1,
    tokenTypes: tokenTypes$1
});

var TurtleParser = /** @class */ (function (_super) {
    __extends(TurtleParser, _super);
    function TurtleParser(config) {
        var _this = _super.call(this, [], tokenTypes$1, __assign({ outputCst: true, recoveryEnabled: true }, config)) || this;
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
                        _this.CONSUME(tokenMap$1.Period);
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
            _this.CONSUME(tokenMap$1.TTL_PREFIX);
            var pnameNsToken = _this.CONSUME(tokenMap$1.PNAME_NS);
            var iriToken = _this.CONSUME(tokenMap$1.IRIREF);
            var pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
            var iriImage = iriToken.image;
            _this.namespacesMap[pnameImageWithoutColon] = iriImage;
            _this.CONSUME(tokenMap$1.Period);
        });
        _this.base = _this.RULE('base', function () {
            _this.CONSUME(tokenMap$1.TTL_BASE);
            _this.CONSUME(tokenMap$1.IRIREF);
            _this.CONSUME(tokenMap$1.Period);
        });
        _this.sparqlBase = _this.RULE('sparqlBase', function () {
            _this.CONSUME(tokenMap$1.BASE);
            _this.CONSUME(tokenMap$1.IRIREF);
        });
        _this.sparqlPrefix = _this.RULE('sparqlPrefix', function () {
            _this.CONSUME(tokenMap$1.PREFIX);
            var pnameNsToken = _this.CONSUME(tokenMap$1.PNAME_NS);
            var iriToken = _this.CONSUME(tokenMap$1.IRIREF);
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
                _this.CONSUME(tokenMap$1.Semicolon);
                _this.OPTION1(function () {
                    _this.SUBRULE1(_this.verb);
                    _this.SUBRULE1(_this.objectList);
                });
            });
            _this.MANY(function () {
                _this.CONSUME1(tokenMap$1.Semicolon);
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
                _this.CONSUME(tokenMap$1.Comma);
                _this.SUBRULE1(_this.object);
            });
        });
        _this.verb = _this.RULE('verb', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.predicate); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.A); } },
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
            _this.CONSUME(tokenMap$1.LBracket);
            _this.SUBRULE(_this.predicateObjectList);
            _this.CONSUME(tokenMap$1.RBracket);
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
            _this.CONSUME(tokenMap$1.LParen);
            _this.MANY(function () { return _this.SUBRULE(_this.object); });
            _this.CONSUME(tokenMap$1.RParen);
        });
        _this.NumericLiteral = _this.RULE('NumericLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$1.INTEGER); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.DOUBLE); } },
            ]);
        });
        _this.RDFLiteral = _this.RULE('RDFLiteral', function () {
            _this.SUBRULE(_this.String);
            _this.OPTION(function () {
                _this.OR([
                    { ALT: function () { return _this.CONSUME(tokenMap$1.LANGTAG); } },
                    {
                        ALT: function () {
                            _this.CONSUME(tokenMap$1.DoubleCaret);
                            _this.SUBRULE(_this.iri);
                        },
                    },
                ]);
            });
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$1.TRUE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.FALSE); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$1.STRING_LITERAL_QUOTE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.STRING_LITERAL_SINGLE_QUOTE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.STRING_LITERAL_LONG_SINGLE_QUOTE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.STRING_LITERAL_LONG_QUOTE); } },
            ]);
        });
        _this.iri = _this.RULE('iri', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$1.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            var prefixedNameToken = _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$1.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.PNAME_NS); } },
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
                { ALT: function () { return _this.CONSUME(tokenMap$1.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(tokenMap$1.ANON); } },
            ]);
        });
        _this.lexer = new api_2(tokenTypes$1);
        api_1.performSelfAnalysis(_this);
        return _this;
    }
    return TurtleParser;
}(api_1));

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
var tokenMap$2 = {
    STRING_LITERAL1: tokenMap.STRING_LITERAL1,
    STRING_LITERAL2: tokenMap.STRING_LITERAL2,
    STRING_LITERAL_LONG1: tokenMap.STRING_LITERAL_LONG1,
    STRING_LITERAL_LONG2: tokenMap.STRING_LITERAL_LONG2,
    IRIREF: tokenMap.IRIREF,
    PNAME_LN: tokenMap.PNAME_LN,
    PNAME_NS: tokenMap.PNAME_NS,
    NIL: tokenMap.NIL,
    DISTINCT: tokenMap.DISTINCT,
    VAR1: tokenMap.VAR1,
    VAR2: tokenMap.VAR2,
    BIND: tokenMap.BIND,
    AS: tokenMap.AS,
    WHERE: tokenMap.WHERE,
    LANGTAG: tokenMap.LANGTAG,
    INTEGER: tokenMap.INTEGER,
    DECIMAL: tokenMap.DECIMAL,
    DOUBLE: tokenMap.DOUBLE,
    INTEGER_POSITIVE: tokenMap.INTEGER_POSITIVE,
    DECIMAL_POSITIVE: tokenMap.DECIMAL_POSITIVE,
    DOUBLE_POSITIVE: tokenMap.DOUBLE_POSITIVE,
    INTEGER_NEGATIVE: tokenMap.INTEGER_NEGATIVE,
    DECIMAL_NEGATIVE: tokenMap.DECIMAL_NEGATIVE,
    DOUBLE_NEGATIVE: tokenMap.DOUBLE_NEGATIVE,
    TRUE: tokenMap.TRUE,
    FALSE: tokenMap.FALSE,
    BLANK_NODE_LABEL: tokenMap.BLANK_NODE_LABEL,
    ANON: tokenMap.ANON,
    A: tokenMap.A,
    FROM: tokenMap.FROM,
    PREFIX: tokenMap.PREFIX,
    Comment: tokenMap.Comment,
    Period: tokenMap.Period,
    Comma: tokenMap.Comma,
    LCurly: tokenMap.LCurly,
    RCurly: tokenMap.RCurly,
    LParen: tokenMap.LParen,
    RParen: tokenMap.RParen,
    WhiteSpace: tokenMap.WhiteSpace,
    DoubleCaret: tokenMap.DoubleCaret,
    Semicolon: tokenMap.Semicolon,
    LBracket: tokenMap.LBracket,
    RBracket: tokenMap.RBracket,
    Template: api_3({
        name: 'Template',
        pattern: /template/i,
    }),
    TO: api_3({
        name: 'TO',
        pattern: /to/i,
    }),
    Sql: api_3({
        name: 'Sql',
        pattern: /sql/i,
    }),
    GraphQl: api_3({
        name: 'GraphQl',
        pattern: /graphql/i,
    }),
    Json: api_3({
        name: 'Json',
        pattern: /json/i,
    }),
    Mapping: api_3({
        name: 'Mapping',
        pattern: /mapping/i,
    }),
    SqlBlock: api_3({
        name: 'SqlBlock',
        pattern: function (text, startOffset, matchedTokensSoFar) {
            if (startOffset === void 0) { startOffset = 0; }
            var _a = matchedTokensSoFar.slice(-2), secondToLastToken = _a[0], lastToken = _a[1];
            if (!secondToLastToken ||
                !lastToken ||
                secondToLastToken.tokenType.tokenName !== tokenMap$2.Sql.tokenName ||
                lastToken.tokenType.tokenName !== tokenMap$2.LCurly.tokenName) {
                return null;
            }
            var textToMatch = text.slice(startOffset);
            return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
        },
        line_breaks: true,
    }),
    JsonBlock: api_3({
        name: 'JsonBlock',
        pattern: function (text, startOffset, matchedTokensSoFar) {
            if (startOffset === void 0) { startOffset = 0; }
            var lastToken = matchedTokensSoFar.slice(-1)[0];
            if (!lastToken ||
                lastToken.tokenType.tokenName !== tokenMap$2.Json.tokenName) {
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
    GraphQlBlock: api_3({
        name: 'GraphQlBlock',
        pattern: function (text, startOffset, matchedTokensSoFar) {
            if (startOffset === void 0) { startOffset = 0; }
            var _a = matchedTokensSoFar.slice(-2), secondToLastToken = _a[0], lastToken = _a[1];
            if (!secondToLastToken ||
                !lastToken ||
                secondToLastToken.tokenType.tokenName !== tokenMap$2.GraphQl.tokenName ||
                lastToken.tokenType.tokenName !== tokenMap$2.LCurly.tokenName) {
                return null;
            }
            var textToMatch = text.slice(startOffset);
            return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
        },
        line_breaks: true,
    }),
};
var tokenTypes$2 = [
    tokenMap$2.WhiteSpace,
    tokenMap$2.Comment,
    tokenMap$2.LParen,
    tokenMap$2.RParen,
    tokenMap$2.Period,
    tokenMap$2.Template,
    tokenMap$2.IRIREF,
    tokenMap$2.PNAME_LN,
    tokenMap$2.PNAME_NS,
    tokenMap$2.NIL,
    tokenMap$2.DISTINCT,
    tokenMap$2.VAR1,
    tokenMap$2.VAR2,
    tokenMap$2.BIND,
    tokenMap$2.AS,
    tokenMap$2.WHERE,
    tokenMap$2.TO,
    tokenMap$2.LANGTAG,
    tokenMap$2.INTEGER,
    tokenMap$2.DECIMAL,
    tokenMap$2.DOUBLE,
    tokenMap$2.INTEGER_POSITIVE,
    tokenMap$2.DECIMAL_POSITIVE,
    tokenMap$2.DOUBLE_POSITIVE,
    tokenMap$2.INTEGER_NEGATIVE,
    tokenMap$2.DECIMAL_NEGATIVE,
    tokenMap$2.DOUBLE_NEGATIVE,
    tokenMap$2.TRUE,
    tokenMap$2.FALSE,
    tokenMap$2.BLANK_NODE_LABEL,
    tokenMap$2.ANON,
    tokenMap$2.A,
    tokenMap$2.FROM,
    tokenMap$2.PREFIX,
    tokenMap$2.Comma,
    tokenMap$2.DoubleCaret,
    tokenMap$2.Semicolon,
    tokenMap$2.LBracket,
    tokenMap$2.RBracket,
    tokenMap$2.Sql,
    tokenMap$2.GraphQl,
    tokenMap$2.Json,
    tokenMap$2.Mapping,
    tokenMap$2.SqlBlock,
    tokenMap$2.JsonBlock,
    tokenMap$2.GraphQlBlock,
    tokenMap$2.LCurly,
    tokenMap$2.RCurly,
    tokenMap$2.STRING_LITERAL1,
    tokenMap$2.STRING_LITERAL2,
    tokenMap$2.STRING_LITERAL_LONG1,
    tokenMap$2.STRING_LITERAL_LONG2,
];

var tokens$4 = /*#__PURE__*/Object.freeze({
    tokenMap: tokenMap$2,
    tokenTypes: tokenTypes$2
});

var SmsParser = /** @class */ (function (_super) {
    __extends(SmsParser, _super);
    function SmsParser(config) {
        var _this = _super.call(this, [], tokenTypes$2, __assign({ outputCst: true, recoveryEnabled: true }, config)) || this;
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
                _this.CONSUME(tokenMap$2.Semicolon);
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
            _this.CONSUME(tokenMap$2.Mapping);
            _this.OPTION(function () { return _this.SUBRULE(_this.iri); });
        });
        _this.FromClause = _this.RULE('FromClause', function () {
            _this.CONSUME(tokenMap$2.FROM);
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
            _this.CONSUME(tokenMap$2.Json);
            // this.CONSUME(tokenMap.LCurly);
            _this.CONSUME(tokenMap$2.JsonBlock);
            // this.CONSUME(tokenMap.RCurly);
        });
        _this.GraphQlClause = _this.RULE('GraphQlClause', function () {
            _this.CONSUME(tokenMap$2.GraphQl);
            _this.CONSUME(tokenMap$2.LCurly);
            _this.CONSUME(tokenMap$2.GraphQlBlock);
            _this.CONSUME(tokenMap$2.RCurly);
        });
        _this.SqlClause = _this.RULE('SqlClause', function () {
            _this.CONSUME(tokenMap$2.Sql);
            _this.CONSUME(tokenMap$2.LCurly);
            _this.CONSUME(tokenMap$2.SqlBlock);
            _this.CONSUME(tokenMap$2.RCurly);
        });
        _this.ToClause = _this.RULE('ToClause', function () {
            _this.CONSUME(tokenMap$2.TO);
            _this.SUBRULE(_this.ConstructTemplate);
        });
        _this.WhereClause = _this.RULE('WhereClause', function () {
            _this.CONSUME(tokenMap$2.WHERE);
            _this.CONSUME(tokenMap$2.LCurly);
            _this.MANY(function () { return _this.SUBRULE(_this.Bind); });
            _this.CONSUME(tokenMap$2.RCurly);
        });
        _this.Bind = _this.RULE('Bind', function () {
            _this.CONSUME(tokenMap$2.BIND);
            _this.CONSUME(tokenMap$2.LParen);
            _this.SUBRULE(_this.TemplateOrCast);
            _this.CONSUME(tokenMap$2.AS);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(tokenMap$2.RParen);
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
            _this.CONSUME(tokenMap$2.LParen);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(tokenMap$2.RParen);
        });
        _this.TemplateFunc = _this.RULE('TemplateFunc', function () {
            _this.CONSUME(tokenMap$2.Template);
            _this.CONSUME(tokenMap$2.LParen);
            _this.SUBRULE(_this.String);
            _this.CONSUME(tokenMap$2.RParen);
        });
        //
        // Dupes from Sparql
        //
        _this.PrefixDecl = _this.RULE('PrefixDecl', function () {
            _this.CONSUME(tokenMap$2.PREFIX);
            _this.CONSUME(tokenMap$2.PNAME_NS);
            _this.CONSUME(tokenMap$2.IRIREF);
        });
        _this.iri = _this.RULE('iri', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$2.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$2.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.PNAME_NS); } },
            ]);
        });
        _this.ConstructTemplate = _this.RULE('ConstructTemplate', function () {
            _this.CONSUME(tokenMap$2.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.ConstructTriples); });
            _this.CONSUME(tokenMap$2.RCurly);
        });
        _this.ConstructTriples = _this.RULE('ConstructTriples', function () {
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(tokenMap$2.Period);
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
                _this.CONSUME(tokenMap$2.Semicolon);
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
                { ALT: function () { return _this.CONSUME(tokenMap$2.NIL); } },
            ]);
        });
        _this.Verb = _this.RULE('Verb', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.VarOrIri); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.A); } },
            ]);
        });
        _this.ObjectList = _this.RULE('ObjectList', function () {
            _this.AT_LEAST_ONE_SEP({
                SEP: tokenMap$2.Comma,
                DEF: function () { return _this.SUBRULE(_this.Object); },
            });
        });
        _this.Object = _this.RULE('Object', function () {
            _this.SUBRULE(_this.GraphNode);
        });
        _this.Collection = _this.RULE('Collection', function () {
            _this.CONSUME(tokenMap$2.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNode); });
            _this.CONSUME(tokenMap$2.RParen);
        });
        _this.BlankNodePropertyList = _this.RULE('BlankNodePropertyList', function () {
            _this.CONSUME(tokenMap$2.LBracket);
            _this.SUBRULE(_this.PropertyListNotEmpty);
            _this.CONSUME(tokenMap$2.RBracket);
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
                    { ALT: function () { return _this.CONSUME(tokenMap$2.LANGTAG); } },
                    {
                        ALT: function () {
                            _this.CONSUME(tokenMap$2.DoubleCaret);
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
                { ALT: function () { return _this.CONSUME(tokenMap$2.INTEGER); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.DOUBLE); } },
            ]);
        });
        _this.NumericLiteralPositive = _this.RULE('NumericLiteralPositive', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$2.INTEGER_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.DECIMAL_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.DOUBLE_POSITIVE); } },
            ]);
        });
        _this.NumericLiteralNegative = _this.RULE('NumericLiteralNegative', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$2.INTEGER_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.DECIMAL_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.DOUBLE_NEGATIVE); } },
            ]);
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$2.TRUE); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.FALSE); } },
            ]);
        });
        _this.BlankNode = _this.RULE('BlankNode', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$2.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.ANON); } },
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
                { ALT: function () { return _this.CONSUME(tokenMap$2.VAR1); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.VAR2); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokenMap$2.STRING_LITERAL1); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.STRING_LITERAL2); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.STRING_LITERAL_LONG1); } },
                { ALT: function () { return _this.CONSUME(tokenMap$2.STRING_LITERAL_LONG2); } },
            ]);
        });
        _this.lexer = new api_2(tokenTypes$2);
        api_1.performSelfAnalysis(_this);
        return _this;
    }
    return SmsParser;
}(api_1));

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

exports.sparqlTokens = tokens$2;
exports.turtleTokens = tokens$3;
exports.smsTokens = tokens$4;
exports.sparqlKeywords = keywords;
exports.sparqlTerminals = terminals;
exports.matchers = matchers;
exports.BaseSparqlParser = BaseSparqlParser;
exports.StardogSparqlParser = StardogSparqlParser;
exports.W3SpecSparqlParser = W3SpecSparqlParser;
exports.TurtleParser = TurtleParser;
exports.SmsParser = SmsParser;
exports.traverse = traverse;
exports.isCstNode = isCstNode;
