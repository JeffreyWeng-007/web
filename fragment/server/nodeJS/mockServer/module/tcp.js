/**
 * Created by monk on 2018/2/27.
 */
const sio = require('socket.io')
// var socket;
// exports.startTcp = (server) => {
//   var tcp = sio.listen(server)
//   return new Promise((resolve, reject) => {
//     tcp.on('connection', (sock) => {
//         socket = sock
//         console.log('#server: 连接上socket')
//         resolve(sock)
//
//         socket.on('disconnect', () => {
//           console.log('#server: 客户端断开连接')
//           reject('disconnect')
//         })
//       })
//     })
// }
// exports.received = () => {
//   return new Promise((resolve, reject) => {
//     socket.on('message', function (msg) {
//       resolve({
//         msg: msg
//       })
//       console.log('#server: 收到信息： ' + msg)
//     })
//   })
// }
// exports.send = (data) => {
//   return new Promise((resolve, reject) => {
//      var info = socket.send(data)
//      resolve(info)
//   })
// }

exports.socket = (server) => {
   var sv = sio.listen(server)

  sv.on('connection', function (socket) {
    console.log('#server: 连接上socket')
    socket.on('message', function (msg) {
      console.log('#server: 收到信息： ' + msg)
      // socket.send({'messages' : 'sv'+msg})
    })
    socket.on('disconnect', function () {
      console.log('#server: 客户端断开连接')
    })
  })
}

// var sio = require('socket.io')
// var socket = sio.listen(server)
// socket.on('connection', function (socket) {
//   console.log('#server: 连接上socket')
//   socket.send('你好')
//   socket.on('message', function (msg) {
//     console.log('#server: 收到信息： ' + msg)
//     socket.send({'messages' : 'sv'+msg})
//   })
//   socket.on('disconnect', function () {
//     console.log('#server: 客户端断开连接')
//   })
// })

