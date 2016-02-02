/* globals Pen, micromarkdown */
import React from 'react';

import Actions from '../actions/actions.js';

import _ from 'lodash';
import marked from 'marked';

import Editor from './markdown/MDEditor';

const Markdown = React.createClass({

  render() {
    let {content, mode, style} = this.props;

    if(mode === 'markdown'){
      return (
        <Editor value={this.props.content} onChange={this._updateContent} />
      );
    }
    let preview = '';
    if(content){
      preview = marked(content);
    }
    return (
      <div className="preview" style = {style}
        dangerouslySetInnerHTML={{__html: preview}}
      />
    );
  },

  _updateContent (newContent) {
    Actions.contentChange(newContent, this.props.index);
	},

  // _debounceContentChange: _.debounce(Actions.contentChange),

  // _handleKeyUp(e) {
  //   if(e.keyCode === 111){
  //     Actions.exitEditMode();
  //   }
  // }
});

export default Markdown;
