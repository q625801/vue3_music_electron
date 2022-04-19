<template>
    <div class="wrap-album">
        <div class="album-list clear">
            <div class="album-img fl">
                <img src="../../assets/img/topfifty.jpg">            
            </div>
            <div class="album-songlist fl">
                <div class="album-name">
                    <span class="nohref">热门50首</span>
                </div>
                <SongList :isHot="true" :hotSongs="hotSongs"/>
            </div>
        </div>
        <div class="album-list album-pd clear" v-for="(item,index) in ArtistAlbumData" :key="index">
            <div class="album-img fl">
                <img :src="item.picUrl">            
            </div>
            <div class="album-songlist fl">
                <div class="album-name">
                    <span class="nohref">{{item.name}}</span>
                </div>
                <!-- <SongList :isHot="true" :hotSongs="hotSongs"/> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted,onUpdated } from 'vue'
import SongList from './components/songlist.vue'
import {postJson} from "@/api/apiConfig";
import { getArtistAlbum } from "@/api/api"
export default defineComponent({
    name:'album',
    components:{
        SongList
    },
    props:[
        'hotSongs',
        'SingerId'
    ],
    setup (props) {
        let state = reactive({
            ArtistAlbumData:[],
            pageArr:{
                offset:0,
                limit:10,
            },
            SingerId:0,
            hotSongs:''
        })
        let getData = (id:number) => {
            postJson(getArtistAlbum,{id:id,...state.pageArr},(res:any) => {
                console.log(res)
                if(res.code == 200){
                    state.ArtistAlbumData = state.ArtistAlbumData.concat(res.hotAlbums)
                }
            },(err:any) => {})
        }
        onMounted(() => {
            
        })
        onUpdated(() => {
            state.hotSongs = props.hotSongs
            if(state.SingerId != props.SingerId){
                state.SingerId = props.SingerId
                getData(state.SingerId)
            }
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-album{
    .album-list{
        .album-img{
            padding-right: 60px;
            border-radius: 5px;
            overflow: hidden;
            img{
                width: 150px;
                height: 150px;
            }
        }
        .album-songlist{
            width: calc(100% - 210px);
            .album-name{
                span{
                    color:$font-color;
                    font-size: 16px;
                    font-weight: bold;
                    line-height: 26px;
                    display: block;
                    cursor: pointer;
                }
                span.nohref{
                    cursor: default;
                }
                span:hover{
                    color:$font-hovercolor;
                }
            }
            
        }
    }
    .album-list.album-pd{
        padding-top: 45px;
    }
}
</style>