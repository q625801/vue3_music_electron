<template>
    <div class="wrap-info">
        <div class="info-section clear" v-if="playlist">
            <div class="info-img clear fl">
                <img v-lazy="playlist.coverImgUrl+'?param=300y300'"/>
            </div>
            <div class="info-topblk fl">
                <div class="topblk-tagtitle clear">
                    <span class="tag fl">歌单</span>
                    <span class="title fl">{{playlist.name}}</span>
                </div>
                <div class="topblk-userinfo clear">
                    <div class="topblk-userinfo-img fl">
                        <img v-lazy="playlist.creator.avatarUrl + '?param=100y100'"/>
                    </div>
                    <div class="topblk-userinfo-name fl">
                        {{playlist.creator.nickname}}
                    </div>
                    <div class="topblk-userinfo-createtime fl">
                        {{myDate(playlist.createTime)}}创建
                    </div>
                </div>
                <div class="topblk-btn clear">
                    <div class="btn-playall fl clear">
                        <span class="btn-apply fl">播放全部</span>
                        <span class="btn-add fl">+</span>
                    </div>
                    <div class="btn-fav fl">
                        <span>收藏({{countchange(playlist.subscribedCount)}})</span>
                    </div>
                </div>
                <div class="topblk-lable">
                    <div class="lable-list" v-if="playlist.tags.length > 0">
                        标签：
                        <span v-for="(item,index) in playlist.tags" :key="index">
                            {{index != 0 ? ' / ' : ''}}
                            <em>{{item}}</em>
                        </span>
                    </div>
                    <div class="lable-list clear">
                        <span class="lable-t fl">歌曲：<em>{{playlist.trackCount}}</em></span>
                        <span class="lable-t fl">播放：<em>{{countchange(playlist.playCount)}}</em></span>
                    </div>
                    <div class="lable-list" v-if="playlist.description">
                        <div :class="[descriptionShow ? 'on' : '','label-des']">
                            <span>简介：</span>{{playlist.description}}
                        </div>
                        <div v-if="playlist.description.length > 38" :class="[descriptionShow ? 'on' : '','lable-arror','amn4']" @click="changedescription"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,watch } from 'vue'
import { myDate,countchange } from "@/utils/common"
export default defineComponent({
    name:'albumsongsheetinfo',
    props:[
        'detailinfo',
    ],
    setup (props) {
        let state = reactive({
            playlist:'',
            descriptionShow: false,
        })
        let changedescription = () => {
            state.descriptionShow = !state.descriptionShow
        }
        watch(() =>props.detailinfo,(newValue) => {
            state.playlist = newValue
        },{immediate:true,deep:true})
        return {
            ...toRefs(state),
            myDate,
            countchange,
            changedescription,
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-info{
    padding: 0 30px;
    .info-section{
        .info-img{
            width: 185px;
            height: 185px;
            border-radius: 7px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
        .info-topblk{
            padding-left: 20px;
            width: calc(100% - 185px);
            box-sizing: border-box;
            padding-top: 5px;
            .topblk-tagtitle{
                span{
                    display: block;
                }
                .tag{
                    color:$musicNameOn;
                    font-size: 12px;
                    border:1px solid $musicNameOn;
                    padding: 3px 4px;
                    border-radius: 3px;
                }
                .title{
                    font-weight: bold;
                    color: $font-color;
                    font-size: 22px;
                    padding-left: 8px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    display: -webkit-box;
                    width: calc(100% - 34px);
                    box-sizing: border-box;
                }
            }
            .topblk-userinfo{
                padding-top: 10px;
                .topblk-userinfo-img{
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                .topblk-userinfo-name{
                    font-size: 12px;
                    color: $albumsongsheetinfo_color;
                    cursor: pointer;
                    line-height:25px;
                    padding-left: 8px;
                }
                .topblk-userinfo-name:hover{
                    color: $albumsongsheetinfo_hovercolor;
                }
                .topblk-userinfo-createtime{
                    font-size: 12px;
                    color: $font-authorcolor;
                    line-height:25px;
                    padding-left: 8px;
                }
            }
            .topblk-btn{
                margin:12px 0;
                .btn-playall{
                    height: 32px;
                    box-sizing: border-box;
                    width: 140px;
                    background-color: rgba($musicNameOn, .9);
                    border-radius: 25px;
                    padding-left: 21px;
                    box-sizing: border-box;
                    cursor: pointer;
                    margin-right: 10px;
                    .btn-apply,.btn-add{
                        color: #ffffff;
                        display: block;
                    }
                    .btn-apply{
                        width: 75%;
                        height: 32px;
                        line-height:32px;
                        font-size: 14px;
                        background: url("../../assets/img/player-btn5.png") left center no-repeat;
                        background-size: 11px;
                        padding-left: 20px;
                        box-sizing: border-box;
                    }
                    .btn-add{
                        width: 25%;
                        height:31px;
                        box-sizing: border-box;
                        border-left: 1px solid rgba(255,255,255,.2);
                        text-align: center;
                        line-height:32px;
                        font-size: 24px;
                    }
                }
                .btn-playall:hover{
                    background-color: rgba($musicNameOn, .8);
                }
                .btn-fav{
                    height: 32px;
                    font-size: 14px;
                    line-height: 32px;
                    border-radius: 25px;
                    border: 1px solid $bodercolor;
                    padding: 0 12px;
                    cursor: pointer;
                    span{
                        display: block;
                        background: url("../../assets/img/collection.png") left center no-repeat;
                        background-size: 16px;
                        padding-left: 20px;
                    }
                }
                .btn-fav:hover{
                    background-color:$checkhvoerbg;
                }
            }
            .topblk-lable{
                .lable-list{
                    position: relative;
                    font-size: 13px;
                    line-height: 20px;
                    em{
                        cursor: pointer;
                        color: $albumsongsheetinfo_color;
                    }
                    em:hover{
                        color: $albumsongsheetinfo_hovercolor;
                    }
                    .lable-t{
                        margin-right: 12px;
                        em{
                            color:$font-authorcolor;
                            cursor: default;
                        }
                    }
                    .label-des{
                        margin-right: 12px;
                        color:$font-authorcolor;
                        white-space: pre-wrap;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        display: -webkit-box;
                        span{
                            color:$font-color;
                        }
                    }
                    .label-des.on{
                        display:block;
                    }
                    .description{
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                        display: -webkit-box;
                    }
                    .lable-arror{
                        position: absolute;
                        right: 0;
                        top: 3px;
                        width: 14px;
                        height: 14px;
                        background: url("../../assets/img/arror.png") center no-repeat;
                        background-size: 100%;
                        cursor: pointer;
                    }
                    .lable-arror.on{
                        transform: rotate(180deg);
                    }
                }
            }
        }
    }
}
</style>