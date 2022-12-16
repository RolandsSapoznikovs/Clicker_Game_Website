var express = require('express');   
const { Server } = require('http');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
const { json } = require('body-parser');
const req = require('express/lib/request');
const User = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const flash = require('connect-flash')
const JWT_SECRET = 'faiwniwuefnuiwauefn348th3458tyh8dh&#G$&@#^$G&bfuywbuf'

mongoose.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority")


app.set('views', path.join(__dirname, 'views'))
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
    res.render('register', {registerResponse: registerResponse})
});

app.get('/reviews', function(req, res) {
    res.render('reviews')
});

app.get('/update', function(req, res) {
    res.render('update')
});

app.get('/LoggedIn', function(req, res) {
    res.render('LoggedIn')
});

app.get('/LoggedInReviews', function(req, res) {
    res.render('LoggedInReviews')
});

app.post('/login', async (req, res) => {
    const {regparoleinp, regemailinp} = req.body

    const user = await User.findOne({regemailinp}).lean()

    if(!user){
        return res.json({status: 'error', error: 'Invalid Email or Password'})
    }

    if(await bcrypt.compare(regparoleinp, user.regparoleinp)) {

        const token = jwt.sign({ id: user._id, regemailinp: user.regemailinp},JWT_SECRET)
        return res.json({status: 'ok', data: token}), res.send
        
    }

    res.json({status: 'error', error: 'Invalide Email or Password'})

})

let registerResponse = {status: '', error: ''};
app.post('/register', async (req, res) =>{

     const {regusernameinp, regparoleinp: plainTextPassword, regemailinp} = req.body

     if (!regusernameinp || typeof regusernameinp !== 'string') {
        // registerResponse = {status: 'error', error: 'Invalid Username'};
        registerResponse.status = "error";
        registerResponse.error = "Invalid Username";
        // return res.render('pages/register', {registerResponse});
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        registerResponse.status = "error";
        registerResponse.error = "Invalid Password";
        // return res.json({status: 'error', error: 'Invalid Password'})
    }

    if (!regemailinp || typeof regemailinp !== 'string') {
        registerResponse.status = "error";
        registerResponse.error = "Invalid Email";
        // return res.json({status: 'error', error: 'Invalid Email'})
    }

    if (plainTextPassword.length < 5) {
        registerResponse.status = "error";
        registerResponse.error = "Password should be at least 6 characters long";
        // return res.json({status: 'error', error: 'Password should be at least 6 characters long'})
    }


    if(registerResponse.status !== "error"){
        const regparoleinp = await bcrypt.hash(plainTextPassword, 10)

    
        try {
            const response = await User.create({
                regusernameinp,
                regparoleinp,
                regemailinp
            })
            console.log('User Created: ', response);
            registerResponse.status = "success";
        } catch (error) {
            console.log(error);
            if (JSON.stringify(error.code === 11000)) {
                // return res.json({status: 'error', error: 'Username already in use'})
                registerResponse.status = "error";
                registerResponse.error = "Username already in use";
            }
        }
    }

    if (registerResponse.status == "success") {
        res.redirect('/login')
    } else if (registerResponse.status == "error") {
        res.redirect("/register")
    } else {
        console.log("Who this?")
    }
 
    
})

app.listen(3000, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port 3000')
    }
})
