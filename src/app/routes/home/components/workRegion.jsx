/**
* 工作区
*/
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import _ from 'lodash';

import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';

import Constants from '../../../constants/constants.js';
import Store from '../../../stores/store.js';

import ajax from '../../../ajax.js';

import AllFiles from './allFiles.jsx';
import RecentFiles from './recentFiles.jsx';

const styles = {
  root: {
    top: Constants.APPBAR_HEIGHT,
    left: Constants.INFO_WIDTH,
    bottom: '0px',
    right: '0px',
    // height: '100%',
    padding: 20,
    // marginLeft: Constants.INFO_WIDTH,
    position: 'absolute',
    backgroundColor: Colors.white,
    overflow: 'auto',
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  inkBar: {
    backgroundColor: Colors.teal200,
  },
  tab: {
    backgroundColor: Colors.white,
    color: Colors.black,
  }
};
const WorkRegion = React.createClass({
  getInitialState() {
    this._flag = {};
    return {};
  },

  getDefaultProps(){
    return {
      placeholder: '加载中...'
    };
  },

  render() {
    var {recent, all} = this.state;
    var {placeholder} = this.props;

    if(!recent){
      this._handleChange('recent');
    }
    let otherProps = {};
    var me = this;
    ['all', 'recent'].forEach(function(key){
      if(!me._flag[key]){
        otherProps[key] = {placeholder: placeholder};
      }
    });
    return (
      <div style = {styles.root}>
        <Tabs inkBarStyle = {styles.inkBar} onChange = {this._handleChange}>
          <Tab label="最近的文件" style={styles.tab} value="recent">
            <RecentFiles data = {recent} onError = {this._handleError} {...otherProps.recent}/>
          </Tab>
          <Tab label="全部文件" style={styles.tab} value="all">
            <AllFiles data = {all} onError = {this._handleError} {...otherProps.all}/>
          </Tab>
        </Tabs>
      </div>
    );
  },

  _handleChange(value) {
    var config = Stroe.getConfig();
    if(!this._flag[value] && config){
      let me = this;
      ajax.get(
        config[value],
        function(data){
          if(!data) return;
          me._flag[value] = true;

          if(data.success === false){
            me._handleError(data.message);
          }
          else{
            let newState = {};
            newState[value] = data;
            me.setState(newState);
          }
        }
      );
    }
  },

  _handleError(error){
    if(this.props.onError){
      this.props.onError(error);
    }
  }

});

export default WorkRegion;
