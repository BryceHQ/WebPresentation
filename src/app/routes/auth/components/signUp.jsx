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
import lang from '../../../lang.js';

const SignUp = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      message: null,
    };
  },

  componentWillReceiveProps(newPorps) {
    this.setState({message: null});
  },

  //@param  message Array||String
  renderMessages(message) {
    if(!message) return null;
    if(_.isArray(message)){
      if(message.length === 0)return null;
      var alerts = [];
      message.forEach(function(msg, i){
        alerts.push(
          <Alert type="danger" key={i}>{typeof msg === 'string' ? msg : msg.description}</Alert>
        );
      });
      return (
        <div>
          {alerts}
        </div>
      );
    }
    return (
      <Alert type="danger">
        {message}
      </Alert>
    );
  },

  render() {
    let {email, password, confirmPassword, message} = this.state;
    let errorText;
    if(confirmPassword && password !== confirmPassword){
      errorText = lang.error.passwordUnmatch;
    }
    let alert = this.renderMessages(message);

    return (
      <div>
        <AppBar simple = {true} />
        <div className = "login">
          {alert}
          <TextField
            hintText={lang.route.signup.userNameHint}
            floatingLabelText={lang.route.signup.userNameLabel}
            onChange = {this._handleChange.bind(this, 'email')}
            value = {email}
          /><br/>
          <TextField
            hintText={lang.route.signup.passwordHint}
            floatingLabelText={lang.route.signup.passwordLabel}
            type="password"
            onChange = {this._handleChange.bind(this, 'password')}
            value = {password}
          /><br/>
          <TextField
            hintText={lang.route.signup.comfirmHint}
            floatingLabelText={lang.route.signup.comfirmLabel}
            type="password"
            errorText = {errorText}
            onChange = {this._handleChange.bind(this, 'confirmPassword')}
            value = {confirmPassword}
          /><br/>
          <RaisedButton label={lang.button.signup} secondary={true} onTouchTap = {this._handleSignUp}
            disabled = {!(password === confirmPassword && email && password)}/>
          <FlatButton label={lang.button.signin} secondary={true} onTouchTap = {() => history.to('/auth/signin')}/>
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
        _.pick(this.state, ['email', 'password', 'confirmPassword']),
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
