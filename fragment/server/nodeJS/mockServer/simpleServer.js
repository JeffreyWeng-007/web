//服务器样例罢了

var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.get('/form',(req, res) => {
  console.log('%s','GET##FORM-----' + req.query)
  var response = {
     'rTitle': 'lh-888 ' + req.query.rTitle,
     'rText' : 'lh-888 ' + req.query.rText
  }
  res.send(JSON.stringify(response))
})

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/form',urlencodedParser,(req, res) => {
  // console.log('POST##FORM-----' + req.body)
  console.log(req.body);

  var response = {
    'rTitle': 'lh-888 ' + req.body.rTitle,
    'rText' : 'lh-888 ' + req.body.rText
  };
  res.send(JSON.stringify(response))
})

var server = app.listen(8888, () => {
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
