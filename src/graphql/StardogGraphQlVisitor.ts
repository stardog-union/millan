import {
  IToken,
  IRecognitionException,
  ICstVisitor,
  CstChildrenDictionary,
  TokenType,
  CstNode,
} from 'chevrotain';
import { StardogSparqlParser } from '../sparql/StardogSparqlParser';
import {
  getFirstChildCstElementByRuleStack,
  isIToken,
} from 'helpers/chevrotain/cst';
import { StardogGraphQlParser } from 'graphql/StardogGraphQlParser';
import { graphQlUtils } from 'graphql/utils';

const {
  getArgumentNodes,
  getArgumentTokenTypesForDirectiveNameToken,
  isSparqlReceivingStardogDirective,
} = graphQlUtils;

export type PartialRecognitionException = Pick<
  IRecognitionException,
  'name' | 'message'
>;

export interface ErrorAccumulator {
  sparqlErrors: IRecognitionException[];
  stardogGraphQlErrors: PartialRecognitionException[];
}

export interface ArgumentValidatorOptions {
  allowedArgumentTokenTypes: TokenType[];
  directiveImage: string | RegExp;
  errorAccumulator: ErrorAccumulator;
  numMinimumArguments: number;
  sparqlParser: StardogSparqlParser;
  suppliedArgumentNodes: CstNode[];
}

export interface ArgumentValidator {
  (validatorOptions: ArgumentValidatorOptions): void;
}

export type StardogSparqlParserResult = ReturnType<
  StardogSparqlParser['parse']
>;

export interface IStardogGraphQlVisitor extends ICstVisitor<any, any> {
  Directive(ctx: CstChildrenDictionary): void;
  $resetState(): void;
}

function parseSparqlExpression(
  stringValueToken: IToken,
  stardogSparqlParser: StardogSparqlParser
) {
  const innerExpressionImage = stringValueToken.image.slice(1, -1); // remove quotes
  return stardogSparqlParser.parse(
    innerExpressionImage,
    stardogSparqlParser.Expression
  );
}

// Make the embedded SPARQL errors have proper locations for use in error
// diagnostics. NOTE: This does NOT modify the locations of the error's
// `previousToken` property. If that ends up being needed, it's a TODO.
function mapSparqlErrors(
  sparqlErrors: IRecognitionException[],
  tokenForOffset: IToken,
  offsetPadding: number = 0
) {
  const {
    startOffset: tokenStartOffset,
    endOffset: tokenEndOffset,
    startColumn: tokenStartColumn,
    endColumn: tokenEndColumn,
  } = tokenForOffset;

  return sparqlErrors.map((error) => {
    const { token } = error;
    const {
      startOffset: errorStartOffset,
      endOffset: errorEndOffset,
      startColumn: errorStartColumn,
      endColumn: errorEndColumn,
    } = token;

    return {
      ...error,
      token: {
        ...token,
        // error token's offsets might be set explicitly to null
        startOffset: tokenStartOffset + (errorStartOffset || 0) + offsetPadding,
        endOffset: tokenEndOffset + (errorEndOffset || 0) + offsetPadding,
        startColumn: tokenStartColumn + (errorStartColumn || 0) + offsetPadding,
        endColumn: tokenEndColumn + (errorEndColumn || 0) + offsetPadding,
        startLine: tokenForOffset.startLine,
        endLine: tokenForOffset.endLine,
      },
    };
  });
}

