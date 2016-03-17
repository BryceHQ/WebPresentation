import React from 'react';

import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';

import IconActionAccount from 'material-ui/lib/svg-icons/action/account-circle';

/*
* 带缺省头像的Avatar
*/
const DefaultAvatar = React.createClass({
  getDefaultProps() {
    return {
    };
  },

  render() {
    let {src} = this.props;

    return src ?
      <Avatar size={25} src={src} /> : <IconActionAccount color={Colors.white} />;
  },

});

export default DefaultAvatar;
