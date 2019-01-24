import {
  Parser,
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
} from 'chevrotain';
import { multiModeLexerDefinition, srsTokenMap } from './tokens';
import { getRules as getTurtleRules } from 'turtle/TurtleParser';
import { getRules as getSparqlRules } from 'sparql/BaseSparqlParser';
import lodashUniqby from 'lodash.uniqby';
import { sparqlTokenMap } from 'sparql/tokens';

const allTokens = lodashUniqby(
  Object.keys(multiModeLexerDefinition.modes).reduce(
    (tokens, modeKey) => tokens.concat(multiModeLexerDefinition.modes[modeKey]),
    []
  ),
  (x) => x
);

const getRules = (context) => ({
  ...getTurtleRules(context),
  ...getSparqlRules(context),
  SrsDoc: context.RULE('SrsDoc', () => {
    context.SUBRULE(context.turtleDoc);
    context.MANY(() => {
      context.SUBRULE(context.RuleDoc);
      context.MANY(() => {
        context.SUBRULE(context.triples);
        context.CONSUME(sparqlTokenMap.Period);
      });
    });
  }),

  RuleDoc: context.RULE('RuleDoc', () => {
    context.OPTION(() => context.SUBRULE(context.RuleClause));
    context.SUBRULE(context.IfClause);
    context.SUBRULE(context.ThenClause);
  }),

  RuleClause: context.RULE('RuleClause', () => {
    context.CONSUME(srsTokenMap.Rule);
    context.SUBRULE(context.iri);
  }),

  IfClause: context.RULE('IfClause', () => {
    context.CONSUME(srsTokenMap.If);
    context.SUBRULE(context.GroupGraphPattern);
  }),

  ThenClause: context.RULE('ThenClause', () => {
    context.CONSUME(srsTokenMap.Then);
    context.SUBRULE(context.TriplesBlock);
  }),
});

export class SrsParser extends Parser {
  private lexer: Lexer;

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string) => {
    this.input = this.lexer.tokenize(document).tokens;
    // @ts-ignore
    const cst = this.SrsDoc();
    const errors: IRecognitionException[] = this.errors;
    return {
      errors,
      cst,
    };
  };

  constructor(config?: Partial<IParserConfig>) {
    super([], allTokens, {
      outputCst: true,
      recoveryEnabled: true,
      ...config,
    });

    const rules = getRules(this);
    Object.keys(rules).forEach((ruleKey) => (this[ruleKey] = rules[ruleKey]));

    Parser.performSelfAnalysis(this);
  }
}
