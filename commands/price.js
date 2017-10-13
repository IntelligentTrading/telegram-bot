var trading = require('./trading.js');
var CommandClass = require('./command.js');
var Command = CommandClass.command;
var ReplyTypes = CommandClass.REPLY_TYPES;


var price = new Command('Trading',"The current valuation of a coin. Try: /price BTC",function(valuationMessage){
    console.dir(valuationMessage);
    this.options = valuationMessage.options;
    return valuationMessage.resolve_message;
});


price.behaviour = function (args) {
    return new Promise((resolve,reject) =>
    {
        trading.tradingBehavior(args, trading.data_type.VALUATION)
        .then((data) => resolve(data), (error) => reject(error));
    });
}

price.callback_chat_message = function (callback_chat_message_data) {
    return callback_chat_message_data;
}

price.callback = (data) => trading.getTradingDataFor(data, trading.data_type.VALUATION);
price.reply_type = ReplyTypes.PHOTO;


exports.price = price;