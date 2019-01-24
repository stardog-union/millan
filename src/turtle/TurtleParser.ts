import {
  Parser,
  IParserConfig,
  Lexer,
  IToken,
  IRecognitionException,
} from 'chevrotain';
import { turtleTokenTypes, turtleTokenMap } from './tokens';
import { IStardogParser } from '../helpers/types';

export const getRules = (context) => ({
  turtleDoc: context.RULE('turtleDoc', () => {
    context.MANY(() => context.SUBRULE(context.statement));
  }),

  statement: context.RULE('statement', () => {
    context.OR([
      { ALT: () => context.SUBRULE(context.directive) },
      {
        ALT: () => {
          context.SUBRULE(context.triples);
          context.CONSUME(turtleTokenMap.Period);
        },
      },
    ]);
  }),

  directive: context.RULE('directive', () => {
    context.OR([
      { ALT: () => context.SUBRULE(context.prefixID) },
      { ALT: () => context.SUBRULE(context.base) },
      { ALT: () => context.SUBRULE(context.sparqlPrefix) },
      { ALT: () => context.SUBRULE(context.sparqlBase) },
    ]);
  }),

  prefixID: context.RULE('prefixID', () => {
    context.CONSUME(turtleTokenMap.TTL_PREFIX);

    const pnameNsToken = context.CONSUME(turtleTokenMap.PNAME_NS);
    const iriToken = context.CONSUME(turtleTokenMap.IRIREF);
    const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
    const iriImage = iriToken.image;
    context.namespacesMap[pnameImageWithoutColon] = iriImage;

    context.CONSUME(turtleTokenMap.Period);
  }),

  base: context.RULE('base', () => {
    context.CONSUME(turtleTokenMap.TTL_BASE);
    context.CONSUME(turtleTokenMap.IRIREF);
    context.CONSUME(turtleTokenMap.Period);
  }),

  sparqlBase: context.RULE('sparqlBase', () => {
    context.CONSUME(turtleTokenMap.BASE);
    context.CONSUME(turtleTokenMap.IRIREF);
  }),

  sparqlPrefix: context.RULE('sparqlPrefix', () => {
    context.CONSUME(turtleTokenMap.PREFIX);
    const pnameNsToken = context.CONSUME(turtleTokenMap.PNAME_NS);
    const iriToken = context.CONSUME(turtleTokenMap.IRIREF);
    const pnameImageWithoutColon = pnameNsToken.image.slice(0, -1);
    const iriImage = iriToken.image;
    context.namespacesMap[pnameImageWithoutColon] = iriImage;
  }),

  triples: context.RULE('triples', () => {
    context.OR([
      {
        ALT: () => {
          context.SUBRULE(context.subject);
          context.SUBRULE(context.predicateObjectList);
        },
      },
      {
        ALT: () => {
          context.SUBRULE(context.blankNodePropertyList);
          context.OPTION(() => context.SUBRULE1(context.predicateObjectList));
        },
      },
    ]);
  }),

  predicateObjectList: context.RULE('predicateObjectList', () => {
    context.SUBRULE(context.verb);
    context.SUBRULE(context.objectList);
    context.OPTION(() => {
      context.CONSUME(turtleTokenMap.Semicolon);
      context.OPTION1(() => {
        context.SUBRULE1(context.verb);
        context.SUBRULE1(context.objectList);
      });
    });
    context.MANY(() => {
      context.CONSUME1(turtleTokenMap.Semicolon);
      context.OPTION2(() => {
        context.SUBRULE2(context.verb);
        context.SUBRULE2(context.objectList);
      });
    });
  }),

  subject: context.RULE('subject', () => {
    context.OR([
      { ALT: () => context.SUBRULE(context.iri) },
      { ALT: () => context.SUBRULE(context.BlankNode) },
      { ALT: () => context.SUBRULE(context.collection) },
    ]);
  }),

  predicate: context.RULE('predicate', () => {
    context.SUBRULE(context.iri);
  }),

  objectList: context.RULE('objectList', () => {
    context.SUBRULE(context.object);
    context.MANY(() => {
      context.CONSUME(turtleTokenMap.Comma);
      context.SUBRULE1(context.object);
    });
  }),

  verb: context.RULE('verb', () => {
    context.OR([
      { ALT: () => context.SUBRULE(context.predicate) },
      { ALT: () => context.CONSUME(turtleTokenMap.A) },
    ]);
  }),

  literal: context.RULE('literal', () => {
    context.OR([
      { ALT: () => context.SUBRULE(context.RDFLiteral) },
      { ALT: () => context.SUBRULE(context.NumericLiteral) },
      { ALT: () => context.SUBRULE(context.BooleanLiteral) },
    ]);
  }),

  blankNodePropertyList: context.RULE('blankNodePropertyList', () => {
    context.CONSUME(turtleTokenMap.LBracket);
    context.SUBRULE(context.predicateObjectList);
    context.CONSUME(turtleTokenMap.RBracket);
  }),

  object: context.RULE('object', () => {
    context.OR([
      { ALT: () => context.SUBRULE(context.iri) },
      { ALT: () => context.SUBRULE(context.BlankNode) },
      { ALT: () => context.SUBRULE(context.collection) },
      { ALT: () => context.SUBRULE(context.blankNodePropertyList) },
      { ALT: () => context.SUBRULE(context.literal) },
    ]);
  }),

  collection: context.RULE('collection', () => {
    context.CONSUME(turtleTokenMap.LParen);
    context.MANY(() => context.SUBRULE(context.object));
    context.CONSUME(turtleTokenMap.RParen);
  }),

  NumericLiteral: context.RULE('NumericLiteral', () => {
    context.OR([
      { ALT: () => context.CONSUME(turtleTokenMap.INTEGER) },
      { ALT: () => context.CONSUME(turtleTokenMap.DECIMAL) },
      { ALT: () => context.CONSUME(turtleTokenMap.DOUBLE) },
    ]);
  }),

  RDFLiteral: context.RULE('RDFLiteral', () => {
    context.SUBRULE(context.String);
    context.OPTION(() => {
      context.OR([
        { ALT: () => context.CONSUME(turtleTokenMap.LANGTAG) },
        {
          ALT: () => {
            context.CONSUME(turtleTokenMap.DoubleCaret);
            context.SUBRULE(context.iri);
          },
        },
      ]);
    });
  }),

  BooleanLiteral: context.RULE('BooleanLiteral', () => {
    context.OR([
      { ALT: () => context.CONSUME(turtleTokenMap.TRUE) },
      { ALT: () => context.CONSUME(turtleTokenMap.FALSE) },
    ]);
  }),

  String: context.RULE('String', () => {
    context.OR([
      { ALT: () => context.CONSUME(turtleTokenMap.STRING_LITERAL_QUOTE) },
      {
        ALT: () => context.CONSUME(turtleTokenMap.STRING_LITERAL_SINGLE_QUOTE),
      },
      {
        ALT: () =>
          context.CONSUME(turtleTokenMap.STRING_LITERAL_LONG_SINGLE_QUOTE),
      },
      { ALT: () => context.CONSUME(turtleTokenMap.STRING_LITERAL_LONG_QUOTE) },
    ]);
  }),

  iri: context.RULE('iri', () => {
    context.OR([
      { ALT: () => context.CONSUME(turtleTokenMap.IRIREF) },
      { ALT: () => context.SUBRULE(context.PrefixedName) },
    ]);
  }),

  PrefixedName: context.RULE('PrefixedName', () => {
    const prefixedNameToken = context.OR([
      { ALT: () => context.CONSUME(turtleTokenMap.PNAME_LN) },
      { ALT: () => context.CONSUME(turtleTokenMap.PNAME_NS) },
    ]);
    const pnameNsImage = prefixedNameToken.image.slice(
      0,
      prefixedNameToken.image.indexOf(':')
    );
    if (!(pnameNsImage in context.namespacesMap)) {
      context.semanticErrors.push({
        name: 'NoNamespacePrefixError',
        message: 'A prefix was used for which there was no namespace defined.',
        token: prefixedNameToken,
        context: {
          ruleStack: context.getHumanReadableRuleStack(),
          ruleOccurrenceStack: [...context.RULE_OCCURRENCE_STACK],
        },
        resyncedTokens: [], // these don't really make sense for semantic errors, since they don't cause the parser to resync
      });
    }
  }),

  BlankNode: context.RULE('BlankNode', () => {
    context.OR([
      { ALT: () => context.CONSUME(turtleTokenMap.BLANK_NODE_LABEL) },
      { ALT: () => context.CONSUME(turtleTokenMap.ANON) },
    ]);
  }),
});

