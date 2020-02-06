import * as Express from 'express';
import * as path from 'path';
import * as BodyParser from 'body-parser';
import article from './routes/article';
import auth from './routes/auth';
import dev from './routes/dev';
//import ang from '../../client/src/app/login/login.component';




const listEndpoints = require('express-list-endpoints');//新規

const app = Express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

app.use('/article', article);
app.use('/auth', auth);
app.use('/dev', dev);
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found API.' });
});

//let url = "../../client/dist/";


//app.use('/ang' ang);
app.listen(3000, function(){
  console.log("http://localhost:3000");
});
export default app;