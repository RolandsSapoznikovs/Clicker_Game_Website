var express = require('express');   
var app = express();

app.use('/CSS', express.static('CSS'))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/login.html/', function(req, res) {
    res.sendFile(__dirname + '/login.html')
});

app.get('/register.html/', function(req, res) {
    res.sendFile(__dirname + '/register.html')
});

app.get('/reviews.html/', function(req, res) {
    res.sendFile(__dirname + '/reviews.html')
});

app.get('/update.html/', function(req, res) {
    res.sendFile(__dirname + '/update.html')
});



app.listen(3000, function(error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port 3000')
    }
})