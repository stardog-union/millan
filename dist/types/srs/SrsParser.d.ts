import { Lexer, IToken, IRecognitionException, IParserConfig } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
export declare class SrsParser extends TurtleParser {
    private sparqlSrsVisitor;
    protected lexer: Lexer;
    constructor(config?: Partial<IParserConfig>);
    SrsDoc: (idxInCallingRule?: number, ...args: any[]) => any;
    RuleDoc: (idxInCallingRule?: number, ...args: any[]) => any;
    RuleClause: (idxInCallingRule?: number, ...args: any[]) => any;
    IfClause: (idxInCallingRule?: number, ...args: any[]) => any;
    ThenClause: (idxInCallingRule?: number, ...args: any[]) => any;
    tokenize: (document: string) => IToken[];
    parse: (document: string) => {
        errors: IRecognitionException[];
        cst: any;
    };
}
