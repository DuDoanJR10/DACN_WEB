import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listProduct: [],
};

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
