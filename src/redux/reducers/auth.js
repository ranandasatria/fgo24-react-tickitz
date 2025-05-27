import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: function(state, action) {
      state.currentUser = { ...action.payload };
    },
    logoutAction: function(state) {
      state.currentUser = null;
    },
  },
});

export const { loginAction, logoutAction } = auth.actions;
export default auth.reducer;