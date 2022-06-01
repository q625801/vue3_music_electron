<template>
  <div class="index-nav clear">
      <span v-for="item in IndexNavList" :key="item.id" :class="['fl',item.id == IndexNavOn ? 'on' : '']" @click="IndexNavChange(item)">{{item.name}}</span>
  </div>
</template>

<script>
import { defineComponent,ref,watch } from 'vue'
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
        path:'/index/psnlrecommend',
      },
      // {
      //   id:2,
      //   name:"专属定制",
      //   path:'/index/handtailor',
      // },
      {
        id:2,
        name:"歌单",
        path:'/index/songsheetnav',
      },
      {
        id:3,
        name:"排行榜",
        path:'/index/rankversion',
      },
      {
        id:4,
        name:"歌手",
        path:'/index/singer',
      },
      {
        id:5,
        name:"最新音乐",
        path:'/index/latestmusic'
      },
    ]
    let IndexNavChange = (data) => {
      IndexNavOn.value = data.id
      router.push(data.path)
    }
    watch(() => router,(newValue) => {
      let currentPath = newValue.currentRoute.value.fullPath
      IndexNavList.forEach(item => {
        if(currentPath == item.path){
          IndexNavOn.value = item.id
        }
      })
    },{immediate:true,deep:true})
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
      padding: 0 30px 10px;
      span{
        display: block;
        color: $font-color;
        margin-right: 20px;
        cursor: pointer;
        line-height: 40px;
      }
      span.on{
        font-size: 20px;
        font-weight: bold;
        color: $font-color;
        background: url("../../assets/img/index_line.jpg") bottom center no-repeat;
        background-size: 75% 3px;
      }
      span:hover{
        color: $font-hovercolor;
      }
    }
</style>
