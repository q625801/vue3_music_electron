<template>
  <div class="wrap-loading">
    <img src="../../assets/img/loading.gif" width="30"/>
    <span>加载中...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'loading',
  
})
</script>
<style scoped lang="scss">
.wrap-loading{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        color:#d6d6d6;
        display: inline-block;
        padding-left: 10px;
    }
}
</style>