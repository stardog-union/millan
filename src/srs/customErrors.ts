import { ITraverseContext, isCstNode, traverse } from '../helpers/cst';
import { CstNode, IToken, CstElement, IRecognitionException } from 'chevrotain';
import { sparqlTokenMap } from '../sparql/tokens';
import { TurtleParser } from '../turtle/TurtleParser';

type CstNodeTraverseContext = ITraverseContext & {
  node: CstNode;
};

// RegEx for matching any relevant children of `Expression` inside of `Bind`;
// used to avoid false negatives in the check for disallowed literals inside of
// `Bind`.
const subExpressionMatcher = /(?:[A-Z]+Expression|ValueLogical)$/i;

// Default: just don't abort early at all. Used in the stack unwinding process
// that creates an error rule stack.
const defaultEarlyAbortTest = () => false;

// Tokens that are allowed in SPARQL but not inside the `IfClause` of SRS.
const disallowedSparqlTokenNameToRuleMap = {
  [sparqlTokenMap.EXISTS.tokenName]: 'ExistsFunction',
  [sparqlTokenMap.NOT_EXISTS.tokenName]: 'NotExistsFunction',
  [sparqlTokenMap.NOW.tokenName]: 'BuiltInCall_NOW',
};
const disallowedSparqlTokenNames = Object.keys(
  disallowedSparqlTokenNameToRuleMap
);

// Token names for literals; these are not allowed in the subject position of
// certain patterns in SRS.
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

// Helper functions for more "literate" code.
const isCstNodeTraverseContext = (ctx): ctx is CstNodeTraverseContext =>
  Boolean(ctx && ctx.node);
// Is the parent node an Expression child of a Bind node or an Expression
// child of an ExpressionOrEmbeddedTriplePattern node that is itself a child
// of a Bind node? The former accounts for standard SPARQL; the latter accounts
// for Stardog SPARQL with edge properties. This lets certain custom errors
// work with the output of either the W3CSpecSparqlParser or the
// StardogSparqlParser.
const isParentBindOrBoundExpressionOrEmbeddedTriplePattern = (parentCtx) => {
  if (!isCstNodeTraverseContext(parentCtx)) {
    return false;
  }

  const parentNodeName = parentCtx.node.name;
  return (
    parentNodeName === 'Bind' ||
    (parentNodeName === 'ExpressionOrEmbeddedTriplePattern' &&
      isCstNodeTraverseContext(parentCtx.parentCtx) &&
      parentCtx.parentCtx.node.name === 'Bind')
  );
};

// Walks back up the tree to construct the rule stack, first going upward
// through the provided `traverseCtx`, and then continuing up through the
// `fullCtx`. `traverseCtx` is intended to be the "inner" ITraverseContext
// representing the results of the SPARQL sub-parser used by the
// SparqlSrsVisitor. `fullCtx` is intended to be the "outer" ITraverseContext
// representing the results of the SRS parser itself. The SRS parser delegates
// blocks of SPARQL to a SPARQL sub-parser, so, by combinging the two contexts,
// we get the full parser stack. The traversal adds rules to the stack only
// once a rule matching one of the `startRuleNames` is hit.
//
// At the point where the traversal of `traverseCtx` ends and the traversal of
// `fullCtx` begins, you may need to insert a rule into the stack (e.g.,
// because the `traverseCtx` doesn't include the top-level rule for that
// parse). If so, use `topLevelSubParserRuleName`.
//
// In some cases, there is a need to track nodes and potentially bail out early
// at certain points while constructing the rule stack. For that, use
// `earlyAbortTest`. If that method returns true, the rule stack construction
// will abort.
function getCustomErrorRuleStack(
  traverseCtx: CstNodeTraverseContext,
  fullCtx: ITraverseContext,
  startRuleNames: string[],
  topLevelSubParserRuleName?: string,
  earlyAbortTest: Function = defaultEarlyAbortTest
) {
  if (!traverseCtx) {
    return []; // forced early exit
  }

  const ruleStack = [];
  let stackUnwindingPointer = traverseCtx;

  // Move up from current context to the first rule that should "start" the stack.
  while (
    isCstNode(stackUnwindingPointer.node) &&
    !startRuleNames.includes(stackUnwindingPointer.node.name)
  ) {
    if (earlyAbortTest(stackUnwindingPointer)) {
      return [];
    }
    stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
  }

  // Now start adding all found rules to the stack as we move upward.
  while (isCstNode(stackUnwindingPointer.node)) {
    ruleStack.unshift(stackUnwindingPointer.node.name);
    if (earlyAbortTest(stackUnwindingPointer)) {
      return [];
    }
    stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
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
      if (earlyAbortTest(stackUnwindingPointer)) {
        return [];
      }
    }
    stackUnwindingPointer = stackUnwindingPointer.parentCtx as CstNodeTraverseContext;
  }

  return ['SrsDoc', ...ruleStack];
}

const getCustomIRecognitionException = ({
  name,
  message,
  node,
  ruleStack,
}: {
  name: string;
  message: string;
  node: IToken;
  ruleStack: string[];
}) => ({
  name,
  message,
  token: node,
  context: {
    ruleStack,
    // `ruleOccurrenceStack` is meaningless to us as it just
    // records the number used when the chevrotain rule is
    // created (e.g., SUBRULE1 vs SUBRULE2); we can't know that
    // or care about that here
    ruleOccurrenceStack: [],
  },
  resyncedTokens: [], // these don't really make sense for semantic errors, since they don't cause the parser to resync
});

