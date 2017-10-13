var start = require('./start.js').start;
var help = require('./help.js').help;
var price = require('./price.js').price;
var subscribe = require('./subscribe.js').subscribe;
var feedback = require('./feedback.js').feedback;
var volume = require('./volume.js').volume;

var commandManager = {
        start: start,
        help:  help,
        subscribe: subscribe,
        price: price,
        volume: volume,
        feedback: feedback,
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

for(var i = 0; i < Object.keys(commandManager).length;i++)
{
    var cmdName = Object.keys(commandManager)[i];
    commandManager.help.commands.push({name: cmdName, help_text: commandManager[cmdName].help_text, type: commandManager[cmdName].type });
}

module.exports.commandManager = commandManager;