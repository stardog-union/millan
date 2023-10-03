const { sparqlTokenMap, stardogSparqlTokens } = require('./tokens');
import { BaseSparqlParser } from './BaseSparqlParser';
import { Parser } from 'chevrotain';

export class StardogSparqlParser extends BaseSparqlParser {
  constructor(options?, tokens = stardogSparqlTokens, shouldSkipAnalysis?) {
    super(options, tokens);

    if (!shouldSkipAnalysis) {
      Parser.performSelfAnalysis(this);
    }
  }

  ValidateQuery = this.RULE('ValidateQuery', () => {
    this.CONSUME(sparqlTokenMap.VALIDATE);
    this.OR([
      { ALT: () => this.CONSUME(sparqlTokenMap.ALL) },
      // { ALT: () => this.AT_LEAST_ONE(() => this.SUBRULE(this.iri)) },
      {
        ALT: () => {
          this.CONSUME(sparqlTokenMap.GRAPH);
          this.AT_LEAST_ONE(() => this.SUBRULE(this.iri));
        },
      },
      {
        ALT: () => {
          this.AT_LEAST_ONE1(() => this.SUBRULE1(this.iri));
          this.OPTION(() => {
            this.CONSUME1(sparqlTokenMap.GRAPH);
            this.AT_LEAST_ONE2(() => this.SUBRULE2(this.iri));
          });
        },
      },
    ]);
    this.OPTION1(() => {
      this.CONSUME(sparqlTokenMap.USING);
      this.CONSUME(sparqlTokenMap.SHAPES);
      this.OR1([
        { ALT: () => this.AT_LEAST_ONE3(() => this.SUBRULE3(this.iri)) },
        {
          ALT: () => {
            this.CONSUME2(sparqlTokenMap.GRAPH);
            this.AT_LEAST_ONE4(() => {
              this.SUBRULE4(this.iri);
            });
          },
        },
        { ALT: () => this.SUBRULE5(this.QuadData) },
      ]);
    });
    this.OPTION2(() => {
      this.CONSUME(sparqlTokenMap.LIMIT);
      this.CONSUME(sparqlTokenMap.INTEGER);
    });
    this.OPTION3(() => {
      this.CONSUME1(sparqlTokenMap.LIMIT);
      this.CONSUME(sparqlTokenMap.PER);
      this.CONSUME(sparqlTokenMap.SHAPE);
      this.CONSUME1(sparqlTokenMap.INTEGER);
    });
  });

