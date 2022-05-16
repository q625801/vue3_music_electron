<template>
    <div class="wrap-global">
        <Titlemm :title="'全球榜'" :arrow="false"/>
        <div class="global-section clear">
            <div class="global-list fl" v-for="(item,index) in dataList" :key="index">
                <div class="list-img" @click="goPage(router,'/songsheet',{id:item.id,isRank:true})">
                    <img v-lazy="item.coverImgUrl + '?param=200y200'"/>
                    <div class="list-playbtn"></div>
                </div>
                <span class="list-name" @click="goPage(router,'/songsheet',{id:item.id,isRank:true})">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,watch } from 'vue'
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
import { goPage } from "@/utils/common"
import { useRouter } from 'vue-router'
export default defineComponent({
    name:'global',
    components:{
        LoadingCpn,
        Titlemm
    },
    props:['globalData'],
    setup (props) {
        let state = reactive({
            dataList:''
        })
        watch(() => props.globalData,(newValue) => {
            state.dataList = newValue
        })
        let router = useRouter()
        return {
            ...toRefs(state),
            goPage,
            router
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-global{
    .global-section{
        .global-list{
            width: 18%;
            margin-right: 2.5%;
            margin-bottom: 15px;
            cursor: pointer;
            .list-img{
                width: 100%;
                display: flex;
                justify-content:center;
                align-items: center;
                border-radius: 5px;
                overflow: hidden;
                position: relative;
                img{
                    max-width: 100%;
                }
                .list-playbtn{
                    position: absolute;
                    top: 50px;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: 0 auto;
                    width: 40px;
                    height: 40px;
                    background: url('../../../assets/img/player-daily.png') center no-repeat;
                    background-size: 100%;
                    display: none;
                }
            }
            .list-img:hover{
                .list-playbtn{
                    display: block;
                }
            }
            .list-name{
                display:block;
                font-size: 14px;
                padding-top: 6px;
                line-height: 20px;
            }
            .list-name:hover{
                color: $font-hovercolor;
            }
        }
        .global-list:nth-child(5n){
            margin-right: 0;
        }
    }
}
</style>