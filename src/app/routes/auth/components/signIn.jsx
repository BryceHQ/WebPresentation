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
import lang from '../../../lang.js';

const SignIn = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: '',
      rememberMe: true,
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
    let {email, password, rememberMe, message} = this.state;
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
          /><br/>
          <TextField
            hintText={lang.route.signup.passwordHint}
            floatingLabelText={lang.route.signup.passwordLabel}
            type="password"
            onChange = {this._handleChange.bind(this, 'password')}
          /><br/>
          <Checkbox
            label={lang.route.signup.rememberMe}
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
          <RaisedButton label={lang.button.signin} secondary={true} onTouchTap = {this._handleSignIn}
            disabled = {!(email && password)}/>

          <FlatButton label={lang.button.signup} secondary={true} onTouchTap = {() => history.to('/auth/signup')}/>
        </div>
      </div>
    );
  },

  _handleSignIn() {
    var config = Store.getConfig().user;
    if(config){
      let me = this;
      ajax.post(
        config.signIn, {
          data: _.pick(this.state, ['email', 'password', 'rememberMe']),
          success(data) {
            if(!data) return;
            //redirect to home
            history.home();
            Actions.signIn(data);
          },
          error(data) {
            me.setState({ message: data.message});
          },
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
