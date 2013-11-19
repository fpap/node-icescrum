
var http = require("http");

var icescrum = {};

/* Story API */

/**
 * Gets a story.
 *
 * @method getStory.
 * @param {number} story: Required story's id.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
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
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
                callback(true, chunk.substr(10,chunk.length - 12));
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
 * Gets all the stories of a project.
 *
 * @method getAllStories.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
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
        var responseParts = [];
        var error = false;
        var errorMsg = "";
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                error = true;
                errorMsg = chunk.substr(11,chunk.length - 14);
                //callback(true, chunk.substr(10,chunk.length - 12));
                //return(this);
            }
            else if (chunk.substr(2,5) == "error") {
                error = true;
                errorMsg = chunk.substr(10,chunk.length - 12);
            }
            else if (chunk.substr(0,15) == "<!DOCTYPE html>") {
                error = true;
                errorMsg = chunk;
                //callback(true, chunk);
                //return(this);
            }
            else {
                if (!error)
                    responseParts.push(chunk);
            }
        });
        
        result.on("end", function(){
            if (!error) {
                callback(false, responseParts.join(""));
            } else {
                callback(true, errorMsg);
            }
            return(this);
        });
    });
  
    req.end();
};

/**
 * Updates a story.
 *
 * @method updateStory.
 * @param {number} story: Story's id to update.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @param {string} name: (optional) New story's name.
 * @param {number} type: (optional) New story's type. 0: user story, 2: defect, 3: technical story.
 * @param {string} description: (optional) New story's description.
 * @param {string} notes: (optional) New story's notes. Textile markup allowed.
 * @param {string} textAs: (optional) New story's "As a" text.  If an actor match the textAs value, it will be linked to the story.
 * @param {string} textICan: (optional) New story's "I want" text.
 * @param {string} textTo: (optional) New story's "In order to" text.
 * @param {number} featureId: (optional) New story's feature id. 
 * @param {number} sprintId: (optional) New story's sprint id.
 * @param {number} rank: (optional) New story's rank (relative position in the stories list).
 * @param {number} effort: (optional) New story's effort.
 * @param {number} dependsOnId: (optional) New story's depends on id.
 * @param {string} tags: (optional) New story's tags. Use comma for multiple tags. // TODO: Currently not working.
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
    
    var rank = "";
    if (typeof params.rank !== 'undefined' && params.rank !== null) {
        if (params.rank !== parseInt(params.rank, 10)){
            callback(true, 'Undefined rank');
            return(this);
        }
        else {
            if (params.rank < 0){
                callback(true, 'Invalid rank');
                return(this);
            }
        }
        
        rank = "rank: "+params.rank+",";
    }
    
    var effort = "";
    if (typeof params.effort !== 'undefined' && params.effort !== null) {
        if (params.effort !== parseInt(params.effort, 10)){
            callback(true, 'Undefined effort');
            return(this);
        }
        else {
            if (params.effort < 0){
                callback(true, 'Invalid effort');
                return(this);
            }
        }
        
        effort = "effort: "+params.effort+",";
    }
    
    var dependsOnId = "";
    if (typeof params.dependsOnId !== 'undefined' && params.dependsOnId !== null) {
        if (params.dependsOnId !== parseInt(params.dependsOnId, 10)){
            callback(true, 'Undefined depends on');
            return(this);
        }
        else {
            if (params.dependsOnId < 0){
                callback(true, 'Invalid depends on');
                return(this);
            }
        }
        
        dependsOnId = "dependsOn: {id: "+params.dependsOnId+"},";
    }
    
    // TODO: Fix. Currently not working.
    var tags = "";
    if (typeof params.tags !== 'undefined' && params.tags !== null)
        tags = "tags: "+params.tags+",";

    var data = "{story: {"+name+type+description+notes+textAs+textICan+textTo+featureId+sprintId+rank+effort+dependsOnId+tags+"}}"
    ,options = {};
    
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
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
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


/**
 * Accepts a story.
 *
 * @method acceptStory.
 * @param {number} story: Story's id to accept.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @param {string} type: New story's type. One of feature, story, task.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
 *     If first value == false, accepted story. Example:
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
icescrum.acceptStory = function(params, callback) {
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
    
    var type = "";
    if (typeof params.type !== 'undefined' && params.type !== null) {
        if (params.type == 'feature' || params.type == 'story' || params.type == 'task')
            type = "'type': "+params.type;
        else {
            callback(true, 'Invalid type');
            return(this);
        }
    }
    else {
        callback(true, 'Undefined type');
        return(this);
    }
    
    var data = "{"+type+"}"
    ,options = {};
    
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/'+params.story+'/accept';
    options.auth = params.auth;
    options.method = 'POST';
    options.headers = {
            'content-type': 'application/json'
            ,'Content-Length': Buffer.byteLength(data)
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
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



/**
 * Updates the priority of a story.
 *
 * @method updateStoryRank.
 * @param {number} story: Story's id to update rank.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @param {string} rank: New story's rank. Relative position in the stories list.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
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
icescrum.updateStoryRank = function(params, callback) {
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
    
    if (params.rank !== parseInt(params.rank, 10)) {
        callback(true, 'Undefined rank');
        return(this);
    }
    else {
        if (params.rank < 1) {
            callback(true, 'Invalid rank');
            return(this);
        }
    }
    
    var data = "{story:{'rank': "+params.rank+"}}"
    ,options = {};
    
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/'+params.story+'/rank';
    options.auth = params.auth;
    options.method = 'POST';
    options.headers = {
            'content-type': 'application/json'
            ,'Content-Length': Buffer.byteLength(data)
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
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


/**
 * Creates a story.
 *
 * @method createStory.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @param {string} name: New story's name.
 * @param {number} type: (optional) New story's type. 0: user story, 2: defect, 3: technical story.
 * @param {string} description: (optional) New story's description.
 * @param {string} notes: (optional) New story's notes. Textile markup allowed.
 * @param {string} textAs: (optional) New story's "As a" text.  If an actor match the textAs value, it will be linked to the story.
 * @param {string} textICan: (optional) New story's "I want" text.
 * @param {string} textTo: (optional) New story's "In order to" text.
 * @param {number} featureId: (optional) New story's feature id. 
 * @param {number} dependsOnId: (optional) New story's depends on id.
 * @param {string} tags: (optional) New story's tags. Use comma or spaces for multiple tags.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error
 *   Second value {string}:
 *     If first value == true, error's description
 *     If first value == false, created story. Example:
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
icescrum.createStory = function(params, callback) {
    
    var name = "";
    if (typeof params.name !== 'undefined' && params.name !== null)
        name = "'name': "+params.name+",";
    else {
        callback(true, 'Undefined name');
        return(this);
    }
    
    // Optional params    
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
    
    var dependsOnId = "";
    if (typeof params.dependsOnId !== 'undefined' && params.dependsOnId !== null) {
        if (params.dependsOnId !== parseInt(params.dependsOnId, 10)){
            callback(true, 'Undefined depends on');
            return(this);
        }
        else {
            if (params.dependsOnId < 0){
                callback(true, 'Invalid depends on');
                return(this);
            }
        }
        
        dependsOnId = "dependsOn: {id: "+params.dependsOnId+"},";
    }
    
    var tags = "";
    if (typeof params.tags !== 'undefined' && params.tags !== null)
        tags = "tags: "+params.tags+",";

    var data = "{story: {"+name+type+description+notes+textAs+textICan+textTo+featureId+dependsOnId+tags+"}}"
    ,options = {};
    
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/';
    options.auth = params.auth;
    options.method = 'POST';
    options.headers = {
            'content-type': 'application/json'
            ,'Content-Length': Buffer.byteLength(data)
    };
  
    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
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


/**
 * Sets a story to done.
 *
 * @method setStoryDone.
 * @param {number} story: Story's id to set to done.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
 *     If first value == false, story set to done. Example:
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
icescrum.setStoryDone = function(params, callback) {
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
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/'+params.story+'/done';
    options.auth = params.auth;
    options.method = 'POST';
    options.headers = {
            'content-type': 'application/json'
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
                callback(true, chunk.substr(10,chunk.length - 12));
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
 * Sets a story to undone.
 *
 * @method setStoryUndone.
 * @param {number} story: Story's id to set to undone.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
 *     If first value == false, story set to undone. Example:
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
icescrum.setStoryUndone = function(params, callback) {
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
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/'+params.story+'/unDone';
    options.auth = params.auth;
    options.method = 'POST';
    options.headers = {
            'content-type': 'application/json'
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
                callback(true, chunk.substr(10,chunk.length - 12));
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
 * Plans a story in a sprint.
 *
 * @method planStory.
 * @param {number} story: Story's id to set to plan in a sprint.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @param {number} sprintId: New story's sprint id.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
 *     If first value == false, story planned in a sprint. Example:
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
icescrum.planStory = function(params, callback) {
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
    
    var sprintId = "";
    if (params.sprintId !== parseInt(params.sprintId, 10)) {
        callback(true, 'Undefined sprint');
        return(this);
    }
    else {
        if (params.sprintId < 0) {
            callback(true, 'Invalid sprint');
            return(this);
        }
        else sprintId = "id: "+params.sprintId;
    }

    var data = "{sprint: {"+sprintId+"}}"
    ,options = {};
    
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/'+params.story+'/plan';
    options.auth = params.auth;
    options.method = 'POST';
    options.headers = {
            'content-type': 'application/json'
            ,'Content-Length': Buffer.byteLength(data)
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
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



/**
 * Unplans a story.
 *
 * @method planStory.
 * @param {number} story: Story's id to set to plan in a sprint.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @param {boolean} shiftToNext: (optional) If true, the story is shifted to the next sprint.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
 *     If first value == false, story unplanned. Example:
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
icescrum.unplanStory = function(params, callback) {
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
    
    var shiftToNext = false;
    if (typeof params.shiftToNext !== 'undefined' && params.shiftToNext !== null) {
        if (params.shiftToNext !== true && params.shiftToNext !== false){
            callback(true, 'Invalid shiftToNext');
            return(this);
        }
    }
    
    shiftToNext = params.shiftToNext;

    if (shiftToNext)
        var data = "{shiftToNext: "+shiftToNext+"}";
    var options = {};
    
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/story/'+params.story+'/unPlan';
    options.auth = params.auth;
    options.method = 'GET';
    if (shiftToNext) {
        options.headers = {
                'content-type': 'application/json'
                ,'Content-Length': Buffer.byteLength(data)
        };  
    }
    else {
        options.headers = {
                'content-type': 'application/json'
        };  
    }


    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
                callback(true, chunk.substr(10,chunk.length - 12));
                return(this);
            }
            else {
                callback(false, chunk);
                return(this);
            }
        });
    });

    if (shiftToNext)
        req.write(data, 'utf8');
    req.end();
};


/**
 * Deletes a story.
 *
 * @method deleteStory.
 * @param {number} story: Story's id to delete.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
 *     If first value == false, deleted story's id.
 */
