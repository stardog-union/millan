import { createToken, Lexer, ITokenConfig, TokenType } from 'chevrotain';
import { regex } from 'helpers/regex';
import { STRING_LITERAL_LONG2 } from 'helpers/matchers';

// Patterns:
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
const ON_PATTERN = /on/;

// Holder of tokens; tokens are generally added and created in order, below.
const graphQlTokens: TokenType[] = [];

// Utility used primarily for keywords, which should also be counted as
// matching the `Name` token and (except for special cases) the
// `EnumValueToken` and `FragmentName` tokens. Ensures the created token has
// those other tokens as categories, and ensures that `Name` will be matched
// correctly for tokens that start with keyword characters but have additional
// characters. Adds the created token to the `graphQlTokens` array.
const createAndPushTokenWithNameAlt = (config: ITokenConfig) => {
  const categories = [Name];

  if (config.pattern !== BOOLEAN_PATTERN && config.pattern !== NULL_PATTERN) {
    categories.push(EnumValueToken);
  }

  if (config.pattern !== ON_PATTERN) {
    categories.push(FragmentName);
  }

  return createAndPushToken({
    name: config.name,
    pattern: config.pattern,
    longer_alt: Name,
    categories,
  });
};

const createAndPushPunctuator = (config: ITokenConfig) =>
  createAndPushToken({
    ...config,
    categories: [Punctuator],
  });

// Simple wrapper for `createToken` that also pushes the created token into
// `graphQlTokens` at the time of creation, since order matters.
const createAndPushToken = (config: ITokenConfig) => {
  const token = createToken(config);
  graphQlTokens.push(token);
  return token;
};

// Category tokens need to be created first, so they can be referenced by other
// tokens. They are _not_ yet added to the `graphQlTokens` array so that they
// do not match before various more specific keywords.
const Name = createToken({ name: 'Name', pattern: NAME_PATTERN });
// `EnumValueToken` and `FragmentName` are purely abstract categories that will
// be matched for all `Name` tokens _except_ the special tokens specified in
// the GraphQL grammar. See `createAndPushTokenWithNameAlt` for details.
const EnumValueToken = createToken({
  name: 'EnumValueToken',
  pattern: Lexer.NA, // pure category, no explicit match of its own
});
const FragmentName = createToken({
  name: 'FragmentName',
  pattern: Lexer.NA,
});
// `StringValueToken` will match either BlockStrings or Strings.
const StringValueToken = createToken({
  name: 'StringValueToken',
  pattern: Lexer.NA,
});
const Punctuator = createToken({
  name: 'Punctuator',
  pattern: Lexer.NA,
});

// Generally, anything that matches `Name` should match `EnumValueToken` and
// `FragmentName`. NOTE, however that `On` will not match `FragmentName` and
// `BooleanValueToken` and `NullValueToken` will not match `EnumValueToken`, in
// accordance with the official grammar; this is handled by the fact that the
// `On`, `BooleanValueToken`, and `FragmentName` tokens are defined and pushed
// into the tokens array earlier than `Name`. Given
// `createAndPushTokenWithNameAlt`, the latter tokens will also be treated as
// `Name` tokens, but will NOT be treated as instances of the relevant
// `EnumValueToken` or `FragmentName`. That's exactly what we want.
Name.CATEGORIES.push(EnumValueToken, FragmentName);

const ignoredTokens = {
  WhiteSpace: createAndPushToken({
    name: 'WhiteSpace',
    pattern: /[ \t]+/,
    group: Lexer.SKIPPED,
  }),
  UnicodeBOM: createAndPushToken({
    name: 'UnicodeBOM',
    pattern: '\\uFFFE',
    group: Lexer.SKIPPED,
  }),
  LineTerminator: createAndPushToken({
    name: 'LineTerminator',
    pattern: /\n\r|\r|\n/,
    group: Lexer.SKIPPED,
  }),
  Comment: createAndPushToken({
    name: 'Comment',
    pattern: /#[^\n\r]*/,
    group: Lexer.SKIPPED,
  }),
  Comma: createAndPushToken({
    name: 'Comma',
    pattern: ',',
    group: Lexer.SKIPPED,
  }),
};

