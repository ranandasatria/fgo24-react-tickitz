import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import users from './users';
import auth from './auth';
import bookedTicket from './bookedTicket';
import movies from './movies';

const usersPersistConfig = {
  key: 'users',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const bookedTicketPersistConfig = {
  key: 'bookedTicket',
  storage,
};

const moviesPersistConfig = {
  key: 'movies',
  storage,
};

const reducer = combineReducers({
  users: persistReducer(usersPersistConfig, users),
  auth: persistReducer(authPersistConfig, auth),
  bookedTicket: persistReducer(bookedTicketPersistConfig, bookedTicket),
  movies: persistReducer(moviesPersistConfig, movies),
});

export default reducer;