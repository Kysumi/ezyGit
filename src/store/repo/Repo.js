import { createSlice } from '@reduxjs/toolkit';
import { getCommitLog, getCurrentBranch } from '../../git/git';
import { filePathSelector } from './RepoSelector';

// Slice
const slice = createSlice({
  name: 'repo',
  initialState: {
    filePath: '',
    commits: null,
    selectedHash: null,
    currentBranch: null,
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
  },
});

export default slice.reducer;

// Actions
const { setFilePath, setCommits, setCurrentBranch } = slice.actions;

export { setFilePath };

export const loadCurrentBranch = () => async (dispatch, getState) => {
  const filePath = filePathSelector(getState());

  const branchName = await getCurrentBranch(filePath);
  dispatch(setCurrentBranch(branchName));
};

export const loadCommits = () => async (dispatch, getState) => {
  const filePath = filePathSelector(getState());

  try {
    const commits = await getCommitLog(filePath);
    dispatch(setCommits(commits));
  } catch (err) {
    console.error(err);
  }
};
