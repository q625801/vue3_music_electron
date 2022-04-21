<template>
    <div class="wrap-artistdesc">
        <div class="artistdesc-list">
            <div class="artistdesc-title">{{SingerName + '简介'}}</div>
            <div class="artistdesc-content">
                {{descData.briefDesc}}
            </div>
        </div>
        <div class="artistdesc-list pdt" v-for="(item,index) in descData.introduction" :key="index">
            <div class="artistdesc-title">{{item.ti}}</div>
            <div class="artistdesc-content">
                {{item.txt}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs,watch } from 'vue'
import {postJson} from "@/api/apiConfig";
import { getartistsdesc } from "@/api/api"
export default defineComponent({
    name:'artistdesc',
    props:[
        'SingerId',
        'SingerName'
    ],
    setup (props) {
        let state = reactive({
            descData:'',
            SingerName:''
        })
        onMounted(() => {
            getData()
        })
        watch(() => props.SingerName,(newValue) => {
            state.SingerName = newValue
        })
        watch(() => props.SingerId,(newValue) => {
            getData()
        })
        let getData = () => {
            postJson(getartistsdesc,{id:props.SingerId},(res:any) => {
                if(res.code == 200){
                    state.descData = res
                }
            },(err:any) => {

            })
        }
        return {
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-artistdesc{
    .artistdesc-list{
        .artistdesc-title{
            color:$font-color;
            font-size: 15px;
            font-weight: bold;
            padding-bottom: 8px;
        }
        .artistdesc-content{
            font-size: 14px;
            color:$font-authorcolor;
            line-height: 28px;
            text-align: justify;
            white-space: pre-wrap;
            
        }
    }
    .artistdesc-list.pdt{
        padding-top: 30px;
    }
}
</style>