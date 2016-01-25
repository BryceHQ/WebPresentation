import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import Actions from '../actions/actions.js';

import SlideGroup from './slideGroup.jsx';

const AppLeftNav = React.createClass({
  getDefaultProps() {
    return {open: false};
  },

  render() {
    return (
      <div>
        <LeftNav docked = {false}
          width = {200}
          open = {this.props.open}
          onRequestChange = {open => Actions.toggleLeftNav({open})}>
        </LeftNav>
      </div>
    );
  },
});

export default AppLeftNav;
