var Command = require('./command.js').command;
var trading = require('./trading.js');

var volume = new Command('Trading', "Last 24 hour volume data. For example: /volume BTC",function(volumeMessage){
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