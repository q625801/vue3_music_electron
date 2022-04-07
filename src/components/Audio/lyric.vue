<template>
    <div class="wrap-lyriclist amn6 sdwa" :class="{'show':lyricFlag}">
        <div class="lyric-content">
            <ul ref="lyricul" class="amn4" v-if="lyricVersion">
                <li v-for="(item,index) in lyricContent" :key="index" :class="{'active':lineNo == index}">{{item.content}}</li>
            </ul>
            <p class="lyric-p" v-for="(item,index) in lyricContent" :key="index" v-else>{{item}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'lyric',
    data(){
        return {
            lyricFlag:false,
            lyricContent: '',
            lyricVersion: true,
            lineNo: 0, // 当前行歌词
            preLine: 6, // 当播放6行后开始滚动歌词
            lineHeight: -30, // 每次滚动的距离
        }
    },
    mounted(){
        
    },
    methods:{
        init(data,version){
            this.lineNo = 0
            this.lyricContent = this.parseLyric(data);
        },
        parseLyric(text) {
            //按行分割歌词
            let lyricArr = text.split('\n');
            // console.log(lyricArr)
            let result = []; //新建一个数组存放最后结果
            //遍历分割后的歌词数组，将格式化后的时间节点，歌词填充到result数组
            for (let i = 0; i < lyricArr.length; i++) {
                let playTimeArr = lyricArr[i].match(/\[\d{2}:\d{2}((\.|\:)\d{1,5})\]/g); //正则匹配播放时间
                let lineLyric = "";
                if (lyricArr[i].split(playTimeArr).length > 0) {
                    lineLyric = lyricArr[i].split(playTimeArr);
                }
                if (playTimeArr != null) {
                    for (let j = 0; j < playTimeArr.length; j++) {
                        let time = playTimeArr[j].substring(1, playTimeArr[j].indexOf("]")).split(":");
                        //数组填充
                        result.push({
                            time: (parseInt(time[0]) * 60 + parseFloat(time[1])).toFixed(4),
                            content: String(lineLyric).substr(1)
                        });
                    }
                }
            }
            if(result.length > 0){
                this.lyricVersion = true
                return result
            }else{
                this.lyricVersion = false
                return lyricArr
            }
        },
        highLight() {
            if(!this.lyricVersion){
                return
            }
            let allHegiht = 0
            for(let i = 0;i<this.lineNo;i++){
                allHegiht += this.$refs.lyricul.children[i].offsetHeight
            }
            this.$refs.lyricul.style.top = (-allHegiht + 180) + 'px';
        },
        getLineNo(currentTime) {
            if(this.lineNo == -1 || this.lineNo == undefined){
                this.lineNo = 0
            }
            // console.log(this.lyricContent,this.lineNo)
            if(this.lyricContent && this.lyricContent.length > 0 && this.lyricContent[this.lineNo].time){
                if (currentTime >= parseFloat(this.lyricContent[this.lineNo].time)) {
                    // 快进
                    for (let i = this.lyricContent.length - 1; i >= this.lineNo; i--) {
                        if (currentTime >= parseFloat(this.lyricContent[i].time)) {
                            return i;
                        }
                    }
                } else {
                    // 后退
                    for (let i = 0; i <= this.lineNo; i++) {
                        if (currentTime <= parseFloat(this.lyricContent[i].time)) {
                            return i - 1;
                        }
                    }
                }
            }
        }
    },
    computed:{
        
    },
    watch:{
        
    }
}
</script>

<style scoped>
.wrap-lyriclist{
    width: 500px;
    box-sizing: border-box;
    padding: 20px;
    position: absolute;
    bottom: 72px;
    right: 0;
    background: #2B2B2B;
    z-index: 99;
    overflow: hidden;
    transform: translateX(500px);
    opacity:0;
}
.wrap-lyriclist.show{
    transform: translateX(0px);
    opacity:1;
}
.wrap-lyriclist .lyric-content{
    width:100%;
    position: relative;
    height:360px;
    overflow: hidden;
    box-sizing: border-box;
}
.wrap-lyriclist ul {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    list-style: none;
}
.wrap-lyriclist ul li {
    width: 100%;
    min-height: 31px;
    line-height: 31px;
    text-align: center;
    color:#d6d6d6;
    font-size:14px;
}
.wrap-lyriclist ul li.active {
    color: #C62F2F;
    font-weight: bold;
    font-size: 16px;
}
.lyric-p{
    width: 100%;
    min-height: 31px;
    line-height: 31px;
    text-align: center;
    color:#4a4a4a;
    font-size:14px;
}
</style>