import {
  Parser,
  IParserConfig,
  TokenType,
  IMultiModeLexerDefinition,
} from 'chevrotain';
import { TurtleParser } from './TurtleParser';
const { turtleTokenTypes, turtleTokenMap } = require('./tokens');

export class StardogTurtleParser extends TurtleParser {
  constructor(
    config?: Partial<IParserConfig>,
    tokens = turtleTokenTypes,
    lexerDefinition: TokenType[] | IMultiModeLexerDefinition = tokens,
    performSelfAnalysis = true
  ) {
    super(
      {
        outputCst: true,
        recoveryEnabled: true,
        ...config,
      },
      tokens,
      lexerDefinition,
      false
    );

    if (performSelfAnalysis) {
      Parser.performSelfAnalysis(this);
    }
  }

  triples = this.OVERRIDE_RULE('triples', () => {
    this.OR([
      {
        ALT: () => {
          this.OR1([
            {
              ALT: () => this.SUBRULE(this.subject),
            },
            {
              ALT: () => this.SUBRULE(this.EmbeddedTriplePattern),
            },
          ]);
          this.SUBRULE(this.predicateObjectList);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.blankNodePropertyList);
          this.OPTION(() => this.SUBRULE1(this.predicateObjectList));
        },
      },
    ]);
  });

  triplesNotEmbedded = this.RULE('triplesNotEmbedded', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.subject);
          this.SUBRULE(this.predicateObjectList);
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.blankNodePropertyList);
          this.OPTION(() => this.SUBRULE1(this.predicateObjectList));
        },
      },
    ]);
  });

  // NOTE: Intentionally does not conform to the RDF* spec. Stardog does not
  // allow nesting of embedded triples.
  EmbeddedTriplePattern = this.RULE('EmbeddedTriplePattern', () => {
    this.CONSUME(turtleTokenMap.LEmbed);
    this.SUBRULE(this.triplesNotEmbedded);
    this.CONSUME(turtleTokenMap.REmbed);
  });
}
