'use strict';

// const itt_dev_bot = require('node-telegram-bot-api');
// const bot = new TelegramBot(token, {polling: true});
var commandManager = require('./commands.js');
var telegram = require('./telegram-api.js');


exports.botHandler = function(req, res){
  /*
   * When the request set the content-type header to application/json
   * the body of the request does not need to be parsed and is already
   * available as object.
   */
  try{
    const {message:{chat, text}} = req.body;
    //telegram.sendMessage(chat.id,'Telegram ok');
    commandManager.command(text,chat.id);
    res.status(200).send('OK');
  }
  catch(err){
    res.status(500).send('Error:'+err.message+'\n');
  }
}

exports.event = (event, callback) => {
  callback();
};
