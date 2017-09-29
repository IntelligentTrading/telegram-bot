var Command = require('./command.js').command;
const Datastore = require('@google-cloud/datastore');
const datastoreConfig = require('../config.js').datastoreConfig;
var datastoreClient = Datastore(datastoreConfig);
var subscription = require('./subscribe').subscribe;

var start = new Command('Bot', "Start ITT Bot, subscribe to new alerts.",
  function () {
    return "Welcome to Intelligent Trading Bot!\nYou are now subscribed to price alerts.\n\nTry /help for a list of commands and examples, /subscribe to manage your subscriptions."
  });

start.behaviour = function () {
  return new Promise((resolve, reject) => {

    var chatId = arguments[arguments.length-1];
      subscription.sub(chatId).then(function(){
        resolve('Bot started...');
      }).catch(function(){
        console.log('Error while starting the bot...');
        reject('Bot start rejected...');
      });
})};

exports.start = start;