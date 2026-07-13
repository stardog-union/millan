const { baseTokens } = require('./tokens');
import { BaseSparqlParser } from './BaseSparqlParser';

export class W3SpecSparqlParser extends BaseSparqlParser {
  constructor(options?) {
    super(options, baseTokens);
    this.performSelfAnalysis();
  }
}
