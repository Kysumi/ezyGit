const git = require('isomorphic-git');
var fs = window.require('fs');

export const getCommitLog = async (filePath, branch) => {
  console.log(filePath);

  return await git.log({
    fs,
    dir: filePath,
    depth: 500,
    ref: 'restart',
  });
};
