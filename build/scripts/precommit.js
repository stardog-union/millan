'use strict';
const path = require('path');
const { exec } = require('child_process');

const getFiles = "git diff --cached --name-only --diff-filter=ACM | grep -E '\.tsx?$'";
const currentDir = process.cwd();
const repoRoot = path.resolve(__dirname, '..', '..');
const prettierBin = path.join(repoRoot, 'node_modules', '.bin');

process.chdir(repoRoot);

exec(getFiles, (err, stdout) => {
  if (err) {
    return;
  }

  // Get each relevant filename, filtering out any empty lines in the stdout.
  const changedFileNames = stdout.split('\n').filter((fileName) => fileName.trim());

  // Map each filename to a promise that resolves once the file is prettified
  // and re-staged.
  const prettierPromises = changedFileNames.map((fileName) => new Promise((resolve) => {
    exec(`${prettierBin}/prettier --write ${fileName}`, (err) => {
      if (err) {
        console.log(err);
        resolve(); // just noop here for now
        return;
      }
      exec(`git add ${fileName}`, resolve);
    });
  }));

  // After all promises have resolved, return to the original directory.
  Promise.all(prettierPromises).then((vals) => process.chdir(currentDir));
});
