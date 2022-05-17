<template>
    <div class="wrap-navcatlist clear">
        <div class="navcatlist-catgoryon fl">
            华语&nbsp;&nbsp;>
        </div>
        <div class="navcatlist-hotlist fr">
            <span v-for="(item,index) in hotlistData" :key="item.id" :class="[index == hotlistOn ? 'on' : '']" @click="clickhotlist(index,item)">{{item.name}}</span>
        </div>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs } from 'vue'
import { postJson } from '@/api/apiConfig'
import { getplaylisthot,getPlaylistCatlist } from '@/api/api'
export default defineComponent({
    name:'navcatlist',
    components:{

    },
    props:[
    ],
    setup (props,context) {
        let state = reactive({
            data:'',
            hotlistData:'',
            hotlistOn:0,
        })
        let getData = () => {
            postJson(getplaylisthot,{},(res) => {
                if(res.code == 200){
                    state.hotlistData = res.tags
                }
            },(err) => {
                
            })
        }
        let getCategory = () => {
            postJson(getPlaylistCatlist,{},(res) => {
                if(res.code == 200){
                    let arr = []
                    let categories = res.categories
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
                    console.log(arr)
                }
            },(err) => {
                
            })
        }
        let clickhotlist = (index,data) => {
            state.hotlistOn = index
            context.emit('hotlistOn',data)
        }
        let init = () => {
            getData()
            getCategory()
        }
        init()
        return {
            ...toRefs(state),
            clickhotlist
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
    .navcatlist-catgoryon{
        height: 32px;
        box-sizing: border-box;
        border:1px solid $navcatlistcatogrybtnbdc;
        font-size: 14px;
        line-height: 32px;
        padding: 0 28px;
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
}
</style>