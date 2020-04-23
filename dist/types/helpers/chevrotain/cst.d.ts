import { CstElement, CstNode } from 'chevrotain';
export declare const traverse: (root: CstElement, visit: (ctx: ITraverseContext, next?: (nextCtx?: any) => void) => void) => void;
export declare const unsafeTraverse: (root: CstElement, visit: (ctx: ITraverseContext, next?: (nextCtx?: any) => void) => void) => void;
export declare function isCstNode(object: CstElement): object is CstNode;
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
export {};
