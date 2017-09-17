const Datastore = require('@google-cloud/datastore');
const config = require('./config.js').config;
var datastoreClient = Datastore(config);

exports.behaviour = function(params){ return new Promise(resolve => {
    resolve(params);
});
}

exports.message = function(){
    return 'Welcome to Intelligent Trading Bot!\nYou are now subscribed to price alerts.\nTry /help for a list of commands and examples';
} 