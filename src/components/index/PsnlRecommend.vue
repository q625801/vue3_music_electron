<template>
  <div class="wrap-psnlrecommend">
    <Banner/>
    <RecommendSong/>
    <PopularPodcast/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Banner from './psnlrecommend/banner.vue'
import RecommendSong from './psnlrecommend/recommendsong.vue'
import PopularPodcast from './psnlrecommend/popularpodcast.vue'
export default defineComponent({
  name:'Index',
  components:{
    Banner,
    RecommendSong,
    PopularPodcast
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-psnlrecommend{
    
}
</style>
