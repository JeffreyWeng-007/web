#package.json配置说明
  cross-env: 通过json配置的参数，设置环境变量
  --inline: webpack-dev-server有两种模式支持自动刷新——iframe模式和inline模式
  --progress 显示打包过程中的进度，colors打包信息带有颜色显示


# sharePro-multi-wep
基于webpack的多页面web项目

##  安装及运行
### 一：开发模式
1. cnpm install

2. npm run dev
   *浏览器会自动打开9090端口的网页*
   *支持热加载功能*

### 二：生产模式
1. 修改入口文件 ./config/entryJSON.json;
   其中：chunk代表“是否使用通用插件（所有文件调用超过2次时定义为通用插件）”

2. npm run build
   值得注意的是，我打包生成的资源文件读取路径采用的是绝对路径，所以无法直接打开./dist中的问题；
   若想直接打开，修改./config/config.js/build.publicPath为'/'即可

### 三：nodeJS服务器
   使用nodeJS搭建了个后端服务器,代码如backend，地址为localhost:8888/ + '具体网页地址';
   *如localhost:8888/login.html*
1. cd backend

2. cnpm install

3. npm run dev

4. 更新代码
   *每次都要在二中重新build*


### 四：外网访问网页
1. 下载ngrok

2. 运行三中的服务器

3. 运行./ngrok http localhost:8888

4. 根据终端提示，打开网页即可。（免费版每次运行，域名会变)

## html文件修改
*  base.js改成了CommonJS规范。
   参考login.html及manageInfo
*
1. JS中的图片
   图片要使用import加载资源，然后赋值到src（注意：如果js使用的是commonjs样式，要用let x= require('xxx.png'))

2. CSS引用
   使用require('../css/XX.css')在js中引用。使用ExtractTextPlugin插件能够将css从js中抽离，并加载到html中

3. html及css中的图片
   使用url-loader能够自己定向。转成base64

4. 使用css文件background-image: url('xx.png');给标签<i>添加背景失败,使用js设置src即可

5. 页面跳转 window.location.href = 'venderManager.html';


