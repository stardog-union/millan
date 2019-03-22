const { turtleTokenTypes, turtleTokenMap } = require('../turtle/tokens');
const { sparqlTokenMap } = require('../sparql/tokens');
import { TokenType, createToken, Lexer } from 'chevrotain';
import memoize from 'memoize-one';
import { getAsTypedTuple } from 'helpers/types';

const shaclIriNamespace = 'http://www.w3.org/ns/shacl#';

// token categories:
export const categoryTokenMap = {
  IriTakingPredicate: createToken({
    name: 'IriTakingPredicate',
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
  BooleanTakingPredicate: createToken({
    name: 'BooleanTakingPredicate',
    pattern: Lexer.NA,
  }),
  ShapeExpectingPredicate: createToken({
    name: 'ShapeExpectingPredicate',
    pattern: Lexer.NA,
  }),
};
export const categoryTokens = Object.keys(categoryTokenMap).map(
  (key) => categoryTokenMap[key]
);

const localNamesByCategory = {
  IriTakingPredicate: getAsTypedTuple(
    'class',
    'datatype',
    'equals',
    'disjoint',
    'lessThan',
    'lessThanOrEquals',
    'targetClass',
    'targetSubjectsOf',
    'targetObjectsOf',
    'severity'
  ),
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
    'minExclusive',
    'minInclusive',
    'maxExclusive',
    'maxInclusive',
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
    'prefixes'
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
    'qualifiedValueShapesDisjoint',
    'ignoredProperties',
    'hasValue',
    'in',
    'select'
  ),
};

// const listTakingLocalNames = [
//   'and',
//   'or',
//   'xone',
//   'ignoredProperties',
//   'in',
//   'languageIn',
//   'ask',
//   'select',
// ];
// const shapeExpectingLocalNames = [
//   'and',
//   'or',
//   'xone',
//   'not',
//   'node',
//   'property',
//   'sparql',
//   'qualifiedValueShape',
//   'declare',
//   'prefixes',
// ];
// const localNames = getAsTypedTuple(
//   'Shape',
//   'NodeShape',
//   'PropertyShape',
//   'targetNode',
//   'targetClass',
//   'targetSubjectsOf',
//   'targetObjectsOf',
//   'severity',
//   'property',
//   'message',
//   'deactivated',
//   'path',
//   'alternativePath',
//   'inversePath',
//   'zeroOrMorePath',
//   'class',
//   'datatype',
//   'nodeKind',
//   'minCount',
//   'maxCount',
//   'minExclusive',
//   'minInclusive',
//   'maxExclusive',
//   'maxInclusive',
//   'minLength',
//   'maxLength',
//   'pattern',
//   'flags',
//   'languageIn',
//   'uniqueLang',
//   'equals',
//   'disjoint',
//   'lessThan',
//   'lessThanOrEquals',
//   'not',
//   'and',
//   'or',
//   'xone',
//   'node',
//   'property',
//   'qualifiedValueShape',
//   'qualifiedValueShapesDisjoint',
//   'qualifiedMinCount',
//   'qualifiedMaxCount',
//   'closed',
//   'ignoredProperties',
//   'hasValue',
//   'in',
//   'sparql',
//   'select',
//   'declare',
//   'prefix',
//   'namespace',
//   'prefixes'
// );
const localNameCategories = Object.keys(localNamesByCategory);
const localNameToCategoryMap = localNameCategories.reduce(
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
const shaclUnprefixedTokenMap = localNames.reduce((tokenMap, localName) => {
  // These can be computed beforehand, so no need to constantly re-compute them
  // in the way that we re-compute prefixed SHACL tokens below. Saving this
  // compute time is important for parsing.
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
      categories: [iriOrPrefixCategoryToken],
    }),
  };
}, {});

const makePrefixer = (prefix: string) => (localName: string) =>
  `${prefix}:${localName}`;

type LocalName = {
  [K in keyof typeof localNamesByCategory]: typeof localNamesByCategory[K] extends (infer T)[]
    ? T
    : never
}[keyof typeof localNamesByCategory];
type TokenMap = { [K in LocalName]: TokenType };

export const getShaclTokenMap: (shaclPrefix: string) => TokenMap = memoize(
  (shaclPrefix: string) => {
    const prefix = makePrefixer(shaclPrefix);

    return localNames.reduce((tokenMap, localName) => {
      const tokenName = `SHACL_${localName}`;
      const prefixedTokenName = `${tokenName}_prefixed`;

      return {
        ...tokenMap,
        [prefixedTokenName]: createToken({
          name: prefixedTokenName,
          pattern: prefix(localName),
          categories: [tokenMap[tokenName]],
        }),
      };
    }, shaclUnprefixedTokenMap);
  }
);

const pnameIndex = turtleTokenTypes.indexOf(sparqlTokenMap.PNAME_NS);
const iriIndex = turtleTokenTypes.indexOf(turtleTokenMap.IRIREF);
// tokenMap keys will need to be sorted in reverse order so that tokens with
// partial overlap are in the right order in the TokenType array.
const reverseSort = (a, b) => {
  // @ts-ignore: unused variable
  const [aIgnore, aName, aRemainder] = a.split('_');
  // @ts-ignore: unused variable
  const [bIgnore, bName, bRemainder] = b.split('_');
  if (aName === bName) {
    if (aRemainder && bRemainder) {
      return 0; // treat as lexicographically the same for sorting
    }
    return aRemainder ? 1 : -1;
  }
  return aName < bName ? 1 : bName < aName ? -1 : 0;
};

export const getShaclTokenTypes: (shaclPrefix: string) => TokenType[] = memoize(
  (shaclPrefix: string) => {
    const tokenMap = getShaclTokenMap(shaclPrefix);
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
  }
);
