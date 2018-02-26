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
   
- 线程执行方式（当同步执行就是没有异步执行)
   （1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
   
   （2）主线程之外，还存在一个"任务队列"（task queue,先进先出）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
   
   （3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
       注意任务队列不是一次性执行完，而是由Event Loop来控制。这样才有时间运行stack中的代码。
   （4）主线程不断重复上面的第三步。
  
  ![(node)](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png?raw=true)
  
- Node.js的运行机制如下。
    （1）V8引擎解析JavaScript脚本。
 
    （2）解析后的代码，调用Node API。
 
    （3）libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。
 
    （4）V8引擎再将结果返回给用户。
 
- 两个有意思的方法
    * process.nextTick 当前"执行栈"尾部调用；也就是所有的"任务队列"前，触发此回调（插队的意思）。
    * setImmediate 在当前"任务队列"的尾部添加事件，也就是在下一次Event Loop时执行。与下面类似。
    * setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。
    * 多个process.nextTick语句总是在当前"执行栈"一次执行完，多个setImmediate可能则需要多次loop才能执行完。
   
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
* PART6 ES6标准的Promise，以后就用这种了
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