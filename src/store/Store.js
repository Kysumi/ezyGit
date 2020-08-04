import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import Commit from './Commit';
import Repo from './Repo';
import SideBar from './SideBar';
import View from './View';

const reducer = combineReducers({
  Commit,
  Repo,
  SideBar,
  View,
});

const store = configureStore({
  reducer,
});

export default store;
