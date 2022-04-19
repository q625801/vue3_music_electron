<template>
    <div class="wrap-artistsonglist">
        <div class="artistsonglist-table clear" :ref="setItemRef" v-if="songlistdata.length > 0">
            <div :class="['artistsonglist-list',index%2==0?'':'bgtst',item.id == $store.state.audioInfo.SongInfo.SongId ? 'on' : '',item.id == $store.state.audioInfo.SongInfo.SongId && $store.state.audioInfo.audioPlayBtn ? 'onPlay' : 'offPlay']" v-for="(item,index) in songlistdata" :key="item.id" @click="goAudioPlay(item)">
                <div class="artistsonglist-num fl">
                    <span>{{index+1 < 10 ? '0' + (index+1) : index+1}}</span>
                    <div class="artistsonglist-AudioInfoPlay"></div>
                </div>
                <div class="artistsonglist-download fl"></div>
                <div class="artistsonglist-name fl">
                    <span>{{item.name}}</span>
                    <em>{{item.tns && item.tns.length > 0 ? '（' + item.tns[0] + '）' : (item.alia && item.alia.length > 0 ? '（'+ item.alia[0] + '）' : '')}}</em>
                </div>
                <div class="artistsonglist-duration fl">{{playtime(item.dt)}}</div>
            </div>
        </div>
        <LoadingCpn v-else/>
        <div class="artistsonglist-checkall"  @click="checkAll" v-if="hotClick && songlistdata.length > 10">查看全部{{songlistdata.length}}首 ></div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onUpdated,ref } from 'vue'
import {postJson} from "@/api/apiConfig";
import { playtime,audioPlay } from "@/utils/common"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
    name:'artistsonglist',
    components:{
        LoadingCpn
    },
    props:[
        'isHot',
        'hotSongs',
        'songlistdata'
    ],
    setup (props) {
        let state = reactive({
            songlistdata:[],
            hotClick:true,
        })
        onUpdated(() => {
            if(props.isHot){
                state.songlistdata = props.hotSongs
            }else{
                
            }
        })
        let itemRefs = ref()
        const setItemRef = (el:Element) => {
            if(el){
                itemRefs.value = el
            }
        }
        let checkAll = () => {
            if(props.isHot){
                itemRefs.value.style['max-height'] = 'none'
                state.hotClick = false
            }
        }
        const store = useStore()
        let goAudioPlay = (data:any) => {
            let SongInfo = {
                id: data.id,
                name: data.name,
                picUrl: data.al.picUrl,
                song:{
                    artists: data.ar
                }
            }
            let arr:Array<object> = []
            let forArr = []
            forArr = JSON.parse(JSON.stringify(state.songlistdata))
            forArr.forEach((item:any) => {
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
        return {
            ...toRefs(state),
            playtime,
            checkAll,
            setItemRef,
            goAudioPlay
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-artistsonglist{
    .artistsonglist-table{
        padding-top: 8px;
        max-height: 350px;
        .artistsonglist-list{
            height: 35px;
            display: flex;
            align-items: center;
            width: 100%;
            background-color:$artistsonglistbg;
            cursor: pointer;
            .artistsonglist-num{
                padding-left: 15px;
                span{
                    font-size: 14px;
                    color: $font-authorcolor;
                }
                .artistsonglist-AudioInfoPlay{
                    width: 16px;
                    height: 16px;
                    background: url("../../../assets/img/volume.png") center center no-repeat;
                    background-size: 100% 100%;
                    display: none;
                }
            }
            .artistsonglist-name{
                flex: 1;
                padding-left: 15px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                color: $font-authorcolor;
                padding-right: 7px;
                span{
                    font-size: 14px;
                    color: $font-color;
                }
                em{
                    color:$font-authorcolor;
                    font-size:14px;
                }
            }
            .artistsonglist-download{
                display: inline-block;
                width: 14px;
                height: 14px;
                margin-left: 15px;
                background: url("../../../assets/img/download.png") center center no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .artistsonglist-duration{
                font-size: 14px;
                color: $font-authorcolor;
                padding-right: 35px;
            }
        }
        .artistsonglist-list.bgtst{
            background-color:transparent;
        }
        .artistsonglist-list:hover{
            background-color:$checkhvoerbg;
        }
        .artistsonglist-list.on{
            .artistsonglist-name{
                span{
                    color: $musicNameOn;
                }
            }
        }
        .artistsonglist-list.on.onPlay{
            .artistsonglist-num{
                span{
                    display: none;
                }
                .artistsonglist-AudioInfoPlay{
                    display:block;
                }
            }
        }
        .artistsonglist-list.on.offPlay{
            .artistsonglist-num{
                span{
                    display: none;
                }
                .artistsonglist-AudioInfoPlay{
                    display:block;
                    background: url("../../../assets/img/volume-close.png") center center no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
    .artistsonglist-checkall{
        height: 35px;
        text-align: right;
        font-size: 12px;
        color: $font-authorcolor;
        line-height:35px;
        background-color:$artistsonglistcheckall;
        cursor: pointer;
        padding-right: 30px;
    }
    .artistsonglist-checkall:hover{
        color: $font-hoverauthorcolor;
    }
}
</style>