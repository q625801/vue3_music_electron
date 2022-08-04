<template>
    <div class="wrap-searchywant" v-if="dataList.length > 0">
        <div class="searchywant-t">你可能感兴趣</div>
        <div class="searchywant-section clear">
            <div :class="['searchywant-list fl clear',item.order == 'new_mlog' ? 'mvOff' : '']" v-for="(item,index) in dataList" :key="index" @click="handleGo(item)">
                <div class="img fl">
                    <img v-if="item.order == 'artist'" v-lazy="item.data.img1v1Url + '?param=100y100'"/>
                    <img v-else-if="item.order == 'album'" v-lazy="item.data.picUrl + '?param=100y100'"/>
                    <img v-else-if="item.order == 'playlist'" v-lazy="item.data.coverImgUrl + '?param=100y100'"/>
                    <img v-else-if="item.order == 'voice'" v-lazy="item.data.baseInfo.coverUrl + '?param=100y100'"/>
                    <img v-else-if="item.order == 'user'" v-lazy="item.data.avatarUrl + '?param=100y100'"/>
                </div>
                <div class="info fl">
                    <div class="name ellipsis">
                        <span v-if="item.order == 'artist'">歌手：{{item.data.name}}</span>
                        <span v-else-if="item.order == 'album'">专辑：{{item.data.name}}</span>
                        <span v-else-if="item.order == 'playlist'">歌单：{{item.data.name}}</span>
                        <span v-else-if="item.order == 'voice'">声音：{{item.data.baseInfo.name}}</span>
                        <span v-else-if="item.order == 'user'">用户：{{item.data.nickname}}</span>
                    </div>
                    <div class="tags">
                        <span v-if="item.order == 'artist'">粉丝:{{item.data.fansSize > 100000000 ? (item.data.fansSize/100000000).toString().split(".")[0] + "亿" : item.data.fansSize > 10000 ? (item.data.fansSize/10000).toString().split(".")[0] + "万" : item.data.fansSize}},歌曲:{{item.data.musicSize}}</span>
                        <span v-else-if="item.order == 'album'">{{item.data.artist.name}}</span>
                        <span v-else-if="item.order == 'playlist'">歌曲:{{item.data.trackCount}},播放:{{item.data.playCount > 100000000 ? (item.data.playCount/100000000).toString().split(".")[0] + "亿" : item.data.playCount > 10000 ? (item.data.playCount/10000).toString().split(".")[0] + "万" : item.data.playCount}}</span>
                        <span v-else-if="item.order == 'voice'">播放:{{item.data.baseInfo.listenerCount > 100000000 ? (item.data.baseInfo.listenerCount/100000000).toString().split(".")[0] + "亿" : item.data.baseInfo.listenerCount > 10000 ? (item.data.baseInfo.listenerCount/10000).toString().split(".")[0] + "万" : item.data.baseInfo.listenerCount}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs,watch } from 'vue'
import { getJson } from '@/api/apiConfig'
import { hotsearchmultimatch } from '@/api/api'
import { goPage } from '@/utils/common'
import { useRouter } from 'vue-router'
export default defineComponent({
    name:'searchywant',
    props:[
        'keywords'
    ],
    setup (props) {
        let state = reactive({
            dataList:[]
        })
        let getData = () => {
            getJson(hotsearchmultimatch,{keywords:props.keywords},res => {
                if(res.code == 200){
                    let data = res.result
                    let arr = []
                    data.orders.forEach(item => {
                        let obj = {}
                        obj.order = item
                        obj.data = data[item][0]
                        arr.push(obj)
                    })
                    state.dataList = arr
                    console.log(arr)
                }
            },err => {

            })
        }
        let router = useRouter()
        let handleGo = (item) => {
            console.log(item)
            switch (item.order) {
                case "playlist":
                    goPage(router,'/songsheetdetail',{id:item.data.id})
                    break;
                case "artist":
                    goPage(router,'/artist',{id:item.data.id})
                    break;
                case "album":
                    goPage(router,'/album',{id:item.data.id})
                    break;
                default:
                    break;
            }
        }
        getData()
        watch(() => props.keywords,(newValue) => {
            state.dataList = []
            getData()
        })
        return {
            ...toRefs(state),
            handleGo
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-searchywant{
    padding-top: 10px;
    .searchywant-t{
        font-size: 12px;
        color: $font-authorcolor;
    }
    .searchywant-section{
        padding-top: 10px;
        .searchywant-list{
            width: 32%;
            background-color: $hvoerbodybg;
            box-sizing: border-box;
            padding: 13px;
            margin-right: 2%;
            display: flex;
            align-items: center;
            cursor: pointer;
            .img{
                width: 44px;
                height: 44px;
                img{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    border-radius: 50%;
                }
            }
            .info{
                width: calc(100% - 44px);
                padding-left: 10px;
                box-sizing: border-box;
                .name{
                    font-size: 14px;
                }
                .tags{
                    padding-top: 3px;
                    span{
                        font-size: 12px;
                        color: $font-authorcolor;
                    }
                }
            }
        }
        .searchywant-list.mvOff{
            display: none;
        }
        .searchywant-list:last-child{
            margin-right: 0;
        }
    }
}
</style>