## Stream
   `
    将可读流与可写流拆分成一小块一小块chunks，如流水般发送给客户端
    server端不需要一次性缓存所有的数据，读多少发多少，降低server内存消耗
    stream本身也是 EventEmitter实例
   ` 

### 基础篇   
    `
     Readable: 可读流
     Writable: 可写流
     Duplex： 可读可写流
     Transform： 转换流 （可读可写）
     
     ／**需要采用toString（)转换**／
     push(DATA)，其中data只能是String或Buffer
     .on(data) 消耗时data事件输出的数据都是Buffer类型      
          
     write(data)  data只能是String或Buffer类型
     _write(data)调用时传进来的data都是Buffer类型    
    
    
    ／**使用objectMode选项，输入什么就是什么类型，不会转成Buffer
    const readable = Readable({ objectMode: true })
    `

   - Readable Streams
       `
        复写 _read()
        供下游消耗： push(data)
        结束流： push(null)
       ` 
   
       - part 1： （不采用）
         正常情况下，readFile会把整个文件都缓存到内存中，然后才吐给用户
         
       - part 2:
         往readStream里注入数据，只有另一个process.stdout消耗数据，才会清除，否则一直在缓存中
         ._read() 系统底层开始读取数据流时才会不断调用，减少缓存冗余
         
       - part 4 Type 2：
         采用_read()来改善'生产消费'模型，解决没消费，先产生占用缓存问题
         
       - part 4:
         * 采用pipe方式消耗  
         
         * 采用监听的方式来控制
          setTimeout 将其包裹起来，这是为了让系统能有足够时间优先处理接收流结束信号的事务（当然也可以不用）
          
   - Writable Streams
       - part 5
        
   - Duplex Streams
        同时拥有可写、可读
        
   - Transform
        duplex 中的可读流数据（0，1）与可写流中的（a，b）是隔离开的。
        可通过Transform将可写端写入的数据经变换后**自动添加**到可读端
        

### 进阶篇
   
   - 消耗方调用read促使流输出数据，流通过_read使底层调用push方法将数据传给流
   - 如果流在流动模式下（state.flowing为true）输出数据，数据会自发通过data事件输出，不需要反复调用read（n）
   - 如果调用push方法时缓存为空，则当前数据即为下一个需要的数据。
   - 执行read后，调用_read，如果从缓存中取到数据，就以data事件输出。       
   
   - 如果_read异步调用push时发现缓存为空，则意味着当前数据是下一个需要的数据，且不会被read方法输出，应当在push方法中立即以data事件输出。
          
        

参考： https://www.cnblogs.com/dolphinX/p/6285240.html  NodeJS Stream 二：什么是 Stream
      https://zhuanlan.zhihu.com/p/24541167  NodeJS Stream   
      https://zhuanlan.zhihu.com/p/21681090  美团Stream
     