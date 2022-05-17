<template>
    <div class="wrap-navtop" v-if="data.coverImgUrl">
        <div class="navtop-img">
            <img :src="data.coverImgUrl">
        </div>
        <div class="navtop-section clear">
            <div class="navtop-section-img fl">
                <img :src="data.coverImgUrl"/>
            </div>
            <div class="navtop-content fl">
                <div class="navtop-highqualitybtn">
                    精品歌单
                </div>
                <div class="navtop-title">{{data.name}}</div>
                <div class="navtop-copywriter">{{data.copywriter}}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,watch } from 'vue'

export default defineComponent({
    name:'navtop',
    components:{

    },
    props:[
        'navtopData'
    ],
    setup (props) {
        let state = reactive({
            data:''
        })
        watch(() =>props.navtopData,(newValue:any) => {
            state.data = newValue
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-navtop{
    position: relative;
    .navtop-img{
        width: 100%;
        height: 172px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        overflow: hidden;
        img{
            width: 95%;
            height: 125%;
            filter: blur(50px);
        }
    }
    .navtop-section{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        padding: 15px;
        box-sizing: border-box;
        cursor: pointer;
        .navtop-section-img{
            width: 142px;
            height: 142px;
            border-radius: 5px;
            overflow: hidden;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .navtop-content{
            padding-top: 21px;
            padding-left: 10px;
            .navtop-highqualitybtn{
                width: 98px;
                color: #E7AA5A;
                font-size: 14px;
                background: url('../../../assets/img/highquality.png') 10px center no-repeat;
                background-size: 16px;
                border: 1px solid #E7AA5A;
                padding: 7px 10px 7px 30px;
                border-radius: 20px;
                box-sizing: border-box;
            }
            .navtop-title{
                color: #ffffff;
                font-size: 16px;
                padding-top: 24px;
            }
            .navtop-copywriter{
                font-size: 12px;
                padding-top: 10px;
            }
        }
    }
}
</style>