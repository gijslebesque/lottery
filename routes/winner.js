const express = require('express');
const router = express.Router();
const Tickets = require("../models/ticket.js");
const Drawing = require("../models/drawing.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  //check if logged in, otherwise redirect to login.
    if(req.session.user){
        Tickets.find({hasParticipated:false}, (err, tickets)=>{
            if (err) throw err;
            if(tickets.length > 0){
                let randomTicket = tickets[Math.floor(Math.random() * tickets.length)]; 
                req.session.winner = randomTicket
                Tickets.updateMany( {},{hasParticipated:true})
                    .then(() =>{
                        Tickets.updateOne({_id: randomTicket._id}, { hasWon:true })
                    })
                    .then(() =>{
                        Drawing.findOne()
                    .then(draw =>{    
                        req.session.drawNumber = draw.drawNumber;
                        Drawing.updateOne({_id: draw._id}, {drawNumber: draw.drawNumber + 1}).then(resee=>{
                            res.render('winner', { title: "Ticket generated", winner: req.session.winner, drawNumber:req.session.drawNumber });
                        })                
                    })
                    })
                    .catch(err => {
                        throw err;
                    })
            }
            else if(req.session.winner && req.session.drawNumber){
                res.render('winner', { title: "Ticket generated", winner: req.session.winner, drawNumber:req.session.drawNumber });  
            }
            else{
                res.render('winner', { title: "No participants", randomTicket: "No tickets" });     
            }
        })
    }
    else{
        res.redirect("/login")
    }

});

module.exports = router;
