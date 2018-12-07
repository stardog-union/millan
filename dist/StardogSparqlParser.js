"use strict";
var __extends = (this && this.__extends) || (function () {
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
var BaseSparqlParser_1 = require("./BaseSparqlParser");
var tokens_1 = require("./tokens");
var chevrotain_1 = require("chevrotain");
var indexOfSELECT = tokens_1.baseTokens.indexOf(tokens_1.tokenMap.SELECT);
var stardogTokens = tokens_1.baseTokens.slice(0, indexOfSELECT).concat(tokens_1.pathsTokens, tokens_1.baseTokens.slice(indexOfSELECT));
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
            _this.CONSUME(tokens_1.tokenMap.START);
            _this.SUBRULE(_this.PathTerminal);
            _this.CONSUME(tokens_1.tokenMap.END);
            _this.SUBRULE1(_this.PathTerminal);
            _this.SUBRULE(_this.Via);
            _this.OPTION(function () { return _this.SUBRULE(_this.MaxLength); });
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.Via = _this.RULE('Via', function () {
            _this.CONSUME(tokens_1.tokenMap.VIA);
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
                            _this.CONSUME(tokens_1.tokenMap.Equals);
                            _this.SUBRULE(_this.iri);
                        },
                    },
                    { ALT: function () { return _this.SUBRULE(_this.GroupGraphPattern); } },
                ]);
            });
        });
        _this.PathSpec = _this.RULE('PathSpec', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PATHS); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PATHS_SHORTEST); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PATHS_ALL); } },
            ]);
            _this.OPTION1(function () { return _this.CONSUME(tokens_1.tokenMap.CYCLIC); });
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
            _this.CONSUME(tokens_1.tokenMap.Unknown);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.ConstructTemplate = _this.OVERRIDE_RULE('ConstructTemplate', function () {
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.OPTION(function () {
                // Stardog supports the request of Quads in a Construct template. See Stardog issue #675
                return _this.SUBRULE(_this.Quads);
            });
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        chevrotain_1.Parser.performSelfAnalysis(_this);
        return _this;
    }
    return StardogSparqlParser;
}(BaseSparqlParser_1.BaseSparqlParser));
exports.StardogSparqlParser = StardogSparqlParser;
