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
  visit: Parameters<typeof _traverse>[2]
) => {
  _traverse(root, null, visit, false);
};

export function isCstNode(object: CstElement): object is CstNode {
  return Boolean(object && 'name' in object);
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
