/**
 * Created by monk on 2018/3/9.
 */

var http = require('http')
var fs = require('fs')

/****readStream****/
// Part 1 正常情况下的请求
// http.createServer( (req, res) => {
//
//   fs.readFile(__dirname + '/data.txt', function (err, data) {
//     res.end(data)
//   })
//
// }).listen(3000)

// Part 2 使用流
// http.createServer( (req, res) => {
//   var stream = fs.createReadStream(__dirname + '/data.txt')
//   stream.pipe(res)
// }).listen(3001)


// part 3
// const zlib = require('zlib');
//
// const r = fs.createReadStream(__dirname + 'data.txt');
// const z = zlib.createGzip();
// const w = fs.createWriteStream(__dirname + 'data.txt.gz');
// r.pipe(z).pipe(w);


// Part 4
// const Readable = require('stream').Readable
//
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
// readable.on('data', data => process.stdout.write(data))
// readable.on('end', () => process.stdout.write('readable stream ends~'))
// readable.on('error', () => console.log('error'))

/***Writable***/
//part 5
const Writable = require('stream').Writable
const writable = Writable()

writable._write = (chunck, enc, next) => {
  process.stdout.write(chunck.toString().toUpperCase())
  // 写入完成时，调用`next()`方法通知流传入下一个数据
  process.nextTick(next)
}
writable.on('finish', () => process.stdout.write('DONE'))

writable.write('a'+'\n')
writable.write('b'+'\n')
writable.write('c'+'\n')
writable.end()
