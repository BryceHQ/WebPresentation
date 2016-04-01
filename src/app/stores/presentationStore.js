import Constants from '../constants/constants.js';
import _ from 'lodash';

import history from '../history.js';

import ajax from '../ajax.js';
import lang from '../lang.js';

import Store from './store.js';

import helper from '../helper.js';

const MODE = Constants.MODE;

let _lastMode = MODE.PRESENTATION;

let _presentation = {
  fileId: 'readme',
  rightOpen: false,
  leftOpen: false,
  loading: false,
  mode: MODE.PRESENTATION,// markdown, presentation, uploading
  current: 0,
  title: 'readme',
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
  }, {
    transition: 'zoom',
    content: '### powered by React and Meterial UI',
    key: 4,
  }],
};

let _reset = {
  rightOpen: false,
  leftOpen: false,
  mode: MODE.PRESENTATION,
  current: 0,
  loading: false,
  background: null,
};

//helper
function guid() {
  return (+new Date() * 1e6 + Math.floor(Math.random() * 1e6)).toString(36);
}

function changeMode(mode) {
  mode = mode || _lastMode;
  _lastMode = _presentation.mode;
  _presentation.mode = mode;
}

function get(fileId, callback){
  var config = Store.getConfig();
  ajax.get(
    config.get,
    {id: fileId},
    function(data){
      if(!data) return;
      if(data.success !== false){
        _.assign(_presentation, {
          fileId: data.id,
          slideGroup: JSON.parse(data.raw),
          title: data.name,
        }, _reset);
      }
      callback(data, true);
    }
  );
}

//新增
function add(callback){
  var config = Store.getConfig();
  if(config){
    var me = this;
    ajax.post(
      config.add,
      function(data){
        if(!data) return;

        callback(data);
      }
    );
  }
}

//更新presetation中任意属性的值
function save(data, callback){
  var config = Store.getConfig();
  data = data || {raw: JSON.stringify(_presentation.slideGroup), id: _presentation.fileId};
  ajax.post(
    config.save,
    data,
    function(data){
      if(data === null || typeof data === 'undefined') return;
      callback(data);
    }
  );
}

//只更新presentation.raw
var autoSave = _.debounce(save, 3000);

var presentationStore = {
  data: _presentation,

  // init(config) {
  // },
  add: add,
  save: save,

  get(fileId, callback) {
    if(fileId !== _presentation.fileId){
      get(fileId, callback);
      _presentation.loading = true;
    }
  },

  changeMode: changeMode,

  contentChange(content, index, callback) {
    _presentation.slideGroup[index].content = content;
    autoSave(null, callback);
  },

  titleChange(title, callback) {
    _presentation.title = title;
    changeMode(_lastMode);
    save({name: title, id: _presentation.fileId}, callback);
  },

  //sidebar
  toggleRight(open) {
    if(open === null || typeof open === 'undefined'){
      return _presentation.rightOpen = !_presentation.rightOpen;
    }
    _presentation.rightOpen = !!open;
  },

  toggleLeft(open) {
    if(open === null || typeof open === 'undefined'){
      return _presentation.leftOpen = !_presentation.leftOpen;
    }
    _presentation.leftOpen = !!open;
  },

  //fullscreen
  fullscreen() {
    if(_presentation.mode === MODE.FULLSCREEN){
      _presentation.mode = _lastMode;
      _lastMode = MODE.FULLSCREEN;
    }
    else{
      _lastMode = _presentation.mode;
      _presentation.mode = MODE.FULLSCREEN;
      _presentation.bottomMessage = lang.message.fullscreen;
    }
  },

  //overview
  reinsert({from, to}, callback) {
    let arr = _presentation.slideGroup;
    const val = arr[from];
    arr.splice(from, 1);
    arr.splice(to, 0, val);
    _presentation.current = to;

    autoSave(null, callback);
  },

  selectSlide(index){
    _presentation.current = index;
  },

  addSlide(index){
    _presentation.slideGroup.splice(++_presentation.current, 0, {
      transition: 'slide',
      content: '# 请输入标题',
      key: guid(),
    });
  },

  removeSlide(index){
    _presentation.slideGroup.splice(_presentation.current, 1);
    if(_presentation.current > 0){
      _presentation.current--;
    }
  },


  //slide
  next() {
    if(_presentation.current < _presentation.slideGroup.length - 1 ){
      _presentation.current += 1;
      return true;
    }
  },

  pre() {
    if(_presentation.current > 0){
      _presentation.current -= 1;
      return true;
    }
  },

  //upload
  setBackground(url){
    _presentation.slideGroup[_presentation.current].background = url;
  },

  setDefaultBackground(url){
    _presentation.background = url;
    Store.setMessage(lang.message.successOperate);
  },
};

export default presentationStore;
