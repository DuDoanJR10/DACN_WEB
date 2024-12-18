import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from 'store/interface';

const initialState = {
  listProduct: [],
} as ProductState;

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setListProduct(state, action) {
      state.listProduct = action.payload;
    },
  },
});

export const { setListProduct } = productSlice.actions;

export default productSlice.reducer;
