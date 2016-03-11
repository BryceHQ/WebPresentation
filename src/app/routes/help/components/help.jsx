import React from 'react';
import _ from 'lodash';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Checkbox from 'material-ui/lib/checkbox';


import Alert from '../../../components/common/alert.jsx';


const SignIn = React.createClass({
  getInitialState() {
    return {
      userName: '',
      password: '',
      rememberMe: true,
      message: null,
    };
  },

  render() {
    return (
      <div className = "help">
        <Alert type="info">
          <p><strong>幻灯片编辑</strong></p>
          <p>目前仅支持使用 <a href="http://wowubuntu.com/markdown/" target="_Blank">markdown</a> 进行编辑</p>
          <p>左侧展开后，可以添加，删除某页幻灯片，拖拽可以改变幻灯片的顺序。</p>
        </Alert>
        <Alert type="info">
          <p><strong>快捷键</strong></p>
          <p>Esc: 全屏切换/退出编辑模式</p>
          <p>Space/右/下: 下一页</p>
          <p>左/上: 上一页</p>
        </Alert>
      </div>
    );
  },

});

export default SignIn;
