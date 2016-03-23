import React from 'react';
import lang from '../../lang/zh-cn.js';

import ListItem from 'material-ui/lib/lists/list-item';

import history from '../../history.js';


import Actions from '../../actions/actions.js';

import SimpleList from '../common/list.jsx';
import LinkButton from '../common/linkButton.jsx';

const styles = {
  list: {
    position: 'absolute',
    height: '100%',
    width: '100px',
  },
  body: {
    position: 'absolute',
    left: '100px',
    top: '63px',
  },
};

const Menu = React.createClass({

  render() {
    let {data} = this.props;

    return (
      <div>
        <SimpleList data = {data}/>
        <div className="align-center">
          <LinkButton onClick={() => history.to('/home')}>到个人中心中查看更多...</LinkButton>
        </div>
      </div>
    );
  },

  _handleMenuSelect(index) {
    if(index === 1){
      Actions.add(function(data){
        if(data.success !== false){
          history.to(`/file/${data}`);
        }
      });
    } else{
      Actions.menuSelect(index);
    }
  },

});

export default Menu;
