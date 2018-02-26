/**
 * Created by monk on 2018/2/26.
 */
(function () {
  /**PART 1**/
  var moduleBlock = (function () {
    var count = 10
    var m1 = function (info) {
      console.log('PART 1模块 范式 count ' + count + (info||''))
    }
    var m2 = function () {
      console.log('PART 1模块 范式 被隐藏的方法')
    }
    return {
      m1: m1
    }
  })()

  moduleBlock.m1()

  /**PART 2**/
  var moduleSplit = (function (mod) {
    mod.m3 = function () {
      console.log('PART 2模块 分割模块')
    }
    return mod
  })(moduleBlock || {})
  moduleSplit.m3()
  moduleBlock.m3()
  /**A**/

  /**PART 3**/
  var globalName = 'monk'
  var moduleArgs = (function (name) {
    var m4 = function () {
      console.log('PART 3模块 传入变量 name: ' + name)
    }
    return {
      m4: m4
    }
  })(globalName)
  moduleArgs.m4()

  /**PART 4**/
  if (typeof(window)) {
    try {
      require.config({
        paths: {
          'amd': './helper/moduleAMDHelper',
          'amd2' : './helper/moduleAMDHelper2'
        }
      })
      require(['amd','amd2'], function (amd, amd2) {
        amd.m1('PART 4 AMD 范式');
        amd2.m2('PART 4 AMD 范式 模块2')
      })
    } catch (e) {
      console.log('PART 4 需运行在浏览器环境')
    }
  }

})()