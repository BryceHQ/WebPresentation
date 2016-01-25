import React from 'react';

import Slide from './slide.jsx';

import Actions from '../actions/actions.js';

const SlideGroup = React.createClass({
  componentDidMount: function() {
    document.addEventListener("keyup", this._handleKeyUp);
  },

  componentWillUnmount: function() {
    document.removeEventListener('keyup', this._handleKeyUp);
  },

  render() {
    let index = this.props.index || 0;
    let slide = this.props.data[index];
    let {transition, style} = slide;

    return (
      <div className = "slideGroup">
        <Slide transition = {transition}>
          <div key = {index} className = "slideItem" style = {style}>{transition}</div>
        </Slide>
      </div>
    );
  },



  _handleKeyUp(event) {
    var keyCode = event.keyCode;
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

      event.preventDefault();
    }
  },
});


export default SlideGroup;
