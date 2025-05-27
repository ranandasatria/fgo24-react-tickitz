import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import users from './users';
import auth from './auth';

const usersPersistConfig = {
  key: 'users',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const reducer = combineReducers({
  users: persistReducer(usersPersistConfig, users),
  auth: persistReducer(authPersistConfig, auth),
});

export default reducer;