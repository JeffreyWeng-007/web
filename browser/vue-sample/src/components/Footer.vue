<template>
  <div class="tabbar">
   <slot></slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
//    props: ['value'],
    computed: {
      value() {
        //当使用keep-alive时，此时的name，matched[0].name均有值
        console.log('footer: ' + this.$route.name + ' matched: ' + this.$route.matched[0].name);
        this.$emit('select',this.$route.name) //更新父元素的select
        return this.$route.name
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tabbar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    height: auto;
    background: #fff;
    border-top: 1px solid #e4e4e4;
  }
</style>
