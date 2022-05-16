<template>
    <div class="wrap-usersongsheet">
        <div class="usersongsheet-list" v-for="(item,index) in dataList" :key="index" @click="goPage(router,'/songsheet',{id:item.id},{songsheetname:item.name})">
            <div class="list-img">
                <div class="list-playCount">{{item.playCount > 10000 ? (item.playCount/10000).toString().split(".")[0] + "万" : item.playCount}}</div>
                <img v-lazy="item.coverImgUrl + '?param=300y300'" :key="item.coverImgUrl">
                <div class="list-player amn4"></div>
            </div>
            <div class="list-title">
                <span>{{item.name}}</span>
            </div>
            <div class="list-songnum">
                {{item.trackCount}}首
            </div>
        </div>
    </div>
    <LoadingCpn v-if="loading"/>
</template>

<script setup>
import { ref,onMounted,defineProps,watch } from "vue";
import { postJson } from "@/api/apiConfig"
import { userplaylist } from "@/api/api"
import LoadingCpn from "@/components/common/loadingcpn.vue"
import { goPage } from "@/utils/common"
import { useRouter } from "vue-router"
const router = useRouter()
const props = defineProps(['type','userId'])
let pageObj = ref({
    pageSize:19,
    pageNum:1,
    more:false,
})
let loading = ref(false)
let dataList = ref([])
const getData = () => {
    loading.value = true
    let offset = pageObj.value.pageSize * (pageObj.value.pageNum - 1)
    postJson(userplaylist,{uid:props.userId,offset:offset,limit:pageObj.value.pageSize},res => {
        if(res.code == 200){
            pageObj.value.more = res.more
            if(props.type == 'create'){
                dataList.value = dataList.value.concat(res.playlist.filter(item => item.userId == props.userId))
            }else if(props.type == 'collection'){
                dataList.value = dataList.value.concat(res.playlist.filter(item => item.userId != props.userId))
            }
        }
        loading.value = false
    },err => {

    })
}
watch(() => props.type,(newValue) => {
    dataList.value = []
    pageObj.value = {
        pageSize:19,
        pageNum:1,
        more:false,
    }
    getData()
})
onMounted(() => {
    getData()
    const el = document.querySelector(".wrap-userinfo")
    const offsetHeight = el.offsetHeight
    el.onscroll = () => {
        const scrollTop = el.scrollTop
        const scrollHeight = el.scrollHeight
        if(offsetHeight + scrollTop - scrollHeight >= -300){
            if(pageObj.value.more && props.type == 'create' && [...dataList.value].length >= 20){
                pageObj.value.pageNum++
                getData()
            }else if(pageObj.value.more && props.type == 'collection'){
                pageObj.value.pageNum++
                getData()
            }
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-usersongsheet{
    display: flex;
    flex-wrap: wrap;
    .usersongsheet-list:nth-child(4n){
        margin-right: 0;
    }
    .usersongsheet-list{
        width:23%;
        margin-bottom:40px;
        overflow:hidden;
        cursor:pointer;
        margin-right:2.5%;
        .list-img{
            width:100%;
            display:flex;
            align-items: center;
            justify-content: center;
            position:relative;
            border-radius: 5px;
            overflow: hidden;
            .list-player{
                width:28px;
                height:28px;
                position:absolute;
                right: 10px;
                bottom: 10px;
                background:url("../../../assets/img/player-daily.png") center no-repeat;
                background-size:cover;
                opacity:0;
            }
            .list-playCount{
                position:absolute;
                right:0;
                top:0;
                color: #fff;
                font-size: 12px;
                font-weight: 700;
                line-height: 24px;
                background:url('../../../assets/img/player-btn2.png') left center no-repeat;
                background-size: 16px;
                padding-left: 20px;
                padding-right:8px;
            }                
            .calendar{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                display: block;
                width: 70px;
                height: 70px;
                background: url('../../../assets/img/calendar-1.png') center no-repeat;
                background-size: 100%;
                span{
                    display: block;
                    font-weight: bold;
                    padding-top: 30px;
                    text-align: center;
                    font-size: 28px;
                    color: white;
                }
            }
        }
        .list-img:hover .list-player{
            opacity:1;
        }
        .list-title span{
            display: block;
            text-align: left;
            color:$font-color;
            font-size: 14px;
            line-height: 18px;
            padding-top: 8px;
            display: -webkit-box;             /*将对象转为弹性盒模型展示*/
            -webkit-box-orient: vertical;     /*设置弹性盒模型子元素的排列方式*/
            -webkit-line-clamp: 2;            /*限制文本行数*/
            overflow: hidden;                 /*超出隐藏*/
        }
        .list-title span:hover{
            color:$font-hovercolor;
        }
        .list-songnum{
            color:$font-authorcolor;
            font-size:12px;
            padding-top: 7px;
        }
    }
}
</style>