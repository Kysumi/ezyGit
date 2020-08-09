import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'view',
  initialState: {
    selectedHash: null,
    pendingCommitMessage: null,
  },
  reducers: {
    selectHash: (state, action) => {
      state.selectedHash = action.payload;
    },
    setPendingCommitMessage: (state, action) => {
      state.pendingCommitMessage = action.payload;
    },
  },
});

export default slice.reducer;

export const { selectHash, setPendingCommitMessage } = slice.actions;
