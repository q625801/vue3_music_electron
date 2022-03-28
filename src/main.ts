import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/reset.css" //重置css样式
import "../src/assets/css/style.css" //重置css样式
import Axios from "axios";
import VueAxios from 'vue-axios'
createApp(App).use(store).use(router).use(VueAxios,Axios).mount("#app");
