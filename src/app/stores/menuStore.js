import Dispatcher from '../dispatcher/dispatcher.js';
import { EventEmitter } from 'events';
import Constants from '../constants/constants.js';
import _ from 'lodash';

import ajax from '../ajax.js';

import helper from '../helper.js';

const CHANGE_EVENT = 'change';

let _data = {
  current: 1,
  history: [
    {
      name: 'record1',
      value: 1,
    },{
      name: 'record2',
      value: 2
    },{
      name: 'record3',
      value: 3,
    }
  ]
  // items: [
  //   {
  //     value: 1,
  //     text: 'new',
  //   },{
  //     value: 2,
  //     text: 'open',
  //   },{
  //     value: 3,
  //     text: 'saveAs',
  //   },{
  //     value: 4,
  //     text: 'history',
  //   }
  // ],
};

function select(index){
  _data.current = index;
}


const MenuStore = _.assign({}, EventEmitter.prototype, {
  setData(data) {
    _data = data;
    this.emitChange();
  },
  getData() {
    return _data;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});


// Register callback to handle all updates
Dispatcher.register((action) => {
  switch (action.actionType) {
    case Constants.MENU_SELECT:
      select(action.data);
      MenuStore.emitChange();
      break;
    default:
      break;
  }
});

export default MenuStore;
