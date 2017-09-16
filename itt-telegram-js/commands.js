var telegram = require('./telegram-api.js');
var start = require('./start.js');
var unknownCmdMessage = 'Sorry, I did not understand.';

var commandManager = {
    start: function(){
        return start.message;
    },
    help: function(){
        console.log('help')
    }
}

commandManager.command = function(commandText){
    var args = commandText.split(' ');
    var commandName = args[0].replace('/','');
    var chat_id = arguments[1];
    var result = commandManager[commandName].call(this,chat_id);
    telegram.sendMessage(chat_id,result);
}

exports.command = commandManager.command;