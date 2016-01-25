import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
const AppBar = require('material-ui/lib/app-bar');

// Our custom react component
import Leftbar from './leftbar.jsx';
import SlideGroup from './slideGroup.jsx';

// flux
import Store from '../stores/store.js';
import Actions from '../actions/actions.js';


const Main = React.createClass({
  getInitialState() {
    return Store.getData();
  },


  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  handleToggle() {
    Actions.toggleLeftNav();
  },

  render() {

    let containerStyle = {
      width: '100%',
      height: '100%',
      position: 'absolute',
    };
    return (
      <div style = {containerStyle}>
        <AppBar title = "Title"
           onLeftIconButtonTouchTap = {this.handleToggle}
           />
        <SlideGroup data = {this.state.slideGroup} index = {this.state.current}/>
        <Leftbar open = {this.state.open} data = {this.state.slideGroup}/>
      </div>
    );
  },

  _onChange() {
    this.setState(Store.getData());
  },
});

export default Main;
