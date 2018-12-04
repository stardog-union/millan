"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore: import types for declarations
const chevrotain_1 = require("chevrotain");
const MAX_LENGTH = chevrotain_1.createToken({
    name: 'MAX_LENGTH',
    pattern: /MAX LENGTH/i,
});
exports.keywords = {
    SELECT: chevrotain_1.createToken({
        name: 'SELECT',
        pattern: /SELECT/i,
    }),
    CONSTRUCT: chevrotain_1.createToken({
        name: 'CONSTRUCT',
        pattern: /CONSTRUCT/i,
    }),
    DISTINCT: chevrotain_1.createToken({
        name: 'DISTINCT',
        pattern: /DISTINCT/i,
    }),
    START: chevrotain_1.createToken({
        name: 'START',
        pattern: /START/i,
    }),
    END: chevrotain_1.createToken({
        name: 'END',
        pattern: /END/i,
    }),
    VIA: chevrotain_1.createToken({
        name: 'VIA',
        pattern: /VIA/i,
    }),
    PATHS: chevrotain_1.createToken({
        name: 'PATHS',
        pattern: /PATHS/i,
    }),
    PATHS_ALL: chevrotain_1.createToken({
        name: 'PATHS_ALL',
        pattern: /PATHS ALL/i,
    }),
    PATHS_SHORTEST: chevrotain_1.createToken({
        name: 'PATHS_SHORTEST',
        pattern: /PATHS SHORTEST/i,
    }),
    CYCLIC: chevrotain_1.createToken({
        name: 'CYCLIC',
        pattern: /CYCLIC/i,
    }),
    AS: chevrotain_1.createToken({
        name: 'AS',
        pattern: /AS/i,
    }),
    WHERE: chevrotain_1.createToken({
        name: 'WHERE',
        pattern: /WHERE/i,
    }),
    A: chevrotain_1.createToken({
        name: 'A',
        pattern: /a/i,
    }),
    GroupBy: chevrotain_1.createToken({
        name: 'GroupBy',
        pattern: /group by/i,
    }),
    OrderBy: chevrotain_1.createToken({
        name: 'OrderBy',
        pattern: /order by/i,
    }),
    By: chevrotain_1.createToken({
        name: 'By',
        pattern: /By/i,
    }),
    BASE: chevrotain_1.createToken({
        name: 'BASE',
        pattern: /BASE/i,
    }),
    PREFIX: chevrotain_1.createToken({
        name: 'PREFIX',
        pattern: /PREFIX/i,
    }),
    DESCRIBE: chevrotain_1.createToken({
        name: 'DESCRIBE',
        pattern: /DESCRIBE/i,
    }),
    ASK: chevrotain_1.createToken({
        name: 'ASK',
        pattern: /ASK/i,
    }),
    FROM: chevrotain_1.createToken({
        name: 'FROM',
        pattern: /FROM/i,
    }),
    REDUCED: chevrotain_1.createToken({
        name: 'REDUCED',
        pattern: /REDUCED/i,
    }),
    NAMED: chevrotain_1.createToken({
        name: 'NAMED',
        pattern: /NAMED/i,
    }),
    HAVING: chevrotain_1.createToken({
        name: 'HAVING',
        pattern: /HAVING/i,
    }),
    ASC: chevrotain_1.createToken({
        name: 'ASC',
        pattern: /ASC/i,
    }),
    DESC: chevrotain_1.createToken({
        name: 'DESC',
        pattern: /DESC/i,
    }),
    OFFSET: chevrotain_1.createToken({
        name: 'OFFSET',
        pattern: /OFFSET/i,
    }),
    LIMIT: chevrotain_1.createToken({
        name: 'LIMIT',
        pattern: /LIMIT/i,
    }),
    VALUES: chevrotain_1.createToken({
        name: 'VALUES',
        pattern: /VALUES/i,
    }),
    LOAD: chevrotain_1.createToken({
        name: 'LOAD',
        pattern: /LOAD/i,
    }),
    SILENT: chevrotain_1.createToken({
        name: 'SILENT',
        pattern: /SILENT/i,
    }),
    INTO: chevrotain_1.createToken({
        name: 'INTO',
        pattern: /INTO/i,
    }),
    CLEAR: chevrotain_1.createToken({
        name: 'CLEAR',
        pattern: /CLEAR/i,
    }),
    DROP: chevrotain_1.createToken({
        name: 'DROP',
        pattern: /DROP/i,
    }),
    CREATE: chevrotain_1.createToken({
        name: 'CREATE',
        pattern: /CREATE/i,
    }),
    ADD: chevrotain_1.createToken({
        name: 'ADD',
        pattern: /ADD/i,
    }),
    TO: chevrotain_1.createToken({
        name: 'TO',
        pattern: /TO/i,
    }),
    MOVE: chevrotain_1.createToken({
        name: 'MOVE',
        pattern: /MOVE/i,
    }),
    COPY: chevrotain_1.createToken({
        name: 'COPY',
        pattern: /COPY/i,
    }),
    INSERT_DATA: chevrotain_1.createToken({
        name: 'INSERT_DATA',
        pattern: /Insert +Data/i,
    }),
    DELETE_DATA: chevrotain_1.createToken({
        name: 'DELETE_DATA',
        pattern: /Delete +Data/i,
    }),
    DELETE_WHERE: chevrotain_1.createToken({
        name: 'DELETE_WHERE',
        pattern: /Delete +Where/i,
    }),
    WITH: chevrotain_1.createToken({
        name: 'WITH',
        pattern: /WITH/i,
    }),
    DELETE: chevrotain_1.createToken({
        name: 'DELETE',
        pattern: /DELETE/i,
    }),
    INSERT: chevrotain_1.createToken({
        name: 'INSERT',
        pattern: /INSERT/i,
    }),
    USING: chevrotain_1.createToken({
        name: 'USING',
        pattern: /USING/i,
    }),
    DEFAULT: chevrotain_1.createToken({
        name: 'DEFAULT',
        pattern: /DEFAULT/i,
    }),
    GRAPH: chevrotain_1.createToken({
        name: 'GRAPH',
        pattern: /GRAPH/i,
    }),
    ALL: chevrotain_1.createToken({
        name: 'ALL',
        pattern: /ALL/i,
    }),
    OPTIONAL: chevrotain_1.createToken({
        name: 'OPTIONAL',
        pattern: /OPTIONAL/i,
    }),
    SERVICE: chevrotain_1.createToken({
        name: 'SERVICE',
        pattern: /SERVICE/i,
    }),
    BIND: chevrotain_1.createToken({
        name: 'BIND',
        pattern: /BIND/i,
    }),
    UNDEF: chevrotain_1.createToken({
        name: 'UNDEF',
        pattern: /UNDEF/i,
    }),
    MINUS: chevrotain_1.createToken({
        name: 'MINUS',
        pattern: /MINUS/i,
    }),
    UNION: chevrotain_1.createToken({
        name: 'UNION',
        pattern: /UNION/i,
    }),
    FILTER: chevrotain_1.createToken({
        name: 'FILTER',
        pattern: /FILTER/i,
    }),
    STR: chevrotain_1.createToken({
        name: 'STR',
        pattern: /STR/i,
    }),
    LANG: chevrotain_1.createToken({
        name: 'LANG',
        pattern: /LANG/i,
    }),
    LANGMATCHERS: chevrotain_1.createToken({
        name: 'LANGMATCHERS',
        pattern: /LANGMATCHERS/i,
    }),
    DATATYPE: chevrotain_1.createToken({
        name: 'DATATYPE',
        pattern: /DATATYPE/i,
    }),
    BOUND: chevrotain_1.createToken({
        name: 'BOUND',
        pattern: /BOUND/i,
    }),
    IRI: chevrotain_1.createToken({
        name: 'IRI',
        pattern: /IRI/i,
    }),
    URI: chevrotain_1.createToken({
        name: 'URI',
        pattern: /URI/i,
    }),
    BNODE: chevrotain_1.createToken({
        name: 'BNODE',
        pattern: /BNODE/i,
    }),
    RAND: chevrotain_1.createToken({
        name: 'RAND',
        pattern: /RAND/i,
    }),
    ABS: chevrotain_1.createToken({
        name: 'ABS',
        pattern: /ABS/i,
    }),
    CEIL: chevrotain_1.createToken({
        name: 'CEIL',
        pattern: /CEIL/i,
    }),
    FLOOR: chevrotain_1.createToken({
        name: 'FLOOR',
        pattern: /FLOOR/i,
    }),
    ROUND: chevrotain_1.createToken({
        name: 'ROUND',
        pattern: /ROUND/i,
    }),
    CONCAT: chevrotain_1.createToken({
        name: 'CONCAT',
        pattern: /CONCAT/i,
    }),
    STRLEN: chevrotain_1.createToken({
        name: 'STRLEN',
        pattern: /STRLEN/i,
    }),
    UCASE: chevrotain_1.createToken({
        name: 'UCASE',
        pattern: /UCASE/i,
    }),
    LCASE: chevrotain_1.createToken({
        name: 'LCASE',
        pattern: /LCASE/i,
    }),
    ENCODE_FOR_URI: chevrotain_1.createToken({
        name: 'ENCODE_FOR_URI',
        pattern: /ENCODE_FOR_URI/i,
    }),
    CONTAINS: chevrotain_1.createToken({
        name: 'CONTAINS',
        pattern: /CONTAINS/i,
    }),
    STRSTARTS: chevrotain_1.createToken({
        name: 'STRSTARTS',
        pattern: /STRSTARTS/i,
    }),
    STRENDS: chevrotain_1.createToken({
        name: 'STRENDS',
        pattern: /STRENDS/i,
    }),
    STRBEFORE: chevrotain_1.createToken({
        name: 'STRBEFORE',
        pattern: /STRBEFORE/i,
    }),
    STRAFTER: chevrotain_1.createToken({
        name: 'STRAFTER',
        pattern: /STRAFTER/i,
    }),
    YEAR: chevrotain_1.createToken({
        name: 'YEAR',
        pattern: /YEAR/i,
    }),
    MONTH: chevrotain_1.createToken({
        name: 'MONTH',
        pattern: /MONTH/i,
    }),
    DAY: chevrotain_1.createToken({
        name: 'DAY',
        pattern: /DAY/i,
    }),
    HOURS: chevrotain_1.createToken({
        name: 'HOURS',
        pattern: /HOURS/i,
    }),
    MINUTES: chevrotain_1.createToken({
        name: 'MINUTES',
        pattern: /MINUTES/i,
    }),
    SECONDS: chevrotain_1.createToken({
        name: 'SECONDS',
        pattern: /SECONDS/i,
    }),
    TIMEZONE: chevrotain_1.createToken({
        name: 'TIMEZONE',
        pattern: /TIMEZONE/i,
    }),
    TZ: chevrotain_1.createToken({
        name: 'TZ',
        pattern: /TZ/i,
    }),
    NOW: chevrotain_1.createToken({
        name: 'NOW',
        pattern: /NOW/i,
    }),
    UUID: chevrotain_1.createToken({
        name: 'UUID',
        pattern: /UUID/i,
    }),
    STRUUID: chevrotain_1.createToken({
        name: 'STRUUID',
        pattern: /STRUUID/i,
    }),
    MD5: chevrotain_1.createToken({
        name: 'MD5',
        pattern: /MD5/i,
    }),
    SHA1: chevrotain_1.createToken({
        name: 'SHA1',
        pattern: /SHA1/i,
    }),
    SHA256: chevrotain_1.createToken({
        name: 'SHA256',
        pattern: /SHA256/i,
    }),
    SHA384: chevrotain_1.createToken({
        name: 'SHA384',
        pattern: /SHA384/i,
    }),
    SHA512: chevrotain_1.createToken({
        name: 'SHA512',
        pattern: /SHA512/i,
    }),
    COALESCE: chevrotain_1.createToken({
        name: 'COALESCE',
        pattern: /COALESCE/i,
    }),
    IF: chevrotain_1.createToken({
        name: 'IF',
        pattern: /IF/i,
    }),
    STRLANG: chevrotain_1.createToken({
        name: 'STRLANG',
        pattern: /STRLANG/i,
    }),
    STRDT: chevrotain_1.createToken({
        name: 'STRDT',
        pattern: /STRDT/i,
    }),
    sameTerm: chevrotain_1.createToken({
        name: 'sameTerm',
        pattern: /sameTerm/i,
    }),
    isIRI: chevrotain_1.createToken({
        name: 'isIRI',
        pattern: /isIRI/i,
    }),
    isURI: chevrotain_1.createToken({
        name: 'isURI',
        pattern: /isURI/i,
    }),
    isBlank: chevrotain_1.createToken({
        name: 'isBlank',
        pattern: /isBlank/i,
    }),
    isLiteral: chevrotain_1.createToken({
        name: 'isLiteral',
        pattern: /isLiteral/i,
    }),
    isNumeric: chevrotain_1.createToken({
        name: 'isNumeric',
        pattern: /isNumeric/i,
    }),
    REGEX: chevrotain_1.createToken({
        name: 'REGEX',
        pattern: /REGEX/i,
    }),
    SUBSTR: chevrotain_1.createToken({
        name: 'SUBSTR',
        pattern: /SUBSTR/i,
    }),
    REPLACE: chevrotain_1.createToken({
        name: 'REPLACE',
        pattern: /REPLACE/i,
    }),
    EXISTS: chevrotain_1.createToken({
        name: 'EXISTS',
        pattern: /EXISTS/i,
    }),
    NOT_EXISTS: chevrotain_1.createToken({
        name: 'NOT_EXISTS',
        pattern: /NOT EXISTS/i,
    }),
    COUNT: chevrotain_1.createToken({
        name: 'COUNT',
        pattern: /COUNT/i,
    }),
    SUM: chevrotain_1.createToken({
        name: 'SUM',
        pattern: /SUM/i,
    }),
    MIN: chevrotain_1.createToken({
        name: 'MIN',
        pattern: /MIN/i,
    }),
    AVG: chevrotain_1.createToken({
        name: 'AVG',
        pattern: /AVG/i,
    }),
    SAMPLE: chevrotain_1.createToken({
        name: 'SAMPLE',
        pattern: /SAMPLE/i,
    }),
    GROUP_CONCAT: chevrotain_1.createToken({
        name: 'GROUP_CONCAT',
        pattern: /GROUP_CONCAT/i,
    }),
    SEPARATOR: chevrotain_1.createToken({
        name: 'SEPARATOR',
        pattern: /SEPARATOR/i,
    }),
    TRUE: chevrotain_1.createToken({
        name: 'TRUE',
        pattern: /TRUE/i,
    }),
    FALSE: chevrotain_1.createToken({
        name: 'FALSE',
        pattern: /FALSE/i,
    }),
    IN: chevrotain_1.createToken({
        name: 'IN',
        pattern: /IN/i,
    }),
    NOT_IN: chevrotain_1.createToken({
        name: 'NOT_IN',
        pattern: /NOT IN/i,
    }),
    MAX_LENGTH,
    MAX: chevrotain_1.createToken({
        name: 'MAX',
        pattern: /MAX/i,
        longer_alt: MAX_LENGTH,
    }),
};
