<template>
    <div class="wrap-searchalbum">
        <div class="searchalbum-section">
            <div class="searchalbum-list clear" v-for="(item,index) in dataList" :key="index" @click="goPage(router,'/songsheetdetail',{id:item.id})">
                <div class="img fl">
                    <img v-lazy="item.coverImgUrl + '?param=200y200'"/>
                </div>
                <div class="name ellipsis fl">
                    {{item.name}}
                </div>
                <div class="useinfo ellipsis">
                    <span>{{item.trackCount}}首</span>
                    <span>by <em @click.stop="goPage(router,'/userinfo',{id:item.creator.userId})">{{item.creator.nickname}}</em></span>
                </div>
                <div class="playcount">
                    {{item.playCount > 100000000 ? (item.playCount/100000000).toString().split(".")[0] + "亿" : item.playCount > 10000 ? (item.playCount/10000).toString().split(".")[0] + "万" : item.playCount}}
                </div>
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
            v-if="dataList && dataList.length > 0"
             >
        </el-pagination>
        <div class="musicplaylist-bottom" v-if="dataNo">暂无数据</div>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs,watch } from 'vue'
import { getJson } from "@/api/apiConfig"
import { getsearch } from "@/api/api"
import { useRouter } from 'vue-router'
import { goPage } from '@/utils/common'
import LoadingCpn from "@/components/common/loadingcpn.vue"
export default defineComponent({
    name:'searchalbum',
    components:{
        LoadingCpn
    },
    props:[
        'keywords'
    ],
    setup (props) {
        let state = reactive({
            dataList:[],
            loading: false,
            pageObj:{
                pageSize:20,
                pageNum:1,
                total:0,
            },
        })
        let getData = () => {
            let offset = state.pageObj.pageSize * (state.pageObj.pageNum - 1)
            state.loading = true
            getJson(getsearch,{keywords:props.keywords,limit:state.pageObj.pageSize,offset:offset,type:1000},res => {
                console.log(res)
                state.loading = false
                if(res.code == 200){
                    if(res.result.playlists && res.result.playlists.length > 0){
                        state.dataList =  res.result.playlists
                        state.pageObj.total = res.result.playlistCount
                        console.log(state.pageObj)
                    }else{
                        state.dataNo = true
                    }
                }
            },err => {
                
            })
        }
        let handleCurrentChange = (pagenum) => {
            state.pageObj.pageNum = pagenum
            state.dataList = []
            getData()
        }
        watch(() => props.keywords,newValue => {
            init()
        })
        let init = () => {
            state.dataList = []
            state.pageObj = {
                pageSize:20,
                pageNum:1,
                total:0,
            }
            state.dataNo = false
            getData()
        }
        init()
        let router = useRouter()
        return {
            ...toRefs(state),
            handleCurrentChange,
            router,
            goPage
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-searchalbum{
    .searchalbum-section{
        .searchalbum-list{
            padding: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .img{
                img{
                    width: 64px;
                    height: 64px;
                    border-radius: 5px;
                }
            }
            .name{
                padding-left: 20px;
                font-size: 14px;
                width: 300px;
            }
            .useinfo{
                width: 180px;
                span{
                    font-size: 12px;
                    color: $font-authorcolor;
                    em{
                        color:$font-color;
                        &:hover{
                            color:$font-hovercolor;
                        }
                    }
                }
                span:first-child{
                    padding-right: 40px;
                }
            }
            .playcount{
                background: url("../../assets/img/player-btn.png") left center no-repeat;
                background-size: 18px 18px;
                padding-left: 20px;
                line-height:20px;
                font-size: 12px;
                margin-left: 50px;
            }
        }
        .searchalbum-list:nth-child(2n){
            background-color: $artistsonglistbg;
        }
        .searchalbum-list:hover{
            background-color:$checkhvoerbg;
        }
    }
}
</style>