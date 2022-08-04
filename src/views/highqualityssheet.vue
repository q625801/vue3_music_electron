<template>
    <div class="wrap-highqualityssheet">
        <div class="highqualityssheet-top">
            <Titlemm :title="'精品歌单'" :arrow="false"/>
            <div class="highqualityssheet-tags" @click="catgorysectionFlag = !catgorysectionFlag" ref="tags">
                {{cat}}
            </div>
            <div class="highqualityssheet-catgorysection" v-show="catgorysectionFlag" ref="highqualityList">
                <div class="catgorysection-all">
                    <span @click="changecat('全部歌单')">全部歌单</span>
                </div>
                <div class="catgorysection-cb clear">
                    <div class="catgorysection-list fl" v-for="item in highqualityTags" :key="item.id">
                        <span :class="[cat == item.name ? 'on' : '']" @click="changecat(item.name)">{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="highqualityssheet-section clear" v-if="dataList && dataList.length > 0">
            <div class="highqualityssheet-datalist clear fl" v-for="item in dataList" :key="item.id">
                <div class="datalist-img fl" @click="goPage(router,'/songsheetdetail',{id:item.id})">
                    <img v-lazy="item.coverImgUrl + '?param=300y300'"/>
                    <div class="datalist-player amn4"></div>
                    <div class="datalist-playCount">{{item.playCount > 100000000 ? (item.playCount/100000000).toString().split(".")[0] + "亿" : item.playCount > 10000 ? (item.playCount/10000).toString().split(".")[0] + "万" : item.playCount}}</div>
                </div>
                <div class="datalist-content fl">
                    <span class="name slh" @click="goPage(router,'/songsheetdetail',{id:item.id})">{{item.name}}</span>
                    <p class="sn user slh" @click="goPage(router,'/userinfo',{id:item.creator.userId})">by {{item.creator.nickname}}</p>
                    <p class="sn pd2 slh">{{item.copywriter}}</p>
                </div>
            </div>
        </div>
        <LoadingCpn v-if="loading"/>
        <div class="loadend" v-if="!more">我也是有底线的~</div>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs,watch,ref,onMounted } from 'vue'
