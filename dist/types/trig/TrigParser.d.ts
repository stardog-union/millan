import { IRecognitionException, IParserConfig } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
export declare class TrigParser extends TurtleParser {
    constructor(config?: Partial<IParserConfig>);
    parse: (document: string) => {
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
