import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import _ from 'lodash';

import File from '../../../components/file.jsx';

const FilePage = React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return (
      <File params = {this.props.params}/>
    );
  },
});

export default FilePage;
