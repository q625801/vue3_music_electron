<template>
    <div class="wrap-userrecord">
        <div class="userrecord-tabs clear">
            <span :class="['fl',tabsOn == index ? 'on' : '']" v-for="(item,index) in tabs" :key="index" @click="changeTabs(index)">{{item}}</span>
        </div>
        <div class="userrecord-section">
            <div class="userrecord-create-collection" v-show="tabsOn == 0 || tabsOn == 1">
                <UserSongSheet :type="tabsOn == 0 ? 'create' : 'collection'" :userId="props.userId"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref,defineProps } from "vue";
import UserSongSheet from './components/usersongsheet'
// import UserDj from './components/userdj' 未找到未登录情况下用户相关播客接口
const props = defineProps(['userId'])
let tabsOn = ref(0)
let tabs = [
    '创建的歌单',
    '收藏的歌单',
    // '收藏的播客',
    // '创建的音乐专栏'
]
let changeTabs = (index) => {
    tabsOn.value = index
}
</script>
<style scoped lang="scss">
.wrap-userrecord{
    padding-top: 35px;
    .userrecord-tabs{
        span{
            display: block;
            color: $font-color;
            margin-right: 20px;
            cursor: pointer;
            line-height: 40px;
            font-size: 14px;
        }
        span:hover{
            color: $font-hovercolor;
        }
        span.on{
            font-size: 18px;
            font-weight: bold;
            color: $font-color;
            background: url("../../assets/img/index_line.jpg") bottom center no-repeat;
            background-size: 75% 3px;
        }
    }
    .userrecord-section{
        padding-top: 10px;
    }
}
</style>