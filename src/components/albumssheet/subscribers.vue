<template>
    <div class="wrap-subscribers">
        <div class="subscribers-list clear" v-for="(item,index) in subscribersData" :key="index" @click="goPage(router,'/userinfo',{id:item.userId})">
            <div class="subscribers-img fl">
                <img v-lazy="item.avatarUrl + '?param=200y200'"/>
            </div>
            <div class="subscribers-content fl">
                <div class="subscribers-user clear">
                    <span class="subscribers-name ellipsis fl">{{item.nickname}}</span>
                    <span :class="['subscribers-sex','fl',item.gender == 2 ? 'female' : '']"></span>
                </div>
                <div class="subscribers-introduction ellipsis" v-if="item.signature">{{item.signature}}</div>
            </div>
        </div>
        <!-- <el-pagination
            small 
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="pageObj.total"
            :page-size="pageObj.pageSize"
            :current-page="pageObj.pageNum"
            class="mt-4 common-pagination"
            v-if="subscribersData && subscribersData.length > 0" >
        </el-pagination> -->
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs }from 'vue'
import { postJson } from '@/api/apiConfig'
import { subscribers } from '@/api/api'
import { useRouter } from 'vue-router'
import { goPage } from '@/utils/common'
export default defineComponent({
    name:'subscribers',
    props:[
        'dataId'
    ],
    setup (props) {
        let state = reactive({
            subscribersData:[],
            pageObj:{
                pageSize:60,
                pageNum:1,
                total:0,
            },
        })
        let getData = () => {
            let offset = state.pageObj.pageSize * (state.pageObj.pageNum - 1)
            postJson(subscribers,{id:props.dataId,offset:offset,limit:state.pageObj.pageSize},(res:any) => {
                if(res.code == 200){
                    state.pageObj.total = res.total
                    state.subscribersData = res.subscribers
                }
            },(err:any) => {

            })
        }
        onMounted(() => {
            getData()
        })
        let router = useRouter()
        return {
            ...toRefs(state),
            router,
            goPage
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-subscribers{
    padding: 30px 30px 0;
    display: flex;
    flex-wrap: wrap;
    .subscribers-list{
        width: 50%;
        margin-bottom: 20px;
        .subscribers-img{
            width: 92px;
            height:92px;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .subscribers-content {
            display: flex;
            height: 100%;
            width: calc(100% - 92px);
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
            padding-left: 7px;
            .subscribers-user{
                .subscribers-name{
                    font-size: 14px;
                    max-width: calc(100% - 14px);
                    margin-right: 5px;
                    box-sizing: border-box;
                    cursor: pointer;
                }
                .subscribers-sex{
                    display:inline-block;
                    width: 14px;
                    height: 14px;
                    background: url('../../assets/img/male.png') center no-repeat;
                    background-size: 100%;
                }
                .subscribers-sex.female{
                    background: url('../../assets/img/female.png') center no-repeat;
                    background-size: 100%;
                }
            }
            .subscribers-introduction{
                padding-top: 15px;
                font-size: 14px;
            }
        }
    }
}
</style>