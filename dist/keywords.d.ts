import { TokenType } from 'chevrotain';
export declare enum Keywords {
    SELECT = "SELECT",
    CONSTRUCT = "CONSTRUCT",
    DISTINCT = "DISTINCT",
    AS = "AS",
    WHERE = "WHERE",
    GroupBy = "GROUP BY",
    OrderBy = "ORDER BY",
    By = "By",
    BASE = "BASE",
    PREFIX = "PREFIX",
    DESCRIBE = "DESCRIBE",
    ASK = "ASK",
    FROM = "FROM",
    REDUCED = "REDUCED",
    NAMED = "NAMED",
    HAVING = "HAVING",
    ASC = "ASC",
    DESC = "DESC",
    OFFSET = "OFFSET",
    LIMIT = "LIMIT",
    VALUES = "VALUES",
    LOAD = "LOAD",
    SILENT = "SILENT",
    INTO = "INTO",
    CLEAR = "CLEAR",
    DROP = "DROP",
    CREATE = "CREATE",
    ADD = "ADD",
    TO = "TO",
    MOVE = "MOVE",
    COPY = "COPY",
    INSERT_DATA = "INSERT DATA",
    DELETE_DATA = "DELETE DATA",
    DELETE_WHERE = "DELETE WHERE",
    WITH = "WITH",
    DELETE = "DELETE",
    INSERT = "INSERT",
    USING = "USING",
    DEFAULT = "DEFAULT",
    GRAPH = "GRAPH",
    ALL = "ALL",
    OPTIONAL = "OPTIONAL",
    SERVICE = "SERVICE",
    BIND = "BIND",
    UNDEF = "UNDEF",
    MINUS = "MINUS",
    UNION = "UNION",
    FILTER = "FILTER",
    STR = "STR",
    LANG = "LANG",
    LANGMATCHERS = "LANGMATCHERS",
    DATATYPE = "DATATYPE",
    BOUND = "BOUND",
    IRI = "IRI",
    URI = "URI",
    BNODE = "BNODE",
    RAND = "RAND",
    ABS = "ABS",
    CEIL = "CEIL",
    FLOOR = "FLOOR",
    ROUND = "ROUND",
    CONCAT = "CONCAT",
    STRLEN = "STRLEN",
    UCASE = "UCASE",
    LCASE = "LCASE",
    ENCODE_FOR_URI = "ENCODE_FOR_URI",
    CONTAINS = "CONTAINS",
    STRSTARTS = "STRSTARTS",
    STRENDS = "STRENDS",
    STRBEFORE = "STRBEFORE",
    STRAFTER = "STRAFTER",
    YEAR = "YEAR",
    MONTH = "MONTH",
    DAY = "DAY",
    HOURS = "HOURS",
    MINUTES = "MINUTES",
    SECONDS = "SECONDS",
    TIMEZONE = "TIMEZONE",
    TZ = "TZ",
    NOW = "NOW",
    UUID = "UUID",
    STRUUID = "STRUUID",
    MD5 = "MD5",
    SHA1 = "SHA1",
    SHA256 = "SHA256",
    SHA384 = "SHA384",
    SHA512 = "SHA512",
    COALESCE = "COALESCE",
    IF = "IF",
    STRLANG = "STRLANG",
    STRDT = "STRDT",
    sameTerm = "sameTerm",
    isIRI = "isIRI",
    isURI = "isURI",
    isBlank = "isBlank",
    isLiteral = "isLiteral",
    isNumeric = "isNumeric",
    REGEX = "REGEX",
    SUBSTR = "SUBSTR",
    REPLACE = "REPLACE",
    EXISTS = "EXISTS",
    NOT_EXISTS = "NOT_EXISTS",
    COUNT = "COUNT",
    SUM = "SUM",
    MIN = "MIN",
    MAX = "MAX",
    AVG = "AVG",
    SAMPLE = "SAMPLE",
    GROUP_CONCAT = "GROUP_CONCAT",
    SEPARATOR = "SEPARATOR",
    TRUE = "TRUE",
    FALSE = "FALSE",
    IN = "IN",
    NOT_IN = "NOT IN",
}
export declare const keywords: {
    SELECT: TokenType;
    CONSTRUCT: TokenType;
    DISTINCT: TokenType;
    START: TokenType;
    END: TokenType;
    VIA: TokenType;
    PATHS: TokenType;
    CYCLIC: TokenType;
    SHORTEST: TokenType;
    AS: TokenType;
    WHERE: TokenType;
    A: TokenType;
    GroupBy: TokenType;
    OrderBy: TokenType;
    By: TokenType;
    BASE: TokenType;
    PREFIX: TokenType;
    DESCRIBE: TokenType;
    ASK: TokenType;
    FROM: TokenType;
    REDUCED: TokenType;
    NAMED: TokenType;
    HAVING: TokenType;
    ASC: TokenType;
    DESC: TokenType;
    OFFSET: TokenType;
    LIMIT: TokenType;
    VALUES: TokenType;
    LOAD: TokenType;
    SILENT: TokenType;
    INTO: TokenType;
    CLEAR: TokenType;
    DROP: TokenType;
    CREATE: TokenType;
    ADD: TokenType;
    TO: TokenType;
    MOVE: TokenType;
    COPY: TokenType;
    INSERT_DATA: TokenType;
    DELETE_DATA: TokenType;
    DELETE_WHERE: TokenType;
    WITH: TokenType;
    DELETE: TokenType;
    INSERT: TokenType;
    USING: TokenType;
    DEFAULT: TokenType;
    GRAPH: TokenType;
    ALL: TokenType;
    OPTIONAL: TokenType;
    SERVICE: TokenType;
    BIND: TokenType;
    UNDEF: TokenType;
    MINUS: TokenType;
    UNION: TokenType;
    FILTER: TokenType;
    STR: TokenType;
    LANG: TokenType;
    LANGMATCHERS: TokenType;
    DATATYPE: TokenType;
    BOUND: TokenType;
    IRI: TokenType;
    URI: TokenType;
    BNODE: TokenType;
    RAND: TokenType;
    ABS: TokenType;
    CEIL: TokenType;
    FLOOR: TokenType;
    ROUND: TokenType;
    CONCAT: TokenType;
    STRLEN: TokenType;
    UCASE: TokenType;
    LCASE: TokenType;
    ENCODE_FOR_URI: TokenType;
    CONTAINS: TokenType;
    STRSTARTS: TokenType;
    STRENDS: TokenType;
    STRBEFORE: TokenType;
    STRAFTER: TokenType;
    YEAR: TokenType;
    MONTH: TokenType;
    DAY: TokenType;
    HOURS: TokenType;
    MINUTES: TokenType;
    SECONDS: TokenType;
    TIMEZONE: TokenType;
    TZ: TokenType;
    NOW: TokenType;
    UUID: TokenType;
    STRUUID: TokenType;
    MD5: TokenType;
    SHA1: TokenType;
    SHA256: TokenType;
    SHA384: TokenType;
    SHA512: TokenType;
    COALESCE: TokenType;
    IF: TokenType;
    STRLANG: TokenType;
    STRDT: TokenType;
    sameTerm: TokenType;
    isIRI: TokenType;
    isURI: TokenType;
    isBlank: TokenType;
    isLiteral: TokenType;
    isNumeric: TokenType;
    REGEX: TokenType;
    SUBSTR: TokenType;
    REPLACE: TokenType;
    EXISTS: TokenType;
    NOT_EXISTS: TokenType;
    COUNT: TokenType;
    SUM: TokenType;
    MIN: TokenType;
    AVG: TokenType;
    SAMPLE: TokenType;
    GROUP_CONCAT: TokenType;
    SEPARATOR: TokenType;
    TRUE: TokenType;
    FALSE: TokenType;
    IN: TokenType;
    NOT_IN: TokenType;
    MAX_LENGTH: TokenType;
    MAX: TokenType;
};
