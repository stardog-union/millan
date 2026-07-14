import { IRecognitionException } from 'chevrotain';
import { EmitterError, EmitterOptions } from './emitter';
import { MillanDataset } from './MillanDataset';
export * from './terms';
export { MillanDataset } from './MillanDataset';
export { CstToQuadsEmitter, EmitterError, EmitterOptions, resolveIri, } from './emitter';
export interface RdfjsParseResult {
    dataset: MillanDataset;
    errors: IRecognitionException[];
    semanticErrors: IRecognitionException[];
    emitterErrors: EmitterError[];
}
export declare const parseTurtleToRdfjs: (document: string, options?: EmitterOptions) => RdfjsParseResult;
export declare const parseTrigToRdfjs: (document: string, options?: EmitterOptions) => RdfjsParseResult;
