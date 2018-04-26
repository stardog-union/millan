// @ts-ignore: import types for declarations
import { CstElement, CstNode, ICstVisitor } from 'chevrotain';

export const traverse = (root: CstElement, visit) => {
  _traverse(root, null, visit);
};

export function isCstNode(object: CstElement): object is CstNode {
  return 'name' in object;
}

interface ITraverseContext {
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
  ctx: TraverseContext = new TraverseContext({ node: root }),
  visit: (ctx: TraverseContext, next?: (nextCtx) => void) => void
) => {
  if (!isCstNode(root)) {
    // must be a token

    // make sure to give user a copy
    return visit({ ...ctx });
  }
  // is a grammar rule node
  const { children } = root;
  Object.keys(children).forEach((key) => {
    const childType = children[key];
    if (!childType.length) {
      return;
    }
    childType.forEach((child) => {
      const childCtx = new TraverseContext({ node: child, parentCtx: ctx });
      const afterVisit = (transformedCtx?) => {
        const nextCtx = transformedCtx
          ? new TraverseContext({
              node: transformedCtx.node,
              parentCtx: transformedCtx.parentCtx,
            })
          : childCtx;
        _traverse(child, nextCtx, visit);
      };
      visit(childCtx, afterVisit);
    });
  });
};
