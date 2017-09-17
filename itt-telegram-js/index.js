'use strict';

// const itt_dev_bot = require('node-telegram-bot-api');
// const bot = new TelegramBot(token, {polling: true});
var commandManager = require('./commands.js').commandManager;
var telegram = require('./telegram-api.js');


exports.botHandler = function(req, res){
  /*
   * When the request set the content-type header to application/json
   * the body of the request does not need to be parsed and is already
   * available as object.
   */
  try{
    const {message:{chat, text}} = req.body;

    var args = text.split(' ');
    var commandName = args[0].replace('/', '');
    var currentCommand = commandManager[commandName];
    
    console.log(chat.id);

    currentCommand.behaviour(chat.id)
    .then(function (data) {
        telegram.sendMessage(chat.id, currentCommand.message(data));
        res.status(200).send('Done');
    });
  }
  catch(err){
    res.status(500).send('Error:'+err.message+'\n');
  }
}

exports.event = (event, callback) => {
  callback();
};
