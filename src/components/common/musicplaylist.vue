<template>
    <div class="wrap-musicplaylist">
        <div class="musicplaylist-table clear" v-if="songlistdata.length > 0" :class="[isRank ? 'isRank' : '']">
            <div class="musicplaylist-header">
                <div class="header-o">操作</div>
                <div class="header-t">标题</div>
                <div class="header-s">歌手</div>
                <div class="header-f">专辑</div>
                <div class="header-w">时间</div>
            </div>
            <div :class="['musicplaylist-list',index%2==0?'':'bgtst',item.id == $store.state.audioInfo.SongInfo.SongId ? 'on' : '',item.id == $store.state.audioInfo.SongInfo.SongId && $store.state.audioInfo.audioPlayBtn ? 'onPlay' : 'offPlay']" v-for="(item,index) in songlistdata" :key="item.id" @dblclick="goAudioPlay(item)">
                <div class="musicplaylist-operation clear">
                    <div class="musicplaylist-num fl">
                        <span>{{index+1 < 10 ? '0' + (index+1) : index+1}}</span>
                        <div class="musicplaylist-AudioInfoPlay fl"></div>
                    </div>
                    <div class="musicplaylist-ratio fl" v-if="trackIds[index].ratio && isRank">
                        {{trackIds[index].ratio + '%'}}
                    </div>
                    <div class="musicplaylist-lr fl" v-if="!trackIds[index].ratio && isRank">
                        <span :class="[trackIds[index].lr ? (index - trackIds[index].lr === 0 ? 'none' : (index - trackIds[index].lr < 0 ? 'up' : 'down')) : (trackIds[index].lr === 0 ? (index - trackIds[index].lr === 0 ? 'none' : (index - trackIds[index].lr < 0 ? 'up' : 'down')) : 'new')]"></span>
                    </div>
                    <div class="musicplaylist-collection fl"></div>
                    <div class="musicplaylist-download fl" @click.stop="download(item)"></div>
                </div>
                <div class="musicplaylist-name ellipsis">
                    <span>{{item.name}}</span>
                    <em>{{item.tns && item.tns.length > 0 ? '（' + item.tns[0] + '）' : (item.alia && item.alia.length > 0 ? '（'+ item.alia[0] + '）' : '')}}</em>
                </div>
                <div class="musicplaylist-artist ellipsis">
                    <span v-for="(item2,index2) in item.ar" :key="index2">
                        {{index2 != 0 ? ' / ' : ''}}
                        <em @click.stop="goPage(router,'/artist',{id:item2.id})">{{item2.name}}</em>
                    </span>
                </div>
                <div class="musicplaylist-album ellipsis">
                    {{item.al.name}}
                </div>
                <div class="musicplaylist-duration">{{playtime(item.dt)}}</div>
            </div>
        </div>
        <div class="musicplaylist-loading" v-show="songmoreloading">
            <LoadingCpn/>
        </div>
        <div class="musicplaylist-bottom" v-if="showsongmore">我也是有底线的</div>
    </div>
