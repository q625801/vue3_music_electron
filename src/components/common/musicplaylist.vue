<template>
    <div class="wrap-musicplaylist">
        <el-table :data="songlistdata" stripe class="musicplaylist-table" empty-text="数据加载中..." @row-dblclick="goAudioPlay" :row-class-name="tableRowClassName">
            <el-table-column prop="date" label="操作" min-width="14%" center>
                <template #default="scope">
                    <span class="musicplaylist-ordernum">
                        {{scope.$index + 1 < 10 ? ('0' + (scope.$index + 1)) : scope.$index + 1}}
                    </span>
                    <span class="musicplaylist-AudioInfoPlay"></span>
                    <span class="musicplaylist-download" @click="download(scope.row)"></span>
                </template>
            </el-table-column>
            <el-table-column label="标题" min-width="37%">
                <template #default="scope">
                    <span class="musicplaylist-title">{{scope.row.name}}</span>
                    <span class="musicplaylist-alias">{{`${scope.row.alia.length > 0 ? '（' + scope.row.alia[0] + '）': ''}`}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="singer" label="歌手" min-width="17%">
                <template #default="scope">
                    <div class="musicplaylist-singer">
                        <span v-for="(item,index) in scope.row.ar" :key="index">
                            {{index != 0 ? ' / ' : ''}}
                            <em @click.stop="goArtist(item.id)">{{item.name}}</em>
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="album" label="专辑" min-width="24%">
                <template #default="scope">
                    <span class="musicplaylist-album">{{scope.row.al.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="duration" label="时间" min-width="8%">
                <template #default="scope">
                    <span>{{playtime(scope.row.dt)}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="musicplaylist-loading" v-show="songmoreloading">
            <LoadingCpn/>
        </div>
        <div class="musicplaylist-bottom" v-if="showsongmore">我也是有底线的</div>
    </div>
</template>
<script>
import { defineComponent,onMounted,reactive,toRefs,watch,nextTick } from 'vue'
import { downloadJson,postJson } from "@/api/apiConfig"
import { songsdetail,mp3url } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import isElectron from 'is-electron'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import { playtime,audioPlay } from "@/utils/common"
export default defineComponent({
    name:'loading',
    props:['stdetaildata','stSongAll'],
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
            const el = document.querySelector(".wrap-everydaysongrmd")
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
            console.log('执行songsdetail')
            getsongdata(newArr);
            
        }
        let getsongdata = (data) => {
            postJson(songsdetail,{ids:data.toString()},(res) => {
                if(res.code == 200){
                    state.songmoreloading = false
                    nextTick(() => {
                        
                        state.songlistdata = state.songlistdata.concat(res.songs)
                    })
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
        let router = useRouter()
        function goArtist(id){
            router.push({
                path: '/artist',
                query:{
                    id:id
                }
            })
        }
        return {
            ...toRefs(state),
            download,
            playtime,
            getmoresong,
            goAudioPlay,
            tableRowClassName,
            goArtist
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-musicplaylist{
    .musicplaylist-table{
        cursor: default;
        .musicplaylist-title{
            color: $font-color;
        }
        .musicplaylist-alias{
            color: $font-authorcolor;
        }
        .musicplaylist-singer span ::v-deep em,.musicplaylist-album{
            cursor: pointer;
        }
        .musicplaylist-singer span ::v-deep em:hover,.musicplaylist-album:hover{
            color: $font-hoverauthorcolor;
        }
        .musicplaylist-ordernum{
            display: inline-block;
            line-height: 16px;
            cursor: default;
        }
        .musicplaylist-download{
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-left: 15px;
            background: url("../../assets/img/download.png") center center no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
        }
        .musicplaylist-download:hover{
            background: url("../../assets/img/download2.png") center center no-repeat;
            background-size: 100% 100%;
        }
        .musicplaylist-AudioInfoPlay{
            width: 16px;
            height: 16px;
            background: url("../../assets/img/volume.png") center center no-repeat;
            background-size: 100% 100%;
            display: none;
        }
        ::v-deep .el-table__row.on .cell .musicplaylist-title{
            color: $musicNameOn;
        }
        ::v-deep .el-table__row.on .cell .musicplaylist-ordernum{
            display:none;
        }
        ::v-deep .el-table__row.on .cell .musicplaylist-AudioInfoPlay{
            display:inline-block;
        }
        ::v-deep .el-table__row.on.playoff .cell .musicplaylist-AudioInfoPlay{
            background: url("../../assets/img/volume-close.png") center center no-repeat;
            background-size: 100% 100%;
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
<style lang="scss"> 
.wrap-musicplaylist .el-table .cell{
    padding:0 8px 0 0;
    color: $font-authorcolor;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    display: -webkit-box;
}
.wrap-musicplaylist .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
    border-bottom: 0px;
}
.wrap-musicplaylist .el-table{
    background-color: transparent;
}
.wrap-musicplaylist .el-table .el-table__cell{
    background-color: transparent;
}
.wrap-musicplaylist .el-table tr{
    background-color: transparent;
}
.wrap-musicplaylist .el-table__inner-wrapper::before{
    background-color: transparent;
}
.wrap-musicplaylist .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{
    background-color: #373737;
}
.wrap-musicplaylist .el-table .el-table__row td.el-table__cell:first-child .cell{
    justify-content: center;
    align-items: center;
    display: flex;
}
.wrap-musicplaylist .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell{
    background-color: transparent;
}
.wrap-musicplaylist .el-table td.el-table__cell{
    background-color: #2E2E2E;
}
.wrap-musicplaylist .el-table th.el-table__cell.is-leaf:first-child{
    text-align:center;
}
.wrap-musicplaylist  .el-table__body tr.el-table__row--striped:hover>td.el-table__cell{
    background-color: #373737;
}
</style>