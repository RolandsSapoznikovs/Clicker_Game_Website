var express = require('express');   
const { Server } = require('http');
var app = express();
var path = require('path');
var mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority")

var RegisterSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
});

var Register = mongoose.model('Register', RegisterSchema);
var RegisterOne = Register({Username: 'Bob', Password: '123', Email: 'Bob@inbox.lv'}).save(function(err){
    if(err) console.log(err);
    console.log('item saved');
});



app.set('view engine', 'ejs');

app.use('/CSS', express.static('CSS'))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/index.html/', function(req, res){
    res.render('index')
})

app.get('/login.html/', function(req, res) {
    res.render('login')
});

app.get('/register.html/', function(req, res) {
    res.render('register')
});

app.get('/reviews.html/', function(req, res) {
    res.render('reviews')
});

app.get('/update.html/', function(req, res) {
    res.render('update')
});



app.listen(3000, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port 3000')
    }
})
