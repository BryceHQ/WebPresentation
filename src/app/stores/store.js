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
  mode: 'presentation',// markdown, presentation
  slideGroup: [{
    transition: 'slide',
    content: '# 1',
    key: 1,
  }, {
    transition: 'zoom',
    content: '# 2',
    key: 2,
  },{
    transition: 'slide',
    content: '# 3',
    key: 3,
  },{
    transition: 'zoom',
    content: '# 4',
    key: 4,
  },{
    transition: 'zoom',
    content: '# 5',
    key: 5,
  },{
    transition: 'zoom',
    content: '# 6',
    key: 6,
  },{
    transition: 'zoom',
    content: '# 7',
    key: 7,
  }],
  current: 0
};

const changeMode = (mode) => {
  _data.mode = mode;
};

const contentChange = (content, index) => {
  _data.slideGroup[index].content = content;
};

function toggleLeftNav(open) {
  if(open === null || typeof open === 'undefined'){
    return _data.open = !_data.open;
  }
  _data.open = !!open;
}
function closeLeftNav() {
  _data.open = false;
}
function openLeftNav() {
  _data.open = true;
}


function reinsert({from, to}) {
  let arr = _data.slideGroup;
  const val = arr[from];
  arr.splice(from, 1);
  arr.splice(to, 0, val);
}

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
    case Constants.CHANGE_MODE:
      changeMode(action.data);
      Store.emitChange();
      break;
    case Constants.CONTENT_CHANGE:
      var {content, index} = action.data;
      contentChange(content, index);
      Store.emitChange();
      break;
    case Constants.TOGGLE_LEFT_NAV:
      toggleLeftNav(action.data);
      Store.emitChange();
      break;
    case Constants.OPEN_LEFT_NAV:
      openLeftNav(action.data);
      Store.emitChange();
      break;
    case Constants.CLOSE_LEFT_NAV:
      closeLeftNav(action.data);
      Store.emitChange();
      break;
    case Constants.REINSERT:
      reinsert(action.data);
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
});

export default Store;
