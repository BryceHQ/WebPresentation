import React from 'react';
import _ from 'lodash';

import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import LinkButton from '../../../components/common/linkButton';

import Actions from '../../../actions/actions.js';

import lang from '../../../lang.js';

const Profile = React.createClass({
  getInitialState() {
    return {
      editing: false,
      name: this.props.user.name,
      description: this.props.user.description,
    };
  },

  getDefaultProps() {
    return {
      user: {
        name: '',
        description: '',
      }
    };
  },

  render() {
    var {editing, name, description} = this.state;
    var self = null;
    if(editing){
      self = (
        <div>
          <TextField
            hintText={lang.route.home.nicknameHint}
            value = {name}
            onChange = {this._handleChange.bind(this, 'name')}
          />
          <TextField
            value = {description}
            hintText={lang.route.home.descriptionHint}
            multiLine={true}
            rowsMax={4}
            onChange = {this._handleChange.bind(this, 'description')}
          />
          <div>
            <RaisedButton label={lang.button.comfirm} secondary={true} onTouchTap = {this._endEdit} />
            <FlatButton label={lang.button.cancel} secondary={true} onTouchTap = {this._cancelEdit}/>
          </div>
        </div>
      );
    } else{
      self = (
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
          <LinkButton onClick={this._beginEdit}>{lang.route.home.profile}</LinkButton>
        </div>
      );
    }
    return (
      <div>
        {self}
      </div>
    );
  },

  _beginEdit() {
    this._start = _.pick(this.state, ['name', 'description']);
    this.setState({editing: true});
  },

  _endEdit() {
    if(this._start.name !== this.state.name || this._start.description !== this.state.description){
      Actions.updateUser(_.pick(this.state, ['name', 'description']));
    }
    this.setState({editing: false});
  },

  _cancelEdit() {
    this.setState(_.assign(this._start, {editing: false}));
  },

  _handleChange(key, e) {
    var newState = {};
    newState[key] = e.target.value;
    this.setState(newState);
  },
});

export default Profile;
