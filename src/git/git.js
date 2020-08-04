const git = require('isomorphic-git');
var fs = window.require('fs');

export const getCommitLog = (filePath, branch) => {
  console.log(filePath);

  return git.log({
    fs,
    dir: filePath,
    depth: 5,
    ref: 'main',
  });
};
