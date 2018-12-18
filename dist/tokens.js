"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore: import types for declarations
var chevrotain_1 = require("chevrotain");
var terminals_1 = require("./terminals");
var keywords_1 = require("./keywords");
exports.tokenMap = {
    IRIREF: terminals_1.terminals.IRIREF,
    LANGTAG: terminals_1.terminals.LANGTAG,
    INTEGER: terminals_1.terminals.INTEGER,
    DECIMAL: terminals_1.terminals.DECIMAL,
    DOUBLE: terminals_1.terminals.DOUBLE,
    INTEGER_POSITIVE: terminals_1.terminals.INTEGER_POSITIVE,
    DECIMAL_POSITIVE: terminals_1.terminals.DECIMAL_POSITIVE,
    DOUBLE_POSITIVE: terminals_1.terminals.DOUBLE_POSITIVE,
    INTEGER_NEGATIVE: terminals_1.terminals.INTEGER_NEGATIVE,
    DECIMAL_NEGATIVE: terminals_1.terminals.DECIMAL_NEGATIVE,
    DOUBLE_NEGATIVE: terminals_1.terminals.DOUBLE_NEGATIVE,
    STRING_LITERAL1: terminals_1.terminals.STRING_LITERAL1,
    STRING_LITERAL2: terminals_1.terminals.STRING_LITERAL2,
    STRING_LITERAL_LONG1: terminals_1.terminals.STRING_LITERAL_LONG1,
    STRING_LITERAL_LONG2: terminals_1.terminals.STRING_LITERAL_LONG2,
    NIL: terminals_1.terminals.NIL,
    ANON: terminals_1.terminals.ANON,
    PNAME_NS: terminals_1.terminals.PNAME_NS,
    PNAME_LN: terminals_1.terminals.PNAME_LN,
    BLANK_NODE_LABEL: terminals_1.terminals.BLANK_NODE_LABEL,
    VAR1: terminals_1.terminals.VAR1,
    VAR2: terminals_1.terminals.VAR2,
    PERCENT: terminals_1.terminals.PERCENT,
    Comment: chevrotain_1.createToken({
        name: 'Comment',
        pattern: /#[^\n]*/,
        group: 'comments',
    }),
    LCurly: chevrotain_1.createToken({ name: 'LCurly', pattern: '{' }),
    RCurly: chevrotain_1.createToken({ name: 'RCurly', pattern: '}' }),
    LParen: chevrotain_1.createToken({ name: 'LParen', pattern: '(' }),
    RParen: chevrotain_1.createToken({ name: 'RParen', pattern: ')' }),
    WhiteSpace: chevrotain_1.createToken({
        name: 'WhiteSpace',
        pattern: /\s+/,
        group: chevrotain_1.Lexer.SKIPPED,
        line_breaks: true,
    }),
    Star: chevrotain_1.createToken({
        name: 'Star',
        pattern: '*',
    }),
    Unknown: chevrotain_1.createToken({
        name: 'Unknown',
        pattern: /\w+/,
    }),
    Period: chevrotain_1.createToken({
        name: 'Period',
        pattern: '.',
    }),
    QuestionMark: chevrotain_1.createToken({
        name: 'QuestionMark',
        pattern: '?',
    }),
    Plus: chevrotain_1.createToken({
        name: 'Plus',
        pattern: '+',
    }),
    Minus: chevrotain_1.createToken({
        name: 'Minus',
        pattern: '-',
    }),
    LBracket: chevrotain_1.createToken({
        name: 'LBracket',
        pattern: '[',
    }),
    RBracket: chevrotain_1.createToken({
        name: 'RBracket',
        pattern: ']',
    }),
    Semicolon: chevrotain_1.createToken({
        name: 'Semicolon',
        pattern: ';',
    }),
    Comma: chevrotain_1.createToken({
        name: 'Comma',
        pattern: ',',
    }),
    Pipe: chevrotain_1.createToken({
        name: 'Pipe',
        pattern: '|',
    }),
    ForwardSlash: chevrotain_1.createToken({
        name: 'ForwardSlash',
        pattern: '/',
    }),
    Caret: chevrotain_1.createToken({
        name: 'Caret',
        pattern: '^',
    }),
    DoubleCaret: chevrotain_1.createToken({
        name: 'DoubleCaret',
        pattern: '^^',
    }),
    Bang: chevrotain_1.createToken({
        name: 'Bang',
        pattern: '!',
    }),
    LogicalOr: chevrotain_1.createToken({
        name: 'LogicalOr',
        pattern: '||',
    }),
    LogicalAnd: chevrotain_1.createToken({
        name: 'LogicalAnd',
        pattern: '&&',
    }),
    Equals: chevrotain_1.createToken({
        name: 'Equals',
        pattern: '=',
    }),
    NotEquals: chevrotain_1.createToken({
        name: 'NotEquals',
        pattern: '!=',
    }),
    LessThan: chevrotain_1.createToken({
        name: 'LessThan',
        pattern: '<',
    }),
    GreaterThan: chevrotain_1.createToken({
        name: 'GreaterThan',
        pattern: '>',
    }),
    LessThanEquals: chevrotain_1.createToken({
        name: 'LessThanEquals',
        pattern: '<=',
    }),
    GreaterThanEquals: chevrotain_1.createToken({
        name: 'GreaterThanEquals',
        pattern: '>=',
    }),
    SELECT: keywords_1.keywords.SELECT,
    CONSTRUCT: keywords_1.keywords.CONSTRUCT,
    DISTINCT: keywords_1.keywords.DISTINCT,
    START: keywords_1.keywords.START,
    END: keywords_1.keywords.END,
    VIA: keywords_1.keywords.VIA,
    CYCLIC: keywords_1.keywords.CYCLIC,
    PATHS_SHORTEST: keywords_1.keywords.PATHS_SHORTEST,
    PATHS_ALL: keywords_1.keywords.PATHS_ALL,
    PATHS: keywords_1.keywords.PATHS,
    AS: keywords_1.keywords.AS,
    WHERE: keywords_1.keywords.WHERE,
    A: keywords_1.keywords.A,
    GroupBy: keywords_1.keywords.GroupBy,
    OrderBy: keywords_1.keywords.OrderBy,
    By: keywords_1.keywords.By,
    BASE: keywords_1.keywords.BASE,
    PREFIX: keywords_1.keywords.PREFIX,
    DESCRIBE: keywords_1.keywords.DESCRIBE,
    ASK: keywords_1.keywords.ASK,
    FROM: keywords_1.keywords.FROM,
    REDUCED: keywords_1.keywords.REDUCED,
    NAMED: keywords_1.keywords.NAMED,
    HAVING: keywords_1.keywords.HAVING,
    ASC: keywords_1.keywords.ASC,
    DESC: keywords_1.keywords.DESC,
    OFFSET: keywords_1.keywords.OFFSET,
    LIMIT: keywords_1.keywords.LIMIT,
    VALUES: keywords_1.keywords.VALUES,
    LOAD: keywords_1.keywords.LOAD,
    SILENT: keywords_1.keywords.SILENT,
    INTO: keywords_1.keywords.INTO,
    CLEAR: keywords_1.keywords.CLEAR,
    DROP: keywords_1.keywords.DROP,
    CREATE: keywords_1.keywords.CREATE,
    ADD: keywords_1.keywords.ADD,
    TO: keywords_1.keywords.TO,
    MOVE: keywords_1.keywords.MOVE,
    COPY: keywords_1.keywords.COPY,
    INSERT_DATA: keywords_1.keywords.INSERT_DATA,
    DELETE_DATA: keywords_1.keywords.DELETE_DATA,
    DELETE_WHERE: keywords_1.keywords.DELETE_WHERE,
    WITH: keywords_1.keywords.WITH,
    DELETE: keywords_1.keywords.DELETE,
    INSERT: keywords_1.keywords.INSERT,
    USING: keywords_1.keywords.USING,
    DEFAULT: keywords_1.keywords.DEFAULT,
    GRAPH: keywords_1.keywords.GRAPH,
    ALL: keywords_1.keywords.ALL,
    OPTIONAL: keywords_1.keywords.OPTIONAL,
    SERVICE: keywords_1.keywords.SERVICE,
    BIND: keywords_1.keywords.BIND,
    UNDEF: keywords_1.keywords.UNDEF,
    MINUS: keywords_1.keywords.MINUS,
    UNION: keywords_1.keywords.UNION,
    FILTER: keywords_1.keywords.FILTER,
    STR: keywords_1.keywords.STR,
    LANG: keywords_1.keywords.LANG,
    LANGMATCHERS: keywords_1.keywords.LANGMATCHERS,
    DATATYPE: keywords_1.keywords.DATATYPE,
    BOUND: keywords_1.keywords.BOUND,
    IRI: keywords_1.keywords.IRI,
    URI: keywords_1.keywords.URI,
    BNODE: keywords_1.keywords.BNODE,
    RAND: keywords_1.keywords.RAND,
    ABS: keywords_1.keywords.ABS,
    CEIL: keywords_1.keywords.CEIL,
    FLOOR: keywords_1.keywords.FLOOR,
    ROUND: keywords_1.keywords.ROUND,
    CONCAT: keywords_1.keywords.CONCAT,
    STRLEN: keywords_1.keywords.STRLEN,
    UCASE: keywords_1.keywords.UCASE,
    LCASE: keywords_1.keywords.LCASE,
    ENCODE_FOR_URI: keywords_1.keywords.ENCODE_FOR_URI,
    CONTAINS: keywords_1.keywords.CONTAINS,
    STRSTARTS: keywords_1.keywords.STRSTARTS,
    STRENDS: keywords_1.keywords.STRENDS,
    STRBEFORE: keywords_1.keywords.STRBEFORE,
    STRAFTER: keywords_1.keywords.STRAFTER,
    YEAR: keywords_1.keywords.YEAR,
    MONTH: keywords_1.keywords.MONTH,
    DAY: keywords_1.keywords.DAY,
    HOURS: keywords_1.keywords.HOURS,
    MINUTES: keywords_1.keywords.MINUTES,
    SECONDS: keywords_1.keywords.SECONDS,
    TIMEZONE: keywords_1.keywords.TIMEZONE,
    TZ: keywords_1.keywords.TZ,
    NOW: keywords_1.keywords.NOW,
    UUID: keywords_1.keywords.UUID,
    STRUUID: keywords_1.keywords.STRUUID,
    MD5: keywords_1.keywords.MD5,
    SHA1: keywords_1.keywords.SHA1,
    SHA256: keywords_1.keywords.SHA256,
    SHA384: keywords_1.keywords.SHA384,
    SHA512: keywords_1.keywords.SHA512,
    COALESCE: keywords_1.keywords.COALESCE,
    IF: keywords_1.keywords.IF,
    STRLANG: keywords_1.keywords.STRLANG,
    STRDT: keywords_1.keywords.STRDT,
    sameTerm: keywords_1.keywords.sameTerm,
    isIRI: keywords_1.keywords.isIRI,
    isURI: keywords_1.keywords.isURI,
    isBlank: keywords_1.keywords.isBlank,
    isLiteral: keywords_1.keywords.isLiteral,
    isNumeric: keywords_1.keywords.isNumeric,
    REGEX: keywords_1.keywords.REGEX,
    SUBSTR: keywords_1.keywords.SUBSTR,
    REPLACE: keywords_1.keywords.REPLACE,
    EXISTS: keywords_1.keywords.EXISTS,
    NOT_EXISTS: keywords_1.keywords.NOT_EXISTS,
    COUNT: keywords_1.keywords.COUNT,
    SUM: keywords_1.keywords.SUM,
    MIN: keywords_1.keywords.MIN,
    AVG: keywords_1.keywords.AVG,
    SAMPLE: keywords_1.keywords.SAMPLE,
    GROUP_CONCAT: keywords_1.keywords.GROUP_CONCAT,
    SEPARATOR: keywords_1.keywords.SEPARATOR,
    TRUE: keywords_1.keywords.TRUE,
    FALSE: keywords_1.keywords.FALSE,
    IN: keywords_1.keywords.IN,
    NOT_IN: keywords_1.keywords.NOT_IN,
    MAX_LENGTH: keywords_1.keywords.MAX_LENGTH,
    MAX: keywords_1.keywords.MAX,
};
exports.baseTokens = [
    exports.tokenMap.NIL,
    exports.tokenMap.ANON,
    exports.tokenMap.LCurly,
    exports.tokenMap.RCurly,
    exports.tokenMap.LParen,
    exports.tokenMap.RParen,
    exports.tokenMap.WhiteSpace,
    exports.tokenMap.IRIREF,
    exports.tokenMap.LANGTAG,
    exports.tokenMap.DOUBLE,
    exports.tokenMap.DECIMAL,
    exports.tokenMap.INTEGER,
    exports.tokenMap.DOUBLE_POSITIVE,
    exports.tokenMap.DECIMAL_POSITIVE,
    exports.tokenMap.INTEGER_POSITIVE,
    exports.tokenMap.DOUBLE_NEGATIVE,
    exports.tokenMap.DECIMAL_NEGATIVE,
    exports.tokenMap.INTEGER_NEGATIVE,
    exports.tokenMap.STRING_LITERAL1,
    exports.tokenMap.STRING_LITERAL2,
    exports.tokenMap.STRING_LITERAL_LONG1,
    exports.tokenMap.STRING_LITERAL_LONG2,
    exports.tokenMap.PNAME_NS,
    exports.tokenMap.PNAME_LN,
    exports.tokenMap.BLANK_NODE_LABEL,
    exports.tokenMap.VAR1,
    exports.tokenMap.VAR2,
    exports.tokenMap.Comment,
    exports.tokenMap.SELECT,
    exports.tokenMap.CONSTRUCT,
    exports.tokenMap.DISTINCT,
    exports.tokenMap.Star,
    exports.tokenMap.WHERE,
    exports.tokenMap.GroupBy,
    exports.tokenMap.OrderBy,
    exports.tokenMap.By,
    exports.tokenMap.Period,
    exports.tokenMap.QuestionMark,
    exports.tokenMap.Plus,
    exports.tokenMap.Minus,
    exports.tokenMap.LBracket,
    exports.tokenMap.RBracket,
    exports.tokenMap.PERCENT,
    exports.tokenMap.BASE,
    exports.tokenMap.PREFIX,
    exports.tokenMap.DESCRIBE,
    exports.tokenMap.ASK,
    exports.tokenMap.FROM,
    exports.tokenMap.REDUCED,
    exports.tokenMap.NAMED,
    exports.tokenMap.HAVING,
    exports.tokenMap.ASC,
    exports.tokenMap.DESC,
    exports.tokenMap.OFFSET,
    exports.tokenMap.LIMIT,
    exports.tokenMap.VALUES,
    exports.tokenMap.LOAD,
    exports.tokenMap.SILENT,
    exports.tokenMap.INTO,
    exports.tokenMap.AS,
    exports.tokenMap.CLEAR,
    exports.tokenMap.DROP,
    exports.tokenMap.CREATE,
    exports.tokenMap.ADD,
    exports.tokenMap.TO,
    exports.tokenMap.MOVE,
    exports.tokenMap.COPY,
    exports.tokenMap.INSERT_DATA,
    exports.tokenMap.DELETE_DATA,
    exports.tokenMap.DELETE_WHERE,
    exports.tokenMap.WITH,
    exports.tokenMap.DELETE,
    exports.tokenMap.INSERT,
    exports.tokenMap.USING,
    exports.tokenMap.DEFAULT,
    exports.tokenMap.GRAPH,
    exports.tokenMap.ALL,
    exports.tokenMap.OPTIONAL,
    exports.tokenMap.SERVICE,
    exports.tokenMap.BIND,
    exports.tokenMap.UNDEF,
    exports.tokenMap.MINUS,
    exports.tokenMap.UNION,
    exports.tokenMap.FILTER,
    exports.tokenMap.LANGMATCHERS,
    exports.tokenMap.LANG,
    exports.tokenMap.DATATYPE,
    exports.tokenMap.BOUND,
    exports.tokenMap.IRI,
    exports.tokenMap.URI,
    exports.tokenMap.BNODE,
    exports.tokenMap.RAND,
    exports.tokenMap.ABS,
    exports.tokenMap.CEIL,
    exports.tokenMap.FLOOR,
    exports.tokenMap.ROUND,
    exports.tokenMap.CONCAT,
    exports.tokenMap.STRLEN,
    exports.tokenMap.UCASE,
    exports.tokenMap.LCASE,
    exports.tokenMap.ENCODE_FOR_URI,
    exports.tokenMap.CONTAINS,
    exports.tokenMap.STRSTARTS,
    exports.tokenMap.STRENDS,
    exports.tokenMap.STRBEFORE,
    exports.tokenMap.STRAFTER,
    exports.tokenMap.YEAR,
    exports.tokenMap.MONTH,
    exports.tokenMap.DAY,
    exports.tokenMap.HOURS,
    exports.tokenMap.MINUTES,
    exports.tokenMap.SECONDS,
    exports.tokenMap.TIMEZONE,
    exports.tokenMap.TZ,
    exports.tokenMap.NOW,
    exports.tokenMap.UUID,
    exports.tokenMap.STRUUID,
    exports.tokenMap.MD5,
    exports.tokenMap.SHA1,
    exports.tokenMap.SHA256,
    exports.tokenMap.SHA384,
    exports.tokenMap.SHA512,
    exports.tokenMap.COALESCE,
    exports.tokenMap.IF,
    exports.tokenMap.STRLANG,
    exports.tokenMap.STRDT,
    exports.tokenMap.STR,
    exports.tokenMap.sameTerm,
    exports.tokenMap.isIRI,
    exports.tokenMap.isURI,
    exports.tokenMap.isBlank,
    exports.tokenMap.isLiteral,
    exports.tokenMap.isNumeric,
    exports.tokenMap.REGEX,
    exports.tokenMap.SUBSTR,
    exports.tokenMap.REPLACE,
    exports.tokenMap.EXISTS,
    exports.tokenMap.NOT_EXISTS,
    exports.tokenMap.COUNT,
    exports.tokenMap.SUM,
    exports.tokenMap.MIN,
    exports.tokenMap.MAX_LENGTH,
    exports.tokenMap.MAX,
    exports.tokenMap.AVG,
    exports.tokenMap.SAMPLE,
    exports.tokenMap.GROUP_CONCAT,
    exports.tokenMap.SEPARATOR,
    exports.tokenMap.TRUE,
    exports.tokenMap.FALSE,
    exports.tokenMap.Semicolon,
    exports.tokenMap.Comma,
    exports.tokenMap.ForwardSlash,
    exports.tokenMap.DoubleCaret,
    exports.tokenMap.Caret,
    exports.tokenMap.LogicalOr,
    exports.tokenMap.Pipe,
    exports.tokenMap.LogicalAnd,
    exports.tokenMap.NotEquals,
    exports.tokenMap.Bang,
    exports.tokenMap.Equals,
    exports.tokenMap.LessThanEquals,
    exports.tokenMap.GreaterThanEquals,
    exports.tokenMap.LessThan,
    exports.tokenMap.GreaterThan,
    exports.tokenMap.IN,
    exports.tokenMap.NOT_IN,
    exports.tokenMap.A,
    exports.tokenMap.Unknown,
];
exports.pathsTokens = [
    exports.tokenMap.START,
    exports.tokenMap.END,
    exports.tokenMap.VIA,
    exports.tokenMap.CYCLIC,
    exports.tokenMap.PATHS_SHORTEST,
    exports.tokenMap.PATHS_ALL,
    exports.tokenMap.PATHS,
];
