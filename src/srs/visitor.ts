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
    IfClause = (ctx: ITokensMap) => {
      const { GroupGraphPattern } = ctx;

      this.$storePlaceholderTokenReplacement({
        tokenStore: this.groupGraphPatterns,
        originalTokenContext: GroupGraphPattern,
        subParserRule: this.sparqlParser.parseGroupGraphPattern.bind(
          this.sparqlParser
        ),
      });
    };

    // Get and store the SPARQL `TriplesBlock` that should replace the
    // SRS placeholder `TriplesBlock` token inside of an SRS `ThenClause`.
    ThenClause = (ctx: ITokensMap) => {
      const { TriplesBlock } = ctx;

      this.$storePlaceholderTokenReplacement({
        tokenStore: this.triplesBlocks,
        originalTokenContext: TriplesBlock,
        subParserRule: this.sparqlParser.parseTriplesBlock.bind(
          this.sparqlParser
        ),
      });
    };

    // Utility methods ('$' prefix is necessary to prevent chevrotain's
    // `validateVisitor` method from complaining that these are not grammar
    // rules):
    private $storePlaceholderTokenReplacement = ({
      tokenStore,
      originalTokenContext = [],
      subParserRule,
    }: {
      tokenStore: SparqlSrsVisitorItem[];
      originalTokenContext: IToken[];
      subParserRule: (
        document: string
      ) => { errors: IRecognitionException[]; cst: any };
    }) => {
      const [originalToken] = originalTokenContext;

      if (!originalToken || typeof originalToken.image !== 'string') {
        return;
      }

      const replacement = this.$getPlaceholderTokenReplacement(
        originalToken,
        subParserRule
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
      ) => { errors: IRecognitionException[]; cst: any }
    ) => {
      // Because we are replacing tokens by delegating the parsing of parts
      // of the original document to sub-parsers, we add some empty padding to
      // the part that is passed to the sub-parser, where the amount of padding
      // matches the start line and offset of the token we are replacing. This
      // ensures that all tokens have the right positions in the resulting CST
      // (otherwise, the sub-parsers assume that the text starts at offset 0).
      const { image, startOffset, startLine, startColumn } = originalToken;
      let frontPadding = '';

      for (let line = 1; line < (startLine || 1); line++) {
        frontPadding += '\n';
      }

      for (let column = 1; column < (startColumn || 1); column++) {
        frontPadding += ' ';
      }

      if (frontPadding.length < startOffset) {
        frontPadding = `${' '.repeat(
          startOffset - frontPadding.length
        )}${frontPadding}`;
      }

      return subParserRule(`${frontPadding}${image}`);
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
