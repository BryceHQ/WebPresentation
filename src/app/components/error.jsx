import React from 'react';

import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';

import Alert from './common/alert.jsx';

const ErrorDialog = React.createClass({
  getInitialState() {
    return {open: true};
  },

	render() {
    let {error} = this.props;
    const actions = (
      <RaisedButton
        label="确定"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this._handleClose}
      />
    );
		return (
      <Dialog
        title="Error"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this._handleRequestClose}
      >
        <Alert type="danger">
          {error}
        </Alert>
      </Dialog>
    );
	},

  _handleClose() {
    this.setState({open: false});
  },

  _handleRequestClose() {
    if(this.props.onClearError){
      this.onClearError();
    }
  },
});

export default ErrorDialog;
