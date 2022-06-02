<template>
    <div class="wrap-searchdialog" ref="searchDialogdom">
        <div class="searchdialog-hotsection" v-if="dialogHotShow">
            <div class="searchdialog-title">热搜榜</div>
            <div class="hotsection-content" v-if="!loading">
                <div class="hotsection-list clear" v-for="(item,index) in hotSearchData" :key="index" @click="handleGoSearch(item.searchWord,1)">
                    <div class="num fl" :class="[index < 3 ? 'top' : '']">
                        {{index + 1}}
                    </div>
                    <div class="hotsearchinfo fl">
                        <div class="clear hotsearchinfo-top">
                            <div class="searchWord fl">
                                {{item.searchWord}}
                            </div>
                            <div class="score fl">
                                {{item.score}}
                            </div>
                            <div :class="['icon fl',item.iconType == 5 ? 'arror' : '']" v-if="item.iconUrl">
                                <img :src="item.iconUrl"/>
                            </div>
                        </div>
                        <div class="content" v-if="item.content">
                            {{item.content}}
                        </div>
                    </div>
                </div>
            </div>
            <LoadingCpn v-else/>
        </div>
        <div class="searchdialog-inputon" v-else>
            <div class="inputon-section">
                <div class="inputon-content inputon-wantsearch">
                    <div class="searchdialog-title">猜你想搜</div>
                    <div class="content-u">
                        <div class="content-l" v-for="(item,index) in wantsearchData" :key="index">
                            <p class="ellipsis" v-html="item.keyword"></p>
                        </div>
                    </div>
                </div>
                <div :class="[item.type,'inputon-content']" v-for="(item,index) in wantsearchSaas" :key="index+1000">
                    <div class="searchdialog-title">{{item.name}}</div>
                    <div class="content-u">
                        <div class="content-l" v-for="(item2,index2) in item.data" :key="index2">
                            <p class="ellipsis" v-html="item2.name"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs,ref,onMounted,watch } from 'vue'
