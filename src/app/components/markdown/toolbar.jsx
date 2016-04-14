import React from 'react';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import Actions from '../../actions/actions.js';

import lang from '../../lang.js';

const styles = {
  root: {
    backgroundColor: 'white'
  },
  dropDown: {
    height: '40px',
  },
};

const SimpleToolbar = React.createClass({
  propTypes: {
    transition: React.PropTypes.string,
  },

  render() {
    let {children, transition, duang} = this.props;
    return (
      <Toolbar style={styles.root}>
        <ToolbarGroup firstChild={true} float="left">
          {children}
        </ToolbarGroup>



        <ToolbarGroup lastChild={true} float="right" >
          <ToolbarTitle text={lang.transition.text} />
          <DropDownMenu value={transition} onChange={(e, index, value) => Actions.transitionChange(value)} style={styles.dropDown}>
            <MenuItem value="fade" primaryText={lang.transition.fade} />
            <MenuItem value="slideRight" primaryText={lang.transition.slideRight} />
            <MenuItem value="slideUp" primaryText={lang.transition.slideUp} />
            <MenuItem value="flash" primaryText={lang.transition.flash} />
            <MenuItem value="bounce" primaryText={lang.transition.bounce} />
            <MenuItem value="zoom" primaryText={lang.transition.zoom} />
            <MenuItem value="flip" primaryText={lang.transition.flip} />
            <MenuItem value="rotate" primaryText={lang.transition.rotate} />
            <MenuItem value="roll" primaryText={lang.transition.roll} />
          </DropDownMenu>
        </ToolbarGroup>

        <ToolbarGroup float="right" >
          <ToolbarTitle text={lang.background.text} />
          <DropDownMenu value={duang} onChange={(e, index, value) => Actions.duangChange(value)} style={styles.dropDown}>
            <MenuItem value="gradient left" primaryText={lang.background.left} />
            <MenuItem value="gradient right" primaryText={lang.background.right} />
            <MenuItem value="gradient" primaryText={lang.background.vague} />
            <MenuItem value="clear" primaryText={lang.background.clear} />
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

export default SimpleToolbar;
