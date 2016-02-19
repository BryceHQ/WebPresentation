import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/constants.js';

const Action = {
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

  changeMode(mode) {
    Dispatcher.dispatch({
      actionType: Constants.CHANGE_MODE,
      data: mode,
    });
  },

  contentChange(content, index) {
    Dispatcher.dispatch({
      actionType: Constants.CONTENT_CHANGE,
      data: {content: content, index: index},
    });
  },

  toggleLeftNav(data) {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_LEFT_NAV,
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

  //message
  clearMessage() {
    Dispatcher.dispatch({
      actionType: Constants.CLEAR_MESSAGE
    });
  },
};

export default Action;
