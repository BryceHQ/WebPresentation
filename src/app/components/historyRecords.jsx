import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import FlatButton from 'material-ui/lib/flat-button';

const HistoryRecords = React.createClass({
  render() {
    return (
      <List>
        <ListItem
          primaryText="Grace Ng"
          secondaryText={<a>还原</a>}
          secondaryTextLines = {2}
        />

        <ListItem
          primaryText="Grace Ng"
          secondaryText={<FlatButton label="还原" secondary={true}/>}
          secondaryTextLines = {2}
        />
      </List>
    );
  },
});

export default HistoryRecords;
