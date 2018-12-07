import { Parser, Lexer, } from 'chevrotain';
import { tokenTypes, tokenMap } from './tokens';
export class SmsParser extends Parser {
    constructor(config) {
        super([], tokenTypes, Object.assign({ outputCst: true, recoveryEnabled: true }, config));
        this.tokenize = (document) => this.lexer.tokenize(document).tokens;
        this.parse = (document) => {
            this.input = this.lexer.tokenize(document).tokens;
            const cst = this.MappingDoc();
            const errors = this.errors;
            return {
                errors,
                cst,
            };
        };
        this.MappingDoc = this.RULE('MappingDoc', () => {
            this.MANY(() => this.SUBRULE(this.PrefixDecl));
            this.SUBRULE(this.MappingClause);
            this.MANY1(() => {
                this.CONSUME(tokenMap.Semicolon);
                this.SUBRULE1(this.MappingClause);
            });
        });
        this.MappingClause = this.RULE('MappingClause', () => {
            this.SUBRULE(this.MappingDecl);
            this.SUBRULE(this.FromClause);
            this.SUBRULE(this.ToClause);
            this.SUBRULE(this.WhereClause);
        });
        this.MappingDecl = this.RULE('MappingDecl', () => {
            this.CONSUME(tokenMap.Mapping);
            this.OPTION(() => this.SUBRULE(this.iri));
        });
        this.FromClause = this.RULE('FromClause', () => {
            this.CONSUME(tokenMap.FROM);
            this.OR([
                {
                    ALT: () => this.SUBRULE(this.SqlClause),
                },
                {
                    ALT: () => this.SUBRULE(this.JsonClause),
                },
                {
                    ALT: () => this.SUBRULE(this.GraphQlClause),
                },
            ]);
        });
        this.JsonClause = this.RULE('JsonClause', () => {
            this.CONSUME(tokenMap.Json);
            // this.CONSUME(tokenMap.LCurly);
            this.CONSUME(tokenMap.JsonBlock);
            // this.CONSUME(tokenMap.RCurly);
        });
        this.GraphQlClause = this.RULE('GraphQlClause', () => {
            this.CONSUME(tokenMap.GraphQl);
            this.CONSUME(tokenMap.LCurly);
            this.CONSUME(tokenMap.GraphQlBlock);
            this.CONSUME(tokenMap.RCurly);
        });
        this.SqlClause = this.RULE('SqlClause', () => {
            this.CONSUME(tokenMap.Sql);
            this.CONSUME(tokenMap.LCurly);
            this.CONSUME(tokenMap.SqlBlock);
            this.CONSUME(tokenMap.RCurly);
        });
        this.ToClause = this.RULE('ToClause', () => {
            this.CONSUME(tokenMap.TO);
            this.SUBRULE(this.ConstructTemplate);
        });
        this.WhereClause = this.RULE('WhereClause', () => {
            this.CONSUME(tokenMap.WHERE);
            this.CONSUME(tokenMap.LCurly);
            this.MANY(() => this.SUBRULE(this.Bind));
            this.CONSUME(tokenMap.RCurly);
        });
        this.Bind = this.RULE('Bind', () => {
            this.CONSUME(tokenMap.BIND);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.TemplateOrCast);
            this.CONSUME(tokenMap.AS);
            this.SUBRULE(this.Var);
            this.CONSUME(tokenMap.RParen);
        });
        this.TemplateOrCast = this.RULE('TemplateOrCast', () => {
            this.OR([
                {
                    ALT: () => this.SUBRULE(this.TemplateFunc),
                },
                {
                    ALT: () => this.SUBRULE(this.CastFunc),
                },
            ]);
        });
        this.CastFunc = this.RULE('CastFunc', () => {
            this.SUBRULE(this.iri);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.Var);
            this.CONSUME(tokenMap.RParen);
        });
        this.TemplateFunc = this.RULE('TemplateFunc', () => {
            this.CONSUME(tokenMap.Template);
            this.CONSUME(tokenMap.LParen);
            this.SUBRULE(this.String);
            this.CONSUME(tokenMap.RParen);
        });
        //
        // Dupes from Sparql
        //
        this.PrefixDecl = this.RULE('PrefixDecl', () => {
            this.CONSUME(tokenMap.PREFIX);
            this.CONSUME(tokenMap.PNAME_NS);
            this.CONSUME(tokenMap.IRIREF);
        });
        this.iri = this.RULE('iri', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.IRIREF) },
                { ALT: () => this.SUBRULE(this.PrefixedName) },
            ]);
        });
        this.PrefixedName = this.RULE('PrefixedName', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.PNAME_LN) },
                { ALT: () => this.CONSUME(tokenMap.PNAME_NS) },
            ]);
        });
        this.ConstructTemplate = this.RULE('ConstructTemplate', () => {
            this.CONSUME(tokenMap.LCurly);
            this.OPTION(() => this.SUBRULE(this.ConstructTriples));
            this.CONSUME(tokenMap.RCurly);
        });
        this.ConstructTriples = this.RULE('ConstructTriples', () => {
            this.SUBRULE(this.TriplesSameSubject);
            this.OPTION(() => {
                this.CONSUME(tokenMap.Period);
                this.OPTION1(() => this.SUBRULE(this.ConstructTriples));
            });
        });
        this.TriplesSameSubject = this.RULE('TriplesSameSubject', () => {
            this.OR([
                {
                    ALT: () => {
                        this.SUBRULE(this.VarOrTerm);
                        this.SUBRULE(this.PropertyListNotEmpty);
                    },
                },
                {
                    ALT: () => {
                        this.SUBRULE(this.TriplesNode);
                        this.SUBRULE(this.PropertyList);
                    },
                },
            ]);
        });
        this.VarOrTerm = this.RULE('VarOrTerm', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.Var) },
                { ALT: () => this.SUBRULE(this.GraphTerm) },
            ]);
        });
        this.PropertyListNotEmpty = this.RULE('PropertyListNotEmpty', () => {
            this.SUBRULE(this.Verb);
            this.SUBRULE(this.ObjectList);
            this.MANY(() => {
                this.CONSUME(tokenMap.Semicolon);
                this.OPTION(() => {
                    this.SUBRULE1(this.Verb);
                    this.SUBRULE1(this.ObjectList);
                });
            });
        });
        this.TriplesNode = this.RULE('TriplesNode', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.Collection) },
                { ALT: () => this.SUBRULE(this.BlankNodePropertyList) },
            ]);
        });
        this.PropertyList = this.RULE('PropertyList', () => {
            this.OPTION(() => this.SUBRULE(this.PropertyListNotEmpty));
        });
        this.GraphTerm = this.RULE('GraphTerm', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.iri) },
                { ALT: () => this.SUBRULE(this.RDFLiteral) },
                { ALT: () => this.SUBRULE(this.NumericLiteral) },
                { ALT: () => this.SUBRULE(this.BooleanLiteral) },
                { ALT: () => this.SUBRULE(this.BlankNode) },
                { ALT: () => this.CONSUME(tokenMap.NIL) },
            ]);
        });
        this.Verb = this.RULE('Verb', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.VarOrIri) },
                { ALT: () => this.CONSUME(tokenMap.A) },
            ]);
        });
        this.ObjectList = this.RULE('ObjectList', () => {
            this.AT_LEAST_ONE_SEP({
                SEP: tokenMap.Comma,
                DEF: () => this.SUBRULE(this.Object),
            });
        });
        this.Object = this.RULE('Object', () => {
            this.SUBRULE(this.GraphNode);
        });
        this.Collection = this.RULE('Collection', () => {
            this.CONSUME(tokenMap.LParen);
            this.AT_LEAST_ONE(() => this.SUBRULE(this.GraphNode));
            this.CONSUME(tokenMap.RParen);
        });
        this.BlankNodePropertyList = this.RULE('BlankNodePropertyList', () => {
            this.CONSUME(tokenMap.LBracket);
            this.SUBRULE(this.PropertyListNotEmpty);
            this.CONSUME(tokenMap.RBracket);
        });
        this.VarOrIri = this.RULE('VarOrIri', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.Var) },
                { ALT: () => this.SUBRULE(this.iri) },
            ]);
        });
        this.RDFLiteral = this.RULE('RDFLiteral', () => {
            this.SUBRULE(this.String);
            this.OPTION(() => this.OR([
                { ALT: () => this.CONSUME(tokenMap.LANGTAG) },
                {
                    ALT: () => {
                        this.CONSUME(tokenMap.DoubleCaret);
                        this.SUBRULE(this.iri);
                    },
                },
            ]));
        });
        this.NumericLiteral = this.RULE('NumericLiteral', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.NumericLiteralUnsigned) },
                { ALT: () => this.SUBRULE(this.NumericLiteralPositive) },
                { ALT: () => this.SUBRULE(this.NumericLiteralNegative) },
            ]);
        });
        this.NumericLiteralUnsigned = this.RULE('NumericLiteralUnsigned', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.INTEGER) },
                { ALT: () => this.CONSUME(tokenMap.DECIMAL) },
                { ALT: () => this.CONSUME(tokenMap.DOUBLE) },
            ]);
        });
        this.NumericLiteralPositive = this.RULE('NumericLiteralPositive', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.INTEGER_POSITIVE) },
                { ALT: () => this.CONSUME(tokenMap.DECIMAL_POSITIVE) },
                { ALT: () => this.CONSUME(tokenMap.DOUBLE_POSITIVE) },
            ]);
        });
        this.NumericLiteralNegative = this.RULE('NumericLiteralNegative', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.INTEGER_NEGATIVE) },
                { ALT: () => this.CONSUME(tokenMap.DECIMAL_NEGATIVE) },
                { ALT: () => this.CONSUME(tokenMap.DOUBLE_NEGATIVE) },
            ]);
        });
        this.BooleanLiteral = this.RULE('BooleanLiteral', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.TRUE) },
                { ALT: () => this.CONSUME(tokenMap.FALSE) },
            ]);
        });
        this.BlankNode = this.RULE('BlankNode', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.BLANK_NODE_LABEL) },
                { ALT: () => this.CONSUME(tokenMap.ANON) },
            ]);
        });
        this.GraphNode = this.RULE('GraphNode', () => {
            this.OR([
                { ALT: () => this.SUBRULE(this.VarOrTerm) },
                { ALT: () => this.SUBRULE(this.TriplesNode) },
            ]);
        });
        this.Var = this.RULE('Var', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.VAR1) },
                { ALT: () => this.CONSUME(tokenMap.VAR2) },
            ]);
        });
        this.String = this.RULE('String', () => {
            this.OR([
                { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL1) },
                { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL2) },
                { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG1) },
                { ALT: () => this.CONSUME(tokenMap.STRING_LITERAL_LONG2) },
            ]);
        });
        this.lexer = new Lexer(tokenTypes);
        Parser.performSelfAnalysis(this);
    }
}
