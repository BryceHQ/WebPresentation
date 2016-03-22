const constants = {

  //---------------user------------------
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  UPDATE_USER: 'UPDATE_USER',

  //---------------presentation------------------
  Add: 'ADD',
  SAVE: 'SAVE',

  CHANGE_MODE: 'CHANGE_MODE',
  CONTENT_CHANGE: 'CONTENT_CHANGE',
  TITLE_CHANGE: 'TITLE_CHANGE',
  TOGGLE_LEFT: 'TOGGLE_LEFT',
  TOGGLE_RIGHT: 'TOGGLE_RIGHT',
  //fullscreen
  TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',
  //overview
  REINSERT: 'REINSERT',
  SELECT_SLIDE: 'SELECT_SLIDE',
  ADD_SLIDE: 'ADD_SLIDE',
  REMOVE_SLIDE: 'REMOVE_SLIDE',
  SLIDE: {
    NEXT: 'SLIDE.NEXT',
    PRE: 'SLIDE.PRE',
  },

  MODE: {
    MARKDOWN: 'markdown',
    PRESENTATION: 'presentation',
    FULLSCREEN: 'fullscreen',
    EDITING: 'editing',
  },

  //---------------message------------------
  SET_MESSAGE: 'SET_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',


  //---------------style------------------
  APPBAR_HEIGHT: '40px',
  INFO_WIDTH: '300px',
};

export default constants;
