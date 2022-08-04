<template>
    <div class="wrap-searchalbum">
        <div class="searchalbum-section">
            <div class="searchalbum-list clear" v-for="(item,index) in dataList" :key="index">
                <div class="img fl">
                    <img v-lazy="item.picUrl + '?param=200y200'"/>
                </div>
                <div class="name fl">
                    
                </div>
                <div class="artist">

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
            getJson(getsearch,{keywords:props.keywords,limit:state.pageObj.pageSize,offset:offset,type:10},res => {
                console.log(res)
                state.loading = false
                if(res.code == 200){
                    if(res.result.albums && res.result.albums.length > 0){
                        state.dataList =  res.result.albums
                        state.pageObj.total = res.result.albumCount
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
        return {
            ...toRefs(state),
            handleCurrentChange
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-searchalbum{
    
}
</style>