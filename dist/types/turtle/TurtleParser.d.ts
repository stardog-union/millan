import { Parser, IParserConfig, Lexer, IToken, IRecognitionException, IMultiModeLexerDefinition, TokenType } from 'chevrotain';
import { IStardogParser } from '../helpers/types';
export declare class TurtleParser extends Parser implements IStardogParser {
    protected lexer: Lexer;
    protected namespacesMap: {};
    protected semanticErrors: IRecognitionException[];
    protected resetManagedState: () => void;
    tokenize: (document: string) => IToken[];
    parse: (document: string) => {
        errors: IRecognitionException[];
        semanticErrors: IRecognitionException[];
        cst: any;
    };
    constructor(config?: Partial<IParserConfig>, tokens?: any, lexerDefinition?: TokenType[] | IMultiModeLexerDefinition, performSelfAnalysis?: boolean);
    turtleDoc: (idxInCallingRule?: number, ...args: any[]) => any;
    statement: (idxInCallingRule?: number, ...args: any[]) => any;
    directive: (idxInCallingRule?: number, ...args: any[]) => any;
    prefixID: (idxInCallingRule?: number, ...args: any[]) => any;
    base: (idxInCallingRule?: number, ...args: any[]) => any;
    sparqlBase: (idxInCallingRule?: number, ...args: any[]) => any;
    sparqlPrefix: (idxInCallingRule?: number, ...args: any[]) => any;
    triples: (idxInCallingRule?: number, ...args: any[]) => any;
    predicateObjectList: (idxInCallingRule?: number, ...args: any[]) => any;
    subject: (idxInCallingRule?: number, ...args: any[]) => any;
    predicate: (idxInCallingRule?: number, ...args: any[]) => any;
    objectList: (idxInCallingRule?: number, ...args: any[]) => any;
    verb: (idxInCallingRule?: number, ...args: any[]) => any;
    literal: (idxInCallingRule?: number, ...args: any[]) => any;
    blankNodePropertyList: (idxInCallingRule?: number, ...args: any[]) => any;
    object: (idxInCallingRule?: number, ...args: any[]) => any;
    collection: (idxInCallingRule?: number, ...args: any[]) => any;
    NumericLiteral: (idxInCallingRule?: number, ...args: any[]) => any;
    RDFLiteral: (idxInCallingRule?: number, ...args: any[]) => any;
    BooleanLiteral: (idxInCallingRule?: number, ...args: any[]) => any;
    String: (idxInCallingRule?: number, ...args: any[]) => any;
    iri: (idxInCallingRule?: number, ...args: any[]) => any;
    PrefixedName: (idxInCallingRule?: number, ...args: any[]) => any;
    BlankNode: (idxInCallingRule?: number, ...args: any[]) => any;
}
