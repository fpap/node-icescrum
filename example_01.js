/**
 * icescrum API wrapper caller
 */

var sys = require("sys")
    ,wrapper = require('./index');


var params = {
        hostname: '192.168.1.10'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 750
    };

wrapper.getStory(params, function(err, result){
	sys.puts("API Get a story");
	console.log("RESPUESTA "+result);
});



var params = {
        hostname: '192.168.1.10'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,auth: 'fpap:1234'
    };

wrapper.getAllStories(params, function(err, result){
    sys.puts("API Get all stories");
    console.log("RESPUESTA "+result);
});



var params = {
        hostname: '192.168.1.10'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 760
        ,auth: 'fpap:1234'
        ,name: 'nombre0'
        ,type: 0
        ,description: 'descripcion0'
        ,notes: 'notes0'
        ,textAs: 'textAs0'
        ,textICan: 'textICan0'
        ,textTo: 'textTo0'
        ,featureId: 91
        ,sprintId: 91
    };

wrapper.updateStory(params, function(err, result){
	sys.puts("API Update a story");
	console.log("RESPUESTA "+result);
});

/*
var req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    console.log('BODY: ' + chunk);
	  });
	});
*/

/*
request.addListener("response", function(response) {
  sys.puts("STATUS: " + response.statusCode);
  sys.puts("HEADERS: " + JSON.stringify(response.headers));
  response.setEncoding("UTF8");
  response.addListener("data", function(chunk) {
    sys.puts("BODY: " + chunk);
  });
  response.addListener("end", function() {
    sys.puts("Fin de la respuesta");
  });
});
*/

