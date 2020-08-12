import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'view',
  initialState: {
    selectedCommit: null,
    pendingCommitMessage: null,
  },
  reducers: {
    selectCommit: (state, action) => {
      state.selectedCommit = action.payload;
    },
    setPendingCommitMessage: (state, action) => {
      state.pendingCommitMessage = action.payload;
    },
  },
});

export default slice.reducer;

export const { selectCommit, setPendingCommitMessage } = slice.actions;