// Checks that the right number of arguments are supplied, accumulating errors
// otherwise.
function validateDirectiveArgumentsArity({
  allowedArgumentTokenTypes,
  directiveImage,
  errorAccumulator,
  numMinimumArguments,
  suppliedArgumentNodes,
}: ArgumentValidatorOptions) {
  const numSuppliedArguments = suppliedArgumentNodes.length;
  const numAllowedArguments = allowedArgumentTokenTypes.length;
  const validArgumentsPhrase = `valid arguments: ${allowedArgumentTokenTypes
    .map((argumentTokenType) => `\`${argumentTokenType.PATTERN}\``)
    .join(', ')}`;
  const errorTypeName = 'ArgumentArityError';

  if (numSuppliedArguments < numMinimumArguments) {
    const requiresPhrase = `requires ${numMinimumArguments} argument${
      numMinimumArguments > 1 ? 's' : ''
    }`;
    errorAccumulator.stardogGraphQlErrors.push({
      name: errorTypeName,
      message: `The ${directiveImage} directive ${requiresPhrase} (${validArgumentsPhrase})`,
    });
  } else if (numSuppliedArguments > numAllowedArguments) {
    errorAccumulator.stardogGraphQlErrors.push({
      name: errorTypeName,
      message: `Too many arguments provided to ${directiveImage} directive (${validArgumentsPhrase})`,
    });
  }
}

// Checks that the supplied argument names and values conform to the allowed
// arguments of a directive and have valid embedded SPARQL.
function validateDirectiveArgumentsNameAndValue({
  allowedArgumentTokenTypes,
  directiveImage,
  errorAccumulator,
  sparqlParser,
  suppliedArgumentNodes,
}: Partial<ArgumentValidatorOptions>) {
  const validArgumentsPhrase = `valid arguments: ${allowedArgumentTokenTypes
    .map((argumentTokenType) => `\`${argumentTokenType.PATTERN}\``)
    .join(', ')}`;

  suppliedArgumentNodes.forEach((argumentNode) => {
    const argumentNameToken = getFirstChildCstElementByRuleStack(
      ['Alias', 'Name'],
      argumentNode
    ) as IToken;

    if (!isIToken(argumentNameToken)) {
      // This should never be an actual possibility, but we'll be safe in
      // case it somehow occurs.
      return;
    }

    const argumentTokenTypeName = argumentNameToken.tokenType.name;
    const isAllowedArgument = allowedArgumentTokenTypes.some(
      (argumentTokenType) => argumentTokenType.name === argumentTokenTypeName
    );

    if (!isAllowedArgument) {
      errorAccumulator.stardogGraphQlErrors.push({
        name: 'InvalidArgumentError',
        message: `Invalid argument \`${argumentNameToken.image}\` for ${directiveImage} directive (${validArgumentsPhrase})`,
      });
    } else {
      // For allowed arguments, we provide embedded SPARQL parsing. Note
      // again that we are currently *only* handling Stardog-specific
      // directives that receive SPARQL here.
      const argumentStringValueToken = getFirstChildCstElementByRuleStack(
        ['Value', 'StringValue', 'StringValueToken'],
        argumentNode
      );

      if (!isIToken(argumentStringValueToken)) {
        // As noted above, we are currently only checking string arguments to
        // ensure they parse as valid SPARQL expressions. We bail on
        // non-strings.
        return;
      }

      const { errors } = parseSparqlExpression(
        argumentStringValueToken,
        sparqlParser
      );

      // Possible future TODO: replace the CST nodes with those returned
      // from the stardogSparqlParser, like we do for the IfClause and
      // ThenClause in the SRS Parser
      if (errors.length > 0) {
        errorAccumulator.sparqlErrors.push(
          ...mapSparqlErrors(errors, argumentStringValueToken, 1)
        );
      }
    }
  });
}

function validateDirectiveArguments({
  validatorOptions,
  validators,
}: {
  validatorOptions: ArgumentValidatorOptions;
  validators: ArgumentValidator[];
}) {
  validators.forEach((validator) => validator(validatorOptions));
}

