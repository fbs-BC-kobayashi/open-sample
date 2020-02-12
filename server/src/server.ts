import * as Express from 'express';
import * as path from 'path';
import * as BodyParser from 'body-parser';
import article from './routes/article';
import auth from './routes/auth';
import dev from './routes/dev';
// import ang from '../../client/src/app/login/login.component';




const listEndpoints = require('express-list-endpoints');//新規

const app = Express();


app.use('/article', article);
app.use('/auth', auth);
app.use('/goods/create', dev);

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
  console.log("頑張れ")//ここでそれぞれのファイルのメソッドを実行して返すと思う。
  res.send('OK')
});

// POST method route
app.post('/login', function (req, res) {
  console.log("頑張れ")//ここでそれぞれのファイルのメソッドを実行して返すと思う。
  res.send('POST request to the homepage')
})

app.listen(3000, function () {
  console.log("http://localhost:3000");
});

export default app;