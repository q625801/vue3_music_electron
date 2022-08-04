<template>
  <nav class="wrap-nav" style="-webkit-app-region: drag">
    <div class="nav-logo clear fl">
      <div class="img-logo fl">
        <img src="../assets/img/logo.png" />
      </div>
      <div class="logo-content fl">
        云音乐
      </div>
    </div>
    <div class="nav-routersearch fl">
      <div class="routersearch-router fl">
        <span :class="['arrow left',backUrl ? 'on' : '']" @click="handleback"></span>
        <span :class="['arrow right',forwardUrl ? 'on' : '']" @click="handleforward"></span>
      </div>
      <div class="routersearch-search fl">
        <div class="search-input">
          <input type="text" v-model="keywords" @focus="shinputfocus" @keyup.enter="handleSearchInput" :placeholder="defaultkeyword" inputType="search"/>
        </div>
      </div>
      <SearchDialog v-if="searchdialogFlag" :keywords="keywords" @searchdialogChange="hideSearchDialog"/>
    </div>
  </nav>
</template>

<script>
import { defineComponent,reactive,toRefs,watch } from 'vue'
import { useRouter } from 'vue-router'
import { getJson } from '@/api/apiConfig'
import { getsearchdefault } from '@/api/api'
import SearchDialog from './header/searchdialog'
import { goPage } from '@/utils/common'
export default defineComponent({
  name:'Header',
  components:{
    SearchDialog
  },
  setup(){
    let state = reactive({
      forwardUrl: '',
      backUrl: '',
      defaultkeyword:'',
      searchdialogFlag:false,
      keywords:'',
    })
    let router = useRouter()
    let handleback = () => {
      if(state.backUrl){
        router.go(-1)
      }
    }
    let handleforward = () => {
      if(state.forwardUrl){
        router.go(1)
      }
    }
    let getdefaultkeyword = () => {
      getJson(getsearchdefault,{},res=>{
        if(res.code == 200){
          state.defaultkeyword = res.data.realkeyword
        }
      },err => {

      })
    }
    let shinputfocus = () => {
      state.searchdialogFlag = true
    }
    let hideSearchDialog = (data) => {
      state.searchdialogFlag = data.dialogFlag
      if(data.keywords){
        state.keywords = data.keywords
      }
    }
    let handleSearchInput = () => {
      let dom = document.querySelector('.search-input input')
      if(!state.keywords){
        state.keywords = state.defaultkeyword
      }
      dom.blur()
      state.searchdialogFlag = false
      goPage(router,'/search',{keywords:state.keywords,type:1})
    }
    let init = () => {
      getdefaultkeyword()
    }
    init()
    watch(() => router,(newValue) => {
      let history = newValue.options.history
      state.forwardUrl = history.state.forward
      state.backUrl = history.state.back
    },{immediate:true,deep:true})
    return {
      ...toRefs(state),
      handleback,
      handleforward,
      shinputfocus,
      hideSearchDialog,
      handleSearchInput
    }
  },
})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-nav{
  height: 60px;
  background-color: $headeraudiobg;
  box-sizing: border-box;
  border-bottom: 2px solid rgb(148, 22, 22);
  .nav-logo{
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
  .nav-routersearch{
    height: 100%;
    margin-left: 100px;
    position: relative;
    .routersearch-router{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .arrow{
        width: 25px;
        height: 25px;
        display: inline-block;
        margin: 0 5px;
      }
      .arrow.left{
        background:url("../assets/img/arrow-left3.png") center no-repeat;
        background-size: 100%;
      }
      .arrow.left.on{
        cursor: pointer;
        background:url("../assets/img/arrow-left.png") center no-repeat;
        background-size: 100%;
      }
      .arrow.right{
        background:url("../assets/img/arrow-right3.png") center no-repeat;
        background-size: 100%;
      }
      .arrow.right.on{
        cursor: pointer;
        background:url("../assets/img/arrow-right.png") center no-repeat;
        background-size: 100%;
      }
    }
    .routersearch-search{
      width: 160px;
      height: 32px;
      background: url('../assets/img/search.png') 10px center no-repeat;
      background-size: 16px;
      background-color: $searchbg;
      border-radius: 25px;
      margin-top: 14px;
      box-sizing: border-box;
      padding: 0 30px;
      .search-input{
        height: 100%;
        input{
          background: transparent;
          font-size: 12px;
          height: 100%;
          width: 100%;
          color: $font-color;
        }
      }
    }
  }
}
</style>
