<template>
    <div class="wrap-search">
        <Titlemm :title="'搜索 ' + keywords" :arrow="false"/>
        <SearchYWant :keywords="keywords"/>
        <div class="search-tabs">
            <div class="tabs-section clear">
                <span :class="['fl',item.type == tabsOn ? 'on' : '']" v-for="item in tabsList" :key="item.type" @click="changeTabs(item.type)">{{item.name}}</span>
            </div>  
        </div>
        <div class="search-content">
            <SearchMusicPlaylist :keywords="keywords" v-if="tabsOn == 1"/>
            <SearchArtist :keywords="keywords" v-if="tabsOn == 100"/>
            <SearchAlbum :keywords="keywords" v-if="tabsOn == 10"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,watch } from 'vue'
import Titlemm from "@/components/common/titlemm.vue"
import { useRouter } from 'vue-router'
import SearchYWant from "@/components/search/searchywant.vue"
import SearchMusicPlaylist from "@/components/search/searchmusicplaylist.vue"
import SearchArtist from "@/components/search/searchartist.vue"
import SearchAlbum from "@/components/search/searchalbum.vue"
export default defineComponent({
    name:'search',
    components:{
        Titlemm,
        SearchYWant,
        SearchMusicPlaylist,
        SearchArtist,
        SearchAlbum
    },
    setup () {
        const router = useRouter()
        let state = reactive({
            keywords: router.currentRoute.value.query.keywords,
            type: router.currentRoute.value.query.type,
            tabsList:[
                {
                    name:'单曲',
                    type:'1'
                },
                {
                    name:'歌手',
                    type:'100'
                },
                {
                    name:'专辑',
                    type:'10'
                },
                {
                    name:'视频',
                    type:'1014'
                },
                {
                    name:'歌单',
                    type:'1000'
                },
                {
                    name:'歌词',
                    type:'1006'
                },
                {
                    name:'播客',
                    type:'1009'
                },
                {
                    name:'声音',
                    type:'2000'
                },
                {
                    name:'用户',
                    type:'1002'
                }
            ],
            tabsOn:1
        })
        let changeTabs = (type:number) => {
            state.tabsOn = type
        }
        watch(() => router.currentRoute.value.query,(newValue) => {
            state.keywords = newValue.keywords
            state.type = newValue.type
        })
        return {
            ...toRefs(state),
            changeTabs
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-search{
    padding: 15px 30px 0;
    overflow-y: scroll;
    height: 538px;
    box-sizing: border-box;
    .search-tabs{
        padding-top: 20px;
        .tabs-section{
            span{
                display: block;
                color: $font-color;
                margin-right: 30px;
                cursor: pointer;
                line-height: 30px;
                font-size: 15px;
            }
            span.on{
                font-weight: bold;
                color: $font-color;
                background: url("../assets/img/index_line.jpg") bottom center no-repeat;
                background-size: 75% 3px;
            }
            span:hover{
                color: $font-hovercolor;
            }
        }
    }
}
</style>