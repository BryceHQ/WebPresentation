import React from 'react';

import AppBar from 'material-ui/lib/app-bar';
import Colors from 'material-ui/lib/styles/colors';

import IconButton from 'material-ui/lib/icon-button';
import IconChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import IconAdd from 'material-ui/lib/svg-icons/content/add';
import IconRemove from 'material-ui/lib/svg-icons/content/remove';

import lang from '../lang/zh-cn.js';

import Actions from '../actions/actions.js';

const SideBarTitle = React.createClass({
  render() {
    return (
      <AppBar title = {lang.sidebar}
        iconElementLeft = {
          <IconButton tooltip = {lang.button.collapse} onTouchTap = {this._handleToggle}>
            <IconChevronRight/>
          </IconButton>
        }
        iconElementRight = {
          <div>
            <IconButton tooltip = {lang.button.add} onTouchTap = {this._handleAdd}>
              <IconAdd color={Colors.white}/>
            </IconButton>
            <IconButton tooltip = {lang.button.remove} onTouchTap = {this._handleRemove}>
              <IconRemove color={Colors.white}/>
            </IconButton>
          </div>
        }
      />
    );
  },

  _handleAdd() {
    Actions.addSlide();
  },

  _handleRemove() {
    Actions.removeSlide();
  },

  _handleToggle() {
    Actions.toggleLeftNav();
  },
});

export default SideBarTitle;
