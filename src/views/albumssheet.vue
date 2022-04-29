<template>
    <div class="wrap-albumsongsheet">
        <AlbumSongsheetInfo :detailinfo="detailinfo"/>
        <div class="albumsongsheet-tabs clear">
            <span :class="['fl',tabsOn == index ? 'on' : '']" v-for="(item,index) in tabsList" :key="index" @click="changeTabs(index)">
                {{item == '评论' ? `${item}(${commentNum})`: item}}
            </span>
        </div>
        <MusicPlayList :stdetaildata="detailinfo" :stSongAll="songlistAll" v-show="tabsOn == 0"/>
        <Comment :dataId="id" @commentTotal="getCommentTotal" v-show="tabsOn == 1"/>
        <Subscription :dataId="id" v-show="tabsOn == 2"/>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue'
import {postJson} from "@/api/apiConfig"
import { sddetail,sdsongAll } from "@/api/api"
import AlbumSongsheetInfo from '@/components/common/album_songsheet_info.vue'
import MusicPlayList from "@/components/common/musicplaylist.vue"
import {useRouter} from 'vue-router'
import Comment from '@/components/common/comment.vue'
import Subscription from '@/components/albumssheet/subscribers.vue'
export default defineComponent({
    name:'album',
    components:{
        AlbumSongsheetInfo,
        MusicPlayList,
        Comment,
        Subscription
    },
    setup() {
        let router = useRouter()
        let state = reactive({
            id: router.currentRoute.value.query.id,
            detailinfo:'',
            songlistAll:'',
            tabsList:[
                '歌曲列表',
                '评论',
                '收藏者'
            ],
            tabsOn:0,
            commentNum:0,
        })
        let getAblbum = () => {
            return new Promise((reslove,reject) => {
                postJson(sddetail,{id:state.id},(res:any) => {
                    reslove(res)
                },(err:object) => {
                    reject(err)
                })
            })
        }
        let getPlayListTrackAll = () => {
            return new Promise((reslove,reject) => {
                postJson(sdsongAll,{id:state.id},(res:any) => {
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
            Promise.all([getAblbum(),getPlayListTrackAll()]).then((res:any) => {
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