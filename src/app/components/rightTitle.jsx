import React from 'react';

import AppBar from 'material-ui/lib/app-bar';
import Colors from 'material-ui/lib/styles/colors';

import IconButton from 'material-ui/lib/icon-button';
import IconChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import IconAdd from 'material-ui/lib/svg-icons/content/add';
import IconRemove from 'material-ui/lib/svg-icons/content/remove';

import lang from '../lang/zh-cn.js';

import Actions from '../actions/actions.js';

/****************
* RightTitle Component
****************/
const RightTitle = React.createClass({
  render() {
    let buttonStyle = {
      width: '36px',
      height: '36px',
      padding: '0px',
      margin: '0px 3px'
    };
    return (
      <AppBar title = {lang.sidebar}
        style = {{height: '50px', minHeight: '50px'}}
        titleStyle = {{lineHeight: '50px'}}
        iconElementLeft = {
          <IconButton tooltip = {lang.button.collapse} style = {buttonStyle}
            onTouchTap = {this._handleToggleRight}>
            <IconChevronRight/>
          </IconButton>
        }
        iconElementRight = {
          <div>
            <IconButton tooltip = {lang.button.add} style = {buttonStyle}
              onTouchTap = {this._handleAdd}>
              <IconAdd color={Colors.white}/>
            </IconButton>
            <IconButton tooltip = {lang.button.remove} style = {buttonStyle}
              onTouchTap = {this._handleRemove}>
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

  _handleToggleRight() {
    Actions.toggleRight();
  },
});

export default RightTitle;
