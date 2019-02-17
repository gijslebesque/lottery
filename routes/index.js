var express = require('express');
var router = express.Router();
var Ticket = require("../models/ticket.js");
var Draw = require("../models/drawing.js");
var Admin = require("../models/admin.js");

/* GET home page. */
router.get('/', (req, res, next) =>{
  const newDraw = new Draw({
    drawNumber:1
  })

  newDraw.save();

const newAdmin = new Admin({
  name: "Vito",
  password: "Vito1"
})

newAdmin.save()
  

  res.render('index', { title: 'Ticket' });
});

router.post("/createTicket" , (req, res) =>{
  const {name, flightNumber, seat, flightDate, birthday} = req.body;
  if(!name || !flightNumber || !seat || !flightDate || !birthday){
    res.render("ticket-generated", {title: "Something went wrong"})   
    return false;
  }


  Draw.findOne().then(draw =>{

        let string = "" + draw.drawNumber;
        let pad = "0000";
        let drawingNumber = pad.substring(0, pad.length - string.length) + string;

      
        let stringSeat = "" + seat;
        let padSeat = "000";
        let drawingNumberSeat = padSeat.substring(0, padSeat.length - stringSeat.length) + stringSeat;

      
        ///
        
        let flightDateTimer = new Date(req.body.flightDate);
        let start = new Date(flightDateTimer.getFullYear(), 0, 0);
        let diff = flightDateTimer - start;
        let oneDay = 1000 * 60 * 60 * 24;
        let amountOfDays = Math.floor(diff / oneDay);
       
        let BirthdayTimer = new Date(req.body.birthday);
        let startBirth = new Date(BirthdayTimer.getFullYear(), 0, 0);
        let difference = BirthdayTimer - startBirth;
        let amountOfDaysBirth = Math.floor(difference / oneDay);

        let birthdayYear = BirthdayTimer.getFullYear().toString().substr(-2);
        let year = flightDateTimer.getFullYear().toString().substr(-2);
       

        let newTicket = new Ticket({
          name: name,
          flightNumber: flightNumber,
          seat: seat,
          flightDate: flightDate,
          birthDay: birthday,
          hasParticipated: false,
          hasWon: false,
          lotteryNumber: `${drawingNumber}.${flightNumber}.${year}${amountOfDays}.${drawingNumberSeat}.${birthdayYear}${amountOfDaysBirth}.` 
        })

        newTicket.save().then(result =>{
         res.render("ticket-generated", {title: "Ticket generated", lotteryNumber: result.lotteryNumber, name: result.name})   
   
        }).catch(err => {throw err});
  }).catch(err => {throw err});


// router.post("/" , (req, res) =>{
 
// })





})

module.exports = router;
