const ExtractTextPlugin = require('extract-text-webpack-plugin') //抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const config = require('./config.js')

let utils = {}

//自动生成HTML的实例 --- 工厂函数 path为相对于根目录的路径，name为文件名，others是除主JS外的依赖
utils.webpackHtml = function(path,name,others){
  others.push(name)
  let prodTemp =  {
                    filename : name + '.html',  //定义该实例以哪个html文件为模版
                    template :  path + name + '.html',  //定义生成的html文件输出的文件名
                    inject : true,  //引入到底部
                    hash : true,    //为静态资源生成hash值
                    minify : {
                      removeAttributeQuotes: true, //去除属性引号
                      removeComments: true,   //去除注释
                      collapseWhitespace: true //合并空白
                    },
                    cache : true,    //有内容变化才会生成新文件
                    chunks : others,  //选择引入的文件
                    chunksSortMode : 'manual' //按照chunks顺序引入
                  }
  let devTemp = {
                  filename : name + '.html',
                  template :  path + name + '.html',
                  inject : true,
                  chunks : [name]
                }
  return process.env.NODE_ENV === 'prod' ? prodTemp : devTemp
}

utils.cssLoaders = function (){ //开发调试，css不需要提取出来
  let prodCssLoader =  [
                          {
                            test: /\.css$/,
                            use: ExtractTextPlugin.extract({ //使用ExtractTextPlugin提取CSS文件，不再嵌入到js中。嵌入到html中，防止flash
                              fallback: "style-loader",
                              use: "css-loader"
                            })
                          },
                          {
                            test: /\.scss$/,
                            use: ExtractTextPlugin.extract({
                              fallback: 'style-loader',
                              use: ['css-loader', 'sass-loader']
                            })
                          }
                        ]
  let devCssLoader = [
                        {
                          test: /\.css$/,
                          use: [{
                              loader: "style-loader" // creates style nodes from JS strings
                          }, {
                              loader: "css-loader" // translates CSS into CommonJS
                          }]
                        },
                        {
                          test: /\.scss$/,
                          use: [{
                                loader: "style-loader" // creates style nodes from JS strings
                            }, {
                                loader: "css-loader" // translates CSS into CommonJS
                            }, {
                                loader: "sass-loader" // compiles Sass to CSS
                          }]
                        }
                      ]
  return process.env.NODE_ENV === 'prod' ? prodCssLoader : devCssLoader
}

module.exports = utils
