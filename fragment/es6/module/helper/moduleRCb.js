/**
 * Created by monk on 2018/3/2.
 */


exports.done = false
var a = require('./moduleRCa')
console.log('PART RC CommonJS b模块运行： a.done=%j',a.done)
exports.done = true
console.log('PART RC CommonJS b.js执行完毕')