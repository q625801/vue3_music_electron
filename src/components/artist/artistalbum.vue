<template>
    <div class="wrap-album">
        <div class="album-list clear">
            <div class="album-img-time fl">
                <div class="album-img">
                    <img src="../../assets/img/topfifty.jpg">            
                </div>
            </div>
            <div class="album-songlist fl">
                <div class="album-name">
                    <span class="nohref">热门50首</span>
                </div>
                <SongList :isHot="true" :hotSongs="hotSongs"/>
            </div>
        </div>
        <div class="album-list album-pd clear" v-for="(item,index) in ArtistAlbumData" :key="index">
            <div class="album-img-time fl">
                <div class="album-img albumbg">
                    <img v-lazy="item.picUrl">
                </div>
                <div class="album-publishTime">{{myDate(item.publishTime)}}</div>       
            </div>
            <div class="album-songlist fl">
                <div class="album-name">
                    <span>{{item.name}}</span>
                </div>
                <SongList :AlbumId="item.id"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted,onUpdated,inject,watch,ref,provide } from 'vue'
import SongList from './components/songlist.vue'
import {postJson} from "@/api/apiConfig";
import { getArtistAlbum } from "@/api/api"
import { myDate } from "@/utils/common"
export default defineComponent({
    name:'album',
    components:{
        SongList
    },
    props:[
        'hotSongs',
        'SingerId'
    ],
    setup (props,context) {
        let state = reactive({
            ArtistAlbumData:[],
            pageArr:{
                offset:0,
                limit:5,
            },
            SingerId:0,
            hotSongs:'',
            checkAlbumend:true,
        })
        const artistscrollend = inject('artistscrollend')
        let getData = (id:number,isPrivide:boolean = false) => {
            postJson(getArtistAlbum,{id:id,...state.pageArr},(res:any) => {
                if(res.code == 200){
                    if(res.hotAlbums.length > 0){
                        state.ArtistAlbumData = state.ArtistAlbumData.concat(res.hotAlbums)
                        if(isPrivide){
                            context.emit('getArtistAlbumEnd',true)
                        }
                    }else{
                        state.checkAlbumend = false
                    }
                }
            },(err:any) => {})
        }
        onMounted(() => {
        })
        onUpdated(() => {
            state.hotSongs = props.hotSongs
            if(state.SingerId != props.SingerId){
                state.SingerId = props.SingerId
                state.ArtistAlbumData = []
                state.pageArr = {
                    offset:0,
                    limit:5,
                }
                getData(state.SingerId)
            }
        })
        watch(() => artistscrollend,(newVal:any) => {
            if(newVal.value && state.checkAlbumend){
                state.pageArr.offset += 5
                getData(state.SingerId,true)
            }
        },{deep:true})
        return {
            ...toRefs(state),
            artistscrollend,
            myDate
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-album{
    .album-list{
        .album-img-time{
            .album-img{
                padding-right: 60px;
                width: 150px;
                height: 150px;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    max-width: 100%;
                    max-height: 100%;
                    border-radius: 5px;
                    overflow: hidden;
                }
            }
            .album-img.albumbg{
                background: url('../../assets/img/albumbg.png') left center no-repeat;
                background-size: 177px 150px;
            }
            .album-publishTime{
                color:$albumpublishTime;
                font-size: 12px;
                padding-top: 6px;
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