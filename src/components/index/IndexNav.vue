<template>
  <div class="index-nav clear">
      <span v-for="item in IndexNavList" :key="item.id" :class="['fl',item.id == IndexNavOn ? 'on' : '']" @click="IndexNavChange(item)">{{item.name}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name:'IndexNav',
  setup () {
    const router = useRouter()
    let IndexNavOn = ref(1)
    let IndexNavList = [
      {
        id:1,
        name:"个性推荐",
        path:'/',
      },
      {
        id:2,
        name:"专属定制",
        path:'/index/handtailor',
      },
      {
        id:3,
        name:"歌单",
        path:'/index/singer',
      },
      {
        id:4,
        name:"排行榜",
        path:'/index/rankversion',
      },
      {
        id:5,
        name:"歌手",
        path:'/index/singer',
      },
      {
        id:6,
        name:"最新音乐",
        path:'/index/latestmusic'
      },
    ]
    let IndexNavChange = (data:any) => {
      IndexNavOn.value = data.id
      router.push(data.path)
    }
    return {
      IndexNavList,
      IndexNavOn,
      IndexNavChange
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .index-nav{
      height: 40px;
      span{
        display: block;
        color: #d6d6d6;
        margin-right: 20px;
        cursor: pointer;
        line-height: 40px;
      }
      span:hover{
        color: #ffffff;
      }
      span.on{
        font-size: 20px;
        font-weight: bold;
        color: #d6d6d6;
        background: url("../../assets/img/index_line.jpg") bottom center no-repeat;
        background-size: 75% 3px;
      }
    }
</style>
