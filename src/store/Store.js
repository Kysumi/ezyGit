import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import View from './view/View';
import Repo from './repo/Repo';

const reducer = combineReducers({
  Repo,
  View,
});

const store = configureStore({
  reducer,
});

export default store;
