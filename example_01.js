/**
 * icescrum API wrapper caller
 */

var sys = require("sys")
    ,wrapper = require('./index');

/*
var params = {
        hostname: '192.168.1.156'
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
        hostname: '192.168.1.156'
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
        hostname: '192.168.1.156'
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
        ,tags: "['ticket']" // Currently not working
    };

wrapper.updateStory(params, function(err, result){
	sys.puts("API Update a story");
	console.log("RESPUESTA "+result);
});



var params = {
        hostname: '192.168.1.156'
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
        ,tags: "['with','some','tags']"
    };

wrapper.createStory(params, function(err, result){
    sys.puts("API Create a story");
    console.log("RESPUESTA "+result);
});


var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 881
        ,auth: 'fpap:1234'
        ,type: 'story'
    };

wrapper.acceptStory(params, function(err, result){
    sys.puts("API Accept a story");
    console.log("RESPUESTA "+result);
});*/

/*
var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 753
        ,auth: 'fpap:1234'
    };

wrapper.setStoryDone(params, function(err, result){
    sys.puts("API Set a story to done");
    console.log("RESPUESTA "+result);
});
*/

/*
var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 883
        ,auth: 'fpap:1234'
    };

wrapper.setStoryUndone(params, function(err, result){
    sys.puts("API Set a story to undone");
    console.log("RESPUESTA "+result);
});*/

/*
var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 752
        ,auth: 'fpap:1234'
        ,sprintId: 321
    };

wrapper.planStory(params, function(err, result){
    sys.puts("API Plan a story in a sprint");
    console.log("RESPUESTA "+result);
});
*/

/*
var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 752
        ,auth: 'fpap:1234'
        ,shiftToNext: true
    };

wrapper.unplanStory(params, function(err, result){
    sys.puts("API Unplan a story");
    console.log("RESPUESTA "+result);
});


var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 881
        ,auth: 'fpap:1234'
    };

wrapper.deleteStory(params, function(err, result){
    sys.puts("API Delete a story");
    console.log("RESPUESTA "+result);
}); */

/*
var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,feature: 91
        ,auth: 'fpap:1234'
    };

wrapper.getFeature(params, function(err, result){
    sys.puts("API Get a feature.");
    console.log("RESPUESTA "+result);
});


var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,auth: 'fpap:1234'
    };

wrapper.getAllFeatures(params, function(err, result){
    sys.puts("API Get all features");
    console.log("RESPUESTA "+result);
});


var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,auth: 'fpap:1234'
    };

wrapper.getAllCurrentReleaseSprints(params, function(err, result){
    sys.puts("API Get All Current Release Sprints");
    console.log("RESPUESTA "+result);
});*/


var params = {
        hostname: '192.168.1.156'
        ,port: 48080
        ,path: 'icescrum'
        ,project: 'TESTAPI'
        ,story: 951
        ,auth: 'fpap:1234'
        ,rank: 1
    };

wrapper.updateStoryRank(params, function(err, result){
    sys.puts("API Updates the priority of a story");
    console.log("RESPUESTA "+result);
});