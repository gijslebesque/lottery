var mongoose = require("mongoose");
 
var UserSchema = new mongoose.Schema({
    name: String,
    flightNumber: String,
    seat: String,
    lotteryNumer: String
})

var User = mongoose.model('users', UserSchema)

module.exports = User;