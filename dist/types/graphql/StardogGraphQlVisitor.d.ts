import { IToken, ICstVisitor, CstChildrenDictionary } from 'chevrotain';
import { StardogSparqlParser } from '../sparql/StardogSparqlParser';
export declare type StardogSparqlParserResult = ReturnType<StardogSparqlParser['parse']>;
export interface IStardogGraphQlVisitor extends ICstVisitor<any, Pick<StardogSparqlParserResult, 'errors'>> {
    Directive(ctx: CstChildrenDictionary): void;
    $parseSparqlExpression(stringValueToken: IToken): ReturnType<StardogSparqlParser['parse']>;
    $resetState(): void;
}
export declare const getStardogGraphQlVisitor: (BaseVisitor: new (...args: any[]) => ICstVisitor<any, any>) => IStardogGraphQlVisitor;
