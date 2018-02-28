<template>
  <div class="hello">
    <navHeader :headTitle="ht">
      <span slot="logo" class="header"></span>
    </navHeader>
    <div class="page-content" style="padding-bottom: 60px;">
      <div style="display: flex;flex-direction: column">
        <input type="text" v-model="rtitle" style="border: 1px solid gray"/>
        <textarea v-model="rtext" style="border: 1px solid gray"></textarea>
        <input type="submit" style="background-color: #007aff" @click="send()"/>
      </div>

      <ul id="dsPt_lists">
        <li v-for="(val,key) in classLists">{{key}}
          <ul id="dsPt_subLists">
            <li v-for="(tp,key) in val"><router-link :to="{name: 'modal2', params: {id:'1',item:'a'}}">{{tp}}---{{key}}</router-link></li>
            <li v-for="(tp,key) in val"><router-link to="/modal/2">{{tp}}--{{key}}</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import navHeader from '../../components/Header'
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        classLists : "",
        rtitle: "",
        rtext: ""
      }
    },
    created () {
      this.viewDidLoaded()
    },
    components: {
      navHeader
    },
    methods: {
      viewDidLoaded() {
        this.ht = '教程'
        $.getScript('../../../static/sources/desPatLists.js', () => {
          console.log("abc" + desPatLists);
          this.classLists = desPatLists;
        })
      },
      send() {
        var that = this

        $.ajax({
          type: 'POST',
          url: 'http://localhost:8888/form',
          data: {rTitle: this.rtitle,rText: this.rtext},
          dataType: "json",
          success: function (data) {
            that.rtitle = data.rTitle
            that.rtext = data.rText
            console.log('from 8888 :' + JSON.stringify(data))
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}

</style>
