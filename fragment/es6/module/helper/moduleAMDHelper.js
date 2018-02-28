/**
 * Created by monk on 2018/2/26.
 */
define (function () {
  var m1 = function (info) {
    console.log(info)
  }
  return {
    m1 : m1
  }
})

// 依赖其它模块，会先加载otherModule模块
// define (['otherModule'], function (otherModule) {
//   var m1 = function (info) {
//     otherModule.doSomething()
//     console.log(info)
//   }
//   return {
//     m1 : m1
//   }
// })