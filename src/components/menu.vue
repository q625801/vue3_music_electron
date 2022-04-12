
<template>
  <div class="wrap-menu">
    <div class="primary-menu">
        <router-link class="menu-list" :to="item.path" v-for="(item) in MenuList" :key="item.id" :class="item.path == MenuOn ? 'on' : ''">{{item.name}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
    import { ref,onMounted,watch } from 'vue';
    import { useRouter } from 'vue-router'
    export default{
        setup () {
            let router = useRouter()
            let MenuOn = ref('')
            // 定义响应式数据 ref对象
            let MenuList = [
                {
                    name:"发现音乐",
                    path:"/index/psnlrecommend",
                },
                {
                    name:"播客",
                    path:"/podcast",
                },
                {
                    name:"视频",
                    path:"/",
                },
                {
                    name:"关注",
                    path:"/",
                },
                {
                    name:"私人FM",
                    path:"/",
                },
            ]
            watch(() => router,(newValue,oldValue) => {
                MenuOn.value = newValue.currentRoute.value.fullPath
            },{immediate:true,deep:true})
            return {
                MenuList,
                MenuOn,
            }
        }
    }
</script>
<style scoped lang="scss">
    .wrap-menu{
        height: 100%;
        background-color: $headeraudiobg;
        padding: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgb(67, 67, 67);
        .primary-menu{
            .menu-list{
                display: block;
                font-size: 16px;
                color: $font-color;
                width: 100%;
                height: 36px;
                line-height: 36px;
                padding: 0 0 0 8px;
                cursor: pointer;
                border-radius: 5px;
                margin-bottom: 2px;
                box-sizing: border-box;
            }
            .menu-list:hover{
                background: $hvoerbodybg;
                color: $font-hovercolor;
            }
            .menu-list.on{
                font-weight: bold;
                font-size: 18px;
                background: $hvoerbodybg;
                color: $font-color;
            }
        }
    }
</style>