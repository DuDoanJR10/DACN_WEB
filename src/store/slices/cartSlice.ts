import { createSlice } from '@reduxjs/toolkit';
import { CartState } from 'store/interface';

const initialState = {
  listCart: [],
} as CartState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setListCart(state, action) {
      state.listCart = action.payload;
    },
  },
});

export const { setListCart } = cartSlice.actions;

export default cartSlice.reducer;
