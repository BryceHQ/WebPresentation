import React from 'react';
import lang from '../lang/zh-cn.js';

import LeftNav from 'material-ui/lib/left-nav';

import Actions from '../actions/actions.js';

import SideBarTitle from './sidebarTitle.jsx';
import DraggableList from './draggableList.jsx';

const SideBar = React.createClass({
  getDefaultProps() {
    return {open: false};
  },

  render() {
    let {open, openRight, data, current} = this.props;
    return (
      <LeftNav
        style = {{overflow: 'hidden'}}
        width = {350}
        open = {open}
        openRight = {openRight}
        onRequestChange = {open => Actions.toggleLeftNav({open})}
      >
        <SideBarTitle />
        <DraggableList data = {data} current = {current}/>
      </LeftNav>
    );
  },
});

export default SideBar;
