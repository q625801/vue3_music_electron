<template>
    <div class="wrap-newmusic">
        <Titlemm :title="'最新音乐'" :arrow="true" :href="'xxx'"/>
        <div class="newmusic-section">
            <div :class="['newmusic-list','clear',item.id == $store.state.audioInfo.SongInfo.SongId ? 'on' : '']" v-for="(item,index) in newsongdata" :key="index" @click="audioPlay(item,newsongdata,this)">
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
                        <span v-for="(item,index) in item.song.artists" :key="index" v-html="((index != 0) ? ' / ' : '') + '<em>'+item.name+'</em>'">
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {postJson} from "@/api/apiConfig";
import { newsong } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
import {audioPlay} from "@/utils/common"
export default defineComponent({
    name:'newmusic',
    components:{
        Titlemm,
        LoadingCpn
    },
    setup(){
        let state = reactive<any>({
            newsongdata:[],
        })
        onMounted(() => {
           getData() 
        })
        function getData(){
            postJson(newsong,{limit:12},(res:any) =>{
                if(res.code == 200){
                    state.newsongdata = res.result
                }
            },(err:any) => {

            })
        }
        return{
            ...toRefs(state),
            audioPlay
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
            background: rgba(208, 208, 208, 0.1);
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
                        color: #7f7f7f;
                    }
                }
                .newmusic-author{
                    padding-top: 10px;
                    font-size: 12px;
                    color: #7f7f7f;
                    display: block;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    span{
                        ::v-deep em{
                            cursor: pointer;
                        }
                        ::v-deep em:hover{
                            color: #afafaf;
                        }
                    }
                }
            }
        }
    }
}
</style>