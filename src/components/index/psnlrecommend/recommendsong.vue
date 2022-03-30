<template>
    <div class="wrap-recommendsong">
        <Titlemm :title="'推荐歌单'" :arrow="true"/>
        <div class="recommendsong-section clear" v-if="SongSheetArr.length > 0">
            <div class="songsheet-list fl" v-for="(item,index) in SongSheetArr" :key="index">
                <div class="list-img">
                    <div class="list-playCount">{{(item.playCount/10000).toString().split(".")[0] + "万"}}</div>
                        <img v-lazy="item.picUrl + '?param=200y200'" :key="item.picUrl">
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
            SongSheetArr:[]
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
                display:flex;
                align-items: center;
                justify-content: center;
                position:relative;
                border-radius: 5px;
                overflow: hidden;
                .list-player{
                    width:30px;
                    height:30px;
                    position:absolute;
                    right: 10px;
                    bottom: 10px;
                    background:url("../../../assets/img/player-btn.png") center no-repeat;
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
