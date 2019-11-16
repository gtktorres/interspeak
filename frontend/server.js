const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const PORT = 3002;

const pool = new pg.Pool ({
    port: 5432,
    password: '123456',
    database: 'interspeak',
    max: 10,
    host: 'localhost',
    user: 'postgres'
});

pool.connect((err, db, done) => {
  if(err){
    return console.log(err);
  }
  else {
    db.query('SELECT * FROM users', (err, table) => {
      if(err){
        return console.log(err)
      }
      else {
        console.log(table)
      }
    })
  }
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(PORT, () => console.log('Listening on port ' + PORT));
