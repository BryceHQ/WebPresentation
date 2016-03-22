import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/constants.js';

const Action = {
  //---------------user------------------

  //---------------presentation------------------
  //add
  add(type){
    Dispatcher.dispatch({
      actionType: Constants.Add,
      data: { type: type },
    });
  },

  //save
  save(){
    Dispatcher.dispatch({
      actionType: Constants.SAVE,
    });
  },

  //sign
  signIn(data) {
    if(!data) return;
    Dispatcher.dispatch({
      actionType: Constants.SIGN_IN,
      data: data,
    });
  },

  changeMode(mode, withoutEmit) {
    Dispatcher.dispatch({
      actionType: Constants.CHANGE_MODE,
      data: {mode: mode, withoutEmit},
    });
  },

  contentChange(content, index) {
    Dispatcher.dispatch({
      actionType: Constants.CONTENT_CHANGE,
      data: {content: content, index: index},
    });
  },

  titleChange(title) {
    Dispatcher.dispatch({
      actionType: Constants.TITLE_CHANGE,
      data: title || '',
    });
  },

  toggleLeft(data) {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_LEFT,
      data: data,
    });
  },

  toggleRight(data) {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_RIGHT,
      data: data,
    });
  },

  //fullscreen
  toggleFullscreen() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_FULLSCREEN,
    });
  },

  //overview
  reinsert(from, to) {
    Dispatcher.dispatch({
      actionType: Constants.REINSERT,
      data: {from: from, to: to},
    });
  },
  selectSlide(index) {
    Dispatcher.dispatch({
      actionType: Constants.SELECT_SLIDE,
      data: index,
    });
  },
  addSlide() {
    Dispatcher.dispatch({
      actionType: Constants.ADD_SLIDE,
    });
  },
  removeSlide() {
    Dispatcher.dispatch({
      actionType: Constants.REMOVE_SLIDE,
    });
  },

  //slide
  slide: {
    next() {
      Dispatcher.dispatch({
        actionType: Constants.SLIDE.NEXT
      });
    },
    pre() {
      Dispatcher.dispatch({
        actionType: Constants.SLIDE.PRE
      });
    },
  },

  //---------------message------------------
  setMessage(message) {
    Dispatcher.dispatch({
      actionType: Constants.SET_MESSAGE,
      data: message,
    });
  },
  clearMessage() {
    Dispatcher.dispatch({
      actionType: Constants.CLEAR_MESSAGE
    });
  },
  setError(error) {
    Dispatcher.dispatch({
      actionType: Constants.SET_ERROR,
      data: error,
    });
  },
  clearError() {
    Dispatcher.dispatch({
      actionType: Constants.CLEAR_ERROR
    });
  },

  //---------------menu------------------
  menuSelect(index) {
    Dispatcher.dispatch({
      actionType: Constants.MENU_SELECT,
      data: index
    });
  },
};

export default Action;
