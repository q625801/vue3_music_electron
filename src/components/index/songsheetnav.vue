<template>
  <div class="wrap-songsheetnav">
    <NavBanner :navtopData="navtopData" :cat="cat"/>
    <NavCatlist @hotlistOn="gethotlistOn" :cat="cat"/>
    <SongSheetList :cat="cat"/>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue'
import NavBanner from './songsheetnav/navbanner.vue'
import { getJson } from '@/api/apiConfig'
import { gethighquality } from '@/api/api'
import NavCatlist from './songsheetnav/navcatlist.vue'
import SongSheetList from './songsheetnav/songsheetlist.vue'
import { useRouter } from 'vue-router'
interface state{
  navtopData: any[],
  cat: string,
}
export default defineComponent({
  name:'shongsheetnav',
  components:{
    NavBanner,
    NavCatlist,
    SongSheetList
  },
  setup () {
    let router = useRouter()
    let state = reactive<state>({
      navtopData:[],
      cat:router.currentRoute.value.query.cat as any ? router.currentRoute.value.query.cat as any : '华语',
    })
    let getNavTopData = () => {
      getJson(gethighquality,{cat:state.cat,limit:1},(res:{code:number,playlists:any[]}) => {
        if(res.code == 200){
          state.navtopData = res.playlists.length > 0 ? res.playlists[0] : []
        }
      },(err:any) => {

      })
    }
    let gethotlistOn = (data:{name:string}) => {
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
