<template>
    <div class="wrap-playlist amn6 sdwa" :class="{'show':playlistFlag}">
        <div class="playlist-bt">
            播放列表({{SomgList.length}})
        </div>
        <div class="playlist-listbdc">
            <div class="listbdc clear" v-for="(item,index) in SomgList" :key="index" @click="changeAudioInfo(item)">
                <span class="fl name" :class="[item.SongId == $store.state.audioInfo.SongInfo.SongId ? ($store.state.audioInfo.audioPlayBtn ? 'on' : 'off') : '']">
                    {{item.SongName}}
                </span>
                <span class="fl artists">
                    {{item.SongArtists}}
                </span>
                <span class="fl time">
                    {{item.SongTime}}
                </span>
            </div>
        </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:'playlist',
    data(){
        return {
            SomgList:'',
            playlistFlag:false,
        }
    },
    mounted(){

    },
    methods:{
        changeAudioInfo(item){
            if(this.$store.state.audioInfo.SongInfo.SongId != item.SongId){
                this.$store.commit('setSongInfo',item)
            }else{
                if(this.$store.state.audioInfo.audioPlayBtn){
                    this.$store.commit('setAudioPlayBtn',false)
                }else{
                    this.$store.commit('setAudioPlayBtn',true)
                }
            }
        }
    },
    computed:{
        ...mapGetters(['getSongList'])
    },
    watch:{
        getSongList:{
            handler(newVal, oldVal) {
                this.SomgList = newVal
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style scoped>
.wrap-playlist{
    width: 500px;
    height: 400px;
    box-sizing: border-box;
    padding: 20px;
    position: fixed;
    bottom: 69px;
    right: 0;
    background: #ffffff;
    z-index: 99;
    transform: translateX(500px);
    opacity:0;
}
.wrap-playlist.show{
    transform: translateX(0px);
    opacity:1;
}
.playlist-bt{
    font-size: 16px;
    color: #4a4a4a;
    font-weight: 700;
    text-align: left;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #DCDCDC;
    padding-bottom: 18px;
}
.playlist-listbdc{
    height: 327px;
    box-sizing: border-box;
    overflow-y: scroll;
}
.playlist-listbdc .listbdc{
    padding: 0 10px;
    line-height: 40px;
    cursor: pointer;
}
.playlist-listbdc .listbdc span{
    font-size: 14px;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.playlist-listbdc .listbdc span.name{
    width: 60%;
    text-align: left;
    box-sizing: border-box;
}
.playlist-listbdc .listbdc span.name.on{
    padding-left: 25px;
    background: url(../../assets/img/player-stop.png) left center no-repeat;
    background-size: 20px;
}
.playlist-listbdc .listbdc span.name.off{
    padding-left: 25px;
    background: url(../../assets/img/player-btn3.png) left center no-repeat;
    background-size: 20px;
}
.playlist-listbdc .listbdc span.artists{
    width: 20%;
}
.playlist-listbdc .listbdc span.time{
    width: 20%;
}
.playlist-listbdc .listbdc:nth-child(2n){
    background-color: #f7f7f7;
}
.playlist-listbdc .listbdc:hover{
    background: #e8e9ed;
}
</style>