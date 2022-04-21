<template>
  <div class="wrap-artist">
      <div class="artist-info clear">
        <div class="artist-info-left fl">
          <img :src="singerInfo.img1v1Url + '?param=1200y1200'"/>
        </div>
        <div class="artist-info-right fl">
          <div class="artist-name">{{singerInfo.name}}</div>
          <div class="artist-alias" v-if="singerInfo && singerInfo.alias.length > 0">{{singerInfo.alias.join(';')}}</div>
          <div class="artist-account" v-if="singerInfo.accountId">
            <span>个人主页</span>
          </div>
          <div class="artist-musicresult">
            <span>单曲数:{{singerInfo.musicSize}}</span>
            <span>专辑数:{{singerInfo.albumSize}}</span>
            <span>MV数:{{singerInfo.mvSize}}</span>
          </div>
        </div>
      </div>
      <div class="artist-tabs clear">
        <span :class="['fl',index == tabOn ? 'on' : '']" @click="tabClick(index)" v-for="(item,index) in tabData" :key="index">{{item.title}}</span>
      </div>
      <div class="artist-content swiper-no-swiping">
        <div class="swiper-container">
          <div class="swiper-wrapper" :ref="setItemRef">
            <div class="swiper-slide">
              <ArtistAlbum :hotSongs="hotSongs" :SingerId="SingerId" @getArtistAlbumEnd="ArtistAlbumEnd"/>
            </div>
            <div class="swiper-slide">
              待完善
            </div>
            <div class="swiper-slide">
              <ArtistDesc :SingerId="SingerId" :SingerName="singerInfo.name"/>
            </div>
            <div class="swiper-slide">
              <ArtistsSimi :SingerId="SingerId"/>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { defineComponent,reactive,toRefs,onMounted,provide,nextTick,ref } from 'vue'
import {postJson} from "@/api/apiConfig";
import { getartists } from "@/api/api"
import { useRouter,onBeforeRouteUpdate } from "vue-router"
import { ElMessage } from 'element-plus'
import * as Swiper from "@/assets/js/swiper.min.js"
import "@/assets/css/swiper.min.css"
import ArtistAlbum from "@/components/artist/artistalbum.vue"
import ArtistDesc from "@/components/artist/components/artistdesc.vue"
import ArtistsSimi from "@/components/artist/components/artistssimi.vue"
export default defineComponent({
  name:'artist',
  components:{
    ArtistAlbum,
    ArtistDesc,
    ArtistsSimi
  },
  setup () {
    let router = useRouter()
    let SwiperData
    let SingerId = router.currentRoute.value.query.id
    if(!SingerId){
      ElMessage({
        message:'歌手id参数缺失',
        type:'error',
        duration:2000,
        onClose:() => {
          router.back()
        },
      })
    }
    let state = reactive({
      tabData:[
        {
          title:'专辑'
        },
        {
          title:'MV'
        },
        {
          title:'歌手详情'
        },
        {
          title:'相似歌手'
        }
      ],
      tabOn:0,
      singerInfo: '',
      hotSongs:'',
      SingerId:SingerId
    })
    let getSingerInfo = () => {
      postJson(getartists,{id:state.SingerId},(res) => {
        if(res.code == 200){
          state.singerInfo = res.artist
          state.hotSongs = res.hotSongs
        }
      },(err) => {

      })
    }
    let swipershow = () => {
      SwiperData = new Swiper('.artist-content .swiper-container', {
				watchSlidesProgress: true,
				slidesPerView: 'auto',
				observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:true,//修改swiper的父元素时，自动初始化swiper 
			})
    }
    let itemRefs = ref()
    const setItemRef = (el) => {
      if(el){
        itemRefs.value = el
      }
    }
    let tabClick = (index) => {
      for(let i = 0;i<itemRefs.value.children.length;i++){
        if(index != i){
          itemRefs.value.children[i].style.height = 0
        }else{
          itemRefs.value.children[i].style.height = 'auto'
        }
      }
      state.tabOn = index
      SwiperData.slideTo(index, 500)
    }
    const artistscrollend = ref(false)
    let scrollMove = async () => {
      //当滚动条滑动到底部时artistablbum组件通过监听provide artistscrollend字段来判断是否需要加载下一页
      //同时artistalbum 通过emit想父组件传值 ArtistAlbumEnd方法来判断获取歌手专辑的接口是否返回
      //artist父组件watch ArtistAlbumEnd
      //当接口成功返回重置 artistscrollend 为false 为下一次滚动继续做监听 如果不重置watch无法监听到数据变化
      //子组件就无法进行接口请求
      await nextTick()
      let el = document.querySelector(".wrap-artist")
      let offsetHeight = el.offsetHeight
      el.onscroll = () => {
        const scrollTop = el.scrollTop
        const scrollHeight = el.scrollHeight
        if(offsetHeight + scrollTop - scrollHeight >= -123 && state.tabOn == 0){
          artistscrollend.value = true
        }
      }
    }
    provide('artistscrollend',artistscrollend)
    let ArtistAlbumEnd = (data) => {
      if(data){
        artistscrollend.value = false
      }
    }
    let init = () => {
      getSingerInfo()
    }
    onBeforeRouteUpdate(to => {
      if(to.query.id != state.SingerId){
        state.SingerId = to.query.id
        state.tabOn = 0
        state.singerInfo = ''
        state.hotSongs = ''
        init()
        tabClick(0)
      }
    })
    onMounted(() => {
      init()
      swipershow()
      scrollMove()
    })
    return {
      ...toRefs(state),
      tabClick,
      ArtistAlbumEnd,
      setItemRef
    }
  }
})
</script>
<style scoped lang="scss">
.wrap-artist{
  padding: 30px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  .artist-info{
    .artist-info-left{
      width: 186px;
      height: 186px;
      border-radius: 5px;
      overflow: hidden;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
    .artist-info-right{
      padding: 4px 0 0 20px;
      .artist-name{
        color:$font-color;
        font-size: 22px;
        font-weight: bold;
      }
      .artist-alias{
        display: inline-block;
        color: $font-color;
        font-size: 14px;
        padding-top: 10px;
      }
      .artist-musicresult{
        padding-top: 10px;
        span{
          display: inline-block;
          color: $font-color;
          font-size: 14px;
          margin-right: 20px;
        }
      }
      .artist-account{
        margin-bottom: 5px;
        span{
          display: inline-block;
          width: 110px;
          height: 30px;
          border: 1px solid rgb(67,67,67);
          line-height: 30px;
          border-radius: 20px;
          font-size: 14px;
          color: $font-color;
          background: url('../assets/img/artist.png') 15px center no-repeat;
          background-size: 16px 16px;
          padding-left: 36px;
          box-sizing: border-box;
          cursor: pointer;
          margin-top: 10px;
        }
        span:hover{
          color: $font-hovercolor;
          background: url('../assets/img/artist-2.png') 15px center no-repeat;
          background-size: 16px 16px;
          background-color: $checkhvoerbg;
        }
      }
    }
  }
  .artist-tabs{
    padding-top:25px;
    padding-bottom:20px;
    span{
      color: $font-color;
      display: block;
      margin-right: 20px;
      font-size: 14px;
      cursor: pointer;
      line-height: 40px;
    }
    span.on{
      font-size: 18px;
      font-weight: bold;
      background: url("../assets/img/index_line.jpg") bottom center no-repeat;
      background-size: 75% 3px;
    }
  }
}
</style>