import { createSlice } from '@reduxjs/toolkit';
import { AccountState } from 'store/interface';

const initialState = {
  listAccount: [],
} as AccountState;

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
