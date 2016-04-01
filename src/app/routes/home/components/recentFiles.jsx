import React from 'react';

import _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';

// import Constants from '../../../constants/constants.js';
import SimpleTable from '../../../components/common/table.jsx';

import history from '../../../history.js';

import lang from '../../../lang.js';

const styles = {
  btn:  {
    margin: 12,
  },
};

const RecentFiles = React.createClass({
  getDefaultProps() {
    return {
      columns: [
        {key: 'name', text: lang.columns.name},
        {key: 'lastUpdateTime', text: lang.columns.lastUpdateTime},
        {key: 'createTime', text: lang.columns.createTime},
      ],
    };
  },

  render() {
    let {columns, data, placeholder} = this.props;
    return (
      <div style = {styles.root}>
        <SimpleTable data={data} columns={columns} placeholder={placeholder}
          tableProps={{
            onCellClick: this._handleClickCell
          }}
        />
      </div>
    );
  },

  _handleClickCell(row, col) {
    let {data} = this.props;
    let target = data[row];
    if(target && target.id){
      history.to(`/file/${target.id}`);
    }
  },
});

export default RecentFiles;
