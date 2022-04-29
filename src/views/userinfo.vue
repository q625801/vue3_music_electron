<template>
    <div class="wrap-userinfo">
        <div class="userinfo-top clear" v-if="userinfodata">
            <div class="userinfo-img fl">
                <img v-lazy="userinfodata.profile.avatarUrl + '?param=200y200'"/>
            </div>
            <div class="userinfo-detail fl">
                <div class="userinfo-name">{{userinfodata.profile.nickname}}</div>
                <div class="userinfo-tag-btn clear">
                    <div class="userinfo-tag fl clear">
                        <span class="tag-level fl">{{'Lv' + userinfodata.level}}</span>
                        <span :class="['tag-gender',userinfodata.profile.gender == 2 ? 'female' : '','fl']"></span>
                    </div>
                    <div class="userinfo-btn fl">

                    </div>
                </div>
                <div class="userinfo-box clear">
                    <div class="userinfo-box-list fl">
                        <strong class="fan_count">{{userinfodata.profile.eventCount}}</strong>
                        <span class="cn">动态</span>
                    </div>
                    <div class="userinfo-box-list fl">
                        <strong class="fan_count">{{userinfodata.profile.follows}}</strong>
                        <span class="cn">关注</span>
                    </div>
                    <div class="userinfo-box-list fl">
                        <strong class="fan_count">{{userinfodata.profile.followeds}}</strong>
                        <span class="cn">粉丝</span>
                    </div>
                </div>
                <div class="userinfo-inf">
                    <p>个人介绍：<em>{{userinfodata.profile.signature}}</em></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import { postJson } from '@/api/apiConfig'
import { userdetail } from '@/api/api'
import { useRouter } from 'vue-router'
export default defineComponent({
    name:'userinfo',
    props:[],
    setup () {
        let router = useRouter()
        let state = reactive({
            userinfodata: '',
            id: router.currentRoute.value.query.id,
        })
        let getData = () => {
            postJson(userdetail,{uid:state.id},(res:any) => {
                if(res.code == 200){
                    state.userinfodata = res
                }
            },(err:any) => {

            })
        }
        onMounted(() => {
            getData()
        })
        return {
            ...toRefs(state),
        }
    }
})
</script>
<style scoped lang="scss">
.wrap-userinfo{
    padding: 30px;
    .userinfo-img{
        width: 185px;
        height: 185px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .userinfo-detail{
        width: calc(100% - 185px);
        box-sizing: border-box;
        padding-left: 20px;
        .userinfo-name{
            font-weight: bold;
            font-size: 20px;
        }
        .userinfo-tag-btn{
            padding: 14px 0;
            position: relative;
            border-bottom: 1px solid $bodercolor;
            .userinfo-tag{
                .tag-level{
                    color: $font-authorcolor;
                    font-size: 12px;
                    background-color: #F0F0F0;
                    padding: 0px 7px;
                    border-radius: 20px;
                    display: inline-block;
                    line-height: 16px;
                }
                .tag-gender{
                    display:inline-block;
                    width: 16px;
                    height: 16px;
                    background: url('../assets/img/male.png') center no-repeat;
                    background-size: 100%;
                    margin-left: 5px;
                }
                .tag-gender.female{
                    background: url('../assets/img/female.png') center no-repeat;
                    background-size: 100%;
                }
            }
        }
        .userinfo-box{
            padding-top: 20px;
            .userinfo-box-list{
                text-align: center;
                padding: 0 30px;
                border-right: 1px solid $bodercolor;
                .fan_count{
                    display: block;
                    // font-weight: bold;
                    font-size: 20px;
                }
                .cn{
                    display: block;
                    font-size: 12px;
                    color: $font-authorcolor;
                    padding-top: 5px;
                }
            }
            .userinfo-box-list:first-child{
                padding-left: 0;
            }
            .userinfo-box-list:last-child{
                border: none;
            }
        }
        .userinfo-inf{
            p{
                font-size: 13px;
                line-height: 20px;
                padding-top: 8px;
                em{
                    color: $font-authorcolor;
                }
            }
        }
    }
}
</style>