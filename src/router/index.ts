import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../views/Index.vue";
import PodCast from "../views/podcast.vue"
import SongSheet from "../components/index/songsheet.vue"
import RankVersion from "../components/index/rankversion.vue"
import Singer from "../components/index/singer.vue"
import LatestMusic from "../components/index/latestmusic.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    name:'App',
    redirect: "/index/psnlrecommend",
    // meta:{id:1}
  },
  {
    path: "/index",
    name: "Index",
    redirect: "/index/psnlrecommend",
    component: Index,
    children:[
      {
        path: "psnlrecommend", //嵌套路由 1.path路径不能/开头 /开头嵌套路由不会生效
        name: "PsnlRecommend",
        component:() => import("../components/index/PsnlRecommend.vue") //路由懒加载写法 懒加载好处页面按需加载组件用户访问页面效率提高  解决白屏问题
      },
      {
        path: "handtailor", //vue-router4.x 原来require路由懒加载写法报错 替换下面那种 
        name: "handtailor",
        // component: reslove => require(["../components/index/handtailor.vue"],reslove)
        component: () => require.ensure([],(require) => require("../components/index/handtailor.vue"))
      },
      {
        path: "songsheet",
        name: "songsheet",
        component:SongSheet
      },
      {
        path: "rankversion",
        name: "rankversion",
        component:RankVersion
      },
      {
        path: "singer",
        name: "singer",
        component:Singer
      },
      {
        path: "latestmusic",
        name: "latestmusic",
        component:LatestMusic
      },
    ],
  },
  {
    path: "/everydaysongrmd",
    name: "everydaysongrmd",
    component: () => import("../views/everydaysongrmd.vue"),
  },
  {
    path: "/artist",
    name: "artist",
    component: () => import("../views/artist.vue"),
  },
  {
    path: "/albumssheet",
    name: "albumssheet",
    component: () => import("../views/albumssheet.vue"),
  },
  {
    path: "/userinfo",
    name: "userinfo",
    component: () => import("../views/userinfo.vue"),
  },
  {
    path: "/podcast",
    name: "podcast",
    component: PodCast,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
