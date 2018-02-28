import * as types from './mutation-types'

export default {
  [types.GET_USERINFO] (state,{ data }) {
    state.userInfo = data
  },
  [types.GET_INDEXDATAS] (state, { messages }) {
    state.indexData = messages
  },
  [types.GET_SIGNINUP] (state, { data }) {
    state.signinUp = data
  },
  [types.GET_SOCKETMSG] (state, { data }) {
    console.log('aaa' + data)
    state.socketMSG = data.messages
  },
  [types.GET_UDPSOCKETMSG] (state, { data }) {
    state.udpSocketMSG = data.messages
  }
}
