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
export { IToken, CstNode, TokenType };
