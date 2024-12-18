import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listAccount: [],
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setListAccount(state, action) {
      state.listAccount = action.payload;
    },
  },
});

export const { setListAccount } = accountSlice.actions;

export default accountSlice.reducer;
