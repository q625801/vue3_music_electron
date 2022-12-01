<template>
    <div class="wrap-singer">
        <Selectopt @notice="getparams"/>
        <div class="singer-section">
            <div class="singer-list" v-for="item in singerList" :key="item.id">
                <div class="singer-img" @click="goPage(router,'/artist',{id:item.id})">
                    <img v-lazy="item.img1v1Url + '?param=300y300'"/>
                </div>
                <div class="singer-name" @click="goPage(router,'/artist',{id:item.id})">{{item.name}}</div>
            </div>
        </div>
        <LoadingCpn v-if="loading"/>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue'
import Selectopt from './singer/selectopt.vue'
import { getJson } from '@/api/apiConfig'
import { getartistlist } from '@/api/api'
import LoadingCpn from "@/components/common/loadingcpn.vue"
import { goPage } from "@/utils/common"
import { useRouter } from 'vue-router'
interface params{
    classify: string,
    languages: string,
    screen: string,
}
interface state{
    params: params,
    singerList: any[],
    pageSize: number,
    pageNum: number,
    more: boolean,
    loading: boolean,
}
export default defineComponent({
    name:'singer',
    components:{
        Selectopt,
        LoadingCpn
    },
    setup () {
        let state = reactive<state>({
            params:{
                classify:"",
                languages:"",
                screen:""
            },
            singerList:[],
            pageSize: 20,
            pageNum:1,
            more:false,
            loading:false,
        })
        let getparams = (params:params) => {
            state.pageNum = 1
            state.params = params
            state.singerList = []
            getData()
        }
        let getData = () => {
            const offset = state.pageSize * (state.pageNum - 1)
            const params = {
                type:state.params.classify,
                area:state.params.languages,
                initial:state.params.screen,
                limit:state.pageSize,
                offset:offset
            }
            state.loading = true
            getJson(getartistlist,params,(res:{code:number,more:boolean,artists:any[]}) => {
                state.loading = false
                if(res.code == 200){
                    state.more = res.more
                    state.singerList = state.singerList.concat(res.artists)
                }
            },(err:any) => {

            })
        }
        onMounted(() => {
            const el:HTMLElement = document.querySelector(".index-screen") as HTMLElement
            const offsetHeight = el.offsetHeight
            el.onscroll = () => {
                const scrollTop = el.scrollTop
                const scrollHeight = el.scrollHeight
                if(offsetHeight + scrollTop - scrollHeight >= 0){
                    if(state.more){
                        state.pageNum++
                        getData()
                    }
                }
            }
        })
        let router = useRouter()
        return {
            ...toRefs(state),
            getparams,
            goPage,
            router
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-singer{
    padding-bottom: 20px;
    .singer-section{
        display: flex;
        flex-wrap: wrap;
        padding-top: 10px;
        .singer-list{
            width: 18%;
            margin-bottom: 20px;
            margin-right: 2.5%;
            .singer-img{
                width: 100%;
                height: 136px;
                border-radius: 5px;
                overflow: hidden;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    max-width:100%;
                    max-height: 100%;
                }
            }
            .singer-name{
                font-size: 14px;
                padding-top: 10px;
                cursor: pointer;
            }
            .singer-name:hover{
                color: $font-hovercolor;
            }
        }
        .singer-list:nth-child(5n){
            margin-right: 0;
        }
    }
}
</style>