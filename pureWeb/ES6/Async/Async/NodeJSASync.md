##关于异步

- JS是单线程语言，只有一个事件队列；所以当你使用一个while就能够卡住程序。
- JS能异步是因为调用的模块是异步非阻塞的。
  当发送一个异步网络请求后，js主线程不会等待返回，直接执行事件队列里的下一个事件；
  等到接收后，把接收事件放到队列末尾。
- 《认识回调顺序》
`` 第一步，执行第一行，注意此时会将这个操作暂时存储到其他地方，因为setTimeout是一个异步执行操作。
   第二步，执行第二行，将结果line 2打印出来
   第三步，执行第三行，将结果line 3打印出出来
   第四步，等待最后一行程序（一共三行）都全部执行完了，然后立马实时查看刚才暂存的异步操作有没有。如果有可执行的，就立即拿到出来继续执行。
   第五步，执行完毕之后，再实时查看暂存位置中是否还有未执行的异步回调 ``
  
##jquery异步解决方案
见PART2

##deferred方案
见PART3
属性：
- dtd.resolve dtd.reject 主动触发用来改变状态（成功或者失败）
- dtd.then dtd.done dtd.fail 状态变化之后才会触发的监听函数
怎么理解？

##Promise方案
见PART4
* 为什么用promise会比deferred好？因为promise没有resolve及reject。所以
不用担心有人把主动触发与监听混在一起了.
  
##ES6 Promise  
* PART5 ES6标准的Promise，以后就用这种了
* PART6及以下均为应用
    * 此处没有用then的第二个参数，即reject触发的操作。我们推荐用catch来获取错误
    * 注意到（A）处，我们使用后，发现后面的then仍然会被触发，打印"PART 6 参数传递: undefined"
    * then返回的数据会被接下来的then获取到
* PART 7
    * 需求：等待result2读取完成后，才去读result3
    **then返回的是Promise对象，后面的then将会被当做这个返回的Promise的第一个then来对待**
    **如果不理解的话，想象一下，返回值是Promise类型时，promise.then那当然就是当前result3的then咯,而且我猜测，之后的都是result3的then**
* PART 8
    * 需求：1. all:等待所有完成后再执行。 2.race：其中一个执行完即可


##关于require
  此次无需关注，下次见分晓    
  
  
##总结
    搞定。
  
  参考：
  http://new-play.tudou.com/v/614934580.html?   《what the hack is event loop》老外的关于EventLoop视频
  http://www.ruanyifeng.com/blog/2014/10/event-loop.html 阮一峰的EventLoop详解