var express        = require('express');
var router         = express.Router();

var users         = require('../controllers/UserController');
var winston       = require('../../config/winston')

router.post('/login', function(req,res){
	users.validateUser(req,res,function(user){
		if(user){
			req.session.userName = req.body.userName ;
			res.status(200).json(user);
		}else{
			res.status(401);
		}
	});
});

router.post('/logout', function(req,res){
		try{
			req.session.destroy(function(err){
				if(err){
					res.status(404);
				}else{
					res.redirect("/");
				}
			});
		}catch(err){
			winston.error(err);
		}
});

module.exports = router;