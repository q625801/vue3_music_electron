<template>
    <div class="wrap-searchartist">
        <div class="searchartist-section">
            <div class="searchartist-list clear" v-for="(item,index) in dataList" :key="index" @click="goPage(router,'/artist',{id:item.id})">
                <div class="searchartist-img fl">
                    <img v-lazy="item.img1v1Url + '?param=200y200'"/>
                </div>
                <div class="searchartist-name">{{item.name}}</div>
            </div>
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
            v-if="dataList && dataList.length > 0" >
        </el-pagination>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs } from 'vue'
import { getJson } from "@/api/apiConfig"
import { getsearch } from "@/api/api"
import { useRouter } from 'vue-router'
import { goPage } from '@/utils/common'
export default defineComponent({
    name:'searchartist',
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
            getJson(getsearch,{keywords:props.keywords,limit:state.pageObj.pageSize,offset:offset,type:100},res => {
                if(res.code == 200){
                   state.dataList = res.result.artists
                   state.pageObj.total = res.result.artistCount
                }
            },err => {

            })
        }
        let handleCurrentChange = (pagenum) => {
            state.pageObj.pageNum = pagenum
            state.dataList = []
            getData()
        }
        getData()
        let router = useRouter()
        return {
            ...toRefs(state),
            router,
            handleCurrentChange,
            goPage
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-searchartist{
    .searchartist-section{
        .searchartist-list{
            padding: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .searchartist-img{
                width: 62px;
                height: 62px;
                border-radius: 5px;
                overflow: hidden;
            }
            .searchartist-name{
                padding-left: 10px;
            }
        }
        .searchartist-list:nth-child(2n){
            background-color: $artistsonglistbg;
        }
        .searchartist-list:hover{
            background-color:$checkhvoerbg;
        }
    }
}
</style>