<template>
    <div class="wrap-newmusic">
        <Titlemm :title="'最新音乐'" :arrow="true" :href="{path:'/index/latestmusic',query:{}}"/>
        <div class="newmusic-section">
            <div :class="['newmusic-list','clear',item.id == $store.state.audioInfo.SongInfo.SongId ? 'on' : '']" v-for="(item,index) in newsongdata" :key="index" @click="audioPlay(item,newsongdata,store)">
                <div class="newmusic-left fl">
                    <div class="newmusic-img">
                        <img v-lazy="item.picUrl + '?param=300y300'"/>
                        <div :class="['newmusic-playerbtn',item.id == $store.state.audioInfo.SongInfo.SongId ? ($store.state.audioInfo.audioPlayBtn ? 'play' : '') : '']"></div>
                    </div>
                </div>
                <div class="newmusic-right fl">
                    <div class="newmusic-title" :title="item.name + `${item.song.alias.length > 0 ? '（' + item.song.alias.join(',') + '）' : (item.song.transName ? '（' + item.song.transName + '）' : '')}`">
                        <span>{{item.name}}</span>
                        <em>{{item.song.alias.length > 0 ? '（' + item.song.alias.join(',') + '）' : (item.song.transName ? '（' + item.song.transName + '）' : '')}}</em>
                    </div>
                    <div class="newmusic-author">
                        <span v-for="(item,index) in item.song.artists" :key="index">
                            {{index != 0 ? ' / ' : ''}}
                            <em @click.stop="goPage(router,'/artist',{id:item.id})">{{item.name}}</em>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {getJson} from "@/api/apiConfig";
import { newsong } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
import {audioPlay,goPage} from "@/utils/common"
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default defineComponent({
    name:'newmusic',
    components:{
        Titlemm,
        LoadingCpn
    },
    setup(){
        let state = reactive<{newsongdata:any[]}>({
            newsongdata:[],
        })
        onMounted(() => {
            console.log(state.newsongdata.length)
            getData()
        })
        function getData(){
            getJson(newsong,{limit:12},(res:{code:number,result:any[]}) =>{
                if(res.code == 200){
                    state.newsongdata = res.result
                }
            },(err:any) => {

            })
        }
        const store = useStore()
        const router = useRouter()
        return{
            ...toRefs(state),
            store,
            audioPlay,
            goPage,
            router
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-newmusic{
    padding-top: 40px;
    .newmusic-section{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        .newmusic-list.on,.newmusic-list:hover{
            background: $hvoerbodybg;
        }
        .newmusic-list{
            width: 32%;
            margin-bottom: 15px;
            .newmusic-left{
                .newmusic-img{
                    cursor: pointer;
                    width: 50px;
                    height: 50px;
                    border-radius:5px;
                    overflow: hidden;
                    position: relative;
                    .newmusic-playerbtn{
                        width: 30px;
                        height: 30px;
                        background: url("../../../assets/img/player-daily.png") center center no-repeat;
                        background-size: 28px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                    }
                    .newmusic-playerbtn.play{
                        background: url("../../../assets/img/player-daily-stop.png") center center no-repeat;
                        background-size: 28px;
                    }
                }
            }
            .newmusic-right{
                padding: 5px 0 0 8px;
                box-sizing: border-box;
                width: calc(100% - 50px);
                .newmusic-title{
                    color: #d6d6d6;
                    font-size: 13px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    em{
                        color: $font-authorcolor;
                    }
                }
                .newmusic-author{
                    padding-top: 10px;
                    font-size: 12px;
                    color: $font-authorcolor;
                    display: block;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    span{
                        ::v-deep(em){
                            cursor: pointer;
                        }
                        ::v-deep(em:hover){
                            color: $font-hoverauthorcolor;
                        }
                    }
                }
            }
        }
    }
}
</style>