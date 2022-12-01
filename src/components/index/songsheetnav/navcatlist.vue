<template>
    <div class="wrap-navcatlist">
        <div class="navcatlist-catgoryon" @click="catgorysectionFlag = !catgorysectionFlag" ref="catgoryon">
            {{hotlistOnName}}&nbsp;&nbsp;>
        </div>
        <div class="navcatlist-hotlist">
            <span v-for="item in hotlistData" :key="item.id" :class="[item.name == hotlistOnName ? 'on' : '']" @click="clickhotlist(item)">{{item.name}}</span>
        </div>
        <div class="navcatlist-catgorysection" v-show="catgorysectionFlag" ref="catgorysection">
            <div class="catgorysection-all">
                <span @click="clickhotlist({name:'全部歌单'})">全部歌单</span>
            </div>
            <div class="catgorysection-cb">
                <div class="catgorysection-list clear" v-for="(item,index) in catgorydata" :key="index">
                    <div :class="['catgorysection-left','fl',item.category == 0 ? 'language' : item.category == 1 ? 'style' : item.category == 2 ? 'life' : item.category == 3 ? 'emotion' : 'theme']">
                        {{item.name}}
                    </div>
                    <div class="catgorysection-right clear fl">
                        <div class="catgorysection-btn fl" v-for="(item2,index2) in item.children" :key="index2">
                            <span @click="clickhotlist(item2)" :class="[item2.name == hotlistOnName ? 'on' : '',item2.hot ? 'hot' : '']">{{item2.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,ref } from 'vue'
import { getJson } from '@/api/apiConfig'
import { getplaylisthot,getPlaylistCatlist } from '@/api/api'
interface state{
    hotlistData:any[],
    hotlistOnName:string,
    catgorydata:any[],
    catgorysectionFlag:boolean,
}
export default defineComponent({
    name:'navcatlist',
    components:{

    },
    props:[
        'cat'
    ],
    setup (props,context) {
        let state = reactive<state>({
            hotlistData:[],
            hotlistOnName:props.cat,
            catgorydata:[],
            catgorysectionFlag:false,
        })
        let getData = () => {
            getJson(getplaylisthot,{},(res:{code:number,tags:any[]}) => {
                if(res.code == 200){
                    state.hotlistData = res.tags
                }
            },(err:any) => {
                
            })
        }
        let getCategory = () => {
            getJson(getPlaylistCatlist,{},(res:{code:number,categories:Record<string,string>,sub:any[]}) => {
                if(res.code == 200){
                    let arr:{name:string,category:string,children:any[]}[] = []
                    let categories = res.categories
                    console.log(res,'typescript categories')
                    Object.keys(categories).forEach(item => {
                        let obj = {
                            name:categories[item],
                            category:item,
                            children:[]
                        }
                        arr.push(obj)
                    })
                    arr.forEach((item) => {
                        item.children = res.sub.filter((item2) => {
                            return item2.category == item.category
                        })
                    })
                    state.catgorydata = arr
                }
            },(err:any) => {
                
            })
        }
        let clickhotlist = (data:{name:string}) => {
            state.hotlistOnName = data.name
            state.catgorysectionFlag = false
            context.emit('hotlistOn',data)
        }
        const catgoryon = ref<HTMLElement | null>(null)
        const catgorysection = ref<HTMLElement | null>(null)
        let init = () => {
            document.addEventListener('click',(e:any) => {
                if(catgoryon && catgoryon.value != null && catgoryon.value.contains(e.target)){
                    return
                }else if(catgorysection && catgorysection.value != null && !catgorysection.value.contains(e.target)){
                    state.catgorysectionFlag = false
                }
            })
            getData()
            getCategory()
        }
        init()
        return {
            ...toRefs(state),
            clickhotlist,
            catgorysection,
            catgoryon
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-navcatlist{
    padding-top: 15px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
    .navcatlist-catgoryon{
        height: 32px;
        box-sizing: border-box;
        border:1px solid $navcatlistcatogrybtnbdc;
        font-size: 14px;
        line-height: 32px;
        width: 102px;
        text-align: center;
        border-radius: 30px;
        cursor: pointer;
    }
    .navcatlist-catgoryon:hover{
        background-color: $checkhvoerbg;
    }
    .navcatlist-hotlist{
        padding-bottom: 3px;
        span{
            font-size: 12px;
            color:$font-authorcolor;
            padding: 3px 10px;
            display: inline-block;
            border-radius: 20px;
            cursor: pointer;
        }
        span:hover{
            color:$musicNameOn;
            background: rgba($musicNameOn,.1)
        }
        span.on{
            color:$musicNameOn;
            background: rgba($musicNameOn,.1)
        }
    }
    .navcatlist-catgorysection{
        position: absolute;
        width: 100%;
        top: 53px;
        left: 0;
        background: $navcatlistcatogrybg;
        border-radius: 6px;
        border: 1px solid $navcatlistcatogrybdc;
        z-index: 99;
        .catgorysection-all{
            border-bottom: 1px solid $navcatlistcatogrybdtc;
            padding: 12px 20px;
            span{
                display: inline-block;
                font-size: 14px;
                cursor: pointer;
                padding: 7px 10px;
                border-radius: 25px;
            }
            span:hover{
                color:$musicNameOn;
            }
            span.on{
                color:$musicNameOn;
                background: rgba($musicNameOn,0.05)
            }
        }
        .catgorysection-cb{
            padding: 25px 20px 0;
            .catgorysection-list{
                margin-bottom: 15px;
                .catgorysection-left{
                    color: $font-authorcolor;
                    font-size: 14px;
                    width: 100px;
                    padding-left: 28px;
                    box-sizing: border-box;
                    line-height: 28px;
                }
                .catgorysection-left.language{
                    background: url('../../../assets/img/language.png') left center no-repeat;
                    background-size: 25px;
                }
                .catgorysection-left.style{
                    background: url('../../../assets/img/style.png') left center no-repeat;
                    background-size: 25px;
                }
                .catgorysection-left.life{
                    background: url('../../../assets/img/life.png') left center no-repeat;
                    background-size: 25px;
                }
                .catgorysection-left.emotion{
                    background: url('../../../assets/img/emotion.png') left center no-repeat;
                    background-size: 25px;
                }
                .catgorysection-left.theme{
                    background: url('../../../assets/img/theme.png') left center no-repeat;
                    background-size: 25px;
                }
                .catgorysection-right{
                    width: calc(100% - 100px);
                    .catgorysection-btn{
                        width: 102px;
                        margin-bottom: 15px;
                        span{
                            font-size: 14px;
                            display:inline-block;
                            cursor: pointer;
                            padding: 7px 10px;
                            border-radius: 25px;
                            position: relative;
                        }
                        span:hover{
                            color:$musicNameOn;
                        }
                        span.on{
                            color:$musicNameOn;
                            background: rgba($musicNameOn,0.05)
                        }
                        span.hot:after{
                            width: 16px;
                            height: 16px;
                            background: url('../../../assets/img/hot.png') center center no-repeat;
                            background-size: 100%;
                            position: absolute;
                            right: -5px;
                            top: 6px;
                            content:' ';
                        }
                    }
                }
            }
        }
    }
}
</style>