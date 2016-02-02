import React from 'react';
import lang from '../lang/zh-cn.js';

import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

//icon
import IconActionCode from 'material-ui/lib/svg-icons/action/code';
import IconChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';

// flux
import Actions from '../actions/actions.js';


const MyAppBar = React.createClass({

  render() {

    return (
      <AppBar title = {lang.name}
        iconElementLeft = {
          <IconButton tooltip = {lang.button.markdown} onTouchTap = {this._changeMode}>
            <IconActionCode color={Colors.white}/>
          </IconButton>
        }
        iconElementRight = {
          <IconButton onTouchTap = {this._handleToggle}>
            <IconChevronLeft/>
          </IconButton>
        }
        style = {{zIndex:500}}>
      </AppBar>
    );
  },

  _changeMode() {
    Actions.changeMode(this.props.mode === 'markdown' ? 'presentation' : 'markdown');
  },

  _handleToggle() {
    Actions.toggleLeftNav();
  },

});

export default MyAppBar;
