import React from 'react';
import _ from 'lodash';

import RaisedButton from 'material-ui/lib/raised-button';
import Colors from 'material-ui/lib/styles/colors';
import Divider from 'material-ui/lib/divider';

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
    if(window._config){
      ajax.post(
        window._config.add,
        function(data){
          if(!data) return;
          if(data.success){
            history.to(`/file/${data.id}`);
          }else if(this.props.onError){
            this.props.onError(data.message);
          }
        }
      );
    }
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
