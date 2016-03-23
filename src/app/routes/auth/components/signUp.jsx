import React from 'react';
import _ from 'lodash';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import Actions from '../../../actions/actions.js';
import Store from '../../../stores/store.js';

//history
import history from '../../../history.js';

import Alert from '../../../components/common/alert.jsx';
import AppBar from '../../../components/appbar.jsx';


import ajax from '../../../ajax.js';

const SignUp = React.createClass({
  getInitialState() {
    return {
      userName: '',
      password: '',
      confirmPassword: '',
      message: null,
    };
  },

  componentWillReceiveProps(newPorps) {
    this.setState({message: null});
  },

  render() {
    let {userName, password, confirmPassword, message} = this.state;
    let errorText;
    if(confirmPassword && password !== confirmPassword){
      errorText = '两次输入的密码不一致';
    }
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
            value = {userName}
          /><br/>
          <TextField
            hintText="please input your password."
            floatingLabelText="Your Password"
            type="password"
            onChange = {this._handleChange.bind(this, 'password')}
            value = {password}
          /><br/>
          <TextField
            hintText="please confirm your password."
            floatingLabelText="Confirm Your Password"
            type="password"
            errorText = {errorText}
            onChange = {this._handleChange.bind(this, 'confirmPassword')}
            value = {confirmPassword}
          /><br/>
          <RaisedButton label="注册" secondary={true} onTouchTap = {this._handleSignUp}
            disabled = {!(password === confirmPassword && userName && password)}/>
          <FlatButton label="登录" secondary={true} onTouchTap = {() => history.to('/auth/signin')}/>
        </div>
      </div>
    );
  },

  _handleSignUp() {
    var config = Store.getConfig().user;
    if(config){
      let me = this;
      ajax.post(
        config.signUp,
        _.pick(this.state, ['userName', 'password', 'confirmPassword']),
        function(data){
          if(!data) return;
          if(data.success === false){
            me.setState({ message: data.message });
          }
          else{
            //redirect to home
            history.home();
            Actions.signIn({ user: data });
          }
        }
      );
    }
  },

  _handleChange(key, e) {
    var newState = {};
    newState[key] = e.target.value;
    this.setState(newState);
  },
});

export default SignUp;
