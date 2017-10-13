
exports.getTradingDataFor = function (interestCoin, data_type) {
    return new Promise((resolve, reject) => {

        var coin = coins.find(x => x.text == interestCoin || x.callback_data == interestCoin);

        if (coin == null || coin == undefined) {
            resolve(interestCoin + " is not recognized, please try with another coin.\n");
        }
        else {

            console.log('Request data for coin ' + coin);

            var data_result = undefined;

            if(data_type == data_types.VALUATION){
                data_result = queryValuationDatacenter(coin);
            }
            else if(data_type == data_types.VOLUME){
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

    var valuation = `Here's the current valuation (sample data): 
    ${coin.text} (${coin.callback_data})
    Price: $11.13 (+1.99%) ↗️
    Market Cap: $1,093,770,423
    (The all time high for ${coin.callback_data} was $13.20 on 12-Sep-2017)`;

    return valuation;
}

var queryVolumeDatacenter = function (coin) {

    // HTTP GET
    if (coin === undefined || coin === null)
        throw new Error('Coin is undefined.');

    var volume =
        `${coin.text} (${coin.callback_data})
        24hr Volume: $67,699,726
        Top Exchange: Bitfinex (${coin.callback_data}/USD)
        .#1 Market: Korea (34%)
        .#2 Market: Japan (28%)
        .#3 Market: USA (22%)
        All Markets: https://coinmarketcap.com/currencies/omisego/#markets`

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

exports.coins = coins;

var data_types = {
    VALUATION : 0,
    VOLUME: 1
};
exports.data_type = data_types;