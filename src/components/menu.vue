<template>
  <div class="wrap-menu">
    <div class="primary-menu">
        <span class="on">发现音乐</span>
        <span>发现音乐</span>
        <span>发现音乐</span>
        <span>发现音乐</span>
    </div>
  </div>
</template>

<script lang="ts">
    import { Vue } from "vue-class-component";
    export default class Home extends Vue {
        
    }
</script>
<style scoped lang="scss">
    .wrap-menu{
        height: 100%;
        background-color: rgb(43,43,43);
        padding: 12px;
        box-sizing: border-box;
        .primary-menu{
            span{
                display: block;
                font-size: 16px;
                color: #ffffff;
                width: 100%;
                height: 36px;
                line-height: 36px;
                padding: 0 0 0 8px;
                cursor: pointer;
                border-radius: 5px;
                margin-bottom: 2px;
                box-sizing: border-box;
            }
            span:hover{
                background: rgb(51,51,51);
            }
            span.on{
                font-weight: bold;
                font-size: 18px;
                background: rgb(51,51,51);
            }
        }
    }
</style>