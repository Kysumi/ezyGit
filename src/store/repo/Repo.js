import { createSlice } from '@reduxjs/toolkit';
import {
  getCommitLog,
  getCurrentBranch,
  getFileStateChanges,
} from '../../git/git';
import {
  filePathSelector,
  getBranchNameSelector,
  getCommitIndexByHashSelector,
  getCommitsSelector,
} from './RepoSelector';

// Slice
const slice = createSlice({
  name: 'repo',
  initialState: {
    filePath: '',
    commits: [],
    currentBranch: null,
    currentBranchDiffs: null,
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
  },
});

export default slice.reducer;

// Actions
const {
  setFilePath,
  setCommits,
  setCurrentBranch,
  setCurrentDiffs,
} = slice.actions;

export { setFilePath };

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

export const loadDiffBetweenCommits = () => async (dispatch, getState) => {
  const filePath = filePathSelector(getState());

  // getting the hashes for the desired diff
  const index = getCommitIndexByHashSelector(getState());
  const commits = getCommitsSelector(getState());
  const oids = commits.map((commit) => commit.oid);

  const targetHash = oids[index - 1];
  const previousHash = oids[index];

  const fileChanges = await getFileStateChanges(
    targetHash,
    previousHash,
    filePath
  );

  dispatch(setCurrentDiffs(fileChanges));
};

export const initialise = () => async (dispatch, getState) => {
  await dispatch(loadCurrentBranch());
  await dispatch(loadCommits());
  await dispatch(loadDiffBetweenCommits());
};
