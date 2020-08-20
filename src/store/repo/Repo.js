import { createSlice } from '@reduxjs/toolkit';
import { getCommitLog, getCurrentBranch, getGitStatus } from '../../git/git';
import {
  filePathSelector,
  getBranchNameSelector,
  getCommitIndexByHashSelector,
  getCommitsSelector,
} from './RepoSelector';
import { getFileStateChanges } from '../../git/committedFiles';

// Slice
const slice = createSlice({
  name: 'repo',
  initialState: {
    filePath: '',
    commits: [],
    currentBranch: null,
    currentBranchDiffs: null,

    // Pending changes
    untrackedFiles: null,
    stagedFiles: [],
    pendingChangesCount: 0,
  },
  reducers: {
    setFilePath: (state, action) => {
      state.filePath = action.payload;
      localStorage.setItem('repoFilePath', action.payload);
    },
    setCommits: (state, action) => {
      state.commits = action.payload;
    },
    setCurrentBranch: (state, action) => {
      state.currentBranch = action.payload;
    },
    setCurrentDiffs: (state, action) => {
      state.currentBranchDiffs = action.payload;
    },
    setUntrackedFiles: (state, action) => {
      state.untrackedFiles = action.payload;
    },
    setStagedFiles: (state, action) => {
      state.stagedFiles = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const {
  setFilePath,
  setCommits,
  setCurrentBranch,
  setCurrentDiffs,
  setUntrackedFiles,
  setStagedFiles,
} = slice.actions;

export { setFilePath };

export const clearCurrentDiffState = () => async (dispatch, getState) => {
  dispatch(setCurrentDiffs([]));
};

export const loadCurrentBranch = () => async (dispatch, getState) => {
  const filePath = filePathSelector(getState());

  const branchName = await getCurrentBranch(filePath);
  dispatch(setCurrentBranch(branchName));
};

export const loadCommits = () => async (dispatch, getState) => {
  const filePath = filePathSelector(getState());
  const branchName = getBranchNameSelector(getState());

  try {
    const commits = await getCommitLog(filePath, branchName);
    dispatch(setCommits(commits));
  } catch (err) {
    console.error(err);
  }
};

export const loadPendingDiff = () => async (dispatch, getState) => {
  const gitDir = filePathSelector(getState());
  const commitHash = getCommitsSelector(getState())[1];

  const {
    untrackedFileContents,
    unstagedFileContents,
    stagedFileContents,
  } = await getGitStatus(gitDir, commitHash.oid);

  await dispatch(setUntrackedFiles(untrackedFileContents));
  await dispatch(setCurrentDiffs(unstagedFileContents));
  await dispatch(setStagedFiles(stagedFileContents));
};

export const loadDiffBetweenCommits = () => async (dispatch, getState) => {
  const filePath = filePathSelector(getState());

  // getting the hashes for the desired diff
  const index = getCommitIndexByHashSelector(getState());

  // Debugging for now
  if (index === 0) {
    await dispatch(loadPendingDiff());
    return;
  }

  const commits = getCommitsSelector(getState());
  const oids = commits.map((commit) => commit.oid);

  const targetHash = oids[index - 1];
  const previousHash = oids[index];

  const fileChanges = await getFileStateChanges(
    targetHash,
    previousHash,
    filePath
  );

  await dispatch(setCurrentDiffs(fileChanges));
};

export const initialise = () => async (dispatch, getState) => {
  await dispatch(loadCurrentBranch());
  await dispatch(loadCommits());
  await dispatch(loadDiffBetweenCommits());
};
