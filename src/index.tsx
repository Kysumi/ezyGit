import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { store } from './store/store';
import MainView from './containers/mainView';

ReactDOM.render(
  <Provider store={store}>
    <MainView left="" right="" />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
