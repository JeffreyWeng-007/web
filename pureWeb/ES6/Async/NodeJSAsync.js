/**
 *
 * 跟着readme节奏走
 *
 * **/

(function () {

  /**PART 1**/
  /*认识回调顺序*/
  setTimeout(console.log, 0, 'a')
  console.log('b')
  console.log('c')
  // 答案是b c a

  /**PART 2**/

  /*忽略这代码，纯粹是引入jquery*/
  var $ = require('jquery')(require('jsdom-no-contextify').jsdom().parentWindow);
  /*忽略这代码，纯粹是引入jquery*/

    /*jq 新的链式编程*/
    var ajx = $.ajax('data.json')
    ajx.done(function () {
      console.log('PART 2 success')
    })
      .fail(function () {
        console.log('PART 2 jq error')
      })
      .done(function () {
        console.log('PART 2 success2')
      })
    console.log('PART 2' + Object.prototype.toString.call(ajx)) //返回deferred对象

    /*jq 基于callback的ajax异步*/
    var ajax = $.ajax({
      url: 'data.json',
      success: function () {
        console.log('PART 2 success')
        //  doSomething
      },
      error: function () {
        console.log('PART 2 jq error')
      }
    })
    console.log('PART 2' + ajax) //返回XHR对象

    /**PART 3**/
      //链式编程  自己使用Deferred封装一个，改变以往直接在doSomething中写一堆逻辑。
    var waitHandle = () =>
      {
        var dtd = $.Deferred();
        var wait = function (dtd) {
          var task = function () {
            var error = false;
            console.log("PART 3 Deferred执行完成")
            if (!error) {
              dtd.resolve() }//表示异步任务完成
            else {
              dtd.reject() }//表示失败
          }
          setTimeout(task, 2000)
          return dtd
        }
        return wait(dtd)
      }
    var w = waitHandle()
    /*以下是精髓,看打印内容*/
    w.then(function () {
      console.log("PART 3 完成操作")
    },function () {
      console.log("PART 3 错误")
    })
      .then(() => {
        console.log("PART 3 项目经理新业务，直接在这添加，不用改之前代码")
      },function () {
        console.log("PART 3 错误2")
      })
    // .reject() 乱套了，见PART解释



/**PART 6**/
var fs = require('fs');
var path = require('path');

const readFilePromise = function (fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data.toString())
        }
      })
    })
}
const fullFileName = path.resolve(__dirname, './data.json');
  // const fullFileName = path.resolve(__dirname, './data1.json') //模拟error
const result = readFilePromise(fullFileName)
  result.then(data => {
    console.log("PART 6" + data)
    return JSON.parse(data).name /**精华：使用此方式相当于调用的resolve，进行下级传递**/
  }
  // , () => {
  //   console.log("PART 6 ERROR")
  // } ／**(A)**／
  ).then(a => {
    console.log("PART 6 参数传递: " + a)
  }).catch(err => {
    console.log("PART 6 ERROR: " + err.stack)
  })

/**PART 7**/
// 有意思的传递
  const fullFileName2 = path.resolve(__dirname, './data.json');
  const result2 = readFilePromise(fullFileName2)
  const fullFileName3 = path.resolve(__dirname, './data2.json');
  const result3 = readFilePromise(fullFileName3)
  result2.then(data => {
    console.log('PART 7 result2 读取完成' + data)
    return result3
  })
    .then(data => {
      console.log('PART 7 result3 读取完成' + data)
    })
    .catch(err => {
      console.log('PART 7 ERROR')
    })

/**PART 8**/
// 需同时执行的任务
  Promise.all([result2,result3]).then(datas => {
    console.log('PART 8 result2 :' + datas[0]);
    console.log('PART 8 result3 :' + datas[1]);
  })
// 其中之一读取到即可继续执行
  Promise.all([result2,result3]).then(datas => {
    console.log('PART 8 result2 :' + datas[0]);
    console.log('PART 8 result3 :' + datas[1]);
  })

})()