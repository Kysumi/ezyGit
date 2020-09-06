import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/Store';
// import '@blueprintjs/core/lib/css/blueprint.css';
import 'react-diff-view/style/index.css';

import { setFilePath, initialise } from './store/repo/Repo';

const filePath = localStorage.getItem('repoFilePath');
if (filePath !== null) {
  store.dispatch(setFilePath(filePath));
  store.dispatch(initialise());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
