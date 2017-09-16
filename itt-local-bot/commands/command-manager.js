var start = require('./start.js').start;
var help = require('./help.js').help;
var exchangeCommands = require('./exchange.js');
var coins = require('./coins.js').coins;
var price = require('./price.js').price;
var poloniex = require('./poloniex.js').poloniex;

var commandManager = {
        start: start,
        help:  help,
        exchanges: exchangeCommands.exchanges,
        exchange: exchangeCommands.exchange,
        coins: coins,
        price: price,
        poloniex: poloniex,
        unknown: {
            message : function(){return 'unknown command'}
        }
};

for(var i = 0; i < Object.keys(commandManager).length;i++)
{
    var cmdName = Object.keys(commandManager)[i];
    commandManager.help.commands.push({name: cmdName, help_text: commandManager[cmdName].help_text, type: commandManager[cmdName].type });
}

module.exports.commandManager = commandManager;