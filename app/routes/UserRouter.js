var express        = require('express');
var router         = express.Router();

var User = require('../models/UserModel');


router.post('/login', function(req,res){
	var reqUser = new User({name: req.body.userName , password: req.body.pwd});
	reqUser.validateUser(function (err, doc) {
  		console.log("login -----"+JSON.stringify(doc));
	});
});


module.exports = router;