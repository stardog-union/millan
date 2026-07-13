import { Lexer, IToken, IParserConfig, CstNode } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
import { ModeString } from '../helpers/chevrotain/types';
export declare class SrsParser extends TurtleParser {
    private sparqlSrsVisitor;
    protected lexer: Lexer;
    protected baseNamespacesMap: Readonly<{}>;
    protected namespacesMap: {
        [key: string]: boolean;
    };
    constructor(config?: Partial<IParserConfig>);
    private visitCst;
    private getSparqlRulesFromVisitor;
    protected resetManagedState: () => void;
    setBaseNamespaces: (newBaseNamespaces: {
        [key: string]: boolean;
    }) => void;
    tokenize: (document: string) => IToken[];
    parse: (document: string, mode?: ModeString) => ReturnType<TurtleParser["parse"]>;
    SrsDoc: import("chevrotain").ParserMethod<[mode?: ModeString], CstNode>;
    RuleDoc: import("chevrotain").ParserMethod<[], CstNode>;
    RuleClause: import("chevrotain").ParserMethod<[], CstNode>;
    IfClause: import("chevrotain").ParserMethod<[], CstNode>;
    ThenClause: import("chevrotain").ParserMethod<[], CstNode>;
}
