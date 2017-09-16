var Command = require('./command.js').command;

var start = new Command('Bot',"subscribe to new alerts",
function(){ 
    return "Welcome to Intelligent Trading Bot!\nYou are now subscribed to price alerts.\n\nTry /help for a list of commands and examples"
});

exports.start = start;


/*
{
  'interface': "telegram",
  'id': "abc1234",
  'setting': "{}"
}
*/