import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import Commit from './Commit';
import Repo from './repo/Repo';

const reducer = combineReducers({
  Commit,
  Repo,
});

const store = configureStore({
  reducer,
});

export default store;
