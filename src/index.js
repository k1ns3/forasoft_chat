import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.scss';

import App from './App';
import { Page404 } from './components';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route component={Page404} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
