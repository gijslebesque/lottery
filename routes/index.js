var express = require('express');
var router = express.Router();
var Ticket = require("../models/ticket.js");
var Draw = require("../models/drawing.js");

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Ticket' });
});

router.post("/createTicket" , (req, res) =>{
  const {name, flightNumber, seat, flightDate, birthDay} = req.body;
  if(!name || flightNumber || seat || flightDate || birthDay){
    res.render("ticket-generated", {title: "Something went wrong"})   
    return false;
  }

  Draw.findOne().then(draw =>{

        let string = "" + draw.drawNumber;
        let pad = "000";
        let drawingNumber = pad.substring(0, pad.length - string.length) + string;

        let now = new Date(req.body.flightDate);
        let year = now.getFullYear().toString().substr(-2);
        let start = new Date(now.getFullYear(), 0, 0);
        let diff = now - start;
        let oneDay = 1000 * 60 * 60 * 24;
        let amountOfDays = Math.floor(diff / oneDay);

        let newTicket = new Ticket({
          name: name,
          flightNumber: flightNumber,
          seat: seat,
          flightDate: flightDate,
          birthDay: birthDay,
          hasParticipated: false,
          hasWon: false,
          lotteryNumber: drawingNumber + flightNumber + year + amountOfDays + seat  
        })

        newTicket.save( (err, result) => {
          if (err) throw err;
             console.log(result)
            res.render("ticket-generated", {title: "Ticket generated"})   
        });
       
      
  }).catch(err => {throw err});


// router.post("/" , (req, res) =>{
 
// })





})

module.exports = router;
