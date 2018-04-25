import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { SparqlParser } from '../../SparqlParser';

const { parse } = new SparqlParser();

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
export const toParseWithNoErrors = (received: FileAndContents) => {
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
};
export const toParseWithErrors = (received: FileAndContents) => {
  const result = parse(received.contents);
  const pass = Boolean(result.errors.length);
  const message = () =>
    `expected parsing\n"${received.contents}"\nto reveal errors`;
  return {
    message,
    pass,
  };
};
