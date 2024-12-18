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
    setUser(state, action) {
      state.user.id = action.payload?.id;
      state.user.name = action.payload?.name;
      state.user.email = action.payload?.email;
      state.user.phone = action.payload?.phone;
    },
  },
});

export const { setIsAdmin, setIsLogin, setUser } = authSlice.actions;

export default authSlice.reducer;
