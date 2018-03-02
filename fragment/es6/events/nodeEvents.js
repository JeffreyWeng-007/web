/**
 * Created by monk on 2018/3/1.
 */

/******Node.js******/
(function () {
/**PART 1**/
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function (arg1, arg2) {
    console.log('PART 1 some_event事件触发: ' + arg1 + arg2)
  }
)
setTimeout(function () {
  event.emit('some_event', 'arg1 参数', 'arg2 参数')
}, 1000)



})()