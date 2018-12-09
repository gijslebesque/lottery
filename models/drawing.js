var mongoose = require("mongoose");
 
var Draw = new mongoose.Schema({
   drawNumber:Number
});

var Draw = mongoose.model('draw', Draw)

module.exports = Draw;


