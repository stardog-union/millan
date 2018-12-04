(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chevrotain')) :
  typeof define === 'function' && define.amd ? define(['exports', 'chevrotain'], factory) :
  (factory((global.millan = {}),global.chevrotain));
}(this, (function (exports,chevrotain) { 'use strict';

  const regex = {
      or(...r) {
          return new RegExp(r.map(({ source }) => `(${source})`).join('|'));
      },
      and(...r) {
          return new RegExp(r.map(({ source }) => `(${source})`).join(''));
      },
      option(r) {
          return new RegExp(`(${r.source})?`);
      },
      many(r) {
          return new RegExp(`(${r.source})*`);
      },
  };

  // @ts-ignore: import types for declarations
  const IRIREF = /<[^<>\\{}|\^`\u0000-\u0020]*>/;
  const PN_CHARS_BASE = /[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDBFF][\uDC00-\uDFFF]/;
  const LANGTAG = /@[a-zA-Z]+(-[a-zA-Z0-9]+)*/;
  const INTEGER = /\d+/;
  const DECIMAL = /(\d*\.\d+)|(\d+\.\d*)/;
  const EXPONENT = /[eE][+-]?\d+/;
  const ECHAR = /\\[tbnrf"'\\]/;
  const WS = /[\u0020\u0009\u000d\u000a]/;
  const HEX = /[0-9A-Fa-f]/;
  const PN_LOCAL_ESC = /\\[_~.\-!\$&'()*+,=\/?#@%;]/;
  const PN_CHARS_U = regex.or(PN_CHARS_BASE, /_/);
  const PN_CHARS = regex.or(PN_CHARS_U, /-/, /\d/, /\u00b7/, /[\u0300-\u036f]/, /[\u203f-\u2040]/);
  const PN_PREFIX = regex.and(PN_CHARS_BASE, regex.option(regex.and(regex.many(regex.or(PN_CHARS, /\./)), PN_CHARS)));
  const PERCENT = regex.and(/%/, HEX, HEX);
  const PLX = regex.or(PERCENT, PN_LOCAL_ESC);
  const PN_LOCAL = regex.and(regex.or(PN_CHARS_U, /:/, /\d/, PLX), regex.option(regex.and(regex.many(regex.or(PN_CHARS, /\./, /:/, PLX)), regex.or(PN_CHARS, /:/, PLX))));
  const VARNAME = regex.and(regex.or(PN_CHARS_U, /\d/), regex.many(regex.or(PN_CHARS_U, /\d/, /\u00b7/, /[\u0300-\u036f]/, /[\u203f-\u2040]/)));
  const ANON = regex.and(/\[/, regex.many(WS), /\]/);
  const NIL = regex.and(/\(/, regex.many(WS), /\)/);
  const STRING_LITERAL1 = regex.and(/'/, regex.many(regex.or(/[^\u0027\u005C\u000A\u000D]/, ECHAR)), /'/);
  const STRING_LITERAL2 = regex.and(/"/, regex.many(regex.or(/[^\u0022\u005C\u000A\u000D]/, ECHAR)), /"/);
  const STRING_LITERAL_LONG1 = regex.and(/'''/, regex.many(regex.and(regex.option(regex.or(/'/, /''/)), regex.or(/[^'\\]/, ECHAR))), /'''/);
  const STRING_LITERAL_LONG2 = regex.and(/"""/, regex.many(regex.and(regex.option(regex.or(/"/, /""/)), regex.or(/[^"\\]/, ECHAR))), /"""/);
  const DOUBLE = regex.or(regex.and(/\d+\.\d*/, EXPONENT), regex.and(/\.\d+/, EXPONENT), regex.and(/\d+/, EXPONENT));
  const INTEGER_POSITIVE = regex.and(/\+/, INTEGER);
  const DECIMAL_POSITIVE = regex.and(/\+/, DECIMAL);
  const DOUBLE_POSITIVE = regex.and(/\+/, DOUBLE);
  const INTEGER_NEGATIVE = regex.and(/-/, INTEGER);
  const DECIMAL_NEGATIVE = regex.and(/-/, DECIMAL);
  const DOUBLE_NEGATIVE = regex.and(/-/, DOUBLE);
  const VAR1 = regex.and(/\?/, VARNAME);
  const VAR2 = regex.and(/\$/, VARNAME);
  const BLANK_NODE_LABEL = regex.and(/_:/, regex.or(PN_CHARS_U, /\d/), regex.option(regex.and(regex.many(regex.or(PN_CHARS, /\./)), PN_CHARS)));
  const PNAME_NS = regex.and(regex.option(PN_PREFIX), /:/);
  const PNAME_LN = regex.and(PNAME_NS, PN_LOCAL);
  const STRING_LITERAL_LONG1_TOKEN = chevrotain.createToken({
      name: 'STRING_LITERAL_LONG1',
      pattern: STRING_LITERAL_LONG1,
  });
  const STRING_LITERAL_LONG2_TOKEN = chevrotain.createToken({
      name: 'STRING_LITERAL_LONG2',
      pattern: STRING_LITERAL_LONG2,
  });
  const PNAME_LN_TOKEN = chevrotain.createToken({
      name: 'PNAME_LN',
      pattern: PNAME_LN,
  });
  const terminals = {
      IRIREF: chevrotain.createToken({
          name: 'IRIREF',
          pattern: IRIREF,
          label: '<http://example.com>',
      }),
      LANGTAG: chevrotain.createToken({
          name: 'LANGTAG',
          pattern: LANGTAG,
      }),
      INTEGER: chevrotain.createToken({
          name: 'INTEGER',
          pattern: INTEGER,
      }),
      DECIMAL: chevrotain.createToken({
          name: 'DECIMAL',
          pattern: DECIMAL,
      }),
      DOUBLE: chevrotain.createToken({
          name: 'DOUBLE',
          pattern: DOUBLE,
      }),
      INTEGER_POSITIVE: chevrotain.createToken({
          name: 'INTEGER_POSITIVE',
          pattern: INTEGER_POSITIVE,
      }),
      DECIMAL_POSITIVE: chevrotain.createToken({
          name: 'DECIMAL_POSITIVE',
          pattern: DECIMAL_POSITIVE,
      }),
      DOUBLE_POSITIVE: chevrotain.createToken({
          name: 'DOUBLE_POSITIVE',
          pattern: DOUBLE_POSITIVE,
      }),
      INTEGER_NEGATIVE: chevrotain.createToken({
          name: 'INTEGER_NEGATIVE',
          pattern: INTEGER_NEGATIVE,
      }),
      DECIMAL_NEGATIVE: chevrotain.createToken({
          name: 'DECIMAL_NEGATIVE',
          pattern: DECIMAL_NEGATIVE,
      }),
      DOUBLE_NEGATIVE: chevrotain.createToken({
          name: 'DOUBLE_NEGATIVE',
          pattern: DOUBLE_NEGATIVE,
      }),
      STRING_LITERAL_LONG1: STRING_LITERAL_LONG1_TOKEN,
      STRING_LITERAL_LONG2: STRING_LITERAL_LONG2_TOKEN,
      STRING_LITERAL1: chevrotain.createToken({
          name: 'STRING_LITERAL1',
          pattern: STRING_LITERAL1,
          longer_alt: STRING_LITERAL_LONG1_TOKEN,
      }),
      STRING_LITERAL2: chevrotain.createToken({
          name: 'STRING_LITERAL2',
          pattern: STRING_LITERAL2,
          longer_alt: STRING_LITERAL_LONG2_TOKEN,
      }),
      NIL: chevrotain.createToken({
          name: 'NIL',
          pattern: NIL,
          label: '()',
      }),
      ANON: chevrotain.createToken({
          name: 'ANON',
          pattern: ANON,
          label: '[]',
      }),
      PNAME_LN: PNAME_LN_TOKEN,
      PNAME_NS: chevrotain.createToken({
          name: 'PNAME_NS',
          pattern: PNAME_NS,
          longer_alt: PNAME_LN_TOKEN,
      }),
      BLANK_NODE_LABEL: chevrotain.createToken({
          name: 'BLANK_NODE_LABEL',
          pattern: BLANK_NODE_LABEL,
      }),
      VAR1: chevrotain.createToken({
          name: 'VAR1',
          pattern: VAR1,
          label: '?foo',
      }),
      VAR2: chevrotain.createToken({
          name: 'VAR2',
          pattern: VAR2,
          label: '?bar',
      }),
      PERCENT: chevrotain.createToken({
          name: 'PERCENT',
          pattern: PERCENT,
      }),
  };

  // @ts-ignore: import types for declarations
  const MAX_LENGTH = chevrotain.createToken({
      name: 'MAX_LENGTH',
      pattern: /MAX LENGTH/i,
  });
  const keywords = {
      SELECT: chevrotain.createToken({
          name: 'SELECT',
          pattern: /SELECT/i,
      }),
      CONSTRUCT: chevrotain.createToken({
          name: 'CONSTRUCT',
          pattern: /CONSTRUCT/i,
      }),
      DISTINCT: chevrotain.createToken({
          name: 'DISTINCT',
          pattern: /DISTINCT/i,
      }),
      START: chevrotain.createToken({
          name: 'START',
          pattern: /START/i,
      }),
      END: chevrotain.createToken({
          name: 'END',
          pattern: /END/i,
      }),
      VIA: chevrotain.createToken({
          name: 'VIA',
          pattern: /VIA/i,
      }),
      PATHS: chevrotain.createToken({
          name: 'PATHS',
          pattern: /PATHS/i,
      }),
      PATHS_ALL: chevrotain.createToken({
          name: 'PATHS_ALL',
          pattern: /PATHS ALL/i,
      }),
      PATHS_SHORTEST: chevrotain.createToken({
          name: 'PATHS_SHORTEST',
          pattern: /PATHS SHORTEST/i,
      }),
      CYCLIC: chevrotain.createToken({
          name: 'CYCLIC',
          pattern: /CYCLIC/i,
      }),
      AS: chevrotain.createToken({
          name: 'AS',
          pattern: /AS/i,
      }),
      WHERE: chevrotain.createToken({
          name: 'WHERE',
          pattern: /WHERE/i,
      }),
      A: chevrotain.createToken({
          name: 'A',
          pattern: /a/i,
      }),
      GroupBy: chevrotain.createToken({
          name: 'GroupBy',
          pattern: /group by/i,
      }),
      OrderBy: chevrotain.createToken({
          name: 'OrderBy',
          pattern: /order by/i,
      }),
      By: chevrotain.createToken({
          name: 'By',
          pattern: /By/i,
      }),
      BASE: chevrotain.createToken({
          name: 'BASE',
          pattern: /BASE/i,
      }),
      PREFIX: chevrotain.createToken({
          name: 'PREFIX',
          pattern: /PREFIX/i,
      }),
      DESCRIBE: chevrotain.createToken({
          name: 'DESCRIBE',
          pattern: /DESCRIBE/i,
      }),
      ASK: chevrotain.createToken({
          name: 'ASK',
          pattern: /ASK/i,
      }),
      FROM: chevrotain.createToken({
          name: 'FROM',
          pattern: /FROM/i,
      }),
      REDUCED: chevrotain.createToken({
          name: 'REDUCED',
          pattern: /REDUCED/i,
      }),
      NAMED: chevrotain.createToken({
          name: 'NAMED',
          pattern: /NAMED/i,
      }),
      HAVING: chevrotain.createToken({
          name: 'HAVING',
          pattern: /HAVING/i,
      }),
      ASC: chevrotain.createToken({
          name: 'ASC',
          pattern: /ASC/i,
      }),
      DESC: chevrotain.createToken({
          name: 'DESC',
          pattern: /DESC/i,
      }),
      OFFSET: chevrotain.createToken({
          name: 'OFFSET',
          pattern: /OFFSET/i,
      }),
      LIMIT: chevrotain.createToken({
          name: 'LIMIT',
          pattern: /LIMIT/i,
      }),
      VALUES: chevrotain.createToken({
          name: 'VALUES',
          pattern: /VALUES/i,
      }),
      LOAD: chevrotain.createToken({
          name: 'LOAD',
          pattern: /LOAD/i,
      }),
      SILENT: chevrotain.createToken({
          name: 'SILENT',
          pattern: /SILENT/i,
      }),
      INTO: chevrotain.createToken({
          name: 'INTO',
          pattern: /INTO/i,
      }),
      CLEAR: chevrotain.createToken({
          name: 'CLEAR',
          pattern: /CLEAR/i,
      }),
      DROP: chevrotain.createToken({
          name: 'DROP',
          pattern: /DROP/i,
      }),
      CREATE: chevrotain.createToken({
          name: 'CREATE',
          pattern: /CREATE/i,
      }),
      ADD: chevrotain.createToken({
          name: 'ADD',
          pattern: /ADD/i,
      }),
      TO: chevrotain.createToken({
          name: 'TO',
          pattern: /TO/i,
      }),
      MOVE: chevrotain.createToken({
          name: 'MOVE',
          pattern: /MOVE/i,
      }),
      COPY: chevrotain.createToken({
          name: 'COPY',
          pattern: /COPY/i,
      }),
      INSERT_DATA: chevrotain.createToken({
          name: 'INSERT_DATA',
          pattern: /Insert +Data/i,
      }),
      DELETE_DATA: chevrotain.createToken({
          name: 'DELETE_DATA',
          pattern: /Delete +Data/i,
      }),
      DELETE_WHERE: chevrotain.createToken({
          name: 'DELETE_WHERE',
          pattern: /Delete +Where/i,
      }),
      WITH: chevrotain.createToken({
          name: 'WITH',
          pattern: /WITH/i,
      }),
      DELETE: chevrotain.createToken({
          name: 'DELETE',
          pattern: /DELETE/i,
      }),
      INSERT: chevrotain.createToken({
          name: 'INSERT',
          pattern: /INSERT/i,
      }),
      USING: chevrotain.createToken({
          name: 'USING',
          pattern: /USING/i,
      }),
      DEFAULT: chevrotain.createToken({
          name: 'DEFAULT',
          pattern: /DEFAULT/i,
      }),
      GRAPH: chevrotain.createToken({
          name: 'GRAPH',
          pattern: /GRAPH/i,
      }),
      ALL: chevrotain.createToken({
          name: 'ALL',
          pattern: /ALL/i,
      }),
      OPTIONAL: chevrotain.createToken({
          name: 'OPTIONAL',
          pattern: /OPTIONAL/i,
      }),
      SERVICE: chevrotain.createToken({
          name: 'SERVICE',
          pattern: /SERVICE/i,
      }),
      BIND: chevrotain.createToken({
          name: 'BIND',
          pattern: /BIND/i,
      }),
      UNDEF: chevrotain.createToken({
          name: 'UNDEF',
          pattern: /UNDEF/i,
      }),
      MINUS: chevrotain.createToken({
          name: 'MINUS',
          pattern: /MINUS/i,
      }),
      UNION: chevrotain.createToken({
          name: 'UNION',
          pattern: /UNION/i,
      }),
      FILTER: chevrotain.createToken({
          name: 'FILTER',
          pattern: /FILTER/i,
      }),
      STR: chevrotain.createToken({
          name: 'STR',
          pattern: /STR/i,
      }),
      LANG: chevrotain.createToken({
          name: 'LANG',
          pattern: /LANG/i,
      }),
      LANGMATCHERS: chevrotain.createToken({
          name: 'LANGMATCHERS',
          pattern: /LANGMATCHERS/i,
      }),
      DATATYPE: chevrotain.createToken({
          name: 'DATATYPE',
          pattern: /DATATYPE/i,
      }),
      BOUND: chevrotain.createToken({
          name: 'BOUND',
          pattern: /BOUND/i,
      }),
      IRI: chevrotain.createToken({
          name: 'IRI',
          pattern: /IRI/i,
      }),
      URI: chevrotain.createToken({
          name: 'URI',
          pattern: /URI/i,
      }),
      BNODE: chevrotain.createToken({
          name: 'BNODE',
          pattern: /BNODE/i,
      }),
      RAND: chevrotain.createToken({
          name: 'RAND',
          pattern: /RAND/i,
      }),
      ABS: chevrotain.createToken({
          name: 'ABS',
          pattern: /ABS/i,
      }),
      CEIL: chevrotain.createToken({
          name: 'CEIL',
          pattern: /CEIL/i,
      }),
      FLOOR: chevrotain.createToken({
          name: 'FLOOR',
          pattern: /FLOOR/i,
      }),
      ROUND: chevrotain.createToken({
          name: 'ROUND',
          pattern: /ROUND/i,
      }),
      CONCAT: chevrotain.createToken({
          name: 'CONCAT',
          pattern: /CONCAT/i,
      }),
      STRLEN: chevrotain.createToken({
          name: 'STRLEN',
          pattern: /STRLEN/i,
      }),
      UCASE: chevrotain.createToken({
          name: 'UCASE',
          pattern: /UCASE/i,
      }),
      LCASE: chevrotain.createToken({
          name: 'LCASE',
          pattern: /LCASE/i,
      }),
      ENCODE_FOR_URI: chevrotain.createToken({
          name: 'ENCODE_FOR_URI',
          pattern: /ENCODE_FOR_URI/i,
      }),
      CONTAINS: chevrotain.createToken({
          name: 'CONTAINS',
          pattern: /CONTAINS/i,
      }),
      STRSTARTS: chevrotain.createToken({
          name: 'STRSTARTS',
          pattern: /STRSTARTS/i,
      }),
      STRENDS: chevrotain.createToken({
          name: 'STRENDS',
          pattern: /STRENDS/i,
      }),
      STRBEFORE: chevrotain.createToken({
          name: 'STRBEFORE',
          pattern: /STRBEFORE/i,
      }),
      STRAFTER: chevrotain.createToken({
          name: 'STRAFTER',
          pattern: /STRAFTER/i,
      }),
      YEAR: chevrotain.createToken({
          name: 'YEAR',
          pattern: /YEAR/i,
      }),
      MONTH: chevrotain.createToken({
          name: 'MONTH',
          pattern: /MONTH/i,
      }),
      DAY: chevrotain.createToken({
          name: 'DAY',
          pattern: /DAY/i,
      }),
      HOURS: chevrotain.createToken({
          name: 'HOURS',
          pattern: /HOURS/i,
      }),
      MINUTES: chevrotain.createToken({
          name: 'MINUTES',
          pattern: /MINUTES/i,
      }),
      SECONDS: chevrotain.createToken({
          name: 'SECONDS',
          pattern: /SECONDS/i,
      }),
      TIMEZONE: chevrotain.createToken({
          name: 'TIMEZONE',
          pattern: /TIMEZONE/i,
      }),
      TZ: chevrotain.createToken({
          name: 'TZ',
          pattern: /TZ/i,
      }),
      NOW: chevrotain.createToken({
          name: 'NOW',
          pattern: /NOW/i,
      }),
      UUID: chevrotain.createToken({
          name: 'UUID',
          pattern: /UUID/i,
      }),
      STRUUID: chevrotain.createToken({
          name: 'STRUUID',
          pattern: /STRUUID/i,
      }),
      MD5: chevrotain.createToken({
          name: 'MD5',
          pattern: /MD5/i,
      }),
      SHA1: chevrotain.createToken({
          name: 'SHA1',
          pattern: /SHA1/i,
      }),
      SHA256: chevrotain.createToken({
          name: 'SHA256',
          pattern: /SHA256/i,
      }),
      SHA384: chevrotain.createToken({
          name: 'SHA384',
          pattern: /SHA384/i,
      }),
      SHA512: chevrotain.createToken({
          name: 'SHA512',
          pattern: /SHA512/i,
      }),
      COALESCE: chevrotain.createToken({
          name: 'COALESCE',
          pattern: /COALESCE/i,
      }),
      IF: chevrotain.createToken({
          name: 'IF',
          pattern: /IF/i,
      }),
      STRLANG: chevrotain.createToken({
          name: 'STRLANG',
          pattern: /STRLANG/i,
      }),
      STRDT: chevrotain.createToken({
          name: 'STRDT',
          pattern: /STRDT/i,
      }),
      sameTerm: chevrotain.createToken({
          name: 'sameTerm',
          pattern: /sameTerm/i,
      }),
      isIRI: chevrotain.createToken({
          name: 'isIRI',
          pattern: /isIRI/i,
      }),
      isURI: chevrotain.createToken({
          name: 'isURI',
          pattern: /isURI/i,
      }),
      isBlank: chevrotain.createToken({
          name: 'isBlank',
          pattern: /isBlank/i,
      }),
      isLiteral: chevrotain.createToken({
          name: 'isLiteral',
          pattern: /isLiteral/i,
      }),
      isNumeric: chevrotain.createToken({
          name: 'isNumeric',
          pattern: /isNumeric/i,
      }),
      REGEX: chevrotain.createToken({
          name: 'REGEX',
          pattern: /REGEX/i,
      }),
      SUBSTR: chevrotain.createToken({
          name: 'SUBSTR',
          pattern: /SUBSTR/i,
      }),
      REPLACE: chevrotain.createToken({
          name: 'REPLACE',
          pattern: /REPLACE/i,
      }),
      EXISTS: chevrotain.createToken({
          name: 'EXISTS',
          pattern: /EXISTS/i,
      }),
      NOT_EXISTS: chevrotain.createToken({
          name: 'NOT_EXISTS',
          pattern: /NOT EXISTS/i,
      }),
      COUNT: chevrotain.createToken({
          name: 'COUNT',
          pattern: /COUNT/i,
      }),
      SUM: chevrotain.createToken({
          name: 'SUM',
          pattern: /SUM/i,
      }),
      MIN: chevrotain.createToken({
          name: 'MIN',
          pattern: /MIN/i,
      }),
      AVG: chevrotain.createToken({
          name: 'AVG',
          pattern: /AVG/i,
      }),
      SAMPLE: chevrotain.createToken({
          name: 'SAMPLE',
          pattern: /SAMPLE/i,
      }),
      GROUP_CONCAT: chevrotain.createToken({
          name: 'GROUP_CONCAT',
          pattern: /GROUP_CONCAT/i,
      }),
      SEPARATOR: chevrotain.createToken({
          name: 'SEPARATOR',
          pattern: /SEPARATOR/i,
      }),
      TRUE: chevrotain.createToken({
          name: 'TRUE',
          pattern: /TRUE/i,
      }),
      FALSE: chevrotain.createToken({
          name: 'FALSE',
          pattern: /FALSE/i,
      }),
      IN: chevrotain.createToken({
          name: 'IN',
          pattern: /IN/i,
      }),
      NOT_IN: chevrotain.createToken({
          name: 'NOT_IN',
          pattern: /NOT IN/i,
      }),
      MAX_LENGTH,
      MAX: chevrotain.createToken({
          name: 'MAX',
          pattern: /MAX/i,
          longer_alt: MAX_LENGTH,
      }),
  };

  // @ts-ignore: import types for declarations
  const tokenMap = {
      IRIREF: terminals.IRIREF,
      LANGTAG: terminals.LANGTAG,
      INTEGER: terminals.INTEGER,
      DECIMAL: terminals.DECIMAL,
      DOUBLE: terminals.DOUBLE,
      INTEGER_POSITIVE: terminals.INTEGER_POSITIVE,
      DECIMAL_POSITIVE: terminals.DECIMAL_POSITIVE,
      DOUBLE_POSITIVE: terminals.DOUBLE_POSITIVE,
      INTEGER_NEGATIVE: terminals.INTEGER_NEGATIVE,
      DECIMAL_NEGATIVE: terminals.DECIMAL_NEGATIVE,
      DOUBLE_NEGATIVE: terminals.DOUBLE_NEGATIVE,
      STRING_LITERAL1: terminals.STRING_LITERAL1,
      STRING_LITERAL2: terminals.STRING_LITERAL2,
      STRING_LITERAL_LONG1: terminals.STRING_LITERAL_LONG1,
      STRING_LITERAL_LONG2: terminals.STRING_LITERAL_LONG2,
      NIL: terminals.NIL,
      ANON: terminals.ANON,
      PNAME_NS: terminals.PNAME_NS,
      PNAME_LN: terminals.PNAME_LN,
      BLANK_NODE_LABEL: terminals.BLANK_NODE_LABEL,
      VAR1: terminals.VAR1,
      VAR2: terminals.VAR2,
      PERCENT: terminals.PERCENT,
      Comment: chevrotain.createToken({
          name: 'Comment',
          pattern: /#[^\n]*/,
          group: 'comments',
      }),
      LCurly: chevrotain.createToken({ name: 'LCurly', pattern: '{' }),
      RCurly: chevrotain.createToken({ name: 'RCurly', pattern: '}' }),
      LParen: chevrotain.createToken({ name: 'LParen', pattern: '(' }),
      RParen: chevrotain.createToken({ name: 'RParen', pattern: ')' }),
      WhiteSpace: chevrotain.createToken({
          name: 'WhiteSpace',
          pattern: /\s+/,
          group: chevrotain.Lexer.SKIPPED,
          line_breaks: true,
      }),
      Star: chevrotain.createToken({
          name: 'Star',
          pattern: '*',
      }),
      Unknown: chevrotain.createToken({
          name: 'Unknown',
          pattern: /\w+/,
      }),
      Period: chevrotain.createToken({
          name: 'Period',
          pattern: '.',
      }),
      QuestionMark: chevrotain.createToken({
          name: 'QuestionMark',
          pattern: '?',
      }),
      Plus: chevrotain.createToken({
          name: 'Plus',
          pattern: '+',
      }),
      Minus: chevrotain.createToken({
          name: 'Minus',
          pattern: '-',
      }),
      LBracket: chevrotain.createToken({
          name: 'LBracket',
          pattern: '[',
      }),
      RBracket: chevrotain.createToken({
          name: 'RBracket',
          pattern: ']',
      }),
      Semicolon: chevrotain.createToken({
          name: 'Semicolon',
          pattern: ';',
      }),
      Comma: chevrotain.createToken({
          name: 'Comma',
          pattern: ',',
      }),
      Pipe: chevrotain.createToken({
          name: 'Pipe',
          pattern: '|',
      }),
      ForwardSlash: chevrotain.createToken({
          name: 'ForwardSlash',
          pattern: '/',
      }),
      Caret: chevrotain.createToken({
          name: 'Caret',
          pattern: '^',
      }),
      DoubleCaret: chevrotain.createToken({
          name: 'DoubleCaret',
          pattern: '^^',
      }),
      Bang: chevrotain.createToken({
          name: 'Bang',
          pattern: '!',
      }),
      LogicalOr: chevrotain.createToken({
          name: 'LogicalOr',
          pattern: '||',
      }),
      LogicalAnd: chevrotain.createToken({
          name: 'LogicalAnd',
          pattern: '&&',
      }),
      Equals: chevrotain.createToken({
          name: 'Equals',
          pattern: '=',
      }),
      NotEquals: chevrotain.createToken({
          name: 'NotEquals',
          pattern: '!=',
      }),
      LessThan: chevrotain.createToken({
          name: 'LessThan',
          pattern: '<',
      }),
      GreaterThan: chevrotain.createToken({
          name: 'GreaterThan',
          pattern: '>',
      }),
      LessThanEquals: chevrotain.createToken({
          name: 'LessThanEquals',
          pattern: '<=',
      }),
      GreaterThanEquals: chevrotain.createToken({
          name: 'GreaterThanEquals',
          pattern: '>=',
      }),
      SELECT: keywords.SELECT,
      CONSTRUCT: keywords.CONSTRUCT,
      DISTINCT: keywords.DISTINCT,
      START: keywords.START,
      END: keywords.END,
      VIA: keywords.VIA,
      CYCLIC: keywords.CYCLIC,
      PATHS_SHORTEST: keywords.PATHS_SHORTEST,
      PATHS_ALL: keywords.PATHS_ALL,
      PATHS: keywords.PATHS,
      AS: keywords.AS,
      WHERE: keywords.WHERE,
      A: keywords.A,
      GroupBy: keywords.GroupBy,
      OrderBy: keywords.OrderBy,
      By: keywords.By,
      BASE: keywords.BASE,
      PREFIX: keywords.PREFIX,
      DESCRIBE: keywords.DESCRIBE,
      ASK: keywords.ASK,
      FROM: keywords.FROM,
      REDUCED: keywords.REDUCED,
      NAMED: keywords.NAMED,
      HAVING: keywords.HAVING,
      ASC: keywords.ASC,
      DESC: keywords.DESC,
      OFFSET: keywords.OFFSET,
      LIMIT: keywords.LIMIT,
      VALUES: keywords.VALUES,
      LOAD: keywords.LOAD,
      SILENT: keywords.SILENT,
      INTO: keywords.INTO,
      CLEAR: keywords.CLEAR,
      DROP: keywords.DROP,
      CREATE: keywords.CREATE,
      ADD: keywords.ADD,
      TO: keywords.TO,
      MOVE: keywords.MOVE,
      COPY: keywords.COPY,
      INSERT_DATA: keywords.INSERT_DATA,
      DELETE_DATA: keywords.DELETE_DATA,
      DELETE_WHERE: keywords.DELETE_WHERE,
      WITH: keywords.WITH,
      DELETE: keywords.DELETE,
      INSERT: keywords.INSERT,
      USING: keywords.USING,
      DEFAULT: keywords.DEFAULT,
      GRAPH: keywords.GRAPH,
      ALL: keywords.ALL,
      OPTIONAL: keywords.OPTIONAL,
      SERVICE: keywords.SERVICE,
      BIND: keywords.BIND,
      UNDEF: keywords.UNDEF,
      MINUS: keywords.MINUS,
      UNION: keywords.UNION,
      FILTER: keywords.FILTER,
      STR: keywords.STR,
      LANG: keywords.LANG,
      LANGMATCHERS: keywords.LANGMATCHERS,
      DATATYPE: keywords.DATATYPE,
      BOUND: keywords.BOUND,
      IRI: keywords.IRI,
      URI: keywords.URI,
      BNODE: keywords.BNODE,
      RAND: keywords.RAND,
      ABS: keywords.ABS,
      CEIL: keywords.CEIL,
      FLOOR: keywords.FLOOR,
      ROUND: keywords.ROUND,
      CONCAT: keywords.CONCAT,
      STRLEN: keywords.STRLEN,
      UCASE: keywords.UCASE,
      LCASE: keywords.LCASE,
      ENCODE_FOR_URI: keywords.ENCODE_FOR_URI,
      CONTAINS: keywords.CONTAINS,
      STRSTARTS: keywords.STRSTARTS,
      STRENDS: keywords.STRENDS,
      STRBEFORE: keywords.STRBEFORE,
      STRAFTER: keywords.STRAFTER,
      YEAR: keywords.YEAR,
      MONTH: keywords.MONTH,
      DAY: keywords.DAY,
      HOURS: keywords.HOURS,
      MINUTES: keywords.MINUTES,
      SECONDS: keywords.SECONDS,
      TIMEZONE: keywords.TIMEZONE,
      TZ: keywords.TZ,
      NOW: keywords.NOW,
      UUID: keywords.UUID,
      STRUUID: keywords.STRUUID,
      MD5: keywords.MD5,
      SHA1: keywords.SHA1,
      SHA256: keywords.SHA256,
      SHA384: keywords.SHA384,
      SHA512: keywords.SHA512,
      COALESCE: keywords.COALESCE,
      IF: keywords.IF,
      STRLANG: keywords.STRLANG,
      STRDT: keywords.STRDT,
      sameTerm: keywords.sameTerm,
      isIRI: keywords.isIRI,
      isURI: keywords.isURI,
      isBlank: keywords.isBlank,
      isLiteral: keywords.isLiteral,
      isNumeric: keywords.isNumeric,
      REGEX: keywords.REGEX,
      SUBSTR: keywords.SUBSTR,
      REPLACE: keywords.REPLACE,
      EXISTS: keywords.EXISTS,
      NOT_EXISTS: keywords.NOT_EXISTS,
      COUNT: keywords.COUNT,
      SUM: keywords.SUM,
      MIN: keywords.MIN,
      AVG: keywords.AVG,
      SAMPLE: keywords.SAMPLE,
      GROUP_CONCAT: keywords.GROUP_CONCAT,
      SEPARATOR: keywords.SEPARATOR,
      TRUE: keywords.TRUE,
      FALSE: keywords.FALSE,
      IN: keywords.IN,
      NOT_IN: keywords.NOT_IN,
      MAX_LENGTH: keywords.MAX_LENGTH,
      MAX: keywords.MAX,
  };
  const baseTokens = [
      tokenMap.NIL,
      tokenMap.ANON,
      tokenMap.LCurly,
      tokenMap.RCurly,
      tokenMap.LParen,
      tokenMap.RParen,
      tokenMap.WhiteSpace,
      tokenMap.IRIREF,
      tokenMap.LANGTAG,
      tokenMap.DOUBLE,
      tokenMap.DECIMAL,
      tokenMap.INTEGER,
      tokenMap.DOUBLE_POSITIVE,
      tokenMap.DECIMAL_POSITIVE,
      tokenMap.INTEGER_POSITIVE,
      tokenMap.DOUBLE_NEGATIVE,
      tokenMap.DECIMAL_NEGATIVE,
      tokenMap.INTEGER_NEGATIVE,
      tokenMap.STRING_LITERAL1,
      tokenMap.STRING_LITERAL2,
      tokenMap.STRING_LITERAL_LONG1,
      tokenMap.STRING_LITERAL_LONG2,
      tokenMap.PNAME_NS,
      tokenMap.PNAME_LN,
      tokenMap.BLANK_NODE_LABEL,
      tokenMap.VAR1,
      tokenMap.VAR2,
      tokenMap.Comment,
      tokenMap.SELECT,
      tokenMap.CONSTRUCT,
      tokenMap.DISTINCT,
      tokenMap.Star,
      tokenMap.WHERE,
      tokenMap.GroupBy,
      tokenMap.OrderBy,
      tokenMap.By,
      tokenMap.Period,
      tokenMap.QuestionMark,
      tokenMap.Plus,
      tokenMap.Minus,
      tokenMap.LBracket,
      tokenMap.RBracket,
      tokenMap.PERCENT,
      tokenMap.BASE,
      tokenMap.PREFIX,
      tokenMap.DESCRIBE,
      tokenMap.ASK,
      tokenMap.FROM,
      tokenMap.REDUCED,
      tokenMap.NAMED,
      tokenMap.HAVING,
      tokenMap.ASC,
      tokenMap.DESC,
      tokenMap.OFFSET,
      tokenMap.LIMIT,
      tokenMap.VALUES,
      tokenMap.LOAD,
      tokenMap.SILENT,
      tokenMap.INTO,
      tokenMap.AS,
      tokenMap.CLEAR,
      tokenMap.DROP,
      tokenMap.CREATE,
      tokenMap.ADD,
      tokenMap.TO,
      tokenMap.MOVE,
      tokenMap.COPY,
      tokenMap.INSERT_DATA,
      tokenMap.DELETE_DATA,
      tokenMap.DELETE_WHERE,
      tokenMap.WITH,
      tokenMap.DELETE,
      tokenMap.INSERT,
      tokenMap.USING,
      tokenMap.DEFAULT,
      tokenMap.GRAPH,
      tokenMap.ALL,
      tokenMap.OPTIONAL,
      tokenMap.SERVICE,
      tokenMap.BIND,
      tokenMap.UNDEF,
      tokenMap.MINUS,
      tokenMap.UNION,
      tokenMap.FILTER,
      tokenMap.LANGMATCHERS,
      tokenMap.LANG,
      tokenMap.DATATYPE,
      tokenMap.BOUND,
      tokenMap.IRI,
      tokenMap.URI,
      tokenMap.BNODE,
      tokenMap.RAND,
      tokenMap.ABS,
      tokenMap.CEIL,
      tokenMap.FLOOR,
      tokenMap.ROUND,
      tokenMap.CONCAT,
      tokenMap.STRLEN,
      tokenMap.UCASE,
      tokenMap.LCASE,
      tokenMap.ENCODE_FOR_URI,
      tokenMap.CONTAINS,
      tokenMap.STRSTARTS,
      tokenMap.STRENDS,
      tokenMap.STRBEFORE,
      tokenMap.STRAFTER,
      tokenMap.YEAR,
      tokenMap.MONTH,
      tokenMap.DAY,
      tokenMap.HOURS,
      tokenMap.MINUTES,
      tokenMap.SECONDS,
      tokenMap.TIMEZONE,
      tokenMap.TZ,
      tokenMap.NOW,
      tokenMap.UUID,
      tokenMap.STRUUID,
      tokenMap.MD5,
      tokenMap.SHA1,
      tokenMap.SHA256,
      tokenMap.SHA384,
      tokenMap.SHA512,
      tokenMap.COALESCE,
      tokenMap.IF,
      tokenMap.STRLANG,
      tokenMap.STRDT,
      tokenMap.STR,
      tokenMap.sameTerm,
      tokenMap.isIRI,
      tokenMap.isURI,
      tokenMap.isBlank,
      tokenMap.isLiteral,
      tokenMap.isNumeric,
      tokenMap.REGEX,
      tokenMap.SUBSTR,
      tokenMap.REPLACE,
      tokenMap.EXISTS,
      tokenMap.NOT_EXISTS,
      tokenMap.COUNT,
      tokenMap.SUM,
      tokenMap.MIN,
      tokenMap.MAX_LENGTH,
      tokenMap.MAX,
      tokenMap.AVG,
      tokenMap.SAMPLE,
      tokenMap.GROUP_CONCAT,
      tokenMap.SEPARATOR,
      tokenMap.TRUE,
      tokenMap.FALSE,
      tokenMap.Semicolon,
      tokenMap.Comma,
      tokenMap.ForwardSlash,
      tokenMap.DoubleCaret,
      tokenMap.Caret,
      tokenMap.LogicalOr,
      tokenMap.Pipe,
      tokenMap.LogicalAnd,
      tokenMap.NotEquals,
      tokenMap.Bang,
      tokenMap.Equals,
      tokenMap.LessThanEquals,
      tokenMap.GreaterThanEquals,
      tokenMap.LessThan,
      tokenMap.GreaterThan,
      tokenMap.IN,
      tokenMap.NOT_IN,
      tokenMap.A,
      tokenMap.Unknown,
  ];
  const pathsTokens = [
      tokenMap.START,
      tokenMap.END,
      tokenMap.VIA,
      tokenMap.CYCLIC,
      tokenMap.PATHS_SHORTEST,
      tokenMap.PATHS_ALL,
      tokenMap.PATHS,
  ];

  class BaseSparqlParser extends chevrotain.Parser {
      constructor(options = {}, tokenVocab) {
          super(options.input || [], tokenVocab, Object.assign({ recoveryEnabled: true, outputCst: true }, options.config));
          this.tokenize = (document) => this.lexer.tokenize(document).tokens;
          this.parse = (document) => {
              this.input = this.lexer.tokenize(document).tokens;
              const cst = this.SparqlDoc();
              const errors = this.errors;
              return {
                  errors,
                  cst,
              };
          };
          // Grammar Rules
          this.SparqlDoc = this.RULE('SparqlDoc', () => {
              this.SUBRULE(this.Prologue);
              this.OR([
                  { ALT: () => this.SUBRULE(this.QueryUnit) },
                  { ALT: () => this.SUBRULE(this.UpdateUnit) },
              ]);
          });
          this.QueryUnit = this.RULE('QueryUnit', () => {
              this.SUBRULE(this.Query);
          });
          this.Query = this.RULE('Query', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.SelectQuery) },
                  { ALT: () => this.SUBRULE(this.ConstructQuery) },
                  { ALT: () => this.SUBRULE(this.DescribeQuery) },
                  { ALT: () => this.SUBRULE(this.AskQuery) },
              ]);
              this.SUBRULE(this.ValuesClause);
          });
          this.Constant = this.RULE('Constant', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.iri) },
                  { ALT: () => this.SUBRULE(this.RDFLiteral) },
                  { ALT: () => this.SUBRULE(this.NumericLiteral) },
                  { ALT: () => this.SUBRULE(this.BooleanLiteral) },
              ]);
          });
          this.MaxLength = this.RULE('MaxLength', () => {
              this.CONSUME(tokenMap.MAX_LENGTH);
              this.CONSUME(tokenMap.INTEGER);
          });
          this.UpdateUnit = this.RULE('UpdateUnit', () => {
              this.SUBRULE(this.Update);
          });
          this.Prologue = this.RULE('Prologue', () => {
              this.MANY(() => this.OR([
                  { ALT: () => this.SUBRULE(this.BaseDecl) },
                  { ALT: () => this.SUBRULE(this.PrefixDecl) },
              ]));
          });
          this.BaseDecl = this.RULE('BaseDecl', () => {
              this.CONSUME(tokenMap.BASE);
              this.CONSUME(tokenMap.IRIREF);
          });
          this.PrefixDecl = this.RULE('PrefixDecl', () => {
              this.CONSUME(tokenMap.PREFIX);
              this.CONSUME(tokenMap.PNAME_NS);
              this.CONSUME(tokenMap.IRIREF);
          });
          this.SelectQuery = this.RULE('SelectQuery', () => {
              this.SUBRULE(this.SelectClause);
              this.MANY(() => this.SUBRULE(this.DatasetClause));
              this.SUBRULE(this.WhereClause);
              this.SUBRULE(this.SolutionModifier);
          });
          this.SubSelect = this.RULE('SubSelect', () => {
              this.SUBRULE(this.SelectClause);
              this.SUBRULE(this.WhereClause);
              this.SUBRULE(this.SolutionModifier);
              this.SUBRULE(this.ValuesClause);
          });
          this.SelectClause = this.RULE('SelectClause', () => {
              this.CONSUME(tokenMap.SELECT);
              this.OPTION(() => this.OR([
                  { ALT: () => this.CONSUME(tokenMap.DISTINCT) },
                  { ALT: () => this.CONSUME(tokenMap.REDUCED) },
              ]));
              this.OR1([
                  {
                      ALT: () => {
                          this.AT_LEAST_ONE(() => this.OR2([
                              { ALT: () => this.SUBRULE(this.Var) },
                              {
                                  ALT: () => {
                                      this.CONSUME(tokenMap.LParen);
                                      this.SUBRULE(this.Expression);
                                      this.CONSUME(tokenMap.AS);
                                      this.SUBRULE1(this.Var);
                                      this.CONSUME(tokenMap.RParen);
                                  },
                              },
                          ]));
                      },
                  },
                  { ALT: () => this.CONSUME(tokenMap.Star) },
              ]);
          });
          this.ConstructQuery = this.RULE('ConstructQuery', () => {
              this.CONSUME(tokenMap.CONSTRUCT);
              this.OR([
                  {
                      ALT: () => {
                          this.SUBRULE(this.ConstructTemplate);
                          this.MANY(() => this.SUBRULE(this.DatasetClause));
                          this.SUBRULE(this.WhereClause);
                      },
                  },
                  {
                      ALT: () => {
                          this.MANY1(() => this.SUBRULE1(this.DatasetClause));
                          this.CONSUME(tokenMap.WHERE);
                          this.CONSUME(tokenMap.LCurly);
                          this.OPTION(() => this.SUBRULE(this.TriplesTemplate));
                          this.CONSUME(tokenMap.RCurly);
                      },
                  },
              ]);
              this.SUBRULE(this.SolutionModifier);
          });
          this.DescribeQuery = this.RULE('DescribeQuery', () => {
              this.CONSUME(tokenMap.DESCRIBE);
              this.OR([
                  {
                      ALT: () => {
                          this.AT_LEAST_ONE(() => this.SUBRULE(this.VarOrIri));
                      },
                  },
                  { ALT: () => this.CONSUME(tokenMap.Star) },
              ]);
              this.MANY(() => this.SUBRULE(this.DatasetClause));
              this.OPTION(() => this.SUBRULE(this.WhereClause));
              this.SUBRULE(this.SolutionModifier);
          });
          this.AskQuery = this.RULE('AskQuery', () => {
              this.CONSUME(tokenMap.ASK);
              this.MANY(() => this.SUBRULE(this.DatasetClause));
              this.SUBRULE(this.WhereClause);
              this.SUBRULE(this.SolutionModifier);
          });
          this.DatasetClause = this.RULE('DatasetClause', () => {
              this.CONSUME(tokenMap.FROM);
              this.OR([
                  { ALT: () => this.SUBRULE(this.DefaultGraphClause) },
                  { ALT: () => this.SUBRULE(this.NamedGraphClause) },
              ]);
          });
          this.DefaultGraphClause = this.RULE('DefaultGraphClause', () => {
              this.SUBRULE(this.SourceSelector);
          });
          this.NamedGraphClause = this.RULE('NamedGraphClause', () => {
              this.CONSUME(tokenMap.NAMED);
              this.SUBRULE(this.SourceSelector);
          });
          this.SourceSelector = this.RULE('SourceSelector', () => {
              this.SUBRULE(this.iri);
          });
          this.WhereClause = this.RULE('WhereClause', () => {
              this.OPTION(() => this.CONSUME(tokenMap.WHERE));
              this.SUBRULE(this.GroupGraphPattern);
          });
          this.SolutionModifier = this.RULE('SolutionModifier', () => {
              this.OPTION(() => this.SUBRULE(this.GroupClause));
              this.OPTION1(() => this.SUBRULE(this.HavingClause));
              this.OPTION2(() => this.SUBRULE(this.OrderClause));
              this.OPTION3(() => this.SUBRULE(this.LimitOffsetClause));
          });
          this.GroupClause = this.RULE('GroupClause', () => {
              this.CONSUME(tokenMap.GroupBy);
              this.AT_LEAST_ONE(() => this.SUBRULE(this.GroupCondition));
          });
          this.GroupCondition = this.RULE('GroupCondition', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.BuiltInCall) },
                  { ALT: () => this.SUBRULE(this.FunctionCall) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.LParen);
                          this.SUBRULE(this.Expression);
                          this.OPTION(() => {
                              this.CONSUME(tokenMap.AS);
                              this.SUBRULE(this.Var);
                          });
                          this.CONSUME(tokenMap.RParen);
                      },
                  },
                  { ALT: () => this.SUBRULE1(this.Var) },
              ]);
          });
          this.HavingClause = this.RULE('HavingClause', () => {
              this.CONSUME(tokenMap.HAVING);
              this.SUBRULE(this.HavingCondition);
          });
          this.HavingCondition = this.RULE('HavingCondition', () => {
              this.SUBRULE(this.Constraint);
          });
          this.OrderClause = this.RULE('OrderClause', () => {
              this.CONSUME(tokenMap.OrderBy);
              this.AT_LEAST_ONE(() => this.SUBRULE(this.OrderCondition));
          });
          this.OrderCondition = this.RULE('OrderCondition', () => {
              this.OR([
                  {
                      ALT: () => {
                          this.OR1([
                              { ALT: () => this.CONSUME(tokenMap.ASC) },
                              { ALT: () => this.CONSUME(tokenMap.DESC) },
                          ]);
                          this.SUBRULE(this.BrackettedExpression);
                      },
                  },
                  { ALT: () => this.SUBRULE(this.Constraint) },
                  { ALT: () => this.SUBRULE(this.Var) },
              ]);
          });
          this.LimitOffsetClause = this.RULE('LimitOffsetClause', () => {
              this.OR([
                  {
                      ALT: () => {
                          this.SUBRULE(this.LimitClause);
                          this.OPTION(() => this.SUBRULE(this.OffsetClause));
                      },
                  },
                  {
                      ALT: () => {
                          this.SUBRULE1(this.OffsetClause);
                          this.OPTION1(() => this.SUBRULE1(this.LimitClause));
                      },
                  },
              ]);
          });
          this.OffsetClause = this.RULE('OffsetClause', () => {
              this.CONSUME(tokenMap.OFFSET);
              this.CONSUME(tokenMap.INTEGER);
          });
          this.LimitClause = this.RULE('LimitClause', () => {
              this.CONSUME(tokenMap.LIMIT);
              this.CONSUME(tokenMap.INTEGER);
          });
          this.ValuesClause = this.RULE('ValuesClause', () => {
              this.OPTION(() => {
                  this.CONSUME(tokenMap.VALUES);
                  this.SUBRULE(this.DataBlock);
              });
          });
          this.Update = this.RULE('Update', () => {
              this.SUBRULE(this.Prologue);
              this.OPTION(() => {
                  this.SUBRULE(this.Update1);
                  this.OPTION1(() => {
                      this.CONSUME(tokenMap.Semicolon);
                      this.SUBRULE(this.Update);
                  });
              });
          });
          this.Update1 = this.RULE('Update1', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Load) },
                  { ALT: () => this.SUBRULE(this.Clear) },
                  { ALT: () => this.SUBRULE(this.Drop) },
                  { ALT: () => this.SUBRULE(this.Add) },
                  { ALT: () => this.SUBRULE(this.Move) },
                  { ALT: () => this.SUBRULE(this.Copy) },
                  { ALT: () => this.SUBRULE(this.Create) },
                  { ALT: () => this.SUBRULE(this.InsertData) },
                  { ALT: () => this.SUBRULE(this.DeleteData) },
                  { ALT: () => this.SUBRULE(this.DeleteWhere) },
                  { ALT: () => this.SUBRULE(this.Modify) },
              ]);
          });
          this.Load = this.RULE('Load', () => {
              this.CONSUME(tokenMap.LOAD);
              this.OPTION(() => this.CONSUME(tokenMap.SILENT));
              this.SUBRULE(this.iri);
              this.OPTION1(() => {
                  this.CONSUME(tokenMap.INTO);
                  this.SUBRULE(this.GraphRef);
              });
          });
          this.Clear = this.RULE('Clear', () => {
              this.CONSUME(tokenMap.CLEAR);
              this.OPTION(() => this.CONSUME(tokenMap.SILENT));
              this.SUBRULE(this.GraphRefAll);
          });
          this.Drop = this.RULE('Drop', () => {
              this.CONSUME(tokenMap.DROP);
              this.OPTION(() => this.CONSUME(tokenMap.SILENT));
              this.SUBRULE(this.GraphRefAll);
          });
          this.Create = this.RULE('Create', () => {
              this.CONSUME(tokenMap.CREATE);
              this.OPTION(() => this.CONSUME(tokenMap.SILENT));
              this.SUBRULE(this.GraphRefAll);
          });
          this.Add = this.RULE('Add', () => {
              this.CONSUME(tokenMap.ADD);
              this.OPTION(() => this.CONSUME(tokenMap.SILENT));
              this.SUBRULE(this.GraphOrDefault);
              this.CONSUME(tokenMap.TO);
              this.SUBRULE1(this.GraphOrDefault);
          });
          this.Move = this.RULE('Move', () => {
              this.CONSUME(tokenMap.MOVE);
              this.OPTION(() => this.CONSUME(tokenMap.SILENT));
              this.SUBRULE(this.GraphOrDefault);
              this.CONSUME(tokenMap.TO);
              this.SUBRULE1(this.GraphOrDefault);
          });
          this.Copy = this.RULE('Copy', () => {
              this.CONSUME(tokenMap.COPY);
              this.OPTION(() => this.CONSUME(tokenMap.SILENT));
              this.SUBRULE(this.GraphOrDefault);
              this.CONSUME(tokenMap.TO);
              this.SUBRULE1(this.GraphOrDefault);
          });
          this.InsertData = this.RULE('InsertData', () => {
              this.CONSUME(tokenMap.INSERT_DATA);
              this.SUBRULE(this.QuadData);
          });
          this.DeleteData = this.RULE('DeleteData', () => {
              this.CONSUME(tokenMap.DELETE_DATA);
              this.SUBRULE(this.QuadData);
          });
          this.DeleteWhere = this.RULE('DeleteWhere', () => {
              this.CONSUME(tokenMap.DELETE_WHERE);
              this.SUBRULE(this.QuadPattern);
          });
          this.Modify = this.RULE('Modify', () => {
              this.OPTION(() => {
                  this.CONSUME(tokenMap.WITH);
                  this.SUBRULE(this.iri);
              });
              this.OR([
                  {
                      ALT: () => {
                          this.SUBRULE(this.DeleteClause);
                          this.OPTION1(() => this.SUBRULE(this.InsertClause));
                      },
                  },
                  { ALT: () => this.SUBRULE1(this.InsertClause) },
              ]);
              this.MANY(() => this.SUBRULE(this.UsingClause));
              this.CONSUME(tokenMap.WHERE);
              this.SUBRULE(this.GroupGraphPattern);
          });
          this.DeleteClause = this.RULE('DeleteClause', () => {
              this.CONSUME(tokenMap.DELETE);
              this.SUBRULE(this.QuadPattern);
          });
          this.InsertClause = this.RULE('InsertClause', () => {
              this.CONSUME(tokenMap.INSERT);
              this.SUBRULE(this.QuadPattern);
          });
          this.UsingClause = this.RULE('UsingClause', () => {
              this.CONSUME(tokenMap.USING);
              this.OR([
                  { ALT: () => this.SUBRULE(this.iri) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.NAMED);
                          this.SUBRULE1(this.iri);
                      },
                  },
              ]);
          });
          this.GraphOrDefault = this.RULE('GraphOrDefault', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.DEFAULT) },
                  {
                      ALT: () => {
                          this.OPTION(() => this.CONSUME(tokenMap.GRAPH));
                          this.SUBRULE(this.iri);
                      },
                  },
              ]);
          });
          this.GraphRef = this.RULE('GraphRef', () => {
              this.CONSUME(tokenMap.GRAPH);
              this.SUBRULE(this.iri);
          });
          this.GraphRefAll = this.RULE('GraphRefAll', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.GraphRef) },
                  { ALT: () => this.CONSUME(tokenMap.DEFAULT) },
                  { ALT: () => this.CONSUME(tokenMap.NAMED) },
                  { ALT: () => this.CONSUME(tokenMap.ALL) },
              ]);
          });
          this.QuadPattern = this.RULE('QuadPattern', () => {
              this.CONSUME(tokenMap.LCurly);
              this.SUBRULE(this.Quads);
              this.CONSUME(tokenMap.RCurly);
          });
          this.QuadData = this.RULE('QuadData', () => {
              this.CONSUME(tokenMap.LCurly);
              this.SUBRULE(this.Quads);
              this.CONSUME(tokenMap.RCurly);
          });
          this.Quads = this.RULE('Quads', () => {
              this.OPTION(() => this.SUBRULE(this.TriplesTemplate));
              this.MANY(() => {
                  this.SUBRULE(this.QuadsNotTriples);
                  this.OPTION1(() => this.CONSUME(tokenMap.Period));
                  this.OPTION2(() => this.SUBRULE1(this.TriplesTemplate));
              });
          });
          this.QuadsNotTriples = this.RULE('QuadsNotTriples', () => {
              this.CONSUME(tokenMap.GRAPH);
              this.SUBRULE(this.VarOrIri);
              this.CONSUME(tokenMap.LCurly);
              this.OPTION(() => this.SUBRULE(this.TriplesTemplate));
              this.CONSUME(tokenMap.RCurly);
          });
          this.TriplesTemplate = this.RULE('TriplesTemplate', () => {
              this.SUBRULE(this.TriplesSameSubject);
              this.OPTION(() => {
                  this.CONSUME(tokenMap.Period);
                  this.OPTION1(() => this.SUBRULE(this.TriplesTemplate));
              });
          });
          this.GroupGraphPattern = this.RULE('GroupGraphPattern', () => {
              this.CONSUME(tokenMap.LCurly);
              this.OR([
                  { ALT: () => this.SUBRULE(this.SubSelect) },
                  { ALT: () => this.SUBRULE(this.GroupGraphPatternSub) },
              ]);
              this.CONSUME(tokenMap.RCurly);
          });
          this.GroupGraphPatternSub = this.RULE('GroupGraphPatternSub', () => {
              this.OPTION(() => this.SUBRULE(this.TriplesBlock));
              this.MANY(() => {
                  this.SUBRULE(this.GraphPatternNotTriples);
                  this.OPTION1(() => this.CONSUME(tokenMap.Period));
                  this.OPTION2(() => this.SUBRULE1(this.TriplesBlock));
              });
          });
          this.TriplesBlock = this.RULE('TriplesBlock', () => {
              this.SUBRULE(this.TriplesSameSubjectPath);
              this.OPTION(() => {
                  this.CONSUME(tokenMap.Period);
                  this.OPTION1(() => this.SUBRULE(this.TriplesBlock));
              });
          });
          this.GraphPatternNotTriples = this.RULE('GraphPatternNotTriples', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.GroupOrUnionGraphPattern) },
                  { ALT: () => this.SUBRULE(this.OptionalGraphPattern) },
                  { ALT: () => this.SUBRULE(this.MinusGraphPattern) },
                  { ALT: () => this.SUBRULE(this.GraphGraphPattern) },
                  { ALT: () => this.SUBRULE(this.ServiceGraphPattern) },
                  { ALT: () => this.SUBRULE(this.Filter) },
                  { ALT: () => this.SUBRULE(this.Bind) },
                  { ALT: () => this.SUBRULE(this.InlineData) },
              ]);
          });
          this.OptionalGraphPattern = this.RULE('OptionalGraphPattern', () => {
              this.CONSUME(tokenMap.OPTIONAL);
              this.SUBRULE(this.GroupGraphPattern);
          });
          this.GraphGraphPattern = this.RULE('GraphGraphPattern', () => {
              this.CONSUME(tokenMap.GRAPH);
              this.SUBRULE(this.VarOrIri);
              this.SUBRULE(this.GroupGraphPattern);
          });
          this.ServiceGraphPattern = this.RULE('ServiceGraphPattern', () => {
              this.CONSUME(tokenMap.SERVICE);
              this.OPTION(() => this.CONSUME(tokenMap.SILENT));
              this.SUBRULE(this.VarOrIri);
              this.SUBRULE(this.GroupGraphPattern);
          });
          this.Bind = this.RULE('Bind', () => {
              this.CONSUME(tokenMap.BIND);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.AS);
              this.SUBRULE(this.Var);
              this.CONSUME(tokenMap.RParen);
          });
          this.InlineData = this.RULE('InlineData', () => {
              this.CONSUME(tokenMap.VALUES);
              this.SUBRULE(this.DataBlock);
          });
          this.DataBlock = this.RULE('DataBlock', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.InlineDataOneVar) },
                  { ALT: () => this.SUBRULE(this.InlineDataFull) },
              ]);
          });
          this.InlineDataOneVar = this.RULE('InlineDataOneVar', () => {
              this.SUBRULE(this.Var);
              this.CONSUME(tokenMap.LCurly);
              this.MANY(() => this.SUBRULE(this.DataBlockValue));
              this.CONSUME(tokenMap.RCurly);
          });
          this.InlineDataFull = this.RULE('InlineDataFull', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.NIL) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.LParen);
                          this.MANY(() => this.SUBRULE(this.Var));
                          this.CONSUME(tokenMap.RParen);
                      },
                  },
              ]);
              this.CONSUME(tokenMap.LCurly);
              this.MANY1(() => this.OR1([
                  {
                      ALT: () => {
                          this.CONSUME1(tokenMap.LParen);
                          this.MANY2(() => this.SUBRULE(this.DataBlockValue));
                          this.CONSUME1(tokenMap.RParen);
                      },
                  },
                  { ALT: () => this.CONSUME1(tokenMap.NIL) },
              ]));
              this.CONSUME(tokenMap.RCurly);
          });
          this.DataBlockValue = this.RULE('DataBlockValue', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.iri) },
                  { ALT: () => this.SUBRULE(this.RDFLiteral) },
                  { ALT: () => this.SUBRULE(this.NumericLiteral) },
                  { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                  { ALT: () => this.CONSUME(tokenMap.UNDEF) },
              ]);
          });
          this.MinusGraphPattern = this.RULE('MinusGraphPattern', () => {
              this.CONSUME(tokenMap.MINUS);
              this.SUBRULE(this.GroupGraphPattern);
          });
          this.GroupOrUnionGraphPattern = this.RULE('GroupOrUnionGraphPattern', () => {
              this.SUBRULE(this.GroupGraphPattern);
              this.MANY(() => {
                  this.CONSUME(tokenMap.UNION);
                  this.SUBRULE1(this.GroupGraphPattern);
              });
          });
          this.Filter = this.RULE('Filter', () => {
              this.CONSUME(tokenMap.FILTER);
              this.SUBRULE(this.Constraint);
          });
          this.Constraint = this.RULE('Constraint', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.BrackettedExpression) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall) },
                  { ALT: () => this.SUBRULE(this.FunctionCall) },
              ]);
          });
          this.FunctionCall = this.RULE('FunctionCall', () => {
              this.SUBRULE(this.iri);
              this.SUBRULE(this.ArgList);
          });
          this.ArgList = this.RULE('ArgList', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.NIL) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.LParen);
                          this.OPTION(() => this.CONSUME(tokenMap.DISTINCT));
                          this.SUBRULE(this.Expression);
                          this.MANY(() => {
                              this.CONSUME(tokenMap.Comma);
                              this.SUBRULE1(this.Expression);
                          });
                          this.CONSUME(tokenMap.RParen);
                      },
                  },
              ]);
          });
          this.ExpressionList = this.RULE('ExpressionList', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.NIL) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.LParen);
                          this.SUBRULE(this.Expression);
                          this.MANY(() => {
                              this.CONSUME(tokenMap.Comma);
                              this.SUBRULE1(this.Expression);
                          });
                          this.CONSUME(tokenMap.RParen);
                      },
                  },
              ]);
          });
          this.ConstructTemplate = this.RULE('ConstructTemplate', () => {
              this.CONSUME(tokenMap.LCurly);
              this.OPTION(() => this.SUBRULE(this.ConstructTriples));
              this.CONSUME(tokenMap.RCurly);
          });
          this.ConstructTriples = this.RULE('ConstructTriples', () => {
              this.SUBRULE(this.TriplesSameSubject);
              this.OPTION(() => {
                  this.CONSUME(tokenMap.Period);
                  this.OPTION1(() => this.SUBRULE(this.ConstructTriples));
              });
          });
          this.TriplesSameSubject = this.RULE('TriplesSameSubject', () => {
              this.OR([
                  {
                      ALT: () => {
                          this.SUBRULE(this.VarOrTerm);
                          this.SUBRULE(this.PropertyListNotEmpty);
                      },
                  },
                  {
                      ALT: () => {
                          this.SUBRULE(this.TriplesNode);
                          this.SUBRULE(this.PropertyList);
                      },
                  },
              ]);
          });
          this.PropertyList = this.RULE('PropertyList', () => {
              this.OPTION(() => this.SUBRULE(this.PropertyListNotEmpty));
          });
          this.PropertyListNotEmpty = this.RULE('PropertyListNotEmpty', () => {
              this.SUBRULE(this.Verb);
              this.SUBRULE(this.ObjectList);
              this.MANY(() => {
                  this.CONSUME(tokenMap.Semicolon);
                  this.OPTION(() => {
                      this.SUBRULE1(this.Verb);
                      this.SUBRULE1(this.ObjectList);
                  });
              });
          });
          this.Verb = this.RULE('Verb', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.VarOrIri) },
                  { ALT: () => this.CONSUME(tokenMap.A) },
              ]);
          });
          this.ObjectList = this.RULE('ObjectList', () => {
              this.AT_LEAST_ONE_SEP({
                  SEP: tokenMap.Comma,
                  DEF: () => this.SUBRULE(this.Object),
              });
          });
          this.Object = this.RULE('Object', () => {
              this.SUBRULE(this.GraphNode);
          });
          this.TriplesSameSubjectPath = this.RULE('TriplesSameSubjectPath', () => {
              this.OR([
                  {
                      ALT: () => {
                          this.SUBRULE(this.VarOrTerm);
                          this.SUBRULE(this.PropertyListPathNotEmpty);
                      },
                  },
                  {
                      ALT: () => {
                          this.SUBRULE(this.TriplesNodePath);
                          this.SUBRULE(this.PropertyListPath);
                      },
                  },
              ]);
          });
          this.PropertyListPath = this.RULE('PropertyListPath', () => {
              this.OPTION(() => this.SUBRULE(this.PropertyListPathNotEmpty));
          });
          this.PropertyListPathNotEmpty = this.RULE('PropertyListPathNotEmpty', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.VerbPath) },
                  { ALT: () => this.SUBRULE(this.VerbSimple) },
              ]);
              this.SUBRULE(this.ObjectListPath);
              this.MANY(() => {
                  this.CONSUME(tokenMap.Semicolon);
                  this.OPTION(() => {
                      this.OR1([
                          { ALT: () => this.SUBRULE1(this.VerbPath) },
                          { ALT: () => this.SUBRULE1(this.VerbSimple) },
                      ]);
                      this.SUBRULE1(this.ObjectListPath);
                  });
              });
          });
          this.VerbPath = this.RULE('VerbPath', () => {
              this.SUBRULE(this.Path);
          });
          this.VerbSimple = this.RULE('VerbSimple', () => {
              this.SUBRULE(this.Var);
          });
          this.ObjectListPath = this.RULE('ObjectListPath', () => {
              this.AT_LEAST_ONE_SEP({
                  SEP: tokenMap.Comma,
                  DEF: () => this.SUBRULE(this.ObjectPath),
              });
          });
          this.ObjectPath = this.RULE('ObjectPath', () => {
              this.SUBRULE(this.GraphNodePath);
          });
          this.Path = this.RULE('Path', () => {
              this.SUBRULE(this.PathAlternative);
          });
          this.PathAlternative = this.RULE('PathAlternative', () => {
              this.AT_LEAST_ONE_SEP({
                  SEP: tokenMap.Pipe,
                  DEF: () => this.SUBRULE(this.PathSequence),
              });
          });
          this.PathSequence = this.RULE('PathSequence', () => {
              this.AT_LEAST_ONE_SEP({
                  SEP: tokenMap.ForwardSlash,
                  DEF: () => this.SUBRULE(this.PathEltOrInverse),
              });
          });
          this.PathElt = this.RULE('PathElt', () => {
              this.SUBRULE(this.PathPrimary);
              this.OPTION(() => this.SUBRULE(this.PathMod));
          });
          this.PathEltOrInverse = this.RULE('PathEltOrInverse', () => {
              this.OPTION(() => this.CONSUME(tokenMap.Caret));
              this.SUBRULE(this.PathElt);
          });
          this.PathMod = this.RULE('PathMod', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.QuestionMark) },
                  { ALT: () => this.CONSUME(tokenMap.Star) },
                  { ALT: () => this.CONSUME(tokenMap.Plus) },
              ]);
          });
          this.PathPrimary = this.RULE('PathPrimary', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.iri) },
                  { ALT: () => this.CONSUME(tokenMap.A) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.Bang);
                          this.SUBRULE(this.PathNegatedPropertySet);
                      },
                  },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.LParen);
                          this.SUBRULE(this.Path);
                          this.CONSUME(tokenMap.RParen);
                      },
                  },
              ]);
          });
          this.PathNegatedPropertySet = this.RULE('PathNegatedPropertySet', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.PathOneInPropertySet) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.LParen);
                          this.MANY_SEP({
                              SEP: tokenMap.Pipe,
                              DEF: () => this.SUBRULE1(this.PathOneInPropertySet),
                          });
                          this.CONSUME(tokenMap.RParen);
                      },
                  },
              ]);
          });
          this.PathOneInPropertySet = this.RULE('PathOneInPropertySet', () => {
              this.OPTION(() => this.CONSUME(tokenMap.Caret));
              this.OR([
                  { ALT: () => this.SUBRULE(this.iri) },
                  { ALT: () => this.CONSUME(tokenMap.A) },
              ]);
          });
          this.Integer = this.RULE('Integer', () => {
              this.CONSUME(tokenMap.INTEGER);
          });
          this.TriplesNode = this.RULE('TriplesNode', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Collection) },
                  { ALT: () => this.SUBRULE(this.BlankNodePropertyList) },
              ]);
          });
          this.BlankNodePropertyList = this.RULE('BlankNodePropertyList', () => {
              this.CONSUME(tokenMap.LBracket);
              this.SUBRULE(this.PropertyListNotEmpty);
              this.CONSUME(tokenMap.RBracket);
          });
          this.TriplesNodePath = this.RULE('TriplesNodePath', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.CollectionPath) },
                  { ALT: () => this.SUBRULE(this.BlankNodePropertyListPath) },
              ]);
          });
          this.BlankNodePropertyListPath = this.RULE('BlankNodePropertyListPath', () => {
              this.CONSUME(tokenMap.LBracket);
              this.SUBRULE(this.PropertyListPathNotEmpty);
              this.CONSUME(tokenMap.RBracket);
          });
          this.Collection = this.RULE('Collection', () => {
              this.CONSUME(tokenMap.LParen);
              this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNode));
              this.CONSUME(tokenMap.RParen);
          });
          this.CollectionPath = this.RULE('CollectionPath', () => {
              this.CONSUME(tokenMap.LParen);
              this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNodePath));
              this.CONSUME(tokenMap.RParen);
          });
          this.GraphNode = this.RULE('GraphNode', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.VarOrTerm) },
                  { ALT: () => this.SUBRULE(this.TriplesNode) },
              ]);
          });
          this.GraphNodePath = this.RULE('GraphNodePath', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.VarOrTerm) },
                  { ALT: () => this.SUBRULE(this.TriplesNodePath) },
              ]);
          });
          this.VarOrTerm = this.RULE('VarOrTerm', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Var) },
                  { ALT: () => this.SUBRULE(this.GraphTerm) },
              ]);
          });
          this.VarOrIri = this.RULE('VarOrIri', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Var) },
                  { ALT: () => this.SUBRULE(this.iri) },
              ]);
          });
          this.Var = this.RULE('Var', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.VAR1) },
                  { ALT: () => this.CONSUME(tokenMap.VAR2) },
              ]);
          });
          this.GraphTerm = this.RULE('GraphTerm', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.iri) },
                  { ALT: () => this.SUBRULE(this.RDFLiteral) },
                  { ALT: () => this.SUBRULE(this.NumericLiteral) },
                  { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                  { ALT: () => this.SUBRULE(this.BlankNode) },
                  { ALT: () => this.CONSUME(tokenMap.NIL) },
              ]);
          });
          this.Expression = this.RULE('Expression', () => {
              this.SUBRULE(this.ConditionalOrExpression);
          });
          this.ConditionalOrExpression = this.RULE('ConditionalOrExpression', () => {
              this.AT_LEAST_ONE_SEP({
                  SEP: tokenMap.LogicalOr,
                  DEF: () => this.SUBRULE(this.ConditionalAndExpression),
              });
          });
          this.ConditionalAndExpression = this.RULE('ConditionalAndExpression', () => {
              this.AT_LEAST_ONE_SEP({
                  SEP: tokenMap.LogicalAnd,
                  DEF: () => this.SUBRULE(this.ValueLogical),
              });
          });
          this.ValueLogical = this.RULE('ValueLogical', () => {
              this.SUBRULE(this.RelationalExpression);
          });
          this.RelationalExpression = this.RULE('RelationalExpression', () => {
              this.SUBRULE(this.NumericExpression);
              this.OPTION(() => this.OR([
                  {
                      ALT: () => {
                          this.OR1([
                              { ALT: () => this.CONSUME(tokenMap.Equals) },
                              { ALT: () => this.CONSUME(tokenMap.NotEquals) },
                              { ALT: () => this.CONSUME(tokenMap.LessThan) },
                              { ALT: () => this.CONSUME(tokenMap.GreaterThan) },
                              { ALT: () => this.CONSUME(tokenMap.LessThanEquals) },
                              { ALT: () => this.CONSUME(tokenMap.GreaterThanEquals) },
                          ]);
                          this.SUBRULE1(this.NumericExpression);
                      },
                  },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.IN);
                          this.SUBRULE(this.ExpressionList);
                      },
                  },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.NOT_IN);
                          this.SUBRULE1(this.ExpressionList);
                      },
                  },
              ]));
          });
          this.NumericExpression = this.RULE('NumericExpression', () => {
              this.SUBRULE(this.AdditiveExpression);
          });
          this.AdditiveExpression = this.RULE('AdditiveExpression', () => {
              this.SUBRULE(this.MultiplicativeExpression);
              this.MANY(() => this.OR([
                  {
                      ALT: () => {
                          this.OR1([
                              { ALT: () => this.CONSUME(tokenMap.Plus) },
                              { ALT: () => this.CONSUME(tokenMap.Minus) },
                          ]);
                          this.SUBRULE1(this.MultiplicativeExpression);
                      },
                  },
                  {
                      ALT: () => {
                          this.OR2([
                              { ALT: () => this.SUBRULE(this.NumericLiteralPositive) },
                              { ALT: () => this.SUBRULE(this.NumericLiteralNegative) },
                          ]);
                          this.MANY1(() => this.OR3([
                              {
                                  ALT: () => {
                                      this.OR4([
                                          { ALT: () => this.CONSUME(tokenMap.Star) },
                                          { ALT: () => this.CONSUME(tokenMap.ForwardSlash) },
                                      ]);
                                      this.SUBRULE1(this.UnaryExpression);
                                  },
                              },
                          ]));
                      },
                  },
              ]));
          });
          this.MultiplicativeExpression = this.RULE('MultiplicativeExpression', () => {
              this.SUBRULE(this.UnaryExpression);
              this.MANY(() => this.OR([
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.Star);
                          this.SUBRULE1(this.UnaryExpression);
                      },
                  },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.ForwardSlash);
                          this.SUBRULE2(this.UnaryExpression);
                      },
                  },
              ]));
          });
          this.UnaryExpression = this.RULE('UnaryExpression', () => {
              this.OR([
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.Bang);
                          this.SUBRULE(this.PrimaryExpression);
                      },
                  },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.Plus);
                          this.SUBRULE1(this.PrimaryExpression);
                      },
                  },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.Minus);
                          this.SUBRULE2(this.PrimaryExpression);
                      },
                  },
                  { ALT: () => this.SUBRULE3(this.PrimaryExpression) },
              ]);
          });
          this.PrimaryExpression = this.RULE('PrimaryExpression', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.BrackettedExpression) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall) },
                  { ALT: () => this.SUBRULE(this.iriOrFunction) },
                  { ALT: () => this.SUBRULE(this.RDFLiteral) },
                  { ALT: () => this.SUBRULE(this.NumericLiteral) },
                  { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                  { ALT: () => this.SUBRULE(this.Var) },
              ]);
          });
          this.BrackettedExpression = this.RULE('BrackettedExpression', () => {
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_STR = this.RULE('BuiltInCall_STR', () => {
              this.CONSUME(tokenMap.STR);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_LANG = this.RULE('BuiltInCall_LANG', () => {
              this.CONSUME(tokenMap.LANG);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_LANGMATCHERS = this.RULE('BuiltInCall_LANGMATCHERS', () => {
              this.CONSUME(tokenMap.LANGMATCHERS);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_DATATYPE = this.RULE('BuiltInCall_DATATYPE', () => {
              this.CONSUME(tokenMap.DATATYPE);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_BOUND = this.RULE('BuiltInCall_BOUND', () => {
              this.CONSUME(tokenMap.BOUND);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Var);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_IRI = this.RULE('BuiltInCall_IRI', () => {
              this.CONSUME(tokenMap.IRI);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_URI = this.RULE('BuiltInCall_URI', () => {
              this.CONSUME(tokenMap.URI);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_BNODE = this.RULE('BuiltInCall_BNODE', () => {
              this.CONSUME(tokenMap.BNODE);
              this.OR([
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.LParen);
                          this.SUBRULE(this.Expression);
                          this.CONSUME(tokenMap.RParen);
                      },
                  },
                  { ALT: () => this.CONSUME(tokenMap.NIL) },
              ]);
          });
          this.BuiltInCall_RAND = this.RULE('BuiltInCall_RAND', () => {
              this.CONSUME(tokenMap.RAND);
              this.CONSUME(tokenMap.NIL);
          });
          this.BuiltInCall_ABS = this.RULE('BuiltInCall_ABS', () => {
              this.CONSUME(tokenMap.ABS);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_CEIL = this.RULE('BuiltInCall_CEIL', () => {
              this.CONSUME(tokenMap.CEIL);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_FLOOR = this.RULE('BuiltInCall_FLOOR', () => {
              this.CONSUME(tokenMap.FLOOR);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_ROUND = this.RULE('BuiltInCall_ROUND', () => {
              this.CONSUME(tokenMap.ROUND);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_CONCAT = this.RULE('BuiltInCall_CONCAT', () => {
              this.CONSUME(tokenMap.CONCAT);
              this.SUBRULE(this.ExpressionList);
          });
          this.BuiltInCall_STRLEN = this.RULE('BuiltInCall_STRLEN', () => {
              this.CONSUME(tokenMap.STRLEN);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_UCASE = this.RULE('BuiltInCall_UCASE', () => {
              this.CONSUME(tokenMap.UCASE);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_LCASE = this.RULE('BuiltInCall_LCASE', () => {
              this.CONSUME(tokenMap.LCASE);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_ENCODE_FOR_URI = this.RULE('BuiltInCall_ENCODE_FOR_URI', () => {
              this.CONSUME(tokenMap.ENCODE_FOR_URI);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_CONTAINS = this.RULE('BuiltInCall_CONTAINS', () => {
              this.CONSUME(tokenMap.CONTAINS);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_STRSTARTS = this.RULE('BuiltInCall_STRSTARTS', () => {
              this.CONSUME(tokenMap.STRSTARTS);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_STRENDS = this.RULE('BuiltInCall_STRENDS', () => {
              this.CONSUME(tokenMap.STRENDS);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_STRBEFORE = this.RULE('BuiltInCall_STRBEFORE', () => {
              this.CONSUME(tokenMap.STRBEFORE);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_STRAFTER = this.RULE('BuiltInCall_STRAFTER', () => {
              this.CONSUME(tokenMap.STRAFTER);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_YEAR = this.RULE('BuiltInCall_YEAR', () => {
              this.CONSUME(tokenMap.YEAR);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_MONTH = this.RULE('BuiltInCall_MONTH', () => {
              this.CONSUME(tokenMap.MONTH);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_DAY = this.RULE('BuiltInCall_DAY', () => {
              this.CONSUME(tokenMap.DAY);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_HOURS = this.RULE('BuiltInCall_HOURS', () => {
              this.CONSUME(tokenMap.HOURS);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_MINUTES = this.RULE('BuiltInCall_MINUTES', () => {
              this.CONSUME(tokenMap.MINUTES);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_SECONDS = this.RULE('BuiltInCall_SECONDS', () => {
              this.CONSUME(tokenMap.SECONDS);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_TIMEZONE = this.RULE('BuiltInCall_TIMEZONE', () => {
              this.CONSUME(tokenMap.TIMEZONE);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_TZ = this.RULE('BuiltInCall_TZ', () => {
              this.CONSUME(tokenMap.TZ);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_NOW = this.RULE('BuiltInCall_NOW', () => {
              this.CONSUME(tokenMap.NOW);
              this.CONSUME(tokenMap.NIL);
          });
          this.BuiltInCall_UUID = this.RULE('BuiltInCall_UUID', () => {
              this.CONSUME(tokenMap.UUID);
              this.CONSUME(tokenMap.NIL);
          });
          this.BuiltInCall_STRUUID = this.RULE('BuiltInCall_STRUUID', () => {
              this.CONSUME(tokenMap.STRUUID);
              this.CONSUME(tokenMap.NIL);
          });
          this.BuiltInCall_MD5 = this.RULE('BuiltInCall_MD5', () => {
              this.CONSUME(tokenMap.MD5);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_SHA1 = this.RULE('BuiltInCall_SHA1', () => {
              this.CONSUME(tokenMap.SHA1);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_SHA256 = this.RULE('BuiltInCall_SHA256', () => {
              this.CONSUME(tokenMap.SHA256);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_SHA384 = this.RULE('BuiltInCall_SHA384', () => {
              this.CONSUME(tokenMap.SHA384);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_SHA512 = this.RULE('BuiltInCall_SHA512', () => {
              this.CONSUME(tokenMap.SHA512);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_COALESCE = this.RULE('BuiltInCall_COALESCE', () => {
              this.CONSUME(tokenMap.COALESCE);
              this.SUBRULE(this.ExpressionList);
          });
          this.BuiltInCall_IF = this.RULE('BuiltInCall_IF', () => {
              this.CONSUME(tokenMap.IF);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME1(tokenMap.Comma);
              this.SUBRULE2(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_STRLANG = this.RULE('BuiltInCall_STRLANG', () => {
              this.CONSUME(tokenMap.STRLANG);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_STRDT = this.RULE('BuiltInCall_STRDT', () => {
              this.CONSUME(tokenMap.STRDT);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_sameTerm = this.RULE('BuiltInCall_sameTerm', () => {
              this.CONSUME(tokenMap.sameTerm);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_isIRI = this.RULE('BuiltInCall_isIRI', () => {
              this.CONSUME(tokenMap.isIRI);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_isURI = this.RULE('BuiltInCall_isURI', () => {
              this.CONSUME(tokenMap.isURI);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_isBlank = this.RULE('BuiltInCall_isBlank', () => {
              this.CONSUME(tokenMap.isBlank);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_isLiteral = this.RULE('BuiltInCall_isLiteral', () => {
              this.CONSUME(tokenMap.isLiteral);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall_isNumeric = this.RULE('BuiltInCall_isNumeric', () => {
              this.CONSUME(tokenMap.isNumeric);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.BuiltInCall = this.RULE('BuiltInCall', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Aggregate) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STR) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_LANG) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_LANGMATCHERS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_DATATYPE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_BOUND) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_IRI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_URI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_BNODE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_RAND) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_ABS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_CEIL) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_FLOOR) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_ROUND) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_CONCAT) },
                  { ALT: () => this.SUBRULE(this.SubstringExpression) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRLEN) },
                  { ALT: () => this.SUBRULE(this.StrReplaceExpression) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_UCASE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_LCASE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_ENCODE_FOR_URI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_CONTAINS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRSTARTS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRENDS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRBEFORE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRAFTER) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_YEAR) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_MONTH) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_DAY) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_HOURS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_MINUTES) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SECONDS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_TIMEZONE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_TZ) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_NOW) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_UUID) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRUUID) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_MD5) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SHA1) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SHA256) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SHA384) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SHA512) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_COALESCE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_IF) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRLANG) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRDT) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_sameTerm) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isIRI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isURI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isBlank) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isLiteral) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isNumeric) },
                  { ALT: () => this.SUBRULE(this.RegexExpression) },
                  { ALT: () => this.SUBRULE(this.ExistsFunction) },
                  { ALT: () => this.SUBRULE(this.NotExistsFunction) },
              ]);
          });
          this.RegexExpression = this.RULE('RegexExpression', () => {
              this.CONSUME(tokenMap.REGEX);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.OPTION(() => {
                  this.CONSUME1(tokenMap.Comma);
                  this.SUBRULE2(this.Expression);
              });
              this.CONSUME(tokenMap.RParen);
          });
          this.SubstringExpression = this.RULE('SubstringExpression', () => {
              this.CONSUME(tokenMap.SUBSTR);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.OPTION(() => {
                  this.CONSUME1(tokenMap.Comma);
                  this.SUBRULE2(this.Expression);
              });
              this.CONSUME(tokenMap.RParen);
          });
          this.StrReplaceExpression = this.RULE('StrReplaceExpression', () => {
              this.CONSUME(tokenMap.REPLACE);
              this.CONSUME(tokenMap.LParen);
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.Comma);
              this.SUBRULE1(this.Expression);
              this.CONSUME1(tokenMap.Comma);
              this.SUBRULE2(this.Expression);
              this.OPTION(() => {
                  this.CONSUME2(tokenMap.Comma);
                  this.SUBRULE3(this.Expression);
              });
              this.CONSUME(tokenMap.RParen);
          });
          this.ExistsFunction = this.RULE('ExistsFunction', () => {
              this.CONSUME(tokenMap.EXISTS);
              this.SUBRULE(this.GroupGraphPattern);
          });
          this.NotExistsFunction = this.RULE('NotExistsFunction', () => {
              this.CONSUME(tokenMap.NOT_EXISTS);
              this.SUBRULE(this.GroupGraphPattern);
          });
          this.Count = this.RULE('Count', () => {
              this.CONSUME(tokenMap.COUNT);
              this.CONSUME1(tokenMap.LParen);
              this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
              this.OR([
                  { ALT: () => this.CONSUME3(tokenMap.Star) },
                  { ALT: () => this.SUBRULE(this.Expression) },
              ]);
              this.CONSUME(tokenMap.RParen);
          });
          this.Sum = this.RULE('Sum', () => {
              this.CONSUME(tokenMap.SUM);
              this.CONSUME1(tokenMap.LParen);
              this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.Min = this.RULE('Min', () => {
              this.CONSUME(tokenMap.MIN);
              this.CONSUME1(tokenMap.LParen);
              this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.Max = this.RULE('Max', () => {
              this.CONSUME(tokenMap.MAX);
              this.CONSUME1(tokenMap.LParen);
              this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.Avg = this.RULE('Avg', () => {
              this.CONSUME(tokenMap.AVG);
              this.CONSUME1(tokenMap.LParen);
              this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.Sample = this.RULE('Sample', () => {
              this.CONSUME(tokenMap.SAMPLE);
              this.CONSUME1(tokenMap.LParen);
              this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
              this.SUBRULE(this.Expression);
              this.CONSUME(tokenMap.RParen);
          });
          this.GroupConcat = this.RULE('GroupConcat', () => {
              this.CONSUME(tokenMap.GROUP_CONCAT);
              this.CONSUME1(tokenMap.LParen);
              this.OPTION(() => this.CONSUME2(tokenMap.DISTINCT));
              this.SUBRULE(this.Expression);
              this.OPTION1(() => {
                  this.CONSUME(tokenMap.Semicolon);
                  this.CONSUME(tokenMap.SEPARATOR);
                  this.CONSUME(tokenMap.Equals);
                  this.SUBRULE(this.String);
              });
              this.CONSUME(tokenMap.RParen);
          });
          this.Aggregate = this.RULE('Aggregate', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Count) },
                  { ALT: () => this.SUBRULE(this.Sum) },
                  { ALT: () => this.SUBRULE(this.Min) },
                  { ALT: () => this.SUBRULE(this.Max) },
                  { ALT: () => this.SUBRULE(this.Avg) },
                  { ALT: () => this.SUBRULE(this.Sample) },
                  { ALT: () => this.SUBRULE(this.GroupConcat) },
              ]);
          });
          this.iriOrFunction = this.RULE('iriOrFunction', () => {
              this.SUBRULE(this.iri);
              this.OPTION(() => this.SUBRULE(this.ArgList));
          });
          this.RDFLiteral = this.RULE('RDFLiteral', () => {
              this.SUBRULE(this.String);
              this.OPTION(() => this.OR([
                  { ALT: () => this.CONSUME(tokenMap.LANGTAG) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap.DoubleCaret);
                          this.SUBRULE(this.iri);
                      },
                  },
              ]));
          });
          this.NumericLiteral = this.RULE('NumericLiteral', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.NumericLiteralUnsigned) },
                  { ALT: () => this.SUBRULE(this.NumericLiteralPositive) },
                  { ALT: () => this.SUBRULE(this.NumericLiteralNegative) },
              ]);
          });
          this.NumericLiteralUnsigned = this.RULE('NumericLiteralUnsigned', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.INTEGER) },
                  { ALT: () => this.CONSUME(tokenMap.DECIMAL) },
                  { ALT: () => this.CONSUME(tokenMap.DOUBLE) },
              ]);
          });
          this.NumericLiteralPositive = this.RULE('NumericLiteralPositive', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.INTEGER_POSITIVE) },
                  { ALT: () => this.CONSUME(tokenMap.DECIMAL_POSITIVE) },
                  { ALT: () => this.CONSUME(tokenMap.DOUBLE_POSITIVE) },
              ]);
          });
          this.NumericLiteralNegative = this.RULE('NumericLiteralNegative', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.INTEGER_NEGATIVE) },
                  { ALT: () => this.CONSUME(tokenMap.DECIMAL_NEGATIVE) },
                  { ALT: () => this.CONSUME(tokenMap.DOUBLE_NEGATIVE) },
              ]);
          });
          this.BooleanLiteral = this.RULE('BooleanLiteral', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.TRUE) },
                  { ALT: () => this.CONSUME(tokenMap.FALSE) },
              ]);
          });
          this.String = this.RULE('String', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL1) },
                  { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL2) },
                  { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG1) },
                  { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG2) },
              ]);
          });
          this.iri = this.RULE('iri', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.IRIREF) },
                  { ALT: () => this.SUBRULE(this.PrefixedName) },
              ]);
          });
          this.PrefixedName = this.RULE('PrefixedName', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.PNAME_LN) },
                  { ALT: () => this.CONSUME(tokenMap.PNAME_NS) },
              ]);
          });
          this.BlankNode = this.RULE('BlankNode', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.BLANK_NODE_LABEL) },
                  { ALT: () => this.CONSUME(tokenMap.ANON) },
              ]);
          });
          this.lexer = new chevrotain.Lexer(tokenVocab);
      }
  }

  const indexOfSELECT = baseTokens.indexOf(tokenMap.SELECT);
  const stardogTokens = [
      ...baseTokens.slice(0, indexOfSELECT),
      ...pathsTokens,
      ...baseTokens.slice(indexOfSELECT),
  ];
  class StardogSparqlParser extends BaseSparqlParser {
      constructor(options) {
          super(options, stardogTokens);
          this.Query = this.OVERRIDE_RULE('Query', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.SelectQuery) },
                  { ALT: () => this.SUBRULE(this.ConstructQuery) },
                  { ALT: () => this.SUBRULE(this.DescribeQuery) },
                  { ALT: () => this.SUBRULE(this.AskQuery) },
                  { ALT: () => this.SUBRULE(this.PathQuery) },
              ]);
              this.SUBRULE(this.ValuesClause);
          });
          this.PathQuery = this.RULE('PathQuery', () => {
              this.SUBRULE(this.PathSpec);
              this.MANY(() => this.SUBRULE(this.DatasetClause));
              this.CONSUME(tokenMap.START);
              this.SUBRULE(this.PathTerminal);
              this.CONSUME(tokenMap.END);
              this.SUBRULE1(this.PathTerminal);
              this.SUBRULE(this.Via);
              this.OPTION(() => this.SUBRULE(this.MaxLength));
              this.SUBRULE(this.SolutionModifier);
          });
          this.Via = this.RULE('Via', () => {
              this.CONSUME(tokenMap.VIA);
              this.OR([
                  { ALT: () => this.SUBRULE(this.GroupGraphPattern) },
                  { ALT: () => this.SUBRULE(this.Var) },
                  { ALT: () => this.SUBRULE(this.Path) },
              ]);
          });
          this.PathTerminal = this.RULE('PathTerminal', () => {
              this.SUBRULE(this.Var);
              this.OPTION(() => {
                  this.OR([
                      {
                          ALT: () => {
                              this.CONSUME(tokenMap.Equals);
                              this.SUBRULE(this.iri);
                          },
                      },
                      { ALT: () => this.SUBRULE(this.GroupGraphPattern) },
                  ]);
              });
          });
          this.PathSpec = this.RULE('PathSpec', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap.PATHS) },
                  { ALT: () => this.CONSUME(tokenMap.PATHS_SHORTEST) },
                  { ALT: () => this.CONSUME(tokenMap.PATHS_ALL) },
              ]);
              this.OPTION1(() => this.CONSUME(tokenMap.CYCLIC));
          });
          this.BuiltInCall = this.OVERRIDE_RULE('BuiltInCall', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Aggregate) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STR) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_LANG) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_LANGMATCHERS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_DATATYPE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_BOUND) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_IRI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_URI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_BNODE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_RAND) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_ABS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_CEIL) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_FLOOR) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_ROUND) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_CONCAT) },
                  { ALT: () => this.SUBRULE(this.SubstringExpression) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRLEN) },
                  { ALT: () => this.SUBRULE(this.StrReplaceExpression) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_UCASE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_LCASE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_ENCODE_FOR_URI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_CONTAINS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRSTARTS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRENDS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRBEFORE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRAFTER) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_YEAR) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_MONTH) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_DAY) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_HOURS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_MINUTES) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SECONDS) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_TIMEZONE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_TZ) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_NOW) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_UUID) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRUUID) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_MD5) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SHA1) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SHA256) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SHA384) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_SHA512) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_COALESCE) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_IF) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRLANG) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_STRDT) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_sameTerm) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isIRI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isURI) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isBlank) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isLiteral) },
                  { ALT: () => this.SUBRULE(this.BuiltInCall_isNumeric) },
                  { ALT: () => this.SUBRULE(this.RegexExpression) },
                  { ALT: () => this.SUBRULE(this.ExistsFunction) },
                  { ALT: () => this.SUBRULE(this.NotExistsFunction) },
                  // Stardog has some additional built-in functions, and supports user-defined custom functions
                  { ALT: () => this.SUBRULE(this.StardogOrCustomFunction) },
              ]);
          });
          this.StardogOrCustomFunction = this.RULE('StardogOrCustomFunction', () => {
              this.CONSUME(tokenMap.Unknown);
              this.SUBRULE(this.ExpressionList);
          });
          this.ConstructTemplate = this.OVERRIDE_RULE('ConstructTemplate', () => {
              this.CONSUME(tokenMap.LCurly);
              this.OPTION(() => 
              // Stardog supports the request of Quads in a Construct template. See Stardog issue #675
              this.SUBRULE(this.Quads));
              this.CONSUME(tokenMap.RCurly);
          });
          chevrotain.Parser.performSelfAnalysis(this);
      }
  }

  class W3SpecSparqlParser extends BaseSparqlParser {
      constructor(options) {
          super(options, baseTokens);
          chevrotain.Parser.performSelfAnalysis(this);
      }
  }

  const escapeSequence = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{8})|\\[uU]|\\(.)/g;
  const escapeReplacements = {
      '\\': '\\',
      "'": "'",
      '"': '"',
      n: '\n',
      r: '\r',
      t: '\t',
      f: '\f',
      b: '\b',
      _: '_',
      '~': '~',
      '.': '.',
      '-': '-',
      '!': '!',
      $: '$',
      '&': '&',
      '(': '(',
      ')': ')',
      '*': '*',
      '+': '+',
      ',': ',',
      ';': ';',
      '=': '=',
      '/': '/',
      '?': '?',
      '#': '#',
      '@': '@',
      '%': '%',
  };
  const unescape = (item) => {
      try {
          return item.replace(escapeSequence, (_, unicode4, unicode8, escapedChar) => {
              if (unicode4) {
                  return String.fromCharCode(parseInt(unicode4, 16));
              }
              else if (unicode8) {
                  let charCode = parseInt(unicode8, 16);
                  if (charCode <= 0xffff) {
                      return String.fromCharCode(charCode);
                  }
                  return String.fromCharCode(0xd800 + (charCode -= 0x10000) / 0x400, 0xdc00 + (charCode & 0x3ff));
              }
              else {
                  const replacement = escapeReplacements[escapedChar];
                  if (!replacement) {
                      throw new Error();
                  }
                  return replacement;
              }
          });
      }
      catch (error) {
          return null;
      }
  };
  const unescapedStringLiteralQuote = /^"([^"\\\r\n]+)"/; // non-empty string without escape sequences
  const unescapedStringLiteralSingleQuote = /^'([^'\\\r\n]+)'/;
  const stringLiteralQuote = /^"((?:[^"\\\r\n]|\\.)*)"(?=[^"])/;
  const stringLiteralSingleQuote = /^'((?:[^'\\\r\n]|\\.)*)'(?=[^'])/;
  const stringLiteralLongQuote = /^"""([^"\\]*(?:(?:\\.|"(?!""))[^"\\]*)*)"""/;
  const stringLiteralLongSingleQuote = /^'''([^'\\]*(?:(?:\\.|'(?!''))[^'\\]*)*)'''/;
  const illegalIriChars = /[\x00-\x20<>\\"\{\}\|\^\`]/;
  const escapedIri = /^<((?:[^ <>{}\\]|\\[uU])+)>[ \t]*/;
  const unescapedIri = /^<([^\x00-\x20<>\\"\{\}\|\^\`]*)>[ \t]*/;
  // const UCHAR = regex.or(
  //   regex.and(/\\u/, HEX, HEX, HEX, HEX),
  //   regex.and(/\\U/, HEX, HEX, HEX, HEX, HEX, HEX, HEX, HEX)
  // );
  // Somehow, for reasons not entirely clear to me, the next RegExp matches all
  // of the cases that the UCHAR rule is supposed to match, whereas the above
  // RegExp (`UCHAR`) does not. See this post, which is the source of the RegExp
  // below: https://mathiasbynens.be/notes/javascript-unicode
  // This is a similar resource that might be helpful: https://mathiasbynens.be/notes/es6-unicode-regex
  const unicodeRegexp = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  const tokenMap$1 = {
      Comment: chevrotain.createToken({
          name: 'Comment',
          pattern: /#[^\n]*/,
          group: 'comments',
      }),
      LBracket: tokenMap.LBracket,
      RBracket: tokenMap.RBracket,
      LParen: tokenMap.LParen,
      RParen: tokenMap.RParen,
      Period: tokenMap.Period,
      WhiteSpace: tokenMap.WhiteSpace,
      TRUE: tokenMap.TRUE,
      FALSE: tokenMap.FALSE,
      DoubleCaret: tokenMap.DoubleCaret,
      Comma: tokenMap.Comma,
      Semicolon: tokenMap.Semicolon,
      A: tokenMap.A,
      PREFIX: tokenMap.PREFIX,
      BASE: tokenMap.BASE,
      PNAME_NS: tokenMap.PNAME_NS,
      PNAME_LN: tokenMap.PNAME_LN,
      BLANK_NODE_LABEL: tokenMap.BLANK_NODE_LABEL,
      TTL_BASE: chevrotain.createToken({ name: 'TTL_BASE', pattern: /@base/ }),
      TTL_PREFIX: chevrotain.createToken({ name: 'TTL_PREFIX', pattern: /@prefix/ }),
      LANGTAG: tokenMap.LANGTAG,
      INTEGER: chevrotain.createToken({
          name: 'INTEGER',
          pattern: regex.and(regex.option(/[+-]/), /\d+/),
      }),
      DECIMAL: chevrotain.createToken({
          name: 'DECIMAL',
          pattern: regex.and(regex.option(/[+-]/), /(\d*\.\d+)/),
      }),
      DOUBLE: chevrotain.createToken({
          name: 'DOUBLE',
          pattern: regex.and(regex.option(/[+-]/), regex.or(regex.and(/\d+\.\d*/, EXPONENT), regex.and(/\.\d+/, EXPONENT), regex.and(/\d+/, EXPONENT))),
      }),
      EXPONENT: chevrotain.createToken({ name: 'EXPONENT', pattern: EXPONENT }),
      ECHAR: chevrotain.createToken({ name: 'ECHAR', pattern: ECHAR }),
      ANON: tokenMap.ANON,
      PLX: chevrotain.createToken({ name: 'PLX', pattern: PLX }),
      PERCENT: tokenMap.PERCENT,
      HEX: chevrotain.createToken({ name: 'HEX', pattern: HEX }),
      STRING_LITERAL_LONG_SINGLE_QUOTE: chevrotain.createToken({
          name: 'STRING_LITERAL_LONG_SINGLE_QUOTE',
          pattern: (text, startOffset = 0) => {
              const match = stringLiteralLongSingleQuote.exec(text.slice(startOffset));
              if (!match || unescape(match[1]) === null) {
                  // Bad characters
                  return null;
              }
              return match;
          },
          line_breaks: true,
      }),
      STRING_LITERAL_LONG_QUOTE: chevrotain.createToken({
          name: 'STRING_LITERAL_LONG_QUOTE',
          pattern: (text, startOffset = 0) => {
              const match = stringLiteralLongQuote.exec(text.slice(startOffset));
              if (!match || unescape(match[1]) === null) {
                  // Bad characters
                  return null;
              }
              return match;
          },
          line_breaks: true,
      }),
      STRING_LITERAL_QUOTE: chevrotain.createToken({
          name: 'STRING_LITERAL_QUOTE',
          pattern: (text, startOffset = 0) => {
              const textToMatch = text.slice(startOffset);
              let match = unescapedStringLiteralQuote.exec(textToMatch);
              if (match) {
                  return match;
              }
              match = stringLiteralQuote.exec(textToMatch);
              if (!match) {
                  return null;
              }
              if (unescape(match[1]) === null) {
                  // Bad characters
                  return null;
              }
              return match;
          },
          line_breaks: false,
      }),
      STRING_LITERAL_SINGLE_QUOTE: chevrotain.createToken({
          name: 'STRING_LITERAL_SINGLE_QUOTE',
          pattern: (text, startOffset = 0) => {
              const textToMatch = text.slice(startOffset);
              let match = unescapedStringLiteralSingleQuote.exec(textToMatch);
              if (match) {
                  return match;
              }
              match = stringLiteralSingleQuote.exec(textToMatch);
              if (!match) {
                  return null;
              }
              if (unescape(match[1]) === null) {
                  // Bad characters
                  return null;
              }
              return match;
          },
          line_breaks: false,
      }),
      UCHAR: chevrotain.createToken({
          name: 'UCHAR',
          pattern: (text, startOffset = 0) => unicodeRegexp.exec(text.slice(startOffset)),
          line_breaks: false,
      }),
      IRIREF: chevrotain.createToken({
          name: 'IRIREF',
          pattern: (text, startOffset = 0) => {
              const textToMatch = text.slice(startOffset);
              let match = unescapedIri.exec(textToMatch);
              if (match) {
                  return match;
              }
              match = escapedIri.exec(textToMatch);
              if (!match) {
                  return null;
              }
              const value = unescape(match[1]);
              if (value === null || illegalIriChars.test(value)) {
                  return null;
              }
              return match;
          },
          line_breaks: false,
      }),
      PN_CHARS_BASE: chevrotain.createToken({ name: 'PN_CHARS_BASE', pattern: PN_CHARS_BASE }),
      PN_CHARS_U: chevrotain.createToken({ name: 'PN_CHARS_U', pattern: PN_CHARS_U }),
      PN_CHARS: chevrotain.createToken({ name: 'PN_CHARS', pattern: PN_CHARS }),
      PN_PREFIX: chevrotain.createToken({ name: 'PN_PREFIX', pattern: PN_PREFIX }),
      PN_LOCAL: chevrotain.createToken({ name: 'PN_LOCAL', pattern: PN_LOCAL }),
      PN_LOCAL_ESC: chevrotain.createToken({ name: 'PN_LOCAL_ESC', pattern: PN_LOCAL_ESC }),
      Unknown: chevrotain.createToken({
          name: 'Unknown',
          pattern: /\w+/,
      }),
  };
  const tokenTypes = [
      tokenMap$1.Comment,
      tokenMap.ANON,
      tokenMap.LBracket,
      tokenMap.RBracket,
      tokenMap.LParen,
      tokenMap.RParen,
      tokenMap.WhiteSpace,
      tokenMap.TRUE,
      tokenMap.FALSE,
      tokenMap.Comma,
      tokenMap.Semicolon,
      tokenMap.PNAME_NS,
      tokenMap.A,
      tokenMap.PREFIX,
      tokenMap.BASE,
      tokenMap.PNAME_LN,
      tokenMap.BLANK_NODE_LABEL,
      tokenMap$1.TTL_BASE,
      tokenMap$1.TTL_PREFIX,
      tokenMap.LANGTAG,
      tokenMap$1.DOUBLE,
      tokenMap$1.DECIMAL,
      tokenMap.Period,
      tokenMap.DoubleCaret,
      tokenMap$1.IRIREF,
      tokenMap$1.STRING_LITERAL_LONG_SINGLE_QUOTE,
      tokenMap$1.STRING_LITERAL_LONG_QUOTE,
      tokenMap$1.STRING_LITERAL_QUOTE,
      tokenMap$1.STRING_LITERAL_SINGLE_QUOTE,
      tokenMap$1.INTEGER,
      tokenMap$1.EXPONENT,
      tokenMap$1.PLX,
      tokenMap.PERCENT,
      tokenMap$1.HEX,
      tokenMap$1.PN_CHARS_BASE,
      tokenMap$1.PN_CHARS_U,
      tokenMap$1.PN_CHARS,
      tokenMap$1.PN_PREFIX,
      tokenMap$1.PN_LOCAL,
      tokenMap$1.PN_LOCAL_ESC,
      tokenMap$1.ECHAR,
      tokenMap$1.UCHAR,
      tokenMap$1.Unknown,
  ];

  class TurtleParser extends chevrotain.Parser {
      constructor(config) {
          super([], tokenTypes, Object.assign({ outputCst: true, recoveryEnabled: true }, config));
          // Parsing Turtle requires that the parser keep a map of namespaces in state.
          // Empty prefixes, for example, are allowed only if the empty prefix has been
          // added to the namespaces map (for now, that's all this tracks). (TODO: We
          // might want to use a visitor for this, but I'm doing it quick-and-dirty for
          // now.)
          // See here: https://www.w3.org/TR/turtle/#handle-PNAME_LN
          this.namespacesMap = {};
          this.semanticErrors = [];
          // Clears the state that we have to manage on our own for each parse (see
          // above for details).
          this.resetManagedState = () => {
              this.namespacesMap = {};
              this.semanticErrors = [];
          };
          this.tokenize = (document) => this.lexer.tokenize(document).tokens;
          this.parse = (document) => {
              this.input = this.lexer.tokenize(document).tokens;
              const cst = this.turtleDoc();
              // Next two items are copied so that they can be returned/held after parse
              // state is cleared.
              const errors = [...this.errors];
              const semanticErrors = [...this.semanticErrors];
              this.resetManagedState();
              return {
                  errors,
                  semanticErrors,
                  cst,
              };
          };
          this.turtleDoc = this.RULE('turtleDoc', () => {
              this.MANY(() => this.SUBRULE(this.statement));
          });
          this.statement = this.RULE('statement', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.directive) },
                  {
                      ALT: () => {
                          this.SUBRULE(this.triples);
                          this.CONSUME(tokenMap$1.Period);
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
              this.CONSUME(tokenMap$1.TTL_PREFIX);
              const pnameNsToken = this.CONSUME(tokenMap$1.PNAME_NS);
              const iriToken = this.CONSUME(tokenMap$1.IRIREF);
              const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
              const iriImage = iriToken.image;
              this.namespacesMap[pnameImageWithoutColon] = iriImage;
              this.CONSUME(tokenMap$1.Period);
          });
          this.base = this.RULE('base', () => {
              this.CONSUME(tokenMap$1.TTL_BASE);
              this.CONSUME(tokenMap$1.IRIREF);
              this.CONSUME(tokenMap$1.Period);
          });
          this.sparqlBase = this.RULE('sparqlBase', () => {
              this.CONSUME(tokenMap$1.BASE);
              this.CONSUME(tokenMap$1.IRIREF);
          });
          this.sparqlPrefix = this.RULE('sparqlPrefix', () => {
              this.CONSUME(tokenMap$1.PREFIX);
              const pnameNsToken = this.CONSUME(tokenMap$1.PNAME_NS);
              const iriToken = this.CONSUME(tokenMap$1.IRIREF);
              const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
              const iriImage = iriToken.image;
              this.namespacesMap[pnameImageWithoutColon] = iriImage;
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
              this.OPTION(() => {
                  this.CONSUME(tokenMap$1.Semicolon);
                  this.OPTION1(() => {
                      this.SUBRULE1(this.verb);
                      this.SUBRULE1(this.objectList);
                  });
              });
              this.MANY(() => {
                  this.CONSUME1(tokenMap$1.Semicolon);
                  this.OPTION2(() => {
                      this.SUBRULE2(this.verb);
                      this.SUBRULE2(this.objectList);
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
                  this.CONSUME(tokenMap$1.Comma);
                  this.SUBRULE1(this.object);
              });
          });
          this.verb = this.RULE('verb', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.predicate) },
                  { ALT: () => this.CONSUME(tokenMap$1.A) },
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
              this.CONSUME(tokenMap$1.LBracket);
              this.SUBRULE(this.predicateObjectList);
              this.CONSUME(tokenMap$1.RBracket);
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
              this.CONSUME(tokenMap$1.LParen);
              this.MANY(() => this.SUBRULE(this.object));
              this.CONSUME(tokenMap$1.RParen);
          });
          this.NumericLiteral = this.RULE('NumericLiteral', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$1.INTEGER) },
                  { ALT: () => this.CONSUME(tokenMap$1.DECIMAL) },
                  { ALT: () => this.CONSUME(tokenMap$1.DOUBLE) },
              ]);
          });
          this.RDFLiteral = this.RULE('RDFLiteral', () => {
              this.SUBRULE(this.String);
              this.OPTION(() => {
                  this.OR([
                      { ALT: () => this.CONSUME(tokenMap$1.LANGTAG) },
                      {
                          ALT: () => {
                              this.CONSUME(tokenMap$1.DoubleCaret);
                              this.SUBRULE(this.iri);
                          },
                      },
                  ]);
              });
          });
          this.BooleanLiteral = this.RULE('BooleanLiteral', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$1.TRUE) },
                  { ALT: () => this.CONSUME(tokenMap$1.FALSE) },
              ]);
          });
          this.String = this.RULE('String', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$1.STRING_LITERAL_QUOTE) },
                  { ALT: () => this.CONSUME(tokenMap$1.STRING_LITERAL_SINGLE_QUOTE) },
                  { ALT: () => this.CONSUME(tokenMap$1.STRING_LITERAL_LONG_SINGLE_QUOTE) },
                  { ALT: () => this.CONSUME(tokenMap$1.STRING_LITERAL_LONG_QUOTE) },
              ]);
          });
          this.iri = this.RULE('iri', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$1.IRIREF) },
                  { ALT: () => this.SUBRULE(this.PrefixedName) },
              ]);
          });
          this.PrefixedName = this.RULE('PrefixedName', () => {
              const prefixedNameToken = this.OR([
                  { ALT: () => this.CONSUME(tokenMap$1.PNAME_LN) },
                  { ALT: () => this.CONSUME(tokenMap$1.PNAME_NS) },
              ]);
              const pnameNsImage = prefixedNameToken.image.slice(0, prefixedNameToken.image.indexOf(':'));
              if (!(pnameNsImage in this.namespacesMap)) {
                  this.semanticErrors.push({
                      name: 'NoNamespacePrefixError',
                      message: 'A prefix was used for which there was no namespace defined.',
                      token: prefixedNameToken,
                      context: {
                          ruleStack: this.getHumanReadableRuleStack(),
                          ruleOccurrenceStack: [...this.RULE_OCCURRENCE_STACK],
                      },
                      resyncedTokens: [],
                  });
              }
          });
          this.BlankNode = this.RULE('BlankNode', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$1.BLANK_NODE_LABEL) },
                  { ALT: () => this.CONSUME(tokenMap$1.ANON) },
              ]);
          });
          this.lexer = new chevrotain.Lexer(tokenTypes);
          chevrotain.Parser.performSelfAnalysis(this);
      }
  }

  const FROM_BLOCK_END_MATCHER = /^\s*to\s*{/i;
  const FROM_JSON_BLOCK_END_MATCHER = /((?:.|\s)*?)to\s*{/i;
  // Because the end of `FROM` clauses in SMS are not explicit, tokenizing them
  // using regexes can be incredibly inefficient. This function gives us a bit
  // more control; it scans through the document character by character until
  // it finds a character which is _likely_ to be followed by an ending pattern,
  // and only then does it use a regex to confirm.
  const explicitEndMatcher = (textToMatch, endCandidateChar, // Char which, if found, triggers an exec of endMatcher
  endMatcher // Regex which matches an end pattern
  ) => {
      for (let offset = 0, char; offset < textToMatch.length; offset++) {
          char = textToMatch[offset];
          if (char === endCandidateChar) {
              const blockEndCandidate = textToMatch.slice(offset + 1);
              const match = endMatcher.exec(blockEndCandidate);
              if (!match) {
                  continue;
              }
              else {
                  const blockText = textToMatch.slice(0, offset);
                  const response = [blockText];
                  return response;
              }
          }
      }
      return null;
  };
  const tokenMap$2 = {
      STRING_LITERAL1: tokenMap.STRING_LITERAL1,
      STRING_LITERAL2: tokenMap.STRING_LITERAL2,
      STRING_LITERAL_LONG1: tokenMap.STRING_LITERAL_LONG1,
      STRING_LITERAL_LONG2: tokenMap.STRING_LITERAL_LONG2,
      IRIREF: tokenMap.IRIREF,
      PNAME_LN: tokenMap.PNAME_LN,
      PNAME_NS: tokenMap.PNAME_NS,
      NIL: tokenMap.NIL,
      DISTINCT: tokenMap.DISTINCT,
      VAR1: tokenMap.VAR1,
      VAR2: tokenMap.VAR2,
      BIND: tokenMap.BIND,
      AS: tokenMap.AS,
      WHERE: tokenMap.WHERE,
      LANGTAG: tokenMap.LANGTAG,
      INTEGER: tokenMap.INTEGER,
      DECIMAL: tokenMap.DECIMAL,
      DOUBLE: tokenMap.DOUBLE,
      INTEGER_POSITIVE: tokenMap.INTEGER_POSITIVE,
      DECIMAL_POSITIVE: tokenMap.DECIMAL_POSITIVE,
      DOUBLE_POSITIVE: tokenMap.DOUBLE_POSITIVE,
      INTEGER_NEGATIVE: tokenMap.INTEGER_NEGATIVE,
      DECIMAL_NEGATIVE: tokenMap.DECIMAL_NEGATIVE,
      DOUBLE_NEGATIVE: tokenMap.DOUBLE_NEGATIVE,
      TRUE: tokenMap.TRUE,
      FALSE: tokenMap.FALSE,
      BLANK_NODE_LABEL: tokenMap.BLANK_NODE_LABEL,
      ANON: tokenMap.ANON,
      A: tokenMap.A,
      FROM: tokenMap.FROM,
      PREFIX: tokenMap.PREFIX,
      Comment: tokenMap.Comment,
      Period: tokenMap.Period,
      Comma: tokenMap.Comma,
      LCurly: tokenMap.LCurly,
      RCurly: tokenMap.RCurly,
      LParen: tokenMap.LParen,
      RParen: tokenMap.RParen,
      WhiteSpace: tokenMap.WhiteSpace,
      DoubleCaret: tokenMap.DoubleCaret,
      Semicolon: tokenMap.Semicolon,
      LBracket: tokenMap.LBracket,
      RBracket: tokenMap.RBracket,
      Template: chevrotain.createToken({
          name: 'Template',
          pattern: /template/i,
      }),
      TO: chevrotain.createToken({
          name: 'TO',
          pattern: /to/i,
      }),
      Sql: chevrotain.createToken({
          name: 'Sql',
          pattern: /sql/i,
      }),
      GraphQl: chevrotain.createToken({
          name: 'GraphQl',
          pattern: /graphql/i,
      }),
      Json: chevrotain.createToken({
          name: 'Json',
          pattern: /json/i,
      }),
      Mapping: chevrotain.createToken({
          name: 'Mapping',
          pattern: /mapping/i,
      }),
      SqlBlock: chevrotain.createToken({
          name: 'SqlBlock',
          pattern: (text, startOffset = 0, matchedTokensSoFar) => {
              const [secondToLastToken, lastToken] = matchedTokensSoFar.slice(-2);
              if (!secondToLastToken ||
                  !lastToken ||
                  secondToLastToken.tokenType.tokenName !== tokenMap$2.Sql.tokenName ||
                  lastToken.tokenType.tokenName !== tokenMap$2.LCurly.tokenName) {
                  return null;
              }
              const textToMatch = text.slice(startOffset);
              return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
          },
          line_breaks: true,
      }),
      JsonBlock: chevrotain.createToken({
          name: 'JsonBlock',
          pattern: (text, startOffset = 0, matchedTokensSoFar) => {
              const [lastToken] = matchedTokensSoFar.slice(-1);
              if (!lastToken ||
                  lastToken.tokenType.tokenName !== tokenMap$2.Json.tokenName) {
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
      GraphQlBlock: chevrotain.createToken({
          name: 'GraphQlBlock',
          pattern: (text, startOffset = 0, matchedTokensSoFar) => {
              const [secondToLastToken, lastToken] = matchedTokensSoFar.slice(-2);
              if (!secondToLastToken ||
                  !lastToken ||
                  secondToLastToken.tokenType.tokenName !== tokenMap$2.GraphQl.tokenName ||
                  lastToken.tokenType.tokenName !== tokenMap$2.LCurly.tokenName) {
                  return null;
              }
              const textToMatch = text.slice(startOffset);
              return explicitEndMatcher(textToMatch, '}', FROM_BLOCK_END_MATCHER);
          },
          line_breaks: true,
      }),
  };
  const tokenTypes$1 = [
      tokenMap$2.WhiteSpace,
      tokenMap$2.Comment,
      tokenMap$2.LParen,
      tokenMap$2.RParen,
      tokenMap$2.Period,
      tokenMap$2.Template,
      tokenMap$2.IRIREF,
      tokenMap$2.PNAME_LN,
      tokenMap$2.PNAME_NS,
      tokenMap$2.NIL,
      tokenMap$2.DISTINCT,
      tokenMap$2.VAR1,
      tokenMap$2.VAR2,
      tokenMap$2.BIND,
      tokenMap$2.AS,
      tokenMap$2.WHERE,
      tokenMap$2.TO,
      tokenMap$2.LANGTAG,
      tokenMap$2.INTEGER,
      tokenMap$2.DECIMAL,
      tokenMap$2.DOUBLE,
      tokenMap$2.INTEGER_POSITIVE,
      tokenMap$2.DECIMAL_POSITIVE,
      tokenMap$2.DOUBLE_POSITIVE,
      tokenMap$2.INTEGER_NEGATIVE,
      tokenMap$2.DECIMAL_NEGATIVE,
      tokenMap$2.DOUBLE_NEGATIVE,
      tokenMap$2.TRUE,
      tokenMap$2.FALSE,
      tokenMap$2.BLANK_NODE_LABEL,
      tokenMap$2.ANON,
      tokenMap$2.A,
      tokenMap$2.FROM,
      tokenMap$2.PREFIX,
      tokenMap$2.Comma,
      tokenMap$2.DoubleCaret,
      tokenMap$2.Semicolon,
      tokenMap$2.LBracket,
      tokenMap$2.RBracket,
      tokenMap$2.Sql,
      tokenMap$2.GraphQl,
      tokenMap$2.Json,
      tokenMap$2.Mapping,
      tokenMap$2.SqlBlock,
      tokenMap$2.JsonBlock,
      tokenMap$2.GraphQlBlock,
      tokenMap$2.LCurly,
      tokenMap$2.RCurly,
      tokenMap$2.STRING_LITERAL1,
      tokenMap$2.STRING_LITERAL2,
      tokenMap$2.STRING_LITERAL_LONG1,
      tokenMap$2.STRING_LITERAL_LONG2,
  ];

  class SmsParser extends chevrotain.Parser {
      constructor(config) {
          super([], tokenTypes$1, Object.assign({ outputCst: true, recoveryEnabled: true }, config));
          this.tokenize = (document) => this.lexer.tokenize(document).tokens;
          this.parse = (document) => {
              this.input = this.lexer.tokenize(document).tokens;
              const cst = this.MappingDoc();
              const errors = this.errors;
              return {
                  errors,
                  cst,
              };
          };
          this.MappingDoc = this.RULE('MappingDoc', () => {
              this.MANY(() => this.SUBRULE(this.PrefixDecl));
              this.SUBRULE(this.MappingClause);
              this.MANY1(() => {
                  this.CONSUME(tokenMap$2.Semicolon);
                  this.SUBRULE1(this.MappingClause);
              });
          });
          this.MappingClause = this.RULE('MappingClause', () => {
              this.SUBRULE(this.MappingDecl);
              this.SUBRULE(this.FromClause);
              this.SUBRULE(this.ToClause);
              this.SUBRULE(this.WhereClause);
          });
          this.MappingDecl = this.RULE('MappingDecl', () => {
              this.CONSUME(tokenMap$2.Mapping);
              this.OPTION(() => this.SUBRULE(this.iri));
          });
          this.FromClause = this.RULE('FromClause', () => {
              this.CONSUME(tokenMap$2.FROM);
              this.OR([
                  {
                      ALT: () => this.SUBRULE(this.SqlClause),
                  },
                  {
                      ALT: () => this.SUBRULE(this.JsonClause),
                  },
                  {
                      ALT: () => this.SUBRULE(this.GraphQlClause),
                  },
              ]);
          });
          this.JsonClause = this.RULE('JsonClause', () => {
              this.CONSUME(tokenMap$2.Json);
              // this.CONSUME(tokenMap.LCurly);
              this.CONSUME(tokenMap$2.JsonBlock);
              // this.CONSUME(tokenMap.RCurly);
          });
          this.GraphQlClause = this.RULE('GraphQlClause', () => {
              this.CONSUME(tokenMap$2.GraphQl);
              this.CONSUME(tokenMap$2.LCurly);
              this.CONSUME(tokenMap$2.GraphQlBlock);
              this.CONSUME(tokenMap$2.RCurly);
          });
          this.SqlClause = this.RULE('SqlClause', () => {
              this.CONSUME(tokenMap$2.Sql);
              this.CONSUME(tokenMap$2.LCurly);
              this.CONSUME(tokenMap$2.SqlBlock);
              this.CONSUME(tokenMap$2.RCurly);
          });
          this.ToClause = this.RULE('ToClause', () => {
              this.CONSUME(tokenMap$2.TO);
              this.SUBRULE(this.ConstructTemplate);
          });
          this.WhereClause = this.RULE('WhereClause', () => {
              this.CONSUME(tokenMap$2.WHERE);
              this.CONSUME(tokenMap$2.LCurly);
              this.MANY(() => this.SUBRULE(this.Bind));
              this.CONSUME(tokenMap$2.RCurly);
          });
          this.Bind = this.RULE('Bind', () => {
              this.CONSUME(tokenMap$2.BIND);
              this.CONSUME(tokenMap$2.LParen);
              this.SUBRULE(this.TemplateOrCast);
              this.CONSUME(tokenMap$2.AS);
              this.SUBRULE(this.Var);
              this.CONSUME(tokenMap$2.RParen);
          });
          this.TemplateOrCast = this.RULE('TemplateOrCast', () => {
              this.OR([
                  {
                      ALT: () => this.SUBRULE(this.TemplateFunc),
                  },
                  {
                      ALT: () => this.SUBRULE(this.CastFunc),
                  },
              ]);
          });
          this.CastFunc = this.RULE('CastFunc', () => {
              this.SUBRULE(this.iri);
              this.CONSUME(tokenMap$2.LParen);
              this.SUBRULE(this.Var);
              this.CONSUME(tokenMap$2.RParen);
          });
          this.TemplateFunc = this.RULE('TemplateFunc', () => {
              this.CONSUME(tokenMap$2.Template);
              this.CONSUME(tokenMap$2.LParen);
              this.SUBRULE(this.String);
              this.CONSUME(tokenMap$2.RParen);
          });
          //
          // Dupes from Sparql
          //
          this.PrefixDecl = this.RULE('PrefixDecl', () => {
              this.CONSUME(tokenMap$2.PREFIX);
              this.CONSUME(tokenMap$2.PNAME_NS);
              this.CONSUME(tokenMap$2.IRIREF);
          });
          this.iri = this.RULE('iri', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.IRIREF) },
                  { ALT: () => this.SUBRULE(this.PrefixedName) },
              ]);
          });
          this.PrefixedName = this.RULE('PrefixedName', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.PNAME_LN) },
                  { ALT: () => this.CONSUME(tokenMap$2.PNAME_NS) },
              ]);
          });
          this.ConstructTemplate = this.RULE('ConstructTemplate', () => {
              this.CONSUME(tokenMap$2.LCurly);
              this.OPTION(() => this.SUBRULE(this.ConstructTriples));
              this.CONSUME(tokenMap$2.RCurly);
          });
          this.ConstructTriples = this.RULE('ConstructTriples', () => {
              this.SUBRULE(this.TriplesSameSubject);
              this.OPTION(() => {
                  this.CONSUME(tokenMap$2.Period);
                  this.OPTION1(() => this.SUBRULE(this.ConstructTriples));
              });
          });
          this.TriplesSameSubject = this.RULE('TriplesSameSubject', () => {
              this.OR([
                  {
                      ALT: () => {
                          this.SUBRULE(this.VarOrTerm);
                          this.SUBRULE(this.PropertyListNotEmpty);
                      },
                  },
                  {
                      ALT: () => {
                          this.SUBRULE(this.TriplesNode);
                          this.SUBRULE(this.PropertyList);
                      },
                  },
              ]);
          });
          this.VarOrTerm = this.RULE('VarOrTerm', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Var) },
                  { ALT: () => this.SUBRULE(this.GraphTerm) },
              ]);
          });
          this.PropertyListNotEmpty = this.RULE('PropertyListNotEmpty', () => {
              this.SUBRULE(this.Verb);
              this.SUBRULE(this.ObjectList);
              this.MANY(() => {
                  this.CONSUME(tokenMap$2.Semicolon);
                  this.OPTION(() => {
                      this.SUBRULE1(this.Verb);
                      this.SUBRULE1(this.ObjectList);
                  });
              });
          });
          this.TriplesNode = this.RULE('TriplesNode', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Collection) },
                  { ALT: () => this.SUBRULE(this.BlankNodePropertyList) },
              ]);
          });
          this.PropertyList = this.RULE('PropertyList', () => {
              this.OPTION(() => this.SUBRULE(this.PropertyListNotEmpty));
          });
          this.GraphTerm = this.RULE('GraphTerm', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.iri) },
                  { ALT: () => this.SUBRULE(this.RDFLiteral) },
                  { ALT: () => this.SUBRULE(this.NumericLiteral) },
                  { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                  { ALT: () => this.SUBRULE(this.BlankNode) },
                  { ALT: () => this.CONSUME(tokenMap$2.NIL) },
              ]);
          });
          this.Verb = this.RULE('Verb', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.VarOrIri) },
                  { ALT: () => this.CONSUME(tokenMap$2.A) },
              ]);
          });
          this.ObjectList = this.RULE('ObjectList', () => {
              this.AT_LEAST_ONE_SEP({
                  SEP: tokenMap$2.Comma,
                  DEF: () => this.SUBRULE(this.Object),
              });
          });
          this.Object = this.RULE('Object', () => {
              this.SUBRULE(this.GraphNode);
          });
          this.Collection = this.RULE('Collection', () => {
              this.CONSUME(tokenMap$2.LParen);
              this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNode));
              this.CONSUME(tokenMap$2.RParen);
          });
          this.BlankNodePropertyList = this.RULE('BlankNodePropertyList', () => {
              this.CONSUME(tokenMap$2.LBracket);
              this.SUBRULE(this.PropertyListNotEmpty);
              this.CONSUME(tokenMap$2.RBracket);
          });
          this.VarOrIri = this.RULE('VarOrIri', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.Var) },
                  { ALT: () => this.SUBRULE(this.iri) },
              ]);
          });
          this.RDFLiteral = this.RULE('RDFLiteral', () => {
              this.SUBRULE(this.String);
              this.OPTION(() => this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.LANGTAG) },
                  {
                      ALT: () => {
                          this.CONSUME(tokenMap$2.DoubleCaret);
                          this.SUBRULE(this.iri);
                      },
                  },
              ]));
          });
          this.NumericLiteral = this.RULE('NumericLiteral', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.NumericLiteralUnsigned) },
                  { ALT: () => this.SUBRULE(this.NumericLiteralPositive) },
                  { ALT: () => this.SUBRULE(this.NumericLiteralNegative) },
              ]);
          });
          this.NumericLiteralUnsigned = this.RULE('NumericLiteralUnsigned', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.INTEGER) },
                  { ALT: () => this.CONSUME(tokenMap$2.DECIMAL) },
                  { ALT: () => this.CONSUME(tokenMap$2.DOUBLE) },
              ]);
          });
          this.NumericLiteralPositive = this.RULE('NumericLiteralPositive', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.INTEGER_POSITIVE) },
                  { ALT: () => this.CONSUME(tokenMap$2.DECIMAL_POSITIVE) },
                  { ALT: () => this.CONSUME(tokenMap$2.DOUBLE_POSITIVE) },
              ]);
          });
          this.NumericLiteralNegative = this.RULE('NumericLiteralNegative', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.INTEGER_NEGATIVE) },
                  { ALT: () => this.CONSUME(tokenMap$2.DECIMAL_NEGATIVE) },
                  { ALT: () => this.CONSUME(tokenMap$2.DOUBLE_NEGATIVE) },
              ]);
          });
          this.BooleanLiteral = this.RULE('BooleanLiteral', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.TRUE) },
                  { ALT: () => this.CONSUME(tokenMap$2.FALSE) },
              ]);
          });
          this.BlankNode = this.RULE('BlankNode', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.BLANK_NODE_LABEL) },
                  { ALT: () => this.CONSUME(tokenMap$2.ANON) },
              ]);
          });
          this.GraphNode = this.RULE('GraphNode', () => {
              this.OR([
                  { ALT: () => this.SUBRULE(this.VarOrTerm) },
                  { ALT: () => this.SUBRULE(this.TriplesNode) },
              ]);
          });
          this.Var = this.RULE('Var', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.VAR1) },
                  { ALT: () => this.CONSUME(tokenMap$2.VAR2) },
              ]);
          });
          this.String = this.RULE('String', () => {
              this.OR([
                  { ALT: () => this.CONSUME(tokenMap$2.STRING_LITERAL1) },
                  { ALT: () => this.CONSUME(tokenMap$2.STRING_LITERAL2) },
                  { ALT: () => this.CONSUME(tokenMap$2.STRING_LITERAL_LONG1) },
                  { ALT: () => this.CONSUME(tokenMap$2.STRING_LITERAL_LONG2) },
              ]);
          });
          this.lexer = new chevrotain.Lexer(tokenTypes$1);
          chevrotain.Parser.performSelfAnalysis(this);
      }
  }

  const traverse = (root, visit) => {
      _traverse(root, null, visit);
  };
  function isCstNode(object) {
      return 'name' in object;
  }
  class TraverseContext {
      constructor({ node, parentCtx, }) {
          this.node = Object.assign({}, node);
          this.parentCtx = Object.assign({}, parentCtx);
      }
  }
  const _traverse = (root, ctx = new TraverseContext({ node: root }), visit) => {
      if (!isCstNode(root)) {
          // must be a token
          // make sure to give user a copy
          return visit(Object.assign({}, ctx));
      }
      // is a grammar rule node
      const { children } = root;
      Object.keys(children).forEach((key) => {
          const childType = children[key];
          if (!childType.length) {
              return;
          }
          childType.forEach((child) => {
              const childCtx = new TraverseContext({ node: child, parentCtx: ctx });
              const afterVisit = (transformedCtx) => {
                  const nextCtx = transformedCtx
                      ? new TraverseContext({
                          node: transformedCtx.node,
                          parentCtx: transformedCtx.parentCtx,
                      })
                      : childCtx;
                  _traverse(child, nextCtx, visit);
              };
              visit(childCtx, afterVisit);
          });
      });
  };

  exports.BaseSparqlParser = BaseSparqlParser;
  exports.StardogSparqlParser = StardogSparqlParser;
  exports.W3SpecSparqlParser = W3SpecSparqlParser;
  exports.TurtleParser = TurtleParser;
  exports.SmsParser = SmsParser;
  exports.traverse = traverse;
  exports.isCstNode = isCstNode;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
