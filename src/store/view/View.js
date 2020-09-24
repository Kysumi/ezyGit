import { createSlice } from '@reduxjs/toolkit';
import { loadDiffBetweenCommits, clearCurrentDiffState } from '../repo/Repo';

const slice = createSlice({
  name: 'view',
  initialState: {
    selectedCommit: {
      oid: null,
      commit: {
        message: '',
        committer: {
          name: null,
          email: null,
        },
      },
    },
    pendingCommitMessage: '',
    omniBarIsOpen: false,
    authorized: false,
  },
  reducers: {
    selectCommit: (state, action) => {
      state.selectedCommit = action.payload;
    },
    setPendingCommitMessage: (state, action) => {
      state.pendingCommitMessage = action.payload;
    },
    setOmniBarIsOpen: (state, action) => {
      state.omniBarIsOpen = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authorized = action.payload;
    },
  },
});

const { selectCommit, setOmniBarIsOpen, setAuthenticated } = slice.actions;

export default slice.reducer;
export { setOmniBarIsOpen, setAuthenticated };

export const handleSelectingCommit = (commitDetails) => async (
  dispatch,
  getState
) => {
  dispatch(selectCommit(commitDetails));
  // Doing this so that while loading the differences it shows nothing.
  await dispatch(clearCurrentDiffState());
  await dispatch(loadDiffBetweenCommits());
};
