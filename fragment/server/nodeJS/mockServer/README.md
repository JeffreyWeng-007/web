##基于express的测试服务器

###安装
```
1. 安装express
    `$ sudo npm install -g express`
2. 安装生成器
    `$ sudo npm install -g express-generator1
3. 生成项目
    `express mockServer`
4. 进入目录
    `cd mockServer`
5. 安装依赖
    `cnpm install`
6. 启动
    `npm start`
```


### 外网访问网页
1. 下载ngrok

2. 运行三中的服务器

3. 运行./ngrok http localhost:8888 （8888端口对应html的端口）

4. 根据终端提示，打开网页即可。（免费版每次运行，域名会变)

### 说明
- simpleServer.js是建议server的Demo

- supervisor：用来监听代码更改，相当于热更"dev": "supervisor ./bin/www"

- Pug默认的模版引擎 

    `
    app.set('views', './views') // 设置模版文件所在目录
    app.set('view engine', 'pug') // 如果需要使用其他模版
    `
    
- 添加需要加载的web资源路径
    `
    app.use(express.static(path.resolve(__dirname, '../dist')));//添加vue打包文件
    `

- 如果全局拦截，所有网页都跳入某个页面
`
// app.get('*', function (req, res) { //由于是单页面应用，所以直接在这里返回
//   const html = fs.readFileSync(path.resolve(__dirname, '../dist/pageOne.html'),'utf-8')
//   res.send(html)
// })
`

### routes

1. index.js 与 users.js没太大差别
`
    // get
    router.get('/', function(req, res, next) {
      res.redirect('./pageOne.html') 重定向
    });
    // post
    router.post('/pageOne.html',(req, res) => {
      const html = fs.readFileSync(path.resolve(__dirname, '../dist/pageOne.html'),'utf-8')
      res.send(html)
    })
`    
   
2. api接口设计
`
// router.post('/form',(req, res) => {
//   console.log(req.body);
//
//   var response = {
//     'rTitle': 'lh-999 ' + req.body.rTitle,
//     'rText' : 'lh-999 ' + req.body.rText
//   };
//   res.send(JSON.stringify(response))
// })
`
`
$.ajax({
          type: 'POST',
          url: 'http://localhost:8888/form',
          data: {rTitle: this.rtitle,rText: this.rtext},
          dataType: "json",
          success: function (data) {
            that.rtitle = data.rTitle
            that.rtext = data.rText
            console.log('from 8888 :' + JSON.stringify(data))
          }
        })
`

3. socket
```
 /* server */
   var sio = require('socket.io')
   var socket = sio.listen(server)
   socket.on('connection', function (socket) {
     console.log('#server: 连接上socket')
     socket.send('你好')
     socket.on('message', function (msg) {
       console.log('#server: 收到信息： ' + msg)
       socket.send({'messages' : 'sv'+msg})
     })
     socket.on('disconnect', function () {
       console.log('#server: 客户端断开连接')
     })
   })
   
 /* client */
 package.json: "socket.io": "^2.0.4",
 import * as io from 'socket.io-client'
export const socketEmit = ({ state,commit },msg) => {
  if (state.socket == "") {
    state.socket = io.connect('http://localhost:8888')
    state.socket.on('message',function (data) {
      console.log('$client: 收到消息: ' + JSON.stringify(data))
      commit(types.GET_SOCKETMSG, {
        data
      })
    })
    state.socket.on('disconnect',function () {
      console.log('$client: 客户端断开连接')
    })
  }
  console.log('$client: 发送消息：' + msg)
  state.socket.send(msg)
}
``` 
 
4. udp
```
 /** server **/
  var dgram = require('dgram')
  
 var udp = dgram.createSocket('udp4')
 udp.bind('3306',function () {
   console.log('#server-$UDP: PORT:3306 has bind')
 })
 udp.on('message',function (msg, rinfo) {
   console.log('#server-$UDP: ' + msg)
   console.log('#server-$UDP: info: ' + rinfo.port)
   var buf = new Buffer({'messages' : '#server-$UDP:发送：收到信息为：' + msg})
   udp.send(buf,0,buf.length,rinfo.port,rinfo.address)
 })

 /** client **/
 export const udpSocketEmit = ({ state,commit },msg) => {
   if (state.udpSocket == "") {
     state.udpSocket = dgr.createSocket('udp4')
     state.udpSocket.on('message',function (msg,rinfo) {
       console.log('$UDP-client: 收到消息: ' + JSON.stringify(msg))
       console.log('$UDP-client: 服务器信息： ' + rinfo.address +'端口：' + rinfo.port)
       commit(types.GET_SOCKETMSG, {
         msg
       })
     })
   }
   console.log('$UDP-client: 发送消息：' + msg)
   msg = new Buffer(msg)
   state.udpSocket.send(msg, 0, msg.length, 3306, "localhost", function (err, bytes) {
     if (err) console.log('UDP-client: 发送消息失败')
     else console.log('UDP-client: 已发送%d字节数据',bytes)
   })
 }

```
5. /** UDP Broadcast **/
   // var udpBrc = dgram.createSocket('udp4')
   //
   // udpBrc.bind('330694', '192.168.0.17',function () {
   //   console.log('#server-$Bc: PORT:330694 has bind')
   //   udpBrc.setBroadcast(true)
   //   // var buf = new Buffer('#server-$Bc: 广播')
   //   // udpBrc.send(buf, 0, buf.length, 41235, '192.168.0.255')
   // })
   // udpBrc.on('message',function (msg, rinfo) {
   //   console.log('#server-$Bc: ' + msg +'port: ' + rinfo.port)
   //   var buf = new Buffer('#server-$Bc:发送：收到信息为：' + msg)
   //   udpBrc.send(buf,0,buf.length,rinfo.port,rinfo.address)
   // })
   // setInterval(function () {
   //   console.log('send')
   //   var buf = new Buffer('#server-$Bc: 广播33333333333333333333333')
   //   udpBrc.send(buf, 0, buf.length, 41235, '192.168.0.255')
   // },5000)