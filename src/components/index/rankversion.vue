<template>
  <div class="wrap-rankversion">
    <div class="loading" v-show="loading">
      <LoadingCpn/>
    </div>
    <div v-show="!loading">
      <div class="rankversion-official">
        <Official :officialData="officialData"/>
      </div>
      <div class="rankversion-global">
        <Global :globalData="globalData"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import { getJson } from '@/api/apiConfig'
import { gettoplist } from '@/api/api'
import Official from './rankversion/official.vue'
import Global from './rankversion/global.vue'
import LoadingCpn from "@/components/common/loadingcpn.vue"
interface toplist{
  code: number,
  list: any,
}
interface state{
  officialData: any[],
  globalData: any[],
  loading: boolean,
}
export default defineComponent({
  name:'rankversion',
  components:{
    Official,
    Global,
    LoadingCpn
  },
  setup(){
    let state = reactive<state>({
      officialData: [],
      globalData: [],
      loading: false,
    })
    let getData = () => {
      state.loading = true
      getJson(gettoplist,{},(res:toplist) => {
        state.loading = false
        if(res.code == 200) {
          state.officialData = res.list.filter((item:any,index:number) => {
            return index < 4
          })
          state.globalData = res.list.filter((item:any,index:number) => {
            return index > 3
          })
        }
      },(err:any) => {

      })
    }
    onMounted(() => {
      getData()
    })
    return {
      ...toRefs(state),
    }
  }
})
</script>
<style scoped lang="scss">

</style>
