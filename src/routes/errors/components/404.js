import React from 'react';
import _ from 'lodash';

import PureRenderMixin from 'react-addons-pure-render-mixin';

import Alert from '../../../components/common/alert';
import AppBar from '../../../components/appbar';

import Store from '../../../stores/store.js';


const NotFound = React.createClass({
  mixins: [PureRenderMixin],

  render() {

    return (
      <div>
        <AppBar simple = {true} user={Store.getUser()}/>
        <div className = "align-center">
          <Alert type="warning">
            <p>您访问的页面不存在</p>
          </Alert>
        </div>
      </div>
    );
  },

});

export default NotFound;
