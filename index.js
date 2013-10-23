
var http = require("http");

var icescrum = {};
    
/**
 * Gets an story
 *
 * @method getStory
 * @param {number} story: Required story's id
 * @param {string} hostname: Icescrum's server's host name
 * @param {number} port: Icescrum's server's port
 * @param {string} path: Icescrum's server's path
 * @param {string} project: Icescrum's project's key
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error
 *   Second value {string}:
 *     If first value == true, error's description
 *     If first value == false, required story. Example:
 *       {
 *         "id":750,
 *         "acceptanceTests":[],
 *         "acceptedDate":"2013-10-16T14:40:54Z",
 *         "actor":null,
 *         "affectVersion":null,
 *         "creationDate":"2013-10-16T14:40:47Z",
 *         "creator":{"id":34},
 *         "dependsOn":null,
 *         "description":"Test description",
 *         "doneDate":null,
 *         "effort":null,
 *         "estimatedDate":null,
 *         "executionFrequency":1,
 *         "feature":null,
 *         "inProgressDate":null,
 *         "lastUpdated":"2013-10-16T14:40:54Z",
 *         "name":"Test",
 *         "notes":null,
 *         "parentSprint":null,
 *         "plannedDate":null,
 *         "rank":1,
 *         "state":2,
 *         "suggestedDate":"2013-10-16T14:40:47Z",
 *         "tasks":[],
 *         "textAs":null,
 *         "textICan":null,
 *         "textTo":null,
 *         "type":0,
 *         "uid":1,
 *         "tags":[],
 *         "dependences":[]
 *       }
 */
icescrum.getStory = function(params, callback) {
    if (params.story !== parseInt(params.story, 10)) {
        callback(true, 'Undefined story');
        return(this);
    }
    else {
        if (params.story < 0) {
            callback(true, 'Invalid story');
            return(this);
        }
    }
    
    var options = {};
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/'+params.story;
    options.method = 'GET';
    options.headers = {
            'content-type': 'application/json'
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk == '{"error":"Story does not exist"}') {
                callback(true, 'Story does not exist');
                return(this);
            }
            else {
                callback(false, chunk);
                return(this);
            }
        });
    });
  
    req.end();
};


/**
 * Gets all the stories of a project
 *
 * @method getAllStories
 * @param {string} hostname: Icescrum's server's host name
 * @param {number} port: Icescrum's server's port
 * @param {string} path: Icescrum's server's path
 * @param {string} project: Icescrum's project's key
 * @param {string} auth: Authentication in format user:password
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error
 *   Second value {string}:
 *     If first value == true, error's description
 *     If first value == false, required story. Example:
 *       [
 *         {
 *           "id":750,
 *           "acceptanceTests":[],
 *           "acceptedDate":"2013-10-16T14:40:54Z",
 *           "actor":null,
 *           "affectVersion":null,
 *           "creationDate":"2013-10-16T14:40:47Z",
 *           "creator":{"id":34},
 *           "dependsOn":null,
 *           "description":"Test description",
 *           "doneDate":null,
 *           "effort":null,
 *           "estimatedDate":null,
 *           "executionFrequency":1,
 *           "feature":null,
 *           "inProgressDate":null,
 *           "lastUpdated":"2013-10-16T14:40:54Z",
 *           "name":"Test",
 *           "notes":null,
 *           "parentSprint":null,
 *           "plannedDate":null,
 *           "rank":1,
 *           "state":2,
 *           "suggestedDate":"2013-10-16T14:40:47Z",
 *           "tasks":[],
 *           "textAs":null,
 *           "textICan":null,
 *           "textTo":null,
 *           "type":0,
 *           "uid":1,
 *           "tags":[],
 *           "dependences":[]
 *         }
 *         ,{...}
 *         ,...
 *       ]
 */
icescrum.getAllStories = function(params, callback) {
    var options = {};
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/';
    options.auth = params.auth;
    options.method = 'GET';
    options.headers = {
            'content-type': 'application/json'
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk == '{"error":"Story does not exist"}') {
                callback(true, 'Story does not exist');
                return(this);
            }
            else {
                callback(false, chunk);
                return(this);
            }
        });
    });
  
    req.end();
};


