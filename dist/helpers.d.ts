import { CstElement, CstNode, ICstVisitor } from 'chevrotain';
export declare const traverse: (root: CstElement, visit: any) => void;
export declare function isCstNode(object: CstElement): object is CstNode;
export declare const BaseCstVisitorWithDefaults: new (...args: any[]) => ICstVisitor<any, any>;
export declare class VariableValidationVisitor extends BaseCstVisitorWithDefaults {
    constructor();
    QueryUnit(ctx: any): void;
    Var(ctx: any): void;
}
