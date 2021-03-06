import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main'; // Our custom react component

require("../less/entry.less");

//routers
import { Router } from 'react-router';

import Auth from './routes/auth';
import Help from './routes/help';
import Home from './routes/home';
import File from './routes/file';
import Errors from './routes/errors';

//history
import history from './history.js';

import Store from './stores/store.js'; // Our custom react component

import ajax from './ajax.js';


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

function indexRedirect(newState, replace) {
  if(Store.isAuthenticated()){
    replace('/home');
  }else{
    replace('/file/readme');
  }
}

Store.setConfig(window._config);

const rootRoute = {
  path: '/',
  component: Main,
  indexRoute: {
    onEnter: indexRedirect
  },
  childRoutes: [
    Auth,
    Help,
    Home,
    File,
    Errors,
  ]
};

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render(<Router history={history.host} routes={rootRoute}/>, document.getElementById('app'));
