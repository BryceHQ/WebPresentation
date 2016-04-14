import classNames from 'classnames';
import CM from 'codemirror';
import React from 'react';
import ReactDOM from 'react-dom';
// import Icons from './icons';
import Icons from './icons.jsx';
import Toolbar from './toolbar.jsx';

import _ from 'lodash';

import Actions from '../../actions/actions.js';
import Constants from '../../constants/constants.js';

import lang from '../../lang.js';


require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/addon/edit/continuelist');

import { getCursorState, applyFormat } from './format.js';

var MarkdownEditor = React.createClass({

	propTypes: {
		onChange: React.PropTypes.func,
		options: React.PropTypes.object,
		path: React.PropTypes.string,
		value: React.PropTypes.string,
	},

	getInitialState () {
		return {
			isFocused: false,
			cs: {},
		};
	},

	componentDidMount () {
		this.codeMirror = CM.fromTextArea(ReactDOM.findDOMNode(this.refs.codemirror), this.getOptions());
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this.codeMirror.on('cursorActivity', this.updateCursorState);
		this._currentCodemirrorValue = this.props.value;
	},

	getOptions () {
		return _.assign({
			mode: 'markdown',
			lineNumbers: false,
			indentWithTabs: true,
			tabSize: '2',
			autofocus: true
		}, this.props.options);
	},

	componentWillUnmount () {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},

	componentWillReceiveProps (nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
	},

	getCodeMirror () {
		return this.codeMirror;
	},

	focus () {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},

	focusChanged (focused) {
		this.setState({ isFocused: focused });
	},

	updateCursorState () {
		this.setState({ cs: getCursorState(this.codeMirror) });
	},

	codemirrorValueChanged (doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		if(this.props.onChange){
			this.props.onChange(newValue);
		}
	},

	toggleFormat (formatKey) {
		applyFormat(this.codeMirror, formatKey);
	},

	renderIcon (icon) {
		return (
			<span className="MDEditor_toolbarButton_icon">
				{icon}
			</span>
		);
	},

	renderButton (formatKey, label, action) {
		if (!action) action = this.toggleFormat.bind(this, formatKey);

		var isTextIcon = (formatKey === 'h1' || formatKey === 'h2' || formatKey === 'h3');
		var className = classNames('MDEditor_toolbarButton', {
			'MDEditor_toolbarButton--pressed': this.state.cs[formatKey]
		}, ('MDEditor_toolbarButton--' + formatKey));

		var labelClass = isTextIcon ? 'MDEditor_toolbarButton_label-icon' : 'MDEditor_toolbarButton_label';

		return (
			<button className={className} onClick={action} title={lang.toolbar[formatKey]}>
				{isTextIcon ? null : this.renderIcon(Icons[formatKey])}
				<span className={labelClass}>{label}</span>
			</button>
		);
	},

	renderToolbar () {
		return (
			<div className="MDEditor_toolbar">
				{this.renderButton('h1', 'h1')}
				{this.renderButton('h2', 'h2')}
				{this.renderButton('h3', 'h3')}
				{this.renderButton('indent', 'in')}
				{this.renderButton('bold', 'b')}
				{this.renderButton('italic', 'i')}
				{this.renderButton('listNumbered', 'ol')}
				{this.renderButton('listBulleted', 'ul')}
				{this.renderButton('quote', 'q')}
				{this.renderButton('code', 'c')}
				{this.renderButton('strikeThrough', 's')}
				{this.renderButton('photo', 'p', () => Actions.changeMode(Constants.MODE.UPLOADING))}
				{/*this.renderButton('link', 'a')*/}
			</div>
		);
	},

	render () {
		let {transition, duang} = this.props;
		var editorClassName = classNames('MDEditor_editor', { 'MDEditor_editor--focused': this.state.isFocused });
		return (
			<div className="MDEditor">
				<Toolbar transition={transition} duang={duang}>
					{this.renderToolbar()}
				</Toolbar>
				<div className={editorClassName}>
					<textarea ref="codemirror" className="markdown-textarea" name={this.props.path} defaultValue={this.props.value} autoComplete="off" />
				</div>
			</div>
		);
	}

});

export default MarkdownEditor;
