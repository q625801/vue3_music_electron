<template>
  <div class="wrap-songsheetnav">
    <NavBanner :navtopData="navtopData" :cat="cat"/>
    <NavCatlist @hotlistOn="gethotlistOn"/>
    <SongSheetList :cat="cat"/>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'
import NavBanner from './songsheetnav/navbanner.vue'
import { postJson } from '@/api/apiConfig'
import { gethighquality } from '@/api/api'
import NavCatlist from './songsheetnav/navcatlist.vue'
import SongSheetList from './songsheetnav/songsheetlist.vue'
export default defineComponent({
  name:'shongsheetnav',
  components:{
    NavBanner,
    NavCatlist,
    SongSheetList
  },
  setup () {
    let state = reactive({
      navtopData:'',
      cat:'华语',
    })
    let getNavTopData = () => {
      postJson(gethighquality,{cat:state.cat,limit:1},(res:any) => {
        if(res.code == 200){
          state.navtopData = res.playlists.length > 0 ? res.playlists[0] : []
        }
      },(err:any) => {

      })
    }
    let gethotlistOn = (data:any) => {
      state.cat = data.name
      init()
    }
    let init = () => {
      getNavTopData()
    }
    init()
    return({
      ...toRefs(state),
      gethotlistOn
    })
  }
})
</script>
<style scoped lang="scss">

</style>