icescrum.deleteStory = function(params, callback) {
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
    options.auth = params.auth;
    options.method = 'DELETE';
    options.headers = {
            'content-type': 'application/json'
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
                callback(true, chunk.substr(10,chunk.length - 12));
                return(this);
            }
            else { //TODO: When deletes the story successfully, it does not return the id
                callback(false, params.story);
                return(this);
            }
        });
    });
  
    req.end();
};

/* END of Story API */




/* Feature API */

/**
* Get a feature
*
* GET http://:server/ws/p/:pkey/feature/:id
*
* @method getFeature.
* @param {number} feature: Feature's id to get.
* @return {object} Returns by callback's function:
*   First value {boolean}: error.
*   Second value {string}:
*     If first value == true, error's description.
*     If first value == false, get feature's id.
*/
icescrum.getFeature = function(params, callback) {
    if (params.story.feature.id !== parseInt(params.story.feature.id, 10)) {
        callback(true, 'Undefined feature');
        return(this);
    }
    else {
        if (params.story.feature.id < 0) {
            callback(true, 'Invalid feature');
            return(this);
        }
    }
   
    var options = {};
    console.log("Parametros recibidos: \n"+params);
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/feature/'+params.story.feature.id;
    options.auth = params.auth;
    options.method = 'GET';
    options.headers = {
            'content-type': 'application/json'
    };

    var req = http.request(options, function(result) {
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                callback(true, chunk.substr(11,chunk.length - 14));
                return(this);
            } else if (chunk.substr(2,5) == "error") {
                callback(true, chunk.substr(10,chunk.length - 12));
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
 * Gets all the features of a project.
 *
 * @method getAllFeatures.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
 *     If first value == false, required features. Example:
 *       [
 *          {
 *            "uid": 1,
 *            "id": 53,
 *            "creationDate": "2012-06-01T15:29:36Z",
 *            "rank": 1,
 *            "stories": [
 *                {"id": 2107},
 *                {"id": 2127},
 *                {"id": 2147},
 *                {"id": 2167},
 *                {"id": 2119}
 *            ],
 *            "color": "blue",
 *            "description": "Une feature",
 *            "name": "La feature",
 *            "value": 1,
 *            "lastUpdated": "2012-06-01T15:29:36Z",
 *            "type": 0,
 *            "notes": null,
 *            "tags": []
 *        }
 *        ,{...}
 *        ,...
 *       ]
 */
icescrum.getAllFeatures = function(params, callback) {
    var options = {};
    
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/feature/';
    options.auth = params.auth;
    options.method = 'GET';
    options.headers = {
            'content-type': 'application/json'
    };

    var req = http.request(options, function(result) {
        var responseParts = [];
        var error = false;
        var errorMsg = "";
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                error = true;
                errorMsg = chunk.substr(11,chunk.length - 14);
                //callback(true, chunk.substr(10,chunk.length - 12));
                //return(this);
            }
            else if (chunk.substr(2,5) == "error") {
                error = true;
                errorMsg = chunk.substr(10,chunk.length - 12);
            }
            else if (chunk.substr(0,15) == "<!DOCTYPE html>") {
                error = true;
                errorMsg = chunk;
                //callback(true, chunk);
                //return(this);
            }
            else {
                if (!error)
                    responseParts.push(chunk);
            }
        });
        
        result.on("end", function(){
            if (!error) {
                callback(false, responseParts.join(""));
            } else {
                callback(true, errorMsg);
            }
            return(this);
        });
    });
  
    req.end();
};

