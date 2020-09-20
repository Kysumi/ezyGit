import { readContentsFromHash } from './git';
import * as fs from 'fs';

const git = require('isomorphic-git');

const FILE_EQUAL = 'equal';
const FILE_MODIFIED = 'modified';
const FILE_ADDED = 'added';
const FILE_REMOVED = 'removed';

/**
 * Helper function.
 *
 * This is used to check is a particular diff is a directory change
 *
 * @param {string} filePath
 * @param {import('isomorphic-git').WalkerEntry} before
 * @param {import('isomorphic-git').WalkerEntry} after
 */
const isDirectory = async (filePath, before, after) => {
  if (filePath === '.') {
    return true;
  }

  if (before !== null && (await before.type()) === 'tree') {
    return true;
  }

  if (after !== null && (await after.type()) === 'tree') {
    return true;
  }

  return false;
};

/**
 * Getting the type of change between these two commits.
 *
 * This can be one of the following:
 * 'equal', 'modified', 'added', 'removed'
 *
 * @param {import('isomorphic-git').WalkerEntry} before
 * @param {import('isomorphic-git').WalkerEntry} after
 *
 * @returns string
 */
const getModifacationType = async (before, after) => {
  if (before === null) {
    return FILE_REMOVED;
  }

  if (after === null) {
    return FILE_ADDED;
  }

  const beforeOID = await before.oid();
  const afterOID = await after.oid();

  let type = FILE_EQUAL;
  if (beforeOID !== afterOID) {
    type = FILE_MODIFIED;
  }
  if (beforeOID === undefined) {
    type = FILE_ADDED;
  }
  if (afterOID === undefined) {
    type = FILE_REMOVED;
  }
  if (beforeOID === undefined && afterOID === undefined) {
    console.log('Something weird happened:');
    console.log(before);
    console.log(after);
  }

  return type;
};

/**
 * Get the file contents from the file from specific commit
 *
 * @param {import('isomorphic-git').WalkerEntry} walker
 * @param {string} gitDir
 */
const loadFileContents = async (walker, gitDir) => {
  if (walker === null) {
    return {
      hash: '',
      contents: '',
    };
  }

  const hash = await walker.oid();
  const contents = await readContentsFromHash(hash, gitDir);

  return {
    hash,
    contents,
  };
};

/**
 * Gets the state of the file changes between two commits
 *
 * @param {string} commitHash1
 * @param {string} commitHash2
 * @param {string} gitDir
 *
 * @returns {object}
 */
export const getFileStateChanges = async (commitHash1, commitHash2, gitDir) => {
  const map = async (filePath, [before, after]) => {
    // ignore directories
    if (await isDirectory(filePath, before, after)) {
      return;
    }

    const modificationType = await getModifacationType(before, after);

    // We only want files that have been changed
    if (modificationType === FILE_EQUAL) {
      return;
    }

    const afterFileState = await loadFileContents(after, gitDir);
    const beforeFileState = await loadFileContents(before, gitDir);

    return {
      filePath: filePath,
      modificationType,
      afterFileState: afterFileState.contents,
      beforeFileState: beforeFileState.contents,
    };
  };

  return git.walk({
    fs,
    dir: gitDir,
    trees: [git.TREE({ ref: commitHash1 }), git.TREE({ ref: commitHash2 })],
    map,
  });
};
