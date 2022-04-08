<template>
    <div class="wrap-playlist amn6 sdwa" :class="{'show':playlistFlag}">
        <div class="playlist-bt">
            播放列表({{SomgList.length}})
        </div>
        <div class="playlist-listbdc">
            <div class="listbdc clear" v-for="(item,index) in SomgList" :key="index" @click="changeAudioInfo(item)" :class="[item.SongId == $store.state.audioInfo.SongInfo.SongId ? ($store.state.audioInfo.audioPlayBtn ? 'on' : 'off') : '']">
                <div class="fl name">
                    {{item.SongName}}
                </div>
                <div class="fl artists">
                    <!-- {{item.SongArtists}} -->
                    <span v-for="(item2,index2) in item.SongArtists" :key="index2" v-html="((index2 != 0) ? ' / ' : '') + '<em>'+item2.name+'</em>'"></span>
                </div>
                <div class="fl time">
                    {{item.SongTime}}
                </div>
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
    box-sizing: border-box;
    padding: 20px;
    position: absolute;
    bottom: 72px;
    right: 0;
    background: #363636;
    z-index: 99;
    overflow: hidden;
    transform: translateX(500px);
    opacity:0;
}
.wrap-playlist.show{
    transform: translateX(0px);
    opacity:1;
}
.playlist-bt{
    font-size: 16px;
    color: #d6d6d6;
    font-weight: 700;
    text-align: left;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid rgb(67, 67, 67);
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
.playlist-listbdc .listbdc div{
    font-size: 14px;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color:#7f7f7f;
}
.playlist-listbdc .listbdc div.name{
    width: 50%;
    text-align: left;
    box-sizing: border-box;
    color:#d6d6d6;
}
.playlist-listbdc .listbdc.on div.name{
    padding-left: 16px;
    background: url(../../assets/img/player-stop2.png) left center no-repeat;
    background-size: 12px;
}
.playlist-listbdc .listbdc.off div.name{
    padding-left: 16px;
    background: url(../../assets/img/player-btn4.png) left center no-repeat;
    background-size: 10px;
}
.playlist-listbdc .listbdc div.artists{
    width: 40%;
}
.playlist-listbdc .listbdc div.time{
    width: 10%;
}
.playlist-listbdc .listbdc:nth-child(2n){
    background-color: rgba(57,57,57,1);
}
.playlist-listbdc .listbdc:hover{
    background: rgb(61,61,61);
}
.playlist-listbdc .listbdc:hover div{
    color:#ffffff;
}
.playlist-listbdc .listbdc.on div.name,.playlist-listbdc .listbdc.off div.name,.playlist-listbdc .listbdc.on div.artists,.playlist-listbdc .listbdc.off div.artists{
    color:#EC4141;
}
</style>