/* END of Feature API */




/* Feature API */

/**
 * Gets all the sprints of the current release of a project.
 *
 * @method getAllCurrentReleaseSprints.
 * @param {string} hostname: Icescrum's server's host name.
 * @param {number} port: Icescrum's server's port.
 * @param {string} path: Icescrum's server's path.
 * @param {string} project: Icescrum's project's key.
 * @param {string} auth: Authentication in format user:password.
 * @return {object} Returns by callback's function:
 *   First value {boolean}: error.
 *   Second value {string}:
 *     If first value == true, error's description.
 *     If first value == false, required sprints. Example:
 *       [
 *          {
 *              "startDate": "2012-06-06T00:00:00Z",
 *              "dailyWorkTime": 8,
 *              "closeDate": "2012-06-06T15:56:28Z",
 *              "state": 3,
 *              "resource": null,
 *              "lastUpdated": "2012-06-06T15:56:28Z",
 *              "endDate": "2012-06-19T00:00:00Z",
 *              "tasks": [
 *                  {"id": 1370},
 *                  {"id": 1360},
 *                  {"id": 1378},
 *                  {"id": 1376},
 *                  {"id": 1354},
 *                  {"id": 1364}
 *              ],
 *              "activationDate": "2012-06-06T15:56:28Z",
 *              "goal": "Generated Sprint",
 *              "numberOfDays": 13,
 *              "id": 40,
 *              "retrospective": null,
 *              "stories": [
 *                  {"id": 431},
 *                  {"id": 432},
 *                  {"id": 424},
 *                  {"id": 426},
 *                  {"id": 430},
 *                  {"id": 425},
 *                  {"id": 427},
 *                  {"id": 429}
 *              ],
 *              "doneDefinition": null,
 *              "orderNumber": 1,
 *              "parentRelease": {"id": 38},
 *              "velocity": 40,
 *              "capacity": 40
 *          }
 *         ,{...}
 *         ,...
 *       ]
 */
