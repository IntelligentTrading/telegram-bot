var datastoreConfig = require('../config.js').datastoreConfig;
var Command = require('./command.js').command;
const Datastore = require('@google-cloud/datastore');
var datastoreClient = Datastore(datastoreConfig);
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

            getValuationFor(args[0]).then(valuation => {
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

var coins =
    [{
        text: 'Bitcoin',
        callback_data: 'BTC'
    },
    {
        text: 'Ethereum',
        callback_data: 'ETH'
    },
    {
        text: 'OmiseGo',
        callback_data: 'OMG'
    }];


var inline_options = {
    reply_markup: {
        inline_keyboard: [coins]
    }
};

price.callback = getValuationFor;

function getValuationFor(valuableCoin) {
    return new Promise((resolve, reject) => {

        var coin = coins.find(x => x.text == valuableCoin || x.callback_data == valuableCoin);

        if (coin == null || coin == undefined) {
            resolve(valuableCoin + " is not recognized, please try with another coin.\n");
        }
        else {

            console.log('Request value for coin ' + coin);
            var valuation = queryValuationDatacenter(coin);
            if (valuation !== undefined)
                resolve(valuation);
            else
                reject('Valuation not found');
        }
    })
}


var queryValuationDatacenter = function (coin) {

    // HTTP GET
    if (coin === undefined || coin === null)
        throw new Error('Coin is undefined.');

    var valuation = `Here's the current valuation (sample data): 
    ${coin.text} (${coin.callback_data})
    Price: $11.13 (+1.99%) ↗️
    Market Cap: $1,093,770,423
    (The all time high for ${coin.callback_data} was $13.20 on 12-Sep-2017)`;

    return valuation;
}

exports.price = price;