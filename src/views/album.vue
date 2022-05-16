<template>
    <div class="wrap-albumsongsheet">
        <AlbumSongsheetInfo :detailinfo="detailinfo" :type="'album'"/>
        <div class="albumsongsheet-tabs clear">
            <span :class="['fl',tabsOn == index ? 'on' : '']" v-for="(item,index) in tabsList" :key="index" @click="changeTabs(index)">
                {{item == '评论' ? `${item}(${commentNum})`: item}}
            </span>
        </div>
        <MusicPlayList :stdetaildata="detailinfo" :stSongAll="songlistAll" :isRank="isRank" :type="'album'" v-show="tabsOn == 0"/>
        <Comment :dataId="id" @commentTotal="getCommentTotal" :type="'album'" v-show="tabsOn == 1"/>
        <div class="albumsongsheet-albumdes" v-show="tabsOn == 2">
            <span>专辑介绍</span>
            <p>
                {{detailinfo.description}}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue'
import {postJson} from "@/api/apiConfig"
import { getAlbum,getAlbumDetailDynamic } from "@/api/api"
import AlbumSongsheetInfo from '@/components/common/album_songsheet_info.vue'
import MusicPlayList from "@/components/common/musicplaylist.vue"
import {useRouter} from 'vue-router'
import Comment from '@/components/common/comment.vue'
import Subscription from '@/components/songsheet/subscribers.vue'
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
            isRank: router.currentRoute.value.query.isRank,
            detailinfo:'',
            songlistAll:'',
            tabsList:[
                '歌曲列表',
                '评论',
                '专辑详情'
            ],
            tabsOn:0,
            commentNum:0,
        })
        let getData = () => {
            return new Promise((reslove,reject) => {
                postJson(getAlbum,{id:state.id},(res:any) => {
                    reslove(res)
                },(err:object) => {
                    reject(err)
                })
            })
        }
        let AlbumDetailDynamic = () => {
            return new Promise((reslove,reject) => {
                postJson(getAlbumDetailDynamic,{id:state.id},(res:any) => {
                    reslove(res)
                },(err:object) => {
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
            Promise.all([getData(),AlbumDetailDynamic()]).then((res:any) => {
                if(res[0].code == 200){
                    res[0].album.subscribedCount = res[1].subCount
                    state.detailinfo = res[0].album;
                    state.songlistAll = res[0].songs;

                    state.commentNum = res[1].commentCount
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
    .albumsongsheet-albumdes{
        padding: 20px 40px 0;
        span{
            color: $font-color;
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 8px;
        }
        p{
            font-size: 14px;
            color: $font-authorcolor;
            line-height: 28px;
            text-align: justify;
            white-space: pre-wrap;
        }
    }
}
</style>