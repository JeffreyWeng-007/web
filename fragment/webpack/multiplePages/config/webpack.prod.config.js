'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils.js')
const config = require('./config.js')
const webpackBaseConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')


let config_prod = merge(webpackBaseConfig,{
  devtool: config.build.prodSourceMap ? config.build.devtool : false,    //为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码。
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({  //提取公共的JavaScript文件，尽量将不常修改的文件打包为一个，让浏览器多使用缓存
      names : ['chunk'],
      filename : 'js/[name].[hash].js',
      minChunks: 2
    }),
    new ExtractTextPlugin({ //提取css为单独文件
      filename: 'css/[name].[hash].css'
    }),
    new UglifyJsPlugin({ //压缩JS
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.prodSourceMap ,
      parallel: true
    }),
    new OptimizeCSSPlugin({ //压缩CSS
      cssProcessorOptions: config.build.prodSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ]
})

module.exports = config_prod
