##模块化

##AMD 模块化
 ` moduleAMD.js`
 ` Asynchronous Module Definition`
 ` AMD模块以浏览器第一的原则发展，采用异步加载模块;`
 ` 对于浏览器必须使用异步，如果模块download时间很长，整个浏览器都会卡死哦。`
 
 - PART 1: 
   * 此方法防止了全局变量污染
   * 使用了立即执行(function(){})(),用new创建也可以
   * 使用return有效隐藏了私有变量count及方法m2
 
 - PART 2:
   * 模块扩展及分割
   * 注意到A处，我们成功的给moduleBlock添加了新方法m3()
   * (window.moduleBlock || {})为了防止moduleBlock未加载;因为测试在node环境，所以未使用window；

 - PART 3:
   * 传入参数，没什么新鲜的,只是很多人这么写。
   
 - PART 4:
   ` 此处使用浏览器环境，使用index.html打开查看输出`
   ` 注意到：html中的 defer async="true" ，是避免加载文件卡住浏览器响应，因此也改成async，其中defer是ie支持的属性`
   ` defer是“渲染完再执行”，async是“下载完就执行”。`
   ` 主模块moduleAMD **data-main="module/moduleAMD"** ` 
  **昨天我们在webstrom中编码，直接run，后发现callback没执行，现在想想，你是在node环境中执行的好么...**

   * AMD规范下的代码(需下载require.js *http://requirejs.org/docs/download.html*)
   * 定义：参见helper
   * 引用：require([module],callback) 
    


##node 模块化
 ` moduleNode.js`
 ` 称为CommonJS标准`
 ` Node.js是运行在服务器端的JavaScript环境中，所以无法在浏览器环境中执行；`
 * CommonJS模块以服务器为准，可使用同步加载;
 * 因为所有的模块都存放在本地硬盘，没有网络延迟嘛。
 
 - Type 1范式与Tpye 2范式皆可(建议用Type 1)，但不能在一个模块中同时使用两种。
 - Type 3错误，exports被重新指向，并未指向module
 
 ##ES6 规范
 ` moduleES6.js`
 ` 使用ES6首先要Babel转换成ES5..这里就不用实际代码演示了`
 
 - html调用模块时，<script type="module" src="./foo.js"></script>加入type="module"属性。
 - Type 4: 不指定模块名称，方便快速引用。此时的customName不需要大括号 import customName from './export-default';
 - Type 5: 继承
 - Type 6: 多模块共享,都弄到一个index中
 - Type 7：import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。
    * 蛮强大，使用了promise，可以看看 http://es6.ruanyifeng.com/#docs/module-loader。

 ##差异
 CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
 
 ##RetainCycle
 `
    模块循环引用
    (a->b) --> (b->a)
    (a->b) --> (b->c) --> (c->a)
 `
 - PART RC CommonJS:
    * require时会执行模块
    * a在遇到require（b）时，代码就停了。在b.js之中，a.js没有执行完毕，只执行了第一行，exports.done = false。
    * main.js执行到第二行时，不会再次执行b.js，而是输出缓存的b.js的执行结果，即它的第四行。
    
 - ES6:   
    * ES6 不需要担心循环引用
    * import时，不会去执行模块，而是只生成一个引用
    * ES6模块不会缓存运行结果，而是动态地去被加载的模块取值
 
 