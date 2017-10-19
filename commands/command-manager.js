var start = require('./start.js').start;
var help = require('./help.js').help;
var price = require('./price.js').price;
var subscribe = require('./subscribe.js').subscribe;
var feedback = require('./feedback.js').feedback;
var volume = require('./volume.js').volume;
var settings = require('./settings.js').settings;

var commandManager = {
        start: start,
        help:  help,
        subscribe: subscribe,
        price: price,
        volume: volume,
        feedback: feedback,
        settings: settings,
        greeting: {
            message : function(first_name){return "Hi "+first_name+"! Welcome to ITT 📈📉💲"}
        },
        repeat: {
            message : function(){return "Please repeat, I missed your last request!"}
        },
        unknown: {
            message : function(){return 'Unknown command'}
        }
};

module.exports.commandManager = commandManager;