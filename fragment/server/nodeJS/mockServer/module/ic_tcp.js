/**
 * Created by monk on 2018/2/27.
 * 目的是返回每个链接，并为每个链接提供支持
 */
const sio = require('socket.io')

function Server(srv, opts){
  if (!(this instanceof Server)) return new Server(srv, opts);
  if ('object' == typeof srv && srv instanceof Object && !srv.listen) {
    opts = srv;
    srv = null;
  }
  opts = opts || {};
  this.nsps = {};
  this.path(opts.path || '/socket.io');
  this.serveClient(false !== opts.serveClient);
  this.parser = opts.parser || parser;
  this.encoder = new this.parser.Encoder();
  this.adapter(opts.adapter || Adapter);
  this.origins(opts.origins || '*:*');
  this.sockets = this.of('/');
  if (srv) this.attach(srv, opts);
}

function Tcp() {
  if (!(this instanceof Tcp)) return new Tcp()
  this.connects = []
  this.socket = new Object()
}

tcp.prototype.startSocket = (server) => {
  var tcp = sio.listen(server)

}

exports.startSocket = (server) => {
  var tcp = sio.listen(server)
  return new Promise((resolve, reject) => {
    tcp.on('connection', (sock) => {
        socket = sock
        console.log('#server: 连接上socket')
        resolve(sock)

        socket.on('disconnect', () => {
          console.log('#server: 客户端断开连接')
          reject('disconnect')
        })
      })
    })
}


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
//
// exports.socket = (server) => {
//    var sv = sio.listen(server)
//
//   sv.on('connection', function (socket) {
//     console.log('#server: 连接上socket')
//     socket.on('message', function (msg) {
//       console.log('#server: 收到信息： ' + msg)
//       // socket.send({'messages' : 'sv'+msg})
//     })
//     socket.on('disconnect', function () {
//       console.log('#server: 客户端断开连接')
//     })
//   })
// }
