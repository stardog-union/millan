// @ts-ignore: import types for declarations
import { createToken } from 'chevrotain';
import { STRING_LITERAL_LONG1, STRING_LITERAL_LONG2, PNAME_LN, IRIREF, LANGTAG, INTEGER, DECIMAL, DOUBLE, INTEGER_POSITIVE, DECIMAL_POSITIVE, DOUBLE_POSITIVE, INTEGER_NEGATIVE, DECIMAL_NEGATIVE, DOUBLE_NEGATIVE, STRING_LITERAL1, STRING_LITERAL2, NIL, ANON, PNAME_NS, BLANK_NODE_LABEL, VAR1, VAR2, PERCENT, } from 'helpers/matchers';
const STRING_LITERAL_LONG1_TOKEN = createToken({
    name: 'STRING_LITERAL_LONG1',
    pattern: STRING_LITERAL_LONG1,
});
const STRING_LITERAL_LONG2_TOKEN = createToken({
    name: 'STRING_LITERAL_LONG2',
    pattern: STRING_LITERAL_LONG2,
});
const PNAME_LN_TOKEN = createToken({
    name: 'PNAME_LN',
    pattern: PNAME_LN,
});
export const terminals = {
    IRIREF: createToken({
        name: 'IRIREF',
        pattern: IRIREF,
        label: '<http://example.com>',
    }),
    LANGTAG: createToken({
        name: 'LANGTAG',
        pattern: LANGTAG,
    }),
    INTEGER: createToken({
        name: 'INTEGER',
        pattern: INTEGER,
    }),
    DECIMAL: createToken({
        name: 'DECIMAL',
        pattern: DECIMAL,
    }),
    DOUBLE: createToken({
        name: 'DOUBLE',
        pattern: DOUBLE,
    }),
    INTEGER_POSITIVE: createToken({
        name: 'INTEGER_POSITIVE',
        pattern: INTEGER_POSITIVE,
    }),
    DECIMAL_POSITIVE: createToken({
        name: 'DECIMAL_POSITIVE',
        pattern: DECIMAL_POSITIVE,
    }),
    DOUBLE_POSITIVE: createToken({
        name: 'DOUBLE_POSITIVE',
        pattern: DOUBLE_POSITIVE,
    }),
    INTEGER_NEGATIVE: createToken({
        name: 'INTEGER_NEGATIVE',
        pattern: INTEGER_NEGATIVE,
    }),
    DECIMAL_NEGATIVE: createToken({
        name: 'DECIMAL_NEGATIVE',
        pattern: DECIMAL_NEGATIVE,
    }),
    DOUBLE_NEGATIVE: createToken({
        name: 'DOUBLE_NEGATIVE',
        pattern: DOUBLE_NEGATIVE,
    }),
    STRING_LITERAL_LONG1: STRING_LITERAL_LONG1_TOKEN,
    STRING_LITERAL_LONG2: STRING_LITERAL_LONG2_TOKEN,
    STRING_LITERAL1: createToken({
        name: 'STRING_LITERAL1',
        pattern: STRING_LITERAL1,
        longer_alt: STRING_LITERAL_LONG1_TOKEN,
    }),
    STRING_LITERAL2: createToken({
        name: 'STRING_LITERAL2',
        pattern: STRING_LITERAL2,
        longer_alt: STRING_LITERAL_LONG2_TOKEN,
    }),
    NIL: createToken({
        name: 'NIL',
        pattern: NIL,
        label: '()',
    }),
    ANON: createToken({
        name: 'ANON',
        pattern: ANON,
        label: '[]',
    }),
    PNAME_LN: PNAME_LN_TOKEN,
    PNAME_NS: createToken({
        name: 'PNAME_NS',
        pattern: PNAME_NS,
        longer_alt: PNAME_LN_TOKEN,
    }),
    BLANK_NODE_LABEL: createToken({
        name: 'BLANK_NODE_LABEL',
        pattern: BLANK_NODE_LABEL,
    }),
    VAR1: createToken({
        name: 'VAR1',
        pattern: VAR1,
        label: '?foo',
    }),
    VAR2: createToken({
        name: 'VAR2',
        pattern: VAR2,
        label: '?bar',
    }),
    PERCENT: createToken({
        name: 'PERCENT',
        pattern: PERCENT,
    }),
};
