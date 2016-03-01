var express        = require('express');
var router         = express.Router();
var https          = require('https')



var authorizationKey = "Basic YXJ1bjphcnVucw==";


router.get('/agents', function(req,res){
    var query = "{\"query\":{\"filtered\":{\"query\": {\"match_all\": {}},\"filter\": {\"and\":[{\"exists\":{\"field\":\"shopLocation\"}},{\"term\":{\"merchantStatus\":\"ACTIVE\"}},{\"term\":{\"userStatus\":\"ACTIVE\"}}]}}},\"size\": 10000}";

    var headers = {
                    'Content-Type': 'application/json',
                    'Content-Length': query.length,
                    'Authorization': authorizationKey
                  };

    var options = {
        host: 'es.novopay.in',
        path: '/merchant/cashmanagementdetails/_search',
        method: 'POST',
        headers: headers
    };

    var req = https.request(options, function(resp) {
        resp.setEncoding('utf-8');
        var responseString = '';
        resp.on('data', function(data) {
            responseString += data;
        });

        resp.on('end', function() {
            res.status(200).json(JSON.parse(responseString));
        });
    });

    req.write(query);
    req.end();
 });


router.post('/pings', function(req,res){
    //2016/02/29 00:00
    var fromDateStr = req.body.fromDateStr;
    console.log('fromDateStr--'+fromDateStr);
    var fromDateEpoch =  new Date(fromDateStr).getTime();
    console.log('fromDateEpoch--'+fromDateEpoch);
    var toDateStr =  req.body.toDateStr;
    var toDateEpoch =  new Date(toDateStr).getTime();
    var partnerCode =  req.body.selectedPartner.code;
    var outcome =  req.body.selectedOutcome;

    var query = "{\"query\":{\"filtered\":{\"query\": {\"match_all\": {}},\"filter\": {\"and\":[{\"range\":{\"timestamp\":{\"from\":"+fromDateEpoch+",\"to\":"+toDateEpoch+"}}},{\"term\":{\"partnerCode\":\""+partnerCode+"\"}}";
    if(outcome == "success"){
        query += ", {\"term\":{\"matchFound\":true}}, {\"missing\":{\"field\":\"reasonforfailure\"}}";
    }else if(outcome == "NO_AGENT_FOUND"){
        query += ", {\"term\":{\"matchFound\":false}}, {\"term\":{\"reasonforfailure\":\"NO_AGENT_FOUND\"}}";
    }else if(outcome == "INSUFFICIENT_BALANCE"){
        query += ", {\"term\":{\"matchFound\":true}}, {\"term\":{\"reasonforfailure\":\"INSUFFICIENT_BALANCE\"}}";
    }
    query += "]}}},\"size\":10000}";

console.log(query);
    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': query.length,
        'Authorization': authorizationKey
    };

    var options = {
        host: 'es.novopay.in',
        path: '/cashmanagement/inquiriesdetails/_search',
        method: 'POST',
        headers: headers
    };

    var req = https.request(options, function(resp) {
        resp.setEncoding('utf-8');
        var responseString = '';
        resp.on('data', function(data) {
            responseString += data;
        });

        resp.on('end', function() {
            res.status(200).json(JSON.parse(responseString));
        });
    });

    req.write(query);
    req.end();
});


 module.exports = router;