import _ from 'lodash';

import ajax from '../ajax.js';
import lang from '../lang/zh-cn.js';

import Store from './store.js';

let _user = {
  id: '',
  name: '',
  description: '',
  isAuthenticated: false,
};

//更新用户信息
function save(data, callback){
  var config = Store.getConfig();
  data = data || _user;
  ajax.post(
    config.save,
    data,
    function(data){
      if(!data) return;
      if(data.success === false){
        _.assign(_user, _.pick(data, ['name', 'description']));
      }
      callback(data);
    }
  );
}

var userStore = {
  data: _user,

  init(config) {
    _.assign(_user, _.pick(config, ['name', 'isAuthenticated']));
  },

  signin(data) {
    _.assign(_user, _.pick(data, ['Id', 'Name', 'Description']), {isAuthenticated: true});
  },

  update(data, callback) {
    save(_.assign(_user, data), callback);
  },
};

export default userStore;
