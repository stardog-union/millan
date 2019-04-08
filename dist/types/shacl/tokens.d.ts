import { TokenType } from 'chevrotain';
export declare const categoryTokenMap: {
    IriTakingPredicate: TokenType;
    NodeKindIRI: TokenType;
    IntTakingPredicate: TokenType;
    StringLiteralQuoteTakingPredicate: TokenType;
    LangStringTakingPredicate: TokenType;
    BooleanTakingPredicate: TokenType;
    ShapeExpectingPredicate: TokenType;
    AnyLiteralTakingPredicate: TokenType;
};
export declare const categoryTokens: any[];
declare const localNamesByCategory: {
    IriTakingPredicate: ["class", "datatype", "equals", "disjoint", "lessThan", "lessThanOrEquals", "targetClass", "targetSubjectsOf", "targetObjectsOf", "severity"];
    NodeKindIRI: ["IRI", "BlankNode", "Literal", "BlankNodeOrIRI", "BlankNodeOrLiteral", "IRIOrLiteral"];
    IntTakingPredicate: ["minCount", "maxCount", "minLength", "maxLength", "qualifiedMinCount", "qualifiedMaxCount"];
    StringLiteralQuoteTakingPredicate: ["pattern", "flags", "prefix", "namespace"];
    LangStringTakingPredicate: ["message", "labelTemplate"];
    BooleanTakingPredicate: ["uniqueLang", "qualifiedValueShapesDisjoint", "closed", "deactivated", "optional"];
    ShapeExpectingPredicate: ["not", "node", "property", "qualifiedValueShape", "sparql", "declare", "prefixes", "parameter", "nodeValidator", "propertyValidator", "validator"];
    AnyLiteralTakingPredicate: ["minExclusive", "minInclusive", "maxExclusive", "maxInclusive"];
    other: ["Shape", "NodeShape", "PropertyShape", "targetNode", "message", "path", "alternativePath", "inversePath", "zeroOrMorePath", "oneOrMorePath", "zeroOrOnePath", "nodeKind", "languageIn", "and", "or", "xone", "ignoredProperties", "hasValue", "in", "select", "ask"];
};
declare type LocalName = {
    [K in keyof typeof localNamesByCategory]: typeof localNamesByCategory[K] extends (infer T)[] ? T : never;
}[keyof typeof localNamesByCategory];
declare type TokenMap = {
    [K in LocalName]: TokenType;
};
export declare const getShaclTokenMap: (prefixes: {
    shacl: string;
    xsd: string;
}) => TokenMap;
export declare const getShaclTokenTypes: (prefixes: {
    shacl: string;
    xsd: string;
}) => TokenType[];
export {};
