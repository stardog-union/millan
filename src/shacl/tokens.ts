const { turtleTokenTypes, turtleTokenMap } = require('../turtle/tokens');
const { sparqlTokenMap } = require('../sparql/tokens');
import { TokenType, createToken, Lexer } from 'chevrotain';
import * as memoize from 'memoize-one';
import { getAsTypedTuple } from 'helpers/types';
import isDeepEqual from 'lodash.isequal';

const shaclIriNamespace = 'http://www.w3.org/ns/shacl#';
const xsdIriNamespace = 'http://www.w3.org/2001/XMLSchema#';

// Token categories, useful for making the parser rules simpler.
export const categoryTokenMap = {
  ManyIriTakingPredicate: createToken({
    name: 'ManyIriTakingPredicate',
    pattern: Lexer.NA,
  }),
  SingleIriTakingPredicate: createToken({
    name: 'SingleIriTakingPredicate',
    pattern: Lexer.NA,
  }),
  NodeKindIRI: createToken({
    name: 'NodeKindIRI',
    pattern: Lexer.NA,
  }),
  IntTakingPredicate: createToken({
    name: 'IntTakingPredicate',
    pattern: Lexer.NA,
  }),
  StringLiteralQuoteTakingPredicate: createToken({
    name: 'StringLiteralQuoteTakingPredicate',
    pattern: Lexer.NA,
  }),
  LangStringTakingPredicate: createToken({
    name: 'LangStringTakingPredicate',
    pattern: Lexer.NA,
  }),
  BooleanTakingPredicate: createToken({
    name: 'BooleanTakingPredicate',
    pattern: Lexer.NA,
  }),
  ShapeExpectingPredicate: createToken({
    name: 'ShapeExpectingPredicate',
    pattern: Lexer.NA,
  }),
  AnyLiteralTakingPredicate: createToken({
    name: 'AnyLiteralTakingPredicate',
    pattern: Lexer.NA,
  }),
};

export const categoryTokens = Object.keys(categoryTokenMap).map(
  (key) => categoryTokenMap[key]
);

const localNamesByCategory = {
  ManyIriTakingPredicate: getAsTypedTuple(
    'equals',
    'disjoint',
    'lessThan',
    'lessThanOrEquals',
    'targetClass',
    'targetSubjectsOf',
    'targetObjectsOf'
  ),
  SingleIriTakingPredicate: getAsTypedTuple('class', 'datatype', 'severity'),
  NodeKindIRI: getAsTypedTuple(
    'IRI',
    'BlankNode',
    'Literal',
    'BlankNodeOrIRI',
    'BlankNodeOrLiteral',
    'IRIOrLiteral'
  ),
  IntTakingPredicate: getAsTypedTuple(
    'minCount',
    'maxCount',
    'minLength',
    'maxLength',
    'qualifiedMinCount',
    'qualifiedMaxCount'
  ),
  StringLiteralQuoteTakingPredicate: getAsTypedTuple(
    'pattern',
    'flags',
    'prefix',
    'namespace'
  ),
  LangStringTakingPredicate: getAsTypedTuple('message', 'labelTemplate'),
  BooleanTakingPredicate: getAsTypedTuple(
    'uniqueLang',
    'qualifiedValueShapesDisjoint',
    'closed',
    'deactivated',
    'optional'
  ),
  ShapeExpectingPredicate: getAsTypedTuple(
    'not',
    'node',
    'property',
    'qualifiedValueShape',
    'sparql',
    'declare',
    'prefixes',
    'parameter',
    'nodeValidator',
    'propertyValidator',
    'validator'
  ),
  AnyLiteralTakingPredicate: getAsTypedTuple(
    'minExclusive',
    'minInclusive',
    'maxExclusive',
    'maxInclusive'
  ),
  other: getAsTypedTuple(
    'Shape',
    'NodeShape',
    'PropertyShape',
    'targetNode',
    'message',
    'path',
    'alternativePath',
    'inversePath',
    'zeroOrMorePath',
    'oneOrMorePath',
    'zeroOrOnePath',
    'nodeKind',
    'languageIn',
    'and',
    'or',
    'xone',
    'ignoredProperties',
    'hasValue',
    'in',
    'select',
    'ask'
  ),
};

const xsdLocalNames = getAsTypedTuple(
  'boolean',
  'integer',
  'string',
  'date',
  'dateTime',
  'anyURI'
);

