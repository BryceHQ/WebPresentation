import React from 'react';
import classNames from 'classnames';

const ALERT_TYPES = [
	'danger',
	'error', // alias for danger
	'info',
	'primary',
	'success',
	'warning'
];

const Alert = React.createClass({

	render() {
		var componentClass = classNames(
			'Alert',
			'Alert--' + this.props.type,
			this.props.className
		);

		return (
			<div className={componentClass}>{this.props.children}</div>
		);
	}
});

export default Alert;
