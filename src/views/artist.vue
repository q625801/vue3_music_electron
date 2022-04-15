<template>
  <div class="wrap-artist">
      <div class="artist-info clear">
        <div class="artist-info-left fl">
          <img :src="singerInfo.img1v1Url + '?param=300y300'"/>
        </div>
        <div class="artist-info-right fl">
          <div class="artist-name">{{singerInfo.name}}</div>
          <div class="artist-alias">{{singerInfo && singerInfo.alias.length > 0 ? singerInfo.alias.join(';') : ''}}</div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue'
import {postJson} from "@/api/apiConfig";
import { artists } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
export default defineComponent({
  name:'artist',
  setup () {
    let router = useRouter()
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
      singerInfo: '',
    })
    let getSingerInfo = () => {
      postJson(artists,{id:SingerId},(res:any) => {
        if(res.code == 200){
          state.singerInfo = res.artist
        }
      },(err:any) => {

      })
    }
    onMounted(() => {
      getSingerInfo()
    })
    return {
      ...toRefs(state),
    }
  }
})
</script>
<style scoped lang="scss">
.wrap-artist{
  padding: 30px;
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
}
</style>