// Map of local names back to their categories, for easier lookup:
const localNameToCategoryMap = Object.keys(localNamesByCategory).reduce(
  (nameToCategoryMap, category) => {
    const categoryLocalNames = localNamesByCategory[category];
    categoryLocalNames.forEach(
      (localName) => (nameToCategoryMap[localName] = category)
    );
    return nameToCategoryMap;
  },
  {}
);

const localNames = Object.keys(localNameToCategoryMap);

// We can pre-compute all tokens for the `xsd` namespace except for those that
// include prefixes (since we don't know a priori what the prefix will be).
// For each XSD local name, we will create a "category" token that will
// ultimately be used as the single token encompassing either the full
// (un-prefixed) IRI or the prefixed name (i.e., `xsd:string). At this point,
// we create only the category token and the full (un-prefixed) IRI token; the
// prefixed token is created later (via `getShaclTokenTypes`) once we actually
// know what the `xsd` prefix is.
const xsdUnprefixedTokenMap = xsdLocalNames.reduce((tokenMap, localName) => {
  const tokenName = `SHACL_xsd_${localName}`; // category token name
  const iriTokenName = `${tokenName}_IRI`; // IRI token name
  // Category token that will ultimately select either an XSD IRI or an XSD PN_LOCAL:
  const iriOrPrefixCategoryToken = createToken({
    name: tokenName,
    pattern: Lexer.NA,
  });

  return {
    ...tokenMap,
    [tokenName]: iriOrPrefixCategoryToken,
    [iriTokenName]: createToken({
      name: iriTokenName,
      pattern: `<${xsdIriNamespace}${localName}`,
      categories: [iriOrPrefixCategoryToken, turtleTokenMap.IRIREF],
    }),
  };
}, {});

// We can also pre-compute all SHACL tokens except for those that include
// prefixes (again, since we don't know a priori what the SHACL prefix will be).
// This helps keep our parser quick. We do it in the same way that we did for
// XSD tokens, above -- we create a "category" token for each SHACL local name
// that will be used to match either the full (un-prefixed) IRI or the prefixed
// name (once we know what the SHACL prefix is).
const shaclUnprefixedTokenMap = localNames.reduce((tokenMap, localName) => {
  const category = localNameToCategoryMap[localName];
  const categoryToken = categoryTokenMap[category];
  const tokenName = `SHACL_${localName}`;
  const iriTokenName = `${tokenName}_IRI`;
  // Category token that will select either a SHACL IRI or a SHACL PN_LOCAL:
  const iriOrPrefixCategoryToken = createToken({
    name: tokenName,
    pattern: Lexer.NA,
    categories: categoryToken ? [categoryToken] : [],
  });

  return {
    ...tokenMap,
    [tokenName]: iriOrPrefixCategoryToken,
    [iriTokenName]: createToken({
      name: iriTokenName,
      pattern: `<${shaclIriNamespace}${localName}>`,
      categories: [iriOrPrefixCategoryToken, turtleTokenMap.IRIREF],
    }),
  };
}, xsdUnprefixedTokenMap);

const makePrefixer = (prefix: string) => (localName: string) =>
  `${prefix}:${localName}`;

type LocalName = {
  [K in keyof typeof localNamesByCategory]: typeof localNamesByCategory[K] extends (infer T)[]
    ? T
    : never
}[keyof typeof localNamesByCategory];

type TokenMap = { [K in LocalName]: TokenType };

// Retrieves the complete map of all SHACL/XSD tokens, given the SHACL and XSD
// prefixes. The map contains, for every local name, a token matching the full
// IRI, a token matching the prefixed local name, and a "category" token that
// matches both. The category token is useful for simplifying parser rules (not
// having to match every SHACL token as both a full IRI and a prefixed local
// name.)
// This function is called by the SHACL parser. It is memoized because the
// arguments are small and unlikely to change often, and the parser needs to be
// fast, so we should avoid re-computing.
export const getShaclTokenMap: (
  prefixes: { shacl: string; xsd: string }
) => TokenMap = memoize((prefixes: { shacl: string; xsd: string }) => {
  const prefixWithShacl = makePrefixer(prefixes.shacl);
  const prefixWithXsd = makePrefixer(prefixes.xsd);

  // Add the prefixed local names to the SHACL token map now that we know the
  // prefixes.
  const shaclTokenMap = localNames.reduce((tokenMap, localName) => {
    const tokenName = `SHACL_${localName}`;
    const prefixedTokenName = `${tokenName}_prefixed`;

    return {
      ...tokenMap,
      [prefixedTokenName]: createToken({
        name: prefixedTokenName,
        pattern: prefixWithShacl(localName),
        categories: [tokenMap[tokenName], turtleTokenMap.PNAME_LN],
      }),
    };
  }, shaclUnprefixedTokenMap);

  // Add the prefixed local names to the XSD token map now that we know the
  // prefixes.
  return xsdLocalNames.reduce((tokenMap, localName) => {
    const tokenName = `SHACL_xsd_${localName}`;
    const prefixedTokenName = `${tokenName}_prefixed`;

    return {
      ...tokenMap,
      [prefixedTokenName]: createToken({
        name: prefixedTokenName,
        pattern: `${prefixWithXsd(localName)}`,
        categories: [tokenMap[tokenName], turtleTokenMap.PNAME_LN],
      }),
    };
  }, shaclTokenMap);
}, isDeepEqual);

