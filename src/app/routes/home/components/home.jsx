import React from 'react';
import _ from 'lodash';

import Constants from '../../../constants/constants.js';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Checkbox from 'material-ui/lib/checkbox';
import Paper from 'material-ui/lib/paper';

import Info from './info.jsx';
import WorkRegion from './workRegion.jsx';

const Home = React.createClass({
  getInitialState() {
    return {
    };
  },

  render() {
    const style = {
      top: Constants.APPBAR_HEIGHT,
      left: '0px',
      bottom: '0px',
      width: Constants.INFO_WIDTH,
      padding: 20,
      position: 'absolute',
    };
    return (
      <div className = "home">
        <Info/>
        <WorkRegion/>
      </div>
    );
  },

});

export default Home;
