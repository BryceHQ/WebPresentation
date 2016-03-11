import React from 'react';
import _ from 'lodash';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

const SimpleTable = React.createClass({
  renderBodyRow(item) {
    var {columns} = this.props;
    if(columns && columns.length){
      return _.map(columns, function(col){
        return (
          <TableRowColumn key={col.key}>{item[col.key]}</TableRowColumn>
        );
      });
    }

  },

  render() {
    var {data, columns} = this.props;
    var headerRows = [];
    if(columns && columns.length){
      columns.forEach(function(col){
        headerRows.push(
          <TableHeaderColumn key ={col.key}>{col.text}</TableHeaderColumn>
        );
      });
    }

    var rows = [], me = this;
    if(data && data.length){
      data.forEach(function(item, i){
        rows.push(
          <TableRow key={i}>
            {me.renderBodyRow(item)}
          </TableRow>
        );
      });
    }

    return (
      <Table style = {{
      }}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            {headerRows}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} stripedRows={true}>
          {rows}
        </TableBody>
      </Table>
    );
  },
});

export default SimpleTable;
