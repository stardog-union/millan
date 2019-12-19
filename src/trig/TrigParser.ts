const { trigTokenMap, trigTokenTypes } = require('./tokens');
import {
  Parser,
  IRecognitionException,
  IParserConfig,
  TokenType,
  IMultiModeLexerDefinition,
} from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
import { ModeString } from '../helpers/types';

export class TrigParser extends TurtleParser {
  constructor(
    config?: Partial<IParserConfig>,
    tokens = trigTokenTypes,
    lexerDefinition: TokenType[] | IMultiModeLexerDefinition = trigTokenTypes,
    performSelfAnalysis = true
  ) {
    super(config, tokens, lexerDefinition, false);
    if (performSelfAnalysis) {
      Parser.performSelfAnalysis(this);
    }
  }

  // NOTE: This parser can parse in two modes, 'standard' and 'stardog'. The
  // latter includes non-standard features like embedded triples patterns (edge
  // properties). Things are done this way to avoid deep inheritance trees
  // (e.g., one alternative is to create a StardogTurtleParser that extends
  // TurtleParser, then a StardogTrigParser that extends the
  // StardogTurtleParser, but that gets ugly...).
  public parse = (
    document: string,
    mode: ModeString = 'standard'
  ): ReturnType<TurtleParser['parse']> => {
    this.input = this.lexer.tokenize(document).tokens;
    const cst = this.trigDoc(0, [mode]);
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

  trigDoc = this.RULE('trigDoc', (mode: ModeString) => {
    const allowEdgeProperties = mode === 'stardog';
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.directive) },
        {
          ALT: () => this.SUBRULE(this.block, { ARGS: [allowEdgeProperties] }),
        },
      ]);
    });
  });

  block = this.RULE('block', (allowEdgeProperties: boolean) => {
    this.OR([
      {
        ALT: () =>
          this.SUBRULE(this.triplesOrGraph, { ARGS: [allowEdgeProperties] }),
      },
      {
        ALT: () =>
          this.SUBRULE(this.wrappedGraph, { ARGS: [allowEdgeProperties] }),
      },
      { ALT: () => this.SUBRULE(this.triples2) },
      {
        ALT: () => {
          this.CONSUME(trigTokenMap.GRAPH);
          this.SUBRULE(this.labelOrSubject);
          this.SUBRULE1(this.wrappedGraph, { ARGS: [allowEdgeProperties] });
        },
      },
    ]);
  });

  triplesOrGraph = this.RULE(
    'triplesOrGraph',
    (allowEdgeProperties: boolean) => {
      let didParseEmbeddedTriplePattern = false;

      this.OR([
        {
          ALT: () => this.SUBRULE(this.labelOrSubject),
        },

        {
          GATE: () => allowEdgeProperties,
          ALT: () => {
            const result = this.SUBRULE(this.EmbeddedTriplePattern);
            didParseEmbeddedTriplePattern =
              result.name === 'EmbeddedTriplePattern';
          },
        },
      ]);
      this.OR1([
        {
          // embedded triple patterns cannot precede wrapped graphs
          GATE: () => !didParseEmbeddedTriplePattern,
          ALT: () =>
            this.SUBRULE(this.wrappedGraph, { ARGS: [allowEdgeProperties] }),
        },
        {
          ALT: () => {
            this.SUBRULE(this.predicateObjectList);
            this.CONSUME(trigTokenMap.Period);
          },
        },
      ]);
    }
  );

  triples2 = this.RULE('triples2', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.blankNodePropertyList);
          this.OPTION(() => this.SUBRULE(this.predicateObjectList));
          this.CONSUME(trigTokenMap.Period);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.collection);
          this.SUBRULE1(this.predicateObjectList);
          this.CONSUME1(trigTokenMap.Period);
        },
      },
    ]);
  });

  wrappedGraph = this.RULE('wrappedGraph', (allowEdgeProperties: boolean) => {
    this.CONSUME(trigTokenMap.LCurly);
    this.OPTION(() =>
      this.SUBRULE(this.triplesBlock, { ARGS: [allowEdgeProperties] })
    );
    this.CONSUME(trigTokenMap.RCurly);
  });

  triplesBlock = this.RULE('triplesBlock', (allowEdgeProperties: boolean) => {
    this.SUBRULE(this.triples, { ARGS: [allowEdgeProperties] });
    this.OPTION(() => {
      this.CONSUME(trigTokenMap.Period);
      this.OPTION1(() =>
        this.SUBRULE(this.triplesBlock, { ARGS: [allowEdgeProperties] })
      );
    });
  });

  labelOrSubject = this.RULE('labelOrSubject', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
    ]);
  });
}
