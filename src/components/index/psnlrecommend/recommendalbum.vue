<template>
    <div class="wrap-recommendalbum">
        <Titlemm :title="'推荐歌单'" :arrow="true" :href="'xxxx'"/>
        <div class="recommendalbum-section clear" v-if="SongSheetArr.length > 0">
            <div class="songsheet-list songsheet-daily fl" @mouseenter="enter()" @mouseleave="leave" @click="goeverysongrmd">
                <div :class="[dailytips ? 'show' : '','daily-tips','amn2']">根据您的音乐口味生成每日更新</div>
                <div class="list-img">
                    <img src="../../../assets/img/index-daily.jpg" title="每日推荐" alt="每日推荐">
                    <div class="calendar">
                        <span>{{Number(today.split('-')[2])}}</span>
                    </div>
                    <div class="list-player amn4"></div>
                </div>
                <div class="list-title">
                    <span>每日歌曲推荐</span>
                </div>
            </div>
            <div class="songsheet-list fl" v-for="(item,index) in SongSheetArr" :key="index" @click="goPage(router,'/albumssheet',{id:item.id})">
                <div class="list-img">
                    <div class="list-playCount">{{(item.playCount/10000).toString().split(".")[0] + "万"}}</div>
                    <img v-lazy="item.picUrl + '?param=150y150'" :key="item.picUrl">
                    <!-- <img v-lazy="'../../../assets/img/loading.gif'" :key="item.picUrl"> -->
                    <div class="list-player amn4"></div>
                </div>
                <div class="list-title">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>
        <LoadingCpn v-else/>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import { useRouter } from 'vue-router'
import {postJson} from "@/api/apiConfig";
import { personalized } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
import {myDate,goPage} from "@/utils/common"
interface state{
  SongSheetArr:[];
  today:string;
  dailytips:boolean;
}
export default defineComponent({
  	name:'Index',
  	components:{
		LoadingCpn,
        Titlemm
  	},
  	setup(){
        let state:state = reactive({
            SongSheetArr:[],
            today:'',
            dailytips:false,
        })
        onMounted(() => {
           getSongSheet() 
           state.today = myDate()
        })
        let timer:any = ''
        const debounce = (func:Function, delay = 300, thisArg?:any) => {
            return (...args:any) => {
                clearTimeout(timer)
                timer = setTimeout(func.bind(thisArg), delay, ...args)
            }
        }
        let leave = () => {
            if(timer){
                clearTimeout(timer)
            }
            state.dailytips = false
        }
        let enter = debounce(function(){
            state.dailytips = true
        },700)
        let getSongSheet = () => {
            postJson(personalized,{limit:9},(res:any) => {
                if(res.code == 200){
                    state.SongSheetArr = res.result
                }
            },(err:any) => {
                
            })
        }
        let router = useRouter();
        let goeverysongrmd = () => {
            router.push({
                path: '/everydaysongrmd'
            })
        }
		return{
			...toRefs(state),
            enter,
            leave,
            goeverysongrmd,
            goPage,
            router
		} 
  	}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-recommendalbum{
    .recommendalbum-section{
        .songsheet-list:nth-child(5n){
            margin-right: 0;
        }
        .songsheet-list{
            width:18%;
            margin-bottom:20px;
            overflow:hidden;
            cursor:pointer;
            margin-right:2.5%;
            .list-img{
                width:100%;
                height: 138px;
                display:flex;
                align-items: center;
                justify-content: center;
                position:relative;
                border-radius: 5px;
                overflow: hidden;
                .list-player{
                    width:28px;
                    height:28px;
                    position:absolute;
                    right: 10px;
                    bottom: 10px;
                    background:url("../../../assets/img/player-daily.png") center no-repeat;
                    background-size:cover;
                    opacity:0;
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
                
                .calendar{
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    display: block;
                    width: 70px;
                    height: 70px;
                    background: url('../../../assets/img/calendar-1.png') center no-repeat;
                    background-size: 100%;
                    span{
                        display: block;
                        font-weight: bold;
                        padding-top: 30px;
                        text-align: center;
                        font-size: 28px;
                        color: white;
                    }
                }
            }
            .list-img:hover .list-player{
                opacity:1;
            }
            .list-title span{
                display: block;
                text-align: left;
                color:$font-color;
                font-size: 14px;
                line-height: 18px;
                padding-top: 8px;
                display: -webkit-box;             /*将对象转为弹性盒模型展示*/
                -webkit-box-orient: vertical;     /*设置弹性盒模型子元素的排列方式*/
                -webkit-line-clamp: 2;            /*限制文本行数*/
                overflow: hidden;                 /*超出隐藏*/
            }
            .list-title span:hover{
                color:$font-hovercolor;
            }
        }
        .songsheet-daily{
            position: relative;
            .daily-tips{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 99;
                background: rgba(0,0,0,0.5);
                color: #ffffff;
                font-size: 12px;
                padding: 8px;
                line-height: 20px;
                box-sizing: border-box;
                transform: translateY(-60px);
            }
            .daily-tips.show{
                transform: translateY(0px);
            }
        }
    }
}
</style>