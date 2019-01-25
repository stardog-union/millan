// tslint:disable:function-name
import {
  Parser,
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
  CstNode,
} from 'chevrotain';
import { srsTokenMap, srsTokens, multiModeLexerDefinition } from './tokens';
import { TurtleParser } from 'turtle/TurtleParser';
import { sparqlTokenMap } from 'sparql/tokens';
import { W3SpecSparqlParser } from 'sparql/W3SpecSparqlParser';
import { traverse, isCstNode, unsafeTraverse } from 'helpers/cst';

interface SparqlSrsVisitorItem {
  parseResult: {
    errors: IRecognitionException[];
    cst: any;
  };
  originalStartOffset: number;
  token: IToken;
}

export class SrsParser extends TurtleParser {
  private sparqlSrsVisitor;
  protected lexer: Lexer;

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string) => {
    this.input = this.lexer.tokenize(document).tokens;
    const cst = this.SrsDoc();

    if (!this.sparqlSrsVisitor) {
      const BaseSrsVisitor = this.getBaseCstVisitorConstructorWithDefaults();

      class SparqlSrsVisitor extends BaseSrsVisitor {
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
            originalStartOffset: AnythingButBraces[0].startOffset,
            token: AnythingButBraces[0],
          });
        }

        ThenClause(ctx: { [key: string]: IToken[] }) {
          const { AnythingButBraces } = ctx;
          this.triplesBlocks.push({
            parseResult: this.sparqlParser.parseTriplesBlock(
              AnythingButBraces[0].image
            ),
            originalStartOffset: AnythingButBraces[0].startOffset,
            token: AnythingButBraces[0],
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

      this.sparqlSrsVisitor = new SparqlSrsVisitor();
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

    unsafeTraverse(cst, (ctx, next) => {
      const { node, parentCtx } = ctx;

      if (isCstNode(node)) {
        return next();
      }

      if (node.tokenType.tokenName !== 'AnythingButBraces') {
        return;
      }

      const parentNode = parentCtx.node as CstNode;

      if (parentNode.name === 'IfClause') {
        const matchingGroupGraphPattern = groupGraphPatterns.find(
          (ggp: SparqlSrsVisitorItem) => ggp.token === node
        );
        if (matchingGroupGraphPattern) {
          parentNode.children.GroupGraphPattern = [matchingGroupGraphPattern];
          delete parentNode.children.AnythingButBraces;
        }
      } else if (parentNode.name === 'ThenClause') {
        const matchingTriplesBlock = triplesBlocks.find(
          (tb: SparqlSrsVisitorItem) => tb.token === node
        );
        if (matchingTriplesBlock) {
          parentNode.children.TriplesBlock = [matchingTriplesBlock];
          delete parentNode.children.AnythingButBraces;
        }
      }
    });

    return {
      errors,
      cst,
    };
  };

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
}
