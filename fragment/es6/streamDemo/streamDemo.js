/**
 * Created by monk on 2018/3/9.
 */

var http = require('http')
var fs = require('fs')
var Readable = require('stream').Readable

/*
*
* 基础篇
*
*/
/****readStream****/
// Part 1 正常情况下的请求
// http.createServer( (req, res) => {
//
//   fs.readFile(__dirname + '/data.txt', function (err, data) {
//     res.end(data)
//   })
//
// }).listen(3000)

// Part 2 未消费内存占用
// http.createServer( (req, res) => {
//   var stream = fs.createReadStream(__dirname + '/data.txt')
//   stream.pipe(res)
// }).listen(3001)

// Part 4
/*Type 使用pipe消耗可读流*/
// const zlib = require('zlib');
//
// const r = fs.createReadStream(__dirname + 'data.txt');
// const z = zlib.createGzip();
// const w = fs.createWriteStream(__dirname + 'data.txt.gz');
// r.pipe(z).pipe(w);

/*Type2 使用监听消耗可读流*/
// class ToReadable extends Readable {
//   constructor(iterator) {
//     super()
//     this.iterator = iterator
//   }
//   _read() {
//     const res = this.iterator.next()
//     if (res.done) {
//       this.push(null)
//     }
//     setTimeout(() => {
//       this.push(res.value + `\n`)
//     }, 0)
//   }
// }
//
// const gen = function *(a) {
//   let count = 5,
//       res = a;
//   while(count--) {
//     res = res*res;
//     yield res
//   }
// }
//
// const readable = new ToReadable(gen(2))
// // 监听`data`事件，一次获取一个数据
// readable.on('data', function (data) {
//   process.stdout.write(data)
// })
// readable.on('end', () => process.stdout.write('readable stream ends~'))
// readable.on('error', () => console.log('error'))

/***Writable***/
//part 5
// const Writable = require('stream').Writable
// const writable = Writable()
//
// writable._write = (chunck, enc, next) => {
//   process.stdout.write(chunck.toString().toUpperCase())
//   // 写入完成时，调用`next()`方法通知流传入下一个数据
//   process.nextTick(next)
// }
// writable.on('finish', () => process.stdout.write('DONE'))
//
// writable.write('a'+'\n')
// writable.write('b'+'\n')
// writable.write('c'+'\n')
// writable.end()


/***Duplex***/
// var Duplex = require('stream').Duplex
// var duplex = Duplex()
//
// duplex._read = function () {
//   this._readNum = this._readNum || 0
//   if (this._readNum > 1) {
//     this.push(null)
//   } else {
//     this.push('' + (this._readNum++))
//   }
// }
// duplex._write = function (buf, enc, next) {
//   process.stdout.write('_write ' + buf.toString() + '\n')
//   next()
// }
//
// duplex.on('data', data => console.log('ondata', data.toString()))
//
// duplex.write('a')
// duplex.write('b')
// duplex.end()

/***Tranform***/
// var Transform = require('stream').Transform
// class Rotate extends Transform {
//   constructor(n) {
//     super()
//     this.offset = (n || 13) % 26
//   }
// // 将可写端写入的数据变换后添加到可读端
//   _transform(buf, enc, next) {
//     var res = buf.toString().split('').map(c => {
//       var code = c.charCodeAt(0)
//       if (c >= 'a' && c <= 'z') {
//         code += this.offset
//         if (code > 'z'.charCodeAt(0)) {
//           code -= 26
//         }
//       } else if (c >= 'A' && c <= 'Z') {
//         code += this.offset
//         if (code > 'Z'.charCodeAt(0)) {
//           code -= 26
//         }
//       }
//
//       return String.fromCharCode(code)
//     }).join('')
// // 调用push方法将变换后的数据添加到可读端
//     this.push(res)
// // 调用next方法准备处理下一个
//     next()
//   }
// }
//
// var transform = new Rotate(3)
// transform.on('data', data => process.stdout.write(data))
// transform.write('hello, ')
// transform.write('world!')
// transform.end()

/*
 *
 * 中级篇
 *
 */