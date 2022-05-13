<template>
    <div class="wrap-official">
        <Titlemm :title="'官方榜'" :arrow="false"/>
        <div class="official-section">
            <div class="official-list clear" v-for="(item,index) in dataList" :key="index">
                <div class="official-img fl">
                    <img v-lazy="item.coverImgUrl + '?param=300y300'"/>
                </div>
                <div class="official-playlist fl">
                    <OfficialPlaylist :id="item.id" :OfficialName="item.name"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs,watch } from 'vue'
import LoadingCpn from "@/components/common/loadingcpn.vue"
import Titlemm from "@/components/common/titlemm.vue"
import OfficialPlaylist from "./components/officialplaylist.vue"
export default defineComponent({
    name:'official',
    components:{
        LoadingCpn,
        Titlemm,
        OfficialPlaylist
    },
    props:['officialData'],
    setup (props) {
        let state = reactive({
            dataList:''
        })
        watch(() => props.officialData,(newValue) => {
            state.dataList = newValue
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-official{
    .official-section{
        .official-list{
            padding-bottom: 30px;
            .official-img{
                width:175px;
                height:175px;
                display: flex;
                justify-content:center;
                align-items: center;
                border-radius: 7px;
                overflow: hidden;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .official-playlist{
                width: calc(100% - 175px);
                padding-left: 30px;
                box-sizing: border-box;
            }
        }
    }
}
</style>