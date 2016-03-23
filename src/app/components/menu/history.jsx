import React from 'react';
import lang from '../../lang/zh-cn.js';

import ListItem from 'material-ui/lib/lists/list-item';


import Actions from '../../actions/actions.js';

import SimpleList from '../common/list.jsx';


const History = React.createClass({

  render() {
    let {data} = this.props;

    return (
      <div>
        <SimpleList data = {data}/>
      </div>
    );
  },

});

export default History;
