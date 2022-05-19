import { ElMessage } from 'element-plus'
interface isdialog{
  songsheetname:string
}
export const goPage = (router:any,path:string,data:object,isdialog?:isdialog) => {
  if(isdialog && isdialog.songsheetname.indexOf('喜欢的音乐') > -1){
    ElMessage({
      message:'此项目登录功能尚未完善，查看此歌单必须先登录！',//登录功能
      type:'error',
      duration:2000,
      onClose:() => {
        
      },
    })
    return
  }
  router.push({
    path: path,
      query:{
        ...data
      }
  })
}
export const countchange = (count:number) => {
  if(count > 10000){
    return (count/10000).toString().split(".")[0] + "万"
  }else{
    return count
  }
}
export const myDate = (data?:number) => {
    let now:any = data ? new Date(data) : new Date();                                                                                                     
    let year:any = now.getFullYear(); //得到年份
    let month:any = now.getMonth();//得到月份
    let date:any = now.getDate();//得到日期
    month = month + 1;
    if (month < 10){
        month = "0" + month
    }
    if (date < 10) date = "0" + date;
    let time:string = year + "-" + month + "-" + date;    //（格式化"yyyy-MM-dd"）     
    return time
}
export const minutes = (times:number) => {
    var minutes:any = Math.floor(times / (1000 * 60)) % 60; //计算剩余的分钟
    if (minutes < 10) {
      return "0" + minutes;
    } else {
      return minutes;
    }
  }
export const seconds = (times:number) => {
    var seconds:any = Math.floor(times / 1000) % 60; //计算剩余的秒数
    if (seconds < 10) {
      return "0" + seconds;
    } else {
      return seconds;
    }
}
export const playtime = (time:number) => {
    return minutes(time) + ":" + seconds(time)
}
interface Artists{
  albumSize: number
  alias: any
  briefDesc: string
  id: number
  img1v1Id: number
  img1v1Url: string
  musicSize: number
  name: string
  picId: number
  picUrl: string
  topicPerson: number
  trans: string
}
export const SongArtistsComputed = (data:Array<Artists>):string => {
  if(data.length == 1){
    return '<span>' + data[0].name + '</span>'
  }else{
      let name = data.map(obj => {
          return '<span>' + obj.name + '</span>'
      }).join(' / ')
      return name
  }
}

export const IsPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
     "SymbianOS", "Windows Phone",
     "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
     if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
     }
  }
  return flag;
}

export const Shuffle = (arr:Array<any>) => {
  let res:Array<any> = [],random:number
  while (arr.length > 0) {
    random = Math.random() * arr.length
    res.push(arr.splice(random,1)[0])
  }
  return res
}
interface songinfo{
  id:string;
  name:string;
  picUrl:string;
  song:any;
}
interface SongData{
  SongId:string;
  SongName:string;
  SongPic:string;
  SongArtists:any;
  SongTime:string;
}
export const audioPlay = (SongInfo:songinfo,SongList:any,store:any) => {
  let data = {
      SongId:SongInfo.id,
      SongName:SongInfo.name,
      SongPic:SongInfo.picUrl,
      SongArtists:SongInfo.song.artists
  }
  let arr:Array<any> = [];
  if(SongList && SongList.length > 0){
      SongList.forEach((item:songinfo) => {
          let obj:SongData = {
            SongId: item.id,
            SongName: item.name,
            SongPic: item.picUrl,
            SongArtists: item.song.artists,
            SongTime: playtime(item.song.bMusic.playTime)
          }
          arr.push(obj)
      })
      store.commit('setSongList',arr)
  }
  store.commit('setSongInfo',data)
}