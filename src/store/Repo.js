import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'repo',
  initialState: {
    filePath: null,
  },
  reducers: {
    setFilePath: (state, action) => {
      state.commits = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { setFilePath } = slice.actions;

export { setFilePath };

export const setGitRepo = (filePath) => {
  setFilePath(filePath);
};
