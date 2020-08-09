import { diffLines, formatLines } from 'unidiff';
import { parseDiff } from 'react-diff-view';
const git = require('isomorphic-git');
var fs = window.require('fs');

/**
 * Returns the previous commits from the provided branch
 *
 * @param {string} filePath
 * @param {string} branch
 */
export const getCommitLog = async (filePath, branch, depth = 500) => {
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

/**
 * Gets the difference between the two strings in a format for the
 * react-diff-view lib
 *
 * @param {string} originalText
 * @param {string} changedText
 */
export const getGitDifference = (originalText, changedText) => {
  const diffText = formatLines(diffLines(originalText, changedText), {
    context: 3,
  });
  return parseDiff(diffText, { nearbySequences: 'zip' });
};

/**
 * Helper function.
 *
 * This is used to check is a particular diff is a directory change
 *
 * @param {string} filePath
 * @param {import('isomorphic-git').WalkerEntry} a
 * @param {import('isomorphic-git').WalkerEntry} b
 */
const isDirectory = async (filePath, a, b) => {
  if (filePath === '.') {
    return true;
  }

  if ((await a.type()) === 'tree' || (await b.type()) === 'tree') {
    return true;
  }

  return false;
};

const getModifacationType = async (A, B, Aoid, Boid) => {
  let type = 'equal';
  if (Aoid !== Boid) {
    type = 'modify';
  }
  if (Aoid === undefined) {
    type = 'add';
  }
  if (Boid === undefined) {
    type = 'remove';
  }
  if (Aoid === undefined && Boid === undefined) {
    console.log('Something weird happened:');
    console.log(A);
    console.log(B);
  }

  return type;
};

const readContentsFromHash = async (hash, gitDir) => {
  const { blob } = await git.readBlob({
    fs,
    dir: gitDir,
    oid: hash,
  });

  return new TextDecoder().decode(blob);
};

export const getPreviousCommits = async (branchName, filePath) => {
  const commits = await getCommitLog(filePath, branchName, 2);
  const oids = commits.map((commit) => commit.oid);

  return {
    targetHash: oids[0],
    previousHash: oids[1],
  };
};

export const getFileStateChanges = async (commitHash1, commitHash2, gitDir) => {
  return git.walk({
    fs,
    dir: gitDir,
    trees: [git.TREE({ ref: commitHash1 }), git.TREE({ ref: commitHash2 })],
    map: async (filePath, [A, B]) => {
      // ignore directories
      if (await isDirectory(filePath, A, B)) {
        return;
      }

      const aHash = await A.oid();
      const bHash = await B.oid();

      const modificationType = await getModifacationType(A, B, aHash, bHash);

      const aFileContents = await readContentsFromHash(aHash, gitDir);
      const bFileContents = await readContentsFromHash(bHash, gitDir);

      return {
        filePath: `/${filePath}`,
        modificationType,
        aHash,
        bHash,
        aFileContents,
        bFileContents,
      };
    },
  });
};