const getNoPrefixError = (
  node: IToken,
  parentCtx: CstNodeTraverseContext,
  fullCtx: ITraverseContext,
  subParserRuleName: string
) =>
  getCustomIRecognitionException({
    name: 'NoNamespacePrefixError',
    message: `A prefix ("${node.image}") was used for which there was no namespace defined.`,
    node,
    ruleStack: getCustomErrorRuleStack(
      parentCtx,
      fullCtx,
      ['PrefixedName'],
      subParserRuleName
    ),
  });

const getDisallowedTokenError = (
  node: IToken,
  parentCtx: CstNodeTraverseContext,
  fullCtx: ITraverseContext
) =>
  getCustomIRecognitionException({
    name: 'DisallowedTokenError',
    message: `Token ${node.tokenType.tokenName} cannot be used in Stardog Rules.`,
    node,
    ruleStack: getCustomErrorRuleStack(
      parentCtx,
      fullCtx,
      [disallowedSparqlTokenNameToRuleMap[node.tokenType.tokenName]],
      'GroupGraphPattern'
    ),
  });

const getDisallowedLiteralError = (
  node: IToken,
  parentCtx: CstNodeTraverseContext,
  fullCtx: ITraverseContext,
  subParserRuleName: string
) => {
  let foundPropertyListPathNotEmptyCtx = null;
  let didFindSubExpressionWithMultipleChildren = false;
  let errorContext = null;

  const errorRuleStack = getCustomErrorRuleStack(
    parentCtx,
    fullCtx,
    ['Expression', 'TriplesSameSubjectPath'],
    subParserRuleName,
    (stackCtx: CstNodeTraverseContext) => {
      const { node, parentCtx } = stackCtx;
      const nodeName = node.name;

      if (nodeName === 'PropertyListPathNotEmpty') {
        // Track the found `PropertyListPathNotEmmpty` node and keep going.
        foundPropertyListPathNotEmptyCtx = stackCtx;
        return false;
      }

      if (
        !didFindSubExpressionWithMultipleChildren &&
        subExpressionMatcher.test(nodeName)
      ) {
        // Track that we found a sub-expression with multiple children, then
        // keep going.
        didFindSubExpressionWithMultipleChildren =
          (<CstNode>parentCtx.node).children[nodeName].length > 1;
        return false;
      }

      const isExpression = nodeName === 'Expression';
      const isTriplesBlock = nodeName === 'TriplesSameSubjectPath';

      if (!isExpression && !isTriplesBlock) {
        return false;
      }

      const isBoundExpressionWithLiteralSubject =
        isExpression &&
        // If we've found a sub-expression with multiple children, it's highly
        // likely (maybe definite?) that this `Bind` does not include an invalid
        // literal as a subject, so we don't count this as an error. This _may_
        // allow rare false positives, but it definitely prevents false
        // negatives of the sort described in https://github.com/stardog-union/millan/issues/22
        !didFindSubExpressionWithMultipleChildren &&
        isParentBindOrBoundExpressionOrEmbeddedTriplePattern(parentCtx);
      const isTriplesBlockSubject =
        isTriplesBlock &&
        (!foundPropertyListPathNotEmptyCtx ||
          (<CstNode>foundPropertyListPathNotEmptyCtx.parentCtx.node).name !==
            'TriplesSameSubjectPath');

      if (isBoundExpressionWithLiteralSubject || isTriplesBlockSubject) {
        errorContext = isBoundExpressionWithLiteralSubject
          ? 'Bind'
          : 'TriplesBlock';
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

  return getCustomIRecognitionException({
    name: 'DisallowedLiteralError',
    message: `Token ${node.tokenType.tokenName} (${node.image}) cannot be used as a subject inside of a ${errorContext} in Stardog Rules Syntax.`,
    node,
    ruleStack: errorRuleStack,
  });
};

// Since the SRS parser delegates to the SPARQL parser inside of
// an SRS `IfClause`, and SPARQL allows certain constructs that SRS does not,
// we need to create our own errors for SRS-specific restrictions here.
export function addIfClauseErrorsToErrors({
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
      errors.push(
        getDisallowedTokenError(
          node,
          parentCtx as CstNodeTraverseContext,
          fullCtx
        ) as IRecognitionException
      );
    }

    if (
      disallowedSparqlLiteralTokenNames.some(
        (tokenName) => tokenName === node.tokenType.tokenName
      )
    ) {
      const error = getDisallowedLiteralError(
        node,
        parentCtx as CstNodeTraverseContext,
        fullCtx,
        'GroupGraphPattern'
      );

      if (error) {
        errors.push(error as IRecognitionException);
      }
    }

    if (tokenName === 'PNAME_NS' || tokenName === 'PNAME_LN') {
      const prefix = node.image.split(':').shift();

      if (!namespacesMap[prefix]) {
        semanticErrors.push(
          getNoPrefixError(
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

export function addThenClauseErrorsToErrors({
  cst,
  namespacesMap,
  errors,
  semanticErrors,
  fullCtx,
}: {
  errors: IRecognitionException[];
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
      const error = getDisallowedLiteralError(
        node,
        parentCtx as CstNodeTraverseContext,
        fullCtx,
        'GroupGraphPattern'
      );

      if (error) {
        errors.push(error as IRecognitionException);
      }
    }

    if (tokenName === 'PNAME_NS' || tokenName === 'PNAME_LN') {
      const prefix = node.image.split(':').shift();

      if (!namespacesMap[prefix]) {
        semanticErrors.push(
          getNoPrefixError(
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
    errors,
    semanticErrors,
  };
}
