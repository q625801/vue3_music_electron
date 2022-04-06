import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/reset.css" //重置css样式
import "../src/assets/css/style.css" //重置css样式
import Axios from "axios";
import VueAxios from 'vue-axios'
import lazyPlugin from 'vue3-lazy'
import ElementPlus from 'element-plus'
createApp(App).use(store).use(router).use(VueAxios,Axios).use(lazyPlugin,{
    loading: require('./assets/img/loading.gif'),//加载中图片，一定要有，不然会一直重复加载占位图
    error: require('./assets/img/loading.gif')  //加载失败图片
}).use(ElementPlus).mount("#app");
