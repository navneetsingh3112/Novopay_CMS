
// modules =================================================
var express        = require('express');
var router         = express.Router();
var app            = express();
var path           = require('path');
var bodyParser     = require('body-parser');
var session        = require('express-session');


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load Configurations
var config          = require('./config/config');
var winston         = require('./config/winston');

winston.info('Starting '+config.app.name+'...');
winston.info('Config loaded: '+config.NODE_ENV);
winston.info('Accepted Config:',config);

var db              = require('./config/sequelize');
winston.info('Loaded db configuration...');


// session creation ======================================
app.use(session({
			name:'npCmsApp',
			secret : '610a2ee688cda9e724885e23cd2cfdee',
			httpOnly: true,
			secure: true,
			resave: false,
			saveUninitialized: false}));


// index page loading ======================================
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	if(req.session.userName){
		res.redirect("./../../MainIndex.html#/partner");
	}else {
		res.sendFile(path.join(__dirname + '/public/LoginIndex.html'));
	}
});




// others configuration ========================================
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

    
// routes ======================================================
app.use('/cms/auth', require('./app/routes/UserRouter.js'));
app.use('/cms/partner', require('./app/routes/PartnerViewRouter.js'));


app.listen(config.PORT,function(){

});


