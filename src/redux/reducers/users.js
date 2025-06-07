import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsersAction: (state, action) => {
      const id = state.users.length + 1;
      state.users.push({
        ...action.payload,
        id,
        role: action.payload.role || 'user',
      });
    },
    updateUserAction: (state, action) => {
      const { id, updatedData } = action.payload;
      state.users = state.users.map(user => 
        user.id === id ? { ...user, ...updatedData } : user
      );
    },
  },
});

export const { addUsersAction, updateUserAction } = users.actions;
export default users.reducer;