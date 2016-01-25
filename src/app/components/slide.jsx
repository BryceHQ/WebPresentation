import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const Slide = React.createClass({
  render() {
    let {transition} = this.props;

    return (
      <CSSTransitionGroup
        transitionEnterTimeout = {100}
        transitionLeaveTimeout = {100}
        className = "slide"
        transitionName = {transition}>
        {this.props.children}
      </CSSTransitionGroup>
    );
  }
});


export default Slide;
