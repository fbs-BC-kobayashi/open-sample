import * as Express from 'express';
import * as BodyParser from 'body-parser';
import article from './routes/article';
import auth from './routes/auth';
import db_ope  from './db_ope/index';


const app = Express();

var db = new db_ope();

app.use('/article', article);
app.use('/auth', auth);

app.use(Express.static('front'));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

// customizing the behavior of app.param()
app.param(function (param, option) {
  return function (req, res, next, val) {
    if (val === option) {
      next()
    } else {
      next('route')
    }
  }
})

// route to trigger the capture
app.get('/login', function (req, res) {
  console.log("getは成功")//ここでそれぞれのファイルのメソッドを実行して返すと思う。
  var bodydata={"message":"OK!"}
  res.send(bodydata)
});

// POST method route
app.post('/logink', function (req, res) {
  //ここでそれぞれのファイルのメソッドを実行して返すと思う。
  var bodydata={"message":"OK!"}
  res.send(bodydata)
})

app.post('/goods', function (req, res) {
  //ここでそれぞれのファイルのメソッドを実行して返すと思う。
  console.log(req.body)
  db.insert(req.body)
  var bodydata={"message":"OK!"}
  res.send(bodydata)
})

app.get('/goods/list', async (req, res) => {
  const result = await db.find()
  //var response=JSON.parse(result)
  console.log("server_result: "+JSON.stringify(result))
  res.send(result)
})

app.get('/goods/:id', function (req, res) {
  console.log("/goods/:id成功？")
  console.log(req.url)
  res.send({"id":"A001!!!!"})
})


app.listen(3000, function () {
  console.log("http://localhost:3000");
});

export default app;