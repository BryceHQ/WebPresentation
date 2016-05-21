import React from 'react';

import _ from 'lodash';

import Constants from '../../../constants/constants.js';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Checkbox from 'material-ui/lib/checkbox';
import Paper from 'material-ui/lib/paper';

import Info from './info';
import WorkRegion from './workRegion';

import AppBar from '../../../components/appbar';
import ErrorDialog from '../../../components/error';

import Store from '../../../stores/store.js';
import Actions from '../../../actions/actions.js';


const Home = React.createClass({
  getInitialState(){
    return Store.getData();
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  render() {
    let {user, error} = this.state;
    let errorElem = error ? <ErrorDialog error={error} onClearError={() => Actions.clearError()}/> : null;
    return (
      <div className = "home">
        <AppBar simple = {true} user={user}/>
        <Info user={user} />
        <WorkRegion />
        {errorElem}
      </div>
    );
  },

  _onChange() {
    this.setState(Store.getData());
  },

});

export default Home;
