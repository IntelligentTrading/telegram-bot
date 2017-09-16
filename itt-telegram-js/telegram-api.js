var request = require('request');
//const token = process.env.ITT_DEV_TELEGRAM_TOKEN;
const token = "<telegram-token>";
var baseUrl = 'https://api.telegram.org/bot' + token + '/';

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
