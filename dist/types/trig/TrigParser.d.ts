import { IParserConfig, TokenType, IMultiModeLexerDefinition } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
import { ModeString } from '../helpers/chevrotain/types';
export declare class TrigParser extends TurtleParser {
    constructor(config?: Partial<IParserConfig>, tokens?: any, lexerDefinition?: TokenType[] | IMultiModeLexerDefinition, performSelfAnalysis?: boolean);
    parse: (document: string, mode?: ModeString) => ReturnType<TurtleParser["parse"]>;
    trigDoc: import("chevrotain").ParserMethod<[mode?: ModeString], import("chevrotain").CstNode>;
    block: import("chevrotain").ParserMethod<[allowEdgeProperties?: boolean], import("chevrotain").CstNode>;
    triplesOrGraph: import("chevrotain").ParserMethod<[allowEdgeProperties?: boolean], import("chevrotain").CstNode>;
    triples2: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
    wrappedGraph: import("chevrotain").ParserMethod<[allowEdgeProperties?: boolean], import("chevrotain").CstNode>;
    triplesBlock: import("chevrotain").ParserMethod<[allowEdgeProperties?: boolean], import("chevrotain").CstNode>;
    labelOrSubject: import("chevrotain").ParserMethod<[], import("chevrotain").CstNode>;
}
