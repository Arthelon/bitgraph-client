import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, browserHistory } from 'react-router'
import getRoutes from './routes'

ReactDOM.render(
  <Router history={browserHistory} routes={getRoutes()}>
    <App />
  </Router>,
  document.getElementById('root')
);
