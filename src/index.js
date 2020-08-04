import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/Store';
import '@blueprintjs/core/lib/css/blueprint.css';

import { setPopUpVisible } from './store/View';
import { setFilePath } from './store/Repo';

const shouldShowPopUp = (dispatch) => {
  const filePath = localStorage.getItem('repoFilePath');
  if (filePath !== null) {
    store.dispatch(setFilePath(filePath));
  } else {
    store.dispatch(setPopUpVisible(true));
  }
};

shouldShowPopUp();

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
