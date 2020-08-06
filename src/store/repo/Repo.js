import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'repo',
  initialState: {
    filePath: '',
  },
  reducers: {
    setFilePath: (state, action) => {
      state.filePath = action.payload;
      localStorage.setItem('repoFilePath', action.payload);
    },
  },
});

export default slice.reducer;

// Actions
const { setFilePath } = slice.actions;

export { setFilePath };
