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
var tokens_1 = require("./tokens");
var chevrotain_1 = require("chevrotain");
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
            _this.CONSUME(tokens_1.tokenMap.MAX_LENGTH);
            _this.CONSUME(tokens_1.tokenMap.INTEGER);
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
            _this.CONSUME(tokens_1.tokenMap.BASE);
            _this.CONSUME(tokens_1.tokenMap.IRIREF);
        });
        _this.PrefixDecl = _this.RULE('PrefixDecl', function () {
            log('PrefixDecl');
            _this.CONSUME(tokens_1.tokenMap.PREFIX);
            _this.CONSUME(tokens_1.tokenMap.PNAME_NS);
            _this.CONSUME(tokens_1.tokenMap.IRIREF);
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
            _this.CONSUME(tokens_1.tokenMap.SELECT);
            _this.OPTION(function () {
                return _this.OR([
                    { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DISTINCT); } },
                    { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.REDUCED); } },
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
                                        _this.CONSUME(tokens_1.tokenMap.LParen);
                                        _this.SUBRULE(_this.Expression);
                                        _this.CONSUME(tokens_1.tokenMap.AS);
                                        _this.SUBRULE1(_this.Var);
                                        _this.CONSUME(tokens_1.tokenMap.RParen);
                                    },
                                },
                            ]);
                        });
                    },
                },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.Star); } },
            ]);
        });
        _this.ConstructQuery = _this.RULE('ConstructQuery', function () {
            _this.CONSUME(tokens_1.tokenMap.CONSTRUCT);
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
                        _this.CONSUME(tokens_1.tokenMap.WHERE);
                        _this.CONSUME(tokens_1.tokenMap.LCurly);
                        _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
                        _this.CONSUME(tokens_1.tokenMap.RCurly);
                    },
                },
            ]);
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.DescribeQuery = _this.RULE('DescribeQuery', function () {
            log('DescribeQuery');
            _this.CONSUME(tokens_1.tokenMap.DESCRIBE);
            _this.OR([
                {
                    ALT: function () {
                        _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.VarOrIri); });
                    },
                },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.Star); } },
            ]);
            _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
            _this.OPTION(function () { return _this.SUBRULE(_this.WhereClause); });
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.AskQuery = _this.RULE('AskQuery', function () {
            log('AskQuery');
            _this.CONSUME(tokens_1.tokenMap.ASK);
            _this.MANY(function () { return _this.SUBRULE(_this.DatasetClause); });
            _this.SUBRULE(_this.WhereClause);
            _this.SUBRULE(_this.SolutionModifier);
        });
        _this.DatasetClause = _this.RULE('DatasetClause', function () {
            log('DatasetClause');
            _this.CONSUME(tokens_1.tokenMap.FROM);
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
            _this.CONSUME(tokens_1.tokenMap.NAMED);
            _this.SUBRULE(_this.SourceSelector);
        });
        _this.SourceSelector = _this.RULE('SourceSelector', function () {
            log('SourceSelector');
            _this.SUBRULE(_this.iri);
        });
        _this.WhereClause = _this.RULE('WhereClause', function () {
            log('WhereClause');
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.WHERE); });
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
            _this.CONSUME(tokens_1.tokenMap.GroupBy);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GroupCondition); });
        });
        _this.GroupCondition = _this.RULE('GroupCondition', function () {
            log('GroupCondition');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.BuiltInCall); } },
                { ALT: function () { return _this.SUBRULE(_this.FunctionCall); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.OPTION(function () {
                            _this.CONSUME(tokens_1.tokenMap.AS);
                            _this.SUBRULE(_this.Var);
                        });
                        _this.CONSUME(tokens_1.tokenMap.RParen);
                    },
                },
                { ALT: function () { return _this.SUBRULE1(_this.Var); } },
            ]);
        });
        _this.HavingClause = _this.RULE('HavingClause', function () {
            log('HavingClause');
            _this.CONSUME(tokens_1.tokenMap.HAVING);
            _this.SUBRULE(_this.HavingCondition);
        });
        _this.HavingCondition = _this.RULE('HavingCondition', function () {
            log('HavingCondition');
            _this.SUBRULE(_this.Constraint);
        });
        _this.OrderClause = _this.RULE('OrderClause', function () {
            log('OrderClause');
            _this.CONSUME(tokens_1.tokenMap.OrderBy);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.OrderCondition); });
        });
        _this.OrderCondition = _this.RULE('OrderCondition', function () {
            log('OrderCondition');
            _this.OR([
                {
                    ALT: function () {
                        _this.OR1([
                            { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.ASC); } },
                            { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DESC); } },
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
            _this.CONSUME(tokens_1.tokenMap.OFFSET);
            _this.CONSUME(tokens_1.tokenMap.INTEGER);
        });
        _this.LimitClause = _this.RULE('LimitClause', function () {
            log('LimitClause');
            _this.CONSUME(tokens_1.tokenMap.LIMIT);
            _this.CONSUME(tokens_1.tokenMap.INTEGER);
        });
        _this.ValuesClause = _this.RULE('ValuesClause', function () {
            log('ValuesClause');
            _this.OPTION(function () {
                _this.CONSUME(tokens_1.tokenMap.VALUES);
                _this.SUBRULE(_this.DataBlock);
            });
        });
        _this.Update = _this.RULE('Update', function () {
            log('Update');
            _this.SUBRULE(_this.Prologue);
            _this.OPTION(function () {
                _this.SUBRULE(_this.Update1);
                _this.OPTION1(function () {
                    _this.CONSUME(tokens_1.tokenMap.Semicolon);
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
            _this.CONSUME(tokens_1.tokenMap.LOAD);
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.SILENT); });
            _this.SUBRULE(_this.iri);
            _this.OPTION1(function () {
                _this.CONSUME(tokens_1.tokenMap.INTO);
                _this.SUBRULE(_this.GraphRef);
            });
        });
        _this.Clear = _this.RULE('Clear', function () {
            log('Clear');
            _this.CONSUME(tokens_1.tokenMap.CLEAR);
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Drop = _this.RULE('Drop', function () {
            log('Drop');
            _this.CONSUME(tokens_1.tokenMap.DROP);
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Create = _this.RULE('Create', function () {
            log('Create');
            _this.CONSUME(tokens_1.tokenMap.CREATE);
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphRefAll);
        });
        _this.Add = _this.RULE('Add', function () {
            log('Add');
            _this.CONSUME(tokens_1.tokenMap.ADD);
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(tokens_1.tokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.Move = _this.RULE('Move', function () {
            log('Move');
            _this.CONSUME(tokens_1.tokenMap.MOVE);
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(tokens_1.tokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.Copy = _this.RULE('Copy', function () {
            log('Copy');
            _this.CONSUME(tokens_1.tokenMap.COPY);
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.SILENT); });
            _this.SUBRULE(_this.GraphOrDefault);
            _this.CONSUME(tokens_1.tokenMap.TO);
            _this.SUBRULE1(_this.GraphOrDefault);
        });
        _this.InsertData = _this.RULE('InsertData', function () {
            log('InsertData');
            _this.CONSUME(tokens_1.tokenMap.INSERT_DATA);
            _this.SUBRULE(_this.QuadData);
        });
        _this.DeleteData = _this.RULE('DeleteData', function () {
            log('DeleteData');
            _this.CONSUME(tokens_1.tokenMap.DELETE_DATA);
            _this.SUBRULE(_this.QuadData);
        });
        _this.DeleteWhere = _this.RULE('DeleteWhere', function () {
            log('DeleteWhere');
            _this.CONSUME(tokens_1.tokenMap.DELETE_WHERE);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.Modify = _this.RULE('Modify', function () {
            log('Modify');
            _this.OPTION(function () {
                _this.CONSUME(tokens_1.tokenMap.WITH);
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
            _this.CONSUME(tokens_1.tokenMap.WHERE);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.DeleteClause = _this.RULE('DeleteClause', function () {
            log('DeleteClause');
            _this.CONSUME(tokens_1.tokenMap.DELETE);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.InsertClause = _this.RULE('InsertClause', function () {
            log('InsertClause');
            _this.CONSUME(tokens_1.tokenMap.INSERT);
            _this.SUBRULE(_this.QuadPattern);
        });
        _this.UsingClause = _this.RULE('UsingClause', function () {
            log('UsingClause');
            _this.CONSUME(tokens_1.tokenMap.USING);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.NAMED);
                        _this.SUBRULE1(_this.iri);
                    },
                },
            ]);
        });
        _this.GraphOrDefault = _this.RULE('GraphOrDefault', function () {
            log('GraphOrDefault');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DEFAULT); } },
                {
                    ALT: function () {
                        _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.GRAPH); });
                        _this.SUBRULE(_this.iri);
                    },
                },
            ]);
        });
        _this.GraphRef = _this.RULE('GraphRef', function () {
            log('GraphRef');
            _this.CONSUME(tokens_1.tokenMap.GRAPH);
            _this.SUBRULE(_this.iri);
        });
        _this.GraphRefAll = _this.RULE('GraphRefAll', function () {
            log('GraphRefAll');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.GraphRef); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DEFAULT); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.NAMED); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.ALL); } },
            ]);
        });
        _this.QuadPattern = _this.RULE('QuadPattern', function () {
            log('QuadPattern');
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.SUBRULE(_this.Quads);
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.QuadData = _this.RULE('QuadData', function () {
            log('QuadData');
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.SUBRULE(_this.Quads);
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.Quads = _this.RULE('Quads', function () {
            log('Quads');
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            _this.MANY(function () {
                _this.SUBRULE(_this.QuadsNotTriples);
                _this.OPTION1(function () { return _this.CONSUME(tokens_1.tokenMap.Period); });
                _this.OPTION2(function () { return _this.SUBRULE1(_this.TriplesTemplate); });
            });
        });
        _this.QuadsNotTriples = _this.RULE('QuadsNotTriples', function () {
            log('QuadsNotTriples');
            _this.CONSUME(tokens_1.tokenMap.GRAPH);
            _this.SUBRULE(_this.VarOrIri);
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.TriplesTemplate = _this.RULE('TriplesTemplate', function () {
            log('TriplesTemplate');
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(tokens_1.tokenMap.Period);
                _this.OPTION1(function () { return _this.SUBRULE(_this.TriplesTemplate); });
            });
        });
        _this.GroupGraphPattern = _this.RULE('GroupGraphPattern', function () {
            log('GroupGraphPattern');
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.SubSelect); } },
                { ALT: function () { return _this.SUBRULE(_this.GroupGraphPatternSub); } },
            ]);
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.GroupGraphPatternSub = _this.RULE('GroupGraphPatternSub', function () {
            log('GroupGraphPatternSub');
            _this.OPTION(function () { return _this.SUBRULE(_this.TriplesBlock); });
            _this.MANY(function () {
                _this.SUBRULE(_this.GraphPatternNotTriples);
                _this.OPTION1(function () { return _this.CONSUME(tokens_1.tokenMap.Period); });
                _this.OPTION2(function () { return _this.SUBRULE1(_this.TriplesBlock); });
            });
        });
        _this.TriplesBlock = _this.RULE('TriplesBlock', function () {
            log('TriplesBlock');
            _this.SUBRULE(_this.TriplesSameSubjectPath);
            _this.OPTION(function () {
                _this.CONSUME(tokens_1.tokenMap.Period);
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
            _this.CONSUME(tokens_1.tokenMap.OPTIONAL);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.GraphGraphPattern = _this.RULE('GraphGraphPattern', function () {
            log('GraphGraphPattern');
            _this.CONSUME(tokens_1.tokenMap.GRAPH);
            _this.SUBRULE(_this.VarOrIri);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.ServiceGraphPattern = _this.RULE('ServiceGraphPattern', function () {
            log('ServiceGraphPattern');
            _this.CONSUME(tokens_1.tokenMap.SERVICE);
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.SILENT); });
            _this.SUBRULE(_this.VarOrIri);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.Bind = _this.RULE('Bind', function () {
            log('Bind');
            _this.CONSUME(tokens_1.tokenMap.BIND);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.AS);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.InlineData = _this.RULE('InlineData', function () {
            log('InlineData');
            _this.CONSUME(tokens_1.tokenMap.VALUES);
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
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.MANY(function () { return _this.SUBRULE(_this.DataBlockValue); });
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.InlineDataFull = _this.RULE('InlineDataFull', function () {
            log('InlineDataFull');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.LParen);
                        _this.MANY(function () { return _this.SUBRULE(_this.Var); });
                        _this.CONSUME(tokens_1.tokenMap.RParen);
                    },
                },
            ]);
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.MANY1(function () {
                return _this.OR1([
                    {
                        ALT: function () {
                            _this.CONSUME1(tokens_1.tokenMap.LParen);
                            _this.MANY2(function () { return _this.SUBRULE(_this.DataBlockValue); });
                            _this.CONSUME1(tokens_1.tokenMap.RParen);
                        },
                    },
                    { ALT: function () { return _this.CONSUME1(tokens_1.tokenMap.NIL); } },
                ]);
            });
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.DataBlockValue = _this.RULE('DataBlockValue', function () {
            log('DataBlockValue');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.UNDEF); } },
            ]);
        });
        _this.MinusGraphPattern = _this.RULE('MinusGraphPattern', function () {
            log('MinusGraphPattern');
            _this.CONSUME(tokens_1.tokenMap.MINUS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.GroupOrUnionGraphPattern = _this.RULE('GroupOrUnionGraphPattern', function () {
            log('GroupOrUnionGraphPattern');
            _this.SUBRULE(_this.GroupGraphPattern);
            _this.MANY(function () {
                _this.CONSUME(tokens_1.tokenMap.UNION);
                _this.SUBRULE1(_this.GroupGraphPattern);
            });
        });
        _this.Filter = _this.RULE('Filter', function () {
            log('Filter');
            _this.CONSUME(tokens_1.tokenMap.FILTER);
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
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.LParen);
                        _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.DISTINCT); });
                        _this.SUBRULE(_this.Expression);
                        _this.MANY(function () {
                            _this.CONSUME(tokens_1.tokenMap.Comma);
                            _this.SUBRULE1(_this.Expression);
                        });
                        _this.CONSUME(tokens_1.tokenMap.RParen);
                    },
                },
            ]);
        });
        _this.ExpressionList = _this.RULE('ExpressionList', function () {
            log('ExpressionList');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.NIL); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.MANY(function () {
                            _this.CONSUME(tokens_1.tokenMap.Comma);
                            _this.SUBRULE1(_this.Expression);
                        });
                        _this.CONSUME(tokens_1.tokenMap.RParen);
                    },
                },
            ]);
        });
        _this.ConstructTemplate = _this.RULE('ConstructTemplate', function () {
            log('ConstructTemplate');
            _this.CONSUME(tokens_1.tokenMap.LCurly);
            _this.OPTION(function () { return _this.SUBRULE(_this.ConstructTriples); });
            _this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        _this.ConstructTriples = _this.RULE('ConstructTriples', function () {
            log('ConstructTriples');
            _this.SUBRULE(_this.TriplesSameSubject);
            _this.OPTION(function () {
                _this.CONSUME(tokens_1.tokenMap.Period);
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
                _this.CONSUME(tokens_1.tokenMap.Semicolon);
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
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.A); } },
            ]);
        });
        _this.ObjectList = _this.RULE('ObjectList', function () {
            log('ObjectList');
            _this.AT_LEAST_ONE_SEP({
                SEP: tokens_1.tokenMap.Comma,
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
                _this.CONSUME(tokens_1.tokenMap.Semicolon);
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
                SEP: tokens_1.tokenMap.Comma,
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
                SEP: tokens_1.tokenMap.Pipe,
                DEF: function () { return _this.SUBRULE(_this.PathSequence); },
            });
        });
        _this.PathSequence = _this.RULE('PathSequence', function () {
            log('PathSequence');
            _this.AT_LEAST_ONE_SEP({
                SEP: tokens_1.tokenMap.ForwardSlash,
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
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.Caret); });
            _this.SUBRULE(_this.PathElt);
        });
        _this.PathMod = _this.RULE('PathMod', function () {
            log('PathMod');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.QuestionMark); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.Star); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.Plus); } },
            ]);
        });
        _this.PathPrimary = _this.RULE('PathPrimary', function () {
            log('PathPrimary');
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.A); } },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.Bang);
                        _this.SUBRULE(_this.PathNegatedPropertySet);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.LParen);
                        _this.SUBRULE(_this.Path);
                        _this.CONSUME(tokens_1.tokenMap.RParen);
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
                        _this.CONSUME(tokens_1.tokenMap.LParen);
                        _this.MANY_SEP({
                            SEP: tokens_1.tokenMap.Pipe,
                            DEF: function () { return _this.SUBRULE1(_this.PathOneInPropertySet); },
                        });
                        _this.CONSUME(tokens_1.tokenMap.RParen);
                    },
                },
            ]);
        });
        _this.PathOneInPropertySet = _this.RULE('PathOneInPropertySet', function () {
            log('PathOneInPropertySet');
            _this.OPTION(function () { return _this.CONSUME(tokens_1.tokenMap.Caret); });
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.A); } },
            ]);
        });
        _this.Integer = _this.RULE('Integer', function () {
            log('Integer');
            _this.CONSUME(tokens_1.tokenMap.INTEGER);
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
            _this.CONSUME(tokens_1.tokenMap.LBracket);
            _this.SUBRULE(_this.PropertyListNotEmpty);
            _this.CONSUME(tokens_1.tokenMap.RBracket);
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
            _this.CONSUME(tokens_1.tokenMap.LBracket);
            _this.SUBRULE(_this.PropertyListPathNotEmpty);
            _this.CONSUME(tokens_1.tokenMap.RBracket);
        });
        _this.Collection = _this.RULE('Collection', function () {
            log('Collection');
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNode); });
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.CollectionPath = _this.RULE('CollectionPath', function () {
            log('CollectionPath');
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.AT_LEAST_ONE(function () { return _this.SUBRULE(_this.GraphNodePath); });
            _this.CONSUME(tokens_1.tokenMap.RParen);
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
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.VAR1); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.VAR2); } },
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
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.NIL); } },
            ]);
        });
        _this.Expression = _this.RULE('Expression', function () {
            log('Expression');
            _this.SUBRULE(_this.ConditionalOrExpression);
        });
        _this.ConditionalOrExpression = _this.RULE('ConditionalOrExpression', function () {
            log('ConditionalOrExpression');
            _this.AT_LEAST_ONE_SEP({
                SEP: tokens_1.tokenMap.LogicalOr,
                DEF: function () { return _this.SUBRULE(_this.ConditionalAndExpression); },
            });
        });
        _this.ConditionalAndExpression = _this.RULE('ConditionalAndExpression', function () {
            log('ConditionalAndExpression');
            _this.AT_LEAST_ONE_SEP({
                SEP: tokens_1.tokenMap.LogicalAnd,
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
                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.Equals); } },
                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.NotEquals); } },
                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.LessThan); } },
                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.GreaterThan); } },
                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.LessThanEquals); } },
                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.GreaterThanEquals); } },
                            ]);
                            _this.SUBRULE1(_this.NumericExpression);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(tokens_1.tokenMap.IN);
                            _this.SUBRULE(_this.ExpressionList);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(tokens_1.tokenMap.NOT_IN);
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
                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.Plus); } },
                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.Minus); } },
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
                                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.Star); } },
                                                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.ForwardSlash); } },
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
                            _this.CONSUME(tokens_1.tokenMap.Star);
                            _this.SUBRULE1(_this.UnaryExpression);
                        },
                    },
                    {
                        ALT: function () {
                            _this.CONSUME(tokens_1.tokenMap.ForwardSlash);
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
                        _this.CONSUME(tokens_1.tokenMap.Bang);
                        _this.SUBRULE(_this.PrimaryExpression);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.Plus);
                        _this.SUBRULE1(_this.PrimaryExpression);
                    },
                },
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.Minus);
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
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_STR = _this.RULE('BuiltInCall_STR', function () {
            log('BuiltInCall_STR');
            _this.CONSUME(tokens_1.tokenMap.STR);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_LANG = _this.RULE('BuiltInCall_LANG', function () {
            log('BuiltInCall_LANG');
            _this.CONSUME(tokens_1.tokenMap.LANG);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_LANGMATCHERS = _this.RULE('BuiltInCall_LANGMATCHERS', function () {
            log('BuiltInCall_LANGMATCHERS');
            _this.CONSUME(tokens_1.tokenMap.LANGMATCHERS);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_DATATYPE = _this.RULE('BuiltInCall_DATATYPE', function () {
            log('BuiltInCall_DATATYPE');
            _this.CONSUME(tokens_1.tokenMap.DATATYPE);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_BOUND = _this.RULE('BuiltInCall_BOUND', function () {
            log('BuiltInCall_BOUND');
            _this.CONSUME(tokens_1.tokenMap.BOUND);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Var);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_IRI = _this.RULE('BuiltInCall_IRI', function () {
            log('BuiltInCall_IRI');
            _this.CONSUME(tokens_1.tokenMap.IRI);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_URI = _this.RULE('BuiltInCall_URI', function () {
            log('BuiltInCall_URI');
            _this.CONSUME(tokens_1.tokenMap.URI);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_BNODE = _this.RULE('BuiltInCall_BNODE', function () {
            log('BuiltInCall_BNODE');
            _this.CONSUME(tokens_1.tokenMap.BNODE);
            _this.OR([
                {
                    ALT: function () {
                        _this.CONSUME(tokens_1.tokenMap.LParen);
                        _this.SUBRULE(_this.Expression);
                        _this.CONSUME(tokens_1.tokenMap.RParen);
                    },
                },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.NIL); } },
            ]);
        });
        _this.BuiltInCall_RAND = _this.RULE('BuiltInCall_RAND', function () {
            log('BuiltInCall_RAND');
            _this.CONSUME(tokens_1.tokenMap.RAND);
            _this.CONSUME(tokens_1.tokenMap.NIL);
        });
        _this.BuiltInCall_ABS = _this.RULE('BuiltInCall_ABS', function () {
            log('BuiltInCall_ABS');
            _this.CONSUME(tokens_1.tokenMap.ABS);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_CEIL = _this.RULE('BuiltInCall_CEIL', function () {
            log('BuiltInCall_CEIL');
            _this.CONSUME(tokens_1.tokenMap.CEIL);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_FLOOR = _this.RULE('BuiltInCall_FLOOR', function () {
            log('BuiltInCall_FLOOR');
            _this.CONSUME(tokens_1.tokenMap.FLOOR);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_ROUND = _this.RULE('BuiltInCall_ROUND', function () {
            log('BuiltInCall_ROUND');
            _this.CONSUME(tokens_1.tokenMap.ROUND);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_CONCAT = _this.RULE('BuiltInCall_CONCAT', function () {
            log('BuiltInCall_CONCAT');
            _this.CONSUME(tokens_1.tokenMap.CONCAT);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.BuiltInCall_STRLEN = _this.RULE('BuiltInCall_STRLEN', function () {
            log('BuiltInCall_STRLEN');
            _this.CONSUME(tokens_1.tokenMap.STRLEN);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_UCASE = _this.RULE('BuiltInCall_UCASE', function () {
            log('BuiltInCall_UCASE');
            _this.CONSUME(tokens_1.tokenMap.UCASE);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_LCASE = _this.RULE('BuiltInCall_LCASE', function () {
            log('BuiltInCall_LCASE');
            _this.CONSUME(tokens_1.tokenMap.LCASE);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_ENCODE_FOR_URI = _this.RULE('BuiltInCall_ENCODE_FOR_URI', function () {
            log('BuiltInCall_ENCODE_FOR_URI');
            _this.CONSUME(tokens_1.tokenMap.ENCODE_FOR_URI);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_CONTAINS = _this.RULE('BuiltInCall_CONTAINS', function () {
            log('BuiltInCall_CONTAINS');
            _this.CONSUME(tokens_1.tokenMap.CONTAINS);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_STRSTARTS = _this.RULE('BuiltInCall_STRSTARTS', function () {
            log('BuiltInCall_STRSTARTS');
            _this.CONSUME(tokens_1.tokenMap.STRSTARTS);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_STRENDS = _this.RULE('BuiltInCall_STRENDS', function () {
            log('BuiltInCall_STRENDS');
            _this.CONSUME(tokens_1.tokenMap.STRENDS);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_STRBEFORE = _this.RULE('BuiltInCall_STRBEFORE', function () {
            log('BuiltInCall_STRBEFORE');
            _this.CONSUME(tokens_1.tokenMap.STRBEFORE);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_STRAFTER = _this.RULE('BuiltInCall_STRAFTER', function () {
            log('BuiltInCall_STRAFTER');
            _this.CONSUME(tokens_1.tokenMap.STRAFTER);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_YEAR = _this.RULE('BuiltInCall_YEAR', function () {
            log('BuiltInCall_YEAR');
            _this.CONSUME(tokens_1.tokenMap.YEAR);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_MONTH = _this.RULE('BuiltInCall_MONTH', function () {
            log('BuiltInCall_MONTH');
            _this.CONSUME(tokens_1.tokenMap.MONTH);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_DAY = _this.RULE('BuiltInCall_DAY', function () {
            log('BuiltInCall_DAY');
            _this.CONSUME(tokens_1.tokenMap.DAY);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_HOURS = _this.RULE('BuiltInCall_HOURS', function () {
            log('BuiltInCall_HOURS');
            _this.CONSUME(tokens_1.tokenMap.HOURS);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_MINUTES = _this.RULE('BuiltInCall_MINUTES', function () {
            log('BuiltInCall_MINUTES');
            _this.CONSUME(tokens_1.tokenMap.MINUTES);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_SECONDS = _this.RULE('BuiltInCall_SECONDS', function () {
            log('BuiltInCall_SECONDS');
            _this.CONSUME(tokens_1.tokenMap.SECONDS);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_TIMEZONE = _this.RULE('BuiltInCall_TIMEZONE', function () {
            log('BuiltInCall_TIMEZONE');
            _this.CONSUME(tokens_1.tokenMap.TIMEZONE);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_TZ = _this.RULE('BuiltInCall_TZ', function () {
            log('BuiltInCall_TZ');
            _this.CONSUME(tokens_1.tokenMap.TZ);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_NOW = _this.RULE('BuiltInCall_NOW', function () {
            log('BuiltInCall_NOW');
            _this.CONSUME(tokens_1.tokenMap.NOW);
            _this.CONSUME(tokens_1.tokenMap.NIL);
        });
        _this.BuiltInCall_UUID = _this.RULE('BuiltInCall_UUID', function () {
            log('BuiltInCall_UUID');
            _this.CONSUME(tokens_1.tokenMap.UUID);
            _this.CONSUME(tokens_1.tokenMap.NIL);
        });
        _this.BuiltInCall_STRUUID = _this.RULE('BuiltInCall_STRUUID', function () {
            log('BuiltInCall_STRUUID');
            _this.CONSUME(tokens_1.tokenMap.STRUUID);
            _this.CONSUME(tokens_1.tokenMap.NIL);
        });
        _this.BuiltInCall_MD5 = _this.RULE('BuiltInCall_MD5', function () {
            log('BuiltInCall_MD5');
            _this.CONSUME(tokens_1.tokenMap.MD5);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_SHA1 = _this.RULE('BuiltInCall_SHA1', function () {
            log('BuiltInCall_SHA1');
            _this.CONSUME(tokens_1.tokenMap.SHA1);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_SHA256 = _this.RULE('BuiltInCall_SHA256', function () {
            log('BuiltInCall_SHA256');
            _this.CONSUME(tokens_1.tokenMap.SHA256);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_SHA384 = _this.RULE('BuiltInCall_SHA384', function () {
            log('BuiltInCall_SHA384');
            _this.CONSUME(tokens_1.tokenMap.SHA384);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_SHA512 = _this.RULE('BuiltInCall_SHA512', function () {
            log('BuiltInCall_SHA512');
            _this.CONSUME(tokens_1.tokenMap.SHA512);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_COALESCE = _this.RULE('BuiltInCall_COALESCE', function () {
            log('BuiltInCall_COALESCE');
            _this.CONSUME(tokens_1.tokenMap.COALESCE);
            _this.SUBRULE(_this.ExpressionList);
        });
        _this.BuiltInCall_IF = _this.RULE('BuiltInCall_IF', function () {
            log('BuiltInCall_IF');
            _this.CONSUME(tokens_1.tokenMap.IF);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME1(tokens_1.tokenMap.Comma);
            _this.SUBRULE2(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_STRLANG = _this.RULE('BuiltInCall_STRLANG', function () {
            log('BuiltInCall_STRLANG');
            _this.CONSUME(tokens_1.tokenMap.STRLANG);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_STRDT = _this.RULE('BuiltInCall_STRDT', function () {
            log('BuiltInCall_STRDT');
            _this.CONSUME(tokens_1.tokenMap.STRDT);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_sameTerm = _this.RULE('BuiltInCall_sameTerm', function () {
            log('BuiltInCall_sameTerm');
            _this.CONSUME(tokens_1.tokenMap.sameTerm);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_isIRI = _this.RULE('BuiltInCall_isIRI', function () {
            log('BuiltInCall_isIRI');
            _this.CONSUME(tokens_1.tokenMap.isIRI);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_isURI = _this.RULE('BuiltInCall_isURI', function () {
            log('BuiltInCall_isURI');
            _this.CONSUME(tokens_1.tokenMap.isURI);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_isBlank = _this.RULE('BuiltInCall_isBlank', function () {
            log('BuiltInCall_isBlank');
            _this.CONSUME(tokens_1.tokenMap.isBlank);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_isLiteral = _this.RULE('BuiltInCall_isLiteral', function () {
            log('BuiltInCall_isLiteral');
            _this.CONSUME(tokens_1.tokenMap.isLiteral);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.BuiltInCall_isNumeric = _this.RULE('BuiltInCall_isNumeric', function () {
            log('BuiltInCall_isNumeric');
            _this.CONSUME(tokens_1.tokenMap.isNumeric);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
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
            _this.CONSUME(tokens_1.tokenMap.REGEX);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME1(tokens_1.tokenMap.Comma);
                _this.SUBRULE2(_this.Expression);
            });
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.SubstringExpression = _this.RULE('SubstringExpression', function () {
            log('SubstringExpression');
            _this.CONSUME(tokens_1.tokenMap.SUBSTR);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME1(tokens_1.tokenMap.Comma);
                _this.SUBRULE2(_this.Expression);
            });
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.StrReplaceExpression = _this.RULE('StrReplaceExpression', function () {
            log('StrReplaceExpression');
            _this.CONSUME(tokens_1.tokenMap.REPLACE);
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.Comma);
            _this.SUBRULE1(_this.Expression);
            _this.CONSUME1(tokens_1.tokenMap.Comma);
            _this.SUBRULE2(_this.Expression);
            _this.OPTION(function () {
                _this.CONSUME2(tokens_1.tokenMap.Comma);
                _this.SUBRULE3(_this.Expression);
            });
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.ExistsFunction = _this.RULE('ExistsFunction', function () {
            log('ExistsFunction');
            _this.CONSUME(tokens_1.tokenMap.EXISTS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.NotExistsFunction = _this.RULE('NotExistsFunction', function () {
            log('NotExistsFunction');
            _this.CONSUME(tokens_1.tokenMap.NOT_EXISTS);
            _this.SUBRULE(_this.GroupGraphPattern);
        });
        _this.Count = _this.RULE('Count', function () {
            log('Count');
            _this.CONSUME(tokens_1.tokenMap.COUNT);
            _this.CONSUME1(tokens_1.tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokens_1.tokenMap.DISTINCT); });
            _this.OR([
                { ALT: function () { return _this.CONSUME3(tokens_1.tokenMap.Star); } },
                { ALT: function () { return _this.SUBRULE(_this.Expression); } },
            ]);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.Sum = _this.RULE('Sum', function () {
            log('Sum');
            _this.CONSUME(tokens_1.tokenMap.SUM);
            _this.CONSUME1(tokens_1.tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokens_1.tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.Min = _this.RULE('Min', function () {
            log('Min');
            _this.CONSUME(tokens_1.tokenMap.MIN);
            _this.CONSUME1(tokens_1.tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokens_1.tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.Max = _this.RULE('Max', function () {
            log('Max');
            _this.CONSUME(tokens_1.tokenMap.MAX);
            _this.CONSUME1(tokens_1.tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokens_1.tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.Avg = _this.RULE('Avg', function () {
            log('Avg');
            _this.CONSUME(tokens_1.tokenMap.AVG);
            _this.CONSUME1(tokens_1.tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokens_1.tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.Sample = _this.RULE('Sample', function () {
            log('Sample');
            _this.CONSUME(tokens_1.tokenMap.SAMPLE);
            _this.CONSUME1(tokens_1.tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokens_1.tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.GroupConcat = _this.RULE('GroupConcat', function () {
            log('GroupConcat');
            _this.CONSUME(tokens_1.tokenMap.GROUP_CONCAT);
            _this.CONSUME1(tokens_1.tokenMap.LParen);
            _this.OPTION(function () { return _this.CONSUME2(tokens_1.tokenMap.DISTINCT); });
            _this.SUBRULE(_this.Expression);
            _this.OPTION1(function () {
                _this.CONSUME(tokens_1.tokenMap.Semicolon);
                _this.CONSUME(tokens_1.tokenMap.SEPARATOR);
                _this.CONSUME(tokens_1.tokenMap.Equals);
                _this.SUBRULE(_this.String);
            });
            _this.CONSUME(tokens_1.tokenMap.RParen);
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
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.INTEGER); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DOUBLE); } },
            ]);
        });
        _this.NumericLiteralPositive = _this.RULE('NumericLiteralPositive', function () {
            log('NumericLiteralPositive');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.INTEGER_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DECIMAL_POSITIVE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DOUBLE_POSITIVE); } },
            ]);
        });
        _this.NumericLiteralNegative = _this.RULE('NumericLiteralNegative', function () {
            log('NumericLiteralNegative');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.INTEGER_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DECIMAL_NEGATIVE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DOUBLE_NEGATIVE); } },
            ]);
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            log('BooleanLiteral');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.TRUE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.FALSE); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            log('String');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL1); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL2); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG1); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG2); } },
            ]);
        });
        _this.iri = _this.RULE('iri', function () {
            log('iri');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            log('PrefixedName');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PNAME_NS); } },
            ]);
        });
        _this.BlankNode = _this.RULE('BlankNode', function () {
            log('BlankNode');
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.ANON); } },
            ]);
        });
        _this.lexer = new chevrotain_1.Lexer(tokenVocab);
        return _this;
    }
    return BaseSparqlParser;
}(chevrotain_1.Parser));
exports.BaseSparqlParser = BaseSparqlParser;
