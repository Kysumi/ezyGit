import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import Commit from './Commit';
import Repo from './Repo';
import SideBar from './SideBar';

const reducer = combineReducers({
  Commit,
  Repo,
  SideBar,
});

const store = configureStore({
  reducer,
});

export default store;
