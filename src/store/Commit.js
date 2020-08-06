import { createSlice } from '@reduxjs/toolkit';
import { getCommitLog } from '../git/git';

// Slice
const slice = createSlice({
  name: 'commit',
  initialState: {
    commits: null,
    selectedHash: null,
  },
  reducers: {
    setCommits: (state, action) => {
      state.commits = action.payload;
    },
    selectHash: (state, action) => {
      state.selectedHash = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { setCommits } = slice.actions;
export { setCommits };

export const loadCommits = () => async (dispatch, getState) => {
  const { filePath } = getState().Repo;

  try {
    const commits = await getCommitLog(filePath);
    dispatch(setCommits(commits));
  } catch (err) {
    console.error(err);
  }
};
