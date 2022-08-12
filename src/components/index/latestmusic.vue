<template>
    <div class="wrap-latestmusic">
        <div class="latestmusic-tabs clear">
            <div :class="['tabs-o tabs-newsong fl',tabsOn == 'newsong' ? 'on' : '']" @click="changeTabs('newsong')">
                新歌速递
            </div>
            <div :class="['tabs-o fl',tabsOn == 'newalbum' ? 'on' : '']" @click="changeTabs('newalbum')">
                新碟上架
            </div>
            <div :class="['tabs-bg amn2',tabsOn == 'newalbum' ? 'right' : '']"></div>
        </div>
        <NewSong v-if="tabsOn == 'newsong'"/>
        <NewAlbum v-if="tabsOn == 'newalbum'"/>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs } from 'vue'
import NewSong from './latestmusic/newsong'
import NewAlbum from './latestmusic/newalbum'
export default defineComponent({
    name:'latestmusic',
    components:{
        NewSong,
        NewAlbum
    },
    setup () {
        let state = reactive({
            tabsOn:'newsong'
        })
        let changeTabs = (data) => {
            state.tabsOn = data
        }
        return {
            ...toRefs(state),
            changeTabs
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-latestmusic{
    padding: 10px 0;
    .latestmusic-tabs{
        width: 233px;
        height: 32px;
        line-height: 32px;
        border: 1px solid $latestmusictabbg;
        box-sizing: border-box;
        border-radius: 25px;
        position: relative;
        margin: 0 auto;
        .tabs-o{
            width: 50%;
            text-align: center;
            font-size: 12px;
            position: relative;
            z-index: 99;
            cursor: pointer;
            border-radius: 25px 0 0 25px;
        }
        .tabs-o.tabs-newsong{
            border-radius: 0 25px 25px 0;
        }
        .tabs-o:hover{
            background:$checkhvoerbg;
        }
        .tabs-o.on:hover{
            background:transparent;
        }
        .tabs-o.on{
            color: $font-hovercolor;
        }
        .tabs-bg{
            position: absolute;
            width: 50%;
            height: 32px;
            left: -1px;
            top: 0;
            background:$latestmusictabbg;
            border-radius: 25px;
        }
        .tabs-bg.right{
            left: 50.5%;
        }
    }
}
</style>