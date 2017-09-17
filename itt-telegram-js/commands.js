var telegram = require('./telegram-api.js');
var start = require('./start.js');
var unknownCmdMessage = 'Sorry, I did not understand.';

var commandManager = {
    start: start,
}

exports.commandManager = commandManager;