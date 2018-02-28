import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions' //巨坑，如果不用* as，在index.vue直接调用，会undefined,因为export是多个，不是一个对象
import * as getters from './getters'
Vue.use(Vuex)

const state = {
  signinUp: 1,
  userInfo: 0,
  indexData: {},
  testDeep: {
    apple: "111"
  },
  socket: "",
  socketMSG: {},
  udpSocket: "",
  udpSocketMSG: {}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
