var express = require('express');
var router = express.Router();
var Ticket = require("../models/ticket.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  //check if logged in, otherwise redirect to login.
  if(req.session.user){
    Ticket.find( (err, users)=>{
            res.render('admin', { title: "Admin", users: users });
        })
    }
    else{
        res.redirect("/login")
    }
  
});

//winner route


module.exports = router;
