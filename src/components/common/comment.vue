<template>
    <div class="wrap-comment">
        <div class="comment-section">
            <div class="comment-content">
                <textarea></textarea>
                <div class="comment-sub">
                    评论
                </div>
            </div>
            <div class="comment-hotcomment" v-if="hotComments && hotComments.length > 0">
                <div class="comment-tips">精彩评论</div>
                <div class="comment-list clear" v-for="(item,index) in hotComments" :key="index">
                    <div class="comment-img fl">
                        <img :src="item.user.avatarUrl"/>
                    </div>
                    <div class="comment-usertxt fl">
                        <div class="comment-usercontent">
                            <span class="comment-name">{{item.user.nickname}}：</span>{{item.content}}
                        </div>
                        <div class="comment-usercontent comment-beReplied" v-if="item.beReplied.length > 0">
                            <span class="comment-name">{{'@' + item.beReplied[0].user.nickname}}：</span>{{item.beReplied[0].content}}
                        </div>
                        <div class="comment-time-operate clear">
                            <div class="comment-time fl">{{myDate(item.time)}}</div>
                            <div class="comment-operate fr">
                                <span class="likes">{{item.likedCount > 0 ? item.likedCount : ''}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-morehots">更多精彩评论></div>
            </div>
            <div class="comment-tips" v-if="commentData && commentData.length > 0">最新评论({{pageObj.total}})</div>
            <div class="comment-data">
                <div class="comment-all">
                    <div class="comment-list clear" v-for="(item,index) in commentData" :key="index">
                        <div class="comment-img fl">
                            <img :src="item.user.avatarUrl"/>
                        </div>
                        <div class="comment-usertxt fl">
                            <div class="comment-usercontent">
                                <span class="comment-name">{{item.user.nickname}}：</span>{{item.content}}
                            </div>
                            <div class="comment-usercontent comment-beReplied" v-if="item.beReplied && item.beReplied.length > 0">
                                <span class="comment-name">{{'@' + item.beReplied[0].user.nickname}}：</span>{{item.beReplied[0].content}}
                            </div>
                            <div class="comment-time-operate clear">
                                <div class="comment-time fl">{{myDate(item.time)}}</div>
                                <div class="comment-operate fr">
                                    <span class="likes">{{item.likedCount > 0 ? item.likedCount : ''}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <LoadingCpn v-if="commentData && commentData.length == 0"/>
                <el-pagination
                    small 
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="pageObj.total"
                    :page-size="pageObj.pageSize"
                    :current-page="pageObj.pageNum"
                    class="mt-4 comment-pagination"
                    v-if="commentData && commentData.length > 0" >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {postJson} from '@/api/apiConfig'
import {songdetaiilcomment} from '@/api/api'
import { myDate } from '@/utils/common'
import LoadingCpn from "@/components/common/loadingcpn.vue"
export default defineComponent({
    name:'comment',
    components:{
        LoadingCpn
    },
    props:[
        'dataId'
    ],
    setup (props,context) {
        let state = reactive({
            commentData:[],
            pageObj:{
                pageSize:60,
                pageNum:1,
                total:0,
            },
            hotComments:[],
        })
        let getData = () => {
            let offset = state.pageObj.pageSize * (state.pageObj.pageNum - 1)
            postJson(songdetaiilcomment,{id:props.dataId,offset:offset,limit:state.pageObj.pageSize},(res:any) => {
                if(res.code == 200){
                    state.pageObj.total = res.total
                    context.emit('commentTotal',res.total)
                    state.hotComments = res.hotComments
                    state.commentData = res.comments
                }
            },(err:any) => {})
        }
        let handleCurrentChange = (pagenum:number) => {
            state.pageObj.pageNum = pagenum
            state.commentData = []
            state.hotComments = []
            getData()
        }
        onMounted(() => {
            getData()
        })
        return {
            ...toRefs(state),
            handleCurrentChange,
            myDate
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-comment{
    padding: 0 30px;
    .comment-section{
        .comment-content{
            padding: 25px 0 30px;
            overflow: hidden;
            textarea{
                border-radius: 5px;
                width: 100%;
                height: 70px;
                resize: none;
                background-color: rgba(56,56,56);
                color: $font-color;
                font-size: 13px;
                padding: 5px;
                box-sizing: border-box;
            }
            .comment-sub{
                margin-top: 10px;
                float: right;
                font-size: 14px;
                padding: 7px 15px;
                border-radius: 25px;
                border: 1px solid $bodercolor;
                cursor: pointer;
            }
            .comment-sub:hover{
                background-color:$checkhvoerbg;
            }
        }
        .comment-tips{
            font-size: 14px;
            font-weight: bold;
        }
        .comment-data{
            .comment-all{
                
            }
            .comment-pagination{
                padding: 20px 0 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                ::v-deep .btn-next, ::v-deep .btn-prev{
                    background-color:$commentPageNPbtnbg;
                }
                ::v-deep .btn-next, ::v-deep .btn-prev, ::v-deep .el-pager li{
                    border: 1px solid $bodercolor;
                    border-radius: 5px;
                }
                ::v-deep .el-pager li{
                    background-color: transparent;
                }
                ::v-deep .el-pager li:not(.is-disabled):hover{
                    border: none;
                    color: $font-hoverauthorcolor;
                }
                ::v-deep .el-pager li:not(.is-disabled).is-active{
                    background-color: $albumsongsheetinfo_hoverbtnbg;
                    border: 1px solid $bodercolort;
                    color:#ffffff;
                }
                ::v-deep .btn-next:hover:not([disabled]), ::v-deep .btn-prev:hover:not([disabled]) {
                    border: none;
                    background-color: transparent;
                    color: $font-hoverauthorcolor;
                }
                ::v-deep .btn-next:disabled, ::v-deep .btn-prev:disabled{
                    color: $font-authorcolor;
                }
            }
        }
        .comment-list{
            padding: 19px 0;
            border-bottom: 1px solid $bodercolort;
            .comment-img{
                width: 38px;
                height: 38px;
                overflow: hidden;
                border-radius: 50%;
            }
            .comment-usertxt{
                padding-left: 15px;
                width: calc(100% - 38px);
                box-sizing: border-box;
                line-height: 18px;
                .comment-usercontent{
                    font-size: 12px;
                    .comment-name{
                        color: $albumsongsheetinfo_color;
                        cursor: pointer;
                    }
                    .comment-name:hover{
                        color:$albumsongsheetinfo_hovercolor
                    }
                }
                .comment-beReplied{
                    background-color: $hvoerbodybg;
                    padding: 6px 8px;
                    border-radius: 5px;
                    margin-top: 5px;
                    color: $font-authorcolor;
                }
                .comment-time-operate{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 5px;
                    .comment-time{
                        font-size: 12px;
                        color: $font-authorcolor;
                    }
                    .comment-operate{
                        .likes{
                            padding-left: 15px;
                            background: url('../../assets/img/likes.png') left center no-repeat;
                            background-size: 14px;
                            font-size: 12px;
                            color: $font-authorcolor;
                            cursor: pointer;
                        }
                        .likes:hover{
                            background: url('../../assets/img/likes-1.png') left center no-repeat;
                            background-size: 14px;
                            color: $font-hoverauthorcolor;
                        }
                    }
                }
            }
        }
        .comment-list:last-child{
            border: none;
        }
        .comment-none{
            text-align: center;
            font-size: 14px;
            color: $font-authorcolor;
        }
        .comment-hotcomment{
            padding-bottom: 45px;
            .comment-morehots{
                font-size: 13px;
                width: 120px;
                margin: 0 auto;
                text-align: center;
                border: 1px solid $bodercolor;
                line-height: 28px;
                border-radius: 20px;
                cursor: pointer;
                margin-top: 22px;
            }
            .comment-morehots:hover{
                color: $font-hovercolor;
            }
        }
    }
}
</style>