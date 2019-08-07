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

const indexOfPnCharsBase = turtleTokenTypes.indexOf(
  turtleTokenMap.PN_CHARS_BASE
);
export const trigTokenTypes: TokenType[] = [
  sparqlTokenMap.LCurly,
  sparqlTokenMap.RCurly,
  ...turtleTokenTypes.slice(0, indexOfPnCharsBase),
  sparqlTokenMap.GRAPH,
  ...turtleTokenTypes.slice(indexOfPnCharsBase),
];
