import React from 'react';
import _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';

import Store from '../../../stores/store.js';
import Actions from '../../../actions/actions.js';

// import Constants from '../../../constants/constants.js';
import SimpleTable from '../../../components/common/table.jsx';

import history from '../../../history.js';
import ajax from '../../../ajax.js';

const styles = {
  btn:  {
    margin: 12,
  },
};

const AllFiles = React.createClass({
  getDefaultProps() {
    return {
      columns: [
        {key: 'Name', text: '名称'},
        {key: 'LastUpdateTime', text: '修改时间'},
        {key: 'CreateTime', text: '创建时间'},
      ],
    };
  },

  render() {
    let {columns, data, placeholder} = this.props;

    return (
      <div style = {styles.root}>
        <div>
          <RaisedButton label="新建" secondary={true} style={styles.btn} onTouchTap={this._handleNew}/>
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
    Actions.add(function(data){
      if(data.success === false){
        if(me.props.onError){
          me.props.onError(data.message);
        }
      }else{
        history.to(`/file/${data}`);
      }
    });
  },

  _handleClickCell(row, col) {
    let {data} = this.props;
    let target = data[row];
    if(target && target.Id){
      history.to(`/file/${target.Id}`);
    }
  },
});

export default AllFiles;
