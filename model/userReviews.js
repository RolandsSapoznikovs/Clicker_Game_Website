const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Rolands:Rolands@fruitclicker.9yqkrai.mongodb.net/?retryWrites=true&w=majority")

var ReviewSchema = new mongoose.Schema({
    //regusernameinp: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    Username: {type: String},
    reguserreview: {type: String}
},
{collection: 'userReviews'}
);

var Review = mongoose.model('Review', ReviewSchema);

module.exports = Review