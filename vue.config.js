module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    host:'0.0.0.0',
    port:8888,
    https:false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      },
    },
  },
  css:{
    loaderOptions:{
      sass:{
        prependData: `@import "@/assets/css/peeling.scss";`
      }
    }
  },
  pluginOptions:{
    electronBuilder:{
      nodeIntegration: true
    }
  }
}