/**
 * Created by monk on 2018/3/2.
 */

(function () {
  /**PART 2**/
    try {
      var event = new Event('wxVerifyInit');
      document.dispatchEvent(event);

      document.addEventListener('wxVerifyInit', function (e) {
        initFlag = true;
      })
    } catch(e) {
      console.log('在浏览器中运行')
    }


    //DOM操作
    //label
    $('#account_sig').html('set label');
    $('#account_name').val('');
    $("#account_industry").find("[id='radio-" + 3 + "']").iCheck('check');
    var industry = $("input[name='demo-radio1']:checked").val();
    // addressInit('cmbProvince', 'cmbCity', '', obj.province, obj.city, '')


    $('#my tbody').on('click', 'tr', function (e) {
        var idx = $(this).parent().context.rowIndex -1
        var name = $(e.target).attr('name')
        var value = $(e.target).attr('value')
        // switch (name) {}
      })

    $("#logout").click(function(){
        console.log('click')
    });


})()
