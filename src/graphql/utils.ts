import {
  CstChildrenDictionary,
  CstNode,
  IToken,
  tokenMatcher,
  TokenType,
} from 'chevrotain';
import { isCstNode } from 'helpers/chevrotain/cst';
const { stardogGraphQlTokenMap } = require('./tokens');

const {
  ToArgumentToken,
  IfArgumentToken,
  AliasArgumentToken,
  GraphArgumentToken,
  BindDirectiveToken,
  ConfigDirectiveToken,
  SkipDirectiveToken,
  IncludeDirectiveToken,
  FilterDirectiveToken,
} = stardogGraphQlTokenMap as Record<string, TokenType>;

const conditionalDirectiveTokens = [
  SkipDirectiveToken,
  IncludeDirectiveToken,
  FilterDirectiveToken,
];

const sparqlReceivingStardogDirectiveTokens = [
  BindDirectiveToken,
  ...conditionalDirectiveTokens,
];

function getArgumentTokenTypesForDirectiveNameToken(
  directiveNameToken: IToken
): TokenType[] {
  if (tokenMatcher(directiveNameToken, BindDirectiveToken)) {
    return [ToArgumentToken];
  } else if (tokenMatcher(directiveNameToken, ConfigDirectiveToken)) {
    return [AliasArgumentToken, GraphArgumentToken];
  } else if (
    conditionalDirectiveTokens.some((tokenType) =>
      tokenMatcher(directiveNameToken, tokenType)
    )
  ) {
    return [IfArgumentToken];
  } else {
    return [];
  }
}

function getArgumentNodes(
  argumentDictionary: CstChildrenDictionary
): CstNode[] {
  if (!argumentDictionary || !argumentDictionary.Arguments) {
    return [];
  }

  const [argumentsNode] = argumentDictionary.Arguments;

  if (!isCstNode(argumentsNode)) {
    return [];
  }

  return (argumentsNode.children.Argument as CstNode[]) || []; // this should be an array of all 'Argument' nodes
}

function isSparqlReceivingStardogDirective(directiveToken: IToken) {
  return sparqlReceivingStardogDirectiveTokens.some((tokenType) =>
    tokenMatcher(directiveToken, tokenType)
  );
}

export const graphQlUtils = {
  getArgumentNodes,
  getArgumentTokenTypesForDirectiveNameToken,
  isSparqlReceivingStardogDirective,
};
