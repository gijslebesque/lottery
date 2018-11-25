var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('index', { title: 'Express' });
});

router.post("/createUser" , (req, res) =>{
  let newUser = new User(req.body);

  newUser.save( (err, result) => {
    if (err) throw err;
      res.send("user stored")   
  });
 
})

module.exports = router;
