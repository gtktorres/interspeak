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

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/new-username', function(req, res){
  //console.log(req.body);
  //var id = req.body.id;
  var username = req.body.username;
  //var email = req.body.email;
  //var native_language = req.body.native_language;
  pool.connect((err, db, done) => {
  if(err){
    return response.status(400).send(err);
  }
  else {
    /*
    var id = 1;
    var username = 'test1';
    var email = 'test2';
    var native_language = 'test3';
    */
    //db.query('INSERT INTO users (id, username, email, native_language) VALUES($1, $2, $3, $4)',[id, username, email, native_language], (err, table) => {
      db.query('INSERT INTO users (username) VALUES($1)',[username, email], (err, table) => {
      done();
      if(err){
        return response.status(400).send(err);
      }
      else {
        //console.log(table)
        console.log('DATA INSERTED');
        db.end();
        response.status(201).send({message: 'Data inserted!'});
      }
    })
  }
})
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));
