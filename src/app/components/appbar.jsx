import React from 'react';
import lang from '../lang/zh-cn.js';

import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

//icon
import IconEditor from 'material-ui/lib/svg-icons/editor/mode-edit';
import IconActionAccount from 'material-ui/lib/svg-icons/action/account-circle';
import IconChevronLeft from 'material-ui/lib/svg-icons/navigation/chevron-left';
import IconFullscreen from 'material-ui/lib/svg-icons/navigation/fullscreen';
import IconNavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import IconActionHelp from 'material-ui/lib/svg-icons/action/help';

//router
import history from '../history.js';

// flux
import Actions from '../actions/actions.js';
import Constants from '../constants/constants.js';


const MyAppBar = React.createClass({

  render() {
    let {user, simple} = this.props;
    let buttonStyle = {
      width: '36px',
      height: '36px',
      padding: '0px',
      margin: '0px 3px'
    };
    let elemLeft = simple ? (
      <div>
        <IconButton tooltip={lang.button.menu} onTouchTap={this._handleToggleLeft} style={buttonStyle}>
          <IconNavigationMenu color={Colors.white}/>
        </IconButton>
        <IconButton tooltip = {user.name || lang.button.signin} style={buttonStyle}
          onTouchTap = {() => history.to('/auth/signin')}>
          <IconActionAccount color={Colors.white}/>
        </IconButton>
      </div>
    ) : (
      <div>
        <IconButton tooltip = {lang.button.menu} style={buttonStyle}
          onTouchTap = {this._handleToggleLeft} >
          <IconNavigationMenu color={Colors.white}/>
        </IconButton>
        <IconButton tooltip = {user.name || lang.button.login} style={buttonStyle}
          onTouchTap = {() => history.to('/auth/signin')}>
          <IconActionAccount color={Colors.white}/>
        </IconButton>
        <IconButton tooltip = {lang.button.fullscreen} style={buttonStyle}
          onTouchTap = {this._handleFullscreen}>
          <IconFullscreen color={Colors.white}/>
        </IconButton>
        <IconButton tooltip = {lang.button.markdown} style={buttonStyle}
          onTouchTap = {this._changeMode}>
          <IconEditor color={Colors.white}/>
        </IconButton>
      </div>
    );
    let elemRgiht = simple ?
      null : (
        <IconButton tooltip = {lang.button.expand} style={buttonStyle}
          onTouchTap = {this._handleToggleRight}>
          <IconChevronLeft color={Colors.white}/>
        </IconButton>
      );
    return (
      <AppBar
        title = {<span style={{cursor: 'pointer'}}>{lang.name}</span>}
        onTitleTouchTap = {() => history.to('/home')}
        iconElementLeft = {elemLeft}
        iconElementRight = {elemRgiht}
        style = {{zIndex:500, height: Constants.APPBAR_HEIGHT, minHeight: '50px'}}
        titleStyle = {{lineHeight: '50px'}}
      >
      </AppBar>
    );
  },

  _changeMode() {
    Actions.changeMode(this.props.mode === Constants.MODE.MARKDOWN ? Constants.MODE.PRESENTATION : Constants.MODE.MARKDOWN);
  },

  _handleToggleLeft() {
    Actions.toggleLeft();
  },
  _handleToggleRight() {
    Actions.toggleRight();
  },

  _handleFullscreen() {
    Actions.toggleFullscreen();
  },
});
// <IconButton tooltip = {lang.button.help} style={buttonStyle}
//   onTouchTap = {() => history.to('/help')}>
//   <IconActionHelp color={Colors.white}/>
// </IconButton>

export default MyAppBar;
