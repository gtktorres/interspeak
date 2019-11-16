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
    var id = 1;
    var username = 'test1';
    var email = 'test2';
    var native_language = 'test3';
    db.query('INSERT INTO users (id, username, email, native_language) VALUES($1, $2, $3, $4)',[id, username, email, native_language], (err, table) => {
      done();
      if(err){
        return console.log(err)
      }
      else {
        //console.log(table)
        console.log('INSERTED DATA SUCCESS');
        db.end();
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
