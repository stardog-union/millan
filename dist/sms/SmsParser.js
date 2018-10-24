"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chevrotain_1 = require("chevrotain");
const tokens_1 = require("./tokens");
class SmsParser extends chevrotain_1.Parser {
    constructor(options = {}, tokenVocab) {
        super(options.input || [], tokenVocab, Object.assign({ recoveryEnabled: true, outputCst: true }, options.config));
        this.tokenize = (document) => this.lexer.tokenize(document).tokens;
        this.parse = (document) => {
            this.input = this.lexer.tokenize(document).tokens;
            const cst = this.MappingDoc();
            const errors = this.errors;
            return {
                errors,
                cst,
            };
        };
        this.MappingDoc = this.RULE('MappingDoc', () => {
            this.MANY(() => this.SUBRULE(this.PrefixDecl));
            this.SUBRULE(this.MappingClause);
            this.MANY1(() => {
                this.CONSUME(tokens_1.tokenMap.Semicolon);
                this.SUBRULE1(this.MappingClause);
            });
        });
        this.MappingClause = this.RULE('MappingClause', () => {
            this.SUBRULE(this.MappingDecl);
            this.SUBRULE(this.FromClause);
            this.SUBRULE(this.ToClause);
            this.SUBRULE(this.WhereClause);
        });
        this.MappingDecl = this.RULE('MappingDecl', () => {
            this.CONSUME(tokens_1.tokenMap.Mapping);
            this.OPTION(() => this.SUBRULE(this.iri));
        });
        this.FromClause = this.RULE('FromClause', () => {
            this.CONSUME(tokens_1.tokenMap.FROM);
            this.OR([
                {
                    ALT: () => this.SUBRULE(this.SqlClause),
                },
                {
                    ALT: () => this.SUBRULE(this.JsonClause),
                },
                {
                    ALT: () => this.SUBRULE(this.GraphQlClause),
                },
            ]);
        });
        this.JsonClause = this.RULE('JsonClause', () => {
            this.CONSUME(tokens_1.tokenMap.Json);
            // this.CONSUME(tokenMap.LCurly);
            this.CONSUME(tokens_1.tokenMap.JsonBlock);
            // this.CONSUME(tokenMap.RCurly);
        });
        this.GraphQlClause = this.RULE('GraphQlClause', () => {
            this.CONSUME(tokens_1.tokenMap.GraphQl);
            this.CONSUME(tokens_1.tokenMap.LCurly);
            this.CONSUME(tokens_1.tokenMap.GraphQlBlock);
            this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        this.SqlClause = this.RULE('SqlClause', () => {
            this.CONSUME(tokens_1.tokenMap.Sql);
            this.CONSUME(tokens_1.tokenMap.LCurly);
            this.CONSUME(tokens_1.tokenMap.SqlBlock);
            this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        this.ToClause = this.RULE('ToClause', () => {
            this.CONSUME(tokens_1.tokenMap.TO);
            this.SUBRULE(this.ConstructTemplate);
        });
        this.WhereClause = this.RULE('WhereClause', () => {
            this.CONSUME(tokens_1.tokenMap.WHERE);
            this.CONSUME(tokens_1.tokenMap.LCurly);
            this.MANY(() => this.SUBRULE(this.Bind));
            this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        this.Bind = this.RULE('Bind', () => {
            this.CONSUME(tokens_1.tokenMap.BIND);
            this.CONSUME(tokens_1.tokenMap.LParen);
            this.SUBRULE(this.Expression);
            this.CONSUME(tokens_1.tokenMap.AS);
            this.SUBRULE(this.Var);
            this.CONSUME(tokens_1.tokenMap.RParen);
        });
        this.Expression = this.RULE('Expression', () => {
            this.SUBRULE(this.BuiltInCall);
        });
        this.BuiltInCall = this.RULE('BuiltInCall', () => {
            this.OR([
                {
                    ALT: () => this.SUBRULE(this.TemplateFunc),
                },
                {
                    ALT: () => this.SUBRULE(this.iriOrFunction),
                },
            ]);
        });
        this.TemplateFunc = this.RULE('TemplateFunc', () => {
            this.CONSUME(tokens_1.tokenMap.Template);
            this.CONSUME(tokens_1.tokenMap.LParen);
            this.SUBRULE(this.String);
            this.CONSUME(tokens_1.tokenMap.RParen);
        });
        //
        // Dupes from Sparql
        //
        this.PrefixDecl = this.RULE('PrefixDecl', () => {
            this.CONSUME(tokens_1.tokenMap.PREFIX);
            this.CONSUME(tokens_1.tokenMap.PNAME_NS);
            this.CONSUME(tokens_1.tokenMap.IRIREF);
        });
        this.iri = this.RULE('iri', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.IRIREF) },
                { ALT: () => this.SUBRULE(this.PrefixedName) },
            ]);
        });
        this.PrefixedName = this.RULE('PrefixedName', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.PNAME_LN) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.PNAME_NS) },
            ]);
        });
        this.ConstructTemplate = this.RULE('ConstructTemplate', () => {
            this.CONSUME(tokens_1.tokenMap.LCurly);
            this.OPTION(() => this.SUBRULE(this.ConstructTriples));
            this.CONSUME(tokens_1.tokenMap.RCurly);
        });
        this.ConstructTriples = this.RULE('ConstructTriples', () => {
            this.SUBRULE(this.TriplesSameSubject);
            this.OPTION(() => {
                this.CONSUME(tokens_1.tokenMap.Period);
                this.OPTION1(() => this.SUBRULE(this.ConstructTriples));
            });
        });
        this.TriplesSameSubject = this.RULE('TriplesSameSubject', () => {
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
        this.VarOrTerm = this.RULE('VarOrTerm', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.Var) },
                { ALT: () => this.SUBRULE(this.GraphTerm) },
            ]);
        });
        this.PropertyListNotEmpty = this.RULE('PropertyListNotEmpty', () => {
            this.SUBRULE(this.Verb);
            this.SUBRULE(this.ObjectList);
            this.MANY(() => {
                this.CONSUME(tokens_1.tokenMap.Semicolon);
                this.OPTION(() => {
                    this.SUBRULE1(this.Verb);
                    this.SUBRULE1(this.ObjectList);
                });
            });
        });
        this.TriplesNode = this.RULE('TriplesNode', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.Collection) },
                { ALT: () => this.SUBRULE(this.BlankNodePropertyList) },
            ]);
        });
        this.PropertyList = this.RULE('PropertyList', () => {
            this.OPTION(() => this.SUBRULE(this.PropertyListNotEmpty));
        });
        this.GraphTerm = this.RULE('GraphTerm', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.SUBRULE(this.RDFLiteral) },
                { ALT: () => this.SUBRULE(this.NumericLiteral) },
                { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                { ALT: () => this.SUBRULE(this.BlankNode) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.NIL) },
            ]);
        });
        this.Verb = this.RULE('Verb', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.VarOrIri) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.A) },
            ]);
        });
        this.ObjectList = this.RULE('ObjectList', () => {
            this.AT_LEAST_ONE_SEP({
                SEP: tokens_1.tokenMap.Comma,
                DEF: () => this.SUBRULE(this.Object),
            });
        });
        this.Object = this.RULE('Object', () => {
            this.SUBRULE(this.GraphNode);
        });
        this.Collection = this.RULE('Collection', () => {
            this.CONSUME(tokens_1.tokenMap.LParen);
            this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNode));
            this.CONSUME(tokens_1.tokenMap.RParen);
        });
        this.BlankNodePropertyList = this.RULE('BlankNodePropertyList', () => {
            this.CONSUME(tokens_1.tokenMap.LBracket);
            this.SUBRULE(this.PropertyListNotEmpty);
            this.CONSUME(tokens_1.tokenMap.RBracket);
        });
        this.VarOrIri = this.RULE('VarOrIri', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.Var) },
                { ALT: () => this.SUBRULE(this.iri) },
            ]);
        });
        this.RDFLiteral = this.RULE('RDFLiteral', () => {
            this.SUBRULE(this.String);
            this.OPTION(() => this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.LANGTAG) },
                {
                    ALT: () => {
                        this.CONSUME(tokens_1.tokenMap.DoubleCaret);
                        this.SUBRULE(this.iri);
                    },
                },
            ]));
        });
        this.NumericLiteral = this.RULE('NumericLiteral', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.NumericLiteralUnsigned) },
                { ALT: () => this.SUBRULE(this.NumericLiteralPositive) },
                { ALT: () => this.SUBRULE(this.NumericLiteralNegative) },
            ]);
        });
        this.NumericLiteralUnsigned = this.RULE('NumericLiteralUnsigned', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.INTEGER) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.DECIMAL) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.DOUBLE) },
            ]);
        });
        this.NumericLiteralPositive = this.RULE('NumericLiteralPositive', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.INTEGER_POSITIVE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.DECIMAL_POSITIVE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.DOUBLE_POSITIVE) },
            ]);
        });
        this.NumericLiteralNegative = this.RULE('NumericLiteralNegative', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.INTEGER_NEGATIVE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.DECIMAL_NEGATIVE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.DOUBLE_NEGATIVE) },
            ]);
        });
        this.BooleanLiteral = this.RULE('BooleanLiteral', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.TRUE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.FALSE) },
            ]);
        });
        this.BlankNode = this.RULE('BlankNode', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.BLANK_NODE_LABEL) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.ANON) },
            ]);
        });
        this.GraphNode = this.RULE('GraphNode', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.VarOrTerm) },
                { ALT: () => this.SUBRULE(this.TriplesNode) },
            ]);
        });
        this.Var = this.RULE('Var', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.VAR1) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.VAR2) },
            ]);
        });
        this.iriOrFunction = this.RULE('iriOrFunction', () => {
            this.SUBRULE(this.iri);
            this.OPTION(() => this.SUBRULE(this.ArgList));
        });
        this.ArgList = this.RULE('ArgList', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.NIL) },
                {
                    ALT: () => {
                        this.CONSUME(tokens_1.tokenMap.LParen);
                        this.OPTION(() => this.CONSUME(tokens_1.tokenMap.DISTINCT));
                        this.SUBRULE(this.Expression);
                        this.MANY(() => {
                            this.CONSUME(tokens_1.tokenMap.Comma);
                            this.SUBRULE1(this.Expression);
                        });
                        this.CONSUME(tokens_1.tokenMap.RParen);
                    },
                },
            ]);
        });
        this.String = this.RULE('String', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.STRING_LITERAL1) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.STRING_LITERAL2) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG1) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG2) },
            ]);
        });
        this.lexer = new chevrotain_1.Lexer(tokenVocab);
        chevrotain_1.Parser.performSelfAnalysis(this);
    }
}
exports.SmsParser = SmsParser;
