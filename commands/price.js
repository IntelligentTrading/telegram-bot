var datastoreConfig = require('../config.js').datastoreConfig;
var Command = require('./command.js').command;
const Datastore = require('@google-cloud/datastore');
var datastoreClient = Datastore(datastoreConfig);
var price = new Command('Exchange');

price.message = function (symbol) {
    /*return "\n".join([
        symbol + " Price",
        "BTC {:,.8f}".format(price_satoshis / 100000000),
        "as of %ds ago, Poloniex" % int(time.time() - datastore['timestamp'])
    ])*/

    return 'Command not implemented'
};
price.help_text = "get the BTC price for any coin eg. /price ETH"

/*# @telegram_command("cryptocompare_price", pass_args=True)
# def cryptocompare_price(args):
#     #todo: refactor to use data_sources and datastore
#     return get_price(",".join(args).upper(), "USD,BTC")
#
# cryptocompare_price.help_text = "get the price for any crypto ticker eg. ETH"*/


price.behaviour = function (symbolArg) {
    return new Promise((resolve, reject) => {

        try {
            symbol = symbolArg[0].toUpperCase();

            //price_satoshis = datastore['value']

            query = datastoreClient
                .createQuery(kind = 'Indicators')
                .filter("symbol", symbol)
                .order('timestamp', { descending: true })
                .limit(1);

            datastoreClient.runQuery(query).then(function (entities) {

                var content = entities[0][0].content;
                var price_data = JSON.parse(content.replace(/'/g, "\""));
                var exchange = price_data[coins];

                resolve(exchange);
            });


            resolve();
        }
        catch (err) {
            resolve("Please check the name of coin. Coin not found!");
        }
    })
}

price.help_text = "get the BTC price for any coin eg. /price ETH"


/*def get_last_price(symbol, channel="Poloniex"):
    """
    get latest price from datastore
    :param symbol: "ETH"
    :param channel: "Poloniex"
    :return: integere price in satoshis
    """
 
    # query database for latest price data
    client = datastore.Client()
    query = client.query(kind='Indicators')
    query.add_filter('symbol', '=', symbol)
    query.add_filter('ilk', '=', 'price')
    query.order = ['-timestamp']
    datastore_entity = list(query.fetch(limit=1))[0]
 
    # datastore entity example
    # {'ilk': 'price',
    # 'symbol': symbol,
    # 'value': int(price_data['last'] * 8),  # satoshis
    # 'timestamp': timestamp,
    # 'channel': channel,
    #  }
 
    return datastore_entity['value']
 
 
def get_last_price_humanized(symbol):
    return "BTC {:,.8f}".format(get_last_price(symbol)/100000000) */


exports.price = price;