icescrum.getAllCurrentReleaseSprints = function(params, callback) {
    var options = {};
    
    options.hostname = params.hostname;
    options.port = params.port;
    options.path = '/'+params.path+'/ws/p/'+params.project+'/sprint/';
    options.auth = params.auth;
    options.method = 'GET';
    options.headers = {
            'content-type': 'application/json'
    };

    var req = http.request(options, function(result) {
        var responseParts = [];
        var error = false;
        var errorMsg = "";
        result.setEncoding('utf8');
        result.on('data', function (chunk) {
            if (chunk.substr(3,5) == "error") {
                error = true;
                errorMsg = chunk.substr(11,chunk.length - 14);
                //callback(true, chunk.substr(10,chunk.length - 12));
                //return(this);
            }
            else if (chunk.substr(2,5) == "error") {
                error = true;
                errorMsg = chunk.substr(10,chunk.length - 12);
            }
            else if (chunk.substr(0,15) == "<!DOCTYPE html>") {
                error = true;
                errorMsg = chunk;
                //callback(true, chunk);
                //return(this);
            }
            else {
                if (!error)
                    responseParts.push(chunk);
            }
        });
        
        result.on("end", function(){
            if (!error) {
                callback(false, responseParts.join(""));
            } else {
                callback(true, errorMsg);
            }
            return(this);
        });
    });
  
    req.end();
};

/* End of Feature API */


module.exports = icescrum;