import Dispatcher from '../dispatcher/dispatcher.js';
import { EventEmitter } from 'events';
import Constants from '../constants/constants.js';
import _ from 'lodash';

import ajax from '../ajax.js';

import helper from '../helper.js';

const CHANGE_EVENT = 'change';
const MODE = Constants.MODE;

let _lastMode = MODE.PRESENTATION;
let _user = {
  name: window._config && window._config.userName || '',

};
let _data = {
  open: false,
  mode: MODE.PRESENTATION,// markdown, presentation
  current: 0,
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
};

// if(window._config && _user.name){
//   ajax.post(
//     window._config.get,
//     {user: _user.name},
//     function(data){
//       if(!data) return;
//       _data = data;
//     }
//   );
// }

//helper
function guid() {
  return (+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
}

function save(){
  if(window._config){
    ajax.post(
      window._config.save,
      {raw: JSON.stringify(_data)},
      function(data){
        if(!data) return;
        _data.bottomMessage = '保存成功';
      }
    );
  }
}

function signIn(data) {
  _.assign(_user, data);
}

function changeMode(mode) {
  _lastMode = _data.mode;
  _data.mode = mode;
}

function contentChange(content, index) {
  _data.slideGroup[index].content = content;
}

//nav
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

//fullscreen
function toggleFullscreen() {
  if(_data.mode === MODE.FULLSCREEN){
    _data.mode = _lastMode;
    _lastMode = MODE.FULLSCREEN;
  }
  else{
    _lastMode = _data.mode;
    _data.mode = MODE.FULLSCREEN;
  }
}

//overview
function reinsert({from, to}) {
  let arr = _data.slideGroup;
  const val = arr[from];
  arr.splice(from, 1);
  arr.splice(to, 0, val);
  _data.current = to;
}
function selectSlide(index){
  _data.current = index;
}
function addSlide(index){
  _data.slideGroup.splice(++_data.current, 0, {
    transition: 'slide',
    content: '# 请输入标题',
    key: guid(),
  });
}
function removeSlide(index){
  _data.slideGroup.splice(_data.current, 1);
  if(_data.current > 0){
    _data.current--;
  }
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

function clearMessage(){
  delete _data.bottomMessage;
}

const Store = _.assign({}, EventEmitter.prototype, {
  setData(data) {
    _data = data;
    this.emitChange();
  },
  getData() {
    return _data;
  },

  getUser() {
    return _user;
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
    case Constants.SAVE:
      save();
      break;

    case Constants.SIGN_IN:
      signIn(action.data);
      Store.emitChange();
      break;

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

    case Constants.TOGGLE_FULLSCREEN:
      toggleFullscreen();
      Store.emitChange();
      break;

    //overview
    case Constants.REINSERT:
      reinsert(action.data);
      Store.emitChange();
      break;
    case Constants.SELECT_SLIDE:
      selectSlide(action.data);
      Store.emitChange();
      break;
    case Constants.ADD_SLIDE:
      addSlide();
      Store.emitChange();
      break;
    case Constants.REMOVE_SLIDE:
      removeSlide();
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

    case Constants.CLEAR_MESSAGE:
      clearMessage();
      Store.emitChange();
      break;
    default:
      break;
  }
});

export default Store;
