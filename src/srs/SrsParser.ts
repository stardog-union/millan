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
import { defaultNamespacesMap } from 'turtle/defaultNamespaces';

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

const defaultEarlyExitTest = () => false;

// Returns a custom visitor that extends the BaseVisitor for the SRS parser.
// When the visitor encounters an SRS `IfClause` or an SRS `ThenClause`, it
// delegates parsing of the block to the existing SPARQL parser's relevant
// sub-rule (GroupGraphPattern or TriplesBlock).
const getSparqlSrsVisitor = (BaseVisitor: CstVisitorConstructor) => {
  class SparqlSrsVisitor extends BaseVisitor<any, any> {
    private sparqlParser: W3SpecSparqlParser;
    private groupGraphPatterns: SparqlSrsVisitorItem[] = [];
    private triplesBlocks: SparqlSrsVisitorItem[] = [];
    private usedPrefixes: { [prefix: string]: IToken } = {};

    constructor() {
      super();
      this.sparqlParser = new W3SpecSparqlParser();
      this.validateVisitor();
    }

    // Get and store the SPARQL `GroupGraphPattern` that should replace the
    // SRS placeholder `GroupGraphPattern` token inside of an SRS `IfClause`.
    IfClause = (ctx: { [key: string]: IToken[] }, cstInputTokens: IToken[]) => {
      const { GroupGraphPattern } = ctx;
      const srsVisitorItem = this.$storePlaceholderTokenReplacement({
        tokenStore: this.groupGraphPatterns,
        originalTokenContext: GroupGraphPattern,
        subParserRule: this.sparqlParser.parseGroupGraphPattern.bind(
          this.sparqlParser
        ),
        cstInputTokens,
      });

      if (srsVisitorItem) {
        // Store the found prefixed names within this GGP.
        this.$storePrefix(srsVisitorItem.parseResult.cst);
      }
    };

    // Get and store the SPARQL `TriplesBlock` that should replace the
    // SRS placeholder `TriplesBlock` token inside of an SRS `ThenClause`.
    ThenClause = (
      ctx: { [key: string]: IToken[] },
      cstInputTokens: IToken[]
    ) => {
      const { TriplesBlock } = ctx;
      const srsVisitorItem = this.$storePlaceholderTokenReplacement({
        tokenStore: this.triplesBlocks,
        originalTokenContext: TriplesBlock,
        subParserRule: this.sparqlParser.parseTriplesBlock.bind(
          this.sparqlParser
        ),
        cstInputTokens,
      });

      if (srsVisitorItem) {
        // Store the found prefixed names within this TriplesBlock.
        this.$storePrefix(srsVisitorItem.parseResult.cst);
      }
    };

    // Utility methods ('$' prefix is necessary to prevent chevrotain's
    // `validateVisitor` method from complaining that these are not grammar
    // rules):
    private $storePrefix = (cst) => {
      traverse(cst, (ctx, next) => {
        const { node } = ctx;

        if (isCstNode(node)) {
          return next();
        }

        const { tokenName } = node.tokenType;

        if (tokenName === 'PNAME_NS' || tokenName === 'PNAME_LN') {
          const prefix = node.image.split(':').shift();
          this.usedPrefixes[prefix] = node;
        }
      });
    };

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
      const srsVisitorItem = {
        parseResult: replacement,
        originalToken,
      };

      tokenStore.push(srsVisitorItem);
      return srsVisitorItem;
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

    $getUsedPrefixes = () => this.usedPrefixes;

    $resetState = () => {
      this.groupGraphPatterns = [];
      this.triplesBlocks = [];
      this.usedPrefixes = {};
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

const disallowedSparqlLiteralTokenNames = [
  sparqlTokenMap.DOUBLE,
  sparqlTokenMap.DECIMAL,
  sparqlTokenMap.INTEGER,
  sparqlTokenMap.DOUBLE_POSITIVE,
  sparqlTokenMap.DECIMAL_POSITIVE,
  sparqlTokenMap.INTEGER_POSITIVE,
  sparqlTokenMap.DOUBLE_NEGATIVE,
  sparqlTokenMap.DECIMAL_NEGATIVE,
  sparqlTokenMap.INTEGER_NEGATIVE,
  sparqlTokenMap.STRING_LITERAL1,
  sparqlTokenMap.STRING_LITERAL2,
  sparqlTokenMap.STRING_LITERAL_LONG1,
  sparqlTokenMap.STRING_LITERAL_LONG2,
].map((token) => token.tokenName);

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

// Walk back up the tree to construct the rule stack, starting from the
// first rule that is allowed in SPARQL but not allowed in SRS.
function _getCustomErrorRuleStack(
  traverseCtx: CstNodeTraverseContext,
  fullCtx: ITraverseContext,
  startRuleNames: string[],
  topLevelSubParserRuleName?: string,
  earlyExitTest: Function = defaultEarlyExitTest
) {
  const ruleStack = [];

  if (!traverseCtx) {
    return ruleStack; // early exit
  }

  let stackUnwindingPointer = traverseCtx;

  // Move up from current context to the first rule that should "start" the stack.
  while (
    stackUnwindingPointer &&
    isCstNode(stackUnwindingPointer.node) &&
    !startRuleNames.includes(stackUnwindingPointer.node.name)
  ) {
    if (earlyExitTest(stackUnwindingPointer)) {
      return [];
    }
    stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
  }

  // Now start adding all found rules to the stack as we move upward.
  while (
    (stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext) &&
    isCstNode(stackUnwindingPointer.node)
  ) {
    ruleStack.unshift(stackUnwindingPointer.node.name);
    if (earlyExitTest(stackUnwindingPointer)) {
      return [];
    }
  }

  // If the rule stack of the sub-parser doesn't get all the way up to the
  // relevant top-level rule, this will force the top-level rule to be put onto
  // the stack before proceeding.
  if (typeof topLevelSubParserRuleName === 'string') {
    ruleStack.unshift(topLevelSubParserRuleName);
  }

  // Now that we've got the sub-parser's rule stack, we trace the remaining
  // outer parser's stack to get to the true bottom of the stack.
  stackUnwindingPointer = fullCtx as CstNodeTraverseContext;

  while (stackUnwindingPointer) {
    if (isCstNode(stackUnwindingPointer.node)) {
      ruleStack.unshift(stackUnwindingPointer.node.name);
      if (earlyExitTest(stackUnwindingPointer)) {
        return [];
      }
    }
    stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
  }

  return ['SrsDoc', ...ruleStack];
}

function _getNoPrefixError(
  node: IToken,
  parentCtx: CstNodeTraverseContext,
  fullCtx: ITraverseContext,
  subParserRuleName: string
) {
  return {
    name: 'NoNamespacePrefixError',
    message: 'A prefix was used for which there was no namespace defined.',
    token: node,
    context: {
      ruleStack: _getCustomErrorRuleStack(
        parentCtx,
        fullCtx,
        ['PrefixedName'],
        subParserRuleName
      ),
      // `ruleOccurrenceStack` is meaningless to us as it just
      // records the number used when the chevrotain rule is
      // created (e.g., SUBRULE1 vs SUBRULE2); we can't know that
      // or care about that here
      ruleOccurrenceStack: [],
    },
    resyncedTokens: [], // these don't really make sense for semantic errors, since they don't cause the parser to resync
  };
}

function _getDisallowedTokenError(
  node: IToken,
  parentCtx: CstNodeTraverseContext,
  fullCtx: ITraverseContext
) {
  return {
    name: 'DisallowedTokenError',
    message: `Token ${
      node.tokenType.tokenName
    } cannot be used in Stardog Rules.`,
    token: node,
    context: {
      ruleStack: _getCustomErrorRuleStack(
        parentCtx,
        fullCtx,
        [disallowedSparqlTokenNameToRuleMap[node.tokenType.tokenName]],
        'GroupGraphPattern'
      ),
      // `ruleOccurrenceStack` is meaningless to us as it just
      // records the number used when the chevrotain rule is
      // created (e.g., SUBRULE1 vs SUBRULE2); we can't know that
      // or care about that here
      ruleOccurrenceStack: [],
    },
    resyncedTokens: [], // these don't really make sense for semantic errors, since they don't cause the parser to resync
  };
}

function _getDisallowedLiteralError(
  node: IToken,
  parentCtx: CstNodeTraverseContext,
  fullCtx: ITraverseContext,
  subParserRuleName: string
) {
  let foundPropertyListPathNotEmptyCtx = null;
  const errorRuleStack = _getCustomErrorRuleStack(
    parentCtx,
    fullCtx,
    ['Expression', 'TriplesBlock'],
    subParserRuleName,
    (stackCtx: CstNodeTraverseContext) => {
      if (stackCtx.node.name === 'PropertyListPathNotEmpty') {
        foundPropertyListPathNotEmptyCtx = stackCtx;
        return false;
      }

      const { node, parentCtx } = stackCtx;
      const isExpression = node.name === 'Expression';
      const isTriplesBlock = node.name === 'TriplesBlock';

      if (!isExpression && !isTriplesBlock) {
        return false;
      }

      const isBoundExpression =
        isExpression && (<CstNode>parentCtx.node).name === 'Bind';
      const isTriplesBlockSubject =
        isTriplesBlock &&
        (!foundPropertyListPathNotEmptyCtx ||
          (<CstNode>foundPropertyListPathNotEmptyCtx.parentCtx.node).name !==
            'TriplesSameSubjectPath');

      if (isBoundExpression || isTriplesBlockSubject) {
        return false;
      }

      // We got to the Expression or TriplesBlock containing the literal, but
      // the literal wasn't in the subject position (i.e., was not the lead
      // Expression inside of Bind and was not the subject of
      // TriplesSameSubjectPath), so we can bail early here.
      return true;
    }
  );

  if (errorRuleStack.length === 0) {
    return;
  }

  return {
    name: 'DisallowedLiteralError',
    message: 'Literals cannot be used as subjects in Stardog Rules.',
    token: node,
    context: {
      ruleStack: errorRuleStack,
      // `ruleOccurrenceStack` is meaningless to us as it just
      // records the number used when the chevrotain rule is
      // created (e.g., SUBRULE1 vs SUBRULE2); we can't know that
      // or care about that here
      ruleOccurrenceStack: [],
    },
    resyncedTokens: [], // these don't really make sense for semantic errors, since they don't cause the parser to resync
  };
}

// Since the SRS parser delegates to the SPARQL parser inside of
// an SRS `IfClause`, and SPARQL allows certain constructs that SRS does not,
// we need to create our own errors for SRS-specific restrictions here.
function _addIfClauseErrorsToErrors({
  cst,
  namespacesMap,
  fullCtx,
  errors,
  semanticErrors,
}: {
  cst: CstElement;
  namespacesMap: TurtleParser['namespacesMap'];
  fullCtx: ITraverseContext;
  errors: IRecognitionException[];
  semanticErrors: IRecognitionException[];
}) {
  traverse(cst, (ctx, next) => {
    const { node, parentCtx } = ctx;

    if (isCstNode(node)) {
      return next();
    }

    const { tokenName } = node.tokenType;

    if (disallowedSparqlTokenNames.some((name) => name === tokenName)) {
      errors.push(_getDisallowedTokenError(
        node,
        parentCtx as CstNodeTraverseContext,
        fullCtx
      ) as IRecognitionException);
    }

    if (
      disallowedSparqlLiteralTokenNames.some(
        (tokenName) => tokenName === node.tokenType.tokenName
      )
    ) {
      const error = _getDisallowedLiteralError(
        node,
        parentCtx as CstNodeTraverseContext,
        fullCtx,
        'GroupGraphPattern'
      );

      if (error) {
        semanticErrors.push(error as IRecognitionException);
      }
    }

    if (tokenName === 'PNAME_NS' || tokenName === 'PNAME_LN') {
      const prefix = node.image.split(':').shift();

      if (!namespacesMap[prefix]) {
        semanticErrors.push(
          _getNoPrefixError(
            node,
            parentCtx as CstNodeTraverseContext,
            fullCtx,
            'GroupGraphPattern'
          )
        );
      }
    }
  });

  return {
    errors,
    semanticErrors,
  };
}

function _addThenClauseErrorsToErrors({
  cst,
  namespacesMap,
  semanticErrors,
  fullCtx,
}: {
  semanticErrors: IRecognitionException[];
  fullCtx: ITraverseContext;
  namespacesMap: TurtleParser['namespacesMap'];
  cst: CstElement;
}) {
  traverse(cst, (ctx, next) => {
    const { node, parentCtx } = ctx;

    if (isCstNode(node)) {
      return next();
    }

    const { tokenName } = node.tokenType;

    if (
      disallowedSparqlLiteralTokenNames.some(
        (tokenName) => tokenName === node.tokenType.tokenName
      )
    ) {
      const error = _getDisallowedLiteralError(
        node,
        parentCtx as CstNodeTraverseContext,
        fullCtx,
        'GroupGraphPattern'
      );

      if (error) {
        semanticErrors.push(error as IRecognitionException);
      }
    }

    if (tokenName === 'PNAME_NS' || tokenName === 'PNAME_LN') {
      const prefix = node.image.split(':').shift();

      if (!namespacesMap[prefix]) {
        semanticErrors.push(
          _getNoPrefixError(
            node,
            parentCtx as CstNodeTraverseContext,
            fullCtx,
            'TriplesBlock'
          )
        );
      }
    }
  });

  return {
    semanticErrors,
  };
}

export class SrsParser extends TurtleParser {
  private sparqlSrsVisitor: ReturnType<typeof getSparqlSrsVisitor>;
  protected lexer: Lexer;
  protected namespacesMap = {
    ...defaultNamespacesMap,
  };

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

  protected resetManagedState = () => {
    this.namespacesMap = {
      ...defaultNamespacesMap,
    };
    this.semanticErrors = [];
  };

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
    const semanticErrors: IRecognitionException[] = [...this.semanticErrors];

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
          _addIfClauseErrorsToErrors({
            fullCtx: ctx,
            namespacesMap: this.namespacesMap,
            cst: matchingVisitorItem.parseResult.cst,
            errors,
            semanticErrors,
          });
        }
      } else if (parentNode.name === 'ThenClause') {
        const matchingVisitorItem = _findAndSwapPlacholders(
          node,
          parentNode,
          triplesBlocks,
          'TriplesBlock'
        );

        if (matchingVisitorItem) {
          _addThenClauseErrorsToErrors({
            fullCtx: ctx,
            namespacesMap: this.namespacesMap,
            cst: matchingVisitorItem.parseResult.cst,
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
}