import { postJson } from '@/api/apiConfig'
import { hotsearch,hotsearchsuggest } from '@/api/api'
import LoadingCpn from "@/components/common/loadingcpn"
import { goPage } from '@/utils/common'
import { useRouter } from 'vue-router'
export default defineComponent({
    name:'searchdialog',
    components:{
        LoadingCpn
    },
    props:[
        'keywords',
    ],
    setup (props,context) {
        let state = reactive({
            hotSearchData: [],
            loading:false,
            dialogHotShow:true,
            wantsearchData:[],
            wantsearchSaas:[],
        })
        let gethostSearchData = () => {
            state.loading = true
            postJson(hotsearch,{},res => {
                state.loading = false
                if(res.code == 200){
                    state.hotSearchData = res.data
                }
            },err => {

            })
        }
        let wantsearch = (keywords,type) => {
            let params = {
                keywords:keywords
            }
            if(type){
                params.type = type
            }
            return new Promise((reslove,reject) => {
                postJson(hotsearchsuggest,params,res => {
                    reslove(res)
                },err => {
                    reject('error')
                })
            })
        }
        let init = () => {
            gethostSearchData()
        }
        init()
        let searchDialogdom = ref(null)
        onMounted(() => {
            document.addEventListener('click',(e) => {
                if(e.target.getAttribute('inputType') == 'search'){
                    return
                }
                if(searchDialogdom && searchDialogdom.value != null && !searchDialogdom.value.contains(e.target)){
                  context.emit('searchdialogChange',{dialogFlag:false,keywords:''})
                }
            })
        })
        let drawCorrelativeKeyword = (data,field,searchkeyword) => {
            let arr = JSON.parse(JSON.stringify(data))
            arr.forEach((item,index) => {
                let html = item[field].replace(searchkeyword,"<span style='color:#85B9E6'>"+searchkeyword+"</span>")
                arr[index][field] = html
            })
            return arr
        }
        watch(() => props.keywords,newValue => {
            if(newValue){
                Promise.all([wantsearch(newValue,'mobile'),wantsearch(newValue)]).then((res) =>{
                    if(res[0].code == 200){
                        if(res[0].result.allMatch){
                            state.wantsearchData = drawCorrelativeKeyword(res[0].result.allMatch,'keyword',newValue)
                        }else{
                            state.wantsearchData = []
                        }
                    }
                    if(res[1].code == 200){
                        let arr = []
                        if(res[1].result.order && res[1].result.order.length > 0){
                            res[1].result.order.forEach(item => {
                                let obj = {type:item,name: item == "songs" ? '单曲':item == "artists" ? '歌手' : item == "albums" ? '专辑' : item == "playlists" ? '歌单' : ''}
                                if(item == "songs" || item == "albums"){
                                    let songsArr = JSON.parse(JSON.stringify(res[1].result[item]))
                                    let artiststr = ''
                                    songsArr.forEach((item2,index2) => {
                                        if(item2.artists && item2.artists.length > 0){//针对songs字段数组
                                            artiststr = item2.artists.map(item3 => item3.name).join(' ')
                                        }else if(item2.artist){//针对albums字段数组
                                            artiststr = item2.artist.name
                                        }
                                        res[1].result[item][index2].name = res[1].result[item][index2].name + ' - ' + artiststr
                                    })
                                }
                                obj.data = drawCorrelativeKeyword(res[1].result[item],'name',newValue)
                                arr.push(obj)
                            })
                            state.wantsearchSaas = arr
                        }else{
                            state.wantsearchSaas = []
                        }
                    }
                }).catch((err) => {
                    
                })
                state.dialogHotShow = false
            }else{
                state.dialogHotShow = true
            }
        },{immediate: true,deep: true})
        const router = useRouter()
        let handleGoSearch = (keywords,type) => {
            context.emit('searchdialogChange',{dialogFlag:false,keywords:keywords})
            goPage(router,'/search',{keywords:keywords,type:type})
        }
        return {
            ...toRefs(state),
            searchDialogdom,
            handleGoSearch
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-searchdialog{
    position: absolute;
    top: 65px;
    left: 0px;
    width: 356px;
    min-height: 200px;
    background: #363636;
    border-radius: 6px;
    border: 1px solid #121212;
    z-index: 99;
    max-height: 510px;
    overflow-y: scroll;
    .searchdialog-title{
        font-size: 14px;
        color:$searchdialogcolor;
    }
    .searchdialog-hotsection{
        .searchdialog-title{
            padding: 18px 22px;
        }
        .hotsection-content{
            .hotsection-list{
                padding: 0 20px;
                height:55px;
                display: flex;
                align-items: center;
                cursor: pointer;
                .num{
                    width: 35px;
                    font-size: 18px;
                }
                .num.top{
                    color: $musicNameOn;
                }
                .hotsearchinfo{
                    .hotsearchinfo-top{
                        display: flex;
                        align-items: center;
                        .searchWord{
                            font-size: 12px;
                        }
                        .score{
                            font-size: 12px;
                            color: $font-authorcolor;
                            padding-left: 5px;
                        }
                        .icon{
                            width: 20px;
                            padding-left: 5px;
                            img{
                                width: 100%;
                            }
                        }
                        .icon.arror{
                            img{
                                width: 48%;
                            }
                        }
                    }
                    .content{
                        clear: both;
                        font-size: 12px;
                        color: $font-authorcolor;
                        padding-top: 8px;
                    }
                }
            }
            .hotsection-list:hover{
                background-color:$hvoerbodybg;
            }
        }
    }
    .searchdialog-inputon{
        .inputon-section{
            padding: 18px 0;
            .inputon-content{
                .searchdialog-title{
                    padding-left: 23px;
                    margin-left: 16px;
                    line-height: 16px;
                }
                .content-u{
                    padding: 9px 0;
                    .content-l{
                        p{
                            font-size: 12px;
                            line-height: 35px;
                            padding-left: 40px;
                            cursor: pointer;
                        }
                        p:hover{
                            background-color: $hvoerbodybg;
                        }
                    }
                }
            }
            .inputon-content.inputon-wantsearch{
                .searchdialog-title{
                    background:url('../../assets/img/search2.png') left center no-repeat;
                    background-size: 16px;
                }
            }
            .inputon-content.songs{
                .searchdialog-title{
                    background:url('../../assets/img/music.png') left center no-repeat;
                    background-size: 16px;
                }
            }
            .inputon-content.artists{
                .searchdialog-title{
                    background:url('../../assets/img/artist-3.png') left center no-repeat;
                    background-size: 16px;
                }
            }
            .inputon-content.albums{
                .searchdialog-title{
                    background:url('../../assets/img/album.png') left center no-repeat;
                    background-size: 16px;
                }
            }
            .inputon-content.playlists{
                .searchdialog-title{
                    background:url('../../assets/img/songsheet.png') left center no-repeat;
                    background-size: 16px;
                }
            }
        }
    }
}
</style>