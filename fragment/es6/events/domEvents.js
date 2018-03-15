// /**
//  * Created by monk on 2018/3/2.
//  */
//
// (function () {
//   /**PART 2**/
//     try {
//       var event = new Event('wxVerifyInit');
//       document.dispatchEvent(event);
//
//       document.addEventListener('wxVerifyInit', function (e) {
//         initFlag = true;
//       })
//     } catch(e) {
//       console.log('在浏览器中运行')
//     }
//
//
//     //DOM操作
//     //label
//     $('#account_sig').html('set label');
//     $('#account_name').val('');
//     $("#account_industry").find("[id='radio-" + 3 + "']").iCheck('check');
//     var industry = $("input[name='demo-radio1']:checked").val();
//     // addressInit('cmbProvince', 'cmbCity', '', obj.province, obj.city, '')
//
//
//     $('#my tbody').on('click', 'tr', function (e) {
//         var idx = $(this).parent().context.rowIndex -1
//         var name = $(e.target).attr('name')
//         var value = $(e.target).attr('value')
//         // switch (name) {}
//       })
//
//     $("#logout").click(function(){
//         console.log('click')
//     });
//
//
// })()


//原生Ajax
var golobalURL = "http://mog.work2pix.top/medical/";
var cid = 16;
var Ajax = {
  post: function(url, data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
        fn.call(this, xhr.responseText)
      }
    };
    xhr.send(data)
  }
};
Ajax.post(golobalURL + "user/official_web/sharelink/get?token=&openid=oVP4Xs0SnLaj4D8Ih6qr-0000111&cid=" + cid + "&url=" + location.href.split("#")[0] + "", "",
  function(data) {
    data = JSON.parse(data);
    console.log("data" + data);
    try {
      if (data.r == 1) {
        var url = golobalURL + "/static/wechat/officialWebsite/officialWebsite.html?cid=" + cid + "&comeFrom=recommend";
        var linkInfo = data.link_info;
        var title = linkInfo.title;
        var description = linkInfo.description;
        var img = linkInfo.cover_url;
        wx.config({
          debug: true,
          appId: data.signature.appId,
          timestamp: data.signature.timestamp,
          nonceStr: data.signature.nonceStr,
          signature: data.signature.signature,
          jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline", "hideMenuItems"]
        });
        wx.ready(function() {
          wx.hideMenuItems({
            menuList: ["menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:facebook", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"]
          });
          wx.onMenuShareAppMessage({
            title: title,
            desc: description,
            link: url,
            imgUrl: img,
            success: function(res) {
              console.log("已分享")
            },
            cancel: function(res) {
              console.log("已取消")
            }
          });
          wx.onMenuShareTimeline({
            title: title,
            desc: description,
            link: url,
            imgUrl: img,
            success: function(res) {
              console.log("已分享")
            },
            cancel: function(res) {
              console.log("已取消")
            }
          })
        })
      }
    } catch(e) {
      console.log("欢迎页授权错误")
    }
  });


//监听input变化
$('#mPhone_clear').click(function () {
  $('#mPhone').val('').change()
})

$("#mPhone").on('input change', function() {
  console.log('a ' + this.value)
  if (/^1[3|4|5|7|8]\d{9}$/.test(this.value)) {
    $('#phone_warn').hide();
  } else {
    $('#phone_warn').show();
  }
})