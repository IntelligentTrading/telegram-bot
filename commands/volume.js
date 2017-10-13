var Command = require('./command.js').command;
var trading = require('./trading.js');

var volume = new Command('Trading', "get the volume for a coin ticker. Try: /volume BTC",function(volumeMessage){
    console.dir(volumeMessage);
    this.options = volumeMessage.options;
    return volumeMessage.resolve_message;
});


volume.behaviour = function (args) {
    return new Promise((resolve,reject) =>
    {
        trading.tradingBehavior(args, trading.data_type.VOLUME)
        .then((data) => resolve(data), (error) => reject(error));
    });
}

volume.callback_chat_message = function (callback_chat_message_data) {
    return callback_chat_message_data;
}

volume.callback = (data) => trading.getTradingDataFor(data, trading.data_type.VOLUME);

exports.volume = volume;