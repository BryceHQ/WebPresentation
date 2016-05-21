import React from 'react';

import Constants from '../../../constants/constants.js';

import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import Paper from 'material-ui/lib/paper';

import Profile from './profile';

const styles = {
  paper: {
    textAlign: 'center',
    top: Constants.APPBAR_HEIGHT,
    left: '0px',
    bottom: '0px',
    width: Constants.INFO_WIDTH,
    padding: 20,
    position: 'absolute',
    overflow: 'auto',
    backgroundColor: Colors.grey50,
  },
  avatar: {borderRadius: '0'}
};

const Info = React.createClass({

  render() {
    let {user} = this.props;
    return (
      <Paper style={styles.paper} zDepth={2}>
        <Avatar size={80} src={user.icon} style={styles.avatar}/>
        <Profile user={this.props.user}/>
      </Paper>
    );
  },

});

export default Info;
