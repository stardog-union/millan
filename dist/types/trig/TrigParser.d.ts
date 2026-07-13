import { IParserConfig, TokenType, IMultiModeLexerDefinition } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
import { ModeString } from '../helpers/chevrotain/types';
export declare class TrigParser extends TurtleParser {
    constructor(config?: Partial<IParserConfig>, tokens?: any, lexerDefinition?: TokenType[] | IMultiModeLexerDefinition, performSelfAnalysis?: boolean);
    parse: (document: string, mode?: ModeString) => ReturnType<TurtleParser["parse"]>;
    trigDoc: (idxInCallingRule?: number, ...args: any[]) => void | any;
    block: (idxInCallingRule?: number, ...args: any[]) => void | any;
    triplesOrGraph: (idxInCallingRule?: number, ...args: any[]) => void | any;
    triples2: (idxInCallingRule?: number, ...args: any[]) => void | any;
    wrappedGraph: (idxInCallingRule?: number, ...args: any[]) => void | any;
    triplesBlock: (idxInCallingRule?: number, ...args: any[]) => void | any;
    labelOrSubject: (idxInCallingRule?: number, ...args: any[]) => void | any;
}
