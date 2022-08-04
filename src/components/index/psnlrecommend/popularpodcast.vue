<template>
    <div class="wrap-popularpodcat">
        <Titlemm :title="'热门播客'" :arrow="true" :href="'xxx'"/>
        <div class="popularpodcat-section" v-if="popularpodcat.length > 0">
            <div class="popularpodcat-list clear" v-for="(item,index) in popularpodcat" :key="index">
                <div class="popularpodcat-left fl">
                    <div class="popularpodcat-img">
                        <img v-lazy="item.picUrl + '?param=150y150'"/>
                    </div>
                    <div class="popularpodcat-playerbtn"></div>
                </div>
                <div class="popularpodcat-right clear fl">
                    <div class="popularpodcat-title">{{item.name}}</div>
                    <div class="popularpodcat-category"><span>{{item.program.radio.category}}</span></div>
                    <div class="popularpodcat-dj clear">
                        <span class="popularpodcat-brand fl">{{item.program.radio.name}}</span>
                        <span class="popularpodcat-playcount fl">{{item.program.adjustedPlayCount > 100000000 ? (item.program.adjustedPlayCount/100000000).toString().split(".")[0] + "亿" : item.program.adjustedPlayCount > 10000 ? (item.program.adjustedPlayCount/10000).toString().split(".")[0] + "万" : item.program.adjustedPlayCount}}</span>
                        <span class="popularpodcat-duration fl">{{getplaytime(item.program.duration)}}</span>
                    </div>
                </div>
            </div>
        </div>
        <LoadingCpn v-else/>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {getJson} from "@/api/apiConfig";
import { getPopularPodcast } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
import {playtime} from "@/utils/common"
export default defineComponent({
    name:'popularpodcast',
    components:{
        Titlemm,
        LoadingCpn
    },
    setup(){
        let state = reactive<any>({
            popularpodcat:[],
        })
        onMounted(() => {
           getData() 
        })
        function getData(){
            getJson(getPopularPodcast,{},(res:any) =>{
                if(res.code == 200){
                    state.popularpodcat = res.result
                }
            },(err:any) => {

            })
        }
        let getplaytime = playtime
        return{
			...toRefs(state),
            getplaytime
		} 
    }
})
</script>
<style scoped lang="scss">
.popularpodcat-section{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    .popularpodcat-list:hover{
        background:$hvoerbodybg
    }
    .popularpodcat-list{
        width:49%;
        height:80px;
        border-radius: 3px;
        margin-bottom: 16px;
        .popularpodcat-left{
            position: relative;
            cursor: pointer;
            .popularpodcat-img{
                width: 80px;
                height: 80px;
                border-radius: 3px;
                overflow: hidden;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .popularpodcat-playerbtn{
                width: 28px;
                height: 28px;
                background:url("../../../assets/img/player-daily.png") center no-repeat;
                background-size: 28px;
                position: absolute;
                right: 6px;
                bottom: 6px;
            }
        }
        .popularpodcat-right{
            padding: 10px;
            width: calc(100% - 80px);
            height: 100%;
            box-sizing: border-box;
            .popularpodcat-title{
                color: $font-color;
                font-size: 14px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
            .popularpodcat-category{
                padding: 8px 0 6px 0;
                span{
                    display: inline-block;
                    padding: 2px;
                    font-size: 12px;
                    color: rgb(127, 127, 127);
                    border: 1px solid rgb(67, 67, 67);
                }
            }
            .popularpodcat-dj{
                span{
                    font-size: 12px;
                    color: $font-authorcolor;
                    display: block;
                    line-height: 16px;
                }
                .popularpodcat-brand:hover{
                    color: $font-hoverauthorcolor;
                }
                .popularpodcat-brand{
                    cursor: pointer;
                    max-width: 120px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
                .popularpodcat-playcount{
                    background: url("../../../assets/img/player-btn2.png") center left no-repeat;
                    background-size: 14px;
                    padding-left: 16px;
                    margin-left: 8px;
                }
                .popularpodcat-duration{
                    background: url("../../../assets/img/duration.png") center left no-repeat;
                    background-size: 14px;
                    padding-left: 18px;
                    margin-left:10px;
                }
            }
        }
    }
}
</style>