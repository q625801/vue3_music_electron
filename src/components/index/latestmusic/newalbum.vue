<template>
    <div class="wrap-newalbum">
        <div class="newalbum-option-btn">
            <div class="option-list">
                <span v-for="(item,index) in optionList" :class="[optionType == item.data ? 'on' : '']" :key="index" @click="changeOption(item.data)">{{item.name}}</span>
            </div>
            <div class="btn-a clear">
                
            </div>
        </div>
        <div class="newalbum-section">
            <div class="newalbum-list clear" v-for="(item,index) in albumList" :key="index">
                <div class="newalbum-left fl">
                    <div :class="[albumOn == index ? 'on' : '']">{{item.timedate == 'weekData' ? "<span>本周</span>" : item.timedate}}</div>
                </div>
                <div class="newalbum-right clear fl">
                    <div class="newalbum-cover fl" v-for="item2 in item.data" :key="item2.id">
                        <div class="newalbum-img">
                            <img :src="item2.picUrl + '?param=300y300'"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import { postJson } from '@/api/apiConfig'
import { gettopalbum } from '@/api/api'
import { addDate2,myDate } from '@/utils/common'
export default defineComponent({
    name:'handtailor',
    setup () {
        let state = reactive({
            optionList:[
                {
                    name: '全部',
                    data: 0,
                },
                {
                    name: '华语',
                    data: 7,
                },
                {
                    name: '欧美',
                    data: 96,
                },
                {
                    name: '日本',
                    data: 8,
                },
                {
                    name: '韩国',
                    data: 16,
                }
            ],
            optionType:0,
            albumList:[],
            albumOn:-1,
            today: myDate(),
            timeDown:0,
        })
        let changeOption = (data) => {
            state.optionType = data
            getData()
        }
        let getData = () => {
            let year = addDate2(state.today,state.timeDown).split('-')[0]
            let month = addDate2(state.today,state.timeDown).split('-')[1]
            postJson(gettopalbum,{year:year,month:month},res => {
                if(res.code == 200){
                    let weekobj = {},obj = {}
                    if(res.weekData && res.weekData.length > 0){
                        weekobj.timedate = 'weekData',
                        weekobj.data = res.weekData
                        state.albumList.push(weekobj)
                    }
                    if(res.monthData && res.monthData.length > 0){
                        obj.timedate = year + '-' + month,
                        obj.data = res.monthData
                        state.albumList.push(obj)
                    }
                    // state.albumList.weekData = res.weekData
                    // state.albumList.monthData = res.monthData
                }
            },err => {

            })
        }
        onMounted(() => {
            const el = document.querySelector(".index-screen")
            const offsetHeight = el.offsetHeight
            const albumDatedom = document.getElementsByClassName("newalbum-left")
            el.onscroll = () => {
                Array.prototype.forEach.call(albumDatedom,function(el,index){
                    let dom = el.getBoundingClientRect()
                    console.log(dom)
                    if(dom.top < 100){
                        state.albumOn = index
                    }
                    if(dom.top > 110 && index == 0){
                        state.albumOn = -1
                    }
                })
                const scrollTop = el.scrollTop
                const scrollHeight = el.scrollHeight
                if(offsetHeight + scrollTop - scrollHeight >= 0){
                    state.timeDown--
                    getData()
                }
            }
        })
        getData()
        return {
            ...toRefs(state),
            changeOption
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-newalbum{
    .newalbum-option-btn{
        padding-top: 26px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        .option-list{
            span{
                font-size: 13px;
                display: inline-block;
                color: $font-color;
                cursor: pointer;
                margin-right: 24px;
            }
            span.on{
                color: $font-hovercolor;
                font-size: 14px;
            }
            span:hover{
                color: $font-hovercolor;
            }
        }
    }
    .newalbum-section{
        .newalbum-list{
            .newalbum-left{
                width: 50px;
                box-sizing: border-box;
                font-size: 18px;
                padding: 0 12px 0 2px;
                height: 50px;
            }
            .newalbum-left.on{
                position: fixed;
                margin: -100px 0 0 0;
            }
            .newalbum-right{
                width: calc(100% - 50px);
                .newalbum-cover{
                    width: 25%;
                }
            }
        }
    }
}
</style>