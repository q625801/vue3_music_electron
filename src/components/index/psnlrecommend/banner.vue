<template>
  <div class="wrap-banner">
      
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted } from 'vue'
import { postJson } from "@/api/apiConfig";
import {banner} from "@/api/api"
export default defineComponent({
  name:'Index',
  components:{
    
  },
  setup(){
      onMounted(() => {
          getbanner()
      })
      function getbanner(){
          postJson(banner,{},(res:any) => {
              console.log(res)
          },(err:any) => {
              console.log(err)
          })
      }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
