import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'commit',
  initialState: {
    commits: null,
    selectedHash: null,
  },
  reducers: {
    load: (state, action) => {
      state.commits = action.payload;
    },
    selectHash: (state, action) => {
      state.selectedHash = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { load } = slice.actions;
