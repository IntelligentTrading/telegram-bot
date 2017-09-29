'use strict';

var token = require('./config.js').ITT_DEV_TELEGRAM_TOKEN;
var TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, { polling: false });
var commandManager = require('./commands/command-manager.js').commandManager;
var currentCommand = undefined;

var commandRegEx = /\/(\w+)( )*(\w+){0,1}/;

exports.botHandler = function (req, res) {
  try {
    var telegram_message = req.body;

    // Bot is sending a message
    if (telegram_message.message !== undefined) {
      const { message: { chat, text } } = telegram_message;
      var match = commandRegEx.exec(text);
      var commandLabel = match[0].replace('/', '').trim();

      if (commandManager.hasOwnProperty(commandLabel)) {

        //cleaning args
        currentCommand = commandManager[commandLabel];
        var args = match.filter(function (arg) {
          return arg != null && arg != undefined && arg.trim() != "";
        }).slice(1);

        currentCommand.behaviour(args, chat.id).then(function (data) {
          bot.sendMessage(chat.id, currentCommand.message(data), currentCommand.options);
        }).catch(function () {
          console.log('Promise rejected');
        });
      }
      else
        bot.sendMessage(chat.id, commandManager.unknown.message());

    }// bot is sending a callback_query
    else if (telegram_message.callback_query !== undefined) {
      console.log(telegram_message.callback_query);

      const chat_id = telegram_message.callback_query.message.chat.id;
      const callback_data = telegram_message.callback_query.data;

      //Telegram commands expire!!!
      if (currentCommand === undefined) {
        bot.answerCallbackQuery(telegram_message.callback_query.id, 'Please, perform action again', true);
      }
      else {
        currentCommand.callback(callback_data, chat_id).then(function () {
          bot.answerCallbackQuery(telegram_message.callback_query.id, currentCommand.callback_message(), true).catch(function () {
            res.status(500).send('Error while performing callback...');
          });
        });
      }
    }
    else {
      console.log('Unknown message type');
    }

    res.status(200).send('Command ' + commandLabel + ' executed.');
  }
  catch (err) {
    console.log(err.message);
    res.status(500).send('Error:' + err.message + '\n');
  }
}

exports.event = (event, callback) => {
  callback();
};