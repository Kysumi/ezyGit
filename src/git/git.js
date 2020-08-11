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

  if (a !== null && (await a.type()) === 'tree') {
    return true;
  }

  if (b !== null && (await b.type()) === 'tree') {
    return true;
  }

  return false;
};

const getModifacationType = async (A, B) => {
  if (A === null) {
    return FILE_REMOVED;
  }

  if (B === null) {
    return FILE_ADDED;
  }

  const Aoid = await A.oid();
  const Boid = await B.oid();

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

// The HEAD status is either absent (0) or present (1).
// The WORKDIR status is either absent (0), identical to HEAD (1), or different from HEAD (2).
// The STAGE status is either absent (0), identical to HEAD (1), identical to WORKDIR (2), or different from WORKDIR (3).
const FILE = 0,
  HEAD = 1,
  WORKDIR = 2,
  STAGE = 3;

const unstagedChanges = (matrix) => {
  const fileNames = matrix
    .filter((row) => row[WORKDIR] !== row[STAGE])
    .map((row) => row);

  return fileNames;
};

const untrackedFiles = (matrix) => {
  const fileNames = matrix
    .filter((row) => row[HEAD] === 0 && row[STAGE] === 0)
    .map((row) => row[FILE]);

  return fileNames;
};

export const getGitStatus = async (filePath) => {
  const matrix = await git.statusMatrix({ dir: filePath, fs });

  const result = {
    unstagedChanges: await unstagedChanges(matrix),
    untrackedFiles: await untrackedFiles(matrix),
  };

  return result;
};

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

export const loadFileContentsFromPath = async (gitDir, filePath) => {
  const contents = fs.readFileSync(gitDir + '/' + filePath);

  return new TextDecoder().decode(contents);
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
 * Gets the state of the file changes
 *
 * @param {string} commitHash1
 * @param {string} commitHash2
 * @param {string} gitDir
 *
 * @returns {object}
 */
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

      const modificationType = await getModifacationType(A, B);

      // We only want files that have been changed
      if (modificationType === FILE_EQUAL) {
        return;
      }

      const newChanges = await loadFileContents(B, gitDir);
      const originFile = await loadFileContents(A, gitDir);

      return {
        filePath: `/${filePath}`,
        modificationType,
        aHash: newChanges.hash,
        bHash: originFile.hash,
        aFileContents: newChanges.contents,
        bFileContents: originFile.contents,
      };
    },
  });
};
