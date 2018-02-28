import * as api from '../api'
import * as types from './mutation-types'
import * as io from 'socket.io-client'
// import * as dgr from 'dgram'

export const getAllMessages = ({ commit },ty) => {
  api.getMessages(messages => {
    commit(types.GET_INDEXDATAS, {
      messages
    })
  },ty)
}

export const login = ({ commit }) => {
  commit(types.GET_SIGNINUP, {
    data : 0
  })
}

export const socketEmit = ({ state,commit },msg) => {
  if (state.socket == "") {
    state.socket = io.connect('http://localhost:8888')
    state.socket.on('message',function (data) {
      console.log('$client: 收到消息: ' + JSON.stringify(data))
      commit(types.GET_SOCKETMSG, {
        data
      })
    })
    state.socket.on('disconnect',function () {
      console.log('$client: 客户端断开连接')
    })
  }
  console.log('$client: 发送消息：' + msg)
  state.socket.send(msg)
}

export const udpSocketEmit = ({ state,commit },msg) => {
  if (state.udpSocket == "") {
    state.udpSocket = dgr.createSocket('udp4')
    state.udpSocket.on('message',function (msg,rinfo) {
      console.log('$UDP-client: 收到消息: ' + JSON.stringify(msg))
      console.log('$UDP-client: 服务器信息： ' + rinfo.address +'端口：' + rinfo.port)
      commit(types.GET_SOCKETMSG, {
        msg
      })
    })
  }
  console.log('$UDP-client: 发送消息：' + msg)
  msg = new Buffer(msg)
  state.udpSocket.send(msg, 0, msg.length, 3306, "localhost", function (err, bytes) {
    if (err) console.log('UDP-client: 发送消息失败')
    else console.log('UDP-client: 已发送%d字节数据',bytes)
  })
}
