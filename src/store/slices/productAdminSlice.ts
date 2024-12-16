import { createSlice } from '@reduxjs/toolkit';
import { PAGINATION_DEFAULT } from 'common/constants';
import { ProductAdminState } from 'store/interface';

const initialState = {
  listProductAdmin: [],
  pagination: PAGINATION_DEFAULT,
} as ProductAdminState;

const productAdminSlice = createSlice({
  name: 'productAdmin',
  initialState,
  reducers: {},
});

export default productAdminSlice.reducer;
