/**
 * Created by monk on 2018/2/27.
 */
var dgram = require('dgram')

var udp = () => {
  return dgram.createSocket('udp4')
}
udp.bind('3306',function () {
  console.log('#server-$UDP: PORT:3306 has bind')
})
udp.on('message',function (msg, rinfo) {
  console.log('#server-$UDP: ' + msg)
  console.log('#server-$UDP: info: ' + rinfo.port)
  var buf = new Buffer({'messages' : '#server-$UDP:发送：收到信息为：' + msg})
  udp.send(buf,0,buf.length,rinfo.port,rinfo.address)
})

module.exports = udp