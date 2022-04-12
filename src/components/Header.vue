<template>
  <nav class="wrap-nav clear" style="-webkit-app-region: drag">
    <div class="wrap-logo clear fl">
      <div class="img-logo fl">
        <img src="../assets/img/logo.png" />
      </div>
      <div class="logo-content fl">
        云音乐
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'loading',
  
})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-nav{
  height: 60px;
  background-color: $headeraudiobg;
  box-sizing: border-box;
  border-bottom: 2px solid rgb(148, 22, 22);
  .wrap-logo{
    height: 100%;
    .img-logo{
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
      img{
        width: 35px;
        height: 35px;
      }
    }
    .logo-content{
      line-height: 58px;
      color: #ffffff;
      font-weight: bold;
      padding-left: 8px;
    }
  }
}
</style>
