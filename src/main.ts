import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/reset.css" //重置css样式
createApp(App).use(store).use(router).mount("#app");
