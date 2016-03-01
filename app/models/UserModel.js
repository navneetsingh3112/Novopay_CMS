'use strict';


module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('users',
		{
			name: {
				field: 'username',
				type : DataTypes.STRING,
				allowNull: false
			},
			password:{
				field: 'password',
				type : DataTypes.STRING,
				allowNull: false
			}
		},
		{
			instanceMethods: {
				toJSON: function () {
					var values = this.get();
					delete values.password;
					return values;
				},
			},
			associate: function(models) {
				//User.hasMany(models.Article);
			}
		}
	);

	return User;
};