// Get the index of PNAME_NS and IRIREF so that we can re-use existing Turtle
// tokens but ensure that our special SHACL/XSD tokens are inserted at the
// right place (since order of tokens matters for chevrotain).
const pnameIndex = turtleTokenTypes.indexOf(sparqlTokenMap.PNAME_NS);
const iriIndex = turtleTokenTypes.indexOf(turtleTokenMap.IRIREF);

// tokenMap keys will need to be sorted in reverse order so that tokens with
// partial overlap are in the right order in the TokenType array.
const reverseSort = (a, b) => {
  // @ts-ignore: unused variable
  const [aIgnored, aName, ...aRemainder] = a.split('_');
  // @ts-ignore: unused variable
  const [bIgnored, bName, ...bRemainder] = b.split('_');
  // Grab the local name and lowercase it:
  const aSortString = (aName === 'xsd' ? aRemainder[0] : aName).toLowerCase();
  const bSortString = (bName === 'xsd' ? bRemainder[0] : bName).toLowerCase();

  if (aSortString === bSortString) {
    // If local names are identical, prefer the one without a suffix to those with suffixes.
    const aSuffix = aName === 'xsd' ? aRemainder[1] : aRemainder[0];
    const bSuffix = bName === 'xsd' ? bRemainder[1] : bRemainder[0];

    if (aSuffix && bSuffix) {
      return 0; // when both local names have suffixes, treat as lexicographically the same for sorting
    } else {
      return aSuffix ? 1 : -1;
    }
  } else {
    return aSortString < bSortString ? 1 : bSortString < aSortString ? -1 : 0;
  }
};

// Given SHACL and XSD prefixes, this method returns an array of Turtle +
// SHACL/XSD tokens, including tokens for prefixed local names, with the
// SHACL/XSD tokens inserted at the proper positions so that they are matched
// before the more generic Turtle tokens.
export const getShaclTokenTypes: (
  prefixes: { shacl: string; xsd: string }
) => TokenType[] = memoize((prefixes: { shacl: string; xsd: string }) => {
  const tokenMap = getShaclTokenMap(prefixes);
  const { pnameTokens, iriTokens } = Object.keys(tokenMap)
    .sort(reverseSort)
    .reduce(
      (accumulator, key) => {
        if (key.endsWith('_IRI')) {
          if (iriIndex < pnameIndex) {
            accumulator.iriTokens.push(tokenMap[key.slice(0, -4)]);
          }
          accumulator.iriTokens.push(tokenMap[key]);
        } else if (key.endsWith('_prefixed')) {
          if (pnameIndex < iriIndex) {
            accumulator.pnameTokens.push(tokenMap[key.slice(0, -9)]);
          }
          accumulator.pnameTokens.push(tokenMap[key]);
        }

        return accumulator;
      },
      { pnameTokens: [], iriTokens: [] }
    );

  if (pnameIndex < iriIndex) {
    return [
      ...turtleTokenTypes.slice(0, pnameIndex),
      ...categoryTokens,
      ...pnameTokens,
      ...turtleTokenTypes.slice(pnameIndex, iriIndex),
      ...iriTokens,
      ...turtleTokenTypes.slice(iriIndex),
    ];
  } else {
    return [
      ...turtleTokenTypes.slice(0, iriIndex),
      ...categoryTokens,
      ...iriTokens,
      ...turtleTokenTypes.slice(iriIndex, pnameIndex),
      ...pnameTokens,
      ...turtleTokenTypes.slice(pnameIndex),
    ];
  }
}, isDeepEqual);
