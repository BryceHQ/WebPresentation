import _ from 'lodash';

import ajax from '../ajax.js';
import lang from '../lang.js';

import Store from './store.js';

let _user = {
  id: '',
  name: '',
  description: '',
  isAuthenticated: false,
};

//更新用户信息
function save(data, callback){
  var config = Store.getConfig().user;
  if(config){
    data = data || _user;
    ajax.post(
      config.save,
      data,
      function(data){
        if(!data) return;
        if(data.success !== false){
          _.assign(_user, _.pick(data, ['name', 'description']));
        }
        callback(data);
      }
    );
  }
}

var userStore = {
  data: _user,

  init(config) {
    _.assign(_user, _.pick(config, ['id', 'name', 'description', 'isAuthenticated']));
  },

  signIn(data) {
    _.assign(_user, _.pick(data, ['id', 'name', 'description']), {isAuthenticated: true});
  },

  update(data, callback) {
    save(_.assign(_user, data), callback);
  },
};

export default userStore;
