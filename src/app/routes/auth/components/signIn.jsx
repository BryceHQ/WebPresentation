import React from 'react';
import _ from 'lodash';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Checkbox from 'material-ui/lib/checkbox';

import Actions from '../../../actions/actions.js';

//router
import { browserHistory  } from 'react-router';

import Alert from '../../../components/alert.jsx';
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
        <FlatButton label="Sign In" secondary={true} onTouchTap = {this._handleSignIn}
          disabled = {!(userName && password)}
        />
        <FlatButton label="Sign Up" secondary={true} onTouchTap = {() => browserHistory.push('/auth/signup')}/>
      </div>
    );
  },

  _handleSignIn() {
    if(window._config){
      let me = this;
      ajax.post(
        window._config.signIn,
        _.pick(this.state, ['userName', 'password', 'rememberMe']),
        function(data){
          if(!data) return;
          if(data.success){
            //redirect to home
            browserHistory.push('/');
            Actions.signIn({name: data.user});
          }
          else{
            me.setState({ message: data.message});
          }
        }
      );
    }
  },

  _handleChange(key, e) {
    const newState = {};
    if(key === 'rememberMe'){
      newState[key] = e.target.checked;
    }
    else{
      newState[key] = e.target.value || '';
    }
    this.setState(newState);
  },
});

export default SignIn;
