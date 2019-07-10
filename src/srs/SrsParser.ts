import { sparqlTokenMap } from '../sparql/tokens';
import { srsTokenMap, srsTokenTypes, multiModeLexerDefinition } from './tokens';
import {
  Parser,
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
  CstNode,
} from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
import { isCstNode, unsafeTraverse } from '../helpers/cst';
import { defaultNamespacesMap } from 'turtle/defaultNamespaces';
import {
  getSparqlSrsVisitor,
  reduceVisitorItemErrors,
  findAndSwapPlaceholders,
} from './visitor';
import {
  addThenClauseErrorsToErrors,
  addIfClauseErrorsToErrors,
} from './customErrors';

export class SrsParser extends TurtleParser {
  private sparqlSrsVisitor: ReturnType<typeof getSparqlSrsVisitor>;
  protected lexer: Lexer;
  protected baseNamespacesMap = Object.freeze({
    ...defaultNamespacesMap,
  });
  protected namespacesMap: { [key: string]: boolean } = {};

  constructor(config?: Partial<IParserConfig>) {
    super(
      {
        outputCst: true,
        recoveryEnabled: true,
        ...config,
      },
      srsTokenTypes,
      multiModeLexerDefinition,
      false
    );

    this.lexer = new Lexer(multiModeLexerDefinition);

    Parser.performSelfAnalysis(this);
  }

  private visitCst = (cst: any) => {
    // To save resources while parsing, the sparqlSrsVisitor is a singleton.
    if (!this.sparqlSrsVisitor) {
      const BaseSrsVisitor = this.getBaseCstVisitorConstructorWithDefaults();
      this.sparqlSrsVisitor = getSparqlSrsVisitor(BaseSrsVisitor);
    } else {
      this.sparqlSrsVisitor.$resetState();
    }

    this.sparqlSrsVisitor.visit(cst, this.input);
  };

  private getSparqlRulesFromVisitor = (cst: any) => {
    this.visitCst(cst);

    return {
      groupGraphPatterns: this.sparqlSrsVisitor.$getGroupGraphPatterns(),
      triplesBlocks: this.sparqlSrsVisitor.$getTriplesBlocks(),
    };
  };

  protected resetManagedState = () => {
    this.namespacesMap = {
      ...defaultNamespacesMap,
    };
    this.semanticErrors = [];
  };

  public setBaseNamespaces = (newBaseNamespaces: {
    [key: string]: boolean;
  }) => {
    this.baseNamespacesMap = {
      ...newBaseNamespaces,
    };
  };

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string): ReturnType<TurtleParser['parse']> => {
    this.resetManagedState();
    this.input = this.lexer.tokenize(document).tokens;

    const cst = this.SrsDoc();
    const {
      groupGraphPatterns,
      triplesBlocks,
    } = this.getSparqlRulesFromVisitor(cst);
    // Pull visitor errors
    const errors: IRecognitionException[] = [
      ...this.errors,
      ...groupGraphPatterns.reduce(reduceVisitorItemErrors, []),
      ...triplesBlocks.reduce(reduceVisitorItemErrors, []),
    ];
    const semanticErrors: IRecognitionException[] = [...this.semanticErrors];

    // Replace placeholder CST nodes created by the SRS parser with CST nodes
    // returned by the visitor sub-parsers.
    unsafeTraverse(cst, (ctx, next) => {
      const { node, parentCtx } = ctx;

      if (isCstNode(node)) {
        return next();
      }

      const currentTokenName = node.tokenType.tokenName;

      if (
        currentTokenName !== 'GroupGraphPattern' &&
        currentTokenName !== 'TriplesBlock'
      ) {
        return;
      }
      const parentNode = parentCtx.node as CstNode;

      // The SRS parser parses only Turtle and SRS-specific content (RULE, IF,
      // THEN), and creates placeholder tokens for the blocks where SPARQL is
      // valid. The SparqlSrsVisitor visits these nodes and delegates their
      // parsing to a SPARQL parser. Here, we replace the placeholder nodes
      // (`GroupGraphPattern` and `TriplesBlock`) with the real ones from the
      // SPARQL parser, collecting some custom SRS-specific errors along the
      // way.
      if (parentNode.name === 'IfClause') {
        const matchingVisitorItem = findAndSwapPlaceholders(
          node,
          parentNode,
          groupGraphPatterns,
          'GroupGraphPattern'
        );

        if (matchingVisitorItem) {
          addIfClauseErrorsToErrors({
            fullCtx: ctx,
            namespacesMap: {
              ...this.baseNamespacesMap,
              ...this.namespacesMap,
            },
            cst: matchingVisitorItem.parseResult.cst,
            errors,
            semanticErrors,
          });
        }
      } else if (parentNode.name === 'ThenClause') {
        const matchingVisitorItem = findAndSwapPlaceholders(
          node,
          parentNode,
          triplesBlocks,
          'TriplesBlock'
        );

        if (matchingVisitorItem) {
          addThenClauseErrorsToErrors({
            fullCtx: ctx,
            namespacesMap: {
              ...this.baseNamespacesMap,
              ...this.namespacesMap,
            },
            cst: matchingVisitorItem.parseResult.cst,
            errors,
            semanticErrors,
          });
        }
      }
    });

    return {
      semanticErrors,
      errors,
      cst,
    };
  };

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
    this.CONSUME(srsTokenMap.GroupGraphPattern);
  });

  ThenClause = this.RULE('ThenClause', () => {
    this.CONSUME(srsTokenMap.Then);
    this.CONSUME(sparqlTokenMap.LCurly);
    this.CONSUME(srsTokenMap.TriplesBlock);
    this.CONSUME(srsTokenMap.EndThen);
  });
}
