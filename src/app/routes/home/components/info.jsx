import React from 'react';

import Constants from '../../../constants/constants.js';

import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';

import Profile from './profile.jsx';

const Info = React.createClass({

  render() {
    const style = {
      textAlign: 'center',
      top: Constants.APPBAR_HEIGHT,
      left: '0px',
      bottom: '0px',
      width: Constants.INFO_WIDTH,
      padding: 20,
      position: 'absolute',
      overflow: 'auto',
      backgroundColor: Colors.grey50,
    };
    return (
      <Paper style={style} zDepth={2}>
        <Avatar size={80} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAA7UlEQVR4nO3asQ3CQBAAwX9kiVqogP5DV0AtRFDEBCfDTm6/vbrodfv5un/WoPPx3vL89PffJg//BQVEBUQFRAVEBUQFRAVEBUQFRAVEBUQFRAVEBUR7+j7t6ppAVEBUQFRAVEBUQFRAVEBUQFRAVEBUQFRAVEBUQES7eWv5ft70fqCe3wSiAqICogKiAqICogKiAqICogKiAqICogKiAqICouPf9wP1/5tAVEBUQFRAVEBUQFRAVEBUQFRAVEBUQFRAVEBUQHToC66+39d94LACogKiAqICogKiAqICogKiAqICogKiAqICogKiL2SGHPJ+jTmVAAAAAElFTkSuQmCC" />
        <Profile/>
      </Paper>
    );
  },

});

export default Info;
