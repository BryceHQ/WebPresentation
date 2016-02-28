import React from 'react';
import lang from '../lang/zh-cn.js';

import LeftNav from 'material-ui/lib/left-nav';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

import Actions from '../actions/actions.js';

import StoreMenu from '../stores/storeMenu.js';

import SelectableList from './selectableList.jsx';
import HistoryRecords from './historyRecords.jsx';


const Left = React.createClass({
  getDefaultProps() {
    return {open: false};
  },

  getInitialState() {
    return StoreMenu.getData();
  },

  componentDidMount() {
    StoreMenu.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    StoreMenu.removeChangeListener(this._onChange);
  },

  render() {
    const listStyle = {
      position: 'absolute',
      height: '100%',
      width: '100px',
    };
    let {open, openRight} = this.props;
    let {items, current, history} = this.state;

    let body = current === 4 ? <HistoryRecords data = {history}/> : null;

    return (
      <LeftNav
        style = {{overflow: 'hidden'}}
        width = {500}
        open = {open}
        docked = {false}
        openRight = {false}
        onRequestChange = {open => Actions.toggleLeft(open.open)}
      >
        <div style={{
            padding: '10px 0px 10px 20px',
          }}
        >
          <Avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAA7UlEQVR4nO3asQ3CQBAAwX9kiVqogP5DV0AtRFDEBCfDTm6/vbrodfv5un/WoPPx3vL89PffJg//BQVEBUQFRAVEBUQFRAVEBUQFRAVEBUQFRAVEBUR7+j7t6ppAVEBUQFRAVEBUQFRAVEBUQFRAVEBUQFRAVEBUQES7eWv5ft70fqCe3wSiAqICogKiAqICogKiAqICogKiAqICogKiAqICouPf9wP1/5tAVEBUQFRAVEBUQFRAVEBUQFRAVEBUQFRAVEBUQHToC66+39d94LACogKiAqICogKiAqICogKiAqICogKiAqICogKiL2SGHPJ+jTmVAAAAAElFTkSuQmCC" />
        </div>
        <Divider/>
        <SelectableList onSelectedChange = {this._handleMenuSelect}
          style={listStyle}
        >
          <ListItem value={1} primaryText={lang.menu.new} />
          <ListItem value={2} primaryText={lang.menu.open} />
          <ListItem value={3} primaryText={lang.menu.saveAs} />
          <ListItem value={4} primaryText={lang.menu.history} />
        </SelectableList>

        <div
          style={{
            position: 'absolute',
            left: '100px',
            top: '63px',
          }}
        >
          {body}
        </div>
      </LeftNav>
    );
  },

  _handleMenuSelect(index) {
    Actions.menuSelect(index);
  },

  _onChange() {
    this.setState(StoreMenu.getData());
  },
});

export default Left;
