import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'view',
  initialState: {
    popUpVisible: false,
  },
  reducers: {
    setPopUpVisible: (state, action) => {
      state.popUpVisible = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { setPopUpVisible } = slice.actions;

export { setPopUpVisible };
