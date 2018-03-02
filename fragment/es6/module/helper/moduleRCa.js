/**
 * Created by monk on 2018/3/2.
 */

exports.done = false
var b = require('./moduleRCb')
console.log('PART RC CommonJS a模块运行： b.done=%j',b.done)
exports.done = true
console.log('PART RC CommonJS a.js执行完毕')