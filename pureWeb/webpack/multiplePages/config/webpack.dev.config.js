'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const config = require('./config.js')
const webpackBaseConfig = require('./webpack.base.config')

let config_dev = merge(webpackBaseConfig,{
  devServer: {
    clientLogLevel: 'warning',
    hot : true,
    contentBase: path.resolve(__dirname, "public"), //将 public 目录下的文件，作为可访问文件
    publicPath: config.dev.publicPath,
    compress: false, //提供gzip压缩
    port: config.dev.port,
    open: false,
    openPage: config.dev.openPage
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin(),   //使用热更
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

module.exports = config_dev
