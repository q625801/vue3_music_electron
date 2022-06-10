<template>
    <div class="wrap-artistssimi">
        <div class="artistssimi-list" v-for="(item,index) in simiData" :key="index">
            <div class="artistssimi-img" @click.stop="goPage(router,'/artist',{id:item.id})">
                <img v-lazy="item.picUrl + '?param=200y200'"/>
            </div>
            <span class="artistssimi-name" @click.stop="goPage(router,'/artist',{id:item.id})">{{item.name}}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs,watch } from 'vue'
import {postJson} from "@/api/apiConfig";
import { getartistssimi } from "@/api/api"
import {goPage} from "@/utils/common"
import {useRouter} from "vue-router"
export default defineComponent({
    name:'handtailor',
    props: [
        'SingerId',
    ],
    setup (props) {
        let state = reactive({
            simiData: [],
        })
        onMounted(() => {
            getData()
        })
        watch(() => props.SingerId,(newValue) => {
            state.simiData = []
            getData()
        })
        let getData = () => {
            postJson(getartistssimi,{id:props.SingerId},(res:any) => {
                if(res.code == 200){
                    state.simiData = res.artists
                }
            },(err:any) => {

            })
        }
        let router = useRouter()
        return {
            ...toRefs(state),
            router,
            goPage
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-artistssimi{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .artistssimi-list{
        width: 18%;
        margin-bottom: 28px;
        .artistssimi-img{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius:5px;
            overflow: hidden;
            cursor: pointer;
        }
        .artistssimi-name{
            color: $font-color;
            font-size: 14px;
            padding-top: 7px;
            display:block;
            cursor: pointer;
            line-height: 18px;
        }
        .artistssimi-name:hover{
            color: $font-hovercolor;
        }
    }
}
</style>