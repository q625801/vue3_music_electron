<template>
    <div class="wrap-musicplaylist">
        <el-table :data="tableData" stripe class="musicplaylist-table">
            <el-table-column prop="date" label="操作" min-width="14%" center>
                <template #default="scope">
                    <span class="musicplaylist-ordernum">{{scope.row.ordernum}}</span>
                    <span class="musicplaylist-download" @click="download"></span>
                </template>
            </el-table-column>
            <el-table-column label="标题" min-width="37%">
                <template #default="scope">
                    <span class="musicplaylist-title">{{scope.row.songname}}</span>
                    <span class="musicplaylist-alias">（{{scope.row.alias}}）</span>
                </template>
            </el-table-column>
            <el-table-column prop="singer" label="歌手" min-width="17%">
                <template #default="scope">
                    <span class="musicplaylist-singer">{{scope.row.singer}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="album" label="专辑" min-width="24%">
                <template #default="scope">
                    <span class="musicplaylist-album">{{scope.row.album}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="duration" label="时间" min-width="8%">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { defineComponent,onMounted,reactive,toRefs,watch } from 'vue'
import { downloadJson } from "@/api/apiConfig"
import isElectron from 'is-electron'
export default defineComponent({
    name:'loading',
    props:['stdetaildata'],
    setup (props) {
        let state = reactive({
            trackIds: '',
            pagelength: '',
            tableData: [
                {
                    ordernum:'01',
                    songname: '夜曲',
                    singer: '周杰伦',
                    alias: 'YYDS',
                    album:'十一月的肖邦',
                    duration:'03:24'
                },
                {
                    ordernum:'01',
                    songname: '夜曲',
                    alias: 'YYDS',
                    singer: '周杰伦',
                    album:'十一月的肖邦',
                    duration:'03:24'
                },
            ]
        })
        onMounted(() => {

        })
        let init = () => {
            state.songlistarr = []
            state.pagelength = ''
            state.pageArr={
                ArrNo:0,
                ArrSize:20,
            }
            state.songlistdata = []
            state.songmoreloading = false
            state.showsongmore = false
        }
        let download = () => {
            if(isElectron()){
                //electron环境中
                // //文件模块
                let fs = require('fs');
                // //系统路径模块
                let path = require('path');
                // //获取配置数据
                const newFile_path = path.join(__dirname, '../../download').replace(/\\/g, "\/");
                console.log(fs,newFile_path)
            }else{
                return
                let mp3url = 'http://m701.music.126.net/20220412172204/2d4376b487935287bb3b8c1110561d62/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/13866197954/e351/984c/1f8b/f6d3165d6b04dc78ec0d3c273ce02ff2.mp3'
                downloadJson(mp3url,{},(res) => {
                    
                    console.log(res)
                    const blob = new Blob([res]);
                    const fileName = '测试.mp3'
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
        watch(() => props,(newValue) => {
            init() //组件传值后重置数据
            state.trackIds = newValue ? newValue.stdetaildata.trackIds : []
            state.pagelength = state.trackIds.length;
            this.getmoresong();
        },{immediate:true,deep:true})
        return {
            ...toRefs(state),
            download
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
        .musicplaylist-singer,.musicplaylist-album{
            cursor: pointer;
        }
        .musicplaylist-singer:hover,.musicplaylist-album:hover{
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
    }
}
</style>
<style lang="scss"> 
.wrap-musicplaylist .el-table .cell{
    padding:0;
    color: $font-authorcolor;
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