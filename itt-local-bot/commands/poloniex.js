var config = require('../config.js').config;
var Command = require('./command.js').command;
const Datastore = require('@google-cloud/datastore');
var datastoreClient = Datastore(config);
var poloniex = new Command('Exchange');

poloniex.message = function (exchange) {

if(exchange == undefined || exchange == null )
{
    //TO DO:    nice to show in case of /poloniex cmd without args 
    //          a keyboard with the list of the currencies available

    return 'Something went wrong, please call /poloniex <coin1>_<coin2>';
}

    var response = "\n"
        + "\nBase Volume: " + exchange['baseVolume']
        + "\nHigh Last 24hr: " + exchange['high24hr']
        + "\nHighest Bid: " + exchange['highestBid']
        + "\nLast Price: " + exchange['last']
        + "\nLow Last 24hr: " + exchange['low24hr']
        + "\nLowest Ask: " + exchange['lowestAsk']
        + "\nPercent Change: " + exchange['percentChange']
        + "\nQuote Volume: " + exchange['quoteVolume'];
    return response;
}

poloniex.behaviour = function (coins) {
    return new Promise((resolve, reject) => {

        if (coins == undefined || coins == null) {
            resolve();
        }
        else {
            try {
                query = datastoreClient.createQuery(kind = 'Channels').order('timestamp', { descending: true }).limit(1);

                datastoreClient.runQuery(query).then(function (entities) {

                    var content = entities[0][0].content;
                    var price_data = JSON.parse(content.replace(/'/g, "\""));
                    var exchange = price_data[coins];

                    resolve(exchange);
                });
            }
            catch (err) {
                reject("Please check the name of coin. Coin not found!");
            }
        }
    });
}

poloniex.help_text = "get the price for any coin pair in /coins"
exports.poloniex = poloniex;