/**
 * icescrum API wrapper caller
 */

var sys = require("sys")
    ,wrapper = require('./index');


var params = {
        hostname: '192.168.1.151'
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
        hostname: '192.168.1.151'
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
        hostname: '192.168.1.151'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 750
        ,auth: 'fpap:1234'
        ,name: 'notags'
        ,type: 0
        ,description: 'notags'
        ,notes: 'notags'
        ,textAs: 'notags'
        ,textICan: 'notags'
        ,textTo: 'notags'
        ,featureId: 91
        ,sprintId: 321
        ,rank: 1
        ,effort: 5
        ,dependsOnId: 0
        ,tags: 'notags' // Currently not working
    };

wrapper.updateStory(params, function(err, result){
	sys.puts("API Update a story");
	console.log("RESPUESTA "+result);
});



var params = {
        hostname: '192.168.1.151'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,auth: 'fpap:1234'
        ,name: 'withsometags'
        ,type: 2
        ,description: 'withtags'
        ,notes: 'withtags'
        ,textAs: 'withtags'
        ,textICan: 'withtags'
        ,textTo: 'withtags'
        ,featureId: 91
        ,dependsOnId: 752
        ,tags: 'with,some tags' // Currently not working
    };

wrapper.createStory(params, function(err, result){
    sys.puts("API Create a story");
    console.log("RESPUESTA "+result);
});

