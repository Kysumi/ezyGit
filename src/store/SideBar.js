import { createSlice } from '@reduxjs/toolkit';

// Slice
const slice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: true,
  },
  reducers: {
    isOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { setOpen } = slice.actions;

export const setSideBarOpenState = (open) => {
  setOpen(open);
};
