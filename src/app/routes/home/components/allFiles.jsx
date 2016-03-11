import React from 'react';
import _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';

// import Constants from '../../../constants/constants.js';
import SimpleTable from '../../../components/common/table.jsx';

const styles = {
  btn:  {
    margin: 12,
  },
};

const WorkRegion = React.createClass({

  render() {
    var data =  [
      {
        name: 'record1',
        value: 1,
      },{
        name: 'record2',
        value: 2
      },{
        name: 'record3',
        value: 3,
      }
    ];
    var columns = [
      {key:'name', text:'Name'},
      {key:'value', text: 'Value'},
    ];
    return (
      <div style = {styles.root}>
        <div>
          <RaisedButton label="新建" secondary={true} style={styles.btn} />
        </div>
        <Divider/>
        <SimpleTable data={data} columns={columns}/>
      </div>
    );
  },
});

export default WorkRegion;
