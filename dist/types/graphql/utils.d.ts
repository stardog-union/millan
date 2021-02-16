import { CstChildrenDictionary, CstNode, IToken, TokenType } from 'chevrotain';
declare function getArgumentTokenTypesForDirectiveNameToken(directiveNameToken: IToken): TokenType[];
declare function getArgumentNodes(argumentDictionary: CstChildrenDictionary): CstNode[];
declare function isSparqlReceivingStardogDirective(directiveToken: IToken): boolean;
export declare const graphQlUtils: {
    getArgumentNodes: typeof getArgumentNodes;
    getArgumentTokenTypesForDirectiveNameToken: typeof getArgumentTokenTypesForDirectiveNameToken;
    isSparqlReceivingStardogDirective: typeof isSparqlReceivingStardogDirective;
};
export {};
