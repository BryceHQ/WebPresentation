import Dispatcher from '../dispatcher/dispatcher.js';
import { EventEmitter } from 'events';
import Constants from '../constants/constants.js';
import _ from 'lodash';

import ajax from '../ajax.js';
import lang from '../lang/zh-cn.js';

import helper from '../helper.js';

import userStore from './userStore.js';
import presentationStore from './presentationStore.js';

const CHANGE_EVENT = 'change';

let _config = {};

let _data = {
  presentation: presentationStore.data,
  user: userStore.data,
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
      presentationStore.get(fileId, errorHandleCallback);
    }
    return _data;
  },

  getUser(){
    return userStore.data;
  },

  isAuthenticated() {
    return userStore.data.isAuthenticated;
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
    //---------------user------------------
    case Constants.SIGN_IN:
      userStore.signIn(action.data, errorHandleCallback);
      Store.emitChange();
      break;

    //---------------presentation------------------
    case Constants.SAVE:
      presentationStore.save(null, messageCallback);
      break;

    case Constants.CHANGE_MODE:
      presentationStore.changeMode(action.data.mode);
      if(action.data.withoutEmit !== true){
        Store.emitChange();
      }
      break;


    case Constants.CONTENT_CHANGE:
      var {content, index} = action.data;
      presentationStore.contentChange(content, index, messageCallback);
      break;

    case Constants.TITLE_CHANGE:
      presentationStore.titleChange(action.data, messageCallback);
      break;


    case Constants.TOGGLE_LEFT:
      presentationStore.toggleLeft(action.data);
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
      presentationStore.reinsert(action.data, messageCallback);
      Store.emitChange();
      break;

    case Constants.SELECT_SLIDE:
      presentationStore.selectSlide(action.data);
      Store.emitChange();
      break;
    case Constants.ADD_SLIDE:
      presentationStore.addSlide(messageCallback);
      break;
    case Constants.REMOVE_SLIDE:
      presentationStore.moveSlide(messageCallback);
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
* 错误处理的回调函数
*/
function errorHandleCallback(data){
  if(data.success === false){
    _data.error = data.message || data.Message;
  }
  Store.emitChange();
}

/*
* 成功消息和错误处理的回调函数
*/
function messageCallback(data){
  if(data.success === false){
    _data.error = data.message || data.Message;
  }else{
    _data.bottomMessage = '保存成功';
  }
  Store.emitChange();
}


if(_config.user){
  userStore.init(_config.user);
}

export default Store;
