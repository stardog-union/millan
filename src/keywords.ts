// @ts-ignore: import types for declarations
import { createToken, TokenType } from 'chevrotain';

export enum Keywords {
  SELECT = 'SELECT',
  CONSTRUCT = 'CONSTRUCT',
  DISTINCT = 'DISTINCT',
  AS = 'AS',
  WHERE = 'WHERE',
  GroupBy = 'GROUP BY',
  OrderBy = 'ORDER BY',
  By = 'By',
  BASE = 'BASE',
  PREFIX = 'PREFIX',
  DESCRIBE = 'DESCRIBE',
  ASK = 'ASK',
  FROM = 'FROM',
  REDUCED = 'REDUCED',
  NAMED = 'NAMED',
  HAVING = 'HAVING',
  ASC = 'ASC',
  DESC = 'DESC',
  OFFSET = 'OFFSET',
  LIMIT = 'LIMIT',
  VALUES = 'VALUES',
  LOAD = 'LOAD',
  SILENT = 'SILENT',
  INTO = 'INTO',
  CLEAR = 'CLEAR',
  DROP = 'DROP',
  CREATE = 'CREATE',
  ADD = 'ADD',
  TO = 'TO',
  MOVE = 'MOVE',
  COPY = 'COPY',
  INSERT_DATA = 'INSERT DATA',
  DELETE_DATA = 'DELETE DATA',
  DELETE_WHERE = 'DELETE WHERE',
  WITH = 'WITH',
  DELETE = 'DELETE',
  INSERT = 'INSERT',
  USING = 'USING',
  DEFAULT = 'DEFAULT',
  GRAPH = 'GRAPH',
  ALL = 'ALL',
  OPTIONAL = 'OPTIONAL',
  SERVICE = 'SERVICE',
  BIND = 'BIND',
  UNDEF = 'UNDEF',
  MINUS = 'MINUS',
  UNION = 'UNION',
  FILTER = 'FILTER',
  STR = 'STR',
  LANG = 'LANG',
  LANGMATCHERS = 'LANGMATCHERS',
  DATATYPE = 'DATATYPE',
  BOUND = 'BOUND',
  IRI = 'IRI',
  URI = 'URI',
  BNODE = 'BNODE',
  RAND = 'RAND',
  ABS = 'ABS',
  CEIL = 'CEIL',
  FLOOR = 'FLOOR',
  ROUND = 'ROUND',
  CONCAT = 'CONCAT',
  STRLEN = 'STRLEN',
  UCASE = 'UCASE',
  LCASE = 'LCASE',
  ENCODE_FOR_URI = 'ENCODE_FOR_URI',
  CONTAINS = 'CONTAINS',
  STRSTARTS = 'STRSTARTS',
  STRENDS = 'STRENDS',
  STRBEFORE = 'STRBEFORE',
  STRAFTER = 'STRAFTER',
  YEAR = 'YEAR',
  MONTH = 'MONTH',
  DAY = 'DAY',
  HOURS = 'HOURS',
  MINUTES = 'MINUTES',
  SECONDS = 'SECONDS',
  TIMEZONE = 'TIMEZONE',
  TZ = 'TZ',
  NOW = 'NOW',
  UUID = 'UUID',
  STRUUID = 'STRUUID',
  MD5 = 'MD5',
  SHA1 = 'SHA1',
  SHA256 = 'SHA256',
  SHA384 = 'SHA384',
  SHA512 = 'SHA512',
  COALESCE = 'COALESCE',
  IF = 'IF',
  STRLANG = 'STRLANG',
  STRDT = 'STRDT',
  sameTerm = 'sameTerm',
  isIRI = 'isIRI',
  isURI = 'isURI',
  isBlank = 'isBlank',
  isLiteral = 'isLiteral',
  isNumeric = 'isNumeric',
  REGEX = 'REGEX',
  SUBSTR = 'SUBSTR',
  REPLACE = 'REPLACE',
  EXISTS = 'EXISTS',
  NOT_EXISTS = 'NOT_EXISTS',
  COUNT = 'COUNT',
  SUM = 'SUM',
  MIN = 'MIN',
  MAX = 'MAX',
  AVG = 'AVG',
  SAMPLE = 'SAMPLE',
  GROUP_CONCAT = 'GROUP_CONCAT',
  SEPARATOR = 'SEPARATOR',
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  IN = 'IN',
  NOT_IN = 'NOT IN',
}

const MAX_LENGTH = createToken({
  name: 'MAX_LENGTH',
  pattern: /MAX LENGTH/i,
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

  PATH: createToken({
    name: 'PATH',
    pattern: /PATH/i,
  }),

  EQ: createToken({
    name: 'EQ',
    pattern: /EQ/i,
  }),

  CYCLIC: createToken({
    name: 'CYCLIC',
    pattern: /CYCLIC/i,
  }),

  SHORTEST: createToken({
    name: 'SHORTEST',
    pattern: /SHORTEST/i,
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
    pattern: /a/i,
  }),

  GroupBy: createToken({
    name: 'GroupBy',
    pattern: /group by/i,
  }),

  OrderBy: createToken({
    name: 'OrderBy',
    pattern: /order by/i,
  }),

  By: createToken({
    name: 'By',
    pattern: /By/i,
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
    pattern: /Insert Data/i,
  }),

  DELETE_DATA: createToken({
    name: 'DELETE_DATA',
    pattern: /Delete Data/i,
  }),

  DELETE_WHERE: createToken({
    name: 'DELETE_WHERE',
    pattern: /Delete Where/i,
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

  LANGMATCHERS: createToken({
    name: 'LANGMATCHERS',
    pattern: /LANGMATCHERS/i,
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

  isBlank: createToken({
    name: 'isBlank',
    pattern: /isBlank/i,
  }),

  isLiteral: createToken({
    name: 'isLiteral',
    pattern: /isLiteral/i,
  }),

  isNumeric: createToken({
    name: 'isNumeric',
    pattern: /isNumeric/i,
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

  NOTEXISTS: createToken({
    name: 'NOTEXISTS',
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

  IN: createToken({
    name: 'IN',
    pattern: /IN/i,
  }),

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
