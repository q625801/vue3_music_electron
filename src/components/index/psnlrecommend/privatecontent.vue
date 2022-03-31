<template>
    <div class="wrap-privatecontent">
        <Titlemm :title="'独家放送'" :arrow="true" :href="'xxx'"/>
        <div class="privatecontent-section" v-if="PrivateContent.length > 0">
            <div class="privatecontent-list" v-for="(item,index) in PrivateContent" :key="index">
                <div class="privatecontent-img">
                    <img v-lazy="item.picUrl + '?param=245y140'"/>
                    <div class="privatecontent-playerbtn"></div>
                </div>
                <div class="privatecontent-title">{{item.name}}</div>
            </div>
        </div>
        <LoadingCpn v-else/>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {postJson} from "@/api/apiConfig";
import { getPrivateContent } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
export default defineComponent({
    name:'loading',
    components:{
        Titlemm,
        LoadingCpn
    },
    setup(){
        let state = reactive<any>({
            PrivateContent:[],
        })
        onMounted(() => {
           getData() 
        })
        function getData(){
            postJson(getPrivateContent,{},(res:any) =>{
                if(res.code == 200){
                    state.PrivateContent = res.result
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
<style scoped lang="scss">
.privatecontent-section{
    display: flex;
    justify-content: space-between;
    .privatecontent-list{
        width: 31.5%;
        .privatecontent-img{
            height:140px;
            border-radius: 6px;
            overflow: hidden;
            display:flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;
            .privatecontent-playerbtn{
                position:absolute;
                top: 5px;
                left: 5px;
                width: 30px;
                height: 30px;
                background: url("../../../assets/img/player-btn.png") center no-repeat;
                background-size:30px;
            }
        }
        .privatecontent-title{
            padding-top: 6px;
            color: #d6d6d6;
            font-size: 14px;
            line-height: 20px;
            text-align: justify;
            cursor: pointer;
        }
        .privatecontent-title:hover{
            color: #ffffff;
        }
    }
}
</style>