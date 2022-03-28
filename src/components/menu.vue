
<template>
  <div class="wrap-menu">
    <div class="primary-menu">
        <router-link class="menu-list" :to="item.path" v-for="(item) in MenuList" :key="item.id" :class="item.id == MenuOn ? 'on' : ''" @click="MenuChange(item.id)">{{item.name}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
    import { ref } from 'vue';
    export default{
        setup () {
            // 定义响应式数据 ref对象
            let MenuOn = ref(1)
            let MenuList = [
                {
                    id:1,
                    name:"发现音乐",
                    path:"/",
                },
                {
                    id:2,
                    name:"播客",
                    path:"/podcast",
                },
                {
                    id:3,
                    name:"视频",
                    path:"/",
                },
                {
                    id:4,
                    name:"关注",
                    path:"/",
                },
                {
                    id:5,
                    name:"私人FM",
                    path:"/",
                },
            ]
            let MenuChange = (MenuId:any) => {
                MenuOn.value = MenuId
            }
            return {
                MenuList,
                MenuOn,
                MenuChange
            }
        }
    }
</script>
<style scoped lang="scss">
    .wrap-menu{
        height: 100%;
        background-color: rgb(43,43,43);
        padding: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgb(67, 67, 67);
        .primary-menu{
            .menu-list{
                display: block;
                font-size: 16px;
                color: rgb(214,214,214);
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
                background: rgb(51,51,51);
                color: #ffffff;
            }
            .menu-list.on{
                font-weight: bold;
                font-size: 18px;
                background: rgb(51,51,51);
                color: rgb(214,214,214);
            }
        }
    }
</style>