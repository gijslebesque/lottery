var mongoose = require("mongoose");
 
var AdminSchema = new mongoose.Schema({
    name: String,
    password: String
})

var Admin = mongoose.model('admins', AdminSchema)

module.exports = Admin;