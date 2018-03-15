/**
 *
 * 跟着readme节奏走
 *
 * **/

(function () {

  /**PART 1**/
  /*认识回调顺序*/
  // setTimeout(console.log, 0, 'a')
  // console.log('b')
  // console.log('c')
  // 答案是b c a

//   /**PART 2**/
//
//   /*忽略这代码，纯粹是引入jquery，node引入jquery*/
//   var $ = require('jquery')(require('jsdom-no-contextify').jsdom().parentWindow);
//   /*忽略这代码，纯粹是引入jquery*/
//
//     /*jq 新的链式编程*/
//     var ajx = $.ajax('data.json')
//     ajx.done(function () {
//       console.log('PART 2 success')
//     })
//       .fail(function () {
//         console.log('PART 2 jq error')
//       })
//       .done(function () {
//         console.log('PART 2 success2')
//       })
//     console.log('PART 2' + Object.prototype.toString.call(ajx)) //返回deferred对象
//
//     /*jq 基于callback的ajax异步*/
//     var ajax = $.ajax({
//       url: 'data.json',
//       success: function () {
//         console.log('PART 2 success')
//         //  doSomething
//       },
//       error: function () {
//         console.log('PART 2 jq error')
//       }
//     })
//     console.log('PART 2' + ajax) //返回XHR对象

//     /**PART 3**/
//       //链式编程  自己使用Deferred封装一个，改变以往直接在doSomething中写一堆逻辑。
//     var waitHandle = () =>
//       {
//         var dtd = $.Deferred();
//         var wait = function (dtd) {
//           var task = function () {
//             var error = false;
//             console.log("PART 3 Deferred执行完成")
//             if (!error) {
//               dtd.resolve() }//表示异步任务完成
//             else {
//               dtd.reject() }//表示失败
//           }
//           setTimeout(task, 2000)
//           return dtd
//         }
//         return wait(dtd)
//       }
//     var w1 = waitHandle()
//     /*以下是精髓,看打印内容*/
//     w1.then(function () {
//       console.log("PART 3 完成操作")
//     },function () {
//       console.log("PART 3 错误")
//     })
//       .then(() => {
//         console.log("PART 3 项目经理新业务，直接在这添加，不用改之前代码")
//       },function () {
//         console.log("PART 3 错误2")
//       })
//     // .reject() 乱套了，见PART 4解释

//   /**PART 5**/
// //ES6 Promise
//   const wait = function () {
//     const promise = new Promise((resolve, reject) => {
//       const task = function () {
//         var error = true;
//         if (!error) {
//           resolve({data: 1}) }
//         else {
//           reject() }
//       }
//       setTimeout(task, 2000)
//     })
//     return promise;
//   }
//   const w = wait();
//   w.then( (data) => {
//     console.log("PART 5 ES6 Promise Success " + data)
//   },() => {
//     console.log("PART 5 ES6 Promise Error")
//   }).then( (data) => {
//     console.log("PART 5 ES6 Promise Success then2 " + data)
//   },() => {
//     console.log("PART 5 ES6 Promise Error then2")
//   })

// /**PART 6**/
// var fs = require('fs');
// var path = require('path');
//
// const readFilePromise = function (fileName) {
//     return new Promise((resolve, reject) => {
//       fs.readFile(fileName, (error, data) => {
//         if (error) {
//           reject(error)
//         } else {
//           resolve(data.toString())
//         }
//       })
//     })
// }
// const fullFileName = path.resolve(__dirname, './data.json');
//   // const fullFileName = path.resolve(__dirname, './data1.json') //模拟error
// const result = readFilePromise(fullFileName)
//   result.then(data => {
//     console.log("PART 6" + data)
//     return JSON.parse(data).name /**精华：使用此方式相当于调用的resolve，进行下级传递**/
//   }
//   // , () => {
//   //   console.log("PART 6 ERROR")
//   // } ／**(A)**／
//   ).then(a => {
//     console.log("PART 6 参数传递: " + a)
//   }).catch(err => {
//     console.log("PART 6 ERROR: " + err.stack)
//   })

// /**PART 7**/
// // 有意思的传递
//   const fullFileName2 = path.resolve(__dirname, './data.json');
//   const result2 = readFilePromise(fullFileName2)
//   const fullFileName3 = path.resolve(__dirname, './data2.json');
//   const result3 = readFilePromise(fullFileName3)
//   result2.then(data => {
//     console.log('PART 7 result2 读取完成' + data)
//     return result3
//   })
//     .then(data => {
//       console.log('PART 7 result3 读取完成' + data)
//     })
//     .catch(err => {
//       console.log('PART 7 ERROR')
//     })

// /**PART 8**/
// // 需同时执行的任务
//   Promise.all([result2,result3]).then(datas => {
//     console.log('PART 8 result2 :' + datas[0]);
//     console.log('PART 8 result3 :' + datas[1]);
//   })
// // 其中之一读取到即可继续执行
//   Promise.race([result2,result3]).then(datas => {
//     console.log('PART 8 result2 :' + datas[0]);
//     console.log('PART 8 result3 :' + datas[1]);
//   })
//

// /*******coroutine*******/
// /**PART 9**/
// // 协程
//   function* asyncJob(x) {
//     try {
//       var y = yield x + 2
//       y = x + 5
//     } catch (e) {
//       console.log('PART 9' + e);
//     }
//     return y
//   }
//   var g = asyncJob(1)
//   console.log('PART 9 coroutine 1: ' + g)
//   console.log('PART 9 coroutine 2: ' + JSON.stringify(g.next()))
//   console.log('PART 9 coroutine 3: ' + JSON.stringify(g.next()))
//   // g.throw('PART 9 coroutine 4: error')
// //
// // // demo
//   var fetch = require('node-fetch');
//   function* cort() {
//     var url = 'https://api.github.com/users/github';
//     var result = yield fetch(url);
//     console.log('PART 9 Demo ' + result.bio);
//   }
//   var cort = cort()
//   console.log('111');
//   var ctResult = cort.next() /*B*/
//   console.log('PART 9 Demo 0 返回的是generator: ' +JSON.stringify(ctResult))
//
//   ctResult.value.then(function (data) {
//     //node-fetch的用法
//     return data.json()
//   }).then(function (data) {
//     console.log('PART 9 Demo 2: ' + JSON.stringify(data))
//
//     console.log('PART 9 Demo 3: ' +JSON.stringify(cort.next(data)))
//   }).catch(() => {
//
//   })
//   console.log('222');

// /******Thunk******/
// /**PART 10**/
// var thunkify = require('thunkify')
// var thunkfs = require('fs')
// var thunkread = thunkify(thunkfs.readFile)
// thunkread('./data2.json')(function (err, str) {
//   console.log('PART 10 ' + str)
// })
//

// /**PART 11**/
// var thunkGen = function* () {
//   var r1 = yield thunkread('./data.json')
//   console.log('PART 11 r1: ' + r1.toString())
//   var r2 = yield thunkread('./data2.json')
//   console.log('PART 11 r2: ' + r2.toString())
// }
// var thunkG = thunkGen()
// var tkr1 = thunkG.next()
// tkr1.value(function (err, data) {
//   console.log('PART 11 r3: ' + data.toString())
//   //这个next把data传给r1打印
//   var tkr2 = thunkG.next(data)
//   tkr2.value(function (err, data) {
//     console.log('PART 11 r4: ' + data.toString())
//     thunkG.next(data)
//     console.log('PART 11 r5: ' + JSON.stringify(thunkG.next()))
//   })
// })
//
// /**PART 12**/
// function run(fn) {
//   var gen = fn();
//
//   function next(err, data) {
//     var result = gen.next(data);
//     if (result.done) return;
//     result.value(next);
//   }
//
//   next();
// }
//
// run(thunkGen);

// /******co函数******/
// /**PART 13**/
// var cothunk = require('thunkify')
// var cothunkfs = require('fs')
// var cothunkread = cothunk(cothunkfs.readFile)

// var coGen = function* () {
//   var f1 = yield cothunkread('./data.json')
//   var f2 = yield cothunkread('./data2.json')
//   console.log('PART 13 f1 :' + f1)
//   console.log('PART 13 f2 :' + f2)
// }
//
// var co = require('co')
// co(coGen).then(() => {
//   console.log('PART 13 co : 执行完毕')
// })
//
// /**PART 14**/
// var pmsfs = require('fs')
// var coReadFile = function (fileName) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       pmsfs.readFile(fileName, function (error, data) {
//         if (error) reject(error)
//         resolve(data)
//       })
//     },2000)
//   })
// }
//
// var pmsGen = function* () {
//   var f1 = yield coReadFile('./data.json')
//   var f2 = yield coReadFile('./data2.json')
//   console.log('PART 14 f1 :' + f1)
//   console.log('PART 14 f2 :' + f2)
// }
//
// //手动撸码样例
// var pmsgen = pmsGen()
//   console.log('111')
//
//   var pmsgen1 = pmsgen.next()
// console.log('222 :' + pmsgen1.value)
// pmsgen1.value.then(function (data) {
//   console.log('333 ：' + data)
//
//   pmsgen.next(data).value.then(function (data) {
//     console.log('444 :' + data)
//
//     pmsgen.next(data)
//   })
// })
//   console.log('555')

//
// //co函数撸码
// var pmsco = require('co')
// pmsco.co(pmsGen).then(() => {
//   console.log('PART 14 co : 执行完毕')
// })

// /**PART 15**/
// var racefs = require('fs')
//   var racecoReadFile = function (fileName) {
//     return new Promise(function (resolve, reject) {
//       racefs.readFile(fileName, function (error, data) {
//         if (error) reject(error)
//         resolve(data)
//       })
//     })
//   }
//
// var raceco = require('co')
// raceco(function* () {
//   var res = yield [
//     racecoReadFile('./data.json'),
//     racecoReadFile('./data2.json')
//   ];
//   console.log('PART 15 co并发 ：' + res[0].toString());
// }).catch(error => {
//   console.log(error);
// });

// /******async函数******/
//   /**PART 15**/
// var asyncFs = require('fs')
// var asyncReadFile = (fileName) => {
//   return new Promise(function (resolve, reject) {
//     asyncFs.readFile(fileName, function (error, data) {
//       if (error) reject(error);
//       resolve(data);
//     })
//   })
// }
// var asyncGen = async function() {
//   try {
//     var f1 = await asyncReadFile('./data.json')
//     var f2 = await asyncReadFile('./data2.json')
//     console.log('PART 16 async f1: ' + f1.toString())
//     console.log('PART 16 async f2: ' + f2.toString())
//   } catch (err) {
//     console.log('PART 16 ' + err);
//   }
// }
// asyncGen().then( (data)=> {
//   console.log('PART 16 执行完毕 ' + data)
// })




})()