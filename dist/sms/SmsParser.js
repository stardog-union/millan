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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chevrotain_1 = require("chevrotain");
var tokens_1 = require("./tokens");
var SmsParser = /** @class */ (function (_super) {
    __extends(SmsParser, _super);
    function SmsParser(config) {
        var _this = _super.call(this, [], tokens_1.tokenTypes, __assign({ outputCst: true, recoveryEnabled: true }, config)) || this;
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
                _this.CONSUME(tokens_1.tokenMap.Semicolon);
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
            _this.CONSUME(tokens_1.tokenMap.Mapping);
            _this.OPTION(function () { return _this.SUBRULE(_this.iri); });
        });
        _this.FromClause = _this.RULE('FromClause', function () {
            _this.CONSUME(tokens_1.tokenMap.FROM);
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
            _this.CONSUME(tokens_1.tokenMap.Json);
            // this.CONSUME(tokenMap.LCurly);
            _this.CONSUME(tokens_1.tokenMap.JsonBlock);
            // this.CONSUME(tokenMap.RCurly);
        });
        _this.GraphQlClause = _this.RULE('GraphQlClause', function () {
            _this.CONSUME(tokens_1.tokenMap.GraphQl);
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.CONSUME(tokens_1.tokenMap.GraphQlBlock);
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.SqlClause = _this.RULE('SqlClause', function () {
            _this.CONSUME(tokens_1.tokenMap.Sql);
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.CONSUME(tokens_1.tokenMap.SqlBlock);
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.ToClause = _this.RULE('ToClause', function () {
            _this.CONSUME(tokens_1.tokenMap.TO);
            _this.SUBRULE(_this.ConstructTemplate);
        });
        _this.WhereClause = _this.RULE('WhereClause', function () {
            _this.CONSUME(tokens_1.tokenMap.WHERE);
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.MANY(function () { return _this.SUBRULE(_this.Bind); });
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.Bind = _this.RULE('Bind', function () {
            _this.CONSUME(tokens_1.tokenMap.BIND);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.TemplateOrCast);
            _this.CONSUME(tokens_1.tokenMap.AS);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(tokens_1.tokenMap.RParen);
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
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.TemplateFunc = _this.RULE('TemplateFunc', function () {
            _this.CONSUME(tokens_1.tokenMap.Template);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.String);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        //
        // Dupes from Sparql
        //
        _this.PrefixDecl = _this.RULE('PrefixDecl', function () {
            _this.CONSUME(tokens_1.tokenMap.PREFIX);
            _this.CONSUME(tokens_1.tokenMap.PNAME_NS);
            _this.CONSUME(tokens_1.tokenMap.IRIREF);
        });
        _this.iri = _this.RULE('iri', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PNAME_NS); } },
            ]);
        });
        _this.ConstructTemplate = _this.RULE('ConstructTemplate', function () {
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.ConstructTriples); });
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.ConstructTriples = _this.RULE('ConstructTriples', function () {
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(tokens_1.tokenMap.Period);
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
                _this.CONSUME(tokens_1.tokenMap.Semicolon);
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
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.NIL); } },
            ]);
        });
        _this.Verb = _this.RULE('Verb', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.VarOrIri); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.A); } },
            ]);
        });
        _this.ObjectList = _this.RULE('ObjectList', function () {
            _this.AT_LEAST_ONE_SEP({
                SEP: tokens_1.tokenMap.Comma,
                DEF: function () { return _this.SUBRULE(_this.Object); },
            });
        });
        _this.Object = _this.RULE('Object', function () {
            _this.SUBRULE(_this.GraphNode);
        });
        _this.Collection = _this.RULE('Collection', function () {
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNode); });
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BlankNodePropertyList = _this.RULE('BlankNodePropertyList', function () {
            _this.CONSUME(tokens_1.tokenMap.LBracket);
            _this.SUBRULE(_this.PropertyListNotEmpty);
            _this.CONSUME(tokens_1.tokenMap.RBracket);
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
                    { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.LANGTAG); } },
                    {
                        ALT: function () {
                            _this.CONSUME(tokens_1.tokenMap.DoubleCaret);
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
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.INTEGER); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DOUBLE); } },
            ]);
        });
        _this.NumericLiteralPositive = _this.RULE('NumericLiteralPositive', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.INTEGER_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DECIMAL_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DOUBLE_POSITIVE); } },
            ]);
        });
        _this.NumericLiteralNegative = _this.RULE('NumericLiteralNegative', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.INTEGER_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DECIMAL_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DOUBLE_NEGATIVE); } },
            ]);
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.TRUE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.FALSE); } },
            ]);
        });
        _this.BlankNode = _this.RULE('BlankNode', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.ANON); } },
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
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.VAR1); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.VAR2); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL1); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL2); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG1); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG2); } },
            ]);
        });
        _this.lexer = new chevrotain_1.Lexer(tokens_1.tokenTypes);
        chevrotain_1.Parser.performSelfAnalysis(_this);
        return _this;
    }
    return SmsParser;
}(chevrotain_1.Parser));
exports.SmsParser = SmsParser;
