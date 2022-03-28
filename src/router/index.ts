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
        component:() => import("../components/index/PsnlRecommend.vue")
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
