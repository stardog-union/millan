import { Lexer, IToken, IParserConfig } from 'chevrotain';
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
    SrsDoc: (idxInCallingRule?: number, ...args: any[]) => void | any;
    RuleDoc: (idxInCallingRule?: number, ...args: any[]) => void | any;
    RuleClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    IfClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
    ThenClause: (idxInCallingRule?: number, ...args: any[]) => void | any;
}
