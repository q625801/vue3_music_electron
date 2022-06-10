<template>
    <div class="wrap-officialplaylist" v-if="dataList.length > 0 && trackIds.length > 0">
        <div class="officialplaylist-section">
            <div :class="['officialplaylist-list','clear',(index+1)%2==0?'':'bgtst',item.id == $store.state.audioInfo.SongInfo.SongId ? 'on' : '',item.id == $store.state.audioInfo.SongInfo.SongId && $store.state.audioInfo.audioPlayBtn ? 'onPlay' : 'offPlay']" v-for="(item,index) in dataList" :key="index" @dblclick="goAudioPlay(item)">
                <div :class="['officialplaylist-num','fl', index < 3 ? 'topT' : '']">
                    {{index + 1}}
                </div>
                <div class="officialplaylist-ratio fl" v-if="OfficialName.indexOf('飙升榜') > -1">
                    {{trackIds[index].ratio + '%'}}
                </div>
                <div class="officialplaylist-lr fl" v-else>
                    <span :class="[trackIds[index].lr ? (index - trackIds[index].lr === 0 ? 'none' : (index - trackIds[index].lr < 0 ? 'up' : 'down')) : (trackIds[index].lr === 0 ? (index - trackIds[index].lr === 0 ? 'none' : (index - trackIds[index].lr < 0 ? 'up' : 'down')) : 'new')]"></span>
                </div>
                <div class="officialplaylist-name fl">
                    {{ item.name }}<em>{{(item.tns ? ('（' + item.tns[0] + '）') : (item.alia && item.alia.length > 0 ? ('（' + item.alia[0] + '）') : ''))}}</em>
                </div>
                <div class="officialplaylist-author ellipsis fr">
                    <span v-for="(item2,index2) in item.ar" :key="index2">
                        {{index2 != 0 ? ' / ' : ''}}
                        <em @click.stop="goPage(router,'/artist',{id:item2.id})">{{item2.name}}</em>
                    </span>
                </div>
            </div>
        </div>
        <div class="officialplaylist-more">
            <span @click="goPage(router,'/songsheetdetail',{id:songsheetId,isRank:true})">查看全部&nbsp;&nbsp;</span>>
        </div>
    </div>
    <LoadingCpn v-else/>
</template>

<script>
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import { postJson } from '@/api/apiConfig'
import { sddetail } from '@/api/api'
import { useRouter } from 'vue-router'
import LoadingCpn from "@/components/common/loadingcpn.vue"
import { goPage,audioPlay } from "@/utils/common"
import {useStore} from 'vuex'
export default defineComponent({
    name:'officialplaylist',
    props:['id','OfficialName'],
    components:{
        LoadingCpn
    },
    setup (props) {
        let state = reactive({
            dataList:[],
            trackIds:[],
            OfficialName: props.OfficialName,
            songsheetId: props.id,
        })
        let getData = () => {
            postJson(sddetail,{id:props.id},(res) => {
                if(res.code == 200) {
                    state.dataList = res.playlist.tracks
                    state.trackIds = res.playlist.trackIds
                }
            },(err) => {

            })
        }
        const store = useStore()
        let goAudioPlay = (data) => {
            let SongInfo = {
                id: data.id,
                name: data.name,
                picUrl: data.al.picUrl,
                song:{
                    artists: data.ar
                }
            }
            let arr = []
            let forArr = ''
            forArr = JSON.parse(JSON.stringify(state.dataList))
            forArr.forEach(item => {
                let obj = {
                    id: item.id,
                    name: item.name,
                    picUrl: item.al.picUrl,
                    song:{
                        artists: item.ar,
                        bMusic:{
                            playTime: item.dt,
                        }
                    }
                }
                arr.push(obj)
            })
            audioPlay(SongInfo,arr,store)
        }
        onMounted(() => {
          getData()  
        })
        let router = useRouter()
        return {
            ...toRefs(state),
            router,
            goPage,
            goAudioPlay
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-officialplaylist{
    .officialplaylist-section{
        height: 180px;
        overflow: hidden;
    }
    .officialplaylist-list{
        height: 36px;
        line-height: 36px;
        border-radius: 4px;
        padding: 0 12px;
        cursor: pointer;
        .officialplaylist-num{
            font-size: 14px;
            color: $font-authorcolor;
        }
        .officialplaylist-num.topT{
            color: $musicNameOn;
        }
        .officialplaylist-ratio{
            font-size: 12px;
            color: $font-authorcolor;
            width: 45px;
            text-align: center;
            font-weight: bold;
        }
        .officialplaylist-name{
            font-size: 12px;
            em{
                color: $font-authorcolor;
            }
        }
        .officialplaylist-author{
            max-width: 34%;
            span{
                font-size: 12px;
                color: $font-authorcolor;
                cursor: pointer;
                em:hover{
                    color: $font-hoverauthorcolor;  
                }
            }
        }
        .officialplaylist-lr{
            span{
                width: 35px;
                height: 36px;
                display: block;
            }
            .none{
                background: url("../../../../assets/img/rankline.jpg") center no-repeat;
                background-size: 8px 2px
            }
            .up{
                background: url("../../../../assets/img/long-arrow-up.png") center no-repeat;
                background-size: 8px;
            }
            .down{
                background: url("../../../../assets/img/long-arrow-down.png") center no-repeat;
                background-size: 8px;
            }
            .new{
                background: url("../../../../assets/img/new.png") center no-repeat;
                background-size: 23px;
            }
        }
    }
    .officialplaylist-list.bgtst{
        background-color:$artistsonglistbg;
    }
    .officialplaylist-list:hover{
        background-color:$checkhvoerbg;
    }
    .officialplaylist-more{
        font-size: 12px;
        padding-top: 12px;
        padding-left: 12px;
        color: $font-authorcolor;
        span{
            cursor: pointer;
        }
        span:hover{
            color: $font-hoverauthorcolor;
        }
    }
}
</style>