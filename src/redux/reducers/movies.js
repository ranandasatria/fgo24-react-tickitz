import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localMovies: [],
};

const movies = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovieAction: (state, action) => {
      state.localMovies.push({
        ...action.payload,
        id: Date.now(), 
      });
    },
    deleteMovieAction: (state, action) => {
      state.localMovies = state.localMovies.filter(movie => movie.id !== action.payload)
    },
  },
});

export const { addMovieAction, deleteMovieAction } = movies.actions;
export default movies.reducer;