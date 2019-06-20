import { createToken, Lexer, ITokenConfig, TokenType } from 'chevrotain';
import { regex } from 'helpers/regex';
import { STRING_LITERAL_LONG2 } from 'helpers/matchers';

const NAME_PATTERN = /[_A-Za-z][_0-9A-Za-z]*/;
const INTEGER_PART_PATTERN = /\-?(?:0|[1-9][0-9]*)/;
const EXPONENT_PART_PATTERN = /[eE][+-]?[0-9]+/;
const ESCAPED_CHARACTER_PATTERN = /\\["\\/bfnrt]/;
const ESCAPED_UNICODE_PATTERN = /\\u[0-9A-Fa-f]{4}/;
const STRING_SOURCE_CHARACTER_PATTERN = /[\u0009\u0020\u0021\u0023-\u005B\u005D-\uFFFF]/; // source character, but no '"' or '\' or line terminators
const STRING_CHARACTER_PATTERN = regex.and(
  /"/,
  regex.many(
    regex.or(
      STRING_SOURCE_CHARACTER_PATTERN,
      ESCAPED_UNICODE_PATTERN,
      ESCAPED_CHARACTER_PATTERN
    )
  ),
  /"/
);
const BOOLEAN_PATTERN = /true|false/;
const NULL_PATTERN = /null/;

const ignoredTokens = {
  WhiteSpace: createToken({
    name: 'WhiteSpace',
    pattern: /[ \t]+/,
    group: Lexer.SKIPPED,
  }),
  UnicodeBOM: createToken({
    name: 'UnicodeBOM',
    pattern: '\\uFFFE',
    group: Lexer.SKIPPED,
  }),
  LineTerminator: createToken({
    name: 'LineTerminator',
    pattern: /\n\r|\r|\n/,
    group: Lexer.SKIPPED,
  }),
  Comment: createToken({
    name: 'Comment',
    pattern: /#[^\n\r]*/,
    group: Lexer.SKIPPED,
  }),
  Comma: createToken({
    name: 'Comma',
    pattern: ',',
    group: Lexer.SKIPPED,
  }),
};

const punctuators = {
  Bang: createToken({ name: 'Bang', pattern: '!' }),
  Dollar: createToken({ name: 'Dollar', pattern: '$' }),
  LParen: createToken({ name: 'LParen', pattern: '(' }),
  RParen: createToken({ name: 'RParen', pattern: ')' }),
  Spread: createToken({ name: 'Spread', pattern: '...' }),
  Colon: createToken({ name: 'Colon', pattern: ':' }),
  Equals: createToken({ name: 'Equals', pattern: '=' }),
  At: createToken({ name: 'At', pattern: '@' }),
  LBracket: createToken({ name: 'LBracket', pattern: '[' }),
  RBracket: createToken({ name: 'RBracket', pattern: ']' }),
  LCurly: createToken({ name: 'LCurly', pattern: '{' }),
  RCurly: createToken({ name: 'RCurly', pattern: '}' }),
  Or: createToken({ name: 'Or', pattern: '|' }),
  And: createToken({ name: 'And', pattern: '&' }), // not listed in the spec as a punctuator, for some reason
};

const Name = createToken({ name: 'Name', pattern: NAME_PATTERN });

const nonKeywordTerminals = {
  IntValueToken: createToken({
    name: 'IntValueToken',
    pattern: INTEGER_PART_PATTERN,
  }),
  FloatValueToken: createToken({
    name: 'FloatValueToken',
    pattern: regex.and(
      INTEGER_PART_PATTERN,
      regex.or(
        regex.and(/\.[0-9]+/, regex.option(EXPONENT_PART_PATTERN)),
        EXPONENT_PART_PATTERN
      )
    ),
  }),
  StringValueToken: createToken({
    name: 'StringValueToken',
    pattern: regex.or(STRING_CHARACTER_PATTERN, STRING_LITERAL_LONG2),
  }),
  BooleanValueToken: createToken({
    name: 'BooleanValueToken',
    pattern: BOOLEAN_PATTERN,
  }),
  NullValueToken: createToken({
    name: 'NullValueToken',
    pattern: NULL_PATTERN,
  }),
  EnumValueToken: createToken({
    name: 'EnumValueToken',
    pattern: regex.and(/(?!true|false|null)/, NAME_PATTERN),
    categories: [Name],
  }),
  FragmentName: createToken({
    name: 'FragmentName',
    pattern: regex.and(/(?!on)/, NAME_PATTERN),
    categories: [Name],
  }),
};

const createKeywordToken = (config: ITokenConfig) =>
  createToken({
    name: config.name,
    pattern: config.pattern,
    longer_alt: Name,
  });

const keywords = {
  Query: createKeywordToken({
    name: 'Query',
    pattern: 'query',
  }),
  Mutation: createKeywordToken({
    name: 'Mutation',
    pattern: 'mutation',
  }),
  Subscription: createKeywordToken({
    name: 'Subscription',
    pattern: 'subscription',
  }),
  Fragment: createKeywordToken({
    name: 'Fragment',
    pattern: 'fragment',
  }),
  On: createKeywordToken({
    name: 'On',
    pattern: 'on',
  }),
  Schema: createKeywordToken({
    name: 'Schema',
    pattern: 'schema',
  }),
  Extend: createKeywordToken({
    name: 'Extend',
    pattern: 'extend',
  }),
  Scalar: createKeywordToken({
    name: 'Scalar',
    pattern: 'scalar',
  }),
  TypeToken: createKeywordToken({
    name: 'TypeToken',
    pattern: 'type',
  }),
  Implements: createKeywordToken({
    name: 'Implements',
    pattern: 'implements',
  }),
  Interface: createKeywordToken({
    name: 'Interface',
    pattern: 'interface',
  }),
  Union: createKeywordToken({
    name: 'Union',
    pattern: 'union',
  }),
  Enum: createKeywordToken({
    name: 'Enum',
    pattern: 'enum',
  }),
  Input: createKeywordToken({
    name: 'Input',
    pattern: 'input',
  }),
  DirectiveToken: createKeywordToken({
    name: 'DirectiveToken',
    pattern: 'directive',
  }),
  QUERY: createKeywordToken({ name: 'QUERY', pattern: 'QUERY' }),
  MUTATION: createKeywordToken({ name: 'MUTATION', pattern: 'MUTATION' }),
  SUBSCRIPTION: createKeywordToken({
    name: 'SUBSCRIPTION',
    pattern: 'SUBSCRIPTION',
  }),
  FIELD: createKeywordToken({ name: 'FIELD', pattern: 'FIELD' }),
  FRAGMENT_DEFINITION: createKeywordToken({
    name: 'FRAGMENT_DEFINITION',
    pattern: 'FRAGMENT_DEFINITION',
  }),
  FRAGMENT_SPREAD: createKeywordToken({
    name: 'FRAGMENT_SPREAD',
    pattern: 'FRAGMENT_SPREAD',
  }),
  INLINE_FRAGMENT: createKeywordToken({
    name: 'INLINE_FRAGMENT',
    pattern: 'INLINE_FRAGMENT',
  }),
  SCHEMA: createKeywordToken({ name: 'SCHEMA', pattern: 'SCHEMA' }),
  SCALAR: createKeywordToken({ name: 'SCALAR', pattern: 'SCALAR' }),
  OBJECT: createKeywordToken({ name: 'OBJECT', pattern: 'OBJECT' }),
  FIELD_DEFINITION: createKeywordToken({
    name: 'FIELD_DEFINITION',
    pattern: 'FIELD_DEFINITION',
  }),
  ARGUMENT_DEFINITION: createKeywordToken({
    name: 'ARGUMENT_DEFINITION',
    pattern: 'ARGUMENT_DEFINITION',
  }),
  INTERFACE: createKeywordToken({ name: 'INTERFACE', pattern: 'INTERFACE' }),
  UNION: createKeywordToken({ name: 'UNION', pattern: 'UNION' }),
  ENUM: createKeywordToken({ name: 'ENUM', pattern: 'ENUM' }),
  ENUM_VALUE: createKeywordToken({ name: 'ENUM_VALUE', pattern: 'ENUM_VALUE' }),
  INPUT_OBJECT: createKeywordToken({
    name: 'INPUT_OBJECT',
    pattern: 'INPUT_OBJECT',
  }),
  INPUT_FIELD_DEFINITION: createKeywordToken({
    name: 'INPUT_FIELD_DEFINITION',
    pattern: 'INPUT_FIELD_DEFINITION',
  }),
};

export const graphQlTokenMap = {
  ...ignoredTokens,
  ...punctuators,
  ...nonKeywordTerminals,
  ...keywords,
  Name,
};

export const graphQlTokens = [
  ignoredTokens,
  punctuators,
  keywords,
  // nonKeywordTerminals,
]
  .reduce(
    (allTokens, tokenMap) => [
      ...allTokens,
      ...Object.keys(tokenMap).map((tokenKey) => tokenMap[tokenKey]),
    ],
    []
  )
  .concat([
    nonKeywordTerminals.FloatValueToken,
    ...Object.keys(nonKeywordTerminals)
      .filter((key) => key !== 'FloatValueToken')
      .map((key) => nonKeywordTerminals[key]),
  ])
  .concat([Name]); // ensures that this does not match before any other alternatives
