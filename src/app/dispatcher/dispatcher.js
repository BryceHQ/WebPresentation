import {Dispatcher} from 'flux';

const dispatcher = new Dispatcher();

export default dispatcher;

// let dispatcher = new Dispatcher();
//
// let dispatch = dispatcher.dispatch;
// dispatcher.dispatch = (data) => {
//   console.log(data.actionType);
//   dispatch.call(dispatcher, data);
// };
