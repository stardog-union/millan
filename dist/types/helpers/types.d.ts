import { IToken, IRecognitionException, CstNode, TokenType } from 'chevrotain';
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
declare type Lit = string | number | boolean | undefined | null | void | symbol | {};
export declare const getAsTypedTuple: <T extends Lit[]>(...args: T) => T;
export { IToken, CstNode, TokenType };
