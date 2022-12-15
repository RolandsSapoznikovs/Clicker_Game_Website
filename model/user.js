const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority")

var RegisterSchema = new mongoose.Schema({
    Username: { type: String, required: true, unique: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
},
{collection: 'users'}
);

var Register = mongoose.model('Register', RegisterSchema);

module.exports = Register
 