import { BaseSparqlParser, baseTokens } from '.';
import { Parser } from 'chevrotain';

export class W3SpecSparqlParser extends BaseSparqlParser {
  constructor(options?) {
    super(options, baseTokens);
    Parser.performSelfAnalysis(this);
  }
}
