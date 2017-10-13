var datastoreConfig = require('../config.js').datastoreConfig;
var Command = require('./command.js').command;
const Datastore = require('@google-cloud/datastore');
var datastoreClient = Datastore(datastoreConfig);

var trading = require('./trading.js');
var price = new Command('Trading');

price.message = function (valuationMessage) {
    return valuationMessage;
}

price.behaviour = function (args) {

    return new Promise((resolve, reject) => {

        console.log(args);

        if (args == undefined || args.length == 0) {
            this.options = inline_options;
            resolve('Select the coin to get your valuation:');
        }
        else {
            this.options = {};

            trading.getTradingDataFor(args[0],trading.data_type.VALUATION)
            .then(valuation => {
                if (valuation === undefined || valuation === null) {
                    reject('Valuation not available');
                } else {
                    resolve(valuation);
                }
            }, valuationError => {
                console.log(valuationError);
                reject(valuationError);
            })
        }
    });
}


price.help_text = "The current valuation of a coin. Try: /price BTC";

price.callback_chat_message = function (callback_chat_message_data) {
    return callback_chat_message_data;
}

var inline_options = {
    reply_markup: {
        inline_keyboard: [trading.coins]
    }
};

price.callback = (data) => trading.getTradingDataFor(data,trading.data_type.VALUATION);

exports.price = price;