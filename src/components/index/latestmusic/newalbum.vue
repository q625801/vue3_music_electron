<template>
    <div class="wrap-newalbum">
        <div class="newalbum-option-btn">
            <div class="option-list">
                <span v-for="(item,index) in optionList" :class="[optionarea == item.data ? 'on' : '']" :key="index" @click="changearea(item.data)">{{item.name}}</span>
            </div>
            <!-- <div class="btn-a clear">
                <span @click="changeType('hot')">推荐</span>
                <span @click="changeType('new')">全部</span>
            </div> -->
        </div>
        <div class="newalbum-section" v-if="albumList.length > 0">
            <div class="newalbum-list clear" v-for="(item,index) in albumList" :key="index">
                <div class="newalbum-left fl">
                    <div :class="['newalbum-fixed',albumOn == index ? 'on' : '']">
                        <div class="weekData" v-if="item.timedate == 'weekData'">
                            <span>本周新碟</span>
                        </div>
                        <div class="beforedate" v-else>
                            <div class="month">
                                {{item.timedate.split('-')[1]}}
                            </div>
                            <div class="year">
                                {{item.timedate.split('-')[0]}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="newalbum-right clear fl">
                    <div class="newalbum-cover fl" v-for="item2 in item.data" :key="item2.id">
                        <div class="newalbum-img" @click="goPage(router,'/album',{id:item2.id})">
                            <img v-lazy="item2.picUrl + '?param=300y300'"/>
                            <div class="newalbum-playbtn amn4"></div>
                        </div>
                        <div class="newalbum-name" @click="goPage(router,'/album',{id:item2.id})">{{item2.name}}</div>
                        <div class="newalbum-artist" @click="goPage(router,'/artist',{id:item2.artist.id})">{{item2.artist.name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <LoadingCpn v-else/>
    </div>
</template>

<script>
import { defineComponent,onMounted,reactive,toRefs,inject,onBeforeUnmount } from 'vue'
import { postJson } from '@/api/apiConfig'
import { gettopalbum } from '@/api/api'
import { addDate2,myDate,goPage } from '@/utils/common'
import { useRouter } from 'vue-router'
import LoadingCpn from "@/components/common/loadingcpn.vue"
export default defineComponent({
    name:'handtailor',
    components:{
        LoadingCpn
    },
    setup () {
        let state = reactive({
            optionList:[
                {
                    name: '全部',
                    data: 'ALL',
                },
                {
                    name: '华语',
                    data: 'ZH',
                },
                {
                    name: '欧美',
                    data: 'EA',
                },
                {
                    name: '日本',
                    data: 'JP',
                },
                {
                    name: '韩国',
                    data: 'KR',
                }
            ],
            optionarea:'ALL',
            albumList:[],
            albumOn:-1,
            today: myDate(),
            timeDown:0,
            loading:false,
            optionType:'new'
        })
        let newalbumLeftData = inject('newalbumLeftData')
        let changearea = (data) => {
            state.optionarea = data
            state.albumList = []
            state.albumOn = -1
            state.timeDown = 0
            getData()
        }
        let changeType = (data) => {
            state.optionType = data
            state.albumList = []
            state.albumOn = -1
            state.timeDown = 0
            getData()
        }
        let getData = () => {
            let year = addDate2(state.today,state.timeDown).split('-')[0]
            let month = addDate2(state.today,state.timeDown).split('-')[1]
            state.loading = true
            postJson(gettopalbum,{year:year,month:month,area:state.optionarea,type:state.optionType},res => {
                state.loading = false
                if(res.code == 200){
                    let weekobj = {},obj = {}
                    if(res.weekData && res.weekData.length > 0){
                        weekobj.timedate = 'weekData',
                        weekobj.data = res.weekData
                        state.albumList.push(weekobj)
                    }
                    if(res.monthData && res.monthData.length > 0){
                        obj.timedate = year + '-' + month,
                        obj.data = res.monthData
                        state.albumList.push(obj)
                    }
                }
            },err => {

            })
        }
        onMounted(() => {
            const el = document.querySelector(".index-screen")
            const offsetHeight = el.offsetHeight
            el.onscroll = () => {
                const albumDatedom = document.getElementsByClassName("newalbum-left")
                Array.prototype.forEach.call(albumDatedom,function(el,index){
                    let domRect = el.getBoundingClientRect()
                    // console.log(dom)
                    if(domRect.top < 200){
                        state.albumOn = index
                        newalbumLeftData.newalbumOn = true
                        if(index == 0){
                            newalbumLeftData.timedate = 'weekData'
                        }else{
                            newalbumLeftData.timedate = el.getElementsByClassName('year')[0].innerHTML + '-' + el.getElementsByClassName('month')[0].innerHTML
                        }
                    }
                    if(domRect.top > 110 && index == 0){
                        state.albumOn = -1
                        newalbumLeftData.newalbumOn = false
                    }
                })
                const scrollTop = el.scrollTop
                const scrollHeight = el.scrollHeight
                if(offsetHeight + scrollTop - scrollHeight >= -10000 && !state.loading){
                    state.timeDown--
                    getData()
                }
            }
        })
        onBeforeUnmount(() => {
            newalbumLeftData.newalbumOn = false
        })
        getData()
        const router = useRouter()
        return {
            ...toRefs(state),
            changearea,
            router,
            goPage,
            changeType
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-newalbum{
    padding-bottom: 20px;
    .newalbum-option-btn{
        padding-top: 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        .option-list{
            span{
                font-size: 13px;
                display: inline-block;
                color: $font-color;
                cursor: pointer;
                margin-right: 24px;
            }
            span.on{
                color: $font-hovercolor;
                font-size: 14px;
            }
            span:hover{
                color: $font-hovercolor;
            }
        }
        .btn-a{
            span{
                font-size: 13px;
                display: inline-block;
                color: $font-authorcolor;
                cursor: pointer;
                margin: 0 20px;
            }
            span:hover{
                color: $font-hovercolor;
            }
            span:last-child{
                margin-right: 0;
                border-width: 0;
            }
        }
    }
    .newalbum-section{
        .newalbum-list{
            .newalbum-left{
                width: 50px;
                box-sizing: border-box;
                font-size: 18px;
                padding: 0 12px 0 2px;
                min-height: 50px;
                .newalbum-fixed{
                    .month{
                        width: 38px;
                        height: 38px;
                        background: url('../../../assets/img/datebg.png') center no-repeat;
                        background-size:100% 100%;
                        text-align: center;
                        line-height: 48px;
                    }
                    .year{
                        font-size: 12px;
                        padding-left: 6px;
                        padding-top: 3px;
                    }
                }
                .newalbum-fixed.on{
                    display:none;
                }
            }
            .newalbum-right{
                width: calc(100% - 50px);
                .newalbum-cover{
                    width: 22.5%;
                    margin-right: 3.3333333%;
                    margin-bottom: 18px;
                    background: url('../../../assets/img/albumbg.png') center top no-repeat;
                    background-size: 100%;
                }
                .newalbum-img{
                    min-width: 135.2px;
                    min-height: 135.2px;
                    max-width: 85%;
                    border-radius: 5px;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    position: relative;
                    .newalbum-playbtn{
                        position: absolute;
                        width: 36px;
                        height: 36px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        background: url('../../../assets/img/player-daily.png') center no-repeat;
                        background-size: cover;
                        opacity:0;
                    }
                }
                .newalbum-img:hover{
                    .newalbum-playbtn{
                        opacity: 1;
                    }
                }
                .newalbum-cover:nth-child(4n){
                    margin-right: 0;
                }
                .newalbum-name{
                    font-size: 14px;
                    margin: 10px 0;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    cursor: pointer;
                }
                .newalbum-name:hover{
                    color: $font-hovercolor;
                }
                .newalbum-artist{
                    font-size: 12px;
                    color:$font-authorcolor;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    cursor: pointer;
                }
                .newalbum-artist:hover{
                    color:$font-hoverauthorcolor;
                }
            }
        }
    }
}
</style>