import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'view',
  initialState: {
    selectedHash: null,
  },
  reducers: {
    selectHash: (state, action) => {
      state.selectedHash = action.payload;
    },
  },
});

export default slice.reducer;

const { selectHash } = slice.actions;

export { selectHash };
