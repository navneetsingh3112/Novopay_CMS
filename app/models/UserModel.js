var mongoose       = require('mongoose');

var usersSchema = mongoose.Schema({
  name:String,
  password:String
});


usersSchema.methods.validateUser = function(callBack){
	return this.model('users').findOne({name: this.name , password: this.password}, callBack);
}

var Users = mongoose.model('users', usersSchema);


module.exports = Users;