<template>
    <div class="wrap-albumsongsheet">
        <AlbumSongsheetInfo :detailinfo="detailinfo"/>
        <div class="albumsongsheet-tabs clear">
            <span :class="['fl',tabsOn == index ? 'on' : '']" v-for="(item,index) in tabsList" :key="index" @click="changeTabs(index)">
                {{item == '评论' ? `${item}(${commentNum})`: item}}
            </span>
        </div>
        <div class="loading" v-show="loading">
            <LoadingCpn/>
        </div>
        <MusicPlayList :stdetaildata="detailinfo" :stSongAll="songlistAll" :isRank="isRank" v-show="tabsOn == 0"/>
        <Comment :dataId="id" @commentTotal="getCommentTotal" v-show="tabsOn == 1"/>
        <Subscription :dataId="id" v-show="tabsOn == 2"/>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue'
import {getJson} from "@/api/apiConfig"
import { sddetail,sdsongAll } from "@/api/api"
import AlbumSongsheetInfo from '@/components/common/album_songsheet_info.vue'
import MusicPlayList from "@/components/common/musicplaylist.vue"
import {useRouter} from 'vue-router'
import Comment from '@/components/common/comment.vue'
import Subscription from '@/components/songsheetdetail/subscribers.vue'
import LoadingCpn from "@/components/common/loadingcpn.vue"
export default defineComponent({
    name:'songsheet',
    components:{
        AlbumSongsheetInfo,
        MusicPlayList,
        Comment,
        Subscription,
        LoadingCpn
    },
    setup() {
        let router = useRouter()
        let state = reactive({
            id: router.currentRoute.value.query.id,
            isRank: router.currentRoute.value.query.isRank,//用于判断是否从排行榜页面进入歌单详情页 是否展示飙升率 排名变化 new
            detailinfo:'',
            songlistAll:'',
            tabsList:[
                '歌曲列表',
                '评论',
                '收藏者'
            ],
            tabsOn:0,
            commentNum:0,
            loading:false,
        })
        let getData = () => {
            return new Promise((reslove,reject) => {
                getJson(sddetail,{id:state.id},(res:any) => {
                    reslove(res)
                },(err:object) => {
                    reject(err)
                })
            })
        }
        let getPlayListTrackAll = () => {
            return new Promise((reslove,reject) => {
                getJson(sdsongAll,{id:state.id},(res:any) => {
                    reslove(res)
                },(err:any) => {
                    reject(err)
                })
            })
        }
        let changeTabs = (index:number) => {
            state.tabsOn = index
        }
        let getCommentTotal = (total:number) => {
            state.commentNum = total
        }
        onMounted(() => {
            state.loading = true
            Promise.all([getData(),getPlayListTrackAll()]).then((res:any) => {
                state.loading = false
                if(res[0].code == 200){
                    state.detailinfo = res[0].playlist;
                }
                if(res[1].code == 200){
                    state.songlistAll = res[1].songs
                }
            })
        })
        return {
            ...toRefs(state),
            changeTabs,
            getCommentTotal
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-albumsongsheet{
    padding: 30px 0 0 0;
    overflow-y: scroll;
    height: 538px;
    box-sizing: border-box;
    .albumsongsheet-tabs{
        padding: 30px 30px 5px 38px;
        span{
            display: block;
            color: $font-color;
            margin-right: 20px;
            cursor: pointer;
            line-height: 40px;
            font-size: 14px;
        }
        span:hover{
            color: $font-hovercolor;
        }
        span.on{
            font-size: 18px;
            font-weight: bold;
            color: $font-color;
            background: url("../assets/img/index_line.jpg") bottom center no-repeat;
            background-size: 75% 3px;
        }
    }
}
</style>