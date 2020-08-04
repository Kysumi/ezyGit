const git = require('isomorphic-git');
var remote = require('electron').remote;
var fs = remote.require('fs');

export const getCommitLog = async (filePath, branch) => {
  console.log(filePath);

  const result = await git.log({
    fs,
    dir: filePath,
    depth: 5,
    ref: 'main',
  });

  console.log(result);

  return result;
};
