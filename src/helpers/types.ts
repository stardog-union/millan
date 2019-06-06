import { IToken, IRecognitionException, CstNode, TokenType } from 'chevrotain';

export interface IStardogParser {
  tokenize: (document: string) => IToken[];
  parse: (
    document: string
  ) => { errors: IRecognitionException[]; cst: CstNode };
}

export interface ITokensMap {
  [key: string]: IToken[];
}

type Lit = string | number | boolean | undefined | null | void | symbol | {};
export const getAsTypedTuple = <T extends Lit[]>(...args: T): T => args;

// exported for convenience
export { IToken, CstNode, TokenType };
