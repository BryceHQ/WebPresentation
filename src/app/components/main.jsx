import React from 'react';

// Our custom react component
import AppBar from './appbar.jsx';

import Sidebar from './sidebar.jsx';
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

  render() {
    let {slideGroup, current, mode, open} = this.state;
    let containerStyle = {
      width: '100%',
      height: '100%',
      position: 'absolute',
    };
    if(mode === 'fullscreen'){
      return (
        <div style = {containerStyle}>
          <SlideGroup data = {slideGroup} index = {current} mode = {mode}
            style = {{
              top: '0px',
            }}
          />
        </div>
      );
    }
    return (
      <div style = {containerStyle}>
        <AppBar mode = {mode}/>
        <SlideGroup data = {slideGroup} index = {current} mode = {mode}/>
        <Sidebar open = {open} data = {slideGroup} openRight = {true} current = {current}/>
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