  Query = this.OVERRIDE_RULE('Query', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.SelectQuery) },
      { ALT: () => this.SUBRULE(this.ConstructQuery) },
      { ALT: () => this.SUBRULE(this.DescribeQuery) },
      { ALT: () => this.SUBRULE(this.AskQuery) },
      { ALT: () => this.SUBRULE(this.PathQuery) },
      { ALT: () => this.SUBRULE(this.ValidateQuery) },
    ]);
    this.SUBRULE(this.ValuesClause);
  });

  PathQuery = this.RULE('PathQuery', () => {
    this.SUBRULE(this.PathSpec);
    this.MANY(() => this.SUBRULE(this.DatasetClause));
    this.CONSUME(sparqlTokenMap.START);
    this.SUBRULE(this.PathTerminal);
    this.CONSUME(sparqlTokenMap.END);
    this.SUBRULE1(this.PathTerminal);
    this.SUBRULE(this.Via);
    this.OPTION(() => this.SUBRULE(this.MaxLength));
    this.SUBRULE(this.SolutionModifier);
  });

  Via = this.RULE('Via', () => {
    this.CONSUME(sparqlTokenMap.VIA);
    this.OR([
      { ALT: () => this.SUBRULE(this.GroupGraphPattern) },
      { ALT: () => this.SUBRULE(this.Var) },
      { ALT: () => this.SUBRULE(this.Path) },
    ]);
  });

  PathTerminal = this.RULE('PathTerminal', () => {
    this.SUBRULE(this.Var);
    this.OPTION(() => {
      this.OR([
        {
          ALT: () => {
            this.CONSUME(sparqlTokenMap.Equals);
            this.SUBRULE(this.Constant);
          },
        },
        { ALT: () => this.SUBRULE(this.GroupGraphPattern) },
      ]);
    });
  });

  PathSpec = this.RULE('PathSpec', () => {
    this.OR([
      { ALT: () => this.CONSUME(sparqlTokenMap.PATHS) },
      { ALT: () => this.CONSUME(sparqlTokenMap.PATHS_SHORTEST) },
      { ALT: () => this.CONSUME(sparqlTokenMap.PATHS_ALL) },
    ]);
    this.OPTION1(() => this.CONSUME(sparqlTokenMap.CYCLIC));
  });

  GraphPatternNotTriples = this.OVERRIDE_RULE('GraphPatternNotTriples', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.GroupOrUnionGraphPattern) },
      { ALT: () => this.SUBRULE(this.OptionalGraphPattern) },
      { ALT: () => this.SUBRULE(this.MinusGraphPattern) },
      { ALT: () => this.SUBRULE(this.GraphGraphPattern) },
      { ALT: () => this.SUBRULE(this.ServiceGraphPattern) },
      { ALT: () => this.SUBRULE(this.Filter) },
      { ALT: () => this.SUBRULE(this.Bind) },
      { ALT: () => this.SUBRULE(this.Unnest) },
      { ALT: () => this.SUBRULE(this.InlineData) },
    ]);
  });

  TriplesSameSubject = this.OVERRIDE_RULE('TriplesSameSubject', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.VarOrTerm);
          this.SUBRULE(this.PropertyListNotEmpty);
        },
      },
      {
        ALT: () => {
          // NOTE: Intentionally does not conform to the SPARQL* spec.
          // Stardog does not allow nesting of embedded triples.
          this.SUBRULE(this.EmbeddedTriplePattern);
          this.SUBRULE1(this.PropertyListNotEmpty, { ARGS: [true] });
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

  // NOTE: Intentionally does not conform to the SPARQL* spec.
  // Stardog does not allow embedded triples with object lists.
  PropertyListNotEmpty = this.OVERRIDE_RULE(
    'PropertyListNotEmpty',
    (disallowEdgeProperties: boolean) => {
      this.SUBRULE(this.Verb);
      this.OR([
        {
          ALT: () => {
            this.SUBRULE(this.ObjectList);
          },
        },
        {
          GATE: () => !disallowEdgeProperties,
          ALT: () => {
            this.SUBRULE(this.EmbeddedPropertyList);
            this.SUBRULE(this.Object);
          },
        },
      ]);
      this.MANY(() => {
        this.CONSUME(sparqlTokenMap.Semicolon);
        this.OPTION(() => {
          this.SUBRULE1(this.Verb);
          this.OR1([
            {
              ALT: () => {
                this.SUBRULE1(this.ObjectList);
              },
            },
            {
              GATE: () => !disallowEdgeProperties,
              ALT: () => {
                this.SUBRULE1(this.EmbeddedPropertyList);
                this.SUBRULE1(this.Object);
              },
            },
          ]);
        });
      });
    }
  );

  // NOTE: Intentionally does not conform to the SPARQL* spec.
  // Stardog does not allow nesting of embedded triples.
  EmbeddedPropertyList = this.RULE('EmbeddedPropertyList', () => {
    this.CONSUME(sparqlTokenMap.LCurly);
    this.SUBRULE(this.PropertyListNotEmpty, { ARGS: [true] });
    this.CONSUME(sparqlTokenMap.RCurly);
  });

  Object = this.OVERRIDE_RULE('Object', () => {
    this.OR([
      {
        ALT: () => this.SUBRULE(this.GraphNode),
      },
      {
        ALT: () => this.SUBRULE(this.EmbeddedTriplePattern),
      },
    ]);
  });

  TriplesSameSubjectPath = this.OVERRIDE_RULE('TriplesSameSubjectPath', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.VarOrTerm);
          this.SUBRULE(this.PropertyListPathNotEmpty);
        },
      },
      {
        ALT: () => {
          // NOTE: Intentionally does not conform to the SPARQL* spec.
          // Stardog does not allow nesting of embedded triples.
          this.SUBRULE(this.EmbeddedTriplePattern);
          this.SUBRULE1(this.PropertyListPathNotEmpty, { ARGS: [true] });
        },
      },
      {
        ALT: () => {
          this.SUBRULE(this.TriplesNodePath);
          this.SUBRULE(this.PropertyListPath);
        },
      },
    ]);
  });

  // NOTE: Intentionally does not conform to the SPARQL* spec.
  // Stardog does not allow embedded triples with paths or object lists.
  PropertyListPathNotEmpty = this.OVERRIDE_RULE(
    'PropertyListPathNotEmpty',
    (disallowEdgeProperties: boolean) => {
      this.OR([
        {
          ALT: () => {
            this.OR1([
              { ALT: () => this.SUBRULE(this.VerbPath) },
              { ALT: () => this.SUBRULE1(this.VerbSimple) },
            ]);
            this.SUBRULE(this.ObjectListPath);
          },
        },
        {
          GATE: () => !disallowEdgeProperties,
          ALT: () => {
            this.SUBRULE(this.Verb);
            this.SUBRULE(this.EmbeddedPropertyListPath);
            this.SUBRULE(this.ObjectPath);
          },
        },
      ]);
      this.MANY(() => {
        this.CONSUME(sparqlTokenMap.Semicolon);
        this.OPTION(() => {
          this.OR2([
            {
              ALT: () => {
                this.OR3([
                  { ALT: () => this.SUBRULE1(this.VerbPath) },
                  { ALT: () => this.SUBRULE2(this.VerbSimple) },
                ]);
                this.SUBRULE1(this.ObjectListPath);
              },
            },
            {
              GATE: () => !disallowEdgeProperties,
              ALT: () => {
                this.SUBRULE1(this.Verb);
                this.SUBRULE1(this.EmbeddedPropertyListPath);
                this.SUBRULE1(this.ObjectPath);
              },
            },
          ]);
        });
      });
    }
  );

  // NOTE: Intentionally does not conform to the SPARQL* spec.
  // Stardog does not allow nesting of embedded triples.
  EmbeddedPropertyListPath = this.RULE('EmbeddedPropertyListPath', () => {
    this.CONSUME(sparqlTokenMap.LCurly);
    this.SUBRULE(this.PropertyListPathNotEmpty, { ARGS: [true] });
    this.CONSUME(sparqlTokenMap.RCurly);
  });

  GraphNodePath = this.OVERRIDE_RULE('GraphNodePath', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.VarOrTermOrEmbeddedTriplePattern) },
      { ALT: () => this.SUBRULE(this.TriplesNodePath) },
    ]);
  });

  // NOTE: Intentionally does not conform to the SPARQL* spec. Stardog does not
  // allow nesting of embedded triples.
  EmbeddedTriplePattern = this.RULE('EmbeddedTriplePattern', () => {
    this.CONSUME(sparqlTokenMap.LEmbed);
    this.SUBRULE(this.VarOrBlankNodeOrIriOrLit);
    this.SUBRULE(this.Verb);
    this.SUBRULE1(this.VarOrBlankNodeOrIriOrLit);
    this.CONSUME(sparqlTokenMap.REmbed);
  });

  VarOrTermOrEmbeddedTriplePattern = this.RULE(
    'VarOrTermOrEmbeddedTriplePattern',
    () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.Var) },
        { ALT: () => this.SUBRULE(this.GraphTerm) },
        { ALT: () => this.SUBRULE(this.EmbeddedTriplePattern) },
      ]);
    }
  );

  Bind = this.OVERRIDE_RULE('Bind', () => {
    this.CONSUME(sparqlTokenMap.BIND);
    this.CONSUME(sparqlTokenMap.LParen);
    this.SUBRULE(this.ExpressionOrEmbeddedTriplePattern);
    this.CONSUME(sparqlTokenMap.AS);
    this.SUBRULE(this.Var);
    this.CONSUME(sparqlTokenMap.RParen);
  });

  ExpressionOrEmbeddedTriplePattern = this.RULE(
    'ExpressionOrEmbeddedTriplePattern',
    () => {
      this.OR([
        {
          ALT: () => this.SUBRULE(this.Expression),
        },
        {
          ALT: () => this.SUBRULE(this.EmbeddedTriplePattern),
        },
      ]);
    }
  );

  // NOTE: This is nearly equivalent to VarOrTerm, but excludes NIL.
  VarOrBlankNodeOrIriOrLit = this.RULE('VarOrBlankNodeOrIriOrLit', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.Var) },
      { ALT: () => this.SUBRULE(this.BlankNode) },
      { ALT: () => this.SUBRULE(this.iri) },
      { ALT: () => this.SUBRULE(this.RDFLiteral) },
      { ALT: () => this.SUBRULE(this.NumericLiteral) },
      { ALT: () => this.SUBRULE(this.BooleanLiteral) },
    ]);
  });

  Unnest = this.RULE('Unnest', () => {
    this.CONSUME(sparqlTokenMap.UNNEST);
    this.CONSUME(sparqlTokenMap.LParen);
    this.SUBRULE(this.Expression);
    this.CONSUME(sparqlTokenMap.AS);
    this.SUBRULE(this.Var);
    this.CONSUME(sparqlTokenMap.RParen);
  });

  BuiltInCall = this.OVERRIDE_RULE('BuiltInCall', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.Aggregate) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STR) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_LANG) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_LANGMATCHES) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_DATATYPE) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_BOUND) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_IRI) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_URI) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_BNODE) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_RAND) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_ABS) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_CEIL) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_FLOOR) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_ROUND) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_CONCAT) },
      { ALT: () => this.SUBRULE(this.SubstringExpression) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STRLEN) },
      { ALT: () => this.SUBRULE(this.StrReplaceExpression) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_UCASE) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_LCASE) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_ENCODE_FOR_URI) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_CONTAINS) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STRSTARTS) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STRENDS) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STRBEFORE) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STRAFTER) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_YEAR) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_MONTH) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_DAY) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_HOURS) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_MINUTES) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_SECONDS) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_TIMEZONE) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_TZ) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_NOW) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_UUID) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STRUUID) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_MD5) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_SHA1) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_SHA256) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_SHA384) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_SHA512) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_COALESCE) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_IF) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STRLANG) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STRDT) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_sameTerm) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_isIRI) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_isURI) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_isBLANK) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_isLITERAL) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_isNUMERIC) },
      { ALT: () => this.SUBRULE(this.RegexExpression) },
      { ALT: () => this.SUBRULE(this.ExistsFunction) },
      { ALT: () => this.SUBRULE(this.NotExistsFunction) },
      // Stardog has some additional built-in functions, and supports user-defined custom functions
      { ALT: () => this.SUBRULE(this.StardogOrCustomFunction) },
    ]);
  });

  StardogOrCustomFunction = this.RULE('StardogOrCustomFunction', () => {
    this.CONSUME(sparqlTokenMap.UNKNOWN);
    this.SUBRULE(this.ExpressionList);
  });

  ConstructTemplate = this.OVERRIDE_RULE('ConstructTemplate', () => {
    this.CONSUME(sparqlTokenMap.LCurly);
    this.OPTION(() =>
      // Stardog supports the request of Quads in a Construct template. See Stardog issue #675
      this.SUBRULE(this.Quads)
    );
    this.CONSUME(sparqlTokenMap.RCurly);
  });
}
