export const myDate = () => {
    let now = new Date();                                                                                                     
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