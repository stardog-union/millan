import {
  IToken,
  IRecognitionException,
  ICstVisitor,
  CstNode,
} from 'chevrotain';
import { ITokensMap } from '../helpers/chevrotain/types';
import { StardogSparqlParser } from '../sparql';

interface SparqlSrsVisitorItem {
  parseResult: {
    errors: IRecognitionException[];
    cst: any;
  };
  originalToken: IToken;
}

export interface ISparqlSrsVisitor extends ICstVisitor<any, any> {
  IfClause(ctx: ITokensMap, cstInputTokens: IToken[]): void;
  ThenClause(ctx: ITokensMap, cstInputTokens: IToken[]): void;
  $getGroupGraphPatterns(): SparqlSrsVisitorItem[];
  $getTriplesBlocks(): SparqlSrsVisitorItem[];
  $resetState(): void;
}

// Returns a custom visitor that extends the BaseVisitor for the SRS parser.
// When the visitor encounters an SRS `IfClause` or an SRS `ThenClause`, it
// delegates parsing of the block to the existing SPARQL parser's relevant
// sub-rule (GroupGraphPattern or TriplesBlock).
export const getSparqlSrsVisitor = (
  BaseVisitor: new (...args: any[]) => ICstVisitor<any, any>
): ISparqlSrsVisitor => {
  class SparqlSrsVisitor extends BaseVisitor implements ISparqlSrsVisitor {
    private sparqlParser: StardogSparqlParser;
    private groupGraphPatterns: SparqlSrsVisitorItem[] = [];
    private triplesBlocks: SparqlSrsVisitorItem[] = [];

    constructor() {
      super();
      this.sparqlParser = new StardogSparqlParser();
      this.validateVisitor();
    }

    // Get and store the SPARQL `GroupGraphPattern` that should replace the
    // SRS placeholder `GroupGraphPattern` token inside of an SRS `IfClause`.
    IfClause = (ctx: ITokensMap, cstInputTokens: IToken[]) => {
      const { GroupGraphPattern } = ctx;

      this.$storePlaceholderTokenReplacement({
        tokenStore: this.groupGraphPatterns,
        originalTokenContext: GroupGraphPattern,
        subParserRule: this.sparqlParser.parseGroupGraphPattern.bind(
          this.sparqlParser
        ),
        cstInputTokens,
      });
    };

    // Get and store the SPARQL `TriplesBlock` that should replace the
    // SRS placeholder `TriplesBlock` token inside of an SRS `ThenClause`.
    ThenClause = (ctx: ITokensMap, cstInputTokens: IToken[]) => {
      const { TriplesBlock } = ctx;

      this.$storePlaceholderTokenReplacement({
        tokenStore: this.triplesBlocks,
        originalTokenContext: TriplesBlock,
        subParserRule: this.sparqlParser.parseTriplesBlock.bind(
          this.sparqlParser
        ),
        cstInputTokens,
      });
    };

    // Utility methods ('$' prefix is necessary to prevent chevrotain's
    // `validateVisitor` method from complaining that these are not grammar
    // rules):
    private $storePlaceholderTokenReplacement = ({
      tokenStore,
      originalTokenContext = [],
      subParserRule,
      cstInputTokens,
      stripWrappers,
    }: {
      tokenStore: SparqlSrsVisitorItem[];
      originalTokenContext: IToken[];
      subParserRule: (
        document: string
      ) => { errors: IRecognitionException[]; cst: any };
      cstInputTokens: IToken[];
      stripWrappers?: boolean;
    }) => {
      const [originalToken] = originalTokenContext;

      if (!originalToken || typeof originalToken.image !== 'string') {
        return;
      }

      const replacement = this.$getPlaceholderTokenReplacement(
        originalToken,
        subParserRule,
        cstInputTokens,
        stripWrappers
      );

      tokenStore.push({
        parseResult: replacement,
        originalToken,
      });
    };

    private $getPlaceholderTokenReplacement = (
      originalToken: IToken,
      subParserRule: (
        document: string
      ) => { errors: IRecognitionException[]; cst: any },
      cstInputTokens: IToken[],
      stripWrappers = false
    ) => {
      // Because we are replacing tokens by delegating the parsing of parts
      // of the original document to sub-parsers, we add some empty padding to
      // the part that is passed to the sub-parser, where the amount of padding
      // matches the start line and offset of the token we are replacing. This
      // ensures that all tokens have the right positions in the resulting CST
      // (otherwise, the sub-parsers assume that the text starts at offset 0).
      const { image } = originalToken;
      let frontPadding = '';
      let latestEndOffset = 0;
      let latestEndLine = 0;

      // Traditional `for` loop because we need to `break`.
      for (let i = 0; i < cstInputTokens.length; i++) {
        const token = cstInputTokens[i];

        if (i > 0) {
          // Account for whitespace between this token and the previous one.
          const linesBetweenTokens = token.startLine - latestEndLine;
          const untokenizedSpaceBetweenTokens =
            token.startOffset - 1 - latestEndOffset - linesBetweenTokens;

          if (linesBetweenTokens > 0) {
            frontPadding += '\n'.repeat(linesBetweenTokens - 1);
            frontPadding +=
              ' '.repeat(Math.max(untokenizedSpaceBetweenTokens, 0)) + '\n';
          } else {
            frontPadding += ' '.repeat(
              Math.max(untokenizedSpaceBetweenTokens, 0)
            );
          }
        }

        if (token === originalToken) {
          break;
        }

        // We haven't hit the token we're replacing yet, so we need to continue
        // accumulating padding by adding the newlines _inside_ the current
        // token, and replacing all non-newline characters inside the current
        // token with spaces.
        const newlinesInToken = token.image.split('\n');
        newlinesInToken.forEach((line, idx) => {
          if (idx > 0) {
            frontPadding += '\n';
          }
          frontPadding += ' '.repeat(line.length);
        });

        // Track where the current token ends, in case the next token starts
        // much later (meaning that there was untokenized stuff (e.g.,
        // whitespace) in between) that needs to be accounted for.
        latestEndOffset = token.endOffset;
        latestEndLine = token.endLine;
      }

      // Finally, if we're stripping the wrappers (e.g., braces), replace them
      // with whitespace.
      const parseImage = stripWrappers ? ` ${image.slice(1, -1)} ` : image;
      return subParserRule(`${frontPadding}${parseImage}`);
    };

    $getGroupGraphPatterns = () => this.groupGraphPatterns;

    $getTriplesBlocks = () => this.triplesBlocks;

    $resetState = () => {
      this.groupGraphPatterns = [];
      this.triplesBlocks = [];
    };
  }

  return new SparqlSrsVisitor();
};

export function reduceVisitorItemErrors(
  acc: IRecognitionException[],
  item: SparqlSrsVisitorItem
) {
  return acc.concat(item.parseResult.errors);
}

// The SRS cst contains placeholder tokens for unparsed blocks of SPARQL
// inside of an SRS `IfClause` or `ThenClause`. This method swaps out those
// placeholders with the actual SPARQL CST created by the SparqlSrsVisitor.
export function findAndSwapPlaceholders(
  node: IToken,
  parentNode: CstNode,
  visitorItems: SparqlSrsVisitorItem[],
  key: string
) {
  const matchingVisitorItem = visitorItems.find(
    (visitorItem: SparqlSrsVisitorItem) => visitorItem.originalToken === node
  );

  if (matchingVisitorItem) {
    parentNode.children[key] = [matchingVisitorItem.parseResult.cst];
  }

  return matchingVisitorItem;
}
