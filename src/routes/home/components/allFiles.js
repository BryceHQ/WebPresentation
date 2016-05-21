import React from 'react';
import _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';

import Store from '../../../stores/store.js';
import Actions from '../../../actions/actions.js';

// import Constants from '../../../constants/constants.js';
import SimpleTable from '../../../components/common/table';

import history from '../../../history.js';
import lang from '../../../lang.js';

const styles = {
  btn:  {
    margin: 12,
  },
};

const AllFiles = React.createClass({
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
        <div>
          <RaisedButton label={lang.button.newOne} secondary={true} style={styles.btn} onTouchTap={this._handleNew}/>
        </div>
        <Divider/>
        <SimpleTable data={data} columns={columns} placeholder={placeholder}
          tableProps={{
            onCellClick: this._handleClickCell
          }}/>
      </div>
    );
  },

  _handleNew() {
    var me = this;
    Actions.add();
  },

  _handleClickCell(row, col) {
    let {data} = this.props;
    let target = data[row];
    if(target && target.id){
      history.to(`/file/${target.id}`);
    }
  },
});

export default AllFiles;
