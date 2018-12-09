var express = require('express');
var router = express.Router();
var Ticket = require("../models/ticket.js");
var Draw = require("../models/drawing.js");

/* GET home page. */
router.get('/', (req, res, next) =>{

  // let newDraw= new Draw({drawNumber:1});
  // newDraw.save();


  res.render('index', { title: 'Express' });
});

router.post("/createTicket" , (req, res) =>{
//  let newTicket = new Ticket(req.body);


  Draw.findOne().then(draw =>{

        let string = "" + draw.drawNumber;
        let pad = "000";
        let drawingNumber = pad.substring(0, pad.length - string.length)+ string


        let now = new Date(req.body.flightDate);
        let year = now.getFullYear().toString().substr(-2);
        let start = new Date(now.getFullYear(), 0, 0);
        let diff = now - start;
        let oneDay = 1000 * 60 * 60 * 24;
        let amountOfDays = Math.floor(diff / oneDay);

        let newTicket = new Ticket({
          name: req.body.name,
          flightNumber: req.body.flightNumber,
          seat: req.body.seat,
          flightDate: req.body.flightDate,
          birthDay: req.body.birthDay,
          hasParticipated: false,
          hasWon: false,
          lotteryNumber: drawingNumber + req.body.flightNumber + year + amountOfDays + req.body.seat  
        })

        newTicket.save( (err, result) => {
          if (err) throw err;
             console.log(result)
            res.send("user stored")   
        });
       
      
  }).catch(err => {throw err});


// router.post("/" , (req, res) =>{
 
// })





})

module.exports = router;
