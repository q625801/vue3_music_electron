<template>
  <div class="wrap-rankversion">
    <div class="rankversion-official">
      <Official :officialData="officialData"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import { postJson } from '@/api/apiConfig'
import { gettoplist } from '@/api/api'
import Official from './rankversion/official.vue'
interface toplist{
  code: number,
  list: any,
}
export default defineComponent({
  name:'rankversion',
  components:{
    Official,
  },
  setup(){
    let state = reactive({
      officialData: ''
    })
    let getData = () => {
      postJson(gettoplist,{},(res:toplist) => {
        if(res.code == 200) {
          state.officialData = res.list.filter((item:any,index:any) => {
            return index < 4
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
