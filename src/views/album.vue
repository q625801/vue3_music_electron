<template>
    <div class="wrap-albumsongsheet">
        <AlbumSongsheetInfo :detailinfo="detailinfo"/>
        <MusicPlayList :stdetaildata="detailinfo" :stSongAll="songlistAll"/>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue'
import {postJson} from "@/api/apiConfig"
import { sddetail,sdsongAll } from "@/api/api"
import AlbumSongsheetInfo from '@/components/common/album_songsheet_info.vue'
import MusicPlayList from "@/components/common/musicplaylist.vue"
import {useRouter} from 'vue-router'
export default defineComponent({
    name:'album',
    components:{
        AlbumSongsheetInfo,
        MusicPlayList
    },
    setup() {
        let router = useRouter()
        let state = reactive({
            id: router.currentRoute.value.query.id,
            detailinfo:'',
            songlistAll:''
        })
        let getAblbum = () => {
            return new Promise((reslove,reject) => {
                postJson(sddetail,{id:state.id},(res:any) => {
                    reslove(res)
                },(err:object) => {
                    reject(err)
                })
            })
        }
        let getPlayListTrackAll = () => {
            return new Promise((reslove,reject) => {
                postJson(sdsongAll,{id:state.id},(res:any) => {
                    reslove(res)
                },(err:any) => {
                    reject(err)
                })
            })
        }
        onMounted(() => {
            Promise.all([getAblbum(),getPlayListTrackAll()]).then((res:any) => {
                if(res[0].code == 200){
                    state.detailinfo = res[0].playlist;
                }
                if(res[1].code == 200){
                    state.songlistAll = res[1].songs
                }
            })
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-albumsongsheet{
    padding: 30px 0 0 0;
    overflow-y: scroll;
    height: 538px;
    box-sizing: border-box;
}
</style>