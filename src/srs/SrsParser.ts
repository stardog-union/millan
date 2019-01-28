// tslint:disable:function-name
import {
  Parser,
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
  CstNode,
  CstVisitorConstructor,
} from 'chevrotain';
import { srsTokenMap, srsTokens, multiModeLexerDefinition } from './tokens';
import { TurtleParser } from 'turtle/TurtleParser';
import { sparqlTokenMap } from 'sparql/tokens';
import { W3SpecSparqlParser } from 'sparql/W3SpecSparqlParser';
import {
  isCstNode,
  unsafeTraverse,
  traverse,
  ITraverseContext,
} from 'helpers/cst';

interface SparqlSrsVisitorItem {
  parseResult: {
    errors: IRecognitionException[];
    cst: any;
  };
  originalToken: IToken;
}

type CstNodeTraverseContext = ITraverseContext & {
  node: CstNode;
};

const getSparqlSrsVisitor = (BaseVisitor: CstVisitorConstructor) => {
  class SparqlSrsVisitor extends BaseVisitor<any, any> {
    private sparqlParser: W3SpecSparqlParser;
    private groupGraphPatterns: SparqlSrsVisitorItem[] = [];
    private triplesBlocks: SparqlSrsVisitorItem[] = [];

    constructor() {
      super();
      this.sparqlParser = new W3SpecSparqlParser();
      this.validateVisitor();
    }

    IfClause(ctx: { [key: string]: IToken[] }) {
      const { AnythingButBraces } = ctx;
      this.groupGraphPatterns.push({
        parseResult: this.sparqlParser.parseGroupGraphPattern(
          `{ ${AnythingButBraces[0].image} }`
        ),
        originalToken: AnythingButBraces[0],
      });
    }

    ThenClause(ctx: { [key: string]: IToken[] }) {
      const { AnythingButBraces } = ctx;
      this.triplesBlocks.push({
        parseResult: this.sparqlParser.parseTriplesBlock(
          AnythingButBraces[0].image
        ),
        originalToken: AnythingButBraces[0],
      });
    }

    // Utility methods:
    $getGroupGraphPatterns() {
      return this.groupGraphPatterns;
    }

    $getTriplesBlocks() {
      return this.triplesBlocks;
    }

    $resetState() {
      this.groupGraphPatterns = [];
      this.triplesBlocks = [];
    }
  }

  return new SparqlSrsVisitor();
};

const disallowedSparqlTokenNameToRuleMap = {
  [sparqlTokenMap.EXISTS.tokenName]: 'ExistsFunction',
  [sparqlTokenMap.NOT_EXISTS.tokenName]: 'NotExistsFunction',
  [sparqlTokenMap.NOW.tokenName]: 'BuiltInCall_NOW',
};
const disallowedSparqlTokenNames = Object.keys(
  disallowedSparqlTokenNameToRuleMap
);

export class SrsParser extends TurtleParser {
  private sparqlSrsVisitor;
  protected lexer: Lexer;

  constructor(config?: Partial<IParserConfig>) {
    super(
      {
        outputCst: true,
        recoveryEnabled: true,
        ...config,
      },
      srsTokens,
      multiModeLexerDefinition,
      false
    );

    this.lexer = new Lexer(multiModeLexerDefinition);

    Parser.performSelfAnalysis(this);
  }

  SrsDoc = this.RULE('SrsDoc', () => {
    this.SUBRULE(this.turtleDoc);
    this.MANY(() => {
      this.SUBRULE(this.RuleDoc);
      this.MANY1(() => {
        this.SUBRULE(this.triples);
        this.CONSUME(sparqlTokenMap.Period);
      });
    });
  });

  RuleDoc = this.RULE('RuleDoc', () => {
    this.OPTION(() => this.SUBRULE(this.RuleClause));
    this.SUBRULE(this.IfClause);
    this.SUBRULE(this.ThenClause);
  });

  RuleClause = this.RULE('RuleClause', () => {
    this.CONSUME(srsTokenMap.Rule);
    this.SUBRULE(this.iri);
  });

  IfClause = this.RULE('IfClause', () => {
    this.CONSUME(srsTokenMap.If);
    this.CONSUME(srsTokenMap.AnythingButBraces);
    this.CONSUME(srsTokenMap.EndIf);
  });

