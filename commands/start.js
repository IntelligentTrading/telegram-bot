var Command = require('./command.js').command;
const Datastore = require('@google-cloud/datastore');
const datastoreConfig = require('../config.js').datastoreConfig;
var datastoreClient = Datastore(datastoreConfig);
var help = require('./help').help;
var subscription = require('./subscribe').subscribe;

var start = new Command('Bot', "Start ITT Bot, subscribe to new alerts.",
  function () {
    return "Hi! I'm the ITT Trading Bot 🤖\n\nI'll be providing you with trading signals whenever an interesting opportunity comes up!\n\nAs it might take some time, visit the [ITT website](http://intelligenttrading.org/) or explore commands and functionalities in the meanwhile.\n\n" + help.message()
  });

start.options =
  {
    "parse_mode": "Markdown",
    "disable_web_page_preview": "true"
  };

start.behaviour = function () {
  return new Promise((resolve, reject) => {

    var chatId = arguments[arguments.length - 1];

    if (chatId !== undefined && chatId !== null) {
      subscription.sub(chatId).then(() => resolve(chatId), (err) => {
        throw new Error(err);
      });
    }
    else {
      reject('Invalid user chat...');
    }
  });
}

exports.start = start;