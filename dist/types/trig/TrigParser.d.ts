import { IRecognitionException, IParserConfig, TokenType, IMultiModeLexerDefinition } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
import { ModeString } from '../helpers/chevrotain/types';
export declare class TrigParser extends TurtleParser {
    constructor(config?: Partial<IParserConfig>, tokens?: any, lexerDefinition?: TokenType[] | IMultiModeLexerDefinition, performSelfAnalysis?: boolean);
    parse: (document: string, mode?: ModeString) => {
        errors: IRecognitionException[];
        semanticErrors: IRecognitionException[];
        cst: any;
    };
    trigDoc: (idxInCallingRule?: number, ...args: any[]) => any;
    block: (idxInCallingRule?: number, ...args: any[]) => any;
    triplesOrGraph: (idxInCallingRule?: number, ...args: any[]) => any;
    triples2: (idxInCallingRule?: number, ...args: any[]) => any;
    wrappedGraph: (idxInCallingRule?: number, ...args: any[]) => any;
    triplesBlock: (idxInCallingRule?: number, ...args: any[]) => any;
    labelOrSubject: (idxInCallingRule?: number, ...args: any[]) => any;
}
