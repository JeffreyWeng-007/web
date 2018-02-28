<template>
  <div class="hello" style="height: 100%;">
    <navHeader :headTitle="ht" goBack='true'>
      <span slot="logo" class="header"></span>
    </navHeader>
    <!--<div>User {{ $route.params.id }}-&#45;&#45;{{item}}</div>-->
    <!--<span style="height: 100%;background: red">That is a modal View!</span>-->

    <h1>二维码地址生成系统</h1>

    <h3>请输入要生成的数量<input name="randomField" placeholder="如：100" v-bind="{value : random}"></h3>

    <button @click="requireNum">打印Excel并下载到本地</button>

  </div>
</template>

<script>
  import navHeader from '../components/Header'
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
        random: ""
      }
    },
    props: ['item'],
    created () {
      this.initData()
    },
    components: {
      navHeader
    },
    computed: {
      ...mapState([
        'signinUp',
      ])
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      initData () {
        this.ht = 'Modal'
        this.login()
      },
      requireNum () {
        var that = this
        $.ajax({
          type: 'POST',
          url: 'http://localhost:8888/random',
          data: '',
          dataType: 'json',
          success: function (data) {
            console.log('modal: ' + data.random);
            that.random = data.random
          }
        })
      }
    }
  }
</script>