  ThenClause = this.RULE('ThenClause', () => {
    this.CONSUME(srsTokenMap.Then);
    this.CONSUME(srsTokenMap.AnythingButBraces);
    this.CONSUME(srsTokenMap.EndThen);
  });

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string) => {
    this.input = this.lexer.tokenize(document).tokens;
    const cst = this.SrsDoc();

    if (!this.sparqlSrsVisitor) {
      const BaseSrsVisitor = this.getBaseCstVisitorConstructorWithDefaults();
      this.sparqlSrsVisitor = getSparqlSrsVisitor(BaseSrsVisitor);
    } else {
      this.sparqlSrsVisitor.$resetState();
    }

    this.sparqlSrsVisitor.visit(cst);

    const groupGraphPatterns = this.sparqlSrsVisitor.$getGroupGraphPatterns();
    const triplesBlocks = this.sparqlSrsVisitor.$getTriplesBlocks();
    const errors: IRecognitionException[] = [
      ...this.errors,
      ...groupGraphPatterns.reduce(
        (acc, item: SparqlSrsVisitorItem) =>
          acc.concat(item.parseResult.errors),
        []
      ),
      ...triplesBlocks.reduce(
        (acc, item: SparqlSrsVisitorItem) =>
          acc.concat(item.parseResult.errors),
        []
      ),
    ];

    // Replace `AnythingButBraces` cst nodes with cst nodes returned by
    // sub-parsers.
    unsafeTraverse(cst, (ctx, next) => {
      const { node, parentCtx } = ctx;

      if (isCstNode(node)) {
        return next();
      }

      const currentTokenName = node.tokenType.tokenName;

      if (currentTokenName !== 'AnythingButBraces') {
        return;
      }
      const parentNode = parentCtx.node as CstNode;

      if (parentNode.name === 'IfClause') {
        const matchingGroupGraphPattern = groupGraphPatterns.find(
          (ggp: SparqlSrsVisitorItem) => ggp.originalToken === node
        );
        if (matchingGroupGraphPattern) {
          parentNode.children.GroupGraphPattern = [
            matchingGroupGraphPattern.parseResult.cst,
          ];
          delete parentNode.children.AnythingButBraces;

          traverse(
            matchingGroupGraphPattern.parseResult.cst,
            (innerCtx, next) => {
              const { node: innerNode, parentCtx: innerParentCtx } = innerCtx;

              if (isCstNode(innerNode)) {
                return next();
              }

              if (
                disallowedSparqlTokenNames.some(
                  (tokenName) => tokenName === innerNode.tokenType.tokenName
                )
              ) {
                const ruleStack = [];
                let stackUnwindingPointer: CstNodeTraverseContext = innerParentCtx as CstNodeTraverseContext;

                while (
                  stackUnwindingPointer &&
                  stackUnwindingPointer.node.name !==
                    disallowedSparqlTokenNameToRuleMap[
                      innerNode.tokenType.tokenName
                    ]
                ) {
                  stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
                }

                while (
                  (stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext)
                ) {
                  if (
                    stackUnwindingPointer.node &&
                    stackUnwindingPointer.node.name
                  ) {
                    ruleStack.unshift(stackUnwindingPointer.node.name);
                  }
                }

                ruleStack.unshift('GroupGraphPattern');

                stackUnwindingPointer = ctx as CstNodeTraverseContext;

                while (stackUnwindingPointer) {
                  if (
                    stackUnwindingPointer.node &&
                    stackUnwindingPointer.node.name
                  ) {
                    ruleStack.unshift(stackUnwindingPointer.node.name);
                  }
                  stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
                }

                const error: Pick<
                  IRecognitionException,
                  'message' | 'token' | 'context'
                > = {
                  message: `Token ${
                    innerNode.tokenType.tokenName
                  } cannot be used in Stardog Rules`,
                  token: innerNode,
                  context: {
                    ruleStack: ['SrsDoc', ...ruleStack],
                    // `ruleOccurrenceStack` is meaningless to us as it just
                    // records the number used when the chevrotain rule is
                    // created (e.g., SUBRULE1 vs SUBRULE2); we can't know that
                    // or care about that here
                    ruleOccurrenceStack: [],
                  },
                };
                errors.push(error as IRecognitionException);
              }
            }
          );
        }
      } else if (parentNode.name === 'ThenClause') {
        const matchingTriplesBlock = triplesBlocks.find(
          (tb: SparqlSrsVisitorItem) => tb.originalToken === node
        );
        if (matchingTriplesBlock) {
          parentNode.children.TriplesBlock = [
            matchingTriplesBlock.parseResult.cst,
          ];
          delete parentNode.children.AnythingButBraces;
        }
      }
    });

    return {
      errors,
      cst,
    };
  };
}
