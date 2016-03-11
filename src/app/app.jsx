import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main.jsx'; // Our custom react component

//routers
import { Router } from 'react-router';
import Auth from './routes/auth/index.js';
import Help from './routes/help/index.js';
import Home from './routes/home/index.js';

//history
import history from './history.js';


import ajax from './ajax.js';


//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: Main,
    childRoutes: [
      Auth,
      Help,
      Home,
    ]
  }]
};

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render(<Router history={history.host} routes={rootRoute} />, document.getElementById('app'));