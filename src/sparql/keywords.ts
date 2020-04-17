// @ts-ignore: import types for declarations
import { createToken, TokenType } from 'chevrotain';

const MAX_LENGTH = createToken({
  name: 'MAX_LENGTH',
  pattern: /MAX LENGTH/i,
});

const Unknown = createToken({
  name: 'Unknown',
  pattern: /(?:a\S|[^a\s])\w*/i,
});

const createKeyword = (name: string, pattern: string = name) =>
  createToken({
    name: name.toString(),
    pattern: new RegExp(pattern, 'i').toString(),
    longer_alt: Unknown,
  });

export const keywords = {
  SELECT: createToken({
    name: 'SELECT',
    pattern: /SELECT/i,
  }),

  CONSTRUCT: createToken({
    name: 'CONSTRUCT',
    pattern: /CONSTRUCT/i,
  }),

  DISTINCT: createToken({
    name: 'DISTINCT',
    pattern: /DISTINCT/i,
  }),

  START: createToken({
    name: 'START',
    pattern: /START/i,
  }),

  END: createToken({
    name: 'END',
    pattern: /END/i,
  }),

  VIA: createToken({
    name: 'VIA',
    pattern: /VIA/i,
  }),

  PATHS: createToken({
    name: 'PATHS',
    pattern: /PATHS/i,
  }),

  PATHS_ALL: createToken({
    name: 'PATHS_ALL',
    pattern: /PATHS ALL/i,
  }),

  PATHS_SHORTEST: createToken({
    name: 'PATHS_SHORTEST',
    pattern: /PATHS SHORTEST/i,
  }),

  CYCLIC: createToken({
    name: 'CYCLIC',
    pattern: /CYCLIC/i,
  }),

  AS: createToken({
    name: 'AS',
    pattern: /AS/i,
  }),

  WHERE: createToken({
    name: 'WHERE',
    pattern: /WHERE/i,
  }),

  A: createToken({
    name: 'A',
    pattern: /a/,
  }),

  GROUP_BY: createToken({
    name: 'GROUP_BY',
    pattern: /GROUP BY/i,
  }),

  ORDER_BY: createToken({
    name: 'ORDER_BY',
    pattern: /ORDER BY/i,
  }),

  BY: createToken({
    name: 'BY',
    pattern: /BY/i,
  }),

  BASE: createToken({
    name: 'BASE',
    pattern: /BASE/i,
  }),

  PREFIX: createToken({
    name: 'PREFIX',
    pattern: /PREFIX/i,
  }),

  DESCRIBE: createToken({
    name: 'DESCRIBE',
    pattern: /DESCRIBE/i,
  }),

  ASK: createToken({
    name: 'ASK',
    pattern: /ASK/i,
  }),

  FROM: createToken({
    name: 'FROM',
    pattern: /FROM/i,
  }),

  REDUCED: createToken({
    name: 'REDUCED',
    pattern: /REDUCED/i,
  }),

  NAMED: createToken({
    name: 'NAMED',
    pattern: /NAMED/i,
  }),

  HAVING: createToken({
    name: 'HAVING',
    pattern: /HAVING/i,
  }),

  ASC: createToken({
    name: 'ASC',
    pattern: /ASC/i,
  }),

  DESC: createToken({
    name: 'DESC',
    pattern: /DESC/i,
  }),

  OFFSET: createToken({
    name: 'OFFSET',
    pattern: /OFFSET/i,
  }),

  LIMIT: createToken({
    name: 'LIMIT',
    pattern: /LIMIT/i,
  }),

  VALUES: createToken({
    name: 'VALUES',
    pattern: /VALUES/i,
  }),

  LOAD: createToken({
    name: 'LOAD',
    pattern: /LOAD/i,
  }),

  SILENT: createToken({
    name: 'SILENT',
    pattern: /SILENT/i,
  }),

  INTO: createToken({
    name: 'INTO',
    pattern: /INTO/i,
  }),

  CLEAR: createToken({
    name: 'CLEAR',
    pattern: /CLEAR/i,
  }),

  DROP: createToken({
    name: 'DROP',
    pattern: /DROP/i,
  }),

  CREATE: createToken({
    name: 'CREATE',
    pattern: /CREATE/i,
  }),

  ADD: createToken({
    name: 'ADD',
    pattern: /ADD/i,
  }),

  TO: createToken({
    name: 'TO',
    pattern: /TO/i,
  }),

  MOVE: createToken({
    name: 'MOVE',
    pattern: /MOVE/i,
  }),

  COPY: createToken({
    name: 'COPY',
    pattern: /COPY/i,
  }),

  INSERT_DATA: createToken({
    name: 'INSERT_DATA',
    pattern: /INSERT +DATA/i,
  }),

  DELETE_DATA: createToken({
    name: 'DELETE_DATA',
    pattern: /DELETE +DATA/i,
  }),

  DELETE_WHERE: createToken({
    name: 'DELETE_WHERE',
    pattern: /DELETE +WHERE/i,
  }),

  WITH: createToken({
    name: 'WITH',
    pattern: /WITH/i,
  }),

  DELETE: createToken({
    name: 'DELETE',
    pattern: /DELETE/i,
  }),

  INSERT: createToken({
    name: 'INSERT',
    pattern: /INSERT/i,
  }),

  USING: createToken({
    name: 'USING',
    pattern: /USING/i,
  }),

  DEFAULT: createToken({
    name: 'DEFAULT',
    pattern: /DEFAULT/i,
  }),

  GRAPH: createToken({
    name: 'GRAPH',
    pattern: /GRAPH/i,
  }),

  ALL: createToken({
    name: 'ALL',
    pattern: /ALL/i,
  }),

  OPTIONAL: createToken({
    name: 'OPTIONAL',
    pattern: /OPTIONAL/i,
  }),

  SERVICE: createToken({
    name: 'SERVICE',
    pattern: /SERVICE/i,
  }),

  BIND: createToken({
    name: 'BIND',
    pattern: /BIND/i,
  }),

  UNNEST: createToken({
    name: 'UNNEST',
    pattern: /UNNEST/i,
  }),

  UNDEF: createToken({
    name: 'UNDEF',
    pattern: /UNDEF/i,
  }),

  MINUS: createToken({
    name: 'MINUS',
    pattern: /MINUS/i,
  }),

  UNION: createToken({
    name: 'UNION',
    pattern: /UNION/i,
  }),

  FILTER: createToken({
    name: 'FILTER',
    pattern: /FILTER/i,
  }),

  STR: createToken({
    name: 'STR',
    pattern: /STR/i,
  }),

  LANG: createToken({
    name: 'LANG',
    pattern: /LANG/i,
  }),

  LANGMATCHES: createToken({
    name: 'LANGMATCHES',
    pattern: /LANGMATCHES/i,
  }),

  DATATYPE: createToken({
    name: 'DATATYPE',
    pattern: /DATATYPE/i,
  }),

  BOUND: createToken({
    name: 'BOUND',
    pattern: /BOUND/i,
  }),

  IRI: createToken({
    name: 'IRI',
    pattern: /IRI/i,
  }),

  URI: createToken({
    name: 'URI',
    pattern: /URI/i,
  }),

  BNODE: createToken({
    name: 'BNODE',
    pattern: /BNODE/i,
  }),

  RAND: createToken({
    name: 'RAND',
    pattern: /RAND/i,
  }),

  ABS: createToken({
    name: 'ABS',
    pattern: /ABS/i,
  }),

  CEIL: createToken({
    name: 'CEIL',
    pattern: /CEIL/i,
  }),

  FLOOR: createToken({
    name: 'FLOOR',
    pattern: /FLOOR/i,
  }),

  ROUND: createToken({
    name: 'ROUND',
    pattern: /ROUND/i,
  }),

  CONCAT: createToken({
    name: 'CONCAT',
    pattern: /CONCAT/i,
  }),

  STRLEN: createToken({
    name: 'STRLEN',
    pattern: /STRLEN/i,
  }),

  UCASE: createToken({
    name: 'UCASE',
    pattern: /UCASE/i,
  }),

  LCASE: createToken({
    name: 'LCASE',
    pattern: /LCASE/i,
  }),

  ENCODE_FOR_URI: createToken({
    name: 'ENCODE_FOR_URI',
    pattern: /ENCODE_FOR_URI/i,
  }),

  CONTAINS: createToken({
    name: 'CONTAINS',
    pattern: /CONTAINS/i,
  }),

  STRSTARTS: createToken({
    name: 'STRSTARTS',
    pattern: /STRSTARTS/i,
  }),

  STRENDS: createToken({
    name: 'STRENDS',
    pattern: /STRENDS/i,
  }),

  STRBEFORE: createToken({
    name: 'STRBEFORE',
    pattern: /STRBEFORE/i,
  }),

  STRAFTER: createToken({
    name: 'STRAFTER',
    pattern: /STRAFTER/i,
  }),

  YEAR: createToken({
    name: 'YEAR',
    pattern: /YEAR/i,
  }),

  MONTH: createToken({
    name: 'MONTH',
    pattern: /MONTH/i,
  }),

  DAY: createToken({
    name: 'DAY',
    pattern: /DAY/i,
  }),

  HOURS: createToken({
    name: 'HOURS',
    pattern: /HOURS/i,
  }),

  MINUTES: createToken({
    name: 'MINUTES',
    pattern: /MINUTES/i,
  }),

  SECONDS: createToken({
    name: 'SECONDS',
    pattern: /SECONDS/i,
  }),

  TIMEZONE: createToken({
    name: 'TIMEZONE',
    pattern: /TIMEZONE/i,
  }),

  TZ: createToken({
    name: 'TZ',
    pattern: /TZ/i,
  }),

  NOW: createToken({
    name: 'NOW',
    pattern: /NOW/i,
  }),

  UUID: createToken({
    name: 'UUID',
    pattern: /UUID/i,
  }),

  STRUUID: createToken({
    name: 'STRUUID',
    pattern: /STRUUID/i,
  }),

  MD5: createToken({
    name: 'MD5',
    pattern: /MD5/i,
  }),

  SHA1: createToken({
    name: 'SHA1',
    pattern: /SHA1/i,
  }),

  SHA256: createToken({
    name: 'SHA256',
    pattern: /SHA256/i,
  }),

  SHA384: createToken({
    name: 'SHA384',
    pattern: /SHA384/i,
  }),

  SHA512: createToken({
    name: 'SHA512',
    pattern: /SHA512/i,
  }),

  COALESCE: createToken({
    name: 'COALESCE',
    pattern: /COALESCE/i,
  }),

  IF: createToken({
    name: 'IF',
    pattern: /IF/i,
  }),

  STRLANG: createToken({
    name: 'STRLANG',
    pattern: /STRLANG/i,
  }),

  STRDT: createToken({
    name: 'STRDT',
    pattern: /STRDT/i,
  }),

  sameTerm: createToken({
    name: 'sameTerm',
    pattern: /sameTerm/i,
  }),

  isIRI: createToken({
    name: 'isIRI',
    pattern: /isIRI/i,
  }),

  isURI: createToken({
    name: 'isURI',
    pattern: /isURI/i,
  }),

  isBLANK: createToken({
    name: 'isBLANK',
    pattern: /isBLANK/i,
  }),

  isLITERAL: createToken({
    name: 'isLITERAL',
    pattern: /isLITERAL/i,
  }),

  isNUMERIC: createToken({
    name: 'isNUMERIC',
    pattern: /isNUMERIC/i,
  }),

  REGEX: createToken({
    name: 'REGEX',
    pattern: /REGEX/i,
  }),

  SUBSTR: createToken({
    name: 'SUBSTR',
    pattern: /SUBSTR/i,
  }),

  REPLACE: createToken({
    name: 'REPLACE',
    pattern: /REPLACE/i,
  }),

  EXISTS: createToken({
    name: 'EXISTS',
    pattern: /EXISTS/i,
  }),

  NOT_EXISTS: createToken({
    name: 'NOT_EXISTS',
    pattern: /NOT EXISTS/i,
  }),

  COUNT: createToken({
    name: 'COUNT',
    pattern: /COUNT/i,
  }),

  SUM: createToken({
    name: 'SUM',
    pattern: /SUM/i,
  }),

  MIN: createToken({
    name: 'MIN',
    pattern: /MIN/i,
  }),

  AVG: createToken({
    name: 'AVG',
    pattern: /AVG/i,
  }),

  SAMPLE: createToken({
    name: 'SAMPLE',
    pattern: /SAMPLE/i,
  }),

  GROUP_CONCAT: createToken({
    name: 'GROUP_CONCAT',
    pattern: /GROUP_CONCAT/i,
  }),

  SEPARATOR: createToken({
    name: 'SEPARATOR',
    pattern: /SEPARATOR/i,
  }),

  TRUE: createToken({
    name: 'TRUE',
    pattern: /TRUE/i,
  }),

  FALSE: createToken({
    name: 'FALSE',
    pattern: /FALSE/i,
  }),

  IN: createKeyword('IN'),

  NOT_IN: createToken({
    name: 'NOT_IN',
    pattern: /NOT IN/i,
  }),

  MAX_LENGTH,
  MAX: createToken({
    name: 'MAX',
    pattern: /MAX/i,
    longer_alt: MAX_LENGTH,
  }),
};
