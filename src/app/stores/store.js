import Dispatcher from '../dispatcher/dispatcher.js';
import { EventEmitter } from 'events';
import Constants from '../constants/constants.js';
import _ from 'lodash';

import ajax from '../ajax.js';
import lang from '../lang.js';

import helper from '../helper.js';

import userStore from './userStore.js';
import presentationStore from './presentationStore.js';
import menuStore from './menuStore.js';

const CHANGE_EVENT = 'change';

let _config = {};

let _data = {
  presentation: presentationStore.data,
  user: userStore.data,
  menu: menuStore.data,
};

function setMessage(message){
  _data.bottomMessage = message;
}

function clearMessage(){
  _data.bottomMessage = null;
}

function setError(error){
  _data.error = error;
}

function clearError(){
  _data.error = null;
}


const Store = _.assign({}, EventEmitter.prototype, {
  setConfig(config) {
    if(config){
      _config = config;
      // init other store
      if(_config.user){
        userStore.init(_config.user);
      }
    }
  },

  getConfig(config) {
    return _config;
  },

  setData(data) {
    _data = data;
    this.emitChange();
  },

  getData(fileId) {
    if(fileId){
      presentationStore.get(fileId, defaultCallback);
      menuStore.refresh();
      Store.emitChange();
    }
    return _data;
  },

  getUser(){
    return userStore.data;
  },

  isAuthenticated() {
    return userStore.data.isAuthenticated;
  },

  setMessage: setMessage,

  setError: setError,

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
    //---------------user------------------
    case Constants.SIGN_IN:
      userStore.signIn(action.data);
      Store.emitChange();
      break;

    case Constants.UPDATE_USER:
      userStore.update(action.data, defaultCallback);
      break;

    //---------------presentation------------------
    case Constants.ADD:
      presentationStore.add(function(data){
        defaultCallback(data, true);
        action.data.callback(data);
      });
      break;

    case Constants.SAVE:
      presentationStore.save(null, defaultCallback);
      break;

    case Constants.CHANGE_MODE:
      presentationStore.changeMode(action.data.mode);
      if(action.data.withoutEmit !== true){
        Store.emitChange();
      }
      break;


    case Constants.CONTENT_CHANGE:
      var {content, index} = action.data;
      presentationStore.contentChange(content, index, defaultCallback);
      break;

    case Constants.TITLE_CHANGE:
      presentationStore.titleChange(action.data, defaultCallback);
      break;


    case Constants.TOGGLE_LEFT:
      presentationStore.toggleLeft(action.data);
      menuStore.select(null, defaultCallback, true);
      Store.emitChange();
      break;

    case Constants.TOGGLE_RIGHT:
      presentationStore.toggleRight(action.data);
      Store.emitChange();
      break;

    case Constants.TOGGLE_FULLSCREEN:
      presentationStore.fullscreen();
      Store.emitChange();
      break;

    //overview
    case Constants.REINSERT:
      presentationStore.reinsert(action.data, defaultCallback);
      Store.emitChange();
      break;

    case Constants.SELECT_SLIDE:
      presentationStore.selectSlide(action.data);
      Store.emitChange();
      break;
    case Constants.ADD_SLIDE:
      presentationStore.addSlide(defaultCallback);
      break;
    case Constants.REMOVE_SLIDE:
      presentationStore.moveSlide(defaultCallback);
      break;


    //slide
    case Constants.SLIDE.NEXT:
      if(presentationStore.next() === true){
        Store.emitChange();
      }
      break;

    case Constants.SLIDE.PRE:
      if(presentationStore.pre() === true){
        Store.emitChange();
      }
      break;


    //---------------upload------------------
    case Constants.SET_BACKGROUND:
      presentationStore.setBackground(action.data);
      Store.emitChange();
      break;
    case Constants.SET_DEFAULT_BACKGROUND:
      presentationStore.setDefaultBackground(action.data);
      Store.emitChange();
      break;


    //---------------menu------------------
    case Constants.MENU_SELECT:
      menuStore.select(action.data, defaultCallback);
      break;

    //---------------message------------------
    case Constants.SET_MESSAGE:
      setMessage(action.data);
      Store.emitChange();
      break;
    case Constants.CLEAR_MESSAGE:
      clearMessage();
      Store.emitChange();
      break;

    case Constants.SET_ERROR:
      setError(action.data);
      Store.emitChange();
      break;
    case Constants.CLEAR_ERROR:
      clearError();
      Store.emitChange();
      break;

    default:
      break;
  }
});


/*
* 成功消息和错误处理的回调函数
*
* @param data
* @param success 是否忽略成功状态下的处理
* @param error 是否忽略错误状态下的处理
*/
function defaultCallback(data, success, error){
  if(data.success === false){
    if(!error){
      _data.error = data.message;
    }
  } else if(!success){
    _data.bottomMessage = lang.message.successSave;
  }
  Store.emitChange();
}



export default Store;
