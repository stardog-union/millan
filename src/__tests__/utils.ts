import { readdir, readFile } from 'fs';

export const readDirAsync = (pathName) =>
  new Promise<string[]>((resolve, reject) => {
    readdir(pathName, (err, files) => {
      if (err) reject();
      resolve(files);
    });
  });

export const readFileAsync = (filePath) =>
  new Promise<string>((resolve, reject) => {
    readFile(filePath, { encoding: 'utf-8' }, (err, document) => {
      if (err) reject();
      resolve(document);
    });
  });
