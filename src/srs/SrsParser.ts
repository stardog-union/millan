// tslint:disable:function-name
const { sparqlTokenMap } = require('../sparql/tokens');
const {
  srsTokenMap,
  srsTokenTypes,
  multiModeLexerDefinition,
} = require('./tokens');
import {
  Parser,
  Lexer,
  IToken,
  IRecognitionException,
  IParserConfig,
  CstElement,
  CstNode,
  CstVisitorConstructor,
} from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
import { W3SpecSparqlParser } from '../sparql/W3SpecSparqlParser';
import {
  isCstNode,
  unsafeTraverse,
  traverse,
  ITraverseContext,
} from '../helpers/cst';

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

// Returns a custom visitor that extends the BaseVisitor for the SRS parser.
// When the visitor encounters an SRS `IfClause` or an SRS `ThenClause`, it
// delegates parsing of the block to the existing SPARQL parser's relevant
// sub-rule (GroupGraphPattern or TriplesBlock).
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

    // Swap `AnythingButBraces` inside of the `IfClause` with the SPARQL CST
    // for `GroupGraphPattern`.
    IfClause(ctx: { [key: string]: IToken[] }) {
      const { AnythingButBraces } = ctx;

      if (
        !AnythingButBraces ||
        !AnythingButBraces[0] ||
        !AnythingButBraces[0].image
      ) {
        return;
      }

      this.groupGraphPatterns.push({
        parseResult: this.sparqlParser.parseGroupGraphPattern(
          `{ ${AnythingButBraces[0].image} }`
        ),
        originalToken: AnythingButBraces[0],
      });
    }

    // Swap `AnythingButBraces` inside of the `ThenClause` with the SPARQL CST
    // for `TriplesBlock`.
    ThenClause(ctx: { [key: string]: IToken[] }) {
      const { AnythingButBraces } = ctx;

      if (
        !AnythingButBraces ||
        !AnythingButBraces[0] ||
        !AnythingButBraces[0].image
      ) {
        return;
      }

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

// Tokens that are allowed in SPARQL but not inside the `IfClause` of SRS.
const disallowedSparqlTokenNameToRuleMap = {
  [sparqlTokenMap.EXISTS.tokenName]: 'ExistsFunction',
  [sparqlTokenMap.NOT_EXISTS.tokenName]: 'NotExistsFunction',
  [sparqlTokenMap.NOW.tokenName]: 'BuiltInCall_NOW',
};
const disallowedSparqlTokenNames = Object.keys(
  disallowedSparqlTokenNameToRuleMap
);

function _reduceVisitorItemErrors(
  acc: IRecognitionException[],
  item: SparqlSrsVisitorItem
) {
  return acc.concat(item.parseResult.errors);
}

// `AnythingButBraces` is a placeholder token for unparsed blocks of SPARQL
// inside of an SRS `IfClause` or `ThenClause`. This method swaps out those
// placeholders with the actual SPARQL CST created by the SparqlSrsVisitor.
function _findAndSwapAnythingButBraces(
  node: IToken,
  parentNode: CstNode,
  visitorItems: SparqlSrsVisitorItem[],
  key: string
) {
  const matchingVisitorItem = visitorItems.find(
    (visitorItem: SparqlSrsVisitorItem) => visitorItem.originalToken === node
  );

  if (matchingVisitorItem) {
    parentNode.children[key] = [matchingVisitorItem.parseResult.cst];
    delete parentNode.children.AnythingButBraces;
  }

  return matchingVisitorItem;
}

// Since the SRS parser delegates to the SPARQL parser inside of
// an SRS `IfClause`, and SPARQL allows certain constructs that SRS does not,
// we need to create our own errors for SRS-specific restrictions here.
function _addIfClauseErrorsToErrors(
  fullCtx: ITraverseContext,
  errors: IRecognitionException[],
  cst: CstElement
) {
  traverse(cst, (ctx, next) => {
    const { node, parentCtx } = ctx;

    if (isCstNode(node)) {
      return next();
    }

    if (
      !disallowedSparqlTokenNames.some(
        (tokenName) => tokenName === node.tokenType.tokenName
      )
    ) {
      return;
    }

    const ruleStack = [];
    let stackUnwindingPointer: CstNodeTraverseContext = parentCtx as CstNodeTraverseContext;

    // Walk back up the tree to construct the rule stack, starting from the
    // first rule that is allowed in SPARQL but not allowed in SRS.
    while (
      stackUnwindingPointer &&
      stackUnwindingPointer.node.name !==
        disallowedSparqlTokenNameToRuleMap[node.tokenType.tokenName]
    ) {
      stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
    }

    while (
      (stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext)
    ) {
      if (stackUnwindingPointer.node && stackUnwindingPointer.node.name) {
        ruleStack.unshift(stackUnwindingPointer.node.name);
      }
    }

    ruleStack.unshift('GroupGraphPattern');

    stackUnwindingPointer = fullCtx as CstNodeTraverseContext;

    while (stackUnwindingPointer) {
      if (stackUnwindingPointer.node && stackUnwindingPointer.node.name) {
        ruleStack.unshift(stackUnwindingPointer.node.name);
      }
      stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
    }

    const error: Pick<
      IRecognitionException,
      'message' | 'token' | 'context'
    > = {
      message: `Token ${
        node.tokenType.tokenName
      } cannot be used in Stardog Rules`,
      token: node,
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
  });
}

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
      srsTokenTypes,
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

    // To save resources while parsing, the sparqlSrsVisitor is a singleton.
    if (!this.sparqlSrsVisitor) {
      const BaseSrsVisitor = this.getBaseCstVisitorConstructorWithDefaults();
      this.sparqlSrsVisitor = getSparqlSrsVisitor(BaseSrsVisitor);
    } else {
      this.sparqlSrsVisitor.$resetState();
    }

    this.sparqlSrsVisitor.visit(cst);

    const groupGraphPatterns = this.sparqlSrsVisitor.$getGroupGraphPatterns();
    const triplesBlocks = this.sparqlSrsVisitor.$getTriplesBlocks();

    // Pull visitor errors
    const errors: IRecognitionException[] = [
      ...this.errors,
      ...groupGraphPatterns.reduce(_reduceVisitorItemErrors, []),
      ...triplesBlocks.reduce(_reduceVisitorItemErrors, []),
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
        const matchingVisitorItem = _findAndSwapAnythingButBraces(
          node,
          parentNode,
          groupGraphPatterns,
          'GroupGraphPattern'
        );

        if (matchingVisitorItem) {
          _addIfClauseErrorsToErrors(
            ctx,
            errors,
            matchingVisitorItem.parseResult.cst
          );
        }
      } else if (parentNode.name === 'ThenClause') {
        _findAndSwapAnythingButBraces(
          node,
          parentNode,
          triplesBlocks,
          'TriplesBlock'
        );
      }
    });

    return {
      errors,
      cst,
    };
  };
}
