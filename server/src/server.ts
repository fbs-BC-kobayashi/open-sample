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

// ログイン
app.get('/login', function (req, res) {
  console.log("getは成功")//ここでそれぞれのファイルのメソッドを実行して返すと思う。
  var bodydata={"message":"OK!"}
  res.send(bodydata)
});

// POST method route
app.post('/login', function (req, res) {
  //ここでそれぞれのファイルのメソッドを実行して返すと思う。
  var bodydata={"message":"OK!"}
  res.send(bodydata)
})
//登録
app.post('/goods', function (req, res) {
  //ここでそれぞれのファイルのメソッドを実行して返すと思う。
  console.log(req.body)
  db.insert(req.body)
  var bodydata={"message":"insert OK!"}
  res.send(bodydata)
})

//登録
app.put('/goods/:id', function (req, res) {
  //ここでそれぞれのファイルのメソッドを実行して返すと思う。
  console.log(req.body)
  db.update(req.body)
  var bodydata={"message":"update OK!"}
  res.send(bodydata)
})


app.post('/goods/serch', function (req, res) {
  //ここでそれぞれのファイルのメソッドを実行して返すと思う。
  console.log(req.body)
  db.serch(req.body).then(result =>{//この then が必要だったんだ・・・！！！
    res.send(result)
  })
})

app.get('/goods/list', async (req, res) => {
  db.find().then(result =>{//この then が必要だったんだ・・・！！！
    res.send(result)
  })
  //var response=JSON.parse(result)
  
  
})

app.get('/goods/:id', function (req, res) {
  console.log("/goods/:id開始")
  console.log(req.params.id)
  var goods_id = req.params.id
  db.find_one(goods_id).then(result =>{//この then が必要だったんだ・・・！！！
    console.log(result)
    res.send(result)
  })

})


app.listen(3000, function () {
  console.log("http://localhost:3000");
});

export default app;