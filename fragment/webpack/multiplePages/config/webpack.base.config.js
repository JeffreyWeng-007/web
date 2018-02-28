'use strict'
const webpack = require('webpack')
const path = require('path')
const config = require('./config.js')
const utils = require('./utils.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const entryJSON = require('./entryJSON.json')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let cssLoader = utils.cssLoaders()

let entry = {} //通过配置表生成入口
let plugins = [//自动加载模块
  new webpack.ProvidePlugin({
      $: 'jquery'
  }),
  new CleanWebpackPlugin(
    path.resolve(__dirname, '../dist/*'),
    {
      root: path.resolve(__dirname, '../'),       　　　　　　　　　　//根目录
      verbose:  true        　　　　　　　　　　//开启在控制台输出信息
    }
  )]  //生成插件实例
entryJSON.map(page => {
    //生成入口文件
    entry[page.filename] = `${page.basePath}js/${page.filename}.js`
    console.log('chunk :' + page.chunk)
    //将入口文件引入到html文件中
    plugins.push(new HtmlWebpackPlugin(utils.webpackHtml(page.basePath, page.filename, page.chunk)))
})


module.exports = {
    resolve: {
        alias: {  //定义常用目录
            '@': resolve('public'),
        }
    },
    context: path.resolve(__dirname, '../'), //会影响到entry和loader文件路径
    entry: entry,  //入口文件
    output: {  //打包完成后的出口文件
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash].js',
        publicPath: process.env.NODE_ENV === 'prod' ? config.build.publicPath : config.dev.publicPath                     //加载外部资源（如图片、文件等）  相对 URL(relative URL) 会被相对于 HTML 页面（或 <base> 标签）解析
    },
    devtool: process.env.NODE_ENV === 'prod' ? config.build.devtool : config.dev.devtool,
    module: {
        rules: [
            ...cssLoader,
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,           //文件大小比设置值小时，会转化为base64格式
                            name: 'img/[name].[ext]?[hash]'   //路径+名称
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }
            }
        ]
    },
    plugins: plugins
};
