import Constants from '../constants/constants.js';
import _ from 'lodash';

import ajax from '../ajax.js';

import Store from './store.js';
import Actions from '../actions/actions.js';

import helper from '../helper.js';

let _data = {
  current: 1,
  history: [],
  recent: [],
  refresh: false,
};

//历史记录
function history(callback){
  var config = Store.getConfig();
  var presentation = Store.getData().presentation;
  if(config){
    ajax.get(
      config.history,
      {},
      function(data){
        if(!data) return;
        if(data.success !== false){
          _data.history = data;
        }
        callback(data, true);
      }
    );
  }
}

//最近的文件
function recent(callback){
  var config = Store.getConfig();
  var user = Store.getData().user;
  if(config){
    ajax.get(
      config.recent,
      {userId: user.id},
      function(data){
        if(!data) return;
        if(data.success !== false){
          _data.recent = data;
        }
        callback(data, true);
      }
    );
  }
}


var menuStore = {
  data: _data,

  // init(config) {
  //   _.assign(_user, _.pick(config, ['id', 'name', 'description', 'isAuthenticated']));
  // },

  select(index, callback) {
    console.log('select - ' + index);
    switch (index) {
      case 1: //new
        Actions.add();
        break;
      case 2: //open
        recent(callback);
        break;
      case 3: //download
        break;
      case 4: //history
        history(callback);
        break;
      default:
        break;
    }
    _data.current = index;
  },

};

export default menuStore;
