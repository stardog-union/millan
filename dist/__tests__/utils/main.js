"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
exports.getAllFileContents = (pathToFiles) => {
    const files = fs_1.readdirSync(pathToFiles);
    const contentsOfAllFiles = files.map((filename) => ({
        name: path_1.join(pathToFiles, filename),
        contents: fs_1.readFileSync(path_1.join(pathToFiles, filename), 'utf8'),
    }));
    return contentsOfAllFiles;
};
exports.makeExpectExtensionForParse = (parse) => ({
    toParseWithNoErrors: (received) => {
        const result = parse(received.contents);
        const pass = Boolean(!result.errors.length);
        const message = () => pass
            ? `expected "${received.contents}"\nto parse with no errors`
            : `expected "${received.contents}" from file: "${received.name}"\nto parse with no errors, instead received:\n${JSON.stringify(result.errors, null, 2)}`;
        return {
            message,
            pass,
        };
    },
    toParseWithErrors: (received) => {
        const result = parse(received.contents);
        const pass = Boolean(result.errors.length);
        const message = () => `expected parsing\n"${received.contents}"\nto reveal errors`;
        return {
            message,
            pass,
        };
    },
});
