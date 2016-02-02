import React from 'react';
import lang from '../lang/zh-cn.js';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AppBar from 'material-ui/lib/app-bar';
import Colors from 'material-ui/lib/styles/colors';

import IconButton from 'material-ui/lib/icon-button';
import IconChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import IconAdd from 'material-ui/lib/svg-icons/content/add';
import IconRemove from 'material-ui/lib/svg-icons/content/remove';

import Actions from '../actions/actions.js';

import DraggableList from './draggableList.jsx';

const SideBar = React.createClass({
  getDefaultProps() {
    return {open: false};
  },

  render() {
    let {open, openRight, data} = this.props;
    return (
      <LeftNav
        style = {{overflow: 'hidden'}}
        width = {350}
        open = {open}
        openRight = {openRight}
        onRequestChange = {open => Actions.toggleLeftNav({open})}
      >
        <AppBar title = "浏览"
          iconElementLeft = {
            <IconButton onTouchTap = {this._handleToggle}>
              <IconChevronRight/>
            </IconButton>
          }
          iconElementRight = {
            <div>
              <IconButton tooltip = {"add"} onTouchTap = {this._changeMode}>
                <IconAdd color={Colors.white}/>
              </IconButton>
              <IconButton tooltip = {"remove"} onTouchTap = {this._changeMode}>
                <IconRemove color={Colors.white}/>
              </IconButton>
            </div>
          }
        />
        <DraggableList data = {data}/>
      </LeftNav>
    );
  },

  _handleToggle() {
    Actions.toggleLeftNav();
  },
});

export default SideBar;
