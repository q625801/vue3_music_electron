<template>
  <div class="wrap-index">
    <IndexNav/>
    <div class="index-screen">
      <div class="newalbum-fixed" v-show="newalbumOn"><!--发现音乐/最新音乐  新碟上架相关功能-->
        <div class="weekData" v-if="timedate == 'weekData'">
          <span>本周新碟</span>
        </div>
        <div class="beforedate" v-else>
          <div class="month">
            {{timedate.split('-')[1]}}
          </div>
          <div class="year">
            {{timedate.split('-')[0]}}
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,provide } from 'vue'
import IndexNav from '@/components/index/IndexNav.vue'
export default defineComponent({
  name:'Index',
  components:{
    IndexNav
  },
  setup () {
    let state = reactive({
      newalbumOn:false,
      timedate:''
    })
    provide('newalbumLeftData',state)
    return {
      ...toRefs(state),
    }
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
    .newalbum-fixed{
      position: absolute;
      width: 50px;
      font-size: 18px;
      margin-left: 2px;
      .month{
        width: 38px;
        height: 38px;
        background: url('../assets/img/datebg.png') center no-repeat;
        background-size:100% 100%;
        text-align: center;
        line-height: 48px;
      }
      .year{
        font-size: 12px;
        padding-left: 6px;
        padding-top: 3px;
      }
    }
  }
}
</style>