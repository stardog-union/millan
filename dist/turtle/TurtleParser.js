"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chevrotain_1 = require("chevrotain");
const tokens_1 = require("./tokens");
class TurtleParser extends chevrotain_1.Parser {
    constructor() {
        super([], tokens_1.tokenTypes, {
            outputCst: true,
        });
        this.turtleDoc = this.RULE('turtleDoc', () => {
            this.MANY(() => this.SUBRULE(this.statement));
        });
        this.statement = this.RULE('statement', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.directive) },
                {
                    ALT: () => {
                        this.SUBRULE(this.triples);
                        this.CONSUME(tokens_1.tokenMap.Period);
                    },
                },
            ]);
        });
        this.directive = this.RULE('directive', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.prefixID) },
                { ALT: () => this.SUBRULE(this.base) },
                { ALT: () => this.SUBRULE(this.sparqlPrefix) },
                { ALT: () => this.SUBRULE(this.sparqlBase) },
            ]);
        });
        this.prefixID = this.RULE('prefixID', () => {
            this.CONSUME(tokens_1.tokenMap.TTL_PREFIX);
            this.CONSUME(tokens_1.tokenMap.PNAME_NS);
            this.CONSUME(tokens_1.tokenMap.IRIREF);
            this.CONSUME(tokens_1.tokenMap.Period);
        });
        this.base = this.RULE('base', () => {
            this.CONSUME(tokens_1.tokenMap.TTL_BASE);
            this.CONSUME(tokens_1.tokenMap.IRIREF);
            this.CONSUME(tokens_1.tokenMap.Period);
        });
        this.sparqlBase = this.RULE('sparqlBase', () => {
            this.CONSUME(tokens_1.tokenMap.BASE);
            this.CONSUME(tokens_1.tokenMap.IRIREF);
        });
        this.sparqlPrefix = this.RULE('sparqlPrefix', () => {
            this.CONSUME(tokens_1.tokenMap.PREFIX);
            this.CONSUME(tokens_1.tokenMap.PNAME_NS);
            this.CONSUME(tokens_1.tokenMap.IRIREF);
        });
        this.triples = this.RULE('triples', () => {
            this.OR([
                {
                    ALT: () => {
                        this.SUBRULE(this.subject);
                        this.SUBRULE(this.predicateObjectList);
                    },
                },
                {
                    ALT: () => {
                        this.SUBRULE(this.blankNodePropertyList);
                        this.OPTION(() => this.SUBRULE1(this.predicateObjectList));
                    },
                },
            ]);
        });
        this.predicateObjectList = this.RULE('predicateObjectList', () => {
            this.SUBRULE(this.verb);
            this.SUBRULE(this.objectList);
            this.MANY(() => {
                this.CONSUME(tokens_1.tokenMap.Semicolon);
                this.OPTION(() => {
                    this.SUBRULE1(this.verb);
                    this.SUBRULE1(this.objectList);
                });
            });
        });
        this.subject = this.RULE('subject', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.SUBRULE(this.BlankNode) },
                { ALT: () => this.SUBRULE(this.collection) },
            ]);
        });
        this.predicate = this.RULE('predicate', () => {
            this.SUBRULE(this.iri);
        });
        this.objectList = this.RULE('objectList', () => {
            this.SUBRULE(this.object);
            this.MANY(() => {
                this.CONSUME(tokens_1.tokenMap.Comma);
                this.SUBRULE1(this.object);
            });
        });
        this.verb = this.RULE('verb', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.predicate) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.A) },
            ]);
        });
        this.literal = this.RULE('literal', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.RDFLiteral) },
                { ALT: () => this.SUBRULE(this.NumericLiteral) },
                { ALT: () => this.SUBRULE(this.BooleanLiteral) },
            ]);
        });
        this.blankNodePropertyList = this.RULE('blankNodePropertyList', () => {
            this.CONSUME(tokens_1.tokenMap.LBracket);
            this.SUBRULE(this.predicateObjectList);
            this.CONSUME(tokens_1.tokenMap.RBracket);
        });
        this.object = this.RULE('object', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.SUBRULE(this.BlankNode) },
                { ALT: () => this.SUBRULE(this.collection) },
                { ALT: () => this.SUBRULE(this.blankNodePropertyList) },
                { ALT: () => this.SUBRULE(this.literal) },
            ]);
        });
        this.collection = this.RULE('collection', () => {
            this.CONSUME(tokens_1.tokenMap.LParen);
            this.MANY(() => this.SUBRULE(this.object));
            this.CONSUME(tokens_1.tokenMap.RParen);
        });
        this.NumericLiteral = this.RULE('NumericLiteral', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.INTEGER) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.DECIMAL) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.DOUBLE) },
            ]);
        });
        this.RDFLiteral = this.RULE('RDFLiteral', () => {
            this.SUBRULE(this.String);
            this.OPTION(() => {
                this.OR([
                    { ALT: () => this.CONSUME(tokens_1.tokenMap.LANGTAG) },
                    {
                        ALT: () => {
                            this.CONSUME(tokens_1.tokenMap.DoubleCaret);
                            this.SUBRULE(this.iri);
                        },
                    },
                ]);
            });
        });
        this.BooleanLiteral = this.RULE('BooleanLiteral', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.TRUE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.FALSE) },
            ]);
        });
        this.String = this.RULE('String', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_QUOTE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_SINGLE_QUOTE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG_QUOTE) },
            ]);
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
        this.BlankNode = this.RULE('BlankNode', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokens_1.tokenMap.BLANK_NODE_LABEL) },
                { ALT: () => this.CONSUME(tokens_1.tokenMap.ANON) },
            ]);
        });
        chevrotain_1.Parser.performSelfAnalysis(this);
    }
}
exports.TurtleParser = TurtleParser;
