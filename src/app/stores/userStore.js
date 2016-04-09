import _ from 'lodash';

import ajax from '../ajax.js';
import lang from '../lang.js';
import history from '../history.js';

import Store from './store.js';

let _user = {
  id: '',
  name: '',
  description: '',
  icon: null,
  isAuthenticated: false,
};

//更新用户信息
function save(data, callback){
  var config = Store.getConfig().user;
  if(config){
    data = data || _.pick(_user, ['name', 'description']);
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

function logout(callback){
  var config = Store.getConfig().user;
  if(config){
    ajax.post(
      config.logout,
      function(data){
        if(data === null || typeof data === 'undefined') return;
        if(data.success !== false){
          _.assign(_user, {
            id: '',
            name: '',
            description: '',
            icon: '',
            isAuthenticated: false,
          });

          history.to('/');
        }
        callback(data, true);
      }
    );
  }
}

var userStore = {
  data: _user,

  init(config) {
    _.assign(_user, _.pick(config, ['id', 'name', 'description', 'icon', 'isAuthenticated']));
  },

  signIn(data) {
    _.assign(_user, _.pick(data, ['id', 'name', 'description', 'icon']), {isAuthenticated: true});
  },

  logout: logout,

  update(data, callback) {
    save(_.assign(_user, data), callback);
  },
};

export default userStore;
