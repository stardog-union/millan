// RDF/JS adapter: parses Turtle/TriG with millan's error-tolerant parsers
// and emits RDF/JS Data Model terms and quads whose `source` metadata points
// back into the document (offsets, line/column, and the caller-supplied
// sourceURL). The dataset is a multiset: every assertion site of a quad is
// retrievable via `dataset.occurrences(quad)`, while the DatasetCore-style
// surface (size/has/match/iteration) keeps set semantics.

import { IRecognitionException } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
import { TrigParser } from '../trig/TrigParser';
import { CstToQuadsEmitter, EmitterError, EmitterOptions } from './emitter';
import { MillanDataset } from './MillanDataset';

export * from './terms';
export { MillanDataset } from './MillanDataset';
export {
  CstToQuadsEmitter,
  EmitterError,
  EmitterOptions,
  resolveIri,
} from './emitter';

export interface RdfjsParseResult {
  dataset: MillanDataset;
  // Syntax errors from the millan parser (error-tolerant: quads are still
  // emitted for the parts of the document that parsed).
  errors: IRecognitionException[];
  semanticErrors: IRecognitionException[];
  // Errors from the CST-to-quads phase (e.g. undefined prefixes).
  emitterErrors: EmitterError[];
}

const sharedTurtleParser = new TurtleParser();
const sharedTrigParser = new TrigParser();

export const parseTurtleToRdfjs = (
  document: string,
  options: EmitterOptions = {}
): RdfjsParseResult => {
  const { cst, errors, semanticErrors } = sharedTurtleParser.parse(
    document,
    'standard'
  );
  const { dataset, errors: emitterErrors } = new CstToQuadsEmitter(
    options
  ).emitTurtleDoc(cst);
  return { dataset, errors, semanticErrors, emitterErrors };
};

export const parseTrigToRdfjs = (
  document: string,
  options: EmitterOptions = {}
): RdfjsParseResult => {
  const { cst, errors, semanticErrors } = sharedTrigParser.parse(
    document,
    'standard'
  );
  const { dataset, errors: emitterErrors } = new CstToQuadsEmitter(
    options
  ).emitTrigDoc(cst);
  return { dataset, errors, semanticErrors, emitterErrors };
};
