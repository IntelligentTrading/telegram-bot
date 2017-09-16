var request = require('request');
//const token = process.env.ITT_DEV_TELEGRAM_TOKEN;
const token = "410807714:AAH66gGkC7izBdiFAtoWkr-FNh-r69lrANY";
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