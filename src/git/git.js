const git = require('isomorphic-git');
var fs = window.require('fs');

export const getCommitLog = async (filePath, branch) => {
  return await git.log({
    fs,
    dir: filePath,
    depth: 500,
    ref: branch,
  });
};

export const getCurrentBranch = async (filePath) => {
  return await git.currentBranch({
    fs,
    dir: filePath,
    fullname: false,
  });
};
