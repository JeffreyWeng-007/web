var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('./pageOne.html')
});

router.post('/pageOne.html',(req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/pageOne.html'),'utf-8')
  res.send(html)
})
/* test */
// router.get('/form',(req, res) => {
//   console.log('%s','GET##FORM-----' + req.query)
//   var response = {
//     'rTitle': 'lh-888 ' + req.query.rTitle,
//     'rText' : 'lh-888 ' + req.query.rText
//   }
//   res.send(JSON.stringify(response))
// })
// router.post('/form',(req, res) => {
//   console.log(req.body);
//
//   var response = {
//     'rTitle': 'lh-999 ' + req.body.rTitle,
//     'rText' : 'lh-999 ' + req.body.rText
//   };
//   res.send(JSON.stringify(response))
// })

/* 生成随机码 */
// router.post('/random',(req, res) => {
//   var response = {
//     'random': Math.ceil(Math.random()*10)
//   }
//   console.log(JSON.stringify(response));
//   res.send(JSON.stringify(response))
// })

module.exports = router;
