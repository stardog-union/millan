// @ts-ignore: import types for declarations
import { CstElement, CstNode, ICstVisitor, IToken } from 'chevrotain';

export const traverse = (
  root: CstElement,
  visit: Parameters<typeof _traverse>[2]
) => {
  _traverse(root, null, visit);
};

export const unsafeTraverse = (
  root: CstElement,
  visit: Parameters<typeof _traverse>[2]
) => {
  _traverse(root, null, visit, false);
};

export function isCstNode(object: CstElement): object is CstNode {
  return Boolean(object && 'name' in object);
}

export function isIToken(object: CstElement): object is IToken {
  return Boolean(object && 'tokenType' in object);
}

// Given a chevrotain ruleStack (array of rule parser rule names) and a root
// CstNode, attempts to walk down the tree branching out from that node by
// following the rule stack to its end, and returns the first CstElement found
// at that point (or undefined if the ruleStack path cannot be completed).
// Useful to avoid lots of boilerplate.
export function getFirstChildCstElementByRuleStack(
  ruleStack: string[],
  rootCstNode: CstNode
): CstElement | undefined {
  if (!ruleStack || !ruleStack.length) {
    // No stack to follow, so just return the root node provided.
    return rootCstNode;
  }

  let currentCstElement: CstElement = rootCstNode;

  for (const ruleName of ruleStack) {
    if (
      !isCstNode(currentCstElement) ||
      !currentCstElement.children[ruleName]
    ) {
      // The ruleStack was not exhausted and yet we can go no further; return
      // `undefined`, since there is no value at the specified path.
      return;
    }
    currentCstElement = currentCstElement.children[ruleName][0];
  }

  return currentCstElement;
}

export interface ITraverseContext {
  node: CstElement;
  parentCtx: TraverseContext;
  [s: string]: any;
}

class TraverseContext implements ITraverseContext {
  public node: CstElement;
  public parentCtx: TraverseContext;
  constructor({
    node,
    parentCtx,
  }: {
    node: CstElement;
    parentCtx?: TraverseContext;
  }) {
    this.node = { ...node };
    this.parentCtx = { ...parentCtx };
  }
}

const _traverse = (
  root: CstElement,
  ctx: ITraverseContext = new TraverseContext({ node: root }),
  visit: (ctx: ITraverseContext, next?: (nextCtx?) => void) => void,
  visitSafely = true
) => {
  if (!isCstNode(root)) {
    // must be a token
    return visit(visitSafely ? { ...ctx } : ctx);
  }

  // is a grammar rule node
  const { children } = root;
  Object.keys(children).forEach((key) => {
    const childType = children[key];
    if (!childType.length) {
      return;
    }
    childType.forEach((child) => {
      const childCtx = visitSafely
        ? new TraverseContext({ node: child, parentCtx: ctx })
        : { node: child, parentCtx: ctx };
      const afterVisit = (transformedCtx?) => {
        let nextCtx = childCtx;

        if (transformedCtx) {
          nextCtx = visitSafely
            ? new TraverseContext({
                node: transformedCtx.node,
                parentCtx: transformedCtx.parentCtx,
              })
            : {
                node: transformedCtx.node,
                parentCtx: transformedCtx.parentCtx,
              };
        }

        _traverse(child, nextCtx, visit, visitSafely);
      };
      visit(childCtx, afterVisit);
    });
  });
};
