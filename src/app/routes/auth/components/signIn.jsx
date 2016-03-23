import React from 'react';
import _ from 'lodash';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';

import Actions from '../../../actions/actions.js';
import Store from '../../../stores/store.js';

//history
import history from '../../../history.js';

import Alert from '../../../components/common/alert.jsx';
import AppBar from '../../../components/appbar.jsx';

import ajax from '../../../ajax.js';

const SignIn = React.createClass({
  getInitialState() {
    return {
      userName: '',
      password: '',
      rememberMe: true,
      message: null,
    };
  },

  componentWillReceiveProps(newPorps) {
    this.setState({message: null});
  },

  render() {
    let {userName, password, rememberMe, message} = this.state;
    let alert = message === null ?
      null :
      (
      <Alert type="danger">
        {message}
      </Alert>
    );
    return (
      <div>
        <AppBar simple = {true} />
        <div className = "login">
          {alert}
          <TextField
            hintText="please input your account."
            floatingLabelText="Your Account"
            onChange = {this._handleChange.bind(this, 'userName')}
          /><br/>
          <TextField
            hintText="please input your password."
            floatingLabelText="Your Password"
            type="password"
            onChange = {this._handleChange.bind(this, 'password')}
          /><br/>
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            style={{
              marginTop: 16,
              marginBottom: 16,
              display: 'inline-table',
              textAlign: 'left',
              width: 256,
            }}
            onCheck = {this._handleChange.bind(this, 'rememberMe')}
          /><br/>
          <RaisedButton label="登录" secondary={true} onTouchTap = {this._handleSignIn}
            disabled = {!(userName && password)}/>

          <FlatButton label="注册" secondary={true} onTouchTap = {() => history.to('/auth/signup')}/>
        </div>
      </div>
    );
  },

  _handleSignIn() {
    var config = Store.getConfig().user;
    if(config){
      let me = this;
      ajax.post(
        config.signIn,
        _.pick(this.state, ['userName', 'password', 'rememberMe']),
        function(data){
          if(!data) return;
          if(data.success === false){
            me.setState({ message: data.message});
          }
          else{
            //redirect to home
            history.home();
            Actions.signIn({user: data});
          }
        }
      );
    }
  },

  _handleChange(key, e) {
    var newState = {};
    newState[key] = key === 'rememberMe' ? e.target.checked : (e.target.value || '');
    this.setState(newState);
  },
});

export default SignIn;
