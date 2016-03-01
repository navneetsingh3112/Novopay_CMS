'use strict';

var winston  = require('winston');
var logger   = new (winston.Logger)();

//TODO - check parameters exitOnError
// check if the logging level behaviour is same as log4j
logger.add(winston.transports.Console, {
    level: 'verbose',
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: true,
    handleExceptions: true,
    exitOnError: false
});


logger.add(winston.transports.File, {
    level: 'verbose',
    filename: './logs/cmslog.log',
    handleExceptions: true,
    json: true,
    maxsize: 20971520, //20MB
    maxFiles: 20,
    colorize: false,
    humanReadableUnhandledException: true,
    exitOnError: false
});


logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;

