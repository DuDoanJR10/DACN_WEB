import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from 'store/interface';
const initialState = {
  isLogin: false,
  isAdmin: false,
  user: {
    id: undefined,
    email: '',
    name: '',
    phone: '',
  },
  status: 0,
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setIsLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const { setIsAdmin, setIsLogin } = authSlice.actions;

export default authSlice.reducer;
