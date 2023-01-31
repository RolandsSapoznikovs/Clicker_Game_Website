var express = require('express');   
const { Server } = require('http');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
const { json } = require('body-parser');
const req = require('express/lib/request');
const {Register, Review} = require('./model/user')
//const userReviews = require('./model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');    
const JWT_SECRET = 'faiwniwuefnuiwauefn348th3458tyh8dh&#G$&@#^$G&bfuywbuf'
const MongoClient = require('mongodb').MongoClient;

mongoose.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority")

let registerResponse = {status: 'error', error: ''};
let LoggedInUser = {UserName: ''}

app.use(express.static(__dirname + '/public'));

//THREE
app.use('/buildThree/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsmThree/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

//Dat.gui
app.use('/buildDatGui/', express.static(path.join(__dirname, 'node_modules/dat.gui/build')));

//Three.Interactive
app.use('/threeInteractive/', express.static(path.join(__dirname, 'node_modules/three.interactive/build')));

//Tween.js
app.use('/tweenJsDist/', express.static(path.join(__dirname, 'node_modules/@tweenjs/tween.js/dist')));

//GSAP animation library
app.use('/gsapDirect/', express.static(path.join(__dirname, '/node_modules/gsap')));

//Objects
app.use('/resourcesObjects/', express.static(path.join(__dirname, 'resources/objects')));
app.use('/resourcesImages/', express.static(path.join(__dirname, 'resources/images')));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use('/CSS', express.static('CSS'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(express.urlencoded({ extended: false}))


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/Game.html', function(req, res) {
    res.render('Game.html');
});

app.get('/index', function(req, res){
    res.render('index')
})

app.get('/login', function(req, res) {
    res.render('login', {registerResponse: registerResponse})
});

app.get('/register', function(req, res) {
    res.render('register', {registerResponse: registerResponse})
});

app.get('/reviews', function(req, res) {
    Review.find({}, function(err, data){
        if (err) throw err;
        res.render('reviews',{reviews: data});
    })
});

app.get('/update', function(req, res) {
    res.render('update')
});

app.get('/LoggedIn', function(req, res) {
    res.render('LoggedIn', {LoggedInUser: LoggedInUser})
});

app.get('/LoggedInReviews', function(req, res) {
    Review.find({}, function(err, data){
        if (err) throw err;
        res.render('LoggedInReviews',{LoggedInUser: LoggedInUser, reviews: data});
    })
    
});

app.get('/LoggedInUpdate', function(req, res) {
    res.render('LoggedInUpdate', {LoggedInUser: LoggedInUser})
});

app.get('/Admin', function(req, res){
    res.render('Admin')
})

app.get('/AdminReview', function(req, res){
    Review.find({}, function(err, data){
        if (err) throw err;
        res.render('AdminReview',{reviews: data});
    })
})

app.get('/AdminUpdate', function(req, res){
    res.render('AdminUpdate')
})

app.get('/AdminUsers', function(req, res){
    Register.find({}, function(err, data){
        if (err) throw err;
        res.render('AdminUsers',{Users: data});
    })
})

app.post('/login', async (req, res) => {
    const {regparoleinp, regemailinp, regusernameinp: regusernameinp} = req.body

    const user = await Register.findOne({regemailinp}).lean()

    if(regemailinp == 'Admin@admin'){
        registerResponse.status = "admin";
    }


    else if(!user){
        //return res.json({status: 'error', error: 'Invalid Email or Password'})
        registerResponse.status = "error";
        registerResponse.error = "Invalid Email or Password";
    }

    else if(await bcrypt.compare(regparoleinp, user.regparoleinp)) {

        //const token = jwt.sign({ id: user._id, regemailinp: user.regemailinp},JWT_SECRET)
        Register.find({regemailinp: user.regemailinp, regusernameinp: user.regusernameinp}, (error, data) => {
            if(error){
                console.log(error)
            }else{
                LoggedInUser.UserName = user.regusernameinp
            }
        })
        registerResponse.status="success"
        
        
    }
    else{
    registerResponse.status = "error";
    registerResponse.error = "Invalid Email or Password";
    }


    if(registerResponse.status == "admin"){
        res.redirect('/Admin')
    } 
    else if (registerResponse.status == "success") {
        LoggedInUser.UserName = user.regusernameinp
        res.redirect('/LoggedIn')
    } else if (registerResponse.status == "error") {
        res.redirect("/login")
    } else {
        console.log("Who this?")
    }

})


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
    
    else{
        registerResponse.status = "success"
    }


    if(registerResponse.status !== "error"){
        const regparoleinp = await bcrypt.hash(plainTextPassword, 10)

    
        try {
            const response = await Register.create({
                regusernameinp,
                regparoleinp,
                regemailinp
            })
            console.log('User Created: ', response);           
            registerResponse.status = "success";
            
        } catch (error){
            console.log(error);
            if (JSON.stringify(error.code === 11000)) {
                // return res.json({status: 'error', error: 'Username already in use'})
                registerResponse.status = "error";
                registerResponse.error = "Username already in use";        
            }
            else{
                registerResponse.status = "success"
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

app.post('/LoggedInReviews', async (req, res) => {

    const {reguserreview} = req.body

    //const RegisteredUsers = await User.findOne({regusernameinp: LoggedInUser.UserName}).populate('Review')

    try{
        const ReviewResponse = await Review.create({
            Username: LoggedInUser.UserName,
            reguserreview
        })
        console.log(ReviewResponse)
    }catch(error){
        console.log(error)
    }

    res.redirect('/LoggedInReviews')
})

app.delete('/delete-data/:id',async (req, res) => {
    const id = req.params.id

    MongoClient.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true}, (err, db) =>{
        if (err) throw err;
        const dbo = db.db("test");

        if(!ObjectId.isValid(id)){
            console.log(id)
        }

        dbo.collection("userReviews").deleteOne({ _id: ObjectId(id) }, (err, obj) => {
        res.redirect('/AdminReview')
        console.log(`Data with ID ${id} was deleted`);
        console.log('Test2')
        db.close();
        });
        console.log('Test')



    });


});

app.delete('/delete-datas/:id',async (req, res) => {
    const id = req.params.id

    MongoClient.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true}, (err, db) =>{
        if (err) throw err;
        const dbos = db.db("test");

        if(!ObjectId.isValid(id)){
            console.log(id)
        }

        dbos.collection("users").deleteOne({ _id: ObjectId(id) }, (err, obj) => {
        res.redirect('/AdminReview')
        console.log(`Data with ID ${id} was deleted`);
        console.log('Test2')
        db.close();
        });
        console.log('Test')



    });


});

app.listen(3000, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port 3000')
    }
})
