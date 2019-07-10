import { baseTokens } from './tokens';
import { BaseSparqlParser } from './BaseSparqlParser';
import { Parser } from 'chevrotain';

export class W3SpecSparqlParser extends BaseSparqlParser {
  constructor(options?) {
    super(options, baseTokens);
    Parser.performSelfAnalysis(this);
  }
}
