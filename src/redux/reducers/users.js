import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  users: []
}

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsersAction: function(state, action){
      const id = state.users.length +1
      state.users.push({
        ...action.payload,
        id: id
      })
    }
  }
})

export const { addUsersAction } = users.actions
export default users.reducer