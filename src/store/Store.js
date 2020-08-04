import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import Commit from './Commit';
import Repo from './Repo';
import View from './View';

const reducer = combineReducers({
  Commit,
  Repo,
  View,
});

const store = configureStore({
  reducer,
});

export default store;
