var Command = require('./command.js').command;
const Datastore = require('@google-cloud/datastore');
const datastoreConfig = require('../config.js').datastoreConfig;
var datastoreClient = Datastore(datastoreConfig);

var start = new Command('Bot', "subscribe to new alerts",
  function () {
    return "Welcome to Intelligent Trading Bot!\nYou are now subscribed to price alerts.\n\nTry /help for a list of commands and examples"
  });

start.behaviour = function () {
  return new Promise((resolve, reject) => {

    
    var chatId = arguments[arguments.length-1];
    console.log('Adding new subscription...[' + chatId + ']');

    const kind = 'Subscription';
    // The Cloud Datastore key for the new entity
    const subscriptionKey = datastoreClient.key(kind);

    const subscription = {
      key: subscriptionKey,
      data: {
        chat_id: chatId,
        interface: 'telegram',
        settings: {}
      }
    };


    /*const subscription = {
        key: subscriptionKey,
        data: [
          {
            name: 'id',
            value: chatId
          },
          {
            name: 'interface',
            value: 'telegram',
          },
          {
            name: 'settings',
            value: '{}',
            excludeFromIndexes: true
          }
        ]
      };*/


    // Saves the entity
    datastoreClient.save(subscription)
      .then(() => {
        console.log(`Saved ${subscription.key}`);
        resolve(chatId);
      })
      .catch((err) => {
        console.error('ERROR:', err);
        reject('Rejected');
      });

  });
}

exports.start = start;