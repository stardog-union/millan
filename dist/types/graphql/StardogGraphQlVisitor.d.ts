import { ICstVisitor } from 'chevrotain';
import { StardogSparqlParser } from '../sparql/StardogSparqlParser';
import { CstNodeMap } from 'helpers/types';
export declare type StardogSparqlParserResult = ReturnType<StardogSparqlParser['parse']>;
export interface IStardogGraphQlVisitor extends ICstVisitor<any, Pick<StardogSparqlParserResult, 'errors'>> {
    BindDirective(ctx: CstNodeMap): void;
    ConditionalStardogDirective(ctx: CstNodeMap): void;
    $resetState(): void;
}
export declare const getStardogGraphQlVisitor: (BaseVisitor: new (...args: any[]) => ICstVisitor<any, any>) => IStardogGraphQlVisitor;
