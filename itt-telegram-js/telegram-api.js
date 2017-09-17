var request = require('request');
var telegram = require('./config.js').telegramConfig;
//const token = process.env.ITT_DEV_TELEGRAM_TOKEN;
var baseUrl = 'https://api.telegram.org/bot' + telegram.token + '/';

exports.sendMessage = function (chatId, message) {
    request.post(
      baseUrl + 'sendMessage',
      {
        form: {
          'chat_id': chatId,
          'text': message,
          'parse_mode':'Markdown'
        }
      }
    );
  };
