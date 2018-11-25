var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  //check if logged in, otherwise redirect to login.
  if(req.session.user){
    User.find( (err, users)=>{
            res.render('admin', { title: "Admin", users: users });
        })
    }
    else{
        res.redirect("/login")
    }
  
});

// router.post("/" , (req, res) =>{
 
// })

module.exports = router;
