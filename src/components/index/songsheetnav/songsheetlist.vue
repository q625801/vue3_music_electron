<template>
    <div class="wrap-songsheetlist">
        <div class="songsheetlist-section clear">
            <div class="list fl" v-for="item in songsheetData" :key="item.id" @click="goPage(router,'/songsheetdetail',{id:item.id})">
                <div class="img">
                    <img v-lazy="item.coverImgUrl + '?param=300y300'"/>
                    <div class="list-playCount">{{item.playCount > 100000000 ? (item.playCount/100000000).toString().split(".")[0] + "亿" : item.playCount > 10000 ? (item.playCount/10000).toString().split(".")[0] + "万" : item.playCount}}</div>
                    <div class="list-username">{{item.creator.nickname}}</div>
                </div>
                <div class="name">{{item.name}}</div>
            </div>
        </div>
        <LoadingCpn v-if="loading"/>
        <el-pagination
            small 
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="pageObj.total"
            :page-size="pageObj.pageSize"
            :current-page="pageObj.pageNum"
            class="mt-4 common-pagination"
            v-if="songsheetData && songsheetData.length > 0" >
        </el-pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent,watch,reactive,toRefs } from 'vue'
import { getJson } from '@/api/apiConfig'
import { gettopplaylist } from '@/api/api'
import LoadingCpn from "@/components/common/loadingcpn.vue"
import { useRouter } from 'vue-router'
import { goPage } from '@/utils/common'
interface page{
    pageSize: number,
    pageNum: number,
    total: number,
}
interface state{
    cat:string,
    songsheetData:any[],
    loading:boolean,
    pageObj:page
}
export default defineComponent({
    name:'songsheetlist',
    components:{
        LoadingCpn,
    },
    props:[
        'cat'
    ],
    setup (props) {
        let state = reactive<state>({
            cat: props.cat,
            songsheetData:[],
            loading:false,
            pageObj:{
                pageSize:100,
                pageNum:1,
                total:0,
            },
        })
        let getSongSheet = () => {
            let offset = state.pageObj.pageSize * (state.pageObj.pageNum - 1)
            state.loading = true
            getJson(gettopplaylist,{cat:state.cat,offset:offset,limit:state.pageObj.pageSize},(res:{code:number,playlists:any[],total:number}) => {
                state.loading = false
                if(res.code == 200){
                    state.songsheetData = res.playlists
                    state.pageObj.total = res.total
                }
            },(err:any) => {

            })
        }
        let handleCurrentChange = (pagenum:number) => {
            state.pageObj.pageNum = pagenum
            state.songsheetData = []
            getSongSheet()
        }
        watch(() => props.cat,(newValue) => {
            state.cat = newValue
            init()
        })
        let router = useRouter()
        let init = () => {
            state.songsheetData = []
            state.pageObj = {
                pageSize:100,
                pageNum:1,
                total:0,
            }
            getSongSheet()
        }
        init()
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
.wrap-songsheetlist{
    padding-top: 16px;
    .songsheetlist-section{
        .list{
            width: 23%;
            margin-right: 2.5%;
            .img{
                height: 174px;
                border-radius: 5px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                cursor: pointer;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
                .list-playCount{
                    position:absolute;
                    right:0;
                    top:0;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 24px;
                    background:url('../../../assets/img/player-btn2.png') left center no-repeat;
                    background-size: 16px;
                    padding-left: 20px;
                    padding-right:8px;
                }
                .list-username{
                    position:absolute;
                    left:10px;
                    bottom:10px;
                    color: $font-hovercolor;
                    font-size: 14px;
                    background: rgba(0,0,0,.2)
                }
            }
            .name{
                height: 44px;
                font-size: 14px;
                line-height: 22px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin: 7px 0 20px 0;
                cursor: pointer;
            }
            .name:hover{
                color:$font-hovercolor;
            }
        }
        .list:nth-child(4n){
            margin-right: 0;
        }
    }
}
</style>