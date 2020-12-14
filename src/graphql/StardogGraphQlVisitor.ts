import {
  IToken,
  IRecognitionException,
  ICstVisitor,
  CstNode,
  tokenMatcher,
  CstChildrenDictionary,
  TokenType,
} from 'chevrotain';
import { StardogSparqlParser } from '../sparql/StardogSparqlParser';
import { CstNodeMap } from 'helpers/chevrotain/types';
import { isCstNode } from 'helpers/chevrotain/cst';
const { stardogGraphQlTokenMap } = require('./tokens');

export type StardogSparqlParserResult = ReturnType<
  StardogSparqlParser['parse']
>;

export interface IStardogGraphQlVisitor
  extends ICstVisitor<any, Pick<StardogSparqlParserResult, 'errors'>> {
  Directive(ctx: CstChildrenDictionary): void;
  $parseSparqlExpression(
    stringValueToken: IToken
  ): ReturnType<StardogSparqlParser['parse']>;
  $resetState(): void;
}

function getValueNodeForStardogDirective(
  directive: CstChildrenDictionary,
  argumentTokenType: TokenType
) {
  if (!directive.Arguments) {
    return;
  }

  const [directiveArguments] = directive.Arguments;

  if (!isCstNode(directiveArguments) || !directiveArguments.children.Argument) {
    return;
  }

  const directiveArgumentNode = directiveArguments.children.Argument.find(
    (argumentNode: CstNode) => {
      if (!argumentNode.children.Alias) {
        return false;
      }

      const [argumentAlias] = argumentNode.children.Alias;

      if (!isCstNode(argumentAlias) || !argumentAlias.children.Name) {
        return false;
      }

      const [aliasNameToken] = argumentAlias.children.Name;
      return tokenMatcher(aliasNameToken as IToken, argumentTokenType);
    }
  );

  if (
    !isCstNode(directiveArgumentNode) ||
    !directiveArgumentNode.children.Value
  ) {
    return;
  }

  return directiveArgumentNode.children.Value[0] as CstNode;
}

// Returns a custom visitor that extends the BaseVisitor for the
// StardogGraphQlParser. When the visitor encounters any custom Stardog
// directive that can contain a SPARQL expression, it locates the expression
// and ensures that it parses as valid SPARQL (by delegating to the
// StardogSparqlParser).
export const getStardogGraphQlVisitor = (
  BaseVisitor: new (...args: any[]) => ICstVisitor<any, any>
): IStardogGraphQlVisitor => {
  class StardogGraphQlVisitor extends BaseVisitor
    implements IStardogGraphQlVisitor {
    private stardogSparqlParser: StardogSparqlParser;
    private sparqlErrors: IRecognitionException[] = [];

    constructor() {
      super();
      this.stardogSparqlParser = new StardogSparqlParser();
      this.validateVisitor();
    }

    visit = (...args: Parameters<IStardogGraphQlVisitor['visit']>) => {
      super.visit(...args);
      return {
        errors: this.sparqlErrors.map((error) => ({
          ...error,
          name: `SPARQL Error: ${error.name}`,
        })),
      };
    };

    Directive = (ctx: CstChildrenDictionary) => {
      if (!ctx.Name) {
        return;
      }

      const nameToken = ctx.Name[0] as IToken;
      let directiveArgumentTokenType: TokenType;

      if (tokenMatcher(nameToken, stardogGraphQlTokenMap.BindDirectiveToken)) {
        directiveArgumentTokenType = stardogGraphQlTokenMap.ToArgumentToken;
      } else if (
        tokenMatcher(
          nameToken,
          stardogGraphQlTokenMap.ConditionalStardogDirective
        )
      ) {
        directiveArgumentTokenType = stardogGraphQlTokenMap.IfArgumentToken;
      }

      if (!directiveArgumentTokenType) {
        return;
      }

      const directiveValueNode = getValueNodeForStardogDirective(
        ctx,
        directiveArgumentTokenType
      );

      if (!isCstNode(directiveValueNode)) {
        return;
      }

      this.$accumulateBindDirectiveSparqlErrors(
        directiveValueNode.children as CstNodeMap
      );
    };

    private $accumulateBindDirectiveSparqlErrors = (ctx: CstNodeMap) => {
      if (!ctx.StringValue) {
        // This directive uses a variable for the expression, rather than a
        // string, so we cannot parse the expression.
        // Possible TODO in future: locate the matching variable and parse it?
        return;
      }

      const [stringValueNode] = ctx.StringValue;

      if (!stringValueNode.children.StringValueToken) {
        // A bind directive can be identified at times by the parser even when
        // there is no StringValueToken yet, due to error recovery.
        return;
      }

      const [stringValueToken] = stringValueNode.children
        .StringValueToken as IToken[];
      const { errors } = this.$parseSparqlExpression(stringValueToken);

      // Possible future TODO: replace the CST nodes with thoe returned from
      // the stardogSparqlParser, like we do for the IfClause and ThenClause
      // in the SRS Parser
      if (errors.length > 0) {
        this.sparqlErrors.push(...this.$mapErrors(errors, stringValueToken, 1));
      }
    };

    // Make the SPARQL errors have proper locations for use in error
    // diagnostics. NOTE: This does NOT modify the locations of the error's
    // `previousToken` property. If that ends up being needed, it's a TODO.
    private $mapErrors = (
      errors: IRecognitionException[],
      tokenForOffset: IToken,
      offsetPadding: number = 0
    ) => {
      const {
        startOffset: tokenStartOffset,
        endOffset: tokenEndOffset,
        startColumn: tokenStartColumn,
        endColumn: tokenEndColumn,
      } = tokenForOffset;

      return errors.map((error) => {
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
            startOffset:
              tokenStartOffset + (errorStartOffset || 0) + offsetPadding,
            endOffset: tokenEndOffset + (errorEndOffset || 0) + offsetPadding,
            startColumn:
              tokenStartColumn + (errorStartColumn || 0) + offsetPadding,
            endColumn: tokenEndColumn + (errorEndColumn || 0) + offsetPadding,
            startLine: tokenForOffset.startLine,
            endLine: tokenForOffset.endLine,
          },
        };
      });
    };

    $parseSparqlExpression = (stringValueToken: IToken) => {
      const innerExpressionImage = stringValueToken.image.slice(1, -1); // remove quotes
      return this.stardogSparqlParser.parse(
        innerExpressionImage,
        this.stardogSparqlParser.Expression
      );
    };

    $resetState = () => {
      this.sparqlErrors = [];
    };
  }

  return new StardogGraphQlVisitor();
};
