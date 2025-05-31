import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import users from './users';
import auth from './auth';
import bookedTicket from './bookedTicket'

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

const reducer = combineReducers({
  users: persistReducer(usersPersistConfig, users),
  auth: persistReducer(authPersistConfig, auth),
  bookedTicket: persistReducer(bookedTicketPersistConfig, bookedTicket)
});

export default reducer;