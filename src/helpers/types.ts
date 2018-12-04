import { IToken, IRecognitionException, CstNode } from 'chevrotain';

export interface IStardogParser {
  tokenize: (document: string) => IToken[];
  parse: (
    document: string
  ) => { errors: IRecognitionException[]; cst: CstNode };
}

export {
  IToken,
  CstNode,
}