const punctuators = {
  Bang: createAndPushPunctuator({ name: 'Bang', pattern: '!' }),
  Dollar: createAndPushPunctuator({ name: 'Dollar', pattern: '$' }),
  LParen: createAndPushPunctuator({ name: 'LParen', pattern: '(' }),
  RParen: createAndPushPunctuator({ name: 'RParen', pattern: ')' }),
  Spread: createAndPushPunctuator({ name: 'Spread', pattern: '...' }),
  Colon: createAndPushPunctuator({ name: 'Colon', pattern: ':' }),
  Equals: createAndPushPunctuator({ name: 'Equals', pattern: '=' }),
  At: createAndPushPunctuator({ name: 'At', pattern: '@' }),
  LBracket: createAndPushPunctuator({ name: 'LBracket', pattern: '[' }),
  RBracket: createAndPushPunctuator({ name: 'RBracket', pattern: ']' }),
  LCurly: createAndPushPunctuator({ name: 'LCurly', pattern: '{' }),
  RCurly: createAndPushPunctuator({ name: 'RCurly', pattern: '}' }),
  Pipe: createAndPushPunctuator({ name: 'Pipe', pattern: '|' }),
  Amp: createAndPushPunctuator({ name: 'Amp', pattern: '&' }), // not listed in the spec as a punctuator, for some reason
  Punctuator,
};

const nonKeywordTerminals = {
  FloatValueToken: createAndPushToken({
    name: 'FloatValueToken',
    pattern: regex.and(
      INTEGER_PART_PATTERN,
      regex.or(
        regex.and(/\.[0-9]+/, regex.option(EXPONENT_PART_PATTERN)),
        EXPONENT_PART_PATTERN
      )
    ),
  }),
  IntValueToken: createAndPushToken({
    name: 'IntValueToken',
    pattern: INTEGER_PART_PATTERN,
  }),
  BlockStringToken: createAndPushToken({
    name: 'BlockStringToken',
    pattern: STRING_LITERAL_LONG2,
    categories: [StringValueToken],
  }),
  StringToken: createAndPushToken({
    name: 'StringToken',
    pattern: STRING_CHARACTER_PATTERN,
    categories: [StringValueToken],
  }),
  BooleanValueToken: createAndPushTokenWithNameAlt({
    name: 'BooleanValueToken',
    pattern: BOOLEAN_PATTERN,
  }),
  NullValueToken: createAndPushTokenWithNameAlt({
    name: 'NullValueToken',
    pattern: NULL_PATTERN,
  }),
  EnumValueToken,
  FragmentName,
  Name,
  StringValueToken,
};

