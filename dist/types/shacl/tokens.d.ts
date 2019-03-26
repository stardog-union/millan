import { TokenType } from 'chevrotain';
export declare const categoryTokenMap: {
    IriTakingPredicate: TokenType;
    NodeKindIRI: TokenType;
    IntTakingPredicate: TokenType;
    StringLiteralQuoteTakingPredicate: TokenType;
    BooleanTakingPredicate: TokenType;
    ShapeExpectingPredicate: TokenType;
};
export declare const categoryTokens: any[];
declare const localNamesByCategory: {
    IriTakingPredicate: ["class", "datatype", "equals", "disjoint", "lessThan", "lessThanOrEquals", "targetClass", "targetSubjectsOf", "targetObjectsOf", "severity"];
    NodeKindIRI: ["IRI", "BlankNode", "Literal", "BlankNodeOrIRI", "BlankNodeOrLiteral", "IRIOrLiteral"];
    IntTakingPredicate: ["minCount", "maxCount", "minExclusive", "minInclusive", "maxExclusive", "maxInclusive", "minLength", "maxLength", "qualifiedMinCount", "qualifiedMaxCount"];
    StringLiteralQuoteTakingPredicate: ["pattern", "flags", "prefix", "namespace"];
    BooleanTakingPredicate: ["uniqueLang", "qualifiedValueShapesDisjoint", "closed", "deactivated", "optional"];
    ShapeExpectingPredicate: ["not", "node", "property", "qualifiedValueShape", "sparql", "declare", "prefixes"];
    other: ["Shape", "NodeShape", "PropertyShape", "targetNode", "message", "path", "alternativePath", "inversePath", "zeroOrMorePath", "oneOrMorePath", "zeroOrOnePath", "nodeKind", "languageIn", "and", "or", "xone", "qualifiedValueShapesDisjoint", "ignoredProperties", "hasValue", "in", "select"];
};
declare type LocalName = {
    [K in keyof typeof localNamesByCategory]: typeof localNamesByCategory[K] extends (infer T)[] ? T : never;
}[keyof typeof localNamesByCategory];
declare type TokenMap = {
    [K in LocalName]: TokenType;
};
export declare const getShaclTokenMap: (shaclPrefix: string) => TokenMap;
export declare const getShaclTokenTypes: (shaclPrefix: string) => TokenType[];
export {};
