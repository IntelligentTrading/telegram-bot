var Command = require('./command.js').command;

//TODO: get the list of available exchanges from Datastorage
var exchangeOptions = [
    {
        text:"Poloniex",
        callback_data:"POLO"
    }];

var exchanges = new Command('Exchange',"list of supported exchanges",function(){ return 'Exchanges configuration options:'});
exchanges.options = {
reply_markup: {
    inline_keyboard: [
        [{
            text: 'List supported exchanges',
            callback_data: 'LIST'
        }],
        [{
            text: 'See default exchange',
            callback_data: 'DEFX'
        }],
        [{
            text: 'Set default exchange',
            callback_data: 'SDEX'
        }]
    ]
  }
};

var exchange = new Command('Exchange',"set the default exchange",function(args)
{
    if(args == undefined || args.length==0){
        this.options = exchange_inline_opt;
        return 'Set the default exchange:'
    }
    else
    {
        this.options = {};
        var defaultExchange = exchangeOptions.find(x => x.text == args[0] || x.callback_data == args[0]);

        if(defaultExchange == null || defaultExchange == undefined)
            return args[0]+" is not available as exchange.\nTry with /exchange to get a list of the available exchanges."

        return defaultExchange.text+' set as default exchange!';
    }
});

var exchange_inline_opt = {
    reply_markup: {
        inline_keyboard: [exchangeOptions]
    }
};

exports.exchanges = exchanges;
exports.exchange = exchange;