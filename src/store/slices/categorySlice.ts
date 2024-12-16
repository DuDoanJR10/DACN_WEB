import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listCategory: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setListCategory(state, action) {
      state.listCategory = action.payload;
    },
  },
});

export const { setListCategory } = categorySlice.actions;

export default categorySlice.reducer;
