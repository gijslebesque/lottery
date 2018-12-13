var express = require('express');
var router = express.Router();
var Admin = require("../models/admin.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post("/", (req, res) =>{
   
    Admin.findOne({ $and: [{name: req.body.name, password: req.body.password}] }, (err, result)=>{
        if (err) throw err;
        console.log("", result)
        if(!result){
            res.render("login", {title:"No match"});
        }else{
            req.session.user = result;
            res.redirect("/admin");
        }
    })
});

module.exports = router;
