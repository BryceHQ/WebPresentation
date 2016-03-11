import React from 'react';
import Avatar from 'material-ui/lib/avatar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

const SimpleList = React.createClass({
  render() {
    var {data} = this.props;
    var children = [];
    data.forEach(function(item, i){
      children.push(
        <ListItem key = {i} innerDivStyle = {{
          padding: '5px',
        }}
          primaryText={
            <div>
              <span className = "text-name">{item.name}</span>
              <span className = "text-info">
                {item.value}
              </span>
            </div>
          }
        />
      );
    });
    return (
      <List style = {{
        width: '400px',
        padding: '0px 20px',
      }}>
        {children}
      </List>
    );
  },
});

export default SimpleList;
