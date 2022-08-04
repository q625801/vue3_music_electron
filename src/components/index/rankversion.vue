<template>
  <div class="wrap-rankversion">
    <div class="rankversion-official">
      <Official :officialData="officialData"/>
    </div>
    <div class="rankversion-global">
      <Global :globalData="globalData"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import { getJson } from '@/api/apiConfig'
import { gettoplist } from '@/api/api'
import Official from './rankversion/official.vue'
import Global from './rankversion/global.vue'
interface toplist{
  code: number,
  list: any,
}
export default defineComponent({
  name:'rankversion',
  components:{
    Official,
    Global
  },
  setup(){
    let state = reactive({
      officialData: '',
      globalData:''
    })
    let getData = () => {
      getJson(gettoplist,{},(res:toplist) => {
        if(res.code == 200) {
          state.officialData = res.list.filter((item:any,index:any) => {
            return index < 4
          })
          state.globalData = res.list.filter((item:any,index:any) => {
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
