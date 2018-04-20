import { SparqlParser } from './expressions';

const parser = new SparqlParser([]);

export const parse = (document: string) => {
  const parseResults = parser.parse(document);

  return {
    cst: parseResults,
    parseErrors: parser.errors,
    // tokenMap: parser.getTokensMap(),
  };
};