// Delegates to the appropriate validator for a specific directive.
function validateSuppliedArgumentsForDirective(
  suppliedArgumentNodes: CstNode[],
  directiveNameToken: IToken,
  sparqlParser: StardogSparqlParser
) {
  const errorAccumulator: ErrorAccumulator = {
    stardogGraphQlErrors: [],
    sparqlErrors: [],
  };
  const allowedArgumentTokenTypes = getArgumentTokenTypesForDirectiveNameToken(
    directiveNameToken
  );
  const directiveImage = directiveNameToken.tokenType.PATTERN;

  validateDirectiveArguments({
    validatorOptions: {
      allowedArgumentTokenTypes,
      directiveImage,
      errorAccumulator,
      numMinimumArguments: 1,
      sparqlParser,
      suppliedArgumentNodes,
    },
    // We do things this way to be "forward-looking." In the future, we may
    // want to define custom validators for certain directives that have
    // special rules. In that case, we could add custom validators here based
    // on the type of the `directiveNameToken`.
    validators: [
      validateDirectiveArgumentsArity,
      validateDirectiveArgumentsNameAndValue,
    ],
  });

  return errorAccumulator;
}

// Returns a custom visitor that extends the BaseVisitor for the
// StardogGraphQlParser. When the visitor encounters any custom Stardog
// directive that can contain a SPARQL expression, it locates the expression
// and ensures that it parses as valid SPARQL (by delegating to the
// StardogSparqlParser). Similarly, the visitor applies some special checks
// (with corresponding error messages) for Stardog-specific GraphQL directives
// that are not built into the GraphQL grammar itself.
export const getStardogGraphQlVisitor = (
  BaseVisitor: new (...args: any[]) => ICstVisitor<any, any>,
  parserInstance: StardogGraphQlParser
): IStardogGraphQlVisitor => {
  const stardogSparqlParser = new StardogSparqlParser(); // for parsing embedded SPARQL;

  class StardogGraphQlVisitor extends BaseVisitor
    implements IStardogGraphQlVisitor {
    private sparqlErrors: IRecognitionException[] = [];
    private stardogGraphQlErrors: IRecognitionException[] = [];

    constructor() {
      super();
      this.validateVisitor();
    }

    visit = (...args: Parameters<IStardogGraphQlVisitor['visit']>) => {
      super.visit(...args);
      return {
        sparqlErrors: this.sparqlErrors,
        stardogGraphQlErrors: this.stardogGraphQlErrors,
      };
    };

    Directive = (ctx: CstChildrenDictionary) => {
      if (!ctx.Name || !ctx.Name[0]) {
        // Somehow we have a directive with no Name token. This shouldn't be
        // possible, but we check just to be safe (and bail otherwise).
        return;
      }

      const [directiveNameToken] = ctx.Name as IToken[];

      // NOTE: We currently only provide special handling for Stardog-specific
      // directives that accept SPARQL, so we bail early in all other cases.
      // We may want to expand this later.
      if (!isSparqlReceivingStardogDirective(directiveNameToken)) {
        return;
      }

      const suppliedArguments = getArgumentNodes(ctx);
      const accumulatedErrors = validateSuppliedArgumentsForDirective(
        suppliedArguments,
        directiveNameToken,
        stardogSparqlParser
      );

      if (accumulatedErrors.stardogGraphQlErrors.length > 0) {
        // The accumulated errors up to this point do not have stack
        // information. We add it here (only once, for performance reasons).
        const ruleStack = (parserInstance as any).getHumanReadableRuleStack();
        const ruleOccurrenceStack = (parserInstance as any)
          .RULE_OCCURRENCE_STACK;

        this.stardogGraphQlErrors.push(
          ...accumulatedErrors.stardogGraphQlErrors.map((partialError) => ({
            ...partialError,
            token: directiveNameToken,
            context: {
              ruleStack,
              ruleOccurrenceStack,
            },
            resyncedTokens: [],
          }))
        );
      }

      this.sparqlErrors.push(
        ...accumulatedErrors.sparqlErrors.map((sparqlError) => ({
          ...sparqlError,
          name: `SPARQL Error: ${sparqlError.name}`,
        }))
      );
    };

    $resetState = () => {
      this.stardogGraphQlErrors = [];
      this.sparqlErrors = [];
    };
  }

  return new StardogGraphQlVisitor();
};
