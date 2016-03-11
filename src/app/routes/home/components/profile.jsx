import React from 'react';
import _ from 'lodash';

import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

import LinkButton from '../../../components/common/linkButton.jsx';

const Profile = React.createClass({
  getInitialState() {
    return {
      editing: false,
      name: 'bryce',
      description: 'this is me.',
    };
  },

  render() {
    var {editing, name, description} = this.state;
    var self = null;
    if(editing){
      self = (
        <div>
          <TextField
            hintText="nick name"
            value = {name}
            onChange = {this._handleChange.bind(this, 'name')}
          />
          <TextField
            value = {description}
            hintText="say something."
            multiLine={true}
            rowsMax={4}
            onChange = {this._handleChange.bind(this, 'description')}
          />
          <div>
            <FlatButton label="确定" secondary={true} onTouchTap = {this._endEdit}/>
            <FlatButton label="取消" secondary={true} onTouchTap = {this._cancelEdit}/>
          </div>
        </div>
      );
    } else{
      self = (
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
          <LinkButton onClick={this._beginEdit}>编辑个人介绍</LinkButton>
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
