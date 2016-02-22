
// modules =================================================
var express        = require('express');
var app            = express();
var path           = require('path');

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/public/LoginIndex.html'));
});

app.post('/cms/auth/login',function(req,res){
	res.send('Got a POST request');
});

app.listen(8080,function(){

});
