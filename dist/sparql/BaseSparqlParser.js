import { tokenMap } from './tokens';
import { Parser, Lexer, } from 'chevrotain';
// @ts-ignore: debug logging
function log(...args) {
    // console.log(...args);
}
export class BaseSparqlParser extends Parser {
    constructor(options = {}, tokenVocab) {
        super(options.input || [], tokenVocab, Object.assign({ recoveryEnabled: true, outputCst: true }, options.config));
        this.tokenize = (document) => this.lexer.tokenize(document).tokens;
        this.parse = (document) => {
            this.input = this.lexer.tokenize(document).tokens;
            const cst = this.SparqlDoc();
            const errors = this.errors;
            return {
                errors,
                cst,
            };
        };
        // Grammar Rules
        this.SparqlDoc = this.RULE('SparqlDoc', () => {
            log('SparqlDoc');
            this.SUBRULE(this.Prologue);
            this.OR([
                { ALT: () => this.SUBRULE(this.QueryUnit) },
                { ALT: () => this.SUBRULE(this.UpdateUnit) },
            ]);
        });
        this.QueryUnit = this.RULE('QueryUnit', () => {
            log('QueryUnit');
            this.SUBRULE(this.Query);
        });
        this.Query = this.RULE('Query', () => {
            log('Query');
            this.OR([
                { ALT: () => this.SUBRULE(this.SelectQuery) },
                { ALT: () => this.SUBRULE(this.ConstructQuery) },
                { ALT: () => this.SUBRULE(this.DescribeQuery) },
                { ALT: () => this.SUBRULE(this.AskQuery) },
            ]);
            this.SUBRULE(this.ValuesClause);
        });
        this.Constant = this.RULE('Constant', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.SUBRULE(this.RDFLiteral) },
                { ALT: () => this.SUBRULE(this.NumericLiteral) },
                { ALT: () => this.SUBRULE(this.BooleanLiteral) },
            ]);
        });
        this.MaxLength = this.RULE('MaxLength', () => {
            this.CONSUME(tokenMap.MAX_LENGTH);
            this.CONSUME(tokenMap.INTEGER);
        });
        this.UpdateUnit = this.RULE('UpdateUnit', () => {
            log('UpdateUnit');
            this.SUBRULE(this.Update);
        });
        this.Prologue = this.RULE('Prologue', () => {
            log('Prologue');
            this.MANY(() => this.OR([
                { ALT: () => this.SUBRULE(this.BaseDecl) },
                { ALT: () => this.SUBRULE(this.PrefixDecl) },
            ]));
        });
        this.BaseDecl = this.RULE('BaseDecl', () => {
            log('BaseDecl');
            this.CONSUME(tokenMap.BASE);
            this.CONSUME(tokenMap.IRIREF);
        });
        this.PrefixDecl = this.RULE('PrefixDecl', () => {
            log('PrefixDecl');
            this.CONSUME(tokenMap.PREFIX);
            this.CONSUME(tokenMap.PNAME_NS);
            this.CONSUME(tokenMap.IRIREF);
        });
        this.SelectQuery = this.RULE('SelectQuery', () => {
            log('SelectQuery');
            this.SUBRULE(this.SelectClause);
            this.MANY(() => this.SUBRULE(this.DatasetClause));
            this.SUBRULE(this.WhereClause);
            this.SUBRULE(this.SolutionModifier);
        });
        this.SubSelect = this.RULE('SubSelect', () => {
            log('SubSelect');
            this.SUBRULE(this.SelectClause);
            this.SUBRULE(this.WhereClause);
            this.SUBRULE(this.SolutionModifier);
            this.SUBRULE(this.ValuesClause);
        });
        this.SelectClause = this.RULE('SelectClause', () => {
            log('SelectClause');
            this.CONSUME(tokenMap.SELECT);
            this.OPTION(() => this.OR([
                { ALT: () => this.CONSUME(tokenMap.DISTINCT) },
                { ALT: () => this.CONSUME(tokenMap.REDUCED) },
            ]));
            this.OR1([
                {
                    ALT: () => {
                        this.AT_LEAST_ONE(() => this.OR2([
                            { ALT: () => this.SUBRULE(this.Var) },
                            {
                                ALT: () => {
                                    this.CONSUME(tokenMap.LParen);
                                    this.SUBRULE(this.Expression);
                                    this.CONSUME(tokenMap.AS);
                                    this.SUBRULE1(this.Var);
                                    this.CONSUME(tokenMap.RParen);
                                },
                            },
                        ]));
                    },
                },
                { ALT: () => this.CONSUME(tokenMap.Star) },
            ]);
        });
        this.ConstructQuery = this.RULE('ConstructQuery', () => {
            this.CONSUME(tokenMap.CONSTRUCT);
            this.OR([
                {
                    ALT: () => {
                        this.SUBRULE(this.ConstructTemplate);
                        this.MANY(() => this.SUBRULE(this.DatasetClause));
                        this.SUBRULE(this.WhereClause);
                    },
                },
                {
                    ALT: () => {
                        this.MANY1(() => this.SUBRULE1(this.DatasetClause));
                        this.CONSUME(tokenMap.WHERE);
                        this.CONSUME(tokenMap.LCurly);
                        this.OPTION(() => this.SUBRULE(this.TriplesTemplate));
                        this.CONSUME(tokenMap.RCurly);
                    },
                },
            ]);
            this.SUBRULE(this.SolutionModifier);
        });
        this.DescribeQuery = this.RULE('DescribeQuery', () => {
            log('DescribeQuery');
            this.CONSUME(tokenMap.DESCRIBE);
            this.OR([
                {
                    ALT: () => {
                        this.AT_LEAST_ONE(() => this.SUBRULE(this.VarOrIri));
                    },
                },
                { ALT: () => this.CONSUME(tokenMap.Star) },
            ]);
            this.MANY(() => this.SUBRULE(this.DatasetClause));
            this.OPTION(() => this.SUBRULE(this.WhereClause));
            this.SUBRULE(this.SolutionModifier);
        });
        this.AskQuery = this.RULE('AskQuery', () => {
            log('AskQuery');
            this.CONSUME(tokenMap.ASK);
            this.MANY(() => this.SUBRULE(this.DatasetClause));
            this.SUBRULE(this.WhereClause);
            this.SUBRULE(this.SolutionModifier);
        });
        this.DatasetClause = this.RULE('DatasetClause', () => {
            log('DatasetClause');
            this.CONSUME(tokenMap.FROM);
            this.OR([
                { ALT: () => this.SUBRULE(this.DefaultGraphClause) },
                { ALT: () => this.SUBRULE(this.NamedGraphClause) },
            ]);
        });
        this.DefaultGraphClause = this.RULE('DefaultGraphClause', () => {
            log('DefaultGraphClause');
            this.SUBRULE(this.SourceSelector);
        });
        this.NamedGraphClause = this.RULE('NamedGraphClause', () => {
            log('NamedGraphClause');
            this.CONSUME(tokenMap.NAMED);
            this.SUBRULE(this.SourceSelector);
        });
        this.SourceSelector = this.RULE('SourceSelector', () => {
            log('SourceSelector');
            this.SUBRULE(this.iri);
        });
        this.WhereClause = this.RULE('WhereClause', () => {
            log('WhereClause');
            this.OPTION(() => this.CONSUME(tokenMap.WHERE));
            this.SUBRULE(this.GroupGraphPattern);
        });
        this.SolutionModifier = this.RULE('SolutionModifier', () => {
            log('SolutionModifier');
            this.OPTION(() => this.SUBRULE(this.GroupClause));
            this.OPTION1(() => this.SUBRULE(this.HavingClause));
            this.OPTION2(() => this.SUBRULE(this.OrderClause));
            this.OPTION3(() => this.SUBRULE(this.LimitOffsetClause));
        });
        this.GroupClause = this.RULE('GroupClause', () => {
            log('GroupClause');
            this.CONSUME(tokenMap.GroupBy);
            this.AT_LEAST_ONE(() => this.SUBRULE(this.GroupCondition));
        });
        this.GroupCondition = this.RULE('GroupCondition', () => {
            log('GroupCondition');
            this.OR([
                { ALT: () => this.SUBRULE(this.BuiltInCall) },
                { ALT: () => this.SUBRULE(this.FunctionCall) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.LParen);
                        this.SUBRULE(this.Expression);
                        this.OPTION(() => {
                            this.CONSUME(tokenMap.AS);
                            this.SUBRULE(this.Var);
                        });
                        this.CONSUME(tokenMap.RParen);
                    },
                },
                { ALT: () => this.SUBRULE1(this.Var) },
            ]);
        });
        this.HavingClause = this.RULE('HavingClause', () => {
            log('HavingClause');
            this.CONSUME(tokenMap.HAVING);
            this.SUBRULE(this.HavingCondition);
        });
        this.HavingCondition = this.RULE('HavingCondition', () => {
            log('HavingCondition');
            this.SUBRULE(this.Constraint);
        });
        this.OrderClause = this.RULE('OrderClause', () => {
            log('OrderClause');
            this.CONSUME(tokenMap.OrderBy);
            this.AT_LEAST_ONE(() => this.SUBRULE(this.OrderCondition));
        });
        this.OrderCondition = this.RULE('OrderCondition', () => {
            log('OrderCondition');
            this.OR([
                {
                    ALT: () => {
                        this.OR1([
                            { ALT: () => this.CONSUME(tokenMap.ASC) },
                            { ALT: () => this.CONSUME(tokenMap.DESC) },
                        ]);
                        this.SUBRULE(this.BrackettedExpression);
                    },
                },
                { ALT: () => this.SUBRULE(this.Constraint) },
                { ALT: () => this.SUBRULE(this.Var) },
            ]);
        });
        this.LimitOffsetClause = this.RULE('LimitOffsetClause', () => {
            log('LimitOffsetClause');
            this.OR([
                {
                    ALT: () => {
                        this.SUBRULE(this.LimitClause);
                        this.OPTION(() => this.SUBRULE(this.OffsetClause));
                    },
                },
                {
                    ALT: () => {
                        this.SUBRULE1(this.OffsetClause);
                        this.OPTION1(() => this.SUBRULE1(this.LimitClause));
                    },
                },
            ]);
        });
        this.OffsetClause = this.RULE('OffsetClause', () => {
            log('OffsetClause');
            this.CONSUME(tokenMap.OFFSET);
            this.CONSUME(tokenMap.INTEGER);
        });
        this.LimitClause = this.RULE('LimitClause', () => {
            log('LimitClause');
            this.CONSUME(tokenMap.LIMIT);
            this.CONSUME(tokenMap.INTEGER);
        });
        this.ValuesClause = this.RULE('ValuesClause', () => {
            log('ValuesClause');
            this.OPTION(() => {
                this.CONSUME(tokenMap.VALUES);
                this.SUBRULE(this.DataBlock);
            });
        });
        this.Update = this.RULE('Update', () => {
            log('Update');
            this.SUBRULE(this.Prologue);
            this.OPTION(() => {
                this.SUBRULE(this.Update1);
                this.OPTION1(() => {
                    this.CONSUME(tokenMap.Semicolon);
                    this.SUBRULE(this.Update);
                });
            });
        });
        this.Update1 = this.RULE('Update1', () => {
            log('Update1');
            this.OR([
                { ALT: () => this.SUBRULE(this.Load) },
                { ALT: () => this.SUBRULE(this.Clear) },
                { ALT: () => this.SUBRULE(this.Drop) },
                { ALT: () => this.SUBRULE(this.Add) },
                { ALT: () => this.SUBRULE(this.Move) },
                { ALT: () => this.SUBRULE(this.Copy) },
                { ALT: () => this.SUBRULE(this.Create) },
                { ALT: () => this.SUBRULE(this.InsertData) },
                { ALT: () => this.SUBRULE(this.DeleteData) },
                { ALT: () => this.SUBRULE(this.DeleteWhere) },
                { ALT: () => this.SUBRULE(this.Modify) },
            ]);
        });
        this.Load = this.RULE('Load', () => {
            log('Load');
            this.CONSUME(tokenMap.LOAD);
            this.OPTION(() => this.CONSUME(tokenMap.SILENT));
            this.SUBRULE(this.iri);
            this.OPTION1(() => {
                this.CONSUME(tokenMap.INTO);
                this.SUBRULE(this.GraphRef);
            });
        });
        this.Clear = this.RULE('Clear', () => {
            log('Clear');
            this.CONSUME(tokenMap.CLEAR);
            this.OPTION(() => this.CONSUME(tokenMap.SILENT));
            this.SUBRULE(this.GraphRefAll);
        });
        this.Drop = this.RULE('Drop', () => {
            log('Drop');
            this.CONSUME(tokenMap.DROP);
            this.OPTION(() => this.CONSUME(tokenMap.SILENT));
            this.SUBRULE(this.GraphRefAll);
        });
        this.Create = this.RULE('Create', () => {
            log('Create');
            this.CONSUME(tokenMap.CREATE);
            this.OPTION(() => this.CONSUME(tokenMap.SILENT));
            this.SUBRULE(this.GraphRefAll);
        });
        this.Add = this.RULE('Add', () => {
            log('Add');
            this.CONSUME(tokenMap.ADD);
            this.OPTION(() => this.CONSUME(tokenMap.SILENT));
            this.SUBRULE(this.GraphOrDefault);
            this.CONSUME(tokenMap.TO);
            this.SUBRULE1(this.GraphOrDefault);
        });
        this.Move = this.RULE('Move', () => {
            log('Move');
            this.CONSUME(tokenMap.MOVE);
            this.OPTION(() => this.CONSUME(tokenMap.SILENT));
            this.SUBRULE(this.GraphOrDefault);
            this.CONSUME(tokenMap.TO);
            this.SUBRULE1(this.GraphOrDefault);
        });
        this.Copy = this.RULE('Copy', () => {
            log('Copy');
            this.CONSUME(tokenMap.COPY);
            this.OPTION(() => this.CONSUME(tokenMap.SILENT));
            this.SUBRULE(this.GraphOrDefault);
            this.CONSUME(tokenMap.TO);
            this.SUBRULE1(this.GraphOrDefault);
        });
        this.InsertData = this.RULE('InsertData', () => {
            log('InsertData');
            this.CONSUME(tokenMap.INSERT_DATA);
            this.SUBRULE(this.QuadData);
        });
        this.DeleteData = this.RULE('DeleteData', () => {
            log('DeleteData');
            this.CONSUME(tokenMap.DELETE_DATA);
            this.SUBRULE(this.QuadData);
        });
        this.DeleteWhere = this.RULE('DeleteWhere', () => {
            log('DeleteWhere');
            this.CONSUME(tokenMap.DELETE_WHERE);
            this.SUBRULE(this.QuadPattern);
        });
        this.Modify = this.RULE('Modify', () => {
            log('Modify');
            this.OPTION(() => {
                this.CONSUME(tokenMap.WITH);
                this.SUBRULE(this.iri);
            });
            this.OR([
                {
                    ALT: () => {
                        this.SUBRULE(this.DeleteClause);
                        this.OPTION1(() => this.SUBRULE(this.InsertClause));
                    },
                },
                { ALT: () => this.SUBRULE1(this.InsertClause) },
            ]);
            this.MANY(() => this.SUBRULE(this.UsingClause));
            this.CONSUME(tokenMap.WHERE);
            this.SUBRULE(this.GroupGraphPattern);
        });
        this.DeleteClause = this.RULE('DeleteClause', () => {
            log('DeleteClause');
            this.CONSUME(tokenMap.DELETE);
            this.SUBRULE(this.QuadPattern);
        });
        this.InsertClause = this.RULE('InsertClause', () => {
            log('InsertClause');
            this.CONSUME(tokenMap.INSERT);
            this.SUBRULE(this.QuadPattern);
        });
        this.UsingClause = this.RULE('UsingClause', () => {
            log('UsingClause');
            this.CONSUME(tokenMap.USING);
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.NAMED);
                        this.SUBRULE1(this.iri);
                    },
                },
            ]);
        });
        this.GraphOrDefault = this.RULE('GraphOrDefault', () => {
            log('GraphOrDefault');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.DEFAULT) },
                {
                    ALT: () => {
                        this.OPTION(() => this.CONSUME(tokenMap.GRAPH));
                        this.SUBRULE(this.iri);
                    },
                },
            ]);
        });
        this.GraphRef = this.RULE('GraphRef', () => {
            log('GraphRef');
            this.CONSUME(tokenMap.GRAPH);
            this.SUBRULE(this.iri);
        });
        this.GraphRefAll = this.RULE('GraphRefAll', () => {
            log('GraphRefAll');
            this.OR([
                { ALT: () => this.SUBRULE(this.GraphRef) },
                { ALT: () => this.CONSUME(tokenMap.DEFAULT) },
                { ALT: () => this.CONSUME(tokenMap.NAMED) },
                { ALT: () => this.CONSUME(tokenMap.ALL) },
            ]);
        });
        this.QuadPattern = this.RULE('QuadPattern', () => {
            log('QuadPattern');
            this.CONSUME(tokenMap.LCurly);
            this.SUBRULE(this.Quads);
            this.CONSUME(tokenMap.RCurly);
        });
        this.QuadData = this.RULE('QuadData', () => {
            log('QuadData');
            this.CONSUME(tokenMap.LCurly);
            this.SUBRULE(this.Quads);
            this.CONSUME(tokenMap.RCurly);
        });
        this.Quads = this.RULE('Quads', () => {
            log('Quads');
            this.OPTION(() => this.SUBRULE(this.TriplesTemplate));
            this.MANY(() => {
                this.SUBRULE(this.QuadsNotTriples);
                this.OPTION1(() => this.CONSUME(tokenMap.Period));
                this.OPTION2(() => this.SUBRULE1(this.TriplesTemplate));
            });
        });
        this.QuadsNotTriples = this.RULE('QuadsNotTriples', () => {
            log('QuadsNotTriples');
            this.CONSUME(tokenMap.GRAPH);
            this.SUBRULE(this.VarOrIri);
            this.CONSUME(tokenMap.LCurly);
            this.OPTION(() => this.SUBRULE(this.TriplesTemplate));
            this.CONSUME(tokenMap.RCurly);
        });
        this.TriplesTemplate = this.RULE('TriplesTemplate', () => {
            log('TriplesTemplate');
            this.SUBRULE(this.TriplesSameSubject);
            this.OPTION(() => {
                this.CONSUME(tokenMap.Period);
                this.OPTION1(() => this.SUBRULE(this.TriplesTemplate));
            });
        });
        this.GroupGraphPattern = this.RULE('GroupGraphPattern', () => {
            log('GroupGraphPattern');
            this.CONSUME(tokenMap.LCurly);
            this.OR([
                { ALT: () => this.SUBRULE(this.SubSelect) },
                { ALT: () => this.SUBRULE(this.GroupGraphPatternSub) },
            ]);
            this.CONSUME(tokenMap.RCurly);
        });
        this.GroupGraphPatternSub = this.RULE('GroupGraphPatternSub', () => {
            log('GroupGraphPatternSub');
            this.OPTION(() => this.SUBRULE(this.TriplesBlock));
            this.MANY(() => {
                this.SUBRULE(this.GraphPatternNotTriples);
                this.OPTION1(() => this.CONSUME(tokenMap.Period));
                this.OPTION2(() => this.SUBRULE1(this.TriplesBlock));
            });
        });
        this.TriplesBlock = this.RULE('TriplesBlock', () => {
            log('TriplesBlock');
            this.SUBRULE(this.TriplesSameSubjectPath);
            this.OPTION(() => {
                this.CONSUME(tokenMap.Period);
                this.OPTION1(() => this.SUBRULE(this.TriplesBlock));
            });
        });
        this.GraphPatternNotTriples = this.RULE('GraphPatternNotTriples', () => {
            log('GraphPatternNotTriples');
            this.OR([
                { ALT: () => this.SUBRULE(this.GroupOrUnionGraphPattern) },
                { ALT: () => this.SUBRULE(this.OptionalGraphPattern) },
                { ALT: () => this.SUBRULE(this.MinusGraphPattern) },
                { ALT: () => this.SUBRULE(this.GraphGraphPattern) },
                { ALT: () => this.SUBRULE(this.ServiceGraphPattern) },
                { ALT: () => this.SUBRULE(this.Filter) },
                { ALT: () => this.SUBRULE(this.Bind) },
                { ALT: () => this.SUBRULE(this.InlineData) },
            ]);
        });
        this.OptionalGraphPattern = this.RULE('OptionalGraphPattern', () => {
            log('OptionalGraphPattern');
            this.CONSUME(tokenMap.OPTIONAL);
            this.SUBRULE(this.GroupGraphPattern);
        });
        this.GraphGraphPattern = this.RULE('GraphGraphPattern', () => {
            log('GraphGraphPattern');
            this.CONSUME(tokenMap.GRAPH);
            this.SUBRULE(this.VarOrIri);
            this.SUBRULE(this.GroupGraphPattern);
        });
        this.ServiceGraphPattern = this.RULE('ServiceGraphPattern', () => {
            log('ServiceGraphPattern');
            this.CONSUME(tokenMap.SERVICE);
            this.OPTION(() => this.CONSUME(tokenMap.SILENT));
            this.SUBRULE(this.VarOrIri);
            this.SUBRULE(this.GroupGraphPattern);
        });
        this.Bind = this.RULE('Bind', () => {
            log('Bind');
            this.CONSUME(tokenMap.BIND);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.AS);
            this.SUBRULE(this.Var);
            this.CONSUME(tokenMap.RParen);
        });
        this.InlineData = this.RULE('InlineData', () => {
            log('InlineData');
            this.CONSUME(tokenMap.VALUES);
            this.SUBRULE(this.DataBlock);
        });
        this.DataBlock = this.RULE('DataBlock', () => {
            log('DataBlock');
            this.OR([
                { ALT: () => this.SUBRULE(this.InlineDataOneVar) },
                { ALT: () => this.SUBRULE(this.InlineDataFull) },
            ]);
        });
        this.InlineDataOneVar = this.RULE('InlineDataOneVar', () => {
            log('InlineDataOneVar');
            this.SUBRULE(this.Var);
            this.CONSUME(tokenMap.LCurly);
            this.MANY(() => this.SUBRULE(this.DataBlockValue));
            this.CONSUME(tokenMap.RCurly);
        });
        this.InlineDataFull = this.RULE('InlineDataFull', () => {
            log('InlineDataFull');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.NIL) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.LParen);
                        this.MANY(() => this.SUBRULE(this.Var));
                        this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
            this.CONSUME(tokenMap.LCurly);
            this.MANY1(() => this.OR1([
                {
                    ALT: () => {
                        this.CONSUME1(tokenMap.LParen);
                        this.MANY2(() => this.SUBRULE(this.DataBlockValue));
                        this.CONSUME1(tokenMap.RParen);
                    },
                },
                { ALT: () => this.CONSUME1(tokenMap.NIL) },
            ]));
            this.CONSUME(tokenMap.RCurly);
        });
        this.DataBlockValue = this.RULE('DataBlockValue', () => {
            log('DataBlockValue');
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.SUBRULE(this.RDFLiteral) },
                { ALT: () => this.SUBRULE(this.NumericLiteral) },
                { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                { ALT: () => this.CONSUME(tokenMap.UNDEF) },
            ]);
        });
        this.MinusGraphPattern = this.RULE('MinusGraphPattern', () => {
            log('MinusGraphPattern');
            this.CONSUME(tokenMap.MINUS);
            this.SUBRULE(this.GroupGraphPattern);
        });
        this.GroupOrUnionGraphPattern = this.RULE('GroupOrUnionGraphPattern', () => {
            log('GroupOrUnionGraphPattern');
            this.SUBRULE(this.GroupGraphPattern);
            this.MANY(() => {
                this.CONSUME(tokenMap.UNION);
                this.SUBRULE1(this.GroupGraphPattern);
            });
        });
        this.Filter = this.RULE('Filter', () => {
            log('Filter');
            this.CONSUME(tokenMap.FILTER);
            this.SUBRULE(this.Constraint);
        });
        this.Constraint = this.RULE('Constraint', () => {
            log('Constraint');
            this.OR([
                { ALT: () => this.SUBRULE(this.BrackettedExpression) },
                { ALT: () => this.SUBRULE(this.BuiltInCall) },
                { ALT: () => this.SUBRULE(this.FunctionCall) },
            ]);
        });
        this.FunctionCall = this.RULE('FunctionCall', () => {
            log('FunctionCall');
            this.SUBRULE(this.iri);
            this.SUBRULE(this.ArgList);
        });
        this.ArgList = this.RULE('ArgList', () => {
            log('ArgList');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.NIL) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.LParen);
                        this.OPTION(() => this.CONSUME(tokenMap.DISTINCT));
                        this.SUBRULE(this.Expression);
                        this.MANY(() => {
                            this.CONSUME(tokenMap.Comma);
                            this.SUBRULE1(this.Expression);
                        });
                        this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
        });
        this.ExpressionList = this.RULE('ExpressionList', () => {
            log('ExpressionList');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.NIL) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.LParen);
                        this.SUBRULE(this.Expression);
                        this.MANY(() => {
                            this.CONSUME(tokenMap.Comma);
                            this.SUBRULE1(this.Expression);
                        });
                        this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
        });
        this.ConstructTemplate = this.RULE('ConstructTemplate', () => {
            log('ConstructTemplate');
            this.CONSUME(tokenMap.LCurly);
            this.OPTION(() => this.SUBRULE(this.ConstructTriples));
            this.CONSUME(tokenMap.RCurly);
        });
        this.ConstructTriples = this.RULE('ConstructTriples', () => {
            log('ConstructTriples');
            this.SUBRULE(this.TriplesSameSubject);
            this.OPTION(() => {
                this.CONSUME(tokenMap.Period);
                this.OPTION1(() => this.SUBRULE(this.ConstructTriples));
            });
        });
        this.TriplesSameSubject = this.RULE('TriplesSameSubject', () => {
            log('TriplesSameSubject');
            this.OR([
                {
                    ALT: () => {
                        this.SUBRULE(this.VarOrTerm);
                        this.SUBRULE(this.PropertyListNotEmpty);
                    },
                },
                {
                    ALT: () => {
                        this.SUBRULE(this.TriplesNode);
                        this.SUBRULE(this.PropertyList);
                    },
                },
            ]);
        });
        this.PropertyList = this.RULE('PropertyList', () => {
            log('PropertyList');
            this.OPTION(() => this.SUBRULE(this.PropertyListNotEmpty));
        });
        this.PropertyListNotEmpty = this.RULE('PropertyListNotEmpty', () => {
            log('PropertyListNotEmpty');
            this.SUBRULE(this.Verb);
            this.SUBRULE(this.ObjectList);
            this.MANY(() => {
                this.CONSUME(tokenMap.Semicolon);
                this.OPTION(() => {
                    this.SUBRULE1(this.Verb);
                    this.SUBRULE1(this.ObjectList);
                });
            });
        });
        this.Verb = this.RULE('Verb', () => {
            log('Verb');
            this.OR([
                { ALT: () => this.SUBRULE(this.VarOrIri) },
                { ALT: () => this.CONSUME(tokenMap.A) },
            ]);
        });
        this.ObjectList = this.RULE('ObjectList', () => {
            log('ObjectList');
            this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.Comma,
                DEF: () => this.SUBRULE(this.Object),
            });
        });
        this.Object = this.RULE('Object', () => {
            log('Object');
            this.SUBRULE(this.GraphNode);
        });
        this.TriplesSameSubjectPath = this.RULE('TriplesSameSubjectPath', () => {
            log('TriplesSameSubjectPath');
            this.OR([
                {
                    ALT: () => {
                        this.SUBRULE(this.VarOrTerm);
                        this.SUBRULE(this.PropertyListPathNotEmpty);
                    },
                },
                {
                    ALT: () => {
                        this.SUBRULE(this.TriplesNodePath);
                        this.SUBRULE(this.PropertyListPath);
                    },
                },
            ]);
        });
        this.PropertyListPath = this.RULE('PropertyListPath', () => {
            log('PropertyListPath');
            this.OPTION(() => this.SUBRULE(this.PropertyListPathNotEmpty));
        });
        this.PropertyListPathNotEmpty = this.RULE('PropertyListPathNotEmpty', () => {
            log('PropertyListPathNotEmpty');
            this.OR([
                { ALT: () => this.SUBRULE(this.VerbPath) },
                { ALT: () => this.SUBRULE(this.VerbSimple) },
            ]);
            this.SUBRULE(this.ObjectListPath);
            this.MANY(() => {
                this.CONSUME(tokenMap.Semicolon);
                this.OPTION(() => {
                    this.OR1([
                        { ALT: () => this.SUBRULE1(this.VerbPath) },
                        { ALT: () => this.SUBRULE1(this.VerbSimple) },
                    ]);
                    this.SUBRULE1(this.ObjectListPath);
                });
            });
        });
        this.VerbPath = this.RULE('VerbPath', () => {
            log('VerbPath');
            this.SUBRULE(this.Path);
        });
        this.VerbSimple = this.RULE('VerbSimple', () => {
            log('VerbSimple');
            this.SUBRULE(this.Var);
        });
        this.ObjectListPath = this.RULE('ObjectListPath', () => {
            log('ObjectListPath');
            this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.Comma,
                DEF: () => this.SUBRULE(this.ObjectPath),
            });
        });
        this.ObjectPath = this.RULE('ObjectPath', () => {
            log('ObjectPath');
            this.SUBRULE(this.GraphNodePath);
        });
        this.Path = this.RULE('Path', () => {
            log('Path');
            this.SUBRULE(this.PathAlternative);
        });
        this.PathAlternative = this.RULE('PathAlternative', () => {
            log('PathAlternative');
            this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.Pipe,
                DEF: () => this.SUBRULE(this.PathSequence),
            });
        });
        this.PathSequence = this.RULE('PathSequence', () => {
            log('PathSequence');
            this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.ForwardSlash,
                DEF: () => this.SUBRULE(this.PathEltOrInverse),
            });
        });
        this.PathElt = this.RULE('PathElt', () => {
            log('PathElt');
            this.SUBRULE(this.PathPrimary);
            this.OPTION(() => this.SUBRULE(this.PathMod));
        });
        this.PathEltOrInverse = this.RULE('PathEltOrInverse', () => {
            log('PathEltOrInverse');
            this.OPTION(() => this.CONSUME(tokenMap.Caret));
            this.SUBRULE(this.PathElt);
        });
        this.PathMod = this.RULE('PathMod', () => {
            log('PathMod');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.QuestionMark) },
                { ALT: () => this.CONSUME(tokenMap.Star) },
                { ALT: () => this.CONSUME(tokenMap.Plus) },
            ]);
        });
        this.PathPrimary = this.RULE('PathPrimary', () => {
            log('PathPrimary');
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.CONSUME(tokenMap.A) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.Bang);
                        this.SUBRULE(this.PathNegatedPropertySet);
                    },
                },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.LParen);
                        this.SUBRULE(this.Path);
                        this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
        });
        this.PathNegatedPropertySet = this.RULE('PathNegatedPropertySet', () => {
            log('PathNegatedPropertySet');
            this.OR([
                { ALT: () => this.SUBRULE(this.PathOneInPropertySet) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.LParen);
                        this.MANY_SEP({
                            SEP: tokenMap.Pipe,
                            DEF: () => this.SUBRULE1(this.PathOneInPropertySet),
                        });
                        this.CONSUME(tokenMap.RParen);
                    },
                },
            ]);
        });
        this.PathOneInPropertySet = this.RULE('PathOneInPropertySet', () => {
            log('PathOneInPropertySet');
            this.OPTION(() => this.CONSUME(tokenMap.Caret));
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.CONSUME(tokenMap.A) },
            ]);
        });
        this.Integer = this.RULE('Integer', () => {
            log('Integer');
            this.CONSUME(tokenMap.INTEGER);
        });
        this.TriplesNode = this.RULE('TriplesNode', () => {
            log('TriplesNode');
            this.OR([
                { ALT: () => this.SUBRULE(this.Collection) },
                { ALT: () => this.SUBRULE(this.BlankNodePropertyList) },
            ]);
        });
        this.BlankNodePropertyList = this.RULE('BlankNodePropertyList', () => {
            log('BlankNodePropertyList');
            this.CONSUME(tokenMap.LBracket);
            this.SUBRULE(this.PropertyListNotEmpty);
            this.CONSUME(tokenMap.RBracket);
        });
        this.TriplesNodePath = this.RULE('TriplesNodePath', () => {
            log('TriplesNodePath');
            this.OR([
                { ALT: () => this.SUBRULE(this.CollectionPath) },
                { ALT: () => this.SUBRULE(this.BlankNodePropertyListPath) },
            ]);
        });
        this.BlankNodePropertyListPath = this.RULE('BlankNodePropertyListPath', () => {
            log('BlankNodePropertyListPath');
            this.CONSUME(tokenMap.LBracket);
            this.SUBRULE(this.PropertyListPathNotEmpty);
            this.CONSUME(tokenMap.RBracket);
        });
        this.Collection = this.RULE('Collection', () => {
            log('Collection');
            this.CONSUME(tokenMap.LParen);
            this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNode));
            this.CONSUME(tokenMap.RParen);
        });
        this.CollectionPath = this.RULE('CollectionPath', () => {
            log('CollectionPath');
            this.CONSUME(tokenMap.LParen);
            this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNodePath));
            this.CONSUME(tokenMap.RParen);
        });
        this.GraphNode = this.RULE('GraphNode', () => {
            log('GraphNode');
            this.OR([
                { ALT: () => this.SUBRULE(this.VarOrTerm) },
                { ALT: () => this.SUBRULE(this.TriplesNode) },
            ]);
        });
        this.GraphNodePath = this.RULE('GraphNodePath', () => {
            log('GraphNodePath');
            this.OR([
                { ALT: () => this.SUBRULE(this.VarOrTerm) },
                { ALT: () => this.SUBRULE(this.TriplesNodePath) },
            ]);
        });
        this.VarOrTerm = this.RULE('VarOrTerm', () => {
            log('VarOrTerm');
            this.OR([
                { ALT: () => this.SUBRULE(this.Var) },
                { ALT: () => this.SUBRULE(this.GraphTerm) },
            ]);
        });
        this.VarOrIri = this.RULE('VarOrIri', () => {
            log('VarOrIri');
            this.OR([
                { ALT: () => this.SUBRULE(this.Var) },
                { ALT: () => this.SUBRULE(this.iri) },
            ]);
        });
        this.Var = this.RULE('Var', () => {
            log('Var');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.VAR1) },
                { ALT: () => this.CONSUME(tokenMap.VAR2) },
            ]);
        });
        this.GraphTerm = this.RULE('GraphTerm', () => {
            log('GraphTerm');
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.SUBRULE(this.RDFLiteral) },
                { ALT: () => this.SUBRULE(this.NumericLiteral) },
                { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                { ALT: () => this.SUBRULE(this.BlankNode) },
                { ALT: () => this.CONSUME(tokenMap.NIL) },
            ]);
        });
        this.Expression = this.RULE('Expression', () => {
            log('Expression');
            this.SUBRULE(this.ConditionalOrExpression);
        });
        this.ConditionalOrExpression = this.RULE('ConditionalOrExpression', () => {
            log('ConditionalOrExpression');
            this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.LogicalOr,
                DEF: () => this.SUBRULE(this.ConditionalAndExpression),
            });
        });
        this.ConditionalAndExpression = this.RULE('ConditionalAndExpression', () => {
            log('ConditionalAndExpression');
            this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.LogicalAnd,
                DEF: () => this.SUBRULE(this.ValueLogical),
            });
        });
        this.ValueLogical = this.RULE('ValueLogical', () => {
            log('ValueLogical');
            this.SUBRULE(this.RelationalExpression);
        });
        this.RelationalExpression = this.RULE('RelationalExpression', () => {
            log('RelationalExpression');
            this.SUBRULE(this.NumericExpression);
            this.OPTION(() => this.OR([
                {
                    ALT: () => {
                        this.OR1([
                            { ALT: () => this.CONSUME(tokenMap.Equals) },
                            { ALT: () => this.CONSUME(tokenMap.NotEquals) },
                            { ALT: () => this.CONSUME(tokenMap.LessThan) },
                            { ALT: () => this.CONSUME(tokenMap.GreaterThan) },
                            { ALT: () => this.CONSUME(tokenMap.LessThanEquals) },
                            { ALT: () => this.CONSUME(tokenMap.GreaterThanEquals) },
                        ]);
                        this.SUBRULE1(this.NumericExpression);
                    },
                },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.IN);
                        this.SUBRULE(this.ExpressionList);
                    },
                },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.NOT_IN);
                        this.SUBRULE1(this.ExpressionList);
                    },
                },
            ]));
        });
        this.NumericExpression = this.RULE('NumericExpression', () => {
            log('NumericExpression');
            this.SUBRULE(this.AdditiveExpression);
        });
        this.AdditiveExpression = this.RULE('AdditiveExpression', () => {
            log('AdditiveExpression');
            this.SUBRULE(this.MultiplicativeExpression);
            this.MANY(() => this.OR([
                {
                    ALT: () => {
                        this.OR1([
                            { ALT: () => this.CONSUME(tokenMap.Plus) },
                            { ALT: () => this.CONSUME(tokenMap.Minus) },
                        ]);
                        this.SUBRULE1(this.MultiplicativeExpression);
                    },
                },
                {
                    ALT: () => {
                        this.OR2([
                            { ALT: () => this.SUBRULE(this.NumericLiteralPositive) },
                            { ALT: () => this.SUBRULE(this.NumericLiteralNegative) },
                        ]);
                        this.MANY1(() => this.OR3([
                            {
                                ALT: () => {
                                    this.OR4([
                                        { ALT: () => this.CONSUME(tokenMap.Star) },
                                        { ALT: () => this.CONSUME(tokenMap.ForwardSlash) },
                                    ]);
                                    this.SUBRULE1(this.UnaryExpression);
                                },
                            },
                        ]));
                    },
                },
            ]));
        });
        this.MultiplicativeExpression = this.RULE('MultiplicativeExpression', () => {
            log('MultiplicativeExpression');
            this.SUBRULE(this.UnaryExpression);
            this.MANY(() => this.OR([
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.Star);
                        this.SUBRULE1(this.UnaryExpression);
                    },
                },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.ForwardSlash);
                        this.SUBRULE2(this.UnaryExpression);
                    },
                },
            ]));
        });
        this.UnaryExpression = this.RULE('UnaryExpression', () => {
            log('UnaryExpression');
            this.OR([
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.Bang);
                        this.SUBRULE(this.PrimaryExpression);
                    },
                },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.Plus);
                        this.SUBRULE1(this.PrimaryExpression);
                    },
                },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.Minus);
                        this.SUBRULE2(this.PrimaryExpression);
                    },
                },
                { ALT: () => this.SUBRULE3(this.PrimaryExpression) },
            ]);
        });
        this.PrimaryExpression = this.RULE('PrimaryExpression', () => {
            log('PrimaryExpression');
            this.OR([
                { ALT: () => this.SUBRULE(this.BrackettedExpression) },
                { ALT: () => this.SUBRULE(this.BuiltInCall) },
                { ALT: () => this.SUBRULE(this.iriOrFunction) },
                { ALT: () => this.SUBRULE(this.RDFLiteral) },
                { ALT: () => this.SUBRULE(this.NumericLiteral) },
                { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                { ALT: () => this.SUBRULE(this.Var) },
            ]);
        });
        this.BrackettedExpression = this.RULE('BrackettedExpression', () => {
            log('BrackettedExpression');
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_STR = this.RULE('BuiltInCall_STR', () => {
            log('BuiltInCall_STR');
            this.CONSUME(tokenMap.STR);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_LANG = this.RULE('BuiltInCall_LANG', () => {
            log('BuiltInCall_LANG');
            this.CONSUME(tokenMap.LANG);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_LANGMATCHERS = this.RULE('BuiltInCall_LANGMATCHERS', () => {
            log('BuiltInCall_LANGMATCHERS');
            this.CONSUME(tokenMap.LANGMATCHERS);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_DATATYPE = this.RULE('BuiltInCall_DATATYPE', () => {
            log('BuiltInCall_DATATYPE');
            this.CONSUME(tokenMap.DATATYPE);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_BOUND = this.RULE('BuiltInCall_BOUND', () => {
            log('BuiltInCall_BOUND');
            this.CONSUME(tokenMap.BOUND);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Var);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_IRI = this.RULE('BuiltInCall_IRI', () => {
            log('BuiltInCall_IRI');
            this.CONSUME(tokenMap.IRI);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_URI = this.RULE('BuiltInCall_URI', () => {
            log('BuiltInCall_URI');
            this.CONSUME(tokenMap.URI);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_BNODE = this.RULE('BuiltInCall_BNODE', () => {
            log('BuiltInCall_BNODE');
            this.CONSUME(tokenMap.BNODE);
            this.OR([
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.LParen);
                        this.SUBRULE(this.Expression);
                        this.CONSUME(tokenMap.RParen);
                    },
                },
                { ALT: () => this.CONSUME(tokenMap.NIL) },
            ]);
        });
        this.BuiltInCall_RAND = this.RULE('BuiltInCall_RAND', () => {
            log('BuiltInCall_RAND');
            this.CONSUME(tokenMap.RAND);
            this.CONSUME(tokenMap.NIL);
        });
        this.BuiltInCall_ABS = this.RULE('BuiltInCall_ABS', () => {
            log('BuiltInCall_ABS');
            this.CONSUME(tokenMap.ABS);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_CEIL = this.RULE('BuiltInCall_CEIL', () => {
            log('BuiltInCall_CEIL');
            this.CONSUME(tokenMap.CEIL);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_FLOOR = this.RULE('BuiltInCall_FLOOR', () => {
            log('BuiltInCall_FLOOR');
            this.CONSUME(tokenMap.FLOOR);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_ROUND = this.RULE('BuiltInCall_ROUND', () => {
            log('BuiltInCall_ROUND');
            this.CONSUME(tokenMap.ROUND);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_CONCAT = this.RULE('BuiltInCall_CONCAT', () => {
            log('BuiltInCall_CONCAT');
            this.CONSUME(tokenMap.CONCAT);
            this.SUBRULE(this.ExpressionList);
        });
        this.BuiltInCall_STRLEN = this.RULE('BuiltInCall_STRLEN', () => {
            log('BuiltInCall_STRLEN');
            this.CONSUME(tokenMap.STRLEN);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_UCASE = this.RULE('BuiltInCall_UCASE', () => {
            log('BuiltInCall_UCASE');
            this.CONSUME(tokenMap.UCASE);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_LCASE = this.RULE('BuiltInCall_LCASE', () => {
            log('BuiltInCall_LCASE');
            this.CONSUME(tokenMap.LCASE);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_ENCODE_FOR_URI = this.RULE('BuiltInCall_ENCODE_FOR_URI', () => {
            log('BuiltInCall_ENCODE_FOR_URI');
            this.CONSUME(tokenMap.ENCODE_FOR_URI);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_CONTAINS = this.RULE('BuiltInCall_CONTAINS', () => {
            log('BuiltInCall_CONTAINS');
            this.CONSUME(tokenMap.CONTAINS);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_STRSTARTS = this.RULE('BuiltInCall_STRSTARTS', () => {
            log('BuiltInCall_STRSTARTS');
            this.CONSUME(tokenMap.STRSTARTS);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_STRENDS = this.RULE('BuiltInCall_STRENDS', () => {
            log('BuiltInCall_STRENDS');
            this.CONSUME(tokenMap.STRENDS);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_STRBEFORE = this.RULE('BuiltInCall_STRBEFORE', () => {
            log('BuiltInCall_STRBEFORE');
            this.CONSUME(tokenMap.STRBEFORE);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_STRAFTER = this.RULE('BuiltInCall_STRAFTER', () => {
            log('BuiltInCall_STRAFTER');
            this.CONSUME(tokenMap.STRAFTER);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_YEAR = this.RULE('BuiltInCall_YEAR', () => {
            log('BuiltInCall_YEAR');
            this.CONSUME(tokenMap.YEAR);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_MONTH = this.RULE('BuiltInCall_MONTH', () => {
            log('BuiltInCall_MONTH');
            this.CONSUME(tokenMap.MONTH);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_DAY = this.RULE('BuiltInCall_DAY', () => {
            log('BuiltInCall_DAY');
            this.CONSUME(tokenMap.DAY);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_HOURS = this.RULE('BuiltInCall_HOURS', () => {
            log('BuiltInCall_HOURS');
            this.CONSUME(tokenMap.HOURS);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_MINUTES = this.RULE('BuiltInCall_MINUTES', () => {
            log('BuiltInCall_MINUTES');
            this.CONSUME(tokenMap.MINUTES);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_SECONDS = this.RULE('BuiltInCall_SECONDS', () => {
            log('BuiltInCall_SECONDS');
            this.CONSUME(tokenMap.SECONDS);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_TIMEZONE = this.RULE('BuiltInCall_TIMEZONE', () => {
            log('BuiltInCall_TIMEZONE');
            this.CONSUME(tokenMap.TIMEZONE);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_TZ = this.RULE('BuiltInCall_TZ', () => {
            log('BuiltInCall_TZ');
            this.CONSUME(tokenMap.TZ);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_NOW = this.RULE('BuiltInCall_NOW', () => {
            log('BuiltInCall_NOW');
            this.CONSUME(tokenMap.NOW);
            this.CONSUME(tokenMap.NIL);
        });
        this.BuiltInCall_UUID = this.RULE('BuiltInCall_UUID', () => {
            log('BuiltInCall_UUID');
            this.CONSUME(tokenMap.UUID);
            this.CONSUME(tokenMap.NIL);
        });
        this.BuiltInCall_STRUUID = this.RULE('BuiltInCall_STRUUID', () => {
            log('BuiltInCall_STRUUID');
            this.CONSUME(tokenMap.STRUUID);
            this.CONSUME(tokenMap.NIL);
        });
        this.BuiltInCall_MD5 = this.RULE('BuiltInCall_MD5', () => {
            log('BuiltInCall_MD5');
            this.CONSUME(tokenMap.MD5);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_SHA1 = this.RULE('BuiltInCall_SHA1', () => {
            log('BuiltInCall_SHA1');
            this.CONSUME(tokenMap.SHA1);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_SHA256 = this.RULE('BuiltInCall_SHA256', () => {
            log('BuiltInCall_SHA256');
            this.CONSUME(tokenMap.SHA256);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_SHA384 = this.RULE('BuiltInCall_SHA384', () => {
            log('BuiltInCall_SHA384');
            this.CONSUME(tokenMap.SHA384);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_SHA512 = this.RULE('BuiltInCall_SHA512', () => {
            log('BuiltInCall_SHA512');
            this.CONSUME(tokenMap.SHA512);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_COALESCE = this.RULE('BuiltInCall_COALESCE', () => {
            log('BuiltInCall_COALESCE');
            this.CONSUME(tokenMap.COALESCE);
            this.SUBRULE(this.ExpressionList);
        });
        this.BuiltInCall_IF = this.RULE('BuiltInCall_IF', () => {
            log('BuiltInCall_IF');
            this.CONSUME(tokenMap.IF);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME1(tokenMap.Comma);
            this.SUBRULE2(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_STRLANG = this.RULE('BuiltInCall_STRLANG', () => {
            log('BuiltInCall_STRLANG');
            this.CONSUME(tokenMap.STRLANG);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_STRDT = this.RULE('BuiltInCall_STRDT', () => {
            log('BuiltInCall_STRDT');
            this.CONSUME(tokenMap.STRDT);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_sameTerm = this.RULE('BuiltInCall_sameTerm', () => {
            log('BuiltInCall_sameTerm');
            this.CONSUME(tokenMap.sameTerm);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_isIRI = this.RULE('BuiltInCall_isIRI', () => {
            log('BuiltInCall_isIRI');
            this.CONSUME(tokenMap.isIRI);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_isURI = this.RULE('BuiltInCall_isURI', () => {
            log('BuiltInCall_isURI');
            this.CONSUME(tokenMap.isURI);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_isBlank = this.RULE('BuiltInCall_isBlank', () => {
            log('BuiltInCall_isBlank');
            this.CONSUME(tokenMap.isBlank);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_isLiteral = this.RULE('BuiltInCall_isLiteral', () => {
            log('BuiltInCall_isLiteral');
            this.CONSUME(tokenMap.isLiteral);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall_isNumeric = this.RULE('BuiltInCall_isNumeric', () => {
            log('BuiltInCall_isNumeric');
            this.CONSUME(tokenMap.isNumeric);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.BuiltInCall = this.RULE('BuiltInCall', () => {
            log('BuiltInCall');
            this.OR([
                { ALT: () => this.SUBRULE(this.Aggregate) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STR) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_LANG) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_LANGMATCHERS) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_DATATYPE) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_BOUND) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_IRI) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_URI) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_BNODE) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_RAND) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_ABS) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_CEIL) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_FLOOR) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_ROUND) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_CONCAT) },
                { ALT: () => this.SUBRULE(this.SubstringExpression) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STRLEN) },
                { ALT: () => this.SUBRULE(this.StrReplaceExpression) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_UCASE) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_LCASE) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_ENCODE_FOR_URI) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_CONTAINS) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STRSTARTS) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STRENDS) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STRBEFORE) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STRAFTER) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_YEAR) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_MONTH) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_DAY) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_HOURS) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_MINUTES) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_SECONDS) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_TIMEZONE) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_TZ) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_NOW) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_UUID) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STRUUID) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_MD5) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_SHA1) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_SHA256) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_SHA384) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_SHA512) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_COALESCE) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_IF) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STRLANG) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_STRDT) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_sameTerm) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_isIRI) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_isURI) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_isBlank) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_isLiteral) },
                { ALT: () => this.SUBRULE(this.BuiltInCall_isNumeric) },
                { ALT: () => this.SUBRULE(this.RegexExpression) },
                { ALT: () => this.SUBRULE(this.ExistsFunction) },
                { ALT: () => this.SUBRULE(this.NotExistsFunction) },
            ]);
        });
        this.RegexExpression = this.RULE('RegexExpression', () => {
            log('RegexExpression');
            this.CONSUME(tokenMap.REGEX);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.OPTION(() => {
                this.CONSUME1(tokenMap.Comma);
                this.SUBRULE2(this.Expression);
            });
            this.CONSUME(tokenMap.RParen);
        });
        this.SubstringExpression = this.RULE('SubstringExpression', () => {
            log('SubstringExpression');
            this.CONSUME(tokenMap.SUBSTR);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.OPTION(() => {
                this.CONSUME1(tokenMap.Comma);
                this.SUBRULE2(this.Expression);
            });
            this.CONSUME(tokenMap.RParen);
        });
        this.StrReplaceExpression = this.RULE('StrReplaceExpression', () => {
            log('StrReplaceExpression');
            this.CONSUME(tokenMap.REPLACE);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.Comma);
            this.SUBRULE1(this.Expression);
            this.CONSUME1(tokenMap.Comma);
            this.SUBRULE2(this.Expression);
            this.OPTION(() => {
                this.CONSUME2(tokenMap.Comma);
                this.SUBRULE3(this.Expression);
            });
            this.CONSUME(tokenMap.RParen);
        });
        this.ExistsFunction = this.RULE('ExistsFunction', () => {
            log('ExistsFunction');
            this.CONSUME(tokenMap.EXISTS);
            this.SUBRULE(this.GroupGraphPattern);
        });
        this.NotExistsFunction = this.RULE('NotExistsFunction', () => {
            log('NotExistsFunction');
            this.CONSUME(tokenMap.NOT_EXISTS);
            this.SUBRULE(this.GroupGraphPattern);
        });
        this.Count = this.RULE('Count', () => {
            log('Count');
            this.CONSUME(tokenMap.COUNT);
            this.CONSUME1(tokenMap.LParen);
            this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
            this.OR([
                { ALT: () => this.CONSUME3(tokenMap.Star) },
                { ALT: () => this.SUBRULE(this.Expression) },
            ]);
            this.CONSUME(tokenMap.RParen);
        });
        this.Sum = this.RULE('Sum', () => {
            log('Sum');
            this.CONSUME(tokenMap.SUM);
            this.CONSUME1(tokenMap.LParen);
            this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.Min = this.RULE('Min', () => {
            log('Min');
            this.CONSUME(tokenMap.MIN);
            this.CONSUME1(tokenMap.LParen);
            this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.Max = this.RULE('Max', () => {
            log('Max');
            this.CONSUME(tokenMap.MAX);
            this.CONSUME1(tokenMap.LParen);
            this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.Avg = this.RULE('Avg', () => {
            log('Avg');
            this.CONSUME(tokenMap.AVG);
            this.CONSUME1(tokenMap.LParen);
            this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.Sample = this.RULE('Sample', () => {
            log('Sample');
            this.CONSUME(tokenMap.SAMPLE);
            this.CONSUME1(tokenMap.LParen);
            this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
            this.SUBRULE(this.Expression);
            this.CONSUME(tokenMap.RParen);
        });
        this.GroupConcat = this.RULE('GroupConcat', () => {
            log('GroupConcat');
            this.CONSUME(tokenMap.GROUP_CONCAT);
            this.CONSUME1(tokenMap.LParen);
            this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
            this.SUBRULE(this.Expression);
            this.OPTION1(() => {
                this.CONSUME(tokenMap.Semicolon);
                this.CONSUME(tokenMap.SEPARATOR);
                this.CONSUME(tokenMap.Equals);
                this.SUBRULE(this.String);
            });
            this.CONSUME(tokenMap.RParen);
        });
        this.Aggregate = this.RULE('Aggregate', () => {
            log('Aggregate');
            this.OR([
                { ALT: () => this.SUBRULE(this.Count) },
                { ALT: () => this.SUBRULE(this.Sum) },
                { ALT: () => this.SUBRULE(this.Min) },
                { ALT: () => this.SUBRULE(this.Max) },
                { ALT: () => this.SUBRULE(this.Avg) },
                { ALT: () => this.SUBRULE(this.Sample) },
                { ALT: () => this.SUBRULE(this.GroupConcat) },
            ]);
        });
        this.iriOrFunction = this.RULE('iriOrFunction', () => {
            log('iriOrFunction');
            this.SUBRULE(this.iri);
            this.OPTION(() => this.SUBRULE(this.ArgList));
        });
        this.RDFLiteral = this.RULE('RDFLiteral', () => {
            log('RDFLiteral');
            this.SUBRULE(this.String);
            this.OPTION(() => this.OR([
                { ALT: () => this.CONSUME(tokenMap.LANGTAG) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.DoubleCaret);
                        this.SUBRULE(this.iri);
                    },
                },
            ]));
        });
        this.NumericLiteral = this.RULE('NumericLiteral', () => {
            log('NumericLiteral');
            this.OR([
                { ALT: () => this.SUBRULE(this.NumericLiteralUnsigned) },
                { ALT: () => this.SUBRULE(this.NumericLiteralPositive) },
                { ALT: () => this.SUBRULE(this.NumericLiteralNegative) },
            ]);
        });
        this.NumericLiteralUnsigned = this.RULE('NumericLiteralUnsigned', () => {
            log('NumericLiteralUnsigned');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.INTEGER) },
                { ALT: () => this.CONSUME(tokenMap.DECIMAL) },
                { ALT: () => this.CONSUME(tokenMap.DOUBLE) },
            ]);
        });
        this.NumericLiteralPositive = this.RULE('NumericLiteralPositive', () => {
            log('NumericLiteralPositive');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.INTEGER_POSITIVE) },
                { ALT: () => this.CONSUME(tokenMap.DECIMAL_POSITIVE) },
                { ALT: () => this.CONSUME(tokenMap.DOUBLE_POSITIVE) },
            ]);
        });
        this.NumericLiteralNegative = this.RULE('NumericLiteralNegative', () => {
            log('NumericLiteralNegative');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.INTEGER_NEGATIVE) },
                { ALT: () => this.CONSUME(tokenMap.DECIMAL_NEGATIVE) },
                { ALT: () => this.CONSUME(tokenMap.DOUBLE_NEGATIVE) },
            ]);
        });
        this.BooleanLiteral = this.RULE('BooleanLiteral', () => {
            log('BooleanLiteral');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.TRUE) },
                { ALT: () => this.CONSUME(tokenMap.FALSE) },
            ]);
        });
        this.String = this.RULE('String', () => {
            log('String');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL1) },
                { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL2) },
                { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG1) },
                { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG2) },
            ]);
        });
        this.iri = this.RULE('iri', () => {
            log('iri');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.IRIREF) },
                { ALT: () => this.SUBRULE(this.PrefixedName) },
            ]);
        });
        this.PrefixedName = this.RULE('PrefixedName', () => {
            log('PrefixedName');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.PNAME_LN) },
                { ALT: () => this.CONSUME(tokenMap.PNAME_NS) },
            ]);
        });
        this.BlankNode = this.RULE('BlankNode', () => {
            log('BlankNode');
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.BLANK_NODE_LABEL) },
                { ALT: () => this.CONSUME(tokenMap.ANON) },
            ]);
        });
        this.lexer = new Lexer(tokenVocab);
    }
}
