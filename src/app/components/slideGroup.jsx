import React from 'react';

import Slide from './slide.jsx';
import Markdown from './markdown.jsx';

import Actions from '../actions/actions.js';

import Store from '../stores/store.js';


const SlideGroup = React.createClass({
  componentDidMount() {
    window.addEventListener("keyup", this._handleKeyUp);
  },

  componentWillUnmount() {
    window.removeEventListener('keyup', this._handleKeyUp);
  },

  render() {
    let {index, mode, data} = this.props;
    index = index || 0;
    let slide = data[index];
    let {transition, style, content} = slide;

    return (
      <div className = "slideGroup">
        <Slide transition = {transition}>
          <div key = {index} className = "slideItem" style = {style}>
            <Markdown mode = {mode} content = {content} index = {index}/>
          </div>
        </Slide>
      </div>
    );
  },

  updateCode (newCode) {
		this.setState({
			code: newCode
		});
	},


  _handleKeyUp(e) {
    var data = Store.getData();
    if(data.mode !== 'presentation')return;
    var keyCode = e.keyCode;
    if (keyCode === 9 || keyCode === 79 || (
        keyCode >= 32 &&
        keyCode <= 34) || (keyCode >= 37 &&
        keyCode <= 40)) {
      switch (keyCode) {
        case 33: // pg up
        case 37: // left
        case 38: // up
          Actions.slide.pre();
          break;
        case 9: // tab
        case 32: // space
        case 34: // pg down
        case 39: // right
        case 40: // down
          Actions.slide.next();
          break;
        case 79:
          // overView();
          break;
      }

      e.preventDefault();
    }
  },
});


export default SlideGroup;
