import { IRecognitionException } from 'chevrotain';
export interface FileAndContents {
    name: string;
    contents: string;
}
export declare const getAllFileContents: (pathToFiles: any) => FileAndContents[];
export declare const makeExpectExtensionForParse: (parse: (document: string) => {
    errors: IRecognitionException[];
    cst: any;
}) => {
    toParseWithNoErrors: (received: FileAndContents) => {
        message: () => string;
        pass: boolean;
    };
    toParseWithErrors: (received: FileAndContents) => {
        message: () => string;
        pass: boolean;
    };
};
