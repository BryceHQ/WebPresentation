import React from 'react';
import {Motion, spring} from 'react-motion';
import _ from 'lodash';

import Markdown from './markdown.jsx';

import Actions from '../actions/actions.js';

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = {stiffness: 300, damping: 50};
const itemHeight = 150;
const itemWidth = 350;
const {width, height} = window.screen;
const scaleX = (itemWidth/width).toFixed(1);
const scaleY = (itemHeight/height).toFixed(1);
const transformX = -((1 - scaleX) * width / 2).toFixed(0);
const transformY = -((1 - scaleY) * height / 2).toFixed(0);

const DraggableList = React.createClass({
  getDefaultProps() {
    return {data: []};
  },
  getInitialState() {
    return {
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
      order: _.range(this.props.data.length),
    };
  },

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener("touchend", this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  },

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener("touchend", this.handleMouseUp);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  },

  componentWillReceiveProps(nextProps) {
    let data = nextProps.data;
    if(data){
      this.setState({order: _.range(data.length)});
    }
  },

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  },

  handleTouchMove(e) {
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseDown(pos, pressY, {pageY}) {
    this.setState({
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
    });
    this._from = this.state.order.indexOf(pos);
    this._to = this._from;
  },

  handleMouseMove(e) {
    if(!this.state.isPressed) return;
    e.preventDefault();

    const {pageY} = e;
    const {delta, order, lastPressed} = this.state;
    const mouse = pageY - delta;
    const row = clamp(Math.round(mouse / itemHeight), 0, this.props.data.length - 1);
    const newOrder = reinsert(order, order.indexOf(lastPressed), row);
    this.setState({mouse: mouse, order: newOrder});
    this._to = row;
  },

  handleMouseUp() {
    if(this.state.isPressed === true){
      this.setState({isPressed: false, delta: 0});
      if(this._from !== this._to){
        let me = this;
        window.setTimeout(function(){
          Actions.reinsert(me._from, me._to);
          me._from = me._to = 0;
        }, 300);
      }
    }
  },

  render() {
    const {data} = this.props;
    const {mouse, isPressed, lastPressed, order} = this.state;

    return (
      <div className="draggable-list" ref = "container">
        {_.range(data.length).map(i => {
          const index = order.indexOf(i);
          let current = data[i];
          const style = lastPressed === i && isPressed ?
            {
                scale: spring(1.1, springConfig),
                shadow: spring(16, springConfig),
                y: mouse,
              }
            : {
                scale: spring(1, springConfig),
                shadow: spring(1, springConfig),
                y: spring( index * itemHeight, springConfig),
              };
          return (
            <Motion style={style} key={current.key}>
              {({scale, shadow, y}) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, i, y)}
                  onTouchStart={this.handleTouchStart.bind(null, i, y)}
                  className="draggable-list-item"
                  style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: i === lastPressed ? 99 : i,
                  }}>
                  <Markdown mode = "overview" content = {current.content}
              
                  />
                </div>
              }
            </Motion>
          );
        })}
      </div>
    );
  },

});

export default DraggableList;
