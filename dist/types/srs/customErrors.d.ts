import { ITraverseContext } from '../helpers/cst';
import { CstElement, IRecognitionException } from 'chevrotain';
import { TurtleParser } from '../turtle/TurtleParser';
export declare function addIfClauseErrorsToErrors({ cst, namespacesMap, fullCtx, errors, semanticErrors, }: {
    cst: CstElement;
    namespacesMap: TurtleParser['namespacesMap'];
    fullCtx: ITraverseContext;
    errors: IRecognitionException[];
    semanticErrors: IRecognitionException[];
}): {
    errors: IRecognitionException[];
    semanticErrors: IRecognitionException[];
};
export declare function addThenClauseErrorsToErrors({ cst, namespacesMap, errors, semanticErrors, fullCtx, }: {
    errors: IRecognitionException[];
    semanticErrors: IRecognitionException[];
    fullCtx: ITraverseContext;
    namespacesMap: TurtleParser['namespacesMap'];
    cst: CstElement;
}): {
    errors: IRecognitionException[];
    semanticErrors: IRecognitionException[];
};
