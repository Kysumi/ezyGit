import {
  loadStagedDetails,
  mapWorkingChangesToStagedChanges,
} from './stagedFiles';
import { loadUntrackedFilesContents } from './untrackedFiles';

const git = require('isomorphic-git');
const remote = window.require('electron').remote;
const fs = remote.require('fs');

/**
 * Returns the previous commits from the provided branch
 *
 * @param {string} filePath
 * @param {string} branch
 */
export const getCommitLog = async (filePath, branch, depth = 50) => {
  return await git.log({
    fs,
    dir: filePath,
    depth: depth,
    ref: branch,
  });
};

/**
 * Returns the string name of the current checked out branch
 *
 * @param {string} filePath
 * @returns {Promise<string|void>}
 */
export const getCurrentBranch = async (filePath) => {
  return await git.currentBranch({
    fs,
    dir: filePath,
    fullname: false,
  });
};

// The HEAD_INDEX status is either absent (0) or present (1).
// The WORKDIR_INDEX status is either absent (0), identical to HEAD_INDEX (1), or different from HEAD_INDEX (2).
// The STAGE_INDEX status is either absent (0), identical to HEAD_INDEX (1), identical to WORKDIR_INDEX (2), or different from WORKDIR_INDEX (3).
export const FILE_INDEX = 0;
export const HEAD_INDEX = 1;
export const WORKDIR_INDEX = 2;
export const STAGE_INDEX = 3;

const getWorkingFilePaths = (matrix) => {
  const filePath = matrix
    .filter((row) => row[WORKDIR_INDEX] !== row[STAGE_INDEX])
    .map((row) => row[FILE_INDEX]);

  return filePath;
};

const getUntrackedFilePaths = (matrix) => {
  const filePath = matrix
    // Filtering to only files that are not in the HEAD_INDEX and not staged
    .filter((row) => row[HEAD_INDEX] === 0 && row[STAGE_INDEX] === 0)
    .map((row) => row[FILE_INDEX]);

  return filePath;
};

const getStagedFilePaths = (matrix) => {
  const filePath = matrix
    .filter((row) => row[STAGE_INDEX] === 3 || row[STAGE_INDEX] === 2)
    .map((row) => row[FILE_INDEX]);

  return filePath;
};

/**
 * Loads the contents of the files from the directory and will
 * link it against the previously committed version if it is present
 *
 * @param {Array} filePaths
 * @param {string} gitDir
 * @param {string} commitHash
 */
const loadWorkingFileContents = async (filePaths, gitDir, commitHash) => {
  const fileDiffs = await Promise.all(
    filePaths.map(async (filePath) => {
      const newFileChanges = await loadWorkingFileChanges(gitDir, filePath);

      // Because we are looking at pending changes we won't have a commit hash.
      // So we will use the first hash from the store
      let commitedState = '';
      try {
        commitedState = await readContentsFromHash(
          commitHash,
          gitDir,
          filePath
        );
      } catch {
        console.log(
          `failed to load the commited verions of ${filePath}. This is likely because it was committed in the previous commit`
        );
      }

      return {
        filePath: `/${filePath}`,
        modificationType: 'added',
        afterFileState: commitedState,
        beforeFileState: newFileChanges,
      };
    })
  );

  return fileDiffs;
};

/**
 * Loads the contents of the untracked files in the git directory
 *
 * @param {Array} matrix
 * @param {string} gitDir
 */
const getUntrackedFiles = async (matrix, gitDir) => {
  const filePaths = getUntrackedFilePaths(matrix);

  const untrackedFileContents = await loadUntrackedFilesContents(
    filePaths,
    gitDir
  );

  return untrackedFileContents;
};

/**
 * Loads the content of the "working" changes in the git directory
 *
 * @param {Array} matrix
 * @param {string} gitDir
 * @param {string} commitHash
 */
const getWorkingFiles = async (matrix, gitDir, commitHash) => {
  const filePaths = getWorkingFilePaths(matrix);

  // Removing duplicate entries from untracked files as they are picked up by
  // isomorphic-git as a working change as well
  const removedDuplicates = filePaths.filter(
    (filePath) => !getUntrackedFilePaths(matrix).includes(filePath)
  );

  const workingFileContents = await loadWorkingFileContents(
    removedDuplicates,
    gitDir,
    commitHash
  );

  return workingFileContents;
};

/**
 * Loads the file contents and matches up the file states agaisnt eachother
 *
 * @param {string} gitDir
 * @param {string} commitHash
 */
export const getGitStatus = async (gitDir, commitHash) => {
  const matrix = await git.statusMatrix({ dir: gitDir, fs });

  const stagedFiles = await getStagedFilePaths(matrix);
  const workingFileContents = await getWorkingFiles(matrix, gitDir, commitHash);

  const stagedFileContents = await loadStagedDetails(
    gitDir,
    stagedFiles,
    commitHash
  );

  const result = {
    unstagedFileContents: mapWorkingChangesToStagedChanges(
      stagedFileContents,
      workingFileContents
    ),
    untrackedFileContents: await getUntrackedFiles(matrix, gitDir),
    stagedFileContents,
  };

  return result;
};

/**
 * Reads the contents of a file from the OID hash or from a combonation
 * of the filePath and commit hash
 *
 * @param {string} hash
 * @param {string} gitDir
 * @param {string|null} filePath
 *
 * @return {Promise<string>}
 */
export const readContentsFromHash = async (hash, gitDir, filePath = null) => {
  let config = {
    fs,
    dir: gitDir,
    oid: hash,
  };

  if (filePath) {
    config = {
      ...config,
      filepath: filePath,
    };
  }

  const { blob } = await git.readBlob(config);

  return new TextDecoder().decode(blob);
};

/**
 * Reads the contents of a file at the filePath provided
 *
 * @param {string} gitDir The filePath to the repo
 * @param {string} filePath The path to the file relative to the gitDir
 *
 * @return {Promise<string>}
 */
export const loadWorkingFileChanges = async (gitDir, filePath) => {
  const contents = fs.readFileSync(gitDir + '/' + filePath);

  return new TextDecoder().decode(contents);
};
