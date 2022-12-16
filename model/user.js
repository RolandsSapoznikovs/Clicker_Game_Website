const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority")

var RegisterSchema = new mongoose.Schema({
    regusernameinp: { type: String, required: true, unique: true},
    regparoleinp: {type: String, required: true},
    regemailinp: {type: String, required: true, unique: true},
},
{collection: 'users'}
);

var Register = mongoose.model('Register', RegisterSchema);

module.exports = Register
 