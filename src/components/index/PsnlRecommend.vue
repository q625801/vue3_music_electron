<template>
  <div class="wrap-psnlrecommend">
    <Banner/>
    <RecommendSong/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from './psnlrecommend/banner.vue'
import RecommendSong from './psnlrecommend/recommendsong.vue'
export default defineComponent({
  name:'Index',
  components:{
    Banner,
    RecommendSong
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-psnlrecommend{
    
}
</style>
