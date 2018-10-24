"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("../tokens");
const chevrotain_1 = require("chevrotain");
const FROM_BLOCK_END_MATCHER = /((?:.|\s)*?)(?:}\s*to)/i;
const FROM_JSON_BLOCK_END_MATCHER = /((?:.|\s)*?)to\s*{/i;
exports.tokenMap = {
    STRING_LITERAL1: tokens_1.tokenMap.STRING_LITERAL1,
    STRING_LITERAL2: tokens_1.tokenMap.STRING_LITERAL2,
    STRING_LITERAL_LONG1: tokens_1.tokenMap.STRING_LITERAL_LONG1,
    STRING_LITERAL_LONG2: tokens_1.tokenMap.STRING_LITERAL_LONG2,
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
    DoubleCaret: tokens_1.tokenMap.DoubleCaret,
    Semicolon: tokens_1.tokenMap.Semicolon,
    LBracket: tokens_1.tokenMap.LBracket,
    RBracket: tokens_1.tokenMap.RBracket,
    Template: chevrotain_1.createToken({
        name: 'Template',
        pattern: /template/i,
    }),
    TO: chevrotain_1.createToken({
        name: 'TO',
        pattern: /to/i,
    }),
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
            if (!secondToLastToken ||
                !lastToken ||
                secondToLastToken.tokenType.tokenName !== exports.tokenMap.Sql.tokenName ||
                lastToken.tokenType.tokenName !== exports.tokenMap.LCurly.tokenName) {
                return null;
            }
            const textToMatch = text.slice(startOffset);
            const match = FROM_BLOCK_END_MATCHER.exec(textToMatch);
            if (!match) {
                return null;
            }
            // We match an end bracket and the "TO" keyword because it's currently our
            // best (only) heuristic for determining the end of a SQL block, but we still
            // want chevrotain to tokenize the end bracket and "TO" keyword seperately because
            // their consumption is required in the parse rules.
            const capturedMatch = match.slice(1);
            return capturedMatch;
        },
        line_breaks: true,
    }),
    JsonBlock: chevrotain_1.createToken({
        name: 'JsonBlock',
        pattern: (text, startOffset = 0, matchedTokensSoFar) => {
            const [lastToken] = matchedTokensSoFar.slice(-1);
            if (!lastToken ||
                lastToken.tokenType.tokenName !== exports.tokenMap.Json.tokenName) {
                return null;
            }
            const textToMatch = text.slice(startOffset);
            const match = FROM_JSON_BLOCK_END_MATCHER.exec(textToMatch);
            if (!match) {
                return null;
            }
            const capturedMatch = match.slice(1);
            return capturedMatch;
        },
        line_breaks: true,
    }),
    GraphQlBlock: chevrotain_1.createToken({
        name: 'GraphQlBlock',
        pattern: (text, startOffset = 0, matchedTokensSoFar) => {
            const [secondToLastToken, lastToken] = matchedTokensSoFar.slice(-2);
            if (!secondToLastToken ||
                !lastToken ||
                secondToLastToken.tokenType.tokenName !== exports.tokenMap.GraphQl.tokenName ||
                lastToken.tokenType.tokenName !== exports.tokenMap.LCurly.tokenName) {
                return null;
            }
            const textToMatch = text.slice(startOffset);
            const match = FROM_BLOCK_END_MATCHER.exec(textToMatch);
            if (!match) {
                return null;
            }
            const capturedMatch = match.slice(1);
            return capturedMatch;
        },
        line_breaks: true,
    }),
};
exports.tokenTypes = [
    exports.tokenMap.WhiteSpace,
    exports.tokenMap.Comment,
    exports.tokenMap.LParen,
    exports.tokenMap.RParen,
    exports.tokenMap.Period,
    exports.tokenMap.Template,
    exports.tokenMap.IRIREF,
    exports.tokenMap.PNAME_LN,
    exports.tokenMap.PNAME_NS,
    exports.tokenMap.NIL,
    exports.tokenMap.DISTINCT,
    exports.tokenMap.VAR1,
    exports.tokenMap.VAR2,
    exports.tokenMap.BIND,
    exports.tokenMap.AS,
    exports.tokenMap.WHERE,
    exports.tokenMap.TO,
    exports.tokenMap.LANGTAG,
    exports.tokenMap.INTEGER,
    exports.tokenMap.DECIMAL,
    exports.tokenMap.DOUBLE,
    exports.tokenMap.INTEGER_POSITIVE,
    exports.tokenMap.DECIMAL_POSITIVE,
    exports.tokenMap.DOUBLE_POSITIVE,
    exports.tokenMap.INTEGER_NEGATIVE,
    exports.tokenMap.DECIMAL_NEGATIVE,
    exports.tokenMap.DOUBLE_NEGATIVE,
    exports.tokenMap.TRUE,
    exports.tokenMap.FALSE,
    exports.tokenMap.BLANK_NODE_LABEL,
    exports.tokenMap.ANON,
    exports.tokenMap.A,
    exports.tokenMap.FROM,
    exports.tokenMap.PREFIX,
    exports.tokenMap.Comma,
    exports.tokenMap.DoubleCaret,
    exports.tokenMap.Semicolon,
    exports.tokenMap.LBracket,
    exports.tokenMap.RBracket,
    exports.tokenMap.Sql,
    exports.tokenMap.GraphQl,
    exports.tokenMap.Json,
    exports.tokenMap.Mapping,
    exports.tokenMap.SqlBlock,
    exports.tokenMap.JsonBlock,
    exports.tokenMap.GraphQlBlock,
    exports.tokenMap.LCurly,
    exports.tokenMap.RCurly,
    exports.tokenMap.STRING_LITERAL1,
    exports.tokenMap.STRING_LITERAL2,
    exports.tokenMap.STRING_LITERAL_LONG1,
    exports.tokenMap.STRING_LITERAL_LONG2,
];
