import { readContentsFromHash } from './git';

const _ = require('lodash');
const git = require('isomorphic-git');
const remote = window.require('electron').remote;
const fs = remote.require('fs');

const getStagedFileContents = async (gitDir, stagedFilePaths) => {
  const map = async (filePath, [A]) => {
    if (stagedFilePaths.includes(filePath)) {
      const contents = await readContentsFromHash(await A.oid(), gitDir);

      return {
        filePath: `/${filePath}`,
        contents,
      };
    }
  };

  return await git.walk({
    fs,
    dir: gitDir,
    trees: [git.STAGE()],
    map,
  });
};

const loadContentsFromPreviousCommit = async (staged, commitHash, gitDir) => {
  const commitedState = await readContentsFromHash(
    commitHash,
    gitDir,
    staged.filePath
  );

  return {
    filePath: staged.filePath,
    modificationType: 'added',
    aHash: '',
    bHash: '',
    aFileContents: commitedState,
    bFileContents: staged.contents,
  };
};

const mapStagedContentToUnstagedContent = async (
  stagedFileContents,
  unstagedFileContents,
  gitDir,
  commitHash
) => {
  const mapStagedContentToUnstaged = async (staged) => {
    //{ filePath, contents }
    const unstagedFile = _.find(unstagedFileContents, {
      filePath: staged.filePath,
    });

    if (unstagedFile) {
      return {
        filePath: staged.filePath,
        modificationType: 'added',
        aHash: '',
        bHash: '',
        aFileContents: unstagedFile.aFileContents,
        bFileContents: staged.contents,
      };
    }

    return await loadContentsFromPreviousCommit(staged, commitHash, gitDir);
  };

  return await Promise.all(stagedFileContents.map(mapStagedContentToUnstaged));
};

export const loadStagedDetails = async (
  gitDir,
  stagedFiles,
  unstagedFileContents
) => {
  const stagedFileContents = await getStagedFileContents(gitDir, stagedFiles);

  const linkedStagedContents = await mapStagedContentToUnstagedContent(
    stagedFileContents,
    unstagedFileContents,
    gitDir
  );

  return linkedStagedContents;
};
