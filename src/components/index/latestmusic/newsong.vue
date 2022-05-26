<template>
    <div class="wrap-newsong">
        <div class="newsong-option-btn">
            <div class="option-list">
                <span v-for="(item,index) in optionList" :class="[optionType == item.data ? 'on' : '']" :key="index" @click="changeOption(item.data)">{{item.name}}</span>
            </div>
            <div class="btn-a clear">
                <div class="btn fl playall" @click="goAudioPlay(dataList[0])">播放全部</div>
                <div class="btn fl collection">收藏全部</div>
            </div>
        </div>
        <div class="newsong-section" v-if="!loading">
            <div class="newsong-list clear" v-for="(item,index) in dataList" :key="item.id" @dblclick="goAudioPlay(item)" :class="[item.id == $store.state.audioInfo.SongInfo.SongId ? 'on' : '',item.id == $store.state.audioInfo.SongInfo.SongId && $store.state.audioInfo.audioPlayBtn ? 'onPlay' : '']">
                <div class="num fl">{{index+1 < 10 ? '0' + (index+1) : index+1}}</div>
                <div class="img fl" @click="goAudioPlay(item)">
                    <img v-lazy="item.album.picUrl + '?param=300y300'">
                    <div class="playbtn"></div>
                </div>
                <div class="name fl">{{item.name}}</div>
                <div class="author fl">
                    <span v-for="(item2,index2) in item.artists" :key="index2">
                        {{index2 != 0 ? ' / ' : ''}}
                        <em @click.stop="goPage(router,'/artist',{id:item2.id})">{{item2.name}}</em>
                    </span>
                </div>
                <div class="album fl" @click.stop="goPage(router,'/album',{id:item.album.id})"><span>{{item.album.name}}</span></div>
                <div class="duration fl">{{playtime(item.duration)}}</div> 
            </div>
        </div>
        <LoadingCpn v-else/>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs } from 'vue'
import { postJson } from '@/api/apiConfig'
import { gettopsong } from '@/api/api'
import { useRouter } from 'vue-router'
import { playtime,goPage,audioPlay } from '@/utils/common'
import {useStore} from 'vuex'
import LoadingCpn from "@/components/common/loadingcpn.vue"
export default defineComponent({
    name:'newsong',
    components:{
        LoadingCpn
    },
    setup () {
        let state = reactive({
            optionList:[
                {
                    name: '全部',
                    data: 0,
                },
                {
                    name: '华语',
                    data: 7,
                },
                {
                    name: '欧美',
                    data: 96,
                },
                {
                    name: '日本',
                    data: 8,
                },
                {
                    name: '韩国',
                    data: 16,
                }
            ],
            optionType:0,
            dataList:[],
            loading:false,
        })
        let changeOption = (data) => {
            state.optionType = data
            getData()
        }
        let getData = () => {
            state.loading = true
            postJson(gettopsong,{type:state.optionType},res => {
                state.loading = false
                if(res.code == 200){
                    state.dataList = res.data
                }
            },err => {

            })
        }
        getData()
        const router = useRouter()
        const store = useStore()
        let goAudioPlay = (data) => {
            let SongInfo = {
                id: data.id,
                name: data.name,
                picUrl: data.album.picUrl,
                song:{
                    artists: data.artists
                }
            }
            let arr = []
            let forArr = ''
            forArr = JSON.parse(JSON.stringify(state.dataList))
            forArr.forEach(item => {
                let obj = {
                    id: item.id,
                    name: item.name,
                    picUrl: item.album.picUrl,
                    song:{
                        artists: item.artists,
                        bMusic:{
                            playTime: item.duration,
                        }
                    }
                }
                arr.push(obj)
            })
            audioPlay(SongInfo,arr,store)
        }
        return {
            ...toRefs(state),
            playtime,
            router,
            goPage,
            goAudioPlay,
            changeOption
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-newsong{
    .newsong-option-btn{
        padding-top: 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        .option-list{
            span{
                font-size: 14px;
                display: inline-block;
                color: $font-color;
                cursor: pointer;
                margin-right: 24px;
            }
            span.on{
                color: $font-hovercolor;
            }
            span:hover{
                color: $font-hovercolor;
            }
        }
        .btn-a{
            .btn{
                line-height: 27px;
                height: 26px;
                font-size: 13px;
                padding: 0 10px 0 30px;
                border-radius: 25px;
                overflow: hidden;
                cursor: pointer;
            }
            .playall{
                background:url('../../../assets/img/player-btn.png') 10px center no-repeat;
                background-size:18px;
                background-color: $musicNameOn;
                color: #ffffff;
                margin-right: 10px;
            }
            .collection{
                background:url('../../../assets/img/collection.png') 10px center no-repeat;
                background-size:18px;
                border: 1px solid $bodercolor;
            }
            .playall:hover{
                background-color: $albumsongsheetinfo_hoverbtnbg;
            }
            .collection:hover{
                background-color:$checkhvoerbg;
            }
        }
    }
    .newsong-section{
        .newsong-list{
            height: 62px;
            line-height: 62px;
            padding: 9px 0;
            .num{
                width: 36px;
                font-size: 13px;
                color: $font-authorcolor;
                box-sizing: border-box;
                padding-left: 5px;
            }
            .img{
                width: 62px;
                height: 62px;
                display: flex;
                justify-content:center;
                align-items:center;
                border-radius: 5px;
                overflow: hidden;
                position: relative;
                cursor: pointer;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
                .playbtn{
                    position: absolute;
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    background: url('../../../assets/img/player-daily.png') center no-repeat;
                    background-size: cover;
                }
            }
            .name{
                font-size: 14px;
                width: calc(100% - 178px - 36%);
                padding-left: 10px;
                box-sizing: border-box;
            }
            .author,.album{
                font-size: 13px;
                color: $font-authorcolor;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
            .author{
                span{
                    em{
                        cursor: pointer;
                    }
                    em:hover{
                        color: $font-hoverauthorcolor;
                    }
                }
            }
            .album{
                span{
                    cursor: pointer;
                }
                span:hover{
                    color: $font-hoverauthorcolor;
                }
            }
            .author{
                width: calc(100% - 178px - 36% - 22%);
            }
            .album{
                width: calc(100% - 178px - 36% - 20%);
            }
            .duration{
                font-size: 14px;
                color: $font-authorcolor;
                width: 54px;
                text-align: right;
                box-sizing: border-box;
                padding-right: 5px;
            }
        }
        .newsong-list:nth-child(2n - 1){
            background-color:$artistsonglistbg;
        }
        .newsong-list:hover{
            background-color:$checkhvoerbg;
        }
        .newsong-list.on{
            .num,.name{
                color: $musicNameOn;
            }
        }
        .newsong-list.on.onPlay{
            .img{
                .playbtn{
                    background: url('../../../assets/img/player-daily-stop.png') center no-repeat;
                    background-size: cover;
                }
            }
        }
    }
}
</style>
