;(function($){

  var Dialog = function(options){

    //保存常用常量
    var _self = this;
    this.body = $("body");
    this.maskAndcontainerDom = $('<aside class="dialog"><div class="dialog-mask"></div><div class="dialog-container"><div class="dialog-header"></div><div class="dialog-button-area"></div></div></aside>');
    this.titleDom = $('<div class="dialog-title"></div>');
    this.contentDom = $('<div class="dialog-content"></div>');
    this.buttonDom = $('<button class="dialog-button-item"></button>');

    this.selectUi=$('');


    //处理参数
    var defaultOptins = {
      title : "title",
      content : "default content ! ! !",
      buttons : {

      },
      mask : function(){

      }
    };

    //合并的过程  有相同的就覆盖，没有就添加
    this.Options = $.extend(true,{},defaultOptins,options);

    this.renderDom();
    //绑定事件

      $(".dialog-mask").hammer().on("tap",function(e){
        _self.Options.mask();
      });
      // 绑定弹框返回事件
      $(".dialog-button-no").hammer().on("tap",function(e){
          _self.Options.buttons.no.callback();
      });
      //绑定 去绑定事件
      $(".dialog-button-yes").hammer().on("tap",function(e){
          _self.Options.buttons.yes.callback();
      });
      //绑定重试事件
      $(".dialog-button-retry").hammer().on("tap",function(e){
          _self.Options.buttons.retry.callback();
    });

  };

  Dialog.prototype = {

    //渲染DOM
    renderDom : function(){
        var self = this;
        this.titleDom.html(this.Options.title);
        this.contentDom.html(this.Options.content);

        this.maskAndcontainerDom.find(".dialog-header").append(this.titleDom).append(this.contentDom);

        $.each(this.Options.buttons,function(key,value){
            if(key === "no"){
              var tempno = self.buttonDom.clone();
              tempno.html(value.title).addClass("dialog-button-no");
              self.maskAndcontainerDom.find(".dialog-button-area").append(tempno);
            }

            if(key === "yes"){
              var tempyes = self.buttonDom.clone();
              tempyes.html(value.title).addClass("dialog-button-yes");
              self.maskAndcontainerDom.find(".dialog-button-area").append(tempyes);
            }

            if(key === "retry"){
              var tempretry = self.buttonDom.clone();
              tempretry.html(value.title).addClass("dialog-button-retry");
              self.maskAndcontainerDom.find(".dialog-button-area").append(tempretry);
            }
        });
        this.body.append(this.maskAndcontainerDom);
    },
  };

  window.Dialog= Dialog;
})(jQuery);
