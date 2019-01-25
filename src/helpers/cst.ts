// @ts-ignore: import types for declarations
import { CstElement, CstNode, ICstVisitor } from 'chevrotain';

export const traverse = (
  root: CstElement,
  visit: Parameters<typeof _traverse>[2]
) => {
  _traverse(root, null, visit);
};

export const unsafeTraverse = (
  root: CstElement,
  visit: Parameters<typeof _unsafeTraverse>[2]
) => {
  _unsafeTraverse(root, null, visit);
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
  visit: (ctx: TraverseContext, next?: (nextCtx?) => void) => void
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

const _unsafeTraverse = (
  root: CstElement,
  ctx: ITraverseContext,
  visit: (ctx: ITraverseContext, next?: (nextCtx?) => void) => void
) => {
  if (!isCstNode(root)) {
    // must be a token
    // make sure to give user a copy
    return visit(ctx);
  }
  // is a grammar rule node
  const { children } = root;
  Object.keys(children).forEach((key) => {
    const childType = children[key];
    if (!childType.length) {
      return;
    }
    childType.forEach((child) => {
      const childCtx = { node: child, parentCtx: ctx };
      const afterVisit = (transformedCtx?) => {
        const nextCtx = transformedCtx
          ? {
              node: transformedCtx.node,
              parentCtx: transformedCtx.parentCtx,
            }
          : childCtx;
        _unsafeTraverse(child, nextCtx, visit);
      };
      visit(childCtx, afterVisit);
    });
  });
};
