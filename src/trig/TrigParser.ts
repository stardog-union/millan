const { trigTokenMap, trigTokenTypes } = require('./tokens');
import { Parser, IRecognitionException, IParserConfig } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';

export class TrigParser extends TurtleParser {
  constructor(config?: Partial<IParserConfig>) {
    super(config, trigTokenTypes, trigTokenTypes, false);
    Parser.performSelfAnalysis(this);
  }

  public parse = (document: string): ReturnType<TurtleParser['parse']> => {
    this.input = this.lexer.tokenize(document).tokens;
    const cst = this.trigDoc();
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

  trigDoc = this.RULE('trigDoc', () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.directive) },
        { ALT: () => this.SUBRULE(this.block) },
      ]);
    });
  });

  block = this.RULE('block', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.triplesOrGraph) },
      { ALT: () => this.SUBRULE(this.wrappedGraph) },
      { ALT: () => this.SUBRULE(this.triples2) },
      {
        ALT: () => {
          this.CONSUME(trigTokenMap.GRAPH);
          this.SUBRULE(this.labelOrSubject);
          this.SUBRULE1(this.wrappedGraph);
        },
      },
    ]);
  });

  triplesOrGraph = this.RULE('triplesOrGraph', () => {
    this.SUBRULE(this.labelOrSubject);
    this.OR([
      { ALT: () => this.SUBRULE(this.wrappedGraph) },
      {
        ALT: () => {
          this.SUBRULE(this.predicateObjectList);
          this.CONSUME(trigTokenMap.Period);
        },
      },
    ]);
  });

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

  wrappedGraph = this.RULE('wrappedGraph', () => {
    this.CONSUME(trigTokenMap.LCurly);
    this.OPTION(() => this.SUBRULE(this.triplesBlock));
    this.CONSUME(trigTokenMap.RCurly);
  });

  triplesBlock = this.RULE('triplesBlock', () => {
    this.SUBRULE(this.triples);
    this.OPTION(() => {
      this.CONSUME(trigTokenMap.Period);
      this.OPTION1(() => this.SUBRULE(this.triplesBlock));
    });
  });

  labelOrSubject = this.RULE('labelOrSubject', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
    ]);
  });
}
