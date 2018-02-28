<template>
    <tr class="shallow" :class="{'deep':isDeep}">
      <td width="55" valign="top">
        <p>{{ttVersion}}</p>
      </td>
      <td width="213" valign="top">
        <p>{{ttLog}}</p>
      </td>
      <td width="78" valign="top">
        <p>{{ttPeople}}</p>
      </td>
      <td width="81" valign="top">
        <p>{{ttTimer}}</p>
      </td>
    </tr>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: ['ttId','ttVersion','ttLog','ttPeople','ttTimer'],
    computed: {
      isDeep() {
        //使用this.value的话，依赖没变
        if((this.ttId)%2 == 1) {
          console.log('deep: ' + this.ttId)
          return true;
        }
      }
    },
    watch: {
      value: function (v) {
        console.log('aa' + v)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .shallow {background:#D3DFEE;}
  .deep {background:#A7BFDE;}
</style>
