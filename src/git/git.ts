import {
  loadStagedDetails,
  mapWorkingChangesToStagedChanges,
} from './stagedFiles';
import { loadUntrackedFilesContents } from './untrackedFiles';
import git, { StatusRow } from 'isomorphic-git';
import { CommitDiff, ModificationType } from '../components/diffList/type';
import { isLargeFile } from '../helper/lineCount';
import * as ini from 'ini';
import http from 'isomorphic-git/http/node';
import * as fs from 'fs';
const _ = require('lodash');

/**
 * Returns the previous commits from the provided branch
 *
 * @param {string} gitDir
 * @param {string} branch
 */
export const getCommitLog = async (
  gitDir: string,
  branch: string,
  depth = 50
) => {
  return await git.log({
    fs,
    dir: gitDir,
    depth: depth,
    ref: branch,
  });
};

/**
 * Returns the string name of the current checked out branch
 *
 * @param {string} gitDir
 * @returns {Promise<string|void>}
 */
export const getCurrentBranch = async (gitDir: string) => {
  return await git.currentBranch({
    fs,
    dir: gitDir,
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

/**
 * Creates an array of the filePaths to files that currently have
 * uncommitted changes in them
 *
 * @param  {Array<StatusRow>}
 * @return {Array}
 */
const getWorkingFilePaths = (matrix: Array<StatusRow>) => {
  const filePath = matrix
    .filter((row: any) => row[WORKDIR_INDEX] !== row[STAGE_INDEX])
    .map((row: any) => row[FILE_INDEX]);

  return filePath;
};

/**
 * Creates an array of the filePaths to files that are currently
 * untracked
 *
 * @param  {Array<StatusRow>}
 * @return {Array}
 */
const getUntrackedFilePaths = (matrix: Array<StatusRow>) => {
  const filePath = matrix
    // Filtering to only files that are not in the HEAD_INDEX and not staged
    .filter((row: StatusRow) => row[HEAD_INDEX] === 0 && row[STAGE_INDEX] === 0)
    .map((row: StatusRow) => row[FILE_INDEX]);

  return filePath;
};

/**
 * Creates an array of the filePaths to files that are currently
 * staged
 *
 * @param  {Array<StatusRow>} matrix
 *
 * @return {Array}
 */
const getStagedFilePaths = (matrix: Array<StatusRow>) => {
  const filePath = matrix
    .filter(
      (row: StatusRow) => row[STAGE_INDEX] === 3 || row[STAGE_INDEX] === 2
    )
    .map((row: StatusRow) => row[FILE_INDEX]);

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
const loadWorkingFileContents = async (
  filePaths: Array<string>,
  gitDir: string,
  commitHash: string
): Promise<Array<CommitDiff>> => {
  const fileDiffs = await Promise.all(
    filePaths.map(
      async (filePath): Promise<CommitDiff> => {
        const newFileChanges = await loadFileContentsFromPath(gitDir, filePath);

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
          filePath: filePath,
          modificationType: ModificationType.added,
          afterFileState: commitedState,
          beforeFileState: newFileChanges,
          largeFileDiff: isLargeFile(newFileChanges),
        };
      }
    )
  );

  return fileDiffs;
};

/**
 * Will stage the file AKA add into the git index.
 *
 * @param  {string} gitDir
 * @param  {string} filePath
 *
 * @return {Promise<boolean>}
 */
export const stageFile = async (
  gitDir: string,
  filePath: string
): Promise<boolean> => {
  try {
    await git.add({ fs, dir: gitDir, filepath: filePath });
    return true;
  } catch (error) {
    // Dealing with a edge case and potential bug in isomorphic-git when attempting to stage a
    // removed file it will throw a "NotFoundError" exception
    // https://github.com/isomorphic-git/isomorphic-git/issues/1099
    if (error.code === 'NotFoundError') {
      await git.remove({ fs, dir: gitDir, filepath: filePath });
      return true;
    }

    console.log(`Something went wrong trying to stage ${filePath}`, error);
    return false;
  }
};

/**
 * Will commit the currently staged changes in the repo with the provided message
 */
export const commitChanges = async (gitDir: string, message: string) => {
  const author = await getGitAuthor(gitDir);
  await git.commit({ fs, dir: gitDir, message, author: author });
};

export const pullChanges = async (
  gitDir: string,
  fastForwardOnly: boolean = true
): Promise<void> => {
  const author = await getGitAuthor(gitDir);
  await git.pull({
    fs,
    http: http,
    dir: gitDir,
    singleBranch: true,
    fastForwardOnly,
    author: author,
  });
};

export const pushChanges = async (gitDir: string) => {
  await git.push({
    fs,
    http: http,
    dir: gitDir,
  });
};

interface Author {
  name?: string;
  email?: string;
  timestamp?: number;
  timezoneOffset?: number;
}

const getHomeDirectory = () => {
  return require('os').homedir();
};

const getGitConfig = async (gitDir: string, attribute: string) => {
  const localSettings = await loadFileContentsFromPath(
    gitDir + '/.git/',
    'config'
  );
  const globalSettings = await loadFileContentsFromPath(
    getHomeDirectory(),
    '.gitconfig'
  );

  if (globalSettings === '' && localSettings === '') {
    throw new Error(
      `Could not find .gitconfig in home DIR: ${getHomeDirectory()} or in local git repo`
    );
  }

  const localIni = ini.parse(localSettings);
  const globalIni = ini.parse(globalSettings);

  if (localIni[attribute]) {
    return localIni;
  }

  if (globalIni[attribute]) {
    return globalIni;
  }

  throw new Error(
    `Neither the global or local settings had the attribute ${attribute}`
  );
};

const getGitAuthor = async (gitDir: string): Promise<Author> => {
  const gitConfig = await getGitConfig(gitDir, 'user');
  return gitConfig.user;
};

/**
 * Will discard the current unstaged changes in the file
 *
 * @param gitDir the file path to the gitDir
 * @param filePath the releative file path to the file
 */
export const discardFile = async (
  gitDir: string,
  filePath: string
): Promise<void> => {
  await git.checkout({
    fs,
    dir: gitDir,
    force: true,
    filepaths: [filePath],
  });
};

/**
 * Will remove the currently staged changes from the gitIndex and put
 * the file back into the "working" state
 *
 * @param gitDir the file path to the gitDir
 * @param filePath the releative file path to the file
 */
export const unstageFile = async (
  gitDir: string,
  filePath: string
): Promise<boolean> => {
  try {
    await git.remove({ fs, dir: gitDir, filepath: filePath });
    return true;
  } catch (e) {
    console.log(`Something went wrong trying to unstage ${filePath}`, e);
    return false;
  }
};

/**
 * Will delete the file from the file system
 *
 * @param gitDir the file path to the gitDir
 * @param filePath the releative file path to the file
 */
export const deleteFile = (gitDir: string, filePath: string): boolean => {
  try {
    fs.unlinkSync(`${gitDir}/${filePath}`);
    return true;
  } catch (e) {
    console.log(`Something went wrong attempting to delete ${filePath}`, e);
    return false;
  }
};

export const getFilePathsSplitByStatus = async (gitDir: string) => {
  const matrix = await git.statusMatrix({ dir: gitDir, fs });

  const untracked = getUntrackedFilePaths(matrix);
  // Removing duplicate entries from untracked files as they are picked up by
  // isomorphic-git as a working change as well
  const working = _.filter(
    getWorkingFilePaths(matrix),
    (filePath: string) => !untracked.includes(filePath)
  );

  return {
    staged: getStagedFilePaths(matrix),
    unstaged: getUntrackedFilePaths(matrix),
    working,
    untracked,
  };
};

/**
 * Loads the file contents and matches up the file states agaisnt eachother
 *
 * @param {string} gitDir
 * @param {string} commitHash
 */
export const getGitStatus = async (gitDir: string, commitHash: string) => {
  const filesPaths = await getFilePathsSplitByStatus(gitDir);

  const [
    workingFileContents,
    stagedFileContents,
    untrackedFileContents,
  ] = await Promise.all([
    loadWorkingFileContents(filesPaths.working, gitDir, commitHash),
    loadStagedDetails(filesPaths.staged, gitDir, commitHash),
    loadUntrackedFilesContents(filesPaths.untracked, gitDir),
  ]);

  const result = {
    unstagedFileContents: mapWorkingChangesToStagedChanges(
      stagedFileContents,
      workingFileContents
    ),
    untrackedFileContents,
    stagedFileContents,
  };

  return result;
};

interface readBlobInterface {
  fs: any;
  dir: string;
  oid: string;
  filepath?: string;
}

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
export const readContentsFromHash = async (
  hash: string,
  gitDir: string,
  filePath?: string
) => {
  let config: readBlobInterface = {
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
export const loadFileContentsFromPath = async (
  gitDir: string,
  filePath: string
) => {
  try {
    const contents = fs.readFileSync(gitDir + '/' + filePath);
    return new TextDecoder().decode(contents);
  } catch (err) {
    console.error(
      `Failed to load file ${filePath} as it likely does not exist`
    );
    return '';
  }
};
