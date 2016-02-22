
// modules =================================================
var express        = require('express');
var app            = express();
var path           = require('path');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');

// index page loading ======================================
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/public/LoginIndex.html'));
});


// configuration ===========================================
var db = require('./config/db');
var port = 8080; 
// connect to mongoDB database
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

    
// routes ==================================================
var Schema = mongoose.Schema;
var db = mongoose.connection;

var users = new Schema({
  name:  String,
  password: String
});

var Users = mongoose.model('users', users);


app.post('/cms/auth/login', function(req,res){

	Users.find({name: '1111' , password: '1111'}, function (err, docs) {
        console.log("login -----"+JSON.stringify(docs));
    });
	
});


app.listen(port,function(){

});


