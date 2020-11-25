const { graphQlTokens } = require('./tokens');
import { BaseGraphQlParser } from './BaseGraphQlParser';

export class StandardGraphQlParser extends BaseGraphQlParser {
  constructor(options?) {
    super(options, graphQlTokens);
    this.performSelfAnalysis();
  }
}
