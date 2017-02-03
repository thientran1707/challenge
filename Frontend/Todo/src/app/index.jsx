import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store/createStore';

import App from './containers/App';
import DevTools from './containers/DevTools';

import '../scss/index.scss'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const dest = document.getElementById('root');

const router = (
  <Router history={history}>
    <Route path="/" component={App}/>
    <Route path="*" component={App}/>
  </Router>
);

if (process.env.NODE_ENV !== 'production') {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        {router}
        <DevTools/>
      </div>
    </Provider>
    , dest
  );
} else {
  ReactDOM.render(
    <Provider store={store}>
      {router}
    </Provider>
    , dest
  );
}