const keywords = {
  Query: createAndPushTokenWithNameAlt({
    name: 'Query',
    pattern: 'query',
  }),
  Mutation: createAndPushTokenWithNameAlt({
    name: 'Mutation',
    pattern: 'mutation',
  }),
  Subscription: createAndPushTokenWithNameAlt({
    name: 'Subscription',
    pattern: 'subscription',
  }),
  Fragment: createAndPushTokenWithNameAlt({
    name: 'Fragment',
    pattern: 'fragment',
  }),
  On: createAndPushTokenWithNameAlt({
    name: 'On',
    pattern: ON_PATTERN,
  }),
  Schema: createAndPushTokenWithNameAlt({
    name: 'Schema',
    pattern: 'schema',
  }),
  Extend: createAndPushTokenWithNameAlt({
    name: 'Extend',
    pattern: 'extend',
  }),
  Scalar: createAndPushTokenWithNameAlt({
    name: 'Scalar',
    pattern: 'scalar',
  }),
  TypeToken: createAndPushTokenWithNameAlt({
    name: 'TypeToken',
    pattern: 'type',
  }),
  Implements: createAndPushTokenWithNameAlt({
    name: 'Implements',
    pattern: 'implements',
  }),
  Interface: createAndPushTokenWithNameAlt({
    name: 'Interface',
    pattern: 'interface',
  }),
  Union: createAndPushTokenWithNameAlt({
    name: 'Union',
    pattern: 'union',
  }),
  Enum: createAndPushTokenWithNameAlt({
    name: 'Enum',
    pattern: 'enum',
  }),
  Input: createAndPushTokenWithNameAlt({
    name: 'Input',
    pattern: 'input',
  }),
  DirectiveToken: createAndPushTokenWithNameAlt({
    name: 'DirectiveToken',
    pattern: 'directive',
  }),
  QUERY: createAndPushTokenWithNameAlt({ name: 'QUERY', pattern: 'QUERY' }),
  MUTATION: createAndPushTokenWithNameAlt({
    name: 'MUTATION',
    pattern: 'MUTATION',
  }),
  SUBSCRIPTION: createAndPushTokenWithNameAlt({
    name: 'SUBSCRIPTION',
    pattern: 'SUBSCRIPTION',
  }),
  FRAGMENT_DEFINITION: createAndPushTokenWithNameAlt({
    name: 'FRAGMENT_DEFINITION',
    pattern: 'FRAGMENT_DEFINITION',
  }),
  FRAGMENT_SPREAD: createAndPushTokenWithNameAlt({
    name: 'FRAGMENT_SPREAD',
    pattern: 'FRAGMENT_SPREAD',
  }),
  INLINE_FRAGMENT: createAndPushTokenWithNameAlt({
    name: 'INLINE_FRAGMENT',
    pattern: 'INLINE_FRAGMENT',
  }),
  SCHEMA: createAndPushTokenWithNameAlt({ name: 'SCHEMA', pattern: 'SCHEMA' }),
  SCALAR: createAndPushTokenWithNameAlt({ name: 'SCALAR', pattern: 'SCALAR' }),
  OBJECT: createAndPushTokenWithNameAlt({ name: 'OBJECT', pattern: 'OBJECT' }),
  FIELD_DEFINITION: createAndPushTokenWithNameAlt({
    name: 'FIELD_DEFINITION',
    pattern: 'FIELD_DEFINITION',
  }),
  FIELD: createAndPushTokenWithNameAlt({ name: 'FIELD', pattern: 'FIELD' }),
  ARGUMENT_DEFINITION: createAndPushTokenWithNameAlt({
    name: 'ARGUMENT_DEFINITION',
    pattern: 'ARGUMENT_DEFINITION',
  }),
  INTERFACE: createAndPushTokenWithNameAlt({
    name: 'INTERFACE',
    pattern: 'INTERFACE',
  }),
  UNION: createAndPushTokenWithNameAlt({ name: 'UNION', pattern: 'UNION' }),
  ENUM_VALUE: createAndPushTokenWithNameAlt({
    name: 'ENUM_VALUE',
    pattern: 'ENUM_VALUE',
  }),
  ENUM: createAndPushTokenWithNameAlt({ name: 'ENUM', pattern: 'ENUM' }),
  INPUT_OBJECT: createAndPushTokenWithNameAlt({
    name: 'INPUT_OBJECT',
    pattern: 'INPUT_OBJECT',
  }),
  INPUT_FIELD_DEFINITION: createAndPushTokenWithNameAlt({
    name: 'INPUT_FIELD_DEFINITION',
    pattern: 'INPUT_FIELD_DEFINITION',
  }),
};

const graphQlTokenMap = {
  ...ignoredTokens,
  ...punctuators,
  ...nonKeywordTerminals,
  ...keywords,
  Name,
};

