import React from 'react';

import Slide from './slide.jsx';
import Markdown from './markdown.jsx';
import Background from './background.jsx';

import UploadWindow from './uploadWindow.jsx';

import Actions from '../actions/actions.js';


import Constants from '../constants/constants.js';

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
    let {transition, style, content, key, background} = slide;
    background = background || this.props.background;

    var backgroundElem = null;
    if(background !== null && typeof background !== 'undefined'){
      backgroundElem = (<Background url={background} type="gradient"></Background>);
    }

    var upload = null;
    if(mode === Constants.MODE.UPLOADING){
      upload = <UploadWindow open={true}></UploadWindow>;
    }

    return (
      <div className = "slideGroup" style = {this.props.style}>
        <Slide transition = {transition} key = {key}>
          {interpolatedStyles =>
            <div>
              {interpolatedStyles.map(config => {
                return (
                  <div key = {config.key} className = "slideItem" style = {style}>
                    {backgroundElem}
                    {upload}
                    <Markdown mode = {mode} content = {content} index = {index}></Markdown>
                  </div>
                );
              })}
            </div>
          }

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
    var {mode} = this.props;
    var keyCode = e.keyCode;
    if(mode === Constants.MODE.MARKDOWN){
      if(keyCode === 27){
        //esc退出markdown编辑模式
        Actions.changeMode(Constants.MODE.PRESENTATION);
      }
      return;
    }
    if( (mode === Constants.MODE.PRESENTATION || mode === Constants.MODE.FULLSCREEN) &&
      (keyCode === 9 || keyCode === 79 || keyCode === 27 ||
        ( keyCode >= 32 && keyCode <= 34) ||
        (keyCode >= 37 && keyCode <= 40) ||
        keyCode === 83
      ) ) {
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
        case 27: //esc
          Actions.toggleFullscreen();
          break;
        case 83:
          Actions.save();
          if(e.ctrlkey){
          }
          break;
      }

      e.preventDefault();
    }
  },
});


export default SlideGroup;
