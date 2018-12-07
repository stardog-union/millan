"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chevrotain_1 = require("chevrotain");
var tokens_1 = require("./tokens");
var TurtleParser = /** @class */ (function (_super) {
    __extends(TurtleParser, _super);
    function TurtleParser(config) {
        var _this = _super.call(this, [], tokens_1.tokenTypes, __assign({ outputCst: true, recoveryEnabled: true }, config)) || this;
        // Parsing Turtle requires that the parser keep a map of namespaces in state.
        // Empty prefixes, for example, are allowed only if the empty prefix has been
        // added to the namespaces map (for now, that's all this tracks). (TODO: We
        // might want to use a visitor for this, but I'm doing it quick-and-dirty for
        // now.)
        // See here: https://www.w3.org/TR/turtle/#handle-PNAME_LN
        _this.namespacesMap = {};
        _this.semanticErrors = [];
        // Clears the state that we have to manage on our own for each parse (see
        // above for details).
        _this.resetManagedState = function () {
            _this.namespacesMap = {};
            _this.semanticErrors = [];
        };
        _this.tokenize = function (document) {
            return _this.lexer.tokenize(document).tokens;
        };
        _this.parse = function (document) {
            _this.input = _this.lexer.tokenize(document).tokens;
            var cst = _this.turtleDoc();
            // Next two items are copied so that they can be returned/held after parse
            // state is cleared.
            var errors = _this.errors.slice();
            var semanticErrors = _this.semanticErrors.slice();
            _this.resetManagedState();
            return {
                errors: errors,
                semanticErrors: semanticErrors,
                cst: cst,
            };
        };
        _this.turtleDoc = _this.RULE('turtleDoc', function () {
            _this.MANY(function () { return _this.SUBRULE(_this.statement); });
        });
        _this.statement = _this.RULE('statement', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.directive); } },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.triples);
                        _this.CONSUME(tokens_1.tokenMap.Period);
                    },
                },
            ]);
        });
        _this.directive = _this.RULE('directive', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.prefixID); } },
                { ALT: function () { return _this.SUBRULE(_this.base); } },
                { ALT: function () { return _this.SUBRULE(_this.sparqlPrefix); } },
                { ALT: function () { return _this.SUBRULE(_this.sparqlBase); } },
            ]);
        });
        _this.prefixID = _this.RULE('prefixID', function () {
            _this.CONSUME(tokens_1.tokenMap.TTL_PREFIX);
            var pnameNsToken = _this.CONSUME(tokens_1.tokenMap.PNAME_NS);
            var iriToken = _this.CONSUME(tokens_1.tokenMap.IRIREF);
            var pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
            var iriImage = iriToken.image;
            _this.namespacesMap[pnameImageWithoutColon] = iriImage;
            _this.CONSUME(tokens_1.tokenMap.Period);
        });
        _this.base = _this.RULE('base', function () {
            _this.CONSUME(tokens_1.tokenMap.TTL_BASE);
            _this.CONSUME(tokens_1.tokenMap.IRIREF);
            _this.CONSUME(tokens_1.tokenMap.Period);
        });
        _this.sparqlBase = _this.RULE('sparqlBase', function () {
            _this.CONSUME(tokens_1.tokenMap.BASE);
            _this.CONSUME(tokens_1.tokenMap.IRIREF);
        });
        _this.sparqlPrefix = _this.RULE('sparqlPrefix', function () {
            _this.CONSUME(tokens_1.tokenMap.PREFIX);
            var pnameNsToken = _this.CONSUME(tokens_1.tokenMap.PNAME_NS);
            var iriToken = _this.CONSUME(tokens_1.tokenMap.IRIREF);
            var pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
            var iriImage = iriToken.image;
            _this.namespacesMap[pnameImageWithoutColon] = iriImage;
        });
        _this.triples = _this.RULE('triples', function () {
            _this.OR([
                {
                    ALT: function () {
                        _this.SUBRULE(_this.subject);
                        _this.SUBRULE(_this.predicateObjectList);
                    },
                },
                {
                    ALT: function () {
                        _this.SUBRULE(_this.blankNodePropertyList);
                        _this.OPTION(function () { return _this.SUBRULE1(_this.predicateObjectList); });
                    },
                },
            ]);
        });
        _this.predicateObjectList = _this.RULE('predicateObjectList', function () {
            _this.SUBRULE(_this.verb);
            _this.SUBRULE(_this.objectList);
            _this.OPTION(function () {
                _this.CONSUME(tokens_1.tokenMap.Semicolon);
                _this.OPTION1(function () {
                    _this.SUBRULE1(_this.verb);
                    _this.SUBRULE1(_this.objectList);
                });
            });
            _this.MANY(function () {
                _this.CONSUME1(tokens_1.tokenMap.Semicolon);
                _this.OPTION2(function () {
                    _this.SUBRULE2(_this.verb);
                    _this.SUBRULE2(_this.objectList);
                });
            });
        });
        _this.subject = _this.RULE('subject', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNode); } },
                { ALT: function () { return _this.SUBRULE(_this.collection); } },
            ]);
        });
        _this.predicate = _this.RULE('predicate', function () {
            _this.SUBRULE(_this.iri);
        });
        _this.objectList = _this.RULE('objectList', function () {
            _this.SUBRULE(_this.object);
            _this.MANY(function () {
                _this.CONSUME(tokens_1.tokenMap.Comma);
                _this.SUBRULE1(_this.object);
            });
        });
        _this.verb = _this.RULE('verb', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.predicate); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.A); } },
            ]);
        });
        _this.literal = _this.RULE('literal', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.RDFLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.NumericLiteral); } },
                { ALT: function () { return _this.SUBRULE(_this.BooleanLiteral); } },
            ]);
        });
        _this.blankNodePropertyList = _this.RULE('blankNodePropertyList', function () {
            _this.CONSUME(tokens_1.tokenMap.LBracket);
            _this.SUBRULE(_this.predicateObjectList);
            _this.CONSUME(tokens_1.tokenMap.RBracket);
        });
        _this.object = _this.RULE('object', function () {
            _this.OR([
                { ALT: function () { return _this.SUBRULE(_this.iri); } },
                { ALT: function () { return _this.SUBRULE(_this.BlankNode); } },
                { ALT: function () { return _this.SUBRULE(_this.collection); } },
                { ALT: function () { return _this.SUBRULE(_this.blankNodePropertyList); } },
                { ALT: function () { return _this.SUBRULE(_this.literal); } },
            ]);
        });
        _this.collection = _this.RULE('collection', function () {
            _this.CONSUME(tokens_1.tokenMap.LParen);
            _this.MANY(function () { return _this.SUBRULE(_this.object); });
            _this.CONSUME(tokens_1.tokenMap.RParen);
        });
        _this.NumericLiteral = _this.RULE('NumericLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.INTEGER); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DECIMAL); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.DOUBLE); } },
            ]);
        });
        _this.RDFLiteral = _this.RULE('RDFLiteral', function () {
            _this.SUBRULE(_this.String);
            _this.OPTION(function () {
                _this.OR([
                    { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.LANGTAG); } },
                    {
                        ALT: function () {
                            _this.CONSUME(tokens_1.tokenMap.DoubleCaret);
                            _this.SUBRULE(_this.iri);
                        },
                    },
                ]);
            });
        });
        _this.BooleanLiteral = _this.RULE('BooleanLiteral', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.TRUE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.FALSE); } },
            ]);
        });
        _this.String = _this.RULE('String', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_QUOTE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_SINGLE_QUOTE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.STRING_LITERAL_LONG_QUOTE); } },
            ]);
        });
        _this.iri = _this.RULE('iri', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.IRIREF); } },
                { ALT: function () { return _this.SUBRULE(_this.PrefixedName); } },
            ]);
        });
        _this.PrefixedName = _this.RULE('PrefixedName', function () {
            var prefixedNameToken = _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PNAME_LN); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.PNAME_NS); } },
            ]);
            var pnameNsImage = prefixedNameToken.image.slice(0, prefixedNameToken.image.indexOf(':'));
            if (!(pnameNsImage in _this.namespacesMap)) {
                _this.semanticErrors.push({
                    name: 'NoNamespacePrefixError',
                    message: 'A prefix was used for which there was no namespace defined.',
                    token: prefixedNameToken,
                    context: {
                        ruleStack: _this.getHumanReadableRuleStack(),
                        ruleOccurrenceStack: _this.RULE_OCCURRENCE_STACK.slice(),
                    },
                    resyncedTokens: [],
                });
            }
        });
        _this.BlankNode = _this.RULE('BlankNode', function () {
            _this.OR([
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.BLANK_NODE_LABEL); } },
                { ALT: function () { return _this.CONSUME(tokens_1.tokenMap.ANON); } },
            ]);
        });
        _this.lexer = new chevrotain_1.Lexer(tokens_1.tokenTypes);
        chevrotain_1.Parser.performSelfAnalysis(_this);
        return _this;
    }
    return TurtleParser;
}(chevrotain_1.Parser));
exports.TurtleParser = TurtleParser;