import {getJson} from "@/api/apiConfig";
import { gethighqualitytags,gethighquality } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
import { useRouter } from "vue-router"
import { goPage } from "@/utils/common"
export default defineComponent({
    name:'highqualityssheet',
    components:{
        Titlemm,
        LoadingCpn
    },
    setup () {
        let router = useRouter()
        let state = reactive({
            catgorysectionFlag:false,
            highqualityTags:'',
            cat:router.currentRoute.value.query.cat,
            dataList:[],
            before:'',
            more:'',
            loading:false,
        })
        let getTags = () => {
            getJson(gethighqualitytags,{},(res) => {
                if(res.code == 200){
                    state.highqualityTags = res.tags
                }
            },(err) => {})
        }
        let getData = () => {
            state.loading = true
            getJson(gethighquality,{before:state.before,cat:state.cat,limit:20},res => {
                state.loading = false
                if(res.code == 200){
                    state.dataList = state.dataList.concat(res.playlists)
                    state.before = res.lasttime
                    state.more = res.more
                    
                }
            },err => {

            })
        }
        let changecat = (cat) => {
            state.catgorysectionFlag = false
            goPage(router,'/index/highqualityssheet',{cat:cat})
        }
        watch(() => router.currentRoute.value.query,(newValue) => {
            state.cat = newValue.cat
            init()
        })
        const tags = ref(null)
        const highqualityList = ref(null)
        getTags()
        document.addEventListener('click',(e) => {
            if(tags && tags.value != null && tags.value.contains(e.target)){
                return
            }else if(highqualityList && highqualityList.value != null && !highqualityList.value.contains(e.target)){
                state.catgorysectionFlag = false
            }
        })
        onMounted(() => {
            init()
            const el = document.querySelector(".index-screen")
            const offsetHeight = el.offsetHeight
            el.onscroll = () => {
                const scrollTop = el.scrollTop
                const scrollHeight = el.scrollHeight
                if(offsetHeight + scrollTop - scrollHeight >= 0){
                    if(state.more){
                        getData()
                    }
                }
            }
        })
        let init = () => {
            state.dataList = []
            state.before = ''
            getData()
        }
        return {
            ...toRefs(state),
            changecat,
            router,
            highqualityList,
            tags,
            goPage
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-highqualityssheet{
    .highqualityssheet-top{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        position: relative;
        .highqualityssheet-tags{
            align-self: flex-end;
            font-size: 13px;
            margin-bottom: 14px;
            padding: 5px 15px 5px 30px;
            border: 1px solid $navcatlistcatogrybdtc;
            border-radius: 20px;
            background: url('../assets/img/tags.png') 14px center no-repeat;
            background-size: 12px;
            cursor: pointer;
        }
        .highqualityssheet-tags:hover{
            background-color: $navcatlistcatogrybg;
        }
        .highqualityssheet-catgorysection{
            position: absolute;
            width: 515px;
            top: 40px;
            right: 0;
            background: $navcatlistcatogrybg;
            border-radius: 6px;
            border: 1px solid $navcatlistcatogrybdc;
            z-index: 99;
            .catgorysection-all{
                border-bottom: 1px solid $navcatlistcatogrybdtc;
                padding: 12px 20px;
                span{
                    display: inline-block;
                    font-size: 14px;
                    cursor: pointer;
                    padding: 7px 10px;
                    border-radius: 25px;
                }
                span:hover{
                    color:$musicNameOn;
                }
                span.on{
                    color:$musicNameOn;
                    background: rgba($musicNameOn,0.05)
                }
            }
            .catgorysection-cb{
                padding: 25px 20px 10px;
                .catgorysection-list{
                    width: 95px;
                    margin-bottom: 20px;
                    span{
                        font-size: 14px;
                        display:inline-block;
                        cursor: pointer;
                        padding: 7px 10px;
                        border-radius: 25px;
                        position: relative;
                    }
                    span:hover{
                        color:$musicNameOn;
                    }
                    span.on{
                        color:$musicNameOn;
                        background: rgba($musicNameOn,0.05)
                    }
                }
            }
        }
    }
    .highqualityssheet-section{
        .highqualityssheet-datalist{
            width: 49%;
            margin-bottom: 20px;
            margin-right: 2%;
            box-sizing: border-box;
            .datalist-img{
                width: 136px;
                height: 136px;
                border-radius: 5px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                position: relative;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
                .datalist-player{
                    width: 28px;
                    height: 28px;
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                    background: url('../assets/img/player-daily.png') center no-repeat;
                    background-size: cover;
                    opacity: 0;
                }
                .datalist-playCount{
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 24px;
                    background: url('../assets/img/player-btn2.png') left center no-repeat;
                    background-size: 16px;
                    padding-left: 20px;
                    padding-right: 8px;
                }
            }
            .datalist-img:hover{
                .datalist-player{
                    opacity: 1;
                }
            }
            .datalist-content{
                width: calc(100% - 136px);
                box-sizing: border-box;
                padding-left: 8px;
                .name{
                    font-size: 14px;
                    padding-top: 25px;
                    cursor: pointer;
                }
                .name:hover{
                    color: $font-hovercolor;
                }
                .sn{
                    font-size: 12px;
                    color: $font-authorcolor;
                    padding-top: 16px;
                }
                .sn.user{
                    cursor: pointer;
                }
                .sn.user:hover{
                    color: $font-hoverauthorcolor;
                }
                .sn.pd2{
                    padding-top: 30px;
                }
                .slh{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
            }
        }
        .highqualityssheet-datalist:nth-child(2n){
            margin-right: 0;
        }
    }
    .loadend{
        font-size: 14px;
        padding: 10px 0 20px;
        text-align: center;
    }
}
</style>