'use strict';

var db            = require('../../config/sequelize');
var winston       = require('../../config/winston');



exports.validateUser = function(req,res,callBackFunction){
    db.sequelize.query("select * from users where username = '"+req.body.userName +"' and password = AES_ENCRYPT('"+req.body.pwd+"'," +
        "UNHEX('F3229A0B371ED2D9441B830D21A390C3')) limit 1", { type: db.sequelize.QueryTypes.SELECT}).then(function(user){
        user[0].password = '';
        callBackFunction(user[0]);
    }).catch(function(err){
        winston.error(err);
        res.status(401);
    });
};
