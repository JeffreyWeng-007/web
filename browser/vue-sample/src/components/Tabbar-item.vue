<template>
  <!--<a class="tabbar-item" :class="{'is-active':isActive}" @click="$parent.$emit('increment',id)"> 错误-->
  <a class="tabbar-item" :class="{'is-active':isActive}" @click="Router">
  <!--<a class="tabbar-item" :class="{'is-active':isActive}" @click="$emit('increment',id)">-->
    <span class="tabbar-item-icon" v-show="!isActive"><slot name="icon-normal"></slot></span>
    <span class="tabbar-item-icon" v-show="isActive"><slot name="icon-active"></slot></span>
    <span class="tabbar-item-text"><slot name="text"></slot></span>
  </a>
</template>
<script>
  export default {
    props: {
            id: {
              type: String
            },
            isRouter: {
              type: Boolean,
              default: false
            }
    },//主要是通过父级设置的div传递下来的
    computed: {
      isActive() {
        if(this.$parent.value === this.id) {
          return true;
        }
      }
    },
    methods: {
      Router: function () {
//        this.$emit('Router',this.id) //用这种方式的话，每个tabbar-item都需要监听，不过也能实现传值给select
        this.$parent.$emit('input',this.id)
        if(this.isRouter){
          //根据id跳转到对应的路由页面
          this.$router.push({name:this.id})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tabbar-item {
    flex:auto;
    display: flex;
    flex-direction: column;
    text-align: center;
    .tabbar-item-icon {
      display: block;
      img {
        width: 28px;
        height: 28px;
        vertical-align: middle;
      }
    }
    .tabbar-item-text {
      display: block;
      font-size: 10px;
      color: #949494;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &.is-active {
      .tabbar-item-text {
        color: #42bd56;
      }
    }
  }

</style>
