import React from 'react';

// Our custom react component
import AppBar from './appbar.jsx';

import Right from './right.jsx';
import Left from './left.jsx';
import SlideGroup from './slideGroup.jsx';
import Snackbar from 'material-ui/lib/snackbar';
import Colors from 'material-ui/lib/styles/colors';

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

  render() {
    let {slideGroup, current, mode, leftOpen, rightOpen, bottomMessage, title} = this.state;
    let user = Store.getUser();
    let {children, location} = this.props;
    let simple = location.pathname !== '/';
    let containerStyle = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: simple ? Colors.white : Colors.grey200,
    };
    let snackbar = (
      <Snackbar
        open={!!bottomMessage}
        message = {bottomMessage || ''}
        autoHideDuration={2000}
        onRequestClose={() => Actions.clearMessage()}
      />
    );

    if(mode === 'fullscreen'){
      return (
        <div style = {containerStyle}>
          <SlideGroup data = {slideGroup} index = {current} mode = {mode}
            style = {{
              top: '0px',
            }}
          />
          {snackbar}
        </div>
      );
    }

    if(children){
      return (
        <div style = {containerStyle}>
          <AppBar mode = {mode} user = {user} simple = {simple}/>
          <Left open = {leftOpen}/>
          {children}
          {snackbar}
        </div>
      );
    }

    return (
      <div style = {containerStyle}>
        <AppBar mode = {mode} user = {user} simple = {simple} title={title}/>
        <SlideGroup data = {slideGroup} index = {current} mode = {mode}/>
        <Right open = {rightOpen} data = {slideGroup} current = {current}/>
        <Left open = {leftOpen}/>
        {snackbar}
      </div>
    );
  },

  // _handleToggle() {
  //   Actions.toggleLeftNav();
  // },

  _onChange() {
    this.setState(Store.getData());
  },
});

export default Main;
