import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from 'store/interface';

const initialState = {
  listCategory: [],
} as CategoryState;

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
