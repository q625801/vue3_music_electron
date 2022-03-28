<template>
  <div class="wrap-psnlrecommend">
      <Banner/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from './psnlrecommend/banner.vue'
export default defineComponent({
  name:'Index',
  components:{
    Banner
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-psnlrecommend{
    
}
</style>
