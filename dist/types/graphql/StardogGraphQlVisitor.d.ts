import { IRecognitionException, ICstVisitor, CstChildrenDictionary, TokenType, CstNode } from 'chevrotain';
import { StardogSparqlParser } from '../sparql/StardogSparqlParser';
import { StardogGraphQlParser } from 'graphql/StardogGraphQlParser';
export declare type PartialRecognitionException = Pick<IRecognitionException, 'name' | 'message'>;
export interface ErrorAccumulator {
    sparqlErrors: IRecognitionException[];
    stardogGraphQlErrors: PartialRecognitionException[];
}
export interface ArgumentValidatorOptions {
    allowedArgumentTokenTypes: TokenType[];
    directiveImage: string | RegExp;
    errorAccumulator: ErrorAccumulator;
    numMinimumArguments: number;
    sparqlParser: StardogSparqlParser;
    suppliedArgumentNodes: CstNode[];
}
export interface ArgumentValidator {
    (validatorOptions: ArgumentValidatorOptions): void;
}
export declare type StardogSparqlParserResult = ReturnType<StardogSparqlParser['parse']>;
export interface IStardogGraphQlVisitor extends ICstVisitor<any, any> {
    Directive(ctx: CstChildrenDictionary): void;
    $resetState(): void;
}
export declare const getStardogGraphQlVisitor: (BaseVisitor: new (...args: any[]) => ICstVisitor<any, any>, parserInstance: StardogGraphQlParser) => IStardogGraphQlVisitor;
