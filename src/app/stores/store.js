import Dispatcher from '../dispatcher/dispatcher.js';
import {
  EventEmitter
}
from 'events';
import Constants from '../constants/constants.js';
import _ from 'lodash';

const CHANGE_EVENT = 'change';
let _data = {
  open: false,
  slideGroup: [{
    transition: 'slide'
  }, {
    transition: 'zoom'
  },{
    transition: 'slide'
  },{
    transition: 'zoom'
  }],
  current: 0
};

const toggleLeftNav = (open) => {
  if(open === null || typeof open === 'undefined'){
    return _data.open = !_data.open;
  }
  _data.open = !!open;
};
const closeLeftNav = () => {
  _data.open = false;
};
const openLeftNav = () => {
  _data.open = true;
};

//slide
const slide = {
  next() {
    _data.current += 1;
  },

  pre() {
    _data.current -= 1;
  }
};

const Store = _.assign({}, EventEmitter.prototype, {
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
    case Constants.TOGGLE_LEFT_NAV:
      toggleLeftNav(action.data);

      break;
    case Constants.OPEN_LEFT_NAV:
      openLeftNav(action.data);
      Store.emitChange();
      break;
    case Constants.CLOSE_LEFT_NAV:
      closeLeftNav(action.data);
      Store.emitChange();
      break;

    //slide
    case Constants.SLIDE.NEXT:
      if(_data.current < _data.slideGroup.length - 1 ){
        slide.next();
        Store.emitChange();
      }
      break;
    case Constants.SLIDE.PRE:
      if(_data.current > 0){
        slide.pre();
        Store.emitChange();
      }
      break;
    default:
      break;
  }
  Store.emitChange();
});

export default Store;
