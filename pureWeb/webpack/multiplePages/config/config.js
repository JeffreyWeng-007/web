'use strict'

module.exports = { //开发和正式环境配置参数

  dev : {
    devtool : 'inline-source-map', //可以提高开发环境的构建效率，减少请求数量
    publicPath : '/',
    port : 9090,
    openPage : './pageOne.html'
  },
  build : {
    publicPath : '/',
    prodSourceMap : true,
    devtool : '#source-map' //生成完整的map文件
  }
}
