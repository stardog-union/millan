import { CstElement, CstNode } from 'chevrotain';
export declare const traverse: (root: CstElement, visit: any) => void;
export declare function isCstNode(object: CstElement): object is CstNode;
