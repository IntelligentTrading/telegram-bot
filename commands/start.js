var Command = require('./command.js').command;
const Datastore = require('@google-cloud/datastore');
const datastoreConfig = require('../config.js').datastoreConfig;
var datastoreClient = Datastore(datastoreConfig);
var help = require('./help').help;
var subscription = require('./subscribe').subscribe;

var start = new Command('Bot', "Start ITT Bot, subscribe to new alerts.",
  function () {
    return "Hi! I'm the ITT Trading Bot. I'll be providing you with trading signals whenever an interesting opportunity comes up. This might take some time. Here are some helpful commands you can try out in the meanwhile:\n\n" + help.command_list()
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