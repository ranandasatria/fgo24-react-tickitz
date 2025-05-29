import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsersAction: function(state, action) {
      const id = state.users.length + 1
      state.users.push({
        ...action.payload,
        id: id,
      })
      return state
    },
    updateUserAction: function(state, action) {
      const { id, updatedData } = action.payload
      state.users = state.users.map(user => {
        if (user.id === id) {
          return { ...user, ...updatedData }
        }
        return user
      })
    },
  },
})

export const { addUsersAction, updateUserAction } = users.actions;
export default users.reducer;