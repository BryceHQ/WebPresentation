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
import lang from '../../../lang.js';

import AllFiles from './allFiles';
import RecentFiles from './recentFiles';

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
      placeholder: lang.message.loading,
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
          <Tab label={lang.route.home.recentFiles} style={styles.tab} value="recent">
            <RecentFiles data = {recent} {...otherProps.recent}/>
          </Tab>
          <Tab label={lang.route.home.allFiles} style={styles.tab} value="all">
            <AllFiles data = {all} {...otherProps.all}/>
          </Tab>
        </Tabs>
      </div>
    );
  },

  _handleChange(value) {
    var config = Store.getConfig();
    if(!this._flag[value] && config){
      let me = this;
      ajax.get(
        config[value], {
          success(data) {
            if(!data) return;
            me._flag[value] = true;
            let newState = {};
            newState[value] = data;
            me.setState(newState);
          },
          error(data) {
            me._handleError(data.message);
          },
        }
      );
    }
  },

});

export default WorkRegion;
