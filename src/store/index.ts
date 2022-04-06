import { createStore } from "vuex";

export default createStore({
  state: {
    loadding: false,//加载
    //播放器
    audioInfo:{
      audioFlag:false,//是否显示音频播放器
      audioPlayBtn:false,//播放器开始按钮状态
      SongInfo:{//当前正在播放的音乐数据
        SongId:'',
        SongName:'',
        SongPic:'',
        SongArtists:''
      },
      SongListFlag:false,
      SongList:[],//播放列表数据
    },
  },
  getters:{
    //播放器
    getSongInfo:state => {
        return state.audioInfo.SongInfo
    },
    getSongList:state => {
        return state.audioInfo.SongList
    },
    getAudioPlayBtn:state => {
        return state.audioInfo.audioPlayBtn
    },
    //播放器end
  },
  mutations: {
    //播放器
    setAudioFlag(state,data){
      state.audioInfo.audioFlag = data
    },
    setAudioPlayBtn(state,data){
        state.audioInfo.audioPlayBtn = data
    },
    setSongInfo(state,data){
        if(state.audioInfo.SongInfo.SongId == data.SongId){
            return
        }
        state.audioInfo.SongInfo = data
    },
    setSongList(state,data){
        state.audioInfo.SongList = data
    },
    setSongInfoInit(state){
        state.audioInfo.SongInfo = {//重置播放器的音乐数据
            SongId:'',
            SongName:'',
            SongPic:'',
            SongArtists:''
        }
    }
    //播放器end
  },
  actions: {},
  modules: {},
});
