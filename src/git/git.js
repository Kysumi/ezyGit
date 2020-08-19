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

// The HEAD_INDEX status is either absent (0) or present (1).
// The WORKDIR_INDEX status is either absent (0), identical to HEAD_INDEX (1), or different from HEAD_INDEX (2).
// The STAGE_INDEX status is either absent (0), identical to HEAD_INDEX (1), identical to WORKDIR_INDEX (2), or different from WORKDIR_INDEX (3).
const FILE_INDEX = 0,
  HEAD_INDEX = 1,
  WORKDIR_INDEX = 2,
  STAGE_INDEX = 3;

const getUnStagedFilePaths = (matrix) => {
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

const loadFiles = async (filePaths, gitDir, commitHash) => {
  const fileDiffs = await Promise.all(
    filePaths.map(async (filePath) => {
      const newFileChanges = await loadFileContentsFromPath(gitDir, filePath);

      // Because we are looking at pending changes we won't have a commit hash.
      // So we will use the first hash from the store
      const commitedState = await readContentsFromHash(
        commitHash,
        gitDir,
        filePath
      );

      return {
        filePath: `/${filePath}`,
        modificationType: 'added',
        aHash: '',
        bHash: '',
        aFileContents: commitedState,
        bFileContents: newFileChanges,
      };
    })
  );

  return fileDiffs;
};

const loadUntrackedFilesContents = async (untrackedFilePaths, gitDir) => {
  const unTrackedFiles = await Promise.all(
    untrackedFilePaths.map(async (filePath) => {
      const contents = await loadFileContentsFromPath(gitDir, filePath);
      return {
        filePath: `/${filePath}`,
        modificationType: 'added',
        aHash: '',
        bHash: '',
        aFileContents: '',
        bFileContents: contents,
      };
    })
  );

  return unTrackedFiles;
};

export const getGitStatus = async (gitDir, commitHash) => {
  const matrix = await git.statusMatrix({ dir: gitDir, fs });

  const unstagedChanges = getUnStagedFilePaths(matrix);
  const untrackedFiles = getUntrackedFilePaths(matrix);
  const stagedFiles = getStagedFilePaths(matrix);

  const unstagedFileContents = await loadFiles(
    unstagedChanges.filter((filePath) => !untrackedFiles.includes(filePath)),
    gitDir,
    commitHash
  );

  const stagedFileContents = await loadFiles(stagedFiles, gitDir, commitHash);

  const untrackedFileContents = await loadUntrackedFilesContents(
    untrackedFiles,
    gitDir
  );

  const result = {
    unstagedFileContents,
    untrackedFileContents,
    stagedFileContents,
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
