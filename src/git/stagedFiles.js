import { readContentsFromHash } from './git';

const _ = require('lodash');
const git = require('isomorphic-git');
const remote = window.require('electron').remote;
const fs = remote.require('fs');

/**
 * Helper function that loads the contents of all of the staged files
 *
 * @param {string} gitDir
 * @param {Array} stagedFilePaths
 */
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

/**
 * Loads the contents of a file from the hash
 *
 * @param {Object} staged
 * @param {string} commitHash
 * @param {string} gitDir
 */
const loadContentsFromPreviousCommit = async (staged, commitHash, gitDir) => {
  console.log(staged.filePath);
  const commitedState = await readContentsFromHash(
    commitHash,
    gitDir,
    staged.filePath.replace('/', '')
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

/**
 * Will load the previous committed state of the file
 *
 * @param {*} stagedFileContents
 * @param {*} gitDir
 * @param {*} commitHash
 */
const mapStagedContentToUnstagedContent = async (
  stagedFileContents,
  gitDir,
  commitHash
) => {
  const mapStagedContentToUnstaged = async (staged) => {
    return await loadContentsFromPreviousCommit(staged, commitHash, gitDir);
  };

  return await Promise.all(stagedFileContents.map(mapStagedContentToUnstaged));
};

/**
 * Loads the staged file contents
 *
 * @param {string} gitDir
 * @param {Array} stagedFiles
 */
export const loadStagedDetails = async (gitDir, stagedFiles, commmitHash) => {
  const stagedFileContents = await getStagedFileContents(gitDir, stagedFiles);

  const linkedStagedContents = await mapStagedContentToUnstagedContent(
    stagedFileContents,
    gitDir,
    commmitHash
  );

  return linkedStagedContents;
};

/**
 * Will move the workingFileContents comparison from the previously
 * committed state of the file to compare against the currently staged
 * state.
 *
 * @param {Array} stagedFileContents
 * @param {Array} workingFileContents
 *
 * @returns {Array}
 */
export const mapWorkingChangesToStagedChanges = (
  stagedFileContents,
  workingFileContents
) => {
  const newWorkingChanges = workingFileContents.map((workingChanges) => {
    const stagedChanges = _.find(stagedFileContents, {
      filePath: workingChanges.filePath,
    });

    if (stagedChanges) {
      return {
        ...workingChanges,
        aFileContents: stagedChanges.bFileContents,
        aHash: stagedFileContents.bHash,
      };
    }

    return workingChanges;
  });

  return newWorkingChanges;
};
