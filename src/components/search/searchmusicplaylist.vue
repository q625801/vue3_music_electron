<template>
    <div class="wrap-musicplaylist">
        <div class="musicplaylist-table clear" v-if="songlistdata.length > 0">
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
                    <div class="musicplaylist-collection fl"></div>
                    <div class="musicplaylist-download fl" @click.stop="download(item)"></div>
                </div>
                <div class="musicplaylist-name ellipsis">
                    <span>{{item.name}}</span>
                    <em>{{item.transNames && item.transNames.length > 0 ? '（' + item.transNames[0] + '）' : (item.alias && item.alias.length > 0 ? '（'+ item.alias[0] + '）' : '')}}</em>
                </div>
                <div class="musicplaylist-artist ellipsis">
                    <span v-for="(item2,index2) in item.artists" :key="index2">
                        {{index2 != 0 ? ' / ' : ''}}
                        <em @click.stop="goPage(router,'/artist',{id:item2.id})">{{item2.name}}</em>
                    </span>
                </div>
                <div class="musicplaylist-album ellipsis" @click.stop="goPage(router,'/album',{id:item.album.id})">
                    {{item.album.name}}
                </div>
                <div class="musicplaylist-duration">{{playtime(item.duration)}}</div>
            </div>
        </div>
        <div class="musicplaylist-loading" v-show="loading">
            <LoadingCpn/>
        </div>
        <el-pagination
            small 
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="pageObj.total"
            :page-size="pageObj.pageSize"
            :current-page="pageObj.pageNum"
            class="mt-4 common-pagination"
            v-if="songlistdata && songlistdata.length > 0" >
        </el-pagination>
        <div class="musicplaylist-bottom" v-if="dataNo">暂无数据</div>
    </div>
</template>
<script>
import { defineComponent,reactive,toRefs,watch } from 'vue'
import { downloadJson,postJson } from "@/api/apiConfig"
import { mp3url,getsearch } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import isElectron from 'is-electron'
import {useStore} from 'vuex'
import { playtime,audioPlay } from "@/utils/common"
export default defineComponent({
    name:'searchmusicplaylist',
    components:{
        LoadingCpn
    },
    props:[
        'keywords'
    ],
    setup (props) {
        let state = reactive({
            songlistdata:[],
            loading: false,
            pageObj:{
                pageSize:80,
                pageNum:1,
                total:0,
            },
            dataNo:false,
        })
        let getData = () => {
            let offset = state.pageObj.pageSize * (state.pageObj.pageNum - 1)
            state.loading = true
            postJson(getsearch,{keywords:props.keywords,limit:state.pageObj.pageSize,offset:offset,type:1},res => {
                state.loading = false
                if(res.code == 200){
                    if(res.result.songs && res.result.songs.length > 0){
                        state.songlistdata =  res.result.songs
                        state.pageObj.total = res.result.songCount
                    }else{
                        state.dataNo = true
                    }
                }
            },err => {
                
            })
        }
        const store = useStore()
        let goAudioPlay = (data) => {
            let SongInfo = {
                id: data.id,
                name: data.name,
                picUrl: data.album.artist.img1v1Url,
                song:{
                    artists: data.artists
                }
            }
            let arr = []
            let forArr = ''
            forArr = JSON.parse(JSON.stringify(state.songlistdata))
            forArr.forEach(item => {
                let obj = {
                    id: item.id,
                    name: item.name,
                    picUrl: item.album.artist.img1v1Url,
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
        let handleCurrentChange = (pagenum) => {
            state.pageObj.pageNum = pagenum
            state.songlistdata = []
            getData()
        }
        watch(() => props.keywords,newValue => {
            init()
        })
        let init = () => {
            state.songlistdata = []
            state.pageObj = {
                pageSize:80,
                pageNum:1,
                total:0,
            }
            state.dataNo = false
            getData()
        }
        init()
        return {
            ...toRefs(state),
            download,
            playtime,
            goAudioPlay,
            handleCurrentChange
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
            width: 12.5%;
            box-sizing: border-box;
            padding-left: 7%;
        }
        .header-t{
            width: 38%;
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