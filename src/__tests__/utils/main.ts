import { BaseSparqlParser } from '../../';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
// @ts-ignore needed to import BaseSparqlParser["parse"] below
import { IRecognitionException } from 'chevrotain';

export interface FileAndContents {
  name: string;
  contents: string;
}

export const getAllFileContents = (pathToFiles): FileAndContents[] => {
  const files = readdirSync(pathToFiles);
  const contentsOfAllFiles = files.map((filename) => ({
    name: join(pathToFiles, filename),
    contents: readFileSync(join(pathToFiles, filename), 'utf8'),
  }));
  return contentsOfAllFiles;
};

export const makeExpectExtensionForParse = (
  parse: BaseSparqlParser['parse']
) => ({
  toParseWithNoErrors: (received: FileAndContents) => {
    const result = parse(received.contents);
    const pass = Boolean(!result.errors.length);
    const message = () =>
      pass
        ? `expected "${received.contents}"\nto parse with no errors`
        : `expected "${received.contents}" from file: "${
            received.name
          }"\nto parse with no errors, instead received:\n${JSON.stringify(
            result.errors,
            null,
            2
          )}`;

    return {
      message,
      pass,
    };
  },
  toParseWithErrors: (received: FileAndContents) => {
    const result = parse(received.contents);
    const pass = Boolean(result.errors.length);
    const message = () =>
      `expected parsing\n"${received.contents}"\nto reveal errors`;
    return {
      message,
      pass,
    };
  },
});
