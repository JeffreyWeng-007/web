/**
 * Created by monk on 2018/3/19.
 */

/**
 * 1.如果没有异步事件，不会进入EventLoop,程序结束
 * 2.总是先执行主线程程序，再执行异步事件
 *   132
 * **/
// function test() {console.log(1)}
// function x() {
//       setTimeout(function () {
//         console.log(2)
//       },0)
// }
// process.nextTick(() => console.log(3));
// x();
// test();

/**
 *  1.存在异步队列
 *  2.EventLoop进来的第一件事情就是检查Timer有没有到时，然后再是IO---poll
 *  3.由于setTimeout 0，其实最少是1ms的随机数秒数，所以跳过Timer阶段
 *    2431
 **/
// Promise.resolve().then(
//   //当此处不是function时,会比2先打印出来。
//   () => console.log(3)
// );
// setTimeout(() => console.log(1),0);
// process.nextTick(() => console.log(4));
// (() => console.log(2))();
// var i = 0;
// while (i<10000) {
//   i++
// }

/**
 * 1.Immediate与Timeout在主线程中是  《无法确定》  执行顺序的
 * 2.进入事件循环以后，timeout有可能到了1毫秒，也可能还没到1毫秒
 *  512或521
 */
// setTimeout(() => console.log(1),0);
// setImmediate(() => console.log(2));
// (() => console.log(5))();

/**
 * 1.异步线程，Immediate与Timeout顺序确定,因为在Poll阶段，Queue为空时会先执行setImmediate，之后才执行timeout
 * 2.把fs改成timeout或promise，则任然无法确定顺序。未知中....
 *  5-3-32-2-1
 **/

// 问题点，callback中，immediate不是立即执行。1234
setTimeout(function () {
  setImmediate(() => console.log(4));
  setTimeout(() => console.log(3),0);
  process.nextTick(() => console.log(2));
},500)
process.nextTick(() => console.log(1));

// var fs = require('fs')
// fs.readFile('./data.json',function () {
//   setTimeout(() => console.log(1),0);
//   setImmediate(() => console.log(2));
//   process.nextTick(() => console.log(32));
// })
// process.nextTick(() => console.log(3));
// (() => console.log(5))();


/**
 * 第一次调用nextTick输出3，
 * 然后执行外面的Immediate，输出1，
 * 由于队列没清空，所以执行后面的Immediate
 * 之后进入下一阶段的Immediate
 * 3142
 **/
// setImmediate(function () {
//   console.log(1)
//   process.nextTick(function () {
//     console.log(2)
//   })
// })
// process.nextTick(function () {
//   console.log(3)
//   setImmediate(function () {
//     console.log(4)
//   })
// })


/**
 * 追加在本轮循环的异步任务 process.nextTick、Promise 快
 * 追加在次轮循环的异步任务 setTimeout、setInterval、setImmediate 慢
 */
// setTimeout(() => console.log(1),0);
// setImmediate(() => console.log(2));
// process.nextTick(() => console.log(3));
// Promise.resolve().then(()=>console.log(4));
// (() => console.log(5))();