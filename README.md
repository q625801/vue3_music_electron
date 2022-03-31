# vue3_music_electron

## Project setup
```
npm install
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
1.对vue3-lazy插件源码进行的改动
vue3-lazy/dist/vue-lazy.es5.js  127行新增
this.el.setAttribute('v-lazy',this.state == 1 ? 'loaded' : 'loading')
```
