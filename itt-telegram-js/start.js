const Datastore = require('@google-cloud/datastore');
const config = require('./config.js').config;
var datastoreClient = Datastore(config);

exports.behaviour = function (chatId) {
    return new Promise((resolve, reject) => {

        const kind = 'Subscription';
        // The Cloud Datastore key for the new entity
        const subscriptionKey = datastoreClient.key(kind);

        // Prepares the new entity
        /*const subscription = {
            key: subscriptionKey,
            data: {
                chat_id: chatId,
                interface: 'telegram',
                settings: {}
            }
        };*/


        const subscription = {
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
          };


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

exports.message = function () {
    return 'Welcome to Intelligent Trading Bot!\nYou are now subscribed to price alerts.\nTry /help for a list of commands and examples';
}
