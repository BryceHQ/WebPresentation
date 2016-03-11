import React from 'react';
import _ from 'lodash';

import FlatButton from 'material-ui/lib/flat-button';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Colors from 'material-ui/lib/styles/colors';

import Constants from '../../../constants/constants.js';

import AllFiles from './allFiles.jsx';

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
    return {
    };
  },

  render() {
    var {editing, name, description} = this.state;

    return (
      <div style = {styles.root}>
        <Tabs inkBarStyle = {styles.inkBar}>
          <Tab label="最近的文件" style={styles.tab}>
            <div>
              <h2 style={styles.headline}>Tab One</h2>
              <p>
                This is an example tab.
              </p>
              <p>
                You can put any sort of HTML or react component in here. It even keeps the component state!
              </p>
            </div>
          </Tab>
          <Tab label="全部文件" style={styles.tab}>
            <AllFiles/>
          </Tab>
        </Tabs>
      </div>
    );
  },
});

export default WorkRegion;
