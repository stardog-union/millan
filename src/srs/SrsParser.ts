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
import { isCstNode, unsafeTraverse, traverse } from 'helpers/cst';

interface SparqlSrsVisitorItem {
  parseResult: {
    errors: IRecognitionException[];
    cst: any;
  };
  originalToken: IToken;
}

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

const disallowedSparqlTokens = [
  sparqlTokenMap.EXISTS,
  sparqlTokenMap.NOT_EXISTS,
  sparqlTokenMap.NOW,
];

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

          traverse(matchingGroupGraphPattern.parseResult.cst, (ctx, next) => {
            const { node, parentCtx } = ctx;

            if (isCstNode(node)) {
              return next();
            }

            if (
              disallowedSparqlTokens.some(
                (token) => token.tokenName === node.tokenType.tokenName
              )
            ) {
              const grandParentNode = parentCtx.parentCtx.node as CstNode;
              const error: Pick<
                IRecognitionException,
                'message' | 'token' | 'context'
              > = {
                message: `Token ${
                  node.tokenType.tokenName
                } cannot be used in Stardog Rules`,
                token: node,
                context: {
                  ruleStack: [
                    // @ts-ignore
                    parentCtx.parentCtx.parentCtx.node.name,
                    // @ts-ignore
                    grandParentNode.name,
                    // @ts-ignore
                    parentCtx.node.name,
                  ],
                  ruleOccurrenceStack: [],
                },
              };
              errors.push(error as IRecognitionException);
            }
          });
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
