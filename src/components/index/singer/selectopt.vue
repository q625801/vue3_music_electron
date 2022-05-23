<template>
    <div class="wrap-selectopt">
        <div class="selectopt-option">
            <div class="option-list clear" v-for="(item,index) in selectOption" :key="index">
                <div class="option-title fl">
                    {{item.name}}：
                </div>
                <div class="option-cat fl clear">
                    <div class="fl" v-for="(item2,index2) in item.children" :key="index2+10">
                        <span @click="changeOption(item.type,item2.data)" :class="[item.type == 'languages' ? (item2.data == params.languages ? 'on' : '') : '',item.type == 'classify' ? (item2.data == params.classify ? 'on' : '') : '',item.type == 'screen' ? (item2.data == params.screen ? 'on' : '') : '']">{{item2.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,reactive,toRefs } from 'vue'
import { option } from './optiondata.js'
export default defineComponent({
    name:'handtailor',
    setup (props,context) {
        let state = reactive({
            selectOption:option,
            params:{
                languages:'-1',
                classify:'-1',
                screen:'',
            }
        })
        let changeOption = (type,data) => {
            switch (type) {
                case 'languages':
                    state.params.languages = data
                    context.emit('notice',state.params)
                    break;
                case 'classify':
                    state.params.classify = data
                    context.emit('notice',state.params)
                    break;
                case 'screen':
                    state.params.screen = data
                    context.emit('notice',state.params)
                    break;
                default:
                    break;
            }
        }
        context.emit('notice',state.params)
        return {
            ...toRefs(state),
            changeOption
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-selectopt{
    padding-top: 8px;
    .selectopt-option{
        .option-list{
            font-size: 12px;
            margin-bottom: 5px;
            .option-title{
                width: 36px;
                padding: 4px 0;
            }
            .option-cat{
                width: calc(100% - 36px);
                div{
                    min-width: 63px;
                    text-align: center;
                    background: url('../../../assets/img/index_line2.jpg') right center no-repeat;
                    background-size: 1px 12px;
                    margin-bottom: 5px;
                    span{
                        display: inline-block;
                        padding: 4px 10px;
                        border-radius: 25px;
                        color: $font-authorcolor;
                        cursor: pointer;
                    }
                    span:hover{
                        color: $font-hovercolor;
                    }
                    span.on{
                        color: #EC4141;
                        background: rgba(236, 65, 65, 0.1);
                    }
                }
            }
        }
    }
}
</style>