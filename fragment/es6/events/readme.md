##事件分发

##Node.js -- events
  `
    如async中提及的，事件监听方式，在涉及流程控制处理上会比较混乱
  `
  - PART 1:
    * 使用.on监听；emit发送
    * once监听器蛮实用，单次监听
    * 注意释放removeListener
    * listeners返回所有监听器
    * 需要单独为error添加接收，否则出错时会直接crash； _emitter.on('error', function(){});_ 
  - PART 2: -- DOMEvents
    * 浏览器中的事件
    
    

## 参考
Node.js EventEmitter接口 http://www.runoob.com/nodejs/nodejs-event.html    