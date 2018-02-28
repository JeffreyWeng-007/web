<template>
  <div id="app">
    <router-view></router-view>
    <!--<navFooter v-on:bb="cc"></navFooter>-->
    <navFooter v-model="select">
      <tabbarItem id="index" v-on:Router="toRouter" isRouter>
        <img src="../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_home_active.png" alt="" slot="icon-active">
        <span slot="text">教程</span>
      </tabbarItem>
      <tabbarItem id="logistics" v-on:Router="toRouter" isRouter>
        <img src="../assets/images/ic_tab_subject_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_subject_active.png" alt="" slot="icon-active">
        <span slot="text">待扩展</span>
      </tabbarItem>
      <tabbarItem id="shoppingCart" v-on:Router="toRouter" isRouter>
        <img src="../assets/images/ic_tab_status_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_status_active.png" alt="" slot="icon-active">
        <span slot="text">待扩展</span>
      </tabbarItem>
      <tabbarItem id="chats" v-on:Router="toRouter" isRouter>
        <img src="../assets/images/ic_tab_group_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_group_active.png" alt="" slot="icon-active">
        <span slot="text">待扩展</span>
      </tabbarItem>
      <tabbarItem id="me" v-on:Router="toRouter" isRouter>
        <img src="../assets/images/ic_tab_profile_normal.png" alt="" slot="icon-normal">
        <img src="../assets/images/ic_tab_profile_active.png" alt="" slot="icon-active">
        <span slot="text">待扩展</span>
      </tabbarItem>
    </navFooter>
  </div>
</template>

<script>
  import navFooter from '../components/Footer.vue'
  import tabbarItem from '../components/Tabbar-item.vue'

  import {mapState, mapMutations} from 'vuex'
  export default {
    data() {
      return {
        select: 'index'
      }
    },
    components: {
      navFooter,
      tabbarItem
    },
    methods: {
      ...mapMutations([
        'GET'
      ]),
      toRouter: function (data) {
        this.select = data;
        console.log('router:'+ data)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
