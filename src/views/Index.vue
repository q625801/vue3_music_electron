<template>
  <div class="wrap-index">
    <IndexNav/>
    <div class="index-screen">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IndexNav from '@/components/index/IndexNav.vue'
export default defineComponent({
  name:'Index',
  components:{
    IndexNav
  }
})
</script>
<style scoped lang="scss">
.wrap-index{
  padding: 10px 0px;
  height: 100%;
  box-sizing: border-box;
  .index-screen{
    height: 478px;
    padding: 0 30px;
    overflow-y: scroll;
    box-sizing: border-box;
  }
}
</style>