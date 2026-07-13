import { CstElement, CstNode, IToken } from 'chevrotain';
export declare const traverse: (root: CstElement, visit: Parameters<typeof _traverse>[2]) => void;
export declare const unsafeTraverse: (root: CstElement, visit: Parameters<typeof _traverse>[2]) => void;
export declare function isCstNode(object: CstElement): object is CstNode;
export declare function isIToken(object: CstElement): object is IToken;
export declare function getFirstChildCstElementByRuleStack(ruleStack: string[], rootCstNode: CstNode): CstElement | undefined;
export interface ITraverseContext {
    node: CstElement;
    parentCtx: TraverseContext;
    [s: string]: any;
}
declare class TraverseContext implements ITraverseContext {
    node: CstElement;
    parentCtx: TraverseContext;
    constructor({ node, parentCtx, }: {
        node: CstElement;
        parentCtx?: TraverseContext;
    });
}
declare const _traverse: (root: CstElement, ctx: ITraverseContext, visit: (ctx: ITraverseContext, next?: (nextCtx?: any) => void) => void, visitSafely?: boolean) => void;
export {};
