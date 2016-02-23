var express        = require('express');
var router         = express.Router();

var User = require('../models/UserModel');


router.post('/login', function(req,res){
	var reqUser = new User({name: req.body.userName , password: req.body.pwd});
	reqUser.validateUser(function (err, doc) {
		try{
			if(err){
				console.log("internal server error");
				res.status(404);
			}
	  		if(doc){
	  			console.log("sucess");
	  			res.status(200).json(doc);
	  		}else{
	  			console.log("unauthorized "+JSON.stringify(doc));
	  			res.status(401);
	  		}
	  	}catch(err){
	  		console.log(err);
	  	}
	});
});


module.exports = router;