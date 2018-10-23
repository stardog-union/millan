"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("../tokens");
const chevrotain_1 = require("chevrotain");
exports.tokenMap = {
    STRING_LITERAL_1: tokens_1.tokenMap.STRING_LITERAL1,
    STRING_LITERAL_2: tokens_1.tokenMap.STRING_LITERAL2,
    STRING_LITERAL_LONG_1: tokens_1.tokenMap.STRING_LITERAL_LONG1,
    STRING_LITERAL_LONG_2: tokens_1.tokenMap.STRING_LITERAL_LONG2,
    IRIREF: tokens_1.tokenMap.IRIREF,
    PNAME_LN: tokens_1.tokenMap.PNAME_LN,
    PNAME_NS: tokens_1.tokenMap.PNAME_NS,
    NIL: tokens_1.tokenMap.NIL,
    DISTINCT: tokens_1.tokenMap.DISTINCT,
    VAR1: tokens_1.tokenMap.VAR1,
    VAR2: tokens_1.tokenMap.VAR2,
    BIND: tokens_1.tokenMap.BIND,
    AS: tokens_1.tokenMap.AS,
    WHERE: tokens_1.tokenMap.WHERE,
    TO: chevrotain_1.createToken({
        name: 'TO',
        pattern: /to/i,
    }),
    LANGTAG: tokens_1.tokenMap.LANGTAG,
    INTEGER: tokens_1.tokenMap.INTEGER,
    DECIMAL: tokens_1.tokenMap.DECIMAL,
    DOUBLE: tokens_1.tokenMap.DOUBLE,
    INTEGER_POSITIVE: tokens_1.tokenMap.INTEGER_POSITIVE,
    DECIMAL_POSITIVE: tokens_1.tokenMap.DECIMAL_POSITIVE,
    DOUBLE_POSITIVE: tokens_1.tokenMap.DOUBLE_POSITIVE,
    INTEGER_NEGATIVE: tokens_1.tokenMap.INTEGER_NEGATIVE,
    DECIMAL_NEGATIVE: tokens_1.tokenMap.DECIMAL_NEGATIVE,
    DOUBLE_NEGATIVE: tokens_1.tokenMap.DOUBLE_NEGATIVE,
    TRUE: tokens_1.tokenMap.TRUE,
    FALSE: tokens_1.tokenMap.FALSE,
    BLANK_NODE_LABEL: tokens_1.tokenMap.BLANK_NODE_LABEL,
    ANON: tokens_1.tokenMap.ANON,
    A: tokens_1.tokenMap.A,
    FROM: tokens_1.tokenMap.FROM,
    PREFIX: tokens_1.tokenMap.PREFIX,
    Comment: tokens_1.tokenMap.Comment,
    Period: tokens_1.tokenMap.Period,
    Comma: tokens_1.tokenMap.Comma,
    LCurly: tokens_1.tokenMap.LCurly,
    RCurly: tokens_1.tokenMap.RCurly,
    LParen: tokens_1.tokenMap.LParen,
    RParen: tokens_1.tokenMap.RParen,
    WhiteSpace: tokens_1.tokenMap.WhiteSpace,
    Template: chevrotain_1.createToken({
        name: 'Template',
        pattern: /template/i,
    }),
    DoubleCaret: tokens_1.tokenMap.DoubleCaret,
    Semicolon: tokens_1.tokenMap.Semicolon,
    LBracket: tokens_1.tokenMap.LBracket,
    RBracket: tokens_1.tokenMap.RBracket,
    Sql: chevrotain_1.createToken({
        name: 'Sql',
        pattern: /sql/i,
    }),
    GraphQl: chevrotain_1.createToken({
        name: 'GraphQl',
        pattern: /graphql/i,
    }),
    Json: chevrotain_1.createToken({
        name: 'Json',
        pattern: /json/i,
    }),
    Mapping: chevrotain_1.createToken({
        name: 'Mapping',
        pattern: /mapping/i,
    }),
    SqlBlock: chevrotain_1.createToken({
        name: 'SqlBlock',
        pattern: (text, startOffset = 0, matchedTokensSoFar) => {
            const [secondToLastToken, lastToken] = matchedTokensSoFar.slice(-2);
            if (secondToLastToken.tokenType !== exports.tokenMap.Sql.tokenName ||
                lastToken.tokenType !== exports.tokenMap.LCurly.tokenName) {
                return null;
            }
            return;
        },
    }),
};
exports.tokenTypes = [
    exports.tokenMap.WhiteSpace,
    exports.tokenMap.Comment,
    exports.tokenMap.LCurly,
    exports.tokenMap.RCurly,
    exports.tokenMap.LParen,
    exports.tokenMap.RParen,
    exports.tokenMap.Period,
    exports.tokenMap.STRING_LITERAL_LONG_1,
    exports.tokenMap.STRING_LITERAL_LONG_2,
    exports.tokenMap.STRING_LITERAL_1,
    exports.tokenMap.STRING_LITERAL_2,
    exports.tokenMap.Template,
];
