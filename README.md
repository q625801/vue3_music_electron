# vue3_music_electron

## Project setup
```
cnpm install
vue add electron-builder

```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Tips
```
1.下面博客解决安装electron压缩包超时/失败/慢的问题
https://blog.csdn.net/u010599953/article/details/105273017

2.对vue3-lazy插件源码进行的改动
vue3-lazy/dist/vue-lazy.es5.js  127行新增
this.el.setAttribute('v-lazy',this.state == 1 ? 'loaded' : 'loading')

3.Error: Electron failed to install correctly, please delete node_modules/electron and try installing
此报错解决方案 进入此依赖文件夹执行命令npm install即可
```

### 问题记录
```
1.歌手页面当前播放的歌曲在热门歌曲和专辑里如果同时存在两个状态都会高亮但网易云中不会 (待修复)
2.用户详情(userinfo.vue)页面查看xxx喜欢的音乐跳转歌单详情页面接口返回400需要登录才能查询
2.用户详情(userinfo.vue)创建的歌单和收藏的歌单下拉加载还存在问题因这俩数据通过同一个接口
中获取通过userid判断区分到底是自己创建的还是收藏别人创建的歌单
(问题 1.分页过程中别人创建的歌单可能在很后面几页点击切换重置分页属性后第一页查询的全是
自己创建的导致切换到收藏的歌单时无法下拉加载数据其实存在数据但因为他在很后面几页
优化方案1.一次性获取所有数据JS做过滤和分页处理) 后续待优化
```
