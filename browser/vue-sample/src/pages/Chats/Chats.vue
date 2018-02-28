<template>
  <div class="hello">
    <navHeader :headTitle="ht">
      <span slot="logo" class="header"></span>
    </navHeader>

  </div>
</template>

<script>
  import navHeader from '../../components/Header'
  import {mapState, mapMutations} from 'vuex'
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
    },
    computed: {
    },
    methods: {
      ...mapMutations([
        'GET_USERINFO'
      ]),
      initData () {
        this.ht = '消息'
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
