import { IToken, IRecognitionException, CstNode, TokenType, IRecognizerContext } from 'chevrotain';
export interface IStardogParser {
    tokenize: (document: string) => IToken[];
    parse: (document: string) => {
        errors: IRecognitionException[];
        cst: CstNode;
    };
}
export interface ITokensMap {
    [key: string]: IToken[];
}
export interface ISemanticError extends Pick<IRecognitionException, Exclude<keyof IRecognitionException, 'resyncedTokens' | 'context'>> {
    resyncedTokens?: IToken[];
    context?: IRecognizerContext;
}
declare type Lit = string | number | boolean | undefined | null | void | symbol | {};
export declare const getAsTypedTuple: <T extends Lit[]>(...args: T) => T;
export { IToken, CstNode, TokenType };
