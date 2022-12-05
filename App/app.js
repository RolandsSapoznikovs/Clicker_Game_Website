const express = require("express");

const mysql = require("mysql");

const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
    res.write('Hello');
})

const db = mysql.createConnection({

    host: "localhost",
  
    user: "root",
  
    password: "",
  
    database: "fruitclicker",
  
});
db.connect((err) => {

    if (err) {
  
      throw err;
  
    }
  
    console.log("MySql Connected");
  
});  



const app = express();


app.listen(port, () => {
        console.log("Visit http://127.0.0.1:3000/index.html")
        
  
  });