/**
 * Updates an story
 *
 * @method updateStory
 * @param {number} story: Required story's id
 * @param {string} hostname: Icescrum's server's host name
 * @param {number} port: Icescrum's server's port
 * @param {string} path: Icescrum's server's path
 * @param {string} project: Icescrum's project's key
 * @param {string} auth: Authentication in format user:password
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error
 *   Second value {string}:
 *     If first value == true, error's description
 *     If first value == false, updated story. Example:
 *       {
 *         "id":750,
 *         "acceptanceTests":[],
 *         "acceptedDate":"2013-10-16T14:40:54Z",
 *         "actor":null,
 *         "affectVersion":null,
 *         "creationDate":"2013-10-16T14:40:47Z",
 *         "creator":{"id":34},
 *         "dependsOn":null,
 *         "description":"Updated description",
 *         "doneDate":null,
 *         "effort":null,
 *         "estimatedDate":null,
 *         "executionFrequency":1,
 *         "feature":null,
 *         "inProgressDate":null,
 *         "lastUpdated":"2013-10-16T14:40:54Z",
 *         "name":"Test",
 *         "notes":null,
 *         "parentSprint":null,
 *         "plannedDate":null,
 *         "rank":1,
 *         "state":2,
 *         "suggestedDate":"2013-10-16T14:40:47Z",
 *         "tasks":[],
 *         "textAs":null,
 *         "textICan":null,
 *         "textTo":null,
 *         "type":0,
 *         "uid":1,
 *         "tags":[],
 *         "dependences":[]
 *       }
 */
icescrum.updateStory = function(params, callback) {
    if (params.story !== parseInt(params.story, 10)){
        callback(true, 'Undefined story');
        return(this);
    }
    else {
        if (params.story < 0){
            callback(true, 'Invalid story');
            return(this);
        }
    }
    
    // Optional params
    var name = "";
    if (typeof params.name !== 'undefined' && params.name !== null)
        name = "'name': "+params.name+",";
    
    var type = "";
    if (typeof params.type !== 'undefined' && params.type !== null) {
        if (params.type !== parseInt(params.type, 10)){
            callback(true, 'Undefined type');
            return(this);
        }
        else {
            if (!(params.type === 0 || params.type == 2 || params.type == 3)){
                callback(true, 'Invalid type');
                return(this);
            }
        }
        
        type = "type: "+params.type+",";
    }
    
    var description = "";
    if (typeof params.description !== 'undefined' && params.description !== null)
        description = "description: "+params.description+",";
    
    var notes = "";
    if (typeof params.notes !== 'undefined' && params.notes !== null)
        notes = "notes: "+params.notes+",";
    
    var textAs = "";
    if (typeof params.textAs !== 'undefined' && params.textAs !== null)
        textAs = "textAs: "+params.textAs+",";
    
    var textICan = "";
    if (typeof params.textICan !== 'undefined' && params.textICan !== null)
        textICan = "textICan: "+params.textICan+",";
    
    var textTo = "";
    if (typeof params.textTo !== 'undefined' && params.textTo !== null)
        textTo = "textTo: "+params.textTo+",";
    
    var featureId = "";
    if (typeof params.featureId !== 'undefined' && params.featureId !== null) {
        if (params.featureId !== parseInt(params.featureId, 10)){
            callback(true, 'Undefined feature');
            return(this);
        }
        else {
            if (params.featureId < 0){
                callback(true, 'Invalid feature');
                return(this);
            }
        }
        
        featureId = "feature: {id: "+params.featureId+"},";
    }
    
    var sprintId = "";
    if (typeof params.sprintId !== 'undefined' && params.sprintId !== null) {
        if (params.sprintId !== parseInt(params.sprintId, 10)){
            callback(true, 'Undefined sprint');
            return(this);
        }
        else {
            if (params.sprintId < 0){
                callback(true, 'Invalid sprint');
                return(this);
            }
        }
        
        sprintId = "sprint: {id: "+params.sprintId+"},";
    }

    var data = "{story: {"+name+type+description+notes+textAs+textICan+textTo+featureId+sprintId+"}}"
    ,options = {};

    //data = "{story: {feature: {id: 91}}}";
    
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/'+params.story;
    options.auth = params.auth;
    options.method = 'PUT';
    options.headers = {
            'content-type': 'application/json'
            ,'Content-Length': Buffer.byteLength(data)
    };
  
    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(2,5) == "error") {
                callback(true, chunk.substr(10,chunk.length - 12));
                return(this);
            }
            else {
                callback(false, chunk);
                return(this);
            }
        });
    });
  
    req.write(data, 'utf8');
    req.end();
};

module.exports = icescrum;