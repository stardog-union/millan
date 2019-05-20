import { ICstVisitor, CstNode } from 'chevrotain';
export interface IShaclVisitor extends ICstVisitor<any, any> {
    triples(ctx: {
        [key: string]: CstNode | CstNode[];
    }): void;
    shaclShape(ctx: {
        [key: string]: CstNode | CstNode[];
    }): void;
    $resetState(): void;
    $validateShapes(prefixes?: {
        shacl?: string;
        xsd?: string;
    }): {
        validationErrors: any[];
    };
}
export declare const getShaclVisitor: (BaseVisitor: new (...args: any[]) => ICstVisitor<any, any>) => IShaclVisitor;
