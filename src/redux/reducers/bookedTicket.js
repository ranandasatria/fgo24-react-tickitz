import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookedTicket: [],
}

const bookedTicket = createSlice({
  name: 'bookedTicket',
  initialState,
  reducers: {
    bookedTicketAction: function(state, action) {
      state.bookedTicket.push({
        ...action.payload,
      })
    },
  },
})

export const { bookedTicketAction } = bookedTicket.actions;
export default bookedTicket.reducer;