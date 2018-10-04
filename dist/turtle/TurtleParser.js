"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chevrotain_1 = require("chevrotain");
const tokens_1 = require("./tokens");
class TurtleParser extends chevrotain_1.Parser {
    constructor() {
        super([], tokens_1.tokenTypes, {
            outputCst: true,
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
