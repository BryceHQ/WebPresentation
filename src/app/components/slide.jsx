import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import ComplexTransition from './common/complexTransition.jsx';

const _complex = ['bounce'];

const Slide = React.createClass({
  render() {
    let {transition, key} = this.props;
    if(!~_complex.indexOf(transition)){
      return (
        <CSSTransitionGroup
          transitionEnterTimeout = {100}
          transitionLeaveTimeout = {100}
          className = "slide"
          transitionName = {transition}>
          {this.props.children([{key: key}])}
        </CSSTransitionGroup>
      );
    }
    return (
      <ComplexTransition/>
      // <CSSTransitionGroup
      //   transitionEnterTimeout = {100}
      //   transitionLeaveTimeout = {100}
      //   className = "slide"
      //   transitionName = {transition}>
      //   {this.props.children}
      // </CSSTransitionGroup>
    );
  }
});


export default Slide;
