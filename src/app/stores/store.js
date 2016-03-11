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
  name: window._config && window._config.userName || 'a',

};
let _data = {
  rightOpen: false,
  leftOpen: false,
  mode: MODE.PRESENTATION,// markdown, presentation
  current: 0,
  title: '未命名',
  slideGroup: [{
    transition: 'slide',
    content: '# 快捷键 \n - Esc: 全屏切换 \n - Space/右/下: 下一页 \n - 左/上: 上一页',
    key: 1,
  }, {
    transition: 'zoom',
    content: '# 幻灯片编辑 \n - 目前仅支持使用markdown进行编辑 \n - 左侧展开后，可以添加，删除某页幻灯片，拖拽可以改变幻灯片的顺序。',
    key: 2,
  }, {
    transition: 'slide',
    content: '### Inspired by impress.js',
    key: 3,
  },{
    transition: 'zoom',
    content: '### powered by React and Meterial UI',
    key: 4,
  }],
};

//helper
function guid() {
  return (+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
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
  autoSave();
}

function titleChange(title) {
  _data.title = title;
  save({name: title});
}

//sidebar
function toggleRight(open) {
  if(open === null || typeof open === 'undefined'){
    return _data.rightOpen = !_data.rightOpen;
  }
  _data.rightOpen = !!open;
}

function toggleLeft(open) {
  if(open === null || typeof open === 'undefined'){
    return _data.leftOpen = !_data.leftOpen;
  }
  _data.leftOpen = !!open;
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
  _data.bottomMessage = null;
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
      changeMode(action.data.mode);
      if(action.data.withoutEmit !== true){
        Store.emitChange();
      }
      break;
    case Constants.CONTENT_CHANGE:
      var {content, index} = action.data;
      contentChange(content, index);
      // Store.emitChange();
      break;
    case Constants.TITLE_CHANGE:
      titleChange(action.data);
      // Store.emitChange();
      break;
    case Constants.TOGGLE_LEFT:
      toggleLeft(action.data);
      Store.emitChange();
      break;
    case Constants.TOGGLE_RIGHT:
      toggleRight(action.data);
      Store.emitChange();
      break;

    case Constants.TOGGLE_FULLSCREEN:
      toggleFullscreen();
      Store.emitChange();
      break;

    //overview
    case Constants.REINSERT:
      reinsert(action.data);
      autoSave();
      Store.emitChange();
      break;
    case Constants.SELECT_SLIDE:
      selectSlide(action.data);
      Store.emitChange();
      break;
    case Constants.ADD_SLIDE:
      addSlide();
      autoSave();
      Store.emitChange();
      break;
    case Constants.REMOVE_SLIDE:
      removeSlide();
      autoSave();
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

//更新presetation中任意属性的值
function save(data){
  data = data || {raw: JSON.stringify(_data.slideGroup), id: 1};
  if(window._config){
    ajax.post(
      window._config.save,
      data,
      function(data){
        if(!data) return;
        if(data.success){
          _data.bottomMessage = '保存成功';
        }else{
          _data.bottomMessage = data.Message;
        }
        Store.emitChange();
      }
    );
  }
}

//只更新presetation.raw
var autoSave = _.debounce(save, 3000);


if(window._config && _user.name){
  ajax.get(
    window._config.get,
    {id: 1},
    function(data){
      if(!data || !data.Raw) return;
      _.assign(_data, {raw: JSON.parse(data.Raw), title: data.Name});
      Store.emitChange();
    }
  );
}

export default Store;
