<template>
    <div class="wrap-searchywant">
        <div class="searchywant-t">你可能感兴趣</div>
        <div class="searchywant-section">
            <div class="searchywant-list clear">
                <div class="img fl">
                    <img/>
                </div>
                <div class="info">
                    <div class="name"></div>
                    <div class="tags"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs,watch } from 'vue'
import { postJson } from '@/api/apiConfig'
import { hotsearchmultimatch } from '@/api/api'
export default defineComponent({
    name:'searchywant',
    props:[
        'keywords'
    ],
    setup (props) {
        let state = reactive({
            dataList:[]
        })
        let getData = () => {
            postJson(hotsearchmultimatch,{keywords:props.keywords},res => {
                if(res.code == 200){
                    let data = res.result
                    let arr = []
                    data.orders.forEach(item => {
                        let obj = {}
                        obj.order = item
                        obj.data = data[item][0]
                        arr.push(obj)
                    })
                    state.dataList = arr
                    console.log(arr)
                }
            },err => {

            })
        }
        getData()
        watch(() => props.keywords,(newValue) => {
            getData()
        })
        return {
            ...toRefs(state)
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-searchywant{
    padding-top: 10px;
    .searchywant-t{
        font-size: 12px;
        color: $font-authorcolor;
    }
}
</style>