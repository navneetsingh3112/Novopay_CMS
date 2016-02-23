
// modules =================================================
var express        = require('express');
var router         = express.Router();
var app            = express();
var path           = require('path');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');


// index page loading ======================================
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/public/LoginIndex.html'));
});


// db configuration ===========================================
var db = require('./config/db');
var port = 8080; 
// connect to mongoDB database
mongoose.connect(db.url);
var connection = mongoose.connection;
connection.once('open', function() {

});

// others configuration ========================================
// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

    
// routes ==================================================
app.use('/cms/auth', require('./app/routes/UserRouter.js'));


app.listen(port,function(){

});


