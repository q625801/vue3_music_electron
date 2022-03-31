<template>
    <div class="wrap-recommendsong">
        <Titlemm :title="'推荐歌单'" :arrow="true" :href="'xxxx'"/>
        <div class="recommendsong-section clear" v-if="SongSheetArr.length > 0">
            <div class="songsheet-list fl" data-daily="loaded">
                <div class="list-img">
                    <img src="../../../assets/img/index-daily.jpg" title="每日推荐">
                    <div class="calendar">
                        <span>{{today}}</span>
                    </div>
                </div>
                <div class="list-title">
                    <span>每日歌曲推荐</span>
                </div>
            </div>
            <div class="songsheet-list fl" v-for="(item,index) in SongSheetArr" :key="index">
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
import {postJson} from "@/api/apiConfig";
import { personalized } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
export default defineComponent({
  	name:'Index',
  	components:{
		LoadingCpn,
        Titlemm
  	},
  	setup(){
        let state = reactive<any>({
            SongSheetArr:[],
            today:31
        })
        onMounted(() => {
           getSongSheet() 
        })

        let getSongSheet = () => {
            postJson(personalized,{limit:9},(res:any) => {
                if(res.code == 200){
                    state.SongSheetArr = res.result
                }
            },(err:any) => {
                
            })
        }
		return{
			...toRefs(state),
		} 
  	}
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-recommendsong{
    .recommendsong-section{
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
                    width:40px;
                    height:40px;
                    position:absolute;
                    right: 5px;
                    bottom: 5px;
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
                color:#d6d6d6;
                font-size: 14px;
                line-height: 18px;
                padding-top: 8px;
                display: -webkit-box;             /*将对象转为弹性盒模型展示*/
                -webkit-box-orient: vertical;     /*设置弹性盒模型子元素的排列方式*/
                -webkit-line-clamp: 2;            /*限制文本行数*/
                overflow: hidden;                 /*超出隐藏*/
            }
            .list-title span:hover{
                color:#ffffff;
            }
        }
    }
}
</style>
<style>
img[v-lazy="loading"]{
                    width: 40px;
                }
                img[v-lazy="loaded"]{
                    width: 100%;
                }
</style>