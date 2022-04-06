<template>
  <div class="wrap audio-wrap sdwa" v-show="$store.state.audioInfo.audioFlag">
    <div class="player-bar">
      <div class="avatar">
        <img alt="nicemusic" :src="SongPic + '?param=100y100'" :title="SongName">
      </div>
      <div class="info">
        <h2 class="ellipsis">{{SongName}}</h2>
        <p class="ellipsis">{{SongArtists}}</p>
      </div>
      <div class="player-btn clear">
        <span class="player-prev fl" @click="prevSong"></span>
        <span @click="audioplay" class="fl" :class="audiostate ? 'player-play' : 'player-stop'"></span>
        <span class="player-next fl" @click="nextSong"></span>
      </div>
      <div id="progress-wrap" class="progress-wrap">
        <p class="current-time">{{playTime}}</p>
        <div class="progress-bar-wrap">
          <div class="progress-bar" ref="barBg" @mousedown="clickBg" @touchstart="clickBg">
          <!--
        @touchmove.prevent="move"
        
        @touchend="end"-->
            <div class="bar-inner">
              <div class="progress" :style="{width:progressWidth+'%'}"></div>
              <div class="progress-btn" @mousedown.stop="yuanmousedown" ref="barBgyuan" :style="{left:progressWidth+'%'}"></div>
            </div>
          </div>
        </div>
          <p class="duration-time"> {{audioduration ? ((parseInt(audioduration / 60, 10) <= 9 ? '0' + parseInt(audioduration / 60, 10) : parseInt(audioduration / 60, 10)) + ':' + (parseInt(audioduration % 60) <= 9 ? '0' + parseInt(audioduration % 60) : parseInt(audioduration % 60))) : ''}} </p>
      </div>
      <div class="volume-wrap">
        <div class="volume-yl" :class="{'off':VolumeSize == 0 ? true : false}" :title="volumeTitle" @click="volumeClick"></div>
        <el-slider class="volume-slider" :show-tooltip="false" @input="changeVolume" v-model="VolumeSize"></el-slider>
      </div>
      <div class="bfqbox-wrap clear">
        <span class="bflx fl" :class="[comPlayMode]" @click="changePlayMode"></span>
        <span class="fl text" @click="$refs.lyric.lyricFlag = !$refs.lyric.lyricFlag;$refs.playlist.playlistFlag = false">词</span>
        <span class="fl list" @click="$refs.playlist.playlistFlag = !$refs.playlist.playlistFlag;$refs.lyric.lyricFlag = false"></span>
      </div>
    </div>
    <audio ref="audio">您的浏览器不支持 audio 标签。</audio>
    <playlist ref="playlist"></playlist>
    <lyric ref="lyric"></lyric>
  </div>
</template>

