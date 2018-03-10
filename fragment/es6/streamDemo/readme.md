## Stream
   `
    将可读流与可写流拆分成一小块一小块chunks，如流水般发送给客户端
    server端不需要一次性缓存所有的数据，读多少发多少，降低server内存消耗
   ` 
   
   - Readable Streams
       - part 1：
         正常情况下，readFile会把整个文件都缓存到内存中，然后才吐给用户
         
       - part 2:
         往readStream里注入数据，只有另一个process.stdout消耗数据，才会清除，否则一直在缓存中
         
       - part 3：
         采用_read()来改善'生产消费'模型，解决没消费，先产生占用缓存问题
         - part 4:
         采用监听的方式来控制
          setTimeout 将其包裹起来，这是为了让系统能有足够时间优先处理接收流结束信号的事务（当然也可以不用）
   - Writable Streams
       - part 5
        
        

参考： https://www.cnblogs.com/dolphinX/p/6285240.html  NodeJS Stream 二：什么是 Stream
      https://zhuanlan.zhihu.com/p/24541167  NodeJS Stream   
  
     