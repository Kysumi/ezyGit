const git = require('isomorphic-git');
const remote = window.require('electron').remote;
const fs = remote.require('fs');

const FILE_EQUAL = 'equal';
const FILE_MODIFIED = 'modified';
const FILE_ADDED = 'added';
const FILE_REMOVED = 'removed';

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
  let type = FILE_EQUAL;
  if (Aoid !== Boid) {
    type = FILE_MODIFIED;
  }
  if (Aoid === undefined) {
    type = FILE_ADDED;
  }
  if (Boid === undefined) {
    type = FILE_REMOVED;
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

export const getPreviousCommits = async (branchName, filePath, index) => {
  const depth = index + 1;
  const commits = await getCommitLog(filePath, branchName, depth);
  const oids = commits.map((commit) => commit.oid);

  return {
    targetHash: oids[depth - 1],
    previousHash: oids[depth],
  };
};

export const getFileStateChanges = async (commitHash1, commitHash2, gitDir) => {
  return git.walk({
    fs,
    dir: gitDir,
    trees: [git.TREE({ ref: commitHash1 }), git.TREE({ ref: commitHash2 })],
    map: async (filePath, [A, B]) => {
      // TODO handle removals and addtions.

      // ignore directories
      if (await isDirectory(filePath, A, B)) {
        return;
      }

      const aHash = await A.oid();
      const bHash = await B.oid();

      const modificationType = await getModifacationType(A, B, aHash, bHash);

      // We only want files that have been changed
      if (modificationType === FILE_EQUAL) {
        return;
      }

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
