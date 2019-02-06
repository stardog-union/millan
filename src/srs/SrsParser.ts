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

    // Get and store the SPARQL `GroupGraphPattern` that should replace the
    // SRS placeholder `GroupGraphPattern` token inside of an SRS `IfClause`.
    IfClause = (ctx: { [key: string]: IToken[] }, cstInputTokens: IToken[]) => {
      const { GroupGraphPattern } = ctx;
      this.$storePlaceholderTokenReplacement({
        tokenStore: this.groupGraphPatterns,
        originalTokenContext: GroupGraphPattern,
        subParserRule: this.sparqlParser.parseGroupGraphPattern.bind(
          this.sparqlParser
        ),
        cstInputTokens,
      });
    };

    // Get and store the SPARQL `TriplesBlock` that should replace the
    // SRS placeholder `TriplesBlock` token inside of an SRS `ThenClause`.
    ThenClause = (
      ctx: { [key: string]: IToken[] },
      cstInputTokens: IToken[]
    ) => {
      const { TriplesBlock } = ctx;
      this.$storePlaceholderTokenReplacement({
        tokenStore: this.triplesBlocks,
        originalTokenContext: TriplesBlock,
        subParserRule: this.sparqlParser.parseTriplesBlock.bind(
          this.sparqlParser
        ),
        cstInputTokens,
      });
    };

    // Utility methods ('$' prefix is necessary to prevent chevrotain's
    // `validateVisitor` method from complaining that these are not grammar
    // rules):
    private $storePlaceholderTokenReplacement = ({
      tokenStore,
      originalTokenContext = [],
      subParserRule,
      cstInputTokens,
      stripWrappers,
    }: {
      tokenStore: SparqlSrsVisitorItem[];
      originalTokenContext: IToken[];
      subParserRule: (
        document: string
      ) => { errors: IRecognitionException[]; cst: any };
      cstInputTokens: IToken[];
      stripWrappers?: boolean;
    }) => {
      const [originalToken] = originalTokenContext;

      if (!originalToken || typeof originalToken.image !== 'string') {
        return;
      }

      const replacement = this.$getPlaceholderTokenReplacement(
        originalToken,
        subParserRule,
        cstInputTokens,
        stripWrappers
      );

      tokenStore.push({
        parseResult: replacement,
        originalToken,
      });
    };

    private $getPlaceholderTokenReplacement = (
      originalToken: IToken,
      subParserRule: (
        document: string
      ) => { errors: IRecognitionException[]; cst: any },
      cstInputTokens: IToken[],
      stripWrappers = false
    ) => {
      // Because we are replacing tokens by delegating the parsing of parts
      // of the original document to sub-parsers, we add some empty padding to
      // the part that is passed to the sub-parser, where the amount of padding
      // matches the start line and offset of the token we are replacing. This
      // ensures that all tokens have the right positions in the resulting CST
      // (otherwise, the sub-parsers assume that the text starts at offset 0).
      const { image } = originalToken;
      let frontPadding = '';
      let latestEndOffset = 0;
      let latestEndLine = 0;

      // Traditional `for` loop because we need to `break`.
      for (let i = 0; i < cstInputTokens.length; i++) {
        const token = cstInputTokens[i];

        if (i > 0) {
          // Account for whitespace between this token and the previous one.
          const linesBetweenTokens = token.startLine - latestEndLine;
          const untokenizedSpaceBetweenTokens =
            token.startOffset - 1 - latestEndOffset - linesBetweenTokens;

          if (linesBetweenTokens > 0) {
            frontPadding += '\n'.repeat(linesBetweenTokens - 1);
            frontPadding +=
              ' '.repeat(Math.max(untokenizedSpaceBetweenTokens, 0)) + '\n';
          } else {
            frontPadding += ' '.repeat(
              Math.max(untokenizedSpaceBetweenTokens, 0)
            );
          }
        }

        if (token === originalToken) {
          break;
        }

        // We haven't hit the token we're replacing yet, so we need to continue
        // accumulating padding by adding the newlines _inside_ the current
        // token, and replacing all non-newline characters inside the current
        // token with spaces.
        const newlinesInToken = token.image.split('\n');
        newlinesInToken.forEach((line, idx) => {
          if (idx > 0) {
            frontPadding += '\n';
          }
          frontPadding += ' '.repeat(line.length);
        });

        // Track where the current token ends, in case the next token starts
        // much later (meaning that there was untokenized stuff (e.g.,
        // whitespace) in between) that needs to be accounted for.
        latestEndOffset = token.endOffset;
        latestEndLine = token.endLine;
      }

      // Finally, if we're stripping the wrappers (e.g., braces), replace them
      // with whitespace.
      const parseImage = stripWrappers ? ` ${image.slice(1, -1)} ` : image;
      return subParserRule(`${frontPadding}${parseImage}`);
    };

    $getGroupGraphPatterns = () => this.groupGraphPatterns;

    $getTriplesBlocks = () => this.triplesBlocks;

    $resetState = () => {
      this.groupGraphPatterns = [];
      this.triplesBlocks = [];
    };
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

