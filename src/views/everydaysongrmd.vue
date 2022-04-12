<template>
    <div class="wrap-everydaysongrmd">
        <div class="everydaysongrmd-top clear">
            <div class="top-daily fl">
                <span>{{Number(today.split('-')[2])}}</span>
            </div>
            <div class="top-title fl">
                <span>每日歌曲推荐</span>
                <p>根据你的音乐口味生成，每天6点更新</p>
            </div>
        </div>
        <MusicPlayList :stdetaildata="detailinfo"/>
    </div>
</template>
<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {postJson} from "@/api/apiConfig"
import { sddetail } from "@/api/api"
import { myDate } from "@/utils/common"
import MusicPlayList from "@/components/common/musicplaylist.vue"
interface state{
    today:string;
    detailinfo:object;
}
export default defineComponent({
    name:'loading',
    components:{
        MusicPlayList
    },
    setup(){
        let state:state = reactive({
            today:'',
            detailinfo:{
            },
        })
        let getAblbum = () => {
            postJson(sddetail,{id:3136952023},(res:any) => {
                if(res.code == 200){
                    state.detailinfo = res.playlist;
                }
            },(err:object) => {

            })
        }
        onMounted(() => {
            getAblbum()
            state.today = myDate()
        })
        return{
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-everydaysongrmd{
    height: 100%;
    overflow-y: scroll;
    .everydaysongrmd-top{
        padding: 26px 30px;
        .top-daily{
            width: 80px;
            height: 80px;
            background: url("../assets/img/calendar-2.png") center no-repeat;
            background-size: 100% 100%;
            span{
                display:block;
                text-align: center;
                font-size: 38px;
                color: #ec4141;
                font-weight: bold;
                padding-top: 32px;
            }
        }
        .top-title{
            padding-top: 22px;
            padding-left: 30px;
            span{
                display: block;
                color: $font-color;
                font-weight: bold;
                font-size: 22px;
            }
            p{
                font-size: 12px;
                color: $font-authorcolor;
                padding-top: 8px;
            }
        }
    }
}
</style>