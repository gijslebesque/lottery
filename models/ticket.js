var mongoose = require("mongoose");
 
var Ticket = new mongoose.Schema({
    name: String,
    flightNumber: String,
    seat: String,
    flightDate: String,
    birthDay: String,
    hasParticipated: Boolean,
    hasWon: Boolean,
    lotteryNumber: String
});

var Ticket = mongoose.model('ticket', Ticket)

module.exports = Ticket;