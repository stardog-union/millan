const { turtleTokenTypes } = require('../turtle/tokens');
import { TokenType } from 'chevrotain';
import { turtleTokenMap } from 'turtle/tokens';
import { sparqlTokenMap } from 'sparql/tokens';

export const trigTokenMap = {
  LCurly: sparqlTokenMap.LCurly,
  RCurly: sparqlTokenMap.RCurly,
  GRAPH: sparqlTokenMap.GRAPH,
  ...turtleTokenMap,
};

export const trigTokenTypes: TokenType[] = [
  sparqlTokenMap.LCurly,
  sparqlTokenMap.RCurly,
  sparqlTokenMap.GRAPH,
  ...turtleTokenTypes,
];
