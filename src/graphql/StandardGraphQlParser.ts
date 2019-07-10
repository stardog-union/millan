import { graphQlTokens } from './tokens';
import { BaseGraphQlParser } from './BaseGraphQlParser';
import { Parser } from 'chevrotain';

export class StandardGraphQlParser extends BaseGraphQlParser {
  constructor(options?) {
    super(options, graphQlTokens);
    Parser.performSelfAnalysis(this);
  }
}
