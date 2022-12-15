var express = require('express');   
const { Server } = require('http');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
const { json } = require('body-parser');
const req = require('express/lib/request');
const User = require('./model/user')
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority")

app.set('view engine', 'ejs');

app.use('/CSS', express.static('CSS'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(express.urlencoded({ extended: false}))

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/index', function(req, res){
    res.render('index')
})

app.get('/login', function(req, res) {
    res.render('login')
});

app.get('/register', function(req, res) {
    res.render('register')
});

app.get('/reviews', function(req, res) {
    res.render('reviews')
});

app.get('/update', function(req, res) {
    res.render('update')
});

app.post('/register', jsonParser, (req, res) =>{
    console.log(req.body)
    console.log('Username: ', req.body.regusernameinp)
    console.log('Password: ', req.body.regparoleinp)
    console.log('Email: ', req.body.regemailinp)
})

app.listen(3000, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port 3000')
    }
})
