var express = require('express');
var router = express.Router();
var Ticket = require("../models/ticket.js");
const Drawing = require("../models/drawing.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  //check if logged in, otherwise redirect to login.
  
    if(req.session.user){
        Ticket.find({hasParticipated:false}, (err, tickets)=>{
            if(err) throw err;

            Drawing.findOne().then(draw =>{
                console.log(draw)
                res.render('admin', { title: "Admin", users: tickets, drawNumber:draw.drawNumber });
            }).catch(err => {throw err});

        })
    }
  
    else{
        res.redirect("/login")
    }
  
});

module.exports = router;
