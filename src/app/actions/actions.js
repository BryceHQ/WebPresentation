import Dispatcher from '../dispatcher/dispatcher.js';
import Constants from '../constants/constants.js';

const Action = {
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

  //overview
  reinsert(from, to) {
    Dispatcher.dispatch({
      actionType: Constants.REINSERT,
      data: {from: from, to: to},
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
};

export default Action;
