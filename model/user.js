const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority")

var RegisterSchema = new Schema({
    regusernameinp: { type: String, required: true, unique: true},
    regparoleinp: {type: String, required: true},
    regemailinp: {type: String, required: true, unique: true},
},
{collection: 'users'}
);

var ReviewSchema = new Schema({
    //RegisteredUsers: {type: Schema.Types.ObjectId, ref: "Register"},
    Username: {type: String},
    reguserreview: {type: String}
},
{collection: 'userReviews'}
);

var Review = mongoose.model('Review', ReviewSchema);

var Register = mongoose.model('Register', RegisterSchema);

module.exports = {Register, Review}
 