</template>
<script>
import { defineComponent,onMounted,reactive,toRefs,watch } from 'vue'
import { downloadJson,postJson } from "@/api/apiConfig"
import { songsdetail,mp3url } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import isElectron from 'is-electron'
import {useStore} from 'vuex'
import { playtime,audioPlay,goPage } from "@/utils/common"
import {useRouter} from "vue-router"
export default defineComponent({
    name:'loading',
    props:['stdetaildata','stSongAll','isRank'],
    components:{
        LoadingCpn
    },
    setup (props) {
        let state = reactive({
            trackIds: '', //由于此处逻辑copy Vue2仿网易云版本故备注 songlistarr字段改为trackIds
            pagelength: '',
            songlistdata:[],
            pageArr:{
                ArrNo:0,
                ArrSize:20,
            },
            songmoreloading: false,
            showsongmore: false,
            songlistAll:[],
            PlayListId:'',
        })
        onMounted(() => {
            const el = document.querySelector(".wrap-everydaysongrmd") || document.querySelector(".wrap-albumsongsheet")
            const offsetHeight = el.offsetHeight
            el.onscroll = () => {
                const scrollTop = el.scrollTop
                const scrollHeight = el.scrollHeight
                if(offsetHeight + scrollTop - scrollHeight >= 0){
                    if(state.songlistdata.length < state.trackIds.length){
                        state.songmoreloading = true
                        getmoresong()
                    }else{
                        state.showsongmore = true
                    }
                }
            }
        })
        let init = () => {
            state.trackIds = []
            state.pagelength = ''
            state.pageArr={
                ArrNo:0,
                ArrSize:20,
            }
            state.songlistdata = []
            state.songmoreloading = false
            state.showsongmore = false
            state.songlistAll = []
        }
        let getmoresong = () => {
            let prevNo = state.pageArr.ArrNo
            if(state.pageArr.ArrNo == state.pagelength){
                return
            }else{
                state.pageArr.ArrNo += state.pageArr.ArrSize;
                if(state.pageArr.ArrNo > state.pagelength){
                    state.pageArr.ArrNo = state.pagelength
                }
            }

            let newArr = [];
            state.trackIds.forEach((item,index) => {
                if(index >= prevNo && index < state.pageArr.ArrNo){
                    newArr.push(item.id);
                }
            })
            getsongdata(newArr);
            
        }
        let getsongdata = (data) => {
            postJson(songsdetail,{ids:data.toString()},(res) => {
                if(res.code == 200){
                    state.songmoreloading = false
                    state.songlistdata = state.songlistdata.concat(res.songs)
                }            
            },(err)=>{

            },false)
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
            forArr = JSON.parse(JSON.stringify(state.songlistAll))
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
        let tableRowClassName = function({ row }){
            if(row.id == store.state.audioInfo.SongInfo.SongId && !store.state.audioInfo.audioPlayBtn){
                return 'on playoff'
            }else if(row.id == store.state.audioInfo.SongInfo.SongId){
                return 'on'
            } 
        }
        watch(() => props,(newValue,oldValue) => {
            if(state.PlayListId && state.PlayListId == newValue.stdetaildata.id){
                return
            }
            if(newValue.stdetaildata.trackIds){
                init() //组件传值后重置数据
                state.trackIds = newValue.stdetaildata.trackIds
                state.pagelength = state.trackIds.length
                state.PlayListId = newValue.stdetaildata.id
                getmoresong()
            }
            if(newValue.stSongAll && newValue.stSongAll.length > 0) {
                state.songlistAll = newValue.stSongAll
            }
        },{immediate:true,deep:true})
        function getMp3Url(id){
            return new Promise((reslove,reject) => {
                postJson(mp3url + '?timestamp=' + new Date().getTime(),{id:id},(res) => {
                    if(res.data[0].url != null){
                        reslove(res.data[0].url)
                    }else{
                        // $message({message:'获取音源失败，自动跳转下一首！',customClass:'zZindex'});
                        reject(undefined)
                    }
                },(err) => {
                    reject(undefined)
                },false)
            })
        }
        async function download(data){
            if(isElectron()){
                //electron环境中 实现下载效果还在摸索中 下次完成
                // //文件模块
                let fs = require('fs');
                // //系统路径模块
                let path = require('path');
                // //获取配置数据
                const newFile_path = path.join(__dirname, '../../download').replace(/\\/g, "\/");
                console.log(fs,newFile_path)
            }else{
                let mp3url = await getMp3Url(data.id)
                // let mp3url = 'http://m701.music.126.net/20220412172204/2d4376b487935287bb3b8c1110561d62/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/13866197954/e351/984c/1f8b/f6d3165d6b04dc78ec0d3c273ce02ff2.mp3'
                downloadJson(mp3url,{},(res) => {
                    const blob = new Blob([res]);
                    const fileName = data.name + '.mp3'
                    const elink = document.createElement('a');
                    elink.download = fileName;
                    elink.style.display = 'none';
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                },(err) => {

                })
            }
        }
        const router = useRouter()
        return {
            ...toRefs(state),
            download,
            playtime,
            getmoresong,
            goAudioPlay,
            tableRowClassName,
            router,
            goPage
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-musicplaylist{
    .musicplaylist-table{
        padding-top: 8px;
        .musicplaylist-list{
            height: 35px;
            display: flex;
            align-items: center;
            width: 100%;
            background-color:$artistsonglistbg;
            cursor: pointer;
            .musicplaylist-num{
                padding-left: 20px;
                span{
                    font-size: 14px;
                    display: block;
                    width: 30px;
                    text-align: right;
                    color: $font-authorcolor;
                    line-height: 16px;
                }
                .musicplaylist-AudioInfoPlay{
                    width: 16px;
                    height: 16px;
                    background: url("../../assets/img/volume.png") center center no-repeat;
                    background-size: 100% 100%;
                    display: none;
                    margin-left: 14px;
                }
            }
            .musicplaylist-name{
                width: 37%;
                padding-left: 15px;
                color: $font-authorcolor;
                padding-right: 7px;
                box-sizing: border-box;
                span{
                    font-size: 13px;
                    color: $font-color;
                }
                em{
                    color:$font-authorcolor;
                    font-size:13px;
                }
            }
            .musicplaylist-collection{
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-left: 10px;
                background: url("../../assets/img/collection.png") center center no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .musicplaylist-download{
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-left: 10px;
                background: url("../../assets/img/download.png") center center no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }
            .musicplaylist-duration{
                font-size: 14px;
                color: $font-authorcolor;
            }
            .musicplaylist-artist{
                width: 18%;
                padding-right: 7px;
                box-sizing: border-box;
                span{
                    font-size: 14px;
                    color: $font-authorcolor;
                    em:hover{
                        color: $font-hoverauthorcolor;  
                    }
                }
            }
            .musicplaylist-album{
                width: 24%;
                font-size: 14px;
                color: $font-authorcolor;
                padding-right: 7px;
                box-sizing: border-box;
            }
            .musicplaylist-album:hover{
                color: $font-hoverauthorcolor;
            }
            .ellipsis{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
            .musicplaylist-ratio{
                font-size: 12px;
                color: $font-authorcolor;
                line-height: 16px;
                padding-left: 10px;
                text-align: center;
                font-weight: bold;
                width: 30px;
            }
            .musicplaylist-lr{
                padding-left: 16px;
                span{
                    width: 23px;
                    height: 16px;
                    display: block;
                }
                .none{
                    background: url("../../assets/img/rankline.jpg") center no-repeat;
                    background-size: 8px 2px
                }
                .up{
                    background: url("../../assets/img/long-arrow-up.png") center no-repeat;
                    background-size: 8px;
                }
                .down{
                    background: url("../../assets/img/long-arrow-down.png") center no-repeat;
                    background-size: 8px;
                }
                .new{
                    background: url("../../assets/img/new.png") center no-repeat;
                    background-size: 23px;
                }
            }
        }
        .musicplaylist-list.bgtst{
            background-color:transparent;
        }
        .musicplaylist-list:hover{
            background-color:$checkhvoerbg;
        }
        .musicplaylist-list.on{
            .musicplaylist-name{
                span{
                    color: $musicNameOn;
                }
            }
        }
        .musicplaylist-list.on.onPlay{
            .musicplaylist-num{
                span{
                    display: none;
                }
                .musicplaylist-AudioInfoPlay{
                    display:block;
                }
            }
        }
        .musicplaylist-list.on.offPlay{
            .musicplaylist-num{
                span{
                    display: none;
                }
                .musicplaylist-AudioInfoPlay{
                    display:block;
                    background: url("../../assets/img/volume-close.png") center center no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
    .musicplaylist-header{
        height: 35px;
        display: flex;
        align-items: center;
        width: 100%;
        div{
            font-size: 14px;
            color: $font-authorcolor;
        }
        .header-o{
            width: 13%;
            box-sizing: border-box;
            padding-left: 7%;
        }
        .header-t{
            width: 37%;
            padding-left: 15px;
            padding-right: 7px;
            box-sizing: border-box;
        }
        .header-s{
            width: 18%;
            padding-right: 7px;
            box-sizing: border-box;
        }
        .header-f{
            width: 24%;
            padding-right: 7px;
            box-sizing: border-box;
        }
    }
    
    .musicplaylist-table.isRank{
        .musicplaylist-header{
            .header-o{
                width: 15.3%;
                padding-left: 9%;
            }
            .header-t{
                padding-left: 32px;
                width: 35%;
            }
        }
        .musicplaylist-list{
            .musicplaylist-name{
                width: 33%;
            }
        }
    }
    .musicplaylist-loading{
        padding: 15px 0;
    }
    .musicplaylist-bottom{
        padding: 20px 0;
        text-align: center;
        color: #D6D6D6;
        font-size: 14px;
    }
}
</style>