// The SRS cst contains placeholder tokens for unparsed blocks of SPARQL
// inside of an SRS `IfClause` or `ThenClause`. This method swaps out those
// placeholders with the actual SPARQL CST created by the SparqlSrsVisitor.
function _findAndSwapPlacholders(
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
  // check for empty GroupGraphPatternSub
  const groupGraphPatternNode = isCstNode(cst) && cst;
  const groupGraphPatternSubNode =
    groupGraphPatternNode &&
    groupGraphPatternNode.children.GroupGraphPatternSub &&
    groupGraphPatternNode.children.GroupGraphPatternSub[0];
  const lCurlyToken =
    groupGraphPatternNode &&
    groupGraphPatternNode.children.LCurly &&
    groupGraphPatternNode.children.LCurly[0];

  if (
    isCstNode(groupGraphPatternSubNode) &&
    !Object.keys(groupGraphPatternSubNode.children).length &&
    !isCstNode(lCurlyToken)
  ) {
    const ruleStack = [];
    let stackUnwindingPointer: CstNodeTraverseContext = fullCtx as CstNodeTraverseContext;

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
      message: 'IFClause cannot be empty.',
      token: lCurlyToken,
      context: {
        ruleStack: ['SrsDoc', ...ruleStack],
        ruleOccurrenceStack: [],
      },
    };
    errors.push(error as IRecognitionException);
    return;
  }

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
      } cannot be used in Stardog Rules.`,
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
  private sparqlSrsVisitor: ReturnType<typeof getSparqlSrsVisitor>;
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
    this.CONSUME(srsTokenMap.GroupGraphPattern);
  });

  ThenClause = this.RULE('ThenClause', () => {
    this.CONSUME(srsTokenMap.Then);
    this.CONSUME(sparqlTokenMap.LCurly);
    this.CONSUME(srsTokenMap.TriplesBlock);
    this.CONSUME(srsTokenMap.EndThen);
  });

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string): ReturnType<TurtleParser['parse']> => {
    this.resetManagedState();
    this.input = this.lexer.tokenize(document).tokens;
    const cst = this.SrsDoc();

    // To save resources while parsing, the sparqlSrsVisitor is a singleton.
    if (!this.sparqlSrsVisitor) {
      const BaseSrsVisitor = this.getBaseCstVisitorConstructorWithDefaults();
      this.sparqlSrsVisitor = getSparqlSrsVisitor(BaseSrsVisitor);
    } else {
      this.sparqlSrsVisitor.$resetState();
    }

    this.sparqlSrsVisitor.visit(cst, this.input);

    const groupGraphPatterns = this.sparqlSrsVisitor.$getGroupGraphPatterns();
    const triplesBlocks = this.sparqlSrsVisitor.$getTriplesBlocks();

    // Pull visitor errors
    const errors: IRecognitionException[] = [
      ...this.errors,
      ...groupGraphPatterns.reduce(_reduceVisitorItemErrors, []),
      ...triplesBlocks.reduce(_reduceVisitorItemErrors, []),
    ];

    // Replace `Placeholder` cst nodes with cst nodes returned by sub-parsers.
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

      if (parentNode.name === 'IfClause') {
        const matchingVisitorItem = _findAndSwapPlacholders(
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
        _findAndSwapPlacholders(
          node,
          parentNode,
          triplesBlocks,
          'TriplesBlock'
        );
      }
    });

    return {
      semanticErrors: [...this.semanticErrors], // copy so that it can be held onto after state is reset
      errors,
      cst,
    };
  };
}