<script>
import {mp3url,songlyric} from "@/api/api"
import {IsPC,Shuffle} from "@/utils/common"
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import {postJson} from "@/api/apiConfig";
import playlist from "./Audio/playlist"
import lyric from "./Audio/lyric"
export default {
  name: 'audioN',
  data(){
    return {
      VolumeSize:100,
      audiostate:true,
      audioduration:'',
      playTime:'00:00',
      progressWidth:'',
      touch:{},
      checkplayfirst:true,
      is_yuanmousedown:false,
      volumeTitle:'静音',
      audioPlayMode:'loop',
      shuffleSongList:[],

      SongId:'',
      SongName:'',
      SongPic:'',
      SongArtists:'',
    }
  },
  components:{
    playlist,
    lyric
  },
  mounted(){
    this.audioTimeUpdate();//添加监听事件
    // this.getmusicurl(33911781);
  },
  methods:{
    init(){
      //重置音频属性
      this.audiostate = true
      this.audioduration = ''
      this.playTime = '00:00'
      this.progressWidth = ''
      this.touch = {}
      this.checkplayfirst = true
      this.is_yuanmousedown = false
    },
    getmusicurl(id){
      postJson(mp3url,{id:id},(res) => {
        console.log(res)
        if(res.data[0].url != null){
          this.$refs.audio.src = res.data[0].url;
        }else{
          this.$message({message:'获取音源失败，自动跳转下一首！',customClass:'zZindex'});
          if(this.$store.getters.getSongList.length == 1){
            this.$store.commit('setSongInfoInit')
            this.$store.commit('setAudioFlag',false)
            return
          }
          this.nextSong()
        }
        
        
      },(err) => {

      },false)
    },
    getlyric(id){
      postJson(songlyric,{id:id},(res) => {
        this.$refs.lyric.init(res.data.lrc.lyric,res.data.lrc.version)
      },(err) => {

      },false)
    },
    audioTimeUpdate () {
      let that = this;
      let audio = this.$refs.audio;
      audio.autoplay = true;
      audio.addEventListener('timeupdate',function(){
        that.setTime()
        that.setLyric()
      });//监听播放时间
      audio.addEventListener("playing", function(){//监听播放
        that.audiostate = false;
      });
      audio.addEventListener("pause", function(){//监听暂停
        that.audiostate = true;
      });
      audio.addEventListener("ended", function(){//监听音频播放完毕
        that.$refs.lyric.lineNo = 0
        if(that.audioPlayMode == 'loopone'){
          audio.play()
        }else{
          that.$store.commit('setAudioPlayBtn',false)
          that.nextSong()
        }
      });
      audio.addEventListener("canplay", function(){//监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
        that.audioduration = that.$refs.audio.duration;
        if(that.checkplayfirst){
          that.checkplayfirst = false;
          that.$store.commit('setAudioPlayBtn',true)
        }
      });
    },
    setTime(){
      const audio = this.$refs.audio
      let minutes,seconds
      if(audio.currentTime){
        minutes = Math.floor(audio.currentTime / 60)
        seconds = Math.floor(audio.currentTime - minutes * 60)
      }
      let minuteValue
      let secondValue
      // 进行格式转换，当分钟小于10的时候，在前面加0
      if (minutes < 10) {
        minuteValue = '0' + minutes
      } else {
        minuteValue = minutes
      }
      // 秒数的格式设置
      if (seconds < 10) {
        secondValue = '0' + seconds
      } else {
        secondValue = seconds
      }
      // 进行时间值拼接，展示到页面
      if(!minuteValue){
        minuteValue = "00"
      }
      if(!secondValue){
        secondValue = "00"
      }
      let audioTime = minuteValue + ':' + secondValue
      this.playTime = audioTime
      // // 进度条的长度计算
      let barLength = audio.currentTime / audio.duration * 100;
      if(!this.is_yuanmousedown){
        this.setProgress(barLength)
      }
    },
    audioplay(){
      let audio = this.$refs.audio;
      if (audio.paused) {
        this.$store.commit('setAudioPlayBtn',true)
      } else {
        this.$store.commit('setAudioPlayBtn',false)
      }
    },
    clickBg (e) {
      if(!this.audioduration){
        return
      }
      this.touch.width = this.$refs.barBg.clientWidth
      let left = this.$refs.barBg.offsetLeft
      let offsetWidth,that = this
      if(IsPC()){
        that.touch.endX = e.pageX - left
        offsetWidth = that.touch.endX / that.touch.width * 100;
      }
      this.changeTime(offsetWidth)
    },
    yuanmousedown(){
      if(!this.audioduration){
        return
      }
      this.is_yuanmousedown = true;
      let offsetWidth;
      let that = this;
      document.onmousemove = (e) => {
        if (!that.is_yuanmousedown){
          return false;
        }
        const left = that.$refs.barBg.offsetLeft
        that.touch.startX = e.pageX - left
        that.touch.width = that.$refs.barBg.clientWidth
        if(IsPC()){
          let deltaX = e.pageX - left;
          const width = Math.min(Math.max(0, deltaX), that.touch.width)
          offsetWidth = width / that.touch.width * 100
        }
        that.setProgress(offsetWidth)
      };

      document.onmouseup = (ev) => {
        var that = this;
        if(that.is_yuanmousedown){
          that.is_yuanmousedown = false;
          that.changeTime(offsetWidth)
        }
        
      };
    },
    end(){
      this.is_yuanmousedown = false;
    },
    move(e){
      // if(this.is_yuanmousedown){
      //   const left = this.$refs.barBg.offsetLeft
      //   this.touch.startX = e.pageX - left
      //   this.touch.width = this.$refs.barBg.clientWidth
      //   let offsetWidth
      //   if(IsPC()){
      //     let deltaX = e.pageX - left;
      //     const width = Math.min(Math.max(0, deltaX), this.touch.width)
      //     offsetWidth = width / this.touch.width * 100
      //   }
      //   this.setProgress(offsetWidth)
      // }
    },
    changeTime (time) {
      const audio = this.$refs.audio
      const current = time * audio.duration / 100
      audio.currentTime = current
    },
    /**
     * 设置进度条长度
     */
    setProgress (val) {
      if (val < 0 || val > 100) {
        return
      }
      this.progressWidth = val
    },
    volumeClick(){
      if(this.volumeTitle == '静音'){
        this.$refs.audio.volume = 
        this.VolumeSize = 0
        this.volumeTitle = '恢复音量'
      }else{
        this.$refs.audio.volume = 1
        this.VolumeSize = 100
        this.volumeTitle = '静音'
      }
    },
    changeVolume(){
      this.$refs.audio.volume = this.VolumeSize/100
    },
    nextSong(){
      if(this.audioPlayMode == 'loop' || this.audioPlayMode == 'loopone'){
        let SongList = this.$store.getters.getSongList
        this.goNextSong(SongList)
      }else if(this.audioPlayMode == 'random'){
        this.goNextSong(this.shuffleSongList)
      }
    },
    prevSong(){
      if(this.audioPlayMode == 'loop' || this.audioPlayMode == 'loopone'){
        let SongList = this.$store.getters.getSongList
        this.goPrevSong(SongList)
      }else{
        this.goPrevSong(this.shuffleSongList)
      }
    },
    goNextSong(arr){
      let SongOnIndex = arr.findIndex((v,i) => {
        return this.SongId == v.SongId
      })
      SongOnIndex++
      if(SongOnIndex == arr.length){
        SongOnIndex = 0
      }
      this.$store.commit('setSongInfo',arr[SongOnIndex])
    },
    goPrevSong(arr){
      let SongOnIndex = arr.findIndex((v,i) => {
        return this.SongId == v.SongId
      })
      SongOnIndex--
      if(SongOnIndex == -1){
        SongOnIndex = arr.length - 1
      }
      this.$store.commit('setSongInfo',arr[SongOnIndex])
    },
    changePlayMode(){
      if(this.audioPlayMode == 'loop'){
        this.audioPlayMode = 'loopone'
      }else if(this.audioPlayMode == 'loopone'){
        this.audioPlayMode = 'random'
      }else{
        this.audioPlayMode = 'loop'
      }
    },
    setLyric(){
      if (this.$refs.lyric.lineNo == this.$refs.lyric.lyricContent.length) return;
      this.$refs.lyric.lineNo = this.$refs.lyric.getLineNo(this.$refs.audio.currentTime);
      this.$refs.lyric.highLight();
    }
  },
  computed:{
    ...mapGetters(['getSongInfo','getAudioPlayBtn','getSongList']),
    comPlayMode(){
      if(this.audioPlayMode == 'loop'){
        return ''
      }else if(this.audioPlayMode == 'loopone'){
        return 'loopone'
      }else{
        return 'random'
      }
    }
  },
  watch:{
    getSongInfo(newval,oldval){
      if(!newval.SongId){
        return
      }
      this.init()
      if(!this.$store.state.audioInfo.audioFlag){
        this.$store.commit('setAudioFlag',true)
      }
      this.getmusicurl(newval.SongId)
      this.getlyric(newval.SongId)
      this.SongId = newval.SongId
      this.SongName = newval.SongName
      this.SongPic = newval.SongPic
      this.SongArtists = newval.SongArtists
    },
    getAudioPlayBtn(newval,oldval){
      if(newval){
        // 暂停中
        this.$refs.audio.play();
      }else{
        // 播放中
        this.$refs.audio.pause();
      }
    },
    getSongList:{
      handler(newVal, oldVal) {
        let SongList = JSON.stringify(this.$store.getters.getSongList)
        this.shuffleSongList = Shuffle(JSON.parse(SongList))//随机歌单列表
      },
      immediate: true,
      deep: true
    }
  },
  destory(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.audio-wrap{
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: -3px;
  right: 0;
  left: 0;
  z-index: 8000;
}
.player-bar{
  height: 72px;
  padding: 0 10px 0 20px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
}
.player-bar .avatar{
  width: 60px;
  border-radius: 5px;
  border-radius:5px;
  overflow:hidden;
}
.player-bar .info{
  margin-right: 1%;
  flex-shrink: 0;
  width: 6%;
  padding-left:20px;
}
.player-bar .info h2{
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;
}
.player-bar .info p{
  font-size: 12px;
  color: #999;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.player-btn{
  display:flex;
  justify-content: space-between;
  align-items:center;
}
.player-btn span{
  display:block;
  cursor:pointer;
}
.player-btn .player-prev{
  width:40px;
  height:40px;
  background:url(../assets/img/player-prev.png) center no-repeat;
  background-size:35px;
}
.player-btn .player-play{
  width:60px;
  height:60px;
  background:url(../assets/img/player-btn3.png) center no-repeat;
  background-size:50px;
}
.player-btn .player-stop{
  width:60px;
  height:60px;
  background:url(../assets/img/player-stop.png) center no-repeat;
  background-size:50px;
}
.player-btn .player-next{
  width:40px;
  height:40px;
  background:url(../assets/img/player-next.png) center no-repeat;
  background-size:35px;
}
.player-bar .progress-wrap{
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 3%;
}
.player-bar .progress-wrap p{
  font-size: 14px;
}
.progress-bar-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.progress-bar{
  position: relative;
  width: 100%;
  flex: 1;
  height: 3px;
  background: rgba(0,0,0,.05);
  border-radius: 2px;
  cursor: pointer;
  margin: 0 25px;
}
.progress-bar .bar-inner{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width:100%;
  background-color: #cccccc;
}
.progress-bar .bar-inner .progress{
  width: 0;
  background: #C62F2F;
  height: 3px;
  border-radius: 2px;
}
.progress-bar .bar-inner .progress-btn{
  position: absolute;
  z-index: 100;
  left: 0;
  width: 12px;
  height: 12px;
  top: -4.5px;
  background: #C62F2F;
  box-shadow: 0 0 15px 0 rgba(0,0,0,.15);
  border-radius: 50%;
}
.progress-bar .bar-inner .progress-btn:after {
    position: absolute;
    content: " ";
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 50%;
}
.player-bar .volume-wrap{
    width: 10%;
    margin-left: 2%;
    display: flex;
    align-items: center; 
    margin-right: 2%;
}
.player-bar .volume-wrap .volume-slider{
    position: relative;
    width: 100%;
    flex: 1;
    margin-left: 10px;
}
.player-bar .volume-wrap .volume-yl{
  width:30px;
  height:30px;
  background:url(../assets/img/player-yl.png) center no-repeat;
  background-size:30px;
  cursor: pointer;
}
.player-bar .volume-wrap .volume-yl.off{
  background:url(../assets/img/player-ylo.png) center no-repeat;
  background-size:29px;
}
.bfqbox-wrap{
  display:flex;
  justify-content: space-between;
  align-items:center;
  width:9%;
  margin-right:1%;
}
.bfqbox-wrap .bflx{
  display:block;
  width:20px;
  height:20px;
  background:url(../assets/img/loop.png) center no-repeat;
  background-size:20px;
  cursor:pointer;
}
.bfqbox-wrap .bflx.loopone{
  background:url(../assets/img/loopone.png) center no-repeat;
  background-size:20px;
}
.bfqbox-wrap .bflx.random{
  background:url(../assets/img/suiji.png) center no-repeat;
  background-size:20px;
}
.bfqbox-wrap .text{
  display:block;
  font-size: 16px;
  cursor: pointer;
  color:#C62F2F;
  padding:0 20px;
}
.bfqbox-wrap .list{
  display:block;
  width:20px;
  height:20px;
  background:url(../assets/img/bflist.png) center no-repeat;
  background-size:20px;
  cursor: pointer;
}
.sdwa{
  box-shadow: #efefef 0px -5px 8px;
}
@media screen and (max-width:1280px){
  .player-bar .progress-wrap{
    display:none;
  }
  .player-bar .bfqbox-wrap{
    display:none;
  }
  .player-bar .volume-wrap{
    display:none;
  }
  .player-bar .info{
    width:1.866667rem;
  }
  .player-bar{
    display:block;
    height:auto;
    padding:0.266667rem;
    overflow:hidden;
  }
  .player-bar .avatar{
    float:left;
  }
  .player-bar .info{
    float:left;
    padding-top: 0.133333rem;
  }
  .player-bar .player-btn{
    float:right;
    padding-top: 0.2rem;
  }
  .player-btn .player-prev{
    width:0.933333rem;
    height:0.933333rem;
    background-size:0.933333rem;
  }
  .player-btn .player-stop{
    width:1.2rem;
    height:1.2rem;
    background-size:1.2rem;
  }
  .player-btn .player-play{
    width:1.2rem;
    height:1.2rem;
    background-size:1.2rem;
  }
  .player-btn .player-next{
    width:0.933333rem;
    height:0.933333rem;
    background-size:0.933333rem;
  }
}
</style>
<style>
.volume-slider .el-slider__runway{
  height:4px;
}
.volume-slider .el-slider__bar{
  height:4px;
  background-color: #C62F2F;
}
.volume-slider .el-slider__button{
  width: 10px;
  height: 10px;
  border-color: #C62F2F;
}
.volume-slider .el-slider__button-wrapper{
  top: -6px;
  width: auto;
  height: auto;
}
</style>
<style>
.zZindex {
    z-index:10000 !important;
  }
</style>