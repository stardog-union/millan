import { BaseSparqlParser } from './BaseSparqlParser';
import { tokenMap, baseTokens, pathsTokens } from './tokens';
import { Parser } from 'chevrotain';

const indexOfSELECT = baseTokens.indexOf(tokenMap.SELECT);
const stardogTokens = [
  ...baseTokens.slice(0, indexOfSELECT),
  ...pathsTokens,
  ...baseTokens.slice(indexOfSELECT),
];

export class StardogSparqlParser extends BaseSparqlParser {
  constructor(options?) {
    super(options, stardogTokens);
    Parser.performSelfAnalysis(this);
  }

  Query = this.OVERRIDE_RULE('Query', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.SelectQuery) },
      { ALT: () => this.SUBRULE(this.ConstructQuery) },
      { ALT: () => this.SUBRULE(this.DescribeQuery) },
      { ALT: () => this.SUBRULE(this.AskQuery) },
      { ALT: () => this.SUBRULE(this.PathQuery) },
    ]);
    this.SUBRULE(this.ValuesClause);
  });

  PathQuery = this.RULE('PathQuery', () => {
    this.SUBRULE(this.PathSpec);
    this.MANY(() => this.SUBRULE(this.DatasetClause));
    this.CONSUME(tokenMap.START);
    this.SUBRULE(this.PathTerminal);
    this.CONSUME(tokenMap.END);
    this.SUBRULE1(this.PathTerminal);
    this.SUBRULE(this.Via);
    this.OPTION(() => this.SUBRULE(this.MaxLength));
    this.SUBRULE(this.SolutionModifier);
  });

  Via = this.RULE('Via', () => {
    this.CONSUME(tokenMap.VIA);
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
            this.CONSUME(tokenMap.Equals);
            this.SUBRULE(this.iri);
          },
        },
        { ALT: () => this.SUBRULE(this.GroupGraphPattern) },
      ]);
    });
  });

  PathSpec = this.RULE('PathSpec', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokenMap.PATHS) },
      { ALT: () => this.CONSUME(tokenMap.PATHS_SHORTEST) },
      { ALT: () => this.CONSUME(tokenMap.PATHS_ALL) },
    ]);
    this.OPTION1(() => this.CONSUME(tokenMap.CYCLIC));
  });

  BuiltInCall = this.OVERRIDE_RULE('BuiltInCall', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.Aggregate) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_STR) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_LANG) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_LANGMATCHERS) },
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
      { ALT: () => this.SUBRULE(this.BuiltInCall_isBlank) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_isLiteral) },
      { ALT: () => this.SUBRULE(this.BuiltInCall_isNumeric) },
      { ALT: () => this.SUBRULE(this.RegexExpression) },
      { ALT: () => this.SUBRULE(this.ExistsFunction) },
      { ALT: () => this.SUBRULE(this.NotExistsFunction) },
      // Stardog has some additional built-in functions, and supports user-defined custom functions
      { ALT: () => this.SUBRULE(this.StardogOrCustomFunction) },
    ]);
  });

  StardogOrCustomFunction = this.RULE('StardogOrCustomFunction', () => {
    this.CONSUME(tokenMap.Unknown);
    this.SUBRULE(this.ExpressionList);
  });

  ConstructTemplate = this.OVERRIDE_RULE('ConstructTemplate', () => {
    this.CONSUME(tokenMap.LCurly);
    this.OPTION(() =>
      // Stardog supports the request of Quads in a Construct template. See Stardog issue #675
      this.SUBRULE(this.Quads)
    );
    this.CONSUME(tokenMap.RCurly);
  });
}
