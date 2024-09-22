import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCloseSidebar: false,
  languageInput: 'vi',
};

export const commonSlice = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {
    collapseSidebar(state) {
      state.isCloseSidebar = !state.isCloseSidebar;
    },
    changeLanguageInput(state, action) {
      state.languageInput = action.payload;
    },
  },
});

export const { collapseSidebar, changeLanguageInput } = commonSlice.actions;
