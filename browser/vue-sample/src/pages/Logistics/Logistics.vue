<template>
  <div class="hello">
    <navHeader :headTitle="ht">
      <span slot="logo" class="header"></span>
    </navHeader>
    <div>收到的信息:</div>
    <div>{{ socketMSG }}</div>

    <input name="emitMSG" placeholder="请输入要发送的文本">
    <button @click="send">发送</button>


    <div>-------------UDP-------------</div>
    <div>-------------||--------------</div>
    <div>-------------V---------------</div>
    <div>收到的信息:</div>
    <div>{{ udpSocketMSG }}</div>

    <input name="emitUdpMSG" placeholder="请输入要发送的文本">
    <button @click="sendUDP">发送</button>


  </div>
</template>

<script>
  import navHeader from '../../components/Header'
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
      }
    },
    created () {
      this.initData()
    },
    components: {
      navHeader
//      io
    },
    computed: {
      ...mapState([
        'socketMSG',
        'udpSocketMSG'
      ])
    },
    methods: {
      ...mapActions([
        'socketEmit',
        'udpSocketEmit'
      ]),
      initData () {
        this.ht = 'socket.io'
//        var socket = io.connect('http://localhost:8888')
//        socket.on('message',function (data) {
//          console.log('$client: 收到消息: ' + data)
//          socket.send('客户端已收到消息')
//        })
//        socket.on('disconnect',function () {
//          console.log('$client: 客户端断开连接')
//        })
      },
      send () {
        var msg = $("input[name='emitMSG']").val()
        this.socketEmit(msg)
      },
      sendUDP() {
        var msg = $("input[name='emitUdpMSG']").val()
        this.udpSocketEmit(msg)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../../static/style/mixin.scss";
  .header{
    left:0.4rem;
    font-weight: 400;
  @include sc(0.7rem, #fff);
  @include wh(2.3rem, 0.7rem);
  @include ct;
  }

</style>