interface StardogDirectiveHolder {
  tokenMap: {
    OptionalDirectiveToken: TokenType;
    BindDirectiveToken: TokenType;
    HideDirectiveToken: TokenType;
    SkipDirectiveToken: TokenType;
    IncludeDirectiveToken: TokenType;
    FilterDirectiveToken: TokenType;
    PrefixDirectiveToken: TokenType;
    ConfigDirectiveToken: TokenType;
  };
  orderedTokens: TokenType[];
}

interface StardogArgumentHolder {
  tokenMap: {
    OrderByArgumentToken: TokenType;
    FirstArgumentToken: TokenType;
    ToArgumentToken: TokenType;
    IfArgumentToken: TokenType;
    AliasArgumentToken: TokenType;
    GraphArgumentToken: TokenType;
    OffsetArgumentToken: TokenType;
    LimitArgumentToken: TokenType;
    IriArgumentToken: TokenType;
  };
  orderedTokens: TokenType[];
}

const stardogDirectives = [
  'optional',
  'bind',
  'hide',
  'skip',
  'include',
  'filter',
  'prefix',
  'config',
]
  .sort()
  .reduce(
    (accumulator, name) => {
      const key = `${name[0].toUpperCase()}${name.slice(1)}DirectiveToken`;
      const token = createToken({
        name: key,
        pattern: name,
        categories: [Name, EnumValueToken, FragmentName],
        longer_alt: Name,
      });

      return {
        ...accumulator,
        tokenMap: {
          ...accumulator.tokenMap,
          [key]: token,
        },
        orderedTokens: accumulator.orderedTokens.concat(token),
      };
    },
    { tokenMap: {}, orderedTokens: [] } as StardogDirectiveHolder
  );

const stardogArguments = [
  'orderBy',
  'first',
  'to',
  'if',
  'alias',
  'graph',
  'offset',
  'limit',
  'iri',
]
  .sort()
  .reduce(
    (accumulator, name) => {
      const key = `${name[0].toUpperCase()}${name.slice(1)}ArgumentToken`;
      const token = createToken({
        name: key,
        pattern: name,
        categories: [Name, EnumValueToken, FragmentName],
        longer_alt: Name,
      });

      return {
        ...accumulator,
        tokenMap: {
          ...accumulator.tokenMap,
          [key]: token,
        },
        orderedTokens: accumulator.orderedTokens.concat(token),
      };
    },
    { tokenMap: {}, orderedTokens: [] } as StardogArgumentHolder
  );

// These two tokens aren't really arguments or directives; instead, they're
// fields of objects that can be passed as the stardog `orderBy` argument.
const stardogOrderByArgumentFieldPropertyToken = createToken({
  name: 'OrderByArgumentFieldPropertyToken',
  pattern: 'field',
  categories: [Name, EnumValueToken, FragmentName],
  longer_alt: Name,
});
const stardogOrderByArgumentDescPropertyToken = createToken({
  name: 'OrderByArgumentDescPropertyToken',
  pattern: 'desc',
  categories: [Name, EnumValueToken, FragmentName],
  longer_alt: Name,
});

const stardogGraphQlTokenMap = {
  ...graphQlTokenMap,
  ...stardogDirectives.tokenMap,
  ...stardogArguments.tokenMap,
  OrderByArgumentFieldPropertyToken: stardogOrderByArgumentFieldPropertyToken,
  OrderByArgumentDescPropertyToken: stardogOrderByArgumentDescPropertyToken,
};

const stardogGraphQlTokens = [
  ...graphQlTokens,
  ...stardogDirectives.orderedTokens,
  ...stardogArguments.orderedTokens,
  stardogOrderByArgumentFieldPropertyToken,
  stardogOrderByArgumentDescPropertyToken,
];

// Add shared category and catch-all tokens.
const finalTokens = [
  FragmentName,
  EnumValueToken,
  Name,
  StringValueToken,
  Punctuator,
];
graphQlTokens.push(...finalTokens);
stardogGraphQlTokens.push(...finalTokens);

export {
  graphQlTokenMap,
  graphQlTokens,
  stardogGraphQlTokenMap,
  stardogGraphQlTokens,
};
