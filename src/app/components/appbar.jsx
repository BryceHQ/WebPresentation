import React from 'react';
import lang from '../lang/zh-cn.js';

import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

//icon
import IconActionCode from 'material-ui/lib/svg-icons/action/code';
import IconChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import IconFullscreen from 'material-ui/lib/svg-icons/navigation/fullscreen';

// flux
import Actions from '../actions/actions.js';
import Constants from '../constants/constants.js';


const MyAppBar = React.createClass({

  render() {

    return (
      <AppBar title = {lang.name}
        iconElementLeft = {
          <div>
            <IconButton tooltip = {lang.button.fullscreen} onTouchTap = {this._handleFullscreen}>
              <IconFullscreen color={Colors.white}/>
            </IconButton>
            <IconButton tooltip = {lang.button.markdown} onTouchTap = {this._changeMode}>
              <IconActionCode color={Colors.white}/>
            </IconButton>
          </div>
        }
        iconElementRight = {
          <IconButton tooltip = {lang.button.expand} onTouchTap = {this._handleToggle}>
            <IconChevronLeft color={Colors.white}/>
          </IconButton>
        }
        style = {{zIndex:500}}>
      </AppBar>
    );
  },

  _changeMode() {
    Actions.changeMode(this.props.mode === Constants.MODE.MARKDOWN ? Constants.MODE.PRESENTATION : Constants.MODE.MARKDOWN);
  },

  _handleToggle() {
    Actions.toggleLeftNav();
  },

  _handleFullscreen() {
    Actions.toggleFullscreen();
  },

});

export default MyAppBar;