export class TurtleParser extends Parser implements IStardogParser {
  protected lexer: Lexer;

  // Parsing Turtle requires that the parser keep a map of namespaces in state.
  // Empty prefixes, for example, are allowed only if the empty prefix has been
  // added to the namespaces map (for now, that's all this tracks). (TODO: We
  // might want to use a visitor for this, but I'm doing it quick-and-dirty for
  // now.)
  // See here: https://www.w3.org/TR/turtle/#handle-PNAME_LN
  private namespacesMap = {};
  private semanticErrors: IRecognitionException[] = [];

  // Clears the state that we have to manage on our own for each parse (see
  // above for details).
  private resetManagedState = () => {
    this.namespacesMap = {};
    this.semanticErrors = [];
  };

  public tokenize = (document: string): IToken[] =>
    this.lexer.tokenize(document).tokens;

  public parse = (document: string) => {
    this.input = this.lexer.tokenize(document).tokens;
    // @ts-ignore
    const cst = this.turtleDoc();
    // Next two items are copied so that they can be returned/held after parse
    // state is cleared.
    const errors: IRecognitionException[] = [...this.errors];
    const semanticErrors: IRecognitionException[] = [...this.semanticErrors];
    this.resetManagedState();

    return {
      errors,
      semanticErrors,
      cst,
    };
  };

  constructor(config?: Partial<IParserConfig>) {
    super([], turtleTokenTypes, {
      outputCst: true,
      recoveryEnabled: true,
      ...config,
    });
    this.lexer = new Lexer(turtleTokenTypes);

    const rules = getRules(this);
    Object.keys(rules).forEach((ruleKey) => (this[ruleKey] = rules[ruleKey]));

    Parser.performSelfAnalysis(this);
  }
}
