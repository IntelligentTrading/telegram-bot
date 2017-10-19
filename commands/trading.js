function getTradingDataFor(interestCoin, data_type) {
    return new Promise((resolve, reject) => {

        var coin = coins.find(x => x.text.toUpperCase() == interestCoin.toUpperCase()
         || x.callback_data.toUpperCase() == interestCoin.toUpperCase());

        if (coin == null || coin == undefined) {
            resolve(interestCoin + " is not recognized, please try with another coin.\n");
        }
        else {

            console.log('Request data for coin ' + coin);

            var data_result = undefined;

            if (data_type == data_types.VALUATION) {
                data_result = queryValuationDatacenter(coin);
            }
            else if (data_type == data_types.VOLUME) {
                data_result = queryVolumeDatacenter(coin);
            }

            if (data_result !== undefined)
                resolve(data_result);
            else
                reject('Data not found');
        }
    })
}

var queryValuationDatacenter = function (coin) {

    // HTTP GET
    if (coin === undefined || coin === null)
        throw new Error('Coin is undefined.');

    var valuation = `*${coin.text}* (${coin.callback_data})
Price: *$11.13* (+1.99%) ↗️
Market Cap: $1,093,770,423
All time high :*$13.20* (12-Sep-2017)`;
    return valuation;
}

var queryVolumeDatacenter = function (coin) {

    // HTTP GET
    if (coin === undefined || coin === null)
        throw new Error('Coin is undefined.');

    var volume =`*${coin.text}* (${coin.callback_data})
24hr Volume: $67,699,726
Last 7D Average: $42,585,248

#1 Exchange: Bittrex (${coin.callback_data}/BTC)
#2 Exchange: Bitfinex (${coin.callback_data}/USD)
#3 Exchange: Binance (${coin.callback_data}/BTC)

#1 Market: Korea 34%
#2 Market: Japan 28%
#3 Market: USA 22%
All [Markets](https://coinmarketcap.com/currencies/${coin.text}/#markets)`;

    return volume;
}

var coins = [{
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

var data_types = {
    VALUATION: 0,
    VOLUME: 1
};

exports.getTradingDataFor = getTradingDataFor;

exports.tradingBehavior = function (interestCoin, data_type) {
    return new Promise((resolve, reject) => {

        console.log(interestCoin);

        if (interestCoin == undefined || interestCoin.length == 0) {
            resolve({resolve_message:`Select the coin:`,
            options: {
                reply_markup: {
                    inline_keyboard: [coins]
                }
            }});
        }
        else {
            
            getTradingDataFor(interestCoin[0], data_type)
                .then(trading_data => {
                    if (trading_data === undefined || trading_data === null) {
                        reject('Data not available');
                    } else {
                        resolve({resolve_message:trading_data, options:{"parse_mode":"Markdown"}});
                    }
                }, error => {
                    console.log(error);
                    reject(error);
                })
        }
    });
}

exports.coins = coins;
exports.data_type = data_types;