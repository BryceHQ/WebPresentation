import $ from 'jquery';

const Ajax = {
  get(url, data, callback) {
    if(url){
      $.get(url, data, callback);
    }
    else{
      setTimeout(function(){
        callback({});
      }, 0);
    }
  },
  post(url, data, callback) {
    if(url){
      $.post(url, data, callback);
    }
    else{
      setTimeout(function(){
        callback({});
      }, 0);
    }
  },
};

export default Ajax;
