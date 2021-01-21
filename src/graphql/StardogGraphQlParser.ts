const { stardogGraphQlTokens } = require('./tokens');
import { BaseGraphQlParser } from './BaseGraphQlParser';
import { Parser, IRecognitionException } from 'chevrotain';
import { getStardogGraphQlVisitor } from 'graphql/StardogGraphQlVisitor';

export class StardogGraphQlParser extends BaseGraphQlParser {
  private stardogGraphQlVisitor;

  constructor(options = {} as any) {
    super(
      {
        ...options,
        config: {
          ...options.config,
          nodeLocationTracking: 'full',
        },
      },
      stardogGraphQlTokens
    );
    Parser.performSelfAnalysis(this);
  }

  private visitCst = (cst: any) => {
    // To save resources while parsing, the visitor is a singleton.
    if (!this.stardogGraphQlVisitor) {
      const BaseStardogGraphQlVisitor = this.getBaseCstVisitorConstructorWithDefaults();
      this.stardogGraphQlVisitor = getStardogGraphQlVisitor(
        BaseStardogGraphQlVisitor,
        this
      );
    } else {
      this.stardogGraphQlVisitor.$resetState();
    }

    return this.stardogGraphQlVisitor.visit(cst, this.input);
  };

  public parse = (document: string, entryRule = this.Document) => {
    this.input = this.tokenize(document);
    const cst = entryRule.call(this);
    const { sparqlErrors, stardogGraphQlErrors } = this.visitCst(cst);
    const graphQlErrors: IRecognitionException[] = this.errors;

    return {
      errors: [...graphQlErrors, ...stardogGraphQlErrors, ...sparqlErrors],
      cst,
    };
  };
}
