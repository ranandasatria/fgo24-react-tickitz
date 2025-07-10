import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const { user, token } = action.payload;
      state.currentUser = user;
      state.token = token;
    },
    logoutAction: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { loginAction, logoutAction } = auth.actions;
export default auth.reducer;
