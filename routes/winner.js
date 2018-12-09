const express = require('express');
const router = express.Router();
const Tickets = require("../models/ticket.js");
const Drawing = require("../models/drawing.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  //check if logged in, otherwise redirect to login.
  if(req.session.user){
    Tickets.find({hasParticipated:false}, (err, tickets)=>{

        console.log(tickets)

        if(tickets.length > 0){
                //update all to hasParticipated == true
                //update winner

                var randomTicket = tickets[Math.floor(Math.random() * tickets.length)]; 

                Tickets.updateMany( {},{hasParticipated:true}).then(( updatedTick) =>{
       
            
                }).catch(err => {
                    throw err;
                })
                Tickets.updateOne({_id: randomTicket._id}, {hasWon:true }).then((updatedTick) =>{
            
                }).catch(err => {
                    throw err;
                })

           
                Drawing.findOne().then(draw =>{
                    Drawing.updateOne({_id: draw._id}, {drawNumber: draw.drawNumber + 1}).then(theres =>{
                        console.log("the res", theres)
                    });                 
                }).catch(err => {
                    throw err;
                })
        
                console.log(randomTicket);
            res.render('winner', { title: "Ticket generated", winner: randomTicket });     
        }
        else{

             res.render('winner', { title: "Ticket generated", randomTicket: "No tickets" });     
        
         }
        })
    }
    else{
     
        res.redirect("/login")
    }
  
});

//winner route


module.exports = router;
