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
        <MusicPlayList :stdetaildata="detailinfo" :stSongAll="songlistAll"/>
        <div class="loading" v-if="loading">
            <LoadingCpn/>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {getJson} from "@/api/apiConfig"
import { sddetail,sdsongAll } from "@/api/api"
import { myDate } from "@/utils/common"
import MusicPlayList from "@/components/common/musicplaylist.vue"
import LoadingCpn from "@/components/common/loadingcpn.vue"
interface state{
    today:string;
    detailinfo:object;
    songlistAll:Array<object>;
    loading:boolean;
}
export default defineComponent({
    name:'everydaysongrmd',
    components:{
        MusicPlayList,
        LoadingCpn
    },
    setup(){
        let state:state = reactive({
            today:'',
            detailinfo:{
            },
            songlistAll:[],
            loading:false,
        })
        let getAblbum = () => {
            return new Promise((reslove,reject) => {
                getJson(sddetail,{id:3136952023},(res:any) => {
                    reslove(res)
                },(err:object) => {
                    reject(err)
                })
            })
        }
        let getPlayListTrackAll = () => {
            return new Promise((reslove,reject) => {
                getJson(sdsongAll,{id:3136952023},(res:any) => {
                    reslove(res)
                },(err:any) => {
                    reject(err)
                })
            })
        }
        onMounted(() => {
            state.loading = true
            Promise.all([getAblbum(),getPlayListTrackAll()]).then((res:any) => {
                state.loading = false
                if(res[0].code == 200){
                    state.detailinfo = res[0].playlist;
                }
                if(res[1].code == 200){
                    state.songlistAll = res[1].songs
                }
            })
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
    .loading{
        padding-top: 15px;
    }
}
</style>