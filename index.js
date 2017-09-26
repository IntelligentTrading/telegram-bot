'use strict';
//require('@google/cloud-debug');

var token = require('./config.js').ITT_DEV_TELEGRAM_TOKEN;
var TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: false });
var commandManager = require('./commands/command-manager.js').commandManager;
var currentCommand = undefined;

var commandRegEx = /\/(\w+)( )*(\w+){0,1}/;

// match with /<cmd> [params]
/*bot.onText(/\/(\w+)( )*(\w+){0,1}/, (msg, match) => {

  try {

    if (commandManager.hasOwnProperty(match[1])) {

      //cleaning args
      currentCommand = commandManager[match[1].trim()];
      var args = match.filter(function (arg) {
        return arg != null && arg != undefined && arg.trim() != "";
      }).slice(2);

      currentCommand.behaviour(args).then(function (data) {
        bot.sendMessage(msg.chat.id, currentCommand.message(data), currentCommand.options);
      });
    }
    else
      bot.sendMessage(msg.chat.id, commandManager.unknown.message());
  }
  catch (err) {
    bot.sendMessage(msg.chat.id, 'Something went wrong...');
    console.log(err);
  }

});

bot.on('callback_query', (msg) => {

  var opt = {
    callback_query_id: msg.id,
    text: '',
    show_alert: false,
  };

  try {
    var args = [];
    args.push(msg.data);
    opt.text = currentCommand.message(args);
  } catch (err) {
    opt.text = 'Something went wrong!'
    opt.show_alert = true;
  }
  finally {
    bot.answerCallbackQuery(opt);
  }
});*/


exports.botHandler = function (req, res) {
  /*
   * When the request set the content-type header to application/json
   * the body of the request does not need to be parsed and is already
   * available as object.
   */
  try {
    const { message: { chat, text } } = req.body;
    var match = commandRegEx.exec(text);
    var commandLabel = match[0].replace('/','').trim();
    console.log(commandLabel);

    if (commandManager.hasOwnProperty(commandLabel)) {

      //cleaning args
      currentCommand = commandManager[commandLabel];
      var args = match.filter(function (arg) {
        return arg != null && arg != undefined && arg.trim() != "";
      }).slice(1);

      currentCommand.behaviour(args,chat.id).then(function (data) {
        bot.sendMessage(chat.id, currentCommand.message(data), currentCommand.options);
      });
    }
    else
      bot.sendMessage(chat.id, commandManager.unknown.message());
      
    res.status(200).send('Command '+commandLabel+' executed.');
  }
  catch (err) {
    console.log('Non-OK');
    res.status(500).send('Error:' + err.message + '\n');
  }
}

exports.event = (event, callback) => {
  callback();
};
