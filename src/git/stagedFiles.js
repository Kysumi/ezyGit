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
        filePath: filePath,
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
  let commitedState = '';
  try {
    commitedState = await readContentsFromHash(
      commitHash,
      gitDir,
      staged.filePath
    );
  } catch (e) {
    console.log(
      'Failed to load previously committed state. This is likely due to it being a new file',
      e
    );
  }

  return {
    filePath: staged.filePath,
    modificationType: 'added',
    afterFileState: commitedState,
    beforeFileState: staged.contents,
  };
};

/**
 * Loads the staged file contents
 *
 * @param {Array} stagedFiles
 * @param {string} gitDir
 */
export const loadStagedDetails = async (stagedFiles, gitDir, commitHash) => {
  const stagedFileContents = await getStagedFileContents(gitDir, stagedFiles);

  const linkedStagedContents = await Promise.all(
    stagedFileContents.map(async (staged) => {
      return await loadContentsFromPreviousCommit(staged, commitHash, gitDir);
    })
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
        afterFileState: stagedChanges.beforeFileState,
      };
    }

    return workingChanges;
  });

  return newWorkingChanges;
};
